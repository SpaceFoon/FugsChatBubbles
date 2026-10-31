const fs = require("fs");

const outputPath = process.argv[2];
if (!outputPath) throw new Error("Pass the output path for the directory event JSON.");

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

const files = required("PLUGIN_FILES")
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean);

const event = {
  event_type: "plugin-release",
  client_payload: {
    slug: required("PLUGIN_SLUG"),
    name: required("PLUGIN_NAME"),
    shortName: required("SHORT_NAME"),
    version: required("VERSION"),
    tagName: required("TAG_NAME"),
    repository: required("PLUGIN_REPOSITORY"),
    releaseZipUrl: required("RELEASE_ZIP_URL"),
    files,
  },
};

fs.writeFileSync(outputPath, JSON.stringify(event), "utf8");
console.log(`Prepared directory sync event for ${event.client_payload.slug} ${event.client_payload.tagName}`);

