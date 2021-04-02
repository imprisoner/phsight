(self["webpackChunk"] = self["webpackChunk"] || []).push([["js_libs_jquery_justifiedGallery_js-js_utils_js"],{

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

/***/ "./js/pagination.js":
/*!**************************!*\
  !*** ./js/pagination.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */



const Pagination = {

    code: '',

    // --------------------
    // Utility
    // --------------------

    // converting initialize data
    Extend: function (data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step === 0 ? 0 : data.step || 3;
    },

    // add pages by number (from [s] to [f])
    Add: function (s, f) {
        for (let i = s; i < f; i++) {
            Pagination.code += '<a class="pagination-page-btn">' + i + '</a>';
        }
    },

    // add last page with separator
    Last: function () {
        Pagination.code += '<i class="pagination-separator">...</i><a class="pagination-page-btn">' + Pagination.size + '</a>';
    },

    // add first page with separator
    First: function () {
        Pagination.code += '<a class="pagination-page-btn">1</a><i class="pagination-separator">...</i>';
    },



    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function () {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
    },

    // previous page
    Prev: function () {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
    },

    // next page
    Next: function () {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
    },



    // --------------------
    // Script
    // --------------------

    // binding pages
    Bind: function () {
        console.log('inside bind', Pagination.e[0])
        const a = Pagination.e[0].getElementsByClassName('pagination-page-btn');
        for (let i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'pagination-page-btn current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    // write pagination
    Finish: function () {
        console.log('code: ', Pagination.code)
        Pagination.e[0].innerHTML = ''
        // without JQuery
        // Pagination.e[0].insertAdjacentHTML('beforeend', Pagination.code)
        const html = jquery__WEBPACK_IMPORTED_MODULE_0___default()(Pagination.code).css('display', 'none')
            .fadeIn(500)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pagination-page-container').append(html);
        Pagination.code = '';
        Pagination.Bind();
    },
    // find pagination type
    Start: function () {
        if (Pagination.step === 0) {
            console.log(this.step)
            if (Pagination.page < 2) {
                Pagination.Add(1, 3)
                Pagination.Last()
            } else if (Pagination.page > Pagination.size - 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - 1, Pagination.size + 1);
            } else {
                Pagination.First();
                Pagination.Add(Pagination.page, Pagination.page + 1);
                Pagination.Last()
            }
        } else {
            if (Pagination.size < Pagination.step * 2 + 6) {
                Pagination.Add(1, Pagination.size + 1);
            } else if (Pagination.page < Pagination.step * 2 + 1) {
                Pagination.Add(1, Pagination.step * 2 + 4);
                Pagination.Last();
            } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
            } else {
                Pagination.First();
                Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                Pagination.Last();
            }
        }

        Pagination.Finish();
    },



    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function (e) {
        const nav = e[0].getElementsByTagName('a');
        console.log('inside btns', nav)
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },

    // create skeleton
    Create: function (e) {

        const html =
            `<a class="pagination-page-prev"><i class="fas fa-chevron-left"></i></a> 
            <div class="pagination-page-container"></div>
            <a class="pagination-page-next"><i class="fas fa-chevron-right"></i></a>`

        console.log('after create', e)
        e[0].insertAdjacentHTML('beforeend', html)
        Pagination.e = e[0].getElementsByClassName('pagination-page-container');
        Pagination.Buttons(e);
    },

    // init
    Init: function (e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
};

// exporting

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/* * * * * * * * * * * * * * * * *
 * Initialization
 * * * * * * * * * * * * * * * * */

/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initSlider": () => /* binding */ initSlider,
/* harmony export */   "initNavTabs": () => /* binding */ initNavTabs,
/* harmony export */   "initPagination": () => /* binding */ initPagination,
/* harmony export */   "togglePopup": () => /* binding */ togglePopup,
/* harmony export */   "expandSearch": () => /* binding */ expandSearch
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/esm/components/core/core-class.js");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./js/pagination.js");




// setting slider

function initSlider(breakpoint = 0) {
    console.log('slider init')
    let sliderInstance = window.innerWidth < breakpoint ?
        new swiper__WEBPACK_IMPORTED_MODULE_2__.default('.swiper-container', {
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            freeMode: true
        }) :
        null

    return sliderInstance
}

// setting navtabs animation

function initNavTabs(breakpoint = 0, sliderInstance) {

    const marker = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab-marker')
    const tabs = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab-link')

    function indicator(target, shift = 0) {
        if (shift >= 0) {
            marker.css('left', target.offsetLeft - shift)
        } else {
            marker.css('left', target.offsetLeft + shift)
        }
        marker.css('width', target.offsetWidth + 9)
    }

    tabs.each(function (i) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('click', function (e) {
            const target = e.target
            tabs.removeClass('active')
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active')
            if (sliderInstance) {
                const translate = sliderInstance.translate
                indicator(target, 5 - translate)
            } else
                indicator(target, 5)
        })
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass('active')) {
            indicator(this, -3)
        }
    })
    if (sliderInstance) {
        sliderInstance.on('setTranslate', () => {
            const translate = sliderInstance.translate
            marker.css('left', jquery__WEBPACK_IMPORTED_MODULE_0___default()('.active')[0].offsetLeft + translate - 5)
        })
    }
}

// setting pagination

function initPagination(breakpoint) {

    const options = {
        size: 105,
        page: 1,
        step: 1
    }

    if (window.innerWidth < breakpoint) {
        options.step = 0
    }

    _pagination__WEBPACK_IMPORTED_MODULE_1__.default.Init(document.getElementsByClassName('pagination'), options)

}

// user-menu and burger-menu
/** 
 * Adds listeners and toggles popups
 * @param   {String} target element you click
 * @param   {String} popup popup you call
 */
function togglePopup(target, popup) {
    if (target) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${target}`).on('click', function (e) {
            e.stopPropagation()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-menu`).show()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").css("overflow-y", "hidden");
        })

        jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-close`).on('click', function (evt) {
            evt.stopPropagation()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${popup}-menu`).hide()
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").css("overflow-y", "");
        })
    }
    if (popup === 'burger') {
        expandSearch(popup)
    }
}

// expanding search

