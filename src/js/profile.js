import $ from 'jquery'
import './libs/jquery.justifiedGallery'
import {
    initSlider,
    initNavTabs,
    initPagination,
    togglePopup,
    expandSearch
} from './utils'

$(document).on('DOMContentLoaded', function () {

    // setting slider and navtabs animation

    const slider = initSlider(680)
    initNavTabs(680, slider)

    // setting pagination

    initPagination(680)

    // setting JustifiedGallery plugin

    $('.justified-gallery').justifiedGallery({
        rowHeight: 310,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })

    //expanding search

    expandSearch('header')

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
})