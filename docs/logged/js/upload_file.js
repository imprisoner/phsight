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
jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.replacement').on('click', function (e) {
        e.preventDefault()
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.file-input').trigger('click')
    })
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.fa-upload').on('click', function (e) {
        e.preventDefault()
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.file-input').trigger('click')
    })

    // header animations

    ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.expandSearch)('header')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.initNavTabs)('.header-navlink')

    // popup listeners
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('header-menu-btn', 'burger')
    if (window.innerWidth < 1279) (0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('header-user-logged', 'user')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.expandSearch)('burger')

    const popup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.popup-menu')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('trigger', 'popup')
    // desktop user menu hover appearance
    if (window.innerWidth > 1279) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-user-avatar').on('mouseenter', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown', function (e) {
                if (e.code === 'Escape') jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').hide(200)
            })
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').show(200)
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').on('mouseleave', function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hide(200)
            })
        })
    }


    // FILE upload

    // drag&drop

    const dropArea = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.replacement')
    const input = jquery__WEBPACK_IMPORTED_MODULE_0___default()('input[type=file]')[0]
    const form = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#photo_form')[0]


    const prev = function (e) {
        return false
    }

    const handleFile = function (e) {
        
        if (e.type === 'drop') {
            if (e.originalEvent.dataTransfer.files.length > 1 || input.files.length > 1) {
                popup.find('.insertion').html('Вы не можете загрузить более одного файла')
                popup.find('.trigger').trigger('click')
                return
            }
            
            input.files = e.originalEvent.dataTransfer.files
            console.log(input.files)
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(input).trigger('change')
        }

        const file = input.files[0]

        dropArea.find('span').remove()
        dropArea.find('p')[0].innerHTML = file.name

    }

    dropArea.on('dragenter dragleave dragover drop', prev)
    dropArea.on('drop', handleFile)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(input).on('change', handleFile)

        console.log('content loaded')

        function check_file() {
            console.log('checking file')
            var $this = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#UploadPhotoFormModel_file');
            if ($this[0].files[0] == undefined) {
                popup.find('.insertion').html('<h3>Выберите файл</h3><p>Вы не указали загружаемую фотографию.</p>')
                popup.find('.trigger').trigger('click')
                return false;
            }

            var fSize = $this[0].files[0].size
            if (fSize > (1024 * 1024 * 10)) {
                popup.find('.insertion').html('<h3>Превышение размера файла</h3><p>Вы не можете загрузить фотографию, превышающую максимально допустимый размер.</p>')
                popup.find('.trigger').trigger('click')
                return false;
            }

            var fup = document.getElementById('UploadPhotoFormModel_file');
            var fileName = fup.value;
            var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
            if (ext !== "gif" && ext !== "jpeg" && ext !== "jpg" && ext !== "png") {
                popup.find('.insertion').html('<h3>Неверный тип файла</h3><p>Вы не можете загрузить файл в формате ' + ext + '</p>')
                popup.find('.trigger').trigger('click')
                return false;
            }
            return true;
        }

        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#UploadPhotoFormModel_file').on('change', function () {
            check_file();
        });

        jquery__WEBPACK_IMPORTED_MODULE_0___default()('#photo_form').on('submit', function () {
            console.log('submitting')
            if (!check_file()) {
                return false;
            }
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('#submit-button').prop('disabled', true).val('Подождите...');
        });
    })


/***/ }),

/***/ "./upload.js":
/*!*******************!*\
  !*** ./upload.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_upload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/upload */ "./js/upload.js");