function expandSearch(area = '') {

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${area}-search-btn`).on('click', function () {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search').toggleClass('active')
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.search').hasClass('active')) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${area}-search-field`).trigger('focus')
        } else jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${area}-search-field`).trigger('blur').val('')

    })
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9saWJzL2pxdWVyeS5qdXN0aWZpZWRHYWxsZXJ5LmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sSUFBMEM7QUFDaEQ7QUFDQSxJQUFJLGlDQUFPLENBQUMsMEVBQVEsQ0FBQyxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLGtHQUFDO0FBQy9CLEdBQUcsTUFBTSxFQXFCTjtBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0EsZUFBZSw4QkFBOEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsb0NBQW9DO0FBQ3BDLGtEQUFrRDtBQUNsRDtBQUNBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DO0FBQ3BDLFNBQVM7O0FBRVQ7QUFDQSw0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCw2Q0FBNkM7QUFDN0M7O0FBRUE7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQix5Q0FBeUM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSx5Q0FBeUM7QUFDeEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHlDQUF5QztBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsbUJBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsSUFBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLE9BQU87QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxxQkFBcUIsY0FBYztBQUNuQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx5QkFBeUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssU0FBUztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0EsV0FBVzs7QUFFWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUIsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1DQUFtQyxFQUFFO0FBQzVFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQyxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsRUFBRTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsS0FBSztBQUNMOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzV0Q0Q7QUFDQTtBQUNBO0FBQ0E7QUFDc0I7OztBQUd0Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkNBQUM7QUFDdEI7QUFDQSxRQUFRLDZDQUFDO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUVBQWUsVUFBVTs7QUFFekI7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlLc0I7QUFDSztBQUNVOztBQUVyQzs7QUFFTztBQUNQO0FBQ0E7QUFDQSxZQUFZLDJDQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBOztBQUVPOztBQUVQLG1CQUFtQiw2Q0FBQztBQUNwQixpQkFBaUIsNkNBQUM7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsNkNBQUM7QUFDVDtBQUNBO0FBQ0EsWUFBWSw2Q0FBQztBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVCxZQUFZLDZDQUFDO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsNkNBQUM7QUFDaEMsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxxREFBZTs7QUFFbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNPO0FBQ1A7QUFDQSxRQUFRLDZDQUFDLEtBQUssT0FBTztBQUNyQjtBQUNBLFlBQVksNkNBQUMsS0FBSyxNQUFNO0FBQ3hCLFlBQVksNkNBQUM7QUFDYixTQUFTOztBQUVULFFBQVEsNkNBQUMsS0FBSyxNQUFNO0FBQ3BCO0FBQ0EsWUFBWSw2Q0FBQyxLQUFLLE1BQU07QUFDeEIsWUFBWSw2Q0FBQztBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVPOztBQUVQLElBQUksNkNBQUMsS0FBSyxLQUFLO0FBQ2YsUUFBUSw2Q0FBQztBQUNULFlBQVksNkNBQUM7QUFDYixZQUFZLDZDQUFDLEtBQUssS0FBSztBQUN2QixTQUFTLE1BQU0sNkNBQUMsS0FBSyxLQUFLOztBQUUxQixLQUFLO0FBQ0wsQyIsImZpbGUiOiJqcy9qc19saWJzX2pxdWVyeV9qdXN0aWZpZWRHYWxsZXJ5X2pzLWpzX3V0aWxzX2pzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBqdXN0aWZpZWRHYWxsZXJ5IC0gdjMuOC4xXG4gKiBodHRwOi8vbWlyb21hbm5pbm8uZ2l0aHViLmlvL0p1c3RpZmllZC1HYWxsZXJ5L1xuICogQ29weXJpZ2h0IChjKSAyMDIwIE1pcm8gTWFubmlub1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAvLyBOb2RlL0NvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocm9vdCwgalF1ZXJ5KSB7XG4gICAgICBpZiAoalF1ZXJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gcmVxdWlyZSgnalF1ZXJ5JykgcmV0dXJucyBhIGZhY3RvcnkgdGhhdCByZXF1aXJlcyB3aW5kb3cgdG9cbiAgICAgICAgLy8gYnVpbGQgYSBqUXVlcnkgaW5zdGFuY2UsIHdlIG5vcm1hbGl6ZSBob3cgd2UgdXNlIG1vZHVsZXNcbiAgICAgICAgLy8gdGhhdCByZXF1aXJlIHRoaXMgcGF0dGVybiBidXQgdGhlIHdpbmRvdyBwcm92aWRlZCBpcyBhIG5vb3BcbiAgICAgICAgLy8gaWYgaXQncyBkZWZpbmVkIChob3cganF1ZXJ5IHdvcmtzKVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBqUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBqUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKShyb290KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgICAgcmV0dXJuIGpRdWVyeTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gIC8qKlxuICAgKiBKdXN0aWZpZWQgR2FsbGVyeSBjb250cm9sbGVyIGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSAkZ2FsbGVyeSB0aGUgZ2FsbGVyeSB0byBidWlsZFxuICAgKiBAcGFyYW0gc2V0dGluZ3MgdGhlIHNldHRpbmdzICh0aGUgZGVmYXVsdHMgYXJlIGluIEp1c3RpZmllZEdhbGxlcnkuZGVmYXVsdHMpXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgdmFyIEp1c3RpZmllZEdhbGxlcnkgPSBmdW5jdGlvbiAoJGdhbGxlcnksIHNldHRpbmdzKSB7XG4gIFxuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLmNoZWNrU2V0dGluZ3MoKTtcbiAgXG4gICAgdGhpcy5pbWdBbmFseXplclRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMuZW50cmllcyA9IG51bGw7XG4gICAgdGhpcy5idWlsZGluZ1JvdyA9IHtcbiAgICAgIGVudHJpZXNCdWZmOiBbXSxcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgYXNwZWN0UmF0aW86IDBcbiAgICB9O1xuICAgIHRoaXMubGFzdEZldGNoZWRFbnRyeSA9IG51bGw7XG4gICAgdGhpcy5sYXN0QW5hbHl6ZWRJbmRleCA9IC0xO1xuICAgIHRoaXMueWllbGQgPSB7XG4gICAgICBldmVyeTogMiwgLy8gZG8gYSBmbHVzaCBldmVyeSBuIGZsdXNoZXMgKG11c3QgYmUgZ3JlYXRlciB0aGFuIDEpXG4gICAgICBmbHVzaGVkOiAwIC8vIGZsdXNoZWQgcm93cyB3aXRob3V0IGEgeWllbGRcbiAgICB9O1xuICAgIHRoaXMuYm9yZGVyID0gc2V0dGluZ3MuYm9yZGVyID49IDAgPyBzZXR0aW5ncy5ib3JkZXIgOiBzZXR0aW5ncy5tYXJnaW5zO1xuICAgIHRoaXMubWF4Um93SGVpZ2h0ID0gdGhpcy5yZXRyaWV2ZU1heFJvd0hlaWdodCgpO1xuICAgIHRoaXMuc3VmZml4UmFuZ2VzID0gdGhpcy5yZXRyaWV2ZVN1ZmZpeFJhbmdlcygpO1xuICAgIHRoaXMub2ZmWSA9IHRoaXMuYm9yZGVyO1xuICAgIHRoaXMucm93cyA9IDA7XG4gICAgdGhpcy5zcGlubmVyID0ge1xuICAgICAgcGhhc2U6IDAsXG4gICAgICB0aW1lU2xvdDogMTUwLFxuICAgICAgJGVsOiAkKCc8ZGl2IGNsYXNzPVwiamctc3Bpbm5lclwiPjxzcGFuPjwvc3Bhbj48c3Bhbj48L3NwYW4+PHNwYW4+PC9zcGFuPjwvZGl2PicpLFxuICAgICAgaW50ZXJ2YWxJZDogbnVsbFxuICAgIH07XG4gICAgdGhpcy5zY3JvbGxCYXJPbiA9IGZhbHNlO1xuICAgIHRoaXMuY2hlY2tXaWR0aEludGVydmFsSWQgPSBudWxsO1xuICAgIHRoaXMuZ2FsbGVyeVdpZHRoID0gJGdhbGxlcnkud2lkdGgoKTtcbiAgICB0aGlzLiRnYWxsZXJ5ID0gJGdhbGxlcnk7XG4gIFxuICB9O1xuICBcbiAgLyoqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBiZXN0IHN1ZmZpeCBnaXZlbiB0aGUgd2lkdGggYW5kIHRoZSBoZWlnaHQgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZ2V0U3VmZml4ID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgbG9uZ2VzdFNpZGUsIGk7XG4gICAgbG9uZ2VzdFNpZGUgPSAod2lkdGggPiBoZWlnaHQpID8gd2lkdGggOiBoZWlnaHQ7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc3VmZml4UmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobG9uZ2VzdFNpZGUgPD0gdGhpcy5zdWZmaXhSYW5nZXNbaV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXNbdGhpcy5zdWZmaXhSYW5nZXNbaV1dO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlc1t0aGlzLnN1ZmZpeFJhbmdlc1tpIC0gMV1dO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgc3VmZml4IGZyb20gdGhlIHN0cmluZ1xuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBhIG5ldyBzdHJpbmcgd2l0aG91dCB0aGUgc3VmZml4XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5yZW1vdmVTdWZmaXggPSBmdW5jdGlvbiAoc3RyLCBzdWZmaXgpIHtcbiAgICByZXR1cm4gc3RyLnN1YnN0cmluZygwLCBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGEgYm9vbGVhbiB0byBzYXkgaWYgdGhlIHN1ZmZpeCBpcyBjb250YWluZWQgaW4gdGhlIHN0ciBvciBub3RcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHN0ciwgc3VmZml4KSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1ZmZpeCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpICE9PSAtMTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVzZWQgc3VmZml4IG9mIGEgcGFydGljdWxhciB1cmxcbiAgICpcbiAgICogQHBhcmFtIHN0clxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSByZXR1cm4gdGhlIHVzZWQgc3VmZml4XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5nZXRVc2VkU3VmZml4ID0gZnVuY3Rpb24gKHN0cikge1xuICAgIGZvciAodmFyIHNpIGluIHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXMpIHtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzLmhhc093blByb3BlcnR5KHNpKSkge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlc1tzaV0ubGVuZ3RoID09PSAwKSBjb250aW51ZTtcbiAgICAgICAgaWYgKHRoaXMuZW5kc1dpdGgoc3RyLCB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzW3NpXSkpIHJldHVybiB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzW3NpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEdpdmVuIGFuIGltYWdlIHNyYywgd2l0aCB0aGUgd2lkdGggYW5kIHRoZSBoZWlnaHQsIHJldHVybnMgdGhlIG5ldyBpbWFnZSBzcmMgd2l0aCB0aGVcbiAgICogYmVzdCBzdWZmaXggdG8gc2hvdyB0aGUgYmVzdCBxdWFsaXR5IHRodW1ibmFpbC5cbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ30gdGhlIHN1ZmZpeCB0byB1c2VcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLm5ld1NyYyA9IGZ1bmN0aW9uIChpbWFnZVNyYywgaW1nV2lkdGgsIGltZ0hlaWdodCwgaW1hZ2UpIHtcbiAgICB2YXIgbmV3SW1hZ2VTcmM7XG4gIFxuICAgIGlmICh0aGlzLnNldHRpbmdzLnRodW1ibmFpbFBhdGgpIHtcbiAgICAgIG5ld0ltYWdlU3JjID0gdGhpcy5zZXR0aW5ncy50aHVtYm5haWxQYXRoKGltYWdlU3JjLCBpbWdXaWR0aCwgaW1nSGVpZ2h0LCBpbWFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtYXRjaFJlcyA9IGltYWdlU3JjLm1hdGNoKHRoaXMuc2V0dGluZ3MuZXh0ZW5zaW9uKTtcbiAgICAgIHZhciBleHQgPSAobWF0Y2hSZXMgIT09IG51bGwpID8gbWF0Y2hSZXNbMF0gOiAnJztcbiAgICAgIG5ld0ltYWdlU3JjID0gaW1hZ2VTcmMucmVwbGFjZSh0aGlzLnNldHRpbmdzLmV4dGVuc2lvbiwgJycpO1xuICAgICAgbmV3SW1hZ2VTcmMgPSB0aGlzLnJlbW92ZVN1ZmZpeChuZXdJbWFnZVNyYywgdGhpcy5nZXRVc2VkU3VmZml4KG5ld0ltYWdlU3JjKSk7XG4gICAgICBuZXdJbWFnZVNyYyArPSB0aGlzLmdldFN1ZmZpeChpbWdXaWR0aCwgaW1nSGVpZ2h0KSArIGV4dDtcbiAgICB9XG4gIFxuICAgIHJldHVybiBuZXdJbWFnZVNyYztcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgaW1hZ2VzIHRoYXQgaXMgaW4gdGhlIGdpdmVuIGVudHJ5XG4gICAqXG4gICAqIEBwYXJhbSAkZW50cnkgdGhlIGVudHJ5XG4gICAqIEBwYXJhbSBjYWxsYmFjayB0aGUgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgc2hvdyBhbmltYXRpb24gaXMgZmluaXNoZWRcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnNob3dJbWcgPSBmdW5jdGlvbiAoJGVudHJ5LCBjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmNzc0FuaW1hdGlvbikge1xuICAgICAgJGVudHJ5LmFkZENsYXNzKCdqZy1lbnRyeS12aXNpYmxlJyk7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRlbnRyeS5zdG9wKCkuZmFkZVRvKHRoaXMuc2V0dGluZ3MuaW1hZ2VzQW5pbWF0aW9uRHVyYXRpb24sIDEuMCwgY2FsbGJhY2spO1xuICAgICAgJGVudHJ5LmZpbmQodGhpcy5zZXR0aW5ncy5pbWdTZWxlY3Rvcikuc3RvcCgpLmZhZGVUbyh0aGlzLnNldHRpbmdzLmltYWdlc0FuaW1hdGlvbkR1cmF0aW9uLCAxLjAsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogRXh0cmFjdCB0aGUgaW1hZ2Ugc3JjIGZvcm0gdGhlIGltYWdlLCBsb29raW5nIGZyb20gdGhlICdzYWZlLXNyYycsIGFuZCBpZiBpdCBjYW4ndCBiZSBmb3VuZCwgZnJvbSB0aGVcbiAgICogJ3NyYycgYXR0cmlidXRlLiBJdCBzYXZlcyBpbiB0aGUgaW1hZ2UgZGF0YSB0aGUgJ2pnLm9yaWdpbmFsU3JjJyBmaWVsZCwgd2l0aCB0aGUgZXh0cmFjdGVkIHNyYy5cbiAgICpcbiAgICogQHBhcmFtICRpbWFnZSB0aGUgaW1hZ2UgdG8gYW5hbHl6ZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZXh0cmFjdGVkIHNyY1xuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZXh0cmFjdEltZ1NyY0Zyb21JbWFnZSA9IGZ1bmN0aW9uICgkaW1hZ2UpIHtcbiAgICB2YXIgaW1hZ2VTcmMgPSAkaW1hZ2UuZGF0YSgnc2FmZS1zcmMnKTtcbiAgICB2YXIgaW1hZ2VTcmNMb2MgPSAnZGF0YS1zYWZlLXNyYyc7XG4gICAgaWYgKHR5cGVvZiBpbWFnZVNyYyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGltYWdlU3JjID0gJGltYWdlLmF0dHIoJ3NyYycpO1xuICAgICAgaW1hZ2VTcmNMb2MgPSAnc3JjJztcbiAgICB9XG4gICAgJGltYWdlLmRhdGEoJ2pnLm9yaWdpbmFsU3JjJywgaW1hZ2VTcmMpOyAvLyB0aGlzIGlzIHNhdmVkIGZvciB0aGUgZGVzdHJveSBtZXRob2RcbiAgICAkaW1hZ2UuZGF0YSgnamcuc3JjJywgaW1hZ2VTcmMpOyAvLyB0aGlzIHdpbGwgY2hhbmdlIG92ZXJ0aW1lXG4gICAgJGltYWdlLmRhdGEoJ2pnLm9yaWdpbmFsU3JjTG9jJywgaW1hZ2VTcmNMb2MpOyAvLyB0aGlzIGlzIHNhdmVkIGZvciB0aGUgZGVzdHJveSBtZXRob2RcbiAgICByZXR1cm4gaW1hZ2VTcmM7XG4gIH07XG4gIFxuICAvKiogQHJldHVybnMge2pRdWVyeX0gdGhlIGltYWdlIGluIHRoZSBnaXZlbiBlbnRyeSAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5pbWdGcm9tRW50cnkgPSBmdW5jdGlvbiAoJGVudHJ5KSB7XG4gICAgdmFyICRpbWcgPSAkZW50cnkuZmluZCh0aGlzLnNldHRpbmdzLmltZ1NlbGVjdG9yKTtcbiAgICByZXR1cm4gJGltZy5sZW5ndGggPT09IDAgPyBudWxsIDogJGltZztcbiAgfTtcbiAgXG4gIC8qKiBAcmV0dXJucyB7alF1ZXJ5fSB0aGUgY2FwdGlvbiBpbiB0aGUgZ2l2ZW4gZW50cnkgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuY2FwdGlvbkZyb21FbnRyeSA9IGZ1bmN0aW9uICgkZW50cnkpIHtcbiAgICB2YXIgJGNhcHRpb24gPSAkZW50cnkuZmluZCgnPiAuamctY2FwdGlvbicpO1xuICAgIHJldHVybiAkY2FwdGlvbi5sZW5ndGggPT09IDAgPyBudWxsIDogJGNhcHRpb247XG4gIH07XG4gIFxuICAvKipcbiAgICogRGlzcGxheSB0aGUgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbnRyeSB0aGUgZW50cnkgdG8gZGlzcGxheVxuICAgKiBAcGFyYW0ge2ludH0geCB0aGUgeCBwb3NpdGlvbiB3aGVyZSB0aGUgZW50cnkgbXVzdCBiZSBwb3NpdGlvbmVkXG4gICAqIEBwYXJhbSB5IHRoZSB5IHBvc2l0aW9uIHdoZXJlIHRoZSBlbnRyeSBtdXN0IGJlIHBvc2l0aW9uZWRcbiAgICogQHBhcmFtIGltZ1dpZHRoIHRoZSBpbWFnZSB3aWR0aFxuICAgKiBAcGFyYW0gaW1nSGVpZ2h0IHRoZSBpbWFnZSBoZWlnaHRcbiAgICogQHBhcmFtIHJvd0hlaWdodCB0aGUgcm93IGhlaWdodCBvZiB0aGUgcm93IHRoYXQgb3ducyB0aGUgZW50cnlcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmRpc3BsYXlFbnRyeSA9IGZ1bmN0aW9uICgkZW50cnksIHgsIHksIGltZ1dpZHRoLCBpbWdIZWlnaHQsIHJvd0hlaWdodCkge1xuICAgICRlbnRyeS53aWR0aChpbWdXaWR0aCk7XG4gICAgJGVudHJ5LmhlaWdodChyb3dIZWlnaHQpO1xuICAgICRlbnRyeS5jc3MoJ3RvcCcsIHkpO1xuICAgICRlbnRyeS5jc3MoJ2xlZnQnLCB4KTtcbiAgXG4gICAgdmFyICRpbWFnZSA9IHRoaXMuaW1nRnJvbUVudHJ5KCRlbnRyeSk7XG4gICAgaWYgKCRpbWFnZSAhPT0gbnVsbCkge1xuICAgICAgJGltYWdlLmNzcygnd2lkdGgnLCBpbWdXaWR0aCk7XG4gICAgICAkaW1hZ2UuY3NzKCdoZWlnaHQnLCBpbWdIZWlnaHQpO1xuICAgICAgJGltYWdlLmNzcygnbWFyZ2luLWxlZnQnLCAtIGltZ1dpZHRoIC8gMik7XG4gICAgICAkaW1hZ2UuY3NzKCdtYXJnaW4tdG9wJywgLSBpbWdIZWlnaHQgLyAyKTtcbiAgXG4gICAgICAvLyBJbWFnZSByZWxvYWRpbmcgZm9yIGFuIGhpZ2ggcXVhbGl0eSBvZiB0aHVtYm5haWxzXG4gICAgICB2YXIgaW1hZ2VTcmMgPSAkaW1hZ2UuZGF0YSgnamcuc3JjJyk7XG4gICAgICBpZiAoaW1hZ2VTcmMpIHtcbiAgICAgICAgaW1hZ2VTcmMgPSB0aGlzLm5ld1NyYyhpbWFnZVNyYywgaW1nV2lkdGgsIGltZ0hlaWdodCwgJGltYWdlWzBdKTtcbiAgXG4gICAgICAgICRpbWFnZS5vbmUoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICB0aGlzLnJlc2V0SW1nU3JjKCRpbWFnZSk7IC8vcmV2ZXJ0IHRvIHRoZSBvcmlnaW5hbCB0aHVtYm5haWxcbiAgICAgICAgfSk7XG4gIFxuICAgICAgICB2YXIgbG9hZE5ld0ltYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGlmIChpbWFnZVNyYyAhPT0gbmV3SW1hZ2VTcmMpIHsgXG4gICAgICAgICAgICAkaW1hZ2UuYXR0cignc3JjJywgaW1hZ2VTcmMpO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfTtcbiAgXG4gICAgICAgIGlmICgkZW50cnkuZGF0YSgnamcubG9hZGVkJykgPT09ICdza2lwcGVkJyAmJiBpbWFnZVNyYykge1xuICAgICAgICAgIHRoaXMub25JbWFnZUV2ZW50KGltYWdlU3JjLCAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dJbWcoJGVudHJ5LCBsb2FkTmV3SW1hZ2UpOyAvL2xvYWQgdGhlIG5ldyBpbWFnZSBhZnRlciB0aGUgZmFkZUluXG4gICAgICAgICAgICAkZW50cnkuZGF0YSgnamcubG9hZGVkJywgdHJ1ZSk7XG4gICAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zaG93SW1nKCRlbnRyeSwgbG9hZE5ld0ltYWdlKTsgLy9sb2FkIHRoZSBuZXcgaW1hZ2UgYWZ0ZXIgdGhlIGZhZGVJblxuICAgICAgICB9XG4gICAgICBcbiAgICAgIH1cbiAgXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd0ltZygkZW50cnkpO1xuICAgIH1cbiAgXG4gICAgdGhpcy5kaXNwbGF5RW50cnlDYXB0aW9uKCRlbnRyeSk7XG4gIH07XG4gIFxuICAvKipcbiAgICogRGlzcGxheSB0aGUgZW50cnkgY2FwdGlvbi4gSWYgdGhlIGNhcHRpb24gZWxlbWVudCBkb2Vzbid0IGV4aXN0cywgaXQgY3JlYXRlcyB0aGUgY2FwdGlvbiB1c2luZyB0aGUgJ2FsdCdcbiAgICogb3IgdGhlICd0aXRsZScgYXR0cmlidXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbnRyeSB0aGUgZW50cnkgdG8gcHJvY2Vzc1xuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZGlzcGxheUVudHJ5Q2FwdGlvbiA9IGZ1bmN0aW9uICgkZW50cnkpIHtcbiAgICB2YXIgJGltYWdlID0gdGhpcy5pbWdGcm9tRW50cnkoJGVudHJ5KTtcbiAgICBpZiAoJGltYWdlICE9PSBudWxsICYmIHRoaXMuc2V0dGluZ3MuY2FwdGlvbnMpIHtcbiAgICAgIHZhciAkaW1nQ2FwdGlvbiA9IHRoaXMuY2FwdGlvbkZyb21FbnRyeSgkZW50cnkpO1xuICBcbiAgICAgIC8vIENyZWF0ZSBpdCBpZiBpdCBkb2Vzbid0IGV4aXN0c1xuICAgICAgaWYgKCRpbWdDYXB0aW9uID09PSBudWxsKSB7XG4gICAgICAgIHZhciBjYXB0aW9uID0gJGltYWdlLmF0dHIoJ2FsdCcpO1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZENhcHRpb24oY2FwdGlvbikpIGNhcHRpb24gPSAkZW50cnkuYXR0cigndGl0bGUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENhcHRpb24oY2FwdGlvbikpIHsgLy8gQ3JlYXRlIG9ubHkgd2UgZm91bmQgc29tZXRoaW5nXG4gICAgICAgICAgJGltZ0NhcHRpb24gPSAkKCc8ZGl2IGNsYXNzPVwiamctY2FwdGlvblwiPicgKyBjYXB0aW9uICsgJzwvZGl2PicpO1xuICAgICAgICAgICRlbnRyeS5hcHBlbmQoJGltZ0NhcHRpb24pO1xuICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5jcmVhdGVkQ2FwdGlvbicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgLy8gQ3JlYXRlIGV2ZW50cyAod2UgY2hlY2sgYWdhaW4gdGhlICRpbWdDYXB0aW9uIGJlY2F1c2UgaXQgY2FuIGJlIHN0aWxsIGluZXhpc3RlbnQpXG4gICAgICBpZiAoJGltZ0NhcHRpb24gIT09IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmNzc0FuaW1hdGlvbikgJGltZ0NhcHRpb24uc3RvcCgpLmZhZGVUbygwLCB0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy5ub25WaXNpYmxlT3BhY2l0eSk7XG4gICAgICAgIHRoaXMuYWRkQ2FwdGlvbkV2ZW50c0hhbmRsZXJzKCRlbnRyeSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2FwdGlvbkV2ZW50c0hhbmRsZXJzKCRlbnRyeSk7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgY2FwdGlvblxuICAgKlxuICAgKiBAcGFyYW0gY2FwdGlvbiBUaGUgY2FwdGlvbiB0aGF0IHNob3VsZCBiZSB2YWxpZGF0ZWRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVmFsaWRhdGlvbiByZXN1bHRcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmlzVmFsaWRDYXB0aW9uID0gZnVuY3Rpb24gKGNhcHRpb24pIHtcbiAgICByZXR1cm4gKHR5cGVvZiBjYXB0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBjYXB0aW9uLmxlbmd0aCA+IDApO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayBmb3IgdGhlIGV2ZW50ICdtb3VzZWVudGVyJy4gSXQgYXNzdW1lcyB0aGF0IHRoZSBldmVudCBjdXJyZW50VGFyZ2V0IGlzIGFuIGVudHJ5LlxuICAgKiBJdCBzaG93cyB0aGUgY2FwdGlvbiB1c2luZyBqUXVlcnkgKG9yIHVzaW5nIENTUyBpZiBpdCBpcyBjb25maWd1cmVkIHNvKVxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudE9iamVjdCB0aGUgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5vbkVudHJ5TW91c2VFbnRlckZvckNhcHRpb24gPSBmdW5jdGlvbiAoZXZlbnRPYmplY3QpIHtcbiAgICB2YXIgJGNhcHRpb24gPSB0aGlzLmNhcHRpb25Gcm9tRW50cnkoJChldmVudE9iamVjdC5jdXJyZW50VGFyZ2V0KSk7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY3NzQW5pbWF0aW9uKSB7XG4gICAgICAkY2FwdGlvbi5hZGRDbGFzcygnamctY2FwdGlvbi12aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ2pnLWNhcHRpb24taGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRjYXB0aW9uLnN0b3AoKS5mYWRlVG8odGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3MuYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLnZpc2libGVPcGFjaXR5KTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIGZvciB0aGUgZXZlbnQgJ21vdXNlbGVhdmUnLiBJdCBhc3N1bWVzIHRoYXQgdGhlIGV2ZW50IGN1cnJlbnRUYXJnZXQgaXMgYW4gZW50cnkuXG4gICAqIEl0IGhpZGVzIHRoZSBjYXB0aW9uIHVzaW5nIGpRdWVyeSAob3IgdXNpbmcgQ1NTIGlmIGl0IGlzIGNvbmZpZ3VyZWQgc28pXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50T2JqZWN0IHRoZSBldmVudCBvYmplY3RcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLm9uRW50cnlNb3VzZUxlYXZlRm9yQ2FwdGlvbiA9IGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgIHZhciAkY2FwdGlvbiA9IHRoaXMuY2FwdGlvbkZyb21FbnRyeSgkKGV2ZW50T2JqZWN0LmN1cnJlbnRUYXJnZXQpKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jc3NBbmltYXRpb24pIHtcbiAgICAgICRjYXB0aW9uLnJlbW92ZUNsYXNzKCdqZy1jYXB0aW9uLXZpc2libGUnKS5yZW1vdmVDbGFzcygnamctY2FwdGlvbi1oaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGNhcHRpb24uc3RvcCgpLmZhZGVUbyh0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3Mubm9uVmlzaWJsZU9wYWNpdHkpO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBBZGQgdGhlIGhhbmRsZXJzIG9mIHRoZSBlbnRyeSBmb3IgdGhlIGNhcHRpb25cbiAgICpcbiAgICogQHBhcmFtICRlbnRyeSB0aGUgZW50cnkgdG8gbW9kaWZ5XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5hZGRDYXB0aW9uRXZlbnRzSGFuZGxlcnMgPSBmdW5jdGlvbiAoJGVudHJ5KSB7XG4gICAgdmFyIGNhcHRpb25Nb3VzZUV2ZW50cyA9ICRlbnRyeS5kYXRhKCdqZy5jYXB0aW9uTW91c2VFdmVudHMnKTtcbiAgICBpZiAodHlwZW9mIGNhcHRpb25Nb3VzZUV2ZW50cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNhcHRpb25Nb3VzZUV2ZW50cyA9IHtcbiAgICAgICAgbW91c2VlbnRlcjogJC5wcm94eSh0aGlzLm9uRW50cnlNb3VzZUVudGVyRm9yQ2FwdGlvbiwgdGhpcyksXG4gICAgICAgIG1vdXNlbGVhdmU6ICQucHJveHkodGhpcy5vbkVudHJ5TW91c2VMZWF2ZUZvckNhcHRpb24sIHRoaXMpXG4gICAgICB9O1xuICAgICAgJGVudHJ5Lm9uKCdtb3VzZWVudGVyJywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNhcHRpb25Nb3VzZUV2ZW50cy5tb3VzZWVudGVyKTtcbiAgICAgICRlbnRyeS5vbignbW91c2VsZWF2ZScsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjYXB0aW9uTW91c2VFdmVudHMubW91c2VsZWF2ZSk7XG4gICAgICAkZW50cnkuZGF0YSgnamcuY2FwdGlvbk1vdXNlRXZlbnRzJywgY2FwdGlvbk1vdXNlRXZlbnRzKTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBoYW5kbGVycyBvZiB0aGUgZW50cnkgZm9yIHRoZSBjYXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSAkZW50cnkgdGhlIGVudHJ5IHRvIG1vZGlmeVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucmVtb3ZlQ2FwdGlvbkV2ZW50c0hhbmRsZXJzID0gZnVuY3Rpb24gKCRlbnRyeSkge1xuICAgIHZhciBjYXB0aW9uTW91c2VFdmVudHMgPSAkZW50cnkuZGF0YSgnamcuY2FwdGlvbk1vdXNlRXZlbnRzJyk7XG4gICAgaWYgKHR5cGVvZiBjYXB0aW9uTW91c2VFdmVudHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAkZW50cnkub2ZmKCdtb3VzZWVudGVyJywgdW5kZWZpbmVkLCBjYXB0aW9uTW91c2VFdmVudHMubW91c2VlbnRlcik7XG4gICAgICAkZW50cnkub2ZmKCdtb3VzZWxlYXZlJywgdW5kZWZpbmVkLCBjYXB0aW9uTW91c2VFdmVudHMubW91c2VsZWF2ZSk7XG4gICAgICAkZW50cnkucmVtb3ZlRGF0YSgnamcuY2FwdGlvbk1vdXNlRXZlbnRzJyk7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIENsZWFyIHRoZSBidWlsZGluZyByb3cgZGF0YSB0byBiZSB1c2VkIGZvciBhIG5ldyByb3dcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmNsZWFyQnVpbGRpbmdSb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZiA9IFtdO1xuICAgIHRoaXMuYnVpbGRpbmdSb3cuYXNwZWN0UmF0aW8gPSAwO1xuICAgIHRoaXMuYnVpbGRpbmdSb3cud2lkdGggPSAwO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEp1c3RpZnkgdGhlIGJ1aWxkaW5nIHJvdywgcHJlcGFyaW5nIGl0IHRvXG4gICAqXG4gICAqIEBwYXJhbSBpc0xhc3RSb3dcbiAgICogQHBhcmFtIGhpZGRlblJvdyB1bmRlZmluZWQgb3IgZmFsc2UgZm9yIG5vcm1hbCBiZWhhdmlvci4gaGlkZGVuUm93ID0gdHJ1ZSB0byBoaWRlIHRoZSByb3cuXG4gICAqIEByZXR1cm5zIGEgYm9vbGVhbiB0byBrbm93IGlmIHRoZSByb3cgaGFzIGJlZW4ganVzdGlmaWVkIG9yIG5vdFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucHJlcGFyZUJ1aWxkaW5nUm93ID0gZnVuY3Rpb24gKGlzTGFzdFJvdywgaGlkZGVuUm93KSB7XG4gICAgdmFyIGksICRlbnRyeSwgaW1nQXNwZWN0UmF0aW8sIG5ld0ltZ1csIG5ld0ltZ0gsIGp1c3RpZnkgPSB0cnVlO1xuICAgIHZhciBtaW5IZWlnaHQgPSAwO1xuICAgIHZhciBhdmFpbGFibGVXaWR0aCA9IHRoaXMuZ2FsbGVyeVdpZHRoIC0gMiAqIHRoaXMuYm9yZGVyIC0gKFxuICAgICAgKHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoIC0gMSkgKiB0aGlzLnNldHRpbmdzLm1hcmdpbnMpO1xuICAgIHZhciByb3dIZWlnaHQgPSBhdmFpbGFibGVXaWR0aCAvIHRoaXMuYnVpbGRpbmdSb3cuYXNwZWN0UmF0aW87XG4gICAgdmFyIGRlZmF1bHRSb3dIZWlnaHQgPSB0aGlzLnNldHRpbmdzLnJvd0hlaWdodDtcbiAgICB2YXIganVzdGlmaWFibGUgPSB0aGlzLmJ1aWxkaW5nUm93LndpZHRoIC8gYXZhaWxhYmxlV2lkdGggPiB0aGlzLnNldHRpbmdzLmp1c3RpZnlUaHJlc2hvbGQ7XG4gIFxuICAgIC8vU2tpcCB0aGUgbGFzdCByb3cgaWYgd2UgY2FuJ3QganVzdGlmeSBpdCBhbmQgdGhlIGxhc3RSb3cgPT0gJ2hpZGUnXG4gICAgaWYgKGhpZGRlblJvdyB8fCAoaXNMYXN0Um93ICYmIHRoaXMuc2V0dGluZ3MubGFzdFJvdyA9PT0gJ2hpZGUnICYmICFqdXN0aWZpYWJsZSkpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICRlbnRyeSA9IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmZbaV07XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNzc0FuaW1hdGlvbilcbiAgICAgICAgICAkZW50cnkucmVtb3ZlQ2xhc3MoJ2pnLWVudHJ5LXZpc2libGUnKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGVudHJ5LnN0b3AoKS5mYWRlVG8oMCwgMC4xKTtcbiAgICAgICAgICAkZW50cnkuZmluZCgnPiBpbWcsID4gYSA+IGltZycpLmZhZGVUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgXG4gICAgLy8gV2l0aCBsYXN0Um93ID0gbm9qdXN0aWZ5LCBqdXN0aWZ5IGlmIGlzIGp1c3RpZmljYWJsZSAodGhlIGltYWdlcyB3aWxsIG5vdCBiZWNvbWUgdG9vIGJpZylcbiAgICBpZiAoaXNMYXN0Um93ICYmICFqdXN0aWZpYWJsZSAmJiB0aGlzLnNldHRpbmdzLmxhc3RSb3cgIT09ICdqdXN0aWZ5JyAmJiB0aGlzLnNldHRpbmdzLmxhc3RSb3cgIT09ICdoaWRlJykge1xuICAgICAganVzdGlmeSA9IGZhbHNlO1xuICBcbiAgICAgIGlmICh0aGlzLnJvd3MgPiAwKSB7XG4gICAgICAgIGRlZmF1bHRSb3dIZWlnaHQgPSAodGhpcy5vZmZZIC0gdGhpcy5ib3JkZXIgLSB0aGlzLnNldHRpbmdzLm1hcmdpbnMgKiB0aGlzLnJvd3MpIC8gdGhpcy5yb3dzO1xuICAgICAgICBqdXN0aWZ5ID0gZGVmYXVsdFJvd0hlaWdodCAqIHRoaXMuYnVpbGRpbmdSb3cuYXNwZWN0UmF0aW8gLyBhdmFpbGFibGVXaWR0aCA+IHRoaXMuc2V0dGluZ3MuanVzdGlmeVRocmVzaG9sZDtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aDsgaSsrKSB7XG4gICAgICAkZW50cnkgPSB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmW2ldO1xuICAgICAgaW1nQXNwZWN0UmF0aW8gPSAkZW50cnkuZGF0YSgnamcud2lkdGgnKSAvICRlbnRyeS5kYXRhKCdqZy5oZWlnaHQnKTtcbiAgXG4gICAgICBpZiAoanVzdGlmeSkge1xuICAgICAgICBuZXdJbWdXID0gKGkgPT09IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoIC0gMSkgPyBhdmFpbGFibGVXaWR0aCA6IHJvd0hlaWdodCAqIGltZ0FzcGVjdFJhdGlvO1xuICAgICAgICBuZXdJbWdIID0gcm93SGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3SW1nVyA9IGRlZmF1bHRSb3dIZWlnaHQgKiBpbWdBc3BlY3RSYXRpbztcbiAgICAgICAgbmV3SW1nSCA9IGRlZmF1bHRSb3dIZWlnaHQ7XG4gICAgICB9XG4gIFxuICAgICAgYXZhaWxhYmxlV2lkdGggLT0gTWF0aC5yb3VuZChuZXdJbWdXKTtcbiAgICAgICRlbnRyeS5kYXRhKCdqZy5qd2lkdGgnLCBNYXRoLnJvdW5kKG5ld0ltZ1cpKTtcbiAgICAgICRlbnRyeS5kYXRhKCdqZy5qaGVpZ2h0JywgTWF0aC5jZWlsKG5ld0ltZ0gpKTtcbiAgICAgIGlmIChpID09PSAwIHx8IG1pbkhlaWdodCA+IG5ld0ltZ0gpIG1pbkhlaWdodCA9IG5ld0ltZ0g7XG4gICAgfVxuICBcbiAgICB0aGlzLmJ1aWxkaW5nUm93LmhlaWdodCA9IG1pbkhlaWdodDtcbiAgICByZXR1cm4ganVzdGlmeTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBGbHVzaCBhIHJvdzoganVzdGlmeSBpdCwgbW9kaWZ5IHRoZSBnYWxsZXJ5IGhlaWdodCBhY2NvcmRpbmdseSB0byB0aGUgcm93IGhlaWdodFxuICAgKlxuICAgKiBAcGFyYW0gaXNMYXN0Um93XG4gICAqIEBwYXJhbSBoaWRkZW5Sb3cgdW5kZWZpbmVkIG9yIGZhbHNlIGZvciBub3JtYWwgYmVoYXZpb3IuIGhpZGRlblJvdyA9IHRydWUgdG8gaGlkZSB0aGUgcm93LlxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZmx1c2hSb3cgPSBmdW5jdGlvbiAoaXNMYXN0Um93LCBoaWRkZW5Sb3cpIHtcbiAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xuICAgIHZhciAkZW50cnksIGJ1aWxkaW5nUm93UmVzLCBvZmZYID0gdGhpcy5ib3JkZXIsIGk7XG4gIFxuICAgIGJ1aWxkaW5nUm93UmVzID0gdGhpcy5wcmVwYXJlQnVpbGRpbmdSb3coaXNMYXN0Um93LCBoaWRkZW5Sb3cpO1xuICAgIGlmIChoaWRkZW5Sb3cgfHwgKGlzTGFzdFJvdyAmJiBzZXR0aW5ncy5sYXN0Um93ID09PSAnaGlkZScgJiYgYnVpbGRpbmdSb3dSZXMgPT09IC0xKSkge1xuICAgICAgdGhpcy5jbGVhckJ1aWxkaW5nUm93KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICBpZiAodGhpcy5tYXhSb3dIZWlnaHQpIHtcbiAgICAgIGlmICh0aGlzLm1heFJvd0hlaWdodCA8IHRoaXMuYnVpbGRpbmdSb3cuaGVpZ2h0KSB0aGlzLmJ1aWxkaW5nUm93LmhlaWdodCA9IHRoaXMubWF4Um93SGVpZ2h0O1xuICAgIH1cbiAgXG4gICAgLy9BbGlnbiBsYXN0ICh1bmp1c3RpZmllZCkgcm93XG4gICAgaWYgKGlzTGFzdFJvdyAmJiAoc2V0dGluZ3MubGFzdFJvdyA9PT0gJ2NlbnRlcicgfHwgc2V0dGluZ3MubGFzdFJvdyA9PT0gJ3JpZ2h0JykpIHtcbiAgICAgIHZhciBhdmFpbGFibGVXaWR0aCA9IHRoaXMuZ2FsbGVyeVdpZHRoIC0gMiAqIHRoaXMuYm9yZGVyIC0gKHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoIC0gMSkgKiBzZXR0aW5ncy5tYXJnaW5zO1xuICBcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICRlbnRyeSA9IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmZbaV07XG4gICAgICAgIGF2YWlsYWJsZVdpZHRoIC09ICRlbnRyeS5kYXRhKCdqZy5qd2lkdGgnKTtcbiAgICAgIH1cbiAgXG4gICAgICBpZiAoc2V0dGluZ3MubGFzdFJvdyA9PT0gJ2NlbnRlcicpXG4gICAgICAgIG9mZlggKz0gTWF0aC5yb3VuZChhdmFpbGFibGVXaWR0aCAvIDIpO1xuICAgICAgZWxzZSBpZiAoc2V0dGluZ3MubGFzdFJvdyA9PT0gJ3JpZ2h0JylcbiAgICAgICAgb2ZmWCArPSBhdmFpbGFibGVXaWR0aDtcbiAgICB9XG4gIFxuICAgIHZhciBsYXN0RW50cnlJZHggPSB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aCAtIDE7XG4gICAgZm9yIChpID0gMDsgaSA8PSBsYXN0RW50cnlJZHg7IGkrKykge1xuICAgICAgJGVudHJ5ID0gdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZlt0aGlzLnNldHRpbmdzLnJ0bCA/IGxhc3RFbnRyeUlkeCAtIGkgOiBpXTtcbiAgICAgIHRoaXMuZGlzcGxheUVudHJ5KCRlbnRyeSwgb2ZmWCwgdGhpcy5vZmZZLCAkZW50cnkuZGF0YSgnamcuandpZHRoJyksICRlbnRyeS5kYXRhKCdqZy5qaGVpZ2h0JyksIHRoaXMuYnVpbGRpbmdSb3cuaGVpZ2h0KTtcbiAgICAgIG9mZlggKz0gJGVudHJ5LmRhdGEoJ2pnLmp3aWR0aCcpICsgc2V0dGluZ3MubWFyZ2lucztcbiAgICB9XG4gIFxuICAgIC8vR2FsbGVyeSBIZWlnaHRcbiAgICB0aGlzLmdhbGxlcnlIZWlnaHRUb1NldCA9IHRoaXMub2ZmWSArIHRoaXMuYnVpbGRpbmdSb3cuaGVpZ2h0ICsgdGhpcy5ib3JkZXI7XG4gICAgdGhpcy5zZXRHYWxsZXJ5VGVtcEhlaWdodCh0aGlzLmdhbGxlcnlIZWlnaHRUb1NldCArIHRoaXMuZ2V0U3Bpbm5lckhlaWdodCgpKTtcbiAgXG4gICAgaWYgKCFpc0xhc3RSb3cgfHwgKHRoaXMuYnVpbGRpbmdSb3cuaGVpZ2h0IDw9IHNldHRpbmdzLnJvd0hlaWdodCAmJiBidWlsZGluZ1Jvd1JlcykpIHtcbiAgICAgIC8vUmVhZHkgZm9yIGEgbmV3IHJvd1xuICAgICAgdGhpcy5vZmZZICs9IHRoaXMuYnVpbGRpbmdSb3cuaGVpZ2h0ICsgc2V0dGluZ3MubWFyZ2lucztcbiAgICAgIHRoaXMucm93cyArPSAxO1xuICAgICAgdGhpcy5jbGVhckJ1aWxkaW5nUm93KCk7XG4gICAgICB0aGlzLnNldHRpbmdzLnRyaWdnZXJFdmVudC5jYWxsKHRoaXMsICdqZy5yb3dmbHVzaCcpO1xuICAgIH1cbiAgfTtcbiAgXG4gIFxuICAvLyBTY3JvbGwgcG9zaXRpb24gbm90IHJlc3RvcmluZzogaHR0cHM6Ly9naXRodWIuY29tL21pcm9tYW5uaW5vL0p1c3RpZmllZC1HYWxsZXJ5L2lzc3Vlcy8yMjFcbiAgdmFyIGdhbGxlcnlQcmV2U3RhdGljSGVpZ2h0ID0gMDtcbiAgXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnJlbWVtYmVyR2FsbGVyeUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICBnYWxsZXJ5UHJldlN0YXRpY0hlaWdodCA9IHRoaXMuJGdhbGxlcnkuaGVpZ2h0KCk7XG4gICAgdGhpcy4kZ2FsbGVyeS5oZWlnaHQoZ2FsbGVyeVByZXZTdGF0aWNIZWlnaHQpO1xuICB9O1xuICBcbiAgLy8gZ3JvdyBvbmx5XG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnNldEdhbGxlcnlUZW1wSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCkge1xuICAgIGdhbGxlcnlQcmV2U3RhdGljSGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0LCBnYWxsZXJ5UHJldlN0YXRpY0hlaWdodCk7XG4gICAgdGhpcy4kZ2FsbGVyeS5oZWlnaHQoZ2FsbGVyeVByZXZTdGF0aWNIZWlnaHQpO1xuICB9O1xuICBcbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc2V0R2FsbGVyeUZpbmFsSGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCkge1xuICAgIGdhbGxlcnlQcmV2U3RhdGljSGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuJGdhbGxlcnkuaGVpZ2h0KGhlaWdodCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQ2hlY2tzIHRoZSB3aWR0aCBvZiB0aGUgZ2FsbGVyeSBjb250YWluZXIsIHRvIGtub3cgaWYgYSBuZXcganVzdGlmaWNhdGlvbiBpcyBuZWVkZWRcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmNoZWNrV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jaGVja1dpZHRoSW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCQucHJveHkoZnVuY3Rpb24gKCkge1xuICBcbiAgICAgIC8vIGlmIHRoZSBnYWxsZXJ5IGlzIG5vdCBjdXJyZW50bHkgdmlzaWJsZSwgYWJvcnQuXG4gICAgICBpZiAoIXRoaXMuJGdhbGxlcnkuaXMoXCI6dmlzaWJsZVwiKSkgcmV0dXJuO1xuICBcbiAgICAgIHZhciBnYWxsZXJ5V2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuJGdhbGxlcnkud2lkdGgoKSk7XG4gICAgICBpZiAoTWF0aC5hYnMoZ2FsbGVyeVdpZHRoIC0gdGhpcy5nYWxsZXJ5V2lkdGgpID4gdGhpcy5zZXR0aW5ncy5yZWZyZXNoU2Vuc2l0aXZpdHkpIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5V2lkdGggPSBnYWxsZXJ5V2lkdGg7XG4gICAgICAgIHRoaXMucmV3aW5kKCk7XG4gIFxuICAgICAgICB0aGlzLnJlbWVtYmVyR2FsbGVyeUhlaWdodCgpO1xuICBcbiAgICAgICAgLy8gUmVzdGFydCB0byBhbmFseXplXG4gICAgICAgIHRoaXMuc3RhcnRJbWdBbmFseXplcih0cnVlKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKSwgdGhpcy5zZXR0aW5ncy5yZWZyZXNoVGltZSk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGEgYm9vbGVhbiBzYXlpbmcgaWYgdGhlIHNwaW5uZXIgaXMgYWN0aXZlIG9yIG5vdFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuaXNTcGlubmVyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNwaW5uZXIuaW50ZXJ2YWxJZCAhPT0gbnVsbDtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7aW50fSB0aGUgc3Bpbm5lciBoZWlnaHRcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmdldFNwaW5uZXJIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3Bpbm5lci4kZWwuaW5uZXJIZWlnaHQoKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBTdG9wcyB0aGUgc3Bpbm5lciBhbmltYXRpb24gYW5kIG1vZGlmeSB0aGUgZ2FsbGVyeSBoZWlnaHQgdG8gZXhjbHVkZSB0aGUgc3Bpbm5lclxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc3RvcExvYWRpbmdTcGlubmVyQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zcGlubmVyLmludGVydmFsSWQpO1xuICAgIHRoaXMuc3Bpbm5lci5pbnRlcnZhbElkID0gbnVsbDtcbiAgICB0aGlzLnNldEdhbGxlcnlUZW1wSGVpZ2h0KHRoaXMuJGdhbGxlcnkuaGVpZ2h0KCkgLSB0aGlzLmdldFNwaW5uZXJIZWlnaHQoKSk7XG4gICAgdGhpcy5zcGlubmVyLiRlbC5kZXRhY2goKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIHNwaW5uZXIgYW5pbWF0aW9uXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zdGFydExvYWRpbmdTcGlubmVyQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzcGlubmVyQ29udGV4dCA9IHRoaXMuc3Bpbm5lcjtcbiAgICB2YXIgJHNwaW5uZXJQb2ludHMgPSBzcGlubmVyQ29udGV4dC4kZWwuZmluZCgnc3BhbicpO1xuICAgIGNsZWFySW50ZXJ2YWwoc3Bpbm5lckNvbnRleHQuaW50ZXJ2YWxJZCk7XG4gICAgdGhpcy4kZ2FsbGVyeS5hcHBlbmQoc3Bpbm5lckNvbnRleHQuJGVsKTtcbiAgICB0aGlzLnNldEdhbGxlcnlUZW1wSGVpZ2h0KHRoaXMub2ZmWSArIHRoaXMuYnVpbGRpbmdSb3cuaGVpZ2h0ICsgdGhpcy5nZXRTcGlubmVySGVpZ2h0KCkpO1xuICAgIHNwaW5uZXJDb250ZXh0LmludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc3Bpbm5lckNvbnRleHQucGhhc2UgPCAkc3Bpbm5lclBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgJHNwaW5uZXJQb2ludHMuZXEoc3Bpbm5lckNvbnRleHQucGhhc2UpLmZhZGVUbyhzcGlubmVyQ29udGV4dC50aW1lU2xvdCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc3Bpbm5lclBvaW50cy5lcShzcGlubmVyQ29udGV4dC5waGFzZSAtICRzcGlubmVyUG9pbnRzLmxlbmd0aCkuZmFkZVRvKHNwaW5uZXJDb250ZXh0LnRpbWVTbG90LCAwKTtcbiAgICAgIH1cbiAgICAgIHNwaW5uZXJDb250ZXh0LnBoYXNlID0gKHNwaW5uZXJDb250ZXh0LnBoYXNlICsgMSkgJSAoJHNwaW5uZXJQb2ludHMubGVuZ3RoICogMik7XG4gICAgfSwgc3Bpbm5lckNvbnRleHQudGltZVNsb3QpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFJld2luZCB0aGUgaW1hZ2UgYW5hbHlzaXMgdG8gc3RhcnQgZnJvbSB0aGUgZmlyc3QgZW50cnkuXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5yZXdpbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5sYXN0RmV0Y2hlZEVudHJ5ID0gbnVsbDtcbiAgICB0aGlzLmxhc3RBbmFseXplZEluZGV4ID0gLTE7XG4gICAgdGhpcy5vZmZZID0gdGhpcy5ib3JkZXI7XG4gICAgdGhpcy5yb3dzID0gMDtcbiAgICB0aGlzLmNsZWFyQnVpbGRpbmdSb3coKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBgc2V0dGluZ3Muc2VsZWN0b3JgIHJlamVjdGluZyBzcGlubmVyIGVsZW1lbnRcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmdldFNlbGVjdG9yV2l0aG91dFNwaW5uZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IgKyAnLCBkaXY6bm90KC5qZy1zcGlubmVyKSc7XG4gIH07XG4gIFxuICAvKipcbiAgICogQHJldHVybnMge0FycmF5fSBhbGwgZW50cmllcyBtYXRjaGVkIGJ5IGBzZXR0aW5ncy5zZWxlY3RvcmBcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmdldEFsbEVudHJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gdGhpcy5nZXRTZWxlY3RvcldpdGhvdXRTcGlubmVyKCk7XG4gICAgcmV0dXJuIHRoaXMuJGdhbGxlcnkuY2hpbGRyZW4oc2VsZWN0b3IpLnRvQXJyYXkoKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGVudHJpZXMgc2VhcmNoaW5nIGl0IGZyb20gdGhlIGp1c3RpZmllZCBnYWxsZXJ5IEhUTUwgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0gbm9yZXdpbmQgaWYgbm9yZXdpbmQgb25seSB0aGUgbmV3IGVudHJpZXMgd2lsbCBiZSBjaGFuZ2VkIChpLmUuIHJhbmRvbWl6ZWQsIHNvcnRlZCBvciBmaWx0ZXJlZClcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgc29tZSBlbnRyaWVzIGhhcyBiZWVuIGZvdW5kZWRcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnVwZGF0ZUVudHJpZXMgPSBmdW5jdGlvbiAobm9yZXdpbmQpIHtcbiAgICB2YXIgbmV3RW50cmllcztcbiAgXG4gICAgaWYgKG5vcmV3aW5kICYmIHRoaXMubGFzdEZldGNoZWRFbnRyeSAhPSBudWxsKSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLmdldFNlbGVjdG9yV2l0aG91dFNwaW5uZXIoKTtcbiAgICAgIG5ld0VudHJpZXMgPSAkKHRoaXMubGFzdEZldGNoZWRFbnRyeSkubmV4dEFsbChzZWxlY3RvcikudG9BcnJheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVudHJpZXMgPSBbXTtcbiAgICAgIG5ld0VudHJpZXMgPSB0aGlzLmdldEFsbEVudHJpZXMoKTtcbiAgICB9XG4gIFxuICAgIGlmIChuZXdFbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgXG4gICAgICAvLyBTb3J0IG9yIHJhbmRvbWl6ZVxuICAgICAgaWYgKCQuaXNGdW5jdGlvbih0aGlzLnNldHRpbmdzLnNvcnQpKSB7XG4gICAgICAgIG5ld0VudHJpZXMgPSB0aGlzLnNvcnRBcnJheShuZXdFbnRyaWVzKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5yYW5kb21pemUpIHtcbiAgICAgICAgbmV3RW50cmllcyA9IHRoaXMuc2h1ZmZsZUFycmF5KG5ld0VudHJpZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0RmV0Y2hlZEVudHJ5ID0gbmV3RW50cmllc1tuZXdFbnRyaWVzLmxlbmd0aCAtIDFdO1xuICBcbiAgICAgIC8vIEZpbHRlclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZmlsdGVyKSB7XG4gICAgICAgIG5ld0VudHJpZXMgPSB0aGlzLmZpbHRlckFycmF5KG5ld0VudHJpZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXNldEZpbHRlcnMobmV3RW50cmllcyk7XG4gICAgICB9XG4gIFxuICAgIH1cbiAgXG4gICAgdGhpcy5lbnRyaWVzID0gdGhpcy5lbnRyaWVzLmNvbmNhdChuZXdFbnRyaWVzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgZW50cmllcyBvcmRlciB0byB0aGUgRE9NLCBpdGVyYXRpbmcgdGhlIGVudHJpZXMgYW5kIGFwcGVuZGluZyB0aGUgaW1hZ2VzXG4gICAqXG4gICAqIEBwYXJhbSBlbnRyaWVzIHRoZSBlbnRyaWVzIHRoYXQgaGFzIGJlZW4gbW9kaWZpZWQgYW5kIHRoYXQgbXVzdCBiZSByZS1vcmRlcmVkIGluIHRoZSBET01cbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmluc2VydFRvR2FsbGVyeSA9IGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuZWFjaChlbnRyaWVzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkKHRoaXMpLmFwcGVuZFRvKHRoYXQuJGdhbGxlcnkpO1xuICAgIH0pO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFNodWZmbGUgdGhlIGFycmF5IHVzaW5nIHRoZSBGaXNoZXItWWF0ZXMgc2h1ZmZsZSBhbGdvcml0aG1cbiAgICpcbiAgICogQHBhcmFtIGEgdGhlIGFycmF5IHRvIHNodWZmbGVcbiAgICogQHJldHVybiB0aGUgc2h1ZmZsZWQgYXJyYXlcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnNodWZmbGVBcnJheSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGksIGosIHRlbXA7XG4gICAgZm9yIChpID0gYS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICB0ZW1wID0gYVtpXTtcbiAgICAgIGFbaV0gPSBhW2pdO1xuICAgICAgYVtqXSA9IHRlbXA7XG4gICAgfVxuICAgIHRoaXMuaW5zZXJ0VG9HYWxsZXJ5KGEpO1xuICAgIHJldHVybiBhO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFNvcnQgdGhlIGFycmF5IHVzaW5nIHNldHRpbmdzLmNvbXBhcmF0b3IgYXMgY29tcGFyYXRvclxuICAgKlxuICAgKiBAcGFyYW0gYSB0aGUgYXJyYXkgdG8gc29ydCAoaXQgaXMgc29ydGVkKVxuICAgKiBAcmV0dXJuIHRoZSBzb3J0ZWQgYXJyYXlcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnNvcnRBcnJheSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgYS5zb3J0KHRoaXMuc2V0dGluZ3Muc29ydCk7XG4gICAgdGhpcy5pbnNlcnRUb0dhbGxlcnkoYSk7XG4gICAgcmV0dXJuIGE7XG4gIH07XG4gIFxuICAvKipcbiAgICogUmVzZXQgdGhlIGZpbHRlcnMgcmVtb3ZpbmcgdGhlICdqZy1maWx0ZXJlZCcgY2xhc3MgZnJvbSBhbGwgdGhlIGVudHJpZXNcbiAgICpcbiAgICogQHBhcmFtIGEgdGhlIGFycmF5IHRvIHJlc2V0XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5yZXNldEZpbHRlcnMgPSBmdW5jdGlvbiAoYSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykgJChhW2ldKS5yZW1vdmVDbGFzcygnamctZmlsdGVyZWQnKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBGaWx0ZXIgdGhlIGVudHJpZXMgY29uc2lkZXJpbmcgdGhlaXJzIGNsYXNzZXMgKGlmIGEgc3RyaW5nIGhhcyBiZWVuIHBhc3NlZCkgb3IgdXNpbmcgYSBmdW5jdGlvbiBmb3IgZmlsdGVyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gYSB0aGUgYXJyYXkgdG8gZmlsdGVyXG4gICAqIEByZXR1cm4gdGhlIGZpbHRlcmVkIGFycmF5XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5maWx0ZXJBcnJheSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcbiAgICBpZiAoJC50eXBlKHNldHRpbmdzLmZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBGaWx0ZXIgb25seSBrZWVwaW5nIHRoZSBlbnRyaWVzIHBhc3NlZCBpbiB0aGUgc3RyaW5nXG4gICAgICByZXR1cm4gYS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciAkZWwgPSAkKGVsKTtcbiAgICAgICAgaWYgKCRlbC5pcyhzZXR0aW5ncy5maWx0ZXIpKSB7XG4gICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdqZy1maWx0ZXJlZCcpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbC5hZGRDbGFzcygnamctZmlsdGVyZWQnKS5yZW1vdmVDbGFzcygnamctdmlzaWJsZScpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICgkLmlzRnVuY3Rpb24oc2V0dGluZ3MuZmlsdGVyKSkge1xuICAgICAgLy8gRmlsdGVyIHVzaW5nIHRoZSBwYXNzZWQgZnVuY3Rpb25cbiAgICAgIHZhciBmaWx0ZXJlZEFyciA9IGEuZmlsdGVyKHNldHRpbmdzLmZpbHRlcik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGZpbHRlcmVkQXJyLmluZGV4T2YoYVtpXSkgPT09IC0xKSB7XG4gICAgICAgICAgJChhW2ldKS5hZGRDbGFzcygnamctZmlsdGVyZWQnKS5yZW1vdmVDbGFzcygnamctdmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoYVtpXSkucmVtb3ZlQ2xhc3MoJ2pnLWZpbHRlcmVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmaWx0ZXJlZEFycjtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogUmV2ZXJ0IHRoZSBpbWFnZSBzcmMgdG8gdGhlIGRlZmF1bHQgdmFsdWUuXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5yZXNldEltZ1NyYyA9IGZ1bmN0aW9uICgkaW1nKSB7XG4gICAgaWYgKCRpbWcuZGF0YSgnamcub3JpZ2luYWxTcmNMb2MnKSA9PT0gJ3NyYycpIHtcbiAgICAgICRpbWcuYXR0cignc3JjJywgJGltZy5kYXRhKCdqZy5vcmlnaW5hbFNyYycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGltZy5hdHRyKCdzcmMnLCAnJyk7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIEp1c3RpZmllZCBHYWxsZXJ5IGluc3RhbmNlLlxuICAgKlxuICAgKiBJdCBjbGVhcnMgYWxsIHRoZSBjc3MgcHJvcGVydGllcyBhZGRlZCBpbiB0aGUgc3R5bGUgYXR0cmlidXRlcy4gV2UgZG9lc24ndCBiYWNrdXAgdGhlIG9yaWdpbmFsXG4gICAqIHZhbHVlcyBmb3IgdGhvc2UgY3NzIGF0dHJpYnV0ZXMsIGJlY2F1c2UgaXQgY29zdHMgKHBlcmZvcm1hbmNlKSBhbmQgYmVjYXVzZSBpbiBnZW5lcmFsIG9uZVxuICAgKiBzaG91bGRuJ3QgdXNlIHRoZSBzdHlsZSBhdHRyaWJ1dGUgZm9yIGFuIHVuaWZvcm0gc2V0IG9mIGltYWdlcyAod2hlcmUgd2Ugc3VwcG9zZSB0aGUgdXNlIG9mXG4gICAqIGNsYXNzZXMpLiBDcmVhdGluZyBhIGJhY2t1cCBpcyBhbHNvIGRpZmZpY3VsdCBiZWNhdXNlIEpHIGNvdWxkIGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBhbmRcbiAgICogd2l0aCBkaWZmZXJlbnQgc3R5bGUgYXR0cmlidXRlcy5cbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNoZWNrV2lkdGhJbnRlcnZhbElkKTtcbiAgICB0aGlzLnN0b3BJbWdBbmFseXplclN0YXJ0ZXIoKTtcbiAgXG4gICAgLy8gR2V0IGZyZXNoIGVudHJpZXMgbGlzdCBzaW5jZSBmaWx0ZXJlZCBlbnRyaWVzIGFyZSBhYnNlbnQgaW4gYHRoaXMuZW50cmllc2BcbiAgICAkLmVhY2godGhpcy5nZXRBbGxFbnRyaWVzKCksICQucHJveHkoZnVuY3Rpb24gKF8sIGVudHJ5KSB7XG4gICAgICB2YXIgJGVudHJ5ID0gJChlbnRyeSk7XG4gIFxuICAgICAgLy8gUmVzZXQgZW50cnkgc3R5bGVcbiAgICAgICRlbnRyeS5jc3MoJ3dpZHRoJywgJycpO1xuICAgICAgJGVudHJ5LmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgJGVudHJ5LmNzcygndG9wJywgJycpO1xuICAgICAgJGVudHJ5LmNzcygnbGVmdCcsICcnKTtcbiAgICAgICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnLCB1bmRlZmluZWQpO1xuICAgICAgJGVudHJ5LnJlbW92ZUNsYXNzKCdqZy1lbnRyeSBqZy1maWx0ZXJlZCBqZy1lbnRyeS12aXNpYmxlJyk7XG4gIFxuICAgICAgLy8gUmVzZXQgaW1hZ2Ugc3R5bGVcbiAgICAgIHZhciAkaW1nID0gdGhpcy5pbWdGcm9tRW50cnkoJGVudHJ5KTtcbiAgICAgIGlmICgkaW1nKSB7XG4gICAgICAgICRpbWcuY3NzKCd3aWR0aCcsICcnKTtcbiAgICAgICAgJGltZy5jc3MoJ2hlaWdodCcsICcnKTtcbiAgICAgICAgJGltZy5jc3MoJ21hcmdpbi1sZWZ0JywgJycpO1xuICAgICAgICAkaW1nLmNzcygnbWFyZ2luLXRvcCcsICcnKTtcbiAgICAgICAgdGhpcy5yZXNldEltZ1NyYygkaW1nKTtcbiAgICAgICAgJGltZy5kYXRhKCdqZy5vcmlnaW5hbFNyYycsIHVuZGVmaW5lZCk7XG4gICAgICAgICRpbWcuZGF0YSgnamcub3JpZ2luYWxTcmNMb2MnLCB1bmRlZmluZWQpO1xuICAgICAgICAkaW1nLmRhdGEoJ2pnLnNyYycsIHVuZGVmaW5lZCk7XG4gICAgICB9XG4gIFxuICAgICAgLy8gUmVtb3ZlIGNhcHRpb25cbiAgICAgIHRoaXMucmVtb3ZlQ2FwdGlvbkV2ZW50c0hhbmRsZXJzKCRlbnRyeSk7XG4gICAgICB2YXIgJGNhcHRpb24gPSB0aGlzLmNhcHRpb25Gcm9tRW50cnkoJGVudHJ5KTtcbiAgICAgIGlmICgkZW50cnkuZGF0YSgnamcuY3JlYXRlZENhcHRpb24nKSkge1xuICAgICAgICAvLyByZW1vdmUgYWxzbyB0aGUgY2FwdGlvbiBlbGVtZW50IChpZiBjcmVhdGVkIGJ5IGpnKVxuICAgICAgICAkZW50cnkuZGF0YSgnamcuY3JlYXRlZENhcHRpb24nLCB1bmRlZmluZWQpO1xuICAgICAgICBpZiAoJGNhcHRpb24gIT09IG51bGwpICRjYXB0aW9uLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCRjYXB0aW9uICE9PSBudWxsKSAkY2FwdGlvbi5mYWRlVG8oMCwgMSk7XG4gICAgICB9XG4gIFxuICAgIH0sIHRoaXMpKTtcbiAgXG4gICAgdGhpcy4kZ2FsbGVyeS5jc3MoJ2hlaWdodCcsICcnKTtcbiAgICB0aGlzLiRnYWxsZXJ5LnJlbW92ZUNsYXNzKCdqdXN0aWZpZWQtZ2FsbGVyeScpO1xuICAgIHRoaXMuJGdhbGxlcnkuZGF0YSgnamcuY29udHJvbGxlcicsIHVuZGVmaW5lZCk7XG4gICAgdGhpcy5zZXR0aW5ncy50cmlnZ2VyRXZlbnQuY2FsbCh0aGlzLCAnamcuZGVzdHJveScpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEFuYWx5emUgdGhlIGltYWdlcyBhbmQgYnVpbGRzIHRoZSByb3dzLiBJdCByZXR1cm5zIGlmIGl0IGZvdW5kIGFuIGltYWdlIHRoYXQgaXMgbm90IGxvYWRlZC5cbiAgICpcbiAgICogQHBhcmFtIGlzRm9yUmVzaXplIGlmIHRoZSBpbWFnZSBhbmFseXplciBpcyBjYWxsZWQgZm9yIHJlc2l6aW5nIG9yIG5vdCwgdG8gY2FsbCBhIGRpZmZlcmVudCBjYWxsYmFjayBhdCB0aGUgZW5kXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5hbmFseXplSW1hZ2VzID0gZnVuY3Rpb24gKGlzRm9yUmVzaXplKSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMubGFzdEFuYWx5emVkSW5kZXggKyAxOyBpIDwgdGhpcy5lbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgJGVudHJ5ID0gJCh0aGlzLmVudHJpZXNbaV0pO1xuICAgICAgaWYgKCRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnKSA9PT0gdHJ1ZSB8fCAkZW50cnkuZGF0YSgnamcubG9hZGVkJykgPT09ICdza2lwcGVkJykge1xuICAgICAgICB2YXIgYXZhaWxhYmxlV2lkdGggPSB0aGlzLmdhbGxlcnlXaWR0aCAtIDIgKiB0aGlzLmJvcmRlciAtIChcbiAgICAgICAgICAodGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGggLSAxKSAqIHRoaXMuc2V0dGluZ3MubWFyZ2lucyk7XG4gICAgICAgIHZhciBpbWdBc3BlY3RSYXRpbyA9ICRlbnRyeS5kYXRhKCdqZy53aWR0aCcpIC8gJGVudHJ5LmRhdGEoJ2pnLmhlaWdodCcpO1xuICBcbiAgICAgICAgdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5wdXNoKCRlbnRyeSk7XG4gICAgICAgIHRoaXMuYnVpbGRpbmdSb3cuYXNwZWN0UmF0aW8gKz0gaW1nQXNwZWN0UmF0aW87XG4gICAgICAgIHRoaXMuYnVpbGRpbmdSb3cud2lkdGggKz0gaW1nQXNwZWN0UmF0aW8gKiB0aGlzLnNldHRpbmdzLnJvd0hlaWdodDtcbiAgICAgICAgdGhpcy5sYXN0QW5hbHl6ZWRJbmRleCA9IGk7XG4gIFxuICAgICAgICBpZiAoYXZhaWxhYmxlV2lkdGggLyAodGhpcy5idWlsZGluZ1Jvdy5hc3BlY3RSYXRpbyArIGltZ0FzcGVjdFJhdGlvKSA8IHRoaXMuc2V0dGluZ3Mucm93SGVpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5mbHVzaFJvdyhmYWxzZSwgdGhpcy5zZXR0aW5ncy5tYXhSb3dzQ291bnQgPiAwICYmIHRoaXMucm93cyA9PT0gdGhpcy5zZXR0aW5ncy5tYXhSb3dzQ291bnQpO1xuICBcbiAgICAgICAgICBpZiAoKyt0aGlzLnlpZWxkLmZsdXNoZWQgPj0gdGhpcy55aWVsZC5ldmVyeSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydEltZ0FuYWx5emVyKGlzRm9yUmVzaXplKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcpICE9PSAnZXJyb3InKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIC8vIExhc3Qgcm93IGZsdXNoICh0aGUgcm93IGlzIG5vdCBmdWxsKVxuICAgIGlmICh0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmx1c2hSb3codHJ1ZSwgdGhpcy5zZXR0aW5ncy5tYXhSb3dzQ291bnQgPiAwICYmIHRoaXMucm93cyA9PT0gdGhpcy5zZXR0aW5ncy5tYXhSb3dzQ291bnQpO1xuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMuaXNTcGlubmVyQWN0aXZlKCkpIHtcbiAgICAgIHRoaXMuc3RvcExvYWRpbmdTcGlubmVyQW5pbWF0aW9uKCk7XG4gICAgfVxuICBcbiAgICAvKiBTdG9wLCBpZiB0aGVyZSBpcywgdGhlIHRpbWVvdXQgdG8gc3RhcnQgdGhlIGFuYWx5emVJbWFnZXMuXG4gICAgIFRoaXMgaXMgYmVjYXVzZSBhbiBpbWFnZSBjYW4gYmUgc2V0IGxvYWRlZCwgYW5kIHRoZSB0aW1lb3V0IGNhbiBiZSBzZXQsXG4gICAgIGJ1dCB0aGlzIGltYWdlIGNhbiBiZSBhbmFseXplZCB5ZXQuXG4gICAgICovXG4gICAgdGhpcy5zdG9wSW1nQW5hbHl6ZXJTdGFydGVyKCk7XG4gIFxuICAgIHRoaXMuc2V0R2FsbGVyeUZpbmFsSGVpZ2h0KHRoaXMuZ2FsbGVyeUhlaWdodFRvU2V0KTtcbiAgICBcbiAgICAvL09uIGNvbXBsZXRlIGNhbGxiYWNrXG4gICAgdGhpcy5zZXR0aW5ncy50cmlnZ2VyRXZlbnQuY2FsbCh0aGlzLCBpc0ZvclJlc2l6ZSA/ICdqZy5yZXNpemUnIDogJ2pnLmNvbXBsZXRlJyk7XG4gIH07XG4gIFxuICAvKipcbiAgICogU3RvcHMgYW55IEltZ0FuYWx5emVyIHN0YXJ0ZXIgKHRoYXQgaGFzIGFuIGFzc2lnbmVkIHRpbWVvdXQpXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zdG9wSW1nQW5hbHl6ZXJTdGFydGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMueWllbGQuZmx1c2hlZCA9IDA7XG4gICAgaWYgKHRoaXMuaW1nQW5hbHl6ZXJUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5pbWdBbmFseXplclRpbWVvdXQpO1xuICAgICAgdGhpcy5pbWdBbmFseXplclRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIGltYWdlIGFuYWx5emVyLiBJdCBpcyBub3QgaW1tZWRpYXRlbHkgY2FsbGVkIHRvIGxldCB0aGUgYnJvd3NlciB0byB1cGRhdGUgdGhlIHZpZXdcbiAgICpcbiAgICogQHBhcmFtIGlzRm9yUmVzaXplIHNwZWNpZmllcyBpZiB0aGUgaW1hZ2UgYW5hbHl6ZXIgbXVzdCBiZSBjYWxsZWQgZm9yIHJlc2l6aW5nIG9yIG5vdFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc3RhcnRJbWdBbmFseXplciA9IGZ1bmN0aW9uIChpc0ZvclJlc2l6ZSkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGlzLnN0b3BJbWdBbmFseXplclN0YXJ0ZXIoKTtcbiAgICB0aGlzLmltZ0FuYWx5emVyVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC5hbmFseXplSW1hZ2VzKGlzRm9yUmVzaXplKTtcbiAgICB9LCAwLjAwMSk7IC8vIHdlIGNhbid0IHN0YXJ0IGl0IGltbWVkaWF0ZWx5IGR1ZSB0byBhIElFIGRpZmZlcmVudCBiZWhhdmlvdXJcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGltYWdlIGlzIGxvYWRlZCBvciBub3QgdXNpbmcgYW5vdGhlciBpbWFnZSBvYmplY3QuIFdlIGNhbm5vdCB1c2UgdGhlICdjb21wbGV0ZScgaW1hZ2UgcHJvcGVydHksXG4gICAqIGJlY2F1c2Ugc29tZSBicm93c2Vycywgd2l0aCBhIDQwNCBzZXQgY29tcGxldGUgPSB0cnVlLlxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VTcmMgdGhlIGltYWdlIHNyYyB0byBsb2FkXG4gICAqIEBwYXJhbSBvbkxvYWQgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgaW1hZ2UgaGFzIGJlZW4gbG9hZGVkXG4gICAqIEBwYXJhbSBvbkVycm9yIGNhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIGluIGNhc2Ugb2YgYW4gZXJyb3JcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLm9uSW1hZ2VFdmVudCA9IGZ1bmN0aW9uIChpbWFnZVNyYywgb25Mb2FkLCBvbkVycm9yKSB7XG4gICAgaWYgKCFvbkxvYWQgJiYgIW9uRXJyb3IpIHJldHVybjtcbiAgXG4gICAgdmFyIG1lbUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgdmFyICRtZW1JbWFnZSA9ICQobWVtSW1hZ2UpO1xuICAgIGlmIChvbkxvYWQpIHtcbiAgICAgICRtZW1JbWFnZS5vbmUoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtZW1JbWFnZS5vZmYoJ2xvYWQgZXJyb3InKTtcbiAgICAgICAgb25Mb2FkKG1lbUltYWdlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAob25FcnJvcikge1xuICAgICAgJG1lbUltYWdlLm9uZSgnZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRtZW1JbWFnZS5vZmYoJ2xvYWQgZXJyb3InKTtcbiAgICAgICAgb25FcnJvcihtZW1JbWFnZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgbWVtSW1hZ2Uuc3JjID0gaW1hZ2VTcmM7XG4gIH07XG4gIFxuICAvKipcbiAgICogSW5pdCBvZiBKdXN0aWZpZWQgR2FsbGVyeSBjb250cm9sbGVkXG4gICAqIEl0IGFuYWx5emVzIGFsbCB0aGUgZW50cmllcyBzdGFydGluZyB0aGVpcnMgbG9hZGluZyBhbmQgY2FsbGluZyB0aGUgaW1hZ2UgYW5hbHl6ZXIgKHRoYXQgd29ya3Mgd2l0aCBsb2FkZWQgaW1hZ2VzKVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW1hZ2VzVG9Mb2FkID0gZmFsc2UsIHNraXBwZWRJbWFnZXMgPSBmYWxzZSwgdGhhdCA9IHRoaXM7XG4gICAgJC5lYWNoKHRoaXMuZW50cmllcywgZnVuY3Rpb24gKGluZGV4LCBlbnRyeSkge1xuICAgICAgdmFyICRlbnRyeSA9ICQoZW50cnkpO1xuICAgICAgdmFyICRpbWFnZSA9IHRoYXQuaW1nRnJvbUVudHJ5KCRlbnRyeSk7XG4gIFxuICAgICAgJGVudHJ5LmFkZENsYXNzKCdqZy1lbnRyeScpO1xuICBcbiAgICAgIGlmICgkZW50cnkuZGF0YSgnamcubG9hZGVkJykgIT09IHRydWUgJiYgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcpICE9PSAnc2tpcHBlZCcpIHtcbiAgXG4gICAgICAgIC8vIExpbmsgUmVsIGdsb2JhbCBvdmVyd3JpdGVcbiAgICAgICAgaWYgKHRoYXQuc2V0dGluZ3MucmVsICE9PSBudWxsKSAkZW50cnkuYXR0cigncmVsJywgdGhhdC5zZXR0aW5ncy5yZWwpO1xuICBcbiAgICAgICAgLy8gTGluayBUYXJnZXQgZ2xvYmFsIG92ZXJ3cml0ZVxuICAgICAgICBpZiAodGhhdC5zZXR0aW5ncy50YXJnZXQgIT09IG51bGwpICRlbnRyeS5hdHRyKCd0YXJnZXQnLCB0aGF0LnNldHRpbmdzLnRhcmdldCk7XG4gIFxuICAgICAgICBpZiAoJGltYWdlICE9PSBudWxsKSB7XG4gIFxuICAgICAgICAgIC8vIEltYWdlIHNyY1xuICAgICAgICAgIHZhciBpbWFnZVNyYyA9IHRoYXQuZXh0cmFjdEltZ1NyY0Zyb21JbWFnZSgkaW1hZ2UpO1xuICBcbiAgICAgICAgICAvKiBJZiB3ZSBoYXZlIHRoZSBoZWlnaHQgYW5kIHRoZSB3aWR0aCwgd2UgZG9uJ3Qgd2FpdCB0aGF0IHRoZSBpbWFnZSBpcyBsb2FkZWQsIFxuICAgICAgICAgICAgIGJ1dCB3ZSBzdGFydCBkaXJlY3RseSB3aXRoIHRoZSBqdXN0aWZpY2F0aW9uICovXG4gICAgICAgICAgaWYgKHRoYXQuc2V0dGluZ3Mud2FpdFRodW1ibmFpbHNMb2FkID09PSBmYWxzZSB8fCAhaW1hZ2VTcmMpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlRmxvYXQoJGltYWdlLmF0dHIoJ3dpZHRoJykpO1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHBhcnNlRmxvYXQoJGltYWdlLmF0dHIoJ2hlaWdodCcpKTtcbiAgICAgICAgICAgIGlmICgkaW1hZ2UucHJvcCgndGFnTmFtZScpID09PSAnc3ZnJykge1xuICAgICAgICAgICAgICB3aWR0aCA9IHBhcnNlRmxvYXQoJGltYWdlWzBdLmdldEJCb3goKS53aWR0aCk7XG4gICAgICAgICAgICAgIGhlaWdodCA9IHBhcnNlRmxvYXQoJGltYWdlWzBdLmdldEJCb3goKS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc05hTih3aWR0aCkgJiYgIWlzTmFOKGhlaWdodCkpIHtcbiAgICAgICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLndpZHRoJywgd2lkdGgpO1xuICAgICAgICAgICAgICAkZW50cnkuZGF0YSgnamcuaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcsICdza2lwcGVkJyk7XG4gICAgICAgICAgICAgIHNraXBwZWRJbWFnZXMgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGF0LnN0YXJ0SW1nQW5hbHl6ZXIoZmFsc2UpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gIFxuICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnLCBmYWxzZSk7XG4gICAgICAgICAgaW1hZ2VzVG9Mb2FkID0gdHJ1ZTtcbiAgXG4gICAgICAgICAgLy8gU3Bpbm5lciBzdGFydFxuICAgICAgICAgIGlmICghdGhhdC5pc1NwaW5uZXJBY3RpdmUoKSkgdGhhdC5zdGFydExvYWRpbmdTcGlubmVyQW5pbWF0aW9uKCk7XG4gIFxuICAgICAgICAgIHRoYXQub25JbWFnZUV2ZW50KGltYWdlU3JjLCBmdW5jdGlvbiAobG9hZEltZykgeyAvLyBpbWFnZSBsb2FkZWRcbiAgICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy53aWR0aCcsIGxvYWRJbWcud2lkdGgpO1xuICAgICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmhlaWdodCcsIGxvYWRJbWcuaGVpZ2h0KTtcbiAgICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIHRoYXQuc3RhcnRJbWdBbmFseXplcihmYWxzZSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyAvLyBpbWFnZSBsb2FkIGVycm9yXG4gICAgICAgICAgICAkZW50cnkuZGF0YSgnamcubG9hZGVkJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICB0aGF0LnN0YXJ0SW1nQW5hbHl6ZXIoZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZW50cnkuZGF0YSgnamcubG9hZGVkJywgdHJ1ZSk7XG4gICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLndpZHRoJywgJGVudHJ5LndpZHRoKCkgfCBwYXJzZUZsb2F0KCRlbnRyeS5jc3MoJ3dpZHRoJykpIHwgMSk7XG4gICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmhlaWdodCcsICRlbnRyeS5oZWlnaHQoKSB8IHBhcnNlRmxvYXQoJGVudHJ5LmNzcygnaGVpZ2h0JykpIHwgMSk7XG4gICAgICAgIH1cbiAgXG4gICAgICB9XG4gIFxuICAgIH0pO1xuICBcbiAgICBpZiAoIWltYWdlc1RvTG9hZCAmJiAhc2tpcHBlZEltYWdlcykgdGhpcy5zdGFydEltZ0FuYWx5emVyKGZhbHNlKTtcbiAgICB0aGlzLmNoZWNrV2lkdGgoKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBDaGVja3MgdGhhdCBpdCBpcyBhIHZhbGlkIG51bWJlci4gSWYgYSBzdHJpbmcgaXMgcGFzc2VkIGl0IGlzIGNvbnZlcnRlZCB0byBhIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0gc2V0dGluZ0NvbnRhaW5lciB0aGUgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHNldHRpbmcgKHRvIGFsbG93IHRoZSBjb252ZXJzaW9uKVxuICAgKiBAcGFyYW0gc2V0dGluZ05hbWUgdGhlIHNldHRpbmcgbmFtZVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuY2hlY2tPckNvbnZlcnROdW1iZXIgPSBmdW5jdGlvbiAoc2V0dGluZ0NvbnRhaW5lciwgc2V0dGluZ05hbWUpIHtcbiAgICBpZiAoJC50eXBlKHNldHRpbmdDb250YWluZXJbc2V0dGluZ05hbWVdKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHNldHRpbmdDb250YWluZXJbc2V0dGluZ05hbWVdID0gcGFyc2VGbG9hdChzZXR0aW5nQ29udGFpbmVyW3NldHRpbmdOYW1lXSk7XG4gICAgfVxuICBcbiAgICBpZiAoJC50eXBlKHNldHRpbmdDb250YWluZXJbc2V0dGluZ05hbWVdKSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlmIChpc05hTihzZXR0aW5nQ29udGFpbmVyW3NldHRpbmdOYW1lXSkpIHRocm93ICdpbnZhbGlkIG51bWJlciBmb3IgJyArIHNldHRpbmdOYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBzZXR0aW5nTmFtZSArICcgbXVzdCBiZSBhIG51bWJlcic7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgc2l6ZVJhbmdlU3VmZml4ZXMgYW5kLCBpZiBuZWNlc3NhcnksIGNvbnZlcnRzXG4gICAqIGl0cyBrZXlzIGZyb20gc3RyaW5nIChlLmcuIG9sZCBzZXR0aW5ncyB3aXRoICdsdDEwMCcpIHRvIGludC5cbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmNoZWNrU2l6ZVJhbmdlc1N1ZmZpeGVzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICgkLnR5cGUodGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlcykgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyAnc2l6ZVJhbmdlU3VmZml4ZXMgbXVzdCBiZSBkZWZpbmVkIGFuZCBtdXN0IGJlIGFuIG9iamVjdCc7XG4gICAgfVxuICBcbiAgICB2YXIgc3VmZml4UmFuZ2VzID0gW107XG4gICAgZm9yICh2YXIgcmFuZ2VJZHggaW4gdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlcykge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXMuaGFzT3duUHJvcGVydHkocmFuZ2VJZHgpKSBzdWZmaXhSYW5nZXMucHVzaChyYW5nZUlkeCk7XG4gICAgfVxuICBcbiAgICB2YXIgbmV3U2l6ZVJuZ1N1ZmZpeGVzID0geyAwOiAnJyB9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3VmZml4UmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoJC50eXBlKHN1ZmZpeFJhbmdlc1tpXSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIG51bUlkeCA9IHBhcnNlSW50KHN1ZmZpeFJhbmdlc1tpXS5yZXBsYWNlKC9eW2Etel0rLywgJycpLCAxMCk7XG4gICAgICAgICAgbmV3U2l6ZVJuZ1N1ZmZpeGVzW251bUlkeF0gPSB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzW3N1ZmZpeFJhbmdlc1tpXV07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyAnc2l6ZVJhbmdlU3VmZml4ZXMga2V5cyBtdXN0IGNvbnRhaW5zIGNvcnJlY3QgbnVtYmVycyAoJyArIGUgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1NpemVSbmdTdWZmaXhlc1tzdWZmaXhSYW5nZXNbaV1dID0gdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlc1tzdWZmaXhSYW5nZXNbaV1dO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlcyA9IG5ld1NpemVSbmdTdWZmaXhlcztcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBjaGVjayBhbmQgY29udmVydCB0aGUgbWF4Um93SGVpZ2h0IHNldHRpbmdcbiAgICogcmVxdWlyZXMgcm93SGVpZ2h0IHRvIGJlIGFscmVhZHkgc2V0XG4gICAqIFRPRE86IHNob3VsZCBiZSBhbHdheXMgY2FsbGVkIHdoZW4gb25seSByb3dIZWlnaHQgaXMgY2hhbmdlZFxuICAgKiBAcmV0dXJuIG51bWJlciBvciBudWxsXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5yZXRyaWV2ZU1heFJvd0hlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3TWF4Um93SGVpZ2h0ID0gbnVsbDtcbiAgICB2YXIgcm93SGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5yb3dIZWlnaHQ7XG4gIFxuICAgIGlmICgkLnR5cGUodGhpcy5zZXR0aW5ncy5tYXhSb3dIZWlnaHQpID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubWF4Um93SGVpZ2h0Lm1hdGNoKC9eWzAtOV0rJSQvKSkge1xuICAgICAgICBuZXdNYXhSb3dIZWlnaHQgPSByb3dIZWlnaHQgKiBwYXJzZUZsb2F0KHRoaXMuc2V0dGluZ3MubWF4Um93SGVpZ2h0Lm1hdGNoKC9eKFswLTldKyklJC8pWzFdKSAvIDEwMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld01heFJvd0hlaWdodCA9IHBhcnNlRmxvYXQodGhpcy5zZXR0aW5ncy5tYXhSb3dIZWlnaHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJC50eXBlKHRoaXMuc2V0dGluZ3MubWF4Um93SGVpZ2h0KSA9PT0gJ251bWJlcicpIHtcbiAgICAgIG5ld01heFJvd0hlaWdodCA9IHRoaXMuc2V0dGluZ3MubWF4Um93SGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5tYXhSb3dIZWlnaHQgPT09IGZhbHNlIHx8IHRoaXMuc2V0dGluZ3MubWF4Um93SGVpZ2h0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyAnbWF4Um93SGVpZ2h0IG11c3QgYmUgYSBudW1iZXIgb3IgYSBwZXJjZW50YWdlJztcbiAgICB9XG4gIFxuICAgIC8vIGNoZWNrIGlmIHRoZSBjb252ZXJ0ZWQgdmFsdWUgaXMgbm90IGEgbnVtYmVyXG4gICAgaWYgKGlzTmFOKG5ld01heFJvd0hlaWdodCkpIHRocm93ICdpbnZhbGlkIG51bWJlciBmb3IgbWF4Um93SGVpZ2h0JztcbiAgXG4gICAgLy8gY2hlY2sgdmFsdWVzLCBtYXhSb3dIZWlnaHQgbXVzdCBiZSA+PSByb3dIZWlnaHRcbiAgICBpZiAobmV3TWF4Um93SGVpZ2h0IDwgcm93SGVpZ2h0KSBuZXdNYXhSb3dIZWlnaHQgPSByb3dIZWlnaHQ7XG4gIFxuICAgIHJldHVybiBuZXdNYXhSb3dIZWlnaHQ7XG4gIH07XG4gIFxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBzZXR0aW5nc1xuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuY2hlY2tTZXR0aW5ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNoZWNrU2l6ZVJhbmdlc1N1ZmZpeGVzKCk7XG4gIFxuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncywgJ3Jvd0hlaWdodCcpO1xuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncywgJ21hcmdpbnMnKTtcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MsICdib3JkZXInKTtcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MsICdtYXhSb3dzQ291bnQnKTtcbiAgXG4gICAgdmFyIGxhc3RSb3dNb2RlcyA9IFtcbiAgICAgICdqdXN0aWZ5JyxcbiAgICAgICdub2p1c3RpZnknLFxuICAgICAgJ2xlZnQnLFxuICAgICAgJ2NlbnRlcicsXG4gICAgICAncmlnaHQnLFxuICAgICAgJ2hpZGUnXG4gICAgXTtcbiAgICBpZiAobGFzdFJvd01vZGVzLmluZGV4T2YodGhpcy5zZXR0aW5ncy5sYXN0Um93KSA9PT0gLTEpIHtcbiAgICAgIHRocm93ICdsYXN0Um93IG11c3QgYmUgb25lIG9mOiAnICsgbGFzdFJvd01vZGVzLmpvaW4oJywgJyk7XG4gICAgfVxuICBcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MsICdqdXN0aWZ5VGhyZXNob2xkJyk7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuanVzdGlmeVRocmVzaG9sZCA8IDAgfHwgdGhpcy5zZXR0aW5ncy5qdXN0aWZ5VGhyZXNob2xkID4gMSkge1xuICAgICAgdGhyb3cgJ2p1c3RpZnlUaHJlc2hvbGQgbXVzdCBiZSBpbiB0aGUgaW50ZXJ2YWwgWzAsMV0nO1xuICAgIH1cbiAgICBpZiAoJC50eXBlKHRoaXMuc2V0dGluZ3MuY3NzQW5pbWF0aW9uKSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyAnY3NzQW5pbWF0aW9uIG11c3QgYmUgYSBib29sZWFuJztcbiAgICB9XG4gIFxuICAgIGlmICgkLnR5cGUodGhpcy5zZXR0aW5ncy5jYXB0aW9ucykgIT09ICdib29sZWFuJykgdGhyb3cgJ2NhcHRpb25zIG11c3QgYmUgYSBib29sZWFuJztcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLCAnYW5pbWF0aW9uRHVyYXRpb24nKTtcbiAgXG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncywgJ3Zpc2libGVPcGFjaXR5Jyk7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLnZpc2libGVPcGFjaXR5IDwgMCB8fFxuICAgICAgdGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3MudmlzaWJsZU9wYWNpdHkgPiAxKSB7XG4gICAgICB0aHJvdyAnY2FwdGlvblNldHRpbmdzLnZpc2libGVPcGFjaXR5IG11c3QgYmUgaW4gdGhlIGludGVydmFsIFswLCAxXSc7XG4gICAgfVxuICBcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLCAnbm9uVmlzaWJsZU9wYWNpdHknKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3Mubm9uVmlzaWJsZU9wYWNpdHkgPCAwIHx8XG4gICAgICB0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy5ub25WaXNpYmxlT3BhY2l0eSA+IDEpIHtcbiAgICAgIHRocm93ICdjYXB0aW9uU2V0dGluZ3Mubm9uVmlzaWJsZU9wYWNpdHkgbXVzdCBiZSBpbiB0aGUgaW50ZXJ2YWwgWzAsIDFdJztcbiAgICB9XG4gIFxuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncywgJ2ltYWdlc0FuaW1hdGlvbkR1cmF0aW9uJyk7XG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLCAncmVmcmVzaFRpbWUnKTtcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MsICdyZWZyZXNoU2Vuc2l0aXZpdHknKTtcbiAgICBpZiAoJC50eXBlKHRoaXMuc2V0dGluZ3MucmFuZG9taXplKSAhPT0gJ2Jvb2xlYW4nKSB0aHJvdyAncmFuZG9taXplIG11c3QgYmUgYSBib29sZWFuJztcbiAgICBpZiAoJC50eXBlKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpICE9PSAnc3RyaW5nJykgdGhyb3cgJ3NlbGVjdG9yIG11c3QgYmUgYSBzdHJpbmcnO1xuICBcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5zb3J0ICE9PSBmYWxzZSAmJiAhJC5pc0Z1bmN0aW9uKHRoaXMuc2V0dGluZ3Muc29ydCkpIHtcbiAgICAgIHRocm93ICdzb3J0IG11c3QgYmUgZmFsc2Ugb3IgYSBjb21wYXJpc29uIGZ1bmN0aW9uJztcbiAgICB9XG4gIFxuICAgIGlmICh0aGlzLnNldHRpbmdzLmZpbHRlciAhPT0gZmFsc2UgJiYgISQuaXNGdW5jdGlvbih0aGlzLnNldHRpbmdzLmZpbHRlcikgJiZcbiAgICAgICQudHlwZSh0aGlzLnNldHRpbmdzLmZpbHRlcikgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyAnZmlsdGVyIG11c3QgYmUgZmFsc2UsIGEgc3RyaW5nIG9yIGEgZmlsdGVyIGZ1bmN0aW9uJztcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogSXQgYnJpbmdzIGFsbCB0aGUgaW5kZXhlcyBmcm9tIHRoZSBzaXplUmFuZ2VTdWZmaXhlcyBhbmQgaXQgb3JkZXJzIHRoZW0uIFRoZXkgYXJlIHRoZW4gc29ydGVkIGFuZCByZXR1cm5lZC5cbiAgICogQHJldHVybnMge0FycmF5fSBzb3J0ZWQgc3VmZml4IHJhbmdlc1xuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucmV0cmlldmVTdWZmaXhSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN1ZmZpeFJhbmdlcyA9IFtdO1xuICAgIGZvciAodmFyIHJhbmdlSWR4IGluIHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXMpIHtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzLmhhc093blByb3BlcnR5KHJhbmdlSWR4KSkgc3VmZml4UmFuZ2VzLnB1c2gocGFyc2VJbnQocmFuZ2VJZHgsIDEwKSk7XG4gICAgfVxuICAgIHN1ZmZpeFJhbmdlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhID4gYiA/IDEgOiBhIDwgYiA/IC0xIDogMDsgfSk7XG4gICAgcmV0dXJuIHN1ZmZpeFJhbmdlcztcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGV4aXN0aW5nIHNldHRpbmdzIG9ubHkgY2hhbmdpbmcgc29tZSBvZiB0aGVtXG4gICAqXG4gICAqIEBwYXJhbSBuZXdTZXR0aW5ncyB0aGUgbmV3IHNldHRpbmdzIChvciBhIHN1Ymdyb3VwIG9mIHRoZW0pXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS51cGRhdGVTZXR0aW5ncyA9IGZ1bmN0aW9uIChuZXdTZXR0aW5ncykge1xuICAgIC8vIEluIHRoaXMgY2FzZSBKdXN0aWZpZWQgR2FsbGVyeSBoYXMgYmVlbiBjYWxsZWQgYWdhaW4gY2hhbmdpbmcgb25seSBzb21lIG9wdGlvbnNcbiAgICB0aGlzLnNldHRpbmdzID0gJC5leHRlbmQoe30sIHRoaXMuc2V0dGluZ3MsIG5ld1NldHRpbmdzKTtcbiAgICB0aGlzLmNoZWNrU2V0dGluZ3MoKTtcbiAgXG4gICAgLy8gQXMgcmVwb3J0ZWQgaW4gdGhlIHNldHRpbmdzOiBuZWdhdGl2ZSB2YWx1ZSA9IHNhbWUgYXMgbWFyZ2lucywgMCA9IGRpc2FibGVkXG4gICAgdGhpcy5ib3JkZXIgPSB0aGlzLnNldHRpbmdzLmJvcmRlciA+PSAwID8gdGhpcy5zZXR0aW5ncy5ib3JkZXIgOiB0aGlzLnNldHRpbmdzLm1hcmdpbnM7XG4gIFxuICAgIHRoaXMubWF4Um93SGVpZ2h0ID0gdGhpcy5yZXRyaWV2ZU1heFJvd0hlaWdodCgpO1xuICAgIHRoaXMuc3VmZml4UmFuZ2VzID0gdGhpcy5yZXRyaWV2ZVN1ZmZpeFJhbmdlcygpO1xuICB9O1xuICBcbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZGVmYXVsdHMgPSB7XG4gICAgc2l6ZVJhbmdlU3VmZml4ZXM6IHt9LCAvKiBlLmcuIEZsaWNrciBjb25maWd1cmF0aW9uXG4gICAgICAgIHtcbiAgICAgICAgICAxMDA6ICdfdCcsICAvLyB1c2VkIHdoZW4gbG9uZ2VzdCBpcyBsZXNzIHRoYW4gMTAwcHhcbiAgICAgICAgICAyNDA6ICdfbScsICAvLyB1c2VkIHdoZW4gbG9uZ2VzdCBpcyBiZXR3ZWVuIDEwMXB4IGFuZCAyNDBweFxuICAgICAgICAgIDMyMDogJ19uJywgIC8vIC4uLlxuICAgICAgICAgIDUwMDogJycsXG4gICAgICAgICAgNjQwOiAnX3onLFxuICAgICAgICAgIDEwMjQ6ICdfYicgIC8vIHVzZWQgYXMgZWxzZSBjYXNlIGJlY2F1c2UgaXQgaXMgdGhlIGxhc3RcbiAgICAgICAgfVxuICAgICovXG4gICAgdGh1bWJuYWlsUGF0aDogdW5kZWZpbmVkLCAvKiBJZiBkZWZpbmVkLCBzaXplUmFuZ2VTdWZmaXhlcyBpcyBub3QgdXNlZCwgYW5kIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZXRlcm1pbmUgdGhlXG4gICAgcGF0aCByZWxhdGl2ZSB0byBhIHNwZWNpZmljIHRodW1ibmFpbCBzaXplLiBUaGUgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCByZXNwZWN0aXZlbHkgdGhyZWUgYXJndW1lbnRzOlxuICAgIGN1cnJlbnQgcGF0aCwgd2lkdGggYW5kIGhlaWdodCAqL1xuICAgIHJvd0hlaWdodDogMTIwLCAvLyByZXF1aXJlZD8gcmVxdWlyZWQgdG8gYmUgPiAwP1xuICAgIG1heFJvd0hlaWdodDogZmFsc2UsIC8vIGZhbHNlIG9yIG5lZ2F0aXZlIHZhbHVlIHRvIGRlYWN0aXZhdGUuIFBvc2l0aXZlIG51bWJlciB0byBleHByZXNzIHRoZSB2YWx1ZSBpbiBwaXhlbHMsXG4gICAgLy8gQSBzdHJpbmcgJ1swLTldKyUnIHRvIGV4cHJlc3MgaW4gcGVyY2VudGFnZSAoZS5nLiAzMDAlIG1lYW5zIHRoYXQgdGhlIHJvdyBoZWlnaHRcbiAgICAvLyBjYW4ndCBleGNlZWQgMyAqIHJvd0hlaWdodClcbiAgICBtYXhSb3dzQ291bnQ6IDAsIC8vIG1heGltdW0gbnVtYmVyIG9mIHJvd3MgdG8gYmUgZGlzcGxheWVkICgwID0gZGlzYWJsZWQpXG4gICAgbWFyZ2luczogMSxcbiAgICBib3JkZXI6IC0xLCAvLyBuZWdhdGl2ZSB2YWx1ZSA9IHNhbWUgYXMgbWFyZ2lucywgMCA9IGRpc2FibGVkLCBhbnkgb3RoZXIgdmFsdWUgdG8gc2V0IHRoZSBib3JkZXJcbiAgXG4gICAgbGFzdFJvdzogJ25vanVzdGlmeScsIC8vIOKApiB3aGljaCBpcyB0aGUgc2FtZSBhcyAnbGVmdCcsIG9yIGNhbiBiZSAnanVzdGlmeScsICdjZW50ZXInLCAncmlnaHQnIG9yICdoaWRlJ1xuICBcbiAgICBqdXN0aWZ5VGhyZXNob2xkOiAwLjkwLCAvKiBpZiByb3cgd2lkdGggLyBhdmFpbGFibGUgc3BhY2UgPiAwLjkwIGl0IHdpbGwgYmUgYWx3YXlzIGp1c3RpZmllZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIChpLmUuIGxhc3RSb3cgc2V0dGluZyBpcyBub3QgY29uc2lkZXJlZCkgKi9cbiAgICB3YWl0VGh1bWJuYWlsc0xvYWQ6IHRydWUsXG4gICAgY2FwdGlvbnM6IHRydWUsXG4gICAgY3NzQW5pbWF0aW9uOiB0cnVlLFxuICAgIGltYWdlc0FuaW1hdGlvbkR1cmF0aW9uOiA1MDAsIC8vIGlnbm9yZWQgd2l0aCBjc3MgYW5pbWF0aW9uc1xuICAgIGNhcHRpb25TZXR0aW5nczogeyAvLyBpZ25vcmVkIHdpdGggY3NzIGFuaW1hdGlvbnNcbiAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiA1MDAsXG4gICAgICB2aXNpYmxlT3BhY2l0eTogMC43LFxuICAgICAgbm9uVmlzaWJsZU9wYWNpdHk6IDAuMFxuICAgIH0sXG4gICAgcmVsOiBudWxsLCAvLyByZXdyaXRlIHRoZSByZWwgb2YgZWFjaCBhbmFseXplZCBsaW5rc1xuICAgIHRhcmdldDogbnVsbCwgLy8gcmV3cml0ZSB0aGUgdGFyZ2V0IG9mIGFsbCBsaW5rc1xuICAgIGV4dGVuc2lvbjogL1xcLlteLlxcXFwvXSskLywgLy8gcmVnZXhwIHRvIGNhcHR1cmUgdGhlIGV4dGVuc2lvbiBvZiBhbiBpbWFnZVxuICAgIHJlZnJlc2hUaW1lOiAyMDAsIC8vIHRpbWUgaW50ZXJ2YWwgKGluIG1zKSB0byBjaGVjayBpZiB0aGUgcGFnZSBjaGFuZ2VzIGl0cyB3aWR0aFxuICAgIHJlZnJlc2hTZW5zaXRpdml0eTogMCwgLy8gY2hhbmdlIGluIHdpZHRoIGFsbG93ZWQgKGluIHB4KSB3aXRob3V0IHJlLWJ1aWxkaW5nIHRoZSBnYWxsZXJ5XG4gICAgcmFuZG9taXplOiBmYWxzZSxcbiAgICBydGw6IGZhbHNlLCAvLyByaWdodC10by1sZWZ0IG1vZGVcbiAgICBzb3J0OiBmYWxzZSwgLypcbiAgICAgIC0gZmFsc2U6IHRvIGRvIG5vdCBzb3J0XG4gICAgICAtIGZ1bmN0aW9uOiB0byBzb3J0IHRoZW0gdXNpbmcgdGhlIGZ1bmN0aW9uIGFzIGNvbXBhcmF0b3IgKHNlZSBBcnJheS5wcm90b3R5cGUuc29ydCgpKVxuICAgICovXG4gICAgZmlsdGVyOiBmYWxzZSwgLypcbiAgICAgIC0gZmFsc2UsIG51bGwgb3IgdW5kZWZpbmVkOiBmb3IgYSBkaXNhYmxlZCBmaWx0ZXJcbiAgICAgIC0gYSBzdHJpbmc6IGFuIGVudHJ5IGlzIGtlcHQgaWYgZW50cnkuaXMoZmlsdGVyIHN0cmluZykgcmV0dXJucyB0cnVlXG4gICAgICAgICAgICAgICAgICBzZWUgalF1ZXJ5J3MgLmlzKCkgZnVuY3Rpb24gZm9yIGZ1cnRoZXIgaW5mb3JtYXRpb25cbiAgICAgIC0gYSBmdW5jdGlvbjogaW52b2tlZCB3aXRoIGFyZ3VtZW50cyAoZW50cnksIGluZGV4LCBhcnJheSkuIFJldHVybiB0cnVlIHRvIGtlZXAgdGhlIGVudHJ5LCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAgICAgICAgICAgIEl0IGZvbGxvd3MgdGhlIHNwZWNpZmljYXRpb25zIG9mIHRoZSBBcnJheS5wcm90b3R5cGUuZmlsdGVyKCkgZnVuY3Rpb24gb2YgSmF2YVNjcmlwdC5cbiAgICAqL1xuICAgIHNlbGVjdG9yOiAnYScsIC8vIFRoZSBzZWxlY3RvciB0aGF0IGlzIHVzZWQgdG8ga25vdyB3aGF0IGFyZSB0aGUgZW50cmllcyBvZiB0aGUgZ2FsbGVyeVxuICAgIGltZ1NlbGVjdG9yOiAnPiBpbWcsID4gYSA+IGltZywgPiBzdmcsID4gYSA+IHN2ZycsIC8vIFRoZSBzZWxlY3RvciB0aGF0IGlzIHVzZWQgdG8ga25vdyB3aGF0IGFyZSB0aGUgaW1hZ2VzIG9mIGVhY2ggZW50cnlcbiAgICB0cmlnZ2VyRXZlbnQ6IGZ1bmN0aW9uIChldmVudCkgeyAvLyBUaGlzIGlzIGNhbGxlZCB0byB0cmlnZ2VyIGV2ZW50cywgdGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgdG8gY2FsbCAkLnRyaWdnZXJcbiAgICAgIHRoaXMuJGdhbGxlcnkudHJpZ2dlcihldmVudCk7ICAvLyBDb25zaWRlciB0aGF0ICd0aGlzJyBpcyB0aGlzIHNldCB0byB0aGUgSnVzdGlmaWVkR2FsbGVyeSBvYmplY3QsIHNvIGl0IGNhblxuICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFjY2VzcyB0byBmaWVsZHMgc3VjaCBhcyAkZ2FsbGVyeSwgdXNlZnVsIHRvIHRyaWdnZXIgZXZlbnRzIHdpdGggalF1ZXJ5LlxuICB9O1xuICBcblxuICAvKipcbiAgICogSnVzdGlmaWVkIEdhbGxlcnkgcGx1Z2luIGZvciBqUXVlcnlcbiAgICpcbiAgICogRXZlbnRzXG4gICAqICAtIGpnLmNvbXBsZXRlIDogY2FsbGVkIHdoZW4gYWxsIHRoZSBnYWxsZXJ5IGhhcyBiZWVuIGNyZWF0ZWRcbiAgICogIC0gamcucmVzaXplIDogY2FsbGVkIHdoZW4gdGhlIGdhbGxlcnkgaGFzIGJlZW4gcmVzaXplZFxuICAgKiAgLSBqZy5yb3dmbHVzaCA6IHdoZW4gYSBuZXcgcm93IGFwcGVhcnNcbiAgICpcbiAgICogQHBhcmFtIGFyZyB0aGUgYWN0aW9uIChvciB0aGUgc2V0dGluZ3MpIHBhc3NlZCB3aGVuIHRoZSBwbHVnaW4gaXMgY2FsbGVkXG4gICAqIEByZXR1cm5zIHsqfSB0aGUgb2JqZWN0IGl0c2VsZlxuICAgKi9cbiAgJC5mbi5qdXN0aWZpZWRHYWxsZXJ5ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBnYWxsZXJ5KSB7XG5cbiAgICAgIHZhciAkZ2FsbGVyeSA9ICQoZ2FsbGVyeSk7XG4gICAgICAkZ2FsbGVyeS5hZGRDbGFzcygnanVzdGlmaWVkLWdhbGxlcnknKTtcblxuICAgICAgdmFyIGNvbnRyb2xsZXIgPSAkZ2FsbGVyeS5kYXRhKCdqZy5jb250cm9sbGVyJyk7XG4gICAgICBpZiAodHlwZW9mIGNvbnRyb2xsZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIENyZWF0ZSBjb250cm9sbGVyIGFuZCBhc3NpZ24gaXQgdG8gdGhlIG9iamVjdCBkYXRhXG4gICAgICAgIGlmICh0eXBlb2YgYXJnICE9PSAndW5kZWZpbmVkJyAmJiBhcmcgIT09IG51bGwgJiYgJC50eXBlKGFyZykgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaWYgKGFyZyA9PT0gJ2Rlc3Ryb3knKSByZXR1cm47IC8vIEp1c3QgYSBjYWxsIHRvIGFuIHVuZXhpc3Rpbmcgb2JqZWN0XG4gICAgICAgICAgdGhyb3cgJ1RoZSBhcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdCc7XG4gICAgICAgIH1cbiAgICAgICAgY29udHJvbGxlciA9IG5ldyBKdXN0aWZpZWRHYWxsZXJ5KCRnYWxsZXJ5LCAkLmV4dGVuZCh7fSwgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZGVmYXVsdHMsIGFyZykpO1xuICAgICAgICAkZ2FsbGVyeS5kYXRhKCdqZy5jb250cm9sbGVyJywgY29udHJvbGxlcik7XG4gICAgICB9IGVsc2UgaWYgKGFyZyA9PT0gJ25vcmV3aW5kJykge1xuICAgICAgICAvLyBJbiB0aGlzIGNhc2Ugd2UgZG9uJ3QgcmV3aW5kOiB3ZSBhbmFseXplIG9ubHkgdGhlIGxhdGVzdCBpbWFnZXMgKGUuZy4gdG8gY29tcGxldGUgdGhlIGxhc3QgdW5maW5pc2hlZCByb3dcbiAgICAgICAgLy8gLi4uIGxlZnQgdG8gYmUgbW9yZSByZWFkYWJsZVxuICAgICAgfSBlbHNlIGlmIChhcmcgPT09ICdkZXN0cm95Jykge1xuICAgICAgICBjb250cm9sbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSW4gdGhpcyBjYXNlIEp1c3RpZmllZCBHYWxsZXJ5IGhhcyBiZWVuIGNhbGxlZCBhZ2FpbiBjaGFuZ2luZyBvbmx5IHNvbWUgb3B0aW9uc1xuICAgICAgICBjb250cm9sbGVyLnVwZGF0ZVNldHRpbmdzKGFyZyk7XG4gICAgICAgIGNvbnRyb2xsZXIucmV3aW5kKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgZW50cmllcyBsaXN0XG4gICAgICBpZiAoIWNvbnRyb2xsZXIudXBkYXRlRW50cmllcyhhcmcgPT09ICdub3Jld2luZCcpKSByZXR1cm47XG5cbiAgICAgIC8vIEluaXQganVzdGlmaWVkIGdhbGxlcnlcbiAgICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xuXG4gICAgfSk7XG4gIH07XG5cbn0pKTtcbiIsIi8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcbiAqIFBhZ2luYXRpb25cbiAqIGphdmFzY3JpcHQgcGFnZSBuYXZpZ2F0aW9uXG4gKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqL1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuXG5cbmNvbnN0IFBhZ2luYXRpb24gPSB7XG5cbiAgICBjb2RlOiAnJyxcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVXRpbGl0eVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBjb252ZXJ0aW5nIGluaXRpYWxpemUgZGF0YVxuICAgIEV4dGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIFBhZ2luYXRpb24uc2l6ZSA9IGRhdGEuc2l6ZSB8fCAzMDA7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnZSA9IGRhdGEucGFnZSB8fCAxO1xuICAgICAgICBQYWdpbmF0aW9uLnN0ZXAgPSBkYXRhLnN0ZXAgPT09IDAgPyAwIDogZGF0YS5zdGVwIHx8IDM7XG4gICAgfSxcblxuICAgIC8vIGFkZCBwYWdlcyBieSBudW1iZXIgKGZyb20gW3NdIHRvIFtmXSlcbiAgICBBZGQ6IGZ1bmN0aW9uIChzLCBmKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBzOyBpIDwgZjsgaSsrKSB7XG4gICAgICAgICAgICBQYWdpbmF0aW9uLmNvZGUgKz0gJzxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLWJ0blwiPicgKyBpICsgJzwvYT4nO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGFkZCBsYXN0IHBhZ2Ugd2l0aCBzZXBhcmF0b3JcbiAgICBMYXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24uY29kZSArPSAnPGkgY2xhc3M9XCJwYWdpbmF0aW9uLXNlcGFyYXRvclwiPi4uLjwvaT48YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1idG5cIj4nICsgUGFnaW5hdGlvbi5zaXplICsgJzwvYT4nO1xuICAgIH0sXG5cbiAgICAvLyBhZGQgZmlyc3QgcGFnZSB3aXRoIHNlcGFyYXRvclxuICAgIEZpcnN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24uY29kZSArPSAnPGEgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtYnRuXCI+MTwvYT48aSBjbGFzcz1cInBhZ2luYXRpb24tc2VwYXJhdG9yXCI+Li4uPC9pPic7XG4gICAgfSxcblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEhhbmRsZXJzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIGNoYW5nZSBwYWdlXG4gICAgQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gK3RoaXMuaW5uZXJIVE1MO1xuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfSxcblxuICAgIC8vIHByZXZpb3VzIHBhZ2VcbiAgICBQcmV2OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFBhZ2luYXRpb24ucGFnZS0tO1xuICAgICAgICBpZiAoUGFnaW5hdGlvbi5wYWdlIDwgMSkge1xuICAgICAgICAgICAgUGFnaW5hdGlvbi5wYWdlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfSxcblxuICAgIC8vIG5leHQgcGFnZVxuICAgIE5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGFnaW5hdGlvbi5wYWdlKys7XG4gICAgICAgIGlmIChQYWdpbmF0aW9uLnBhZ2UgPiBQYWdpbmF0aW9uLnNpemUpIHtcbiAgICAgICAgICAgIFBhZ2luYXRpb24ucGFnZSA9IFBhZ2luYXRpb24uc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBQYWdpbmF0aW9uLlN0YXJ0KCk7XG4gICAgfSxcblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFNjcmlwdFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBiaW5kaW5nIHBhZ2VzXG4gICAgQmluZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW5zaWRlIGJpbmQnLCBQYWdpbmF0aW9uLmVbMF0pXG4gICAgICAgIGNvbnN0IGEgPSBQYWdpbmF0aW9uLmVbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbi1wYWdlLWJ0bicpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgrYVtpXS5pbm5lckhUTUwgPT09IFBhZ2luYXRpb24ucGFnZSkgYVtpXS5jbGFzc05hbWUgPSAncGFnaW5hdGlvbi1wYWdlLWJ0biBjdXJyZW50JztcbiAgICAgICAgICAgIGFbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQYWdpbmF0aW9uLkNsaWNrLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gd3JpdGUgcGFnaW5hdGlvblxuICAgIEZpbmlzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY29kZTogJywgUGFnaW5hdGlvbi5jb2RlKVxuICAgICAgICBQYWdpbmF0aW9uLmVbMF0uaW5uZXJIVE1MID0gJydcbiAgICAgICAgLy8gd2l0aG91dCBKUXVlcnlcbiAgICAgICAgLy8gUGFnaW5hdGlvbi5lWzBdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgUGFnaW5hdGlvbi5jb2RlKVxuICAgICAgICBjb25zdCBodG1sID0gJChQYWdpbmF0aW9uLmNvZGUpLmNzcygnZGlzcGxheScsICdub25lJylcbiAgICAgICAgICAgIC5mYWRlSW4oNTAwKVxuICAgICAgICAkKCcucGFnaW5hdGlvbi1wYWdlLWNvbnRhaW5lcicpLmFwcGVuZChodG1sKTtcbiAgICAgICAgUGFnaW5hdGlvbi5jb2RlID0gJyc7XG4gICAgICAgIFBhZ2luYXRpb24uQmluZCgpO1xuICAgIH0sXG4gICAgLy8gZmluZCBwYWdpbmF0aW9uIHR5cGVcbiAgICBTdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoUGFnaW5hdGlvbi5zdGVwID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0ZXApXG4gICAgICAgICAgICBpZiAoUGFnaW5hdGlvbi5wYWdlIDwgMikge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKDEsIDMpXG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGFnaW5hdGlvbi5wYWdlID4gUGFnaW5hdGlvbi5zaXplIC0gMikge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZChQYWdpbmF0aW9uLnNpemUgLSAxLCBQYWdpbmF0aW9uLnNpemUgKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5GaXJzdCgpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKFBhZ2luYXRpb24ucGFnZSwgUGFnaW5hdGlvbi5wYWdlICsgMSk7XG4gICAgICAgICAgICAgICAgUGFnaW5hdGlvbi5MYXN0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChQYWdpbmF0aW9uLnNpemUgPCBQYWdpbmF0aW9uLnN0ZXAgKiAyICsgNikge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKDEsIFBhZ2luYXRpb24uc2l6ZSArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChQYWdpbmF0aW9uLnBhZ2UgPCBQYWdpbmF0aW9uLnN0ZXAgKiAyICsgMSkge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uQWRkKDEsIFBhZ2luYXRpb24uc3RlcCAqIDIgKyA0KTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkxhc3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoUGFnaW5hdGlvbi5wYWdlID4gUGFnaW5hdGlvbi5zaXplIC0gUGFnaW5hdGlvbi5zdGVwICogMikge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZChQYWdpbmF0aW9uLnNpemUgLSBQYWdpbmF0aW9uLnN0ZXAgKiAyIC0gMiwgUGFnaW5hdGlvbi5zaXplICsgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uRmlyc3QoKTtcbiAgICAgICAgICAgICAgICBQYWdpbmF0aW9uLkFkZChQYWdpbmF0aW9uLnBhZ2UgLSBQYWdpbmF0aW9uLnN0ZXAsIFBhZ2luYXRpb24ucGFnZSArIFBhZ2luYXRpb24uc3RlcCArIDEpO1xuICAgICAgICAgICAgICAgIFBhZ2luYXRpb24uTGFzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgUGFnaW5hdGlvbi5GaW5pc2goKTtcbiAgICB9LFxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSW5pdGlhbGl6YXRpb25cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gYmluZGluZyBidXR0b25zXG4gICAgQnV0dG9uczogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc3QgbmF2ID0gZVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpO1xuICAgICAgICBjb25zb2xlLmxvZygnaW5zaWRlIGJ0bnMnLCBuYXYpXG4gICAgICAgIG5hdlswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFBhZ2luYXRpb24uUHJldiwgZmFsc2UpO1xuICAgICAgICBuYXZbMV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQYWdpbmF0aW9uLk5leHQsIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgLy8gY3JlYXRlIHNrZWxldG9uXG4gICAgQ3JlYXRlOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIGNvbnN0IGh0bWwgPVxuICAgICAgICAgICAgYDxhIGNsYXNzPVwicGFnaW5hdGlvbi1wYWdlLXByZXZcIj48aSBjbGFzcz1cImZhcyBmYS1jaGV2cm9uLWxlZnRcIj48L2k+PC9hPiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLXBhZ2UtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICAgICAgICA8YSBjbGFzcz1cInBhZ2luYXRpb24tcGFnZS1uZXh0XCI+PGkgY2xhc3M9XCJmYXMgZmEtY2hldnJvbi1yaWdodFwiPjwvaT48L2E+YFxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZnRlciBjcmVhdGUnLCBlKVxuICAgICAgICBlWzBdLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbClcbiAgICAgICAgUGFnaW5hdGlvbi5lID0gZVswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwYWdpbmF0aW9uLXBhZ2UtY29udGFpbmVyJyk7XG4gICAgICAgIFBhZ2luYXRpb24uQnV0dG9ucyhlKTtcbiAgICB9LFxuXG4gICAgLy8gaW5pdFxuICAgIEluaXQ6IGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgIFBhZ2luYXRpb24uRXh0ZW5kKGRhdGEpO1xuICAgICAgICBQYWdpbmF0aW9uLkNyZWF0ZShlKTtcbiAgICAgICAgUGFnaW5hdGlvbi5TdGFydCgpO1xuICAgIH1cbn07XG5cbi8vIGV4cG9ydGluZ1xuXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uXG5cbi8qICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqICpcbiAqIEluaXRpYWxpemF0aW9uXG4gKiAqICogKiAqICogKiAqICogKiAqICogKiAqICogKiAqLyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcclxuaW1wb3J0IFN3aXBlciBmcm9tICdzd2lwZXInXHJcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbidcclxuXHJcbi8vIHNldHRpbmcgc2xpZGVyXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFNsaWRlcihicmVha3BvaW50ID0gMCkge1xyXG4gICAgY29uc29sZS5sb2coJ3NsaWRlciBpbml0JylcclxuICAgIGxldCBzbGlkZXJJbnN0YW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCA/XHJcbiAgICAgICAgbmV3IFN3aXBlcignLnN3aXBlci1jb250YWluZXInLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgZnJlZU1vZGU6IHRydWVcclxuICAgICAgICB9KSA6XHJcbiAgICAgICAgbnVsbFxyXG5cclxuICAgIHJldHVybiBzbGlkZXJJbnN0YW5jZVxyXG59XHJcblxyXG4vLyBzZXR0aW5nIG5hdnRhYnMgYW5pbWF0aW9uXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdE5hdlRhYnMoYnJlYWtwb2ludCA9IDAsIHNsaWRlckluc3RhbmNlKSB7XHJcblxyXG4gICAgY29uc3QgbWFya2VyID0gJCgnLnRhYi1tYXJrZXInKVxyXG4gICAgY29uc3QgdGFicyA9ICQoJy50YWItbGluaycpXHJcblxyXG4gICAgZnVuY3Rpb24gaW5kaWNhdG9yKHRhcmdldCwgc2hpZnQgPSAwKSB7XHJcbiAgICAgICAgaWYgKHNoaWZ0ID49IDApIHtcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsIHRhcmdldC5vZmZzZXRMZWZ0IC0gc2hpZnQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsIHRhcmdldC5vZmZzZXRMZWZ0ICsgc2hpZnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hcmtlci5jc3MoJ3dpZHRoJywgdGFyZ2V0Lm9mZnNldFdpZHRoICsgOSlcclxuICAgIH1cclxuXHJcbiAgICB0YWJzLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIHRhYnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJJbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gc2xpZGVySW5zdGFuY2UudHJhbnNsYXRlXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IodGFyZ2V0LCA1IC0gdHJhbnNsYXRlKVxyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIGluZGljYXRvcih0YXJnZXQsIDUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yKHRoaXMsIC0zKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZiAoc2xpZGVySW5zdGFuY2UpIHtcclxuICAgICAgICBzbGlkZXJJbnN0YW5jZS5vbignc2V0VHJhbnNsYXRlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSBzbGlkZXJJbnN0YW5jZS50cmFuc2xhdGVcclxuICAgICAgICAgICAgbWFya2VyLmNzcygnbGVmdCcsICQoJy5hY3RpdmUnKVswXS5vZmZzZXRMZWZ0ICsgdHJhbnNsYXRlIC0gNSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBzZXR0aW5nIHBhZ2luYXRpb25cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0UGFnaW5hdGlvbihicmVha3BvaW50KSB7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBzaXplOiAxMDUsXHJcbiAgICAgICAgcGFnZTogMSxcclxuICAgICAgICBzdGVwOiAxXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgYnJlYWtwb2ludCkge1xyXG4gICAgICAgIG9wdGlvbnMuc3RlcCA9IDBcclxuICAgIH1cclxuXHJcbiAgICBQYWdpbmF0aW9uLkluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFnaW5hdGlvbicpLCBvcHRpb25zKVxyXG5cclxufVxyXG5cclxuLy8gdXNlci1tZW51IGFuZCBidXJnZXItbWVudVxyXG4vKiogXHJcbiAqIEFkZHMgbGlzdGVuZXJzIGFuZCB0b2dnbGVzIHBvcHVwc1xyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSB0YXJnZXQgZWxlbWVudCB5b3UgY2xpY2tcclxuICogQHBhcmFtICAge1N0cmluZ30gcG9wdXAgcG9wdXAgeW91IGNhbGxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVQb3B1cCh0YXJnZXQsIHBvcHVwKSB7XHJcbiAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgJChgLiR7dGFyZ2V0fWApLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICAgICAgJChgLiR7cG9wdXB9LW1lbnVgKS5zaG93KClcclxuICAgICAgICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGAuJHtwb3B1cH0tY2xvc2VgKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgICAgICAkKGAuJHtwb3B1cH0tbWVudWApLmhpZGUoKVxyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5jc3MoXCJvdmVyZmxvdy15XCIsIFwiXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAocG9wdXAgPT09ICdidXJnZXInKSB7XHJcbiAgICAgICAgZXhwYW5kU2VhcmNoKHBvcHVwKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBleHBhbmRpbmcgc2VhcmNoXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kU2VhcmNoKGFyZWEgPSAnJykge1xyXG5cclxuICAgICQoYC4ke2FyZWF9LXNlYXJjaC1idG5gKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnNlYXJjaCcpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgIGlmICgkKCcuc2VhcmNoJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICQoYC4ke2FyZWF9LXNlYXJjaC1maWVsZGApLnRyaWdnZXIoJ2ZvY3VzJylcclxuICAgICAgICB9IGVsc2UgJChgLiR7YXJlYX0tc2VhcmNoLWZpZWxkYCkudHJpZ2dlcignYmx1cicpLnZhbCgnJylcclxuXHJcbiAgICB9KVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==