const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {compareVersions, updateDirectory} = require('../scripts/Sync-PluginDirectory.js');
test('semantic release ordering rejects downgrades including prereleases', () => {
  for (const [a,b,result] of [['1.0.2','1.0.1',1], ['1.0.2','1.0.2',0], ['1.0.2-beta.2','1.0.2-beta.10',-1], ['1.0.2-beta','1.0.2',-1]]) assert.equal(compareVersions(a,b),result);
  assert.throws(() => compareVersions('broken','1.0.0'));
});
test('sync pins tagged bytes, preserves reviewed fields, is idempotent, and refuses downgrades', async () => {
  const directory=fs.mkdtempSync(path.join(os.tmpdir(),'fugs-directory-test-'));
  const originalFetch=global.fetch;
  const manifest={schemaVersion:1,plugins:[{slug:'fugs-chat-bubbles',name:'Reviewed title',repositoryUrl:'https://github.com/SpaceFoon/FugsChatBubbles',version:'1.0.1',compatibility:'MV',maturity:'not-prod-ready',description:'Reviewed text'}]};
  const release={slug:'fugs-chat-bubbles',repository:'SpaceFoon/FugsChatBubbles',version:'1.0.2',tagName:'v1.0.2',releaseZipUrl:'https://github.com/SpaceFoon/FugsChatBubbles/releases/download/v1.0.2/FugsChatBubbles-v1.0.2.zip'};
  try {
    fs.writeFileSync(path.join(directory,'plugins.json'),JSON.stringify(manifest));
    fs.writeFileSync(path.join(directory,'README.md'),'Intro\n<!-- plugin-directory:start -->\n<!-- plugin-directory:end -->\nTail');
    global.fetch=async url => { assert.match(url,/\/v1\.0\.2\/FugsChatBubbles\.js$/); return new Response('/*\n * @version 1.0.2\n */'); };
    await updateDirectory(directory,release);
    const first=fs.readFileSync(path.join(directory,'plugins.json'),'utf8');
    const entry=JSON.parse(first).plugins[0];
    assert.equal(entry.description,'Reviewed text'); assert.equal(entry.maturity,'not-prod-ready'); assert.equal(entry.name,'Reviewed title');
    assert.match(entry.files[0].sha256,/^[a-f0-9]{64}$/);
    assert.match(fs.readFileSync(path.join(directory,'README.md'),'utf8'),/1\.0\.2/);
    await updateDirectory(directory,release);
    assert.equal(fs.readFileSync(path.join(directory,'plugins.json'),'utf8'),first);
    await assert.rejects(updateDirectory(directory,{...release,version:'1.0.1',tagName:'v1.0.1',releaseZipUrl:release.releaseZipUrl.replaceAll('1.0.2','1.0.1')}),/downgrade/);
    await assert.rejects(updateDirectory(directory,{...release,repository:'other/repo'}),/identity/);
    assert.equal(fs.readFileSync(path.join(directory,'plugins.json'),'utf8'),first);
  } finally { global.fetch=originalFetch; fs.rmSync(directory,{recursive:true,force:true}); }
});
