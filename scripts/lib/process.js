import { spawnSync } from "node:child_process";

export function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, options);

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const output = result.stderr || result.stdout;
    const detail =
      typeof output === "string" || Buffer.isBuffer(output) ? output.toString().trim() : "";
    throw new Error(detail || `${command} exited with status ${result.status ?? "unknown"}`);
  }

  return result;
}
