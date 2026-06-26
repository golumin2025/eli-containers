/**
 * Post-build script for Cloudflare Workers deployment.
 *
 * Astro's actions system generates a template-literal dynamic import:
 *   await import(`._modules/${moduleName}.mjs`)
 * which wrangler's esbuild pass cannot resolve. This script:
 *   1. Enumerates all files in dist/_worker.js/_modules/
 *   2. Replaces the template literal with a static module map in the actions chunk
 *   3. Re-bundles the entire worker into a single file with esbuild
 */

import { build } from "esbuild";
import { readdir, readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const workerDir = join(root, "dist", "_worker.js");
const chunksDir = join(workerDir, "chunks");
const modulesDir = join(workerDir, "_modules");

async function patchActionsChunk() {
  let moduleNames = [];
  try {
    const files = await readdir(modulesDir);
    moduleNames = files.filter((f) => f.endsWith(".mjs")).map((f) => f.replace(".mjs", ""));
  } catch {
    return; // no _modules dir — actions not in use
  }

  if (moduleNames.length === 0) return;

  const chunks = await readdir(chunksDir);
  const actionsChunk = chunks.find((f) => f.includes("astro-internal_actions"));
  if (!actionsChunk) {
    console.log("No actions chunk found, skipping patch");
    return;
  }

  const chunkPath = join(chunksDir, actionsChunk);
  let code = await readFile(chunkPath, "utf8");

  // Build a static lookup map for all known action modules.
  // The chunk lives in chunks/ so the relative path to _modules/ goes up one level.
  const mapEntries = moduleNames
    .map((n) => `  "${n}": () => import("./../_modules/${n}.mjs")`)
    .join(",\n");
  const preamble = `const __CF_ACTION_MODULES__ = {\n${mapEntries}\n};\n\n`;

  // Replace: await import(`._modules/${varName}.mjs`)
  const patched = code.replace(
    /await\s+import\(`\.?\/_modules\/\$\{([^}]+)\}\.mjs`\)/g,
    (_match, varName) => `await __CF_ACTION_MODULES__[${varName}]()`,
  );

  if (patched === code) {
    console.log("Template-literal pattern not found in actions chunk (may already be patched)");
    return;
  }

  await writeFile(chunkPath, preamble + patched);
  console.log(`Patched ${actionsChunk} (${moduleNames.length} action modules inlined)`);
}

async function bundle() {
  await build({
    entryPoints: [join(workerDir, "index.js")],
    bundle: true,
    outfile: join(workerDir, "index-bundled.js"),
    format: "esm",
    platform: "browser",
    target: "es2022",
    external: ["__STATIC_CONTENT_MANIFEST", "cloudflare:*", "node:*"],
    conditions: ["worker", "browser"],
    mainFields: ["browser", "module", "main"],
    logLevel: "warning",
  });
  console.log("Bundled → dist/_worker.js/index-bundled.js");
}

await patchActionsChunk();
await bundle();
