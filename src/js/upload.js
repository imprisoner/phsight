import $ from 'jquery'
import {
    expandSearch,
    togglePopup
} from './utils'

// replacing fileinput

$('.replacement').on('click', function (e) {
    e.preventDefault()
    $('.file-input').trigger('click')
})
$('.fa-upload').on('click', function (e) {
    e.preventDefault()
    $('.file-input').trigger('click')
})

// header expanding search

expandSearch('header')


// popup listeners
togglePopup('header-menu-btn', 'burger')
togglePopup('header-user-logged', 'user')

// desktop user menu hover appearance
if (window.innerWidth > 1279) {
    $('.header-user-avatar').on('mouseenter', function () {
        $('.user-menu').show(200)
        $('.user-menu').on('mouseleave', function () {
            $(this).hide(200)
        })
    })
}

// checkbox tree
if ($('input#exclude')) {

    $('input#exclude').on('click', function () {
        if ($(this).prop('checked')) {
            $('.quiz-sublist .checkbox').removeClass('disabled')
            $('input#anonymous').prop('disabled', false)
            $('input#norate').prop('disabled', false)
        } else {
            $('.quiz-sublist .checkbox').addClass('disabled')
            $('input#anonymous').prop('disabled', true).prop('checked', false)
            $('input#norate').prop('disabled', true).prop('checked', false)
        }

        console.log($('input[type="checkbox"]:checked').length)
    })
    
}