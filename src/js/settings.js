import {
    togglePopup,
    initNavTabs,
    initSlider,
    selectize,
} from './utils'

import './main'
$(function () {

    // slider & nav-tabs

    // initSlider(768)
    // initNavTabs('.tab-link')
    
    // select inputs
    // const selects = $('.selection')
    // selectize(selects)


    // // GENERAL

    
    // const social = $('.contacts-select .select')
    // disableUsedOptions()

    // // input name grabber (for contacts)

    // social
    //     .on('click', selectizeSocial)

    // //contacts delete buttons

    // $('.contacts-delete').one('click', function () {
    //     $(this).closest('.contacts-item').remove()
    //     disableUsedOptions()
    // })
    // // adding new contacts fields



    // $('.contacts-add-contact').on('click', function (e) {
    //     e.stopPropagation()
    //     e.preventDefault()
    //     const field = `
    // <div class="contacts-item">
    //     <div class="contacts-select">
    //         <label class="select"><span></span>
    //             <input class="selection" type="hidden" name="">
    //             <div class="datalist">
    //                 <div class="option" data-value="be" data-href="https://behance.com/">Behance</div>
    //                 <div class="option" data-value="tw" data-href="https://twitter.com/">Twitter</div>
    //                 <div class="option" data-value="tg" data-href="https://t.me/">Telegram</div>
    //                 <div class="option" data-value="500px" data-href="https://500px.com/">500px</div>
    //                 <div class="option" data-value="fl" data-href="https://flickr.com/">Flickr</div>
    //                 <div class="option" data-value="fb" data-href="https://fb.com/">Facebook</div>
    //             </div>
    //         </label>
    //     </div>
    //     <div class="contacts-textfield">
    //         <input class="link" type="text" name="">
    //         <a class="contacts-delete delete-button"><i class="fas fa-times"></i></a>
    //     </div>
    // </div>
    // `
    //     $('.contacts-fields').append(field)

    //     const newItem = $('.contacts-item:last-child .select')
    //     const newField = $('.contacts-item:last-child .selection')

    //     social.push(newItem)
    //     selects.push(newField)
    //     selectize(newField)
    //     disableUsedOptions()

    //     // delete-button
    //     $('.contacts-item:last-child').find('.contacts-delete').one('click', function () {
    //         $(this).closest('.contacts-item').remove()
    //         disableUsedOptions()
    //     })

    //     $('.contacts-item:last-child .select')
    //         .on('click', selectizeSocial)

    // })

    // // calculating possible options of contacts adding
    // function disableUsedOptions() {

    //     // put used values in array

    //     const used = []

    //     $('.contacts-fields span')
    //         .each(function (i) {

    //             if (this.innerText) used.push(this.innerText)

    //         })

    //     // disable each option that matches the 'used' value

    //     social.each(function (i) {

    //         const options = $(this).find('.datalist').children()
    //         options.each(function (i) {
    //             $(this).removeClass('disabled').addClass('option')
    //         })
    //         options.each(function (i) {
    //             const option = this

    //             for (let i = 0; i < used.length; i++) {

    //                 if (option.innerHTML === used[i])
    //                     $(option).removeClass('option').addClass('disabled')

    //             }

    //         })

    //     })
    // }

    // function selectizeSocial(e) {
    //     const target = $(e.target)

    //     if (target.hasClass('option')) {
    //         const name = target
    //             .find('span').text().toLowerCase()

    //         const input = $(this)
    //             .closest('div')
    //             .next('div')
    //             .find('.link')

    //         input.prop('name', name)
    //         input.val(target.data('href'))
    //         input.trigger('focus')
    //         disableUsedOptions()
    //     }
    // }

    // PASSWORD

    // password eye toggle

    // const fields = $('.password-fields').find('label')

    // fields.each(function (i) {

    //     const field = $(this)
    //     const eye = $(this).find('span')
    //     const input = field.find('input')

    //     eye.on('click', function () {

    //         $(this).toggleClass('fa-eye fa-eye-slash')

    //         if (input.attr("type") == "password") {
    //             input.attr("type", "text");
    //         } else {
    //             input.attr("type", "password");
    //         }
    //     });

    // })






    // DEVICES

    // // select inputs
    // const selects = $('.selection')
    // selectize(selects)


    // AJAX delete device from list

    // $('.devices-delete').on('click', function () {
    //     const item = $(this).parent();
    //     const id = item.data('id');
    //     $.getJSON('/my/deletePhotoAccessory', {
    //         id: id
    //     }, function (data) {
    //         if (data.result == 'success') {
    //             item.remove();
    //         }
    //     });
    // });

    // // AJAX getting models 

    // $("#camera_brand").on('change', function () {
    //     $.getJSON('/ajax/getPhotoAccessoriesForBrand/', {
    //         id: $(this).val(),
    //         type: 1
    //     }, function (data) {
    //         $('#camera_model').val('empty');
    //         $.each(data, function (key, val) {
    //             $('#camera_model').next('.datalist').append(
    //                 `
    //                     <div class="option" data-value=${val[0]}>
    //                         ${val[1]}
    //                     </div>
    //                 `
    //             );
    //         });
    //     });
    // });

    // $("#lens_brand").on('change', function () {
    //     $.getJSON('/ajax/getPhotoAccessoriesForBrand/', {
    //         id: $(this).val(),
    //         type: 2
    //     }, function (data) {
    //         $('#lens_model').val('empty');
    //         $.each(data, function (key, val) {
    //             $('#lens_model').next('.datalist').append(
    //                 `
    //                     <div class="option" data-value=${val[0]}>
    //                         ${val[1]}
    //                     </div>
    //                 `
    //             );
    //         });
    //     });
    // });


    // setting popups of device adding 


    // togglePopup('camera-popup', 'add-camera')
    // togglePopup('lens-popup', 'add-lens')

    // // add-camera
    // $('#camera_brand').on('change', function (e) {
    //     if ($(this).val() !== -1) {
    //         $('.add-camera-button').removeClass('disabled')
    //     }
    // })
    // $('.add-camera-button').on('click', function (e) {

    //     if ($(this).hasClass('disabled')) {
    //         e.preventDefault()
    //         e.stopPropagation()
    //     }

    // })

    // //  add-lens
    // $('#lens_brand').on('change', function (e) {
    //     if ($(this).val() !== -1) {
    //         $('.add-lens-button').removeClass('disabled')
    //     }
    // })
    // $('.add-lens-button').on('click', function (e) {

    //     if ($(this).hasClass('disabled')) {
    //         e.preventDefault()
    //         e.stopPropagation()
    //     }

    // })

    // SERVICES



    // togglePopup('album-popup', 'add-album')

    // $("#create_set_button").on('click', function () {
    //     $.ajax({
    //         type: 'POST',
    //         url: '/my/ajaxCreateNewSet/',
    //         data: {
    //             'PhotoSet[caption]': $('#album_name').val()
    //         },
    //         dataType: 'json'
    //     }).done(function (json) {
    //         if (json.id !== undefined) {
    //             $('#album_name').val('');
    //             $('#sets-list').append(
    //                 `
    //             <div class="option">
    //                 <div class="checkbox">
    //                     <input id="PhotoEditFormModel_set_id_${json.id}" value="${json.id}" type="checkbox" name="PhotoEditFormModel[set_id][]" checked />
    //                     <label for="PhotoEditFormModel_set_id_${json.id}"></label>
    //                 </div>
    //                 <div class="content">
    //                     <p class="subheader">${json.caption}</p>
    //                 </div>
    //             </div>
    //             `);
    //         }
    //     });
    // });

    // // ADDSERVICE
    // const selects = $('.selection')
    // selectize(selects)

    // const job_types = [];
    // job_types[1] = { "12": "\u041f\u043e\u0440\u0442\u0440\u0435\u0442", "4": "\u0421\u0432\u0430\u0434\u0435\u0431\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430", "8": "\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f \u0438 \u0440\u0435\u043f\u043e\u0440\u0442\u0430\u0436", "7": "\u0421\u044a\u0435\u043c\u043a\u0430 \u0434\u0435\u0442\u0435\u0439", "17": "\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e", "16": "\u041d\u044e", "10": "\u0418\u043d\u0442\u0435\u0440\u044c\u0435\u0440\u044b \u0438 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430", "15": "\u0420\u0435\u043a\u043b\u0430\u043c\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430", "13": "\u041f\u0440\u0435\u0434\u043c\u0435\u0442\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430", "9": "\u0421\u044a\u0435\u043c\u043a\u0430 \u0431\u0435\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0445", "14": "\u0414\u043b\u044f \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u043c\u0430\u0433\u0430\u0437\u0438\u043d\u043e\u0432", "26": "\u041a\u0430\u0442\u0430\u043b\u043e\u0433\u0438" };
    // job_types[3] = { "24": "\u0420\u0435\u0442\u0443\u0448\u044c", "23": "\u041a\u043e\u043b\u043b\u0430\u0436", "25": "\u0414\u043b\u044f \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u043c\u0430\u0433\u0430\u0437\u0438\u043d\u043e\u0432" };
    // job_types[2] = { "21": "\u0420\u0435\u043a\u043b\u0430\u043c\u0430 \u0438 \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0438", "18": "\u041d\u044e", "22": "\u0421\u044a\u0435\u043c\u043a\u0430 \u0434\u043b\u044f \u0436\u0443\u0440\u043d\u0430\u043b\u043e\u0432", "19": "\u041e\u0434\u0435\u0436\u0434\u0430", "20": "\u0411\u0435\u043b\u044c\u0435" };

    // $(window).on('load', function (e) {
    //     $('#job_category').trigger('change')
    // })
    // $('#job_category').on('change', function (e) {

    //     const id = $(this).val()
    //     const datalist = $('label[for="job_type_id"] .datalist')

    //     datalist.html('')
    //     $('label[for="job_type_id"] span').text('')

    //     $.each(job_types[id], function (key, value) {
    //         datalist.append(`<div data-value="${key}" class="option">${value}</div>`);
    //     })
    // })

 
    // AVATAR EDIT

    // ПРЕДВАРИТЕЛьНАЯ ПРОБНАЯ ВЕРСИЯ СКРИПТА



    const originalPhoto = $('.crop');
    const originalPhotoHeight = originalPhoto.height();
    const originalPhotoWidth = originalPhoto.width();

    let jcrop_api = null;
    let cropParams = [];
    let selectedArea

    function jcropStart() {
        $('.crop').Jcrop({
            onChange: showPreview,
            onSelect: showPreview,
            aspectRatio: 1,
            minSize: [150, 150],
            trueSize: [originalPhotoWidth, originalPhotoHeight]
        }, function () {
            jcrop_api = this;
            if (cropParams != null && typeof cropParams.x != 'undefined') {
                selectedArea = cropParams;
                cropParams = null;
            } else {
                selectedArea = (originalPhotoWidth > originalPhotoHeight) ? {
                    x: (originalPhotoWidth - originalPhotoHeight) / 2,
                    y: 0,
                    x2: originalPhotoHeight,
                    y2: originalPhotoHeight
                } : {
                    x: 0,
                    y: (originalPhotoHeight - originalPhotoWidth) / 2,
                    x2: originalPhotoWidth,
                    y2: originalPhotoWidth
                };
            }
            jcrop_api.setSelect([selectedArea.x, selectedArea.y, selectedArea.x2, selectedArea.y2]);
            $('.edit-preview img').prop('src', originalPhoto.prop('src'));
        });
    }




    function showPreview(coords) {
        var rx =
            150 /
            coords.w;
        var ry =
            150 /
            coords.h;

        $('.edit-preview img')
            .css({
                width: Math.round(rx * originalPhotoWidth) + 'px',
                height: Math.round(ry * originalPhotoHeight) + 'px',
                marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                marginTop: '-' + (Math.round(ry * coords.y)) + 'px'
            });

        var fieldVal = 'h=' + coords.h + '&w=' + coords.w + '&x=' + coords.x + '&x2=' + coords.x2 + '&y=' + coords.y + '&y2=' + coords.y2;

        $('#crop_coordinates').val(fieldVal);
    }
    jcropStart()
})