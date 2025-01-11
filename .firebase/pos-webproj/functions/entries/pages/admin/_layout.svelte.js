import { c as create_ssr_component, d as each, e as escape, f as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/firebase.client.js";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "feather-icons";
import "../../../chunks/client.js";
const css = {
  code: "body{margin:0;padding:0;box-sizing:border-box;font-family:'Inter', sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.sidebar.svelte-1fusgfx{transition:background 0.3s ease, width 0.3s ease;border-right:1px solid #e5e7eb}.top-panel.svelte-1fusgfx{height:51px;border-bottom:1px solid #e5e7eb;padding-left:16px;padding-right:16px}.sidebar-button.svelte-1fusgfx{display:flex;align-items:center;background:transparent;color:#1e3a8a;font-weight:600;padding:8px 12px;border-radius:6px;transition:background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;margin:5px 0;width:100%}.sidebar-button.svelte-1fusgfx:hover{background:rgba(59, 130, 246, 0.1);transform:translateY(-2px);box-shadow:0 4px 8px rgba(0, 0, 0, 0.2)}.logout-button.svelte-1fusgfx{margin-top:auto;color:white;background-color:#e53e3e;padding:8px 7px;border-radius:6px;width:200px}.content-area.svelte-1fusgfx{height:calc(100vh - 50px);overflow-y:auto}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount, afterUpdate } from \\"svelte\\";\\nimport { auth } from \\"../../lib/firebase/firebase.client\\";\\nimport { onAuthStateChanged, signOut } from \\"firebase/auth\\";\\nimport { getFirestore, query, where, getDocs, collection } from \\"firebase/firestore\\";\\nimport feather from \\"feather-icons\\";\\nimport { goto } from \\"$app/navigation\\";\\nlet user = null;\\nlet userType = null;\\nconst db = getFirestore();\\nconst handleLogout = async () => {\\n  try {\\n    await signOut(auth);\\n    localStorage.removeItem(\\"loggedInUser\\");\\n    window.location.href = \\"/login\\";\\n  } catch (error) {\\n    console.error(\\"Logout Error:\\", error);\\n  }\\n};\\nonMount(async () => {\\n  onAuthStateChanged(auth, async (currentUser) => {\\n    if (!currentUser) {\\n      window.location.href = \\"/login\\";\\n      return;\\n    }\\n    user = currentUser;\\n    const userQuery = query(collection(db, \\"users\\"), where(\\"email\\", \\"==\\", user.email));\\n    const querySnapshot = await getDocs(userQuery);\\n    if (querySnapshot.empty) {\\n      console.error(\\"No user record found in Firestore.\\");\\n      window.location.href = \\"/login\\";\\n      return;\\n    }\\n    userType = querySnapshot.docs[0].data().type;\\n    if (userType !== \\"admin\\" && window.location.pathname === \\"/admin\\") {\\n      window.location.href = \\"/user\\";\\n    }\\n    feather.replace();\\n  });\\n});\\nafterUpdate(() => {\\n  feather.replace();\\n});\\n<\/script>\\r\\n\\r\\n<div class=\\"flex h-screen overflow-hidden\\"> <!-- Prevent overflow -->\\r\\n    <!-- Sidebar -->\\r\\n    <aside class=\\"flex flex-col sidebar bg-white w-60 p-1.5 fixed h-full shadow-lg\\" style=\\"top: 0;\\">\\r\\n        <!-- Sidebar Navigation -->\\r\\n        <div class=\\"company-banner flex items-center justify-start my-4 border-b border-gray-300 pb-3 h-8\\"> <!-- Added height for vertical centering -->\\r\\n            <div class=\\"flex items-center\\">\\r\\n                <i data-feather=\\"codesandbox\\" class=\\"mr-2\\"></i>\\r\\n                <span class=\\"font-bold\\">COMPANY ONE</span>\\r\\n            </div>\\r\\n        </div>\\r\\n        <nav class=\\"flex flex-col flex-grow\\">\\r\\n            {#each [\\r\\n              { name: 'Inventory', text: 'Inventory List', icon: 'archive' },\\r\\n              { name: 'Users', text: 'System Users', icon: 'users' },\\r\\n              { name: 'Transactions', text: 'Transaction List', icon: 'file-text' }\\r\\n            ] as route}\\r\\n              <button\\r\\n                on:click={() => goto(\`/admin/\${route.name.toLowerCase()}\`)}\\r\\n                class=\\"sidebar-button flex items-center text-left p-2 mt-2 hover:bg-gray-200 rounded-md\\"\\r\\n              >\\r\\n                <i data-feather={route.icon} class=\\"mr-2\\"></i>\\r\\n                {route.text}\\r\\n              </button>\\r\\n            {/each}\\r\\n          </nav>\\r\\n        <!-- Logout Button -->\\r\\n        <div class=\\"flex justify-end mt-auto mr-auto ml-auto\\">\\r\\n            <button on:click={handleLogout} class=\\"logout-button flex items-center\\">\\r\\n                <i data-feather=\\"log-out\\" class=\\"mr-2\\"></i>\\r\\n                Logout\\r\\n            </button>\\r\\n        </div>\\r\\n    </aside>\\r\\n\\r\\n    <!-- Main content area -->\\r\\n    <main class=\\"flex-grow ml-60 overflow-y-auto\\">\\r\\n        <!-- Top Panel -->\\r\\n        <div class=\\"top-panel flex items-center justify-between bg-white fixed shadow-md p-2\\" style=\\"z-index: 100; height: 55px; left: 240px; right: 0;\\"> <!-- Adjusted styles -->\\r\\n            <div class=\\"flex items-center\\"></div>\\r\\n            <div class=\\"user-info text-gray-700 ml-auto\\">\\r\\n                Welcome, Admin {user ? user.email : 'Unknown'}\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n        <!-- Content Area -->\\r\\n        <div class=\\"content-area p-6 bg-gray-100\\" style=\\"margin-top: 50px;\\">\\r\\n            <slot />\\r\\n        </div>\\r\\n    </main>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    :global(body) {\\r\\n        margin: 0;\\r\\n        padding: 0;\\r\\n        box-sizing: border-box;\\r\\n        font-family: 'Inter', sans-serif;\\r\\n        -webkit-font-smoothing: antialiased;\\r\\n        -moz-osx-font-smoothing: grayscale;\\r\\n    }\\r\\n\\r\\n    .sidebar {\\r\\n        transition: background 0.3s ease, width 0.3s ease;\\r\\n        border-right: 1px solid #e5e7eb;\\r\\n    }\\r\\n\\r\\n    .top-panel {\\r\\n        height: 51px;\\r\\n        border-bottom: 1px solid #e5e7eb;\\r\\n        padding-left: 16px;\\r\\n        padding-right: 16px;\\r\\n    }\\r\\n\\r\\n    .sidebar-button {\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        background: transparent;\\r\\n        color: #1e3a8a;\\r\\n        font-weight: 600;\\r\\n        padding: 8px 12px;\\r\\n        border-radius: 6px;\\r\\n        transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;\\r\\n        margin: 5px 0;\\r\\n        width: 100%;\\r\\n    }\\r\\n\\r\\n    .sidebar-button:hover {\\r\\n        background: rgba(59, 130, 246, 0.1);\\r\\n        transform: translateY(-2px);\\r\\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\\r\\n    }\\r\\n\\r\\n    .logout-button {\\r\\n        margin-top: auto;\\r\\n        color: white;\\r\\n        background-color: #e53e3e;\\r\\n        padding: 8px 7px;\\r\\n        border-radius: 6px;\\r\\n        width: 200px;\\r\\n    }\\r\\n\\r\\n    .content-area {\\r\\n        height: calc(100vh - 50px);\\r\\n        overflow-y: auto;\\r\\n    }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAgGY,IAAM,CACV,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UAAU,CACtB,WAAW,CAAE,OAAO,CAAC,CAAC,UAAU,CAChC,sBAAsB,CAAE,WAAW,CACnC,uBAAuB,CAAE,SAC7B,CAEA,uBAAS,CACL,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CACjD,YAAY,CAAE,GAAG,CAAC,KAAK,CAAC,OAC5B,CAEA,yBAAW,CACP,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IACnB,CAEA,8BAAgB,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,WAAW,CACvB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,UAAU,CAAC,IAAI,CAAC,IAAI,CAC3E,MAAM,CAAE,GAAG,CAAC,CAAC,CACb,KAAK,CAAE,IACX,CAEA,8BAAe,MAAO,CAClB,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACnC,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC3C,CAEA,6BAAe,CACX,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,GAAG,CAAC,GAAG,CAChB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,KACX,CAEA,4BAAc,CACV,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAC1B,UAAU,CAAE,IAChB"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getFirestore();
  $$result.css.add(css);
  return `<div class="flex h-screen overflow-hidden">  <aside class="flex flex-col sidebar bg-white w-60 p-1.5 fixed h-full shadow-lg svelte-1fusgfx" style="top: 0;"> <div class="company-banner flex items-center justify-start my-4 border-b border-gray-300 pb-3 h-8" data-svelte-h="svelte-7dsi6g"> <div class="flex items-center"><i data-feather="codesandbox" class="mr-2"></i> <span class="font-bold">COMPANY ONE</span></div></div> <nav class="flex flex-col flex-grow">${each(
    [
      {
        name: "Inventory",
        text: "Inventory List",
        icon: "archive"
      },
      {
        name: "Users",
        text: "System Users",
        icon: "users"
      },
      {
        name: "Transactions",
        text: "Transaction List",
        icon: "file-text"
      }
    ],
    (route) => {
      return `<button class="sidebar-button flex items-center text-left p-2 mt-2 hover:bg-gray-200 rounded-md svelte-1fusgfx"><i${add_attribute("data-feather", route.icon, 0)} class="mr-2"></i> ${escape(route.text)} </button>`;
    }
  )}</nav>  <div class="flex justify-end mt-auto mr-auto ml-auto"><button class="logout-button flex items-center svelte-1fusgfx" data-svelte-h="svelte-r79mdz"><i data-feather="log-out" class="mr-2"></i>
                Logout</button></div></aside>  <main class="flex-grow ml-60 overflow-y-auto"> <div class="top-panel flex items-center justify-between bg-white fixed shadow-md p-2 svelte-1fusgfx" style="z-index: 100; height: 55px; left: 240px; right: 0;"> <div class="flex items-center"></div> <div class="user-info text-gray-700 ml-auto">Welcome, Admin ${escape("Unknown")}</div></div>  <div class="content-area p-6 bg-gray-100 svelte-1fusgfx" style="margin-top: 50px;">${slots.default ? slots.default({}) : ``}</div></main> </div>`;
});
export {
  Layout as default
};
