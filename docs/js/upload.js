/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/upload.less":
/*!****************************!*\
  !*** ./styles/upload.less ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "./js/upload.js":
/*!**********************!*\
  !*** ./js/upload.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./js/utils.js");



// replacing fileinput

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.replacement').on('click', function (e) {
    e.preventDefault()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.file-input').trigger('click')
})
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.fa-upload').on('click', function (e) {
    e.preventDefault()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.file-input').trigger('click')
})

// header expanding search

;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.expandSearch)('header')


// popup listeners
;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('header-menu-btn', 'burger')
;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('header-user-logged', 'user')

// desktop user menu hover appearance
if (window.innerWidth > 1279) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-user-avatar').on('mouseenter', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').show(200)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').on('mouseleave', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hide(200)
        })
    })
}

// checkbox tree
if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#exclude')) {

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#exclude').on('click', function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).prop('checked')) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.quiz-sublist .checkbox').removeClass('disabled')
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#anonymous').prop('disabled', false)
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#norate').prop('disabled', false)
        } else {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.quiz-sublist .checkbox').addClass('disabled')
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#anonymous').prop('disabled', true).prop('checked', false)
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('input#norate').prop('disabled', true).prop('checked', false)
        }

        console.log(jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type="checkbox"]:checked').length)
    })
    
}

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

/***/ }),

/***/ "./upload.js":
/*!*******************!*\
  !*** ./upload.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_upload_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/upload.less */ "./styles/upload.less");
