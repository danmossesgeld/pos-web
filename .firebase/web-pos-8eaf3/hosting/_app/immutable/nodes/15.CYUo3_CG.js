import{s as xt,n as it,r as vt}from"../chunks/scheduler.CZBJOnV1.js";import{S as gt,i as Dt,e as p,s as S,t as M,c as f,a as k,d as D,f as N,k as K,b as Y,l as d,g as yt,h as e,m as dt,n as J,j as G,o as bt}from"../chunks/index.x36UGmBY.js";import{e as ut}from"../chunks/each.D6YF6ztN.js";import{d as X}from"../chunks/firebase.client.DeUXI1W3.js";import{e as ht,c as tt,q as pt,w as ft,a as st,u as It,i as Tt}from"../chunks/index.esm2017.BMDGLfoS.js";function mt(a,s,o){const n=a.slice();return n[2]=s[o].pID,n[17]=s[o].name,n[18]=s[o].srp,n[19]=s[o].quantity,n[20]=s[o].total,n[22]=o,n}function _t(a){let s,o,n=a[2]+"",r,C,E,q=a[17]+"",I,g,T,A=a[18]?`$${a[18].toFixed(2)}`:"$0.00",B,P,b,m,F="-",R,z,w=a[19]+"",l,_,t,i="+",v,O,H=a[20]?`$${a[20].toFixed(2)}`:"$0.00",$,U,u,c,x="Delete",h,Q,j;function et(){return a[8](a[22])}function V(){return a[9](a[22])}function W(){return a[10](a[22])}return{c(){s=p("tr"),o=p("td"),r=M(n),C=S(),E=p("td"),I=M(q),g=S(),T=p("td"),B=M(A),P=S(),b=p("td"),m=p("button"),m.textContent=F,R=S(),z=p("span"),l=M(w),_=S(),t=p("button"),t.textContent=i,v=S(),O=p("td"),$=M(H),U=S(),u=p("td"),c=p("button"),c.textContent=x,h=S(),this.h()},l(L){s=f(L,"TR",{class:!0});var y=k(s);o=f(y,"TD",{class:!0});var at=k(o);r=Y(at,n),at.forEach(D),C=N(y),E=f(y,"TD",{class:!0});var nt=k(E);I=Y(nt,q),nt.forEach(D),g=N(y),T=f(y,"TD",{class:!0});var lt=k(T);B=Y(lt,A),lt.forEach(D),P=N(y),b=f(y,"TD",{class:!0});var Z=k(b);m=f(Z,"BUTTON",{class:!0,"data-svelte-h":!0}),K(m)!=="svelte-z88q22"&&(m.textContent=F),R=N(Z),z=f(Z,"SPAN",{class:!0});var ot=k(z);l=Y(ot,w),ot.forEach(D),_=N(Z),t=f(Z,"BUTTON",{class:!0,"data-svelte-h":!0}),K(t)!=="svelte-wkoovt"&&(t.textContent=i),Z.forEach(D),v=N(y),O=f(y,"TD",{class:!0});var rt=k(O);$=Y(rt,H),rt.forEach(D),U=N(y),u=f(y,"TD",{class:!0});var ct=k(u);c=f(ct,"BUTTON",{class:!0,"data-svelte-h":!0}),K(c)!=="svelte-zki8u3"&&(c.textContent=x),ct.forEach(D),h=N(y),y.forEach(D),this.h()},h(){d(o,"class","px-4 py-2"),d(E,"class","px-4 py-2"),d(T,"class","px-4 py-2"),d(m,"class","bg-yellow-500 text-white px-4 py-2 rounded-md"),d(z,"class","mx-2"),d(t,"class","bg-yellow-500 text-white px-4 py-2 rounded-md"),d(b,"class","px-4 py-2"),d(O,"class","px-4 py-2"),d(c,"class","bg-red-500 text-white px-4 py-2 rounded-md"),d(u,"class","px-4 py-2"),d(s,"class","border-b")},m(L,y){yt(L,s,y),e(s,o),e(o,r),e(s,C),e(s,E),e(E,I),e(s,g),e(s,T),e(T,B),e(s,P),e(s,b),e(b,m),e(b,R),e(b,z),e(z,l),e(b,_),e(b,t),e(s,v),e(s,O),e(O,$),e(s,U),e(s,u),e(u,c),e(s,h),Q||(j=[J(m,"click",et),J(t,"click",V),J(c,"click",W)],Q=!0)},p(L,y){a=L,y&1&&n!==(n=a[2]+"")&&G(r,n),y&1&&q!==(q=a[17]+"")&&G(I,q),y&1&&A!==(A=a[18]?`$${a[18].toFixed(2)}`:"$0.00")&&G(B,A),y&1&&w!==(w=a[19]+"")&&G(l,w),y&1&&H!==(H=a[20]?`$${a[20].toFixed(2)}`:"$0.00")&&G($,H)},d(L){L&&D(s),Q=!1,vt(j)}}}function wt(a){let s,o,n,r,C,E="Items List",q,I,g,T,A='<tr class="bg-gray-200"><th class="px-4 py-2 text-left">Product ID</th> <th class="px-4 py-2 text-left">Name</th> <th class="px-4 py-2 text-left">SRP</th> <th class="px-4 py-2 text-left">Quantity</th> <th class="px-4 py-2 text-left">Total</th> <th class="px-4 py-2 text-left">Actions</th></tr>',B,P,b,m,F,R="Total:",z,w,l,_=a[1].toFixed(2)+"",t,i,v,O="FINALIZE",H,$,U=ut(a[0]),u=[];for(let c=0;c<U.length;c+=1)u[c]=_t(mt(a,U,c));return{c(){s=p("div"),o=p("div"),n=p("input"),r=S(),C=p("h2"),C.textContent=E,q=S(),I=p("div"),g=p("table"),T=p("thead"),T.innerHTML=A,B=S(),P=p("tbody");for(let c=0;c<u.length;c+=1)u[c].c();b=S(),m=p("div"),F=p("span"),F.textContent=R,z=S(),w=p("span"),l=M("$"),t=M(_),i=S(),v=p("button"),v.textContent=O,this.h()},l(c){s=f(c,"DIV",{class:!0});var x=k(s);o=f(x,"DIV",{class:!0});var h=k(o);n=f(h,"INPUT",{id:!0,type:!0,class:!0,placeholder:!0}),h.forEach(D),r=N(x),C=f(x,"H2",{class:!0,"data-svelte-h":!0}),K(C)!=="svelte-1o58hdg"&&(C.textContent=E),q=N(x),I=f(x,"DIV",{class:!0});var Q=k(I);g=f(Q,"TABLE",{id:!0,class:!0});var j=k(g);T=f(j,"THEAD",{"data-svelte-h":!0}),K(T)!=="svelte-iziud6"&&(T.innerHTML=A),B=N(j),P=f(j,"TBODY",{});var et=k(P);for(let L=0;L<u.length;L+=1)u[L].l(et);et.forEach(D),j.forEach(D),Q.forEach(D),b=N(x),m=f(x,"DIV",{class:!0});var V=k(m);F=f(V,"SPAN",{class:!0,"data-svelte-h":!0}),K(F)!=="svelte-1b482hq"&&(F.textContent=R),z=N(V),w=f(V,"SPAN",{class:!0});var W=k(w);l=Y(W,"$"),t=Y(W,_),W.forEach(D),i=N(V),v=f(V,"BUTTON",{class:!0,"data-svelte-h":!0}),K(v)!=="svelte-z5ahfu"&&(v.textContent=O),V.forEach(D),x.forEach(D),this.h()},h(){d(n,"id","pID"),d(n,"type","text"),d(n,"class","w-1/3 px-4 py-2 text-sm border rounded-md"),d(n,"placeholder","Scan product ID here.."),d(o,"class","mb-4"),d(C,"class","text-xl font-semibold mb-4 text-gray-800 svelte-1hk5ht"),d(g,"id","cartTable"),d(g,"class","min-w-full table-auto"),d(I,"class","flex-grow overflow-auto max-h-[calc(100vh-200px)]"),d(F,"class","text-xl font-semibold svelte-1hk5ht"),d(w,"class","text-2xl text-gray-800 svelte-1hk5ht"),d(v,"class","bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition svelte-1hk5ht"),d(m,"class","fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 svelte-1hk5ht"),d(s,"class","flex flex-col p-6 bg-gray-100 rounded-lg shadow-lg h-screen relative svelte-1hk5ht")},m(c,x){yt(c,s,x),e(s,o),e(o,n),dt(n,a[2]),e(s,r),e(s,C),e(s,q),e(s,I),e(I,g),e(g,T),e(g,B),e(g,P);for(let h=0;h<u.length;h+=1)u[h]&&u[h].m(P,null);e(s,b),e(s,m),e(m,F),e(m,z),e(m,w),e(w,l),e(w,t),e(m,i),e(m,v),H||($=[J(n,"input",a[7]),J(n,"keydown",a[6]),J(v,"click",a[5])],H=!0)},p(c,[x]){if(x&4&&n.value!==c[2]&&dt(n,c[2]),x&25){U=ut(c[0]);let h;for(h=0;h<U.length;h+=1){const Q=mt(c,U,h);u[h]?u[h].p(Q,x):(u[h]=_t(Q),u[h].c(),u[h].m(P,null))}for(;h<u.length;h+=1)u[h].d(1);u.length=U.length}x&2&&_!==(_=c[1].toFixed(2)+"")&&G(t,_)},i:it,o:it,d(c){c&&D(s),bt(u,c),H=!1,vt($)}}}function kt(a,s,o){let n="",r=[],C=0,E=0,q=0,I=0;const g=async l=>{const _=tt(X,"Inventory"),t=pt(_,ft("pID","==",l));try{const i=await st(t);if(i.empty)return alert("Item not found."),null;const v=i.docs[0].data();return{name:v.name,srp:v.srp,cost:v.cost}}catch(i){return console.error("Error fetching item details:",i),alert("There was an error fetching the item details."),null}},T=async()=>{if(!n){alert("Please enter a valid product ID.");return}const l=await g(n);if(!l)return;const{name:_,srp:t}=l,i=r.findIndex(v=>v.pID===n);i!==-1?(o(0,r[i].quantity+=1,r),o(0,r[i].total=r[i].srp*r[i].quantity,r)):o(0,r=[...r,{pID:n,name:_,srp:t,quantity:1,total:t}]),o(2,n="")},A=(l,_)=>{const t=r[l];t.quantity+=_,t.quantity<1&&(t.quantity=1),t.total=t.srp*t.quantity,o(0,r=[...r])},B=l=>{o(0,r=r.filter((_,t)=>t!==l))},P=async()=>{const l=tt(X,"Transactions"),t=(await st(l)).size+1;return`TID${String(t).padStart(8,"0")}`},b=async()=>{if(r.length===0){alert("Your cart is empty!");return}try{const l=await P();E=0,q=0,I=0;for(const t of r){const i=await g(t.pID);i&&(E+=i.cost*t.quantity,q+=t.srp*t.quantity)}I=q-E;const _={DateTime:new Date().toISOString(),TotalCost:E,TotalSrp:q,TotalIncome:I};await ht(tt(X,"Transactions"),{id:l,..._});for(const t of r){const i=await g(t.pID);i&&await ht(tt(X,"TransactionItems"),{id:l,pID:t.pID,name:t.name,quantity:t.quantity,srp:t.srp,cost:i.cost})}for(const t of r){const i=pt(tt(X,"Inventory"),ft("pID","==",t.pID)),v=await st(i);if(!v.empty){const O=v.docs[0].ref;await It(O,{stocks:Tt(-t.quantity)})}}alert("Transaction finalized successfully!"),o(0,r=[])}catch(l){console.error("Error during checkout:",l),alert("There was an error during the checkout process.")}},m=l=>{l.key==="Enter"&&T()};function F(){n=this.value,o(2,n)}const R=l=>A(l,-1),z=l=>A(l,1),w=l=>B(l);return a.$$.update=()=>{a.$$.dirty&1&&o(1,C=r.reduce((l,_)=>l+_.total,0))},[r,C,n,A,B,b,m,F,R,z,w]}class At extends gt{constructor(s){super(),Dt(this,s,kt,wt,xt,{})}}export{At as component};