/* harmony import */ var _styles_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/common */ "./styles/common.less");
/* harmony import */ var _styles_upload_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/upload.less */ "./styles/upload.less");





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
/******/ 			["./upload.js","vendors-node_modules_jquery_dist_jquery_js-node_modules_swiper_esm_components_core_core-class_js","styles_common_less-js_utils_js"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvdXBsb2FkLmxlc3M/MzBiYiIsIndlYnBhY2s6Ly8vLi9qcy91cGxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vdXBsb2FkLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFNTjs7QUFFaEI7QUFDQSw2Q0FBQzs7QUFFRCxJQUFJLDZDQUFDO0FBQ0w7QUFDQSxRQUFRLDZDQUFDO0FBQ1QsS0FBSztBQUNMLElBQUksNkNBQUM7QUFDTDtBQUNBLFFBQVEsNkNBQUM7QUFDVCxLQUFLOztBQUVMOztBQUVBLElBQUkscURBQVk7QUFDaEIsSUFBSSxvREFBVzs7QUFFZjtBQUNBLElBQUksb0RBQVc7QUFDZixrQ0FBa0MsbURBQVc7QUFDN0MsSUFBSSxxREFBWTs7QUFFaEIsa0JBQWtCLDZDQUFDO0FBQ25CLElBQUksb0RBQVc7QUFDZjtBQUNBO0FBQ0EsUUFBUSw2Q0FBQztBQUNULFlBQVksNkNBQUM7QUFDYix5Q0FBeUMsNkNBQUM7QUFDMUMsYUFBYTtBQUNiLFlBQVksNkNBQUM7QUFDYixZQUFZLDZDQUFDO0FBQ2IsZ0JBQWdCLDZDQUFDO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7OztBQUdBOztBQUVBOztBQUVBLHFCQUFxQiw2Q0FBQztBQUN0QixrQkFBa0IsNkNBQUM7QUFDbkI7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFlBQVksNkNBQUM7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLDZDQUFDOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEsd0JBQXdCLDZDQUFDO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsNkNBQUM7QUFDVDtBQUNBLFNBQVM7O0FBRVQsUUFBUSw2Q0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw2Q0FBQztBQUNiLFNBQVM7QUFDVCxLQUFLOztBQUVMLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7QUN6SW1CO0FBQ0k7QUFDSzs7Ozs7OztVQ0Y3QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxvQkFBb0I7V0FDMUI7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQztXQUNBO1dBQ0EsZ0JBQWdCLDJCQUEyQjtXQUMzQztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsNENBQTRDO1dBQzVDO1dBQ0EsRTs7OztVQ3BGQTtVQUNBIiwiZmlsZSI6ImpzL3VwbG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcclxuaW1wb3J0IHtcclxuICAgIGV4cGFuZFNlYXJjaCxcclxuICAgIHRvZ2dsZVBvcHVwLFxyXG4gICAgLy8gc2VsZWN0aXplLFxyXG4gICAgaW5pdE5hdlRhYnNcclxufSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuLy8gcmVwbGFjaW5nIGZpbGVpbnB1dFxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKCcucmVwbGFjZW1lbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICQoJy5maWxlLWlucHV0JykudHJpZ2dlcignY2xpY2snKVxyXG4gICAgfSlcclxuICAgICQoJy5mYS11cGxvYWQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICQoJy5maWxlLWlucHV0JykudHJpZ2dlcignY2xpY2snKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBoZWFkZXIgYW5pbWF0aW9uc1xyXG5cclxuICAgIGV4cGFuZFNlYXJjaCgnaGVhZGVyJylcclxuICAgIGluaXROYXZUYWJzKCcuaGVhZGVyLW5hdmxpbmsnKVxyXG5cclxuICAgIC8vIHBvcHVwIGxpc3RlbmVyc1xyXG4gICAgdG9nZ2xlUG9wdXAoJ2hlYWRlci1tZW51LWJ0bicsICdidXJnZXInKVxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgMTI3OSkgdG9nZ2xlUG9wdXAoJ2hlYWRlci11c2VyLWxvZ2dlZCcsICd1c2VyJylcclxuICAgIGV4cGFuZFNlYXJjaCgnYnVyZ2VyJylcclxuXHJcbiAgICBjb25zdCBwb3B1cCA9ICQoJy5wb3B1cC1tZW51JylcclxuICAgIHRvZ2dsZVBvcHVwKCd0cmlnZ2VyJywgJ3BvcHVwJylcclxuICAgIC8vIGRlc2t0b3AgdXNlciBtZW51IGhvdmVyIGFwcGVhcmFuY2VcclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEyNzkpIHtcclxuICAgICAgICAkKCcuaGVhZGVyLXVzZXItYXZhdGFyJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdFc2NhcGUnKSAkKCcudXNlci1tZW51JykuaGlkZSgyMDApXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoJy51c2VyLW1lbnUnKS5zaG93KDIwMClcclxuICAgICAgICAgICAgJCgnLnVzZXItbWVudScpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKDIwMClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBGSUxFIHVwbG9hZFxyXG5cclxuICAgIC8vIGRyYWcmZHJvcFxyXG5cclxuICAgIGNvbnN0IGRyb3BBcmVhID0gJCgnLnJlcGxhY2VtZW50JylcclxuICAgIGNvbnN0IGlucHV0ID0gJCgnaW5wdXRbdHlwZT1maWxlXScpWzBdXHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZm9ybXNbMF1cclxuXHJcblxyXG4gICAgY29uc3QgcHJldiA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRmlsZSA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgIGlmIChlLnR5cGUgPT09ICdkcm9wJykge1xyXG4gICAgICAgICAgICAkKGlucHV0KS50cmlnZ2VyKCdjaGFuZ2UnKVxyXG4gICAgICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5sZW5ndGggPiAxIHx8IGlucHV0LmZpbGVzLmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkcm9wQXJlYS5maW5kKCdwJylbMF0uaW5uZXJIVE1MID0gJ9CS0Ysg0L3QtSDQvNC+0LbQtdGC0LUg0LfQsNCz0YDRg9C30LjRgtGMINCx0L7Qu9C10LUg0L7QtNC90L7Qs9C+INGE0LDQudC70LAnXHJcbiAgICAgICAgICAgICAgICBmb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5wdXQuZmlsZXMgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmaWxlID0gaW5wdXQuZmlsZXNbMF1cclxuXHJcbiAgICAgICAgZHJvcEFyZWEuZmluZCgnc3BhbicpLnJlbW92ZSgpXHJcbiAgICAgICAgZHJvcEFyZWEuZmluZCgncCcpWzBdLmlubmVySFRNTCA9IGZpbGUubmFtZVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkcm9wQXJlYS5vbignZHJhZ2VudGVyIGRyYWdsZWF2ZSBkcmFnb3ZlciBkcm9wJywgcHJldilcclxuICAgIGRyb3BBcmVhLm9uKCdkcm9wJywgaGFuZGxlRmlsZSlcclxuICAgICQoaW5wdXQpLm9uKCdjaGFuZ2UnLCBoYW5kbGVGaWxlKVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjb250ZW50IGxvYWRlZCcpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrX2ZpbGUoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKCcjVXBsb2FkUGhvdG9Gb3JtTW9kZWxfZmlsZScpO1xyXG4gICAgICAgICAgICBpZiAoJHRoaXNbMF0uZmlsZXNbMF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcG9wdXAgPSBuZXcgUG9wVXAoKTtcclxuICAgICAgICAgICAgICAgIC8vIHBvcHVwLnNldENvbnRlbnQoJzxoMz7QktGL0LHQtdGA0LjRgtC1INGE0LDQudC7PC9oMz48cD7QktGLINC90LUg0YPQutCw0LfQsNC70Lgg0LfQsNCz0YDRg9C20LDQtdC80YPRjiDRhNC+0YLQvtCz0YDQsNGE0LjRji48L3A+Jyk7XHJcbiAgICAgICAgICAgICAgICAvLyBwb3B1cC5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcuaW5zZXJ0aW9uJykuaHRtbCgnPGgzPtCS0YvQsdC10YDQuNGC0LUg0YTQsNC50Ls8L2gzPjxwPtCS0Ysg0L3QtSDRg9C60LDQt9Cw0LvQuCDQt9Cw0LPRgNGD0LbQsNC10LzRg9GOINGE0L7RgtC+0LPRgNCw0YTQuNGOLjwvcD4nKVxyXG4gICAgICAgICAgICAgICAgcG9wdXAuZmluZCgnLnRyaWdnZXInKS50cmlnZ2VyKCdjbGljaycpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmU2l6ZSA9ICR0aGlzWzBdLmZpbGVzWzBdLnNpemVcclxuICAgICAgICAgICAgaWYgKGZTaXplID4gKDEwMjQgKiAxMDI0ICogMTApKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcG9wdXAgPSBuZXcgUG9wVXAoKTtcclxuICAgICAgICAgICAgICAgIC8vIHBvcHVwLnNldENvbnRlbnQoJzxoMz7Qn9GA0LXQstGL0YjQtdC90LjQtSDRgNCw0LfQvNC10YDQsCDRhNCw0LnQu9CwPC9oMz48cD7QktGLINC90LUg0LzQvtC20LXRgtC1INC30LDQs9GA0YPQt9C40YLRjCDRhNC+0YLQvtCz0YDQsNGE0LjRjiwg0L/RgNC10LLRi9GI0LDRjtGJ0YPRjiDQvNCw0LrRgdC40LzQsNC70YzQvdC+INC00L7Qv9GD0YHRgtC40LzRi9C5INGA0LDQt9C80LXRgC48L3A+Jyk7XHJcbiAgICAgICAgICAgICAgICAvLyBwb3B1cC5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcuaW5zZXJ0aW9uJykuaHRtbCgnPGgzPtCf0YDQtdCy0YvRiNC10L3QuNC1INGA0LDQt9C80LXRgNCwINGE0LDQudC70LA8L2gzPjxwPtCS0Ysg0L3QtSDQvNC+0LbQtdGC0LUg0LfQsNCz0YDRg9C30LjRgtGMINGE0L7RgtC+0LPRgNCw0YTQuNGOLCDQv9GA0LXQstGL0YjQsNGO0YnRg9GOINC80LDQutGB0LjQvNCw0LvRjNC90L4g0LTQvtC/0YPRgdGC0LjQvNGL0Lkg0YDQsNC30LzQtdGALjwvcD4nKVxyXG4gICAgICAgICAgICAgICAgcG9wdXAuZmluZCgnLnRyaWdnZXInKS50cmlnZ2VyKCdjbGljaycpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnVXBsb2FkUGhvdG9Gb3JtTW9kZWxfZmlsZScpO1xyXG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBmdXAudmFsdWU7XHJcbiAgICAgICAgICAgIHZhciBleHQgPSBmaWxlTmFtZS5zdWJzdHJpbmcoZmlsZU5hbWUubGFzdEluZGV4T2YoJy4nKSArIDEpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmIChleHQgIT09IFwiZ2lmXCIgJiYgZXh0ICE9PSBcImpwZWdcIiAmJiBleHQgIT09IFwianBnXCIgJiYgZXh0ICE9PSBcInBuZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcG9wdXAgPSBuZXcgUG9wVXAoKTtcclxuICAgICAgICAgICAgICAgIC8vIHBvcHVwLnNldENvbnRlbnQoJzxoMz7QndC10LLQtdGA0L3Ri9C5INGC0LjQvyDRhNCw0LnQu9CwPC9oMz48cD7QktGLINC90LUg0LzQvtC20LXRgtC1INC30LDQs9GA0YPQt9C40YLRjCDRhNCw0LnQuyDQsiDRhNC+0YDQvNCw0YLQtSAnICsgZXh0ICsgJzwvcD4nKTtcclxuICAgICAgICAgICAgICAgIC8vIHBvcHVwLm9wZW4oKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKCc8aDM+0J3QtdCy0LXRgNC90YvQuSDRgtC40L8g0YTQsNC50LvQsDwvaDM+PHA+0JLRiyDQvdC1INC80L7QttC10YLQtSDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YTQsNC50Lsg0LIg0YTQvtGA0LzQsNGC0LUgJyArIGV4dCArICc8L3A+JylcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy50cmlnZ2VyJykudHJpZ2dlcignY2xpY2snKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnI1VwbG9hZFBob3RvRm9ybU1vZGVsX2ZpbGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaGVja19maWxlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNwaG90b19mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFjaGVja19maWxlKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3VibWl0dGluZycpXHJcbiAgICAgICAgICAgICQoJyNzdWJtaXQtYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS52YWwoJ9Cf0L7QtNC+0LbQtNC40YLQtS4uLicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbn0pIiwiaW1wb3J0ICcuL2pzL3VwbG9hZCdcclxuaW1wb3J0ICcuL3N0eWxlcy9jb21tb24nXHJcbmltcG9ydCAnLi9zdHlsZXMvdXBsb2FkLmxlc3MnXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG4vLyBJdCdzIGVtcHR5IGFzIHNvbWUgcnVudGltZSBtb2R1bGUgaGFuZGxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvclxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fVxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gbW9kdWxlWydkZWZhdWx0J10gOlxuXHRcdCgpID0+IG1vZHVsZTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJ1cGxvYWRcIjogMFxufTtcblxudmFyIGRlZmVycmVkTW9kdWxlcyA9IFtcblx0W1wiLi91cGxvYWQuanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2pxdWVyeV9kaXN0X2pxdWVyeV9qcy1ub2RlX21vZHVsZXNfc3dpcGVyX2VzbV9jb21wb25lbnRzX2NvcmVfY29yZS1jbGFzc19qc1wiLFwic3R5bGVzX2NvbW1vbl9sZXNzLWpzX3V0aWxzX2pzXCJdXG5dO1xuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxudmFyIGNoZWNrRGVmZXJyZWRNb2R1bGVzID0geCA9PiB7fTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWUsIGV4ZWN1dGVNb2R1bGVzXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG5cdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuXHR9XG5cblx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuXHRpZihleGVjdXRlTW9kdWxlcykgZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyk7XG5cblx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG5cdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpO1xuXG5mdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwoKSB7XG5cdHZhciByZXN1bHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcblx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuXHRcdH1cblx0fVxuXHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxudmFyIHN0YXJ0dXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIHJlc2V0IHN0YXJ0dXAgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGNhbGxlZCBhZ2FpbiB3aGVuIG1vcmUgc3RhcnR1cCBjb2RlIGlzIGFkZGVkXG5cdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHN0YXJ0dXAgfHwgKHggPT4ge30pO1xuXHRyZXR1cm4gKGNoZWNrRGVmZXJyZWRNb2R1bGVzID0gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKSgpO1xufTsiLCIvLyBydW4gc3RhcnR1cFxuX193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG4iXSwic291cmNlUm9vdCI6IiJ9