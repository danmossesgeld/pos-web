import { c as create_ssr_component, d as each, e as escape, f as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/firebase.client.js";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "feather-icons";
const css = {
  code: "body{margin:0;padding:0;box-sizing:border-box;font-family:'Inter', sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.sidebar.svelte-10lamfv{transition:background 0.3s ease, width 0.3s ease;border-right:1px solid #e5e7eb}.sidebar-button.svelte-10lamfv{display:flex;align-items:center;background:transparent;color:#1e3a8a;font-weight:600;padding:10px 16px;border-radius:6px;transition:background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;margin:5px 0;width:100%;text-align:left}.sidebar-button.svelte-10lamfv:hover{background:rgba(59, 130, 246, 0.1);transform:translateY(-2px);box-shadow:0 4px 8px rgba(0, 0, 0, 0.2)}.logout-button.svelte-10lamfv{margin-top:16px;color:white;background-color:#e53e3e;padding:10px 16px;border-radius:6px;width:100%;text-align:left}.content-area.svelte-10lamfv{padding-right:16px}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount, afterUpdate } from \\"svelte\\";\\nimport { auth } from \\"../../lib/firebase/firebase.client\\";\\nimport { onAuthStateChanged, signOut } from \\"firebase/auth\\";\\nimport { getFirestore, query, where, getDocs, collection } from \\"firebase/firestore\\";\\nimport feather from \\"feather-icons\\";\\nlet user = null;\\nlet userType = null;\\nconst db = getFirestore();\\nconst handleLogout = async () => {\\n  try {\\n    await signOut(auth);\\n    localStorage.removeItem(\\"loggedInUser\\");\\n    window.location.href = \\"/login\\";\\n  } catch (error) {\\n    console.error(\\"Logout Error:\\", error);\\n  }\\n};\\nonMount(async () => {\\n  onAuthStateChanged(auth, async (currentUser) => {\\n    if (!currentUser) {\\n      window.location.href = \\"/login\\";\\n      return;\\n    }\\n    user = currentUser;\\n    const userQuery = query(collection(db, \\"users\\"), where(\\"email\\", \\"==\\", user.email));\\n    const querySnapshot = await getDocs(userQuery);\\n    if (querySnapshot.empty) {\\n      console.error(\\"No user record found in Firestore.\\");\\n      window.location.href = \\"/login\\";\\n      return;\\n    }\\n    userType = querySnapshot.docs[0].data().type;\\n    if (userType !== \\"admin\\" && window.location.pathname === \\"/admin\\") {\\n      window.location.href = \\"/user\\";\\n    }\\n    feather.replace();\\n  });\\n});\\nafterUpdate(() => {\\n  feather.replace();\\n});\\n<\/script>\\r\\n\\r\\n<div class=\\"flex h-screen overflow-hidden\\"> <!-- Prevent overflow -->\\r\\n  <!-- Sidebar -->\\r\\n  <aside class=\\"flex flex-col sidebar bg-white w-60 p-1.5 fixed h-full shadow-lg\\" style=\\"top: 0;\\">\\r\\n      <!-- Sidebar Navigation -->\\r\\n      <div class=\\"company-banner flex items-center justify-start my-4 border-b border-gray-300 pb-3 h-16\\">\\r\\n          <div class=\\"flex items-center\\">\\r\\n              <i data-feather=\\"codesandbox\\" class=\\"mr-2\\"></i>\\r\\n              <span class=\\"font-bold text-lg\\">COMPANY ONE</span>\\r\\n          </div>\\r\\n      </div>\\r\\n      <nav class=\\"flex flex-col flex-grow\\">\\r\\n        {#each [\\r\\n            { name: 'pos', text: 'POS', icon: 'dollar-sign' },\\r\\n            { name: 'pricecheck', text: 'Price Check', icon: 'search' }\\r\\n        ] as route}\\r\\n            <button on:click={() => window.location.href = \`/user/\${route.name}\`} class=\\"sidebar-button\\">\\r\\n                <i data-feather={route.icon} class=\\"mr-2\\"></i>\\r\\n                {route.text}\\r\\n            </button>\\r\\n        {/each}\\r\\n    </nav>\\r\\n    \\r\\n      <!-- Logout Button and Welcome Message -->\\r\\n      <div class=\\"flex flex-col mt-auto justify-center items-center\\">\\r\\n          <div class=\\"welcome-message mb-2 text-sm text-gray-700\\">\\r\\n              Welcome, {user ? user.email : 'Unknown'}\\r\\n          </div>\\r\\n          <button on:click={handleLogout} class=\\"logout-button flex items-center\\">\\r\\n              <i data-feather=\\"log-out\\" class=\\"mr-2\\"></i>\\r\\n              Logout\\r\\n          </button>\\r\\n      </div>\\r\\n  </aside>\\r\\n\\r\\n  <!-- Main content area -->\\r\\n  <main class=\\"flex-grow ml-60 overflow-y-auto h-screen\\">\\r\\n      <!-- Content Area -->\\r\\n      <div class=\\"content-area bg-gray-100 h-full v-full\\">\\r\\n          <slot />\\r\\n      </div>\\r\\n  </main>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  :global(body) {\\r\\n      margin: 0;\\r\\n      padding: 0;\\r\\n      box-sizing: border-box;\\r\\n      font-family: 'Inter', sans-serif;\\r\\n      -webkit-font-smoothing: antialiased;\\r\\n      -moz-osx-font-smoothing: grayscale;\\r\\n  }\\r\\n\\r\\n  .sidebar {\\r\\n      transition: background 0.3s ease, width 0.3s ease;\\r\\n      border-right: 1px solid #e5e7eb;\\r\\n  }\\r\\n\\r\\n  .sidebar-button {\\r\\n      display: flex;\\r\\n      align-items: center;\\r\\n      background: transparent;\\r\\n      color: #1e3a8a;\\r\\n      font-weight: 600;\\r\\n      padding: 10px 16px; /* Adjust padding for consistent sizing */\\r\\n      border-radius: 6px;\\r\\n      transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;\\r\\n      margin: 5px 0;\\r\\n      width: 100%;\\r\\n      text-align: left;\\r\\n  }\\r\\n\\r\\n  .sidebar-button:hover {\\r\\n      background: rgba(59, 130, 246, 0.1);\\r\\n      transform: translateY(-2px);\\r\\n      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\\r\\n  }\\r\\n\\r\\n  .logout-button {\\r\\n      margin-top: 16px;\\r\\n      color: white;\\r\\n      background-color: #e53e3e;\\r\\n      padding: 10px 16px;\\r\\n      border-radius: 6px;\\r\\n      width: 100%;\\r\\n      text-align: left;\\r\\n  }\\r\\n\\r\\n .content-area {\\r\\n      padding-right: 16px; /* Padding for content area */\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAuFU,IAAM,CACV,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,UAAU,CACtB,WAAW,CAAE,OAAO,CAAC,CAAC,UAAU,CAChC,sBAAsB,CAAE,WAAW,CACnC,uBAAuB,CAAE,SAC7B,CAEA,uBAAS,CACL,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CACjD,YAAY,CAAE,GAAG,CAAC,KAAK,CAAC,OAC5B,CAEA,8BAAgB,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,WAAW,CACvB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,UAAU,CAAC,IAAI,CAAC,IAAI,CAC3E,MAAM,CAAE,GAAG,CAAC,CAAC,CACb,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAChB,CAEA,8BAAe,MAAO,CAClB,UAAU,CAAE,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACnC,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC3C,CAEA,6BAAe,CACX,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IAChB,CAED,4BAAc,CACT,aAAa,CAAE,IACnB"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getFirestore();
  $$result.css.add(css);
  return `<div class="flex h-screen overflow-hidden">  <aside class="flex flex-col sidebar bg-white w-60 p-1.5 fixed h-full shadow-lg svelte-10lamfv" style="top: 0;"> <div class="company-banner flex items-center justify-start my-4 border-b border-gray-300 pb-3 h-16" data-svelte-h="svelte-1tg5xm0"><div class="flex items-center"><i data-feather="codesandbox" class="mr-2"></i> <span class="font-bold text-lg">COMPANY ONE</span></div></div> <nav class="flex flex-col flex-grow">${each(
    [
      {
        name: "pos",
        text: "POS",
        icon: "dollar-sign"
      },
      {
        name: "pricecheck",
        text: "Price Check",
        icon: "search"
      }
    ],
    (route) => {
      return `<button class="sidebar-button svelte-10lamfv"><i${add_attribute("data-feather", route.icon, 0)} class="mr-2"></i> ${escape(route.text)} </button>`;
    }
  )}</nav>  <div class="flex flex-col mt-auto justify-center items-center"><div class="welcome-message mb-2 text-sm text-gray-700">Welcome, ${escape("Unknown")}</div> <button class="logout-button flex items-center svelte-10lamfv" data-svelte-h="svelte-11c25sn"><i data-feather="log-out" class="mr-2"></i>
              Logout</button></div></aside>  <main class="flex-grow ml-60 overflow-y-auto h-screen"> <div class="content-area bg-gray-100 h-full v-full svelte-10lamfv">${slots.default ? slots.default({}) : ``}</div></main> </div>`;
});
export {
  Layout as default
};
