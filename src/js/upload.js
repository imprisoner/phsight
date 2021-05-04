import $ from 'jquery'
import {
    expandSearch,
    togglePopup,
    selectize,
    initNavTabs
} from './utils'

// replacing fileinput
$(function () {

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


// ============================================ common scripts end




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


    // AJAX

    $("#create_set_button").on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/my/ajaxCreateNewSet/',
            data: {
                'PhotoSet[caption]': $('#album_name').val()
            },
            dataType: 'json'
        }).done(function (json) {
            if (json.id !== undefined) {
                $('#album_name').val('');
                $('#sets-list').append(
                    `
                <div class="option">
                    <div class="checkbox">
                        <input id="PhotoEditFormModel_set_id_${json.id}" value="${json.id}" type="checkbox" name="PhotoEditFormModel[set_id][]" checked />
                        <label for="PhotoEditFormModel_set_id_${json.id}"></label>
                    </div>
                    <div class="content">
                        <p class="subheader">${json.caption}</p>
                    </div>
                </div>
                `);
            }
        });
    });

    $("#camera_id").on('change', function () {
        if ($(this).val() == -1) {
            $(".camera-popup").trigger('click')
        }
    });

    $("#lens_id").on('change', function () {
        if ($(this).val() == -1) {
            $(".lens-popup").trigger('click')
        }
    });

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
                        </div>`);
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
})