import $ from 'jquery'
import {
    expandSearch,
    togglePopup,
    initNavTabs
} from './utils'

// header animations

expandSearch('header')
initNavTabs('.header-navlink')

// popup listeners
togglePopup('header-menu-btn', 'burger')
if(window.innerWidth < 1279) togglePopup('header-user-logged', 'user')
expandSearch('burger')
// desktop user menu hover appearance
if (window.innerWidth > 1279) {
    $('.header-user-avatar').on('mouseenter', function () {
        $('.user-menu').show(200)
        $('.user-menu').on('mouseleave', function () {
            $(this).hide(200)
        })
    })
}