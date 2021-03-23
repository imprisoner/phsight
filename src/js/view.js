import $ from 'jquery'
import {
    initSlider,
    toggleBurger,
    expandSearch
} from './utils'

$(document).on('DOMContentLoaded', function () { 

    // setting slider

    initSlider(768)

    //expanding search
    
    expandSearch()

    // burger-menu

    toggleBurger()

})
