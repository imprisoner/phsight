(()=>{"use strict";function o(o,e){o&&$(`.${o}`).on("click",(function(o){o.stopPropagation(),$(`.${e}-menu`).show(),$("body").css("overflow-y","hidden"),$(`.${e}-menu`).on("click",(function(o){o.stopPropagation()})),$(document).one("keydown",(function(o){"Escape"===o.code&&($(`.${e}-menu`).hide(),$("body").css("overflow-y",""))})),$(`.${e}-close`).one("click",(function(o){$(`.${e}-menu`).hide(),$("body").css("overflow-y","")}))})),"burger"===e&&n(e)}function n(o=""){$(`.${o}-search-btn`).on("click",(function(n){console.log("here");const e=$(this),c=$(`.${o}-search-field`),i=e.closest("form");if(!i.hasClass("active")){function t(o){o.stopPropagation(),i.trigger("submit")}i.addClass("active"),c.trigger("focus"),e.on("click",t),c.on("click",(function(o){o.stopPropagation()})),i.on("click",(function(o){o.stopPropagation()})),$(document).on("keydown",(function(o){"Enter"===o.code&&i.trigger("submit"),"Escape"===o.code&&(i.removeClass("active"),c.trigger("blur").val(""),$(document).off(),e.off("click",t))})),$(document).on("click",(function(){i.removeClass("active"),c.trigger("blur").val(""),$(document).off(),e.off("click",t)}))}}))}$((function(){n("header"),function(o=""){const n=$(o);n.each((function(o){$(this).on("click",(function(o){n.removeClass("active"),$(this).addClass("active")}))}))}(".header-navlink"),o("header-menu-btn","burger"),window.innerWidth<1279&&o("header-user-logged","user"),n("burger"),window.innerWidth>1279&&$(".header-user-avatar").on("mouseenter",(function(){$(".user-menu").show(200),$(".user-menu").on("mouseleave",(function(){$(this).hide(200)}))}))}))})();