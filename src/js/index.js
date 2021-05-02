import $ from 'jquery'
import Swiper, {
    Navigation,
    Autoplay,
    EffectFade,
    EffectCoverflow
} from 'swiper'
import {
    expandSearch,
    togglePopup,
    initNavTabs
} from './utils'

Swiper.use([Navigation, Autoplay, EffectFade, EffectCoverflow])

$(document).on('DOMContentLoaded', function (e) {


    new Swiper('.swiper-container', {
        autoplay: {
            delay: 7000,
            disableOnInteraction: false
        },
        effect: 'fade',
        navigation: {
            nextEl: '.slider-btn-next',
            prevEl: '.slider-btn-prev',
            disabledClass: 'slider-btn-disabled'
        },
    })

    // header expanding search

    expandSearch('header')
    initNavTabs('.header-navlink')

    // popup listeners
    togglePopup('header-menu-btn', 'burger')
    expandSearch('burger')
    // desktop user menu appearance
    if (window.innerWidth > 1279) {

        $('.header-user-avatar').on('mouseenter', function () {
            $('.user-menu').show(200)
            $('.user-menu').on('mouseleave', function () {
                $(this).hide(200)
            })
        })

        togglePopup('header-user-logged', 'user')
    }


})