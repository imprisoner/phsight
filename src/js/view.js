import $ from 'jquery'
import {
    initSlider,
    togglePopup,
    expandSearch,
    initNavTabs
} from './utils'

$(document).on('DOMContentLoaded', function () {

    // setting slider

    initSlider(768)

    //header animations

    expandSearch()
    initNavTabs('.header-navlink')
    // popups

    togglePopup('header-menu-btn', 'burger')
    togglePopup('header-user-logged', 'user')

    // auto-expanding textarea
    
    $('textarea').on('input', function (e) {
        e.target.style.height = e.target.scrollHeight + 'px';
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
// auto-expanding textarea