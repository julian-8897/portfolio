// Render the site to a static page for a claude.ai Artifact.
// Usage: node scripts/build-artifact.mjs <outDir>
// Writes <outDir>/index.html (no html/head/body: the Artifact skeleton adds them)
// and copies the figures beside it. Fonts come from Google Fonts, the only
// stylesheet host the Artifact CSP allows.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const outDir = resolve(process.argv[2] ?? "artifact-dist");
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
  optimizeDeps: { noDiscovery: true, entries: [] },
});
try {
  const { default: Site, pauseForReducedMotion } = await vite.ssrLoadModule("/src/site/Site.tsx");
  const markup = renderToStaticMarkup(React.createElement(Site, { showCv: false }));
  const css = readFileSync(resolve("src/site/site.css"), "utf8");
  const page = `<title>Julian Chan</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:ital,wght@0,400;0,600;1,400&display=swap">
<style>
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
${css}
</style>
${markup}
<script>(${pauseForReducedMotion.toString()})();</script>
`;
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), page);
  cpSync(resolve("public/figures"), resolve(outDir, "figures"), { recursive: true });
  cpSync(resolve("public/media"), resolve(outDir, "media"), { recursive: true });
  console.log(`wrote ${outDir}/index.html (${page.length} bytes)`);
} finally {
  await vite.close();
}
