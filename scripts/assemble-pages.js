import fs from "node:fs";
import path from "node:path";

import { CSS_DIR, FLAGS_DIR, PAGES_DIR, SITE_DIR } from "./lib/config.js";
import { removeOwnedTree } from "./lib/utils.js";

if (!fs.existsSync(SITE_DIR)) {
  throw new Error(`Site directory not found: ${SITE_DIR}. Run \`npm run build\` first.`);
}

if (fs.existsSync(PAGES_DIR)) {
  removeOwnedTree(PAGES_DIR);
}
fs.mkdirSync(PAGES_DIR, { recursive: true });

fs.cpSync(SITE_DIR, PAGES_DIR, { recursive: true });
fs.cpSync(CSS_DIR, path.join(PAGES_DIR, "css"), { recursive: true });
fs.cpSync(FLAGS_DIR, path.join(PAGES_DIR, "flags"), { recursive: true });

console.log(`Pages artifact assembled at ${PAGES_DIR}`);
