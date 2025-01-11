

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/users/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.CB2QLbZb.js","_app/immutable/chunks/scheduler.BELo7BN7.js","_app/immutable/chunks/index.BanRfVMS.js"];
export const stylesheets = ["_app/immutable/assets/12.DVD5wmE5.css"];
export const fonts = [];
