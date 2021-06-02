import {
    initSlider,
    initPagination,
    initNavTabs,
    showTroubleTicketForm,
    togglePopup
} from './utils'

import './main'

$(function () {

    // setting slider and navtabs animation

    initSlider($('.tab-link').length === 7 ? 780 : 680)
    initNavTabs('.tab-link')

    // popup

    const popup = $('.popup-menu')
    togglePopup('trigger', 'popup')

    // setting pagination

    initPagination(680)

    

    // init small nav

    const smallTabs = $('.favorites-navlink')
    smallTabs.each(function () {
        $(this).on('click', function (e) {
            smallTabs.removeClass('active')
            $(this).addClass('active')
        })
    })


    // more-btn

    $('.nav-more').on('click', function (e) {

        e.stopPropagation()
        const target = $('.dots-menu')
        target.on('click', function (e) {
            e.stopPropagation()
        })
        target.toggle()
        $(this).toggleClass('active')

        $(document).one('keydown', function (e) {

            if (e.code === 'Escape') {
                $('.dots-menu').hide()
                $('.nav-more').removeClass('active')
                $(document).off()
            }

        })
        $(document).one('click', function (e) {
            $('.nav-more').removeClass('active')
            $('.dots-menu').hide()
            $(document).off()

        })
    })

    // section info on mobile

    let slider

    $('.nav-info').on('click', function (e) {
        e.stopPropagation()
        e.preventDefault()

        if (!$('.nav-info').hasClass('active')) {

            $(this).addClass('active')
            $('.info').slideDown()

            slider = initSlider(1279, true, '.info-container')

            $(document).one('keydown', function (e) {

                if (e.code === 'Escape') {
                    $('.info').slideUp()
                    $('.nav-info').removeClass('active')
                    $(document).off()
                    slider.destroy()
                }

            })

        } else {

            $('.info').slideUp()
            $(document).off()
            $(this).removeClass('active')

            slider.destroy()
        }
    })


    // AJAX
    const targetId = $('.nav-subscribe').data('member-id')

    // ПОЖАЛОВАТЬСЯ НА ФОТО

    $('.complain').on('click', function () {
        showTroubleTicketForm('Member', targetId);
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

                    $('.popup-close').one('click', function () {
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
    // КОНЕЦ ПОЖАЛОВАТЬСЯ НА ФОТО

    // ЧЁРНЫЙ СПИСОК 

    $('.ignore').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/member/ajaxAddToIgnored/',
            data: {
                'id': targetId
            },
            success: function (msg) {
                if (msg == 'success') {
                    msg = 'Автор добавлен в черный список';
                }
                popup.find('.insertion').html('<h3>Внимание</h3>' + msg);
                popup.find('.trigger').trigger('click');
            }
        });
    });


    // КОНЕЦ ЧЁРНЫЙ СПИСОК


    // МОЙ ПРОФИЛЬ МЕНЮ ФОТОГРАФИИ

    $(window).on('load resize', function (e) {
        e.stopPropagation()
        if (this.innerWidth < 1280) {
            $('.my-photo').off('click.popup')
            $('.my-photo').on('click.popup', function (e) {
                e.preventDefault()

                const overlay = $('.overlay')
                const caption = $(this).find('.jg-caption').clone()

                overlay.addClass('active')
                $('body').css('overflow-y', 'hidden')

                overlay.append(caption.css('display', 'flex'))

                caption.find('.my-photo-close').on('click', function (e) {
                    overlay.find('.jg-caption').remove()
                    overlay.removeClass('active')
                    $('body').css('overflow-y', '')
                    $(this).off()
                })

            })
        }
        if (this.innerWidth >= 1280) {
            $('.my-photo').off('click.popup')
        }
    })

    togglePopup('album-popup', 'add-album')

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


    $('.select').on('click', function (e) {

        e.stopPropagation()

        const select = $(this)
        const datalist = select.find('.datalist')
        const span = select.find('span')
        const option = datalist.find('.option')

        datalist.show()

        option.on('click', function (e) {
            e.stopPropagation()
            span.text($(this).text())
            datalist.hide()
            option.off()
            $(document).off()
        })

        $(document).on('click', function () {
            datalist.hide()
            option.off()
            $(document).off()
        })

    })

    // УБРАТЬ АВТОРА ИЗ ИЗБРАННЫХ    
    $(function () {

        // подтверждение
        $('body').on('click', '.author-delete', function () {
            $.ajax({
                type: 'POST',
                url: '/member/addDeleteFavoriteAuthor/',
                data: { type: 'delete', id: $(this).data('favoriteId') },
                dataType: 'json',
                success: function (data) {
                    if (typeof data.type == 'string' && data.type == 'ok') {
                        location.reload();
                    } else {
                        popup.find('.insertion').html('<h3>Сообщение</h3>' + data.text);
                        popup.find('.trigger').trigger('click');
                    }
                },
                error: function (jqXHR, textStatus) {
                    popup.find('.insertion').html('<h3>Ошибка</h3>' + textStatus + '<br>' + jqXHR.responseText);
                    popup.find('.trigger').trigger('click');
                },
            });
        });
    });
    // КОНЕЦ УБРАТЬ АВТОРА ИЗ ИЗБРАННЫХ    
})

togglePopup('edit-album-popup', 'edit-album')

