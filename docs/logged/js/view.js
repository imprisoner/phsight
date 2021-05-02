/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/view.less":
/*!**************************!*\
  !*** ./styles/view.less ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./js/libs/jquery.Jcrop.js":
/*!*********************************!*\
  !*** ./js/libs/jquery.Jcrop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * jquery.Jcrop.js v0.9.15
 * jQuery Image Cropping Plugin - released under MIT License 
 * Author: Kelly Hallman <khallman@gmail.com>
 * http://github.com/tapmodo/Jcrop
 * Copyright (c) 2008-2018 Tapmodo Interactive LLC {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * }}}
 */

(function ($) {

  $.Jcrop = function (obj, opt) {
    var options = $.extend({}, $.Jcrop.defaults),
        docOffset,
        _ua = navigator.userAgent.toLowerCase(),
        is_msie = /msie/.test(_ua),
        ie6mode = /msie [1-6]\./.test(_ua);

    // Internal Methods {{{
    function px(n) {
      return Math.round(n) + 'px';
    }
    function cssClass(cl) {
      return options.baseClass + '-' + cl;
    }
    function supportsColorFade() {
      return $.fx.step.hasOwnProperty('backgroundColor');
    }
    function getPos(obj) //{{{
    {
      var pos = $(obj).offset();
      return [pos.left, pos.top];
    }
    //}}}
    function mouseAbs(e) //{{{
    {
      return [(e.pageX - docOffset[0]), (e.pageY - docOffset[1])];
    }
    //}}}
    function setOptions(opt) //{{{
    {
      if (typeof(opt) !== 'object') opt = {};
      options = $.extend(options, opt);

      $.each(['onChange','onSelect','onRelease','onDblClick'],function(i,e) {
        if (typeof(options[e]) !== 'function') options[e] = function () {};
      });
    }
    //}}}
    function startDragMode(mode, pos, touch) //{{{
    {
      docOffset = getPos($img);
      Tracker.setCursor(mode === 'move' ? mode : mode + '-resize');

      if (mode === 'move') {
        return Tracker.activateHandlers(createMover(pos), doneSelect, touch);
      }

      var fc = Coords.getFixed();
      var opp = oppLockCorner(mode);
      var opc = Coords.getCorner(oppLockCorner(opp));

      Coords.setPressed(Coords.getCorner(opp));
      Coords.setCurrent(opc);

      Tracker.activateHandlers(dragmodeHandler(mode, fc), doneSelect, touch);
    }
    //}}}
    function dragmodeHandler(mode, f) //{{{
    {
      return function (pos) {
        if (!options.aspectRatio) {
          switch (mode) {
          case 'e':
            pos[1] = f.y2;
            break;
          case 'w':
            pos[1] = f.y2;
            break;
          case 'n':
            pos[0] = f.x2;
            break;
          case 's':
            pos[0] = f.x2;
            break;
          }
        } else {
          switch (mode) {
          case 'e':
            pos[1] = f.y + 1;
            break;
          case 'w':
            pos[1] = f.y + 1;
            break;
          case 'n':
            pos[0] = f.x + 1;
            break;
          case 's':
            pos[0] = f.x + 1;
            break;
          }
        }
        Coords.setCurrent(pos);
        Selection.update();
      };
    }
    //}}}
    function createMover(pos) //{{{
    {
      var lloc = pos;
      KeyManager.watchKeys();

      return function (pos) {
        Coords.moveOffset([pos[0] - lloc[0], pos[1] - lloc[1]]);
        lloc = pos;

        Selection.update();
      };
    }
    //}}}
    function oppLockCorner(ord) //{{{
    {
      switch (ord) {
      case 'n':
        return 'sw';
      case 's':
        return 'nw';
      case 'e':
        return 'nw';
      case 'w':
        return 'ne';
      case 'ne':
        return 'sw';
      case 'nw':
        return 'se';
      case 'se':
        return 'nw';
      case 'sw':
        return 'ne';
      }
    }
    //}}}
    function createDragger(ord) //{{{
    {
      return function (e) {
        if (options.disabled) {
          return false;
        }
        if ((ord === 'move') && !options.allowMove) {
          return false;
        }
        
        // Fix position of crop area when dragged the very first time.
        // Necessary when crop image is in a hidden element when page is loaded.
        docOffset = getPos($img);

        btndown = true;
        startDragMode(ord, mouseAbs(e));
        e.stopPropagation();
        e.preventDefault();
        return false;
      };
    }
    //}}}
    function presize($obj, w, h) //{{{
    {
      var nw = $obj.width(),
          nh = $obj.height();
      if ((nw > w) && w > 0) {
        nw = w;
        nh = (w / $obj.width()) * $obj.height();
      }
      if ((nh > h) && h > 0) {
        nh = h;
        nw = (h / $obj.height()) * $obj.width();
      }
      xscale = $obj.width() / nw;
      yscale = $obj.height() / nh;
      $obj.width(nw).height(nh);
    }
    //}}}
    function unscale(c) //{{{
    {
      return {
        x: c.x * xscale,
        y: c.y * yscale,
        x2: c.x2 * xscale,
        y2: c.y2 * yscale,
        w: c.w * xscale,
        h: c.h * yscale
      };
    }
    //}}}
    function doneSelect(pos) //{{{
    {
      var c = Coords.getFixed();
      if ((c.w > options.minSelect[0]) && (c.h > options.minSelect[1])) {
        Selection.enableHandles();
        Selection.done();
      } else {
        Selection.release();
      }
      Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
    }
    //}}}
    function newSelection(e) //{{{
    {
      if (options.disabled) {
        return;
      }
      if (!options.allowSelect) {
        return;
      }
      btndown = true;
      docOffset = getPos($img);
      Selection.disableHandles();
      Tracker.setCursor('crosshair');
      var pos = mouseAbs(e);
      Coords.setPressed(pos);
      Selection.update();
      Tracker.activateHandlers(selectDrag, doneSelect, e.type.substring(0,5)==='touch');
      KeyManager.watchKeys();

      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    //}}}
    function selectDrag(pos) //{{{
    {
      Coords.setCurrent(pos);
      Selection.update();
    }
    //}}}
    function newTracker() //{{{
    {
      var trk = $('<div></div>').addClass(cssClass('tracker'));
      if (is_msie) {
        trk.css({
          opacity: 0,
          backgroundColor: 'white'
        });
      }
      return trk;
    }
    //}}}

    // }}}
    // Initialization {{{
    // Sanitize some options {{{
    if (typeof(obj) !== 'object') {
      obj = $(obj)[0];
    }
    if (typeof(opt) !== 'object') {
      opt = {};
    }
    // }}}
    setOptions(opt);
    // Initialize some jQuery objects {{{
    // The values are SET on the image(s) for the interface
    // If the original image has any of these set, they will be reset
    // However, if you destroy() the Jcrop instance the original image's
    // character in the DOM will be as you left it.
    var img_css = {
      border: 'none',
      visibility: 'visible',
      margin: 0,
      padding: 0,
      position: 'absolute',
      top: 0,
      left: 0
    };

    var $origimg = $(obj),
      img_mode = true;

    if (obj.tagName == 'IMG') {
      // Fix size of crop image.
      // Necessary when crop image is within a hidden element when page is loaded.
      if ($origimg[0].width != 0 && $origimg[0].height != 0) {
        // Obtain dimensions from contained img element.
        $origimg.width($origimg[0].width);
        $origimg.height($origimg[0].height);
      } else {
        // Obtain dimensions from temporary image in case the original is not loaded yet (e.g. IE 7.0). 
        var tempImage = new Image();
        tempImage.src = $origimg[0].src;
        $origimg.width(tempImage.width);
        $origimg.height(tempImage.height);
      } 

      var $img = $origimg.clone().removeAttr('id').css(img_css).show();

      $img.width($origimg.width());
      $img.height($origimg.height());
      $origimg.after($img).hide();

    } else {
      $img = $origimg.css(img_css).show();
      img_mode = false;
      if (options.shade === null) { options.shade = true; }
    }

    presize($img, options.boxWidth, options.boxHeight);

    var boundx = $img.width(),
        boundy = $img.height(),
        
        
        $div = $('<div />').width(boundx).height(boundy).addClass(cssClass('holder')).css({
        position: 'relative',
        backgroundColor: options.bgColor
      }).insertAfter($origimg).append($img);

    if (options.addClass) {
      $div.addClass(options.addClass);
    }

    var $img2 = $('<div />'),

        $img_holder = $('<div />') 
        .width('100%').height('100%').css({
          zIndex: 310,
          position: 'absolute',
          overflow: 'hidden'
        }),

        $hdl_holder = $('<div />') 
        .width('100%').height('100%').css('zIndex', 320), 

        $sel = $('<div />') 
        .css({
          position: 'absolute',
          zIndex: 600
        }).dblclick(function(){
          var c = Coords.getFixed();
          options.onDblClick.call(api,c);
        }).insertBefore($img).append($img_holder, $hdl_holder); 

    if (img_mode) {

      $img2 = $('<img />')
          .attr('src', $img.attr('src')).css(img_css).width(boundx).height(boundy),

      $img_holder.append($img2);

    }

    if (ie6mode) {
      $sel.css({
        overflowY: 'hidden'
      });
    }

    var bound = options.boundary;
    var $trk = newTracker().width(boundx + (bound * 2)).height(boundy + (bound * 2)).css({
      position: 'absolute',
      top: px(-bound),
      left: px(-bound),
      zIndex: 290
    }).mousedown(newSelection);

    /* }}} */
    // Set more variables {{{
    var bgcolor = options.bgColor,
        bgopacity = options.bgOpacity,
        xlimit, ylimit, xmin, ymin, xscale, yscale, enabled = true,
        btndown, animating, shift_down;

    docOffset = getPos($img);
    // }}}
    // }}}
    // Internal Modules {{{
    // Touch Module {{{ 
    var Touch = (function () {
      // Touch support detection function adapted (under MIT License)
      // from code by Jeffrey Sambells - http://github.com/iamamused/
      function hasTouchSupport() {
        var support = {}, events = ['touchstart', 'touchmove', 'touchend'],
            el = document.createElement('div'), i;

        try {
          for(i=0; i<events.length; i++) {
            var eventName = events[i];
            eventName = 'on' + eventName;
            var isSupported = (eventName in el);
            if (!isSupported) {
              el.setAttribute(eventName, 'return;');
              isSupported = typeof el[eventName] == 'function';
            }
            support[events[i]] = isSupported;
          }
          return support.touchstart && support.touchend && support.touchmove;
        }
        catch(err) {
          return false;
        }
      }

      function detectSupport() {
        if ((options.touchSupport === true) || (options.touchSupport === false)) return options.touchSupport;
          else return hasTouchSupport();
      }
      return {
        createDragger: function (ord) {
          return function (e) {
            if (options.disabled) {
              return false;
            }
            if ((ord === 'move') && !options.allowMove) {
              return false;
            }
            docOffset = getPos($img);
            btndown = true;
            startDragMode(ord, mouseAbs(Touch.cfilter(e)), true);
            e.stopPropagation();
            e.preventDefault();
            return false;
          };
        },
        newSelection: function (e) {
          return newSelection(Touch.cfilter(e));
        },
        cfilter: function (e){
          e.pageX = e.originalEvent.changedTouches[0].pageX;
          e.pageY = e.originalEvent.changedTouches[0].pageY;
          return e;
        },
        isSupported: hasTouchSupport,
        support: detectSupport()
      };
    }());
    // }}}
    // Coords Module {{{
    var Coords = (function () {
      var x1 = 0,
          y1 = 0,
          x2 = 0,
          y2 = 0,
          ox, oy;

      function setPressed(pos) //{{{
      {
        pos = rebound(pos);
        x2 = x1 = pos[0];
        y2 = y1 = pos[1];
      }
      //}}}
      function setCurrent(pos) //{{{
      {
        pos = rebound(pos);
        ox = pos[0] - x2;
        oy = pos[1] - y2;
        x2 = pos[0];
        y2 = pos[1];
      }
      //}}}
      function getOffset() //{{{
      {
        return [ox, oy];
      }
      //}}}
      function moveOffset(offset) //{{{
      {
        var ox = offset[0],
            oy = offset[1];

        if (0 > x1 + ox) {
          ox -= ox + x1;
        }
        if (0 > y1 + oy) {
          oy -= oy + y1;
        }

        if (boundy < y2 + oy) {
          oy += boundy - (y2 + oy);
        }
        if (boundx < x2 + ox) {
          ox += boundx - (x2 + ox);
        }

        x1 += ox;
        x2 += ox;
        y1 += oy;
        y2 += oy;
      }
      //}}}
      function getCorner(ord) //{{{
      {
        var c = getFixed();
        switch (ord) {
        case 'ne':
          return [c.x2, c.y];
        case 'nw':
          return [c.x, c.y];
        case 'se':
          return [c.x2, c.y2];
        case 'sw':
          return [c.x, c.y2];
        }
      }
      //}}}
      function getFixed() //{{{
      {
        if (!options.aspectRatio) {
          return getRect();
        }
        // This function could use some optimization I think...
        var aspect = options.aspectRatio,
            min_x = options.minSize[0] / xscale,
            
            
            //min_y = options.minSize[1]/yscale,
            max_x = options.maxSize[0] / xscale,
            max_y = options.maxSize[1] / yscale,
            rw = x2 - x1,
            rh = y2 - y1,
            rwa = Math.abs(rw),
            rha = Math.abs(rh),
            real_ratio = rwa / rha,
            xx, yy, w, h;

        if (max_x === 0) {
          max_x = boundx * 10;
        }
        if (max_y === 0) {
          max_y = boundy * 10;
        }
        if (real_ratio < aspect) {
          yy = y2;
          w = rha * aspect;
          xx = rw < 0 ? x1 - w : w + x1;

          if (xx < 0) {
            xx = 0;
            h = Math.abs((xx - x1) / aspect);
            yy = rh < 0 ? y1 - h : h + y1;
          } else if (xx > boundx) {
            xx = boundx;
            h = Math.abs((xx - x1) / aspect);
            yy = rh < 0 ? y1 - h : h + y1;
          }
        } else {
          xx = x2;
          h = rwa / aspect;
          yy = rh < 0 ? y1 - h : y1 + h;
          if (yy < 0) {
            yy = 0;
            w = Math.abs((yy - y1) * aspect);
            xx = rw < 0 ? x1 - w : w + x1;
          } else if (yy > boundy) {
            yy = boundy;
            w = Math.abs(yy - y1) * aspect;
            xx = rw < 0 ? x1 - w : w + x1;
          }
        }

        // Magic %-)
        if (xx > x1) { // right side
          if (xx - x1 < min_x) {
            xx = x1 + min_x;
          } else if (xx - x1 > max_x) {
            xx = x1 + max_x;
          }
          if (yy > y1) {
            yy = y1 + (xx - x1) / aspect;
          } else {
            yy = y1 - (xx - x1) / aspect;
          }
        } else if (xx < x1) { // left side
          if (x1 - xx < min_x) {
            xx = x1 - min_x;
          } else if (x1 - xx > max_x) {
            xx = x1 - max_x;
          }
          if (yy > y1) {
            yy = y1 + (x1 - xx) / aspect;
          } else {
            yy = y1 - (x1 - xx) / aspect;
          }
        }

        if (xx < 0) {
          x1 -= xx;
          xx = 0;
        } else if (xx > boundx) {
          x1 -= xx - boundx;
          xx = boundx;
        }

        if (yy < 0) {
          y1 -= yy;
          yy = 0;
        } else if (yy > boundy) {
          y1 -= yy - boundy;
          yy = boundy;
        }

        return makeObj(flipCoords(x1, y1, xx, yy));
      }
      //}}}
      function rebound(p) //{{{
      {
        if (p[0] < 0) p[0] = 0;
        if (p[1] < 0) p[1] = 0;

        if (p[0] > boundx) p[0] = boundx;
        if (p[1] > boundy) p[1] = boundy;

        return [Math.round(p[0]), Math.round(p[1])];
      }
      //}}}
      function flipCoords(x1, y1, x2, y2) //{{{
      {
        var xa = x1,
            xb = x2,
            ya = y1,
            yb = y2;
        if (x2 < x1) {
          xa = x2;
          xb = x1;
        }
        if (y2 < y1) {
          ya = y2;
          yb = y1;
        }
        return [xa, ya, xb, yb];
      }
      //}}}
      function getRect() //{{{
      {
        var xsize = x2 - x1,
            ysize = y2 - y1,
            delta;

        if (xlimit && (Math.abs(xsize) > xlimit)) {
          x2 = (xsize > 0) ? (x1 + xlimit) : (x1 - xlimit);
        }
        if (ylimit && (Math.abs(ysize) > ylimit)) {
          y2 = (ysize > 0) ? (y1 + ylimit) : (y1 - ylimit);
        }

        if (ymin / yscale && (Math.abs(ysize) < ymin / yscale)) {
          y2 = (ysize > 0) ? (y1 + ymin / yscale) : (y1 - ymin / yscale);
        }
        if (xmin / xscale && (Math.abs(xsize) < xmin / xscale)) {
          x2 = (xsize > 0) ? (x1 + xmin / xscale) : (x1 - xmin / xscale);
        }

        if (x1 < 0) {
          x2 -= x1;
          x1 -= x1;
        }
        if (y1 < 0) {
          y2 -= y1;
          y1 -= y1;
        }
        if (x2 < 0) {
          x1 -= x2;
          x2 -= x2;
        }
        if (y2 < 0) {
          y1 -= y2;
          y2 -= y2;
        }
        if (x2 > boundx) {
          delta = x2 - boundx;
          x1 -= delta;
          x2 -= delta;
        }
        if (y2 > boundy) {
          delta = y2 - boundy;
          y1 -= delta;
          y2 -= delta;
        }
        if (x1 > boundx) {
          delta = x1 - boundy;
          y2 -= delta;
          y1 -= delta;
        }
        if (y1 > boundy) {
          delta = y1 - boundy;
          y2 -= delta;
          y1 -= delta;
        }

        return makeObj(flipCoords(x1, y1, x2, y2));
      }
      //}}}
      function makeObj(a) //{{{
      {
        return {
          x: a[0],
          y: a[1],
          x2: a[2],
          y2: a[3],
          w: a[2] - a[0],
          h: a[3] - a[1]
        };
      }
      //}}}

      return {
        flipCoords: flipCoords,
        setPressed: setPressed,
        setCurrent: setCurrent,
        getOffset: getOffset,
        moveOffset: moveOffset,
        getCorner: getCorner,
        getFixed: getFixed
      };
    }());

    //}}}
    // Shade Module {{{
    var Shade = (function() {
      var enabled = false,
          holder = $('<div />').css({
            position: 'absolute',
            zIndex: 240,
            opacity: 0
          }),
          shades = {
            top: createShade(),
            left: createShade().height(boundy),
            right: createShade().height(boundy),
            bottom: createShade()
          };

      function resizeShades(w,h) {
        shades.left.css({ height: px(h) });
        shades.right.css({ height: px(h) });
      }
      function updateAuto()
      {
        return updateShade(Coords.getFixed());
      }
      function updateShade(c)
      {
        shades.top.css({
          left: px(c.x),
          width: px(c.w),
          height: px(c.y)
        });
        shades.bottom.css({
          top: px(c.y2),
          left: px(c.x),
          width: px(c.w),
          height: px(boundy-c.y2)
        });
        shades.right.css({
          left: px(c.x2),
          width: px(boundx-c.x2)
        });
        shades.left.css({
          width: px(c.x)
        });
      }
      function createShade() {
        return $('<div />').css({
          position: 'absolute',
          backgroundColor: options.shadeColor||options.bgColor
        }).appendTo(holder);
      }
      function enableShade() {
        if (!enabled) {
          enabled = true;
          holder.insertBefore($img);
          updateAuto();
          Selection.setBgOpacity(1,0,1);
          $img2.hide();

          setBgColor(options.shadeColor||options.bgColor,1);
          if (Selection.isAwake())
          {
            setOpacity(options.bgOpacity,1);
          }
            else setOpacity(1,1);
        }
      }
      function setBgColor(color,now) {
        colorChangeMacro(getShades(),color,now);
      }
      function disableShade() {
        if (enabled) {
          holder.remove();
          $img2.show();
          enabled = false;
          if (Selection.isAwake()) {
            Selection.setBgOpacity(options.bgOpacity,1,1);
          } else {
            Selection.setBgOpacity(1,1,1);
            Selection.disableHandles();
          }
          colorChangeMacro($div,0,1);
        }
      }
      function setOpacity(opacity,now) {
        if (enabled) {
          if (options.bgFade && !now) {
            holder.animate({
              opacity: 1-opacity
            },{
              queue: false,
              duration: options.fadeTime
            });
          }
          else holder.css({opacity:1-opacity});
        }
      }
      function refreshAll() {
        options.shade ? enableShade() : disableShade();
        if (Selection.isAwake()) setOpacity(options.bgOpacity);
      }
      function getShades() {
        return holder.children();
      }

      return {
        update: updateAuto,
        updateRaw: updateShade,
        getShades: getShades,
        setBgColor: setBgColor,
        enable: enableShade,
        disable: disableShade,
        resize: resizeShades,
        refresh: refreshAll,
        opacity: setOpacity
      };
    }());
    // }}}
    // Selection Module {{{
    var Selection = (function () {
      var awake,
          hdep = 370,
          borders = {},
          handle = {},
          dragbar = {},
          seehandles = false;

      // Private Methods
      function insertBorder(type) //{{{
      {
        var jq = $('<div />').css({
          position: 'absolute',
          opacity: options.borderOpacity
        }).addClass(cssClass(type));
        $img_holder.append(jq);
        return jq;
      }
      //}}}
      function dragDiv(ord, zi) //{{{
      {
        var jq = $('<div />').mousedown(createDragger(ord)).css({
          cursor: ord + '-resize',
          position: 'absolute',
          zIndex: zi
        }).addClass('ord-'+ord);

        if (Touch.support) {
          jq.bind('touchstart.jcrop', Touch.createDragger(ord));
        }

        $hdl_holder.append(jq);
        return jq;
      }
      //}}}
      function insertHandle(ord) //{{{
      {
        var hs = options.handleSize,

          div = dragDiv(ord, hdep++).css({
            opacity: options.handleOpacity
          }).addClass(cssClass('handle'));

        if (hs) { div.width(hs).height(hs); }

        return div;
      }
      //}}}
      function insertDragbar(ord) //{{{
      {
        return dragDiv(ord, hdep++).addClass('jcrop-dragbar');
      }
      //}}}
      function createDragbars(li) //{{{
      {
        var i;
        for (i = 0; i < li.length; i++) {
          dragbar[li[i]] = insertDragbar(li[i]);
        }
      }
      //}}}
      function createBorders(li) //{{{
      {
        var cl,i;
        for (i = 0; i < li.length; i++) {
          switch(li[i]){
            case'n': cl='hline'; break;
            case's': cl='hline bottom'; break;
            case'e': cl='vline right'; break;
            case'w': cl='vline'; break;
          }
          borders[li[i]] = insertBorder(cl);
        }
      }
      //}}}
      function createHandles(li) //{{{
      {
        var i;
        for (i = 0; i < li.length; i++) {
          handle[li[i]] = insertHandle(li[i]);
        }
      }
      //}}}
      function moveto(x, y) //{{{
      {
        if (!options.shade) {
          $img2.css({
            top: px(-y),
            left: px(-x)
          });
        }
        $sel.css({
          top: px(y),
          left: px(x)
        });
      }
      //}}}
      function resize(w, h) //{{{
      {
        $sel.width(Math.round(w)).height(Math.round(h));
      }
      //}}}
      function refresh() //{{{
      {
        var c = Coords.getFixed();

        Coords.setPressed([c.x, c.y]);
        Coords.setCurrent([c.x2, c.y2]);

        updateVisible();
      }
      //}}}

      // Internal Methods
      function updateVisible(select) //{{{
      {
        if (awake) {
          return update(select);
        }
      }
      //}}}
      function update(select) //{{{
      {
        var c = Coords.getFixed();

        resize(c.w, c.h);
        moveto(c.x, c.y);
        if (options.shade) Shade.updateRaw(c);

        awake || show();

        if (select) {
          options.onSelect.call(api, unscale(c));
        } else {
          options.onChange.call(api, unscale(c));
        }
      }
      //}}}
      function setBgOpacity(opacity,force,now) //{{{
      {
        if (!awake && !force) return;
        if (options.bgFade && !now) {
          $img.animate({
            opacity: opacity
          },{
            queue: false,
            duration: options.fadeTime
          });
        } else {
          $img.css('opacity', opacity);
        }
      }
      //}}}
      function show() //{{{
      {
        $sel.show();

        if (options.shade) Shade.opacity(bgopacity);
          else setBgOpacity(bgopacity,true);

        awake = true;
      }
      //}}}
      function release() //{{{
      {
        disableHandles();
        $sel.hide();

        if (options.shade) Shade.opacity(1);
          else setBgOpacity(1);

        awake = false;
        options.onRelease.call(api);
      }
      //}}}
      function showHandles() //{{{
      {
        if (seehandles) {
          $hdl_holder.show();
        }
      }
      //}}}
      function enableHandles() //{{{
      {
        seehandles = true;
        if (options.allowResize) {
          $hdl_holder.show();
          return true;
        }
      }
      //}}}
      function disableHandles() //{{{
      {
        seehandles = false;
        $hdl_holder.hide();
      } 
      //}}}
      function animMode(v) //{{{
      {
        if (v) {
          animating = true;
          disableHandles();
        } else {
          animating = false;
          enableHandles();
        }
      } 
      //}}}
      function done() //{{{
      {
        animMode(false);
        refresh();
      } 
      //}}}
      // Insert draggable elements {{{
      // Insert border divs for outline

      if (options.dragEdges && $.isArray(options.createDragbars))
        createDragbars(options.createDragbars);

      if ($.isArray(options.createHandles))
        createHandles(options.createHandles);

      if (options.drawBorders && $.isArray(options.createBorders))
        createBorders(options.createBorders);

      //}}}

      // This is a hack for iOS5 to support drag/move touch functionality
      $(document).bind('touchstart.jcrop-ios',function(e) {
        if ($(e.currentTarget).hasClass('jcrop-tracker')) e.stopPropagation();
      });

      var $track = newTracker().mousedown(createDragger('move')).css({
        cursor: 'move',
        position: 'absolute',
        zIndex: 360
      });

      if (Touch.support) {
        $track.bind('touchstart.jcrop', Touch.createDragger('move'));
      }

      $img_holder.append($track);
      disableHandles();

      return {
        updateVisible: updateVisible,
        update: update,
        release: release,
        refresh: refresh,
        isAwake: function () {
          return awake;
        },
        setCursor: function (cursor) {
          $track.css('cursor', cursor);
        },
        enableHandles: enableHandles,
        enableOnly: function () {
          seehandles = true;
        },
        showHandles: showHandles,
        disableHandles: disableHandles,
        animMode: animMode,
        setBgOpacity: setBgOpacity,
        done: done
      };
    }());
    
    //}}}
    // Tracker Module {{{
    var Tracker = (function () {
      var onMove = function () {},
          onDone = function () {},
          trackDoc = options.trackDocument;

      function toFront(touch) //{{{
      {
        $trk.css({
          zIndex: 450
        });

        if (touch)
          $(document)
            .bind('touchmove.jcrop', trackTouchMove)
            .bind('touchend.jcrop', trackTouchEnd);

        else if (trackDoc)
          $(document)
            .bind('mousemove.jcrop',trackMove)
            .bind('mouseup.jcrop',trackUp);
      } 
      //}}}
      function toBack() //{{{
      {
        $trk.css({
          zIndex: 290
        });
        $(document).unbind('.jcrop');
      } 
      //}}}
      function trackMove(e) //{{{
      {
        onMove(mouseAbs(e));
        return false;
      } 
      //}}}
      function trackUp(e) //{{{
      {
        e.preventDefault();
        e.stopPropagation();

        if (btndown) {
          btndown = false;

          onDone(mouseAbs(e));

          if (Selection.isAwake()) {
            options.onSelect.call(api, unscale(Coords.getFixed()));
          }

          toBack();
          onMove = function () {};
          onDone = function () {};
        }

        return false;
      }
      //}}}
      function activateHandlers(move, done, touch) //{{{
      {
        btndown = true;
        onMove = move;
        onDone = done;
        toFront(touch);
        return false;
      }
      //}}}
      function trackTouchMove(e) //{{{
      {
        onMove(mouseAbs(Touch.cfilter(e)));
        return false;
      }
      //}}}
      function trackTouchEnd(e) //{{{
      {
        return trackUp(Touch.cfilter(e));
      }
      //}}}
      function setCursor(t) //{{{
      {
        $trk.css('cursor', t);
      }
      //}}}

      if (!trackDoc) {
        $trk.mousemove(trackMove).mouseup(trackUp).mouseout(trackUp);
      }

      $img.before($trk);
      return {
        activateHandlers: activateHandlers,
        setCursor: setCursor
      };
    }());
    //}}}
    // KeyManager Module {{{
    var KeyManager = (function () {
      var $keymgr = $('<input type="radio" />').css({
        position: 'fixed',
        left: '-120px',
        width: '12px'
      }).addClass('jcrop-keymgr'),

        $keywrap = $('<div />').css({
          position: 'absolute',
          overflow: 'hidden'
        }).append($keymgr);

      function watchKeys() //{{{
      {
        if (options.keySupport) {
          $keymgr.show();
          $keymgr.focus();
        }
      }
      //}}}
      function onBlur(e) //{{{
      {
        $keymgr.hide();
      }
      //}}}
      function doNudge(e, x, y) //{{{
      {
        if (options.allowMove) {
          Coords.moveOffset([x, y]);
          Selection.updateVisible(true);
        }
        e.preventDefault();
        e.stopPropagation();
      }
      //}}}
      function parseKey(e) //{{{
      {
        if (e.ctrlKey || e.metaKey) {
          return true;
        }
        shift_down = e.shiftKey ? true : false;
        var nudge = shift_down ? 10 : 1;

        switch (e.keyCode) {
        case 37:
          doNudge(e, -nudge, 0);
          break;
        case 39:
          doNudge(e, nudge, 0);
          break;
        case 38:
          doNudge(e, 0, -nudge);
          break;
        case 40:
          doNudge(e, 0, nudge);
          break;
        case 27:
          if (options.allowSelect) Selection.release();
          break;
        case 9:
          return true;
        }

        return false;
      }
      //}}}

      if (options.keySupport) {
        $keymgr.keydown(parseKey).blur(onBlur);
        if (ie6mode || !options.fixedSupport) {
          $keymgr.css({
            position: 'absolute',
            left: '-20px'
          });
          $keywrap.append($keymgr).insertBefore($img);
        } else {
          $keymgr.insertBefore($img);
        }
      }


      return {
        watchKeys: watchKeys
      };
    }());
    //}}}
    // }}}
    // API methods {{{
    function setClass(cname) //{{{
    {
      $div.removeClass().addClass(cssClass('holder')).addClass(cname);
    }
    //}}}
    function animateTo(a, callback) //{{{
    {
      var x1 = a[0] / xscale,
          y1 = a[1] / yscale,
          x2 = a[2] / xscale,
          y2 = a[3] / yscale;

      if (animating) {
        return;
      }

      var animto = Coords.flipCoords(x1, y1, x2, y2),
          c = Coords.getFixed(),
          initcr = [c.x, c.y, c.x2, c.y2],
          animat = initcr,
          interv = options.animationDelay,
          ix1 = animto[0] - initcr[0],
          iy1 = animto[1] - initcr[1],
          ix2 = animto[2] - initcr[2],
          iy2 = animto[3] - initcr[3],
          pcent = 0,
          velocity = options.swingSpeed;

      x1 = animat[0];
      y1 = animat[1];
      x2 = animat[2];
      y2 = animat[3];

      Selection.animMode(true);
      var anim_timer;

      function queueAnimator() {
        window.setTimeout(animator, interv);
      }
      var animator = (function () {
        return function () {
          pcent += (100 - pcent) / velocity;

          animat[0] = Math.round(x1 + ((pcent / 100) * ix1));
          animat[1] = Math.round(y1 + ((pcent / 100) * iy1));
          animat[2] = Math.round(x2 + ((pcent / 100) * ix2));
          animat[3] = Math.round(y2 + ((pcent / 100) * iy2));

          if (pcent >= 99.8) {
            pcent = 100;
          }
          if (pcent < 100) {
            setSelectRaw(animat);
            queueAnimator();
          } else {
            Selection.done();
            Selection.animMode(false);
            if (typeof(callback) === 'function') {
              callback.call(api);
            }
          }
        };
      }());
      queueAnimator();
    }
    //}}}
    function setSelect(rect) //{{{
    {
      setSelectRaw([rect[0] / xscale, rect[1] / yscale, rect[2] / xscale, rect[3] / yscale]);
      options.onSelect.call(api, unscale(Coords.getFixed()));
      Selection.enableHandles();
    }
    //}}}
    function setSelectRaw(l) //{{{
    {
      Coords.setPressed([l[0], l[1]]);
      Coords.setCurrent([l[2], l[3]]);
      Selection.update();
    }
    //}}}
    function tellSelect() //{{{
    {
      return unscale(Coords.getFixed());
    }
    //}}}
    function tellScaled() //{{{
    {
      return Coords.getFixed();
    }
    //}}}
    function setOptionsNew(opt) //{{{
    {
      setOptions(opt);
      interfaceUpdate();
    }
    //}}}
    function disableCrop() //{{{
    {
      options.disabled = true;
      Selection.disableHandles();
      Selection.setCursor('default');
      Tracker.setCursor('default');
    }
    //}}}
    function enableCrop() //{{{
    {
      options.disabled = false;
      interfaceUpdate();
    }
    //}}}
    function cancelCrop() //{{{
    {
      Selection.done();
      Tracker.activateHandlers(null, null);
    }
    //}}}
    function destroy() //{{{
    {
      $div.remove();
      $origimg.show();
      $origimg.css('visibility','visible');
      $(obj).removeData('Jcrop');
    }
    //}}}
    function setImage(src, callback) //{{{
    {
      Selection.release();
      disableCrop();
      var img = new Image();
      img.onload = function () {
        var iw = img.width;
        var ih = img.height;
        var bw = options.boxWidth;
        var bh = options.boxHeight;
        $img.width(iw).height(ih);
        $img.attr('src', src);
        $img2.attr('src', src);
        presize($img, bw, bh);
        boundx = $img.width();
        boundy = $img.height();
        $img2.width(boundx).height(boundy);
        $trk.width(boundx + (bound * 2)).height(boundy + (bound * 2));
        $div.width(boundx).height(boundy);
        Shade.resize(boundx,boundy);
        enableCrop();

        if (typeof(callback) === 'function') {
          callback.call(api);
        }
      };
      img.src = src;
    }
    //}}}
    function colorChangeMacro($obj,color,now) {
      var mycolor = color || options.bgColor;
      if (options.bgFade && supportsColorFade() && options.fadeTime && !now) {
        $obj.animate({
          backgroundColor: mycolor
        }, {
          queue: false,
          duration: options.fadeTime
        });
      } else {
        $obj.css('backgroundColor', mycolor);
      }
    }
    function interfaceUpdate(alt) //{{{
    // This method tweaks the interface based on options object.
    // Called when options are changed and at end of initialization.
    {
      if (options.allowResize) {
        if (alt) {
          Selection.enableOnly();
        } else {
          Selection.enableHandles();
        }
      } else {
        Selection.disableHandles();
      }

      Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
      Selection.setCursor(options.allowMove ? 'move' : 'default');

      if (options.hasOwnProperty('trueSize')) {
        xscale = options.trueSize[0] / boundx;
        yscale = options.trueSize[1] / boundy;
      }

      if (options.hasOwnProperty('setSelect')) {
        setSelect(options.setSelect);
        Selection.done();
        delete(options.setSelect);
      }

      Shade.refresh();

      if (options.bgColor != bgcolor) {
        colorChangeMacro(
          options.shade? Shade.getShades(): $div,
          options.shade?
            (options.shadeColor || options.bgColor):
            options.bgColor
        );
        bgcolor = options.bgColor;
      }

      if (bgopacity != options.bgOpacity) {
        bgopacity = options.bgOpacity;
        if (options.shade) Shade.refresh();
          else Selection.setBgOpacity(bgopacity);
      }

      xlimit = options.maxSize[0] || 0;
      ylimit = options.maxSize[1] || 0;
      xmin = options.minSize[0] || 0;
      ymin = options.minSize[1] || 0;

      if (options.hasOwnProperty('outerImage')) {
        $img.attr('src', options.outerImage);
        delete(options.outerImage);
      }

      Selection.refresh();
    }
    //}}}
    //}}}

    if (Touch.support) $trk.bind('touchstart.jcrop', Touch.newSelection);

    $hdl_holder.hide();
    interfaceUpdate(true);

    var api = {
      setImage: setImage,
      animateTo: animateTo,
      setSelect: setSelect,
      setOptions: setOptionsNew,
      tellSelect: tellSelect,
      tellScaled: tellScaled,
      setClass: setClass,

      disable: disableCrop,
      enable: enableCrop,
      cancel: cancelCrop,
      release: Selection.release,
      destroy: destroy,

      focus: KeyManager.watchKeys,

      getBounds: function () {
        return [boundx * xscale, boundy * yscale];
      },
      getWidgetSize: function () {
        return [boundx, boundy];
      },
      getScaleFactor: function () {
        return [xscale, yscale];
      },
      getOptions: function() {
        // careful: internal values are returned
        return options;
      },

      ui: {
        holder: $div,
        selection: $sel
      }
    };

    if (is_msie) $div.bind('selectstart', function () { return false; });

    $origimg.data('Jcrop', api);
    return api;
  };
  $.fn.Jcrop = function (options, callback) //{{{
  {
    var api;
    // Iterate over each object, attach Jcrop
    this.each(function () {
      // If we've already attached to this object
      if ($(this).data('Jcrop')) {
        // The API can be requested this way (undocumented)
        if (options === 'api') return $(this).data('Jcrop');
        // Otherwise, we just reset the options...
        else $(this).data('Jcrop').setOptions(options);
      }
      // If we haven't been attached, preload and attach
      else {
        if (this.tagName == 'IMG')
          $.Jcrop.Loader(this,function(){
            $(this).css({display:'block',visibility:'hidden'});
            api = $.Jcrop(this, options);
            if ($.isFunction(callback)) callback.call(api);
          });
        else {
          $(this).css({display:'block',visibility:'hidden'});
          api = $.Jcrop(this, options);
          if ($.isFunction(callback)) callback.call(api);
        }
      }
    });

    // Return "this" so the object is chainable (jQuery-style)
    return this;
  };
  //}}}
  // $.Jcrop.Loader - basic image loader {{{

  $.Jcrop.Loader = function(imgobj,success,error){
    var $img = $(imgobj), img = $img[0];

    function completeCheck(){
      if (img.complete) {
        $img.unbind('.jcloader');
        if ($.isFunction(success)) success.call(img);
      }
      else window.setTimeout(completeCheck,50);
    }

    $img
      .bind('load.jcloader',completeCheck)
      .bind('error.jcloader',function(e){
        $img.unbind('.jcloader');
        if ($.isFunction(error)) error.call(img);
      });

    if (img.complete && $.isFunction(success)){
      $img.unbind('.jcloader');
      success.call(img);
    }
  };

  //}}}
  // Global Defaults {{{
  $.Jcrop.defaults = {

    // Basic Settings
    allowSelect: true,
    allowMove: true,
    allowResize: true,

    trackDocument: true,

    // Styling Options
    baseClass: 'jcrop',
    addClass: null,
    bgColor: 'black',
    bgOpacity: 0.6,
    bgFade: false,
    borderOpacity: 0.4,
    handleOpacity: 0.5,
    handleSize: null,

    aspectRatio: 0,
    keySupport: true,
    createHandles: ['n','s','e','w','nw','ne','se','sw'],
    createDragbars: ['n','s','e','w'],
    createBorders: ['n','s','e','w'],
    drawBorders: true,
    dragEdges: true,
    fixedSupport: true,
    touchSupport: null,

    shade: null,

    boxWidth: 0,
    boxHeight: 0,
    boundary: 2,
    fadeTime: 400,
    animationDelay: 20,
    swingSpeed: 3,

    minSelect: [0, 0],
    maxSize: [0, 0],
    minSize: [0, 0],

    // Callbacks / Event Handlers
    onChange: function () {},
    onSelect: function () {},
    onDblClick: function () {},
    onRelease: function () {}
  };

  // }}}
}((jquery__WEBPACK_IMPORTED_MODULE_0___default())));


/***/ }),

