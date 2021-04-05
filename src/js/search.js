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
    $('.tabs .swiper-container').removeClass('swiper-container')

    
    initNavTabs()
    // setting pagination
    initSlider(580, false)
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

    // radio inputs
 
    const radioButtons = $('input[type="radio"]')
    radioButtons.each(function () {
        $(this).on('click', function (e) {
            radioButtons.removeClass('checked')
            $(this).addClass('checked')
        })
    })
})