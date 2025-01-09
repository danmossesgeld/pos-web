

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/transactions/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.skWiXUp1.js","_app/immutable/chunks/scheduler.CZBJOnV1.js","_app/immutable/chunks/index.x36UGmBY.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/index.esm2017.BMDGLfoS.js","_app/immutable/chunks/entry.BRlZ4at3.js"];
export const stylesheets = [];
export const fonts = [];