/* harmony import */ var _js_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/upload */ "./js/upload.js");



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
/******/ 			"upload": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./upload.js","vendors-node_modules_jquery_dist_jquery_js-node_modules_swiper_esm_components_core_core-class_js"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvdXBsb2FkLmxlc3M/MzBiYiIsIndlYnBhY2s6Ly8vLi9qcy9wYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL2pzL3VwbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9qcy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi91cGxvYWQuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDc0I7OztBQUd0Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7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O1VDcEZBO1VBQ0EiLCJmaWxlIjoianMvdXBsb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxuICogUGFnaW5hdGlvblxuICogamF2YXNjcmlwdCBwYWdlIG5hdmlnYXRpb25cbiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cblxuY29uc3QgUGFnaW5hdGlvbiA9IHtcblxuICAgIGNvZGU6ICcnLFxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBVdGlsaXR5XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGNvbnZlcnRpbmcgaW5pdGlhbGl6ZSBkYXRhXG4gICAgRXh0ZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgICAgUGFnaW5hdGlvbi5zaXplID0gZGF0YS5zaXplIHx8IDMwMDtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gZGF0YS5wYWdlIHx8IDE7XG4gICAgICAgIFBhZ2luYXRpb24uc3RlcCA9IGRhdGEuc3RlcCA9PT0gMCA/IDAgOiBkYXRhLnN0ZXAgfHwgMztcbiAgICB9LFxuXG4gICAgLy8gYWRkIHBhZ2VzIGJ5IG51bWJlciAoZnJvbSBbc10gdG8gW2ZdKVxuICAgIEFkZDogZnVuY3Rpb24gKHMsIGYpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHM7IGkgPCBmOyBpKyspIHtcbiAgICAgICAgICAgIFBhZ2luYXRpb24uY29kZSArPSAnPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtYnRuXCI+JyArIGkgKyAnPC9hPic7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gYWRkIGxhc3QgcGFnZSB3aXRoIHNlcGFyYXRvclxuICAgIExhc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5jb2RlICs9ICc8aSBjbGFzcz1cInBhZ2luYXRpb24tc2VwYXJhdG9yXCI+Li4uPC9pPjxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWJ0blwiPicgKyBQYWdpbmF0aW9uLnNpemUgKyAnPC9hPic7XG4gICAgfSxcblxuICAgIC8vIGFkZCBmaXJzdCBwYWdlIHdpdGggc2VwYXJhdG9yXG4gICAgRmlyc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5jb2RlICs9ICc8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1idG5cIj4xPC9hPjxpIGNsYXNzPVwicGFnaW5hdGlvbi1zZXBhcmF0b3JcIj4uLi48L2k+JztcbiAgICB9LFxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSGFuZGxlcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gY2hhbmdlIHBhZ2VcbiAgICBDbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSArdGhpcy5pbm5lckhUTUw7XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG4gICAgLy8gcHJldmlvdXMgcGFnZVxuICAgIFByZXY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlLS07XG4gICAgICAgIGlmIChQYWdpbmF0aW9uLnBhZ2UgPCAxKSB7XG4gICAgICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG4gICAgLy8gbmV4dCBwYWdlXG4gICAgTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UrKztcbiAgICAgICAgaWYgKFBhZ2luYXRpb24ucGFnZSA+IFBhZ2luYXRpb24uc2l6ZSkge1xuICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gUGFnaW5hdGlvbi5zaXplO1xuICAgICAgICB9XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gU2NyaXB0XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGJpbmRpbmcgcGFnZXNcbiAgICBCaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgYmluZCcsIFBhZ2luYXRpb24uZVswXSlcbiAgICAgICAgY29uc3QgYSA9IFBhZ2luYXRpb24uZVswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdpbmF0aW9uLXBhZ2UtYnRuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCthW2ldLmlubmVySFRNTCA9PT0gUGFnaW5hdGlvbi5wYWdlKSBhW2ldLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uLXBhZ2UtYnRuIGN1cnJlbnQnO1xuICAgICAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBhZ2luYXRpb24uQ2xpY2ssIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB3cml0ZSBwYWdpbmF0aW9uXG4gICAgRmluaXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb2RlOiAnLCBQYWdpbmF0aW9uLmNvZGUpXG4gICAgICAgIFBhZ2luYXRpb24uZVswXS5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAvLyB3aXRob3V0IEpRdWVyeVxuICAgICAgICAvLyBQYWdpbmF0aW9uLmVbMF0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBQYWdpbmF0aW9uLmNvZGUpXG4gICAgICAgIGNvbnN0IGh0bWwgPSAkKFBhZ2luYXRpb24uY29kZSkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAgICAgLmZhZGVJbig1MDApXG4gICAgICAgICQoJy5wYWdpbmF0aW9uLXBhZ2UtY29udGFpbmVyJykuYXBwZW5kKGh0bWwpO1xuICAgICAgICBQYWdpbmF0aW9uLmNvZGUgPSAnJztcbiAgICAgICAgUGFnaW5hdGlvbi5CaW5kKCk7XG4gICAgfSxcbiAgICAvLyBmaW5kIHBhZ2luYXRpb24gdHlwZVxuICAgIFN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChQYWdpbmF0aW9uLnN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RlcClcbiAgICAgICAgICAgIGlmIChQYWdpbmF0aW9uLnBhZ2UgPCAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgMylcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChQYWdpbmF0aW9uLnBhZ2UgPiBQYWdpbmF0aW9uLnNpemUgLSAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24uc2l6ZSAtIDEsIFBhZ2luYXRpb24uc2l6ZSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5wYWdlLCBQYWdpbmF0aW9uLnBhZ2UgKyAxKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBhZ2luYXRpb24uc2l6ZSA8IFBhZ2luYXRpb24uc3RlcCAqIDIgKyA2KSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgUGFnaW5hdGlvbi5zaXplICsgMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBhZ2luYXRpb24ucGFnZSA8IFBhZ2luYXRpb24uc3RlcCAqIDIgKyAxKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgUGFnaW5hdGlvbi5zdGVwICogMiArIDQpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChQYWdpbmF0aW9uLnBhZ2UgPiBQYWdpbmF0aW9uLnNpemUgLSBQYWdpbmF0aW9uLnN0ZXAgKiAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24uc2l6ZSAtIFBhZ2luYXRpb24uc3RlcCAqIDIgLSAyLCBQYWdpbmF0aW9uLnNpemUgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24ucGFnZSAtIFBhZ2luYXRpb24uc3RlcCwgUGFnaW5hdGlvbi5wYWdlICsgUGFnaW5hdGlvbi5zdGVwICsgMSk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBQYWdpbmF0aW9uLkZpbmlzaCgpO1xuICAgIH0sXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBJbml0aWFsaXphdGlvblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBiaW5kaW5nIGJ1dHRvbnNcbiAgICBCdXR0b25zOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBuYXYgPSBlWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgYnRucycsIG5hdilcbiAgICAgICAgbmF2WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGFnaW5hdGlvbi5QcmV2LCBmYWxzZSk7XG4gICAgICAgIG5hdlsxXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBhZ2luYXRpb24uTmV4dCwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICAvLyBjcmVhdGUgc2tlbGV0b25cbiAgICBDcmVhdGU6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgY29uc3QgaHRtbCA9XG4gICAgICAgICAgICBgPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtcHJldlwiPjxpIGNsYXNzPVwiZmFzIGZhLWNoZXZyb24tbGVmdFwiPjwvaT48L2E+IFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLW5leHRcIj48aSBjbGFzcz1cImZhcyBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPjwvYT5gXG5cbiAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIGNyZWF0ZScsIGUpXG4gICAgICAgIGVbMF0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKVxuICAgICAgICBQYWdpbmF0aW9uLmUgPSBlWzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb24tcGFnZS1jb250YWluZXInKTtcbiAgICAgICAgUGFnaW5hdGlvbi5CdXR0b25zKGUpO1xuICAgIH0sXG5cbiAgICAvLyBpbml0XG4gICAgSW5pdDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5FeHRlbmQoZGF0YSk7XG4gICAgICAgIFBhZ2luYXRpb24uQ3JlYXRlKGUpO1xuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfVxufTtcblxuLy8gZXhwb3J0aW5nXG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRpb25cblxuLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxuICogSW5pdGlhbGl6YXRpb25cbiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xyXG5pbXBvcnQge1xyXG4gICAgZXhwYW5kU2VhcmNoLFxyXG4gICAgdG9nZ2xlUG9wdXBcclxufSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuLy8gcmVwbGFjaW5nIGZpbGVpbnB1dFxyXG5cclxuJCgnLnJlcGxhY2VtZW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgJCgnLmZpbGUtaW5wdXQnKS50cmlnZ2VyKCdjbGljaycpXHJcbn0pXHJcbiQoJy5mYS11cGxvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAkKCcuZmlsZS1pbnB1dCcpLnRyaWdnZXIoJ2NsaWNrJylcclxufSlcclxuXHJcbi8vIGhlYWRlciBleHBhbmRpbmcgc2VhcmNoXHJcblxyXG5leHBhbmRTZWFyY2goJ2hlYWRlcicpXHJcblxyXG5cclxuLy8gcG9wdXAgbGlzdGVuZXJzXHJcbnRvZ2dsZVBvcHVwKCdoZWFkZXItbWVudS1idG4nLCAnYnVyZ2VyJylcclxudG9nZ2xlUG9wdXAoJ2hlYWRlci11c2VyLWxvZ2dlZCcsICd1c2VyJylcclxuXHJcbi8vIGRlc2t0b3AgdXNlciBtZW51IGhvdmVyIGFwcGVhcmFuY2VcclxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTI3OSkge1xyXG4gICAgJCgnLmhlYWRlci11c2VyLWF2YXRhcicpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy51c2VyLW1lbnUnKS5zaG93KDIwMClcclxuICAgICAgICAkKCcudXNlci1tZW51Jykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuaGlkZSgyMDApXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8vIGNoZWNrYm94IHRyZWVcclxuaWYgKCQoJ2lucHV0I2V4Y2x1ZGUnKSkge1xyXG5cclxuICAgICQoJ2lucHV0I2V4Y2x1ZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQoJy5xdWl6LXN1Ymxpc3QgLmNoZWNrYm94JykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcclxuICAgICAgICAgICAgJCgnaW5wdXQjYW5vbnltb3VzJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSlcclxuICAgICAgICAgICAgJCgnaW5wdXQjbm9yYXRlJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcucXVpei1zdWJsaXN0IC5jaGVja2JveCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgICAgICQoJ2lucHV0I2Fub255bW91cycpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKVxyXG4gICAgICAgICAgICAkKCdpbnB1dCNub3JhdGUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkJykubGVuZ3RoKVxyXG4gICAgfSlcclxuICAgIFxyXG59IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xyXG5pbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlcidcclxuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xyXG5cclxuLy8gc2V0dGluZyBzbGlkZXJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0U2xpZGVyKGJyZWFrcG9pbnQgPSAwLCBjbGlja1NsaWRlID0gdHJ1ZSkge1xyXG4gICAgY29uc29sZS5sb2coJ3NsaWRlciBpbml0JylcclxuICAgIGxldCBzbGlkZXJJbnN0YW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCA/XHJcbiAgICAgICAgbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgLy8gc3BlZWQ6IDEwMCxcclxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogY2xpY2tTbGlkZSxcclxuICAgICAgICAgICAgZnJlZU1vZGU6IHRydWVcclxuICAgICAgICB9KSA6XHJcbiAgICAgICAgbnVsbFxyXG5cclxuICAgIHJldHVybiBzbGlkZXJJbnN0YW5jZVxyXG59XHJcblxyXG4vLyBzZXR0aW5nIG5hdnRhYnMgYW5pbWF0aW9uXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdE5hdlRhYnMoYnJlYWtwb2ludCA9IDAsIHNsaWRlckluc3RhbmNlKSB7XHJcblxyXG4gICAgY29uc3QgbWFya2VyID0gJCgnLnRhYi1tYXJrZXInKVxyXG4gICAgY29uc3QgdGFicyA9ICQoJy50YWItbGluaycpXHJcblxyXG4gICAgZnVuY3Rpb24gaW5kaWNhdG9yKHRhcmdldCwgc2hpZnQgPSAwKSB7XHJcbiAgICAgICAgaWYgKHNoaWZ0ID49IDApIHtcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsIHRhcmdldC5vZmZzZXRMZWZ0IC0gc2hpZnQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsIHRhcmdldC5vZmZzZXRMZWZ0ICsgc2hpZnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcmtlci5jc3MoJ3dpZHRoJywgdGFyZ2V0Lm9mZnNldFdpZHRoICsgOSlcclxuICAgIH1cclxuXHJcbiAgICB0YWJzLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIHRhYnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gc2xpZGVySW5zdGFuY2UudHJhbnNsYXRlXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IodGFyZ2V0LCA1IC0gdHJhbnNsYXRlKVxyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIGluZGljYXRvcih0YXJnZXQsIDUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yKHRoaXMsIC00KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZiAoc2xpZGVySW5zdGFuY2UpIHtcclxuICAgICAgICBzbGlkZXJJbnN0YW5jZS5vbignc2V0VHJhbnNsYXRlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSBzbGlkZXJJbnN0YW5jZS50cmFuc2xhdGVcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsICQoJy5hY3RpdmUnKVswXS5vZmZzZXRMZWZ0ICsgdHJhbnNsYXRlIC0gNSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBzZXR0aW5nIHBhZ2luYXRpb25cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0UGFnaW5hdGlvbihicmVha3BvaW50KSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBzaXplOiAxMDUsXHJcbiAgICAgICAgcGFnZTogMSxcclxuICAgICAgICBzdGVwOiAxXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCkge1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IDBcclxuICAgIH1cclxuXHJcbiAgICBQYWdpbmF0aW9uLkluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbicpLCBvcHRpb25zKVxyXG5cclxufVxyXG5cclxuLy8gdXNlci1tZW51IGFuZCBidXJnZXItbWVudVxyXG4vKiogXHJcbiAqIEFkZHMgbGlzdGVuZXJzIGFuZCB0b2dnbGVzIHBvcHVwc1xyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSB0YXJnZXQgZWxlbWVudCB5b3UgY2xpY2tcclxuICogQHBhcmFtICAge1N0cmluZ30gcG9wdXAgcG9wdXAgeW91IGNhbGxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVQb3B1cCh0YXJnZXQsIHBvcHVwKSB7XHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgJChgLiR7dGFyZ2V0fWApLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgJChgLiR7cG9wdXB9LW1lbnVgKS5zaG93KClcclxuICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGAuJHtwb3B1cH0tY2xvc2VgKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAkKGAuJHtwb3B1cH0tbWVudWApLmhpZGUoKVxyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoXCJvdmVyZmxvdy15XCIsIFwiXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAocG9wdXAgPT09ICdidXJnZXInKSB7XHJcbiAgICAgICAgZXhwYW5kU2VhcmNoKHBvcHVwKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBleHBhbmRpbmcgc2VhcmNoXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kU2VhcmNoKGFyZWEgPSAnJykge1xyXG5cclxuICAgICQoYC4ke2FyZWF9LXNlYXJjaC1idG5gKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnNlYXJjaCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgIGlmICgkKCcuc2VhcmNoJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICQoYC4ke2FyZWF9LXNlYXJjaC1maWVsZGApLnRyaWdnZXIoJ2ZvY3VzJylcclxuICAgICAgICB9IGVsc2UgJChgLiR7YXJlYX0tc2VhcmNoLWZpZWxkYCkudHJpZ2dlcignYmx1cicpLnZhbCgnJylcclxuXHJcbiAgICB9KVxyXG59IiwiaW1wb3J0ICcuL3N0eWxlcy91cGxvYWQubGVzcydcclxuaW1wb3J0ICcuL2pzL3VwbG9hZCciLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuLy8gSXQncyBlbXB0eSBhcyBzb21lIHJ1bnRpbWUgbW9kdWxlIGhhbmRsZXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Jcbl9fd2VicGFja19yZXF1aXJlX18ueCA9IHggPT4ge31cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IG1vZHVsZVsnZGVmYXVsdCddIDpcblx0XHQoKSA9PiBtb2R1bGU7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwidXBsb2FkXCI6IDBcbn07XG5cbnZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXG5cdFtcIi4vdXBsb2FkLmpzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19qcXVlcnlfZGlzdF9qcXVlcnlfanMtbm9kZV9tb2R1bGVzX3N3aXBlcl9lc21fY29tcG9uZW50c19jb3JlX2NvcmUtY2xhc3NfanNcIl1cbl07XG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG52YXIgY2hlY2tEZWZlcnJlZE1vZHVsZXMgPSB4ID0+IHt9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZSwgZXhlY3V0ZU1vZHVsZXNdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcblx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG5cdH1cblxuXHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG5cdGlmKGV4ZWN1dGVNb2R1bGVzKSBkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzKTtcblxuXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcblx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rXCJdID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7XG5cbmZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzSW1wbCgpIHtcblx0dmFyIHJlc3VsdDtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcblx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuXHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG5cdFx0fVxuXHR9XG5cdGlmKGRlZmVycmVkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnggPSB4ID0+IHt9O1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG52YXIgc3RhcnR1cCA9IF9fd2VicGFja19yZXF1aXJlX18ueDtcbl9fd2VicGFja19yZXF1aXJlX18ueCA9ICgpID0+IHtcblx0Ly8gcmVzZXQgc3RhcnR1cCBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgY2FsbGVkIGFnYWluIHdoZW4gbW9yZSBzdGFydHVwIGNvZGUgaXMgYWRkZWRcblx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0gc3RhcnR1cCB8fCAoeCA9PiB7fSk7XG5cdHJldHVybiAoY2hlY2tEZWZlcnJlZE1vZHVsZXMgPSBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwpKCk7XG59OyIsIi8vIHJ1biBzdGFydHVwXG5fX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=