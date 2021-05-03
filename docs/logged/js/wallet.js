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

/***/ "./styles/wallet.less":
/*!****************************!*\
  !*** ./styles/wallet.less ***!
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
/* harmony export */   "expandSearch": () => /* binding */ expandSearch,
/* harmony export */   "selectize": () => /* binding */ selectize,
/* harmony export */   "showTroubleTicketForm": () => /* binding */ showTroubleTicketForm
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
            slideToClickedSlide: clickSlide,
            freeMode: true
        }) :
        null
        console.log(sliderInstance)
    return sliderInstance
}

// setting navtabs animation

function initNavTabs(el = '') {

    const tabs = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el)

    tabs.each(function (i) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('click', function (e) {

            tabs.removeClass('active')
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active')

        })
    })
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
            // 
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-menu`).on('click', function(e) {
                e.stopPropagation()
            })
            // 
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('keydown', function (e) {

                if (e.code === 'Escape') {
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-menu`).hide()
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").css("overflow-y", "");
                }

            })



            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-close`).one('click', function (e) {
                // e.stopPropagation()
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-menu`).hide()
                jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").css("overflow-y", "");
            })

        })
    }
    if (popup === 'burger') {
        expandSearch(popup)
    }
}

// expanding search

function expandSearch(area = '') {

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${area}-search-btn`).on('click', function (e) {
        console.log('here')
        const button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)
        const input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${area}-search-field`)
        const form = button.closest('form')


        if (!form.hasClass('active')) {

            form.addClass('active')

            input.trigger('focus')

            function submit(e) {
                e.stopPropagation()
                form.trigger('submit')

            }


            button.on('click', submit)

            input.on('click', function (e) {
                e.stopPropagation()
            })
            form.on('click', function (e) {
                e.stopPropagation()
            })

            jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('keydown', function (e) {

                if (e.code === 'Enter') {
                    form.trigger('submit')
                }

                if (e.code === 'Escape') {
                    form.removeClass('active')
                    input.trigger('blur').val('')
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off()
                    button.off('click', submit)
                }

            })

            jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', function () {

                form.removeClass('active')
                input.trigger('blur').val('')
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off()
                button.off('click', submit)
            })
        }

    })
}

// custom select-inputs
function selectize(selects = []) {
    selects.each(function (i) {
        const input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)
        const label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('label')
        const datalist = input[0] === label[0] ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).find('.datalist') : jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).next('.datalist')
        console.log(input)
        const span = label.find('span')


        label.on('click', function (e) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).trigger('click')
            e.stopPropagation()
            e.preventDefault()

            if (!datalist.hasClass('active')) {
                datalist.addClass('active')
                datalist.show()
            }

            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).hasClass('option')) {

                input[0].value = e.target.dataset.value
                console.log(input[0].value)
                span.css('color', '')
                span[0].innerText = e.target.innerHTML
                input.trigger('change')
                datalist.removeClass('active')
                datalist.hide()
            }

            // closing on outside clicks

            jquery__WEBPACK_IMPORTED_MODULE_0___default()(document)
                .one('click', function (e) {
                    e.stopPropagation()
                    datalist.removeClass('active')
                    datalist.hide()
                })
        })

    })

}
/* ЖАЛОБЫ */

function showTroubleTicketForm(target_type, target_id) {

    const popup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.popup-menu')
    let url = '';
    if (target_type == 'Photo') {
        url = '/troubleTicket/ajaxClaimPhotoForm';
    } else if (target_type == 'PhotoComment') {
        url = '/troubleTicket/ajaxClaimPhotoCommentForm';
    } else if (target_type == 'Member') {
        url = '/troubleTicket/ajaxClaimMemberForm';
    } else return false;

    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: url,
        data: {
            'target_id': target_id
        },
        success: function (msg) {
            popup.find('.insertion').html(msg);
            popup.find('.trigger').trigger('click')
            // var popup = new PopUp();
            // popup.setContent(msg);
            // popup.open();
            return true;
        },
        error: function (msg) {
            // var popup = new PopUp();
            // popup.setContent('<p>Ошибка</p>');
            // popup.open();
            popup.find('.insertion').html('Ошибка');
            popup.find('.trigger').trigger('click');
            return false;
        }
    });
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {

    const popup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.popup-menu')

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('submit', '#troubleTicketForm', function (e) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
            type: 'POST',
            url: '/trouble_ticket/ajax_send_trouble_ticket/',
            data: jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).serialize(),
            success: function (msg) {
                popup.find('.insertion').html(msg);
                popup.find('.trigger').trigger('click')

                function closeTimeout() {
                    setTimeout(function () {
                        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.popup-close').trigger('click')
                    }, 3000)

                    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click')
                }
                clearTimeout(closeTimeout)
                // var popup = new PopUp({
                //     autoCloseTimeout: 3000,
                //     closeOnClick: true
                // });
                // popup.setContent(msg);
                // popup.open();
            },
            error: function (jqXHR) {
                // var popup = new PopUp();
                // popup.setContent(jqXHR.responseText);
                // popup.open();
                popup.find('.insertion').html(jqXHR.responseText);
                popup.find('.trigger').trigger('click')
            }
        });
        e.preventDefault();
    });

});

