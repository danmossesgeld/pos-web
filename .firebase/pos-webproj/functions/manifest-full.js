export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.Ds_Y9x-R.js","app":"_app/immutable/entry/app.JBSgb6t2.js","imports":["_app/immutable/entry/start.Ds_Y9x-R.js","_app/immutable/chunks/entry.hL7wCfOX.js","_app/immutable/chunks/runtime.DQ8FtlDw.js","_app/immutable/chunks/index-client.D_hwRCBS.js","_app/immutable/entry/app.JBSgb6t2.js","_app/immutable/chunks/runtime.DQ8FtlDw.js","_app/immutable/chunks/render.DrLKwb4J.js","_app/immutable/chunks/events.aImO9cyi.js","_app/immutable/chunks/disclose-version.DPEaRatg.js","_app/immutable/chunks/index-client.D_hwRCBS.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
