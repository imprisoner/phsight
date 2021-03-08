import $ from 'jquery'

$(document).on('DOMContentLoaded', function () {
    const marker = $('.content-tab-marker')
    const tabs = $('.content-nav-link')
    const swiperTabs = 0
    
    const indicator = (target, shift = 0) => {
        marker.css('left', target.offsetLeft - shift)
        marker.css('width', target.offsetWidth + 9)
    }

    tabs.each(function (i) {
        $(this).on('click', function (e) {
            const target = e.target
            tabs.removeClass('active')
            $(this).addClass('active')
            if (swiperTabs) {
                let translate = swiperTabs.translate
                indicator(target, 5 - translate)
            } else
                indicator(target, 5)
        })
        if (i === 0) {
            $(this).trigger('click')
        }

    })

})