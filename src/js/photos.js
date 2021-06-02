import {
    initSlider,
    initNavTabs,
    initPagination,
} from './utils'

import './main'


$(function () {

    // setting slider and navtabs animation

    initSlider(480)
    initNavTabs('.tab-link')

    // setting pagination

    initPagination(480)

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