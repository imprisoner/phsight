/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/main.less":
/*!**************************!*\
  !*** ./styles/main.less ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.less */ "./styles/main.less");
/* harmony import */ var _js_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/main */ "./js/main.js");



/***/ }),

/***/ "./js/libs/jquery.justifiedGallery.js":
/*!********************************************!*\
  !*** ./js/libs/jquery.justifiedGallery.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * justifiedGallery - v3.8.1
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2020 Miro Mannino
 * Licensed under the MIT license.
 */
(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(function ($) {

  /**
   * Justified Gallery controller constructor
   *
   * @param $gallery the gallery to build
   * @param settings the settings (the defaults are in JustifiedGallery.defaults)
   * @constructor
   */
  var JustifiedGallery = function ($gallery, settings) {
  
    this.settings = settings;
    this.checkSettings();
  
    this.imgAnalyzerTimeout = null;
    this.entries = null;
    this.buildingRow = {
      entriesBuff: [],
      width: 0,
      height: 0,
      aspectRatio: 0
    };
    this.lastFetchedEntry = null;
    this.lastAnalyzedIndex = -1;
    this.yield = {
      every: 2, // do a flush every n flushes (must be greater than 1)
      flushed: 0 // flushed rows without a yield
    };
    this.border = settings.border >= 0 ? settings.border : settings.margins;
    this.maxRowHeight = this.retrieveMaxRowHeight();
    this.suffixRanges = this.retrieveSuffixRanges();
    this.offY = this.border;
    this.rows = 0;
    this.spinner = {
      phase: 0,
      timeSlot: 150,
      $el: $('<div class="jg-spinner"><span></span><span></span><span></span></div>'),
      intervalId: null
    };
    this.scrollBarOn = false;
    this.checkWidthIntervalId = null;
    this.galleryWidth = $gallery.width();
    this.$gallery = $gallery;
  
  };
  
  /** @returns {String} the best suffix given the width and the height */
  JustifiedGallery.prototype.getSuffix = function (width, height) {
    var longestSide, i;
    longestSide = (width > height) ? width : height;
    for (i = 0; i < this.suffixRanges.length; i++) {
      if (longestSide <= this.suffixRanges[i]) {
        return this.settings.sizeRangeSuffixes[this.suffixRanges[i]];
      }
    }
    return this.settings.sizeRangeSuffixes[this.suffixRanges[i - 1]];
  };
  
  /**
   * Remove the suffix from the string
   *
   * @returns {string} a new string without the suffix
   */
  JustifiedGallery.prototype.removeSuffix = function (str, suffix) {
    return str.substring(0, str.length - suffix.length);
  };
  
  /**
   * @returns {boolean} a boolean to say if the suffix is contained in the str or not
   */
  JustifiedGallery.prototype.endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };
  
  /**
   * Get the used suffix of a particular url
   *
   * @param str
   * @returns {String} return the used suffix
   */
  JustifiedGallery.prototype.getUsedSuffix = function (str) {
    for (var si in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(si)) {
        if (this.settings.sizeRangeSuffixes[si].length === 0) continue;
        if (this.endsWith(str, this.settings.sizeRangeSuffixes[si])) return this.settings.sizeRangeSuffixes[si];
      }
    }
    return '';
  };
  
  /**
   * Given an image src, with the width and the height, returns the new image src with the
   * best suffix to show the best quality thumbnail.
   *
   * @returns {String} the suffix to use
   */
  JustifiedGallery.prototype.newSrc = function (imageSrc, imgWidth, imgHeight, image) {
    var newImageSrc;
  
    if (this.settings.thumbnailPath) {
      newImageSrc = this.settings.thumbnailPath(imageSrc, imgWidth, imgHeight, image);
    } else {
      var matchRes = imageSrc.match(this.settings.extension);
      var ext = (matchRes !== null) ? matchRes[0] : '';
      newImageSrc = imageSrc.replace(this.settings.extension, '');
      newImageSrc = this.removeSuffix(newImageSrc, this.getUsedSuffix(newImageSrc));
      newImageSrc += this.getSuffix(imgWidth, imgHeight) + ext;
    }
  
    return newImageSrc;
  };
  
  /**
   * Shows the images that is in the given entry
   *
   * @param $entry the entry
   * @param callback the callback that is called when the show animation is finished
   */
  JustifiedGallery.prototype.showImg = function ($entry, callback) {
    if (this.settings.cssAnimation) {
      $entry.addClass('jg-entry-visible');
      if (callback) callback();
    } else {
      $entry.stop().fadeTo(this.settings.imagesAnimationDuration, 1.0, callback);
      $entry.find(this.settings.imgSelector).stop().fadeTo(this.settings.imagesAnimationDuration, 1.0, callback);
    }
  };
  
  /**
   * Extract the image src form the image, looking from the 'safe-src', and if it can't be found, from the
   * 'src' attribute. It saves in the image data the 'jg.originalSrc' field, with the extracted src.
   *
   * @param $image the image to analyze
   * @returns {String} the extracted src
   */
  JustifiedGallery.prototype.extractImgSrcFromImage = function ($image) {
    var imageSrc = $image.data('safe-src');
    var imageSrcLoc = 'data-safe-src';
    if (typeof imageSrc === 'undefined') {
      imageSrc = $image.attr('src');
      imageSrcLoc = 'src';
    }
    $image.data('jg.originalSrc', imageSrc); // this is saved for the destroy method
    $image.data('jg.src', imageSrc); // this will change overtime
    $image.data('jg.originalSrcLoc', imageSrcLoc); // this is saved for the destroy method
    return imageSrc;
  };
  
  /** @returns {jQuery} the image in the given entry */
  JustifiedGallery.prototype.imgFromEntry = function ($entry) {
    var $img = $entry.find(this.settings.imgSelector);
    return $img.length === 0 ? null : $img;
  };
  
  /** @returns {jQuery} the caption in the given entry */
  JustifiedGallery.prototype.captionFromEntry = function ($entry) {
    var $caption = $entry.find('> .jg-caption');
    return $caption.length === 0 ? null : $caption;
  };
  
  /**
   * Display the entry
   *
   * @param {jQuery} $entry the entry to display
   * @param {int} x the x position where the entry must be positioned
   * @param y the y position where the entry must be positioned
   * @param imgWidth the image width
   * @param imgHeight the image height
   * @param rowHeight the row height of the row that owns the entry
   */
  JustifiedGallery.prototype.displayEntry = function ($entry, x, y, imgWidth, imgHeight, rowHeight) {
    $entry.width(imgWidth);
    $entry.height(rowHeight);
    $entry.css('top', y);
    $entry.css('left', x);
  
    var $image = this.imgFromEntry($entry);
    if ($image !== null) {
      $image.css('width', imgWidth);
      $image.css('height', imgHeight);
      $image.css('margin-left', - imgWidth / 2);
      $image.css('margin-top', - imgHeight / 2);
  
      // Image reloading for an high quality of thumbnails
      var imageSrc = $image.data('jg.src');
      if (imageSrc) {
        imageSrc = this.newSrc(imageSrc, imgWidth, imgHeight, $image[0]);
  
        $image.one('error', function () {
           this.resetImgSrc($image); //revert to the original thumbnail
        });
  
        var loadNewImage = function () {
          // if (imageSrc !== newImageSrc) { 
            $image.attr('src', imageSrc);
          // }
        };
  
        if ($entry.data('jg.loaded') === 'skipped' && imageSrc) {
          this.onImageEvent(imageSrc, (function() {
            this.showImg($entry, loadNewImage); //load the new image after the fadeIn
            $entry.data('jg.loaded', true);
          }).bind(this));
        } else {
          this.showImg($entry, loadNewImage); //load the new image after the fadeIn
        }
      
      }
  
    } else {
      this.showImg($entry);
    }
  
    this.displayEntryCaption($entry);
  };
  
  /**
   * Display the entry caption. If the caption element doesn't exists, it creates the caption using the 'alt'
   * or the 'title' attributes.
   *
   * @param {jQuery} $entry the entry to process
   */
  JustifiedGallery.prototype.displayEntryCaption = function ($entry) {
    var $image = this.imgFromEntry($entry);
    if ($image !== null && this.settings.captions) {
      var $imgCaption = this.captionFromEntry($entry);
  
      // Create it if it doesn't exists
      if ($imgCaption === null) {
        var caption = $image.attr('alt');
        if (!this.isValidCaption(caption)) caption = $entry.attr('title');
        if (this.isValidCaption(caption)) { // Create only we found something
          $imgCaption = $('<div class="jg-caption">' + caption + '</div>');
          $entry.append($imgCaption);
          $entry.data('jg.createdCaption', true);
        }
      }
  
      // Create events (we check again the $imgCaption because it can be still inexistent)
      if ($imgCaption !== null) {
        if (!this.settings.cssAnimation) $imgCaption.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity);
        this.addCaptionEventsHandlers($entry);
      }
    } else {
      this.removeCaptionEventsHandlers($entry);
    }
  };
  
  /**
   * Validates the caption
   *
   * @param caption The caption that should be validated
   * @return {boolean} Validation result
   */
  JustifiedGallery.prototype.isValidCaption = function (caption) {
    return (typeof caption !== 'undefined' && caption.length > 0);
  };
  
  /**
   * The callback for the event 'mouseenter'. It assumes that the event currentTarget is an entry.
   * It shows the caption using jQuery (or using CSS if it is configured so)
   *
   * @param {Event} eventObject the event object
   */
  JustifiedGallery.prototype.onEntryMouseEnterForCaption = function (eventObject) {
    var $caption = this.captionFromEntry($(eventObject.currentTarget));
    if (this.settings.cssAnimation) {
      $caption.addClass('jg-caption-visible').removeClass('jg-caption-hidden');
    } else {
      $caption.stop().fadeTo(this.settings.captionSettings.animationDuration,
        this.settings.captionSettings.visibleOpacity);
    }
  };
  
  /**
   * The callback for the event 'mouseleave'. It assumes that the event currentTarget is an entry.
   * It hides the caption using jQuery (or using CSS if it is configured so)
   *
   * @param {Event} eventObject the event object
   */
  JustifiedGallery.prototype.onEntryMouseLeaveForCaption = function (eventObject) {
    var $caption = this.captionFromEntry($(eventObject.currentTarget));
    if (this.settings.cssAnimation) {
      $caption.removeClass('jg-caption-visible').removeClass('jg-caption-hidden');
    } else {
      $caption.stop().fadeTo(this.settings.captionSettings.animationDuration,
        this.settings.captionSettings.nonVisibleOpacity);
    }
  };
  
  /**
   * Add the handlers of the entry for the caption
   *
   * @param $entry the entry to modify
   */
  JustifiedGallery.prototype.addCaptionEventsHandlers = function ($entry) {
    var captionMouseEvents = $entry.data('jg.captionMouseEvents');
    if (typeof captionMouseEvents === 'undefined') {
      captionMouseEvents = {
        mouseenter: $.proxy(this.onEntryMouseEnterForCaption, this),
        mouseleave: $.proxy(this.onEntryMouseLeaveForCaption, this)
      };
      $entry.on('mouseenter', undefined, undefined, captionMouseEvents.mouseenter);
      $entry.on('mouseleave', undefined, undefined, captionMouseEvents.mouseleave);
      $entry.data('jg.captionMouseEvents', captionMouseEvents);
    }
  };
  
  /**
   * Remove the handlers of the entry for the caption
   *
   * @param $entry the entry to modify
   */
  JustifiedGallery.prototype.removeCaptionEventsHandlers = function ($entry) {
    var captionMouseEvents = $entry.data('jg.captionMouseEvents');
    if (typeof captionMouseEvents !== 'undefined') {
      $entry.off('mouseenter', undefined, captionMouseEvents.mouseenter);
      $entry.off('mouseleave', undefined, captionMouseEvents.mouseleave);
      $entry.removeData('jg.captionMouseEvents');
    }
  };
  
  /**
   * Clear the building row data to be used for a new row
   */
  JustifiedGallery.prototype.clearBuildingRow = function () {
    this.buildingRow.entriesBuff = [];
    this.buildingRow.aspectRatio = 0;
    this.buildingRow.width = 0;
  };
  
  /**
   * Justify the building row, preparing it to
   *
   * @param isLastRow
   * @param hiddenRow undefined or false for normal behavior. hiddenRow = true to hide the row.
   * @returns a boolean to know if the row has been justified or not
   */
  JustifiedGallery.prototype.prepareBuildingRow = function (isLastRow, hiddenRow) {
    var i, $entry, imgAspectRatio, newImgW, newImgH, justify = true;
    var minHeight = 0;
    var availableWidth = this.galleryWidth - 2 * this.border - (
      (this.buildingRow.entriesBuff.length - 1) * this.settings.margins);
    var rowHeight = availableWidth / this.buildingRow.aspectRatio;
    var defaultRowHeight = this.settings.rowHeight;
    var justifiable = this.buildingRow.width / availableWidth > this.settings.justifyThreshold;
  
    //Skip the last row if we can't justify it and the lastRow == 'hide'
    if (hiddenRow || (isLastRow && this.settings.lastRow === 'hide' && !justifiable)) {
      for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
        $entry = this.buildingRow.entriesBuff[i];
        if (this.settings.cssAnimation)
          $entry.removeClass('jg-entry-visible');
        else {
          $entry.stop().fadeTo(0, 0.1);
          $entry.find('> img, > a > img').fadeTo(0, 0);
        }
      }
      return -1;
    }
  
    // With lastRow = nojustify, justify if is justificable (the images will not become too big)
    if (isLastRow && !justifiable && this.settings.lastRow !== 'justify' && this.settings.lastRow !== 'hide') {
      justify = false;
  
      if (this.rows > 0) {
        defaultRowHeight = (this.offY - this.border - this.settings.margins * this.rows) / this.rows;
        justify = defaultRowHeight * this.buildingRow.aspectRatio / availableWidth > this.settings.justifyThreshold;
      }
    }
  
    for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
      $entry = this.buildingRow.entriesBuff[i];
      imgAspectRatio = $entry.data('jg.width') / $entry.data('jg.height');
  
      if (justify) {
        newImgW = (i === this.buildingRow.entriesBuff.length - 1) ? availableWidth : rowHeight * imgAspectRatio;
        newImgH = rowHeight;
      } else {
        newImgW = defaultRowHeight * imgAspectRatio;
        newImgH = defaultRowHeight;
      }
  
      availableWidth -= Math.round(newImgW);
      $entry.data('jg.jwidth', Math.round(newImgW));
      $entry.data('jg.jheight', Math.ceil(newImgH));
      if (i === 0 || minHeight > newImgH) minHeight = newImgH;
    }
  
    this.buildingRow.height = minHeight;
    return justify;
  };
  
  /**
   * Flush a row: justify it, modify the gallery height accordingly to the row height
   *
   * @param isLastRow
   * @param hiddenRow undefined or false for normal behavior. hiddenRow = true to hide the row.
   */
  JustifiedGallery.prototype.flushRow = function (isLastRow, hiddenRow) {
    var settings = this.settings;
    var $entry, buildingRowRes, offX = this.border, i;
  
    buildingRowRes = this.prepareBuildingRow(isLastRow, hiddenRow);
    if (hiddenRow || (isLastRow && settings.lastRow === 'hide' && buildingRowRes === -1)) {
      this.clearBuildingRow();
      return;
    }
  
    if (this.maxRowHeight) {
      if (this.maxRowHeight < this.buildingRow.height) this.buildingRow.height = this.maxRowHeight;
    }
  
    //Align last (unjustified) row
    if (isLastRow && (settings.lastRow === 'center' || settings.lastRow === 'right')) {
      var availableWidth = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * settings.margins;
  
      for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
        $entry = this.buildingRow.entriesBuff[i];
        availableWidth -= $entry.data('jg.jwidth');
      }
  
      if (settings.lastRow === 'center')
        offX += Math.round(availableWidth / 2);
      else if (settings.lastRow === 'right')
        offX += availableWidth;
    }
  
    var lastEntryIdx = this.buildingRow.entriesBuff.length - 1;
    for (i = 0; i <= lastEntryIdx; i++) {
      $entry = this.buildingRow.entriesBuff[this.settings.rtl ? lastEntryIdx - i : i];
      this.displayEntry($entry, offX, this.offY, $entry.data('jg.jwidth'), $entry.data('jg.jheight'), this.buildingRow.height);
      offX += $entry.data('jg.jwidth') + settings.margins;
    }
  
    //Gallery Height
    this.galleryHeightToSet = this.offY + this.buildingRow.height + this.border;
    this.setGalleryTempHeight(this.galleryHeightToSet + this.getSpinnerHeight());
  
    if (!isLastRow || (this.buildingRow.height <= settings.rowHeight && buildingRowRes)) {
      //Ready for a new row
      this.offY += this.buildingRow.height + settings.margins;
      this.rows += 1;
      this.clearBuildingRow();
      this.settings.triggerEvent.call(this, 'jg.rowflush');
    }
  };
  
  
  // Scroll position not restoring: https://github.com/miromannino/Justified-Gallery/issues/221
  var galleryPrevStaticHeight = 0;
  
  JustifiedGallery.prototype.rememberGalleryHeight = function () {
    galleryPrevStaticHeight = this.$gallery.height();
    this.$gallery.height(galleryPrevStaticHeight);
  };
  
  // grow only
  JustifiedGallery.prototype.setGalleryTempHeight = function (height) {
    galleryPrevStaticHeight = Math.max(height, galleryPrevStaticHeight);
    this.$gallery.height(galleryPrevStaticHeight);
  };
  
  JustifiedGallery.prototype.setGalleryFinalHeight = function (height) {
    galleryPrevStaticHeight = height;
    this.$gallery.height(height);
  };
  
  /**
   * Checks the width of the gallery container, to know if a new justification is needed
   */
  JustifiedGallery.prototype.checkWidth = function () {
    this.checkWidthIntervalId = setInterval($.proxy(function () {
  
      // if the gallery is not currently visible, abort.
      if (!this.$gallery.is(":visible")) return;
  
      var galleryWidth = parseFloat(this.$gallery.width());
      if (Math.abs(galleryWidth - this.galleryWidth) > this.settings.refreshSensitivity) {
        this.galleryWidth = galleryWidth;
        this.rewind();
  
        this.rememberGalleryHeight();
  
        // Restart to analyze
        this.startImgAnalyzer(true);
      }
    }, this), this.settings.refreshTime);
  };
  
  /**
   * @returns {boolean} a boolean saying if the spinner is active or not
   */
  JustifiedGallery.prototype.isSpinnerActive = function () {
    return this.spinner.intervalId !== null;
  };
  
  /**
   * @returns {int} the spinner height
   */
  JustifiedGallery.prototype.getSpinnerHeight = function () {
    return this.spinner.$el.innerHeight();
  };
  
  /**
   * Stops the spinner animation and modify the gallery height to exclude the spinner
   */
  JustifiedGallery.prototype.stopLoadingSpinnerAnimation = function () {
    clearInterval(this.spinner.intervalId);
    this.spinner.intervalId = null;
    this.setGalleryTempHeight(this.$gallery.height() - this.getSpinnerHeight());
    this.spinner.$el.detach();
  };
  
  /**
   * Starts the spinner animation
   */
  JustifiedGallery.prototype.startLoadingSpinnerAnimation = function () {
    var spinnerContext = this.spinner;
    var $spinnerPoints = spinnerContext.$el.find('span');
    clearInterval(spinnerContext.intervalId);
    this.$gallery.append(spinnerContext.$el);
    this.setGalleryTempHeight(this.offY + this.buildingRow.height + this.getSpinnerHeight());
    spinnerContext.intervalId = setInterval(function () {
      if (spinnerContext.phase < $spinnerPoints.length) {
        $spinnerPoints.eq(spinnerContext.phase).fadeTo(spinnerContext.timeSlot, 1);
      } else {
        $spinnerPoints.eq(spinnerContext.phase - $spinnerPoints.length).fadeTo(spinnerContext.timeSlot, 0);
      }
      spinnerContext.phase = (spinnerContext.phase + 1) % ($spinnerPoints.length * 2);
    }, spinnerContext.timeSlot);
  };
  
  /**
   * Rewind the image analysis to start from the first entry.
   */
  JustifiedGallery.prototype.rewind = function () {
    this.lastFetchedEntry = null;
    this.lastAnalyzedIndex = -1;
    this.offY = this.border;
    this.rows = 0;
    this.clearBuildingRow();
  };
  
  /**
   * @returns {String} `settings.selector` rejecting spinner element
   */
  JustifiedGallery.prototype.getSelectorWithoutSpinner = function () {
    return this.settings.selector + ', div:not(.jg-spinner)';
  };
  
  /**
   * @returns {Array} all entries matched by `settings.selector`
   */
  JustifiedGallery.prototype.getAllEntries = function () {
    var selector = this.getSelectorWithoutSpinner();
    return this.$gallery.children(selector).toArray();
  };
  
  /**
   * Update the entries searching it from the justified gallery HTML element
   *
   * @param norewind if norewind only the new entries will be changed (i.e. randomized, sorted or filtered)
   * @returns {boolean} true if some entries has been founded
   */
  JustifiedGallery.prototype.updateEntries = function (norewind) {
    var newEntries;
  
    if (norewind && this.lastFetchedEntry != null) {
      var selector = this.getSelectorWithoutSpinner();
      newEntries = $(this.lastFetchedEntry).nextAll(selector).toArray();
    } else {
      this.entries = [];
      newEntries = this.getAllEntries();
    }
  
    if (newEntries.length > 0) {
  
      // Sort or randomize
      if ($.isFunction(this.settings.sort)) {
        newEntries = this.sortArray(newEntries);
      } else if (this.settings.randomize) {
        newEntries = this.shuffleArray(newEntries);
      }
      this.lastFetchedEntry = newEntries[newEntries.length - 1];
  
      // Filter
      if (this.settings.filter) {
        newEntries = this.filterArray(newEntries);
      } else {
        this.resetFilters(newEntries);
      }
  
    }
  
    this.entries = this.entries.concat(newEntries);
    return true;
  };
  
  /**
   * Apply the entries order to the DOM, iterating the entries and appending the images
   *
   * @param entries the entries that has been modified and that must be re-ordered in the DOM
   */
  JustifiedGallery.prototype.insertToGallery = function (entries) {
    var that = this;
    $.each(entries, function () {
      $(this).appendTo(that.$gallery);
    });
  };
  
  /**
   * Shuffle the array using the Fisher-Yates shuffle algorithm
   *
   * @param a the array to shuffle
   * @return the shuffled array
   */
  JustifiedGallery.prototype.shuffleArray = function (a) {
    var i, j, temp;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    this.insertToGallery(a);
    return a;
  };
  
  /**
   * Sort the array using settings.comparator as comparator
   *
   * @param a the array to sort (it is sorted)
   * @return the sorted array
   */
  JustifiedGallery.prototype.sortArray = function (a) {
    a.sort(this.settings.sort);
    this.insertToGallery(a);
    return a;
  };
  
  /**
   * Reset the filters removing the 'jg-filtered' class from all the entries
   *
   * @param a the array to reset
   */
  JustifiedGallery.prototype.resetFilters = function (a) {
    for (var i = 0; i < a.length; i++) $(a[i]).removeClass('jg-filtered');
  };
  
  /**
   * Filter the entries considering theirs classes (if a string has been passed) or using a function for filtering.
   *
   * @param a the array to filter
   * @return the filtered array
   */
  JustifiedGallery.prototype.filterArray = function (a) {
    var settings = this.settings;
    if ($.type(settings.filter) === 'string') {
      // Filter only keeping the entries passed in the string
      return a.filter(function (el) {
        var $el = $(el);
        if ($el.is(settings.filter)) {
          $el.removeClass('jg-filtered');
          return true;
        } else {
          $el.addClass('jg-filtered').removeClass('jg-visible');
          return false;
        }
      });
    } else if ($.isFunction(settings.filter)) {
      // Filter using the passed function
      var filteredArr = a.filter(settings.filter);
      for (var i = 0; i < a.length; i++) {
        if (filteredArr.indexOf(a[i]) === -1) {
          $(a[i]).addClass('jg-filtered').removeClass('jg-visible');
        } else {
          $(a[i]).removeClass('jg-filtered');
        }
      }
      return filteredArr;
    }
  };
  
  /**
   * Revert the image src to the default value.
   */
  JustifiedGallery.prototype.resetImgSrc = function ($img) {
    if ($img.data('jg.originalSrcLoc') === 'src') {
      $img.attr('src', $img.data('jg.originalSrc'));
    } else {
      $img.attr('src', '');
    }
  };
  
  /**
   * Destroy the Justified Gallery instance.
   *
   * It clears all the css properties added in the style attributes. We doesn't backup the original
   * values for those css attributes, because it costs (performance) and because in general one
   * shouldn't use the style attribute for an uniform set of images (where we suppose the use of
   * classes). Creating a backup is also difficult because JG could be called multiple times and
   * with different style attributes.
   */
  JustifiedGallery.prototype.destroy = function () {
    clearInterval(this.checkWidthIntervalId);
    this.stopImgAnalyzerStarter();
  
    // Get fresh entries list since filtered entries are absent in `this.entries`
    $.each(this.getAllEntries(), $.proxy(function (_, entry) {
      var $entry = $(entry);
  
      // Reset entry style
      $entry.css('width', '');
      $entry.css('height', '');
      $entry.css('top', '');
      $entry.css('left', '');
      $entry.data('jg.loaded', undefined);
      $entry.removeClass('jg-entry jg-filtered jg-entry-visible');
  
      // Reset image style
      var $img = this.imgFromEntry($entry);
      if ($img) {
        $img.css('width', '');
        $img.css('height', '');
        $img.css('margin-left', '');
        $img.css('margin-top', '');
        this.resetImgSrc($img);
        $img.data('jg.originalSrc', undefined);
        $img.data('jg.originalSrcLoc', undefined);
        $img.data('jg.src', undefined);
      }
  
      // Remove caption
      this.removeCaptionEventsHandlers($entry);
      var $caption = this.captionFromEntry($entry);
      if ($entry.data('jg.createdCaption')) {
        // remove also the caption element (if created by jg)
        $entry.data('jg.createdCaption', undefined);
        if ($caption !== null) $caption.remove();
      } else {
        if ($caption !== null) $caption.fadeTo(0, 1);
      }
  
    }, this));
  
    this.$gallery.css('height', '');
    this.$gallery.removeClass('justified-gallery');
    this.$gallery.data('jg.controller', undefined);
    this.settings.triggerEvent.call(this, 'jg.destroy');
  };
  
  /**
   * Analyze the images and builds the rows. It returns if it found an image that is not loaded.
   *
   * @param isForResize if the image analyzer is called for resizing or not, to call a different callback at the end
   */
  JustifiedGallery.prototype.analyzeImages = function (isForResize) {
    for (var i = this.lastAnalyzedIndex + 1; i < this.entries.length; i++) {
      var $entry = $(this.entries[i]);
      if ($entry.data('jg.loaded') === true || $entry.data('jg.loaded') === 'skipped') {
        var availableWidth = this.galleryWidth - 2 * this.border - (
          (this.buildingRow.entriesBuff.length - 1) * this.settings.margins);
        var imgAspectRatio = $entry.data('jg.width') / $entry.data('jg.height');
  
        this.buildingRow.entriesBuff.push($entry);
        this.buildingRow.aspectRatio += imgAspectRatio;
        this.buildingRow.width += imgAspectRatio * this.settings.rowHeight;
        this.lastAnalyzedIndex = i;
  
        if (availableWidth / (this.buildingRow.aspectRatio + imgAspectRatio) < this.settings.rowHeight) {
          this.flushRow(false, this.settings.maxRowsCount > 0 && this.rows === this.settings.maxRowsCount);
  
          if (++this.yield.flushed >= this.yield.every) {
            this.startImgAnalyzer(isForResize);
            return;
          }
        }
      } else if ($entry.data('jg.loaded') !== 'error') {
        return;
      }
    }
  
    // Last row flush (the row is not full)
    if (this.buildingRow.entriesBuff.length > 0) {
      this.flushRow(true, this.settings.maxRowsCount > 0 && this.rows === this.settings.maxRowsCount);
    }
  
    if (this.isSpinnerActive()) {
      this.stopLoadingSpinnerAnimation();
    }
  
    /* Stop, if there is, the timeout to start the analyzeImages.
     This is because an image can be set loaded, and the timeout can be set,
     but this image can be analyzed yet.
     */
    this.stopImgAnalyzerStarter();
  
    this.setGalleryFinalHeight(this.galleryHeightToSet);
    
    //On complete callback
    this.settings.triggerEvent.call(this, isForResize ? 'jg.resize' : 'jg.complete');
  };
  
  /**
   * Stops any ImgAnalyzer starter (that has an assigned timeout)
   */
  JustifiedGallery.prototype.stopImgAnalyzerStarter = function () {
    this.yield.flushed = 0;
    if (this.imgAnalyzerTimeout !== null) {
      clearTimeout(this.imgAnalyzerTimeout);
      this.imgAnalyzerTimeout = null;
    }
  };
  
  /**
   * Starts the image analyzer. It is not immediately called to let the browser to update the view
   *
   * @param isForResize specifies if the image analyzer must be called for resizing or not
   */
  JustifiedGallery.prototype.startImgAnalyzer = function (isForResize) {
    var that = this;
    this.stopImgAnalyzerStarter();
    this.imgAnalyzerTimeout = setTimeout(function () {
      that.analyzeImages(isForResize);
    }, 0.001); // we can't start it immediately due to a IE different behaviour
  };
  
  /**
   * Checks if the image is loaded or not using another image object. We cannot use the 'complete' image property,
   * because some browsers, with a 404 set complete = true.
   *
   * @param imageSrc the image src to load
   * @param onLoad callback that is called when the image has been loaded
   * @param onError callback that is called in case of an error
   */
  JustifiedGallery.prototype.onImageEvent = function (imageSrc, onLoad, onError) {
    if (!onLoad && !onError) return;
  
    var memImage = new Image();
    var $memImage = $(memImage);
    if (onLoad) {
      $memImage.one('load', function () {
        $memImage.off('load error');
        onLoad(memImage);
      });
    }
    if (onError) {
      $memImage.one('error', function () {
        $memImage.off('load error');
        onError(memImage);
      });
    }
    memImage.src = imageSrc;
  };
  
  /**
   * Init of Justified Gallery controlled
   * It analyzes all the entries starting theirs loading and calling the image analyzer (that works with loaded images)
   */
  JustifiedGallery.prototype.init = function () {
    var imagesToLoad = false, skippedImages = false, that = this;
    $.each(this.entries, function (index, entry) {
      var $entry = $(entry);
      var $image = that.imgFromEntry($entry);
  
      $entry.addClass('jg-entry');
  
      if ($entry.data('jg.loaded') !== true && $entry.data('jg.loaded') !== 'skipped') {
  
        // Link Rel global overwrite
        if (that.settings.rel !== null) $entry.attr('rel', that.settings.rel);
  
        // Link Target global overwrite
        if (that.settings.target !== null) $entry.attr('target', that.settings.target);
  
        if ($image !== null) {
  
          // Image src
          var imageSrc = that.extractImgSrcFromImage($image);
  
          /* If we have the height and the width, we don't wait that the image is loaded, 
             but we start directly with the justification */
          if (that.settings.waitThumbnailsLoad === false || !imageSrc) {
            var width = parseFloat($image.attr('width'));
            var height = parseFloat($image.attr('height'));
            if ($image.prop('tagName') === 'svg') {
              width = parseFloat($image[0].getBBox().width);
              height = parseFloat($image[0].getBBox().height);
            }
            if (!isNaN(width) && !isNaN(height)) {
              $entry.data('jg.width', width);
              $entry.data('jg.height', height);
              $entry.data('jg.loaded', 'skipped');
              skippedImages = true;
              that.startImgAnalyzer(false);
              return true; // continue
            }
          }
  
          $entry.data('jg.loaded', false);
          imagesToLoad = true;
  
          // Spinner start
          if (!that.isSpinnerActive()) that.startLoadingSpinnerAnimation();
  
          that.onImageEvent(imageSrc, function (loadImg) { // image loaded
            $entry.data('jg.width', loadImg.width);
            $entry.data('jg.height', loadImg.height);
            $entry.data('jg.loaded', true);
            that.startImgAnalyzer(false);
          }, function () { // image load error
            $entry.data('jg.loaded', 'error');
            that.startImgAnalyzer(false);
          });
  
        } else {
          $entry.data('jg.loaded', true);
          $entry.data('jg.width', $entry.width() | parseFloat($entry.css('width')) | 1);
          $entry.data('jg.height', $entry.height() | parseFloat($entry.css('height')) | 1);
        }
  
      }
  
    });
  
    if (!imagesToLoad && !skippedImages) this.startImgAnalyzer(false);
    this.checkWidth();
  };
  
  /**
   * Checks that it is a valid number. If a string is passed it is converted to a number
   *
   * @param settingContainer the object that contains the setting (to allow the conversion)
   * @param settingName the setting name
   */
  JustifiedGallery.prototype.checkOrConvertNumber = function (settingContainer, settingName) {
    if ($.type(settingContainer[settingName]) === 'string') {
      settingContainer[settingName] = parseFloat(settingContainer[settingName]);
    }
  
    if ($.type(settingContainer[settingName]) === 'number') {
      if (isNaN(settingContainer[settingName])) throw 'invalid number for ' + settingName;
    } else {
      throw settingName + ' must be a number';
    }
  };
  
  /**
   * Checks the sizeRangeSuffixes and, if necessary, converts
   * its keys from string (e.g. old settings with 'lt100') to int.
   */
  JustifiedGallery.prototype.checkSizeRangesSuffixes = function () {
    if ($.type(this.settings.sizeRangeSuffixes) !== 'object') {
      throw 'sizeRangeSuffixes must be defined and must be an object';
    }
  
    var suffixRanges = [];
    for (var rangeIdx in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(rangeIdx)) suffixRanges.push(rangeIdx);
    }
  
    var newSizeRngSuffixes = { 0: '' };
    for (var i = 0; i < suffixRanges.length; i++) {
      if ($.type(suffixRanges[i]) === 'string') {
        try {
          var numIdx = parseInt(suffixRanges[i].replace(/^[a-z]+/, ''), 10);
          newSizeRngSuffixes[numIdx] = this.settings.sizeRangeSuffixes[suffixRanges[i]];
        } catch (e) {
          throw 'sizeRangeSuffixes keys must contains correct numbers (' + e + ')';
        }
      } else {
        newSizeRngSuffixes[suffixRanges[i]] = this.settings.sizeRangeSuffixes[suffixRanges[i]];
      }
    }
  
    this.settings.sizeRangeSuffixes = newSizeRngSuffixes;
  };
  
  /**
   * check and convert the maxRowHeight setting
   * requires rowHeight to be already set
   * TODO: should be always called when only rowHeight is changed
   * @return number or null
   */
  JustifiedGallery.prototype.retrieveMaxRowHeight = function () {
    var newMaxRowHeight = null;
    var rowHeight = this.settings.rowHeight;
  
    if ($.type(this.settings.maxRowHeight) === 'string') {
      if (this.settings.maxRowHeight.match(/^[0-9]+%$/)) {
        newMaxRowHeight = rowHeight * parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100;
      } else {
        newMaxRowHeight = parseFloat(this.settings.maxRowHeight);
      }
    } else if ($.type(this.settings.maxRowHeight) === 'number') {
      newMaxRowHeight = this.settings.maxRowHeight;
    } else if (this.settings.maxRowHeight === false || this.settings.maxRowHeight == null) {
      return null;
    } else {
      throw 'maxRowHeight must be a number or a percentage';
    }
  
    // check if the converted value is not a number
    if (isNaN(newMaxRowHeight)) throw 'invalid number for maxRowHeight';
  
    // check values, maxRowHeight must be >= rowHeight
    if (newMaxRowHeight < rowHeight) newMaxRowHeight = rowHeight;
  
    return newMaxRowHeight;
  };
  
  /**
   * Checks the settings
   */
  JustifiedGallery.prototype.checkSettings = function () {
    this.checkSizeRangesSuffixes();
  
    this.checkOrConvertNumber(this.settings, 'rowHeight');
    this.checkOrConvertNumber(this.settings, 'margins');
    this.checkOrConvertNumber(this.settings, 'border');
    this.checkOrConvertNumber(this.settings, 'maxRowsCount');
  
    var lastRowModes = [
      'justify',
      'nojustify',
      'left',
      'center',
      'right',
      'hide'
    ];
    if (lastRowModes.indexOf(this.settings.lastRow) === -1) {
      throw 'lastRow must be one of: ' + lastRowModes.join(', ');
    }
  
    this.checkOrConvertNumber(this.settings, 'justifyThreshold');
    if (this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) {
      throw 'justifyThreshold must be in the interval [0,1]';
    }
    if ($.type(this.settings.cssAnimation) !== 'boolean') {
      throw 'cssAnimation must be a boolean';
    }
  
    if ($.type(this.settings.captions) !== 'boolean') throw 'captions must be a boolean';
    this.checkOrConvertNumber(this.settings.captionSettings, 'animationDuration');
  
    this.checkOrConvertNumber(this.settings.captionSettings, 'visibleOpacity');
    if (this.settings.captionSettings.visibleOpacity < 0 ||
      this.settings.captionSettings.visibleOpacity > 1) {
      throw 'captionSettings.visibleOpacity must be in the interval [0, 1]';
    }
  
    this.checkOrConvertNumber(this.settings.captionSettings, 'nonVisibleOpacity');
    if (this.settings.captionSettings.nonVisibleOpacity < 0 ||
      this.settings.captionSettings.nonVisibleOpacity > 1) {
      throw 'captionSettings.nonVisibleOpacity must be in the interval [0, 1]';
    }
  
    this.checkOrConvertNumber(this.settings, 'imagesAnimationDuration');
    this.checkOrConvertNumber(this.settings, 'refreshTime');
    this.checkOrConvertNumber(this.settings, 'refreshSensitivity');
    if ($.type(this.settings.randomize) !== 'boolean') throw 'randomize must be a boolean';
    if ($.type(this.settings.selector) !== 'string') throw 'selector must be a string';
  
    if (this.settings.sort !== false && !$.isFunction(this.settings.sort)) {
      throw 'sort must be false or a comparison function';
    }
  
    if (this.settings.filter !== false && !$.isFunction(this.settings.filter) &&
      $.type(this.settings.filter) !== 'string') {
      throw 'filter must be false, a string or a filter function';
    }
  };
  
  /**
   * It brings all the indexes from the sizeRangeSuffixes and it orders them. They are then sorted and returned.
   * @returns {Array} sorted suffix ranges
   */
  JustifiedGallery.prototype.retrieveSuffixRanges = function () {
    var suffixRanges = [];
    for (var rangeIdx in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(rangeIdx)) suffixRanges.push(parseInt(rangeIdx, 10));
    }
    suffixRanges.sort(function (a, b) { return a > b ? 1 : a < b ? -1 : 0; });
    return suffixRanges;
  };
  
  /**
   * Update the existing settings only changing some of them
   *
   * @param newSettings the new settings (or a subgroup of them)
   */
  JustifiedGallery.prototype.updateSettings = function (newSettings) {
    // In this case Justified Gallery has been called again changing only some options
    this.settings = $.extend({}, this.settings, newSettings);
    this.checkSettings();
  
    // As reported in the settings: negative value = same as margins, 0 = disabled
    this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins;
  
    this.maxRowHeight = this.retrieveMaxRowHeight();
    this.suffixRanges = this.retrieveSuffixRanges();
  };
  
  JustifiedGallery.prototype.defaults = {
    sizeRangeSuffixes: {}, /* e.g. Flickr configuration
        {
          100: '_t',  // used when longest is less than 100px
          240: '_m',  // used when longest is between 101px and 240px
          320: '_n',  // ...
          500: '',
          640: '_z',
          1024: '_b'  // used as else case because it is the last
        }
    */
    thumbnailPath: undefined, /* If defined, sizeRangeSuffixes is not used, and this function is used to determine the
    path relative to a specific thumbnail size. The function should accept respectively three arguments:
    current path, width and height */
    rowHeight: 120, // required? required to be > 0?
    maxRowHeight: false, // false or negative value to deactivate. Positive number to express the value in pixels,
    // A string '[0-9]+%' to express in percentage (e.g. 300% means that the row height
    // can't exceed 3 * rowHeight)
    maxRowsCount: 0, // maximum number of rows to be displayed (0 = disabled)
    margins: 1,
    border: -1, // negative value = same as margins, 0 = disabled, any other value to set the border
  
    lastRow: 'nojustify', // … which is the same as 'left', or can be 'justify', 'center', 'right' or 'hide'
  
    justifyThreshold: 0.90, /* if row width / available space > 0.90 it will be always justified
                             * (i.e. lastRow setting is not considered) */
    waitThumbnailsLoad: true,
    captions: true,
    cssAnimation: true,
    imagesAnimationDuration: 500, // ignored with css animations
    captionSettings: { // ignored with css animations
      animationDuration: 500,
      visibleOpacity: 0.7,
      nonVisibleOpacity: 0.0
    },
    rel: null, // rewrite the rel of each analyzed links
    target: null, // rewrite the target of all links
    extension: /\.[^.\\/]+$/, // regexp to capture the extension of an image
    refreshTime: 200, // time interval (in ms) to check if the page changes its width
    refreshSensitivity: 0, // change in width allowed (in px) without re-building the gallery
    randomize: false,
    rtl: false, // right-to-left mode
    sort: false, /*
      - false: to do not sort
      - function: to sort them using the function as comparator (see Array.prototype.sort())
    */
    filter: false, /*
      - false, null or undefined: for a disabled filter
      - a string: an entry is kept if entry.is(filter string) returns true
                  see jQuery's .is() function for further information
      - a function: invoked with arguments (entry, index, array). Return true to keep the entry, false otherwise.
                    It follows the specifications of the Array.prototype.filter() function of JavaScript.
    */
    selector: 'a', // The selector that is used to know what are the entries of the gallery
    imgSelector: '> img, > a > img, > svg, > a > svg', // The selector that is used to know what are the images of each entry
    triggerEvent: function (event) { // This is called to trigger events, the default behavior is to call $.trigger
      this.$gallery.trigger(event);  // Consider that 'this' is this set to the JustifiedGallery object, so it can
    }                                // access to fields such as $gallery, useful to trigger events with jQuery.
  };
  

  /**
   * Justified Gallery plugin for jQuery
   *
   * Events
   *  - jg.complete : called when all the gallery has been created
   *  - jg.resize : called when the gallery has been resized
   *  - jg.rowflush : when a new row appears
   *
   * @param arg the action (or the settings) passed when the plugin is called
   * @returns {*} the object itself
   */
  $.fn.justifiedGallery = function (arg) {
    return this.each(function (index, gallery) {

      var $gallery = $(gallery);
      $gallery.addClass('justified-gallery');

      var controller = $gallery.data('jg.controller');
      if (typeof controller === 'undefined') {
        // Create controller and assign it to the object data
        if (typeof arg !== 'undefined' && arg !== null && $.type(arg) !== 'object') {
          if (arg === 'destroy') return; // Just a call to an unexisting object
          throw 'The argument must be an object';
        }
        controller = new JustifiedGallery($gallery, $.extend({}, JustifiedGallery.prototype.defaults, arg));
        $gallery.data('jg.controller', controller);
      } else if (arg === 'norewind') {
        // In this case we don't rewind: we analyze only the latest images (e.g. to complete the last unfinished row
        // ... left to be more readable
      } else if (arg === 'destroy') {
        controller.destroy();
        return;
      } else {
        // In this case Justified Gallery has been called again changing only some options
        controller.updateSettings(arg);
        controller.rewind();
      }

      // Update the entries list
      if (!controller.updateEntries(arg === 'norewind')) return;

      // Init justified gallery
      controller.init();

    });
  };

}));


