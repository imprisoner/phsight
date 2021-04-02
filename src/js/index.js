import $ from 'jquery'
import Swiper, {
    Navigation,
    Autoplay,
    EffectFade,
    EffectCoverflow
} from 'swiper'
import {
    expandSearch,
    togglePopup
} from './utils'

Swiper.use([Navigation, Autoplay, EffectFade, EffectCoverflow])

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


// popup listeners
togglePopup('header-menu-btn', 'burger')
togglePopup('header-user-logged', 'user')