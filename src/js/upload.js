import $ from 'jquery'
import {
    expandSearch,
    togglePopup,
    selectize,
    initNavTabs
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

// header animations

expandSearch('header')
initNavTabs('.header-navlink')

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

if ($('input#PhotoEditFormModel_exclude_from_ratings').length > 0) {

    $('input#PhotoEditFormModel_exclude_from_ratings').on('click', function () {
        if ($(this).prop('checked')) {
            $('.quiz-sublist .checkbox').removeClass('disabled')
            $('input#PhotoEditFormModel_anonymous').prop('disabled', false)
            $('input#PhotoEditFormModel_disallow_recommendation').prop('disabled', false)
        } else {
            $('.quiz-sublist .checkbox').addClass('disabled')
            $('input#PhotoEditFormModel_anonymous').prop('disabled', true).prop('checked', false)
            $('input#PhotoEditFormModel_disallow_recommendation').prop('disabled', true).prop('checked', false)
        }

        console.log($('input[type="checkbox"]:checked').length)
    })

}
// album select
// if ($('.info')) {
//     $('.select').each(function(i) {
//         $(this).on('click')
//     })
// }
selectize($('.selection'))

// custom selectizing for quiz-checkboxes

$('.album-select').on('click', function (e) {

        const datalist = $(this).find('.datalist')

        $(document).trigger('click')

        e.stopPropagation()
        e.preventDefault()


        // if (!datalist.hasClass('active')) {

            datalist.toggleClass('active')
            datalist.toggle()

        // }
        // datalist clicks

        datalist.on('click', function(e) {

            e.stopPropagation()

        })

        // closing on outside clicks

        $(document)
            .one('click', function (e) {
                e.stopPropagation()
                datalist.removeClass('active')
                datalist.hide()
            })
    })

// drag&drop

const dropArea = $('.replacement')
const input = $('input[type=file]')[0]
const form = document.forms[0]


const prev = function (e) {
    return false
}

const handleFile = function (e) {

    if (e.type === 'drop') {

        if (e.originalEvent.dataTransfer.files.length > 1 || input.files.length > 1) {

            dropArea.find('p')[0].innerHTML = 'Вы не можете загрузить более одного файла'
            form.reset()
            return

        }

        input.files = e.originalEvent.dataTransfer.files
    }

    const file = input.files[0]

    dropArea.find('span').remove()
    dropArea.find('p')[0].innerHTML = file.name

}

dropArea.on('dragenter dragleave dragover drop', prev)
dropArea.on('drop', handleFile)
$(input).on('change', handleFile)