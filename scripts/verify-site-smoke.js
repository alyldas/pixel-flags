import { spawnSync } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

runNpmScript("verify:site");
runNpmScript("test:smoke", {
  ...process.env,
  PIXEL_FLAGS_SMOKE_SKIP_BUILD: "1",
});

function runNpmScript(scriptName, env = process.env) {
  const result = spawnSync(npmCommand, ["run", scriptName], {
    env,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
