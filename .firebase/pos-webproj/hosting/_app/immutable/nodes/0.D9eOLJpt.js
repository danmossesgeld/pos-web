import{s as p,b as d,u as _,g,d as h,o as y}from"../chunks/scheduler.BELo7BN7.js";import{S as $,i as w,v as q,w as S}from"../chunks/index.BanRfVMS.js";import{g as l}from"../chunks/entry.DwvVpkrU.js";import{o as b,a as D}from"../chunks/firebase.client.Bnf0kfj9.js";import{g as v,q as C,w as F,c as A,a as E}from"../chunks/index.esm2017.C5xuyXIG.js";import{f as L}from"../chunks/feather.4YeCTLL6.js";function M(a){let o;const n=a[1].default,t=d(n,a,a[0],null);return{c(){t&&t.c()},l(e){t&&t.l(e)},m(e,s){t&&t.m(e,s),o=!0},p(e,[s]){t&&t.p&&(!o||s&1)&&_(t,n,e,e[0],o?h(n,e[0],s,null):g(e[0]),null)},i(e){o||(q(t,e),o=!0)},o(e){S(t,e),o=!1},d(e){t&&t.d(e)}}}function N(a,o,n){let{$$slots:t={},$$scope:e}=o,s=null,u=null;const f=v();return y(()=>{L.replace(),b(D,async r=>{const i=window.location.pathname;if(r){s=r.email;const m=C(A(f,"users"),F("email","==",s)),c=await E(m);c.empty?console.error("No user record found in Firestore."):(u=c.docs[0].data().type,i==="/login"&&(u==="admin"?l("/admin"):l("/user/pos")))}else i!=="/login"&&i!=="/register"&&l("/login")})}),a.$$set=r=>{"$$scope"in r&&n(0,e=r.$$scope)},[e,t]}class G extends ${constructor(o){super(),w(this,o,N,M,p,{})}}export{G as component};
