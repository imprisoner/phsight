/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/view.less":
/*!**************************!*\
  !*** ./styles/view.less ***!
  \**************************/
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

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initSlider": () => /* binding */ initSlider,
/* harmony export */   "initNavTabs": () => /* binding */ initNavTabs,
/* harmony export */   "initPagination": () => /* binding */ initPagination
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
        marker.css('left', target.offsetLeft - shift)
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
        if (i === 0) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('click')
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

/***/ }),

/***/ "./js/view.js":
/*!********************!*\
  !*** ./js/view.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./js/utils.js");



jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('DOMContentLoaded', function () { 

    // setting slider

    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.initSlider)(768)

    //expanding search
    
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-search-btn').on('click', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search').toggleClass('active')
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search').hasClass('active')) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-search-field').trigger('focus')
        } else {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-search-field').trigger('blur').val('')
        }

    })

})


/***/ }),

/***/ "./view.js":
/*!*****************!*\
  !*** ./view.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/view */ "./js/view.js");
/* harmony import */ var _styles_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/view */ "./styles/view.less");



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
/******/ 			"view": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./view.js","vendors-node_modules_jquery_dist_jquery_js-node_modules_swiper_esm_components_core_core-class_js"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvdmlldy5sZXNzP2Y5YzkiLCJ3ZWJwYWNrOi8vLy4vanMvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy92aWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDc0I7OztBQUd0Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtB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QTtXQUNBOztXQUVBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQztXQUNBO1dBQ0EsZ0JBQWdCLDJCQUEyQjtXQUMzQztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsNENBQTRDO1dBQzVDO1dBQ0EsRTs7OztVQ3BGQTtVQUNBIiwiZmlsZSI6InZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXG4gKiBQYWdpbmF0aW9uXG4gKiBqYXZhc2NyaXB0IHBhZ2UgbmF2aWdhdGlvblxuICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi9cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSdcblxuXG5jb25zdCBQYWdpbmF0aW9uID0ge1xuXG4gICAgY29kZTogJycsXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFV0aWxpdHlcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gY29udmVydGluZyBpbml0aWFsaXplIGRhdGFcbiAgICBFeHRlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICBQYWdpbmF0aW9uLnNpemUgPSBkYXRhLnNpemUgfHwgMzAwO1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSBkYXRhLnBhZ2UgfHwgMTtcbiAgICAgICAgUGFnaW5hdGlvbi5zdGVwID0gZGF0YS5zdGVwID09PSAwID8gMCA6IGRhdGEuc3RlcCB8fCAzO1xuICAgIH0sXG5cbiAgICAvLyBhZGQgcGFnZXMgYnkgbnVtYmVyIChmcm9tIFtzXSB0byBbZl0pXG4gICAgQWRkOiBmdW5jdGlvbiAocywgZikge1xuICAgICAgICBmb3IgKGxldCBpID0gczsgaSA8IGY7IGkrKykge1xuICAgICAgICAgICAgUGFnaW5hdGlvbi5jb2RlICs9ICc8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1idG5cIj4nICsgaSArICc8L2E+JztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBhZGQgbGFzdCBwYWdlIHdpdGggc2VwYXJhdG9yXG4gICAgTGFzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLmNvZGUgKz0gJzxpIGNsYXNzPVwicGFnaW5hdGlvbi1zZXBhcmF0b3JcIj4uLi48L2k+PGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtYnRuXCI+JyArIFBhZ2luYXRpb24uc2l6ZSArICc8L2E+JztcbiAgICB9LFxuXG4gICAgLy8gYWRkIGZpcnN0IHBhZ2Ugd2l0aCBzZXBhcmF0b3JcbiAgICBGaXJzdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLmNvZGUgKz0gJzxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWJ0blwiPjE8L2E+PGkgY2xhc3M9XCJwYWdpbmF0aW9uLXNlcGFyYXRvclwiPi4uLjwvaT4nO1xuICAgIH0sXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIYW5kbGVyc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBjaGFuZ2UgcGFnZVxuICAgIENsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnZSA9ICt0aGlzLmlubmVySFRNTDtcbiAgICAgICAgUGFnaW5hdGlvbi5TdGFydCgpO1xuICAgIH0sXG5cbiAgICAvLyBwcmV2aW91cyBwYWdlXG4gICAgUHJldjogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UtLTtcbiAgICAgICAgaWYgKFBhZ2luYXRpb24ucGFnZSA8IDEpIHtcbiAgICAgICAgICAgIFBhZ2luYXRpb24ucGFnZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgUGFnaW5hdGlvbi5TdGFydCgpO1xuICAgIH0sXG5cbiAgICAvLyBuZXh0IHBhZ2VcbiAgICBOZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnZSsrO1xuICAgICAgICBpZiAoUGFnaW5hdGlvbi5wYWdlID4gUGFnaW5hdGlvbi5zaXplKSB7XG4gICAgICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSBQYWdpbmF0aW9uLnNpemU7XG4gICAgICAgIH1cbiAgICAgICAgUGFnaW5hdGlvbi5TdGFydCgpO1xuICAgIH0sXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTY3JpcHRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gYmluZGluZyBwYWdlc1xuICAgIEJpbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2luc2lkZSBiaW5kJywgUGFnaW5hdGlvbi5lWzBdKVxuICAgICAgICBjb25zdCBhID0gUGFnaW5hdGlvbi5lWzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb24tcGFnZS1idG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoK2FbaV0uaW5uZXJIVE1MID09PSBQYWdpbmF0aW9uLnBhZ2UpIGFbaV0uY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24tcGFnZS1idG4gY3VycmVudCc7XG4gICAgICAgICAgICBhW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGFnaW5hdGlvbi5DbGljaywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHdyaXRlIHBhZ2luYXRpb25cbiAgICBGaW5pc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NvZGU6ICcsIFBhZ2luYXRpb24uY29kZSlcbiAgICAgICAgUGFnaW5hdGlvbi5lWzBdLmlubmVySFRNTCA9ICcnXG4gICAgICAgIC8vIHdpdGhvdXQgSlF1ZXJ5XG4gICAgICAgIC8vIFBhZ2luYXRpb24uZVswXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIFBhZ2luYXRpb24uY29kZSlcbiAgICAgICAgY29uc3QgaHRtbCA9ICQoUGFnaW5hdGlvbi5jb2RlKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXG4gICAgICAgICAgICAuZmFkZUluKDUwMClcbiAgICAgICAgJCgnLnBhZ2luYXRpb24tcGFnZS1jb250YWluZXInKS5hcHBlbmQoaHRtbCk7XG4gICAgICAgIFBhZ2luYXRpb24uY29kZSA9ICcnO1xuICAgICAgICBQYWdpbmF0aW9uLkJpbmQoKTtcbiAgICB9LFxuICAgIC8vIGZpbmQgcGFnaW5hdGlvbiB0eXBlXG4gICAgU3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKFBhZ2luYXRpb24uc3RlcCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGVwKVxuICAgICAgICAgICAgaWYgKFBhZ2luYXRpb24ucGFnZSA8IDIpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZCgxLCAzKVxuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBhZ2luYXRpb24ucGFnZSA+IFBhZ2luYXRpb24uc2l6ZSAtIDIpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5zaXplIC0gMSwgUGFnaW5hdGlvbi5zaXplICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZChQYWdpbmF0aW9uLnBhZ2UsIFBhZ2luYXRpb24ucGFnZSArIDEpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoUGFnaW5hdGlvbi5zaXplIDwgUGFnaW5hdGlvbi5zdGVwICogMiArIDYpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZCgxLCBQYWdpbmF0aW9uLnNpemUgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGFnaW5hdGlvbi5wYWdlIDwgUGFnaW5hdGlvbi5zdGVwICogMiArIDEpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZCgxLCBQYWdpbmF0aW9uLnN0ZXAgKiAyICsgNCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBhZ2luYXRpb24ucGFnZSA+IFBhZ2luYXRpb24uc2l6ZSAtIFBhZ2luYXRpb24uc3RlcCAqIDIpIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5zaXplIC0gUGFnaW5hdGlvbi5zdGVwICogMiAtIDIsIFBhZ2luYXRpb24uc2l6ZSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5wYWdlIC0gUGFnaW5hdGlvbi5zdGVwLCBQYWdpbmF0aW9uLnBhZ2UgKyBQYWdpbmF0aW9uLnN0ZXAgKyAxKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFBhZ2luYXRpb24uRmluaXNoKCk7XG4gICAgfSxcblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEluaXRpYWxpemF0aW9uXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGJpbmRpbmcgYnV0dG9uc1xuICAgIEJ1dHRvbnM6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnN0IG5hdiA9IGVbMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2luc2lkZSBidG5zJywgbmF2KVxuICAgICAgICBuYXZbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQYWdpbmF0aW9uLlByZXYsIGZhbHNlKTtcbiAgICAgICAgbmF2WzFdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGFnaW5hdGlvbi5OZXh0LCBmYWxzZSk7XG4gICAgfSxcblxuICAgIC8vIGNyZWF0ZSBza2VsZXRvblxuICAgIENyZWF0ZTogZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBjb25zdCBodG1sID1cbiAgICAgICAgICAgIGA8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1wcmV2XCI+PGkgY2xhc3M9XCJmYXMgZmEtY2hldnJvbi1sZWZ0XCI+PC9pPjwvYT4gXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtbmV4dFwiPjxpIGNsYXNzPVwiZmFzIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+PC9hPmBcblxuICAgICAgICBjb25zb2xlLmxvZygnYWZ0ZXIgY3JlYXRlJywgZSlcbiAgICAgICAgZVswXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpXG4gICAgICAgIFBhZ2luYXRpb24uZSA9IGVbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbi1wYWdlLWNvbnRhaW5lcicpO1xuICAgICAgICBQYWdpbmF0aW9uLkJ1dHRvbnMoZSk7XG4gICAgfSxcblxuICAgIC8vIGluaXRcbiAgICBJbml0OiBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICBQYWdpbmF0aW9uLkV4dGVuZChkYXRhKTtcbiAgICAgICAgUGFnaW5hdGlvbi5DcmVhdGUoZSk7XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9XG59O1xuXG4vLyBleHBvcnRpbmdcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblxuXG4vKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqXG4gKiBJbml0aWFsaXphdGlvblxuICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKi8iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCBTd2lwZXIgZnJvbSAnc3dpcGVyJ1xyXG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICcuL3BhZ2luYXRpb24nXHJcblxyXG4vLyBzZXR0aW5nIHNsaWRlclxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTbGlkZXIoYnJlYWtwb2ludCA9IDApIHtcclxuICAgIGNvbnNvbGUubG9nKCdzbGlkZXIgaW5pdCcpXHJcbiAgICBsZXQgc2xpZGVySW5zdGFuY2UgPSB3aW5kb3cuaW5uZXJXaWR0aCA8IGJyZWFrcG9pbnQgP1xyXG4gICAgICAgIG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGZyZWVNb2RlOiB0cnVlXHJcbiAgICAgICAgfSkgOlxyXG4gICAgICAgIG51bGxcclxuXHJcbiAgICByZXR1cm4gc2xpZGVySW5zdGFuY2VcclxufVxyXG5cclxuLy8gc2V0dGluZyBuYXZ0YWJzIGFuaW1hdGlvblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXROYXZUYWJzKGJyZWFrcG9pbnQgPSAwLCBzbGlkZXJJbnN0YW5jZSkge1xyXG5cclxuICAgIGNvbnN0IG1hcmtlciA9ICQoJy50YWItbWFya2VyJylcclxuICAgIGNvbnN0IHRhYnMgPSAkKCcudGFiLWxpbmsnKVxyXG5cclxuICAgIGZ1bmN0aW9uIGluZGljYXRvcih0YXJnZXQsIHNoaWZ0ID0gMCkge1xyXG4gICAgICAgIG1hcmtlci5jc3MoJ2xlZnQnLCB0YXJnZXQub2Zmc2V0TGVmdCAtIHNoaWZ0KVxyXG4gICAgICAgIG1hcmtlci5jc3MoJ3dpZHRoJywgdGFyZ2V0Lm9mZnNldFdpZHRoICsgOSlcclxuICAgIH1cclxuXHJcbiAgICB0YWJzLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIHRhYnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gc2xpZGVySW5zdGFuY2UudHJhbnNsYXRlXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IodGFyZ2V0LCA1IC0gdHJhbnNsYXRlKVxyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIGluZGljYXRvcih0YXJnZXQsIDUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoJ2NsaWNrJylcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYgKHNsaWRlckluc3RhbmNlKSB7XHJcbiAgICAgICAgc2xpZGVySW5zdGFuY2Uub24oJ3NldFRyYW5zbGF0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gc2xpZGVySW5zdGFuY2UudHJhbnNsYXRlXHJcbiAgICAgICAgICAgIG1hcmtlci5jc3MoJ2xlZnQnLCAkKCcuYWN0aXZlJylbMF0ub2Zmc2V0TGVmdCArIHRyYW5zbGF0ZSAtIDUpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuLy8gc2V0dGluZyBwYWdpbmF0aW9uXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFBhZ2luYXRpb24oYnJlYWtwb2ludCkge1xyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgc2l6ZTogMTA1LFxyXG4gICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgc3RlcDogMVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IGJyZWFrcG9pbnQpIHtcclxuICAgICAgICBvcHRpb25zLnN0ZXAgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgUGFnaW5hdGlvbi5Jbml0KGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb24nKSwgb3B0aW9ucylcclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCB7XHJcbiAgICBpbml0U2xpZGVyLFxyXG59IGZyb20gJy4vdXRpbHMnXHJcblxyXG4kKGRvY3VtZW50KS5vbignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHsgXHJcblxyXG4gICAgLy8gc2V0dGluZyBzbGlkZXJcclxuXHJcbiAgICBpbml0U2xpZGVyKDc2OClcclxuXHJcbiAgICAvL2V4cGFuZGluZyBzZWFyY2hcclxuICAgIFxyXG4gICAgJCgnLmhlYWRlci1zZWFyY2gtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5zZWFyY2gnKS50b2dnbGVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICBpZiAoJCgnLnNlYXJjaCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyLXNlYXJjaC1maWVsZCcpLnRyaWdnZXIoJ2ZvY3VzJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuaGVhZGVyLXNlYXJjaC1maWVsZCcpLnRyaWdnZXIoJ2JsdXInKS52YWwoJycpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcblxyXG59KVxyXG4iLCJpbXBvcnQgJy4vanMvdmlldydcclxuaW1wb3J0ICcuL3N0eWxlcy92aWV3JyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG4vLyBJdCdzIGVtcHR5IGFzIHNvbWUgcnVudGltZSBtb2R1bGUgaGFuZGxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvclxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fVxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gbW9kdWxlWydkZWZhdWx0J10gOlxuXHRcdCgpID0+IG1vZHVsZTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJ2aWV3XCI6IDBcbn07XG5cbnZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXG5cdFtcIi4vdmlldy5qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfanF1ZXJ5X2Rpc3RfanF1ZXJ5X2pzLW5vZGVfbW9kdWxlc19zd2lwZXJfZXNtX2NvbXBvbmVudHNfY29yZV9jb3JlLWNsYXNzX2pzXCJdXG5dO1xuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxudmFyIGNoZWNrRGVmZXJyZWRNb2R1bGVzID0geCA9PiB7fTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWUsIGV4ZWN1dGVNb2R1bGVzXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG5cdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuXHR9XG5cblx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuXHRpZihleGVjdXRlTW9kdWxlcykgZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyk7XG5cblx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG5cdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpO1xuXG5mdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwoKSB7XG5cdHZhciByZXN1bHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcblx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuXHRcdH1cblx0fVxuXHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxudmFyIHN0YXJ0dXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIHJlc2V0IHN0YXJ0dXAgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGNhbGxlZCBhZ2FpbiB3aGVuIG1vcmUgc3RhcnR1cCBjb2RlIGlzIGFkZGVkXG5cdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHN0YXJ0dXAgfHwgKHggPT4ge30pO1xuXHRyZXR1cm4gKGNoZWNrRGVmZXJyZWRNb2R1bGVzID0gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKSgpO1xufTsiLCIvLyBydW4gc3RhcnR1cFxuX193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG4iXSwic291cmNlUm9vdCI6IiJ9