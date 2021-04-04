/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/index.less":
/*!***************************!*\
  !*** ./styles/index.less ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.less */ "./styles/index.less");
/* harmony import */ var _js_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/index */ "./js/index.js");



/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/esm/components/core/core-class.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/esm/components/navigation/navigation.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/esm/components/autoplay/autoplay.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/esm/components/effect-fade/effect-fade.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/esm/components/effect-coverflow/effect-coverflow.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./js/utils.js");




swiper__WEBPACK_IMPORTED_MODULE_2__.default.use([swiper__WEBPACK_IMPORTED_MODULE_3__.default, swiper__WEBPACK_IMPORTED_MODULE_4__.default, swiper__WEBPACK_IMPORTED_MODULE_5__.default, swiper__WEBPACK_IMPORTED_MODULE_6__.default])

new swiper__WEBPACK_IMPORTED_MODULE_2__.default('.swiper-container', {
    autoplay: {
        delay: 7000,
        disableOnInteraction: false
    },
    effect: 'fade',
    navigation: {
        nextEl: '.slider-btn-next',
        prevEl: '.slider-btn-prev',
        disabledClass: 'slider-btn-disabled'
    },
})

// header expanding search

;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.expandSearch)('header')


// popup listeners
;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('header-menu-btn', 'burger')
;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('header-user-logged', 'user')

/***/ }),

/***/ "./js/pagination.js":
/*!**************************!*\
  !*** ./js/pagination.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */



const Pagination = {

    code: '',

    // --------------------
    // Utility
    // --------------------

    // converting initialize data
    Extend: function (data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step === 0 ? 0 : data.step || 3;
    },

    // add pages by number (from [s] to [f])
    Add: function (s, f) {
        for (let i = s; i < f; i++) {
            Pagination.code += '<a class="pagination-page-btn">' + i + '</a>';
        }
    },

    // add last page with separator
    Last: function () {
        Pagination.code += '<i class="pagination-separator">...</i><a class="pagination-page-btn">' + Pagination.size + '</a>';
    },

    // add first page with separator
    First: function () {
        Pagination.code += '<a class="pagination-page-btn">1</a><i class="pagination-separator">...</i>';
    },



    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function () {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
    },

    // previous page
    Prev: function () {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
    },

    // next page
    Next: function () {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
    },



    // --------------------
    // Script
    // --------------------

    // binding pages
    Bind: function () {
        console.log('inside bind', Pagination.e[0])
        const a = Pagination.e[0].getElementsByClassName('pagination-page-btn');
        for (let i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'pagination-page-btn current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    // write pagination
    Finish: function () {
        console.log('code: ', Pagination.code)
        Pagination.e[0].innerHTML = ''
        // without JQuery
        // Pagination.e[0].insertAdjacentHTML('beforeend', Pagination.code)
        const html = jquery__WEBPACK_IMPORTED_MODULE_0___default()(Pagination.code).css('display', 'none')
            .fadeIn(500)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pagination-page-container').append(html);
        Pagination.code = '';
        Pagination.Bind();
    },
    // find pagination type
    Start: function () {
        if (Pagination.step === 0) {
            console.log(this.step)
            if (Pagination.page < 2) {
                Pagination.Add(1, 3)
                Pagination.Last()
            } else if (Pagination.page > Pagination.size - 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - 1, Pagination.size + 1);
            } else {
                Pagination.First();
                Pagination.Add(Pagination.page, Pagination.page + 1);
                Pagination.Last()
            }
        } else {
            if (Pagination.size < Pagination.step * 2 + 6) {
                Pagination.Add(1, Pagination.size + 1);
            } else if (Pagination.page < Pagination.step * 2 + 1) {
                Pagination.Add(1, Pagination.step * 2 + 4);
                Pagination.Last();
            } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
            } else {
                Pagination.First();
                Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                Pagination.Last();
            }
        }

        Pagination.Finish();
    },



    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function (e) {
        const nav = e[0].getElementsByTagName('a');
        console.log('inside btns', nav)
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },

    // create skeleton
    Create: function (e) {

        const html =
            `<a class="pagination-page-prev"><i class="fas fa-chevron-left"></i></a> 
            <div class="pagination-page-container"></div>
            <a class="pagination-page-next"><i class="fas fa-chevron-right"></i></a>`

        console.log('after create', e)
        e[0].insertAdjacentHTML('beforeend', html)
        Pagination.e = e[0].getElementsByClassName('pagination-page-container');
        Pagination.Buttons(e);
    },

    // init
    Init: function (e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
};

// exporting

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/* * * * * * * * * * * * * * * * *
 * Initialization
 * * * * * * * * * * * * * * * * */

/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initSlider": () => /* binding */ initSlider,
/* harmony export */   "initNavTabs": () => /* binding */ initNavTabs,
/* harmony export */   "initPagination": () => /* binding */ initPagination,
/* harmony export */   "togglePopup": () => /* binding */ togglePopup,
/* harmony export */   "expandSearch": () => /* binding */ expandSearch
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/esm/components/core/core-class.js");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./js/pagination.js");




