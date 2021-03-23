import $ from 'jquery'
import './libs/jquery.justifiedGallery'
import {
    initSlider,
    initNavTabs,
    initPagination,
    toggleBurger,
    expandSearch
} from './utils'


$(document).on('DOMContentLoaded', function () {

    // setting slider and navtabs animation

    const slider = initSlider(480)
    initNavTabs(480, slider)

    // setting pagination
    
    initPagination(480)

    // setting JustifiedGallery plugin

    $('.justified-gallery').justifiedGallery({
        rowHeight: 310,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })

    //expanding search

    expandSearch('header')

    // burger-menu

    toggleBurger()

})

