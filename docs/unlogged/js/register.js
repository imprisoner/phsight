/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/common.less":
/*!****************************!*\
  !*** ./styles/common.less ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./styles/register.less":
/*!******************************!*\
  !*** ./styles/register.less ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./js/register.js":
/*!************************!*\
  !*** ./js/register.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
 
/*<![CDATA[*/
jquery__WEBPACK_IMPORTED_MODULE_0___default()(function ($) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#yw0').after("<a class=\"registration-captcha-refresh\" id=\"yw0_button\" href=\"\/auth\/captcha?refresh=1\"><i class=\"fas fa-redo-alt\"><\/i><\/a>");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#yw0_button', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
            url: "\/auth\/captcha?refresh=1",
            dataType: 'json',
            cache: false,
            success: function (data) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('#yw0').attr('style', `background-image: ${data['url']}`);
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').data('captcha.hash', [data['hash1'], data['hash2']]);
            }
        });
        return false;
    });

    // jQuery('#registration-form').yiiactiveform({
    //     'validateOnSubmit': true,
    //     'attributes': [{
    //         'id': 'RegistrationForm_login',
    //         'inputID': 'RegistrationForm_login',
    //         'errorID': 'RegistrationForm_login_em_',
    //         'model': 'RegistrationForm',
    //         'name': 'login',
    //         'enableAjaxValidation': true,

    //         'clientValidation': function (value, messages, attribute) {

    //             if (jQuery.trim(value) == '') {
    //                 messages.push("\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u043e\u043b\u0435 \u00ab\u041f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c\u00bb.");
    //             }


    //             if (jQuery.trim(value) != '') {

    //                 if (value.length < 2) {
    //                     messages.push("\u041f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043a\u043e\u0440\u043e\u0442\u043a\u0438\u0439 (\u041c\u0438\u043d\u0438\u043c\u0443\u043c: 2 \u0441\u0438\u043c\u0432.).");
    //                 }

    //                 if (value.length > 30) {
    //                     messages.push("\u041f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0434\u043b\u0438\u043d\u043d\u044b\u0439 (\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c: 30 \u0441\u0438\u043c\u0432.).");
    //                 }

    //             }


    //             if (jQuery.trim(value) != '' && !value.match(/^[a-zA-Z0-9_][_a-zA-Z0-9-]*[_a-zA-Z0-9]$/)) {
    //                 messages.push("\u041f\u0441\u0432\u0434\u043e\u043d\u0438\u043c \u043c\u043e\u0436\u0435\u0442 \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0435 \u0431\u0443\u043a\u0432\u044b, \u0446\u0438\u0444\u0440\u044b \u0438 \u0442\u0438\u0440\u0435. \u0422\u0438\u0440\u0435 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0441\u0442\u043e\u044f\u0442\u044c \u0432 \u043d\u0430\u0447\u0430\u043b\u0435 \u0438 \u0432 \u043a\u043e\u043d\u0446\u0435.");
    //             }


    //             if (jQuery.trim(value) != '' && jQuery.inArray(value, ["www", "smtp", "mail", "admin", "pop", "pop3", "imap", "best", "rss", "offline", "ads", "market", "tools", "api", "awards", "pda", "m", "top"]) >= 0) {
    //                 messages.push("\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u0442\u0430\u043a\u043e\u0433\u043e \u043f\u0441\u0435\u0432\u0434\u043e\u043d\u0438\u043c\u0430 \u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u043e");
    //             }

    //         }
    //     }, {
    //         'id': 'RegistrationForm_email',
    //         'inputID': 'RegistrationForm_email',
    //         'errorID': 'RegistrationForm_email_em_',
    //         'model': 'RegistrationForm',
    //         'name': 'email',
    //         'enableAjaxValidation': true,
    //         'clientValidation': function (value, messages, attribute) {

    //             if (jQuery.trim(value) == '') {
    //                 messages.push("\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u043e\u043b\u0435 \u00ab\u041f\u043e\u0447\u0442\u0430\u00bb.");
    //             }


    //             if (jQuery.trim(value) != '') {

    //                 if (value.length > 50) {
    //                     messages.push("\u041f\u043e\u0447\u0442\u0430 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0434\u043b\u0438\u043d\u043d\u044b\u0439 (\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c: 50 \u0441\u0438\u043c\u0432.).");
    //                 }

    //             }



    //             if (jQuery.trim(value) != '' && !value.match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/)) {
    //                 messages.push("\u041d\u0435\u0432\u0435\u0440\u043d\u043e \u0443\u043a\u0430\u0437\u0430\u043d \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043f\u043e\u0447\u0442\u0443 \u0432 \u0432\u0438\u0434\u0435 mail@example.com");
    //             }

    //         }
    //     }, {
    //         'id': 'RegistrationForm_verifyCode',
    //         'inputID': 'RegistrationForm_verifyCode',
    //         'errorID': 'RegistrationForm_verifyCode_em_',
    //         'model': 'RegistrationForm',
    //         'name': 'verifyCode',
    //         'enableAjaxValidation': true,
    //         'clientValidation': function (value, messages, attribute) {

    //             if (jQuery.trim(value) == '') {
    //                 messages.push("\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u043e\u043b\u0435 \u00ab\u0417\u0430\u0449\u0438\u0442\u043d\u044b\u0439 \u043a\u043e\u0434\u00bb.");
    //             }


    //             var hash = jQuery('body').data('captcha.hash');
    //             if (hash == null)
    //                 hash = 632;
    //             else
    //                 hash = hash[1];
    //             for (var i = value.length - 1, h = 0; i >= 0; --i) h += value.toLowerCase().charCodeAt(i);
    //             if (h != hash) {
    //                 messages.push("\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 \u043a\u043e\u0434 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438.");
    //             }

    //         }
    //     }, {
    //         'id': 'RegistrationForm_accept',
    //         'inputID': 'RegistrationForm_accept',
    //         'errorID': 'RegistrationForm_accept_em_',
    //         'model': 'RegistrationForm',
    //         'name': 'accept',
    //         'enableAjaxValidation': true,
    //         'clientValidation': function (value, messages, attribute) {

    //             if (jQuery.trim(value) != '' && value != "1" && value != "0") {
    //                 messages.push("Accept \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c 1 \u0438\u043b\u0438 0.");
    //             }


    //             if (jQuery.trim(value) == '') {
    //                 messages.push("\u0412\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u043f\u0440\u0438\u043d\u044f\u0442\u044c \u0443\u0441\u043b\u043e\u0432\u0438\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u043e\u0433\u043e \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f");
    //             }

    //         }
    //     }],
    //     'errorCss': 'error'
    // });
});
/*]]>*/

