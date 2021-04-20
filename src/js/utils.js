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
        })

        $(`.${popup}-close`).on('click', function (evt) {
            evt.stopPropagation()
            $(`.${popup}-menu`).hide()
            $("body").css("overflow-y", "");
        })
    }
    if (popup === 'burger') {
        expandSearch(popup)
    }
}

// expanding search

export function expandSearch(area = '') {

    $(`.${area}-search-btn`).on('click', function () {
        $('.search').toggleClass('active')
        if ($('.search').hasClass('active')) {
            $(`.${area}-search-field`).trigger('focus')
        } else $(`.${area}-search-field`).trigger('blur').val('')

    })
}

// custom select-inputs
export function selectize(selects = []) {
    selects.each(function (i) {
        const input = $(this)
        const label = $(this).closest('label')
        const datalist = input[0] === label[0] ? $(this).find('.datalist') : $(this).next('.datalist')
        console.log(input)
        const span = label.find('span')


        label.on('click', function (e) {
            $(document).trigger('click')
            e.stopPropagation()
            e.preventDefault()

            if (!datalist.hasClass('active')) {
                console.log('works!')
                datalist.addClass('active')
                datalist.show()
            }

            if ($(e.target).hasClass('option')) {

                input[0].value = e.target.dataset.value
                console.log(input[0].value)
                span.css('color', '')
                span[0].innerText = e.target.innerHTML
                datalist.removeClass('active')
                datalist.hide()
            }

            // datalist clicks
                // datalist.on('click', function(e) {
                //     e.stopPropagation()
                // })
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

// export function selectizeQuiz(selects = []) {
//     $(selects).each(function (i) {
//         const input = $(this)
//         const label = $(this).closest('label')
//         const datalist = $(this).next('.datalist')
//         const span = label.find('span')


//         label.on('click', function (e) {
//             $(document).trigger('click')
//             e.stopPropagation()
//             e.preventDefault()

//             if (!datalist.hasClass('active')) {
//                 console.log('works!')
//                 datalist.addClass('active')
//                 datalist.show()
//             }

//             if ($(e.target).hasClass('option')) {

//                 input.val(e.target.dataset.value)
//                 span[0].innerText = e.target.innerHTML
//                 datalist.removeClass('active')
//                 datalist.hide()
//             }

//             // closing on outside clicks

//             $(document)
//                 .one('click', function (e) {
//                     e.stopPropagation()
//                     datalist.removeClass('active')
//                     datalist.hide()
//                 })
//         })

//     })

// }