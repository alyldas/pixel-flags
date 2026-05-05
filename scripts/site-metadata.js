import { ISSUES_URL, PACKAGE_VERSION, REPO_BLOB_MAIN_URL, REPO_URL, SITE_URL } from "./config.js";

export function buildStructuredData(coverage) {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: "Pixel Flags",
      description: "Pixel-art country flags with a flag-icons-like CSS API and static demo site.",
      url: SITE_URL,
      codeRepository: REPO_URL,
      issueTracker: ISSUES_URL,
      license: `${REPO_BLOB_MAIN_URL}/NOTICE.md`,
      programmingLanguage: ["CSS", "HTML", "JavaScript"],
      runtimePlatform: "Browser",
      keywords: ["css flags", "pixel flags", "country flags", "flag icons"],
      softwareVersion: PACKAGE_VERSION,
      releaseNotes: `${coverage.have}/${coverage.isoTotal} ISO codes currently available.`,
    },
    null,
    2
  );
}
