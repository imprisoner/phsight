// // import $ from 'jquery'
//  import './libs/jquery.justifiedGallery'

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

    initSlider(680)
    initNavTabs('.tab-link')


    // popup

    const popup = $('.popup-menu')
    togglePopup('trigger', 'popup')

    // setting pagination

    initPagination(680)

    // setting JustifiedGallery plugin
    if ($('.justified-gallery').length > 0) {
        console.log('JG here')
        $('.justified-gallery').justifiedGallery({
            rowHeight: 310,
            margins: 2,
            lastRow: 'justify',
            randomize: true
        })

    }

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

    // РЕДАКТИРОВАНИЕ СТАТУСА

    // $('.user-info-status-text').on('click', function(){
	// 		if($(this).children('input').length == 0){
	// 			var statusText=$(this);
	// 			var text = $(this).text();
	// 			if(text == 'Кликните, чтобы изменить статус')
	// 				text = '';
	// 			var statusInput=$('<input>')
	// 				.attr('type', 'text')
	// 				.attr('maxlength', 250)
	// 				.val(text);
	// 			$(this).html(statusInput);
	// 			$(this).append('<br>Нажмите Enter чтобы сохранить статус');
	// 			statusInput.focus();
	// 			statusInput.on('keydown', function(e){
	// 				if(e.code == 'Enter'){
	// 					$.ajax({
	// 						type: 'POST',
	// 						url: '/member/ajax/updateStatus/',
	// 						data: {'status': $(this).val()},
	// 						success: function(msg){
	// 							if(msg == '') msg = 'Кликните, чтобы изменить статус';
	// 							statusText.html(msg + '<span class="icon icon-edit-status"></span>');
	// 						}
	// 					});
	// 				}
	// 			});
	// 		}
	// 	})

    // КОНЕЦ РЕДАКТИРОВАНИЕ СТАТУСА
})