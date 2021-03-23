import $ from 'jquery'
import Swiper, {
    Navigation,
    Autoplay,
    EffectFade,
    EffectCoverflow
} from 'swiper'
import {toggleBurger, expandSearch} from './utils'

Swiper.use([Navigation, Autoplay, EffectFade, EffectCoverflow])

new Swiper('.swiper-container', {
    autoplay: {delay: 7000, disableOnInteraction: false},
    effect: 'fade',
    navigation: {
        nextEl: '.slider-btn-next',
        prevEl: '.slider-btn-prev',
        disabledClass: 'slider-btn-disabled'
      },
})

// header expanding search

expandSearch('header')


// burger listeners
toggleBurger()