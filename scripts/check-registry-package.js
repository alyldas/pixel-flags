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
const registry = getRegistry(process.argv.slice(2));
const token = registry.requiresAuth
  ? process.env.NODE_AUTH_TOKEN || process.env.GITHUB_TOKEN
  : undefined;

if (!packageScope) {
  console.error(`Package name must be scoped for registry verification: ${packageName}`);
  process.exit(1);
}

if (registry.requiresAuth && !token) {
  console.error(`Set NODE_AUTH_TOKEN or GITHUB_TOKEN to check ${registry.label}.`);
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
  const npmConfig = [`${packageScope}:registry=${registry.url}`];

  if (token) {
    npmConfig.push(`//${new URL(registry.url).host}/:_authToken=\${NODE_AUTH_TOKEN}`);
  }

  fs.writeFileSync(userConfigPath, `${npmConfig.join("\n")}\n`, "utf8");

  const envOverrides = {
    npm_config_userconfig: userConfigPath,
  };

  if (token) {
    envOverrides.NODE_AUTH_TOKEN = token;
  }

  const env = createNpmEnvironment(localCache, envOverrides);

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

  console.log(`Installed ${packageName}@${packageVersion} from ${registry.label}.`);
} finally {
  removeOwnedTree(consumerDir);
}

function getRegistry(args) {
  const registryName =
    args.find((value) => value.startsWith("--registry="))?.slice("--registry=".length) ?? "github";
  const registries = {
    github: {
      label: "GitHub Packages",
      requiresAuth: true,
      url: "https://npm.pkg.github.com",
    },
    npm: {
      label: "npm",
      requiresAuth: false,
      url: "https://registry.npmjs.org",
    },
  };
  const registry = registries[registryName];

  if (!registry) {
    throw new Error(`Unsupported registry: ${registryName}`);
  }

  return registry;
}

function getPackageScope(value) {
  const match = /^(@[^/]+)\//.exec(value);
  return match?.[1];
}
