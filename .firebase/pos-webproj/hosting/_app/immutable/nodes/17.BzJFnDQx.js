import{s as A,n as N,r as B}from"../chunks/scheduler.BELo7BN7.js";import{S as H,i as K,e as _,s as k,c as g,a as w,k as S,f as P,d as y,l as u,g as U,h as i,m as j,n as T,t as C,b as E,j as F}from"../chunks/index.BanRfVMS.js";import{d as O}from"../chunks/firebase.client.Bnf0kfj9.js";import{c as Q,q as z,w as G,a as J}from"../chunks/index.esm2017.C5xuyXIG.js";import{g as L}from"../chunks/entry.DwvVpkrU.js";function R(p){let s,e,a,r=p[1].name+"",h,f,t,x,c=p[1].srp.toFixed(2)+"",d;return{c(){s=_("div"),e=_("p"),a=C("Item Name: "),h=C(r),f=k(),t=_("p"),x=C("SRP: $"),d=C(c),this.h()},l(l){s=g(l,"DIV",{class:!0});var n=w(s);e=g(n,"P",{class:!0});var v=w(e);a=E(v,"Item Name: "),h=E(v,r),v.forEach(y),f=P(n),t=g(n,"P",{class:!0});var D=w(t);x=E(D,"SRP: $"),d=E(D,c),D.forEach(y),n.forEach(y),this.h()},h(){u(e,"class","text-lg font-semibold mb-2"),u(t,"class","text-lg font-semibold"),u(s,"class","text-center mb-6 svelte-2fx7uo")},m(l,n){U(l,s,n),i(s,e),i(e,a),i(e,h),i(s,f),i(s,t),i(t,x),i(t,d)},p(l,n){n&2&&r!==(r=l[1].name+"")&&F(h,r),n&2&&c!==(c=l[1].srp.toFixed(2)+"")&&F(d,c)},d(l){l&&y(s)}}}function M(p){let s,e,a,r="Price Check",h,f,t,x,c,d,l,n="Add to Cart",v,D,o=p[1]&&R(p);return{c(){s=_("div"),e=_("div"),a=_("h2"),a.textContent=r,h=k(),f=_("div"),t=_("input"),x=k(),o&&o.c(),c=k(),d=_("div"),l=_("button"),l.textContent=n,this.h()},l(m){s=g(m,"DIV",{class:!0});var I=w(s);e=g(I,"DIV",{class:!0});var b=w(e);a=g(b,"H2",{class:!0,"data-svelte-h":!0}),S(a)!=="svelte-lcgh1a"&&(a.textContent=r),h=P(b),f=g(b,"DIV",{class:!0});var V=w(f);t=g(V,"INPUT",{id:!0,type:!0,class:!0,placeholder:!0}),V.forEach(y),x=P(b),o&&o.l(b),c=P(b),d=g(b,"DIV",{class:!0});var q=w(d);l=g(q,"BUTTON",{class:!0,"data-svelte-h":!0}),S(l)!=="svelte-1t37f69"&&(l.textContent=n),q.forEach(y),b.forEach(y),I.forEach(y),this.h()},h(){u(a,"class","text-2xl font-semibold mb-6 text-gray-800 text-center svelte-2fx7uo"),u(t,"id","pID"),u(t,"type","text"),u(t,"class","w-full px-4 py-3 text-sm border rounded-md svelte-2fx7uo"),u(t,"placeholder","Enter product ID"),u(f,"class","mb-6"),u(l,"class","bg-green-500 text-white px-6 py-3 rounded-lg text-lg svelte-2fx7uo"),u(d,"class","flex justify-center"),u(e,"class","bg-white p-8 rounded-lg shadow-lg w-full max-w-lg svelte-2fx7uo"),u(s,"class","flex items-center justify-center h-screen bg-gray-100 svelte-2fx7uo")},m(m,I){U(m,s,I),i(s,e),i(e,a),i(e,h),i(e,f),i(f,t),j(t,p[0]),i(e,x),o&&o.m(e,null),i(e,c),i(e,d),i(d,l),v||(D=[T(t,"input",p[4]),T(t,"keydown",p[2]),T(l,"click",p[3])],v=!0)},p(m,[I]){I&1&&t.value!==m[0]&&j(t,m[0]),m[1]?o?o.p(m,I):(o=R(m),o.c(),o.m(e,c)):o&&(o.d(1),o=null)},i:N,o:N,d(m){m&&y(s),o&&o.d(),v=!1,B(D)}}}function W(p,s,e){let a="",r=null;const h=async c=>{const d=Q(O,"Inventory"),l=z(d,G("pID","==",c));try{const n=await J(l);if(n.empty){alert("Item not found."),e(1,r=null);return}const v=n.docs[0].data();e(1,r={name:v.name,srp:v.srp})}catch(n){console.error("Error fetching item details:",n),alert("There was an error fetching the item details."),e(1,r=null)}},f=c=>{c.key==="Enter"&&h(a)},t=()=>{r&&(r.name,r.srp,r.srp,L("/user"))};function x(){a=this.value,e(0,a)}return[a,r,f,t,x]}class te extends H{constructor(s){super(),K(this,s,W,M,A,{})}}export{te as component};
