import { spawnSync } from "node:child_process";

import { REPO_URL } from "./config.js";

const repoArg = process.argv[2];
const repoSlug = repoArg || extractRepoSlug(REPO_URL);

if (!repoSlug) {
  throw new Error(
    "Repository slug is required. Pass owner/repo explicitly: `node scripts/github-hardening.js owner/repo`."
  );
}

ensureRepositoryExists(repoSlug);
applyMainBranchProtection(repoSlug);
ensureTagProtection(repoSlug, "v*");

console.log(`GitHub hardening applied for ${repoSlug}.`);

function extractRepoSlug(repositoryUrl) {
  if (typeof repositoryUrl !== "string" || repositoryUrl.length === 0) {
    return undefined;
  }

  const normalized = repositoryUrl.replace(/^git\+/, "").replace(/\.git$/, "");
  const match = normalized.match(/github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)$/);
  const owner = match?.groups?.owner;
  const repo = match?.groups?.repo;

  if (!owner || !repo) {
    return undefined;
  }

  return `${owner}/${repo}`;
}

function runGh(args, options = {}) {
  const result = spawnSync("gh", args, {
    encoding: "utf8",
    input: options.input,
  });

  if (result.error?.code === "ENOENT") {
    throw new Error("GitHub CLI is not installed. Install `gh` and retry.");
  }

  if (result.status !== 0) {
    const stderr = result.stderr?.trim();
    const stdout = result.stdout?.trim();
    const message = stderr || stdout || `gh ${args.join(" ")} failed with code ${result.status}`;
    throw new Error(message);
  }

  return result.stdout;
}

function ghApi(repo, path, method = "GET", body) {
  const args = [
    "api",
    "--method",
    method,
    "-H",
    "Accept: application/vnd.github+json",
    "-H",
    "X-GitHub-Api-Version: 2022-11-28",
    `repos/${repo}/${path}`,
  ];

  if (typeof body !== "undefined") {
    args.push("--input", "-");
  }

  const stdout = runGh(args, {
    input: typeof body === "undefined" ? undefined : `${JSON.stringify(body)}\n`,
  });

  return stdout.length > 0 ? JSON.parse(stdout) : undefined;
}

function ensureRepositoryExists(repo) {
  runGh(["repo", "view", repo, "--json", "nameWithOwner"]);
}

function applyMainBranchProtection(repo) {
  const payload = {
    required_status_checks: {
      strict: true,
      contexts: ["CI / Fast Checks", "CI / Browser Smoke"],
    },
    enforce_admins: true,
    required_pull_request_reviews: {
      dismiss_stale_reviews: true,
      require_code_owner_reviews: true,
      required_approving_review_count: 1,
      require_last_push_approval: true,
    },
    restrictions: null,
    required_linear_history: true,
    allow_force_pushes: false,
    allow_deletions: false,
    block_creations: true,
    required_conversation_resolution: true,
    lock_branch: false,
    allow_fork_syncing: true,
  };

  ghApi(repo, "branches/main/protection", "PUT", payload);
}

function ensureTagProtection(repo, pattern) {
  const existing = ghApi(repo, "tags/protection", "GET");
  const found = Array.isArray(existing) && existing.some((item) => item.pattern === pattern);

  if (found) {
    return;
  }

  ghApi(repo, "tags/protection", "POST", { pattern });
}