/* КОНЕЦ: ЖАЛОБЫ*/

// //Попапы
// export function PopUp(options){

// 	const options = options||{};

// 	function _onCloseCallbackCall(){
// 		$('.md-close, .md-overlay').on('click.forCallback', function(){
// 			$('.md-close, .md-overlay').off('click.forCallback');
// 			if (typeof options.autoCloseTimerID == "number") {
// 				clearTimeout(options.autoCloseTimerID);
// 				options.autoCloseTimerID = 0;
// 			}
// 			if(typeof options.onCloseCallback == 'function') {
// 				options.onCloseCallback();
// 			}
// 		});
// 	}

// 	return {
// 		open: function(){
// 			this.close();
// 			$('.md-trigger').trigger('click');
// 			_onCloseCallbackCall();
// 			$('.md-modal').off('click.forClose');
// 			if(options.closeOnClick){
// 				$('.md-modal').on('click.forClose', function(e){
// 					if(!$(e.target).hasClass('md-close')){
// 						$('.md-close').trigger('click');
// 					}
// 				})
// 			}
// 			if (typeof options.autoCloseTimeout == "number" && options.autoCloseTimeout > 0) {
// 				options.autoCloseTimerID=setTimeout(this.close, options.autoCloseTimeout);
// 			}
// 		},
// 		close: function(){
// 			$('.md-close').trigger('click');
// 		},
// 		setContent: function(content){
// 			$('.modal-content').html(content);
// 		},
// 		setOption: function(name, value){
// 			options[name] = value;
// 		}
// 	};
// }

/***/ }),

/***/ "./js/wallet.js":
/*!**********************!*\
  !*** ./js/wallet.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./js/utils.js");



// header animations

(0,_utils__WEBPACK_IMPORTED_MODULE_1__.expandSearch)('header')
;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.initNavTabs)('.header-navlink')

// popup listeners
;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('header-menu-btn', 'burger')
if(window.innerWidth < 1279) (0,_utils__WEBPACK_IMPORTED_MODULE_1__.togglePopup)('header-user-logged', 'user')
;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.expandSearch)('burger')
// desktop user menu hover appearance
if (window.innerWidth > 1279) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-user-avatar').on('mouseenter', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').show(200)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').on('mouseleave', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hide(200)
        })
    })
}

/***/ }),

/***/ "./wallet.js":
/*!*******************!*\
  !*** ./wallet.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_wallet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/wallet */ "./js/wallet.js");
