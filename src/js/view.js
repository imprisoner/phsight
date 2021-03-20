import $ from 'jquery'
import {
    initSlider,
} from './utils'

$(document).on('DOMContentLoaded', function () { 

    // setting slider

    initSlider(768)

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
