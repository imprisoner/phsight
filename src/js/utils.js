// import $ from 'jquery'
import Swiper from 'swiper'
import Pagination from './pagination'

// setting slider

export function initSlider(breakpoint = 0, clickSlide = true, container) {
    // console.log('slider init')
    let sliderInstance = window.innerWidth < breakpoint ?
        new Swiper(container || '.swiper-container', {
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
            $(`.${popup}-menu`).on('click', function (e) {
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
        const selected = datalist.find('.selected')
        const span = label.find('span')

        if(selected.length > 0) {
            span.text(selected.text())
            input.val(selected.data('value'))
        }
        label.on('click', function (e) {
            $(document).trigger('click')
            e.stopPropagation()
            e.preventDefault()
            $(this).toggleClass('active')
            if (!datalist.hasClass('active')) {
                datalist.addClass('active')
                datalist.show()
            }

            if ($(e.target).hasClass('option')) {

                input.val(e.target.dataset.value)
                span.css('color', '')
                span.text(e.target.innerHTML)
                input.trigger('change')
                datalist.removeClass('active')
                label.removeClass('active')
                datalist.hide()
            }

            // closing on outside clicks

            $(document)
                .one('click', function (e) {
                    e.stopPropagation()
                    label.removeClass('active')
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
            return true;
        },
        error: function () {

            popup.find('.insertion').html('Ошибка');
            popup.find('.trigger').trigger('click');
            return false;
        }
    });
}

// $(function () {

//     const popup = $('.popup-menu')

//     $('body').on('submit', '#troubleTicketForm', function (e) {
//         $.ajax({
//             type: 'POST',
//             url: '/trouble_ticket/ajax_send_trouble_ticket/',
//             data: $(this).serialize(),
//             success: function (msg) {
//                 popup.find('.insertion').html(msg);
//                 popup.find('.trigger').trigger('click')

//                 function closeTimeout() {
//                     const timer = setTimeout(function () {
//                         $('.popup-close').trigger('click')
//                     }, 3000)

//                     $('.popup-close').one('click', function() {
//                         clearTimeout(timer)
//                     })
//                 }

//                 closeTimeout()
//             },
//             error: function (jqXHR) {

//                 popup.find('.insertion').html(jqXHR.responseText);
//                 popup.find('.trigger').trigger('click')
//             }
//         });
//         e.preventDefault();
//     });

// });

/* КОНЕЦ: ЖАЛОБЫ*/