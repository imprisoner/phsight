import Swiper, {
    Navigation,
    Autoplay,
    EffectFade,
    EffectCoverflow
} from 'swiper'


import './main'
Swiper.use([Navigation, Autoplay, EffectFade, EffectCoverflow])

$(function () {


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
})