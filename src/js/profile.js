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
    if(window.innerWidth < 1279) togglePopup('header-user-logged', 'user')
    expandSearch('burger')
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

    // more-btn
    // togglePopup('nav-more', 'dots')
    $('.nav-more').on('click', function(e) {
        
        e.stopPropagation()
        const target = $('.dots-menu')
        target.on('click', function(e) {
            e.stopPropagation()
        })
        target.toggle()


        $(document).one('keydown', function (e) {

            if (e.code === 'Escape') {
                $('.dots-menu').hide()
                $('.nav-more').trigger('blur')
                $(document).off()
            }
            
        })
        $(document).one('click', function (e) {

                $('.dots-menu').hide()
                $(document).off()
           
        })
    })
})