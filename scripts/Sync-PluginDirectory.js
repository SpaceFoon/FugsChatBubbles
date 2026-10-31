const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
function compareVersions(left, right) {
  const parse = (value) => {
    const match = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(value);
    if (!match) throw new Error(`Invalid release version: ${value}`);
    return {core: match.slice(1, 4).map(BigInt), pre: match[4]};
  };
  const a = parse(left), b = parse(right);
  for (let i = 0; i < 3; i++) if (a.core[i] !== b.core[i]) return a.core[i] > b.core[i] ? 1 : -1;
  if (a.pre === b.pre) return 0;
  if (!a.pre) return 1;
  if (!b.pre) return -1;
  const aa = a.pre.split('.'), bb = b.pre.split('.');
  for (let i = 0; i < Math.max(aa.length, bb.length); i++) {
    if (aa[i] === undefined) return -1;
    if (bb[i] === undefined) return 1;
    if (aa[i] === bb[i]) continue;
    const an = /^\d+$/.test(aa[i]), bn = /^\d+$/.test(bb[i]);
    if (an && bn) return BigInt(aa[i]) > BigInt(bb[i]) ? 1 : -1;
    if (an !== bn) return an ? -1 : 1;
    return aa[i] > bb[i] ? 1 : -1;
  }
  return 0;
}
async function updateDirectory(directory, release) {
  if (release.repository !== 'SpaceFoon/FugsChatBubbles' || release.slug !== 'fugs-chat-bubbles' || release.tagName !== `v${release.version}`) throw new Error('Unexpected release identity or tag');
  const zipUrl = `https://github.com/${release.repository}/releases/download/${release.tagName}/FugsChatBubbles-${release.tagName}.zip`;
  if (release.releaseZipUrl !== zipUrl) throw new Error('Unexpected release ZIP URL');
  const manifestPath = path.join(directory, 'plugins.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.plugins)) throw new Error('Unsupported directory schema');
  const plugin = manifest.plugins.find(entry => entry.slug === release.slug);
  if (!plugin) throw new Error('Chat Bubbles is missing from the shared directory; add reviewed metadata first');
  if (compareVersions(release.version, plugin.version) < 0) throw new Error('Refusing to downgrade the plugin directory');
  const url = `https://raw.githubusercontent.com/${release.repository}/${release.tagName}/FugsChatBubbles.js`;
  const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`Could not read tagged plugin: HTTP ${response.status}`);
  const chunks = []; let length = 0;
  for await (const chunk of response.body) { length += chunk.length; if (length > 2097152) throw new Error('Tagged plugin exceeds 2 MiB'); chunks.push(chunk); }
  const bytes = Buffer.concat(chunks);
  const headerVersion = /^\s*\*\s*@version\s+(\S+)/m.exec(bytes.toString('utf8'))?.[1];
  if (headerVersion && headerVersion !== release.version) throw new Error('Tagged plugin header does not match release version');
  const files = [{name: 'FugsChatBubbles.js', url, sha256: createHash('sha256').update(bytes).digest('hex')}];
  const fields = {version: release.version, releaseTag: release.tagName, releaseZipUrl: zipUrl, downloadUrl: url, files};
  const changed = Object.entries(fields).some(([key, value]) => JSON.stringify(plugin[key]) !== JSON.stringify(value));
  if (changed) Object.assign(plugin, fields, {updatedAt: new Date().toISOString()});
  const readmePath = path.join(directory, 'README.md');
  const readme = fs.readFileSync(readmePath, 'utf8');
  const start = '<!-- plugin-directory:start -->', end = '<!-- plugin-directory:end -->';
  const table = [start, '| Plugin | Version | RPG Maker | Maturity |', '| --- | --- | --- | --- |', ...manifest.plugins.map(entry => `| [${entry.name}](${entry.repositoryUrl}) | ${entry.version} | ${entry.compatibility} | ${entry.maturity} |`), end].join('\n');
  const startIndex = readme.indexOf(start), endIndex = readme.indexOf(end);
  if (startIndex < 0 || endIndex < startIndex) throw new Error('Directory README is missing generated table markers');
  const updatedReadme = readme.slice(0, startIndex) + table + readme.slice(endIndex + end.length);
  if (changed) fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  if (updatedReadme !== readme) fs.writeFileSync(readmePath, updatedReadme);
  console.log(changed ? `Updated shared directory to ${release.tagName} with SHA-256` : `Directory already contains ${release.tagName} with matching SHA-256`);
}
module.exports = {compareVersions, updateDirectory};
if (require.main === module) {
  const [directory, eventPath] = process.argv.slice(2);
  if (!directory || !eventPath) throw new Error('Pass directory checkout and release JSON paths');
  updateDirectory(directory, JSON.parse(fs.readFileSync(eventPath, 'utf8'))).catch(error => { console.error(error.message); process.exitCode = 1; });
}
