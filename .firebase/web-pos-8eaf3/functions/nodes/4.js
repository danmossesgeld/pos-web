

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.D9zJG2hZ.js","_app/immutable/chunks/scheduler.CZBJOnV1.js","_app/immutable/chunks/index.x36UGmBY.js"];
export const stylesheets = [];
export const fonts = [];
