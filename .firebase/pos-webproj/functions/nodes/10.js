

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/transactions/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.DdETChlI.js","_app/immutable/chunks/scheduler.BELo7BN7.js","_app/immutable/chunks/index.BanRfVMS.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/index.esm2017.C5xuyXIG.js","_app/immutable/chunks/entry.DwvVpkrU.js"];
export const stylesheets = [];
export const fonts = [];
