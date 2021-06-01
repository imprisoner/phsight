import {
    initPagination,
    selectize
} from './utils'
import './main'

$(function () {

    initPagination(480)
    // portfolio images equalizer

    $('.applicant-portfolio img').each(function (i) {
        const image = $(this)
        const wrapper = image.closest('.img')
        if (image.width() < image.height()) {
            wrapper.css('align-items', 'unset')
        }

        if (image.width() > image.height()) {
            wrapper
                .css('align-items', 'flex-start')
                .css('flex-grow', '2 ')
        }
    })

    // selects

    const selects = $('.selection')
    selectize(selects)
    //  show/hide filters

    $('.show-filters').on('click', function (e) {
        $(this).toggleClass('active')
        $('.content-filters').slideToggle()
    })

    $('.jobs-sort .filters .select').on('click', function (e) {

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
})