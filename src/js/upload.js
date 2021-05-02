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
if (window.innerWidth < 1279) togglePopup('header-user-logged', 'user')
expandSearch('burger')
// desktop user menu hover appearance
if (window.innerWidth > 1279) {
    $('.header-user-avatar').on('mouseenter', function () {
        $(document).on('keydown', function (e) {
            if (e.code === 'Escape') $('.user-menu').hide(200)
        })
        $('.user-menu').show(200)
        $('.user-menu').on('mouseleave', function () {
            $(this).hide(200)
        })
    })
}


// FILE upload

// drag&drop

const dropArea = $('.replacement')
const input = $('input[type=file]')[0]
const form = document.forms[0]


const prev = function (e) {
    return false
}

const handleFile = function (e) {

    if (e.type === 'drop') {
        $(input).trigger('change')
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

window.addEventListener('load', function () {
    console.log('content loaded')

    function check_file() {
       
        var $this = $('#UploadPhotoFormModel_file');
        if ($this[0].files[0] == undefined) {
            console.log('Выберите файл')
            // var popup = new PopUp();
            // popup.setContent('<h3>Выберите файл</h3><p>Вы не указали загружаемую фотографию.</p>');
            // popup.open();
            return false;
        }

        var fSize = $this[0].files[0].size
        if (fSize > (1024 * 1024 * 10)) {
            console.log('Превышение размера файла')
            // var popup = new PopUp();
            // popup.setContent('<h3>Превышение размера файла</h3><p>Вы не можете загрузить фотографию, превышающую максимально допустимый размер.</p>');
            // popup.open();
            return false;
        }

        var fup = document.getElementById('UploadPhotoFormModel_file');
        var fileName = fup.value;
        var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        if (ext !== "gif" && ext !== "jpeg" && ext !== "jpg" && ext !== "png") {
            // var popup = new PopUp();
            // popup.setContent('<h3>Неверный тип файла</h3><p>Вы не можете загрузить файл в формате ' + ext + '</p>');
            // popup.open();
            console.log('Неверный тип файла')
            return false;
        }
        return true;
    }
    
    $('#UploadPhotoFormModel_file').on('change', function () {
        console.log('change')
        check_file();
    });

    $('#photo_form').on('submit', function() {
        if(!check_file()) {
            return false;
        }
        console.log('submitting')
        $('#submit-button').prop('disabled', true).val('Подождите...');
    });
})


//  INFO upload

// popups

togglePopup('album-popup', 'add-album')
togglePopup('camera-popup', 'add-camera')
togglePopup('lens-popup', 'add-lens')

// add-camera
$('#camera_brand').on('change', function (e) {
    if ($(this).val() !== -1) {
        $('.add-camera-button').removeClass('disabled')
    }
})
$('.add-camera-button').on('click', function (e) {

    if ($(this).hasClass('disabled')) {
        e.preventDefault()
        e.stopPropagation()
    }

})

//  add-lens
$('#lens_brand').on('change', function (e) {
    if ($(this).val() !== -1) {
        $('.add-lens-button').removeClass('disabled')
    }
})

$('.add-lens-button').on('click', function (e) {

    if ($(this).hasClass('disabled')) {
        e.preventDefault()
        e.stopPropagation()
    }

})

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

    datalist.on('click', function (e) {

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


// other selects

selectize($('.selection'))