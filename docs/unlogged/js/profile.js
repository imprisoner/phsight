/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/profile.less":
/*!*****************************!*\
  !*** ./styles/profile.less ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./js/profile.js":
/*!***********************!*\
  !*** ./js/profile.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_jquery_justifiedGallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/jquery.justifiedGallery */ "./js/libs/jquery.justifiedGallery.js");
/* harmony import */ var _libs_jquery_justifiedGallery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_libs_jquery_justifiedGallery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./js/utils.js");




jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('DOMContentLoaded', function () {

    // setting slider and navtabs animation

    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.initSlider)(680)
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_2__.initNavTabs)('.tab-link')

    // setting pagination

    ;(0,_utils__WEBPACK_IMPORTED_MODULE_2__.initPagination)(680)

    // setting JustifiedGallery plugin

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.justified-gallery').justifiedGallery({
        rowHeight: 310,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })

    //header animations

    ;(0,_utils__WEBPACK_IMPORTED_MODULE_2__.expandSearch)('header')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_2__.initNavTabs)('.header-navlink')

    // popups

    ;(0,_utils__WEBPACK_IMPORTED_MODULE_2__.togglePopup)('header-menu-btn', 'burger')
    if(window.innerWidth < 1279) (0,_utils__WEBPACK_IMPORTED_MODULE_2__.togglePopup)('header-user-logged', 'user')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_2__.expandSearch)('burger')
    // init small nav

    const smallTabs = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.favorites-navlink')
    smallTabs.each(function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('click', function (e) {
            smallTabs.removeClass('active')
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active')
        })
    })

    // desktop user menu hover appearance
    if (window.innerWidth > 1279) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-user-avatar').on('mouseenter', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').show(200)
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').on('mouseleave', function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hide(200)
            })
        })
    }

    // more-btn
    // togglePopup('nav-more', 'dots')
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-more').on('click', function(e) {
        
        e.stopPropagation()
        const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dots-menu')
        target.on('click', function(e) {
            e.stopPropagation()
        })
        target.toggle()


        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('keydown', function (e) {

            if (e.code === 'Escape') {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dots-menu').hide()
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('.nav-more').trigger('blur')
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off()
            }
            
        })
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('click', function (e) {

                jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dots-menu').hide()
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off()
           
        })
    })

    // AJAX

    // $('.complain-member-button').on('click', function(){
    //     showTroubleTicketForm('Member', 460877);
    // });

    // $('.ignore-member-button').on('click', function(){
    //     $.ajax({
    //         type: 'POST',
    //         url: '/member/ajaxAddToIgnored/',
    //         data: {'id' : 460877},
    //         success: function(msg){
    //             if(msg == 'success'){
    //                 msg = 'Автор добавлен в черный список';
    //             }
    //             var popup=new PopUp({autoCloseTimeout: 3000, closeOnClick: true});
    //             popup.setContent('<h3>Внимание</h3>' + msg);
    //             popup.open();
    //         }
    //     });
    // });

    // $('.block-member-button').on('click', function(){
    //     $.ajax({
    //         type: 'POST',
    //         url: '/moderator/ajaxBlockMember',
    //         data: {'target_id' : 460877},
    //         success: function(msg){
    //             if(msg == 'error'){
    //                 msg = 'Ошибка! Повторите позже.';
    //             }
    //             var popup=new PopUp();
    //             popup.setContent('<h3>Блокирование пользователя</h3>' + msg);
    //             popup.open();
    //         }
    //     });
    // });

    // $('body').delegate('#block_form', 'submit', function(){
    //     var $this = $(this);
    //     $.ajax({
    //         type: "POST",
    //         url: "/moderator/ajaxBlockMember",
    //         data: $this.serialize()
    //     })
    //         .done(function( msg ) {
    //             var popup=new PopUp();
    //             popup.setContent('<h3>Внимание</h3>' + msg);
    //             popup.open();
    //             setTimeout(function(){location.reload();}, 1500);
    //         });

    //     return false;
    // });
})

/***/ }),

/***/ "./profile.js":
/*!********************!*\
  !*** ./profile.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/profile */ "./js/profile.js");
