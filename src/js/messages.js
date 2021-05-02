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
expandSearch('burger')
if (window.innerWidth < 1279 && $('.header-user-logged').length > 0) togglePopup('header-user-logged', 'user')

// desktop user menu hover appearance
if (window.innerWidth > 1279) {
    $('.header-user-avatar').on('mouseenter', function () {
        $('.user-menu').show(200)
        $('.user-menu').on('mouseleave', function () {
            $(this).hide(200)
        })
    })
}

// auto-expanding textarea
const initialHeight = $('textarea').height() + 'px'
console.log(initialHeight)
$('textarea').on('input', function (e) {
    const currentHeight = e.target.scrollHeight + 'px'
    // e.target.style.height = e.target.scrollHeight + 'px'
    // console.log(currentHeight)
    // $(this).height(currentHeight)
    $(this).css('height', currentHeight)
    if (!$(this).val()) {
        // e.target.style.height = initial
        $(this).height(initialHeight)
    }
})