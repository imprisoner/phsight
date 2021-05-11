import './main'

// auto-expanding textarea
const initialHeight = $('textarea').height() + 'px'
console.log(initialHeight)
$('textarea').on('input', function (e) {

    const currentHeight = e.target.scrollHeight + 'px'
    
    $(this).css('height', currentHeight)
    if (!$(this).val()) {
        $(this).height(initialHeight)
    }
})