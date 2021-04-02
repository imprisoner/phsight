import $ from 'jquery'
import {
    initSlider,
    togglePopup,
    expandSearch
} from './utils'

$(document).on('DOMContentLoaded', function () {

    // setting slider

    initSlider(768)

    //expanding search

    expandSearch()

    // popups

    togglePopup('header-menu-btn', 'burger')
    togglePopup('header-user-logged', 'user')

    // auto-expanding textarea
    $('textarea').on('input', function (e) {
        e.target.style.height = e.target.scrollHeight + 'px';
    })
})
// auto-expanding textarea