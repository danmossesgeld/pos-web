

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/itemlist/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.BbXulKjW.js","_app/immutable/chunks/scheduler.CZBJOnV1.js","_app/immutable/chunks/index.x36UGmBY.js"];
export const stylesheets = [];
export const fonts = [];
