import $ from 'jquery'
import {
    expandSearch,
    togglePopup,
    initNavTabs,
    initSlider,
    selectize,
} from './utils'


const social = $('.contacts-select .select')
disableUsedOptions()

// header animations

expandSearch('header')
initNavTabs('.header-navlink')

// slider & nav-tabs

initSlider(768)
initNavTabs('.tab-link')

// popup listeners
togglePopup('header-menu-btn', 'burger')
if(window.innerWidth < 1279) togglePopup('header-user-logged', 'user')
expandSearch('burger')
// desktop user menu hover appearance
if (window.innerWidth > 1279) {
    $('.header-user-avatar').on('mouseenter', function () {
        $('.user-menu').show(200)
        $('.user-menu').on('mouseleave', function () {
            $(this).hide(200)
        })
    })
}

// select inputs
const selects = $('.selection')
selectize(selects)

// GENERAL

// input name grabber (for contacts)

social.each(function (i) {
    $(this)
        .on('click', function (e) {

            const target = $(e.target)

            if (target.hasClass('option')) {

                const name = $(this)
                    .find('span')[0].innerHTML.toLowerCase()

                const input = $(this)
                    .closest('div')
                    .next('div')
                    .find('.link')

                input.prop('name', name)

                // $(e.target).removeClass('option').addClass('disabled')
                disableUsedOptions()
            }
        })
})


// adding new contacts fields

$('.contacts-add-contact').on('click', function (e) {
    e.stopPropagation()
    e.preventDefault()
    const field = `
    <div class="contacts-item">
        <div class="contacts-select">
            <label class="select"><span></span>
                <input class="selection" type="text">
                <div class="datalist">
                    <div class="option" data-value="">Behance</div>
                    <div class="option" data-value="">Twitter</div>
                    <div class="option" data-value="">Telegram</div>
                    <div class="option" data-value="">500px</div>
                    <div class="option" data-value="">Flickr</div>
                    <div class="option" data-value="">Facebook</div>
                </div>
            </label>
        </div>
        <div class="contacts-textfield">
            <input class="link" type="text" name="">
            <div class="contacts-delete"><i class="fas fa-times"></i></div>
        </div>
    </div>
    `
    $('.contacts-fields').append(field)

    const newItem = $('.contacts-item:last-child .select')
    const newField = $('.contacts-item:last-child .selection')

    social.push(newItem)
    selects.push(newField)
    selectize(newField)
    disableUsedOptions()

    $('.contacts-item:last-child .select')
        .on('click', function (e) {

            const name = $(this)
                .find('span')[0].innerHTML.toLowerCase()

            const input = $(this)
                .closest('div')
                .next('div')
                .find('.link')

            input.prop('name', name)


        })

})

// calculating possible options of contacts adding
function disableUsedOptions() {

    // put used values in array

    const used = []

    $('.contacts-fields span')
        .each(function (i) {

            if (this.innerText) used.push(this.innerText)

        })

    // disable each option that matches the 'used' value

    social.each(function (i) {

        const options = $(this).find('.datalist').children()
        options.each(function (i) {
            $(this).removeClass('disabled').addClass('option')
        })
        options.each(function (i) {
            const option = this

            for (let i = 0; i < used.length; i++) {

                if (option.innerHTML === used[i])
                    $(option).removeClass('option').addClass('disabled')



            }

        })

    })
}


// password eye toggle
if ($('.password-fields')) {

    const fields = $('.password-fields').find('label')

    fields.each(function (i) {

        const field = $(this)
        const eye = $(this).find('span')
        const input = field.find('input')

        eye.on('click', function () {

            $(this).toggleClass('fa-eye fa-eye-slash')


            console.log(input)
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });

    })


}

// devices

// AJAX delete device from list

$('.delete-button').on('click', function () {
    const item = $(this).parent();
    const id = item.data('id');
    console.log('data-id', id)
    $.getJSON('/my/deletePhotoAccessory', {id: id}, function (data) {
        if (data.result == 'success') {
            item.remove();
        }
    });
});

togglePopup('camera-popup', 'add-camera')
togglePopup('lens-popup', 'add-lens')

// add-camera
$('#camera_brand').on('change', function(e) {
    if($(this).val() !== -1) {
        $('.add-camera-button').removeClass('disabled')
    }
})
$('.add-camera-button').on('click', function(e) {

    if($(this).hasClass('disabled')) {
        e.preventDefault()
        e.stopPropagation()
    }

})

//  add-lens
$('#lens_brand').on('change', function(e) {
    if($(this).val() !== -1) {
        $('.add-lens-button').removeClass('disabled')
    }
})
$('.add-lens-button').on('click', function(e) {

    if($(this).hasClass('disabled')) {
        e.preventDefault()
        e.stopPropagation()
    }

})



// services

togglePopup('album-popup', 'add-album')


// if($('.services')) {
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
// }