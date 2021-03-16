import $ from 'jquery'

$(document).on('DOMContentLoaded', function (e) {
    
    $('.post-container').on('click', function (e) {
        e.stopPropagation()
        const target = $(this)
        target.toggleClass('post-active')
        console.log('Up here!')
        // TODO toggle active class on outer clicks

    })
})