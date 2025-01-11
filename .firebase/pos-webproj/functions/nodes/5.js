

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.B9HOHcIL.js","_app/immutable/chunks/scheduler.BELo7BN7.js","_app/immutable/chunks/index.BanRfVMS.js"];
export const stylesheets = [];
export const fonts = [];
