import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["--test", "test/smoke.test.js"], {
  stdio: "inherit",
  env: {
    ...process.env,
    PIXEL_FLAGS_SMOKE: "1",
  },
});

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