/***/ }),

/***/ "./register.js":
/*!*********************!*\
  !*** ./register.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/register */ "./js/register.js");
/* harmony import */ var _styles_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/common */ "./styles/common.less");
/* harmony import */ var _styles_register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/register */ "./styles/register.less");




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
/******/ 			"register": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./register.js","vendors-node_modules_jquery_dist_jquery_js"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvY29tbW9uLmxlc3M/ZjcyOCIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvcmVnaXN0ZXIubGVzcz8yMmMwIiwid2VicGFjazovLy8uL2pzL3JlZ2lzdGVyLmpzIiwid2VicGFjazovLy8uL3JlZ2lzdGVyLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7QUNBMkI7QUFDM0I7QUFDQSw2Q0FBTTtBQUNOLElBQUksNkNBQU07QUFDVixJQUFJLDZDQUFNO0FBQ1YsUUFBUSxrREFBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw2Q0FBTSw0Q0FBNEMsWUFBWTtBQUM5RSxnQkFBZ0IsNkNBQU07QUFDdEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUEsNEZBQTRGLEVBQUUsbUNBQW1DLEVBQUU7QUFDbkk7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQSxRQUFRO0FBQ1IsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7O0FDdElzQjtBQUNFOzs7Ozs7O1VDRHhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLG9CQUFvQjtXQUMxQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDO1dBQ0E7V0FDQSxnQkFBZ0IsMkJBQTJCO1dBQzNDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSw0Q0FBNEM7V0FDNUM7V0FDQSxFOzs7O1VDcEZBO1VBQ0EiLCJmaWxlIjoianMvcmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgalF1ZXJ5IGZyb20gJ2pxdWVyeScgXHJcbi8qPCFbQ0RBVEFbKi9cclxualF1ZXJ5KGZ1bmN0aW9uICgkKSB7XHJcbiAgICBqUXVlcnkoJyN5dzAnKS5hZnRlcihcIjxhIGNsYXNzPVxcXCJyZWdpc3RyYXRpb24tY2FwdGNoYS1yZWZyZXNoXFxcIiBpZD1cXFwieXcwX2J1dHRvblxcXCIgaHJlZj1cXFwiXFwvYXV0aFxcL2NhcHRjaGE/cmVmcmVzaD0xXFxcIj48aSBjbGFzcz1cXFwiZmFzIGZhLXJlZG8tYWx0XFxcIj48XFwvaT48XFwvYT5cIik7XHJcbiAgICBqUXVlcnkoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjeXcwX2J1dHRvbicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBqUXVlcnkuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCJcXC9hdXRoXFwvY2FwdGNoYT9yZWZyZXNoPTFcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXcwJykuYXR0cignc3R5bGUnLCBgYmFja2dyb3VuZC1pbWFnZTogJHtkYXRhWyd1cmwnXX1gKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSgnYm9keScpLmRhdGEoJ2NhcHRjaGEuaGFzaCcsIFtkYXRhWydoYXNoMSddLCBkYXRhWydoYXNoMiddXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBqUXVlcnkoJyNyZWdpc3RyYXRpb24tZm9ybScpLnlpaWFjdGl2ZWZvcm0oe1xyXG4gICAgLy8gICAgICd2YWxpZGF0ZU9uU3VibWl0JzogdHJ1ZSxcclxuICAgIC8vICAgICAnYXR0cmlidXRlcyc6IFt7XHJcbiAgICAvLyAgICAgICAgICdpZCc6ICdSZWdpc3RyYXRpb25Gb3JtX2xvZ2luJyxcclxuICAgIC8vICAgICAgICAgJ2lucHV0SUQnOiAnUmVnaXN0cmF0aW9uRm9ybV9sb2dpbicsXHJcbiAgICAvLyAgICAgICAgICdlcnJvcklEJzogJ1JlZ2lzdHJhdGlvbkZvcm1fbG9naW5fZW1fJyxcclxuICAgIC8vICAgICAgICAgJ21vZGVsJzogJ1JlZ2lzdHJhdGlvbkZvcm0nLFxyXG4gICAgLy8gICAgICAgICAnbmFtZSc6ICdsb2dpbicsXHJcbiAgICAvLyAgICAgICAgICdlbmFibGVBamF4VmFsaWRhdGlvbic6IHRydWUsXHJcblxyXG4gICAgLy8gICAgICAgICAnY2xpZW50VmFsaWRhdGlvbic6IGZ1bmN0aW9uICh2YWx1ZSwgbWVzc2FnZXMsIGF0dHJpYnV0ZSkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmIChqUXVlcnkudHJpbSh2YWx1ZSkgPT0gJycpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFwiXFx1MDQxZFxcdTA0MzVcXHUwNDNlXFx1MDQzMVxcdTA0NDVcXHUwNDNlXFx1MDQzNFxcdTA0MzhcXHUwNDNjXFx1MDQzZSBcXHUwNDM3XFx1MDQzMFxcdTA0M2ZcXHUwNDNlXFx1MDQzYlxcdTA0M2RcXHUwNDM4XFx1MDQ0MlxcdTA0NGMgXFx1MDQzZlxcdTA0M2VcXHUwNDNiXFx1MDQzNSBcXHUwMGFiXFx1MDQxZlxcdTA0NDFcXHUwNDM1XFx1MDQzMlxcdTA0MzRcXHUwNDNlXFx1MDQzZFxcdTA0MzhcXHUwNDNjXFx1MDBiYi5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmIChqUXVlcnkudHJpbSh2YWx1ZSkgIT0gJycpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IDIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcIlxcdTA0MWZcXHUwNDQxXFx1MDQzNVxcdTA0MzJcXHUwNDM0XFx1MDQzZVxcdTA0M2RcXHUwNDM4XFx1MDQzYyBcXHUwNDQxXFx1MDQzYlxcdTA0MzhcXHUwNDQ4XFx1MDQzYVxcdTA0M2VcXHUwNDNjIFxcdTA0M2FcXHUwNDNlXFx1MDQ0MFxcdTA0M2VcXHUwNDQyXFx1MDQzYVxcdTA0MzhcXHUwNDM5IChcXHUwNDFjXFx1MDQzOFxcdTA0M2RcXHUwNDM4XFx1MDQzY1xcdTA0NDNcXHUwNDNjOiAyIFxcdTA0NDFcXHUwNDM4XFx1MDQzY1xcdTA0MzIuKS5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMzApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcIlxcdTA0MWZcXHUwNDQxXFx1MDQzNVxcdTA0MzJcXHUwNDM0XFx1MDQzZVxcdTA0M2RcXHUwNDM4XFx1MDQzYyBcXHUwNDQxXFx1MDQzYlxcdTA0MzhcXHUwNDQ4XFx1MDQzYVxcdTA0M2VcXHUwNDNjIFxcdTA0MzRcXHUwNDNiXFx1MDQzOFxcdTA0M2RcXHUwNDNkXFx1MDQ0YlxcdTA0MzkgKFxcdTA0MWNcXHUwNDMwXFx1MDQzYVxcdTA0NDFcXHUwNDM4XFx1MDQzY1xcdTA0NDNcXHUwNDNjOiAzMCBcXHUwNDQxXFx1MDQzOFxcdTA0M2NcXHUwNDMyLikuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmIChqUXVlcnkudHJpbSh2YWx1ZSkgIT0gJycgJiYgIXZhbHVlLm1hdGNoKC9eW2EtekEtWjAtOV9dW19hLXpBLVowLTktXSpbX2EtekEtWjAtOV0kLykpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFwiXFx1MDQxZlxcdTA0NDFcXHUwNDMyXFx1MDQzNFxcdTA0M2VcXHUwNDNkXFx1MDQzOFxcdTA0M2MgXFx1MDQzY1xcdTA0M2VcXHUwNDM2XFx1MDQzNVxcdTA0NDIgXFx1MDQ0MVxcdTA0M2VcXHUwNDM0XFx1MDQzNVxcdTA0NDBcXHUwNDM2XFx1MDQzMFxcdTA0NDJcXHUwNDRjIFxcdTA0NDJcXHUwNDNlXFx1MDQzYlxcdTA0NGNcXHUwNDNhXFx1MDQzZSBcXHUwNDMwXFx1MDQzZFxcdTA0MzNcXHUwNDNiXFx1MDQzOFxcdTA0MzlcXHUwNDQxXFx1MDQzYVxcdTA0MzhcXHUwNDM1IFxcdTA0MzFcXHUwNDQzXFx1MDQzYVxcdTA0MzJcXHUwNDRiLCBcXHUwNDQ2XFx1MDQzOFxcdTA0NDRcXHUwNDQwXFx1MDQ0YiBcXHUwNDM4IFxcdTA0NDJcXHUwNDM4XFx1MDQ0MFxcdTA0MzUuIFxcdTA0MjJcXHUwNDM4XFx1MDQ0MFxcdTA0MzUgXFx1MDQzZFxcdTA0MzUgXFx1MDQzY1xcdTA0M2VcXHUwNDM2XFx1MDQzNVxcdTA0NDIgXFx1MDQ0MVxcdTA0NDJcXHUwNDNlXFx1MDQ0ZlxcdTA0NDJcXHUwNDRjIFxcdTA0MzIgXFx1MDQzZFxcdTA0MzBcXHUwNDQ3XFx1MDQzMFxcdTA0M2JcXHUwNDM1IFxcdTA0MzggXFx1MDQzMiBcXHUwNDNhXFx1MDQzZVxcdTA0M2RcXHUwNDQ2XFx1MDQzNS5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmIChqUXVlcnkudHJpbSh2YWx1ZSkgIT0gJycgJiYgalF1ZXJ5LmluQXJyYXkodmFsdWUsIFtcInd3d1wiLCBcInNtdHBcIiwgXCJtYWlsXCIsIFwiYWRtaW5cIiwgXCJwb3BcIiwgXCJwb3AzXCIsIFwiaW1hcFwiLCBcImJlc3RcIiwgXCJyc3NcIiwgXCJvZmZsaW5lXCIsIFwiYWRzXCIsIFwibWFya2V0XCIsIFwidG9vbHNcIiwgXCJhcGlcIiwgXCJhd2FyZHNcIiwgXCJwZGFcIiwgXCJtXCIsIFwidG9wXCJdKSA+PSAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcIlxcdTA0MThcXHUwNDQxXFx1MDQzZlxcdTA0M2VcXHUwNDNiXFx1MDQ0Y1xcdTA0MzdcXHUwNDNlXFx1MDQzMlxcdTA0MzBcXHUwNDNkXFx1MDQzOFxcdTA0MzUgXFx1MDQ0MlxcdTA0MzBcXHUwNDNhXFx1MDQzZVxcdTA0MzNcXHUwNDNlIFxcdTA0M2ZcXHUwNDQxXFx1MDQzNVxcdTA0MzJcXHUwNDM0XFx1MDQzZVxcdTA0M2RcXHUwNDM4XFx1MDQzY1xcdTA0MzAgXFx1MDQzN1xcdTA0MzBcXHUwNDNmXFx1MDQ0MFxcdTA0MzVcXHUwNDQ5XFx1MDQzNVxcdTA0M2RcXHUwNDNlXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0sIHtcclxuICAgIC8vICAgICAgICAgJ2lkJzogJ1JlZ2lzdHJhdGlvbkZvcm1fZW1haWwnLFxyXG4gICAgLy8gICAgICAgICAnaW5wdXRJRCc6ICdSZWdpc3RyYXRpb25Gb3JtX2VtYWlsJyxcclxuICAgIC8vICAgICAgICAgJ2Vycm9ySUQnOiAnUmVnaXN0cmF0aW9uRm9ybV9lbWFpbF9lbV8nLFxyXG4gICAgLy8gICAgICAgICAnbW9kZWwnOiAnUmVnaXN0cmF0aW9uRm9ybScsXHJcbiAgICAvLyAgICAgICAgICduYW1lJzogJ2VtYWlsJyxcclxuICAgIC8vICAgICAgICAgJ2VuYWJsZUFqYXhWYWxpZGF0aW9uJzogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgJ2NsaWVudFZhbGlkYXRpb24nOiBmdW5jdGlvbiAodmFsdWUsIG1lc3NhZ2VzLCBhdHRyaWJ1dGUpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoalF1ZXJ5LnRyaW0odmFsdWUpID09ICcnKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcIlxcdTA0MWRcXHUwNDM1XFx1MDQzZVxcdTA0MzFcXHUwNDQ1XFx1MDQzZVxcdTA0MzRcXHUwNDM4XFx1MDQzY1xcdTA0M2UgXFx1MDQzN1xcdTA0MzBcXHUwNDNmXFx1MDQzZVxcdTA0M2JcXHUwNDNkXFx1MDQzOFxcdTA0NDJcXHUwNDRjIFxcdTA0M2ZcXHUwNDNlXFx1MDQzYlxcdTA0MzUgXFx1MDBhYlxcdTA0MWZcXHUwNDNlXFx1MDQ0N1xcdTA0NDJcXHUwNDMwXFx1MDBiYi5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmIChqUXVlcnkudHJpbSh2YWx1ZSkgIT0gJycpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDUwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goXCJcXHUwNDFmXFx1MDQzZVxcdTA0NDdcXHUwNDQyXFx1MDQzMCBcXHUwNDQxXFx1MDQzYlxcdTA0MzhcXHUwNDQ4XFx1MDQzYVxcdTA0M2VcXHUwNDNjIFxcdTA0MzRcXHUwNDNiXFx1MDQzOFxcdTA0M2RcXHUwNDNkXFx1MDQ0YlxcdTA0MzkgKFxcdTA0MWNcXHUwNDMwXFx1MDQzYVxcdTA0NDFcXHUwNDM4XFx1MDQzY1xcdTA0NDNcXHUwNDNjOiA1MCBcXHUwNDQxXFx1MDQzOFxcdTA0M2NcXHUwNDMyLikuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoalF1ZXJ5LnRyaW0odmFsdWUpICE9ICcnICYmICF2YWx1ZS5tYXRjaCgvXlthLXpBLVowLTkhIyQlJicqK1xcLz0/Xl9ge3x9fi1dKyg/OlxcLlthLXpBLVowLTkhIyQlJicqK1xcLz0/Xl9ge3x9fi1dKykqQCg/OlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dKlthLXpBLVowLTldKT9cXC4pK1thLXpBLVowLTldKD86W2EtekEtWjAtOS1dKlthLXpBLVowLTldKT8kLykpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFwiXFx1MDQxZFxcdTA0MzVcXHUwNDMyXFx1MDQzNVxcdTA0NDBcXHUwNDNkXFx1MDQzZSBcXHUwNDQzXFx1MDQzYVxcdTA0MzBcXHUwNDM3XFx1MDQzMFxcdTA0M2QgXFx1MDQzMFxcdTA0MzRcXHUwNDQwXFx1MDQzNVxcdTA0NDEgXFx1MDQ0ZFxcdTA0M2JcXHUwNDM1XFx1MDQzYVxcdTA0NDJcXHUwNDQwXFx1MDQzZVxcdTA0M2RcXHUwNDNkXFx1MDQzZVxcdTA0MzkgXFx1MDQzZlxcdTA0M2VcXHUwNDQ3XFx1MDQ0MlxcdTA0NGIuIFxcdTA0MWZcXHUwNDNlXFx1MDQzNlxcdTA0MzBcXHUwNDNiXFx1MDQ0M1xcdTA0MzlcXHUwNDQxXFx1MDQ0MlxcdTA0MzAgXFx1MDQ0M1xcdTA0M2FcXHUwNDMwXFx1MDQzNlxcdTA0MzhcXHUwNDQyXFx1MDQzNSBcXHUwNDNmXFx1MDQzZVxcdTA0NDdcXHUwNDQyXFx1MDQ0MyBcXHUwNDMyIFxcdTA0MzJcXHUwNDM4XFx1MDQzNFxcdTA0MzUgbWFpbEBleGFtcGxlLmNvbVwiKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9LCB7XHJcbiAgICAvLyAgICAgICAgICdpZCc6ICdSZWdpc3RyYXRpb25Gb3JtX3ZlcmlmeUNvZGUnLFxyXG4gICAgLy8gICAgICAgICAnaW5wdXRJRCc6ICdSZWdpc3RyYXRpb25Gb3JtX3ZlcmlmeUNvZGUnLFxyXG4gICAgLy8gICAgICAgICAnZXJyb3JJRCc6ICdSZWdpc3RyYXRpb25Gb3JtX3ZlcmlmeUNvZGVfZW1fJyxcclxuICAgIC8vICAgICAgICAgJ21vZGVsJzogJ1JlZ2lzdHJhdGlvbkZvcm0nLFxyXG4gICAgLy8gICAgICAgICAnbmFtZSc6ICd2ZXJpZnlDb2RlJyxcclxuICAgIC8vICAgICAgICAgJ2VuYWJsZUFqYXhWYWxpZGF0aW9uJzogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgJ2NsaWVudFZhbGlkYXRpb24nOiBmdW5jdGlvbiAodmFsdWUsIG1lc3NhZ2VzLCBhdHRyaWJ1dGUpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoalF1ZXJ5LnRyaW0odmFsdWUpID09ICcnKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcIlxcdTA0MWRcXHUwNDM1XFx1MDQzZVxcdTA0MzFcXHUwNDQ1XFx1MDQzZVxcdTA0MzRcXHUwNDM4XFx1MDQzY1xcdTA0M2UgXFx1MDQzN1xcdTA0MzBcXHUwNDNmXFx1MDQzZVxcdTA0M2JcXHUwNDNkXFx1MDQzOFxcdTA0NDJcXHUwNDRjIFxcdTA0M2ZcXHUwNDNlXFx1MDQzYlxcdTA0MzUgXFx1MDBhYlxcdTA0MTdcXHUwNDMwXFx1MDQ0OVxcdTA0MzhcXHUwNDQyXFx1MDQzZFxcdTA0NGJcXHUwNDM5IFxcdTA0M2FcXHUwNDNlXFx1MDQzNFxcdTAwYmIuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAvLyAgICAgICAgICAgICB2YXIgaGFzaCA9IGpRdWVyeSgnYm9keScpLmRhdGEoJ2NhcHRjaGEuaGFzaCcpO1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKGhhc2ggPT0gbnVsbClcclxuICAgIC8vICAgICAgICAgICAgICAgICBoYXNoID0gNjMyO1xyXG4gICAgLy8gICAgICAgICAgICAgZWxzZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGhhc2ggPSBoYXNoWzFdO1xyXG4gICAgLy8gICAgICAgICAgICAgZm9yICh2YXIgaSA9IHZhbHVlLmxlbmd0aCAtIDEsIGggPSAwOyBpID49IDA7IC0taSkgaCArPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoaCAhPSBoYXNoKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChcIlxcdTA0MWRcXHUwNDM1XFx1MDQzZlxcdTA0NDBcXHUwNDMwXFx1MDQzMlxcdTA0MzhcXHUwNDNiXFx1MDQ0Y1xcdTA0M2RcXHUwNDRiXFx1MDQzOSBcXHUwNDNhXFx1MDQzZVxcdTA0MzQgXFx1MDQzZlxcdTA0NDBcXHUwNDNlXFx1MDQzMlxcdTA0MzVcXHUwNDQwXFx1MDQzYVxcdTA0MzguXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0sIHtcclxuICAgIC8vICAgICAgICAgJ2lkJzogJ1JlZ2lzdHJhdGlvbkZvcm1fYWNjZXB0JyxcclxuICAgIC8vICAgICAgICAgJ2lucHV0SUQnOiAnUmVnaXN0cmF0aW9uRm9ybV9hY2NlcHQnLFxyXG4gICAgLy8gICAgICAgICAnZXJyb3JJRCc6ICdSZWdpc3RyYXRpb25Gb3JtX2FjY2VwdF9lbV8nLFxyXG4gICAgLy8gICAgICAgICAnbW9kZWwnOiAnUmVnaXN0cmF0aW9uRm9ybScsXHJcbiAgICAvLyAgICAgICAgICduYW1lJzogJ2FjY2VwdCcsXHJcbiAgICAvLyAgICAgICAgICdlbmFibGVBamF4VmFsaWRhdGlvbic6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICdjbGllbnRWYWxpZGF0aW9uJzogZnVuY3Rpb24gKHZhbHVlLCBtZXNzYWdlcywgYXR0cmlidXRlKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgaWYgKGpRdWVyeS50cmltKHZhbHVlKSAhPSAnJyAmJiB2YWx1ZSAhPSBcIjFcIiAmJiB2YWx1ZSAhPSBcIjBcIikge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goXCJBY2NlcHQgXFx1MDQzNFxcdTA0M2VcXHUwNDNiXFx1MDQzNlxcdTA0M2RcXHUwNDNlIFxcdTA0MzFcXHUwNDRiXFx1MDQ0MlxcdTA0NGMgMSBcXHUwNDM4XFx1MDQzYlxcdTA0MzggMC5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmIChqUXVlcnkudHJpbSh2YWx1ZSkgPT0gJycpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFwiXFx1MDQxMlxcdTA0NGIgXFx1MDQzNFxcdTA0M2VcXHUwNDNiXFx1MDQzNlxcdTA0M2RcXHUwNDRiIFxcdTA0M2ZcXHUwNDQwXFx1MDQzOFxcdTA0M2RcXHUwNDRmXFx1MDQ0MlxcdTA0NGMgXFx1MDQ0M1xcdTA0NDFcXHUwNDNiXFx1MDQzZVxcdTA0MzJcXHUwNDM4XFx1MDQ0ZiBcXHUwNDNmXFx1MDQzZVxcdTA0M2JcXHUwNDRjXFx1MDQzN1xcdTA0M2VcXHUwNDMyXFx1MDQzMFxcdTA0NDJcXHUwNDM1XFx1MDQzYlxcdTA0NGNcXHUwNDQxXFx1MDQzYVxcdTA0M2VcXHUwNDMzXFx1MDQzZSBcXHUwNDQxXFx1MDQzZVxcdTA0MzNcXHUwNDNiXFx1MDQzMFxcdTA0NDhcXHUwNDM1XFx1MDQzZFxcdTA0MzhcXHUwNDRmXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1dLFxyXG4gICAgLy8gICAgICdlcnJvckNzcyc6ICdlcnJvcidcclxuICAgIC8vIH0pO1xyXG59KTtcclxuLypdXT4qLyIsImltcG9ydCAnLi9qcy9yZWdpc3RlcidcclxuaW1wb3J0ICcuL3N0eWxlcy9jb21tb24nXHJcbmltcG9ydCAnLi9zdHlsZXMvcmVnaXN0ZXInIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gdGhlIHN0YXJ0dXAgZnVuY3Rpb25cbi8vIEl0J3MgZW1wdHkgYXMgc29tZSBydW50aW1lIG1vZHVsZSBoYW5kbGVzIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSB4ID0+IHt9XG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInJlZ2lzdGVyXCI6IDBcbn07XG5cbnZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXG5cdFtcIi4vcmVnaXN0ZXIuanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2pxdWVyeV9kaXN0X2pxdWVyeV9qc1wiXVxuXTtcbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbnZhciBjaGVja0RlZmVycmVkTW9kdWxlcyA9IHggPT4ge307XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lLCBleGVjdXRlTW9kdWxlc10gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuXHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcblx0fVxuXG5cdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3Rcblx0aWYoZXhlY3V0ZU1vZHVsZXMpIGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMpO1xuXG5cdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gPSBzZWxmW1wid2VicGFja0NodW5rXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTtcblxuZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKCkge1xuXHR2YXIgcmVzdWx0O1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuXHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG5cdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcblx0XHR9XG5cdH1cblx0aWYoZGVmZXJyZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHggPT4ge307XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cbnZhciBzdGFydHVwID0gX193ZWJwYWNrX3JlcXVpcmVfXy54O1xuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyByZXNldCBzdGFydHVwIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBjYWxsZWQgYWdhaW4gd2hlbiBtb3JlIHN0YXJ0dXAgY29kZSBpcyBhZGRlZFxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnggPSBzdGFydHVwIHx8ICh4ID0+IHt9KTtcblx0cmV0dXJuIChjaGVja0RlZmVycmVkTW9kdWxlcyA9IGNoZWNrRGVmZXJyZWRNb2R1bGVzSW1wbCkoKTtcbn07IiwiLy8gcnVuIHN0YXJ0dXBcbl9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==