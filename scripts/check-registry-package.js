import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { PACKAGE_JSON_PATH } from "./lib/config.js";
import { createNpmEnvironment, installPackage } from "./lib/npm.js";
import { runCommand } from "./lib/process.js";
import { removeOwnedTree } from "./lib/utils.js";

const packageManifest = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"));
const packageName = packageManifest.name;
const packageVersion = packageManifest.version;
const packageScope = getPackageScope(packageName);
const token = process.env.NODE_AUTH_TOKEN || process.env.GITHUB_TOKEN;

if (!packageScope) {
  console.error(`Package name must be scoped for GitHub Packages: ${packageName}`);
  process.exit(1);
}

if (!token) {
  console.error("Set NODE_AUTH_TOKEN or GITHUB_TOKEN with read:packages to check GitHub Packages.");
  process.exit(1);
}

const consumerDir = fs.mkdtempSync(path.join(os.tmpdir(), "pixel-flags-registry-"));
const localCache = path.join(consumerDir, ".npm-cache");
const userConfigPath = path.join(consumerDir, ".npmrc");

try {
  fs.writeFileSync(
    path.join(consumerDir, "package.json"),
    `${JSON.stringify(
      {
        name: "pixel-flags-registry-smoke",
        private: true,
        type: "module",
      },
      null,
      2
    )}\n`
  );
  fs.writeFileSync(
    userConfigPath,
    `${packageScope}:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=\${NODE_AUTH_TOKEN}\n`,
    "utf8"
  );

  const env = createNpmEnvironment(localCache, {
    NODE_AUTH_TOKEN: token,
    npm_config_userconfig: userConfigPath,
  });

  installPackage(`${packageName}@${packageVersion}`, {
    cwd: consumerDir,
    env,
  });

  runCommand(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
        import assert from "node:assert/strict";
        import fs from "node:fs";
        import { fileURLToPath } from "node:url";

        const cssUrl = import.meta.resolve("${packageName}/css/pixel-flags.css");
        const flagUrl = import.meta.resolve("${packageName}/flags/ru.png");

        assert.ok(fs.existsSync(fileURLToPath(cssUrl)));
        assert.ok(fs.existsSync(fileURLToPath(flagUrl)));
      `,
    ],
    {
      cwd: consumerDir,
      encoding: "utf8",
      env,
    }
  );

  console.log(`Installed ${packageName}@${packageVersion} from GitHub Packages.`);
} finally {
  removeOwnedTree(consumerDir);
}

function getPackageScope(value) {
  const match = /^(@[^/]+)\//.exec(value);
  return match?.[1];
}
