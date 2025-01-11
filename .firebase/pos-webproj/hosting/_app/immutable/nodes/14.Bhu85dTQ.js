import{s as ve,h as _e,f as le,n as pe,r as be,o as ge}from"../chunks/scheduler.BELo7BN7.js";import{S as ye,i as Ce,e as a,s as g,c as n,a as C,k as A,f as y,d as c,l as s,m as j,g as V,h as r,x as he,n as Q,q as xe,t as we,b as Ee,j as ke,y as Te}from"../chunks/index.BanRfVMS.js";import{c as Ie,a as Le}from"../chunks/firebase.client.Bnf0kfj9.js";import{g as Pe,s as Ae,d as Oe}from"../chunks/index.esm2017.C5xuyXIG.js";import{g as qe}from"../chunks/entry.DwvVpkrU.js";import{f as De}from"../chunks/feather.4YeCTLL6.js";function Ne(o){let t,e,l,d="Register";return{c(){t=a("i"),e=g(),l=a("span"),l.textContent=d,this.h()},l(u){t=n(u,"I",{"data-feather":!0}),C(t).forEach(c),e=y(u),l=n(u,"SPAN",{class:!0,"data-svelte-h":!0}),A(l)!=="svelte-17kzaxj"&&(l.textContent=d),this.h()},h(){s(t,"data-feather","user-plus"),s(l,"class","svelte-s68fv9")},m(u,f){V(u,t,f),V(u,e,f),V(u,l,f)},d(u){u&&(c(t),c(e),c(l))}}}function Ue(o){let t;return{c(){t=a("div"),this.h()},l(e){t=n(e,"DIV",{class:!0}),C(t).forEach(c),this.h()},h(){s(t,"class","spinner svelte-s68fv9")},m(e,l){V(e,t,l)},d(e){e&&c(t)}}}function me(o){let t,e;return{c(){t=a("p"),e=we(o[3]),this.h()},l(l){t=n(l,"P",{class:!0});var d=C(t);e=Ee(d,o[3]),d.forEach(c),this.h()},h(){s(t,"class","text-red-500 mt-2 text-sm text-center")},m(l,d){V(l,t,d),r(t,e)},p(l,d){d&8&&ke(e,l[3])},d(l){l&&c(t)}}}function je(o){let t,e,l,d="Register Account",u,f,b,z="Email:",B,O,H,v,N,_,E,re="Password:",X,M,Y,x,Z,q,D,ae="User Type:",$,h,k,ne="Select User Type",T,oe="Admin",I,ie="User",ee,L,F,te,W,U,ue='Already have an account? <a href="/login" class="text-purple-500 hover:underline">Login here</a>',se,fe;function ce(i,w){return i[4]?Ue:Ne}let G=ce(o),P=G(o),p=o[3]&&me(o);return{c(){t=a("div"),e=a("form"),l=a("h2"),l.textContent=d,u=g(),f=a("div"),b=a("label"),b.textContent=z,B=g(),O=a("i"),H=g(),v=a("input"),N=g(),_=a("div"),E=a("label"),E.textContent=re,X=g(),M=a("i"),Y=g(),x=a("input"),Z=g(),q=a("div"),D=a("label"),D.textContent=ae,$=g(),h=a("select"),k=a("option"),k.textContent=ne,T=a("option"),T.textContent=oe,I=a("option"),I.textContent=ie,ee=g(),L=a("button"),P.c(),te=g(),p&&p.c(),W=g(),U=a("p"),U.innerHTML=ue,this.h()},l(i){t=n(i,"DIV",{class:!0});var w=C(t);e=n(w,"FORM",{class:!0});var m=C(e);l=n(m,"H2",{class:!0,"data-svelte-h":!0}),A(l)!=="svelte-fdgrvw"&&(l.textContent=d),u=y(m),f=n(m,"DIV",{class:!0});var R=C(f);b=n(R,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),A(b)!=="svelte-1qxc58d"&&(b.textContent=z),B=y(R),O=n(R,"I",{"data-feather":!0,class:!0}),C(O).forEach(c),H=y(R),v=n(R,"INPUT",{type:!0,id:!0,class:!0}),R.forEach(c),N=y(m),_=n(m,"DIV",{class:!0});var S=C(_);E=n(S,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),A(E)!=="svelte-aq8akv"&&(E.textContent=re),X=y(S),M=n(S,"I",{"data-feather":!0,class:!0}),C(M).forEach(c),Y=y(S),x=n(S,"INPUT",{type:!0,id:!0,class:!0}),S.forEach(c),Z=y(m),q=n(m,"DIV",{class:!0});var J=C(q);D=n(J,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),A(D)!=="svelte-1i2hwbj"&&(D.textContent=ae),$=y(J),h=n(J,"SELECT",{id:!0,class:!0});var K=C(h);k=n(K,"OPTION",{"data-svelte-h":!0}),A(k)!=="svelte-1sd945t"&&(k.textContent=ne),T=n(K,"OPTION",{"data-svelte-h":!0}),A(T)!=="svelte-17op260"&&(T.textContent=oe),I=n(K,"OPTION",{"data-svelte-h":!0}),A(I)!=="svelte-1u8kdru"&&(I.textContent=ie),K.forEach(c),J.forEach(c),ee=y(m),L=n(m,"BUTTON",{type:!0,class:!0});var de=C(L);P.l(de),de.forEach(c),te=y(m),p&&p.l(m),W=y(m),U=n(m,"P",{class:!0,"data-svelte-h":!0}),A(U)!=="svelte-1pz0uns"&&(U.innerHTML=ue),m.forEach(c),w.forEach(c),this.h()},h(){s(l,"class","text-3xl font-bold mb-6 text-center text-gray-800"),s(b,"for","email"),s(b,"class","block text-gray-600 font-medium"),s(O,"data-feather","mail"),s(O,"class","input-icon svelte-s68fv9"),s(v,"type","email"),s(v,"id","email"),v.required=!0,s(v,"class","input-with-icon border border-gray-300 rounded w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 svelte-s68fv9"),s(f,"class","relative mb-4"),s(E,"for","password"),s(E,"class","block text-gray-600 font-medium"),s(M,"data-feather","lock"),s(M,"class","input-icon svelte-s68fv9"),s(x,"type","password"),s(x,"id","password"),x.required=!0,s(x,"class","input-with-icon border border-gray-300 rounded w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 svelte-s68fv9"),s(_,"class","relative mb-4"),s(D,"for","userType"),s(D,"class","block text-gray-600 font-medium"),k.__value="",j(k,k.__value),k.disabled=!0,T.__value="admin",j(T,T.__value),I.__value="user",j(I,I.__value),s(h,"id","userType"),h.required=!0,s(h,"class","border border-gray-300 rounded w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"),o[2]===void 0&&_e(()=>o[8].call(h)),s(q,"class","mb-4"),s(L,"type","submit"),s(L,"class",F=le(`bg-gradient-to-t from-red-400 to-amber-400 text-white rounded-lg font-semibold transition-transform duration-300 w-full flex items-center justify-center 
            ${o[4]?"bg-purple-600":"hover:bg-purple-600"}`)+" svelte-s68fv9"),s(U,"class","mt-4 text-center text-gray-600"),s(e,"class",le("bg-white p-10 rounded-lg shadow-lg w-96 transition-opacity duration-500 fade-in")+" svelte-s68fv9"),s(t,"class","flex items-center justify-center h-screen bg-gradient-to-r from-red-400 to-amber-400")},m(i,w){V(i,t,w),r(t,e),r(e,l),r(e,u),r(e,f),r(f,b),r(f,B),r(f,O),r(f,H),r(f,v),j(v,o[0]),r(e,N),r(e,_),r(_,E),r(_,X),r(_,M),r(_,Y),r(_,x),j(x,o[1]),r(e,Z),r(e,q),r(q,D),r(q,$),r(q,h),r(h,k),r(h,T),r(h,I),he(h,o[2],!0),r(e,ee),r(e,L),P.m(L,null),r(e,te),p&&p.m(e,null),r(e,W),r(e,U),se||(fe=[Q(v,"input",o[6]),Q(x,"input",o[7]),Q(h,"change",o[8]),Q(e,"submit",xe(o[5]))],se=!0)},p(i,[w]){w&1&&v.value!==i[0]&&j(v,i[0]),w&2&&x.value!==i[1]&&j(x,i[1]),w&4&&he(h,i[2]),G!==(G=ce(i))&&(P.d(1),P=G(i),P&&(P.c(),P.m(L,null))),w&16&&F!==(F=le(`bg-gradient-to-t from-red-400 to-amber-400 text-white rounded-lg font-semibold transition-transform duration-300 w-full flex items-center justify-center 
            ${i[4]?"bg-purple-600":"hover:bg-purple-600"}`)+" svelte-s68fv9")&&s(L,"class",F),i[3]?p?p.p(i,w):(p=me(i),p.c(),p.m(e,W)):p&&(p.d(1),p=null)},i:pe,o:pe,d(i){i&&c(t),P.d(),p&&p.d(),se=!1,be(fe)}}}function Me(o,t,e){let l="",d="",u="",f="",b=!1;const z=Pe(),B=async()=>{e(4,b=!0),e(3,f="");try{const _=(await Ie(Le,l,d)).user,E={email:_.email,type:u||null};await Ae(Oe(z,"users",_.uid),E),qe("/login")}catch(N){console.error("Registration Error:",N),e(3,f=N.message)}finally{e(4,b=!1)}};ge(()=>{De.replace()});function O(){l=this.value,e(0,l)}function H(){d=this.value,e(1,d)}function v(){u=Te(this),e(2,u)}return[l,d,u,f,b,B,O,H,v]}class Fe extends ye{constructor(t){super(),Ce(this,t,Me,je,ve,{})}}export{Fe as component};
