import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { buildPackageArtifacts } from "../scripts/lib/build.js";
import { createNpmEnvironment, installPackage, packPackage } from "../scripts/lib/npm.js";
import { runCommand } from "../scripts/lib/process.js";
import { createPackageFixture, createTempWorkspace } from "./helpers/project-fixture.js";

test("packed package installs cleanly and exposes documented subpath exports", async () => {
  const packageFixture = createPackageFixture();
  const consumerFixture = createTempWorkspace("pixel-flags-consumer-");
  const packDir = path.join(packageFixture.rootDir, "packed");
  const consumerDir = consumerFixture.rootDir;
  const localCache = path.join(consumerDir, ".npm-cache");

  try {
    buildPackageArtifacts(packageFixture.context);
    fs.mkdirSync(packDir);

    const packInfo = packPackage({
      cwd: packageFixture.rootDir,
      destination: packDir,
      env: createNpmEnvironment(localCache),
    });
    const { tarballPath } = packInfo;

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

    installPackage(tarballPath, {
      cwd: consumerDir,
      env: createNpmEnvironment(localCache),
    });
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

    runCommand(
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
  } finally {
    packageFixture.cleanup();
    consumerFixture.cleanup();
  }
});
