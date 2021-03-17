import $ from 'jquery'
import Swiper from 'swiper/core'

$(document).on('DOMContentLoaded', function () { 

    // if (window.innerWidth < 480) {

        console.log('swiper init')
        const swiperTabs = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            freeMode: true
        })
       
    // }


    //expanding search    
    $('.header-search-btn').on('click', function () {
        $('.search').toggleClass('active')
        if ($('.search').hasClass('active')) {
            $('.header-search-field').trigger('focus')
        } else {
            $('.header-search-field').trigger('blur').val('')
        }

    })

})
