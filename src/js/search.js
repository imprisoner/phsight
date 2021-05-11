// import $ from 'jquery'
// import './libs/jquery.justifiedGallery'
import {
    initSlider,
    initNavTabs,
    initPagination,
    // togglePopup,
    // expandSearch,
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

    //header animations

    // expandSearch('header')
    // initNavTabs('.header-navlink')
    // popups

    // togglePopup('header-menu-btn', 'burger')
    // if(window.innerWidth < 1279) togglePopup('header-user-logged', 'user')
    // expandSearch('burger')
    // radio inputs

    const radioButtons = $('input[type="radio"]')
    radioButtons.each(function () {
        $(this).on('click', function (e) {
            radioButtons.removeClass('checked')
            $(this).addClass('checked')
        })
    })

    // desktop user menu hover appearance

    // if (window.innerWidth > 1279) {
    //     $('.header-user-avatar').on('mouseenter', function () {
    //         $('.user-menu').show(200)
    //         $('.user-menu').on('mouseleave', function () {
    //             $(this).hide(200)
    //         })
    //     })
    // }


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
})