import fs from "node:fs";
import path from "node:path";

import { CSS_DIR, FLAGS_DIR, PROJECT_ROOT, SITE_DIR } from "./config.js";
import { removeOwnedTree } from "./safe-fs.js";

const pagesDir = path.join(PROJECT_ROOT, "_site");

if (!fs.existsSync(SITE_DIR)) {
  throw new Error(`Site directory not found: ${SITE_DIR}. Run \`npm run build\` first.`);
}

if (fs.existsSync(pagesDir)) {
  removeOwnedTree(pagesDir);
}
fs.mkdirSync(pagesDir, { recursive: true });

fs.cpSync(SITE_DIR, pagesDir, { recursive: true });
fs.cpSync(CSS_DIR, path.join(pagesDir, "css"), { recursive: true });
fs.cpSync(FLAGS_DIR, path.join(pagesDir, "flags"), { recursive: true });

console.log(`Pages artifact assembled at ${pagesDir}`);