// setting slider

function initSlider(breakpoint = 0, clickSlide = true) {
    console.log('slider init')
    let sliderInstance = window.innerWidth < breakpoint ?
        new swiper__WEBPACK_IMPORTED_MODULE_2__.default('.swiper-container', {
            slidesPerView: 'auto',
            // speed: 100,
            slideToClickedSlide: clickSlide,
            freeMode: true
        }) :
        null

    return sliderInstance
}

// setting navtabs animation

function initNavTabs(breakpoint = 0, sliderInstance) {

    const marker = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab-marker')
    const tabs = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab-link')

    function indicator(target, shift = 0) {
        if (shift >= 0) {
            marker.css('left', target.offsetLeft - shift)
        } else {
            marker.css('left', target.offsetLeft + shift)
        }
        marker.css('width', target.offsetWidth + 9)
    }

    tabs.each(function (i) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('click', function (e) {
            const target = e.target
            tabs.removeClass('active')
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active')
            if (sliderInstance) {
                const translate = sliderInstance.translate
                indicator(target, 5 - translate)
            } else
                indicator(target, 5)
        })
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('active')) {
            indicator(this, -4)
        }
    })
    if (sliderInstance) {
        sliderInstance.on('setTranslate', () => {
            const translate = sliderInstance.translate
            marker.css('left', jquery__WEBPACK_IMPORTED_MODULE_0___default()('.active')[0].offsetLeft + translate - 5)
        })
    }
}

// setting pagination

function initPagination(breakpoint) {

    const options = {
        size: 105,
        page: 1,
        step: 1
    }

    if (window.innerWidth < breakpoint) {
        options.step = 0
    }

    _pagination__WEBPACK_IMPORTED_MODULE_1__.default.Init(document.getElementsByClassName('pagination'), options)

}

// user-menu and burger-menu
/** 
 * Adds listeners and toggles popups
 * @param   {String} target element you click
 * @param   {String} popup popup you call
 */
function togglePopup(target, popup) {
    if (target) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${target}`).on('click', function (e) {
            e.stopPropagation()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-menu`).show()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").css("overflow-y", "hidden");
        })

        jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-close`).on('click', function (evt) {
            evt.stopPropagation()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-menu`).hide()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").css("overflow-y", "");
        })
    }
    if (popup === 'burger') {
        expandSearch(popup)
    }
}

// expanding search