/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_jquery_justifiedGallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/jquery.justifiedGallery */ "./js/libs/jquery.justifiedGallery.js");
/* harmony import */ var _libs_jquery_justifiedGallery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_libs_jquery_justifiedGallery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/bundle */ "../node_modules/swiper/swiper-bundle.esm.js");


// import SwiperCore, {
//     Navigation,
//     EffectFade,
//     Swiper
// } from 'swiper/core'

// SwiperCore.use(Navigation, EffectFade)



jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('DOMContentLoaded', function () {

    // slider on mobile
    console.log(window.innerWidth === 375)

    let swiperTabs
    if (window.innerWidth === 375) {
        swiperTabs = new swiper_bundle__WEBPACK_IMPORTED_MODULE_2__.default('.swiper-container', {
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            // centerInsufficientSlides: true,
            freeMode: true
        })
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.swiper-slide:nth-child(3)').on('click', function () {
            swiperTabs.slidePrev()
        })
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.swiper-slide').last().on('click', function () {
            swiperTabs.slideNext()
        })
    }
    
    // gallery photos request

    jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
        // GET photos
    })

    // JG init

    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.content-gallery').justifiedGallery({
        rowHeight: 310,
        margins: 2,
        lastRow: 'justify',
        randomize: true
    })

    

    
    // static on desktop

    const marker = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.content-tab-marker')
    const tabs = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.content-nav-link')


    const indicator = (target, shift = 0) => {

        marker.css('left', target.offsetLeft - shift)
        marker.css('width', target.offsetWidth + 9)



    }

    tabs.each(function (i) {

        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('click', function (e) {
            const target = e.target
            tabs.removeClass('active')
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active')


            if (swiperTabs) {
                let translate = swiperTabs.translate

                indicator(target, 5 - translate)
            } else indicator(target, 5)
        })

        if (i === 0) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('click')
        }

    })
    swiperTabs.on('setTranslate', () => {
        const translate = swiperTabs.translate
        marker.css('left', jquery__WEBPACK_IMPORTED_MODULE_0___default()('.active')[0].offsetLeft + translate - 5)
    })

})

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
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./index.js","vendors-node_modules_jquery_dist_jquery_js-node_modules_swiper_swiper-bundle_esm_js"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvbWFpbi5sZXNzPzA4NzQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vanMvbGlicy9qcXVlcnkuanVzdGlmaWVkR2FsbGVyeS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tYWluLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBMkI7Ozs7Ozs7Ozs7O0FDQTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxJQUEwQztBQUNoRDtBQUNBLElBQUksaUNBQU8sQ0FBQywwRUFBUSxDQUFDLG9DQUFFLE9BQU87QUFBQTtBQUFBO0FBQUEsa0dBQUM7QUFDL0IsR0FBRyxNQUFNLEVBcUJOO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxlQUFlLDhCQUE4QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QyxvQ0FBb0M7QUFDcEMsa0RBQWtEO0FBQ2xEO0FBQ0E7O0FBRUEsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsSUFBSTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEMsU0FBUzs7QUFFVDtBQUNBLDRDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULDZDQUE2QztBQUM3Qzs7QUFFQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHlDQUF5QztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLHlDQUF5QztBQUN4RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIseUNBQXlDO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxJQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsT0FBTztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFCQUFxQixjQUFjO0FBQ25DO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHlCQUF5QjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxTQUFTO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCO0FBQ0E7QUFD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OztXQUVBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQztXQUNBO1dBQ0EsZ0JBQWdCLDJCQUEyQjtXQUMzQztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsNENBQTRDO1dBQzVDO1dBQ0EsRTs7OztVQ3BGQTtVQUNBIiwiZmlsZSI6ImluZGV4LjU0ZmEwOTUwN2Q2YjA4ZmU5N2QyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICcuL3N0eWxlcy9tYWluLmxlc3MnXHJcbmltcG9ydCAnLi9qcy9tYWluJyIsIi8qIVxuICoganVzdGlmaWVkR2FsbGVyeSAtIHYzLjguMVxuICogaHR0cDovL21pcm9tYW5uaW5vLmdpdGh1Yi5pby9KdXN0aWZpZWQtR2FsbGVyeS9cbiAqIENvcHlyaWdodCAoYykgMjAyMCBNaXJvIE1hbm5pbm9cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gTm9kZS9Db21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJvb3QsIGpRdWVyeSkge1xuICAgICAgaWYgKGpRdWVyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIHJlcXVpcmUoJ2pRdWVyeScpIHJldHVybnMgYSBmYWN0b3J5IHRoYXQgcmVxdWlyZXMgd2luZG93IHRvXG4gICAgICAgIC8vIGJ1aWxkIGEgalF1ZXJ5IGluc3RhbmNlLCB3ZSBub3JtYWxpemUgaG93IHdlIHVzZSBtb2R1bGVzXG4gICAgICAgIC8vIHRoYXQgcmVxdWlyZSB0aGlzIHBhdHRlcm4gYnV0IHRoZSB3aW5kb3cgcHJvdmlkZWQgaXMgYSBub29wXG4gICAgICAgIC8vIGlmIGl0J3MgZGVmaW5lZCAoaG93IGpxdWVyeSB3b3JrcylcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgalF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgalF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jykocm9vdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICAgIHJldHVybiBqUXVlcnk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBmYWN0b3J5KGpRdWVyeSk7XG4gIH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuICAvKipcbiAgICogSnVzdGlmaWVkIEdhbGxlcnkgY29udHJvbGxlciBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAcGFyYW0gJGdhbGxlcnkgdGhlIGdhbGxlcnkgdG8gYnVpbGRcbiAgICogQHBhcmFtIHNldHRpbmdzIHRoZSBzZXR0aW5ncyAodGhlIGRlZmF1bHRzIGFyZSBpbiBKdXN0aWZpZWRHYWxsZXJ5LmRlZmF1bHRzKVxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIHZhciBKdXN0aWZpZWRHYWxsZXJ5ID0gZnVuY3Rpb24gKCRnYWxsZXJ5LCBzZXR0aW5ncykge1xuICBcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5jaGVja1NldHRpbmdzKCk7XG4gIFxuICAgIHRoaXMuaW1nQW5hbHl6ZXJUaW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLmVudHJpZXMgPSBudWxsO1xuICAgIHRoaXMuYnVpbGRpbmdSb3cgPSB7XG4gICAgICBlbnRyaWVzQnVmZjogW10sXG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIGFzcGVjdFJhdGlvOiAwXG4gICAgfTtcbiAgICB0aGlzLmxhc3RGZXRjaGVkRW50cnkgPSBudWxsO1xuICAgIHRoaXMubGFzdEFuYWx5emVkSW5kZXggPSAtMTtcbiAgICB0aGlzLnlpZWxkID0ge1xuICAgICAgZXZlcnk6IDIsIC8vIGRvIGEgZmx1c2ggZXZlcnkgbiBmbHVzaGVzIChtdXN0IGJlIGdyZWF0ZXIgdGhhbiAxKVxuICAgICAgZmx1c2hlZDogMCAvLyBmbHVzaGVkIHJvd3Mgd2l0aG91dCBhIHlpZWxkXG4gICAgfTtcbiAgICB0aGlzLmJvcmRlciA9IHNldHRpbmdzLmJvcmRlciA+PSAwID8gc2V0dGluZ3MuYm9yZGVyIDogc2V0dGluZ3MubWFyZ2lucztcbiAgICB0aGlzLm1heFJvd0hlaWdodCA9IHRoaXMucmV0cmlldmVNYXhSb3dIZWlnaHQoKTtcbiAgICB0aGlzLnN1ZmZpeFJhbmdlcyA9IHRoaXMucmV0cmlldmVTdWZmaXhSYW5nZXMoKTtcbiAgICB0aGlzLm9mZlkgPSB0aGlzLmJvcmRlcjtcbiAgICB0aGlzLnJvd3MgPSAwO1xuICAgIHRoaXMuc3Bpbm5lciA9IHtcbiAgICAgIHBoYXNlOiAwLFxuICAgICAgdGltZVNsb3Q6IDE1MCxcbiAgICAgICRlbDogJCgnPGRpdiBjbGFzcz1cImpnLXNwaW5uZXJcIj48c3Bhbj48L3NwYW4+PHNwYW4+PC9zcGFuPjxzcGFuPjwvc3Bhbj48L2Rpdj4nKSxcbiAgICAgIGludGVydmFsSWQ6IG51bGxcbiAgICB9O1xuICAgIHRoaXMuc2Nyb2xsQmFyT24gPSBmYWxzZTtcbiAgICB0aGlzLmNoZWNrV2lkdGhJbnRlcnZhbElkID0gbnVsbDtcbiAgICB0aGlzLmdhbGxlcnlXaWR0aCA9ICRnYWxsZXJ5LndpZHRoKCk7XG4gICAgdGhpcy4kZ2FsbGVyeSA9ICRnYWxsZXJ5O1xuICBcbiAgfTtcbiAgXG4gIC8qKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgYmVzdCBzdWZmaXggZ2l2ZW4gdGhlIHdpZHRoIGFuZCB0aGUgaGVpZ2h0ICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmdldFN1ZmZpeCA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGxvbmdlc3RTaWRlLCBpO1xuICAgIGxvbmdlc3RTaWRlID0gKHdpZHRoID4gaGVpZ2h0KSA/IHdpZHRoIDogaGVpZ2h0O1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnN1ZmZpeFJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxvbmdlc3RTaWRlIDw9IHRoaXMuc3VmZml4UmFuZ2VzW2ldKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzW3RoaXMuc3VmZml4UmFuZ2VzW2ldXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXNbdGhpcy5zdWZmaXhSYW5nZXNbaSAtIDFdXTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIHN1ZmZpeCBmcm9tIHRoZSBzdHJpbmdcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gYSBuZXcgc3RyaW5nIHdpdGhvdXQgdGhlIHN1ZmZpeFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucmVtb3ZlU3VmZml4ID0gZnVuY3Rpb24gKHN0ciwgc3VmZml4KSB7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHJpbmcoMCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBhIGJvb2xlYW4gdG8gc2F5IGlmIHRoZSBzdWZmaXggaXMgY29udGFpbmVkIGluIHRoZSBzdHIgb3Igbm90XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5lbmRzV2l0aCA9IGZ1bmN0aW9uIChzdHIsIHN1ZmZpeCkge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWZmaXgsIHN0ci5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSAhPT0gLTE7XG4gIH07XG4gIFxuICAvKipcbiAgICogR2V0IHRoZSB1c2VkIHN1ZmZpeCBvZiBhIHBhcnRpY3VsYXIgdXJsXG4gICAqXG4gICAqIEBwYXJhbSBzdHJcbiAgICogQHJldHVybnMge1N0cmluZ30gcmV0dXJuIHRoZSB1c2VkIHN1ZmZpeFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZ2V0VXNlZFN1ZmZpeCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBmb3IgKHZhciBzaSBpbiB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzKSB7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlcy5oYXNPd25Qcm9wZXJ0eShzaSkpIHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXNbc2ldLmxlbmd0aCA9PT0gMCkgY29udGludWU7XG4gICAgICAgIGlmICh0aGlzLmVuZHNXaXRoKHN0ciwgdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlc1tzaV0pKSByZXR1cm4gdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlc1tzaV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBHaXZlbiBhbiBpbWFnZSBzcmMsIHdpdGggdGhlIHdpZHRoIGFuZCB0aGUgaGVpZ2h0LCByZXR1cm5zIHRoZSBuZXcgaW1hZ2Ugc3JjIHdpdGggdGhlXG4gICAqIGJlc3Qgc3VmZml4IHRvIHNob3cgdGhlIGJlc3QgcXVhbGl0eSB0aHVtYm5haWwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBzdWZmaXggdG8gdXNlXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5uZXdTcmMgPSBmdW5jdGlvbiAoaW1hZ2VTcmMsIGltZ1dpZHRoLCBpbWdIZWlnaHQsIGltYWdlKSB7XG4gICAgdmFyIG5ld0ltYWdlU3JjO1xuICBcbiAgICBpZiAodGhpcy5zZXR0aW5ncy50aHVtYm5haWxQYXRoKSB7XG4gICAgICBuZXdJbWFnZVNyYyA9IHRoaXMuc2V0dGluZ3MudGh1bWJuYWlsUGF0aChpbWFnZVNyYywgaW1nV2lkdGgsIGltZ0hlaWdodCwgaW1hZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWF0Y2hSZXMgPSBpbWFnZVNyYy5tYXRjaCh0aGlzLnNldHRpbmdzLmV4dGVuc2lvbik7XG4gICAgICB2YXIgZXh0ID0gKG1hdGNoUmVzICE9PSBudWxsKSA/IG1hdGNoUmVzWzBdIDogJyc7XG4gICAgICBuZXdJbWFnZVNyYyA9IGltYWdlU3JjLnJlcGxhY2UodGhpcy5zZXR0aW5ncy5leHRlbnNpb24sICcnKTtcbiAgICAgIG5ld0ltYWdlU3JjID0gdGhpcy5yZW1vdmVTdWZmaXgobmV3SW1hZ2VTcmMsIHRoaXMuZ2V0VXNlZFN1ZmZpeChuZXdJbWFnZVNyYykpO1xuICAgICAgbmV3SW1hZ2VTcmMgKz0gdGhpcy5nZXRTdWZmaXgoaW1nV2lkdGgsIGltZ0hlaWdodCkgKyBleHQ7XG4gICAgfVxuICBcbiAgICByZXR1cm4gbmV3SW1hZ2VTcmM7XG4gIH07XG4gIFxuICAvKipcbiAgICogU2hvd3MgdGhlIGltYWdlcyB0aGF0IGlzIGluIHRoZSBnaXZlbiBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0gJGVudHJ5IHRoZSBlbnRyeVxuICAgKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHNob3cgYW5pbWF0aW9uIGlzIGZpbmlzaGVkXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zaG93SW1nID0gZnVuY3Rpb24gKCRlbnRyeSwgY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jc3NBbmltYXRpb24pIHtcbiAgICAgICRlbnRyeS5hZGRDbGFzcygnamctZW50cnktdmlzaWJsZScpO1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkZW50cnkuc3RvcCgpLmZhZGVUbyh0aGlzLnNldHRpbmdzLmltYWdlc0FuaW1hdGlvbkR1cmF0aW9uLCAxLjAsIGNhbGxiYWNrKTtcbiAgICAgICRlbnRyeS5maW5kKHRoaXMuc2V0dGluZ3MuaW1nU2VsZWN0b3IpLnN0b3AoKS5mYWRlVG8odGhpcy5zZXR0aW5ncy5pbWFnZXNBbmltYXRpb25EdXJhdGlvbiwgMS4wLCBjYWxsYmFjayk7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIEV4dHJhY3QgdGhlIGltYWdlIHNyYyBmb3JtIHRoZSBpbWFnZSwgbG9va2luZyBmcm9tIHRoZSAnc2FmZS1zcmMnLCBhbmQgaWYgaXQgY2FuJ3QgYmUgZm91bmQsIGZyb20gdGhlXG4gICAqICdzcmMnIGF0dHJpYnV0ZS4gSXQgc2F2ZXMgaW4gdGhlIGltYWdlIGRhdGEgdGhlICdqZy5vcmlnaW5hbFNyYycgZmllbGQsIHdpdGggdGhlIGV4dHJhY3RlZCBzcmMuXG4gICAqXG4gICAqIEBwYXJhbSAkaW1hZ2UgdGhlIGltYWdlIHRvIGFuYWx5emVcbiAgICogQHJldHVybnMge1N0cmluZ30gdGhlIGV4dHJhY3RlZCBzcmNcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmV4dHJhY3RJbWdTcmNGcm9tSW1hZ2UgPSBmdW5jdGlvbiAoJGltYWdlKSB7XG4gICAgdmFyIGltYWdlU3JjID0gJGltYWdlLmRhdGEoJ3NhZmUtc3JjJyk7XG4gICAgdmFyIGltYWdlU3JjTG9jID0gJ2RhdGEtc2FmZS1zcmMnO1xuICAgIGlmICh0eXBlb2YgaW1hZ2VTcmMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpbWFnZVNyYyA9ICRpbWFnZS5hdHRyKCdzcmMnKTtcbiAgICAgIGltYWdlU3JjTG9jID0gJ3NyYyc7XG4gICAgfVxuICAgICRpbWFnZS5kYXRhKCdqZy5vcmlnaW5hbFNyYycsIGltYWdlU3JjKTsgLy8gdGhpcyBpcyBzYXZlZCBmb3IgdGhlIGRlc3Ryb3kgbWV0aG9kXG4gICAgJGltYWdlLmRhdGEoJ2pnLnNyYycsIGltYWdlU3JjKTsgLy8gdGhpcyB3aWxsIGNoYW5nZSBvdmVydGltZVxuICAgICRpbWFnZS5kYXRhKCdqZy5vcmlnaW5hbFNyY0xvYycsIGltYWdlU3JjTG9jKTsgLy8gdGhpcyBpcyBzYXZlZCBmb3IgdGhlIGRlc3Ryb3kgbWV0aG9kXG4gICAgcmV0dXJuIGltYWdlU3JjO1xuICB9O1xuICBcbiAgLyoqIEByZXR1cm5zIHtqUXVlcnl9IHRoZSBpbWFnZSBpbiB0aGUgZ2l2ZW4gZW50cnkgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuaW1nRnJvbUVudHJ5ID0gZnVuY3Rpb24gKCRlbnRyeSkge1xuICAgIHZhciAkaW1nID0gJGVudHJ5LmZpbmQodGhpcy5zZXR0aW5ncy5pbWdTZWxlY3Rvcik7XG4gICAgcmV0dXJuICRpbWcubGVuZ3RoID09PSAwID8gbnVsbCA6ICRpbWc7XG4gIH07XG4gIFxuICAvKiogQHJldHVybnMge2pRdWVyeX0gdGhlIGNhcHRpb24gaW4gdGhlIGdpdmVuIGVudHJ5ICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmNhcHRpb25Gcm9tRW50cnkgPSBmdW5jdGlvbiAoJGVudHJ5KSB7XG4gICAgdmFyICRjYXB0aW9uID0gJGVudHJ5LmZpbmQoJz4gLmpnLWNhcHRpb24nKTtcbiAgICByZXR1cm4gJGNhcHRpb24ubGVuZ3RoID09PSAwID8gbnVsbCA6ICRjYXB0aW9uO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIERpc3BsYXkgdGhlIGVudHJ5XG4gICAqXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZW50cnkgdGhlIGVudHJ5IHRvIGRpc3BsYXlcbiAgICogQHBhcmFtIHtpbnR9IHggdGhlIHggcG9zaXRpb24gd2hlcmUgdGhlIGVudHJ5IG11c3QgYmUgcG9zaXRpb25lZFxuICAgKiBAcGFyYW0geSB0aGUgeSBwb3NpdGlvbiB3aGVyZSB0aGUgZW50cnkgbXVzdCBiZSBwb3NpdGlvbmVkXG4gICAqIEBwYXJhbSBpbWdXaWR0aCB0aGUgaW1hZ2Ugd2lkdGhcbiAgICogQHBhcmFtIGltZ0hlaWdodCB0aGUgaW1hZ2UgaGVpZ2h0XG4gICAqIEBwYXJhbSByb3dIZWlnaHQgdGhlIHJvdyBoZWlnaHQgb2YgdGhlIHJvdyB0aGF0IG93bnMgdGhlIGVudHJ5XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5kaXNwbGF5RW50cnkgPSBmdW5jdGlvbiAoJGVudHJ5LCB4LCB5LCBpbWdXaWR0aCwgaW1nSGVpZ2h0LCByb3dIZWlnaHQpIHtcbiAgICAkZW50cnkud2lkdGgoaW1nV2lkdGgpO1xuICAgICRlbnRyeS5oZWlnaHQocm93SGVpZ2h0KTtcbiAgICAkZW50cnkuY3NzKCd0b3AnLCB5KTtcbiAgICAkZW50cnkuY3NzKCdsZWZ0JywgeCk7XG4gIFxuICAgIHZhciAkaW1hZ2UgPSB0aGlzLmltZ0Zyb21FbnRyeSgkZW50cnkpO1xuICAgIGlmICgkaW1hZ2UgIT09IG51bGwpIHtcbiAgICAgICRpbWFnZS5jc3MoJ3dpZHRoJywgaW1nV2lkdGgpO1xuICAgICAgJGltYWdlLmNzcygnaGVpZ2h0JywgaW1nSGVpZ2h0KTtcbiAgICAgICRpbWFnZS5jc3MoJ21hcmdpbi1sZWZ0JywgLSBpbWdXaWR0aCAvIDIpO1xuICAgICAgJGltYWdlLmNzcygnbWFyZ2luLXRvcCcsIC0gaW1nSGVpZ2h0IC8gMik7XG4gIFxuICAgICAgLy8gSW1hZ2UgcmVsb2FkaW5nIGZvciBhbiBoaWdoIHF1YWxpdHkgb2YgdGh1bWJuYWlsc1xuICAgICAgdmFyIGltYWdlU3JjID0gJGltYWdlLmRhdGEoJ2pnLnNyYycpO1xuICAgICAgaWYgKGltYWdlU3JjKSB7XG4gICAgICAgIGltYWdlU3JjID0gdGhpcy5uZXdTcmMoaW1hZ2VTcmMsIGltZ1dpZHRoLCBpbWdIZWlnaHQsICRpbWFnZVswXSk7XG4gIFxuICAgICAgICAkaW1hZ2Uub25lKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgdGhpcy5yZXNldEltZ1NyYygkaW1hZ2UpOyAvL3JldmVydCB0byB0aGUgb3JpZ2luYWwgdGh1bWJuYWlsXG4gICAgICAgIH0pO1xuICBcbiAgICAgICAgdmFyIGxvYWROZXdJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBpZiAoaW1hZ2VTcmMgIT09IG5ld0ltYWdlU3JjKSB7IFxuICAgICAgICAgICAgJGltYWdlLmF0dHIoJ3NyYycsIGltYWdlU3JjKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH07XG4gIFxuICAgICAgICBpZiAoJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcpID09PSAnc2tpcHBlZCcgJiYgaW1hZ2VTcmMpIHtcbiAgICAgICAgICB0aGlzLm9uSW1hZ2VFdmVudChpbWFnZVNyYywgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zaG93SW1nKCRlbnRyeSwgbG9hZE5ld0ltYWdlKTsgLy9sb2FkIHRoZSBuZXcgaW1hZ2UgYWZ0ZXIgdGhlIGZhZGVJblxuICAgICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcsIHRydWUpO1xuICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2hvd0ltZygkZW50cnksIGxvYWROZXdJbWFnZSk7IC8vbG9hZCB0aGUgbmV3IGltYWdlIGFmdGVyIHRoZSBmYWRlSW5cbiAgICAgICAgfVxuICAgICAgXG4gICAgICB9XG4gIFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dJbWcoJGVudHJ5KTtcbiAgICB9XG4gIFxuICAgIHRoaXMuZGlzcGxheUVudHJ5Q2FwdGlvbigkZW50cnkpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIERpc3BsYXkgdGhlIGVudHJ5IGNhcHRpb24uIElmIHRoZSBjYXB0aW9uIGVsZW1lbnQgZG9lc24ndCBleGlzdHMsIGl0IGNyZWF0ZXMgdGhlIGNhcHRpb24gdXNpbmcgdGhlICdhbHQnXG4gICAqIG9yIHRoZSAndGl0bGUnIGF0dHJpYnV0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkZW50cnkgdGhlIGVudHJ5IHRvIHByb2Nlc3NcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmRpc3BsYXlFbnRyeUNhcHRpb24gPSBmdW5jdGlvbiAoJGVudHJ5KSB7XG4gICAgdmFyICRpbWFnZSA9IHRoaXMuaW1nRnJvbUVudHJ5KCRlbnRyeSk7XG4gICAgaWYgKCRpbWFnZSAhPT0gbnVsbCAmJiB0aGlzLnNldHRpbmdzLmNhcHRpb25zKSB7XG4gICAgICB2YXIgJGltZ0NhcHRpb24gPSB0aGlzLmNhcHRpb25Gcm9tRW50cnkoJGVudHJ5KTtcbiAgXG4gICAgICAvLyBDcmVhdGUgaXQgaWYgaXQgZG9lc24ndCBleGlzdHNcbiAgICAgIGlmICgkaW1nQ2FwdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgY2FwdGlvbiA9ICRpbWFnZS5hdHRyKCdhbHQnKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRDYXB0aW9uKGNhcHRpb24pKSBjYXB0aW9uID0gJGVudHJ5LmF0dHIoJ3RpdGxlJyk7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRDYXB0aW9uKGNhcHRpb24pKSB7IC8vIENyZWF0ZSBvbmx5IHdlIGZvdW5kIHNvbWV0aGluZ1xuICAgICAgICAgICRpbWdDYXB0aW9uID0gJCgnPGRpdiBjbGFzcz1cImpnLWNhcHRpb25cIj4nICsgY2FwdGlvbiArICc8L2Rpdj4nKTtcbiAgICAgICAgICAkZW50cnkuYXBwZW5kKCRpbWdDYXB0aW9uKTtcbiAgICAgICAgICAkZW50cnkuZGF0YSgnamcuY3JlYXRlZENhcHRpb24nLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgIC8vIENyZWF0ZSBldmVudHMgKHdlIGNoZWNrIGFnYWluIHRoZSAkaW1nQ2FwdGlvbiBiZWNhdXNlIGl0IGNhbiBiZSBzdGlsbCBpbmV4aXN0ZW50KVxuICAgICAgaWYgKCRpbWdDYXB0aW9uICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5jc3NBbmltYXRpb24pICRpbWdDYXB0aW9uLnN0b3AoKS5mYWRlVG8oMCwgdGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3Mubm9uVmlzaWJsZU9wYWNpdHkpO1xuICAgICAgICB0aGlzLmFkZENhcHRpb25FdmVudHNIYW5kbGVycygkZW50cnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZUNhcHRpb25FdmVudHNIYW5kbGVycygkZW50cnkpO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgdGhlIGNhcHRpb25cbiAgICpcbiAgICogQHBhcmFtIGNhcHRpb24gVGhlIGNhcHRpb24gdGhhdCBzaG91bGQgYmUgdmFsaWRhdGVkXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFZhbGlkYXRpb24gcmVzdWx0XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5pc1ZhbGlkQ2FwdGlvbiA9IGZ1bmN0aW9uIChjYXB0aW9uKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgY2FwdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgY2FwdGlvbi5sZW5ndGggPiAwKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgZm9yIHRoZSBldmVudCAnbW91c2VlbnRlcicuIEl0IGFzc3VtZXMgdGhhdCB0aGUgZXZlbnQgY3VycmVudFRhcmdldCBpcyBhbiBlbnRyeS5cbiAgICogSXQgc2hvd3MgdGhlIGNhcHRpb24gdXNpbmcgalF1ZXJ5IChvciB1c2luZyBDU1MgaWYgaXQgaXMgY29uZmlndXJlZCBzbylcbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRPYmplY3QgdGhlIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUub25FbnRyeU1vdXNlRW50ZXJGb3JDYXB0aW9uID0gZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgdmFyICRjYXB0aW9uID0gdGhpcy5jYXB0aW9uRnJvbUVudHJ5KCQoZXZlbnRPYmplY3QuY3VycmVudFRhcmdldCkpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmNzc0FuaW1hdGlvbikge1xuICAgICAgJGNhcHRpb24uYWRkQ2xhc3MoJ2pnLWNhcHRpb24tdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdqZy1jYXB0aW9uLWhpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkY2FwdGlvbi5zdG9wKCkuZmFkZVRvKHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgICB0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy52aXNpYmxlT3BhY2l0eSk7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayBmb3IgdGhlIGV2ZW50ICdtb3VzZWxlYXZlJy4gSXQgYXNzdW1lcyB0aGF0IHRoZSBldmVudCBjdXJyZW50VGFyZ2V0IGlzIGFuIGVudHJ5LlxuICAgKiBJdCBoaWRlcyB0aGUgY2FwdGlvbiB1c2luZyBqUXVlcnkgKG9yIHVzaW5nIENTUyBpZiBpdCBpcyBjb25maWd1cmVkIHNvKVxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudE9iamVjdCB0aGUgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5vbkVudHJ5TW91c2VMZWF2ZUZvckNhcHRpb24gPSBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICB2YXIgJGNhcHRpb24gPSB0aGlzLmNhcHRpb25Gcm9tRW50cnkoJChldmVudE9iamVjdC5jdXJyZW50VGFyZ2V0KSk7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY3NzQW5pbWF0aW9uKSB7XG4gICAgICAkY2FwdGlvbi5yZW1vdmVDbGFzcygnamctY2FwdGlvbi12aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ2pnLWNhcHRpb24taGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRjYXB0aW9uLnN0b3AoKS5mYWRlVG8odGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3MuYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLm5vblZpc2libGVPcGFjaXR5KTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogQWRkIHRoZSBoYW5kbGVycyBvZiB0aGUgZW50cnkgZm9yIHRoZSBjYXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSAkZW50cnkgdGhlIGVudHJ5IHRvIG1vZGlmeVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuYWRkQ2FwdGlvbkV2ZW50c0hhbmRsZXJzID0gZnVuY3Rpb24gKCRlbnRyeSkge1xuICAgIHZhciBjYXB0aW9uTW91c2VFdmVudHMgPSAkZW50cnkuZGF0YSgnamcuY2FwdGlvbk1vdXNlRXZlbnRzJyk7XG4gICAgaWYgKHR5cGVvZiBjYXB0aW9uTW91c2VFdmVudHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjYXB0aW9uTW91c2VFdmVudHMgPSB7XG4gICAgICAgIG1vdXNlZW50ZXI6ICQucHJveHkodGhpcy5vbkVudHJ5TW91c2VFbnRlckZvckNhcHRpb24sIHRoaXMpLFxuICAgICAgICBtb3VzZWxlYXZlOiAkLnByb3h5KHRoaXMub25FbnRyeU1vdXNlTGVhdmVGb3JDYXB0aW9uLCB0aGlzKVxuICAgICAgfTtcbiAgICAgICRlbnRyeS5vbignbW91c2VlbnRlcicsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjYXB0aW9uTW91c2VFdmVudHMubW91c2VlbnRlcik7XG4gICAgICAkZW50cnkub24oJ21vdXNlbGVhdmUnLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2FwdGlvbk1vdXNlRXZlbnRzLm1vdXNlbGVhdmUpO1xuICAgICAgJGVudHJ5LmRhdGEoJ2pnLmNhcHRpb25Nb3VzZUV2ZW50cycsIGNhcHRpb25Nb3VzZUV2ZW50cyk7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgaGFuZGxlcnMgb2YgdGhlIGVudHJ5IGZvciB0aGUgY2FwdGlvblxuICAgKlxuICAgKiBAcGFyYW0gJGVudHJ5IHRoZSBlbnRyeSB0byBtb2RpZnlcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnJlbW92ZUNhcHRpb25FdmVudHNIYW5kbGVycyA9IGZ1bmN0aW9uICgkZW50cnkpIHtcbiAgICB2YXIgY2FwdGlvbk1vdXNlRXZlbnRzID0gJGVudHJ5LmRhdGEoJ2pnLmNhcHRpb25Nb3VzZUV2ZW50cycpO1xuICAgIGlmICh0eXBlb2YgY2FwdGlvbk1vdXNlRXZlbnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgJGVudHJ5Lm9mZignbW91c2VlbnRlcicsIHVuZGVmaW5lZCwgY2FwdGlvbk1vdXNlRXZlbnRzLm1vdXNlZW50ZXIpO1xuICAgICAgJGVudHJ5Lm9mZignbW91c2VsZWF2ZScsIHVuZGVmaW5lZCwgY2FwdGlvbk1vdXNlRXZlbnRzLm1vdXNlbGVhdmUpO1xuICAgICAgJGVudHJ5LnJlbW92ZURhdGEoJ2pnLmNhcHRpb25Nb3VzZUV2ZW50cycpO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgYnVpbGRpbmcgcm93IGRhdGEgdG8gYmUgdXNlZCBmb3IgYSBuZXcgcm93XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5jbGVhckJ1aWxkaW5nUm93ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYgPSBbXTtcbiAgICB0aGlzLmJ1aWxkaW5nUm93LmFzcGVjdFJhdGlvID0gMDtcbiAgICB0aGlzLmJ1aWxkaW5nUm93LndpZHRoID0gMDtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBKdXN0aWZ5IHRoZSBidWlsZGluZyByb3csIHByZXBhcmluZyBpdCB0b1xuICAgKlxuICAgKiBAcGFyYW0gaXNMYXN0Um93XG4gICAqIEBwYXJhbSBoaWRkZW5Sb3cgdW5kZWZpbmVkIG9yIGZhbHNlIGZvciBub3JtYWwgYmVoYXZpb3IuIGhpZGRlblJvdyA9IHRydWUgdG8gaGlkZSB0aGUgcm93LlxuICAgKiBAcmV0dXJucyBhIGJvb2xlYW4gdG8ga25vdyBpZiB0aGUgcm93IGhhcyBiZWVuIGp1c3RpZmllZCBvciBub3RcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnByZXBhcmVCdWlsZGluZ1JvdyA9IGZ1bmN0aW9uIChpc0xhc3RSb3csIGhpZGRlblJvdykge1xuICAgIHZhciBpLCAkZW50cnksIGltZ0FzcGVjdFJhdGlvLCBuZXdJbWdXLCBuZXdJbWdILCBqdXN0aWZ5ID0gdHJ1ZTtcbiAgICB2YXIgbWluSGVpZ2h0ID0gMDtcbiAgICB2YXIgYXZhaWxhYmxlV2lkdGggPSB0aGlzLmdhbGxlcnlXaWR0aCAtIDIgKiB0aGlzLmJvcmRlciAtIChcbiAgICAgICh0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aCAtIDEpICogdGhpcy5zZXR0aW5ncy5tYXJnaW5zKTtcbiAgICB2YXIgcm93SGVpZ2h0ID0gYXZhaWxhYmxlV2lkdGggLyB0aGlzLmJ1aWxkaW5nUm93LmFzcGVjdFJhdGlvO1xuICAgIHZhciBkZWZhdWx0Um93SGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5yb3dIZWlnaHQ7XG4gICAgdmFyIGp1c3RpZmlhYmxlID0gdGhpcy5idWlsZGluZ1Jvdy53aWR0aCAvIGF2YWlsYWJsZVdpZHRoID4gdGhpcy5zZXR0aW5ncy5qdXN0aWZ5VGhyZXNob2xkO1xuICBcbiAgICAvL1NraXAgdGhlIGxhc3Qgcm93IGlmIHdlIGNhbid0IGp1c3RpZnkgaXQgYW5kIHRoZSBsYXN0Um93ID09ICdoaWRlJ1xuICAgIGlmIChoaWRkZW5Sb3cgfHwgKGlzTGFzdFJvdyAmJiB0aGlzLnNldHRpbmdzLmxhc3RSb3cgPT09ICdoaWRlJyAmJiAhanVzdGlmaWFibGUpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGg7IGkrKykge1xuICAgICAgICAkZW50cnkgPSB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmW2ldO1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jc3NBbmltYXRpb24pXG4gICAgICAgICAgJGVudHJ5LnJlbW92ZUNsYXNzKCdqZy1lbnRyeS12aXNpYmxlJyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRlbnRyeS5zdG9wKCkuZmFkZVRvKDAsIDAuMSk7XG4gICAgICAgICAgJGVudHJ5LmZpbmQoJz4gaW1nLCA+IGEgPiBpbWcnKS5mYWRlVG8oMCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gIFxuICAgIC8vIFdpdGggbGFzdFJvdyA9IG5vanVzdGlmeSwganVzdGlmeSBpZiBpcyBqdXN0aWZpY2FibGUgKHRoZSBpbWFnZXMgd2lsbCBub3QgYmVjb21lIHRvbyBiaWcpXG4gICAgaWYgKGlzTGFzdFJvdyAmJiAhanVzdGlmaWFibGUgJiYgdGhpcy5zZXR0aW5ncy5sYXN0Um93ICE9PSAnanVzdGlmeScgJiYgdGhpcy5zZXR0aW5ncy5sYXN0Um93ICE9PSAnaGlkZScpIHtcbiAgICAgIGp1c3RpZnkgPSBmYWxzZTtcbiAgXG4gICAgICBpZiAodGhpcy5yb3dzID4gMCkge1xuICAgICAgICBkZWZhdWx0Um93SGVpZ2h0ID0gKHRoaXMub2ZmWSAtIHRoaXMuYm9yZGVyIC0gdGhpcy5zZXR0aW5ncy5tYXJnaW5zICogdGhpcy5yb3dzKSAvIHRoaXMucm93cztcbiAgICAgICAganVzdGlmeSA9IGRlZmF1bHRSb3dIZWlnaHQgKiB0aGlzLmJ1aWxkaW5nUm93LmFzcGVjdFJhdGlvIC8gYXZhaWxhYmxlV2lkdGggPiB0aGlzLnNldHRpbmdzLmp1c3RpZnlUaHJlc2hvbGQ7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGg7IGkrKykge1xuICAgICAgJGVudHJ5ID0gdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZltpXTtcbiAgICAgIGltZ0FzcGVjdFJhdGlvID0gJGVudHJ5LmRhdGEoJ2pnLndpZHRoJykgLyAkZW50cnkuZGF0YSgnamcuaGVpZ2h0Jyk7XG4gIFxuICAgICAgaWYgKGp1c3RpZnkpIHtcbiAgICAgICAgbmV3SW1nVyA9IChpID09PSB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aCAtIDEpID8gYXZhaWxhYmxlV2lkdGggOiByb3dIZWlnaHQgKiBpbWdBc3BlY3RSYXRpbztcbiAgICAgICAgbmV3SW1nSCA9IHJvd0hlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0ltZ1cgPSBkZWZhdWx0Um93SGVpZ2h0ICogaW1nQXNwZWN0UmF0aW87XG4gICAgICAgIG5ld0ltZ0ggPSBkZWZhdWx0Um93SGVpZ2h0O1xuICAgICAgfVxuICBcbiAgICAgIGF2YWlsYWJsZVdpZHRoIC09IE1hdGgucm91bmQobmV3SW1nVyk7XG4gICAgICAkZW50cnkuZGF0YSgnamcuandpZHRoJywgTWF0aC5yb3VuZChuZXdJbWdXKSk7XG4gICAgICAkZW50cnkuZGF0YSgnamcuamhlaWdodCcsIE1hdGguY2VpbChuZXdJbWdIKSk7XG4gICAgICBpZiAoaSA9PT0gMCB8fCBtaW5IZWlnaHQgPiBuZXdJbWdIKSBtaW5IZWlnaHQgPSBuZXdJbWdIO1xuICAgIH1cbiAgXG4gICAgdGhpcy5idWlsZGluZ1Jvdy5oZWlnaHQgPSBtaW5IZWlnaHQ7XG4gICAgcmV0dXJuIGp1c3RpZnk7XG4gIH07XG4gIFxuICAvKipcbiAgICogRmx1c2ggYSByb3c6IGp1c3RpZnkgaXQsIG1vZGlmeSB0aGUgZ2FsbGVyeSBoZWlnaHQgYWNjb3JkaW5nbHkgdG8gdGhlIHJvdyBoZWlnaHRcbiAgICpcbiAgICogQHBhcmFtIGlzTGFzdFJvd1xuICAgKiBAcGFyYW0gaGlkZGVuUm93IHVuZGVmaW5lZCBvciBmYWxzZSBmb3Igbm9ybWFsIGJlaGF2aW9yLiBoaWRkZW5Sb3cgPSB0cnVlIHRvIGhpZGUgdGhlIHJvdy5cbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmZsdXNoUm93ID0gZnVuY3Rpb24gKGlzTGFzdFJvdywgaGlkZGVuUm93KSB7XG4gICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcbiAgICB2YXIgJGVudHJ5LCBidWlsZGluZ1Jvd1Jlcywgb2ZmWCA9IHRoaXMuYm9yZGVyLCBpO1xuICBcbiAgICBidWlsZGluZ1Jvd1JlcyA9IHRoaXMucHJlcGFyZUJ1aWxkaW5nUm93KGlzTGFzdFJvdywgaGlkZGVuUm93KTtcbiAgICBpZiAoaGlkZGVuUm93IHx8IChpc0xhc3RSb3cgJiYgc2V0dGluZ3MubGFzdFJvdyA9PT0gJ2hpZGUnICYmIGJ1aWxkaW5nUm93UmVzID09PSAtMSkpIHtcbiAgICAgIHRoaXMuY2xlYXJCdWlsZGluZ1JvdygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMubWF4Um93SGVpZ2h0KSB7XG4gICAgICBpZiAodGhpcy5tYXhSb3dIZWlnaHQgPCB0aGlzLmJ1aWxkaW5nUm93LmhlaWdodCkgdGhpcy5idWlsZGluZ1Jvdy5oZWlnaHQgPSB0aGlzLm1heFJvd0hlaWdodDtcbiAgICB9XG4gIFxuICAgIC8vQWxpZ24gbGFzdCAodW5qdXN0aWZpZWQpIHJvd1xuICAgIGlmIChpc0xhc3RSb3cgJiYgKHNldHRpbmdzLmxhc3RSb3cgPT09ICdjZW50ZXInIHx8IHNldHRpbmdzLmxhc3RSb3cgPT09ICdyaWdodCcpKSB7XG4gICAgICB2YXIgYXZhaWxhYmxlV2lkdGggPSB0aGlzLmdhbGxlcnlXaWR0aCAtIDIgKiB0aGlzLmJvcmRlciAtICh0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aCAtIDEpICogc2V0dGluZ3MubWFyZ2lucztcbiAgXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGg7IGkrKykge1xuICAgICAgICAkZW50cnkgPSB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmW2ldO1xuICAgICAgICBhdmFpbGFibGVXaWR0aCAtPSAkZW50cnkuZGF0YSgnamcuandpZHRoJyk7XG4gICAgICB9XG4gIFxuICAgICAgaWYgKHNldHRpbmdzLmxhc3RSb3cgPT09ICdjZW50ZXInKVxuICAgICAgICBvZmZYICs9IE1hdGgucm91bmQoYXZhaWxhYmxlV2lkdGggLyAyKTtcbiAgICAgIGVsc2UgaWYgKHNldHRpbmdzLmxhc3RSb3cgPT09ICdyaWdodCcpXG4gICAgICAgIG9mZlggKz0gYXZhaWxhYmxlV2lkdGg7XG4gICAgfVxuICBcbiAgICB2YXIgbGFzdEVudHJ5SWR4ID0gdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGggLSAxO1xuICAgIGZvciAoaSA9IDA7IGkgPD0gbGFzdEVudHJ5SWR4OyBpKyspIHtcbiAgICAgICRlbnRyeSA9IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmZbdGhpcy5zZXR0aW5ncy5ydGwgPyBsYXN0RW50cnlJZHggLSBpIDogaV07XG4gICAgICB0aGlzLmRpc3BsYXlFbnRyeSgkZW50cnksIG9mZlgsIHRoaXMub2ZmWSwgJGVudHJ5LmRhdGEoJ2pnLmp3aWR0aCcpLCAkZW50cnkuZGF0YSgnamcuamhlaWdodCcpLCB0aGlzLmJ1aWxkaW5nUm93LmhlaWdodCk7XG4gICAgICBvZmZYICs9ICRlbnRyeS5kYXRhKCdqZy5qd2lkdGgnKSArIHNldHRpbmdzLm1hcmdpbnM7XG4gICAgfVxuICBcbiAgICAvL0dhbGxlcnkgSGVpZ2h0XG4gICAgdGhpcy5nYWxsZXJ5SGVpZ2h0VG9TZXQgPSB0aGlzLm9mZlkgKyB0aGlzLmJ1aWxkaW5nUm93LmhlaWdodCArIHRoaXMuYm9yZGVyO1xuICAgIHRoaXMuc2V0R2FsbGVyeVRlbXBIZWlnaHQodGhpcy5nYWxsZXJ5SGVpZ2h0VG9TZXQgKyB0aGlzLmdldFNwaW5uZXJIZWlnaHQoKSk7XG4gIFxuICAgIGlmICghaXNMYXN0Um93IHx8ICh0aGlzLmJ1aWxkaW5nUm93LmhlaWdodCA8PSBzZXR0aW5ncy5yb3dIZWlnaHQgJiYgYnVpbGRpbmdSb3dSZXMpKSB7XG4gICAgICAvL1JlYWR5IGZvciBhIG5ldyByb3dcbiAgICAgIHRoaXMub2ZmWSArPSB0aGlzLmJ1aWxkaW5nUm93LmhlaWdodCArIHNldHRpbmdzLm1hcmdpbnM7XG4gICAgICB0aGlzLnJvd3MgKz0gMTtcbiAgICAgIHRoaXMuY2xlYXJCdWlsZGluZ1JvdygpO1xuICAgICAgdGhpcy5zZXR0aW5ncy50cmlnZ2VyRXZlbnQuY2FsbCh0aGlzLCAnamcucm93Zmx1c2gnKTtcbiAgICB9XG4gIH07XG4gIFxuICBcbiAgLy8gU2Nyb2xsIHBvc2l0aW9uIG5vdCByZXN0b3Jpbmc6IGh0dHBzOi8vZ2l0aHViLmNvbS9taXJvbWFubmluby9KdXN0aWZpZWQtR2FsbGVyeS9pc3N1ZXMvMjIxXG4gIHZhciBnYWxsZXJ5UHJldlN0YXRpY0hlaWdodCA9IDA7XG4gIFxuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5yZW1lbWJlckdhbGxlcnlIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZ2FsbGVyeVByZXZTdGF0aWNIZWlnaHQgPSB0aGlzLiRnYWxsZXJ5LmhlaWdodCgpO1xuICAgIHRoaXMuJGdhbGxlcnkuaGVpZ2h0KGdhbGxlcnlQcmV2U3RhdGljSGVpZ2h0KTtcbiAgfTtcbiAgXG4gIC8vIGdyb3cgb25seVxuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zZXRHYWxsZXJ5VGVtcEhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQpIHtcbiAgICBnYWxsZXJ5UHJldlN0YXRpY0hlaWdodCA9IE1hdGgubWF4KGhlaWdodCwgZ2FsbGVyeVByZXZTdGF0aWNIZWlnaHQpO1xuICAgIHRoaXMuJGdhbGxlcnkuaGVpZ2h0KGdhbGxlcnlQcmV2U3RhdGljSGVpZ2h0KTtcbiAgfTtcbiAgXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnNldEdhbGxlcnlGaW5hbEhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQpIHtcbiAgICBnYWxsZXJ5UHJldlN0YXRpY0hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLiRnYWxsZXJ5LmhlaWdodChoZWlnaHQpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgd2lkdGggb2YgdGhlIGdhbGxlcnkgY29udGFpbmVyLCB0byBrbm93IGlmIGEgbmV3IGp1c3RpZmljYXRpb24gaXMgbmVlZGVkXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5jaGVja1dpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2hlY2tXaWR0aEludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgXG4gICAgICAvLyBpZiB0aGUgZ2FsbGVyeSBpcyBub3QgY3VycmVudGx5IHZpc2libGUsIGFib3J0LlxuICAgICAgaWYgKCF0aGlzLiRnYWxsZXJ5LmlzKFwiOnZpc2libGVcIikpIHJldHVybjtcbiAgXG4gICAgICB2YXIgZ2FsbGVyeVdpZHRoID0gcGFyc2VGbG9hdCh0aGlzLiRnYWxsZXJ5LndpZHRoKCkpO1xuICAgICAgaWYgKE1hdGguYWJzKGdhbGxlcnlXaWR0aCAtIHRoaXMuZ2FsbGVyeVdpZHRoKSA+IHRoaXMuc2V0dGluZ3MucmVmcmVzaFNlbnNpdGl2aXR5KSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeVdpZHRoID0gZ2FsbGVyeVdpZHRoO1xuICAgICAgICB0aGlzLnJld2luZCgpO1xuICBcbiAgICAgICAgdGhpcy5yZW1lbWJlckdhbGxlcnlIZWlnaHQoKTtcbiAgXG4gICAgICAgIC8vIFJlc3RhcnQgdG8gYW5hbHl6ZVxuICAgICAgICB0aGlzLnN0YXJ0SW1nQW5hbHl6ZXIodHJ1ZSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyksIHRoaXMuc2V0dGluZ3MucmVmcmVzaFRpbWUpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBhIGJvb2xlYW4gc2F5aW5nIGlmIHRoZSBzcGlubmVyIGlzIGFjdGl2ZSBvciBub3RcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmlzU3Bpbm5lckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGlubmVyLmludGVydmFsSWQgIT09IG51bGw7XG4gIH07XG4gIFxuICAvKipcbiAgICogQHJldHVybnMge2ludH0gdGhlIHNwaW5uZXIgaGVpZ2h0XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5nZXRTcGlubmVySGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNwaW5uZXIuJGVsLmlubmVySGVpZ2h0KCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogU3RvcHMgdGhlIHNwaW5uZXIgYW5pbWF0aW9uIGFuZCBtb2RpZnkgdGhlIGdhbGxlcnkgaGVpZ2h0IHRvIGV4Y2x1ZGUgdGhlIHNwaW5uZXJcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnN0b3BMb2FkaW5nU3Bpbm5lckFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuc3Bpbm5lci5pbnRlcnZhbElkKTtcbiAgICB0aGlzLnNwaW5uZXIuaW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgdGhpcy5zZXRHYWxsZXJ5VGVtcEhlaWdodCh0aGlzLiRnYWxsZXJ5LmhlaWdodCgpIC0gdGhpcy5nZXRTcGlubmVySGVpZ2h0KCkpO1xuICAgIHRoaXMuc3Bpbm5lci4kZWwuZGV0YWNoKCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogU3RhcnRzIHRoZSBzcGlubmVyIGFuaW1hdGlvblxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc3RhcnRMb2FkaW5nU3Bpbm5lckFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3Bpbm5lckNvbnRleHQgPSB0aGlzLnNwaW5uZXI7XG4gICAgdmFyICRzcGlubmVyUG9pbnRzID0gc3Bpbm5lckNvbnRleHQuJGVsLmZpbmQoJ3NwYW4nKTtcbiAgICBjbGVhckludGVydmFsKHNwaW5uZXJDb250ZXh0LmludGVydmFsSWQpO1xuICAgIHRoaXMuJGdhbGxlcnkuYXBwZW5kKHNwaW5uZXJDb250ZXh0LiRlbCk7XG4gICAgdGhpcy5zZXRHYWxsZXJ5VGVtcEhlaWdodCh0aGlzLm9mZlkgKyB0aGlzLmJ1aWxkaW5nUm93LmhlaWdodCArIHRoaXMuZ2V0U3Bpbm5lckhlaWdodCgpKTtcbiAgICBzcGlubmVyQ29udGV4dC5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNwaW5uZXJDb250ZXh0LnBoYXNlIDwgJHNwaW5uZXJQb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICRzcGlubmVyUG9pbnRzLmVxKHNwaW5uZXJDb250ZXh0LnBoYXNlKS5mYWRlVG8oc3Bpbm5lckNvbnRleHQudGltZVNsb3QsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHNwaW5uZXJQb2ludHMuZXEoc3Bpbm5lckNvbnRleHQucGhhc2UgLSAkc3Bpbm5lclBvaW50cy5sZW5ndGgpLmZhZGVUbyhzcGlubmVyQ29udGV4dC50aW1lU2xvdCwgMCk7XG4gICAgICB9XG4gICAgICBzcGlubmVyQ29udGV4dC5waGFzZSA9IChzcGlubmVyQ29udGV4dC5waGFzZSArIDEpICUgKCRzcGlubmVyUG9pbnRzLmxlbmd0aCAqIDIpO1xuICAgIH0sIHNwaW5uZXJDb250ZXh0LnRpbWVTbG90KTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBSZXdpbmQgdGhlIGltYWdlIGFuYWx5c2lzIHRvIHN0YXJ0IGZyb20gdGhlIGZpcnN0IGVudHJ5LlxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucmV3aW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubGFzdEZldGNoZWRFbnRyeSA9IG51bGw7XG4gICAgdGhpcy5sYXN0QW5hbHl6ZWRJbmRleCA9IC0xO1xuICAgIHRoaXMub2ZmWSA9IHRoaXMuYm9yZGVyO1xuICAgIHRoaXMucm93cyA9IDA7XG4gICAgdGhpcy5jbGVhckJ1aWxkaW5nUm93KCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQHJldHVybnMge1N0cmluZ30gYHNldHRpbmdzLnNlbGVjdG9yYCByZWplY3Rpbmcgc3Bpbm5lciBlbGVtZW50XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5nZXRTZWxlY3RvcldpdGhvdXRTcGlubmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNlbGVjdG9yICsgJywgZGl2Om5vdCguamctc3Bpbm5lciknO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEByZXR1cm5zIHtBcnJheX0gYWxsIGVudHJpZXMgbWF0Y2hlZCBieSBgc2V0dGluZ3Muc2VsZWN0b3JgXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5nZXRBbGxFbnRyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxlY3RvciA9IHRoaXMuZ2V0U2VsZWN0b3JXaXRob3V0U3Bpbm5lcigpO1xuICAgIHJldHVybiB0aGlzLiRnYWxsZXJ5LmNoaWxkcmVuKHNlbGVjdG9yKS50b0FycmF5KCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogVXBkYXRlIHRoZSBlbnRyaWVzIHNlYXJjaGluZyBpdCBmcm9tIHRoZSBqdXN0aWZpZWQgZ2FsbGVyeSBIVE1MIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIG5vcmV3aW5kIGlmIG5vcmV3aW5kIG9ubHkgdGhlIG5ldyBlbnRyaWVzIHdpbGwgYmUgY2hhbmdlZCAoaS5lLiByYW5kb21pemVkLCBzb3J0ZWQgb3IgZmlsdGVyZWQpXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHNvbWUgZW50cmllcyBoYXMgYmVlbiBmb3VuZGVkXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS51cGRhdGVFbnRyaWVzID0gZnVuY3Rpb24gKG5vcmV3aW5kKSB7XG4gICAgdmFyIG5ld0VudHJpZXM7XG4gIFxuICAgIGlmIChub3Jld2luZCAmJiB0aGlzLmxhc3RGZXRjaGVkRW50cnkgIT0gbnVsbCkge1xuICAgICAgdmFyIHNlbGVjdG9yID0gdGhpcy5nZXRTZWxlY3RvcldpdGhvdXRTcGlubmVyKCk7XG4gICAgICBuZXdFbnRyaWVzID0gJCh0aGlzLmxhc3RGZXRjaGVkRW50cnkpLm5leHRBbGwoc2VsZWN0b3IpLnRvQXJyYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzID0gW107XG4gICAgICBuZXdFbnRyaWVzID0gdGhpcy5nZXRBbGxFbnRyaWVzKCk7XG4gICAgfVxuICBcbiAgICBpZiAobmV3RW50cmllcy5sZW5ndGggPiAwKSB7XG4gIFxuICAgICAgLy8gU29ydCBvciByYW5kb21pemVcbiAgICAgIGlmICgkLmlzRnVuY3Rpb24odGhpcy5zZXR0aW5ncy5zb3J0KSkge1xuICAgICAgICBuZXdFbnRyaWVzID0gdGhpcy5zb3J0QXJyYXkobmV3RW50cmllcyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MucmFuZG9taXplKSB7XG4gICAgICAgIG5ld0VudHJpZXMgPSB0aGlzLnNodWZmbGVBcnJheShuZXdFbnRyaWVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGFzdEZldGNoZWRFbnRyeSA9IG5ld0VudHJpZXNbbmV3RW50cmllcy5sZW5ndGggLSAxXTtcbiAgXG4gICAgICAvLyBGaWx0ZXJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmZpbHRlcikge1xuICAgICAgICBuZXdFbnRyaWVzID0gdGhpcy5maWx0ZXJBcnJheShuZXdFbnRyaWVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVzZXRGaWx0ZXJzKG5ld0VudHJpZXMpO1xuICAgICAgfVxuICBcbiAgICB9XG4gIFxuICAgIHRoaXMuZW50cmllcyA9IHRoaXMuZW50cmllcy5jb25jYXQobmV3RW50cmllcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIFxuICAvKipcbiAgICogQXBwbHkgdGhlIGVudHJpZXMgb3JkZXIgdG8gdGhlIERPTSwgaXRlcmF0aW5nIHRoZSBlbnRyaWVzIGFuZCBhcHBlbmRpbmcgdGhlIGltYWdlc1xuICAgKlxuICAgKiBAcGFyYW0gZW50cmllcyB0aGUgZW50cmllcyB0aGF0IGhhcyBiZWVuIG1vZGlmaWVkIGFuZCB0aGF0IG11c3QgYmUgcmUtb3JkZXJlZCBpbiB0aGUgRE9NXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5pbnNlcnRUb0dhbGxlcnkgPSBmdW5jdGlvbiAoZW50cmllcykge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmVhY2goZW50cmllcywgZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5hcHBlbmRUbyh0aGF0LiRnYWxsZXJ5KTtcbiAgICB9KTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBTaHVmZmxlIHRoZSBhcnJheSB1c2luZyB0aGUgRmlzaGVyLVlhdGVzIHNodWZmbGUgYWxnb3JpdGhtXG4gICAqXG4gICAqIEBwYXJhbSBhIHRoZSBhcnJheSB0byBzaHVmZmxlXG4gICAqIEByZXR1cm4gdGhlIHNodWZmbGVkIGFycmF5XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zaHVmZmxlQXJyYXkgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBpLCBqLCB0ZW1wO1xuICAgIGZvciAoaSA9IGEubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgdGVtcCA9IGFbaV07XG4gICAgICBhW2ldID0gYVtqXTtcbiAgICAgIGFbal0gPSB0ZW1wO1xuICAgIH1cbiAgICB0aGlzLmluc2VydFRvR2FsbGVyeShhKTtcbiAgICByZXR1cm4gYTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBTb3J0IHRoZSBhcnJheSB1c2luZyBzZXR0aW5ncy5jb21wYXJhdG9yIGFzIGNvbXBhcmF0b3JcbiAgICpcbiAgICogQHBhcmFtIGEgdGhlIGFycmF5IHRvIHNvcnQgKGl0IGlzIHNvcnRlZClcbiAgICogQHJldHVybiB0aGUgc29ydGVkIGFycmF5XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zb3J0QXJyYXkgPSBmdW5jdGlvbiAoYSkge1xuICAgIGEuc29ydCh0aGlzLnNldHRpbmdzLnNvcnQpO1xuICAgIHRoaXMuaW5zZXJ0VG9HYWxsZXJ5KGEpO1xuICAgIHJldHVybiBhO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBmaWx0ZXJzIHJlbW92aW5nIHRoZSAnamctZmlsdGVyZWQnIGNsYXNzIGZyb20gYWxsIHRoZSBlbnRyaWVzXG4gICAqXG4gICAqIEBwYXJhbSBhIHRoZSBhcnJheSB0byByZXNldFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucmVzZXRGaWx0ZXJzID0gZnVuY3Rpb24gKGEpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspICQoYVtpXSkucmVtb3ZlQ2xhc3MoJ2pnLWZpbHRlcmVkJyk7XG4gIH07XG4gIFxuICAvKipcbiAgICogRmlsdGVyIHRoZSBlbnRyaWVzIGNvbnNpZGVyaW5nIHRoZWlycyBjbGFzc2VzIChpZiBhIHN0cmluZyBoYXMgYmVlbiBwYXNzZWQpIG9yIHVzaW5nIGEgZnVuY3Rpb24gZm9yIGZpbHRlcmluZy5cbiAgICpcbiAgICogQHBhcmFtIGEgdGhlIGFycmF5IHRvIGZpbHRlclxuICAgKiBAcmV0dXJuIHRoZSBmaWx0ZXJlZCBhcnJheVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZmlsdGVyQXJyYXkgPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XG4gICAgaWYgKCQudHlwZShzZXR0aW5ncy5maWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gRmlsdGVyIG9ubHkga2VlcGluZyB0aGUgZW50cmllcyBwYXNzZWQgaW4gdGhlIHN0cmluZ1xuICAgICAgcmV0dXJuIGEuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgICAgIGlmICgkZWwuaXMoc2V0dGluZ3MuZmlsdGVyKSkge1xuICAgICAgICAgICRlbC5yZW1vdmVDbGFzcygnamctZmlsdGVyZWQnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2pnLWZpbHRlcmVkJykucmVtb3ZlQ2xhc3MoJ2pnLXZpc2libGUnKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoJC5pc0Z1bmN0aW9uKHNldHRpbmdzLmZpbHRlcikpIHtcbiAgICAgIC8vIEZpbHRlciB1c2luZyB0aGUgcGFzc2VkIGZ1bmN0aW9uXG4gICAgICB2YXIgZmlsdGVyZWRBcnIgPSBhLmZpbHRlcihzZXR0aW5ncy5maWx0ZXIpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmaWx0ZXJlZEFyci5pbmRleE9mKGFbaV0pID09PSAtMSkge1xuICAgICAgICAgICQoYVtpXSkuYWRkQ2xhc3MoJ2pnLWZpbHRlcmVkJykucmVtb3ZlQ2xhc3MoJ2pnLXZpc2libGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKGFbaV0pLnJlbW92ZUNsYXNzKCdqZy1maWx0ZXJlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsdGVyZWRBcnI7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIFJldmVydCB0aGUgaW1hZ2Ugc3JjIHRvIHRoZSBkZWZhdWx0IHZhbHVlLlxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucmVzZXRJbWdTcmMgPSBmdW5jdGlvbiAoJGltZykge1xuICAgIGlmICgkaW1nLmRhdGEoJ2pnLm9yaWdpbmFsU3JjTG9jJykgPT09ICdzcmMnKSB7XG4gICAgICAkaW1nLmF0dHIoJ3NyYycsICRpbWcuZGF0YSgnamcub3JpZ2luYWxTcmMnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRpbWcuYXR0cignc3JjJywgJycpO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBKdXN0aWZpZWQgR2FsbGVyeSBpbnN0YW5jZS5cbiAgICpcbiAgICogSXQgY2xlYXJzIGFsbCB0aGUgY3NzIHByb3BlcnRpZXMgYWRkZWQgaW4gdGhlIHN0eWxlIGF0dHJpYnV0ZXMuIFdlIGRvZXNuJ3QgYmFja3VwIHRoZSBvcmlnaW5hbFxuICAgKiB2YWx1ZXMgZm9yIHRob3NlIGNzcyBhdHRyaWJ1dGVzLCBiZWNhdXNlIGl0IGNvc3RzIChwZXJmb3JtYW5jZSkgYW5kIGJlY2F1c2UgaW4gZ2VuZXJhbCBvbmVcbiAgICogc2hvdWxkbid0IHVzZSB0aGUgc3R5bGUgYXR0cmlidXRlIGZvciBhbiB1bmlmb3JtIHNldCBvZiBpbWFnZXMgKHdoZXJlIHdlIHN1cHBvc2UgdGhlIHVzZSBvZlxuICAgKiBjbGFzc2VzKS4gQ3JlYXRpbmcgYSBiYWNrdXAgaXMgYWxzbyBkaWZmaWN1bHQgYmVjYXVzZSBKRyBjb3VsZCBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMgYW5kXG4gICAqIHdpdGggZGlmZmVyZW50IHN0eWxlIGF0dHJpYnV0ZXMuXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja1dpZHRoSW50ZXJ2YWxJZCk7XG4gICAgdGhpcy5zdG9wSW1nQW5hbHl6ZXJTdGFydGVyKCk7XG4gIFxuICAgIC8vIEdldCBmcmVzaCBlbnRyaWVzIGxpc3Qgc2luY2UgZmlsdGVyZWQgZW50cmllcyBhcmUgYWJzZW50IGluIGB0aGlzLmVudHJpZXNgXG4gICAgJC5lYWNoKHRoaXMuZ2V0QWxsRW50cmllcygpLCAkLnByb3h5KGZ1bmN0aW9uIChfLCBlbnRyeSkge1xuICAgICAgdmFyICRlbnRyeSA9ICQoZW50cnkpO1xuICBcbiAgICAgIC8vIFJlc2V0IGVudHJ5IHN0eWxlXG4gICAgICAkZW50cnkuY3NzKCd3aWR0aCcsICcnKTtcbiAgICAgICRlbnRyeS5jc3MoJ2hlaWdodCcsICcnKTtcbiAgICAgICRlbnRyeS5jc3MoJ3RvcCcsICcnKTtcbiAgICAgICRlbnRyeS5jc3MoJ2xlZnQnLCAnJyk7XG4gICAgICAkZW50cnkuZGF0YSgnamcubG9hZGVkJywgdW5kZWZpbmVkKTtcbiAgICAgICRlbnRyeS5yZW1vdmVDbGFzcygnamctZW50cnkgamctZmlsdGVyZWQgamctZW50cnktdmlzaWJsZScpO1xuICBcbiAgICAgIC8vIFJlc2V0IGltYWdlIHN0eWxlXG4gICAgICB2YXIgJGltZyA9IHRoaXMuaW1nRnJvbUVudHJ5KCRlbnRyeSk7XG4gICAgICBpZiAoJGltZykge1xuICAgICAgICAkaW1nLmNzcygnd2lkdGgnLCAnJyk7XG4gICAgICAgICRpbWcuY3NzKCdoZWlnaHQnLCAnJyk7XG4gICAgICAgICRpbWcuY3NzKCdtYXJnaW4tbGVmdCcsICcnKTtcbiAgICAgICAgJGltZy5jc3MoJ21hcmdpbi10b3AnLCAnJyk7XG4gICAgICAgIHRoaXMucmVzZXRJbWdTcmMoJGltZyk7XG4gICAgICAgICRpbWcuZGF0YSgnamcub3JpZ2luYWxTcmMnLCB1bmRlZmluZWQpO1xuICAgICAgICAkaW1nLmRhdGEoJ2pnLm9yaWdpbmFsU3JjTG9jJywgdW5kZWZpbmVkKTtcbiAgICAgICAgJGltZy5kYXRhKCdqZy5zcmMnLCB1bmRlZmluZWQpO1xuICAgICAgfVxuICBcbiAgICAgIC8vIFJlbW92ZSBjYXB0aW9uXG4gICAgICB0aGlzLnJlbW92ZUNhcHRpb25FdmVudHNIYW5kbGVycygkZW50cnkpO1xuICAgICAgdmFyICRjYXB0aW9uID0gdGhpcy5jYXB0aW9uRnJvbUVudHJ5KCRlbnRyeSk7XG4gICAgICBpZiAoJGVudHJ5LmRhdGEoJ2pnLmNyZWF0ZWRDYXB0aW9uJykpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGFsc28gdGhlIGNhcHRpb24gZWxlbWVudCAoaWYgY3JlYXRlZCBieSBqZylcbiAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmNyZWF0ZWRDYXB0aW9uJywgdW5kZWZpbmVkKTtcbiAgICAgICAgaWYgKCRjYXB0aW9uICE9PSBudWxsKSAkY2FwdGlvbi5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgkY2FwdGlvbiAhPT0gbnVsbCkgJGNhcHRpb24uZmFkZVRvKDAsIDEpO1xuICAgICAgfVxuICBcbiAgICB9LCB0aGlzKSk7XG4gIFxuICAgIHRoaXMuJGdhbGxlcnkuY3NzKCdoZWlnaHQnLCAnJyk7XG4gICAgdGhpcy4kZ2FsbGVyeS5yZW1vdmVDbGFzcygnanVzdGlmaWVkLWdhbGxlcnknKTtcbiAgICB0aGlzLiRnYWxsZXJ5LmRhdGEoJ2pnLmNvbnRyb2xsZXInLCB1bmRlZmluZWQpO1xuICAgIHRoaXMuc2V0dGluZ3MudHJpZ2dlckV2ZW50LmNhbGwodGhpcywgJ2pnLmRlc3Ryb3knKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBBbmFseXplIHRoZSBpbWFnZXMgYW5kIGJ1aWxkcyB0aGUgcm93cy4gSXQgcmV0dXJucyBpZiBpdCBmb3VuZCBhbiBpbWFnZSB0aGF0IGlzIG5vdCBsb2FkZWQuXG4gICAqXG4gICAqIEBwYXJhbSBpc0ZvclJlc2l6ZSBpZiB0aGUgaW1hZ2UgYW5hbHl6ZXIgaXMgY2FsbGVkIGZvciByZXNpemluZyBvciBub3QsIHRvIGNhbGwgYSBkaWZmZXJlbnQgY2FsbGJhY2sgYXQgdGhlIGVuZFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuYW5hbHl6ZUltYWdlcyA9IGZ1bmN0aW9uIChpc0ZvclJlc2l6ZSkge1xuICAgIGZvciAodmFyIGkgPSB0aGlzLmxhc3RBbmFseXplZEluZGV4ICsgMTsgaSA8IHRoaXMuZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyICRlbnRyeSA9ICQodGhpcy5lbnRyaWVzW2ldKTtcbiAgICAgIGlmICgkZW50cnkuZGF0YSgnamcubG9hZGVkJykgPT09IHRydWUgfHwgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcpID09PSAnc2tpcHBlZCcpIHtcbiAgICAgICAgdmFyIGF2YWlsYWJsZVdpZHRoID0gdGhpcy5nYWxsZXJ5V2lkdGggLSAyICogdGhpcy5ib3JkZXIgLSAoXG4gICAgICAgICAgKHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoIC0gMSkgKiB0aGlzLnNldHRpbmdzLm1hcmdpbnMpO1xuICAgICAgICB2YXIgaW1nQXNwZWN0UmF0aW8gPSAkZW50cnkuZGF0YSgnamcud2lkdGgnKSAvICRlbnRyeS5kYXRhKCdqZy5oZWlnaHQnKTtcbiAgXG4gICAgICAgIHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYucHVzaCgkZW50cnkpO1xuICAgICAgICB0aGlzLmJ1aWxkaW5nUm93LmFzcGVjdFJhdGlvICs9IGltZ0FzcGVjdFJhdGlvO1xuICAgICAgICB0aGlzLmJ1aWxkaW5nUm93LndpZHRoICs9IGltZ0FzcGVjdFJhdGlvICogdGhpcy5zZXR0aW5ncy5yb3dIZWlnaHQ7XG4gICAgICAgIHRoaXMubGFzdEFuYWx5emVkSW5kZXggPSBpO1xuICBcbiAgICAgICAgaWYgKGF2YWlsYWJsZVdpZHRoIC8gKHRoaXMuYnVpbGRpbmdSb3cuYXNwZWN0UmF0aW8gKyBpbWdBc3BlY3RSYXRpbykgPCB0aGlzLnNldHRpbmdzLnJvd0hlaWdodCkge1xuICAgICAgICAgIHRoaXMuZmx1c2hSb3coZmFsc2UsIHRoaXMuc2V0dGluZ3MubWF4Um93c0NvdW50ID4gMCAmJiB0aGlzLnJvd3MgPT09IHRoaXMuc2V0dGluZ3MubWF4Um93c0NvdW50KTtcbiAgXG4gICAgICAgICAgaWYgKCsrdGhpcy55aWVsZC5mbHVzaGVkID49IHRoaXMueWllbGQuZXZlcnkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJbWdBbmFseXplcihpc0ZvclJlc2l6ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnKSAhPT0gJ2Vycm9yJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICBcbiAgICAvLyBMYXN0IHJvdyBmbHVzaCAodGhlIHJvdyBpcyBub3QgZnVsbClcbiAgICBpZiAodGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmZsdXNoUm93KHRydWUsIHRoaXMuc2V0dGluZ3MubWF4Um93c0NvdW50ID4gMCAmJiB0aGlzLnJvd3MgPT09IHRoaXMuc2V0dGluZ3MubWF4Um93c0NvdW50KTtcbiAgICB9XG4gIFxuICAgIGlmICh0aGlzLmlzU3Bpbm5lckFjdGl2ZSgpKSB7XG4gICAgICB0aGlzLnN0b3BMb2FkaW5nU3Bpbm5lckFuaW1hdGlvbigpO1xuICAgIH1cbiAgXG4gICAgLyogU3RvcCwgaWYgdGhlcmUgaXMsIHRoZSB0aW1lb3V0IHRvIHN0YXJ0IHRoZSBhbmFseXplSW1hZ2VzLlxuICAgICBUaGlzIGlzIGJlY2F1c2UgYW4gaW1hZ2UgY2FuIGJlIHNldCBsb2FkZWQsIGFuZCB0aGUgdGltZW91dCBjYW4gYmUgc2V0LFxuICAgICBidXQgdGhpcyBpbWFnZSBjYW4gYmUgYW5hbHl6ZWQgeWV0LlxuICAgICAqL1xuICAgIHRoaXMuc3RvcEltZ0FuYWx5emVyU3RhcnRlcigpO1xuICBcbiAgICB0aGlzLnNldEdhbGxlcnlGaW5hbEhlaWdodCh0aGlzLmdhbGxlcnlIZWlnaHRUb1NldCk7XG4gICAgXG4gICAgLy9PbiBjb21wbGV0ZSBjYWxsYmFja1xuICAgIHRoaXMuc2V0dGluZ3MudHJpZ2dlckV2ZW50LmNhbGwodGhpcywgaXNGb3JSZXNpemUgPyAnamcucmVzaXplJyA6ICdqZy5jb21wbGV0ZScpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFN0b3BzIGFueSBJbWdBbmFseXplciBzdGFydGVyICh0aGF0IGhhcyBhbiBhc3NpZ25lZCB0aW1lb3V0KVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc3RvcEltZ0FuYWx5emVyU3RhcnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnlpZWxkLmZsdXNoZWQgPSAwO1xuICAgIGlmICh0aGlzLmltZ0FuYWx5emVyVGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaW1nQW5hbHl6ZXJUaW1lb3V0KTtcbiAgICAgIHRoaXMuaW1nQW5hbHl6ZXJUaW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogU3RhcnRzIHRoZSBpbWFnZSBhbmFseXplci4gSXQgaXMgbm90IGltbWVkaWF0ZWx5IGNhbGxlZCB0byBsZXQgdGhlIGJyb3dzZXIgdG8gdXBkYXRlIHRoZSB2aWV3XG4gICAqXG4gICAqIEBwYXJhbSBpc0ZvclJlc2l6ZSBzcGVjaWZpZXMgaWYgdGhlIGltYWdlIGFuYWx5emVyIG11c3QgYmUgY2FsbGVkIGZvciByZXNpemluZyBvciBub3RcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnN0YXJ0SW1nQW5hbHl6ZXIgPSBmdW5jdGlvbiAoaXNGb3JSZXNpemUpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5zdG9wSW1nQW5hbHl6ZXJTdGFydGVyKCk7XG4gICAgdGhpcy5pbWdBbmFseXplclRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuYW5hbHl6ZUltYWdlcyhpc0ZvclJlc2l6ZSk7XG4gICAgfSwgMC4wMDEpOyAvLyB3ZSBjYW4ndCBzdGFydCBpdCBpbW1lZGlhdGVseSBkdWUgdG8gYSBJRSBkaWZmZXJlbnQgYmVoYXZpb3VyXG4gIH07XG4gIFxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBpbWFnZSBpcyBsb2FkZWQgb3Igbm90IHVzaW5nIGFub3RoZXIgaW1hZ2Ugb2JqZWN0LiBXZSBjYW5ub3QgdXNlIHRoZSAnY29tcGxldGUnIGltYWdlIHByb3BlcnR5LFxuICAgKiBiZWNhdXNlIHNvbWUgYnJvd3NlcnMsIHdpdGggYSA0MDQgc2V0IGNvbXBsZXRlID0gdHJ1ZS5cbiAgICpcbiAgICogQHBhcmFtIGltYWdlU3JjIHRoZSBpbWFnZSBzcmMgdG8gbG9hZFxuICAgKiBAcGFyYW0gb25Mb2FkIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGltYWdlIGhhcyBiZWVuIGxvYWRlZFxuICAgKiBAcGFyYW0gb25FcnJvciBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCBpbiBjYXNlIG9mIGFuIGVycm9yXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5vbkltYWdlRXZlbnQgPSBmdW5jdGlvbiAoaW1hZ2VTcmMsIG9uTG9hZCwgb25FcnJvcikge1xuICAgIGlmICghb25Mb2FkICYmICFvbkVycm9yKSByZXR1cm47XG4gIFxuICAgIHZhciBtZW1JbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIHZhciAkbWVtSW1hZ2UgPSAkKG1lbUltYWdlKTtcbiAgICBpZiAob25Mb2FkKSB7XG4gICAgICAkbWVtSW1hZ2Uub25lKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkbWVtSW1hZ2Uub2ZmKCdsb2FkIGVycm9yJyk7XG4gICAgICAgIG9uTG9hZChtZW1JbWFnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICRtZW1JbWFnZS5vbmUoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkbWVtSW1hZ2Uub2ZmKCdsb2FkIGVycm9yJyk7XG4gICAgICAgIG9uRXJyb3IobWVtSW1hZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIG1lbUltYWdlLnNyYyA9IGltYWdlU3JjO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEluaXQgb2YgSnVzdGlmaWVkIEdhbGxlcnkgY29udHJvbGxlZFxuICAgKiBJdCBhbmFseXplcyBhbGwgdGhlIGVudHJpZXMgc3RhcnRpbmcgdGhlaXJzIGxvYWRpbmcgYW5kIGNhbGxpbmcgdGhlIGltYWdlIGFuYWx5emVyICh0aGF0IHdvcmtzIHdpdGggbG9hZGVkIGltYWdlcylcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGltYWdlc1RvTG9hZCA9IGZhbHNlLCBza2lwcGVkSW1hZ2VzID0gZmFsc2UsIHRoYXQgPSB0aGlzO1xuICAgICQuZWFjaCh0aGlzLmVudHJpZXMsIGZ1bmN0aW9uIChpbmRleCwgZW50cnkpIHtcbiAgICAgIHZhciAkZW50cnkgPSAkKGVudHJ5KTtcbiAgICAgIHZhciAkaW1hZ2UgPSB0aGF0LmltZ0Zyb21FbnRyeSgkZW50cnkpO1xuICBcbiAgICAgICRlbnRyeS5hZGRDbGFzcygnamctZW50cnknKTtcbiAgXG4gICAgICBpZiAoJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcpICE9PSB0cnVlICYmICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnKSAhPT0gJ3NraXBwZWQnKSB7XG4gIFxuICAgICAgICAvLyBMaW5rIFJlbCBnbG9iYWwgb3ZlcndyaXRlXG4gICAgICAgIGlmICh0aGF0LnNldHRpbmdzLnJlbCAhPT0gbnVsbCkgJGVudHJ5LmF0dHIoJ3JlbCcsIHRoYXQuc2V0dGluZ3MucmVsKTtcbiAgXG4gICAgICAgIC8vIExpbmsgVGFyZ2V0IGdsb2JhbCBvdmVyd3JpdGVcbiAgICAgICAgaWYgKHRoYXQuc2V0dGluZ3MudGFyZ2V0ICE9PSBudWxsKSAkZW50cnkuYXR0cigndGFyZ2V0JywgdGhhdC5zZXR0aW5ncy50YXJnZXQpO1xuICBcbiAgICAgICAgaWYgKCRpbWFnZSAhPT0gbnVsbCkge1xuICBcbiAgICAgICAgICAvLyBJbWFnZSBzcmNcbiAgICAgICAgICB2YXIgaW1hZ2VTcmMgPSB0aGF0LmV4dHJhY3RJbWdTcmNGcm9tSW1hZ2UoJGltYWdlKTtcbiAgXG4gICAgICAgICAgLyogSWYgd2UgaGF2ZSB0aGUgaGVpZ2h0IGFuZCB0aGUgd2lkdGgsIHdlIGRvbid0IHdhaXQgdGhhdCB0aGUgaW1hZ2UgaXMgbG9hZGVkLCBcbiAgICAgICAgICAgICBidXQgd2Ugc3RhcnQgZGlyZWN0bHkgd2l0aCB0aGUganVzdGlmaWNhdGlvbiAqL1xuICAgICAgICAgIGlmICh0aGF0LnNldHRpbmdzLndhaXRUaHVtYm5haWxzTG9hZCA9PT0gZmFsc2UgfHwgIWltYWdlU3JjKSB7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSBwYXJzZUZsb2F0KCRpbWFnZS5hdHRyKCd3aWR0aCcpKTtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSBwYXJzZUZsb2F0KCRpbWFnZS5hdHRyKCdoZWlnaHQnKSk7XG4gICAgICAgICAgICBpZiAoJGltYWdlLnByb3AoJ3RhZ05hbWUnKSA9PT0gJ3N2ZycpIHtcbiAgICAgICAgICAgICAgd2lkdGggPSBwYXJzZUZsb2F0KCRpbWFnZVswXS5nZXRCQm94KCkud2lkdGgpO1xuICAgICAgICAgICAgICBoZWlnaHQgPSBwYXJzZUZsb2F0KCRpbWFnZVswXS5nZXRCQm94KCkuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNOYU4od2lkdGgpICYmICFpc05hTihoZWlnaHQpKSB7XG4gICAgICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy53aWR0aCcsIHdpZHRoKTtcbiAgICAgICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmhlaWdodCcsIGhlaWdodCk7XG4gICAgICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnLCAnc2tpcHBlZCcpO1xuICAgICAgICAgICAgICBza2lwcGVkSW1hZ2VzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhhdC5zdGFydEltZ0FuYWx5emVyKGZhbHNlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAkZW50cnkuZGF0YSgnamcubG9hZGVkJywgZmFsc2UpO1xuICAgICAgICAgIGltYWdlc1RvTG9hZCA9IHRydWU7XG4gIFxuICAgICAgICAgIC8vIFNwaW5uZXIgc3RhcnRcbiAgICAgICAgICBpZiAoIXRoYXQuaXNTcGlubmVyQWN0aXZlKCkpIHRoYXQuc3RhcnRMb2FkaW5nU3Bpbm5lckFuaW1hdGlvbigpO1xuICBcbiAgICAgICAgICB0aGF0Lm9uSW1hZ2VFdmVudChpbWFnZVNyYywgZnVuY3Rpb24gKGxvYWRJbWcpIHsgLy8gaW1hZ2UgbG9hZGVkXG4gICAgICAgICAgICAkZW50cnkuZGF0YSgnamcud2lkdGgnLCBsb2FkSW1nLndpZHRoKTtcbiAgICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5oZWlnaHQnLCBsb2FkSW1nLmhlaWdodCk7XG4gICAgICAgICAgICAkZW50cnkuZGF0YSgnamcubG9hZGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICB0aGF0LnN0YXJ0SW1nQW5hbHl6ZXIoZmFsc2UpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgLy8gaW1hZ2UgbG9hZCBlcnJvclxuICAgICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcsICdlcnJvcicpO1xuICAgICAgICAgICAgdGhhdC5zdGFydEltZ0FuYWx5emVyKGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcsIHRydWUpO1xuICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy53aWR0aCcsICRlbnRyeS53aWR0aCgpIHwgcGFyc2VGbG9hdCgkZW50cnkuY3NzKCd3aWR0aCcpKSB8IDEpO1xuICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5oZWlnaHQnLCAkZW50cnkuaGVpZ2h0KCkgfCBwYXJzZUZsb2F0KCRlbnRyeS5jc3MoJ2hlaWdodCcpKSB8IDEpO1xuICAgICAgICB9XG4gIFxuICAgICAgfVxuICBcbiAgICB9KTtcbiAgXG4gICAgaWYgKCFpbWFnZXNUb0xvYWQgJiYgIXNraXBwZWRJbWFnZXMpIHRoaXMuc3RhcnRJbWdBbmFseXplcihmYWxzZSk7XG4gICAgdGhpcy5jaGVja1dpZHRoKCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQ2hlY2tzIHRoYXQgaXQgaXMgYSB2YWxpZCBudW1iZXIuIElmIGEgc3RyaW5nIGlzIHBhc3NlZCBpdCBpcyBjb252ZXJ0ZWQgdG8gYSBudW1iZXJcbiAgICpcbiAgICogQHBhcmFtIHNldHRpbmdDb250YWluZXIgdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBzZXR0aW5nICh0byBhbGxvdyB0aGUgY29udmVyc2lvbilcbiAgICogQHBhcmFtIHNldHRpbmdOYW1lIHRoZSBzZXR0aW5nIG5hbWVcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmNoZWNrT3JDb252ZXJ0TnVtYmVyID0gZnVuY3Rpb24gKHNldHRpbmdDb250YWluZXIsIHNldHRpbmdOYW1lKSB7XG4gICAgaWYgKCQudHlwZShzZXR0aW5nQ29udGFpbmVyW3NldHRpbmdOYW1lXSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzZXR0aW5nQ29udGFpbmVyW3NldHRpbmdOYW1lXSA9IHBhcnNlRmxvYXQoc2V0dGluZ0NvbnRhaW5lcltzZXR0aW5nTmFtZV0pO1xuICAgIH1cbiAgXG4gICAgaWYgKCQudHlwZShzZXR0aW5nQ29udGFpbmVyW3NldHRpbmdOYW1lXSkgPT09ICdudW1iZXInKSB7XG4gICAgICBpZiAoaXNOYU4oc2V0dGluZ0NvbnRhaW5lcltzZXR0aW5nTmFtZV0pKSB0aHJvdyAnaW52YWxpZCBudW1iZXIgZm9yICcgKyBzZXR0aW5nTmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgc2V0dGluZ05hbWUgKyAnIG11c3QgYmUgYSBudW1iZXInO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIHNpemVSYW5nZVN1ZmZpeGVzIGFuZCwgaWYgbmVjZXNzYXJ5LCBjb252ZXJ0c1xuICAgKiBpdHMga2V5cyBmcm9tIHN0cmluZyAoZS5nLiBvbGQgc2V0dGluZ3Mgd2l0aCAnbHQxMDAnKSB0byBpbnQuXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5jaGVja1NpemVSYW5nZXNTdWZmaXhlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJC50eXBlKHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXMpICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgJ3NpemVSYW5nZVN1ZmZpeGVzIG11c3QgYmUgZGVmaW5lZCBhbmQgbXVzdCBiZSBhbiBvYmplY3QnO1xuICAgIH1cbiAgXG4gICAgdmFyIHN1ZmZpeFJhbmdlcyA9IFtdO1xuICAgIGZvciAodmFyIHJhbmdlSWR4IGluIHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXMpIHtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzLmhhc093blByb3BlcnR5KHJhbmdlSWR4KSkgc3VmZml4UmFuZ2VzLnB1c2gocmFuZ2VJZHgpO1xuICAgIH1cbiAgXG4gICAgdmFyIG5ld1NpemVSbmdTdWZmaXhlcyA9IHsgMDogJycgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1ZmZpeFJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCQudHlwZShzdWZmaXhSYW5nZXNbaV0pID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBudW1JZHggPSBwYXJzZUludChzdWZmaXhSYW5nZXNbaV0ucmVwbGFjZSgvXlthLXpdKy8sICcnKSwgMTApO1xuICAgICAgICAgIG5ld1NpemVSbmdTdWZmaXhlc1tudW1JZHhdID0gdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlc1tzdWZmaXhSYW5nZXNbaV1dO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhyb3cgJ3NpemVSYW5nZVN1ZmZpeGVzIGtleXMgbXVzdCBjb250YWlucyBjb3JyZWN0IG51bWJlcnMgKCcgKyBlICsgJyknO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdTaXplUm5nU3VmZml4ZXNbc3VmZml4UmFuZ2VzW2ldXSA9IHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXNbc3VmZml4UmFuZ2VzW2ldXTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXMgPSBuZXdTaXplUm5nU3VmZml4ZXM7XG4gIH07XG4gIFxuICAvKipcbiAgICogY2hlY2sgYW5kIGNvbnZlcnQgdGhlIG1heFJvd0hlaWdodCBzZXR0aW5nXG4gICAqIHJlcXVpcmVzIHJvd0hlaWdodCB0byBiZSBhbHJlYWR5IHNldFxuICAgKiBUT0RPOiBzaG91bGQgYmUgYWx3YXlzIGNhbGxlZCB3aGVuIG9ubHkgcm93SGVpZ2h0IGlzIGNoYW5nZWRcbiAgICogQHJldHVybiBudW1iZXIgb3IgbnVsbFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucmV0cmlldmVNYXhSb3dIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5ld01heFJvd0hlaWdodCA9IG51bGw7XG4gICAgdmFyIHJvd0hlaWdodCA9IHRoaXMuc2V0dGluZ3Mucm93SGVpZ2h0O1xuICBcbiAgICBpZiAoJC50eXBlKHRoaXMuc2V0dGluZ3MubWF4Um93SGVpZ2h0KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1heFJvd0hlaWdodC5tYXRjaCgvXlswLTldKyUkLykpIHtcbiAgICAgICAgbmV3TWF4Um93SGVpZ2h0ID0gcm93SGVpZ2h0ICogcGFyc2VGbG9hdCh0aGlzLnNldHRpbmdzLm1heFJvd0hlaWdodC5tYXRjaCgvXihbMC05XSspJSQvKVsxXSkgLyAxMDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdNYXhSb3dIZWlnaHQgPSBwYXJzZUZsb2F0KHRoaXMuc2V0dGluZ3MubWF4Um93SGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCQudHlwZSh0aGlzLnNldHRpbmdzLm1heFJvd0hlaWdodCkgPT09ICdudW1iZXInKSB7XG4gICAgICBuZXdNYXhSb3dIZWlnaHQgPSB0aGlzLnNldHRpbmdzLm1heFJvd0hlaWdodDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MubWF4Um93SGVpZ2h0ID09PSBmYWxzZSB8fCB0aGlzLnNldHRpbmdzLm1heFJvd0hlaWdodCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgJ21heFJvd0hlaWdodCBtdXN0IGJlIGEgbnVtYmVyIG9yIGEgcGVyY2VudGFnZSc7XG4gICAgfVxuICBcbiAgICAvLyBjaGVjayBpZiB0aGUgY29udmVydGVkIHZhbHVlIGlzIG5vdCBhIG51bWJlclxuICAgIGlmIChpc05hTihuZXdNYXhSb3dIZWlnaHQpKSB0aHJvdyAnaW52YWxpZCBudW1iZXIgZm9yIG1heFJvd0hlaWdodCc7XG4gIFxuICAgIC8vIGNoZWNrIHZhbHVlcywgbWF4Um93SGVpZ2h0IG11c3QgYmUgPj0gcm93SGVpZ2h0XG4gICAgaWYgKG5ld01heFJvd0hlaWdodCA8IHJvd0hlaWdodCkgbmV3TWF4Um93SGVpZ2h0ID0gcm93SGVpZ2h0O1xuICBcbiAgICByZXR1cm4gbmV3TWF4Um93SGVpZ2h0O1xuICB9O1xuICBcbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgc2V0dGluZ3NcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmNoZWNrU2V0dGluZ3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jaGVja1NpemVSYW5nZXNTdWZmaXhlcygpO1xuICBcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MsICdyb3dIZWlnaHQnKTtcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MsICdtYXJnaW5zJyk7XG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLCAnYm9yZGVyJyk7XG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLCAnbWF4Um93c0NvdW50Jyk7XG4gIFxuICAgIHZhciBsYXN0Um93TW9kZXMgPSBbXG4gICAgICAnanVzdGlmeScsXG4gICAgICAnbm9qdXN0aWZ5JyxcbiAgICAgICdsZWZ0JyxcbiAgICAgICdjZW50ZXInLFxuICAgICAgJ3JpZ2h0JyxcbiAgICAgICdoaWRlJ1xuICAgIF07XG4gICAgaWYgKGxhc3RSb3dNb2Rlcy5pbmRleE9mKHRoaXMuc2V0dGluZ3MubGFzdFJvdykgPT09IC0xKSB7XG4gICAgICB0aHJvdyAnbGFzdFJvdyBtdXN0IGJlIG9uZSBvZjogJyArIGxhc3RSb3dNb2Rlcy5qb2luKCcsICcpO1xuICAgIH1cbiAgXG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLCAnanVzdGlmeVRocmVzaG9sZCcpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmp1c3RpZnlUaHJlc2hvbGQgPCAwIHx8IHRoaXMuc2V0dGluZ3MuanVzdGlmeVRocmVzaG9sZCA+IDEpIHtcbiAgICAgIHRocm93ICdqdXN0aWZ5VGhyZXNob2xkIG11c3QgYmUgaW4gdGhlIGludGVydmFsIFswLDFdJztcbiAgICB9XG4gICAgaWYgKCQudHlwZSh0aGlzLnNldHRpbmdzLmNzc0FuaW1hdGlvbikgIT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgJ2Nzc0FuaW1hdGlvbiBtdXN0IGJlIGEgYm9vbGVhbic7XG4gICAgfVxuICBcbiAgICBpZiAoJC50eXBlKHRoaXMuc2V0dGluZ3MuY2FwdGlvbnMpICE9PSAnYm9vbGVhbicpIHRocm93ICdjYXB0aW9ucyBtdXN0IGJlIGEgYm9vbGVhbic7XG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncywgJ2FuaW1hdGlvbkR1cmF0aW9uJyk7XG4gIFxuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3MsICd2aXNpYmxlT3BhY2l0eScpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy52aXNpYmxlT3BhY2l0eSA8IDAgfHxcbiAgICAgIHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLnZpc2libGVPcGFjaXR5ID4gMSkge1xuICAgICAgdGhyb3cgJ2NhcHRpb25TZXR0aW5ncy52aXNpYmxlT3BhY2l0eSBtdXN0IGJlIGluIHRoZSBpbnRlcnZhbCBbMCwgMV0nO1xuICAgIH1cbiAgXG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncywgJ25vblZpc2libGVPcGFjaXR5Jyk7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLm5vblZpc2libGVPcGFjaXR5IDwgMCB8fFxuICAgICAgdGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3Mubm9uVmlzaWJsZU9wYWNpdHkgPiAxKSB7XG4gICAgICB0aHJvdyAnY2FwdGlvblNldHRpbmdzLm5vblZpc2libGVPcGFjaXR5IG11c3QgYmUgaW4gdGhlIGludGVydmFsIFswLCAxXSc7XG4gICAgfVxuICBcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MsICdpbWFnZXNBbmltYXRpb25EdXJhdGlvbicpO1xuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncywgJ3JlZnJlc2hUaW1lJyk7XG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLCAncmVmcmVzaFNlbnNpdGl2aXR5Jyk7XG4gICAgaWYgKCQudHlwZSh0aGlzLnNldHRpbmdzLnJhbmRvbWl6ZSkgIT09ICdib29sZWFuJykgdGhyb3cgJ3JhbmRvbWl6ZSBtdXN0IGJlIGEgYm9vbGVhbic7XG4gICAgaWYgKCQudHlwZSh0aGlzLnNldHRpbmdzLnNlbGVjdG9yKSAhPT0gJ3N0cmluZycpIHRocm93ICdzZWxlY3RvciBtdXN0IGJlIGEgc3RyaW5nJztcbiAgXG4gICAgaWYgKHRoaXMuc2V0dGluZ3Muc29ydCAhPT0gZmFsc2UgJiYgISQuaXNGdW5jdGlvbih0aGlzLnNldHRpbmdzLnNvcnQpKSB7XG4gICAgICB0aHJvdyAnc29ydCBtdXN0IGJlIGZhbHNlIG9yIGEgY29tcGFyaXNvbiBmdW5jdGlvbic7XG4gICAgfVxuICBcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5maWx0ZXIgIT09IGZhbHNlICYmICEkLmlzRnVuY3Rpb24odGhpcy5zZXR0aW5ncy5maWx0ZXIpICYmXG4gICAgICAkLnR5cGUodGhpcy5zZXR0aW5ncy5maWx0ZXIpICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgJ2ZpbHRlciBtdXN0IGJlIGZhbHNlLCBhIHN0cmluZyBvciBhIGZpbHRlciBmdW5jdGlvbic7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIEl0IGJyaW5ncyBhbGwgdGhlIGluZGV4ZXMgZnJvbSB0aGUgc2l6ZVJhbmdlU3VmZml4ZXMgYW5kIGl0IG9yZGVycyB0aGVtLiBUaGV5IGFyZSB0aGVuIHNvcnRlZCBhbmQgcmV0dXJuZWQuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gc29ydGVkIHN1ZmZpeCByYW5nZXNcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnJldHJpZXZlU3VmZml4UmFuZ2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdWZmaXhSYW5nZXMgPSBbXTtcbiAgICBmb3IgKHZhciByYW5nZUlkeCBpbiB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzKSB7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlcy5oYXNPd25Qcm9wZXJ0eShyYW5nZUlkeCkpIHN1ZmZpeFJhbmdlcy5wdXNoKHBhcnNlSW50KHJhbmdlSWR4LCAxMCkpO1xuICAgIH1cbiAgICBzdWZmaXhSYW5nZXMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSA+IGIgPyAxIDogYSA8IGIgPyAtMSA6IDA7IH0pO1xuICAgIHJldHVybiBzdWZmaXhSYW5nZXM7XG4gIH07XG4gIFxuICAvKipcbiAgICogVXBkYXRlIHRoZSBleGlzdGluZyBzZXR0aW5ncyBvbmx5IGNoYW5naW5nIHNvbWUgb2YgdGhlbVxuICAgKlxuICAgKiBAcGFyYW0gbmV3U2V0dGluZ3MgdGhlIG5ldyBzZXR0aW5ncyAob3IgYSBzdWJncm91cCBvZiB0aGVtKVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUudXBkYXRlU2V0dGluZ3MgPSBmdW5jdGlvbiAobmV3U2V0dGluZ3MpIHtcbiAgICAvLyBJbiB0aGlzIGNhc2UgSnVzdGlmaWVkIEdhbGxlcnkgaGFzIGJlZW4gY2FsbGVkIGFnYWluIGNoYW5naW5nIG9ubHkgc29tZSBvcHRpb25zXG4gICAgdGhpcy5zZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCB0aGlzLnNldHRpbmdzLCBuZXdTZXR0aW5ncyk7XG4gICAgdGhpcy5jaGVja1NldHRpbmdzKCk7XG4gIFxuICAgIC8vIEFzIHJlcG9ydGVkIGluIHRoZSBzZXR0aW5nczogbmVnYXRpdmUgdmFsdWUgPSBzYW1lIGFzIG1hcmdpbnMsIDAgPSBkaXNhYmxlZFxuICAgIHRoaXMuYm9yZGVyID0gdGhpcy5zZXR0aW5ncy5ib3JkZXIgPj0gMCA/IHRoaXMuc2V0dGluZ3MuYm9yZGVyIDogdGhpcy5zZXR0aW5ncy5tYXJnaW5zO1xuICBcbiAgICB0aGlzLm1heFJvd0hlaWdodCA9IHRoaXMucmV0cmlldmVNYXhSb3dIZWlnaHQoKTtcbiAgICB0aGlzLnN1ZmZpeFJhbmdlcyA9IHRoaXMucmV0cmlldmVTdWZmaXhSYW5nZXMoKTtcbiAgfTtcbiAgXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmRlZmF1bHRzID0ge1xuICAgIHNpemVSYW5nZVN1ZmZpeGVzOiB7fSwgLyogZS5nLiBGbGlja3IgY29uZmlndXJhdGlvblxuICAgICAgICB7XG4gICAgICAgICAgMTAwOiAnX3QnLCAgLy8gdXNlZCB3aGVuIGxvbmdlc3QgaXMgbGVzcyB0aGFuIDEwMHB4XG4gICAgICAgICAgMjQwOiAnX20nLCAgLy8gdXNlZCB3aGVuIGxvbmdlc3QgaXMgYmV0d2VlbiAxMDFweCBhbmQgMjQwcHhcbiAgICAgICAgICAzMjA6ICdfbicsICAvLyAuLi5cbiAgICAgICAgICA1MDA6ICcnLFxuICAgICAgICAgIDY0MDogJ196JyxcbiAgICAgICAgICAxMDI0OiAnX2InICAvLyB1c2VkIGFzIGVsc2UgY2FzZSBiZWNhdXNlIGl0IGlzIHRoZSBsYXN0XG4gICAgICAgIH1cbiAgICAqL1xuICAgIHRodW1ibmFpbFBhdGg6IHVuZGVmaW5lZCwgLyogSWYgZGVmaW5lZCwgc2l6ZVJhbmdlU3VmZml4ZXMgaXMgbm90IHVzZWQsIGFuZCB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZVxuICAgIHBhdGggcmVsYXRpdmUgdG8gYSBzcGVjaWZpYyB0aHVtYm5haWwgc2l6ZS4gVGhlIGZ1bmN0aW9uIHNob3VsZCBhY2NlcHQgcmVzcGVjdGl2ZWx5IHRocmVlIGFyZ3VtZW50czpcbiAgICBjdXJyZW50IHBhdGgsIHdpZHRoIGFuZCBoZWlnaHQgKi9cbiAgICByb3dIZWlnaHQ6IDEyMCwgLy8gcmVxdWlyZWQ/IHJlcXVpcmVkIHRvIGJlID4gMD9cbiAgICBtYXhSb3dIZWlnaHQ6IGZhbHNlLCAvLyBmYWxzZSBvciBuZWdhdGl2ZSB2YWx1ZSB0byBkZWFjdGl2YXRlLiBQb3NpdGl2ZSBudW1iZXIgdG8gZXhwcmVzcyB0aGUgdmFsdWUgaW4gcGl4ZWxzLFxuICAgIC8vIEEgc3RyaW5nICdbMC05XSslJyB0byBleHByZXNzIGluIHBlcmNlbnRhZ2UgKGUuZy4gMzAwJSBtZWFucyB0aGF0IHRoZSByb3cgaGVpZ2h0XG4gICAgLy8gY2FuJ3QgZXhjZWVkIDMgKiByb3dIZWlnaHQpXG4gICAgbWF4Um93c0NvdW50OiAwLCAvLyBtYXhpbXVtIG51bWJlciBvZiByb3dzIHRvIGJlIGRpc3BsYXllZCAoMCA9IGRpc2FibGVkKVxuICAgIG1hcmdpbnM6IDEsXG4gICAgYm9yZGVyOiAtMSwgLy8gbmVnYXRpdmUgdmFsdWUgPSBzYW1lIGFzIG1hcmdpbnMsIDAgPSBkaXNhYmxlZCwgYW55IG90aGVyIHZhbHVlIHRvIHNldCB0aGUgYm9yZGVyXG4gIFxuICAgIGxhc3RSb3c6ICdub2p1c3RpZnknLCAvLyDigKYgd2hpY2ggaXMgdGhlIHNhbWUgYXMgJ2xlZnQnLCBvciBjYW4gYmUgJ2p1c3RpZnknLCAnY2VudGVyJywgJ3JpZ2h0JyBvciAnaGlkZSdcbiAgXG4gICAganVzdGlmeVRocmVzaG9sZDogMC45MCwgLyogaWYgcm93IHdpZHRoIC8gYXZhaWxhYmxlIHNwYWNlID4gMC45MCBpdCB3aWxsIGJlIGFsd2F5cyBqdXN0aWZpZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAoaS5lLiBsYXN0Um93IHNldHRpbmcgaXMgbm90IGNvbnNpZGVyZWQpICovXG4gICAgd2FpdFRodW1ibmFpbHNMb2FkOiB0cnVlLFxuICAgIGNhcHRpb25zOiB0cnVlLFxuICAgIGNzc0FuaW1hdGlvbjogdHJ1ZSxcbiAgICBpbWFnZXNBbmltYXRpb25EdXJhdGlvbjogNTAwLCAvLyBpZ25vcmVkIHdpdGggY3NzIGFuaW1hdGlvbnNcbiAgICBjYXB0aW9uU2V0dGluZ3M6IHsgLy8gaWdub3JlZCB3aXRoIGNzcyBhbmltYXRpb25zXG4gICAgICBhbmltYXRpb25EdXJhdGlvbjogNTAwLFxuICAgICAgdmlzaWJsZU9wYWNpdHk6IDAuNyxcbiAgICAgIG5vblZpc2libGVPcGFjaXR5OiAwLjBcbiAgICB9LFxuICAgIHJlbDogbnVsbCwgLy8gcmV3cml0ZSB0aGUgcmVsIG9mIGVhY2ggYW5hbHl6ZWQgbGlua3NcbiAgICB0YXJnZXQ6IG51bGwsIC8vIHJld3JpdGUgdGhlIHRhcmdldCBvZiBhbGwgbGlua3NcbiAgICBleHRlbnNpb246IC9cXC5bXi5cXFxcL10rJC8sIC8vIHJlZ2V4cCB0byBjYXB0dXJlIHRoZSBleHRlbnNpb24gb2YgYW4gaW1hZ2VcbiAgICByZWZyZXNoVGltZTogMjAwLCAvLyB0aW1lIGludGVydmFsIChpbiBtcykgdG8gY2hlY2sgaWYgdGhlIHBhZ2UgY2hhbmdlcyBpdHMgd2lkdGhcbiAgICByZWZyZXNoU2Vuc2l0aXZpdHk6IDAsIC8vIGNoYW5nZSBpbiB3aWR0aCBhbGxvd2VkIChpbiBweCkgd2l0aG91dCByZS1idWlsZGluZyB0aGUgZ2FsbGVyeVxuICAgIHJhbmRvbWl6ZTogZmFsc2UsXG4gICAgcnRsOiBmYWxzZSwgLy8gcmlnaHQtdG8tbGVmdCBtb2RlXG4gICAgc29ydDogZmFsc2UsIC8qXG4gICAgICAtIGZhbHNlOiB0byBkbyBub3Qgc29ydFxuICAgICAgLSBmdW5jdGlvbjogdG8gc29ydCB0aGVtIHVzaW5nIHRoZSBmdW5jdGlvbiBhcyBjb21wYXJhdG9yIChzZWUgQXJyYXkucHJvdG90eXBlLnNvcnQoKSlcbiAgICAqL1xuICAgIGZpbHRlcjogZmFsc2UsIC8qXG4gICAgICAtIGZhbHNlLCBudWxsIG9yIHVuZGVmaW5lZDogZm9yIGEgZGlzYWJsZWQgZmlsdGVyXG4gICAgICAtIGEgc3RyaW5nOiBhbiBlbnRyeSBpcyBrZXB0IGlmIGVudHJ5LmlzKGZpbHRlciBzdHJpbmcpIHJldHVybnMgdHJ1ZVxuICAgICAgICAgICAgICAgICAgc2VlIGpRdWVyeSdzIC5pcygpIGZ1bmN0aW9uIGZvciBmdXJ0aGVyIGluZm9ybWF0aW9uXG4gICAgICAtIGEgZnVuY3Rpb246IGludm9rZWQgd2l0aCBhcmd1bWVudHMgKGVudHJ5LCBpbmRleCwgYXJyYXkpLiBSZXR1cm4gdHJ1ZSB0byBrZWVwIHRoZSBlbnRyeSwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICAgICAgICBJdCBmb2xsb3dzIHRoZSBzcGVjaWZpY2F0aW9ucyBvZiB0aGUgQXJyYXkucHJvdG90eXBlLmZpbHRlcigpIGZ1bmN0aW9uIG9mIEphdmFTY3JpcHQuXG4gICAgKi9cbiAgICBzZWxlY3RvcjogJ2EnLCAvLyBUaGUgc2VsZWN0b3IgdGhhdCBpcyB1c2VkIHRvIGtub3cgd2hhdCBhcmUgdGhlIGVudHJpZXMgb2YgdGhlIGdhbGxlcnlcbiAgICBpbWdTZWxlY3RvcjogJz4gaW1nLCA+IGEgPiBpbWcsID4gc3ZnLCA+IGEgPiBzdmcnLCAvLyBUaGUgc2VsZWN0b3IgdGhhdCBpcyB1c2VkIHRvIGtub3cgd2hhdCBhcmUgdGhlIGltYWdlcyBvZiBlYWNoIGVudHJ5XG4gICAgdHJpZ2dlckV2ZW50OiBmdW5jdGlvbiAoZXZlbnQpIHsgLy8gVGhpcyBpcyBjYWxsZWQgdG8gdHJpZ2dlciBldmVudHMsIHRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIGNhbGwgJC50cmlnZ2VyXG4gICAgICB0aGlzLiRnYWxsZXJ5LnRyaWdnZXIoZXZlbnQpOyAgLy8gQ29uc2lkZXIgdGhhdCAndGhpcycgaXMgdGhpcyBzZXQgdG8gdGhlIEp1c3RpZmllZEdhbGxlcnkgb2JqZWN0LCBzbyBpdCBjYW5cbiAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhY2Nlc3MgdG8gZmllbGRzIHN1Y2ggYXMgJGdhbGxlcnksIHVzZWZ1bCB0byB0cmlnZ2VyIGV2ZW50cyB3aXRoIGpRdWVyeS5cbiAgfTtcbiAgXG5cbiAgLyoqXG4gICAqIEp1c3RpZmllZCBHYWxsZXJ5IHBsdWdpbiBmb3IgalF1ZXJ5XG4gICAqXG4gICAqIEV2ZW50c1xuICAgKiAgLSBqZy5jb21wbGV0ZSA6IGNhbGxlZCB3aGVuIGFsbCB0aGUgZ2FsbGVyeSBoYXMgYmVlbiBjcmVhdGVkXG4gICAqICAtIGpnLnJlc2l6ZSA6IGNhbGxlZCB3aGVuIHRoZSBnYWxsZXJ5IGhhcyBiZWVuIHJlc2l6ZWRcbiAgICogIC0gamcucm93Zmx1c2ggOiB3aGVuIGEgbmV3IHJvdyBhcHBlYXJzXG4gICAqXG4gICAqIEBwYXJhbSBhcmcgdGhlIGFjdGlvbiAob3IgdGhlIHNldHRpbmdzKSBwYXNzZWQgd2hlbiB0aGUgcGx1Z2luIGlzIGNhbGxlZFxuICAgKiBAcmV0dXJucyB7Kn0gdGhlIG9iamVjdCBpdHNlbGZcbiAgICovXG4gICQuZm4uanVzdGlmaWVkR2FsbGVyeSA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZ2FsbGVyeSkge1xuXG4gICAgICB2YXIgJGdhbGxlcnkgPSAkKGdhbGxlcnkpO1xuICAgICAgJGdhbGxlcnkuYWRkQ2xhc3MoJ2p1c3RpZmllZC1nYWxsZXJ5Jyk7XG5cbiAgICAgIHZhciBjb250cm9sbGVyID0gJGdhbGxlcnkuZGF0YSgnamcuY29udHJvbGxlcicpO1xuICAgICAgaWYgKHR5cGVvZiBjb250cm9sbGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBDcmVhdGUgY29udHJvbGxlciBhbmQgYXNzaWduIGl0IHRvIHRoZSBvYmplY3QgZGF0YVxuICAgICAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ3VuZGVmaW5lZCcgJiYgYXJnICE9PSBudWxsICYmICQudHlwZShhcmcpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmIChhcmcgPT09ICdkZXN0cm95JykgcmV0dXJuOyAvLyBKdXN0IGEgY2FsbCB0byBhbiB1bmV4aXN0aW5nIG9iamVjdFxuICAgICAgICAgIHRocm93ICdUaGUgYXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIgPSBuZXcgSnVzdGlmaWVkR2FsbGVyeSgkZ2FsbGVyeSwgJC5leHRlbmQoe30sIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmRlZmF1bHRzLCBhcmcpKTtcbiAgICAgICAgJGdhbGxlcnkuZGF0YSgnamcuY29udHJvbGxlcicsIGNvbnRyb2xsZXIpO1xuICAgICAgfSBlbHNlIGlmIChhcmcgPT09ICdub3Jld2luZCcpIHtcbiAgICAgICAgLy8gSW4gdGhpcyBjYXNlIHdlIGRvbid0IHJld2luZDogd2UgYW5hbHl6ZSBvbmx5IHRoZSBsYXRlc3QgaW1hZ2VzIChlLmcuIHRvIGNvbXBsZXRlIHRoZSBsYXN0IHVuZmluaXNoZWQgcm93XG4gICAgICAgIC8vIC4uLiBsZWZ0IHRvIGJlIG1vcmUgcmVhZGFibGVcbiAgICAgIH0gZWxzZSBpZiAoYXJnID09PSAnZGVzdHJveScpIHtcbiAgICAgICAgY29udHJvbGxlci5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSBKdXN0aWZpZWQgR2FsbGVyeSBoYXMgYmVlbiBjYWxsZWQgYWdhaW4gY2hhbmdpbmcgb25seSBzb21lIG9wdGlvbnNcbiAgICAgICAgY29udHJvbGxlci51cGRhdGVTZXR0aW5ncyhhcmcpO1xuICAgICAgICBjb250cm9sbGVyLnJld2luZCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIGVudHJpZXMgbGlzdFxuICAgICAgaWYgKCFjb250cm9sbGVyLnVwZGF0ZUVudHJpZXMoYXJnID09PSAnbm9yZXdpbmQnKSkgcmV0dXJuO1xuXG4gICAgICAvLyBJbml0IGp1c3RpZmllZCBnYWxsZXJ5XG4gICAgICBjb250cm9sbGVyLmluaXQoKTtcblxuICAgIH0pO1xuICB9O1xuXG59KSk7XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknXHJcbmltcG9ydCAnLi9saWJzL2pxdWVyeS5qdXN0aWZpZWRHYWxsZXJ5J1xyXG4vLyBpbXBvcnQgU3dpcGVyQ29yZSwge1xyXG4vLyAgICAgTmF2aWdhdGlvbixcclxuLy8gICAgIEVmZmVjdEZhZGUsXHJcbi8vICAgICBTd2lwZXJcclxuLy8gfSBmcm9tICdzd2lwZXIvY29yZSdcclxuaW1wb3J0IFN3aXBlciBmcm9tICdzd2lwZXIvYnVuZGxlJztcclxuLy8gU3dpcGVyQ29yZS51c2UoTmF2aWdhdGlvbiwgRWZmZWN0RmFkZSlcclxuXHJcblxyXG5cclxuJChkb2N1bWVudCkub24oJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLy8gc2xpZGVyIG9uIG1vYmlsZVxyXG4gICAgY29uc29sZS5sb2cod2luZG93LmlubmVyV2lkdGggPT09IDM3NSlcclxuXHJcbiAgICBsZXQgc3dpcGVyVGFic1xyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID09PSAzNzUpIHtcclxuICAgICAgICBzd2lwZXJUYWJzID0gbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gY2VudGVySW5zdWZmaWNpZW50U2xpZGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBmcmVlTW9kZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJCgnLnN3aXBlci1zbGlkZTpudGgtY2hpbGQoMyknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHN3aXBlclRhYnMuc2xpZGVQcmV2KClcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoJy5zd2lwZXItc2xpZGUnKS5sYXN0KCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzd2lwZXJUYWJzLnNsaWRlTmV4dCgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gZ2FsbGVyeSBwaG90b3MgcmVxdWVzdFxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgLy8gR0VUIHBob3Rvc1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBKRyBpbml0XHJcblxyXG4gICAgJCgnLmNvbnRlbnQtZ2FsbGVyeScpLmp1c3RpZmllZEdhbGxlcnkoe1xyXG4gICAgICAgIHJvd0hlaWdodDogMzEwLFxyXG4gICAgICAgIG1hcmdpbnM6IDIsXHJcbiAgICAgICAgbGFzdFJvdzogJ2p1c3RpZnknLFxyXG4gICAgICAgIHJhbmRvbWl6ZTogdHJ1ZVxyXG4gICAgfSlcclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuICAgIC8vIHN0YXRpYyBvbiBkZXNrdG9wXHJcblxyXG4gICAgY29uc3QgbWFya2VyID0gJCgnLmNvbnRlbnQtdGFiLW1hcmtlcicpXHJcbiAgICBjb25zdCB0YWJzID0gJCgnLmNvbnRlbnQtbmF2LWxpbmsnKVxyXG5cclxuXHJcbiAgICBjb25zdCBpbmRpY2F0b3IgPSAodGFyZ2V0LCBzaGlmdCA9IDApID0+IHtcclxuXHJcbiAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsIHRhcmdldC5vZmZzZXRMZWZ0IC0gc2hpZnQpXHJcbiAgICAgICAgbWFya2VyLmNzcygnd2lkdGgnLCB0YXJnZXQub2Zmc2V0V2lkdGggKyA5KVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRhYnMuZWFjaChmdW5jdGlvbiAoaSkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIHRhYnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHN3aXBlclRhYnMpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGUgPSBzd2lwZXJUYWJzLnRyYW5zbGF0ZVxyXG5cclxuICAgICAgICAgICAgICAgIGluZGljYXRvcih0YXJnZXQsIDUgLSB0cmFuc2xhdGUpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpbmRpY2F0b3IodGFyZ2V0LCA1KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudHJpZ2dlcignY2xpY2snKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG4gICAgc3dpcGVyVGFicy5vbignc2V0VHJhbnNsYXRlJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHN3aXBlclRhYnMudHJhbnNsYXRlXHJcbiAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsICQoJy5hY3RpdmUnKVswXS5vZmZzZXRMZWZ0ICsgdHJhbnNsYXRlIC0gNSlcclxuICAgIH0pXHJcblxyXG59KSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG4vLyBJdCdzIGVtcHR5IGFzIHNvbWUgcnVudGltZSBtb2R1bGUgaGFuZGxlcyB0aGUgZGVmYXVsdCBiZWhhdmlvclxuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fVxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gbW9kdWxlWydkZWZhdWx0J10gOlxuXHRcdCgpID0+IG1vZHVsZTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJpbmRleFwiOiAwXG59O1xuXG52YXIgZGVmZXJyZWRNb2R1bGVzID0gW1xuXHRbXCIuL2luZGV4LmpzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19qcXVlcnlfZGlzdF9qcXVlcnlfanMtbm9kZV9tb2R1bGVzX3N3aXBlcl9zd2lwZXItYnVuZGxlX2VzbV9qc1wiXVxuXTtcbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbnZhciBjaGVja0RlZmVycmVkTW9kdWxlcyA9IHggPT4ge307XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lLCBleGVjdXRlTW9kdWxlc10gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuXHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcblx0fVxuXG5cdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3Rcblx0aWYoZXhlY3V0ZU1vZHVsZXMpIGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMpO1xuXG5cdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gPSBzZWxmW1wid2VicGFja0NodW5rXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTtcblxuZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKCkge1xuXHR2YXIgcmVzdWx0O1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuXHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG5cdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcblx0XHR9XG5cdH1cblx0aWYoZGVmZXJyZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHggPT4ge307XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cbnZhciBzdGFydHVwID0gX193ZWJwYWNrX3JlcXVpcmVfXy54O1xuX193ZWJwYWNrX3JlcXVpcmVfXy54ID0gKCkgPT4ge1xuXHQvLyByZXNldCBzdGFydHVwIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBjYWxsZWQgYWdhaW4gd2hlbiBtb3JlIHN0YXJ0dXAgY29kZSBpcyBhZGRlZFxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnggPSBzdGFydHVwIHx8ICh4ID0+IHt9KTtcblx0cmV0dXJuIChjaGVja0RlZmVycmVkTW9kdWxlcyA9IGNoZWNrRGVmZXJyZWRNb2R1bGVzSW1wbCkoKTtcbn07IiwiLy8gcnVuIHN0YXJ0dXBcbl9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==