/***/ "./js/libs/lightbox.js":
/*!*****************************!*\
  !*** ./js/libs/lightbox.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Lightbox v2.11.2
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function ($) {

  function Lightbox(options) {
    this.album = [];
    this.currentImageIndex = void 0;
    this.init();

    // options
    this.options = $.extend({}, this.constructor.defaults);
    this.option(options);
  }

  // Descriptions of all options available on the demo site:
  // http://lokeshdhakar.com/projects/lightbox2/index.html#options
  Lightbox.defaults = {
    albumLabel: 'Image %1 of %2',
    alwaysShowNavOnTouchDevices: false,
    fadeDuration: 600,
    fitImagesInViewport: true,
    imageFadeDuration: 600,
    // maxWidth: 800,
    // maxHeight: 600,
    positionFromTop: 50,
    resizeDuration: 700,
    showImageNumberLabel: true,
    wrapAround: false,
    disableScrolling: false,
    /*
    Sanitize Title
    If the caption data is trusted, for example you are hardcoding it in, then leave this to false.
    This will free you to add html tags, such as links, in the caption.

    If the caption data is user submitted or from some other untrusted source, then set this to true
    to prevent xss and other injection attacks.
     */
    sanitizeTitle: false
  };

  Lightbox.prototype.option = function(options) {
    $.extend(this.options, options);
  };

  Lightbox.prototype.imageCountLabel = function(currentImageNum, totalImages) {
    return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
  };

  Lightbox.prototype.init = function() {
    var self = this;
    // Both enable and build methods require the body tag to be in the DOM.
    $(document).ready(function() {
      self.enable();
      self.build();
    });
  };

  // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
  // that contain 'lightbox'. When these are clicked, start lightbox.
  Lightbox.prototype.enable = function() {
    var self = this;
    $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
      self.start($(event.currentTarget));
      return false;
    });
  };

  // Build html for the lightbox and the overlay.
  // Attach event handlers to the new DOM elements. click click click
  Lightbox.prototype.build = function() {
    if ($('#lightbox').length > 0) {
        return;
    }

    var self = this;

    // The two root notes generated, #lightboxOverlay and #lightbox are given
    // tabindex attrs so they are focusable. We attach our keyboard event
    // listeners to these two elements, and not the document. Clicking anywhere
    // while Lightbox is opened will keep the focus on or inside one of these
    // two elements.
    //
    // We do this so we can prevent propogation of the Esc keypress when
    // Lightbox is open. This prevents it from intefering with other components
    // on the page below.
    //
    // Github issue: https://github.com/lokesh/lightbox2/issues/663
    $('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close fas fa-times"></a></div></div></div><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div></div>').appendTo($('body'));

    // Cache jQuery objects
    this.$lightbox       = $('#lightbox');
    this.$overlay        = $('#lightboxOverlay');
    this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
    this.$container      = this.$lightbox.find('.lb-container');
    this.$image          = this.$lightbox.find('.lb-image');
    this.$nav            = this.$lightbox.find('.lb-nav');

    // Store css values for future lookup
    this.containerPadding = {
      top: parseInt(this.$container.css('padding-top'), 10),
      right: parseInt(this.$container.css('padding-right'), 10),
      bottom: parseInt(this.$container.css('padding-bottom'), 10),
      left: parseInt(this.$container.css('padding-left'), 10)
    };

    this.imageBorderWidth = {
      top: parseInt(this.$image.css('border-top-width'), 10),
      right: parseInt(this.$image.css('border-right-width'), 10),
      bottom: parseInt(this.$image.css('border-bottom-width'), 10),
      left: parseInt(this.$image.css('border-left-width'), 10)
    };

    // Attach event handlers to the newly minted DOM elements
    this.$overlay.hide().on('click', function() {
      self.end();
      return false;
    });

    this.$lightbox.hide().on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
    });

    this.$outerContainer.on('click', function(event) {
      if ($(event.target).attr('id') === 'lightbox') {
        self.end();
      }
      return false;
    });

    this.$lightbox.find('.lb-prev').on('click', function() {
      if (self.currentImageIndex === 0) {
        self.changeImage(self.album.length - 1);
      } else {
        self.changeImage(self.currentImageIndex - 1);
      }
      return false;
    });

    this.$lightbox.find('.lb-next').on('click', function() {
      if (self.currentImageIndex === self.album.length - 1) {
        self.changeImage(0);
      } else {
        self.changeImage(self.currentImageIndex + 1);
      }
      return false;
    });

    /*
      Show context menu for image on right-click

      There is a div containing the navigation that spans the entire image and lives above of it. If
      you right-click, you are right clicking this div and not the image. This prevents users from
      saving the image or using other context menu actions with the image.

      To fix this, when we detect the right mouse button is pressed down, but not yet clicked, we
      set pointer-events to none on the nav div. This is so that the upcoming right-click event on
      the next mouseup will bubble down to the image. Once the right-click/contextmenu event occurs
      we set the pointer events back to auto for the nav div so it can capture hover and left-click
      events as usual.
     */
    this.$nav.on('mousedown', function(event) {
      if (event.which === 3) {
        self.$nav.css('pointer-events', 'none');

        self.$lightbox.one('contextmenu', function() {
          setTimeout(function() {
              this.$nav.css('pointer-events', 'auto');
          }.bind(self), 0);
        });
      }
    });


    this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
      self.end();
      return false;
    });
  };

  // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
  Lightbox.prototype.start = function($link) {
    var self    = this;
    var $window = $(window);

    $window.on('resize', $.proxy(this.sizeOverlay, this));

    this.sizeOverlay();

    this.album = [];
    var imageNumber = 0;

    function addToAlbum($link) {
      self.album.push({
        alt: $link.attr('data-alt'),
        link: $link.attr('href'),
        title: $link.attr('data-title') || $link.attr('title')
      });
    }

    // Support both data-lightbox attribute and rel attribute implementations
    var dataLightboxValue = $link.attr('data-lightbox');
    var $links;

    if (dataLightboxValue) {
      $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
      for (var i = 0; i < $links.length; i = ++i) {
        addToAlbum($($links[i]));
        if ($links[i] === $link[0]) {
          imageNumber = i;
        }
      }
    } else {
      if ($link.attr('rel') === 'lightbox') {
        // If image is not part of a set
        addToAlbum($link);
      } else {
        // If image is part of a set
        $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
        for (var j = 0; j < $links.length; j = ++j) {
          addToAlbum($($links[j]));
          if ($links[j] === $link[0]) {
            imageNumber = j;
          }
        }
      }
    }

    // Position Lightbox
    var top  = $window.scrollTop() + this.options.positionFromTop;
    var left = $window.scrollLeft();
    this.$lightbox.css({
      // edit
      // top: top + 'px',
      top: top - 35 + 'px',
      // edit
      left: left + 'px'
    }).fadeIn(this.options.fadeDuration);

    // Disable scrolling of the page while open
    if (this.options.disableScrolling) {
      $('body').addClass('lb-disable-scrolling');
    }

    this.changeImage(imageNumber);
  };

  // Hide most UI elements in preparation for the animated resizing of the lightbox.
  Lightbox.prototype.changeImage = function(imageNumber) {
    var self = this;
    var filename = this.album[imageNumber].link;
    var filetype = filename.split('.').slice(-1)[0];
    var $image = this.$lightbox.find('.lb-image');

    // Disable keyboard nav during transitions
    this.disableKeyboardNav();

    // Show loading state
    this.$overlay.fadeIn(this.options.fadeDuration);
    $('.lb-loader').fadeIn('slow');
    this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();
    this.$outerContainer.addClass('animating');

    // When image to show is preloaded, we send the width and height to sizeContainer()
    var preloader = new Image();
    preloader.onload = function() {
      var $preloader;
      var imageHeight;
      var imageWidth;
      var maxImageHeight;
      var maxImageWidth;
      var windowHeight;
      var windowWidth;

      $image.attr({
        'alt': self.album[imageNumber].alt,
        'src': filename
      });

      $preloader = $(preloader);

      $image.width(preloader.width);
      $image.height(preloader.height);
      windowWidth = $(window).width();
      windowHeight = $(window).height();

      // Calculate the max image dimensions for the current viewport.
      // Take into account the border around the image and an additional 10px gutter on each side.
      maxImageWidth  = windowWidth - self.containerPadding.left - self.containerPadding.right - self.imageBorderWidth.left - self.imageBorderWidth.right - 20;
      maxImageHeight = windowHeight - self.containerPadding.top - self.containerPadding.bottom - self.imageBorderWidth.top - self.imageBorderWidth.bottom - self.options.positionFromTop - 70;

      /*
      Since many SVGs have small intrinsic dimensions, but they support scaling
      up without quality loss because of their vector format, max out their
      size.
      */
      if (filetype === 'svg') {
        $image.width(maxImageWidth);
        $image.height(maxImageHeight);
      }

      // Fit image inside the viewport.
      if (self.options.fitImagesInViewport) {

        // Check if image size is larger then maxWidth|maxHeight in settings
        if (self.options.maxWidth && self.options.maxWidth < maxImageWidth) {
          maxImageWidth = self.options.maxWidth;
        }
        if (self.options.maxHeight && self.options.maxHeight < maxImageHeight) {
          maxImageHeight = self.options.maxHeight;
        }

      } else {
        maxImageWidth = self.options.maxWidth || preloader.width || maxImageWidth;
        maxImageHeight = self.options.maxHeight || preloader.height || maxImageHeight;
      }

      // Is the current image's width or height is greater than the maxImageWidth or maxImageHeight
      // option than we need to size down while maintaining the aspect ratio.
      if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
        if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
          imageWidth  = maxImageWidth;
          imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
          $image.width(imageWidth);
          $image.height(imageHeight);
        } else {
          imageHeight = maxImageHeight;
          imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
          $image.width(imageWidth);
          $image.height(imageHeight);
        }
      }
      self.sizeContainer($image.width(), $image.height());
    };

    // Preload image before showing
    preloader.src = this.album[imageNumber].link;
    this.currentImageIndex = imageNumber;
  };

  // Stretch overlay to fit the viewport
  Lightbox.prototype.sizeOverlay = function() {
    var self = this;
    /*
    We use a setTimeout 0 to pause JS execution and let the rendering catch-up.
    Why do this? If the `disableScrolling` option is set to true, a class is added to the body
    tag that disables scrolling and hides the scrollbar. We want to make sure the scrollbar is
    hidden before we measure the document width, as the presence of the scrollbar will affect the
    number.
    */
    setTimeout(function() {
      self.$overlay
        .width($(document).width())
        .height($(document).height());

    }, 0);
  };

  // Animate the size of the lightbox to fit the image we are showing
  // This method also shows the the image.
  Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
    var self = this;

    var oldWidth  = this.$outerContainer.outerWidth();
    var oldHeight = this.$outerContainer.outerHeight();
    var newWidth  = imageWidth + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right;
    var newHeight = imageHeight + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

    function postResize() {
      self.$lightbox.find('.lb-dataContainer').width(newWidth);
      self.$lightbox.find('.lb-prevLink').height(newHeight);
      self.$lightbox.find('.lb-nextLink').height(newHeight);

      // Set focus on one of the two root nodes so keyboard events are captured.
      self.$overlay.focus();

      self.showImage();
    }

    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      this.$outerContainer.animate({
        width: newWidth,
        height: newHeight
      }, this.options.resizeDuration, 'swing', function() {
        postResize();
      });
    } else {
      postResize();
    }
  };

  // Display the image and its details and begin preload neighboring images.
  Lightbox.prototype.showImage = function() {
    this.$lightbox.find('.lb-loader').stop(true).hide();
    this.$lightbox.find('.lb-image').fadeIn(this.options.imageFadeDuration);

    this.updateNav();
    this.updateDetails();
    this.preloadNeighboringImages();
    this.enableKeyboardNav();
  };

  // Display previous and next navigation if appropriate.
  Lightbox.prototype.updateNav = function() {
    // Check to see if the browser supports touch events. If so, we take the conservative approach
    // and assume that mouse hover events are not supported and always show prev/next navigation
    // arrows in image sets.
    var alwaysShowNav = false;
    try {
      document.createEvent('TouchEvent');
      alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
    } catch (e) {}

    this.$lightbox.find('.lb-nav').show();

    if (this.album.length > 1) {
      if (this.options.wrapAround) {
        if (alwaysShowNav) {
          this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
        }
        this.$lightbox.find('.lb-prev, .lb-next').show();
      } else {
        if (this.currentImageIndex > 0) {
          this.$lightbox.find('.lb-prev').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-prev').css('opacity', '1');
          }
        }
        if (this.currentImageIndex < this.album.length - 1) {
          this.$lightbox.find('.lb-next').show();
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-next').css('opacity', '1');
          }
        }
      }
    }
  };

  // Display caption, image number, and closing button.
  Lightbox.prototype.updateDetails = function() {
    var self = this;

    // Enable anchor clicks in the injected caption html.
    // Thanks Nate Wright for the fix. @https://github.com/NateWr
    if (typeof this.album[this.currentImageIndex].title !== 'undefined' &&
      this.album[this.currentImageIndex].title !== '') {
      var $caption = this.$lightbox.find('.lb-caption');
      if (this.options.sanitizeTitle) {
        $caption.text(this.album[this.currentImageIndex].title);
      } else {
        $caption.html(this.album[this.currentImageIndex].title);
      }
      $caption.fadeIn('fast');
    }

    if (this.album.length > 1 && this.options.showImageNumberLabel) {
      var labelText = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
      this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
    } else {
      this.$lightbox.find('.lb-number').hide();
    }

    this.$outerContainer.removeClass('animating');

    this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
      return self.sizeOverlay();
    });
  };

  // Preload previous and next images in set.
  Lightbox.prototype.preloadNeighboringImages = function() {
    if (this.album.length > this.currentImageIndex + 1) {
      var preloadNext = new Image();
      preloadNext.src = this.album[this.currentImageIndex + 1].link;
    }
    if (this.currentImageIndex > 0) {
      var preloadPrev = new Image();
      preloadPrev.src = this.album[this.currentImageIndex - 1].link;
    }
  };

  Lightbox.prototype.enableKeyboardNav = function() {
    this.$lightbox.on('keyup.keyboard', $.proxy(this.keyboardAction, this));
    this.$overlay.on('keyup.keyboard', $.proxy(this.keyboardAction, this));
  };

  Lightbox.prototype.disableKeyboardNav = function() {
    this.$lightbox.off('.keyboard');
    this.$overlay.off('.keyboard');
  };

  Lightbox.prototype.keyboardAction = function(event) {
    var KEYCODE_ESC        = 27;
    var KEYCODE_LEFTARROW  = 37;
    var KEYCODE_RIGHTARROW = 39;

    var keycode = event.keyCode;
    if (keycode === KEYCODE_ESC) {
      // Prevent bubbling so as to not affect other components on the page.
      event.stopPropagation();
      this.end();
    } else if (keycode === KEYCODE_LEFTARROW) {
      if (this.currentImageIndex !== 0) {
        this.changeImage(this.currentImageIndex - 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(this.album.length - 1);
      }
    } else if (keycode === KEYCODE_RIGHTARROW) {
      if (this.currentImageIndex !== this.album.length - 1) {
        this.changeImage(this.currentImageIndex + 1);
      } else if (this.options.wrapAround && this.album.length > 1) {
        this.changeImage(0);
      }
    }
  };

  // Closing time. :-(
  Lightbox.prototype.end = function() {
    this.disableKeyboardNav();
    $(window).off('resize', this.sizeOverlay);
    this.$lightbox.fadeOut(this.options.fadeDuration);
    this.$overlay.fadeOut(this.options.fadeDuration);

    if (this.options.disableScrolling) {
      $('body').removeClass('lb-disable-scrolling');
    }
  };

  return new Lightbox();
}));


/***/ }),

/***/ "./js/view.js":
/*!********************!*\
  !*** ./js/view.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_jquery_Jcrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/jquery.Jcrop */ "./js/libs/jquery.Jcrop.js");
/* harmony import */ var _libs_lightbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libs/lightbox */ "./js/libs/lightbox.js");
/* harmony import */ var _libs_lightbox__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_libs_lightbox__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./js/utils.js");





jquery__WEBPACK_IMPORTED_MODULE_0___default()(function() {
    // setting slider

    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.initSlider)(768)

    //header animations

    ;(0,_utils__WEBPACK_IMPORTED_MODULE_3__.expandSearch)('header')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_3__.initNavTabs)('.header-navlink')
    // popups

    const popup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.popup-menu')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_3__.togglePopup)('trigger', 'popup')

    ;(0,_utils__WEBPACK_IMPORTED_MODULE_3__.togglePopup)('header-menu-btn', 'burger')
    if (window.innerWidth < 1279) (0,_utils__WEBPACK_IMPORTED_MODULE_3__.togglePopup)('header-user-logged', 'user')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_3__.expandSearch)('burger')
    // auto-expanding textarea

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea').on('input', function (e) {
        e.target.style.height = e.target.scrollHeight + 'px';
    })

    // desktop user menu hover appearance

    if (window.innerWidth > 1279) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header-user-avatar').on('mouseenter', function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').show(200)
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.user-menu').on('mouseleave', function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hide(200)
            })
        })
    }

// auto-expanding textarea


const initialHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea').height() + 'px'

jquery__WEBPACK_IMPORTED_MODULE_0___default()('textarea').on('input', function (e) {
    const currentHeight = e.target.scrollHeight + 'px'

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('height', currentHeight)
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).height(initialHeight)
    }
})

// Show EXIF

const exifButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.exif-btn')
const exifContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.exif-content')

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

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.hero-more').on('click', function (e) {

    e.stopPropagation()
    const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dots-menu')
    target.on('click', function (e) {
        e.stopPropagation()
    })
    target.toggle()


    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('keydown', function (e) {

        if (e.code === 'Escape') {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dots-menu').hide()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('.hero-more').trigger('blur')
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off()
        }

    })
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('click', function (e) {

        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.dots-menu').hide()
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off()

    })
})

// lightbox options

_libs_lightbox__WEBPACK_IMPORTED_MODULE_2__.option({
    'disableScrolling': true,
})

// добавление фотографии в список избранных
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.photo-btn-like').on('click', function () {
    
    const button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    let action = 'add';
    if (button.hasClass('active')) action = 'rm';
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: '/photo/ajaxFavouritePhoto/',
        data: {
            'id': button.attr('data-id'),
            'action': action
        },
        success: function (msg) {
            if (msg == 'success') {
                const count = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(".photo-likes-counter").text());
                if (action == 'add') {
                    button.addClass('active');
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".photo-likes-counter").text(count + 1);
                } else {
                    button.removeClass('active');
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()("#add_favourite_photo_toggle span").text(count - 1);
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

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ratings-rate-btn').on('click', function (e) {
    e.preventDefault();

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('.disabled').length > 0) {
        return;
    }

    const button = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    const voteType = button.data('voteType');
    const photoId = button.data('photoId');
    

    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: '/photo/ajaxRecommend',
        data: {
            'recommend': voteType,
            'id': photoId
        },
        success: function (data) {


            if (data.length == 0) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('.ratings').addClass('disabled');

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

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.photo-btn-complain').on('click', function (e) {
    e.preventDefault();
    // берём ID фото из кнопки "добавить в избранное"
    const id = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.photo-btn-like').attr('data-id')
    ;(0,_utils__WEBPACK_IMPORTED_MODULE_3__.showTroubleTicketForm)('Photo', id);
});

/* КОНЕЦ: ПОЖАЛОВАТЬСЯ НА ФОТО */






/* КНОПКИ НАЗАД/ВПЕРЁД НА ФОТОГРАФИИ */
function moveByPhotoStream(photoANode) {
    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.photo-preview-nav').length > 0 && photoANode.length > 0) {
        document.location = photoANode.attr('href');
    }
}

const nextPhotoStreamANode = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.photo-preview-nav .photo-preview.active').next('a,.photo-frame');
if (nextPhotoStreamANode.length > 0) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.photo-btn-next').on('click', function (e) {
        e.preventDefault();
        moveByPhotoStream(nextPhotoStreamANode.hasClass('photo-frame') ? jquery__WEBPACK_IMPORTED_MODULE_0___default()('a', nextPhotoStreamANode) : nextPhotoStreamANode);
    })
    // $('.control-container.next').show();
}

const prevPhotoStreamANode = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.photo-preview-nav .photo-preview.active').prev('a,.photo-frame');
if (prevPhotoStreamANode.length > 0) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.photo-btn-prev').on('click', function (e) {
        e.preventDefault();
        moveByPhotoStream(prevPhotoStreamANode.hasClass('photo-frame') ? jquery__WEBPACK_IMPORTED_MODULE_0___default()('a', prevPhotoStreamANode) : prevPhotoStreamANode);
    })
    // $('.control-container.prev').show();
}
/* КОНЕЦ: КНОПКИ НАЗАД/ВПЕРЁД НА ФОТОРГРАФИИ*/



// COMMENT FORM

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.comments').on('submit', '.comments-textfield', function (e) {
    e.preventDefault();

    // const parent = $(this).parents('.comment-block');
    const form = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    
    form.find(':submit').html('Отправка...').attr('disabled', 'disabled');

    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
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

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.hero-subscribe').on('click', function () {
    var actionType = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('subscribed') ? 'delete' : 'add';
    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: '/member/addDeleteFavoriteAuthor',
        data: {
            type: actionType,
            id: jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('memberId')
        },
        dataType: 'json',
        success: function (data) {
            if (typeof data.type == 'string' && data.type == 'ok') {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('.hero-subscribe').each(function () {
                    // var countSubscribers=parseInt($(this).children('.count').text());
                    if (actionType == 'add') {
                        // countSubscribers++;
                        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text('ОТПИСАТЬСЯ');
                        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('subscribed');
                        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).filter('.green').addClass('white').removeClass('green');
                    } else {
                        // countSubscribers--;
                        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('.caption').text('ПОДПИСАТЬСЯ');
                        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).removeClass('subscribed');
                        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).filter('.white').addClass('green').removeClass('white');
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




jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-reply').on('click', function(e){
    e.preventDefault();

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-reply').show()
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post .comments-textfield').remove();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-container').removeClass('active')

    const formTemplate = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.comments-textfield').clone().attr('id', 'yw1');   
    const commentBlock = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('.post-container');
    console.log(commentBlock)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#PhotoComment_parent_id', formTemplate).val(commentBlock.data('commentId'));
    formTemplate.appendTo(commentBlock)
    
    commentBlock.find('textarea').trigger('focus');
    commentBlock.addClass('active')
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hide()
});


jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-delete').on('click', function(e){
    e.preventDefault();

    var commentBlock = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parents('.post-container');
    var comment_id = commentBlock.data('commentId');

    // commentBlock.find('.menu-item .dropdown-wrap').remove();
    commentBlock.addClass('disabled');

    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        type: 'POST',
        url: '/photo/ajaxDeletePhotoComment/',
        data: {'id' : comment_id},
        success: function(msg){
            if(msg == 'success') {
                commentBlock.fadeOut('slow', function() {
                    commentBlock.remove();
                });
            }
            else {
                // var popup = new PopUp();
                // popup.setContent('<p>Произошла ошибка. Перезагрузите страницу.</p>');
                // popup.open();
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

jquery__WEBPACK_IMPORTED_MODULE_0___default()('.post-complain').on('click', function (e) {
    e.preventDefault();
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.showTroubleTicketForm)('PhotoComment', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('commentId'));
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
// console.log($.Jcrop)
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

/***/ }),

/***/ "./view.js":
/*!*****************!*\
  !*** ./view.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/view */ "./js/view.js");
