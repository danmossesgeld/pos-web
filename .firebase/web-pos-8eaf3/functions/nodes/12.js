

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/users/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.BqyMPy2r.js","_app/immutable/chunks/scheduler.CZBJOnV1.js","_app/immutable/chunks/index.x36UGmBY.js"];
export const stylesheets = ["_app/immutable/assets/12.BWEmMKPS.css"];
export const fonts = [];
