import $ from 'jquery'
import './libs/jquery.justifiedGallery'
import {
    initSlider,
    initNavTabs,
    initPagination,
    togglePopup,
    expandSearch,
} from './utils'

$(document).on('DOMContentLoaded', function () {

    // setting slider and navtabs animation

    initSlider(680)
    initNavTabs('.tab-link')

    // setting pagination

    initPagination(680)

    // setting JustifiedGallery plugin

    $('.justified-gallery').justifiedGallery({
        rowHeight: 310,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })

    //header animations

    expandSearch('header')
    initNavTabs('.header-navlink')

    // popups

    togglePopup('header-menu-btn', 'burger')
    togglePopup('header-user-logged', 'user')

    // init small nav

    const smallTabs = $('.favorites-navlink')
    smallTabs.each(function () {
        $(this).on('click', function (e) {
            smallTabs.removeClass('active')
            $(this).addClass('active')
        })
    })

    // desktop user menu hover appearance
    if (window.innerWidth > 1279) {
        $('.header-user-avatar').on('mouseenter', function () {
            $('.user-menu').show(200)
            $('.user-menu').on('mouseleave', function () {
                $(this).hide(200)
            })
        })
    }
})