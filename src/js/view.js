// import $ from 'jquery'
// import './libs/jquery.Jcrop'
// import * as Lightbox from './libs/lightbox'
import {
    initSlider,
    togglePopup,
    // expandSearch,
    // initNavTabs,
    showTroubleTicketForm
    // PopUp
} from './utils'
import './main'
$(function () {
    // setting slider

    initSlider(768)

    // popups

    const popup = $('.popup-menu')
    togglePopup('trigger', 'popup')

    

    // auto-expanding textarea


    const initialHeight = $('textarea').height() + 'px'

    $('textarea').on('input', function (e) {
        const currentHeight = e.target.scrollHeight + 'px'

        $(this).css('height', currentHeight)
        if (!$(this).val()) {
            $(this).height(initialHeight)
        }
    })

   

    // Show EXIF

    const exifButton = $('.exif-btn')
    const exifContent = $('.exif-content')

    exifButton.on('click', function (e) {
        e.stopPropagation()

        if (!exifButton.hasClass('active')) {

            exifButton.addClass('active')
            exifButton.next('p').text('Скрыть EXIF')
            exifContent.show()
        } else {

            exifButton.removeClass('active')
            exifButton.next('p').text('Показать EXIF')
            exifContent.hide()
        }
    })

    // dots-menu

    $('.hero-more').on('click', function (e) {

        e.stopPropagation()
        const target = $('.dots-menu')
        target.on('click', function (e) {
            e.stopPropagation()
        })
        target.toggle()


        $(document).one('keydown', function (e) {

            if (e.code === 'Escape') {
                $('.dots-menu').hide()
                $('.hero-more').trigger('blur')
                $(document).off()
            }

        })
        $(document).one('click', function (e) {

            $('.dots-menu').hide()
            $(document).off()

        })
    })

    // lightbox options

    lightbox.option({
        'disableScrolling': true,
    })

    // добавление фотографии в список избранных
    $('.photo-btn-like').on('click', function () {

        const button = $(this);
        let action = 'add';
        if (button.hasClass('active')) action = 'rm';
        $.ajax({
            type: 'POST',
            url: '/photo/ajaxFavouritePhoto/',
            data: {
                'id': button.attr('data-id'),
                'action': action
            },
            success: function (msg) {
                if (msg == 'success') {
                    const count = parseInt($(".photo-likes-counter").text());
                    if (action == 'add') {
                        button.addClass('active');
                        $(".photo-likes-counter").text(count + 1);
                    } else {
                        button.removeClass('active');
                        $("#add_favourite_photo_toggle span").text(count - 1);
                    }
                } else {
                    popup.find('.insertion').html('Ошибка');
                    popup.find('.trigger').trigger('click');
                }
            },
            error: function (msg) {

                popup.find('.insertion').html('Ошибка');
                popup.find('.trigger').trigger('click');
                return false;
            }
        });
        return false;
    });






    /* ГОЛОСОВАНИЕ ЗА ФОТОГРАФИЮ*/

    $('.ratings-rate-btn').on('click', function (e) {
        e.preventDefault();

        if ($(this).parents('.disabled').length > 0) {
            return;
        }

        const button = $(this);
        const voteType = button.data('voteType');
        const photoId = button.data('photoId');


        $.ajax({
            type: 'POST',
            url: '/photo/ajaxRecommend',
            data: {
                'recommend': voteType,
                'id': photoId
            },
            success: function (data) {


                if (data.length == 0) {
                    $('.ratings').addClass('disabled');

                    const itemNode = button.parent('.ratings-category');
                    itemNode.addClass('choice');

                    const countNode = itemNode.find('.ratings-counter');
                    countNode.html(parseInt(countNode.text()) + 1);
                } else {
                    const msg = JSON.parse(data);
                    popup.find('.insertion').html(msg.error);
                    popup.find('.trigger').trigger('click')
                }

            },
            error: function (data) {
                // var popup = new PopUp();
                popup.find('.insertion').html('Произошла непредвиденная ошибка');
                popup.find('.trigger').trigger('click')
            }
        });
    })

    /* КОНЕЦ: ГОЛОСОВАНИЕ ЗА ФОТОГРАФИЮ*/



    /* ПОЖАЛОВАТЬСЯ НА ФОТО */

    $('.photo-btn-complain').on('click', function (e) {
        e.preventDefault();
        // берём ID фото из кнопки "добавить в избранное"
        const id = $('.photo-btn-like').attr('data-id')
        showTroubleTicketForm('Photo', id);
    });

    $('body').on('submit', '#troubleTicketForm', function (e) {
        $.ajax({
            type: 'POST',
            url: '/trouble_ticket/ajax_send_trouble_ticket/',
            data: $(this).serialize(),
            success: function (msg) {
                popup.find('.insertion').html(msg);
                popup.find('.trigger').trigger('click')

                function closeTimeout() {
                    const timer = setTimeout(function () {
                        $('.popup-close').trigger('click')
                    }, 3000)

                    $('.popup-close').one('click', function() {
                        clearTimeout(timer)
                    })
                }

                closeTimeout()
            },
            error: function (jqXHR) {
            
                popup.find('.insertion').html(jqXHR.responseText);
                popup.find('.trigger').trigger('click')
            }
        });
        e.preventDefault();
    });

    /* КОНЕЦ: ПОЖАЛОВАТЬСЯ НА ФОТО */






    /* КНОПКИ НАЗАД/ВПЕРЁД НА ФОТОГРАФИИ */
    function moveByPhotoStream(photoANode) {
        if ($('.photo-preview-nav').length > 0 && photoANode.length > 0) {
            document.location = photoANode.attr('href');
        }
    }

    const nextPhotoStreamANode = $('.photo-preview-nav .photo-preview.active').next('a,.photo-frame');
    if (nextPhotoStreamANode.length > 0) {
        $('.photo-btn-next').on('click', function (e) {
            e.preventDefault();
            moveByPhotoStream(nextPhotoStreamANode.hasClass('photo-frame') ? $('a', nextPhotoStreamANode) : nextPhotoStreamANode);
        })
        // $('.control-container.next').show();
    }

    const prevPhotoStreamANode = $('.photo-preview-nav .photo-preview.active').prev('a,.photo-frame');
    if (prevPhotoStreamANode.length > 0) {
        $('.photo-btn-prev').on('click', function (e) {
            e.preventDefault();
            moveByPhotoStream(prevPhotoStreamANode.hasClass('photo-frame') ? $('a', prevPhotoStreamANode) : prevPhotoStreamANode);
        })
        // $('.control-container.prev').show();
    }
    /* КОНЕЦ: КНОПКИ НАЗАД/ВПЕРЁД НА ФОТОРГРАФИИ*/



    // COMMENT FORM

    $('.comments').on('submit', '.comments-textfield', function (e) {
        e.preventDefault();

        // const parent = $(this).parents('.comment-block');
        const form = $(this);

        form.find(':submit').html('Отправка...').attr('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: "/photo/ajaxPhotoComment/",
            dataType: "text json",
            data: form.serialize(),
            complete: function (jqxhr) {
                if (jqxhr.responseJSON.error === undefined) {
                    window.location.hash = '#comment_' + jqxhr.responseJSON.id;
                    location.reload();
                } else {
                    popup.find('.insertion').html('Произошла ошибка. Перезагрузите страницу.');
                    popup.find('.trigger').trigger('click');
                }
            },
            error: function () {
                popup.find('.insertion').html('Произошла ошибка. Перезагрузите страницу.');
                popup.find('.trigger').trigger('click');
            }
        });

        return false;
    });

    $('.hero-subscribe').on('click', function () {
        var actionType = $(this).hasClass('subscribed') ? 'delete' : 'add';
        $.ajax({
            type: 'POST',
            url: '/member/addDeleteFavoriteAuthor',
            data: {
                type: actionType,
                id: $(this).data('memberId')
            },
            dataType: 'json',
            success: function (data) {
                if (typeof data.type == 'string' && data.type == 'ok') {
                    $('.hero-subscribe').each(function () {
                        // var countSubscribers=parseInt($(this).children('.count').text());
                        if (actionType == 'add') {
                            // countSubscribers++;
                            $(this).text('ОТПИСАТЬСЯ');
                            $(this).addClass('subscribed');
                            $(this).filter('.green').addClass('white').removeClass('green');
                        } else {
                            // countSubscribers--;
                            $(this).children('.caption').text('ПОДПИСАТЬСЯ');
                            $(this).removeClass('subscribed');
                            $(this).filter('.white').addClass('green').removeClass('white');
                        }
                        // $(this).children('.count').text(countSubscribers);
                    });
                } else {
                    popup.find('.insertion').html(`Сообщение: ${data.text}`);
                    popup.find('.trigger').trigger('click');
                    // var popup = new PopUp();
                    // popup.setContent('<h3></h3>' + data.text);
                    // popup.open();
                }
            },
            error: function (jqXHR, textStatus) {
                if (textStatus != 'parsererror' || jqXHR.responseText != '') {
                    // var popup = new PopUp();
                    popup.find('.insertion').html(`Ошибка: ${textStatus}<br>${jqXHR.responseText}`);
                    popup.find('.trigger').trigger('click');
                    // popup.setContent('<h3></h3>' + textStatus + '<br>' + jqXHR.responseText);
                    // popup.open();
                }
            },
        });

    });




    $('.post-reply').on('click', function (e) {
        e.preventDefault();

        $('.post-reply').show()
        $('.post .comments-textfield').remove();
        $('.post-container').removeClass('active')

        const formTemplate = $('.comments-textfield').clone().attr('id', 'yw1');
        const commentBlock = $(this).parents('.post-container');

        $('#PhotoComment_parent_id', formTemplate).val(commentBlock.closest('post').data('commentId'));
        commentBlock.after(formTemplate)


        commentBlock.next('.comments-textfield').find('textarea').trigger('focus');
        commentBlock.addClass('active')
        $(this).hide()
    });


    $('.post-delete').on('click', function (e) {
        e.preventDefault();

        const commentBlock = $(this).parents('.post-container');
        const comment_id = commentBlock.closest('.post').data('commentId');
        commentBlock.addClass('disabled');

        $.ajax({
            type: 'POST',
            url: '/photo/ajaxDeletePhotoComment/',
            data: {
                'id': comment_id
            },
            success: function (msg) {
                if (msg == 'success') {
                    commentBlock.fadeOut('slow', function () {
                        commentBlock.remove();
                    });
                } else {
                    popup.find('.insertion').html('Произошла ошибка. Перезагрузите страницу.');
                    popup.find('.trigger').trigger('click');
                }
            },
            error: function () {
                popup.find('.insertion').html('Произошла ошибка. Перезагрузите страницу.');
                popup.find('.trigger').trigger('click');
            }
        });
    })

    $('.post-complain').on('click', function (e) {
        e.preventDefault();
        showTroubleTicketForm('PhotoComment', $(this).data('commentId'));
    })


    /* КОД ДЛЯ ВСТАВКИ*/

    // $('#img_code_button_new').click(function (e) {
    //     e.preventDefault();
    //     var popup = new PopUp();
    //     popup.setContent('<p>Код для вставки в блог</p>');
    //     popup.open();
    // });

    /* КОНЕЦ: КОД ДЛЯ ВСТАВКИ*/








    /* КОММЕНТИРОВАТЬ ОБЛАСТЬ НА ФОТОГРАФИИ */

    // var commentBlockWithCrop;

    // $('body').on('click', '.comment-photo-part', function (e) {
    //     e.preventDefault();

    //     commentBlockWithCrop = $(this).closest('.comment');
    //     window.cropAndScrollTo = commentBlockWithCrop;

    //     $("html, body").animate({
    //         scrollTop: $('.photo-content').offset().top
    //     }, 400);

    //     initJcrop('comment', true);
    // });

    // // вывести параметр кропа в комментарии
    // $('body').on('click', '.add-crop-to-comment', function (e) {

    //     var bigPhoto = $('#big_photo');
    //     var bounds = jcrop_api.tellSelect();
    //     var img_width = bigPhoto.width();
    //     var img_height = bigPhoto.height();
    //     var output = '<!--CROP(' + bounds.x + ',' + bounds.y + ',' + (img_width - bounds.x2) + ',' + (img_height - bounds.y2) + ')-->';

    //     var textarea = commentBlockWithCrop.find('textarea');
    //     textarea.val(textarea.val() + output);

    //     $('.crop-destroy').trigger('click');
    // });

    /* КОНЕЦ: КОММЕНТИРОВАТЬ ОБЛАСТЬ НА ФОТОГРАФИИ */





    /* СЕТКА */

    // $('#show-grid-button').click(function (e) {
    //     e.preventDefault();
    //     initJcrop('goldenSection', false);
    // });

    /* КОНЕЦ: СЕТКА*/






    /* ПОКАЗАТЬ КРОП НА ФОТОГРАФИИ*/

    // Запомнить, куда вернуться после закрытия кропа

    // $('body').on('click', '.showCropButton', function (e) {
    //     if ($(this).closest('.comment').length > 0) {
    //         window.cropAndScrollTo = $(this).closest('.comment');
    //     } else {
    //         window.cropAndScrollTo = $(this);
    //     }
    // })

    // Показать crop на фото
    // function SetCrop(x, y, x2, y2) {
    //     $("html, body").animate({
    //         scrollTop: $('.photo-content').offset().top
    //     }, 400);

    //     initJcrop('from_comment', false);

    //     var img_width = $('#big_photo').width();
    //     var img_height = $('#big_photo').height();

    //     jcrop_api.setSelect([x, y, img_width - x2, img_height - y2]);
    //     jcrop_api.animateTo([x, y, img_width - x2, img_height - y2]);
    // }

    // $(document).ready(function () {
    //     var match = window.location.hash.match(/^#crop\(([0-9]{1,4}),([0-9]{1,4}),([0-9]{1,4}),([0-9]{1,4})\)$/i);
    //     if (match) {
    //         SetCrop(match[1], match[2], match[3], match[4]);
    //     }
    // });

    /* КОЕКЦ: ПОКАЗАТЬ КРОП НА ФОТОГРАФИИ*/


    /* ВЫВОД jCrop НА ФОТО */

    // let jcrop_api;
    // $('body').on('click', '.crop-destroy', function () {
    //     jcrop_api.destroy();
    //     $('#big_photo').parent(".photo-content").removeClass('nohover');

    //     //Если установлена глобальная переменная, которая показывает, куда проскролить после закрытия кропа
    //     if (typeof cropAndScrollTo !== 'undefined' && cropAndScrollTo.length > 0) {
    //         $("html, body").animate({
    //             scrollTop: cropAndScrollTo.offset().top
    //         }, 400);

    //         delete window.cropAndScrollTo;
    //     }
    // }); 

    // function initJcrop(type, showCrop) {
    //     var showCropOnImage = showCrop !== false;

    //     if (jcrop_api) {
    //         jcrop_api.destroy();
    //         jcrop_api = null;
    //         $('#big_photo').parent(".photo-content").removeClass('nohover');
    //     }

    //     var params = {
    //         minSize: [w = 120, h = 120]
    //     };

    //     var image = $('#big_photo');
    //     var image_width = image.width();
    //     var image_height = image.height();

    //     $('#big_photo').Jcrop(params, function () {
    //         jcrop_api = this;

    //         var pattern_yes = '<a class="send-to-preview crop-button"><i class="icon icon-ok"></i></span>';
    //         var pattern_no = '<a class="crop-destroy crop-button" id="pattern_no"><i class="icon icon-cancel" id="pattern_no"></i></a>';
    //         var pattern_yes_comment = '<a class="add-crop-to-comment crop-button"><i class="icon icon-ok"></i></span>';

    //         // для комментариев
    //         if (type == 'comment' || type == 'from_comment') {
    //             if (showCropOnImage) {
    //                 var animate = new Array();
    //                 animate.left_width = image_width / 2 - 150;
    //                 animate.left_height = image_height / 2 - 150;
    //                 animate.right_width = image_width / 2 + 150;
    //                 animate.right_height = image_height / 2 + 150;

    //                 jcrop_api.setSelect([0, 0, image_width, image_height]);
    //                 jcrop_api.animateTo([animate.left_width, animate.left_height, animate.right_width, animate.right_height]);
    //             }


    //             var patternButtons = '';
    //             if (type == 'from_comment')
    //                 patternButtons = pattern_no;
    //             else
    //                 patternButtons = pattern_yes_comment + pattern_no;

    //             $(".jcrop-hline:first").html("<div style='position:relative;float:right;z-index:900;'>" + patternButtons + "</div>").css('opacity', '1');
    //         }
    //         // сетка
    //         else if (type == 'goldenSection') {
    //             $('.jcrop-vline, .jcrop-hline').hide();
    //             $('#big_photo').parent(".photo-content").addClass('nohover');
    //             var HTML =
    //                 '<table class="goldenSection">' +
    //                 '<tr><td width="38%" height="38%"><div style="opacity: 0.1; height: 100%; width: 100%"></div></td><td width="24%"></td><td width="38%"></td></tr>' +
    //                 '<tr><td height="24%"></td><td></td><td></td></tr>' +
    //                 '<tr><td height="38%"></td><td></td><td></td></tr>' +
    //                 '</table>';

    //             $(".jcrop-hline:first").show().html("<div style='position:relative;float:right;z-index:900;'>" + pattern_no + "</div>").css('opacity', '1');
    //             $('.jcrop-tracker:first').css({
    //                 opacity: 1,
    //                 background: 'none'
    //             }).append(HTML);

    //             jcrop_api.setSelect([0, 0, image_width, image_height]);
    //             jcrop_api.animateTo([0, 0, image_width, image_height]);
    //         }
    //     });
    // }

    /* КОНЕЦ: ВЫВОД jCrop НА ФОТО */





    // ===================================
})