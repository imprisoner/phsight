import $ from 'jquery'
import Swiper from 'swiper'
import Pagination from './pagination'

// setting slider

export function initSlider(breakpoint = 0) {
    console.log('slider init')
    let sliderInstance = window.innerWidth < breakpoint ?
        new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            freeMode: true
        }) :
        null

    return sliderInstance
}

// setting navtabs animation

export function initNavTabs(breakpoint = 0, sliderInstance) {

    const marker = $('.tab-marker')
    const tabs = $('.tab-link')

    function indicator(target, shift = 0) {
        if (shift >= 0) {
            marker.css('left', target.offsetLeft - shift)
        } else {
            marker.css('left', target.offsetLeft + shift)
        }
        marker.css('width', target.offsetWidth + 9)
    }

    tabs.each(function (i) {
        $(this).on('click', function (e) {
            const target = e.target
            tabs.removeClass('active')
            $(this).addClass('active')
            if (sliderInstance) {
                const translate = sliderInstance.translate
                indicator(target, 5 - translate)
            } else
                indicator(target, 5)
        })
        if ($(this).hasClass('active')) {
            indicator(this, -4)
        }
    })
    if (sliderInstance) {
        sliderInstance.on('setTranslate', () => {
            const translate = sliderInstance.translate
            marker.css('left', $('.active')[0].offsetLeft + translate - 5)
        })
    }
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