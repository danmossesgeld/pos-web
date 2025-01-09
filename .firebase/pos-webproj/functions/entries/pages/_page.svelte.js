import { e as escape_html } from "../../chunks/escaping.js";
import "clsx";
import { c as pop, p as push } from "../../chunks/index.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (is_boolean || name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
const firebaseConfig = {
  apiKey: "AIzaSyBDL_sCfuuwPGHfJvSXM69TFK8q0xNrw5A",
  authDomain: "pos-webproj.firebaseapp.com",
  projectId: "pos-webproj",
  storageBucket: "pos-webproj.firebasestorage.app",
  messagingSenderId: "257091576302",
  appId: "1:257091576302:web:2328d47fb7e52908cf2eff"
};
const app = initializeApp(firebaseConfig);
getAuth(app);
getFirestore(app);
function _page($$payload, $$props) {
  push();
  let email = "";
  let password = "";
  $$payload.out += `<div class="p-4"><input type="email"${attr("value", email)} placeholder="Email" class="block w-full mb-2 p-2 border"> <input type="password"${attr("value", password)} placeholder="Password" class="block w-full mb-4 p-2 border"> <button class="bg-blue-500 text-white p-2 rounded">Log In</button></div>`;
  pop();
}
export {
  _page as default
};
