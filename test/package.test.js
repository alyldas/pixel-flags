import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { buildPackageArtifacts } from "../scripts/lib/build.js";
import { createPackageFixture, createTempWorkspace } from "./helpers/project-fixture.js";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function createNpmTestEnv(localCache) {
  const env = {
    ...process.env,
    npm_config_cache: localCache,
  };

  delete env.npm_config_dry_run;

  return env;
}

test("packed package installs cleanly and exposes documented subpath exports", async () => {
  const packageFixture = createPackageFixture();
  const consumerFixture = createTempWorkspace("pixel-flags-consumer-");
  const packDir = path.join(packageFixture.rootDir, "packed");
  const consumerDir = consumerFixture.rootDir;
  const localCache = path.join(consumerDir, ".npm-cache");

  try {
    buildPackageArtifacts(packageFixture.context);
    fs.mkdirSync(packDir);

    const packResult = spawnSync(npmCommand, ["pack", "--json", "--pack-destination", packDir], {
      cwd: packageFixture.rootDir,
      encoding: "utf8",
      env: createNpmTestEnv(localCache),
    });

    assert.equal(packResult.status, 0, packResult.stderr || packResult.stdout);

    const packInfo = JSON.parse(packResult.stdout.trim());
    const tarballPath = path.join(packDir, packInfo[0].filename);

    assert.ok(fs.existsSync(tarballPath));

    fs.writeFileSync(
      path.join(consumerDir, "package.json"),
      `${JSON.stringify(
        {
          name: "pixel-flags-consumer-smoke",
          private: true,
          type: "module",
        },
        null,
        2
      )}\n`
    );

    const installResult = spawnSync(
      npmCommand,
      ["install", "--no-package-lock", "--ignore-scripts", "--no-audit", "--no-fund", tarballPath],
      {
        cwd: consumerDir,
        encoding: "utf8",
        env: createNpmTestEnv(localCache),
      }
    );

    assert.equal(installResult.status, 0, installResult.stderr || installResult.stdout);
    assert.ok(
      fs.existsSync(
        path.join(consumerDir, "node_modules", "@alyldas", "pixel-flags", "CHANGELOG.md")
      )
    );
    assert.ok(
      fs.existsSync(path.join(consumerDir, "node_modules", "@alyldas", "pixel-flags", "NOTICE.md"))
    );
    assert.ok(
      !fs.existsSync(
        path.join(consumerDir, "node_modules", "@alyldas", "pixel-flags", "CONTRIBUTING.md")
      )
    );

    const installedManifest = JSON.parse(
      fs.readFileSync(
        path.join(consumerDir, "node_modules", "@alyldas", "pixel-flags", "package.json"),
        "utf8"
      )
    );
    assert.equal(installedManifest.engines, undefined);

    const resolveResult = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `
          import assert from "node:assert/strict";
          import fs from "node:fs";
          import { fileURLToPath } from "node:url";

          const cssUrl = import.meta.resolve("@alyldas/pixel-flags/css/pixel-flags.css");
          const minCssUrl = import.meta.resolve("@alyldas/pixel-flags/css/pixel-flags.min.css");
          const flagUrl = import.meta.resolve("@alyldas/pixel-flags/flags/ru.png");

          assert.ok(fs.existsSync(fileURLToPath(cssUrl)));
          assert.ok(fs.existsSync(fileURLToPath(minCssUrl)));
          assert.ok(fs.existsSync(fileURLToPath(flagUrl)));
        `,
      ],
      {
        cwd: consumerDir,
        encoding: "utf8",
      }
    );

    assert.equal(resolveResult.status, 0, resolveResult.stderr || resolveResult.stdout);
  } finally {
    packageFixture.cleanup();
    consumerFixture.cleanup();
  }
});
