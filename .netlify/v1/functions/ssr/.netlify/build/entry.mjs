import { r as renderers } from './chunks/_@astro-renderers_XA7zEP0y.mjs';
import { a as actions } from './chunks/_astro-internal_actions_D7X_q-NV.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_B-6TDI3s.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page3 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const _page5 = () => import('./pages/_---id_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.4.2_@netlify+blobs@8.1.1_idb-keyval@6.2.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.34.9_typescript@5.8.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/astro@5.4.2_@netlify+blobs@8.1.1_idb-keyval@6.2.1_jiti@2.4.2_lightningcss@1.29.2_rollup@4.34.9_typescript@5.8.2/node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.46_react-dom@19.0.0_react@19.0.0__react@19.0.0__as_qrebcrtxb2hce5cktagme6ahnu/node_modules/@keystatic/astro/internal/keystatic-api.js", _page2],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.46_react-dom@19.0.0_react@19.0.0__react@19.0.0__as_qrebcrtxb2hce5cktagme6ahnu/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page3],
    ["src/pages/index.astro", _page4],
    ["src/pages/[...id].astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0066c237-d9f8-4475-8d25-3664f58e67a1"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
