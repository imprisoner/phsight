// FILE upload


// replacing fileinput

$('.replacement').on('click', function (e) {
    e.preventDefault()
    $('.file-input').trigger('click')
})
$('.fa-upload').on('click', function (e) {
    e.preventDefault()
    $('.file-input').trigger('click')
})


// drag&drop

const dropArea = $('.replacement')
const input = $('input[type=file]')[0]

const popup = $('.popup-menu')
togglePopup('trigger', 'popup')

const prev = function (e) {
    return false
}

const handleFile = function (e) {

    if (e.type === 'drop') {
        if (e.originalEvent.dataTransfer.files.length > 1 || input.files.length > 1) {

            dropArea.find('p').text('Вы не можете загрузить более одного файла')
            return

        }

        input.files = e.originalEvent.dataTransfer.files
        $(input).trigger('change')
    }

    const file = input.files[0]

    dropArea.find('span').remove()
    dropArea.find('p').text(file.name)

}

dropArea.on('dragenter dragleave dragover drop', prev)
dropArea.on('drop', handleFile)
$(input).on('change', handleFile)

window.addEventListener('load', function () {

    function check_file() {

        var $this = $('#UploadPhotoFormModel_file');
        if ($this[0].files[0] == undefined) {

            popup.find('.insertion').html('<h3>Выберите файл</h3><p>Вы не указали загружаемую фотографию.</p>')
            popup.find('.trigger').trigger('click')
            return false;
        }

        var fSize = $this[0].files[0].size
        if (fSize > (1024 * 1024 * 10)) {

            popup.find('.insertion').html('<h3>Превышение размера файла</h3><p>Вы не можете загрузить фотографию, превышающую максимально допустимый размер.</p>')
            popup.find('.trigger').trigger('click')
            return false;
        }

        var fup = document.getElementById('UploadPhotoFormModel_file');
        var fileName = fup.value;
        var ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        if (ext !== "gif" && ext !== "jpeg" && ext !== "jpg" && ext !== "png") {

            popup.find('.insertion').html('<h3>Неверный тип файла</h3><p>Вы не можете загрузить файл в формате ' + ext + '</p>')
            popup.find('.trigger').trigger('click')
            return false;
        }
        return true;
    }

    $('#UploadPhotoFormModel_file').on('change', function () {
        check_file();
    });

    $('#photo_form').on('submit', function () {
        if (!check_file()) {
            return false;
        }
        $('#submit-button').prop('disabled', true).val('Подождите...');
    });
})