/* harmony import */ var _styles_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/common */ "./styles/common.less");
/* harmony import */ var _styles_wallet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/wallet */ "./styles/wallet.less");




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
/******/ 			"wallet": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./wallet.js","vendors-node_modules_jquery_dist_jquery_js-node_modules_swiper_esm_components_core_core-class_js"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvY29tbW9uLmxlc3M/ZjcyOCIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvd2FsbGV0Lmxlc3M/MzBkZSIsIndlYnBhY2s6Ly8vLi9qcy9wYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL2pzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL2pzL3dhbGxldC5qcyIsIndlYnBhY2s6Ly8vLi93YWxsZXQuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ3NCOzs7QUFHdEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7OztBQUlMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7OztBQUlMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZDQUFDO0FBQ3RCO0FBQ0EsUUFBUSw2Q0FBQztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7OztBQUlMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlLFVBQVU7O0FBRXpCO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUtzQjtBQUNLO0FBQ1U7O0FBRXJDOztBQUVPO0FBQ1A7QUFDQTtBQUNBLFlBQVksMkNBQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVPOztBQUVQLGlCQUFpQiw2Q0FBQzs7QUFFbEI7QUFDQSxRQUFRLDZDQUFDOztBQUVUO0FBQ0EsWUFBWSw2Q0FBQzs7QUFFYixTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBOztBQUVPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLElBQUkscURBQWU7O0FBRW5COztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDTztBQUNQOztBQUVBLFFBQVEsNkNBQUMsS0FBSyxPQUFPOztBQUVyQjtBQUNBLFlBQVksNkNBQUMsS0FBSyxNQUFNO0FBQ3hCLFlBQVksNkNBQUM7QUFDYjtBQUNBLFlBQVksNkNBQUMsS0FBSyxNQUFNO0FBQ3hCO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsWUFBWSw2Q0FBQzs7QUFFYjtBQUNBLG9CQUFvQiw2Q0FBQyxLQUFLLE1BQU07QUFDaEMsb0JBQW9CLDZDQUFDO0FBQ3JCOztBQUVBLGFBQWE7Ozs7QUFJYixZQUFZLDZDQUFDLEtBQUssTUFBTTtBQUN4QjtBQUNBLGdCQUFnQiw2Q0FBQyxLQUFLLE1BQU07QUFDNUIsZ0JBQWdCLDZDQUFDO0FBQ2pCLGFBQWE7O0FBRWIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRU87O0FBRVAsSUFBSSw2Q0FBQyxLQUFLLEtBQUs7QUFDZjtBQUNBLHVCQUF1Qiw2Q0FBQztBQUN4QixzQkFBc0IsNkNBQUMsS0FBSyxLQUFLO0FBQ2pDOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7O0FBRWIsWUFBWSw2Q0FBQzs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDZDQUFDO0FBQ3JCO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYixZQUFZLDZDQUFDOztBQUViO0FBQ0E7QUFDQSxnQkFBZ0IsNkNBQUM7QUFDakI7QUFDQSxhQUFhO0FBQ2I7O0FBRUEsS0FBSztBQUNMOztBQUVBO0FBQ087QUFDUDtBQUNBLHNCQUFzQiw2Q0FBQztBQUN2QixzQkFBc0IsNkNBQUM7QUFDdkIsaURBQWlELDZDQUFDLDJCQUEyQiw2Q0FBQztBQUM5RTtBQUNBOzs7QUFHQTtBQUNBLFlBQVksNkNBQUM7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQiw2Q0FBQzs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxZQUFZLDZDQUFDO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsU0FBUzs7QUFFVCxLQUFLOztBQUVMO0FBQ0E7O0FBRU87O0FBRVAsa0JBQWtCLDZDQUFDO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7O0FBRUwsSUFBSSxrREFBTTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsNkNBQUM7O0FBRUQsa0JBQWtCLDZDQUFDOztBQUVuQixJQUFJLDZDQUFDO0FBQ0wsUUFBUSxrREFBTTtBQUNkO0FBQ0E7QUFDQSxrQkFBa0IsNkNBQUM7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsNkNBQUM7QUFDekIscUJBQXFCOztBQUVyQixvQkFBb0IsNkNBQUM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxJOzs7Ozs7Ozs7Ozs7OztBQ3ZVc0I7QUFLTjs7QUFFaEI7O0FBRUEsb0RBQVk7QUFDWixvREFBVzs7QUFFWDtBQUNBLG9EQUFXO0FBQ1gsNkJBQTZCLG1EQUFXO0FBQ3hDLHFEQUFZO0FBQ1o7QUFDQTtBQUNBLElBQUksNkNBQUM7QUFDTCxRQUFRLDZDQUFDO0FBQ1QsUUFBUSw2Q0FBQztBQUNULFlBQVksNkNBQUM7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMLEM7Ozs7Ozs7Ozs7Ozs7O0FDeEJvQjtBQUNJOzs7Ozs7O1VDRHhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLG9CQUFvQjtXQUMxQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDO1dBQ0E7V0FDQSxnQkFBZ0IsMkJBQTJCO1dBQzNDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSw0Q0FBNEM7V0FDNUM7V0FDQSxFOzs7O1VDcEZBO1VBQ0EiLCJmaWxlIjoianMvd2FsbGV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxuICogUGFnaW5hdGlvblxuICogamF2YXNjcmlwdCBwYWdlIG5hdmlnYXRpb25cbiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cblxuY29uc3QgUGFnaW5hdGlvbiA9IHtcblxuICAgIGNvZGU6ICcnLFxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBVdGlsaXR5XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGNvbnZlcnRpbmcgaW5pdGlhbGl6ZSBkYXRhXG4gICAgRXh0ZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgICAgUGFnaW5hdGlvbi5zaXplID0gZGF0YS5zaXplIHx8IDMwMDtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gZGF0YS5wYWdlIHx8IDE7XG4gICAgICAgIFBhZ2luYXRpb24uc3RlcCA9IGRhdGEuc3RlcCA9PT0gMCA/IDAgOiBkYXRhLnN0ZXAgfHwgMztcbiAgICB9LFxuXG4gICAgLy8gYWRkIHBhZ2VzIGJ5IG51bWJlciAoZnJvbSBbc10gdG8gW2ZdKVxuICAgIEFkZDogZnVuY3Rpb24gKHMsIGYpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHM7IGkgPCBmOyBpKyspIHtcbiAgICAgICAgICAgIFBhZ2luYXRpb24uY29kZSArPSAnPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtYnRuXCI+JyArIGkgKyAnPC9hPic7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gYWRkIGxhc3QgcGFnZSB3aXRoIHNlcGFyYXRvclxuICAgIExhc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5jb2RlICs9ICc8aSBjbGFzcz1cInBhZ2luYXRpb24tc2VwYXJhdG9yXCI+Li4uPC9pPjxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWJ0blwiPicgKyBQYWdpbmF0aW9uLnNpemUgKyAnPC9hPic7XG4gICAgfSxcblxuICAgIC8vIGFkZCBmaXJzdCBwYWdlIHdpdGggc2VwYXJhdG9yXG4gICAgRmlyc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5jb2RlICs9ICc8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1idG5cIj4xPC9hPjxpIGNsYXNzPVwicGFnaW5hdGlvbi1zZXBhcmF0b3JcIj4uLi48L2k+JztcbiAgICB9LFxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSGFuZGxlcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gY2hhbmdlIHBhZ2VcbiAgICBDbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSArdGhpcy5pbm5lckhUTUw7XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG4gICAgLy8gcHJldmlvdXMgcGFnZVxuICAgIFByZXY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlLS07XG4gICAgICAgIGlmIChQYWdpbmF0aW9uLnBhZ2UgPCAxKSB7XG4gICAgICAgICAgICBQYWdpbmF0aW9uLnBhZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG4gICAgLy8gbmV4dCBwYWdlXG4gICAgTmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICBQYWdpbmF0aW9uLnBhZ2UrKztcbiAgICAgICAgaWYgKFBhZ2luYXRpb24ucGFnZSA+IFBhZ2luYXRpb24uc2l6ZSkge1xuICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gUGFnaW5hdGlvbi5zaXplO1xuICAgICAgICB9XG4gICAgICAgIFBhZ2luYXRpb24uU3RhcnQoKTtcbiAgICB9LFxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gU2NyaXB0XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGJpbmRpbmcgcGFnZXNcbiAgICBCaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgYmluZCcsIFBhZ2luYXRpb24uZVswXSlcbiAgICAgICAgY29uc3QgYSA9IFBhZ2luYXRpb24uZVswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdpbmF0aW9uLXBhZ2UtYnRuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCthW2ldLmlubmVySFRNTCA9PT0gUGFnaW5hdGlvbi5wYWdlKSBhW2ldLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uLXBhZ2UtYnRuIGN1cnJlbnQnO1xuICAgICAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBhZ2luYXRpb24uQ2xpY2ssIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB3cml0ZSBwYWdpbmF0aW9uXG4gICAgRmluaXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb2RlOiAnLCBQYWdpbmF0aW9uLmNvZGUpXG4gICAgICAgIFBhZ2luYXRpb24uZVswXS5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAvLyB3aXRob3V0IEpRdWVyeVxuICAgICAgICAvLyBQYWdpbmF0aW9uLmVbMF0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBQYWdpbmF0aW9uLmNvZGUpXG4gICAgICAgIGNvbnN0IGh0bWwgPSAkKFBhZ2luYXRpb24uY29kZSkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAgICAgLmZhZGVJbig1MDApXG4gICAgICAgICQoJy5wYWdpbmF0aW9uLXBhZ2UtY29udGFpbmVyJykuYXBwZW5kKGh0bWwpO1xuICAgICAgICBQYWdpbmF0aW9uLmNvZGUgPSAnJztcbiAgICAgICAgUGFnaW5hdGlvbi5CaW5kKCk7XG4gICAgfSxcbiAgICAvLyBmaW5kIHBhZ2luYXRpb24gdHlwZVxuICAgIFN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChQYWdpbmF0aW9uLnN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RlcClcbiAgICAgICAgICAgIGlmIChQYWdpbmF0aW9uLnBhZ2UgPCAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgMylcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChQYWdpbmF0aW9uLnBhZ2UgPiBQYWdpbmF0aW9uLnNpemUgLSAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24uc2l6ZSAtIDEsIFBhZ2luYXRpb24uc2l6ZSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkZpcnN0KCk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoUGFnaW5hdGlvbi5wYWdlLCBQYWdpbmF0aW9uLnBhZ2UgKyAxKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFBhZ2luYXRpb24uc2l6ZSA8IFBhZ2luYXRpb24uc3RlcCAqIDIgKyA2KSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgUGFnaW5hdGlvbi5zaXplICsgMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFBhZ2luYXRpb24ucGFnZSA8IFBhZ2luYXRpb24uc3RlcCAqIDIgKyAxKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5BZGQoMSwgUGFnaW5hdGlvbi5zdGVwICogMiArIDQpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChQYWdpbmF0aW9uLnBhZ2UgPiBQYWdpbmF0aW9uLnNpemUgLSBQYWdpbmF0aW9uLnN0ZXAgKiAyKSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24uc2l6ZSAtIFBhZ2luYXRpb24uc3RlcCAqIDIgLSAyLCBQYWdpbmF0aW9uLnNpemUgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24ucGFnZSAtIFBhZ2luYXRpb24uc3RlcCwgUGFnaW5hdGlvbi5wYWdlICsgUGFnaW5hdGlvbi5zdGVwICsgMSk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBQYWdpbmF0aW9uLkZpbmlzaCgpO1xuICAgIH0sXG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBJbml0aWFsaXphdGlvblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBiaW5kaW5nIGJ1dHRvbnNcbiAgICBCdXR0b25zOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zdCBuYXYgPSBlWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbnNpZGUgYnRucycsIG5hdilcbiAgICAgICAgbmF2WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGFnaW5hdGlvbi5QcmV2LCBmYWxzZSk7XG4gICAgICAgIG5hdlsxXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBhZ2luYXRpb24uTmV4dCwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICAvLyBjcmVhdGUgc2tlbGV0b25cbiAgICBDcmVhdGU6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgY29uc3QgaHRtbCA9XG4gICAgICAgICAgICBgPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtcHJldlwiPjxpIGNsYXNzPVwiZmFzIGZhLWNoZXZyb24tbGVmdFwiPjwvaT48L2E+IFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLW5leHRcIj48aSBjbGFzcz1cImZhcyBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPjwvYT5gXG5cbiAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIGNyZWF0ZScsIGUpXG4gICAgICAgIGVbMF0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKVxuICAgICAgICBQYWdpbmF0aW9uLmUgPSBlWzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BhZ2luYXRpb24tcGFnZS1jb250YWluZXInKTtcbiAgICAgICAgUGFnaW5hdGlvbi5CdXR0b25zKGUpO1xuICAgIH0sXG5cbiAgICAvLyBpbml0XG4gICAgSW5pdDogZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5FeHRlbmQoZGF0YSk7XG4gICAgICAgIFBhZ2luYXRpb24uQ3JlYXRlKGUpO1xuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfVxufTtcblxuLy8gZXhwb3J0aW5nXG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luYXRpb25cblxuLyogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKlxuICogSW5pdGlhbGl6YXRpb25cbiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICovIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xyXG5pbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlcidcclxuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xyXG5cclxuLy8gc2V0dGluZyBzbGlkZXJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0U2xpZGVyKGJyZWFrcG9pbnQgPSAwLCBjbGlja1NsaWRlID0gdHJ1ZSkge1xyXG4gICAgY29uc29sZS5sb2coJ3NsaWRlciBpbml0JylcclxuICAgIGxldCBzbGlkZXJJbnN0YW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCA/XHJcbiAgICAgICAgbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogY2xpY2tTbGlkZSxcclxuICAgICAgICAgICAgZnJlZU1vZGU6IHRydWVcclxuICAgICAgICB9KSA6XHJcbiAgICAgICAgbnVsbFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNsaWRlckluc3RhbmNlKVxyXG4gICAgcmV0dXJuIHNsaWRlckluc3RhbmNlXHJcbn1cclxuXHJcbi8vIHNldHRpbmcgbmF2dGFicyBhbmltYXRpb25cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0TmF2VGFicyhlbCA9ICcnKSB7XHJcblxyXG4gICAgY29uc3QgdGFicyA9ICQoZWwpXHJcblxyXG4gICAgdGFicy5lYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgdGFicy5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJylcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbi8vIHNldHRpbmcgcGFnaW5hdGlvblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRQYWdpbmF0aW9uKGJyZWFrcG9pbnQpIHtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIHNpemU6IDEwNSxcclxuICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgIHN0ZXA6IDFcclxuICAgIH1cclxuXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCBicmVha3BvaW50KSB7XHJcbiAgICAgICAgb3B0aW9ucy5zdGVwID0gMFxyXG4gICAgfVxyXG5cclxuICAgIFBhZ2luYXRpb24uSW5pdChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdpbmF0aW9uJyksIG9wdGlvbnMpXHJcblxyXG59XHJcblxyXG4vLyB1c2VyLW1lbnUgYW5kIGJ1cmdlci1tZW51XHJcbi8qKiBcclxuICogQWRkcyBsaXN0ZW5lcnMgYW5kIHRvZ2dsZXMgcG9wdXBzXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IHRhcmdldCBlbGVtZW50IHlvdSBjbGlja1xyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBwb3B1cCBwb3B1cCB5b3UgY2FsbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVBvcHVwKHRhcmdldCwgcG9wdXApIHtcclxuICAgIGlmICh0YXJnZXQpIHtcclxuXHJcbiAgICAgICAgJChgLiR7dGFyZ2V0fWApLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgICQoYC4ke3BvcHVwfS1tZW51YCkuc2hvdygpXHJcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICAkKGAuJHtwb3B1cH0tbWVudWApLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uZSgna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGAuJHtwb3B1cH0tbWVudWApLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKGAuJHtwb3B1cH0tY2xvc2VgKS5vbmUoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgICAgICQoYC4ke3BvcHVwfS1tZW51YCkuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoXCJvdmVyZmxvdy15XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYgKHBvcHVwID09PSAnYnVyZ2VyJykge1xyXG4gICAgICAgIGV4cGFuZFNlYXJjaChwb3B1cClcclxuICAgIH1cclxufVxyXG5cclxuLy8gZXhwYW5kaW5nIHNlYXJjaFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZFNlYXJjaChhcmVhID0gJycpIHtcclxuXHJcbiAgICAkKGAuJHthcmVhfS1zZWFyY2gtYnRuYCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnaGVyZScpXHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gJCh0aGlzKVxyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gJChgLiR7YXJlYX0tc2VhcmNoLWZpZWxkYClcclxuICAgICAgICBjb25zdCBmb3JtID0gYnV0dG9uLmNsb3Nlc3QoJ2Zvcm0nKVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCFmb3JtLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgIGlucHV0LnRyaWdnZXIoJ2ZvY3VzJylcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Ym1pdChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgICAgICBmb3JtLnRyaWdnZXIoJ3N1Ym1pdCcpXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgYnV0dG9uLm9uKCdjbGljaycsIHN1Ym1pdClcclxuXHJcbiAgICAgICAgICAgIGlucHV0Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGZvcm0ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS5jb2RlID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS50cmlnZ2VyKCdzdWJtaXQnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC50cmlnZ2VyKCdibHVyJykudmFsKCcnKVxyXG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZigpXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLm9mZignY2xpY2snLCBzdWJtaXQpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICBpbnB1dC50cmlnZ2VyKCdibHVyJykudmFsKCcnKVxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKClcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5vZmYoJ2NsaWNrJywgc3VibWl0KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59XHJcblxyXG4vLyBjdXN0b20gc2VsZWN0LWlucHV0c1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0aXplKHNlbGVjdHMgPSBbXSkge1xyXG4gICAgc2VsZWN0cy5lYWNoKGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSAkKHRoaXMpXHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSAkKHRoaXMpLmNsb3Nlc3QoJ2xhYmVsJylcclxuICAgICAgICBjb25zdCBkYXRhbGlzdCA9IGlucHV0WzBdID09PSBsYWJlbFswXSA/ICQodGhpcykuZmluZCgnLmRhdGFsaXN0JykgOiAkKHRoaXMpLm5leHQoJy5kYXRhbGlzdCcpXHJcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXQpXHJcbiAgICAgICAgY29uc3Qgc3BhbiA9IGxhYmVsLmZpbmQoJ3NwYW4nKVxyXG5cclxuXHJcbiAgICAgICAgbGFiZWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignY2xpY2snKVxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICAgICAgICAgaWYgKCFkYXRhbGlzdC5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFsaXN0LmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgZGF0YWxpc3Quc2hvdygpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5oYXNDbGFzcygnb3B0aW9uJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dFswXS52YWx1ZSA9IGUudGFyZ2V0LmRhdGFzZXQudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0WzBdLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgc3Bhbi5jc3MoJ2NvbG9yJywgJycpXHJcbiAgICAgICAgICAgICAgICBzcGFuWzBdLmlubmVyVGV4dCA9IGUudGFyZ2V0LmlubmVySFRNTFxyXG4gICAgICAgICAgICAgICAgaW5wdXQudHJpZ2dlcignY2hhbmdlJylcclxuICAgICAgICAgICAgICAgIGRhdGFsaXN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgZGF0YWxpc3QuaGlkZSgpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNsb3Npbmcgb24gb3V0c2lkZSBjbGlja3NcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpXHJcbiAgICAgICAgICAgICAgICAub25lKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFsaXN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFsaXN0LmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcblxyXG59XHJcbi8qINCW0JDQm9Ce0JHQqyAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dUcm91YmxlVGlja2V0Rm9ybSh0YXJnZXRfdHlwZSwgdGFyZ2V0X2lkKSB7XHJcblxyXG4gICAgY29uc3QgcG9wdXAgPSAkKCcucG9wdXAtbWVudScpXHJcbiAgICBsZXQgdXJsID0gJyc7XHJcbiAgICBpZiAodGFyZ2V0X3R5cGUgPT0gJ1Bob3RvJykge1xyXG4gICAgICAgIHVybCA9ICcvdHJvdWJsZVRpY2tldC9hamF4Q2xhaW1QaG90b0Zvcm0nO1xyXG4gICAgfSBlbHNlIGlmICh0YXJnZXRfdHlwZSA9PSAnUGhvdG9Db21tZW50Jykge1xyXG4gICAgICAgIHVybCA9ICcvdHJvdWJsZVRpY2tldC9hamF4Q2xhaW1QaG90b0NvbW1lbnRGb3JtJztcclxuICAgIH0gZWxzZSBpZiAodGFyZ2V0X3R5cGUgPT0gJ01lbWJlcicpIHtcclxuICAgICAgICB1cmwgPSAnL3Ryb3VibGVUaWNrZXQvYWpheENsYWltTWVtYmVyRm9ybSc7XHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgJ3RhcmdldF9pZCc6IHRhcmdldF9pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBwb3B1cC5maW5kKCcuaW5zZXJ0aW9uJykuaHRtbChtc2cpO1xyXG4gICAgICAgICAgICBwb3B1cC5maW5kKCcudHJpZ2dlcicpLnRyaWdnZXIoJ2NsaWNrJylcclxuICAgICAgICAgICAgLy8gdmFyIHBvcHVwID0gbmV3IFBvcFVwKCk7XHJcbiAgICAgICAgICAgIC8vIHBvcHVwLnNldENvbnRlbnQobXNnKTtcclxuICAgICAgICAgICAgLy8gcG9wdXAub3BlbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgIC8vIHZhciBwb3B1cCA9IG5ldyBQb3BVcCgpO1xyXG4gICAgICAgICAgICAvLyBwb3B1cC5zZXRDb250ZW50KCc8cD7QntGI0LjQsdC60LA8L3A+Jyk7XHJcbiAgICAgICAgICAgIC8vIHBvcHVwLm9wZW4oKTtcclxuICAgICAgICAgICAgcG9wdXAuZmluZCgnLmluc2VydGlvbicpLmh0bWwoJ9Ce0YjQuNCx0LrQsCcpO1xyXG4gICAgICAgICAgICBwb3B1cC5maW5kKCcudHJpZ2dlcicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgY29uc3QgcG9wdXAgPSAkKCcucG9wdXAtbWVudScpXHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdzdWJtaXQnLCAnI3Ryb3VibGVUaWNrZXRGb3JtJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHVybDogJy90cm91YmxlX3RpY2tldC9hamF4X3NlbmRfdHJvdWJsZV90aWNrZXQvJyxcclxuICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAgICAgcG9wdXAuZmluZCgnLmluc2VydGlvbicpLmh0bWwobXNnKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy50cmlnZ2VyJykudHJpZ2dlcignY2xpY2snKVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlVGltZW91dCgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBvcHVwLWNsb3NlJykudHJpZ2dlcignY2xpY2snKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KVxyXG4gICAgICAgICAgICAgICAgLy8gdmFyIHBvcHVwID0gbmV3IFBvcFVwKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBhdXRvQ2xvc2VUaW1lb3V0OiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNsb3NlT25DbGljazogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBwb3B1cC5zZXRDb250ZW50KG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvLyBwb3B1cC5vcGVuKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBwb3B1cCA9IG5ldyBQb3BVcCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gcG9wdXAuc2V0Q29udGVudChqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gcG9wdXAub3BlbigpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXAuZmluZCgnLmluc2VydGlvbicpLmh0bWwoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy50cmlnZ2VyJykudHJpZ2dlcignY2xpY2snKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbi8qINCa0J7QndCV0KY6INCW0JDQm9Ce0JHQqyovXHJcblxyXG4vLyAvL9Cf0L7Qv9Cw0L/Ri1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gUG9wVXAob3B0aW9ucyl7XHJcblxyXG4vLyBcdGNvbnN0IG9wdGlvbnMgPSBvcHRpb25zfHx7fTtcclxuXHJcbi8vIFx0ZnVuY3Rpb24gX29uQ2xvc2VDYWxsYmFja0NhbGwoKXtcclxuLy8gXHRcdCQoJy5tZC1jbG9zZSwgLm1kLW92ZXJsYXknKS5vbignY2xpY2suZm9yQ2FsbGJhY2snLCBmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHQkKCcubWQtY2xvc2UsIC5tZC1vdmVybGF5Jykub2ZmKCdjbGljay5mb3JDYWxsYmFjaycpO1xyXG4vLyBcdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuYXV0b0Nsb3NlVGltZXJJRCA9PSBcIm51bWJlclwiKSB7XHJcbi8vIFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG9wdGlvbnMuYXV0b0Nsb3NlVGltZXJJRCk7XHJcbi8vIFx0XHRcdFx0b3B0aW9ucy5hdXRvQ2xvc2VUaW1lcklEID0gMDtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0XHRpZih0eXBlb2Ygb3B0aW9ucy5vbkNsb3NlQ2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xyXG4vLyBcdFx0XHRcdG9wdGlvbnMub25DbG9zZUNhbGxiYWNrKCk7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH0pO1xyXG4vLyBcdH1cclxuXHJcbi8vIFx0cmV0dXJuIHtcclxuLy8gXHRcdG9wZW46IGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdHRoaXMuY2xvc2UoKTtcclxuLy8gXHRcdFx0JCgnLm1kLXRyaWdnZXInKS50cmlnZ2VyKCdjbGljaycpO1xyXG4vLyBcdFx0XHRfb25DbG9zZUNhbGxiYWNrQ2FsbCgpO1xyXG4vLyBcdFx0XHQkKCcubWQtbW9kYWwnKS5vZmYoJ2NsaWNrLmZvckNsb3NlJyk7XHJcbi8vIFx0XHRcdGlmKG9wdGlvbnMuY2xvc2VPbkNsaWNrKXtcclxuLy8gXHRcdFx0XHQkKCcubWQtbW9kYWwnKS5vbignY2xpY2suZm9yQ2xvc2UnLCBmdW5jdGlvbihlKXtcclxuLy8gXHRcdFx0XHRcdGlmKCEkKGUudGFyZ2V0KS5oYXNDbGFzcygnbWQtY2xvc2UnKSl7XHJcbi8vIFx0XHRcdFx0XHRcdCQoJy5tZC1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0XHR9XHJcbi8vIFx0XHRcdFx0fSlcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMuYXV0b0Nsb3NlVGltZW91dCA9PSBcIm51bWJlclwiICYmIG9wdGlvbnMuYXV0b0Nsb3NlVGltZW91dCA+IDApIHtcclxuLy8gXHRcdFx0XHRvcHRpb25zLmF1dG9DbG9zZVRpbWVySUQ9c2V0VGltZW91dCh0aGlzLmNsb3NlLCBvcHRpb25zLmF1dG9DbG9zZVRpbWVvdXQpO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9LFxyXG4vLyBcdFx0Y2xvc2U6IGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdCQoJy5tZC1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbi8vIFx0XHR9LFxyXG4vLyBcdFx0c2V0Q29udGVudDogZnVuY3Rpb24oY29udGVudCl7XHJcbi8vIFx0XHRcdCQoJy5tb2RhbC1jb250ZW50JykuaHRtbChjb250ZW50KTtcclxuLy8gXHRcdH0sXHJcbi8vIFx0XHRzZXRPcHRpb246IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcclxuLy8gXHRcdFx0b3B0aW9uc1tuYW1lXSA9IHZhbHVlO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH07XHJcbi8vIH0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCB7XHJcbiAgICBleHBhbmRTZWFyY2gsXHJcbiAgICB0b2dnbGVQb3B1cCxcclxuICAgIGluaXROYXZUYWJzXHJcbn0gZnJvbSAnLi91dGlscydcclxuXHJcbi8vIGhlYWRlciBhbmltYXRpb25zXHJcblxyXG5leHBhbmRTZWFyY2goJ2hlYWRlcicpXHJcbmluaXROYXZUYWJzKCcuaGVhZGVyLW5hdmxpbmsnKVxyXG5cclxuLy8gcG9wdXAgbGlzdGVuZXJzXHJcbnRvZ2dsZVBvcHVwKCdoZWFkZXItbWVudS1idG4nLCAnYnVyZ2VyJylcclxuaWYod2luZG93LmlubmVyV2lkdGggPCAxMjc5KSB0b2dnbGVQb3B1cCgnaGVhZGVyLXVzZXItbG9nZ2VkJywgJ3VzZXInKVxyXG5leHBhbmRTZWFyY2goJ2J1cmdlcicpXHJcbi8vIGRlc2t0b3AgdXNlciBtZW51IGhvdmVyIGFwcGVhcmFuY2VcclxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTI3OSkge1xyXG4gICAgJCgnLmhlYWRlci11c2VyLWF2YXRhcicpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy51c2VyLW1lbnUnKS5zaG93KDIwMClcclxuICAgICAgICAkKCcudXNlci1tZW51Jykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuaGlkZSgyMDApXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn0iLCJpbXBvcnQgJy4vanMvd2FsbGV0J1xyXG5pbXBvcnQgJy4vc3R5bGVzL2NvbW1vbidcclxuaW1wb3J0ICcuL3N0eWxlcy93YWxsZXQnIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gdGhlIHN0YXJ0dXAgZnVuY3Rpb25cbi8vIEl0J3MgZW1wdHkgYXMgc29tZSBydW50aW1lIG1vZHVsZSBoYW5kbGVzIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSB4ID0+IHt9XG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIndhbGxldFwiOiAwXG59O1xuXG52YXIgZGVmZXJyZWRNb2R1bGVzID0gW1xuXHRbXCIuL3dhbGxldC5qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfanF1ZXJ5X2Rpc3RfanF1ZXJ5X2pzLW5vZGVfbW9kdWxlc19zd2lwZXJfZXNtX2NvbXBvbmVudHNfY29yZV9jb3JlLWNsYXNzX2pzXCJdXG5dO1xuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxudmFyIGNoZWNrRGVmZXJyZWRNb2R1bGVzID0geCA9PiB7fTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWUsIGV4ZWN1dGVNb2R1bGVzXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG5cdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuXHR9XG5cblx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuXHRpZihleGVjdXRlTW9kdWxlcykgZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyk7XG5cblx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG5cdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpO1xuXG5mdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwoKSB7XG5cdHZhciByZXN1bHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcblx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuXHRcdH1cblx0fVxuXHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxudmFyIHN0YXJ0dXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIHJlc2V0IHN0YXJ0dXAgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGNhbGxlZCBhZ2FpbiB3aGVuIG1vcmUgc3RhcnR1cCBjb2RlIGlzIGFkZGVkXG5cdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHN0YXJ0dXAgfHwgKHggPT4ge30pO1xuXHRyZXR1cm4gKGNoZWNrRGVmZXJyZWRNb2R1bGVzID0gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKSgpO1xufTsiLCIvLyBydW4gc3RhcnR1cFxuX193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG4iXSwic291cmNlUm9vdCI6IiJ9