/* harmony import */ var _styles_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/common */ "./styles/common.less");
/* harmony import */ var _styles_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/view */ "./styles/view.less");




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"view": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./view.js","vendors-node_modules_jquery_dist_jquery_js-node_modules_swiper_esm_components_core_core-class_js","styles_common_less-js_utils_js"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	__webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvdmlldy5sZXNzPzNlN2YiLCJ3ZWJwYWNrOi8vLy4vanMvbGlicy9qcXVlcnkuSmNyb3AuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbGlicy9saWdodGJveC5qcyIsIndlYnBhY2s6Ly8vLi9qcy92aWV3LmpzIiwid2VicGFjazovLy8uL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzQjtBQUN0Qjs7QUFFQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUNBQW1DLHNCQUFzQjtBQUN6RDs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTLHNEOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCOztBQUVBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekMsMEJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIscUJBQXFCO0FBQ3JCLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWCxpQkFBaUIsMEJBQTBCOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBLGdDQUFnQztBQUNoQyx1Q0FBdUM7QUFDdkMsc0NBQXNDO0FBQ3RDLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdURBQXVELGNBQWMsRUFBRTs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0NBQW9DO0FBQzdEO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSx1QkFBdUIsb0NBQW9DO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1Qiw4QkFBOEI7QUFDOUI7QUFDQTs7QUFFQTtBQUNBLENBQUMsQ0FBQywrQ0FBQzs7Ozs7Ozs7Ozs7QUM3cERIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLElBQTBDO0FBQ2xEO0FBQ0EsUUFBUSxpQ0FBTyxDQUFDLDBFQUFRLENBQUMsb0NBQUUsT0FBTztBQUFBO0FBQUE7QUFBQSxrR0FBQztBQUNuQyxLQUFLLE1BQU0sRUFRTjtBQUNMLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd2NBQXdjOztBQUV4YztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1aUJxQjtBQUNNO0FBQ2U7QUFRM0I7O0FBRWhCLDZDQUFDO0FBQ0Q7O0FBRUEsSUFBSSxrREFBVTs7QUFFZDs7QUFFQSxJQUFJLHFEQUFZO0FBQ2hCLElBQUksb0RBQVc7QUFDZjs7QUFFQSxrQkFBa0IsNkNBQUM7QUFDbkIsSUFBSSxvREFBVzs7QUFFZixJQUFJLG9EQUFXO0FBQ2Ysa0NBQWtDLG1EQUFXO0FBQzdDLElBQUkscURBQVk7QUFDaEI7O0FBRUEsSUFBSSw2Q0FBQztBQUNMO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBLFFBQVEsNkNBQUM7QUFDVCxZQUFZLDZDQUFDO0FBQ2IsWUFBWSw2Q0FBQztBQUNiLGdCQUFnQiw2Q0FBQztBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBOzs7QUFHQSxzQkFBc0IsNkNBQUM7O0FBRXZCLDZDQUFDO0FBQ0Q7O0FBRUEsSUFBSSw2Q0FBQztBQUNMLFNBQVMsNkNBQUM7QUFDVixRQUFRLDZDQUFDO0FBQ1Q7QUFDQSxDQUFDOztBQUVEOztBQUVBLG1CQUFtQiw2Q0FBQztBQUNwQixvQkFBb0IsNkNBQUM7O0FBRXJCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUEsNkNBQUM7O0FBRUQ7QUFDQSxtQkFBbUIsNkNBQUM7QUFDcEI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0EsSUFBSSw2Q0FBQzs7QUFFTDtBQUNBLFlBQVksNkNBQUM7QUFDYixZQUFZLDZDQUFDO0FBQ2IsWUFBWSw2Q0FBQztBQUNiOztBQUVBLEtBQUs7QUFDTCxJQUFJLDZDQUFDOztBQUVMLFFBQVEsNkNBQUM7QUFDVCxRQUFRLDZDQUFDOztBQUVULEtBQUs7QUFDTCxDQUFDOztBQUVEOztBQUVBLGtEQUFlO0FBQ2Y7QUFDQSxDQUFDOztBQUVEO0FBQ0EsNkNBQUM7O0FBRUQsbUJBQW1CLDZDQUFDO0FBQ3BCO0FBQ0E7QUFDQSxJQUFJLGtEQUFNO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsdUNBQXVDLDZDQUFDO0FBQ3hDO0FBQ0E7QUFDQSxvQkFBb0IsNkNBQUM7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0Esb0JBQW9CLDZDQUFDO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7Ozs7Ozs7QUFPRDs7QUFFQSw2Q0FBQztBQUNEOztBQUVBLFFBQVEsNkNBQUM7QUFDVDtBQUNBOztBQUVBLG1CQUFtQiw2Q0FBQztBQUNwQjtBQUNBOzs7QUFHQSxJQUFJLGtEQUFNO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7QUFDQSxnQkFBZ0IsNkNBQUM7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEOzs7O0FBSUE7O0FBRUEsNkNBQUM7QUFDRDtBQUNBO0FBQ0EsZUFBZSw2Q0FBQztBQUNoQixJQUFJLDhEQUFxQjtBQUN6QixDQUFDOztBQUVEOzs7Ozs7O0FBT0E7QUFDQTtBQUNBLFFBQVEsNkNBQUM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLDZDQUFDO0FBQzlCO0FBQ0EsSUFBSSw2Q0FBQztBQUNMO0FBQ0EseUVBQXlFLDZDQUFDO0FBQzFFLEtBQUs7QUFDTDtBQUNBOztBQUVBLDZCQUE2Qiw2Q0FBQztBQUM5QjtBQUNBLElBQUksNkNBQUM7QUFDTDtBQUNBLHlFQUF5RSw2Q0FBQztBQUMxRSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUEsNkNBQUM7QUFDRDs7QUFFQTtBQUNBLGlCQUFpQiw2Q0FBQzs7QUFFbEI7O0FBRUEsSUFBSSxrREFBTTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLENBQUM7O0FBRUQsNkNBQUM7QUFDRCxxQkFBcUIsNkNBQUM7QUFDdEIsSUFBSSxrREFBTTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDZDQUFDO0FBQ2pCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkNBQUM7QUFDakI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDZDQUFDO0FBQ3pCLHdCQUF3Qiw2Q0FBQztBQUN6Qix3QkFBd0IsNkNBQUM7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0Esd0JBQXdCLDZDQUFDO0FBQ3pCLHdCQUF3Qiw2Q0FBQztBQUN6Qix3QkFBd0IsNkNBQUM7QUFDekI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsNERBQTRELFVBQVU7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsV0FBVyxNQUFNLG1CQUFtQjtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMLENBQUM7Ozs7O0FBS0QsNkNBQUM7QUFDRDs7QUFFQSxJQUFJLDZDQUFDO0FBQ0wsSUFBSSw2Q0FBQztBQUNMLElBQUksNkNBQUM7O0FBRUwseUJBQXlCLDZDQUFDLGtEO0FBQzFCLHlCQUF5Qiw2Q0FBQztBQUMxQjtBQUNBLElBQUksNkNBQUM7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsSUFBSSw2Q0FBQztBQUNMLENBQUM7OztBQUdELDZDQUFDO0FBQ0Q7O0FBRUEsdUJBQXVCLDZDQUFDO0FBQ3hCOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxrREFBTTtBQUNWO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7QUFFRCw2Q0FBQztBQUNEO0FBQ0EsSUFBSSw2REFBcUIsaUJBQWlCLDZDQUFDO0FBQzNDLENBQUM7OztBQUdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOzs7Ozs7Ozs7QUFTQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjs7Ozs7O0FBTUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7Ozs7OztBQU9BOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBOEQsSUFBSSxTQUFTLElBQUksU0FBUyxJQUFJLFNBQVMsSUFBSTtBQUN6RztBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0EsSUFBSSxFOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJFQUEyRSxZQUFZLFlBQVk7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RUFBOEUsY0FBYztBQUM1RjtBQUNBO0FBQ0E7O0FBRUEsa0ZBQWtGLFlBQVksWUFBWTtBQUMxRztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTs7Ozs7O0FBTUE7QUFDQSxDQUFDLEc7Ozs7Ozs7Ozs7Ozs7OztBQ3RsQmlCO0FBQ007Ozs7Ozs7VUNEeEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0sb0JBQW9CO1dBQzFCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0M7V0FDQTtXQUNBLGdCQUFnQiwyQkFBMkI7V0FDM0M7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLDRDQUE0QztXQUM1QztXQUNBLEU7Ozs7VUNwRkE7VUFDQSIsImZpbGUiOiJqcy92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyoqXG4gKiBqcXVlcnkuSmNyb3AuanMgdjAuOS4xNVxuICogalF1ZXJ5IEltYWdlIENyb3BwaW5nIFBsdWdpbiAtIHJlbGVhc2VkIHVuZGVyIE1JVCBMaWNlbnNlIFxuICogQXV0aG9yOiBLZWxseSBIYWxsbWFuIDxraGFsbG1hbkBnbWFpbC5jb20+XG4gKiBodHRwOi8vZ2l0aHViLmNvbS90YXBtb2RvL0pjcm9wXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxOCBUYXBtb2RvIEludGVyYWN0aXZlIExMQyB7e3tcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuICogcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG4gKiBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG4gKiBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuICogY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuICogT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbiAqIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG4gKiBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbiAqIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuICogT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICpcbiAqIH19fVxuICovXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG4oZnVuY3Rpb24gKCQpIHtcblxuICAkLkpjcm9wID0gZnVuY3Rpb24gKG9iaiwgb3B0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC5KY3JvcC5kZWZhdWx0cyksXG4gICAgICAgIGRvY09mZnNldCxcbiAgICAgICAgX3VhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBpc19tc2llID0gL21zaWUvLnRlc3QoX3VhKSxcbiAgICAgICAgaWU2bW9kZSA9IC9tc2llIFsxLTZdXFwuLy50ZXN0KF91YSk7XG5cbiAgICAvLyBJbnRlcm5hbCBNZXRob2RzIHt7e1xuICAgIGZ1bmN0aW9uIHB4KG4pIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKG4pICsgJ3B4JztcbiAgICB9XG4gICAgZnVuY3Rpb24gY3NzQ2xhc3MoY2wpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmJhc2VDbGFzcyArICctJyArIGNsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdXBwb3J0c0NvbG9yRmFkZSgpIHtcbiAgICAgIHJldHVybiAkLmZ4LnN0ZXAuaGFzT3duUHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRQb3Mob2JqKSAvL3t7e1xuICAgIHtcbiAgICAgIHZhciBwb3MgPSAkKG9iaikub2Zmc2V0KCk7XG4gICAgICByZXR1cm4gW3Bvcy5sZWZ0LCBwb3MudG9wXTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiBtb3VzZUFicyhlKSAvL3t7e1xuICAgIHtcbiAgICAgIHJldHVybiBbKGUucGFnZVggLSBkb2NPZmZzZXRbMF0pLCAoZS5wYWdlWSAtIGRvY09mZnNldFsxXSldO1xuICAgIH1cbiAgICAvL319fVxuICAgIGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0KSAvL3t7e1xuICAgIHtcbiAgICAgIGlmICh0eXBlb2Yob3B0KSAhPT0gJ29iamVjdCcpIG9wdCA9IHt9O1xuICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKG9wdGlvbnMsIG9wdCk7XG5cbiAgICAgICQuZWFjaChbJ29uQ2hhbmdlJywnb25TZWxlY3QnLCdvblJlbGVhc2UnLCdvbkRibENsaWNrJ10sZnVuY3Rpb24oaSxlKSB7XG4gICAgICAgIGlmICh0eXBlb2Yob3B0aW9uc1tlXSkgIT09ICdmdW5jdGlvbicpIG9wdGlvbnNbZV0gPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvL319fVxuICAgIGZ1bmN0aW9uIHN0YXJ0RHJhZ01vZGUobW9kZSwgcG9zLCB0b3VjaCkgLy97e3tcbiAgICB7XG4gICAgICBkb2NPZmZzZXQgPSBnZXRQb3MoJGltZyk7XG4gICAgICBUcmFja2VyLnNldEN1cnNvcihtb2RlID09PSAnbW92ZScgPyBtb2RlIDogbW9kZSArICctcmVzaXplJyk7XG5cbiAgICAgIGlmIChtb2RlID09PSAnbW92ZScpIHtcbiAgICAgICAgcmV0dXJuIFRyYWNrZXIuYWN0aXZhdGVIYW5kbGVycyhjcmVhdGVNb3Zlcihwb3MpLCBkb25lU2VsZWN0LCB0b3VjaCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBmYyA9IENvb3Jkcy5nZXRGaXhlZCgpO1xuICAgICAgdmFyIG9wcCA9IG9wcExvY2tDb3JuZXIobW9kZSk7XG4gICAgICB2YXIgb3BjID0gQ29vcmRzLmdldENvcm5lcihvcHBMb2NrQ29ybmVyKG9wcCkpO1xuXG4gICAgICBDb29yZHMuc2V0UHJlc3NlZChDb29yZHMuZ2V0Q29ybmVyKG9wcCkpO1xuICAgICAgQ29vcmRzLnNldEN1cnJlbnQob3BjKTtcblxuICAgICAgVHJhY2tlci5hY3RpdmF0ZUhhbmRsZXJzKGRyYWdtb2RlSGFuZGxlcihtb2RlLCBmYyksIGRvbmVTZWxlY3QsIHRvdWNoKTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiBkcmFnbW9kZUhhbmRsZXIobW9kZSwgZikgLy97e3tcbiAgICB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHBvcykge1xuICAgICAgICBpZiAoIW9wdGlvbnMuYXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICBjYXNlICdlJzpcbiAgICAgICAgICAgIHBvc1sxXSA9IGYueTI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICAgIHBvc1sxXSA9IGYueTI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduJzpcbiAgICAgICAgICAgIHBvc1swXSA9IGYueDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgIHBvc1swXSA9IGYueDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgY2FzZSAnZSc6XG4gICAgICAgICAgICBwb3NbMV0gPSBmLnkgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICBwb3NbMV0gPSBmLnkgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbic6XG4gICAgICAgICAgICBwb3NbMF0gPSBmLnggKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICBwb3NbMF0gPSBmLnggKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIENvb3Jkcy5zZXRDdXJyZW50KHBvcyk7XG4gICAgICAgIFNlbGVjdGlvbi51cGRhdGUoKTtcbiAgICAgIH07XG4gICAgfVxuICAgIC8vfX19XG4gICAgZnVuY3Rpb24gY3JlYXRlTW92ZXIocG9zKSAvL3t7e1xuICAgIHtcbiAgICAgIHZhciBsbG9jID0gcG9zO1xuICAgICAgS2V5TWFuYWdlci53YXRjaEtleXMoKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgQ29vcmRzLm1vdmVPZmZzZXQoW3Bvc1swXSAtIGxsb2NbMF0sIHBvc1sxXSAtIGxsb2NbMV1dKTtcbiAgICAgICAgbGxvYyA9IHBvcztcblxuICAgICAgICBTZWxlY3Rpb24udXBkYXRlKCk7XG4gICAgICB9O1xuICAgIH1cbiAgICAvL319fVxuICAgIGZ1bmN0aW9uIG9wcExvY2tDb3JuZXIob3JkKSAvL3t7e1xuICAgIHtcbiAgICAgIHN3aXRjaCAob3JkKSB7XG4gICAgICBjYXNlICduJzpcbiAgICAgICAgcmV0dXJuICdzdyc7XG4gICAgICBjYXNlICdzJzpcbiAgICAgICAgcmV0dXJuICdudyc7XG4gICAgICBjYXNlICdlJzpcbiAgICAgICAgcmV0dXJuICdudyc7XG4gICAgICBjYXNlICd3JzpcbiAgICAgICAgcmV0dXJuICduZSc7XG4gICAgICBjYXNlICduZSc6XG4gICAgICAgIHJldHVybiAnc3cnO1xuICAgICAgY2FzZSAnbncnOlxuICAgICAgICByZXR1cm4gJ3NlJztcbiAgICAgIGNhc2UgJ3NlJzpcbiAgICAgICAgcmV0dXJuICdudyc7XG4gICAgICBjYXNlICdzdyc6XG4gICAgICAgIHJldHVybiAnbmUnO1xuICAgICAgfVxuICAgIH1cbiAgICAvL319fVxuICAgIGZ1bmN0aW9uIGNyZWF0ZURyYWdnZXIob3JkKSAvL3t7e1xuICAgIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5kaXNhYmxlZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG9yZCA9PT0gJ21vdmUnKSAmJiAhb3B0aW9ucy5hbGxvd01vdmUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEZpeCBwb3NpdGlvbiBvZiBjcm9wIGFyZWEgd2hlbiBkcmFnZ2VkIHRoZSB2ZXJ5IGZpcnN0IHRpbWUuXG4gICAgICAgIC8vIE5lY2Vzc2FyeSB3aGVuIGNyb3AgaW1hZ2UgaXMgaW4gYSBoaWRkZW4gZWxlbWVudCB3aGVuIHBhZ2UgaXMgbG9hZGVkLlxuICAgICAgICBkb2NPZmZzZXQgPSBnZXRQb3MoJGltZyk7XG5cbiAgICAgICAgYnRuZG93biA9IHRydWU7XG4gICAgICAgIHN0YXJ0RHJhZ01vZGUob3JkLCBtb3VzZUFicyhlKSk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiBwcmVzaXplKCRvYmosIHcsIGgpIC8ve3t7XG4gICAge1xuICAgICAgdmFyIG53ID0gJG9iai53aWR0aCgpLFxuICAgICAgICAgIG5oID0gJG9iai5oZWlnaHQoKTtcbiAgICAgIGlmICgobncgPiB3KSAmJiB3ID4gMCkge1xuICAgICAgICBudyA9IHc7XG4gICAgICAgIG5oID0gKHcgLyAkb2JqLndpZHRoKCkpICogJG9iai5oZWlnaHQoKTtcbiAgICAgIH1cbiAgICAgIGlmICgobmggPiBoKSAmJiBoID4gMCkge1xuICAgICAgICBuaCA9IGg7XG4gICAgICAgIG53ID0gKGggLyAkb2JqLmhlaWdodCgpKSAqICRvYmoud2lkdGgoKTtcbiAgICAgIH1cbiAgICAgIHhzY2FsZSA9ICRvYmoud2lkdGgoKSAvIG53O1xuICAgICAgeXNjYWxlID0gJG9iai5oZWlnaHQoKSAvIG5oO1xuICAgICAgJG9iai53aWR0aChudykuaGVpZ2h0KG5oKTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiB1bnNjYWxlKGMpIC8ve3t7XG4gICAge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogYy54ICogeHNjYWxlLFxuICAgICAgICB5OiBjLnkgKiB5c2NhbGUsXG4gICAgICAgIHgyOiBjLngyICogeHNjYWxlLFxuICAgICAgICB5MjogYy55MiAqIHlzY2FsZSxcbiAgICAgICAgdzogYy53ICogeHNjYWxlLFxuICAgICAgICBoOiBjLmggKiB5c2NhbGVcbiAgICAgIH07XG4gICAgfVxuICAgIC8vfX19XG4gICAgZnVuY3Rpb24gZG9uZVNlbGVjdChwb3MpIC8ve3t7XG4gICAge1xuICAgICAgdmFyIGMgPSBDb29yZHMuZ2V0Rml4ZWQoKTtcbiAgICAgIGlmICgoYy53ID4gb3B0aW9ucy5taW5TZWxlY3RbMF0pICYmIChjLmggPiBvcHRpb25zLm1pblNlbGVjdFsxXSkpIHtcbiAgICAgICAgU2VsZWN0aW9uLmVuYWJsZUhhbmRsZXMoKTtcbiAgICAgICAgU2VsZWN0aW9uLmRvbmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNlbGVjdGlvbi5yZWxlYXNlKCk7XG4gICAgICB9XG4gICAgICBUcmFja2VyLnNldEN1cnNvcihvcHRpb25zLmFsbG93U2VsZWN0ID8gJ2Nyb3NzaGFpcicgOiAnZGVmYXVsdCcpO1xuICAgIH1cbiAgICAvL319fVxuICAgIGZ1bmN0aW9uIG5ld1NlbGVjdGlvbihlKSAvL3t7e1xuICAgIHtcbiAgICAgIGlmIChvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghb3B0aW9ucy5hbGxvd1NlbGVjdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidG5kb3duID0gdHJ1ZTtcbiAgICAgIGRvY09mZnNldCA9IGdldFBvcygkaW1nKTtcbiAgICAgIFNlbGVjdGlvbi5kaXNhYmxlSGFuZGxlcygpO1xuICAgICAgVHJhY2tlci5zZXRDdXJzb3IoJ2Nyb3NzaGFpcicpO1xuICAgICAgdmFyIHBvcyA9IG1vdXNlQWJzKGUpO1xuICAgICAgQ29vcmRzLnNldFByZXNzZWQocG9zKTtcbiAgICAgIFNlbGVjdGlvbi51cGRhdGUoKTtcbiAgICAgIFRyYWNrZXIuYWN0aXZhdGVIYW5kbGVycyhzZWxlY3REcmFnLCBkb25lU2VsZWN0LCBlLnR5cGUuc3Vic3RyaW5nKDAsNSk9PT0ndG91Y2gnKTtcbiAgICAgIEtleU1hbmFnZXIud2F0Y2hLZXlzKCk7XG5cbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vfX19XG4gICAgZnVuY3Rpb24gc2VsZWN0RHJhZyhwb3MpIC8ve3t7XG4gICAge1xuICAgICAgQ29vcmRzLnNldEN1cnJlbnQocG9zKTtcbiAgICAgIFNlbGVjdGlvbi51cGRhdGUoKTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiBuZXdUcmFja2VyKCkgLy97e3tcbiAgICB7XG4gICAgICB2YXIgdHJrID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcyhjc3NDbGFzcygndHJhY2tlcicpKTtcbiAgICAgIGlmIChpc19tc2llKSB7XG4gICAgICAgIHRyay5jc3Moe1xuICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRyaztcbiAgICB9XG4gICAgLy99fX1cblxuICAgIC8vIH19fVxuICAgIC8vIEluaXRpYWxpemF0aW9uIHt7e1xuICAgIC8vIFNhbml0aXplIHNvbWUgb3B0aW9ucyB7e3tcbiAgICBpZiAodHlwZW9mKG9iaikgIT09ICdvYmplY3QnKSB7XG4gICAgICBvYmogPSAkKG9iailbMF07XG4gICAgfVxuICAgIGlmICh0eXBlb2Yob3B0KSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdCA9IHt9O1xuICAgIH1cbiAgICAvLyB9fX1cbiAgICBzZXRPcHRpb25zKG9wdCk7XG4gICAgLy8gSW5pdGlhbGl6ZSBzb21lIGpRdWVyeSBvYmplY3RzIHt7e1xuICAgIC8vIFRoZSB2YWx1ZXMgYXJlIFNFVCBvbiB0aGUgaW1hZ2UocykgZm9yIHRoZSBpbnRlcmZhY2VcbiAgICAvLyBJZiB0aGUgb3JpZ2luYWwgaW1hZ2UgaGFzIGFueSBvZiB0aGVzZSBzZXQsIHRoZXkgd2lsbCBiZSByZXNldFxuICAgIC8vIEhvd2V2ZXIsIGlmIHlvdSBkZXN0cm95KCkgdGhlIEpjcm9wIGluc3RhbmNlIHRoZSBvcmlnaW5hbCBpbWFnZSdzXG4gICAgLy8gY2hhcmFjdGVyIGluIHRoZSBET00gd2lsbCBiZSBhcyB5b3UgbGVmdCBpdC5cbiAgICB2YXIgaW1nX2NzcyA9IHtcbiAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMFxuICAgIH07XG5cbiAgICB2YXIgJG9yaWdpbWcgPSAkKG9iaiksXG4gICAgICBpbWdfbW9kZSA9IHRydWU7XG5cbiAgICBpZiAob2JqLnRhZ05hbWUgPT0gJ0lNRycpIHtcbiAgICAgIC8vIEZpeCBzaXplIG9mIGNyb3AgaW1hZ2UuXG4gICAgICAvLyBOZWNlc3Nhcnkgd2hlbiBjcm9wIGltYWdlIGlzIHdpdGhpbiBhIGhpZGRlbiBlbGVtZW50IHdoZW4gcGFnZSBpcyBsb2FkZWQuXG4gICAgICBpZiAoJG9yaWdpbWdbMF0ud2lkdGggIT0gMCAmJiAkb3JpZ2ltZ1swXS5oZWlnaHQgIT0gMCkge1xuICAgICAgICAvLyBPYnRhaW4gZGltZW5zaW9ucyBmcm9tIGNvbnRhaW5lZCBpbWcgZWxlbWVudC5cbiAgICAgICAgJG9yaWdpbWcud2lkdGgoJG9yaWdpbWdbMF0ud2lkdGgpO1xuICAgICAgICAkb3JpZ2ltZy5oZWlnaHQoJG9yaWdpbWdbMF0uaGVpZ2h0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE9idGFpbiBkaW1lbnNpb25zIGZyb20gdGVtcG9yYXJ5IGltYWdlIGluIGNhc2UgdGhlIG9yaWdpbmFsIGlzIG5vdCBsb2FkZWQgeWV0IChlLmcuIElFIDcuMCkuIFxuICAgICAgICB2YXIgdGVtcEltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRlbXBJbWFnZS5zcmMgPSAkb3JpZ2ltZ1swXS5zcmM7XG4gICAgICAgICRvcmlnaW1nLndpZHRoKHRlbXBJbWFnZS53aWR0aCk7XG4gICAgICAgICRvcmlnaW1nLmhlaWdodCh0ZW1wSW1hZ2UuaGVpZ2h0KTtcbiAgICAgIH0gXG5cbiAgICAgIHZhciAkaW1nID0gJG9yaWdpbWcuY2xvbmUoKS5yZW1vdmVBdHRyKCdpZCcpLmNzcyhpbWdfY3NzKS5zaG93KCk7XG5cbiAgICAgICRpbWcud2lkdGgoJG9yaWdpbWcud2lkdGgoKSk7XG4gICAgICAkaW1nLmhlaWdodCgkb3JpZ2ltZy5oZWlnaHQoKSk7XG4gICAgICAkb3JpZ2ltZy5hZnRlcigkaW1nKS5oaWRlKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgJGltZyA9ICRvcmlnaW1nLmNzcyhpbWdfY3NzKS5zaG93KCk7XG4gICAgICBpbWdfbW9kZSA9IGZhbHNlO1xuICAgICAgaWYgKG9wdGlvbnMuc2hhZGUgPT09IG51bGwpIHsgb3B0aW9ucy5zaGFkZSA9IHRydWU7IH1cbiAgICB9XG5cbiAgICBwcmVzaXplKCRpbWcsIG9wdGlvbnMuYm94V2lkdGgsIG9wdGlvbnMuYm94SGVpZ2h0KTtcblxuICAgIHZhciBib3VuZHggPSAkaW1nLndpZHRoKCksXG4gICAgICAgIGJvdW5keSA9ICRpbWcuaGVpZ2h0KCksXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgJGRpdiA9ICQoJzxkaXYgLz4nKS53aWR0aChib3VuZHgpLmhlaWdodChib3VuZHkpLmFkZENsYXNzKGNzc0NsYXNzKCdob2xkZXInKSkuY3NzKHtcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogb3B0aW9ucy5iZ0NvbG9yXG4gICAgICB9KS5pbnNlcnRBZnRlcigkb3JpZ2ltZykuYXBwZW5kKCRpbWcpO1xuXG4gICAgaWYgKG9wdGlvbnMuYWRkQ2xhc3MpIHtcbiAgICAgICRkaXYuYWRkQ2xhc3Mob3B0aW9ucy5hZGRDbGFzcyk7XG4gICAgfVxuXG4gICAgdmFyICRpbWcyID0gJCgnPGRpdiAvPicpLFxuXG4gICAgICAgICRpbWdfaG9sZGVyID0gJCgnPGRpdiAvPicpIFxuICAgICAgICAud2lkdGgoJzEwMCUnKS5oZWlnaHQoJzEwMCUnKS5jc3Moe1xuICAgICAgICAgIHpJbmRleDogMzEwLFxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgICAgICB9KSxcblxuICAgICAgICAkaGRsX2hvbGRlciA9ICQoJzxkaXYgLz4nKSBcbiAgICAgICAgLndpZHRoKCcxMDAlJykuaGVpZ2h0KCcxMDAlJykuY3NzKCd6SW5kZXgnLCAzMjApLCBcblxuICAgICAgICAkc2VsID0gJCgnPGRpdiAvPicpIFxuICAgICAgICAuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB6SW5kZXg6IDYwMFxuICAgICAgICB9KS5kYmxjbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciBjID0gQ29vcmRzLmdldEZpeGVkKCk7XG4gICAgICAgICAgb3B0aW9ucy5vbkRibENsaWNrLmNhbGwoYXBpLGMpO1xuICAgICAgICB9KS5pbnNlcnRCZWZvcmUoJGltZykuYXBwZW5kKCRpbWdfaG9sZGVyLCAkaGRsX2hvbGRlcik7IFxuXG4gICAgaWYgKGltZ19tb2RlKSB7XG5cbiAgICAgICRpbWcyID0gJCgnPGltZyAvPicpXG4gICAgICAgICAgLmF0dHIoJ3NyYycsICRpbWcuYXR0cignc3JjJykpLmNzcyhpbWdfY3NzKS53aWR0aChib3VuZHgpLmhlaWdodChib3VuZHkpLFxuXG4gICAgICAkaW1nX2hvbGRlci5hcHBlbmQoJGltZzIpO1xuXG4gICAgfVxuXG4gICAgaWYgKGllNm1vZGUpIHtcbiAgICAgICRzZWwuY3NzKHtcbiAgICAgICAgb3ZlcmZsb3dZOiAnaGlkZGVuJ1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kID0gb3B0aW9ucy5ib3VuZGFyeTtcbiAgICB2YXIgJHRyayA9IG5ld1RyYWNrZXIoKS53aWR0aChib3VuZHggKyAoYm91bmQgKiAyKSkuaGVpZ2h0KGJvdW5keSArIChib3VuZCAqIDIpKS5jc3Moe1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6IHB4KC1ib3VuZCksXG4gICAgICBsZWZ0OiBweCgtYm91bmQpLFxuICAgICAgekluZGV4OiAyOTBcbiAgICB9KS5tb3VzZWRvd24obmV3U2VsZWN0aW9uKTtcblxuICAgIC8qIH19fSAqL1xuICAgIC8vIFNldCBtb3JlIHZhcmlhYmxlcyB7e3tcbiAgICB2YXIgYmdjb2xvciA9IG9wdGlvbnMuYmdDb2xvcixcbiAgICAgICAgYmdvcGFjaXR5ID0gb3B0aW9ucy5iZ09wYWNpdHksXG4gICAgICAgIHhsaW1pdCwgeWxpbWl0LCB4bWluLCB5bWluLCB4c2NhbGUsIHlzY2FsZSwgZW5hYmxlZCA9IHRydWUsXG4gICAgICAgIGJ0bmRvd24sIGFuaW1hdGluZywgc2hpZnRfZG93bjtcblxuICAgIGRvY09mZnNldCA9IGdldFBvcygkaW1nKTtcbiAgICAvLyB9fX1cbiAgICAvLyB9fX1cbiAgICAvLyBJbnRlcm5hbCBNb2R1bGVzIHt7e1xuICAgIC8vIFRvdWNoIE1vZHVsZSB7e3sgXG4gICAgdmFyIFRvdWNoID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFRvdWNoIHN1cHBvcnQgZGV0ZWN0aW9uIGZ1bmN0aW9uIGFkYXB0ZWQgKHVuZGVyIE1JVCBMaWNlbnNlKVxuICAgICAgLy8gZnJvbSBjb2RlIGJ5IEplZmZyZXkgU2FtYmVsbHMgLSBodHRwOi8vZ2l0aHViLmNvbS9pYW1hbXVzZWQvXG4gICAgICBmdW5jdGlvbiBoYXNUb3VjaFN1cHBvcnQoKSB7XG4gICAgICAgIHZhciBzdXBwb3J0ID0ge30sIGV2ZW50cyA9IFsndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnXSxcbiAgICAgICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIGk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IoaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9ICdvbicgKyBldmVudE5hbWU7XG4gICAgICAgICAgICB2YXIgaXNTdXBwb3J0ZWQgPSAoZXZlbnROYW1lIGluIGVsKTtcbiAgICAgICAgICAgIGlmICghaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGV2ZW50TmFtZSwgJ3JldHVybjsnKTtcbiAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZWxbZXZlbnROYW1lXSA9PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VwcG9ydFtldmVudHNbaV1dID0gaXNTdXBwb3J0ZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdXBwb3J0LnRvdWNoc3RhcnQgJiYgc3VwcG9ydC50b3VjaGVuZCAmJiBzdXBwb3J0LnRvdWNobW92ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGV0ZWN0U3VwcG9ydCgpIHtcbiAgICAgICAgaWYgKChvcHRpb25zLnRvdWNoU3VwcG9ydCA9PT0gdHJ1ZSkgfHwgKG9wdGlvbnMudG91Y2hTdXBwb3J0ID09PSBmYWxzZSkpIHJldHVybiBvcHRpb25zLnRvdWNoU3VwcG9ydDtcbiAgICAgICAgICBlbHNlIHJldHVybiBoYXNUb3VjaFN1cHBvcnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZURyYWdnZXI6IGZ1bmN0aW9uIChvcmQpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob3JkID09PSAnbW92ZScpICYmICFvcHRpb25zLmFsbG93TW92ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2NPZmZzZXQgPSBnZXRQb3MoJGltZyk7XG4gICAgICAgICAgICBidG5kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0YXJ0RHJhZ01vZGUob3JkLCBtb3VzZUFicyhUb3VjaC5jZmlsdGVyKGUpKSwgdHJ1ZSk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG5ld1NlbGVjdGlvbjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gbmV3U2VsZWN0aW9uKFRvdWNoLmNmaWx0ZXIoZSkpO1xuICAgICAgICB9LFxuICAgICAgICBjZmlsdGVyOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgZS5wYWdlWCA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICBlLnBhZ2VZID0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9LFxuICAgICAgICBpc1N1cHBvcnRlZDogaGFzVG91Y2hTdXBwb3J0LFxuICAgICAgICBzdXBwb3J0OiBkZXRlY3RTdXBwb3J0KClcbiAgICAgIH07XG4gICAgfSgpKTtcbiAgICAvLyB9fX1cbiAgICAvLyBDb29yZHMgTW9kdWxlIHt7e1xuICAgIHZhciBDb29yZHMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHgxID0gMCxcbiAgICAgICAgICB5MSA9IDAsXG4gICAgICAgICAgeDIgPSAwLFxuICAgICAgICAgIHkyID0gMCxcbiAgICAgICAgICBveCwgb3k7XG5cbiAgICAgIGZ1bmN0aW9uIHNldFByZXNzZWQocG9zKSAvL3t7e1xuICAgICAge1xuICAgICAgICBwb3MgPSByZWJvdW5kKHBvcyk7XG4gICAgICAgIHgyID0geDEgPSBwb3NbMF07XG4gICAgICAgIHkyID0geTEgPSBwb3NbMV07XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gc2V0Q3VycmVudChwb3MpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIHBvcyA9IHJlYm91bmQocG9zKTtcbiAgICAgICAgb3ggPSBwb3NbMF0gLSB4MjtcbiAgICAgICAgb3kgPSBwb3NbMV0gLSB5MjtcbiAgICAgICAgeDIgPSBwb3NbMF07XG4gICAgICAgIHkyID0gcG9zWzFdO1xuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIGdldE9mZnNldCgpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIHJldHVybiBbb3gsIG95XTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBtb3ZlT2Zmc2V0KG9mZnNldCkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgdmFyIG94ID0gb2Zmc2V0WzBdLFxuICAgICAgICAgICAgb3kgPSBvZmZzZXRbMV07XG5cbiAgICAgICAgaWYgKDAgPiB4MSArIG94KSB7XG4gICAgICAgICAgb3ggLT0gb3ggKyB4MTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoMCA+IHkxICsgb3kpIHtcbiAgICAgICAgICBveSAtPSBveSArIHkxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvdW5keSA8IHkyICsgb3kpIHtcbiAgICAgICAgICBveSArPSBib3VuZHkgLSAoeTIgKyBveSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvdW5keCA8IHgyICsgb3gpIHtcbiAgICAgICAgICBveCArPSBib3VuZHggLSAoeDIgKyBveCk7XG4gICAgICAgIH1cblxuICAgICAgICB4MSArPSBveDtcbiAgICAgICAgeDIgKz0gb3g7XG4gICAgICAgIHkxICs9IG95O1xuICAgICAgICB5MiArPSBveTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBnZXRDb3JuZXIob3JkKSAvL3t7e1xuICAgICAge1xuICAgICAgICB2YXIgYyA9IGdldEZpeGVkKCk7XG4gICAgICAgIHN3aXRjaCAob3JkKSB7XG4gICAgICAgIGNhc2UgJ25lJzpcbiAgICAgICAgICByZXR1cm4gW2MueDIsIGMueV07XG4gICAgICAgIGNhc2UgJ253JzpcbiAgICAgICAgICByZXR1cm4gW2MueCwgYy55XTtcbiAgICAgICAgY2FzZSAnc2UnOlxuICAgICAgICAgIHJldHVybiBbYy54MiwgYy55Ml07XG4gICAgICAgIGNhc2UgJ3N3JzpcbiAgICAgICAgICByZXR1cm4gW2MueCwgYy55Ml07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBnZXRGaXhlZCgpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIGlmICghb3B0aW9ucy5hc3BlY3RSYXRpbykge1xuICAgICAgICAgIHJldHVybiBnZXRSZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBmdW5jdGlvbiBjb3VsZCB1c2Ugc29tZSBvcHRpbWl6YXRpb24gSSB0aGluay4uLlxuICAgICAgICB2YXIgYXNwZWN0ID0gb3B0aW9ucy5hc3BlY3RSYXRpbyxcbiAgICAgICAgICAgIG1pbl94ID0gb3B0aW9ucy5taW5TaXplWzBdIC8geHNjYWxlLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vbWluX3kgPSBvcHRpb25zLm1pblNpemVbMV0veXNjYWxlLFxuICAgICAgICAgICAgbWF4X3ggPSBvcHRpb25zLm1heFNpemVbMF0gLyB4c2NhbGUsXG4gICAgICAgICAgICBtYXhfeSA9IG9wdGlvbnMubWF4U2l6ZVsxXSAvIHlzY2FsZSxcbiAgICAgICAgICAgIHJ3ID0geDIgLSB4MSxcbiAgICAgICAgICAgIHJoID0geTIgLSB5MSxcbiAgICAgICAgICAgIHJ3YSA9IE1hdGguYWJzKHJ3KSxcbiAgICAgICAgICAgIHJoYSA9IE1hdGguYWJzKHJoKSxcbiAgICAgICAgICAgIHJlYWxfcmF0aW8gPSByd2EgLyByaGEsXG4gICAgICAgICAgICB4eCwgeXksIHcsIGg7XG5cbiAgICAgICAgaWYgKG1heF94ID09PSAwKSB7XG4gICAgICAgICAgbWF4X3ggPSBib3VuZHggKiAxMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4X3kgPT09IDApIHtcbiAgICAgICAgICBtYXhfeSA9IGJvdW5keSAqIDEwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFsX3JhdGlvIDwgYXNwZWN0KSB7XG4gICAgICAgICAgeXkgPSB5MjtcbiAgICAgICAgICB3ID0gcmhhICogYXNwZWN0O1xuICAgICAgICAgIHh4ID0gcncgPCAwID8geDEgLSB3IDogdyArIHgxO1xuXG4gICAgICAgICAgaWYgKHh4IDwgMCkge1xuICAgICAgICAgICAgeHggPSAwO1xuICAgICAgICAgICAgaCA9IE1hdGguYWJzKCh4eCAtIHgxKSAvIGFzcGVjdCk7XG4gICAgICAgICAgICB5eSA9IHJoIDwgMCA/IHkxIC0gaCA6IGggKyB5MTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHh4ID4gYm91bmR4KSB7XG4gICAgICAgICAgICB4eCA9IGJvdW5keDtcbiAgICAgICAgICAgIGggPSBNYXRoLmFicygoeHggLSB4MSkgLyBhc3BlY3QpO1xuICAgICAgICAgICAgeXkgPSByaCA8IDAgPyB5MSAtIGggOiBoICsgeTE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHh4ID0geDI7XG4gICAgICAgICAgaCA9IHJ3YSAvIGFzcGVjdDtcbiAgICAgICAgICB5eSA9IHJoIDwgMCA/IHkxIC0gaCA6IHkxICsgaDtcbiAgICAgICAgICBpZiAoeXkgPCAwKSB7XG4gICAgICAgICAgICB5eSA9IDA7XG4gICAgICAgICAgICB3ID0gTWF0aC5hYnMoKHl5IC0geTEpICogYXNwZWN0KTtcbiAgICAgICAgICAgIHh4ID0gcncgPCAwID8geDEgLSB3IDogdyArIHgxO1xuICAgICAgICAgIH0gZWxzZSBpZiAoeXkgPiBib3VuZHkpIHtcbiAgICAgICAgICAgIHl5ID0gYm91bmR5O1xuICAgICAgICAgICAgdyA9IE1hdGguYWJzKHl5IC0geTEpICogYXNwZWN0O1xuICAgICAgICAgICAgeHggPSBydyA8IDAgPyB4MSAtIHcgOiB3ICsgeDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFnaWMgJS0pXG4gICAgICAgIGlmICh4eCA+IHgxKSB7IC8vIHJpZ2h0IHNpZGVcbiAgICAgICAgICBpZiAoeHggLSB4MSA8IG1pbl94KSB7XG4gICAgICAgICAgICB4eCA9IHgxICsgbWluX3g7XG4gICAgICAgICAgfSBlbHNlIGlmICh4eCAtIHgxID4gbWF4X3gpIHtcbiAgICAgICAgICAgIHh4ID0geDEgKyBtYXhfeDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHl5ID4geTEpIHtcbiAgICAgICAgICAgIHl5ID0geTEgKyAoeHggLSB4MSkgLyBhc3BlY3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHl5ID0geTEgLSAoeHggLSB4MSkgLyBhc3BlY3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHh4IDwgeDEpIHsgLy8gbGVmdCBzaWRlXG4gICAgICAgICAgaWYgKHgxIC0geHggPCBtaW5feCkge1xuICAgICAgICAgICAgeHggPSB4MSAtIG1pbl94O1xuICAgICAgICAgIH0gZWxzZSBpZiAoeDEgLSB4eCA+IG1heF94KSB7XG4gICAgICAgICAgICB4eCA9IHgxIC0gbWF4X3g7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh5eSA+IHkxKSB7XG4gICAgICAgICAgICB5eSA9IHkxICsgKHgxIC0geHgpIC8gYXNwZWN0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB5eSA9IHkxIC0gKHgxIC0geHgpIC8gYXNwZWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4eCA8IDApIHtcbiAgICAgICAgICB4MSAtPSB4eDtcbiAgICAgICAgICB4eCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoeHggPiBib3VuZHgpIHtcbiAgICAgICAgICB4MSAtPSB4eCAtIGJvdW5keDtcbiAgICAgICAgICB4eCA9IGJvdW5keDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5eSA8IDApIHtcbiAgICAgICAgICB5MSAtPSB5eTtcbiAgICAgICAgICB5eSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoeXkgPiBib3VuZHkpIHtcbiAgICAgICAgICB5MSAtPSB5eSAtIGJvdW5keTtcbiAgICAgICAgICB5eSA9IGJvdW5keTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYWtlT2JqKGZsaXBDb29yZHMoeDEsIHkxLCB4eCwgeXkpKTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiByZWJvdW5kKHApIC8ve3t7XG4gICAgICB7XG4gICAgICAgIGlmIChwWzBdIDwgMCkgcFswXSA9IDA7XG4gICAgICAgIGlmIChwWzFdIDwgMCkgcFsxXSA9IDA7XG5cbiAgICAgICAgaWYgKHBbMF0gPiBib3VuZHgpIHBbMF0gPSBib3VuZHg7XG4gICAgICAgIGlmIChwWzFdID4gYm91bmR5KSBwWzFdID0gYm91bmR5O1xuXG4gICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChwWzBdKSwgTWF0aC5yb3VuZChwWzFdKV07XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gZmxpcENvb3Jkcyh4MSwgeTEsIHgyLCB5MikgLy97e3tcbiAgICAgIHtcbiAgICAgICAgdmFyIHhhID0geDEsXG4gICAgICAgICAgICB4YiA9IHgyLFxuICAgICAgICAgICAgeWEgPSB5MSxcbiAgICAgICAgICAgIHliID0geTI7XG4gICAgICAgIGlmICh4MiA8IHgxKSB7XG4gICAgICAgICAgeGEgPSB4MjtcbiAgICAgICAgICB4YiA9IHgxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5MiA8IHkxKSB7XG4gICAgICAgICAgeWEgPSB5MjtcbiAgICAgICAgICB5YiA9IHkxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbeGEsIHlhLCB4YiwgeWJdO1xuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIGdldFJlY3QoKSAvL3t7e1xuICAgICAge1xuICAgICAgICB2YXIgeHNpemUgPSB4MiAtIHgxLFxuICAgICAgICAgICAgeXNpemUgPSB5MiAtIHkxLFxuICAgICAgICAgICAgZGVsdGE7XG5cbiAgICAgICAgaWYgKHhsaW1pdCAmJiAoTWF0aC5hYnMoeHNpemUpID4geGxpbWl0KSkge1xuICAgICAgICAgIHgyID0gKHhzaXplID4gMCkgPyAoeDEgKyB4bGltaXQpIDogKHgxIC0geGxpbWl0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeWxpbWl0ICYmIChNYXRoLmFicyh5c2l6ZSkgPiB5bGltaXQpKSB7XG4gICAgICAgICAgeTIgPSAoeXNpemUgPiAwKSA/ICh5MSArIHlsaW1pdCkgOiAoeTEgLSB5bGltaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHltaW4gLyB5c2NhbGUgJiYgKE1hdGguYWJzKHlzaXplKSA8IHltaW4gLyB5c2NhbGUpKSB7XG4gICAgICAgICAgeTIgPSAoeXNpemUgPiAwKSA/ICh5MSArIHltaW4gLyB5c2NhbGUpIDogKHkxIC0geW1pbiAvIHlzY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHhtaW4gLyB4c2NhbGUgJiYgKE1hdGguYWJzKHhzaXplKSA8IHhtaW4gLyB4c2NhbGUpKSB7XG4gICAgICAgICAgeDIgPSAoeHNpemUgPiAwKSA/ICh4MSArIHhtaW4gLyB4c2NhbGUpIDogKHgxIC0geG1pbiAvIHhzY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeDEgPCAwKSB7XG4gICAgICAgICAgeDIgLT0geDE7XG4gICAgICAgICAgeDEgLT0geDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkxIDwgMCkge1xuICAgICAgICAgIHkyIC09IHkxO1xuICAgICAgICAgIHkxIC09IHkxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4MiA8IDApIHtcbiAgICAgICAgICB4MSAtPSB4MjtcbiAgICAgICAgICB4MiAtPSB4MjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeTIgPCAwKSB7XG4gICAgICAgICAgeTEgLT0geTI7XG4gICAgICAgICAgeTIgLT0geTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHgyID4gYm91bmR4KSB7XG4gICAgICAgICAgZGVsdGEgPSB4MiAtIGJvdW5keDtcbiAgICAgICAgICB4MSAtPSBkZWx0YTtcbiAgICAgICAgICB4MiAtPSBkZWx0YTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeTIgPiBib3VuZHkpIHtcbiAgICAgICAgICBkZWx0YSA9IHkyIC0gYm91bmR5O1xuICAgICAgICAgIHkxIC09IGRlbHRhO1xuICAgICAgICAgIHkyIC09IGRlbHRhO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4MSA+IGJvdW5keCkge1xuICAgICAgICAgIGRlbHRhID0geDEgLSBib3VuZHk7XG4gICAgICAgICAgeTIgLT0gZGVsdGE7XG4gICAgICAgICAgeTEgLT0gZGVsdGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkxID4gYm91bmR5KSB7XG4gICAgICAgICAgZGVsdGEgPSB5MSAtIGJvdW5keTtcbiAgICAgICAgICB5MiAtPSBkZWx0YTtcbiAgICAgICAgICB5MSAtPSBkZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYWtlT2JqKGZsaXBDb29yZHMoeDEsIHkxLCB4MiwgeTIpKTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBtYWtlT2JqKGEpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogYVswXSxcbiAgICAgICAgICB5OiBhWzFdLFxuICAgICAgICAgIHgyOiBhWzJdLFxuICAgICAgICAgIHkyOiBhWzNdLFxuICAgICAgICAgIHc6IGFbMl0gLSBhWzBdLFxuICAgICAgICAgIGg6IGFbM10gLSBhWzFdXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvL319fVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBmbGlwQ29vcmRzOiBmbGlwQ29vcmRzLFxuICAgICAgICBzZXRQcmVzc2VkOiBzZXRQcmVzc2VkLFxuICAgICAgICBzZXRDdXJyZW50OiBzZXRDdXJyZW50LFxuICAgICAgICBnZXRPZmZzZXQ6IGdldE9mZnNldCxcbiAgICAgICAgbW92ZU9mZnNldDogbW92ZU9mZnNldCxcbiAgICAgICAgZ2V0Q29ybmVyOiBnZXRDb3JuZXIsXG4gICAgICAgIGdldEZpeGVkOiBnZXRGaXhlZFxuICAgICAgfTtcbiAgICB9KCkpO1xuXG4gICAgLy99fX1cbiAgICAvLyBTaGFkZSBNb2R1bGUge3t7XG4gICAgdmFyIFNoYWRlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVuYWJsZWQgPSBmYWxzZSxcbiAgICAgICAgICBob2xkZXIgPSAkKCc8ZGl2IC8+JykuY3NzKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgekluZGV4OiAyNDAsXG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgfSksXG4gICAgICAgICAgc2hhZGVzID0ge1xuICAgICAgICAgICAgdG9wOiBjcmVhdGVTaGFkZSgpLFxuICAgICAgICAgICAgbGVmdDogY3JlYXRlU2hhZGUoKS5oZWlnaHQoYm91bmR5KSxcbiAgICAgICAgICAgIHJpZ2h0OiBjcmVhdGVTaGFkZSgpLmhlaWdodChib3VuZHkpLFxuICAgICAgICAgICAgYm90dG9tOiBjcmVhdGVTaGFkZSgpXG4gICAgICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gcmVzaXplU2hhZGVzKHcsaCkge1xuICAgICAgICBzaGFkZXMubGVmdC5jc3MoeyBoZWlnaHQ6IHB4KGgpIH0pO1xuICAgICAgICBzaGFkZXMucmlnaHQuY3NzKHsgaGVpZ2h0OiBweChoKSB9KTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZUF1dG8oKVxuICAgICAge1xuICAgICAgICByZXR1cm4gdXBkYXRlU2hhZGUoQ29vcmRzLmdldEZpeGVkKCkpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gdXBkYXRlU2hhZGUoYylcbiAgICAgIHtcbiAgICAgICAgc2hhZGVzLnRvcC5jc3Moe1xuICAgICAgICAgIGxlZnQ6IHB4KGMueCksXG4gICAgICAgICAgd2lkdGg6IHB4KGMudyksXG4gICAgICAgICAgaGVpZ2h0OiBweChjLnkpXG4gICAgICAgIH0pO1xuICAgICAgICBzaGFkZXMuYm90dG9tLmNzcyh7XG4gICAgICAgICAgdG9wOiBweChjLnkyKSxcbiAgICAgICAgICBsZWZ0OiBweChjLngpLFxuICAgICAgICAgIHdpZHRoOiBweChjLncpLFxuICAgICAgICAgIGhlaWdodDogcHgoYm91bmR5LWMueTIpXG4gICAgICAgIH0pO1xuICAgICAgICBzaGFkZXMucmlnaHQuY3NzKHtcbiAgICAgICAgICBsZWZ0OiBweChjLngyKSxcbiAgICAgICAgICB3aWR0aDogcHgoYm91bmR4LWMueDIpXG4gICAgICAgIH0pO1xuICAgICAgICBzaGFkZXMubGVmdC5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBweChjLngpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gY3JlYXRlU2hhZGUoKSB7XG4gICAgICAgIHJldHVybiAkKCc8ZGl2IC8+JykuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMuc2hhZGVDb2xvcnx8b3B0aW9ucy5iZ0NvbG9yXG4gICAgICAgIH0pLmFwcGVuZFRvKGhvbGRlcik7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBlbmFibGVTaGFkZSgpIHtcbiAgICAgICAgaWYgKCFlbmFibGVkKSB7XG4gICAgICAgICAgZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgaG9sZGVyLmluc2VydEJlZm9yZSgkaW1nKTtcbiAgICAgICAgICB1cGRhdGVBdXRvKCk7XG4gICAgICAgICAgU2VsZWN0aW9uLnNldEJnT3BhY2l0eSgxLDAsMSk7XG4gICAgICAgICAgJGltZzIuaGlkZSgpO1xuXG4gICAgICAgICAgc2V0QmdDb2xvcihvcHRpb25zLnNoYWRlQ29sb3J8fG9wdGlvbnMuYmdDb2xvciwxKTtcbiAgICAgICAgICBpZiAoU2VsZWN0aW9uLmlzQXdha2UoKSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZXRPcGFjaXR5KG9wdGlvbnMuYmdPcGFjaXR5LDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Ugc2V0T3BhY2l0eSgxLDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBzZXRCZ0NvbG9yKGNvbG9yLG5vdykge1xuICAgICAgICBjb2xvckNoYW5nZU1hY3JvKGdldFNoYWRlcygpLGNvbG9yLG5vdyk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBkaXNhYmxlU2hhZGUoKSB7XG4gICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgaG9sZGVyLnJlbW92ZSgpO1xuICAgICAgICAgICRpbWcyLnNob3coKTtcbiAgICAgICAgICBlbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgaWYgKFNlbGVjdGlvbi5pc0F3YWtlKCkpIHtcbiAgICAgICAgICAgIFNlbGVjdGlvbi5zZXRCZ09wYWNpdHkob3B0aW9ucy5iZ09wYWNpdHksMSwxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgU2VsZWN0aW9uLnNldEJnT3BhY2l0eSgxLDEsMSk7XG4gICAgICAgICAgICBTZWxlY3Rpb24uZGlzYWJsZUhhbmRsZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29sb3JDaGFuZ2VNYWNybygkZGl2LDAsMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHNldE9wYWNpdHkob3BhY2l0eSxub3cpIHtcbiAgICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5iZ0ZhZGUgJiYgIW5vdykge1xuICAgICAgICAgICAgaG9sZGVyLmFuaW1hdGUoe1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxLW9wYWNpdHlcbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmZhZGVUaW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBob2xkZXIuY3NzKHtvcGFjaXR5OjEtb3BhY2l0eX0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiByZWZyZXNoQWxsKCkge1xuICAgICAgICBvcHRpb25zLnNoYWRlID8gZW5hYmxlU2hhZGUoKSA6IGRpc2FibGVTaGFkZSgpO1xuICAgICAgICBpZiAoU2VsZWN0aW9uLmlzQXdha2UoKSkgc2V0T3BhY2l0eShvcHRpb25zLmJnT3BhY2l0eSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBnZXRTaGFkZXMoKSB7XG4gICAgICAgIHJldHVybiBob2xkZXIuY2hpbGRyZW4oKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXBkYXRlOiB1cGRhdGVBdXRvLFxuICAgICAgICB1cGRhdGVSYXc6IHVwZGF0ZVNoYWRlLFxuICAgICAgICBnZXRTaGFkZXM6IGdldFNoYWRlcyxcbiAgICAgICAgc2V0QmdDb2xvcjogc2V0QmdDb2xvcixcbiAgICAgICAgZW5hYmxlOiBlbmFibGVTaGFkZSxcbiAgICAgICAgZGlzYWJsZTogZGlzYWJsZVNoYWRlLFxuICAgICAgICByZXNpemU6IHJlc2l6ZVNoYWRlcyxcbiAgICAgICAgcmVmcmVzaDogcmVmcmVzaEFsbCxcbiAgICAgICAgb3BhY2l0eTogc2V0T3BhY2l0eVxuICAgICAgfTtcbiAgICB9KCkpO1xuICAgIC8vIH19fVxuICAgIC8vIFNlbGVjdGlvbiBNb2R1bGUge3t7XG4gICAgdmFyIFNlbGVjdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYXdha2UsXG4gICAgICAgICAgaGRlcCA9IDM3MCxcbiAgICAgICAgICBib3JkZXJzID0ge30sXG4gICAgICAgICAgaGFuZGxlID0ge30sXG4gICAgICAgICAgZHJhZ2JhciA9IHt9LFxuICAgICAgICAgIHNlZWhhbmRsZXMgPSBmYWxzZTtcblxuICAgICAgLy8gUHJpdmF0ZSBNZXRob2RzXG4gICAgICBmdW5jdGlvbiBpbnNlcnRCb3JkZXIodHlwZSkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgdmFyIGpxID0gJCgnPGRpdiAvPicpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgb3BhY2l0eTogb3B0aW9ucy5ib3JkZXJPcGFjaXR5XG4gICAgICAgIH0pLmFkZENsYXNzKGNzc0NsYXNzKHR5cGUpKTtcbiAgICAgICAgJGltZ19ob2xkZXIuYXBwZW5kKGpxKTtcbiAgICAgICAgcmV0dXJuIGpxO1xuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIGRyYWdEaXYob3JkLCB6aSkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgdmFyIGpxID0gJCgnPGRpdiAvPicpLm1vdXNlZG93bihjcmVhdGVEcmFnZ2VyKG9yZCkpLmNzcyh7XG4gICAgICAgICAgY3Vyc29yOiBvcmQgKyAnLXJlc2l6ZScsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgekluZGV4OiB6aVxuICAgICAgICB9KS5hZGRDbGFzcygnb3JkLScrb3JkKTtcblxuICAgICAgICBpZiAoVG91Y2guc3VwcG9ydCkge1xuICAgICAgICAgIGpxLmJpbmQoJ3RvdWNoc3RhcnQuamNyb3AnLCBUb3VjaC5jcmVhdGVEcmFnZ2VyKG9yZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgJGhkbF9ob2xkZXIuYXBwZW5kKGpxKTtcbiAgICAgICAgcmV0dXJuIGpxO1xuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIGluc2VydEhhbmRsZShvcmQpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIHZhciBocyA9IG9wdGlvbnMuaGFuZGxlU2l6ZSxcblxuICAgICAgICAgIGRpdiA9IGRyYWdEaXYob3JkLCBoZGVwKyspLmNzcyh7XG4gICAgICAgICAgICBvcGFjaXR5OiBvcHRpb25zLmhhbmRsZU9wYWNpdHlcbiAgICAgICAgICB9KS5hZGRDbGFzcyhjc3NDbGFzcygnaGFuZGxlJykpO1xuXG4gICAgICAgIGlmIChocykgeyBkaXYud2lkdGgoaHMpLmhlaWdodChocyk7IH1cblxuICAgICAgICByZXR1cm4gZGl2O1xuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIGluc2VydERyYWdiYXIob3JkKSAvL3t7e1xuICAgICAge1xuICAgICAgICByZXR1cm4gZHJhZ0RpdihvcmQsIGhkZXArKykuYWRkQ2xhc3MoJ2pjcm9wLWRyYWdiYXInKTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBjcmVhdGVEcmFnYmFycyhsaSkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRyYWdiYXJbbGlbaV1dID0gaW5zZXJ0RHJhZ2JhcihsaVtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBjcmVhdGVCb3JkZXJzKGxpKSAvL3t7e1xuICAgICAge1xuICAgICAgICB2YXIgY2wsaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgc3dpdGNoKGxpW2ldKXtcbiAgICAgICAgICAgIGNhc2Unbic6IGNsPSdobGluZSc7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSdzJzogY2w9J2hsaW5lIGJvdHRvbSc7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSdlJzogY2w9J3ZsaW5lIHJpZ2h0JzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlJ3cnOiBjbD0ndmxpbmUnOyBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYm9yZGVyc1tsaVtpXV0gPSBpbnNlcnRCb3JkZXIoY2wpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gY3JlYXRlSGFuZGxlcyhsaSkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGhhbmRsZVtsaVtpXV0gPSBpbnNlcnRIYW5kbGUobGlbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gbW92ZXRvKHgsIHkpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIGlmICghb3B0aW9ucy5zaGFkZSkge1xuICAgICAgICAgICRpbWcyLmNzcyh7XG4gICAgICAgICAgICB0b3A6IHB4KC15KSxcbiAgICAgICAgICAgIGxlZnQ6IHB4KC14KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgICRzZWwuY3NzKHtcbiAgICAgICAgICB0b3A6IHB4KHkpLFxuICAgICAgICAgIGxlZnQ6IHB4KHgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIHJlc2l6ZSh3LCBoKSAvL3t7e1xuICAgICAge1xuICAgICAgICAkc2VsLndpZHRoKE1hdGgucm91bmQodykpLmhlaWdodChNYXRoLnJvdW5kKGgpKTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiByZWZyZXNoKCkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgdmFyIGMgPSBDb29yZHMuZ2V0Rml4ZWQoKTtcblxuICAgICAgICBDb29yZHMuc2V0UHJlc3NlZChbYy54LCBjLnldKTtcbiAgICAgICAgQ29vcmRzLnNldEN1cnJlbnQoW2MueDIsIGMueTJdKTtcblxuICAgICAgICB1cGRhdGVWaXNpYmxlKCk7XG4gICAgICB9XG4gICAgICAvL319fVxuXG4gICAgICAvLyBJbnRlcm5hbCBNZXRob2RzXG4gICAgICBmdW5jdGlvbiB1cGRhdGVWaXNpYmxlKHNlbGVjdCkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgaWYgKGF3YWtlKSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZShzZWxlY3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gdXBkYXRlKHNlbGVjdCkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgdmFyIGMgPSBDb29yZHMuZ2V0Rml4ZWQoKTtcblxuICAgICAgICByZXNpemUoYy53LCBjLmgpO1xuICAgICAgICBtb3ZldG8oYy54LCBjLnkpO1xuICAgICAgICBpZiAob3B0aW9ucy5zaGFkZSkgU2hhZGUudXBkYXRlUmF3KGMpO1xuXG4gICAgICAgIGF3YWtlIHx8IHNob3coKTtcblxuICAgICAgICBpZiAoc2VsZWN0KSB7XG4gICAgICAgICAgb3B0aW9ucy5vblNlbGVjdC5jYWxsKGFwaSwgdW5zY2FsZShjKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5vbkNoYW5nZS5jYWxsKGFwaSwgdW5zY2FsZShjKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBzZXRCZ09wYWNpdHkob3BhY2l0eSxmb3JjZSxub3cpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIGlmICghYXdha2UgJiYgIWZvcmNlKSByZXR1cm47XG4gICAgICAgIGlmIChvcHRpb25zLmJnRmFkZSAmJiAhbm93KSB7XG4gICAgICAgICAgJGltZy5hbmltYXRlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHlcbiAgICAgICAgICB9LHtcbiAgICAgICAgICAgIHF1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmZhZGVUaW1lXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGltZy5jc3MoJ29wYWNpdHknLCBvcGFjaXR5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIHNob3coKSAvL3t7e1xuICAgICAge1xuICAgICAgICAkc2VsLnNob3coKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5zaGFkZSkgU2hhZGUub3BhY2l0eShiZ29wYWNpdHkpO1xuICAgICAgICAgIGVsc2Ugc2V0QmdPcGFjaXR5KGJnb3BhY2l0eSx0cnVlKTtcblxuICAgICAgICBhd2FrZSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gcmVsZWFzZSgpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIGRpc2FibGVIYW5kbGVzKCk7XG4gICAgICAgICRzZWwuaGlkZSgpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLnNoYWRlKSBTaGFkZS5vcGFjaXR5KDEpO1xuICAgICAgICAgIGVsc2Ugc2V0QmdPcGFjaXR5KDEpO1xuXG4gICAgICAgIGF3YWtlID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbnMub25SZWxlYXNlLmNhbGwoYXBpKTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBzaG93SGFuZGxlcygpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIGlmIChzZWVoYW5kbGVzKSB7XG4gICAgICAgICAgJGhkbF9ob2xkZXIuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gZW5hYmxlSGFuZGxlcygpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIHNlZWhhbmRsZXMgPSB0cnVlO1xuICAgICAgICBpZiAob3B0aW9ucy5hbGxvd1Jlc2l6ZSkge1xuICAgICAgICAgICRoZGxfaG9sZGVyLnNob3coKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIGRpc2FibGVIYW5kbGVzKCkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgc2VlaGFuZGxlcyA9IGZhbHNlO1xuICAgICAgICAkaGRsX2hvbGRlci5oaWRlKCk7XG4gICAgICB9IFxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIGFuaW1Nb2RlKHYpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICBkaXNhYmxlSGFuZGxlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgIGVuYWJsZUhhbmRsZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBkb25lKCkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgYW5pbU1vZGUoZmFsc2UpO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9IFxuICAgICAgLy99fX1cbiAgICAgIC8vIEluc2VydCBkcmFnZ2FibGUgZWxlbWVudHMge3t7XG4gICAgICAvLyBJbnNlcnQgYm9yZGVyIGRpdnMgZm9yIG91dGxpbmVcblxuICAgICAgaWYgKG9wdGlvbnMuZHJhZ0VkZ2VzICYmICQuaXNBcnJheShvcHRpb25zLmNyZWF0ZURyYWdiYXJzKSlcbiAgICAgICAgY3JlYXRlRHJhZ2JhcnMob3B0aW9ucy5jcmVhdGVEcmFnYmFycyk7XG5cbiAgICAgIGlmICgkLmlzQXJyYXkob3B0aW9ucy5jcmVhdGVIYW5kbGVzKSlcbiAgICAgICAgY3JlYXRlSGFuZGxlcyhvcHRpb25zLmNyZWF0ZUhhbmRsZXMpO1xuXG4gICAgICBpZiAob3B0aW9ucy5kcmF3Qm9yZGVycyAmJiAkLmlzQXJyYXkob3B0aW9ucy5jcmVhdGVCb3JkZXJzKSlcbiAgICAgICAgY3JlYXRlQm9yZGVycyhvcHRpb25zLmNyZWF0ZUJvcmRlcnMpO1xuXG4gICAgICAvL319fVxuXG4gICAgICAvLyBUaGlzIGlzIGEgaGFjayBmb3IgaU9TNSB0byBzdXBwb3J0IGRyYWcvbW92ZSB0b3VjaCBmdW5jdGlvbmFsaXR5XG4gICAgICAkKGRvY3VtZW50KS5iaW5kKCd0b3VjaHN0YXJ0Lmpjcm9wLWlvcycsZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKCdqY3JvcC10cmFja2VyJykpIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyICR0cmFjayA9IG5ld1RyYWNrZXIoKS5tb3VzZWRvd24oY3JlYXRlRHJhZ2dlcignbW92ZScpKS5jc3Moe1xuICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHpJbmRleDogMzYwXG4gICAgICB9KTtcblxuICAgICAgaWYgKFRvdWNoLnN1cHBvcnQpIHtcbiAgICAgICAgJHRyYWNrLmJpbmQoJ3RvdWNoc3RhcnQuamNyb3AnLCBUb3VjaC5jcmVhdGVEcmFnZ2VyKCdtb3ZlJykpO1xuICAgICAgfVxuXG4gICAgICAkaW1nX2hvbGRlci5hcHBlbmQoJHRyYWNrKTtcbiAgICAgIGRpc2FibGVIYW5kbGVzKCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVwZGF0ZVZpc2libGU6IHVwZGF0ZVZpc2libGUsXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgICAgICByZWxlYXNlOiByZWxlYXNlLFxuICAgICAgICByZWZyZXNoOiByZWZyZXNoLFxuICAgICAgICBpc0F3YWtlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWtlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRDdXJzb3I6IGZ1bmN0aW9uIChjdXJzb3IpIHtcbiAgICAgICAgICAkdHJhY2suY3NzKCdjdXJzb3InLCBjdXJzb3IpO1xuICAgICAgICB9LFxuICAgICAgICBlbmFibGVIYW5kbGVzOiBlbmFibGVIYW5kbGVzLFxuICAgICAgICBlbmFibGVPbmx5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VlaGFuZGxlcyA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNob3dIYW5kbGVzOiBzaG93SGFuZGxlcyxcbiAgICAgICAgZGlzYWJsZUhhbmRsZXM6IGRpc2FibGVIYW5kbGVzLFxuICAgICAgICBhbmltTW9kZTogYW5pbU1vZGUsXG4gICAgICAgIHNldEJnT3BhY2l0eTogc2V0QmdPcGFjaXR5LFxuICAgICAgICBkb25lOiBkb25lXG4gICAgICB9O1xuICAgIH0oKSk7XG4gICAgXG4gICAgLy99fX1cbiAgICAvLyBUcmFja2VyIE1vZHVsZSB7e3tcbiAgICB2YXIgVHJhY2tlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgb25Nb3ZlID0gZnVuY3Rpb24gKCkge30sXG4gICAgICAgICAgb25Eb25lID0gZnVuY3Rpb24gKCkge30sXG4gICAgICAgICAgdHJhY2tEb2MgPSBvcHRpb25zLnRyYWNrRG9jdW1lbnQ7XG5cbiAgICAgIGZ1bmN0aW9uIHRvRnJvbnQodG91Y2gpIC8ve3t7XG4gICAgICB7XG4gICAgICAgICR0cmsuY3NzKHtcbiAgICAgICAgICB6SW5kZXg6IDQ1MFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodG91Y2gpXG4gICAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgICAgIC5iaW5kKCd0b3VjaG1vdmUuamNyb3AnLCB0cmFja1RvdWNoTW92ZSlcbiAgICAgICAgICAgIC5iaW5kKCd0b3VjaGVuZC5qY3JvcCcsIHRyYWNrVG91Y2hFbmQpO1xuXG4gICAgICAgIGVsc2UgaWYgKHRyYWNrRG9jKVxuICAgICAgICAgICQoZG9jdW1lbnQpXG4gICAgICAgICAgICAuYmluZCgnbW91c2Vtb3ZlLmpjcm9wJyx0cmFja01vdmUpXG4gICAgICAgICAgICAuYmluZCgnbW91c2V1cC5qY3JvcCcsdHJhY2tVcCk7XG4gICAgICB9IFxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIHRvQmFjaygpIC8ve3t7XG4gICAgICB7XG4gICAgICAgICR0cmsuY3NzKHtcbiAgICAgICAgICB6SW5kZXg6IDI5MFxuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkudW5iaW5kKCcuamNyb3AnKTtcbiAgICAgIH0gXG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gdHJhY2tNb3ZlKGUpIC8ve3t7XG4gICAgICB7XG4gICAgICAgIG9uTW92ZShtb3VzZUFicyhlKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gXG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gdHJhY2tVcChlKSAvL3t7e1xuICAgICAge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKGJ0bmRvd24pIHtcbiAgICAgICAgICBidG5kb3duID0gZmFsc2U7XG5cbiAgICAgICAgICBvbkRvbmUobW91c2VBYnMoZSkpO1xuXG4gICAgICAgICAgaWYgKFNlbGVjdGlvbi5pc0F3YWtlKCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChhcGksIHVuc2NhbGUoQ29vcmRzLmdldEZpeGVkKCkpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b0JhY2soKTtcbiAgICAgICAgICBvbk1vdmUgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgICBvbkRvbmUgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBhY3RpdmF0ZUhhbmRsZXJzKG1vdmUsIGRvbmUsIHRvdWNoKSAvL3t7e1xuICAgICAge1xuICAgICAgICBidG5kb3duID0gdHJ1ZTtcbiAgICAgICAgb25Nb3ZlID0gbW92ZTtcbiAgICAgICAgb25Eb25lID0gZG9uZTtcbiAgICAgICAgdG9Gcm9udCh0b3VjaCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiB0cmFja1RvdWNoTW92ZShlKSAvL3t7e1xuICAgICAge1xuICAgICAgICBvbk1vdmUobW91c2VBYnMoVG91Y2guY2ZpbHRlcihlKSkpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gdHJhY2tUb3VjaEVuZChlKSAvL3t7e1xuICAgICAge1xuICAgICAgICByZXR1cm4gdHJhY2tVcChUb3VjaC5jZmlsdGVyKGUpKTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG4gICAgICBmdW5jdGlvbiBzZXRDdXJzb3IodCkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgJHRyay5jc3MoJ2N1cnNvcicsIHQpO1xuICAgICAgfVxuICAgICAgLy99fX1cblxuICAgICAgaWYgKCF0cmFja0RvYykge1xuICAgICAgICAkdHJrLm1vdXNlbW92ZSh0cmFja01vdmUpLm1vdXNldXAodHJhY2tVcCkubW91c2VvdXQodHJhY2tVcCk7XG4gICAgICB9XG5cbiAgICAgICRpbWcuYmVmb3JlKCR0cmspO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZhdGVIYW5kbGVyczogYWN0aXZhdGVIYW5kbGVycyxcbiAgICAgICAgc2V0Q3Vyc29yOiBzZXRDdXJzb3JcbiAgICAgIH07XG4gICAgfSgpKTtcbiAgICAvL319fVxuICAgIC8vIEtleU1hbmFnZXIgTW9kdWxlIHt7e1xuICAgIHZhciBLZXlNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAka2V5bWdyID0gJCgnPGlucHV0IHR5cGU9XCJyYWRpb1wiIC8+JykuY3NzKHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIGxlZnQ6ICctMTIwcHgnLFxuICAgICAgICB3aWR0aDogJzEycHgnXG4gICAgICB9KS5hZGRDbGFzcygnamNyb3Ata2V5bWdyJyksXG5cbiAgICAgICAgJGtleXdyYXAgPSAkKCc8ZGl2IC8+JykuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgICAgfSkuYXBwZW5kKCRrZXltZ3IpO1xuXG4gICAgICBmdW5jdGlvbiB3YXRjaEtleXMoKSAvL3t7e1xuICAgICAge1xuICAgICAgICBpZiAob3B0aW9ucy5rZXlTdXBwb3J0KSB7XG4gICAgICAgICAgJGtleW1nci5zaG93KCk7XG4gICAgICAgICAgJGtleW1nci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gb25CbHVyKGUpIC8ve3t7XG4gICAgICB7XG4gICAgICAgICRrZXltZ3IuaGlkZSgpO1xuICAgICAgfVxuICAgICAgLy99fX1cbiAgICAgIGZ1bmN0aW9uIGRvTnVkZ2UoZSwgeCwgeSkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dNb3ZlKSB7XG4gICAgICAgICAgQ29vcmRzLm1vdmVPZmZzZXQoW3gsIHldKTtcbiAgICAgICAgICBTZWxlY3Rpb24udXBkYXRlVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgICAvL319fVxuICAgICAgZnVuY3Rpb24gcGFyc2VLZXkoZSkgLy97e3tcbiAgICAgIHtcbiAgICAgICAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBzaGlmdF9kb3duID0gZS5zaGlmdEtleSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdmFyIG51ZGdlID0gc2hpZnRfZG93biA/IDEwIDogMTtcblxuICAgICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgIGRvTnVkZ2UoZSwgLW51ZGdlLCAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICBkb051ZGdlKGUsIG51ZGdlLCAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICBkb051ZGdlKGUsIDAsIC1udWRnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgZG9OdWRnZShlLCAwLCBudWRnZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dTZWxlY3QpIFNlbGVjdGlvbi5yZWxlYXNlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vfX19XG5cbiAgICAgIGlmIChvcHRpb25zLmtleVN1cHBvcnQpIHtcbiAgICAgICAgJGtleW1nci5rZXlkb3duKHBhcnNlS2V5KS5ibHVyKG9uQmx1cik7XG4gICAgICAgIGlmIChpZTZtb2RlIHx8ICFvcHRpb25zLmZpeGVkU3VwcG9ydCkge1xuICAgICAgICAgICRrZXltZ3IuY3NzKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogJy0yMHB4J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICRrZXl3cmFwLmFwcGVuZCgka2V5bWdyKS5pbnNlcnRCZWZvcmUoJGltZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGtleW1nci5pbnNlcnRCZWZvcmUoJGltZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB3YXRjaEtleXM6IHdhdGNoS2V5c1xuICAgICAgfTtcbiAgICB9KCkpO1xuICAgIC8vfX19XG4gICAgLy8gfX19XG4gICAgLy8gQVBJIG1ldGhvZHMge3t7XG4gICAgZnVuY3Rpb24gc2V0Q2xhc3MoY25hbWUpIC8ve3t7XG4gICAge1xuICAgICAgJGRpdi5yZW1vdmVDbGFzcygpLmFkZENsYXNzKGNzc0NsYXNzKCdob2xkZXInKSkuYWRkQ2xhc3MoY25hbWUpO1xuICAgIH1cbiAgICAvL319fVxuICAgIGZ1bmN0aW9uIGFuaW1hdGVUbyhhLCBjYWxsYmFjaykgLy97e3tcbiAgICB7XG4gICAgICB2YXIgeDEgPSBhWzBdIC8geHNjYWxlLFxuICAgICAgICAgIHkxID0gYVsxXSAvIHlzY2FsZSxcbiAgICAgICAgICB4MiA9IGFbMl0gLyB4c2NhbGUsXG4gICAgICAgICAgeTIgPSBhWzNdIC8geXNjYWxlO1xuXG4gICAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGFuaW10byA9IENvb3Jkcy5mbGlwQ29vcmRzKHgxLCB5MSwgeDIsIHkyKSxcbiAgICAgICAgICBjID0gQ29vcmRzLmdldEZpeGVkKCksXG4gICAgICAgICAgaW5pdGNyID0gW2MueCwgYy55LCBjLngyLCBjLnkyXSxcbiAgICAgICAgICBhbmltYXQgPSBpbml0Y3IsXG4gICAgICAgICAgaW50ZXJ2ID0gb3B0aW9ucy5hbmltYXRpb25EZWxheSxcbiAgICAgICAgICBpeDEgPSBhbmltdG9bMF0gLSBpbml0Y3JbMF0sXG4gICAgICAgICAgaXkxID0gYW5pbXRvWzFdIC0gaW5pdGNyWzFdLFxuICAgICAgICAgIGl4MiA9IGFuaW10b1syXSAtIGluaXRjclsyXSxcbiAgICAgICAgICBpeTIgPSBhbmltdG9bM10gLSBpbml0Y3JbM10sXG4gICAgICAgICAgcGNlbnQgPSAwLFxuICAgICAgICAgIHZlbG9jaXR5ID0gb3B0aW9ucy5zd2luZ1NwZWVkO1xuXG4gICAgICB4MSA9IGFuaW1hdFswXTtcbiAgICAgIHkxID0gYW5pbWF0WzFdO1xuICAgICAgeDIgPSBhbmltYXRbMl07XG4gICAgICB5MiA9IGFuaW1hdFszXTtcblxuICAgICAgU2VsZWN0aW9uLmFuaW1Nb2RlKHRydWUpO1xuICAgICAgdmFyIGFuaW1fdGltZXI7XG5cbiAgICAgIGZ1bmN0aW9uIHF1ZXVlQW5pbWF0b3IoKSB7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGFuaW1hdG9yLCBpbnRlcnYpO1xuICAgICAgfVxuICAgICAgdmFyIGFuaW1hdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwY2VudCArPSAoMTAwIC0gcGNlbnQpIC8gdmVsb2NpdHk7XG5cbiAgICAgICAgICBhbmltYXRbMF0gPSBNYXRoLnJvdW5kKHgxICsgKChwY2VudCAvIDEwMCkgKiBpeDEpKTtcbiAgICAgICAgICBhbmltYXRbMV0gPSBNYXRoLnJvdW5kKHkxICsgKChwY2VudCAvIDEwMCkgKiBpeTEpKTtcbiAgICAgICAgICBhbmltYXRbMl0gPSBNYXRoLnJvdW5kKHgyICsgKChwY2VudCAvIDEwMCkgKiBpeDIpKTtcbiAgICAgICAgICBhbmltYXRbM10gPSBNYXRoLnJvdW5kKHkyICsgKChwY2VudCAvIDEwMCkgKiBpeTIpKTtcblxuICAgICAgICAgIGlmIChwY2VudCA+PSA5OS44KSB7XG4gICAgICAgICAgICBwY2VudCA9IDEwMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBjZW50IDwgMTAwKSB7XG4gICAgICAgICAgICBzZXRTZWxlY3RSYXcoYW5pbWF0KTtcbiAgICAgICAgICAgIHF1ZXVlQW5pbWF0b3IoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgU2VsZWN0aW9uLmRvbmUoKTtcbiAgICAgICAgICAgIFNlbGVjdGlvbi5hbmltTW9kZShmYWxzZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mKGNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGFwaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSgpKTtcbiAgICAgIHF1ZXVlQW5pbWF0b3IoKTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiBzZXRTZWxlY3QocmVjdCkgLy97e3tcbiAgICB7XG4gICAgICBzZXRTZWxlY3RSYXcoW3JlY3RbMF0gLyB4c2NhbGUsIHJlY3RbMV0gLyB5c2NhbGUsIHJlY3RbMl0gLyB4c2NhbGUsIHJlY3RbM10gLyB5c2NhbGVdKTtcbiAgICAgIG9wdGlvbnMub25TZWxlY3QuY2FsbChhcGksIHVuc2NhbGUoQ29vcmRzLmdldEZpeGVkKCkpKTtcbiAgICAgIFNlbGVjdGlvbi5lbmFibGVIYW5kbGVzKCk7XG4gICAgfVxuICAgIC8vfX19XG4gICAgZnVuY3Rpb24gc2V0U2VsZWN0UmF3KGwpIC8ve3t7XG4gICAge1xuICAgICAgQ29vcmRzLnNldFByZXNzZWQoW2xbMF0sIGxbMV1dKTtcbiAgICAgIENvb3Jkcy5zZXRDdXJyZW50KFtsWzJdLCBsWzNdXSk7XG4gICAgICBTZWxlY3Rpb24udXBkYXRlKCk7XG4gICAgfVxuICAgIC8vfX19XG4gICAgZnVuY3Rpb24gdGVsbFNlbGVjdCgpIC8ve3t7XG4gICAge1xuICAgICAgcmV0dXJuIHVuc2NhbGUoQ29vcmRzLmdldEZpeGVkKCkpO1xuICAgIH1cbiAgICAvL319fVxuICAgIGZ1bmN0aW9uIHRlbGxTY2FsZWQoKSAvL3t7e1xuICAgIHtcbiAgICAgIHJldHVybiBDb29yZHMuZ2V0Rml4ZWQoKTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiBzZXRPcHRpb25zTmV3KG9wdCkgLy97e3tcbiAgICB7XG4gICAgICBzZXRPcHRpb25zKG9wdCk7XG4gICAgICBpbnRlcmZhY2VVcGRhdGUoKTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiBkaXNhYmxlQ3JvcCgpIC8ve3t7XG4gICAge1xuICAgICAgb3B0aW9ucy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBTZWxlY3Rpb24uZGlzYWJsZUhhbmRsZXMoKTtcbiAgICAgIFNlbGVjdGlvbi5zZXRDdXJzb3IoJ2RlZmF1bHQnKTtcbiAgICAgIFRyYWNrZXIuc2V0Q3Vyc29yKCdkZWZhdWx0Jyk7XG4gICAgfVxuICAgIC8vfX19XG4gICAgZnVuY3Rpb24gZW5hYmxlQ3JvcCgpIC8ve3t7XG4gICAge1xuICAgICAgb3B0aW9ucy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgaW50ZXJmYWNlVXBkYXRlKCk7XG4gICAgfVxuICAgIC8vfX19XG4gICAgZnVuY3Rpb24gY2FuY2VsQ3JvcCgpIC8ve3t7XG4gICAge1xuICAgICAgU2VsZWN0aW9uLmRvbmUoKTtcbiAgICAgIFRyYWNrZXIuYWN0aXZhdGVIYW5kbGVycyhudWxsLCBudWxsKTtcbiAgICB9XG4gICAgLy99fX1cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkgLy97e3tcbiAgICB7XG4gICAgICAkZGl2LnJlbW92ZSgpO1xuICAgICAgJG9yaWdpbWcuc2hvdygpO1xuICAgICAgJG9yaWdpbWcuY3NzKCd2aXNpYmlsaXR5JywndmlzaWJsZScpO1xuICAgICAgJChvYmopLnJlbW92ZURhdGEoJ0pjcm9wJyk7XG4gICAgfVxuICAgIC8vfX19XG4gICAgZnVuY3Rpb24gc2V0SW1hZ2Uoc3JjLCBjYWxsYmFjaykgLy97e3tcbiAgICB7XG4gICAgICBTZWxlY3Rpb24ucmVsZWFzZSgpO1xuICAgICAgZGlzYWJsZUNyb3AoKTtcbiAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpdyA9IGltZy53aWR0aDtcbiAgICAgICAgdmFyIGloID0gaW1nLmhlaWdodDtcbiAgICAgICAgdmFyIGJ3ID0gb3B0aW9ucy5ib3hXaWR0aDtcbiAgICAgICAgdmFyIGJoID0gb3B0aW9ucy5ib3hIZWlnaHQ7XG4gICAgICAgICRpbWcud2lkdGgoaXcpLmhlaWdodChpaCk7XG4gICAgICAgICRpbWcuYXR0cignc3JjJywgc3JjKTtcbiAgICAgICAgJGltZzIuYXR0cignc3JjJywgc3JjKTtcbiAgICAgICAgcHJlc2l6ZSgkaW1nLCBidywgYmgpO1xuICAgICAgICBib3VuZHggPSAkaW1nLndpZHRoKCk7XG4gICAgICAgIGJvdW5keSA9ICRpbWcuaGVpZ2h0KCk7XG4gICAgICAgICRpbWcyLndpZHRoKGJvdW5keCkuaGVpZ2h0KGJvdW5keSk7XG4gICAgICAgICR0cmsud2lkdGgoYm91bmR4ICsgKGJvdW5kICogMikpLmhlaWdodChib3VuZHkgKyAoYm91bmQgKiAyKSk7XG4gICAgICAgICRkaXYud2lkdGgoYm91bmR4KS5oZWlnaHQoYm91bmR5KTtcbiAgICAgICAgU2hhZGUucmVzaXplKGJvdW5keCxib3VuZHkpO1xuICAgICAgICBlbmFibGVDcm9wKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZihjYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKGFwaSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpbWcuc3JjID0gc3JjO1xuICAgIH1cbiAgICAvL319fVxuICAgIGZ1bmN0aW9uIGNvbG9yQ2hhbmdlTWFjcm8oJG9iaixjb2xvcixub3cpIHtcbiAgICAgIHZhciBteWNvbG9yID0gY29sb3IgfHwgb3B0aW9ucy5iZ0NvbG9yO1xuICAgICAgaWYgKG9wdGlvbnMuYmdGYWRlICYmIHN1cHBvcnRzQ29sb3JGYWRlKCkgJiYgb3B0aW9ucy5mYWRlVGltZSAmJiAhbm93KSB7XG4gICAgICAgICRvYmouYW5pbWF0ZSh7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBteWNvbG9yXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgZHVyYXRpb246IG9wdGlvbnMuZmFkZVRpbWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkb2JqLmNzcygnYmFja2dyb3VuZENvbG9yJywgbXljb2xvcik7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludGVyZmFjZVVwZGF0ZShhbHQpIC8ve3t7XG4gICAgLy8gVGhpcyBtZXRob2QgdHdlYWtzIHRoZSBpbnRlcmZhY2UgYmFzZWQgb24gb3B0aW9ucyBvYmplY3QuXG4gICAgLy8gQ2FsbGVkIHdoZW4gb3B0aW9ucyBhcmUgY2hhbmdlZCBhbmQgYXQgZW5kIG9mIGluaXRpYWxpemF0aW9uLlxuICAgIHtcbiAgICAgIGlmIChvcHRpb25zLmFsbG93UmVzaXplKSB7XG4gICAgICAgIGlmIChhbHQpIHtcbiAgICAgICAgICBTZWxlY3Rpb24uZW5hYmxlT25seSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFNlbGVjdGlvbi5lbmFibGVIYW5kbGVzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNlbGVjdGlvbi5kaXNhYmxlSGFuZGxlcygpO1xuICAgICAgfVxuXG4gICAgICBUcmFja2VyLnNldEN1cnNvcihvcHRpb25zLmFsbG93U2VsZWN0ID8gJ2Nyb3NzaGFpcicgOiAnZGVmYXVsdCcpO1xuICAgICAgU2VsZWN0aW9uLnNldEN1cnNvcihvcHRpb25zLmFsbG93TW92ZSA/ICdtb3ZlJyA6ICdkZWZhdWx0Jyk7XG5cbiAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCd0cnVlU2l6ZScpKSB7XG4gICAgICAgIHhzY2FsZSA9IG9wdGlvbnMudHJ1ZVNpemVbMF0gLyBib3VuZHg7XG4gICAgICAgIHlzY2FsZSA9IG9wdGlvbnMudHJ1ZVNpemVbMV0gLyBib3VuZHk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdzZXRTZWxlY3QnKSkge1xuICAgICAgICBzZXRTZWxlY3Qob3B0aW9ucy5zZXRTZWxlY3QpO1xuICAgICAgICBTZWxlY3Rpb24uZG9uZSgpO1xuICAgICAgICBkZWxldGUob3B0aW9ucy5zZXRTZWxlY3QpO1xuICAgICAgfVxuXG4gICAgICBTaGFkZS5yZWZyZXNoKCk7XG5cbiAgICAgIGlmIChvcHRpb25zLmJnQ29sb3IgIT0gYmdjb2xvcikge1xuICAgICAgICBjb2xvckNoYW5nZU1hY3JvKFxuICAgICAgICAgIG9wdGlvbnMuc2hhZGU/IFNoYWRlLmdldFNoYWRlcygpOiAkZGl2LFxuICAgICAgICAgIG9wdGlvbnMuc2hhZGU/XG4gICAgICAgICAgICAob3B0aW9ucy5zaGFkZUNvbG9yIHx8IG9wdGlvbnMuYmdDb2xvcik6XG4gICAgICAgICAgICBvcHRpb25zLmJnQ29sb3JcbiAgICAgICAgKTtcbiAgICAgICAgYmdjb2xvciA9IG9wdGlvbnMuYmdDb2xvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGJnb3BhY2l0eSAhPSBvcHRpb25zLmJnT3BhY2l0eSkge1xuICAgICAgICBiZ29wYWNpdHkgPSBvcHRpb25zLmJnT3BhY2l0eTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2hhZGUpIFNoYWRlLnJlZnJlc2goKTtcbiAgICAgICAgICBlbHNlIFNlbGVjdGlvbi5zZXRCZ09wYWNpdHkoYmdvcGFjaXR5KTtcbiAgICAgIH1cblxuICAgICAgeGxpbWl0ID0gb3B0aW9ucy5tYXhTaXplWzBdIHx8IDA7XG4gICAgICB5bGltaXQgPSBvcHRpb25zLm1heFNpemVbMV0gfHwgMDtcbiAgICAgIHhtaW4gPSBvcHRpb25zLm1pblNpemVbMF0gfHwgMDtcbiAgICAgIHltaW4gPSBvcHRpb25zLm1pblNpemVbMV0gfHwgMDtcblxuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ291dGVySW1hZ2UnKSkge1xuICAgICAgICAkaW1nLmF0dHIoJ3NyYycsIG9wdGlvbnMub3V0ZXJJbWFnZSk7XG4gICAgICAgIGRlbGV0ZShvcHRpb25zLm91dGVySW1hZ2UpO1xuICAgICAgfVxuXG4gICAgICBTZWxlY3Rpb24ucmVmcmVzaCgpO1xuICAgIH1cbiAgICAvL319fVxuICAgIC8vfX19XG5cbiAgICBpZiAoVG91Y2guc3VwcG9ydCkgJHRyay5iaW5kKCd0b3VjaHN0YXJ0Lmpjcm9wJywgVG91Y2gubmV3U2VsZWN0aW9uKTtcblxuICAgICRoZGxfaG9sZGVyLmhpZGUoKTtcbiAgICBpbnRlcmZhY2VVcGRhdGUodHJ1ZSk7XG5cbiAgICB2YXIgYXBpID0ge1xuICAgICAgc2V0SW1hZ2U6IHNldEltYWdlLFxuICAgICAgYW5pbWF0ZVRvOiBhbmltYXRlVG8sXG4gICAgICBzZXRTZWxlY3Q6IHNldFNlbGVjdCxcbiAgICAgIHNldE9wdGlvbnM6IHNldE9wdGlvbnNOZXcsXG4gICAgICB0ZWxsU2VsZWN0OiB0ZWxsU2VsZWN0LFxuICAgICAgdGVsbFNjYWxlZDogdGVsbFNjYWxlZCxcbiAgICAgIHNldENsYXNzOiBzZXRDbGFzcyxcblxuICAgICAgZGlzYWJsZTogZGlzYWJsZUNyb3AsXG4gICAgICBlbmFibGU6IGVuYWJsZUNyb3AsXG4gICAgICBjYW5jZWw6IGNhbmNlbENyb3AsXG4gICAgICByZWxlYXNlOiBTZWxlY3Rpb24ucmVsZWFzZSxcbiAgICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG5cbiAgICAgIGZvY3VzOiBLZXlNYW5hZ2VyLndhdGNoS2V5cyxcblxuICAgICAgZ2V0Qm91bmRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbYm91bmR4ICogeHNjYWxlLCBib3VuZHkgKiB5c2NhbGVdO1xuICAgICAgfSxcbiAgICAgIGdldFdpZGdldFNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtib3VuZHgsIGJvdW5keV07XG4gICAgICB9LFxuICAgICAgZ2V0U2NhbGVGYWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFt4c2NhbGUsIHlzY2FsZV07XG4gICAgICB9LFxuICAgICAgZ2V0T3B0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNhcmVmdWw6IGludGVybmFsIHZhbHVlcyBhcmUgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICB9LFxuXG4gICAgICB1aToge1xuICAgICAgICBob2xkZXI6ICRkaXYsXG4gICAgICAgIHNlbGVjdGlvbjogJHNlbFxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoaXNfbXNpZSkgJGRpdi5iaW5kKCdzZWxlY3RzdGFydCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9KTtcblxuICAgICRvcmlnaW1nLmRhdGEoJ0pjcm9wJywgYXBpKTtcbiAgICByZXR1cm4gYXBpO1xuICB9O1xuICAkLmZuLkpjcm9wID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNhbGxiYWNrKSAvL3t7e1xuICB7XG4gICAgdmFyIGFwaTtcbiAgICAvLyBJdGVyYXRlIG92ZXIgZWFjaCBvYmplY3QsIGF0dGFjaCBKY3JvcFxuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGF0dGFjaGVkIHRvIHRoaXMgb2JqZWN0XG4gICAgICBpZiAoJCh0aGlzKS5kYXRhKCdKY3JvcCcpKSB7XG4gICAgICAgIC8vIFRoZSBBUEkgY2FuIGJlIHJlcXVlc3RlZCB0aGlzIHdheSAodW5kb2N1bWVudGVkKVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gJ2FwaScpIHJldHVybiAkKHRoaXMpLmRhdGEoJ0pjcm9wJyk7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgd2UganVzdCByZXNldCB0aGUgb3B0aW9ucy4uLlxuICAgICAgICBlbHNlICQodGhpcykuZGF0YSgnSmNyb3AnKS5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UgaGF2ZW4ndCBiZWVuIGF0dGFjaGVkLCBwcmVsb2FkIGFuZCBhdHRhY2hcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAodGhpcy50YWdOYW1lID09ICdJTUcnKVxuICAgICAgICAgICQuSmNyb3AuTG9hZGVyKHRoaXMsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykuY3NzKHtkaXNwbGF5OidibG9jaycsdmlzaWJpbGl0eTonaGlkZGVuJ30pO1xuICAgICAgICAgICAgYXBpID0gJC5KY3JvcCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24oY2FsbGJhY2spKSBjYWxsYmFjay5jYWxsKGFwaSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICQodGhpcykuY3NzKHtkaXNwbGF5OidibG9jaycsdmlzaWJpbGl0eTonaGlkZGVuJ30pO1xuICAgICAgICAgIGFwaSA9ICQuSmNyb3AodGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihjYWxsYmFjaykpIGNhbGxiYWNrLmNhbGwoYXBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUmV0dXJuIFwidGhpc1wiIHNvIHRoZSBvYmplY3QgaXMgY2hhaW5hYmxlIChqUXVlcnktc3R5bGUpXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIC8vfX19XG4gIC8vICQuSmNyb3AuTG9hZGVyIC0gYmFzaWMgaW1hZ2UgbG9hZGVyIHt7e1xuXG4gICQuSmNyb3AuTG9hZGVyID0gZnVuY3Rpb24oaW1nb2JqLHN1Y2Nlc3MsZXJyb3Ipe1xuICAgIHZhciAkaW1nID0gJChpbWdvYmopLCBpbWcgPSAkaW1nWzBdO1xuXG4gICAgZnVuY3Rpb24gY29tcGxldGVDaGVjaygpe1xuICAgICAgaWYgKGltZy5jb21wbGV0ZSkge1xuICAgICAgICAkaW1nLnVuYmluZCgnLmpjbG9hZGVyJyk7XG4gICAgICAgIGlmICgkLmlzRnVuY3Rpb24oc3VjY2VzcykpIHN1Y2Nlc3MuY2FsbChpbWcpO1xuICAgICAgfVxuICAgICAgZWxzZSB3aW5kb3cuc2V0VGltZW91dChjb21wbGV0ZUNoZWNrLDUwKTtcbiAgICB9XG5cbiAgICAkaW1nXG4gICAgICAuYmluZCgnbG9hZC5qY2xvYWRlcicsY29tcGxldGVDaGVjaylcbiAgICAgIC5iaW5kKCdlcnJvci5qY2xvYWRlcicsZnVuY3Rpb24oZSl7XG4gICAgICAgICRpbWcudW5iaW5kKCcuamNsb2FkZXInKTtcbiAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihlcnJvcikpIGVycm9yLmNhbGwoaW1nKTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKGltZy5jb21wbGV0ZSAmJiAkLmlzRnVuY3Rpb24oc3VjY2Vzcykpe1xuICAgICAgJGltZy51bmJpbmQoJy5qY2xvYWRlcicpO1xuICAgICAgc3VjY2Vzcy5jYWxsKGltZyk7XG4gICAgfVxuICB9O1xuXG4gIC8vfX19XG4gIC8vIEdsb2JhbCBEZWZhdWx0cyB7e3tcbiAgJC5KY3JvcC5kZWZhdWx0cyA9IHtcblxuICAgIC8vIEJhc2ljIFNldHRpbmdzXG4gICAgYWxsb3dTZWxlY3Q6IHRydWUsXG4gICAgYWxsb3dNb3ZlOiB0cnVlLFxuICAgIGFsbG93UmVzaXplOiB0cnVlLFxuXG4gICAgdHJhY2tEb2N1bWVudDogdHJ1ZSxcblxuICAgIC8vIFN0eWxpbmcgT3B0aW9uc1xuICAgIGJhc2VDbGFzczogJ2pjcm9wJyxcbiAgICBhZGRDbGFzczogbnVsbCxcbiAgICBiZ0NvbG9yOiAnYmxhY2snLFxuICAgIGJnT3BhY2l0eTogMC42LFxuICAgIGJnRmFkZTogZmFsc2UsXG4gICAgYm9yZGVyT3BhY2l0eTogMC40LFxuICAgIGhhbmRsZU9wYWNpdHk6IDAuNSxcbiAgICBoYW5kbGVTaXplOiBudWxsLFxuXG4gICAgYXNwZWN0UmF0aW86IDAsXG4gICAga2V5U3VwcG9ydDogdHJ1ZSxcbiAgICBjcmVhdGVIYW5kbGVzOiBbJ24nLCdzJywnZScsJ3cnLCdudycsJ25lJywnc2UnLCdzdyddLFxuICAgIGNyZWF0ZURyYWdiYXJzOiBbJ24nLCdzJywnZScsJ3cnXSxcbiAgICBjcmVhdGVCb3JkZXJzOiBbJ24nLCdzJywnZScsJ3cnXSxcbiAgICBkcmF3Qm9yZGVyczogdHJ1ZSxcbiAgICBkcmFnRWRnZXM6IHRydWUsXG4gICAgZml4ZWRTdXBwb3J0OiB0cnVlLFxuICAgIHRvdWNoU3VwcG9ydDogbnVsbCxcblxuICAgIHNoYWRlOiBudWxsLFxuXG4gICAgYm94V2lkdGg6IDAsXG4gICAgYm94SGVpZ2h0OiAwLFxuICAgIGJvdW5kYXJ5OiAyLFxuICAgIGZhZGVUaW1lOiA0MDAsXG4gICAgYW5pbWF0aW9uRGVsYXk6IDIwLFxuICAgIHN3aW5nU3BlZWQ6IDMsXG5cbiAgICBtaW5TZWxlY3Q6IFswLCAwXSxcbiAgICBtYXhTaXplOiBbMCwgMF0sXG4gICAgbWluU2l6ZTogWzAsIDBdLFxuXG4gICAgLy8gQ2FsbGJhY2tzIC8gRXZlbnQgSGFuZGxlcnNcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gKCkge30sXG4gICAgb25TZWxlY3Q6IGZ1bmN0aW9uICgpIHt9LFxuICAgIG9uRGJsQ2xpY2s6IGZ1bmN0aW9uICgpIHt9LFxuICAgIG9uUmVsZWFzZTogZnVuY3Rpb24gKCkge31cbiAgfTtcblxuICAvLyB9fX1cbn0oJCkpO1xuIiwiLyohXG4gKiBMaWdodGJveCB2Mi4xMS4yXG4gKiBieSBMb2tlc2ggRGhha2FyXG4gKlxuICogTW9yZSBpbmZvOlxuICogaHR0cDovL2xva2VzaGRoYWthci5jb20vcHJvamVjdHMvbGlnaHRib3gyL1xuICpcbiAqIENvcHlyaWdodCBMb2tlc2ggRGhha2FyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2tlc2gvbGlnaHRib3gyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKiBAcHJlc2VydmVcbiAqL1xuXG4vLyBVc2VzIE5vZGUsIEFNRCBvciBicm93c2VyIGdsb2JhbHMgdG8gY3JlYXRlIGEgbW9kdWxlLlxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgICAgIC8vIGxpa2UgTm9kZS5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgICByb290LmxpZ2h0Ym94ID0gZmFjdG9yeShyb290LmpRdWVyeSk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbiAoJCkge1xuXG4gIGZ1bmN0aW9uIExpZ2h0Ym94KG9wdGlvbnMpIHtcbiAgICB0aGlzLmFsYnVtID0gW107XG4gICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCA9IHZvaWQgMDtcbiAgICB0aGlzLmluaXQoKTtcblxuICAgIC8vIG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cyk7XG4gICAgdGhpcy5vcHRpb24ob3B0aW9ucyk7XG4gIH1cblxuICAvLyBEZXNjcmlwdGlvbnMgb2YgYWxsIG9wdGlvbnMgYXZhaWxhYmxlIG9uIHRoZSBkZW1vIHNpdGU6XG4gIC8vIGh0dHA6Ly9sb2tlc2hkaGFrYXIuY29tL3Byb2plY3RzL2xpZ2h0Ym94Mi9pbmRleC5odG1sI29wdGlvbnNcbiAgTGlnaHRib3guZGVmYXVsdHMgPSB7XG4gICAgYWxidW1MYWJlbDogJ0ltYWdlICUxIG9mICUyJyxcbiAgICBhbHdheXNTaG93TmF2T25Ub3VjaERldmljZXM6IGZhbHNlLFxuICAgIGZhZGVEdXJhdGlvbjogNjAwLFxuICAgIGZpdEltYWdlc0luVmlld3BvcnQ6IHRydWUsXG4gICAgaW1hZ2VGYWRlRHVyYXRpb246IDYwMCxcbiAgICAvLyBtYXhXaWR0aDogODAwLFxuICAgIC8vIG1heEhlaWdodDogNjAwLFxuICAgIHBvc2l0aW9uRnJvbVRvcDogNTAsXG4gICAgcmVzaXplRHVyYXRpb246IDcwMCxcbiAgICBzaG93SW1hZ2VOdW1iZXJMYWJlbDogdHJ1ZSxcbiAgICB3cmFwQXJvdW5kOiBmYWxzZSxcbiAgICBkaXNhYmxlU2Nyb2xsaW5nOiBmYWxzZSxcbiAgICAvKlxuICAgIFNhbml0aXplIFRpdGxlXG4gICAgSWYgdGhlIGNhcHRpb24gZGF0YSBpcyB0cnVzdGVkLCBmb3IgZXhhbXBsZSB5b3UgYXJlIGhhcmRjb2RpbmcgaXQgaW4sIHRoZW4gbGVhdmUgdGhpcyB0byBmYWxzZS5cbiAgICBUaGlzIHdpbGwgZnJlZSB5b3UgdG8gYWRkIGh0bWwgdGFncywgc3VjaCBhcyBsaW5rcywgaW4gdGhlIGNhcHRpb24uXG5cbiAgICBJZiB0aGUgY2FwdGlvbiBkYXRhIGlzIHVzZXIgc3VibWl0dGVkIG9yIGZyb20gc29tZSBvdGhlciB1bnRydXN0ZWQgc291cmNlLCB0aGVuIHNldCB0aGlzIHRvIHRydWVcbiAgICB0byBwcmV2ZW50IHhzcyBhbmQgb3RoZXIgaW5qZWN0aW9uIGF0dGFja3MuXG4gICAgICovXG4gICAgc2FuaXRpemVUaXRsZTogZmFsc2VcbiAgfTtcblxuICBMaWdodGJveC5wcm90b3R5cGUub3B0aW9uID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICQuZXh0ZW5kKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gIH07XG5cbiAgTGlnaHRib3gucHJvdG90eXBlLmltYWdlQ291bnRMYWJlbCA9IGZ1bmN0aW9uKGN1cnJlbnRJbWFnZU51bSwgdG90YWxJbWFnZXMpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsYnVtTGFiZWwucmVwbGFjZSgvJTEvZywgY3VycmVudEltYWdlTnVtKS5yZXBsYWNlKC8lMi9nLCB0b3RhbEltYWdlcyk7XG4gIH07XG5cbiAgTGlnaHRib3gucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gQm90aCBlbmFibGUgYW5kIGJ1aWxkIG1ldGhvZHMgcmVxdWlyZSB0aGUgYm9keSB0YWcgdG8gYmUgaW4gdGhlIERPTS5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuZW5hYmxlKCk7XG4gICAgICBzZWxmLmJ1aWxkKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gTG9vcCB0aHJvdWdoIGFuY2hvcnMgYW5kIGFyZWFtYXBzIGxvb2tpbmcgZm9yIGVpdGhlciBkYXRhLWxpZ2h0Ym94IGF0dHJpYnV0ZXMgb3IgcmVsIGF0dHJpYnV0ZXNcbiAgLy8gdGhhdCBjb250YWluICdsaWdodGJveCcuIFdoZW4gdGhlc2UgYXJlIGNsaWNrZWQsIHN0YXJ0IGxpZ2h0Ym94LlxuICBMaWdodGJveC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnYVtyZWxePWxpZ2h0Ym94XSwgYXJlYVtyZWxePWxpZ2h0Ym94XSwgYVtkYXRhLWxpZ2h0Ym94XSwgYXJlYVtkYXRhLWxpZ2h0Ym94XScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBzZWxmLnN0YXJ0KCQoZXZlbnQuY3VycmVudFRhcmdldCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEJ1aWxkIGh0bWwgZm9yIHRoZSBsaWdodGJveCBhbmQgdGhlIG92ZXJsYXkuXG4gIC8vIEF0dGFjaCBldmVudCBoYW5kbGVycyB0byB0aGUgbmV3IERPTSBlbGVtZW50cy4gY2xpY2sgY2xpY2sgY2xpY2tcbiAgTGlnaHRib3gucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQoJyNsaWdodGJveCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFRoZSB0d28gcm9vdCBub3RlcyBnZW5lcmF0ZWQsICNsaWdodGJveE92ZXJsYXkgYW5kICNsaWdodGJveCBhcmUgZ2l2ZW5cbiAgICAvLyB0YWJpbmRleCBhdHRycyBzbyB0aGV5IGFyZSBmb2N1c2FibGUuIFdlIGF0dGFjaCBvdXIga2V5Ym9hcmQgZXZlbnRcbiAgICAvLyBsaXN0ZW5lcnMgdG8gdGhlc2UgdHdvIGVsZW1lbnRzLCBhbmQgbm90IHRoZSBkb2N1bWVudC4gQ2xpY2tpbmcgYW55d2hlcmVcbiAgICAvLyB3aGlsZSBMaWdodGJveCBpcyBvcGVuZWQgd2lsbCBrZWVwIHRoZSBmb2N1cyBvbiBvciBpbnNpZGUgb25lIG9mIHRoZXNlXG4gICAgLy8gdHdvIGVsZW1lbnRzLlxuICAgIC8vXG4gICAgLy8gV2UgZG8gdGhpcyBzbyB3ZSBjYW4gcHJldmVudCBwcm9wb2dhdGlvbiBvZiB0aGUgRXNjIGtleXByZXNzIHdoZW5cbiAgICAvLyBMaWdodGJveCBpcyBvcGVuLiBUaGlzIHByZXZlbnRzIGl0IGZyb20gaW50ZWZlcmluZyB3aXRoIG90aGVyIGNvbXBvbmVudHNcbiAgICAvLyBvbiB0aGUgcGFnZSBiZWxvdy5cbiAgICAvL1xuICAgIC8vIEdpdGh1YiBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2xva2VzaC9saWdodGJveDIvaXNzdWVzLzY2M1xuICAgICQoJzxkaXYgaWQ9XCJsaWdodGJveE92ZXJsYXlcIiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJsaWdodGJveE92ZXJsYXlcIj48L2Rpdj48ZGl2IGlkPVwibGlnaHRib3hcIiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJsaWdodGJveFwiPjxkaXYgY2xhc3M9XCJsYi1kYXRhQ29udGFpbmVyXCI+PGRpdiBjbGFzcz1cImxiLWRhdGFcIj48ZGl2IGNsYXNzPVwibGItZGV0YWlsc1wiPjxzcGFuIGNsYXNzPVwibGItY2FwdGlvblwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cImxiLW51bWJlclwiPjwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwibGItY2xvc2VDb250YWluZXJcIj48YSBjbGFzcz1cImxiLWNsb3NlIGZhcyBmYS10aW1lc1wiPjwvYT48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwibGItb3V0ZXJDb250YWluZXJcIj48ZGl2IGNsYXNzPVwibGItY29udGFpbmVyXCI+PGltZyBjbGFzcz1cImxiLWltYWdlXCIgc3JjPVwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBUC8vL3dBQUFDSDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUNSQUVBT3c9PVwiIGFsdD1cIlwiLz48ZGl2IGNsYXNzPVwibGItbmF2XCI+PGEgY2xhc3M9XCJsYi1wcmV2XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIGltYWdlXCIgaHJlZj1cIlwiID48L2E+PGEgY2xhc3M9XCJsYi1uZXh0XCIgYXJpYS1sYWJlbD1cIk5leHQgaW1hZ2VcIiBocmVmPVwiXCIgPjwvYT48L2Rpdj48ZGl2IGNsYXNzPVwibGItbG9hZGVyXCI+PGEgY2xhc3M9XCJsYi1jYW5jZWxcIj48L2E+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+JykuYXBwZW5kVG8oJCgnYm9keScpKTtcblxuICAgIC8vIENhY2hlIGpRdWVyeSBvYmplY3RzXG4gICAgdGhpcy4kbGlnaHRib3ggICAgICAgPSAkKCcjbGlnaHRib3gnKTtcbiAgICB0aGlzLiRvdmVybGF5ICAgICAgICA9ICQoJyNsaWdodGJveE92ZXJsYXknKTtcbiAgICB0aGlzLiRvdXRlckNvbnRhaW5lciA9IHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1vdXRlckNvbnRhaW5lcicpO1xuICAgIHRoaXMuJGNvbnRhaW5lciAgICAgID0gdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuJGltYWdlICAgICAgICAgID0gdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLWltYWdlJyk7XG4gICAgdGhpcy4kbmF2ICAgICAgICAgICAgPSB0aGlzLiRsaWdodGJveC5maW5kKCcubGItbmF2Jyk7XG5cbiAgICAvLyBTdG9yZSBjc3MgdmFsdWVzIGZvciBmdXR1cmUgbG9va3VwXG4gICAgdGhpcy5jb250YWluZXJQYWRkaW5nID0ge1xuICAgICAgdG9wOiBwYXJzZUludCh0aGlzLiRjb250YWluZXIuY3NzKCdwYWRkaW5nLXRvcCcpLCAxMCksXG4gICAgICByaWdodDogcGFyc2VJbnQodGhpcy4kY29udGFpbmVyLmNzcygncGFkZGluZy1yaWdodCcpLCAxMCksXG4gICAgICBib3R0b206IHBhcnNlSW50KHRoaXMuJGNvbnRhaW5lci5jc3MoJ3BhZGRpbmctYm90dG9tJyksIDEwKSxcbiAgICAgIGxlZnQ6IHBhcnNlSW50KHRoaXMuJGNvbnRhaW5lci5jc3MoJ3BhZGRpbmctbGVmdCcpLCAxMClcbiAgICB9O1xuXG4gICAgdGhpcy5pbWFnZUJvcmRlcldpZHRoID0ge1xuICAgICAgdG9wOiBwYXJzZUludCh0aGlzLiRpbWFnZS5jc3MoJ2JvcmRlci10b3Atd2lkdGgnKSwgMTApLFxuICAgICAgcmlnaHQ6IHBhcnNlSW50KHRoaXMuJGltYWdlLmNzcygnYm9yZGVyLXJpZ2h0LXdpZHRoJyksIDEwKSxcbiAgICAgIGJvdHRvbTogcGFyc2VJbnQodGhpcy4kaW1hZ2UuY3NzKCdib3JkZXItYm90dG9tLXdpZHRoJyksIDEwKSxcbiAgICAgIGxlZnQ6IHBhcnNlSW50KHRoaXMuJGltYWdlLmNzcygnYm9yZGVyLWxlZnQtd2lkdGgnKSwgMTApXG4gICAgfTtcblxuICAgIC8vIEF0dGFjaCBldmVudCBoYW5kbGVycyB0byB0aGUgbmV3bHkgbWludGVkIERPTSBlbGVtZW50c1xuICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5lbmQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIHRoaXMuJGxpZ2h0Ym94LmhpZGUoKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5hdHRyKCdpZCcpID09PSAnbGlnaHRib3gnKSB7XG4gICAgICAgIHNlbGYuZW5kKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiRvdXRlckNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5hdHRyKCdpZCcpID09PSAnbGlnaHRib3gnKSB7XG4gICAgICAgIHNlbGYuZW5kKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRsaWdodGJveC5maW5kKCcubGItcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNlbGYuY3VycmVudEltYWdlSW5kZXggPT09IDApIHtcbiAgICAgICAgc2VsZi5jaGFuZ2VJbWFnZShzZWxmLmFsYnVtLmxlbmd0aCAtIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5jaGFuZ2VJbWFnZShzZWxmLmN1cnJlbnRJbWFnZUluZGV4IC0gMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLiRsaWdodGJveC5maW5kKCcubGItbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNlbGYuY3VycmVudEltYWdlSW5kZXggPT09IHNlbGYuYWxidW0ubGVuZ3RoIC0gMSkge1xuICAgICAgICBzZWxmLmNoYW5nZUltYWdlKDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5jaGFuZ2VJbWFnZShzZWxmLmN1cnJlbnRJbWFnZUluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAgU2hvdyBjb250ZXh0IG1lbnUgZm9yIGltYWdlIG9uIHJpZ2h0LWNsaWNrXG5cbiAgICAgIFRoZXJlIGlzIGEgZGl2IGNvbnRhaW5pbmcgdGhlIG5hdmlnYXRpb24gdGhhdCBzcGFucyB0aGUgZW50aXJlIGltYWdlIGFuZCBsaXZlcyBhYm92ZSBvZiBpdC4gSWZcbiAgICAgIHlvdSByaWdodC1jbGljaywgeW91IGFyZSByaWdodCBjbGlja2luZyB0aGlzIGRpdiBhbmQgbm90IHRoZSBpbWFnZS4gVGhpcyBwcmV2ZW50cyB1c2VycyBmcm9tXG4gICAgICBzYXZpbmcgdGhlIGltYWdlIG9yIHVzaW5nIG90aGVyIGNvbnRleHQgbWVudSBhY3Rpb25zIHdpdGggdGhlIGltYWdlLlxuXG4gICAgICBUbyBmaXggdGhpcywgd2hlbiB3ZSBkZXRlY3QgdGhlIHJpZ2h0IG1vdXNlIGJ1dHRvbiBpcyBwcmVzc2VkIGRvd24sIGJ1dCBub3QgeWV0IGNsaWNrZWQsIHdlXG4gICAgICBzZXQgcG9pbnRlci1ldmVudHMgdG8gbm9uZSBvbiB0aGUgbmF2IGRpdi4gVGhpcyBpcyBzbyB0aGF0IHRoZSB1cGNvbWluZyByaWdodC1jbGljayBldmVudCBvblxuICAgICAgdGhlIG5leHQgbW91c2V1cCB3aWxsIGJ1YmJsZSBkb3duIHRvIHRoZSBpbWFnZS4gT25jZSB0aGUgcmlnaHQtY2xpY2svY29udGV4dG1lbnUgZXZlbnQgb2NjdXJzXG4gICAgICB3ZSBzZXQgdGhlIHBvaW50ZXIgZXZlbnRzIGJhY2sgdG8gYXV0byBmb3IgdGhlIG5hdiBkaXYgc28gaXQgY2FuIGNhcHR1cmUgaG92ZXIgYW5kIGxlZnQtY2xpY2tcbiAgICAgIGV2ZW50cyBhcyB1c3VhbC5cbiAgICAgKi9cbiAgICB0aGlzLiRuYXYub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMpIHtcbiAgICAgICAgc2VsZi4kbmF2LmNzcygncG9pbnRlci1ldmVudHMnLCAnbm9uZScpO1xuXG4gICAgICAgIHNlbGYuJGxpZ2h0Ym94Lm9uZSgnY29udGV4dG1lbnUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB0aGlzLiRuYXYuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XG4gICAgICAgICAgfS5iaW5kKHNlbGYpLCAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1sb2FkZXIsIC5sYi1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5lbmQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBTaG93IG92ZXJsYXkgYW5kIGxpZ2h0Ym94LiBJZiB0aGUgaW1hZ2UgaXMgcGFydCBvZiBhIHNldCwgYWRkIHNpYmxpbmdzIHRvIGFsYnVtIGFycmF5LlxuICBMaWdodGJveC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigkbGluaykge1xuICAgIHZhciBzZWxmICAgID0gdGhpcztcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcblxuICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsICQucHJveHkodGhpcy5zaXplT3ZlcmxheSwgdGhpcykpO1xuXG4gICAgdGhpcy5zaXplT3ZlcmxheSgpO1xuXG4gICAgdGhpcy5hbGJ1bSA9IFtdO1xuICAgIHZhciBpbWFnZU51bWJlciA9IDA7XG5cbiAgICBmdW5jdGlvbiBhZGRUb0FsYnVtKCRsaW5rKSB7XG4gICAgICBzZWxmLmFsYnVtLnB1c2goe1xuICAgICAgICBhbHQ6ICRsaW5rLmF0dHIoJ2RhdGEtYWx0JyksXG4gICAgICAgIGxpbms6ICRsaW5rLmF0dHIoJ2hyZWYnKSxcbiAgICAgICAgdGl0bGU6ICRsaW5rLmF0dHIoJ2RhdGEtdGl0bGUnKSB8fCAkbGluay5hdHRyKCd0aXRsZScpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTdXBwb3J0IGJvdGggZGF0YS1saWdodGJveCBhdHRyaWJ1dGUgYW5kIHJlbCBhdHRyaWJ1dGUgaW1wbGVtZW50YXRpb25zXG4gICAgdmFyIGRhdGFMaWdodGJveFZhbHVlID0gJGxpbmsuYXR0cignZGF0YS1saWdodGJveCcpO1xuICAgIHZhciAkbGlua3M7XG5cbiAgICBpZiAoZGF0YUxpZ2h0Ym94VmFsdWUpIHtcbiAgICAgICRsaW5rcyA9ICQoJGxpbmsucHJvcCgndGFnTmFtZScpICsgJ1tkYXRhLWxpZ2h0Ym94PVwiJyArIGRhdGFMaWdodGJveFZhbHVlICsgJ1wiXScpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkbGlua3MubGVuZ3RoOyBpID0gKytpKSB7XG4gICAgICAgIGFkZFRvQWxidW0oJCgkbGlua3NbaV0pKTtcbiAgICAgICAgaWYgKCRsaW5rc1tpXSA9PT0gJGxpbmtbMF0pIHtcbiAgICAgICAgICBpbWFnZU51bWJlciA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCRsaW5rLmF0dHIoJ3JlbCcpID09PSAnbGlnaHRib3gnKSB7XG4gICAgICAgIC8vIElmIGltYWdlIGlzIG5vdCBwYXJ0IG9mIGEgc2V0XG4gICAgICAgIGFkZFRvQWxidW0oJGxpbmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgaW1hZ2UgaXMgcGFydCBvZiBhIHNldFxuICAgICAgICAkbGlua3MgPSAkKCRsaW5rLnByb3AoJ3RhZ05hbWUnKSArICdbcmVsPVwiJyArICRsaW5rLmF0dHIoJ3JlbCcpICsgJ1wiXScpO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8ICRsaW5rcy5sZW5ndGg7IGogPSArK2opIHtcbiAgICAgICAgICBhZGRUb0FsYnVtKCQoJGxpbmtzW2pdKSk7XG4gICAgICAgICAgaWYgKCRsaW5rc1tqXSA9PT0gJGxpbmtbMF0pIHtcbiAgICAgICAgICAgIGltYWdlTnVtYmVyID0gajtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3NpdGlvbiBMaWdodGJveFxuICAgIHZhciB0b3AgID0gJHdpbmRvdy5zY3JvbGxUb3AoKSArIHRoaXMub3B0aW9ucy5wb3NpdGlvbkZyb21Ub3A7XG4gICAgdmFyIGxlZnQgPSAkd2luZG93LnNjcm9sbExlZnQoKTtcbiAgICB0aGlzLiRsaWdodGJveC5jc3Moe1xuICAgICAgLy8gZWRpdFxuICAgICAgLy8gdG9wOiB0b3AgKyAncHgnLFxuICAgICAgdG9wOiB0b3AgLSAzNSArICdweCcsXG4gICAgICAvLyBlZGl0XG4gICAgICBsZWZ0OiBsZWZ0ICsgJ3B4J1xuICAgIH0pLmZhZGVJbih0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKTtcblxuICAgIC8vIERpc2FibGUgc2Nyb2xsaW5nIG9mIHRoZSBwYWdlIHdoaWxlIG9wZW5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVTY3JvbGxpbmcpIHtcbiAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbGItZGlzYWJsZS1zY3JvbGxpbmcnKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZUltYWdlKGltYWdlTnVtYmVyKTtcbiAgfTtcblxuICAvLyBIaWRlIG1vc3QgVUkgZWxlbWVudHMgaW4gcHJlcGFyYXRpb24gZm9yIHRoZSBhbmltYXRlZCByZXNpemluZyBvZiB0aGUgbGlnaHRib3guXG4gIExpZ2h0Ym94LnByb3RvdHlwZS5jaGFuZ2VJbWFnZSA9IGZ1bmN0aW9uKGltYWdlTnVtYmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBmaWxlbmFtZSA9IHRoaXMuYWxidW1baW1hZ2VOdW1iZXJdLmxpbms7XG4gICAgdmFyIGZpbGV0eXBlID0gZmlsZW5hbWUuc3BsaXQoJy4nKS5zbGljZSgtMSlbMF07XG4gICAgdmFyICRpbWFnZSA9IHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1pbWFnZScpO1xuXG4gICAgLy8gRGlzYWJsZSBrZXlib2FyZCBuYXYgZHVyaW5nIHRyYW5zaXRpb25zXG4gICAgdGhpcy5kaXNhYmxlS2V5Ym9hcmROYXYoKTtcblxuICAgIC8vIFNob3cgbG9hZGluZyBzdGF0ZVxuICAgIHRoaXMuJG92ZXJsYXkuZmFkZUluKHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICQoJy5sYi1sb2FkZXInKS5mYWRlSW4oJ3Nsb3cnKTtcbiAgICB0aGlzLiRsaWdodGJveC5maW5kKCcubGItaW1hZ2UsIC5sYi1uYXYsIC5sYi1wcmV2LCAubGItbmV4dCwgLmxiLWRhdGFDb250YWluZXIsIC5sYi1udW1iZXJzLCAubGItY2FwdGlvbicpLmhpZGUoKTtcbiAgICB0aGlzLiRvdXRlckNvbnRhaW5lci5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG5cbiAgICAvLyBXaGVuIGltYWdlIHRvIHNob3cgaXMgcHJlbG9hZGVkLCB3ZSBzZW5kIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IHRvIHNpemVDb250YWluZXIoKVxuICAgIHZhciBwcmVsb2FkZXIgPSBuZXcgSW1hZ2UoKTtcbiAgICBwcmVsb2FkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJHByZWxvYWRlcjtcbiAgICAgIHZhciBpbWFnZUhlaWdodDtcbiAgICAgIHZhciBpbWFnZVdpZHRoO1xuICAgICAgdmFyIG1heEltYWdlSGVpZ2h0O1xuICAgICAgdmFyIG1heEltYWdlV2lkdGg7XG4gICAgICB2YXIgd2luZG93SGVpZ2h0O1xuICAgICAgdmFyIHdpbmRvd1dpZHRoO1xuXG4gICAgICAkaW1hZ2UuYXR0cih7XG4gICAgICAgICdhbHQnOiBzZWxmLmFsYnVtW2ltYWdlTnVtYmVyXS5hbHQsXG4gICAgICAgICdzcmMnOiBmaWxlbmFtZVxuICAgICAgfSk7XG5cbiAgICAgICRwcmVsb2FkZXIgPSAkKHByZWxvYWRlcik7XG5cbiAgICAgICRpbWFnZS53aWR0aChwcmVsb2FkZXIud2lkdGgpO1xuICAgICAgJGltYWdlLmhlaWdodChwcmVsb2FkZXIuaGVpZ2h0KTtcbiAgICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gICAgICB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbWF4IGltYWdlIGRpbWVuc2lvbnMgZm9yIHRoZSBjdXJyZW50IHZpZXdwb3J0LlxuICAgICAgLy8gVGFrZSBpbnRvIGFjY291bnQgdGhlIGJvcmRlciBhcm91bmQgdGhlIGltYWdlIGFuZCBhbiBhZGRpdGlvbmFsIDEwcHggZ3V0dGVyIG9uIGVhY2ggc2lkZS5cbiAgICAgIG1heEltYWdlV2lkdGggID0gd2luZG93V2lkdGggLSBzZWxmLmNvbnRhaW5lclBhZGRpbmcubGVmdCAtIHNlbGYuY29udGFpbmVyUGFkZGluZy5yaWdodCAtIHNlbGYuaW1hZ2VCb3JkZXJXaWR0aC5sZWZ0IC0gc2VsZi5pbWFnZUJvcmRlcldpZHRoLnJpZ2h0IC0gMjA7XG4gICAgICBtYXhJbWFnZUhlaWdodCA9IHdpbmRvd0hlaWdodCAtIHNlbGYuY29udGFpbmVyUGFkZGluZy50b3AgLSBzZWxmLmNvbnRhaW5lclBhZGRpbmcuYm90dG9tIC0gc2VsZi5pbWFnZUJvcmRlcldpZHRoLnRvcCAtIHNlbGYuaW1hZ2VCb3JkZXJXaWR0aC5ib3R0b20gLSBzZWxmLm9wdGlvbnMucG9zaXRpb25Gcm9tVG9wIC0gNzA7XG5cbiAgICAgIC8qXG4gICAgICBTaW5jZSBtYW55IFNWR3MgaGF2ZSBzbWFsbCBpbnRyaW5zaWMgZGltZW5zaW9ucywgYnV0IHRoZXkgc3VwcG9ydCBzY2FsaW5nXG4gICAgICB1cCB3aXRob3V0IHF1YWxpdHkgbG9zcyBiZWNhdXNlIG9mIHRoZWlyIHZlY3RvciBmb3JtYXQsIG1heCBvdXQgdGhlaXJcbiAgICAgIHNpemUuXG4gICAgICAqL1xuICAgICAgaWYgKGZpbGV0eXBlID09PSAnc3ZnJykge1xuICAgICAgICAkaW1hZ2Uud2lkdGgobWF4SW1hZ2VXaWR0aCk7XG4gICAgICAgICRpbWFnZS5oZWlnaHQobWF4SW1hZ2VIZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBGaXQgaW1hZ2UgaW5zaWRlIHRoZSB2aWV3cG9ydC5cbiAgICAgIGlmIChzZWxmLm9wdGlvbnMuZml0SW1hZ2VzSW5WaWV3cG9ydCkge1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGltYWdlIHNpemUgaXMgbGFyZ2VyIHRoZW4gbWF4V2lkdGh8bWF4SGVpZ2h0IGluIHNldHRpbmdzXG4gICAgICAgIGlmIChzZWxmLm9wdGlvbnMubWF4V2lkdGggJiYgc2VsZi5vcHRpb25zLm1heFdpZHRoIDwgbWF4SW1hZ2VXaWR0aCkge1xuICAgICAgICAgIG1heEltYWdlV2lkdGggPSBzZWxmLm9wdGlvbnMubWF4V2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5tYXhIZWlnaHQgJiYgc2VsZi5vcHRpb25zLm1heEhlaWdodCA8IG1heEltYWdlSGVpZ2h0KSB7XG4gICAgICAgICAgbWF4SW1hZ2VIZWlnaHQgPSBzZWxmLm9wdGlvbnMubWF4SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1heEltYWdlV2lkdGggPSBzZWxmLm9wdGlvbnMubWF4V2lkdGggfHwgcHJlbG9hZGVyLndpZHRoIHx8IG1heEltYWdlV2lkdGg7XG4gICAgICAgIG1heEltYWdlSGVpZ2h0ID0gc2VsZi5vcHRpb25zLm1heEhlaWdodCB8fCBwcmVsb2FkZXIuaGVpZ2h0IHx8IG1heEltYWdlSGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICAvLyBJcyB0aGUgY3VycmVudCBpbWFnZSdzIHdpZHRoIG9yIGhlaWdodCBpcyBncmVhdGVyIHRoYW4gdGhlIG1heEltYWdlV2lkdGggb3IgbWF4SW1hZ2VIZWlnaHRcbiAgICAgIC8vIG9wdGlvbiB0aGFuIHdlIG5lZWQgdG8gc2l6ZSBkb3duIHdoaWxlIG1haW50YWluaW5nIHRoZSBhc3BlY3QgcmF0aW8uXG4gICAgICBpZiAoKHByZWxvYWRlci53aWR0aCA+IG1heEltYWdlV2lkdGgpIHx8IChwcmVsb2FkZXIuaGVpZ2h0ID4gbWF4SW1hZ2VIZWlnaHQpKSB7XG4gICAgICAgIGlmICgocHJlbG9hZGVyLndpZHRoIC8gbWF4SW1hZ2VXaWR0aCkgPiAocHJlbG9hZGVyLmhlaWdodCAvIG1heEltYWdlSGVpZ2h0KSkge1xuICAgICAgICAgIGltYWdlV2lkdGggID0gbWF4SW1hZ2VXaWR0aDtcbiAgICAgICAgICBpbWFnZUhlaWdodCA9IHBhcnNlSW50KHByZWxvYWRlci5oZWlnaHQgLyAocHJlbG9hZGVyLndpZHRoIC8gaW1hZ2VXaWR0aCksIDEwKTtcbiAgICAgICAgICAkaW1hZ2Uud2lkdGgoaW1hZ2VXaWR0aCk7XG4gICAgICAgICAgJGltYWdlLmhlaWdodChpbWFnZUhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW1hZ2VIZWlnaHQgPSBtYXhJbWFnZUhlaWdodDtcbiAgICAgICAgICBpbWFnZVdpZHRoID0gcGFyc2VJbnQocHJlbG9hZGVyLndpZHRoIC8gKHByZWxvYWRlci5oZWlnaHQgLyBpbWFnZUhlaWdodCksIDEwKTtcbiAgICAgICAgICAkaW1hZ2Uud2lkdGgoaW1hZ2VXaWR0aCk7XG4gICAgICAgICAgJGltYWdlLmhlaWdodChpbWFnZUhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNlbGYuc2l6ZUNvbnRhaW5lcigkaW1hZ2Uud2lkdGgoKSwgJGltYWdlLmhlaWdodCgpKTtcbiAgICB9O1xuXG4gICAgLy8gUHJlbG9hZCBpbWFnZSBiZWZvcmUgc2hvd2luZ1xuICAgIHByZWxvYWRlci5zcmMgPSB0aGlzLmFsYnVtW2ltYWdlTnVtYmVyXS5saW5rO1xuICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXggPSBpbWFnZU51bWJlcjtcbiAgfTtcblxuICAvLyBTdHJldGNoIG92ZXJsYXkgdG8gZml0IHRoZSB2aWV3cG9ydFxuICBMaWdodGJveC5wcm90b3R5cGUuc2l6ZU92ZXJsYXkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLypcbiAgICBXZSB1c2UgYSBzZXRUaW1lb3V0IDAgdG8gcGF1c2UgSlMgZXhlY3V0aW9uIGFuZCBsZXQgdGhlIHJlbmRlcmluZyBjYXRjaC11cC5cbiAgICBXaHkgZG8gdGhpcz8gSWYgdGhlIGBkaXNhYmxlU2Nyb2xsaW5nYCBvcHRpb24gaXMgc2V0IHRvIHRydWUsIGEgY2xhc3MgaXMgYWRkZWQgdG8gdGhlIGJvZHlcbiAgICB0YWcgdGhhdCBkaXNhYmxlcyBzY3JvbGxpbmcgYW5kIGhpZGVzIHRoZSBzY3JvbGxiYXIuIFdlIHdhbnQgdG8gbWFrZSBzdXJlIHRoZSBzY3JvbGxiYXIgaXNcbiAgICBoaWRkZW4gYmVmb3JlIHdlIG1lYXN1cmUgdGhlIGRvY3VtZW50IHdpZHRoLCBhcyB0aGUgcHJlc2VuY2Ugb2YgdGhlIHNjcm9sbGJhciB3aWxsIGFmZmVjdCB0aGVcbiAgICBudW1iZXIuXG4gICAgKi9cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi4kb3ZlcmxheVxuICAgICAgICAud2lkdGgoJChkb2N1bWVudCkud2lkdGgoKSlcbiAgICAgICAgLmhlaWdodCgkKGRvY3VtZW50KS5oZWlnaHQoKSk7XG5cbiAgICB9LCAwKTtcbiAgfTtcblxuICAvLyBBbmltYXRlIHRoZSBzaXplIG9mIHRoZSBsaWdodGJveCB0byBmaXQgdGhlIGltYWdlIHdlIGFyZSBzaG93aW5nXG4gIC8vIFRoaXMgbWV0aG9kIGFsc28gc2hvd3MgdGhlIHRoZSBpbWFnZS5cbiAgTGlnaHRib3gucHJvdG90eXBlLnNpemVDb250YWluZXIgPSBmdW5jdGlvbihpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBvbGRXaWR0aCAgPSB0aGlzLiRvdXRlckNvbnRhaW5lci5vdXRlcldpZHRoKCk7XG4gICAgdmFyIG9sZEhlaWdodCA9IHRoaXMuJG91dGVyQ29udGFpbmVyLm91dGVySGVpZ2h0KCk7XG4gICAgdmFyIG5ld1dpZHRoICA9IGltYWdlV2lkdGggKyB0aGlzLmNvbnRhaW5lclBhZGRpbmcubGVmdCArIHRoaXMuY29udGFpbmVyUGFkZGluZy5yaWdodCArIHRoaXMuaW1hZ2VCb3JkZXJXaWR0aC5sZWZ0ICsgdGhpcy5pbWFnZUJvcmRlcldpZHRoLnJpZ2h0O1xuICAgIHZhciBuZXdIZWlnaHQgPSBpbWFnZUhlaWdodCArIHRoaXMuY29udGFpbmVyUGFkZGluZy50b3AgKyB0aGlzLmNvbnRhaW5lclBhZGRpbmcuYm90dG9tICsgdGhpcy5pbWFnZUJvcmRlcldpZHRoLnRvcCArIHRoaXMuaW1hZ2VCb3JkZXJXaWR0aC5ib3R0b207XG5cbiAgICBmdW5jdGlvbiBwb3N0UmVzaXplKCkge1xuICAgICAgc2VsZi4kbGlnaHRib3guZmluZCgnLmxiLWRhdGFDb250YWluZXInKS53aWR0aChuZXdXaWR0aCk7XG4gICAgICBzZWxmLiRsaWdodGJveC5maW5kKCcubGItcHJldkxpbmsnKS5oZWlnaHQobmV3SGVpZ2h0KTtcbiAgICAgIHNlbGYuJGxpZ2h0Ym94LmZpbmQoJy5sYi1uZXh0TGluaycpLmhlaWdodChuZXdIZWlnaHQpO1xuXG4gICAgICAvLyBTZXQgZm9jdXMgb24gb25lIG9mIHRoZSB0d28gcm9vdCBub2RlcyBzbyBrZXlib2FyZCBldmVudHMgYXJlIGNhcHR1cmVkLlxuICAgICAgc2VsZi4kb3ZlcmxheS5mb2N1cygpO1xuXG4gICAgICBzZWxmLnNob3dJbWFnZSgpO1xuICAgIH1cblxuICAgIGlmIChvbGRXaWR0aCAhPT0gbmV3V2lkdGggfHwgb2xkSGVpZ2h0ICE9PSBuZXdIZWlnaHQpIHtcbiAgICAgIHRoaXMuJG91dGVyQ29udGFpbmVyLmFuaW1hdGUoe1xuICAgICAgICB3aWR0aDogbmV3V2lkdGgsXG4gICAgICAgIGhlaWdodDogbmV3SGVpZ2h0XG4gICAgICB9LCB0aGlzLm9wdGlvbnMucmVzaXplRHVyYXRpb24sICdzd2luZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBwb3N0UmVzaXplKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdFJlc2l6ZSgpO1xuICAgIH1cbiAgfTtcblxuICAvLyBEaXNwbGF5IHRoZSBpbWFnZSBhbmQgaXRzIGRldGFpbHMgYW5kIGJlZ2luIHByZWxvYWQgbmVpZ2hib3JpbmcgaW1hZ2VzLlxuICBMaWdodGJveC5wcm90b3R5cGUuc2hvd0ltYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLWxvYWRlcicpLnN0b3AodHJ1ZSkuaGlkZSgpO1xuICAgIHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1pbWFnZScpLmZhZGVJbih0aGlzLm9wdGlvbnMuaW1hZ2VGYWRlRHVyYXRpb24pO1xuXG4gICAgdGhpcy51cGRhdGVOYXYoKTtcbiAgICB0aGlzLnVwZGF0ZURldGFpbHMoKTtcbiAgICB0aGlzLnByZWxvYWROZWlnaGJvcmluZ0ltYWdlcygpO1xuICAgIHRoaXMuZW5hYmxlS2V5Ym9hcmROYXYoKTtcbiAgfTtcblxuICAvLyBEaXNwbGF5IHByZXZpb3VzIGFuZCBuZXh0IG5hdmlnYXRpb24gaWYgYXBwcm9wcmlhdGUuXG4gIExpZ2h0Ym94LnByb3RvdHlwZS51cGRhdGVOYXYgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdG91Y2ggZXZlbnRzLiBJZiBzbywgd2UgdGFrZSB0aGUgY29uc2VydmF0aXZlIGFwcHJvYWNoXG4gICAgLy8gYW5kIGFzc3VtZSB0aGF0IG1vdXNlIGhvdmVyIGV2ZW50cyBhcmUgbm90IHN1cHBvcnRlZCBhbmQgYWx3YXlzIHNob3cgcHJldi9uZXh0IG5hdmlnYXRpb25cbiAgICAvLyBhcnJvd3MgaW4gaW1hZ2Ugc2V0cy5cbiAgICB2YXIgYWx3YXlzU2hvd05hdiA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBkb2N1bWVudC5jcmVhdGVFdmVudCgnVG91Y2hFdmVudCcpO1xuICAgICAgYWx3YXlzU2hvd05hdiA9ICh0aGlzLm9wdGlvbnMuYWx3YXlzU2hvd05hdk9uVG91Y2hEZXZpY2VzKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLW5hdicpLnNob3coKTtcblxuICAgIGlmICh0aGlzLmFsYnVtLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCkge1xuICAgICAgICBpZiAoYWx3YXlzU2hvd05hdikge1xuICAgICAgICAgIHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1wcmV2LCAubGItbmV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLXByZXYsIC5sYi1uZXh0Jykuc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEltYWdlSW5kZXggPiAwKSB7XG4gICAgICAgICAgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLXByZXYnKS5zaG93KCk7XG4gICAgICAgICAgaWYgKGFsd2F5c1Nob3dOYXYpIHtcbiAgICAgICAgICAgIHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1wcmV2JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEltYWdlSW5kZXggPCB0aGlzLmFsYnVtLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICB0aGlzLiRsaWdodGJveC5maW5kKCcubGItbmV4dCcpLnNob3coKTtcbiAgICAgICAgICBpZiAoYWx3YXlzU2hvd05hdikge1xuICAgICAgICAgICAgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLW5leHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBEaXNwbGF5IGNhcHRpb24sIGltYWdlIG51bWJlciwgYW5kIGNsb3NpbmcgYnV0dG9uLlxuICBMaWdodGJveC5wcm90b3R5cGUudXBkYXRlRGV0YWlscyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIEVuYWJsZSBhbmNob3IgY2xpY2tzIGluIHRoZSBpbmplY3RlZCBjYXB0aW9uIGh0bWwuXG4gICAgLy8gVGhhbmtzIE5hdGUgV3JpZ2h0IGZvciB0aGUgZml4LiBAaHR0cHM6Ly9naXRodWIuY29tL05hdGVXclxuICAgIGlmICh0eXBlb2YgdGhpcy5hbGJ1bVt0aGlzLmN1cnJlbnRJbWFnZUluZGV4XS50aXRsZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHRoaXMuYWxidW1bdGhpcy5jdXJyZW50SW1hZ2VJbmRleF0udGl0bGUgIT09ICcnKSB7XG4gICAgICB2YXIgJGNhcHRpb24gPSB0aGlzLiRsaWdodGJveC5maW5kKCcubGItY2FwdGlvbicpO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zYW5pdGl6ZVRpdGxlKSB7XG4gICAgICAgICRjYXB0aW9uLnRleHQodGhpcy5hbGJ1bVt0aGlzLmN1cnJlbnRJbWFnZUluZGV4XS50aXRsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkY2FwdGlvbi5odG1sKHRoaXMuYWxidW1bdGhpcy5jdXJyZW50SW1hZ2VJbmRleF0udGl0bGUpO1xuICAgICAgfVxuICAgICAgJGNhcHRpb24uZmFkZUluKCdmYXN0Jyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWxidW0ubGVuZ3RoID4gMSAmJiB0aGlzLm9wdGlvbnMuc2hvd0ltYWdlTnVtYmVyTGFiZWwpIHtcbiAgICAgIHZhciBsYWJlbFRleHQgPSB0aGlzLmltYWdlQ291bnRMYWJlbCh0aGlzLmN1cnJlbnRJbWFnZUluZGV4ICsgMSwgdGhpcy5hbGJ1bS5sZW5ndGgpO1xuICAgICAgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLW51bWJlcicpLnRleHQobGFiZWxUZXh0KS5mYWRlSW4oJ2Zhc3QnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLW51bWJlcicpLmhpZGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLiRvdXRlckNvbnRhaW5lci5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG5cbiAgICB0aGlzLiRsaWdodGJveC5maW5kKCcubGItZGF0YUNvbnRhaW5lcicpLmZhZGVJbih0aGlzLm9wdGlvbnMucmVzaXplRHVyYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNlbGYuc2l6ZU92ZXJsYXkoKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBQcmVsb2FkIHByZXZpb3VzIGFuZCBuZXh0IGltYWdlcyBpbiBzZXQuXG4gIExpZ2h0Ym94LnByb3RvdHlwZS5wcmVsb2FkTmVpZ2hib3JpbmdJbWFnZXMgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5hbGJ1bS5sZW5ndGggPiB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ICsgMSkge1xuICAgICAgdmFyIHByZWxvYWROZXh0ID0gbmV3IEltYWdlKCk7XG4gICAgICBwcmVsb2FkTmV4dC5zcmMgPSB0aGlzLmFsYnVtW3RoaXMuY3VycmVudEltYWdlSW5kZXggKyAxXS5saW5rO1xuICAgIH1cbiAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCA+IDApIHtcbiAgICAgIHZhciBwcmVsb2FkUHJldiA9IG5ldyBJbWFnZSgpO1xuICAgICAgcHJlbG9hZFByZXYuc3JjID0gdGhpcy5hbGJ1bVt0aGlzLmN1cnJlbnRJbWFnZUluZGV4IC0gMV0ubGluaztcbiAgICB9XG4gIH07XG5cbiAgTGlnaHRib3gucHJvdG90eXBlLmVuYWJsZUtleWJvYXJkTmF2ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kbGlnaHRib3gub24oJ2tleXVwLmtleWJvYXJkJywgJC5wcm94eSh0aGlzLmtleWJvYXJkQWN0aW9uLCB0aGlzKSk7XG4gICAgdGhpcy4kb3ZlcmxheS5vbigna2V5dXAua2V5Ym9hcmQnLCAkLnByb3h5KHRoaXMua2V5Ym9hcmRBY3Rpb24sIHRoaXMpKTtcbiAgfTtcblxuICBMaWdodGJveC5wcm90b3R5cGUuZGlzYWJsZUtleWJvYXJkTmF2ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kbGlnaHRib3gub2ZmKCcua2V5Ym9hcmQnKTtcbiAgICB0aGlzLiRvdmVybGF5Lm9mZignLmtleWJvYXJkJyk7XG4gIH07XG5cbiAgTGlnaHRib3gucHJvdG90eXBlLmtleWJvYXJkQWN0aW9uID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgS0VZQ09ERV9FU0MgICAgICAgID0gMjc7XG4gICAgdmFyIEtFWUNPREVfTEVGVEFSUk9XICA9IDM3O1xuICAgIHZhciBLRVlDT0RFX1JJR0hUQVJST1cgPSAzOTtcblxuICAgIHZhciBrZXljb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICBpZiAoa2V5Y29kZSA9PT0gS0VZQ09ERV9FU0MpIHtcbiAgICAgIC8vIFByZXZlbnQgYnViYmxpbmcgc28gYXMgdG8gbm90IGFmZmVjdCBvdGhlciBjb21wb25lbnRzIG9uIHRoZSBwYWdlLlxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB0aGlzLmVuZCgpO1xuICAgIH0gZWxzZSBpZiAoa2V5Y29kZSA9PT0gS0VZQ09ERV9MRUZUQVJST1cpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRJbWFnZUluZGV4ICE9PSAwKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UodGhpcy5jdXJyZW50SW1hZ2VJbmRleCAtIDEpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiB0aGlzLmFsYnVtLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSh0aGlzLmFsYnVtLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5Y29kZSA9PT0gS0VZQ09ERV9SSUdIVEFSUk9XKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCAhPT0gdGhpcy5hbGJ1bS5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSW1hZ2UodGhpcy5jdXJyZW50SW1hZ2VJbmRleCArIDEpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiB0aGlzLmFsYnVtLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VJbWFnZSgwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gQ2xvc2luZyB0aW1lLiA6LShcbiAgTGlnaHRib3gucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZGlzYWJsZUtleWJvYXJkTmF2KCk7XG4gICAgJCh3aW5kb3cpLm9mZigncmVzaXplJywgdGhpcy5zaXplT3ZlcmxheSk7XG4gICAgdGhpcy4kbGlnaHRib3guZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKTtcbiAgICB0aGlzLiRvdmVybGF5LmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVTY3JvbGxpbmcpIHtcbiAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbGItZGlzYWJsZS1zY3JvbGxpbmcnKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBMaWdodGJveCgpO1xufSkpO1xuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xyXG5pbXBvcnQgJy4vbGlicy9qcXVlcnkuSmNyb3AnXHJcbmltcG9ydCAqIGFzIExpZ2h0Ym94IGZyb20gJy4vbGlicy9saWdodGJveCdcclxuaW1wb3J0IHtcclxuICAgIGluaXRTbGlkZXIsXHJcbiAgICB0b2dnbGVQb3B1cCxcclxuICAgIGV4cGFuZFNlYXJjaCxcclxuICAgIGluaXROYXZUYWJzLFxyXG4gICAgc2hvd1Ryb3VibGVUaWNrZXRGb3JtXHJcbiAgICAvLyBQb3BVcFxyXG59IGZyb20gJy4vdXRpbHMnXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gc2V0dGluZyBzbGlkZXJcclxuXHJcbiAgICBpbml0U2xpZGVyKDc2OClcclxuXHJcbiAgICAvL2hlYWRlciBhbmltYXRpb25zXHJcblxyXG4gICAgZXhwYW5kU2VhcmNoKCdoZWFkZXInKVxyXG4gICAgaW5pdE5hdlRhYnMoJy5oZWFkZXItbmF2bGluaycpXHJcbiAgICAvLyBwb3B1cHNcclxuXHJcbiAgICBjb25zdCBwb3B1cCA9ICQoJy5wb3B1cC1tZW51JylcclxuICAgIHRvZ2dsZVBvcHVwKCd0cmlnZ2VyJywgJ3BvcHVwJylcclxuXHJcbiAgICB0b2dnbGVQb3B1cCgnaGVhZGVyLW1lbnUtYnRuJywgJ2J1cmdlcicpXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCAxMjc5KSB0b2dnbGVQb3B1cCgnaGVhZGVyLXVzZXItbG9nZ2VkJywgJ3VzZXInKVxyXG4gICAgZXhwYW5kU2VhcmNoKCdidXJnZXInKVxyXG4gICAgLy8gYXV0by1leHBhbmRpbmcgdGV4dGFyZWFcclxuXHJcbiAgICAkKCd0ZXh0YXJlYScpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS50YXJnZXQuc3R5bGUuaGVpZ2h0ID0gZS50YXJnZXQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuICAgIH0pXHJcblxyXG4gICAgLy8gZGVza3RvcCB1c2VyIG1lbnUgaG92ZXIgYXBwZWFyYW5jZVxyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDEyNzkpIHtcclxuICAgICAgICAkKCcuaGVhZGVyLXVzZXItYXZhdGFyJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy51c2VyLW1lbnUnKS5zaG93KDIwMClcclxuICAgICAgICAgICAgJCgnLnVzZXItbWVudScpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKDIwMClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuLy8gYXV0by1leHBhbmRpbmcgdGV4dGFyZWFcclxuXHJcblxyXG5jb25zdCBpbml0aWFsSGVpZ2h0ID0gJCgndGV4dGFyZWEnKS5oZWlnaHQoKSArICdweCdcclxuXHJcbiQoJ3RleHRhcmVhJykub24oJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSBlLnRhcmdldC5zY3JvbGxIZWlnaHQgKyAncHgnXHJcblxyXG4gICAgJCh0aGlzKS5jc3MoJ2hlaWdodCcsIGN1cnJlbnRIZWlnaHQpXHJcbiAgICBpZiAoISQodGhpcykudmFsKCkpIHtcclxuICAgICAgICAkKHRoaXMpLmhlaWdodChpbml0aWFsSGVpZ2h0KVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gU2hvdyBFWElGXHJcblxyXG5jb25zdCBleGlmQnV0dG9uID0gJCgnLmV4aWYtYnRuJylcclxuY29uc3QgZXhpZkNvbnRlbnQgPSAkKCcuZXhpZi1jb250ZW50JylcclxuXHJcbmV4aWZCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuXHJcbiAgICBpZiAoIWV4aWZCdXR0b24uaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgIGV4aWZCdXR0b24uYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgZXhpZkJ1dHRvbi5uZXh0KCdwJykudGV4dCgn0KHQutGA0YvRgtGMIEVYSUYnKVxyXG4gICAgICAgIGV4aWZDb250ZW50LnNob3coKVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgZXhpZkJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuICAgICAgICBleGlmQnV0dG9uLm5leHQoJ3AnKS50ZXh0KCfQn9C+0LrQsNC30LDRgtGMIEVYSUYnKVxyXG4gICAgICAgIGV4aWZDb250ZW50LmhpZGUoKVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gZG90cy1tZW51XHJcblxyXG4kKCcuaGVyby1tb3JlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBjb25zdCB0YXJnZXQgPSAkKCcuZG90cy1tZW51JylcclxuICAgIHRhcmdldC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIH0pXHJcbiAgICB0YXJnZXQudG9nZ2xlKClcclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub25lKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgJCgnLmRvdHMtbWVudScpLmhpZGUoKVxyXG4gICAgICAgICAgICAkKCcuaGVyby1tb3JlJykudHJpZ2dlcignYmx1cicpXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgICAkKGRvY3VtZW50KS5vbmUoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgJCgnLmRvdHMtbWVudScpLmhpZGUoKVxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigpXHJcblxyXG4gICAgfSlcclxufSlcclxuXHJcbi8vIGxpZ2h0Ym94IG9wdGlvbnNcclxuXHJcbkxpZ2h0Ym94Lm9wdGlvbih7XHJcbiAgICAnZGlzYWJsZVNjcm9sbGluZyc6IHRydWUsXHJcbn0pXHJcblxyXG4vLyDQtNC+0LHQsNCy0LvQtdC90LjQtSDRhNC+0YLQvtCz0YDQsNGE0LjQuCDQsiDRgdC/0LjRgdC+0Log0LjQt9Cx0YDQsNC90L3Ri9GFXHJcbiQoJy5waG90by1idG4tbGlrZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIFxyXG4gICAgY29uc3QgYnV0dG9uID0gJCh0aGlzKTtcclxuICAgIGxldCBhY3Rpb24gPSAnYWRkJztcclxuICAgIGlmIChidXR0b24uaGFzQ2xhc3MoJ2FjdGl2ZScpKSBhY3Rpb24gPSAncm0nO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgdXJsOiAnL3Bob3RvL2FqYXhGYXZvdXJpdGVQaG90by8nLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgJ2lkJzogYnV0dG9uLmF0dHIoJ2RhdGEtaWQnKSxcclxuICAgICAgICAgICAgJ2FjdGlvbic6IGFjdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICBpZiAobXNnID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBwYXJzZUludCgkKFwiLnBob3RvLWxpa2VzLWNvdW50ZXJcIikudGV4dCgpKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIucGhvdG8tbGlrZXMtY291bnRlclwiKS50ZXh0KGNvdW50ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNhZGRfZmF2b3VyaXRlX3Bob3RvX3RvZ2dsZSBzcGFuXCIpLnRleHQoY291bnQgLSAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKCfQntGI0LjQsdC60LAnKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy50cmlnZ2VyJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChtc2cpIHtcclxuXHJcbiAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKCfQntGI0LjQsdC60LAnKTtcclxuICAgICAgICAgICAgcG9wdXAuZmluZCgnLnRyaWdnZXInKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKiDQk9Ce0JvQntCh0J7QktCQ0J3QmNCVINCX0JAg0KTQntCi0J7Qk9Cg0JDQpNCY0K4qL1xyXG5cclxuJCgnLnJhdGluZ3MtcmF0ZS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmICgkKHRoaXMpLnBhcmVudHMoJy5kaXNhYmxlZCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnV0dG9uID0gJCh0aGlzKTtcclxuICAgIGNvbnN0IHZvdGVUeXBlID0gYnV0dG9uLmRhdGEoJ3ZvdGVUeXBlJyk7XHJcbiAgICBjb25zdCBwaG90b0lkID0gYnV0dG9uLmRhdGEoJ3Bob3RvSWQnKTtcclxuICAgIFxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIHVybDogJy9waG90by9hamF4UmVjb21tZW5kJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICdyZWNvbW1lbmQnOiB2b3RlVHlwZSxcclxuICAgICAgICAgICAgJ2lkJzogcGhvdG9JZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnJhdGluZ3MnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtTm9kZSA9IGJ1dHRvbi5wYXJlbnQoJy5yYXRpbmdzLWNhdGVnb3J5Jyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtTm9kZS5hZGRDbGFzcygnY2hvaWNlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnROb2RlID0gaXRlbU5vZGUuZmluZCgnLnJhdGluZ3MtY291bnRlcicpO1xyXG4gICAgICAgICAgICAgICAgY291bnROb2RlLmh0bWwocGFyc2VJbnQoY291bnROb2RlLnRleHQoKSkgKyAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcuaW5zZXJ0aW9uJykuaHRtbChtc2cuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXAuZmluZCgnLnRyaWdnZXInKS50cmlnZ2VyKCdjbGljaycpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gdmFyIHBvcHVwID0gbmV3IFBvcFVwKCk7XHJcbiAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKCfQn9GA0L7QuNC30L7RiNC70LAg0L3QtdC/0YDQtdC00LLQuNC00LXQvdC90LDRjyDQvtGI0LjQsdC60LAnKTtcclxuICAgICAgICAgICAgcG9wdXAuZmluZCgnLnRyaWdnZXInKS50cmlnZ2VyKCdjbGljaycpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pXHJcblxyXG4vKiDQmtCe0J3QldCmOiDQk9Ce0JvQntCh0J7QktCQ0J3QmNCVINCX0JAg0KTQntCi0J7Qk9Cg0JDQpNCY0K4qL1xyXG5cclxuXHJcblxyXG4vKiDQn9Ce0JbQkNCb0J7QktCQ0KLQrNCh0K8g0J3QkCDQpNCe0KLQniAqL1xyXG5cclxuJCgnLnBob3RvLWJ0bi1jb21wbGFpbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyDQsdC10YDRkdC8IElEINGE0L7RgtC+INC40Lcg0LrQvdC+0L/QutC4IFwi0LTQvtCx0LDQstC40YLRjCDQsiDQuNC30LHRgNCw0L3QvdC+0LVcIlxyXG4gICAgY29uc3QgaWQgPSAkKCcucGhvdG8tYnRuLWxpa2UnKS5hdHRyKCdkYXRhLWlkJylcclxuICAgIHNob3dUcm91YmxlVGlja2V0Rm9ybSgnUGhvdG8nLCBpZCk7XHJcbn0pO1xyXG5cclxuLyog0JrQntCd0JXQpjog0J/QntCW0JDQm9Ce0JLQkNCi0KzQodCvINCd0JAg0KTQntCi0J4gKi9cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLyog0JrQndCe0J/QmtCYINCd0JDQl9CQ0JQv0JLQn9CV0KDQgdCUINCd0JAg0KTQntCi0J7Qk9Cg0JDQpNCY0JggKi9cclxuZnVuY3Rpb24gbW92ZUJ5UGhvdG9TdHJlYW0ocGhvdG9BTm9kZSkge1xyXG4gICAgaWYgKCQoJy5waG90by1wcmV2aWV3LW5hdicpLmxlbmd0aCA+IDAgJiYgcGhvdG9BTm9kZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24gPSBwaG90b0FOb2RlLmF0dHIoJ2hyZWYnKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbmV4dFBob3RvU3RyZWFtQU5vZGUgPSAkKCcucGhvdG8tcHJldmlldy1uYXYgLnBob3RvLXByZXZpZXcuYWN0aXZlJykubmV4dCgnYSwucGhvdG8tZnJhbWUnKTtcclxuaWYgKG5leHRQaG90b1N0cmVhbUFOb2RlLmxlbmd0aCA+IDApIHtcclxuICAgICQoJy5waG90by1idG4tbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG1vdmVCeVBob3RvU3RyZWFtKG5leHRQaG90b1N0cmVhbUFOb2RlLmhhc0NsYXNzKCdwaG90by1mcmFtZScpID8gJCgnYScsIG5leHRQaG90b1N0cmVhbUFOb2RlKSA6IG5leHRQaG90b1N0cmVhbUFOb2RlKTtcclxuICAgIH0pXHJcbiAgICAvLyAkKCcuY29udHJvbC1jb250YWluZXIubmV4dCcpLnNob3coKTtcclxufVxyXG5cclxuY29uc3QgcHJldlBob3RvU3RyZWFtQU5vZGUgPSAkKCcucGhvdG8tcHJldmlldy1uYXYgLnBob3RvLXByZXZpZXcuYWN0aXZlJykucHJldignYSwucGhvdG8tZnJhbWUnKTtcclxuaWYgKHByZXZQaG90b1N0cmVhbUFOb2RlLmxlbmd0aCA+IDApIHtcclxuICAgICQoJy5waG90by1idG4tcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIG1vdmVCeVBob3RvU3RyZWFtKHByZXZQaG90b1N0cmVhbUFOb2RlLmhhc0NsYXNzKCdwaG90by1mcmFtZScpID8gJCgnYScsIHByZXZQaG90b1N0cmVhbUFOb2RlKSA6IHByZXZQaG90b1N0cmVhbUFOb2RlKTtcclxuICAgIH0pXHJcbiAgICAvLyAkKCcuY29udHJvbC1jb250YWluZXIucHJldicpLnNob3coKTtcclxufVxyXG4vKiDQmtCe0J3QldCmOiDQmtCd0J7Qn9Ca0Jgg0J3QkNCX0JDQlC/QktCf0JXQoNCB0JQg0J3QkCDQpNCe0KLQntCg0JPQoNCQ0KTQmNCYKi9cclxuXHJcblxyXG5cclxuLy8gQ09NTUVOVCBGT1JNXHJcblxyXG4kKCcuY29tbWVudHMnKS5vbignc3VibWl0JywgJy5jb21tZW50cy10ZXh0ZmllbGQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vIGNvbnN0IHBhcmVudCA9ICQodGhpcykucGFyZW50cygnLmNvbW1lbnQtYmxvY2snKTtcclxuICAgIGNvbnN0IGZvcm0gPSAkKHRoaXMpO1xyXG4gICAgXHJcbiAgICBmb3JtLmZpbmQoJzpzdWJtaXQnKS5odG1sKCfQntGC0L/RgNCw0LLQutCwLi4uJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIHVybDogXCIvcGhvdG8vYWpheFBob3RvQ29tbWVudC9cIixcclxuICAgICAgICBkYXRhVHlwZTogXCJ0ZXh0IGpzb25cIixcclxuICAgICAgICBkYXRhOiBmb3JtLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoanF4aHIpIHtcclxuICAgICAgICAgICAgaWYgKGpxeGhyLnJlc3BvbnNlSlNPTi5lcnJvciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcjY29tbWVudF8nICsganF4aHIucmVzcG9uc2VKU09OLmlkO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcuaW5zZXJ0aW9uJykuaHRtbCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsC4g0J/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0LUg0YHRgtGA0LDQvdC40YbRgy4nKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy50cmlnZ2VyJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcG9wdXAuZmluZCgnLmluc2VydGlvbicpLmh0bWwoJ9Cf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAuINCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtC1INGB0YLRgNCw0L3QuNGG0YMuJyk7XHJcbiAgICAgICAgICAgIHBvcHVwLmZpbmQoJy50cmlnZ2VyJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuJCgnLmhlcm8tc3Vic2NyaWJlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGFjdGlvblR5cGUgPSAkKHRoaXMpLmhhc0NsYXNzKCdzdWJzY3JpYmVkJykgPyAnZGVsZXRlJyA6ICdhZGQnO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgdXJsOiAnL21lbWJlci9hZGREZWxldGVGYXZvcml0ZUF1dGhvcicsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0eXBlOiBhY3Rpb25UeXBlLFxyXG4gICAgICAgICAgICBpZDogJCh0aGlzKS5kYXRhKCdtZW1iZXJJZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS50eXBlID09ICdzdHJpbmcnICYmIGRhdGEudHlwZSA9PSAnb2snKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuaGVyby1zdWJzY3JpYmUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgY291bnRTdWJzY3JpYmVycz1wYXJzZUludCgkKHRoaXMpLmNoaWxkcmVuKCcuY291bnQnKS50ZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25UeXBlID09ICdhZGQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvdW50U3Vic2NyaWJlcnMrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KCfQntCi0J/QmNCh0JDQotCs0KHQrycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzdWJzY3JpYmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmlsdGVyKCcuZ3JlZW4nKS5hZGRDbGFzcygnd2hpdGUnKS5yZW1vdmVDbGFzcygnZ3JlZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3VudFN1YnNjcmliZXJzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5jYXB0aW9uJykudGV4dCgn0J/QntCU0J/QmNCh0JDQotCs0KHQrycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdzdWJzY3JpYmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmlsdGVyKCcud2hpdGUnKS5hZGRDbGFzcygnZ3JlZW4nKS5yZW1vdmVDbGFzcygnd2hpdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJCh0aGlzKS5jaGlsZHJlbignLmNvdW50JykudGV4dChjb3VudFN1YnNjcmliZXJzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9wdXAuZmluZCgnLmluc2VydGlvbicpLmh0bWwoYNCh0L7QvtCx0YnQtdC90LjQtTogJHtkYXRhLnRleHR9YCk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcudHJpZ2dlcicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcG9wdXAgPSBuZXcgUG9wVXAoKTtcclxuICAgICAgICAgICAgICAgIC8vIHBvcHVwLnNldENvbnRlbnQoJzxoMz48L2gzPicgKyBkYXRhLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gcG9wdXAub3BlbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzICE9ICdwYXJzZXJlcnJvcicgfHwganFYSFIucmVzcG9uc2VUZXh0ICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcG9wdXAgPSBuZXcgUG9wVXAoKTtcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKGDQntGI0LjQsdC60LA6ICR7dGV4dFN0YXR1c308YnI+JHtqcVhIUi5yZXNwb25zZVRleHR9YCk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcudHJpZ2dlcicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBwb3B1cC5zZXRDb250ZW50KCc8aDM+PC9oMz4nICsgdGV4dFN0YXR1cyArICc8YnI+JyArIGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAvLyBwb3B1cC5vcGVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiQoJy5wb3N0LXJlcGx5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgJCgnLnBvc3QtcmVwbHknKS5zaG93KClcclxuICAgICQoJy5wb3N0IC5jb21tZW50cy10ZXh0ZmllbGQnKS5yZW1vdmUoKTtcclxuICAgICQoJy5wb3N0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG5cclxuICAgIGNvbnN0IGZvcm1UZW1wbGF0ZSA9ICQoJy5jb21tZW50cy10ZXh0ZmllbGQnKS5jbG9uZSgpLmF0dHIoJ2lkJywgJ3l3MScpOyAgIFxyXG4gICAgY29uc3QgY29tbWVudEJsb2NrID0gJCh0aGlzKS5wYXJlbnRzKCcucG9zdC1jb250YWluZXInKTtcclxuICAgIGNvbnNvbGUubG9nKGNvbW1lbnRCbG9jaylcclxuICAgICQoJyNQaG90b0NvbW1lbnRfcGFyZW50X2lkJywgZm9ybVRlbXBsYXRlKS52YWwoY29tbWVudEJsb2NrLmRhdGEoJ2NvbW1lbnRJZCcpKTtcclxuICAgIGZvcm1UZW1wbGF0ZS5hcHBlbmRUbyhjb21tZW50QmxvY2spXHJcbiAgICBcclxuICAgIGNvbW1lbnRCbG9jay5maW5kKCd0ZXh0YXJlYScpLnRyaWdnZXIoJ2ZvY3VzJyk7XHJcbiAgICBjb21tZW50QmxvY2suYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAkKHRoaXMpLmhpZGUoKVxyXG59KTtcclxuXHJcblxyXG4kKCcucG9zdC1kZWxldGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgY29tbWVudEJsb2NrID0gJCh0aGlzKS5wYXJlbnRzKCcucG9zdC1jb250YWluZXInKTtcclxuICAgIHZhciBjb21tZW50X2lkID0gY29tbWVudEJsb2NrLmRhdGEoJ2NvbW1lbnRJZCcpO1xyXG5cclxuICAgIC8vIGNvbW1lbnRCbG9jay5maW5kKCcubWVudS1pdGVtIC5kcm9wZG93bi13cmFwJykucmVtb3ZlKCk7XHJcbiAgICBjb21tZW50QmxvY2suYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgdXJsOiAnL3Bob3RvL2FqYXhEZWxldGVQaG90b0NvbW1lbnQvJyxcclxuICAgICAgICBkYXRhOiB7J2lkJyA6IGNvbW1lbnRfaWR9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKG1zZyl7XHJcbiAgICAgICAgICAgIGlmKG1zZyA9PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRCbG9jay5mYWRlT3V0KCdzbG93JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudEJsb2NrLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcG9wdXAgPSBuZXcgUG9wVXAoKTtcclxuICAgICAgICAgICAgICAgIC8vIHBvcHVwLnNldENvbnRlbnQoJzxwPtCf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAuINCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtC1INGB0YLRgNCw0L3QuNGG0YMuPC9wPicpO1xyXG4gICAgICAgICAgICAgICAgLy8gcG9wdXAub3BlbigpO1xyXG4gICAgICAgICAgICAgICAgcG9wdXAuZmluZCgnLmluc2VydGlvbicpLmh0bWwoJ9Cf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAuINCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtC1INGB0YLRgNCw0L3QuNGG0YMuJyk7XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5maW5kKCcudHJpZ2dlcicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHBvcHVwLmZpbmQoJy5pbnNlcnRpb24nKS5odG1sKCfQn9GA0L7QuNC30L7RiNC70LAg0L7RiNC40LHQutCwLiDQn9C10YDQtdC30LDQs9GA0YPQt9C40YLQtSDRgdGC0YDQsNC90LjRhtGDLicpO1xyXG4gICAgICAgICAgICBwb3B1cC5maW5kKCcudHJpZ2dlcicpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgfSBcclxuICAgIH0pO1xyXG59KVxyXG5cclxuJCgnLnBvc3QtY29tcGxhaW4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgc2hvd1Ryb3VibGVUaWNrZXRGb3JtKCdQaG90b0NvbW1lbnQnLCAkKHRoaXMpLmRhdGEoJ2NvbW1lbnRJZCcpKTtcclxufSlcclxuXHJcblxyXG4vKiDQmtCe0JQg0JTQm9CvINCS0KHQotCQ0JLQmtCYKi9cclxuXHJcbi8vICQoJyNpbWdfY29kZV9idXR0b25fbmV3JykuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgIHZhciBwb3B1cCA9IG5ldyBQb3BVcCgpO1xyXG4vLyAgICAgcG9wdXAuc2V0Q29udGVudCgnPHA+0JrQvtC0INC00LvRjyDQstGB0YLQsNCy0LrQuCDQsiDQsdC70L7QszwvcD4nKTtcclxuLy8gICAgIHBvcHVwLm9wZW4oKTtcclxuLy8gfSk7XHJcblxyXG4vKiDQmtCe0J3QldCmOiDQmtCe0JQg0JTQm9CvINCS0KHQotCQ0JLQmtCYKi9cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKiDQmtCe0JzQnNCV0J3QotCY0KDQntCS0JDQotCsINCe0JHQm9CQ0KHQotCsINCd0JAg0KTQntCi0J7Qk9Cg0JDQpNCY0JggKi9cclxuXHJcbi8vIHZhciBjb21tZW50QmxvY2tXaXRoQ3JvcDtcclxuXHJcbi8vICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmNvbW1lbnQtcGhvdG8tcGFydCcsIGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4vLyAgICAgY29tbWVudEJsb2NrV2l0aENyb3AgPSAkKHRoaXMpLmNsb3Nlc3QoJy5jb21tZW50Jyk7XHJcbi8vICAgICB3aW5kb3cuY3JvcEFuZFNjcm9sbFRvID0gY29tbWVudEJsb2NrV2l0aENyb3A7XHJcblxyXG4vLyAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XHJcbi8vICAgICAgICAgc2Nyb2xsVG9wOiAkKCcucGhvdG8tY29udGVudCcpLm9mZnNldCgpLnRvcFxyXG4vLyAgICAgfSwgNDAwKTtcclxuXHJcbi8vICAgICBpbml0SmNyb3AoJ2NvbW1lbnQnLCB0cnVlKTtcclxuLy8gfSk7XHJcblxyXG4vLyAvLyDQstGL0LLQtdGB0YLQuCDQv9Cw0YDQsNC80LXRgtGAINC60YDQvtC/0LAg0LIg0LrQvtC80LzQtdC90YLQsNGA0LjQuFxyXG4vLyAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hZGQtY3JvcC10by1jb21tZW50JywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbi8vICAgICB2YXIgYmlnUGhvdG8gPSAkKCcjYmlnX3Bob3RvJyk7XHJcbi8vICAgICB2YXIgYm91bmRzID0gamNyb3BfYXBpLnRlbGxTZWxlY3QoKTtcclxuLy8gICAgIHZhciBpbWdfd2lkdGggPSBiaWdQaG90by53aWR0aCgpO1xyXG4vLyAgICAgdmFyIGltZ19oZWlnaHQgPSBiaWdQaG90by5oZWlnaHQoKTtcclxuLy8gICAgIHZhciBvdXRwdXQgPSAnPCEtLUNST1AoJyArIGJvdW5kcy54ICsgJywnICsgYm91bmRzLnkgKyAnLCcgKyAoaW1nX3dpZHRoIC0gYm91bmRzLngyKSArICcsJyArIChpbWdfaGVpZ2h0IC0gYm91bmRzLnkyKSArICcpLS0+JztcclxuXHJcbi8vICAgICB2YXIgdGV4dGFyZWEgPSBjb21tZW50QmxvY2tXaXRoQ3JvcC5maW5kKCd0ZXh0YXJlYScpO1xyXG4vLyAgICAgdGV4dGFyZWEudmFsKHRleHRhcmVhLnZhbCgpICsgb3V0cHV0KTtcclxuXHJcbi8vICAgICAkKCcuY3JvcC1kZXN0cm95JykudHJpZ2dlcignY2xpY2snKTtcclxuLy8gfSk7XHJcblxyXG4vKiDQmtCe0J3QldCmOiDQmtCe0JzQnNCV0J3QotCY0KDQntCS0JDQotCsINCe0JHQm9CQ0KHQotCsINCd0JAg0KTQntCi0J7Qk9Cg0JDQpNCY0JggKi9cclxuXHJcblxyXG5cclxuXHJcblxyXG4vKiDQodCV0KLQmtCQICovXHJcblxyXG4vLyAkKCcjc2hvdy1ncmlkLWJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vICAgICBpbml0SmNyb3AoJ2dvbGRlblNlY3Rpb24nLCBmYWxzZSk7XHJcbi8vIH0pO1xyXG5cclxuLyog0JrQntCd0JXQpjog0KHQldCi0JrQkCovXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qINCf0J7QmtCQ0JfQkNCi0Kwg0JrQoNCe0J8g0J3QkCDQpNCe0KLQntCT0KDQkNCk0JjQmCovXHJcblxyXG4vLyDQl9Cw0L/QvtC80L3QuNGC0YwsINC60YPQtNCwINCy0LXRgNC90YPRgtGM0YHRjyDQv9C+0YHQu9C1INC30LDQutGA0YvRgtC40Y8g0LrRgNC+0L/QsFxyXG5cclxuLy8gJCgnYm9keScpLm9uKCdjbGljaycsICcuc2hvd0Nyb3BCdXR0b24nLCBmdW5jdGlvbiAoZSkge1xyXG4vLyAgICAgaWYgKCQodGhpcykuY2xvc2VzdCgnLmNvbW1lbnQnKS5sZW5ndGggPiAwKSB7XHJcbi8vICAgICAgICAgd2luZG93LmNyb3BBbmRTY3JvbGxUbyA9ICQodGhpcykuY2xvc2VzdCgnLmNvbW1lbnQnKTtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgd2luZG93LmNyb3BBbmRTY3JvbGxUbyA9ICQodGhpcyk7XHJcbi8vICAgICB9XHJcbi8vIH0pXHJcblxyXG4vLyDQn9C+0LrQsNC30LDRgtGMIGNyb3Ag0L3QsCDRhNC+0YLQvlxyXG4vLyBmdW5jdGlvbiBTZXRDcm9wKHgsIHksIHgyLCB5Mikge1xyXG4vLyAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XHJcbi8vICAgICAgICAgc2Nyb2xsVG9wOiAkKCcucGhvdG8tY29udGVudCcpLm9mZnNldCgpLnRvcFxyXG4vLyAgICAgfSwgNDAwKTtcclxuXHJcbi8vICAgICBpbml0SmNyb3AoJ2Zyb21fY29tbWVudCcsIGZhbHNlKTtcclxuXHJcbi8vICAgICB2YXIgaW1nX3dpZHRoID0gJCgnI2JpZ19waG90bycpLndpZHRoKCk7XHJcbi8vICAgICB2YXIgaW1nX2hlaWdodCA9ICQoJyNiaWdfcGhvdG8nKS5oZWlnaHQoKTtcclxuXHJcbi8vICAgICBqY3JvcF9hcGkuc2V0U2VsZWN0KFt4LCB5LCBpbWdfd2lkdGggLSB4MiwgaW1nX2hlaWdodCAtIHkyXSk7XHJcbi8vICAgICBqY3JvcF9hcGkuYW5pbWF0ZVRvKFt4LCB5LCBpbWdfd2lkdGggLSB4MiwgaW1nX2hlaWdodCAtIHkyXSk7XHJcbi8vIH1cclxuXHJcbi8vICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLm1hdGNoKC9eI2Nyb3BcXCgoWzAtOV17MSw0fSksKFswLTldezEsNH0pLChbMC05XXsxLDR9KSwoWzAtOV17MSw0fSlcXCkkL2kpO1xyXG4vLyAgICAgaWYgKG1hdGNoKSB7XHJcbi8vICAgICAgICAgU2V0Q3JvcChtYXRjaFsxXSwgbWF0Y2hbMl0sIG1hdGNoWzNdLCBtYXRjaFs0XSk7XHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG5cclxuLyog0JrQntCV0JrQpjog0J/QntCa0JDQl9CQ0KLQrCDQmtCg0J7QnyDQndCQINCk0J7QotCe0JPQoNCQ0KTQmNCYKi9cclxuXHJcblxyXG4vKiDQktCr0JLQntCUIGpDcm9wINCd0JAg0KTQntCi0J4gKi9cclxuXHJcbi8vIGxldCBqY3JvcF9hcGk7XHJcbi8vIGNvbnNvbGUubG9nKCQuSmNyb3ApXHJcbi8vICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmNyb3AtZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGpjcm9wX2FwaS5kZXN0cm95KCk7XHJcbi8vICAgICAkKCcjYmlnX3Bob3RvJykucGFyZW50KFwiLnBob3RvLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoJ25vaG92ZXInKTtcclxuXHJcbi8vICAgICAvL9CV0YHQu9C4INGD0YHRgtCw0L3QvtCy0LvQtdC90LAg0LPQu9C+0LHQsNC70YzQvdCw0Y8g0L/QtdGA0LXQvNC10L3QvdCw0Y8sINC60L7RgtC+0YDQsNGPINC/0L7QutCw0LfRi9Cy0LDQtdGCLCDQutGD0LTQsCDQv9GA0L7RgdC60YDQvtC70LjRgtGMINC/0L7RgdC70LUg0LfQsNC60YDRi9GC0LjRjyDQutGA0L7Qv9CwXHJcbi8vICAgICBpZiAodHlwZW9mIGNyb3BBbmRTY3JvbGxUbyAhPT0gJ3VuZGVmaW5lZCcgJiYgY3JvcEFuZFNjcm9sbFRvLmxlbmd0aCA+IDApIHtcclxuLy8gICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcclxuLy8gICAgICAgICAgICAgc2Nyb2xsVG9wOiBjcm9wQW5kU2Nyb2xsVG8ub2Zmc2V0KCkudG9wXHJcbi8vICAgICAgICAgfSwgNDAwKTtcclxuXHJcbi8vICAgICAgICAgZGVsZXRlIHdpbmRvdy5jcm9wQW5kU2Nyb2xsVG87XHJcbi8vICAgICB9XHJcbi8vIH0pOyBcclxuXHJcbi8vIGZ1bmN0aW9uIGluaXRKY3JvcCh0eXBlLCBzaG93Q3JvcCkge1xyXG4vLyAgICAgdmFyIHNob3dDcm9wT25JbWFnZSA9IHNob3dDcm9wICE9PSBmYWxzZTtcclxuXHJcbi8vICAgICBpZiAoamNyb3BfYXBpKSB7XHJcbi8vICAgICAgICAgamNyb3BfYXBpLmRlc3Ryb3koKTtcclxuLy8gICAgICAgICBqY3JvcF9hcGkgPSBudWxsO1xyXG4vLyAgICAgICAgICQoJyNiaWdfcGhvdG8nKS5wYXJlbnQoXCIucGhvdG8tY29udGVudFwiKS5yZW1vdmVDbGFzcygnbm9ob3ZlcicpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHZhciBwYXJhbXMgPSB7XHJcbi8vICAgICAgICAgbWluU2l6ZTogW3cgPSAxMjAsIGggPSAxMjBdXHJcbi8vICAgICB9O1xyXG5cclxuLy8gICAgIHZhciBpbWFnZSA9ICQoJyNiaWdfcGhvdG8nKTtcclxuLy8gICAgIHZhciBpbWFnZV93aWR0aCA9IGltYWdlLndpZHRoKCk7XHJcbi8vICAgICB2YXIgaW1hZ2VfaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0KCk7XHJcblxyXG4vLyAgICAgJCgnI2JpZ19waG90bycpLkpjcm9wKHBhcmFtcywgZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgIGpjcm9wX2FwaSA9IHRoaXM7XHJcblxyXG4vLyAgICAgICAgIHZhciBwYXR0ZXJuX3llcyA9ICc8YSBjbGFzcz1cInNlbmQtdG8tcHJldmlldyBjcm9wLWJ1dHRvblwiPjxpIGNsYXNzPVwiaWNvbiBpY29uLW9rXCI+PC9pPjwvc3Bhbj4nO1xyXG4vLyAgICAgICAgIHZhciBwYXR0ZXJuX25vID0gJzxhIGNsYXNzPVwiY3JvcC1kZXN0cm95IGNyb3AtYnV0dG9uXCIgaWQ9XCJwYXR0ZXJuX25vXCI+PGkgY2xhc3M9XCJpY29uIGljb24tY2FuY2VsXCIgaWQ9XCJwYXR0ZXJuX25vXCI+PC9pPjwvYT4nO1xyXG4vLyAgICAgICAgIHZhciBwYXR0ZXJuX3llc19jb21tZW50ID0gJzxhIGNsYXNzPVwiYWRkLWNyb3AtdG8tY29tbWVudCBjcm9wLWJ1dHRvblwiPjxpIGNsYXNzPVwiaWNvbiBpY29uLW9rXCI+PC9pPjwvc3Bhbj4nO1xyXG5cclxuLy8gICAgICAgICAvLyDQtNC70Y8g0LrQvtC80LzQtdC90YLQsNGA0LjQtdCyXHJcbi8vICAgICAgICAgaWYgKHR5cGUgPT0gJ2NvbW1lbnQnIHx8IHR5cGUgPT0gJ2Zyb21fY29tbWVudCcpIHtcclxuLy8gICAgICAgICAgICAgaWYgKHNob3dDcm9wT25JbWFnZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdmFyIGFuaW1hdGUgPSBuZXcgQXJyYXkoKTtcclxuLy8gICAgICAgICAgICAgICAgIGFuaW1hdGUubGVmdF93aWR0aCA9IGltYWdlX3dpZHRoIC8gMiAtIDE1MDtcclxuLy8gICAgICAgICAgICAgICAgIGFuaW1hdGUubGVmdF9oZWlnaHQgPSBpbWFnZV9oZWlnaHQgLyAyIC0gMTUwO1xyXG4vLyAgICAgICAgICAgICAgICAgYW5pbWF0ZS5yaWdodF93aWR0aCA9IGltYWdlX3dpZHRoIC8gMiArIDE1MDtcclxuLy8gICAgICAgICAgICAgICAgIGFuaW1hdGUucmlnaHRfaGVpZ2h0ID0gaW1hZ2VfaGVpZ2h0IC8gMiArIDE1MDtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBqY3JvcF9hcGkuc2V0U2VsZWN0KFswLCAwLCBpbWFnZV93aWR0aCwgaW1hZ2VfaGVpZ2h0XSk7XHJcbi8vICAgICAgICAgICAgICAgICBqY3JvcF9hcGkuYW5pbWF0ZVRvKFthbmltYXRlLmxlZnRfd2lkdGgsIGFuaW1hdGUubGVmdF9oZWlnaHQsIGFuaW1hdGUucmlnaHRfd2lkdGgsIGFuaW1hdGUucmlnaHRfaGVpZ2h0XSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcblxyXG4vLyAgICAgICAgICAgICB2YXIgcGF0dGVybkJ1dHRvbnMgPSAnJztcclxuLy8gICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ2Zyb21fY29tbWVudCcpXHJcbi8vICAgICAgICAgICAgICAgICBwYXR0ZXJuQnV0dG9ucyA9IHBhdHRlcm5fbm87XHJcbi8vICAgICAgICAgICAgIGVsc2VcclxuLy8gICAgICAgICAgICAgICAgIHBhdHRlcm5CdXR0b25zID0gcGF0dGVybl95ZXNfY29tbWVudCArIHBhdHRlcm5fbm87XHJcblxyXG4vLyAgICAgICAgICAgICAkKFwiLmpjcm9wLWhsaW5lOmZpcnN0XCIpLmh0bWwoXCI8ZGl2IHN0eWxlPSdwb3NpdGlvbjpyZWxhdGl2ZTtmbG9hdDpyaWdodDt6LWluZGV4OjkwMDsnPlwiICsgcGF0dGVybkJ1dHRvbnMgKyBcIjwvZGl2PlwiKS5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICAvLyDRgdC10YLQutCwXHJcbi8vICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnZ29sZGVuU2VjdGlvbicpIHtcclxuLy8gICAgICAgICAgICAgJCgnLmpjcm9wLXZsaW5lLCAuamNyb3AtaGxpbmUnKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAgICQoJyNiaWdfcGhvdG8nKS5wYXJlbnQoXCIucGhvdG8tY29udGVudFwiKS5hZGRDbGFzcygnbm9ob3ZlcicpO1xyXG4vLyAgICAgICAgICAgICB2YXIgSFRNTCA9XHJcbi8vICAgICAgICAgICAgICAgICAnPHRhYmxlIGNsYXNzPVwiZ29sZGVuU2VjdGlvblwiPicgK1xyXG4vLyAgICAgICAgICAgICAgICAgJzx0cj48dGQgd2lkdGg9XCIzOCVcIiBoZWlnaHQ9XCIzOCVcIj48ZGl2IHN0eWxlPVwib3BhY2l0eTogMC4xOyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlXCI+PC9kaXY+PC90ZD48dGQgd2lkdGg9XCIyNCVcIj48L3RkPjx0ZCB3aWR0aD1cIjM4JVwiPjwvdGQ+PC90cj4nICtcclxuLy8gICAgICAgICAgICAgICAgICc8dHI+PHRkIGhlaWdodD1cIjI0JVwiPjwvdGQ+PHRkPjwvdGQ+PHRkPjwvdGQ+PC90cj4nICtcclxuLy8gICAgICAgICAgICAgICAgICc8dHI+PHRkIGhlaWdodD1cIjM4JVwiPjwvdGQ+PHRkPjwvdGQ+PHRkPjwvdGQ+PC90cj4nICtcclxuLy8gICAgICAgICAgICAgICAgICc8L3RhYmxlPic7XHJcblxyXG4vLyAgICAgICAgICAgICAkKFwiLmpjcm9wLWhsaW5lOmZpcnN0XCIpLnNob3coKS5odG1sKFwiPGRpdiBzdHlsZT0ncG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6cmlnaHQ7ei1pbmRleDo5MDA7Jz5cIiArIHBhdHRlcm5fbm8gKyBcIjwvZGl2PlwiKS5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG4vLyAgICAgICAgICAgICAkKCcuamNyb3AtdHJhY2tlcjpmaXJzdCcpLmNzcyh7XHJcbi8vICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4vLyAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnXHJcbi8vICAgICAgICAgICAgIH0pLmFwcGVuZChIVE1MKTtcclxuXHJcbi8vICAgICAgICAgICAgIGpjcm9wX2FwaS5zZXRTZWxlY3QoWzAsIDAsIGltYWdlX3dpZHRoLCBpbWFnZV9oZWlnaHRdKTtcclxuLy8gICAgICAgICAgICAgamNyb3BfYXBpLmFuaW1hdGVUbyhbMCwgMCwgaW1hZ2Vfd2lkdGgsIGltYWdlX2hlaWdodF0pO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG4vLyB9XHJcblxyXG4vKiDQmtCe0J3QldCmOiDQktCr0JLQntCUIGpDcm9wINCd0JAg0KTQntCi0J4gKi9cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG59KSAgIiwiaW1wb3J0ICcuL2pzL3ZpZXcnXHJcbmltcG9ydCAnLi9zdHlsZXMvY29tbW9uJ1xyXG5pbXBvcnQgJy4vc3R5bGVzL3ZpZXcnIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gdGhlIHN0YXJ0dXAgZnVuY3Rpb25cbi8vIEl0J3MgZW1wdHkgYXMgc29tZSBydW50aW1lIG1vZHVsZSBoYW5kbGVzIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSB4ID0+IHt9XG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInZpZXdcIjogMFxufTtcblxudmFyIGRlZmVycmVkTW9kdWxlcyA9IFtcblx0W1wiLi92aWV3LmpzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19qcXVlcnlfZGlzdF9qcXVlcnlfanMtbm9kZV9tb2R1bGVzX3N3aXBlcl9lc21fY29tcG9uZW50c19jb3JlX2NvcmUtY2xhc3NfanNcIixcInN0eWxlc19jb21tb25fbGVzcy1qc191dGlsc19qc1wiXVxuXTtcbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbnZhciBjaGVja0RlZmVycmVkTW9kdWxlcyA9IHggPT4ge307XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lLCBleGVjdXRlTW9kdWxlc10gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuXHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcblx0fVxuXG5cdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3Rcblx0aWYoZXhlY3V0ZU1vZHVsZXMpIGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMpO1xuXG5cdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gPSBzZWxmW1wid2VicGFja0NodW5rXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTtcblxuZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKCkge1xuXHR2YXIgcmVzdWx0O1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuXHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG5cdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcblx0XHR9XG5cdH1cblx0aWYoZGVmZXJyZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHggPT4ge307XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cbnZhciBzdGFydHVwID0gX193ZWJwYWNrX3JlcXVpcmVfXy54O1xuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyByZXNldCBzdGFydHVwIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBjYWxsZWQgYWdhaW4gd2hlbiBtb3JlIHN0YXJ0dXAgY29kZSBpcyBhZGRlZFxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnggPSBzdGFydHVwIHx8ICh4ID0+IHt9KTtcblx0cmV0dXJuIChjaGVja0RlZmVycmVkTW9kdWxlcyA9IGNoZWNrRGVmZXJyZWRNb2R1bGVzSW1wbCkoKTtcbn07IiwiLy8gcnVuIHN0YXJ0dXBcbl9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==