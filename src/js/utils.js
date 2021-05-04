import $ from 'jquery'
import Swiper from 'swiper'
import Pagination from './pagination'

// setting slider

export function initSlider(breakpoint = 0, clickSlide = true) {
    console.log('slider init')
    let sliderInstance = window.innerWidth < breakpoint ?
        new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            slideToClickedSlide: clickSlide,
            freeMode: true
        }) :
        null
        console.log(sliderInstance)
    return sliderInstance
}

// setting navtabs animation

export function initNavTabs(el = '') {

    const tabs = $(el)

    tabs.each(function (i) {
        $(this).on('click', function (e) {

            tabs.removeClass('active')
            $(this).addClass('active')

        })
    })
}

// setting pagination

export function initPagination(breakpoint) {

    const options = {
        size: 105,
        page: 1,
        step: 1
    }

    if (window.innerWidth < breakpoint) {
        options.step = 0
    }

    Pagination.Init(document.getElementsByClassName('pagination'), options)

}

// user-menu and burger-menu
/** 
 * Adds listeners and toggles popups
 * @param   {String} target element you click
 * @param   {String} popup popup you call
 */
export function togglePopup(target, popup) {
    if (target) {

        $(`.${target}`).on('click', function (e) {

            e.stopPropagation()
            $(`.${popup}-menu`).show()
            $("body").css("overflow-y", "hidden");
            // 
            $(`.${popup}-menu`).on('click', function(e) {
                e.stopPropagation()
            })
            // 
            $(document).one('keydown', function (e) {

                if (e.code === 'Escape') {
                    $(`.${popup}-menu`).hide()
                    $("body").css("overflow-y", "");
                }

            })



            $(`.${popup}-close`).one('click', function (e) {
                // e.stopPropagation()
                $(`.${popup}-menu`).hide()
                $("body").css("overflow-y", "");
            })

        })
    }
    if (popup === 'burger') {
        expandSearch(popup)
    }
}

// expanding search

export function expandSearch(area = '') {

    $(`.${area}-search-btn`).on('click', function (e) {
        console.log('here')
        const button = $(this)
        const input = $(`.${area}-search-field`)
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

            $(document).on('keydown', function (e) {

                if (e.code === 'Enter') {
                    form.trigger('submit')
                }

                if (e.code === 'Escape') {
                    form.removeClass('active')
                    input.trigger('blur').val('')
                    $(document).off()
                    button.off('click', submit)
                }

            })

            $(document).on('click', function () {

                form.removeClass('active')
                input.trigger('blur').val('')
                $(document).off()
                button.off('click', submit)
            })
        }

    })
}

// custom select-inputs
export function selectize(selects = []) {
    selects.each(function (i) {
        const input = $(this)
        const label = $(this).closest('label')
        const datalist = input[0] === label[0] ? $(this).find('.datalist') : $(this).next('.datalist')
        // console.log(input)
        const span = label.find('span')


        label.on('click', function (e) {
            $(document).trigger('click')
            e.stopPropagation()
            e.preventDefault()

            if (!datalist.hasClass('active')) {
                datalist.addClass('active')
                datalist.show()
            }

            if ($(e.target).hasClass('option')) {

                input[0].value = e.target.dataset.value
                // console.log(input[0].value)
                span.css('color', '')
                span[0].innerText = e.target.innerHTML
                input.trigger('change')
                datalist.removeClass('active')
                datalist.hide()
            }

            // closing on outside clicks

            $(document)
                .one('click', function (e) {
                    e.stopPropagation()
                    datalist.removeClass('active')
                    datalist.hide()
                })
        })

    })

}
/* ЖАЛОБЫ */

export function showTroubleTicketForm(target_type, target_id) {

    const popup = $('.popup-menu')
    let url = '';
    if (target_type == 'Photo') {
        url = '/troubleTicket/ajaxClaimPhotoForm';
    } else if (target_type == 'PhotoComment') {
        url = '/troubleTicket/ajaxClaimPhotoCommentForm';
    } else if (target_type == 'Member') {
        url = '/troubleTicket/ajaxClaimMemberForm';
    } else return false;

    $.ajax({
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

$(function () {

    const popup = $('.popup-menu')

    $('body').on('submit', '#troubleTicketForm', function (e) {
        $.ajax({
            type: 'POST',
            url: '/trouble_ticket/ajax_send_trouble_ticket/',
            data: $(this).serialize(),
            success: function (msg) {
                popup.find('.insertion').html(msg);
                popup.find('.trigger').trigger('click')

                function closeTimeout() {
                    setTimeout(function () {
                        $('.popup-close').trigger('click')
                    }, 3000)

                    $(document).on('click')
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