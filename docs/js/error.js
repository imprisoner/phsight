/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/error.less":
/*!***************************!*\
  !*** ./styles/error.less ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./error.js":
/*!******************!*\
  !*** ./error.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/error */ "./styles/error.less");
/* harmony import */ var _js_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/error */ "./js/error.js");



/***/ }),

/***/ "./js/error.js":
/*!*********************!*\
  !*** ./js/error.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./js/utils.js");



(0,_utils__WEBPACK_IMPORTED_MODULE_1__.expandSearch)('message')

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

function initSlider(breakpoint = 0) {
    console.log('slider init')
    let sliderInstance = window.innerWidth < breakpoint ?
        new swiper__WEBPACK_IMPORTED_MODULE_2__.default('.swiper-container', {
            slidesPerView: 'auto',
            slideToClickedSlide: true,
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
            indicator(this, -3)
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
/******/ 			"error": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./error.js","vendors-node_modules_jquery_dist_jquery_js-node_modules_swiper_esm_components_core_core-class_js"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvZXJyb3IubGVzcz9jZjliIiwid2VicGFjazovLy8uL2Vycm9yLmpzIiwid2VicGFjazovLy8uL2pzL2Vycm9yLmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDQXVCOzs7Ozs7Ozs7Ozs7Ozs7QUNBRDtBQUNjOztBQUVwQyxvREFBWSxXOzs7Ozs7Ozs7Ozs7Ozs7O0FDSFo7QUFDQTtBQUNBO0FBQ0E7QUFDc0I7OztBQUd0Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7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RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0sb0JBQW9CO1dBQzFCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0M7V0FDQTtXQUNBLGdCQUFnQiwyQkFBMkI7V0FDM0M7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLDRDQUE0QztXQUM1QztXQUNBLEU7Ozs7VUNwRkE7VUFDQSIsImZpbGUiOiJqcy9lcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAnLi9zdHlsZXMvZXJyb3InXHJcbmltcG9ydCAnLi9qcy9lcnJvciciLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCB7ZXhwYW5kU2VhcmNofSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuZXhwYW5kU2VhcmNoKCdtZXNzYWdlJykiLCIvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXG4gKiBQYWdpbmF0aW9uXG4gKiBqYXZhc2NyaXB0IHBhZ2UgbmF2aWdhdGlvblxuICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSdcblxuXG5jb25zdCBQYWdpbmF0aW9uID0ge1xuXG4gICAgY29kZTogJycsXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFV0aWxpdHlcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gY29udmVydGluZyBpbml0aWFsaXplIGRhdGFcbiAgICBFeHRlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICBQYWdpbmF0aW9uLnNpemUgPSBkYXRhLnNpemUgfHwgMzAwO1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSBkYXRhLnBhZ2UgfHwgMTtcbiAgICAgICAgUGFnaW5hdGlvbi5zdGVwID0gZGF0YS5zdGVwID09PSAwID8gMCA6IGRhdGEuc3RlcCB8fCAzO1xuICAgIH0sXG5cbiAgICAvLyBhZGQgcGFnZXMgYnkgbnVtYmVyIChmcm9tIFtzXSB0byBbZl0pXG4gICAgQWRkOiBmdW5jdGlvbiAocywgZikge1xuICAgICAgICBmb3IgKGxldCBpID0gczsgaSA8IGY7IGkrKykge1xuICAgICAgICAgICAgUGFnaW5hdGlvbi5jb2RlICs9ICc8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1idG5cIj4nICsgaSArICc8L2E+JztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBhZGQgbGFzdCBwYWdlIHdpdGggc2VwYXJhdG9yXG4gICAgTGFzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLmNvZGUgKz0gJzxpIGNsYXNzPVwicGFnaW5hdGlvbi1zZXBhcmF0b3JcIj4uLi48L2k+PGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtYnRuXCI+JyArIFBhZ2luYXRpb24uc2l6ZSArICc8L2E+JztcbiAgICB9LFxuXG4gICAgLy8gYWRkIGZpcnN0IHBhZ2Ugd2l0aCBzZXBhcmF0b3JcbiAgICBGaXJzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLmNvZGUgKz0gJzxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWJ0blwiPjE8L2E+PGkgY2xhc3M9XCJwYWdpbmF0aW9uLXNlcGFyYXRvclwiPi4uLjwvaT4nO1xuICAgIH0sXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIYW5kbGVyc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBjaGFuZ2UgcGFnZVxuICAgIENsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnZSA9ICt0aGlzLmlubmVySFRNTDtcbiAgICAgICAgUGFnaW5hdGlvbi5TdGFydCgpO1xuICAgIH0sXG5cbiAgICAvLyBwcmV2aW91cyBwYWdlXG4gICAgUHJldjogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UtLTtcbiAgICAgICAgaWYgKFBhZ2luYXRpb24ucGFnZSA8IDEpIHtcbiAgICAgICAgICAgIFBhZ2luYXRpb24ucGFnZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgUGFnaW5hdGlvbi5TdGFydCgpO1xuICAgIH0sXG5cbiAgICAvLyBuZXh0IHBhZ2VcbiAgICBOZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnZSsrO1xuICAgICAgICBpZiAoUGFnaW5hdGlvbi5wYWdlID4gUGFnaW5hdGlvbi5zaXplKSB7XG4gICAgICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSBQYWdpbmF0aW9uLnNpemU7XG4gICAgICAgIH1cbiAgICAgICAgUGFnaW5hdGlvbi5TdGFydCgpO1xuICAgIH0sXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTY3JpcHRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gYmluZGluZyBwYWdlc1xuICAgIEJpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luc2lkZSBiaW5kJywgUGFnaW5hdGlvbi5lWzBdKVxuICAgICAgICBjb25zdCBhID0gUGFnaW5hdGlvbi5lWzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb24tcGFnZS1idG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoK2FbaV0uaW5uZXJIVE1MID09PSBQYWdpbmF0aW9uLnBhZ2UpIGFbaV0uY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24tcGFnZS1idG4gY3VycmVudCc7XG4gICAgICAgICAgICBhW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGFnaW5hdGlvbi5DbGljaywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHdyaXRlIHBhZ2luYXRpb25cbiAgICBGaW5pc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NvZGU6ICcsIFBhZ2luYXRpb24uY29kZSlcbiAgICAgICAgUGFnaW5hdGlvbi5lWzBdLmlubmVySFRNTCA9ICcnXG4gICAgICAgIC8vIHdpdGhvdXQgSlF1ZXJ5XG4gICAgICAgIC8vIFBhZ2luYXRpb24uZVswXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIFBhZ2luYXRpb24uY29kZSlcbiAgICAgICAgY29uc3QgaHRtbCA9ICQoUGFnaW5hdGlvbi5jb2RlKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXG4gICAgICAgICAgICAuZmFkZUluKDUwMClcbiAgICAgICAgJCgnLnBhZ2luYXRpb24tcGFnZS1jb250YWluZXInKS5hcHBlbmQoaHRtbCk7XG4gICAgICAgIFBhZ2luYXRpb24uY29kZSA9ICcnO1xuICAgICAgICBQYWdpbmF0aW9uLkJpbmQoKTtcbiAgICB9LFxuICAgIC8vIGZpbmQgcGFnaW5hdGlvbiB0eXBlXG4gICAgU3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKFBhZ2luYXRpb24uc3RlcCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGVwKVxuICAgICAgICAgICAgaWYgKFBhZ2luYXRpb24ucGFnZSA8IDIpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZCgxLCAzKVxuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBhZ2luYXRpb24ucGFnZSA+IFBhZ2luYXRpb24uc2l6ZSAtIDIpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5zaXplIC0gMSwgUGFnaW5hdGlvbi5zaXplICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZChQYWdpbmF0aW9uLnBhZ2UsIFBhZ2luYXRpb24ucGFnZSArIDEpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUGFnaW5hdGlvbi5zaXplIDwgUGFnaW5hdGlvbi5zdGVwICogMiArIDYpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZCgxLCBQYWdpbmF0aW9uLnNpemUgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGFnaW5hdGlvbi5wYWdlIDwgUGFnaW5hdGlvbi5zdGVwICogMiArIDEpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZCgxLCBQYWdpbmF0aW9uLnN0ZXAgKiAyICsgNCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBhZ2luYXRpb24ucGFnZSA+IFBhZ2luYXRpb24uc2l6ZSAtIFBhZ2luYXRpb24uc3RlcCAqIDIpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5zaXplIC0gUGFnaW5hdGlvbi5zdGVwICogMiAtIDIsIFBhZ2luYXRpb24uc2l6ZSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5wYWdlIC0gUGFnaW5hdGlvbi5zdGVwLCBQYWdpbmF0aW9uLnBhZ2UgKyBQYWdpbmF0aW9uLnN0ZXAgKyAxKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFBhZ2luYXRpb24uRmluaXNoKCk7XG4gICAgfSxcblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEluaXRpYWxpemF0aW9uXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGJpbmRpbmcgYnV0dG9uc1xuICAgIEJ1dHRvbnM6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IG5hdiA9IGVbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2luc2lkZSBidG5zJywgbmF2KVxuICAgICAgICBuYXZbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQYWdpbmF0aW9uLlByZXYsIGZhbHNlKTtcbiAgICAgICAgbmF2WzFdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGFnaW5hdGlvbi5OZXh0LCBmYWxzZSk7XG4gICAgfSxcblxuICAgIC8vIGNyZWF0ZSBza2VsZXRvblxuICAgIENyZWF0ZTogZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBjb25zdCBodG1sID1cbiAgICAgICAgICAgIGA8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1wcmV2XCI+PGkgY2xhc3M9XCJmYXMgZmEtY2hldnJvbi1sZWZ0XCI+PC9pPjwvYT4gXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtbmV4dFwiPjxpIGNsYXNzPVwiZmFzIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+PC9hPmBcblxuICAgICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgY3JlYXRlJywgZSlcbiAgICAgICAgZVswXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpXG4gICAgICAgIFBhZ2luYXRpb24uZSA9IGVbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbi1wYWdlLWNvbnRhaW5lcicpO1xuICAgICAgICBQYWdpbmF0aW9uLkJ1dHRvbnMoZSk7XG4gICAgfSxcblxuICAgIC8vIGluaXRcbiAgICBJbml0OiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICBQYWdpbmF0aW9uLkV4dGVuZChkYXRhKTtcbiAgICAgICAgUGFnaW5hdGlvbi5DcmVhdGUoZSk7XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9XG59O1xuXG4vLyBleHBvcnRpbmdcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblxuXG4vKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXG4gKiBJbml0aWFsaXphdGlvblxuICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi8iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCBTd2lwZXIgZnJvbSAnc3dpcGVyJ1xyXG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24nXHJcblxyXG4vLyBzZXR0aW5nIHNsaWRlclxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTbGlkZXIoYnJlYWtwb2ludCA9IDApIHtcclxuICAgIGNvbnNvbGUubG9nKCdzbGlkZXIgaW5pdCcpXHJcbiAgICBsZXQgc2xpZGVySW5zdGFuY2UgPSB3aW5kb3cuaW5uZXJXaWR0aCA8IGJyZWFrcG9pbnQgP1xyXG4gICAgICAgIG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGZyZWVNb2RlOiB0cnVlXHJcbiAgICAgICAgfSkgOlxyXG4gICAgICAgIG51bGxcclxuXHJcbiAgICByZXR1cm4gc2xpZGVySW5zdGFuY2VcclxufVxyXG5cclxuLy8gc2V0dGluZyBuYXZ0YWJzIGFuaW1hdGlvblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXROYXZUYWJzKGJyZWFrcG9pbnQgPSAwLCBzbGlkZXJJbnN0YW5jZSkge1xyXG5cclxuICAgIGNvbnN0IG1hcmtlciA9ICQoJy50YWItbWFya2VyJylcclxuICAgIGNvbnN0IHRhYnMgPSAkKCcudGFiLWxpbmsnKVxyXG5cclxuICAgIGZ1bmN0aW9uIGluZGljYXRvcih0YXJnZXQsIHNoaWZ0ID0gMCkge1xyXG4gICAgICAgIGlmIChzaGlmdCA+PSAwKSB7XHJcbiAgICAgICAgICAgIG1hcmtlci5jc3MoJ2xlZnQnLCB0YXJnZXQub2Zmc2V0TGVmdCAtIHNoaWZ0KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hcmtlci5jc3MoJ2xlZnQnLCB0YXJnZXQub2Zmc2V0TGVmdCArIHNoaWZ0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBtYXJrZXIuY3NzKCd3aWR0aCcsIHRhcmdldC5vZmZzZXRXaWR0aCArIDkpXHJcbiAgICB9XHJcblxyXG4gICAgdGFicy5lYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxyXG4gICAgICAgICAgICB0YWJzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICBpZiAoc2xpZGVySW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHNsaWRlckluc3RhbmNlLnRyYW5zbGF0ZVxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yKHRhcmdldCwgNSAtIHRyYW5zbGF0ZSlcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IodGFyZ2V0LCA1KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGluZGljYXRvcih0aGlzLCAtMylcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYgKHNsaWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgc2xpZGVySW5zdGFuY2Uub24oJ3NldFRyYW5zbGF0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gc2xpZGVySW5zdGFuY2UudHJhbnNsYXRlXHJcbiAgICAgICAgICAgIG1hcmtlci5jc3MoJ2xlZnQnLCAkKCcuYWN0aXZlJylbMF0ub2Zmc2V0TGVmdCArIHRyYW5zbGF0ZSAtIDUpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuLy8gc2V0dGluZyBwYWdpbmF0aW9uXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFBhZ2luYXRpb24oYnJlYWtwb2ludCkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgc2l6ZTogMTA1LFxyXG4gICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgc3RlcDogMVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IGJyZWFrcG9pbnQpIHtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgUGFnaW5hdGlvbi5Jbml0KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb24nKSwgb3B0aW9ucylcclxuXHJcbn1cclxuXHJcbi8vIHVzZXItbWVudSBhbmQgYnVyZ2VyLW1lbnVcclxuLyoqIFxyXG4gKiBBZGRzIGxpc3RlbmVycyBhbmQgdG9nZ2xlcyBwb3B1cHNcclxuICogQHBhcmFtICAge1N0cmluZ30gdGFyZ2V0IGVsZW1lbnQgeW91IGNsaWNrXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IHBvcHVwIHBvcHVwIHlvdSBjYWxsXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlUG9wdXAodGFyZ2V0LCBwb3B1cCkge1xyXG4gICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICQoYC4ke3RhcmdldH1gKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgICQoYC4ke3BvcHVwfS1tZW51YCkuc2hvdygpXHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChgLiR7cG9wdXB9LWNsb3NlYCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgJChgLiR7cG9wdXB9LW1lbnVgKS5oaWRlKClcclxuICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcIlwiKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYgKHBvcHVwID09PSAnYnVyZ2VyJykge1xyXG4gICAgICAgIGV4cGFuZFNlYXJjaChwb3B1cClcclxuICAgIH1cclxufVxyXG5cclxuLy8gZXhwYW5kaW5nIHNlYXJjaFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZFNlYXJjaChhcmVhID0gJycpIHtcclxuXHJcbiAgICAkKGAuJHthcmVhfS1zZWFyY2gtYnRuYCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5zZWFyY2gnKS50b2dnbGVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICBpZiAoJCgnLnNlYXJjaCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKGAuJHthcmVhfS1zZWFyY2gtZmllbGRgKS50cmlnZ2VyKCdmb2N1cycpXHJcbiAgICAgICAgfSBlbHNlICQoYC4ke2FyZWF9LXNlYXJjaC1maWVsZGApLnRyaWdnZXIoJ2JsdXInKS52YWwoJycpXHJcblxyXG4gICAgfSlcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG4vLyBJdCdzIGVtcHR5IGFzIHNvbWUgcnVudGltZSBtb2R1bGUgaGFuZGxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvclxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fVxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gbW9kdWxlWydkZWZhdWx0J10gOlxuXHRcdCgpID0+IG1vZHVsZTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJlcnJvclwiOiAwXG59O1xuXG52YXIgZGVmZXJyZWRNb2R1bGVzID0gW1xuXHRbXCIuL2Vycm9yLmpzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19qcXVlcnlfZGlzdF9qcXVlcnlfanMtbm9kZV9tb2R1bGVzX3N3aXBlcl9lc21fY29tcG9uZW50c19jb3JlX2NvcmUtY2xhc3NfanNcIl1cbl07XG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG52YXIgY2hlY2tEZWZlcnJlZE1vZHVsZXMgPSB4ID0+IHt9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZSwgZXhlY3V0ZU1vZHVsZXNdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcblx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG5cdH1cblxuXHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG5cdGlmKGV4ZWN1dGVNb2R1bGVzKSBkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzKTtcblxuXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcblx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rXCJdID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7XG5cbmZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzSW1wbCgpIHtcblx0dmFyIHJlc3VsdDtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcblx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuXHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG5cdFx0fVxuXHR9XG5cdGlmKGRlZmVycmVkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnggPSB4ID0+IHt9O1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG52YXIgc3RhcnR1cCA9IF9fd2VicGFja19yZXF1aXJlX18ueDtcbl9fd2VicGFja19yZXF1aXJlX18ueCA9ICgpID0+IHtcblx0Ly8gcmVzZXQgc3RhcnR1cCBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgY2FsbGVkIGFnYWluIHdoZW4gbW9yZSBzdGFydHVwIGNvZGUgaXMgYWRkZWRcblx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0gc3RhcnR1cCB8fCAoeCA9PiB7fSk7XG5cdHJldHVybiAoY2hlY2tEZWZlcnJlZE1vZHVsZXMgPSBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwpKCk7XG59OyIsIi8vIHJ1biBzdGFydHVwXG5fX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=