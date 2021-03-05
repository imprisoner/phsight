import $ from 'jquery'
import './libs/jquery.justifiedGallery'
// import SwiperCore, {
//     Navigation,
//     EffectFade,
//     Swiper
// } from 'swiper/core'
import Swiper from 'swiper/bundle';
// SwiperCore.use(Navigation, EffectFade)



$(document).on('DOMContentLoaded', function () {

    // slider on mobile
    console.log(window.innerWidth === 375)

    let swiperTabs
    if (window.innerWidth === 375) {
        swiperTabs = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            // centerInsufficientSlides: true,
            freeMode: true
        })
        $('.swiper-slide:nth-child(3)').on('click', function () {
            swiperTabs.slidePrev()
        })
        $('.swiper-slide').last().on('click', function () {
            swiperTabs.slideNext()
        })
    }
    
    // gallery photos request

    $.ajax({
        // GET photos
    })

    // JG init

    $('.content-gallery').justifiedGallery({
        rowHeight: 310,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })

    

    
    // static on desktop

    const marker = $('.content-tab-marker')
    const tabs = $('.content-nav-link')


    const indicator = (target, shift = 0) => {

        marker.css('left', target.offsetLeft - shift)
        marker.css('width', target.offsetWidth + 9)



    }

    tabs.each(function (i) {

        $(this).on('click', function (e) {
            const target = e.target
            tabs.removeClass('active')
            $(this).addClass('active')


            if (swiperTabs) {
                let translate = swiperTabs.translate

                indicator(target, 5 - translate)
            } else indicator(target, 5)
        })

        if (i === 0) {
            $(this).trigger('click')
        }

    })
    swiperTabs.on('setTranslate', () => {
        const translate = swiperTabs.translate
        marker.css('left', $('.active')[0].offsetLeft + translate - 5)
    })

})