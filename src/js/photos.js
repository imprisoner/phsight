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

    initSlider(480)
    initNavTabs('.tab-link')

    // setting pagination

    initPagination(480)
    
    // setting JustifiedGallery plugin

    $('.justified-gallery').justifiedGallery({
        rowHeight: 415,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })
 

    expandSearch('header')
    initNavTabs('.header-navlink')
    // popups
    
    togglePopup('header-menu-btn', 'burger')
    expandSearch('burger')
    if(window.innerWidth < 1279) togglePopup('header-user-logged', 'user')

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