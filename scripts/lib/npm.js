import path from "node:path";

import { runCommand } from "./process.js";

const NPM_COMMAND = process.platform === "win32" ? "npm.cmd" : "npm";

/**
 * @param {string} localCache
 * @param {NodeJS.ProcessEnv} [overrides]
 * @returns {NodeJS.ProcessEnv}
 */
export function createNpmEnvironment(localCache, overrides = {}) {
  /** @type {NodeJS.ProcessEnv} */
  const env = {
    ...process.env,
    npm_config_cache: localCache,
    ...overrides,
  };

  delete env.npm_config_dry_run;

  return env;
}

export function runNpm(args, options = {}) {
  return runCommand(NPM_COMMAND, args, options);
}

export function runNpmScript(scriptName, options = {}) {
  return runNpm(["run", scriptName], {
    stdio: "inherit",
    ...options,
  });
}

export function packPackage({ cwd, destination, dryRun = false, env }) {
  const args = ["pack", "--json"];

  if (dryRun) {
    args.push("--dry-run");
  }

  if (destination) {
    args.push("--pack-destination", destination);
  }

  const result = runNpm(args, {
    cwd,
    encoding: "utf8",
    env,
  });

  const [packInfo] = JSON.parse(result.stdout.toString().trim());

  if (!packInfo) {
    throw new Error("npm pack returned no package metadata");
  }

  return {
    ...packInfo,
    tarballPath: destination ? path.join(destination, packInfo.filename) : undefined,
  };
}

export function installPackage(packageSpec, { cwd, env }) {
  return runNpm(
    ["install", "--no-package-lock", "--ignore-scripts", "--no-audit", "--no-fund", packageSpec],
    {
      cwd,
      encoding: "utf8",
      env,
    }
  );
}
