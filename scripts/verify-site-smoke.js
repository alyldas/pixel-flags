import { runNpmScript } from "./lib/npm.js";

runNpmScript("verify:site");
runNpmScript("test:smoke", {
  env: {
    ...process.env,
    PIXEL_FLAGS_SMOKE_SKIP_BUILD: "1",
  },
});
