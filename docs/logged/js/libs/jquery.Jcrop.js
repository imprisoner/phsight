!function(e){e.Jcrop=function(t,n){var o,r=e.extend({},e.Jcrop.defaults),i=navigator.userAgent.toLowerCase(),a=/msie/.test(i),s=/msie [1-6]\./.test(i);function c(e){return Math.round(e)+"px"}function u(e){return r.baseClass+"-"+e}function d(t){var n=e(t).offset();return[n.left,n.top]}function l(e){return[e.pageX-o[0],e.pageY-o[1]]}function h(t){"object"!=typeof t&&(t={}),r=e.extend(r,t),e.each(["onChange","onSelect","onRelease","onDblClick"],(function(e,t){"function"!=typeof r[t]&&(r[t]=function(){})}))}function f(e,t,n){if(o=d(M),Q.setCursor("move"===e?e:e+"-resize"),"move"===e)return Q.activateHandlers(function(e){var t=e;return U.watchKeys(),function(e){N.moveOffset([e[0]-t[0],e[1]-t[1]]),t=e,$.update()}}(t),v,n);var i=N.getFixed(),a=p(e),s=N.getCorner(p(a));N.setPressed(N.getCorner(a)),N.setCurrent(s),Q.activateHandlers(function(e,t){return function(n){if(r.aspectRatio)switch(e){case"e":case"w":n[1]=t.y+1;break;case"n":case"s":n[0]=t.x+1}else switch(e){case"e":case"w":n[1]=t.y2;break;case"n":case"s":n[0]=t.x2}N.setCurrent(n),$.update()}}(e,i),v,n)}function p(e){switch(e){case"n":return"sw";case"s":case"e":return"nw";case"w":return"ne";case"ne":return"sw";case"nw":return"se";case"se":return"nw";case"sw":return"ne"}}function g(e){return function(t){return!(r.disabled||"move"===e&&!r.allowMove||(o=d(M),E=!0,f(e,l(t)),t.stopPropagation(),t.preventDefault(),1))}}function b(e,t,n){var o=e.width(),r=e.height();o>t&&t>0&&(o=t,r=t/e.width()*e.height()),r>n&&n>0&&(r=n,o=n/e.height()*e.width()),T=e.width()/o,K=e.height()/r,e.width(o).height(r)}function w(e){return{x:e.x*T,y:e.y*K,x2:e.x2*T,y2:e.y2*K,w:e.w*T,h:e.h*K}}function v(e){var t=N.getFixed();t.w>r.minSelect[0]&&t.h>r.minSelect[1]?($.enableHandles(),$.done()):$.release(),Q.setCursor(r.allowSelect?"crosshair":"default")}function y(e){if(!r.disabled&&r.allowSelect){E=!0,o=d(M),$.disableHandles(),Q.setCursor("crosshair");var t=l(e);return N.setPressed(t),$.update(),Q.activateHandlers(m,v,"touch"===e.type.substring(0,5)),U.watchKeys(),e.stopPropagation(),e.preventDefault(),!1}}function m(e){N.setCurrent(e),$.update()}function C(){var t=e("<div></div>").addClass(u("tracker"));return a&&t.css({opacity:0,backgroundColor:"white"}),t}"object"!=typeof t&&(t=e(t)[0]),"object"!=typeof n&&(n={}),h(n);var x={border:"none",visibility:"visible",margin:0,padding:0,position:"absolute",top:0,left:0},S=e(t),k=!0;if("IMG"==t.tagName){if(0!=S[0].width&&0!=S[0].height)S.width(S[0].width),S.height(S[0].height);else{var z=new Image;z.src=S[0].src,S.width(z.width),S.height(z.height)}var M=S.clone().removeAttr("id").css(x).show();M.width(S.width()),M.height(S.height()),S.after(M).hide()}else M=S.css(x).show(),k=!1,null===r.shade&&(r.shade=!0);b(M,r.boxWidth,r.boxHeight);var O=M.width(),F=M.height(),j=e("<div />").width(O).height(F).addClass(u("holder")).css({position:"relative",backgroundColor:r.bgColor}).insertAfter(S).append(M);r.addClass&&j.addClass(r.addClass);var H=e("<div />"),D=e("<div />").width("100%").height("100%").css({zIndex:310,position:"absolute",overflow:"hidden"}),I=e("<div />").width("100%").height("100%").css("zIndex",320),B=e("<div />").css({position:"absolute",zIndex:600}).dblclick((function(){var e=N.getFixed();r.onDblClick.call(re,e)})).insertBefore(M).append(D,I);k&&(H=e("<img />").attr("src",M.attr("src")).css(x).width(O).height(F),D.append(H)),s&&B.css({overflowY:"hidden"});var P,J,A,R,T,K,E,W,Y=r.boundary,q=C().width(O+2*Y).height(F+2*Y).css({position:"absolute",top:c(-Y),left:c(-Y),zIndex:290}).mousedown(y),L=r.bgColor,X=r.bgOpacity;o=d(M);var G=function(){function e(){var e,t={},n=["touchstart","touchmove","touchend"],o=document.createElement("div");try{for(e=0;e<n.length;e++){var r=n[e],i=(r="on"+r)in o;i||(o.setAttribute(r,"return;"),i="function"==typeof o[r]),t[n[e]]=i}return t.touchstart&&t.touchend&&t.touchmove}catch(e){return!1}}return{createDragger:function(e){return function(t){return!(r.disabled||"move"===e&&!r.allowMove||(o=d(M),E=!0,f(e,l(G.cfilter(t)),!0),t.stopPropagation(),t.preventDefault(),1))}},newSelection:function(e){return y(G.cfilter(e))},cfilter:function(e){return e.pageX=e.originalEvent.changedTouches[0].pageX,e.pageY=e.originalEvent.changedTouches[0].pageY,e},isSupported:e,support:!0===r.touchSupport||!1===r.touchSupport?r.touchSupport:e()}}(),N=function(){var e,t,n=0,o=0,i=0,a=0;function s(){if(!r.aspectRatio)return t=i-n,s=a-o,P&&Math.abs(t)>P&&(i=t>0?n+P:n-P),J&&Math.abs(s)>J&&(a=s>0?o+J:o-J),R/K&&Math.abs(s)<R/K&&(a=s>0?o+R/K:o-R/K),A/T&&Math.abs(t)<A/T&&(i=t>0?n+A/T:n-A/T),n<0&&(i-=n,n-=n),o<0&&(a-=o,o-=o),i<0&&(n-=i,i-=i),a<0&&(o-=a,a-=a),i>O&&(n-=e=i-O,i-=e),a>F&&(o-=e=a-F,a-=e),n>O&&(a-=e=n-F,o-=e),o>F&&(a-=e=o-F,o-=e),d(u(n,o,i,a));var e,t,s,c,l,h,f,p=r.aspectRatio,g=r.minSize[0]/T,b=r.maxSize[0]/T,w=r.maxSize[1]/K,v=i-n,y=a-o,m=Math.abs(v),C=Math.abs(y);return 0===b&&(b=10*O),0===w&&(w=10*F),m/C<p?(l=a,h=C*p,(c=v<0?n-h:h+n)<0?(c=0,f=Math.abs((c-n)/p),l=y<0?o-f:f+o):c>O&&(c=O,f=Math.abs((c-n)/p),l=y<0?o-f:f+o)):(c=i,f=m/p,(l=y<0?o-f:o+f)<0?(l=0,h=Math.abs((l-o)*p),c=v<0?n-h:h+n):l>F&&(l=F,h=Math.abs(l-o)*p,c=v<0?n-h:h+n)),c>n?(c-n<g?c=n+g:c-n>b&&(c=n+b),l=l>o?o+(c-n)/p:o-(c-n)/p):c<n&&(n-c<g?c=n-g:n-c>b&&(c=n-b),l=l>o?o+(n-c)/p:o-(n-c)/p),c<0?(n-=c,c=0):c>O&&(n-=c-O,c=O),l<0?(o-=l,l=0):l>F&&(o-=l-F,l=F),d(u(n,o,c,l))}function c(e){return e[0]<0&&(e[0]=0),e[1]<0&&(e[1]=0),e[0]>O&&(e[0]=O),e[1]>F&&(e[1]=F),[Math.round(e[0]),Math.round(e[1])]}function u(e,t,n,o){var r=e,i=n,a=t,s=o;return n<e&&(r=n,i=e),o<t&&(a=o,s=t),[r,a,i,s]}function d(e){return{x:e[0],y:e[1],x2:e[2],y2:e[3],w:e[2]-e[0],h:e[3]-e[1]}}return{flipCoords:u,setPressed:function(e){e=c(e),i=n=e[0],a=o=e[1]},setCurrent:function(n){n=c(n),e=n[0]-i,t=n[1]-a,i=n[0],a=n[1]},getOffset:function(){return[e,t]},moveOffset:function(e){var t=e[0],r=e[1];0>n+t&&(t-=t+n),0>o+r&&(r-=r+o),F<a+r&&(r+=F-(a+r)),O<i+t&&(t+=O-(i+t)),n+=t,i+=t,o+=r,a+=r},getCorner:function(e){var t=s();switch(e){case"ne":return[t.x2,t.y];case"nw":return[t.x,t.y];case"se":return[t.x2,t.y2];case"sw":return[t.x,t.y2]}},getFixed:s}}(),V=function(){var t=!1,n=e("<div />").css({position:"absolute",zIndex:240,opacity:0}),o={top:s(),left:s().height(F),right:s().height(F),bottom:s()};function i(){return a(N.getFixed())}function a(e){o.top.css({left:c(e.x),width:c(e.w),height:c(e.y)}),o.bottom.css({top:c(e.y2),left:c(e.x),width:c(e.w),height:c(F-e.y2)}),o.right.css({left:c(e.x2),width:c(O-e.x2)}),o.left.css({width:c(e.x)})}function s(){return e("<div />").css({position:"absolute",backgroundColor:r.shadeColor||r.bgColor}).appendTo(n)}function u(){t||(t=!0,n.insertBefore(M),i(),$.setBgOpacity(1,0,1),H.hide(),d(r.shadeColor||r.bgColor,1),$.isAwake()?h(r.bgOpacity,1):h(1,1))}function d(e,t){ne(f(),e,t)}function l(){t&&(n.remove(),H.show(),t=!1,$.isAwake()?$.setBgOpacity(r.bgOpacity,1,1):($.setBgOpacity(1,1,1),$.disableHandles()),ne(j,0,1))}function h(e,o){t&&(r.bgFade&&!o?n.animate({opacity:1-e},{queue:!1,duration:r.fadeTime}):n.css({opacity:1-e}))}function f(){return n.children()}return{update:i,updateRaw:a,getShades:f,setBgColor:d,enable:u,disable:l,resize:function(e,t){o.left.css({height:c(t)}),o.right.css({height:c(t)})},refresh:function(){r.shade?u():l(),$.isAwake()&&h(r.bgOpacity)},opacity:h}}(),$=function(){var t,n=370,o={},i={},a={},s=!1;function d(t,n){var o=e("<div />").mousedown(g(t)).css({cursor:t+"-resize",position:"absolute",zIndex:n}).addClass("ord-"+t);return G.support&&o.bind("touchstart.jcrop",G.createDragger(t)),I.append(o),o}function l(){var e=N.getFixed();N.setPressed([e.x,e.y]),N.setCurrent([e.x2,e.y2]),h()}function h(e){if(t)return f(e)}function f(e){var n,o,i,a,s=N.getFixed();n=s.w,o=s.h,B.width(Math.round(n)).height(Math.round(o)),i=s.x,a=s.y,r.shade||H.css({top:c(-a),left:c(-i)}),B.css({top:c(a),left:c(i)}),r.shade&&V.updateRaw(s),t||(B.show(),r.shade?V.opacity(X):p(X,!0),t=!0),e?r.onSelect.call(re,w(s)):r.onChange.call(re,w(s))}function p(e,n,o){(t||n)&&(r.bgFade&&!o?M.animate({opacity:e},{queue:!1,duration:r.fadeTime}):M.css("opacity",e))}function b(){if(s=!0,r.allowResize)return I.show(),!0}function v(){s=!1,I.hide()}function y(e){e?(W=!0,v()):(W=!1,b())}r.dragEdges&&e.isArray(r.createDragbars)&&function(e){var t;for(t=0;t<e.length;t++)a[e[t]]=d(e[t],n++).addClass("jcrop-dragbar")}(r.createDragbars),e.isArray(r.createHandles)&&function(e){var t,o,a,s;for(t=0;t<e.length;t++)i[e[t]]=(o=e[t],void 0,s=void 0,a=r.handleSize,s=d(o,n++).css({opacity:r.handleOpacity}).addClass(u("handle")),a&&s.width(a).height(a),s)}(r.createHandles),r.drawBorders&&e.isArray(r.createBorders)&&function(t){var n,i,a,s;for(i=0;i<t.length;i++){switch(t[i]){case"n":n="hline";break;case"s":n="hline bottom";break;case"e":n="vline right";break;case"w":n="vline"}o[t[i]]=(a=n,void 0,s=e("<div />").css({position:"absolute",opacity:r.borderOpacity}).addClass(u(a)),D.append(s),s)}}(r.createBorders),e(document).bind("touchstart.jcrop-ios",(function(t){e(t.currentTarget).hasClass("jcrop-tracker")&&t.stopPropagation()}));var m=C().mousedown(g("move")).css({cursor:"move",position:"absolute",zIndex:360});return G.support&&m.bind("touchstart.jcrop",G.createDragger("move")),D.append(m),v(),{updateVisible:h,update:f,release:function(){v(),B.hide(),r.shade?V.opacity(1):p(1),t=!1,r.onRelease.call(re)},refresh:l,isAwake:function(){return t},setCursor:function(e){m.css("cursor",e)},enableHandles:b,enableOnly:function(){s=!0},showHandles:function(){s&&I.show()},disableHandles:v,animMode:y,setBgOpacity:p,done:function(){y(!1),l()}}}(),Q=function(){var t=function(){},n=function(){},o=r.trackDocument;function i(e){return t(l(e)),!1}function a(o){return o.preventDefault(),o.stopPropagation(),E&&(E=!1,n(l(o)),$.isAwake()&&r.onSelect.call(re,w(N.getFixed())),q.css({zIndex:290}),e(document).unbind(".jcrop"),t=function(){},n=function(){}),!1}function s(e){return t(l(G.cfilter(e))),!1}function c(e){return a(G.cfilter(e))}return o||q.mousemove(i).mouseup(a).mouseout(a),M.before(q),{activateHandlers:function(r,u,d){return E=!0,t=r,n=u,function(t){q.css({zIndex:450}),t?e(document).bind("touchmove.jcrop",s).bind("touchend.jcrop",c):o&&e(document).bind("mousemove.jcrop",i).bind("mouseup.jcrop",a)}(d),!1},setCursor:function(e){q.css("cursor",e)}}}(),U=function(){var t=e('<input type="radio" />').css({position:"fixed",left:"-120px",width:"12px"}).addClass("jcrop-keymgr"),n=e("<div />").css({position:"absolute",overflow:"hidden"}).append(t);function o(e,t,n){r.allowMove&&(N.moveOffset([t,n]),$.updateVisible(!0)),e.preventDefault(),e.stopPropagation()}return r.keySupport&&(t.keydown((function(e){if(e.ctrlKey||e.metaKey)return!0;var t=e.shiftKey?10:1;switch(e.keyCode){case 37:o(e,-t,0);break;case 39:o(e,t,0);break;case 38:o(e,0,-t);break;case 40:o(e,0,t);break;case 27:r.allowSelect&&$.release();break;case 9:return!0}return!1})).blur((function(e){t.hide()})),s||!r.fixedSupport?(t.css({position:"absolute",left:"-20px"}),n.append(t).insertBefore(M)):t.insertBefore(M)),{watchKeys:function(){r.keySupport&&(t.show(),t.focus())}}}();function Z(e){_([e[0]/T,e[1]/K,e[2]/T,e[3]/K]),r.onSelect.call(re,w(N.getFixed())),$.enableHandles()}function _(e){N.setPressed([e[0],e[1]]),N.setCurrent([e[2],e[3]]),$.update()}function ee(){r.disabled=!0,$.disableHandles(),$.setCursor("default"),Q.setCursor("default")}function te(){r.disabled=!1,oe()}function ne(t,n,o){var i=n||r.bgColor;r.bgFade&&e.fx.step.hasOwnProperty("backgroundColor")&&r.fadeTime&&!o?t.animate({backgroundColor:i},{queue:!1,duration:r.fadeTime}):t.css("backgroundColor",i)}function oe(e){r.allowResize?e?$.enableOnly():$.enableHandles():$.disableHandles(),Q.setCursor(r.allowSelect?"crosshair":"default"),$.setCursor(r.allowMove?"move":"default"),r.hasOwnProperty("trueSize")&&(T=r.trueSize[0]/O,K=r.trueSize[1]/F),r.hasOwnProperty("setSelect")&&(Z(r.setSelect),$.done(),delete r.setSelect),V.refresh(),r.bgColor!=L&&(ne(r.shade?V.getShades():j,r.shade&&r.shadeColor||r.bgColor),L=r.bgColor),X!=r.bgOpacity&&(X=r.bgOpacity,r.shade?V.refresh():$.setBgOpacity(X)),P=r.maxSize[0]||0,J=r.maxSize[1]||0,A=r.minSize[0]||0,R=r.minSize[1]||0,r.hasOwnProperty("outerImage")&&(M.attr("src",r.outerImage),delete r.outerImage),$.refresh()}G.support&&q.bind("touchstart.jcrop",G.newSelection),I.hide(),oe(!0);var re={setImage:function(e,t){$.release(),ee();var n=new Image;n.onload=function(){var o=n.width,i=n.height,a=r.boxWidth,s=r.boxHeight;M.width(o).height(i),M.attr("src",e),H.attr("src",e),b(M,a,s),O=M.width(),F=M.height(),H.width(O).height(F),q.width(O+2*Y).height(F+2*Y),j.width(O).height(F),V.resize(O,F),te(),"function"==typeof t&&t.call(re)},n.src=e},animateTo:function(e,t){var n=e[0]/T,o=e[1]/K,i=e[2]/T,a=e[3]/K;if(!W){var s=N.flipCoords(n,o,i,a),c=N.getFixed(),u=[c.x,c.y,c.x2,c.y2],d=u,l=r.animationDelay,h=s[0]-u[0],f=s[1]-u[1],p=s[2]-u[2],g=s[3]-u[3],b=0,w=r.swingSpeed;n=d[0],o=d[1],i=d[2],a=d[3],$.animMode(!0);var v=function(){b+=(100-b)/w,d[0]=Math.round(n+b/100*h),d[1]=Math.round(o+b/100*f),d[2]=Math.round(i+b/100*p),d[3]=Math.round(a+b/100*g),b>=99.8&&(b=100),b<100?(_(d),y()):($.done(),$.animMode(!1),"function"==typeof t&&t.call(re))};y()}function y(){window.setTimeout(v,l)}},setSelect:Z,setOptions:function(e){h(e),oe()},tellSelect:function(){return w(N.getFixed())},tellScaled:function(){return N.getFixed()},setClass:function(e){j.removeClass().addClass(u("holder")).addClass(e)},disable:ee,enable:te,cancel:function(){$.done(),Q.activateHandlers(null,null)},release:$.release,destroy:function(){j.remove(),S.show(),S.css("visibility","visible"),e(t).removeData("Jcrop")},focus:U.watchKeys,getBounds:function(){return[O*T,F*K]},getWidgetSize:function(){return[O,F]},getScaleFactor:function(){return[T,K]},getOptions:function(){return r},ui:{holder:j,selection:B}};return a&&j.bind("selectstart",(function(){return!1})),S.data("Jcrop",re),re},e.fn.Jcrop=function(t,n){var o;return this.each((function(){if(e(this).data("Jcrop")){if("api"===t)return e(this).data("Jcrop");e(this).data("Jcrop").setOptions(t)}else"IMG"==this.tagName?e.Jcrop.Loader(this,(function(){e(this).css({display:"block",visibility:"hidden"}),o=e.Jcrop(this,t),e.isFunction(n)&&n.call(o)})):(e(this).css({display:"block",visibility:"hidden"}),o=e.Jcrop(this,t),e.isFunction(n)&&n.call(o))})),this},e.Jcrop.Loader=function(t,n,o){var r=e(t),i=r[0];r.bind("load.jcloader",(function t(){i.complete?(r.unbind(".jcloader"),e.isFunction(n)&&n.call(i)):window.setTimeout(t,50)})).bind("error.jcloader",(function(t){r.unbind(".jcloader"),e.isFunction(o)&&o.call(i)})),i.complete&&e.isFunction(n)&&(r.unbind(".jcloader"),n.call(i))},e.Jcrop.defaults={allowSelect:!0,allowMove:!0,allowResize:!0,trackDocument:!0,baseClass:"jcrop",addClass:null,bgColor:"black",bgOpacity:.6,bgFade:!1,borderOpacity:.4,handleOpacity:.5,handleSize:null,aspectRatio:0,keySupport:!0,createHandles:["n","s","e","w","nw","ne","se","sw"],createDragbars:["n","s","e","w"],createBorders:["n","s","e","w"],drawBorders:!0,dragEdges:!0,fixedSupport:!0,touchSupport:null,shade:null,boxWidth:0,boxHeight:0,boundary:2,fadeTime:400,animationDelay:20,swingSpeed:3,minSelect:[0,0],maxSize:[0,0],minSize:[0,0],onChange:function(){},onSelect:function(){},onDblClick:function(){},onRelease:function(){}}}($);