(self["webpackChunk"] = self["webpackChunk"] || []).push([["styles_common_less-js_utils_js"],{

/***/ "./styles/common.less":
/*!****************************!*\
  !*** ./styles/common.less ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./js/pagination.js":
/*!**************************!*\
  !*** ./js/pagination.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvY29tbW9uLmxlc3M/ZjcyOCIsIndlYnBhY2s6Ly8vLi9qcy9wYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL2pzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDc0I7OztBQUd0Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkNBQUM7QUFDdEI7QUFDQSxRQUFRLDZDQUFDO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtB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RUQsa0JBQWtCLDZDQUFDOztBQUVuQixJQUFJLDZDQUFDO0FBQ0wsUUFBUSxrREFBTTtBQUNkO0FBQ0E7QUFDQSxrQkFBa0IsNkNBQUM7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsNkNBQUM7QUFDekIscUJBQXFCOztBQUVyQixvQkFBb0IsNkNBQUM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxJIiwiZmlsZSI6ImpzL3N0eWxlc19jb21tb25fbGVzcy1qc191dGlsc19qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcbiAqIFBhZ2luYXRpb25cbiAqIGphdmFzY3JpcHQgcGFnZSBuYXZpZ2F0aW9uXG4gKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuXG5cbmNvbnN0IFBhZ2luYXRpb24gPSB7XG5cbiAgICBjb2RlOiAnJyxcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVXRpbGl0eVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBjb252ZXJ0aW5nIGluaXRpYWxpemUgZGF0YVxuICAgIEV4dGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIFBhZ2luYXRpb24uc2l6ZSA9IGRhdGEuc2l6ZSB8fCAzMDA7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnZSA9IGRhdGEucGFnZSB8fCAxO1xuICAgICAgICBQYWdpbmF0aW9uLnN0ZXAgPSBkYXRhLnN0ZXAgPT09IDAgPyAwIDogZGF0YS5zdGVwIHx8IDM7XG4gICAgfSxcblxuICAgIC8vIGFkZCBwYWdlcyBieSBudW1iZXIgKGZyb20gW3NdIHRvIFtmXSlcbiAgICBBZGQ6IGZ1bmN0aW9uIChzLCBmKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzOyBpIDwgZjsgaSsrKSB7XG4gICAgICAgICAgICBQYWdpbmF0aW9uLmNvZGUgKz0gJzxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWJ0blwiPicgKyBpICsgJzwvYT4nO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGFkZCBsYXN0IHBhZ2Ugd2l0aCBzZXBhcmF0b3JcbiAgICBMYXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24uY29kZSArPSAnPGkgY2xhc3M9XCJwYWdpbmF0aW9uLXNlcGFyYXRvclwiPi4uLjwvaT48YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1idG5cIj4nICsgUGFnaW5hdGlvbi5zaXplICsgJzwvYT4nO1xuICAgIH0sXG5cbiAgICAvLyBhZGQgZmlyc3QgcGFnZSB3aXRoIHNlcGFyYXRvclxuICAgIEZpcnN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24uY29kZSArPSAnPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtYnRuXCI+MTwvYT48aSBjbGFzcz1cInBhZ2luYXRpb24tc2VwYXJhdG9yXCI+Li4uPC9pPic7XG4gICAgfSxcblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEhhbmRsZXJzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGNoYW5nZSBwYWdlXG4gICAgQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gK3RoaXMuaW5uZXJIVE1MO1xuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfSxcblxuICAgIC8vIHByZXZpb3VzIHBhZ2VcbiAgICBQcmV2OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnZS0tO1xuICAgICAgICBpZiAoUGFnaW5hdGlvbi5wYWdlIDwgMSkge1xuICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfSxcblxuICAgIC8vIG5leHQgcGFnZVxuICAgIE5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlKys7XG4gICAgICAgIGlmIChQYWdpbmF0aW9uLnBhZ2UgPiBQYWdpbmF0aW9uLnNpemUpIHtcbiAgICAgICAgICAgIFBhZ2luYXRpb24ucGFnZSA9IFBhZ2luYXRpb24uc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfSxcblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFNjcmlwdFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBiaW5kaW5nIHBhZ2VzXG4gICAgQmluZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW5zaWRlIGJpbmQnLCBQYWdpbmF0aW9uLmVbMF0pXG4gICAgICAgIGNvbnN0IGEgPSBQYWdpbmF0aW9uLmVbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbi1wYWdlLWJ0bicpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgrYVtpXS5pbm5lckhUTUwgPT09IFBhZ2luYXRpb24ucGFnZSkgYVtpXS5jbGFzc05hbWUgPSAncGFnaW5hdGlvbi1wYWdlLWJ0biBjdXJyZW50JztcbiAgICAgICAgICAgIGFbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQYWdpbmF0aW9uLkNsaWNrLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gd3JpdGUgcGFnaW5hdGlvblxuICAgIEZpbmlzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY29kZTogJywgUGFnaW5hdGlvbi5jb2RlKVxuICAgICAgICBQYWdpbmF0aW9uLmVbMF0uaW5uZXJIVE1MID0gJydcbiAgICAgICAgLy8gd2l0aG91dCBKUXVlcnlcbiAgICAgICAgLy8gUGFnaW5hdGlvbi5lWzBdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgUGFnaW5hdGlvbi5jb2RlKVxuICAgICAgICBjb25zdCBodG1sID0gJChQYWdpbmF0aW9uLmNvZGUpLmNzcygnZGlzcGxheScsICdub25lJylcbiAgICAgICAgICAgIC5mYWRlSW4oNTAwKVxuICAgICAgICAkKCcucGFnaW5hdGlvbi1wYWdlLWNvbnRhaW5lcicpLmFwcGVuZChodG1sKTtcbiAgICAgICAgUGFnaW5hdGlvbi5jb2RlID0gJyc7XG4gICAgICAgIFBhZ2luYXRpb24uQmluZCgpO1xuICAgIH0sXG4gICAgLy8gZmluZCBwYWdpbmF0aW9uIHR5cGVcbiAgICBTdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoUGFnaW5hdGlvbi5zdGVwID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0ZXApXG4gICAgICAgICAgICBpZiAoUGFnaW5hdGlvbi5wYWdlIDwgMikge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKDEsIDMpXG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGFnaW5hdGlvbi5wYWdlID4gUGFnaW5hdGlvbi5zaXplIC0gMikge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZChQYWdpbmF0aW9uLnNpemUgLSAxLCBQYWdpbmF0aW9uLnNpemUgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24ucGFnZSwgUGFnaW5hdGlvbi5wYWdlICsgMSk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChQYWdpbmF0aW9uLnNpemUgPCBQYWdpbmF0aW9uLnN0ZXAgKiAyICsgNikge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKDEsIFBhZ2luYXRpb24uc2l6ZSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChQYWdpbmF0aW9uLnBhZ2UgPCBQYWdpbmF0aW9uLnN0ZXAgKiAyICsgMSkge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKDEsIFBhZ2luYXRpb24uc3RlcCAqIDIgKyA0KTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGFnaW5hdGlvbi5wYWdlID4gUGFnaW5hdGlvbi5zaXplIC0gUGFnaW5hdGlvbi5zdGVwICogMikge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZChQYWdpbmF0aW9uLnNpemUgLSBQYWdpbmF0aW9uLnN0ZXAgKiAyIC0gMiwgUGFnaW5hdGlvbi5zaXplICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZChQYWdpbmF0aW9uLnBhZ2UgLSBQYWdpbmF0aW9uLnN0ZXAsIFBhZ2luYXRpb24ucGFnZSArIFBhZ2luYXRpb24uc3RlcCArIDEpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgUGFnaW5hdGlvbi5GaW5pc2goKTtcbiAgICB9LFxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSW5pdGlhbGl6YXRpb25cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gYmluZGluZyBidXR0b25zXG4gICAgQnV0dG9uczogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgbmF2ID0gZVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpO1xuICAgICAgICBjb25zb2xlLmxvZygnaW5zaWRlIGJ0bnMnLCBuYXYpXG4gICAgICAgIG5hdlswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBhZ2luYXRpb24uUHJldiwgZmFsc2UpO1xuICAgICAgICBuYXZbMV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQYWdpbmF0aW9uLk5leHQsIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgLy8gY3JlYXRlIHNrZWxldG9uXG4gICAgQ3JlYXRlOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGNvbnN0IGh0bWwgPVxuICAgICAgICAgICAgYDxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLXByZXZcIj48aSBjbGFzcz1cImZhcyBmYS1jaGV2cm9uLWxlZnRcIj48L2k+PC9hPiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICAgICAgICA8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1uZXh0XCI+PGkgY2xhc3M9XCJmYXMgZmEtY2hldnJvbi1yaWdodFwiPjwvaT48L2E+YFxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZnRlciBjcmVhdGUnLCBlKVxuICAgICAgICBlWzBdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbClcbiAgICAgICAgUGFnaW5hdGlvbi5lID0gZVswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdpbmF0aW9uLXBhZ2UtY29udGFpbmVyJyk7XG4gICAgICAgIFBhZ2luYXRpb24uQnV0dG9ucyhlKTtcbiAgICB9LFxuXG4gICAgLy8gaW5pdFxuICAgIEluaXQ6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgIFBhZ2luYXRpb24uRXh0ZW5kKGRhdGEpO1xuICAgICAgICBQYWdpbmF0aW9uLkNyZWF0ZShlKTtcbiAgICAgICAgUGFnaW5hdGlvbi5TdGFydCgpO1xuICAgIH1cbn07XG5cbi8vIGV4cG9ydGluZ1xuXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uXG5cbi8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcbiAqIEluaXRpYWxpemF0aW9uXG4gKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqLyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcclxuaW1wb3J0IFN3aXBlciBmcm9tICdzd2lwZXInXHJcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbidcclxuXHJcbi8vIHNldHRpbmcgc2xpZGVyXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNsaWRlcihicmVha3BvaW50ID0gMCwgY2xpY2tTbGlkZSA9IHRydWUpIHtcclxuICAgIGNvbnNvbGUubG9nKCdzbGlkZXIgaW5pdCcpXHJcbiAgICBsZXQgc2xpZGVySW5zdGFuY2UgPSB3aW5kb3cuaW5uZXJXaWR0aCA8IGJyZWFrcG9pbnQgP1xyXG4gICAgICAgIG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyJywge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IGNsaWNrU2xpZGUsXHJcbiAgICAgICAgICAgIGZyZWVNb2RlOiB0cnVlXHJcbiAgICAgICAgfSkgOlxyXG4gICAgICAgIG51bGxcclxuICAgICAgICBjb25zb2xlLmxvZyhzbGlkZXJJbnN0YW5jZSlcclxuICAgIHJldHVybiBzbGlkZXJJbnN0YW5jZVxyXG59XHJcblxyXG4vLyBzZXR0aW5nIG5hdnRhYnMgYW5pbWF0aW9uXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdE5hdlRhYnMoZWwgPSAnJykge1xyXG5cclxuICAgIGNvbnN0IHRhYnMgPSAkKGVsKVxyXG5cclxuICAgIHRhYnMuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIHRhYnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG4vLyBzZXR0aW5nIHBhZ2luYXRpb25cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0UGFnaW5hdGlvbihicmVha3BvaW50KSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBzaXplOiAxMDUsXHJcbiAgICAgICAgcGFnZTogMSxcclxuICAgICAgICBzdGVwOiAxXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCkge1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IDBcclxuICAgIH1cclxuXHJcbiAgICBQYWdpbmF0aW9uLkluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbicpLCBvcHRpb25zKVxyXG5cclxufVxyXG5cclxuLy8gdXNlci1tZW51IGFuZCBidXJnZXItbWVudVxyXG4vKiogXHJcbiAqIEFkZHMgbGlzdGVuZXJzIGFuZCB0b2dnbGVzIHBvcHVwc1xyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSB0YXJnZXQgZWxlbWVudCB5b3UgY2xpY2tcclxuICogQHBhcmFtICAge1N0cmluZ30gcG9wdXAgcG9wdXAgeW91IGNhbGxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVQb3B1cCh0YXJnZXQsIHBvcHVwKSB7XHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcblxyXG4gICAgICAgICQoYC4ke3RhcmdldH1gKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAkKGAuJHtwb3B1cH0tbWVudWApLnNob3coKVxyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoXCJvdmVyZmxvdy15XCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAvLyBcclxuICAgICAgICAgICAgJChgLiR7cG9wdXB9LW1lbnVgKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbmUoJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChgLiR7cG9wdXB9LW1lbnVgKS5oaWRlKClcclxuICAgICAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoXCJvdmVyZmxvdy15XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJChgLiR7cG9wdXB9LWNsb3NlYCkub25lKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgICAgICAkKGAuJHtwb3B1cH0tbWVudWApLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGlmIChwb3B1cCA9PT0gJ2J1cmdlcicpIHtcclxuICAgICAgICBleHBhbmRTZWFyY2gocG9wdXApXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cGFuZGluZyBzZWFyY2hcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleHBhbmRTZWFyY2goYXJlYSA9ICcnKSB7XHJcblxyXG4gICAgJChgLiR7YXJlYX0tc2VhcmNoLWJ0bmApLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hlcmUnKVxyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9ICQodGhpcylcclxuICAgICAgICBjb25zdCBpbnB1dCA9ICQoYC4ke2FyZWF9LXNlYXJjaC1maWVsZGApXHJcbiAgICAgICAgY29uc3QgZm9ybSA9IGJ1dHRvbi5jbG9zZXN0KCdmb3JtJylcclxuXHJcblxyXG4gICAgICAgIGlmICghZm9ybS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICBpbnB1dC50cmlnZ2VyKCdmb2N1cycpXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzdWJtaXQoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgZm9ybS50cmlnZ2VyKCdzdWJtaXQnKVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGJ1dHRvbi5vbignY2xpY2snLCBzdWJtaXQpXHJcblxyXG4gICAgICAgICAgICBpbnB1dC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmb3JtLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0udHJpZ2dlcignc3VibWl0JylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZS5jb2RlID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudHJpZ2dlcignYmx1cicpLnZhbCgnJylcclxuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoKVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5vZmYoJ2NsaWNrJywgc3VibWl0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgaW5wdXQudHJpZ2dlcignYmx1cicpLnZhbCgnJylcclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZigpXHJcbiAgICAgICAgICAgICAgICBidXR0b24ub2ZmKCdjbGljaycsIHN1Ym1pdClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuLy8gY3VzdG9tIHNlbGVjdC1pbnB1dHNcclxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdGl6ZShzZWxlY3RzID0gW10pIHtcclxuICAgIHNlbGVjdHMuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gJCh0aGlzKS5jbG9zZXN0KCdsYWJlbCcpXHJcbiAgICAgICAgY29uc3QgZGF0YWxpc3QgPSBpbnB1dFswXSA9PT0gbGFiZWxbMF0gPyAkKHRoaXMpLmZpbmQoJy5kYXRhbGlzdCcpIDogJCh0aGlzKS5uZXh0KCcuZGF0YWxpc3QnKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGlucHV0KVxyXG4gICAgICAgIGNvbnN0IHNwYW4gPSBsYWJlbC5maW5kKCdzcGFuJylcclxuXHJcblxyXG4gICAgICAgIGxhYmVsLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2NsaWNrJylcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgICAgICAgIGlmICghZGF0YWxpc3QuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhbGlzdC5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIGRhdGFsaXN0LnNob3coKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJ29wdGlvbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXRbMF0udmFsdWUgPSBlLnRhcmdldC5kYXRhc2V0LnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dFswXS52YWx1ZSlcclxuICAgICAgICAgICAgICAgIHNwYW4uY3NzKCdjb2xvcicsICcnKVxyXG4gICAgICAgICAgICAgICAgc3BhblswXS5pbm5lclRleHQgPSBlLnRhcmdldC5pbm5lckhUTUxcclxuICAgICAgICAgICAgICAgIGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpXHJcbiAgICAgICAgICAgICAgICBkYXRhbGlzdC5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIGRhdGFsaXN0LmhpZGUoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjbG9zaW5nIG9uIG91dHNpZGUgY2xpY2tzXHJcblxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KVxyXG4gICAgICAgICAgICAgICAgLm9uZSgnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhbGlzdC5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICBkYXRhbGlzdC5oaWRlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG5cclxufVxyXG4vKiDQltCQ0JvQntCR0KsgKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93VHJvdWJsZVRpY2tldEZvcm0odGFyZ2V0X3R5cGUsIHRhcmdldF9pZCkge1xyXG5cclxuICAgIGNvbnN0IHBvcHVwID0gJCgnLnBvcHVwLW1lbnUnKVxyXG4gICAgbGV0IHVybCA9ICcnO1xyXG4gICAgaWYgKHRhcmdldF90eXBlID09ICdQaG90bycpIHtcclxuICAgICAgICB1cmwgPSAnL3Ryb3VibGVUaWNrZXQvYWpheENsYWltUGhvdG9Gb3JtJztcclxuICAgIH0gZWxzZSBpZiAodGFyZ2V0X3R5cGUgPT0gJ1Bob3RvQ29tbWVudCcpIHtcclxuICAgICAgICB1cmwgPSAnL3Ryb3VibGVUaWNrZXQvYWpheENsYWltUGhvdG9Db21tZW50Rm9ybSc7XHJcbiAgICB9IGVsc2UgaWYgKHRhcmdldF90eXBlID09ICdNZW1iZXInKSB7XHJcbiAgICAgICAgdXJsID0gJy90cm91YmxlVGlja2V0L2FqYXhDbGFpbU1lbWJlckZvcm0nO1xyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICd0YXJnZXRfaWQnOiB0YXJnZXRfaWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgcG9wdXAuZmluZCgnLmluc2VydGlvbicpLmh0bWwobXNnKTtcclxuICAgICAgICAgICAgcG9wdXAuZmluZCgnLnRyaWdnZXInKS50cmlnZ2VyKCdjbGljaycpXHJcbiAgICAgICAgICAgIC8vIHZhciBwb3B1cCA9IG5ldyBQb3BVcCgpO1xyXG4gICAgICAgICAgICAvLyBwb3B1cC5zZXRDb250ZW50KG1zZyk7XHJcbiAgICAgICAgICAgIC8vIHBvcHVwLm9wZW4oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAvLyB2YXIgcG9wdXAgPSBuZXcgUG9wVXAoKTtcclxuICAgICAgICAgICAgLy8gcG9wdXAuc2V0Q29udGVudCgnPHA+0J7RiNC40LHQutCwPC9wPicpO1xyXG4gICAgICAgICAgICAvLyBwb3B1cC5vcGVuKCk7XHJcbiAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKCfQntGI0LjQsdC60LAnKTtcclxuICAgICAgICAgICAgcG9wdXAuZmluZCgnLnRyaWdnZXInKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNvbnN0IHBvcHVwID0gJCgnLnBvcHVwLW1lbnUnKVxyXG5cclxuICAgICQoJ2JvZHknKS5vbignc3VibWl0JywgJyN0cm91YmxlVGlja2V0Rm9ybScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICB1cmw6ICcvdHJvdWJsZV90aWNrZXQvYWpheF9zZW5kX3Ryb3VibGVfdGlja2V0LycsXHJcbiAgICAgICAgICAgIGRhdGE6ICQodGhpcykuc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKG1zZyk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcudHJpZ2dlcicpLnRyaWdnZXIoJ2NsaWNrJylcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbG9zZVRpbWVvdXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wb3B1cC1jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dClcclxuICAgICAgICAgICAgICAgIC8vIHZhciBwb3B1cCA9IG5ldyBQb3BVcCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYXV0b0Nsb3NlVGltZW91dDogMzAwMCxcclxuICAgICAgICAgICAgICAgIC8vICAgICBjbG9zZU9uQ2xpY2s6IHRydWVcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gcG9wdXAuc2V0Q29udGVudChtc2cpO1xyXG4gICAgICAgICAgICAgICAgLy8gcG9wdXAub3BlbigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGpxWEhSKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcG9wdXAgPSBuZXcgUG9wVXAoKTtcclxuICAgICAgICAgICAgICAgIC8vIHBvcHVwLnNldENvbnRlbnQoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIC8vIHBvcHVwLm9wZW4oKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcudHJpZ2dlcicpLnRyaWdnZXIoJ2NsaWNrJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4vKiDQmtCe0J3QldCmOiDQltCQ0JvQntCR0KsqL1xyXG5cclxuLy8gLy/Qn9C+0L/QsNC/0YtcclxuLy8gZXhwb3J0IGZ1bmN0aW9uIFBvcFVwKG9wdGlvbnMpe1xyXG5cclxuLy8gXHRjb25zdCBvcHRpb25zID0gb3B0aW9uc3x8e307XHJcblxyXG4vLyBcdGZ1bmN0aW9uIF9vbkNsb3NlQ2FsbGJhY2tDYWxsKCl7XHJcbi8vIFx0XHQkKCcubWQtY2xvc2UsIC5tZC1vdmVybGF5Jykub24oJ2NsaWNrLmZvckNhbGxiYWNrJywgZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0JCgnLm1kLWNsb3NlLCAubWQtb3ZlcmxheScpLm9mZignY2xpY2suZm9yQ2FsbGJhY2snKTtcclxuLy8gXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmF1dG9DbG9zZVRpbWVySUQgPT0gXCJudW1iZXJcIikge1xyXG4vLyBcdFx0XHRcdGNsZWFyVGltZW91dChvcHRpb25zLmF1dG9DbG9zZVRpbWVySUQpO1xyXG4vLyBcdFx0XHRcdG9wdGlvbnMuYXV0b0Nsb3NlVGltZXJJRCA9IDA7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdFx0aWYodHlwZW9mIG9wdGlvbnMub25DbG9zZUNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcclxuLy8gXHRcdFx0XHRvcHRpb25zLm9uQ2xvc2VDYWxsYmFjaygpO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9KTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdHJldHVybiB7XHJcbi8vIFx0XHRvcGVuOiBmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHR0aGlzLmNsb3NlKCk7XHJcbi8vIFx0XHRcdCQoJy5tZC10cmlnZ2VyJykudHJpZ2dlcignY2xpY2snKTtcclxuLy8gXHRcdFx0X29uQ2xvc2VDYWxsYmFja0NhbGwoKTtcclxuLy8gXHRcdFx0JCgnLm1kLW1vZGFsJykub2ZmKCdjbGljay5mb3JDbG9zZScpO1xyXG4vLyBcdFx0XHRpZihvcHRpb25zLmNsb3NlT25DbGljayl7XHJcbi8vIFx0XHRcdFx0JCgnLm1kLW1vZGFsJykub24oJ2NsaWNrLmZvckNsb3NlJywgZnVuY3Rpb24oZSl7XHJcbi8vIFx0XHRcdFx0XHRpZighJChlLnRhcmdldCkuaGFzQ2xhc3MoJ21kLWNsb3NlJykpe1xyXG4vLyBcdFx0XHRcdFx0XHQkKCcubWQtY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdFx0fVxyXG4vLyBcdFx0XHRcdH0pXHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmF1dG9DbG9zZVRpbWVvdXQgPT0gXCJudW1iZXJcIiAmJiBvcHRpb25zLmF1dG9DbG9zZVRpbWVvdXQgPiAwKSB7XHJcbi8vIFx0XHRcdFx0b3B0aW9ucy5hdXRvQ2xvc2VUaW1lcklEPXNldFRpbWVvdXQodGhpcy5jbG9zZSwgb3B0aW9ucy5hdXRvQ2xvc2VUaW1lb3V0KTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fSxcclxuLy8gXHRcdGNsb3NlOiBmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHQkKCcubWQtY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpO1xyXG4vLyBcdFx0fSxcclxuLy8gXHRcdHNldENvbnRlbnQ6IGZ1bmN0aW9uKGNvbnRlbnQpe1xyXG4vLyBcdFx0XHQkKCcubW9kYWwtY29udGVudCcpLmh0bWwoY29udGVudCk7XHJcbi8vIFx0XHR9LFxyXG4vLyBcdFx0c2V0T3B0aW9uOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XHJcbi8vIFx0XHRcdG9wdGlvbnNbbmFtZV0gPSB2YWx1ZTtcclxuLy8gXHRcdH1cclxuLy8gXHR9O1xyXG4vLyB9Il0sInNvdXJjZVJvb3QiOiIifQ==