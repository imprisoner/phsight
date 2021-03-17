import $ from 'jquery'
import './libs/jquery.justifiedGallery'
import Swiper from 'swiper/core'
// import Pagination from './pagination'



$(document).on('DOMContentLoaded', function () {


    const marker = $('.tab-marker')
    const tabs = $('.tab-link')

    let swiperTabs
    let pgStep = 1

    if (window.innerWidth < 480) {

        // slider nav on mobile

        console.log('swiper init')
        swiperTabs = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            // centerInsufficientSlides: true,
            slideToClickedSlide: true,
            freeMode: true
        })
        // $('.swiper-slide:nth-child(3)').on('click', function () {
        //     swiperTabs.slideNext()
        // })
        // $('.swiper-slide').last().on('click', function () {
        //     swiperTabs.slidePrev()
        // })
        swiperTabs.on('setTranslate', () => {
            const translate = swiperTabs.translate
            marker.css('left', $('.active')[0].offsetLeft + translate - 5)
        })

        pgStep = 0
    }

    // gallery photos request

    $.ajax({
        // GET photos
    })

    // JG init

    $('.justified-gallery').justifiedGallery({
        rowHeight: 310,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })






    // static nav on desktop


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
            } else
                indicator(target, 5)
        })
        if (i === 0) {
            $(this).trigger('click')
        }

    })




    Pagination.Init(document.getElementsByClassName('pagination'), {
        size: 105, // pages size
        page: 1, // selected page
        step: pgStep // pages before and after current
    })

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