(()=>{"use strict";var o={79:()=>{$((function(){!function(o=""){$(`.${o}-search-btn`).on("click",(function(n){console.log("here");const t=$(this),e=$(`.${o}-search-field`),r=t.closest("form");if(!r.hasClass("active")){function c(o){o.stopPropagation(),r.trigger("submit")}r.addClass("active"),e.trigger("focus"),t.on("click",c),e.on("click",(function(o){o.stopPropagation()})),r.on("click",(function(o){o.stopPropagation()})),$(document).on("keydown",(function(o){"Enter"===o.code&&r.trigger("submit"),"Escape"===o.code&&(r.removeClass("active"),e.trigger("blur").val(""),$(document).off(),t.off("click",c))})),$(document).on("click",(function(){r.removeClass("active"),e.trigger("blur").val(""),$(document).off(),t.off("click",c)}))}}))}("message")}))}},n={};function t(e){if(n[e])return n[e].exports;var r=n[e]={exports:{}};return o[e](r,r.exports,t),r.exports}t.m=o,t.x=o=>{},t.o=(o,n)=>Object.prototype.hasOwnProperty.call(o,n),(()=>{var o={41:0},n=[[79]],e=o=>{},r=(r,c)=>{for(var i,s,[a,l,f,u]=c,p=0,g=[];p<a.length;p++)s=a[p],t.o(o,s)&&o[s]&&g.push(o[s][0]),o[s]=0;for(i in l)t.o(l,i)&&(t.m[i]=l[i]);for(f&&f(t),r&&r(c);g.length;)g.shift()();return u&&n.push.apply(n,u),e()},c=self.webpackChunk=self.webpackChunk||[];function i(){for(var e,r=0;r<n.length;r++){for(var c=n[r],i=!0,s=1;s<c.length;s++){var a=c[s];0!==o[a]&&(i=!1)}i&&(n.splice(r--,1),e=t(t.s=c[0]))}return 0===n.length&&(t.x(),t.x=o=>{}),e}c.forEach(r.bind(null,0)),c.push=r.bind(null,c.push.bind(c));var s=t.x;t.x=()=>(t.x=s||(o=>{}),(e=i)())})(),t.x()})();