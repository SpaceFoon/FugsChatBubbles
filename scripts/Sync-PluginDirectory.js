const fs = require("fs");
const slug = process.env.PLUGIN_SLUG;
const version = process.env.VERSION;
const updatedAt = process.env.UPDATED_AT;
const releaseZipUrl = process.env.RELEASE_ZIP_URL;
const shortName = process.env.SHORT_NAME;

function findObjectBounds(source, needle) {
  const index = source.indexOf(needle);
  if (index === -1) return null;
  const brace = source.lastIndexOf("{", index);
  let depth = 0;
  for (let cursor = brace; cursor < source.length; cursor++) {
    if (source[cursor] === "{") depth++;
    else if (source[cursor] === "}") {
      depth--;
      if (depth === 0) return {start:brace, end:cursor + 1};
    }
  }
  return null;
}

function replaceObjectField(block, field, value) {
  const pattern = new RegExp(field + ':\\s*"[^"]*"');
  if (!pattern.test(block)) throw new Error(`${field} field missing in plugin listing`);
  return block.replace(pattern, `${field}: "${value}"`);
}

function patchPluginListing(source) {
  const bounds = findObjectBounds(source, `slug: "${slug}"`);
  if (!bounds) throw new Error(`Catalog slug not found: ${slug}`);
  let block = source.slice(bounds.start, bounds.end);
  const existingVersion = /version:\s*"([^"]*)"/.exec(block);
  const existingReleaseUrl = /releaseZipUrl:\s*"([^"]*)"/.exec(block);
  if (
    existingVersion && existingVersion[1] === version &&
    existingReleaseUrl && existingReleaseUrl[1] === releaseZipUrl
  ) return source;

  block = replaceObjectField(block, "version", version);
  block = replaceObjectField(block, "updatedAt", updatedAt);
  if (/releaseZipUrl:\s*"/.test(block)) {
    block = replaceObjectField(block, "releaseZipUrl", releaseZipUrl);
  } else {
    const updated = block.replace(
      /(downloadUrl:\s*(?:\n\s*)?(?:"[^"]*"|`[^`]*`),)/,
      `$1\n    releaseZipUrl: "${releaseZipUrl}",`
    );
    if (updated === block) throw new Error("Could not add releaseZipUrl to the plugin listing");
    block = updated;
  }
  return source.slice(0, bounds.start) + block + source.slice(bounds.end);
}

function patchSeed(source) {
  const bounds = findObjectBounds(source, shortName);
  if (!bounds) return source;
  let block = source.slice(bounds.start, bounds.end);
  if (/version:\s*"/.test(block)) block = replaceObjectField(block, "version", version);
  return source.slice(0, bounds.start) + block + source.slice(bounds.end);
}

const listingPath = "artifacts/rpg-plugins/src/data/plugins.ts";
const seedPath = "scripts/src/seed-plugins.ts";
const listing = fs.readFileSync(listingPath, "utf8");
fs.writeFileSync(listingPath, patchPluginListing(listing));
if (fs.existsSync(seedPath)) {
  const seed = fs.readFileSync(seedPath, "utf8");
  fs.writeFileSync(seedPath, patchSeed(seed));
}
console.log(`Updated ${slug} to ${version}: ${releaseZipUrl}`);
