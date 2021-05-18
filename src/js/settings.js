import {
    togglePopup,
    initNavTabs,
    initSlider,
    selectize,
} from './utils'

import './main'

$(function () {

    // slider & nav-tabs

    initSlider(768)
    initNavTabs('.tab-link')

    // select inputs
    // const selects = $('.selection')
    // selectize(selects)


    // GENERAL

    // 
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

    // select inputs
    const selects = $('.selection')
    selectize(selects)


    // AJAX delete device from list

    $('.devices-delete').on('click', function () {
        const item = $(this).parent();
        const id = item.data('id');
        $.getJSON('/my/deletePhotoAccessory', {
            id: id
        }, function (data) {
            if (data.result == 'success') {
                item.remove();
            }
        });
    });

    // AJAX getting models 

    $("#camera_brand").on('change', function () {
        $.getJSON('/ajax/getPhotoAccessoriesForBrand/', {
            id: $(this).val(),
            type: 1
        }, function (data) {
            $('#camera_model').val('empty');
            $.each(data, function (key, val) {
                $('#camera_model').next('.datalist').append(
                    `
                        <div class="option" data-value=${val[0]}>
                            ${val[1]}
                        </div>
                    `
                );
            });
        });
    });

    $("#lens_brand").on('change', function () {
        $.getJSON('/ajax/getPhotoAccessoriesForBrand/', {
            id: $(this).val(),
            type: 2
        }, function (data) {
            $('#lens_model').val('empty');
            $.each(data, function (key, val) {
                $('#lens_model').next('.datalist').append(
                    `
                        <div class="option" data-value=${val[0]}>
                            ${val[1]}
                        </div>
                    `
                );
            });
        });
    });


    // setting popups of device adding 


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

    // services

    // togglePopup('album-popup', 'add-album')


    //     $(function () {
    // 		$('#city_name').autocomplete({
    // 			minLength: '3',
    // 			showAnim: 'fold',
    // 			select: function (event, ui) {
    // 				this.value = ui.item.value;
    // 				if (ui.item.country_id) {
    // 					$("#country_id").dropkick('select', ui.item.country_id);
    // 				}
    // 				return false;
    // 			},
    // 			source: function (request, response) {
    // 				$.ajax({
    // 					url: "/ajax/citySuggest",
    // 					dataType: "json",
    // 					data: {
    // 						term: request.term,
    // 						country_id: $("#country_id").val()
    // 					},
    // 					success: function (data) {
    // 						response(data);
    // 					}
    // 				})
    // 			}
    // 		});
    // 	});




    // AVATAR EDIT

    // ПРЕДВАРИТЕЛьНАЯ ПРОБНАЯ ВЕРСИЯ СКРИПТА



    // const originalPhoto = $('.crop');
    // const originalPhotoHeight = originalPhoto.height();
    // const originalPhotoWidth = originalPhoto.width();

    // let jcrop_api = null;
    // let cropParams = [];
    // let selectedArea

    // function jcropStart() {
    //     $('.crop').Jcrop({
    //         onChange: showPreview,
    //         onSelect: showPreview,
    //         aspectRatio: 1,
    //         minSize: [150, 150],
    //         trueSize: [originalPhotoWidth, originalPhotoHeight]
    //     }, function () {
    //         jcrop_api = this;
    //         if (cropParams != null && typeof cropParams.x != 'undefined') {
    //             selectedArea = cropParams;
    //             cropParams = null;
    //         } else {
    //             selectedArea = (originalPhotoWidth > originalPhotoHeight) ? {
    //                 x: (originalPhotoWidth - originalPhotoHeight) / 2,
    //                 y: 0,
    //                 x2: originalPhotoHeight,
    //                 y2: originalPhotoHeight
    //             } : {
    //                 x: 0,
    //                 y: (originalPhotoHeight - originalPhotoWidth) / 2,
    //                 x2: originalPhotoWidth,
    //                 y2: originalPhotoWidth
    //             };
    //         }
    //         jcrop_api.setSelect([selectedArea.x, selectedArea.y, selectedArea.x2, selectedArea.y2]);
    //         $('.edit-preview img').prop('src', originalPhoto.prop('src'));
    //     });
    // }




    // function showPreview(coords) {
    //     var rx =
    //         150 /
    //         coords.w;
    //     var ry =
    //         150 /
    //         coords.h;

    //     $('.edit-preview img')
    //         .css({
    //             width: Math.round(rx * originalPhotoWidth) + 'px',
    //             height: Math.round(ry * originalPhotoHeight) + 'px',
    //             marginLeft: '-' + Math.round(rx * coords.x) + 'px',
    //             marginTop: '-' + (Math.round(ry * coords.y)) + 'px'
    //         });

    //     var fieldVal = 'h=' + coords.h + '&w=' + coords.w + '&x=' + coords.x + '&x2=' + coords.x2 + '&y=' + coords.y + '&y2=' + coords.y2;

    //     $('#crop_coordinates').val(fieldVal);
    // }
    // jcropStart()
})