/* harmony import */ var _styles_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/common */ "./styles/common.less");
/* harmony import */ var _styles_profile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/profile */ "./styles/profile.less");




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"profile": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./profile.js","vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_swiper_esm_components_core_core-class_js","styles_common_less-js_utils_js","js_libs_jquery_justifiedGallery_js"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	__webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvcHJvZmlsZS5sZXNzP2VhN2QiLCJ3ZWJwYWNrOi8vLy4vanMvcHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9wcm9maWxlLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUNpQjtBQU92Qjs7QUFFaEIsNkNBQUM7O0FBRUQ7O0FBRUEsSUFBSSxrREFBVTtBQUNkLElBQUksb0RBQVc7O0FBRWY7O0FBRUEsSUFBSSx1REFBYzs7QUFFbEI7O0FBRUEsSUFBSSw2Q0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQSxJQUFJLHFEQUFZO0FBQ2hCLElBQUksb0RBQVc7O0FBRWY7O0FBRUEsSUFBSSxvREFBVztBQUNmLGlDQUFpQyxtREFBVztBQUM1QyxJQUFJLHFEQUFZO0FBQ2hCOztBQUVBLHNCQUFzQiw2Q0FBQztBQUN2QjtBQUNBLFFBQVEsNkNBQUM7QUFDVDtBQUNBLFlBQVksNkNBQUM7QUFDYixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsUUFBUSw2Q0FBQztBQUNULFlBQVksNkNBQUM7QUFDYixZQUFZLDZDQUFDO0FBQ2IsZ0JBQWdCLDZDQUFDO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLElBQUksNkNBQUM7O0FBRUw7QUFDQSx1QkFBdUIsNkNBQUM7QUFDeEI7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0EsUUFBUSw2Q0FBQzs7QUFFVDtBQUNBLGdCQUFnQiw2Q0FBQztBQUNqQixnQkFBZ0IsNkNBQUM7QUFDakIsZ0JBQWdCLDZDQUFDO0FBQ2pCOztBQUVBLFNBQVM7QUFDVCxRQUFRLDZDQUFDOztBQUVULGdCQUFnQiw2Q0FBQztBQUNqQixnQkFBZ0IsNkNBQUM7O0FBRWpCLFNBQVM7QUFDVCxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMkNBQTJDO0FBQ25GO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG1CQUFtQjtBQUM1RCxnQkFBZ0I7O0FBRWhCO0FBQ0EsUUFBUTtBQUNSLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7QUMvSW9CO0FBQ0c7Ozs7Ozs7VUNEeEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0sb0JBQW9CO1dBQzFCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0M7V0FDQTtXQUNBLGdCQUFnQiwyQkFBMkI7V0FDM0M7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLDRDQUE0QztXQUM1QztXQUNBLEU7Ozs7VUNwRkE7VUFDQSIsImZpbGUiOiJqcy9wcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xyXG5pbXBvcnQgJy4vbGlicy9qcXVlcnkuanVzdGlmaWVkR2FsbGVyeSdcclxuaW1wb3J0IHtcclxuICAgIGluaXRTbGlkZXIsXHJcbiAgICBpbml0TmF2VGFicyxcclxuICAgIGluaXRQYWdpbmF0aW9uLFxyXG4gICAgdG9nZ2xlUG9wdXAsXHJcbiAgICBleHBhbmRTZWFyY2gsXHJcbn0gZnJvbSAnLi91dGlscydcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIHNldHRpbmcgc2xpZGVyIGFuZCBuYXZ0YWJzIGFuaW1hdGlvblxyXG5cclxuICAgIGluaXRTbGlkZXIoNjgwKVxyXG4gICAgaW5pdE5hdlRhYnMoJy50YWItbGluaycpXHJcblxyXG4gICAgLy8gc2V0dGluZyBwYWdpbmF0aW9uXHJcblxyXG4gICAgaW5pdFBhZ2luYXRpb24oNjgwKVxyXG5cclxuICAgIC8vIHNldHRpbmcgSnVzdGlmaWVkR2FsbGVyeSBwbHVnaW5cclxuXHJcbiAgICAkKCcuanVzdGlmaWVkLWdhbGxlcnknKS5qdXN0aWZpZWRHYWxsZXJ5KHtcclxuICAgICAgICByb3dIZWlnaHQ6IDMxMCxcclxuICAgICAgICBtYXJnaW5zOiAyLFxyXG4gICAgICAgIGxhc3RSb3c6ICdqdXN0aWZ5JyxcclxuICAgICAgICByYW5kb21pemU6IHRydWVcclxuICAgIH0pXHJcblxyXG4gICAgLy9oZWFkZXIgYW5pbWF0aW9uc1xyXG5cclxuICAgIGV4cGFuZFNlYXJjaCgnaGVhZGVyJylcclxuICAgIGluaXROYXZUYWJzKCcuaGVhZGVyLW5hdmxpbmsnKVxyXG5cclxuICAgIC8vIHBvcHVwc1xyXG5cclxuICAgIHRvZ2dsZVBvcHVwKCdoZWFkZXItbWVudS1idG4nLCAnYnVyZ2VyJylcclxuICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDwgMTI3OSkgdG9nZ2xlUG9wdXAoJ2hlYWRlci11c2VyLWxvZ2dlZCcsICd1c2VyJylcclxuICAgIGV4cGFuZFNlYXJjaCgnYnVyZ2VyJylcclxuICAgIC8vIGluaXQgc21hbGwgbmF2XHJcblxyXG4gICAgY29uc3Qgc21hbGxUYWJzID0gJCgnLmZhdm9yaXRlcy1uYXZsaW5rJylcclxuICAgIHNtYWxsVGFicy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHNtYWxsVGFicy5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBkZXNrdG9wIHVzZXIgbWVudSBob3ZlciBhcHBlYXJhbmNlXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiAxMjc5KSB7XHJcbiAgICAgICAgJCgnLmhlYWRlci11c2VyLWF2YXRhcicpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcudXNlci1tZW51Jykuc2hvdygyMDApXHJcbiAgICAgICAgICAgICQoJy51c2VyLW1lbnUnKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgyMDApXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBtb3JlLWJ0blxyXG4gICAgLy8gdG9nZ2xlUG9wdXAoJ25hdi1tb3JlJywgJ2RvdHMnKVxyXG4gICAgJCgnLm5hdi1tb3JlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSAkKCcuZG90cy1tZW51JylcclxuICAgICAgICB0YXJnZXQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0YXJnZXQudG9nZ2xlKClcclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uZSgna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICAgICAgJCgnLmRvdHMtbWVudScpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdi1tb3JlJykudHJpZ2dlcignYmx1cicpXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChkb2N1bWVudCkub25lKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmRvdHMtbWVudScpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKClcclxuICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBBSkFYXHJcblxyXG4gICAgLy8gJCgnLmNvbXBsYWluLW1lbWJlci1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgIHNob3dUcm91YmxlVGlja2V0Rm9ybSgnTWVtYmVyJywgNDYwODc3KTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8vICQoJy5pZ25vcmUtbWVtYmVyLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgJC5hamF4KHtcclxuICAgIC8vICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgLy8gICAgICAgICB1cmw6ICcvbWVtYmVyL2FqYXhBZGRUb0lnbm9yZWQvJyxcclxuICAgIC8vICAgICAgICAgZGF0YTogeydpZCcgOiA0NjA4Nzd9LFxyXG4gICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihtc2cpe1xyXG4gICAgLy8gICAgICAgICAgICAgaWYobXNnID09ICdzdWNjZXNzJyl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbXNnID0gJ9CQ0LLRgtC+0YAg0LTQvtCx0LDQstC70LXQvSDQsiDRh9C10YDQvdGL0Lkg0YHQv9C40YHQvtC6JztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIHZhciBwb3B1cD1uZXcgUG9wVXAoe2F1dG9DbG9zZVRpbWVvdXQ6IDMwMDAsIGNsb3NlT25DbGljazogdHJ1ZX0pO1xyXG4gICAgLy8gICAgICAgICAgICAgcG9wdXAuc2V0Q29udGVudCgnPGgzPtCS0L3QuNC80LDQvdC40LU8L2gzPicgKyBtc2cpO1xyXG4gICAgLy8gICAgICAgICAgICAgcG9wdXAub3BlbigpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyAkKCcuYmxvY2stbWVtYmVyLWJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgJC5hamF4KHtcclxuICAgIC8vICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgLy8gICAgICAgICB1cmw6ICcvbW9kZXJhdG9yL2FqYXhCbG9ja01lbWJlcicsXHJcbiAgICAvLyAgICAgICAgIGRhdGE6IHsndGFyZ2V0X2lkJyA6IDQ2MDg3N30sXHJcbiAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKG1zZyl7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihtc2cgPT0gJ2Vycm9yJyl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbXNnID0gJ9Ce0YjQuNCx0LrQsCEg0J/QvtCy0YLQvtGA0LjRgtC1INC/0L7Qt9C20LUuJztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIHZhciBwb3B1cD1uZXcgUG9wVXAoKTtcclxuICAgIC8vICAgICAgICAgICAgIHBvcHVwLnNldENvbnRlbnQoJzxoMz7QkdC70L7QutC40YDQvtCy0LDQvdC40LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPPC9oMz4nICsgbXNnKTtcclxuICAgIC8vICAgICAgICAgICAgIHBvcHVwLm9wZW4oKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy8gJCgnYm9keScpLmRlbGVnYXRlKCcjYmxvY2tfZm9ybScsICdzdWJtaXQnLCBmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAvLyAgICAgJC5hamF4KHtcclxuICAgIC8vICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAvLyAgICAgICAgIHVybDogXCIvbW9kZXJhdG9yL2FqYXhCbG9ja01lbWJlclwiLFxyXG4gICAgLy8gICAgICAgICBkYXRhOiAkdGhpcy5zZXJpYWxpemUoKVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCBtc2cgKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB2YXIgcG9wdXA9bmV3IFBvcFVwKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBwb3B1cC5zZXRDb250ZW50KCc8aDM+0JLQvdC40LzQsNC90LjQtTwvaDM+JyArIG1zZyk7XHJcbiAgICAvLyAgICAgICAgICAgICBwb3B1cC5vcGVuKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bG9jYXRpb24ucmVsb2FkKCk7fSwgMTUwMCk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyB9KTtcclxufSkiLCJpbXBvcnQgJy4vanMvcHJvZmlsZSdcclxuaW1wb3J0ICcuL3N0eWxlcy9jb21tb24nXHJcbmltcG9ydCAnLi9zdHlsZXMvcHJvZmlsZSciLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuLy8gSXQncyBlbXB0eSBhcyBzb21lIHJ1bnRpbWUgbW9kdWxlIGhhbmRsZXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Jcbl9fd2VicGFja19yZXF1aXJlX18ueCA9IHggPT4ge31cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IG1vZHVsZVsnZGVmYXVsdCddIDpcblx0XHQoKSA9PiBtb2R1bGU7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicHJvZmlsZVwiOiAwXG59O1xuXG52YXIgZGVmZXJyZWRNb2R1bGVzID0gW1xuXHRbXCIuL3Byb2ZpbGUuanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2pxdWVyeV9kaXN0X2pxdWVyeV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfc3dpcGVyX2VzbV9jb21wb25lbnRzX2NvcmVfY29yZS1jbGFzc19qc1wiLFwic3R5bGVzX2NvbW1vbl9sZXNzLWpzX3V0aWxzX2pzXCIsXCJqc19saWJzX2pxdWVyeV9qdXN0aWZpZWRHYWxsZXJ5X2pzXCJdXG5dO1xuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxudmFyIGNoZWNrRGVmZXJyZWRNb2R1bGVzID0geCA9PiB7fTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWUsIGV4ZWN1dGVNb2R1bGVzXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG5cdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuXHR9XG5cblx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuXHRpZihleGVjdXRlTW9kdWxlcykgZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyk7XG5cblx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG5cdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpO1xuXG5mdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwoKSB7XG5cdHZhciByZXN1bHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcblx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuXHRcdH1cblx0fVxuXHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxudmFyIHN0YXJ0dXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIHJlc2V0IHN0YXJ0dXAgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGNhbGxlZCBhZ2FpbiB3aGVuIG1vcmUgc3RhcnR1cCBjb2RlIGlzIGFkZGVkXG5cdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHN0YXJ0dXAgfHwgKHggPT4ge30pO1xuXHRyZXR1cm4gKGNoZWNrRGVmZXJyZWRNb2R1bGVzID0gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKSgpO1xufTsiLCIvLyBydW4gc3RhcnR1cFxuX193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG4iXSwic291cmNlUm9vdCI6IiJ9