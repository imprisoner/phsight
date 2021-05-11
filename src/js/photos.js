import {
    initSlider,
    initNavTabs,
    initPagination,
    // togglePopup,
    // expandSearch,
} from './utils'

import './main'


$(function () {

    // setting slider and navtabs animation

    initSlider(480)
    initNavTabs('.tab-link')

    // setting pagination

    initPagination(480)

    // setting JustifiedGallery plugin
    if ($('.justified-gallery').length > 0) {
        $('.justified-gallery').justifiedGallery({
            rowHeight: 415,
            margins: 2,
            lastRow: 'justify',
            randomize: true
        })
    }

    // categories dropdown

    $('.content-categories').on('click', function (e) {
        const dropdown = $('.dropdown')
        e.stopPropagation()
        $(this).toggleClass('active')
        dropdown.toggle()
        $(document).one('click', function () {
            dropdown.hide()
            $('.content-categories').removeClass('active')
        })

        $(document).one('keydown', function (e) {
            if (e.code === 'Escape') {
                dropdown.hide()
                $('.content-categories').removeClass('active')
            }
        })
    })

})