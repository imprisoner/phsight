import $ from 'jquery'
import './libs/jquery.justifiedGallery'
import {
    initSlider,
    initNavTabs,
    initPagination,
    togglePopup,
    expandSearch,
} from './utils'

$(document).on('DOMContentLoaded', function () {

    // setting slider and navtabs animation

    initSlider(680)
    initNavTabs('.tab-link')

    // setting pagination

    initPagination(680)

    // setting JustifiedGallery plugin

    $('.justified-gallery').justifiedGallery({
        rowHeight: 310,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })

    //header animations

    expandSearch('header')
    initNavTabs('.header-navlink')

    // popups

    togglePopup('header-menu-btn', 'burger')
    if(window.innerWidth < 1279) togglePopup('header-user-logged', 'user')
    expandSearch('burger')
    // init small nav

    const smallTabs = $('.favorites-navlink')
    smallTabs.each(function () {
        $(this).on('click', function (e) {
            smallTabs.removeClass('active')
            $(this).addClass('active')
        })
    })

    // desktop user menu hover appearance
    if (window.innerWidth > 1279) {
        $('.header-user-avatar').on('mouseenter', function () {
            $('.user-menu').show(200)
            $('.user-menu').on('mouseleave', function () {
                $(this).hide(200)
            })
        })
    }

    // more-btn
    // togglePopup('nav-more', 'dots')
    $('.nav-more').on('click', function(e) {
        
        e.stopPropagation()
        const target = $('.dots-menu')
        target.on('click', function(e) {
            e.stopPropagation()
        })
        target.toggle()


        $(document).one('keydown', function (e) {

            if (e.code === 'Escape') {
                $('.dots-menu').hide()
                $('.nav-more').trigger('blur')
                $(document).off()
            }
            
        })
        $(document).one('click', function (e) {

                $('.dots-menu').hide()
                $(document).off()
           
        })
    })

    // AJAX

    // $('.complain-member-button').on('click', function(){
    //     showTroubleTicketForm('Member', 460877);
    // });

    // $('.ignore-member-button').on('click', function(){
    //     $.ajax({
    //         type: 'POST',
    //         url: '/member/ajaxAddToIgnored/',
    //         data: {'id' : 460877},
    //         success: function(msg){
    //             if(msg == 'success'){
    //                 msg = 'Автор добавлен в черный список';
    //             }
    //             var popup=new PopUp({autoCloseTimeout: 3000, closeOnClick: true});
    //             popup.setContent('<h3>Внимание</h3>' + msg);
    //             popup.open();
    //         }
    //     });
    // });

    // $('.block-member-button').on('click', function(){
    //     $.ajax({
    //         type: 'POST',
    //         url: '/moderator/ajaxBlockMember',
    //         data: {'target_id' : 460877},
    //         success: function(msg){
    //             if(msg == 'error'){
    //                 msg = 'Ошибка! Повторите позже.';
    //             }
    //             var popup=new PopUp();
    //             popup.setContent('<h3>Блокирование пользователя</h3>' + msg);
    //             popup.open();
    //         }
    //     });
    // });

    // $('body').delegate('#block_form', 'submit', function(){
    //     var $this = $(this);
    //     $.ajax({
    //         type: "POST",
    //         url: "/moderator/ajaxBlockMember",
    //         data: $this.serialize()
    //     })
    //         .done(function( msg ) {
    //             var popup=new PopUp();
    //             popup.setContent('<h3>Внимание</h3>' + msg);
    //             popup.open();
    //             setTimeout(function(){location.reload();}, 1500);
    //         });

    //     return false;
    // });
})