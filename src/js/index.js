import $ from 'jquery'
import Swiper, {
    Navigation,
    Autoplay,
    EffectFade,
    EffectCoverflow
} from 'swiper'


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
// expanding search    
$('.header-search-btn').on('click', function () {
    $('.search').toggleClass('active')
    if($('.search').hasClass('active')) {
        $('.header-search-field').trigger('focus')
    } else  $('.header-search-field').trigger('blur')
    
})