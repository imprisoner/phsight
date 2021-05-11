/**
 * jQuery Fileinput Plugin v3.0.0
 *
 * Copyright 2013, Hannu Leinonen <hleinone@gmail.com>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * rewrited by Hunter in 2021
 */
// import $ from 'jquery'

(function (e) {
    e.fn.fileinput = function (t) {
        var i = this,
            n = '<button class="fileinput">выберите файл или перетяните его в эту область</button>';
        return t && (n = t instanceof $ ? e(t).wrap("<div />").parent().html() : t), i.each(function () {
            var t = e(this);
            t.wrap('<div class="fileinput-wrapper" style="overflow:hidden; position: relative; display: inline-block;" />'), t.parent().mousemove(function (t) {
                var i, n = e(this), offT;
                i = n.offset().left, offT = n.offset().top, n.find("input").css({
                    left: t.pageX - i - n.find("input[type=file]").width() + 30,
                    top: t.pageY - offT - 10
                })
            }), t.attr("tabindex", "-1").css({
                filter: "alpha(opacity=0)",
                "-moz-opacity": 0,
                opacity: 0,
                position: "absolute",
                "z-index": -1
            }), t.before(n), t.prev().addClass("fileinput"), (t.prev(".fileinput").on('click', function () {
                t.trigger('click')
            }), t.prev(":submit.fileinput").on('click', function (e) {
                e.preventDefault()
            }))

        }), i
    }
})($);