function expandSearch(area = '') {

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${area}-search-btn`).on('click', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search').toggleClass('active')
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search').hasClass('active')) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${area}-search-field`).trigger('focus')
        } else jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${area}-search-field`).trigger('blur').val('')

    })
}

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
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./index.js","vendors-node_modules_jquery_dist_jquery_js-node_modules_swiper_esm_components_core_core-class_js","vendors-node_modules_swiper_esm_components_autoplay_autoplay_js-node_modules_swiper_esm_compo-dd8c44"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvaW5kZXgubGVzcz84ODQ5Iiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDQTRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FOO0FBTVA7QUFJQzs7QUFFaEIsK0NBQVUsRUFBRSwyQ0FBVSxFQUFFLDJDQUFRLEVBQUUsMkNBQVUsRUFBRSwyQ0FBZTs7QUFFN0QsSUFBSSwyQ0FBTTtBQUNWO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7O0FBRUEscURBQVk7OztBQUdaO0FBQ0Esb0RBQVc7QUFDWCxvREFBVyw4Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDWDtBQUNBO0FBQ0E7QUFDQTtBQUNzQjs7O0FBR3RCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVM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O1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLG9CQUFvQjtXQUMxQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDO1dBQ0E7V0FDQSxnQkFBZ0IsMkJBQTJCO1dBQzNDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSw0Q0FBNEM7V0FDNUM7V0FDQSxFOzs7O1VDcEZBO1VBQ0EiLCJmaWxlIjoianMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4Lmxlc3MnXHJcbmltcG9ydCAnLi9qcy9pbmRleCciLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCBTd2lwZXIsIHtcclxuICAgIE5hdmlnYXRpb24sXHJcbiAgICBBdXRvcGxheSxcclxuICAgIEVmZmVjdEZhZGUsXHJcbiAgICBFZmZlY3RDb3ZlcmZsb3dcclxufSBmcm9tICdzd2lwZXInXHJcbmltcG9ydCB7XHJcbiAgICBleHBhbmRTZWFyY2gsXHJcbiAgICB0b2dnbGVQb3B1cFxyXG59IGZyb20gJy4vdXRpbHMnXHJcblxyXG5Td2lwZXIudXNlKFtOYXZpZ2F0aW9uLCBBdXRvcGxheSwgRWZmZWN0RmFkZSwgRWZmZWN0Q292ZXJmbG93XSlcclxuXHJcbm5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgYXV0b3BsYXk6IHtcclxuICAgICAgICBkZWxheTogNzAwMCxcclxuICAgICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2VcclxuICAgIH0sXHJcbiAgICBlZmZlY3Q6ICdmYWRlJyxcclxuICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcuc2xpZGVyLWJ0bi1uZXh0JyxcclxuICAgICAgICBwcmV2RWw6ICcuc2xpZGVyLWJ0bi1wcmV2JyxcclxuICAgICAgICBkaXNhYmxlZENsYXNzOiAnc2xpZGVyLWJ0bi1kaXNhYmxlZCdcclxuICAgIH0sXHJcbn0pXHJcblxyXG4vLyBoZWFkZXIgZXhwYW5kaW5nIHNlYXJjaFxyXG5cclxuZXhwYW5kU2VhcmNoKCdoZWFkZXInKVxyXG5cclxuXHJcbi8vIHBvcHVwIGxpc3RlbmVyc1xyXG50b2dnbGVQb3B1cCgnaGVhZGVyLW1lbnUtYnRuJywgJ2J1cmdlcicpXHJcbnRvZ2dsZVBvcHVwKCdoZWFkZXItdXNlci1sb2dnZWQnLCAndXNlcicpIiwiLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxuICogUGFnaW5hdGlvblxuICogamF2YXNjcmlwdCBwYWdlIG5hdmlnYXRpb25cbiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cblxuY29uc3QgUGFnaW5hdGlvbiA9IHtcblxuICAgIGNvZGU6ICcnLFxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBVdGlsaXR5XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGNvbnZlcnRpbmcgaW5pdGlhbGl6ZSBkYXRhXG4gICAgRXh0ZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgICAgUGFnaW5hdGlvbi5zaXplID0gZGF0YS5zaXplIHx8IDMwMDtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gZGF0YS5wYWdlIHx8IDE7XG4gICAgICAgIFBhZ2luYXRpb24uc3RlcCA9IGRhdGEuc3RlcCA9PT0gMCA/IDAgOiBkYXRhLnN0ZXAgfHwgMztcbiAgICB9LFxuXG4gICAgLy8gYWRkIHBhZ2VzIGJ5IG51bWJlciAoZnJvbSBbc10gdG8gW2ZdKVxuICAgIEFkZDogZnVuY3Rpb24gKHMsIGYpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHM7IGkgPCBmOyBpKyspIHtcbiAgICAgICAgICAgIFBhZ2luYXRpb24uY29kZSArPSAnPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtYnRuXCI+JyArIGkgKyAnPC9hPic7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gYWRkIGxhc3QgcGFnZSB3aXRoIHNlcGFyYXRvclxuICAgIExhc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5jb2RlICs9ICc8aSBjbGFzcz1cInBhZ2luYXRpb24tc2VwYXJhdG9yXCI+Li4uPC9pPjxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWJ0blwiPicgKyBQYWdpbmF0aW9uLnNpemUgKyAnPC9hPic7XG4gICAgfSxcblxuICAgIC8vIGFkZCBmaXJzdCBwYWdlIHdpdGggc2VwYXJhdG9yXG4gICAgRmlyc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5jb2RlICs9ICc8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1idG5cIj4xPC9hPjxpIGNsYXNzPVwicGFnaW5hdGlvbi1zZXBhcmF0b3JcIj4uLi48L2k+JztcbiAgICB9LFxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSGFuZGxlcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gY2hhbmdlIHBhZ2VcbiAgICBDbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSArdGhpcy5pbm5lckhUTUw7XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG4gICAgLy8gcHJldmlvdXMgcGFnZVxuICAgIFByZXY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlLS07XG4gICAgICAgIGlmIChQYWdpbmF0aW9uLnBhZ2UgPCAxKSB7XG4gICAgICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG4gICAgLy8gbmV4dCBwYWdlXG4gICAgTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UrKztcbiAgICAgICAgaWYgKFBhZ2luYXRpb24ucGFnZSA+IFBhZ2luYXRpb24uc2l6ZSkge1xuICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gUGFnaW5hdGlvbi5zaXplO1xuICAgICAgICB9XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gU2NyaXB0XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGJpbmRpbmcgcGFnZXNcbiAgICBCaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgYmluZCcsIFBhZ2luYXRpb24uZVswXSlcbiAgICAgICAgY29uc3QgYSA9IFBhZ2luYXRpb24uZVswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdpbmF0aW9uLXBhZ2UtYnRuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCthW2ldLmlubmVySFRNTCA9PT0gUGFnaW5hdGlvbi5wYWdlKSBhW2ldLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uLXBhZ2UtYnRuIGN1cnJlbnQnO1xuICAgICAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBhZ2luYXRpb24uQ2xpY2ssIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB3cml0ZSBwYWdpbmF0aW9uXG4gICAgRmluaXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb2RlOiAnLCBQYWdpbmF0aW9uLmNvZGUpXG4gICAgICAgIFBhZ2luYXRpb24uZVswXS5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAvLyB3aXRob3V0IEpRdWVyeVxuICAgICAgICAvLyBQYWdpbmF0aW9uLmVbMF0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBQYWdpbmF0aW9uLmNvZGUpXG4gICAgICAgIGNvbnN0IGh0bWwgPSAkKFBhZ2luYXRpb24uY29kZSkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAgICAgLmZhZGVJbig1MDApXG4gICAgICAgICQoJy5wYWdpbmF0aW9uLXBhZ2UtY29udGFpbmVyJykuYXBwZW5kKGh0bWwpO1xuICAgICAgICBQYWdpbmF0aW9uLmNvZGUgPSAnJztcbiAgICAgICAgUGFnaW5hdGlvbi5CaW5kKCk7XG4gICAgfSxcbiAgICAvLyBmaW5kIHBhZ2luYXRpb24gdHlwZVxuICAgIFN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChQYWdpbmF0aW9uLnN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RlcClcbiAgICAgICAgICAgIGlmIChQYWdpbmF0aW9uLnBhZ2UgPCAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgMylcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChQYWdpbmF0aW9uLnBhZ2UgPiBQYWdpbmF0aW9uLnNpemUgLSAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24uc2l6ZSAtIDEsIFBhZ2luYXRpb24uc2l6ZSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5wYWdlLCBQYWdpbmF0aW9uLnBhZ2UgKyAxKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBhZ2luYXRpb24uc2l6ZSA8IFBhZ2luYXRpb24uc3RlcCAqIDIgKyA2KSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgUGFnaW5hdGlvbi5zaXplICsgMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBhZ2luYXRpb24ucGFnZSA8IFBhZ2luYXRpb24uc3RlcCAqIDIgKyAxKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgUGFnaW5hdGlvbi5zdGVwICogMiArIDQpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChQYWdpbmF0aW9uLnBhZ2UgPiBQYWdpbmF0aW9uLnNpemUgLSBQYWdpbmF0aW9uLnN0ZXAgKiAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24uc2l6ZSAtIFBhZ2luYXRpb24uc3RlcCAqIDIgLSAyLCBQYWdpbmF0aW9uLnNpemUgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24ucGFnZSAtIFBhZ2luYXRpb24uc3RlcCwgUGFnaW5hdGlvbi5wYWdlICsgUGFnaW5hdGlvbi5zdGVwICsgMSk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBQYWdpbmF0aW9uLkZpbmlzaCgpO1xuICAgIH0sXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBJbml0aWFsaXphdGlvblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBiaW5kaW5nIGJ1dHRvbnNcbiAgICBCdXR0b25zOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBuYXYgPSBlWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgYnRucycsIG5hdilcbiAgICAgICAgbmF2WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGFnaW5hdGlvbi5QcmV2LCBmYWxzZSk7XG4gICAgICAgIG5hdlsxXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBhZ2luYXRpb24uTmV4dCwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICAvLyBjcmVhdGUgc2tlbGV0b25cbiAgICBDcmVhdGU6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgY29uc3QgaHRtbCA9XG4gICAgICAgICAgICBgPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtcHJldlwiPjxpIGNsYXNzPVwiZmFzIGZhLWNoZXZyb24tbGVmdFwiPjwvaT48L2E+IFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLW5leHRcIj48aSBjbGFzcz1cImZhcyBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPjwvYT5gXG5cbiAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIGNyZWF0ZScsIGUpXG4gICAgICAgIGVbMF0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKVxuICAgICAgICBQYWdpbmF0aW9uLmUgPSBlWzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb24tcGFnZS1jb250YWluZXInKTtcbiAgICAgICAgUGFnaW5hdGlvbi5CdXR0b25zKGUpO1xuICAgIH0sXG5cbiAgICAvLyBpbml0XG4gICAgSW5pdDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5FeHRlbmQoZGF0YSk7XG4gICAgICAgIFBhZ2luYXRpb24uQ3JlYXRlKGUpO1xuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfVxufTtcblxuLy8gZXhwb3J0aW5nXG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRpb25cblxuLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxuICogSW5pdGlhbGl6YXRpb25cbiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xyXG5pbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlcidcclxuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xyXG5cclxuLy8gc2V0dGluZyBzbGlkZXJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0U2xpZGVyKGJyZWFrcG9pbnQgPSAwLCBjbGlja1NsaWRlID0gdHJ1ZSkge1xyXG4gICAgY29uc29sZS5sb2coJ3NsaWRlciBpbml0JylcclxuICAgIGxldCBzbGlkZXJJbnN0YW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCA/XHJcbiAgICAgICAgbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgLy8gc3BlZWQ6IDEwMCxcclxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogY2xpY2tTbGlkZSxcclxuICAgICAgICAgICAgZnJlZU1vZGU6IHRydWVcclxuICAgICAgICB9KSA6XHJcbiAgICAgICAgbnVsbFxyXG5cclxuICAgIHJldHVybiBzbGlkZXJJbnN0YW5jZVxyXG59XHJcblxyXG4vLyBzZXR0aW5nIG5hdnRhYnMgYW5pbWF0aW9uXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdE5hdlRhYnMoYnJlYWtwb2ludCA9IDAsIHNsaWRlckluc3RhbmNlKSB7XHJcblxyXG4gICAgY29uc3QgbWFya2VyID0gJCgnLnRhYi1tYXJrZXInKVxyXG4gICAgY29uc3QgdGFicyA9ICQoJy50YWItbGluaycpXHJcblxyXG4gICAgZnVuY3Rpb24gaW5kaWNhdG9yKHRhcmdldCwgc2hpZnQgPSAwKSB7XHJcbiAgICAgICAgaWYgKHNoaWZ0ID49IDApIHtcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsIHRhcmdldC5vZmZzZXRMZWZ0IC0gc2hpZnQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsIHRhcmdldC5vZmZzZXRMZWZ0ICsgc2hpZnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcmtlci5jc3MoJ3dpZHRoJywgdGFyZ2V0Lm9mZnNldFdpZHRoICsgOSlcclxuICAgIH1cclxuXHJcbiAgICB0YWJzLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIHRhYnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gc2xpZGVySW5zdGFuY2UudHJhbnNsYXRlXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IodGFyZ2V0LCA1IC0gdHJhbnNsYXRlKVxyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIGluZGljYXRvcih0YXJnZXQsIDUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yKHRoaXMsIC00KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZiAoc2xpZGVySW5zdGFuY2UpIHtcclxuICAgICAgICBzbGlkZXJJbnN0YW5jZS5vbignc2V0VHJhbnNsYXRlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSBzbGlkZXJJbnN0YW5jZS50cmFuc2xhdGVcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsICQoJy5hY3RpdmUnKVswXS5vZmZzZXRMZWZ0ICsgdHJhbnNsYXRlIC0gNSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBzZXR0aW5nIHBhZ2luYXRpb25cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0UGFnaW5hdGlvbihicmVha3BvaW50KSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBzaXplOiAxMDUsXHJcbiAgICAgICAgcGFnZTogMSxcclxuICAgICAgICBzdGVwOiAxXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCkge1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IDBcclxuICAgIH1cclxuXHJcbiAgICBQYWdpbmF0aW9uLkluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbicpLCBvcHRpb25zKVxyXG5cclxufVxyXG5cclxuLy8gdXNlci1tZW51IGFuZCBidXJnZXItbWVudVxyXG4vKiogXHJcbiAqIEFkZHMgbGlzdGVuZXJzIGFuZCB0b2dnbGVzIHBvcHVwc1xyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSB0YXJnZXQgZWxlbWVudCB5b3UgY2xpY2tcclxuICogQHBhcmFtICAge1N0cmluZ30gcG9wdXAgcG9wdXAgeW91IGNhbGxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVQb3B1cCh0YXJnZXQsIHBvcHVwKSB7XHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgJChgLiR7dGFyZ2V0fWApLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgJChgLiR7cG9wdXB9LW1lbnVgKS5zaG93KClcclxuICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGAuJHtwb3B1cH0tY2xvc2VgKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAkKGAuJHtwb3B1cH0tbWVudWApLmhpZGUoKVxyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoXCJvdmVyZmxvdy15XCIsIFwiXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAocG9wdXAgPT09ICdidXJnZXInKSB7XHJcbiAgICAgICAgZXhwYW5kU2VhcmNoKHBvcHVwKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBleHBhbmRpbmcgc2VhcmNoXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kU2VhcmNoKGFyZWEgPSAnJykge1xyXG5cclxuICAgICQoYC4ke2FyZWF9LXNlYXJjaC1idG5gKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnNlYXJjaCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgIGlmICgkKCcuc2VhcmNoJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICQoYC4ke2FyZWF9LXNlYXJjaC1maWVsZGApLnRyaWdnZXIoJ2ZvY3VzJylcclxuICAgICAgICB9IGVsc2UgJChgLiR7YXJlYX0tc2VhcmNoLWZpZWxkYCkudHJpZ2dlcignYmx1cicpLnZhbCgnJylcclxuXHJcbiAgICB9KVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gdGhlIHN0YXJ0dXAgZnVuY3Rpb25cbi8vIEl0J3MgZW1wdHkgYXMgc29tZSBydW50aW1lIG1vZHVsZSBoYW5kbGVzIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSB4ID0+IHt9XG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbnZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXG5cdFtcIi4vaW5kZXguanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2pxdWVyeV9kaXN0X2pxdWVyeV9qcy1ub2RlX21vZHVsZXNfc3dpcGVyX2VzbV9jb21wb25lbnRzX2NvcmVfY29yZS1jbGFzc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfc3dpcGVyX2VzbV9jb21wb25lbnRzX2F1dG9wbGF5X2F1dG9wbGF5X2pzLW5vZGVfbW9kdWxlc19zd2lwZXJfZXNtX2NvbXBvLWRkOGM0NFwiXVxuXTtcbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbnZhciBjaGVja0RlZmVycmVkTW9kdWxlcyA9IHggPT4ge307XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lLCBleGVjdXRlTW9kdWxlc10gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuXHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcblx0fVxuXG5cdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3Rcblx0aWYoZXhlY3V0ZU1vZHVsZXMpIGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMpO1xuXG5cdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gPSBzZWxmW1wid2VicGFja0NodW5rXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTtcblxuZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKCkge1xuXHR2YXIgcmVzdWx0O1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuXHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG5cdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcblx0XHR9XG5cdH1cblx0aWYoZGVmZXJyZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHggPT4ge307XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cbnZhciBzdGFydHVwID0gX193ZWJwYWNrX3JlcXVpcmVfXy54O1xuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyByZXNldCBzdGFydHVwIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBjYWxsZWQgYWdhaW4gd2hlbiBtb3JlIHN0YXJ0dXAgY29kZSBpcyBhZGRlZFxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnggPSBzdGFydHVwIHx8ICh4ID0+IHt9KTtcblx0cmV0dXJuIChjaGVja0RlZmVycmVkTW9kdWxlcyA9IGNoZWNrRGVmZXJyZWRNb2R1bGVzSW1wbCkoKTtcbn07IiwiLy8gcnVuIHN0YXJ0dXBcbl9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==