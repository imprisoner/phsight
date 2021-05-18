import {
    initSlider,
    initNavTabs,
    initPagination,
} from './utils'

import './main'

$(function () {

    // setting navtabs animation

    $('.tabs .swiper-container').removeClass('swiper-container')
    initNavTabs('.tab-link')

    // setting pagination

    initSlider(580, false)
    initPagination(680)

    // setting JustifiedGallery plugin
    if ($('.justified-gallery').length > 0) {
         $('.justified-gallery').justifiedGallery({
            rowHeight: 310,
            margins: 2,
            lastRow: 'justify',
            randomize: true
        })
    }

    const radioButtons = $('input[type="radio"]')
    radioButtons.each(function () {
        $(this).on('click', function (e) {
            radioButtons.removeClass('checked')
            $(this).addClass('checked')
        })
    })

    // submitting form

    $('.search-btn').on('click', function() {
        $('.search-form').trigger('submit')
    })

    $('.search-field').on('focus', function() {
        $(document).one('keydown', function(e) {
            console.log(e.code)
            if (e.code === 'Enter') $('.search-form').trigger('submit')
        })
    })

    // filters select

    $('.select').on('click', function(e) {

        e.stopPropagation()

        const select = $(this)
        const datalist = select.find('.datalist')
        const span = select.find('span')
        const option = datalist.find('.option')

        datalist.show()

        option.on('click', function() {
            span.text($(this).text())
            datalist.hide()
            $(document).off()
        })

        $(document).on('click', function() {
            datalist.hide()
            $(document).off()
        })

    })
})