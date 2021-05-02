(self["webpackChunk"] = self["webpackChunk"] || []).push([["js_libs_jquery_justifiedGallery_js"],{

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9saWJzL2pxdWVyeS5qdXN0aWZpZWRHYWxsZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQTBDO0FBQ2hEO0FBQ0EsSUFBSSxpQ0FBTyxDQUFDLDBFQUFRLENBQUMsb0NBQUUsT0FBTztBQUFBO0FBQUE7QUFBQSxrR0FBQztBQUMvQixHQUFHLE1BQU0sRUFxQk47QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsOEJBQThCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLG9DQUFvQztBQUNwQyxrREFBa0Q7QUFDbEQ7QUFDQTs7QUFFQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxJQUFJO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQztBQUNwQyxTQUFTOztBQUVUO0FBQ0EsNEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsNkNBQTZDO0FBQzdDOztBQUVBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIseUNBQXlDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUseUNBQXlDO0FBQ3hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQix5Q0FBeUM7QUFDMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLElBQUk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixPQUFPO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0EscUJBQXFCLGNBQWM7QUFDbkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMseUJBQXlCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFNBQVM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUI7QUFDQTtBQUNBLFdBQVc7O0FBRVgsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxtQ0FBbUMsRUFBRTtBQUM1RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQyxtQ0FBbUM7QUFDbkMsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEVBQUU7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7QUFDTDs7QUFFQSxDQUFDIiwiZmlsZSI6ImpzL2pzX2xpYnNfanF1ZXJ5X2p1c3RpZmllZEdhbGxlcnlfanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGp1c3RpZmllZEdhbGxlcnkgLSB2My44LjFcbiAqIGh0dHA6Ly9taXJvbWFubmluby5naXRodWIuaW8vSnVzdGlmaWVkLUdhbGxlcnkvXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgTWlybyBNYW5uaW5vXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChyb290LCBqUXVlcnkpIHtcbiAgICAgIGlmIChqUXVlcnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyByZXF1aXJlKCdqUXVlcnknKSByZXR1cm5zIGEgZmFjdG9yeSB0aGF0IHJlcXVpcmVzIHdpbmRvdyB0b1xuICAgICAgICAvLyBidWlsZCBhIGpRdWVyeSBpbnN0YW5jZSwgd2Ugbm9ybWFsaXplIGhvdyB3ZSB1c2UgbW9kdWxlc1xuICAgICAgICAvLyB0aGF0IHJlcXVpcmUgdGhpcyBwYXR0ZXJuIGJ1dCB0aGUgd2luZG93IHByb3ZpZGVkIGlzIGEgbm9vcFxuICAgICAgICAvLyBpZiBpdCdzIGRlZmluZWQgKGhvdyBqcXVlcnkgd29ya3MpXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpKHJvb3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgICByZXR1cm4galF1ZXJ5O1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZmFjdG9yeShqUXVlcnkpO1xuICB9XG59KGZ1bmN0aW9uICgkKSB7XG5cbiAgLyoqXG4gICAqIEp1c3RpZmllZCBHYWxsZXJ5IGNvbnRyb2xsZXIgY29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtICRnYWxsZXJ5IHRoZSBnYWxsZXJ5IHRvIGJ1aWxkXG4gICAqIEBwYXJhbSBzZXR0aW5ncyB0aGUgc2V0dGluZ3MgKHRoZSBkZWZhdWx0cyBhcmUgaW4gSnVzdGlmaWVkR2FsbGVyeS5kZWZhdWx0cylcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICB2YXIgSnVzdGlmaWVkR2FsbGVyeSA9IGZ1bmN0aW9uICgkZ2FsbGVyeSwgc2V0dGluZ3MpIHtcbiAgXG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICAgIHRoaXMuY2hlY2tTZXR0aW5ncygpO1xuICBcbiAgICB0aGlzLmltZ0FuYWx5emVyVGltZW91dCA9IG51bGw7XG4gICAgdGhpcy5lbnRyaWVzID0gbnVsbDtcbiAgICB0aGlzLmJ1aWxkaW5nUm93ID0ge1xuICAgICAgZW50cmllc0J1ZmY6IFtdLFxuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICBhc3BlY3RSYXRpbzogMFxuICAgIH07XG4gICAgdGhpcy5sYXN0RmV0Y2hlZEVudHJ5ID0gbnVsbDtcbiAgICB0aGlzLmxhc3RBbmFseXplZEluZGV4ID0gLTE7XG4gICAgdGhpcy55aWVsZCA9IHtcbiAgICAgIGV2ZXJ5OiAyLCAvLyBkbyBhIGZsdXNoIGV2ZXJ5IG4gZmx1c2hlcyAobXVzdCBiZSBncmVhdGVyIHRoYW4gMSlcbiAgICAgIGZsdXNoZWQ6IDAgLy8gZmx1c2hlZCByb3dzIHdpdGhvdXQgYSB5aWVsZFxuICAgIH07XG4gICAgdGhpcy5ib3JkZXIgPSBzZXR0aW5ncy5ib3JkZXIgPj0gMCA/IHNldHRpbmdzLmJvcmRlciA6IHNldHRpbmdzLm1hcmdpbnM7XG4gICAgdGhpcy5tYXhSb3dIZWlnaHQgPSB0aGlzLnJldHJpZXZlTWF4Um93SGVpZ2h0KCk7XG4gICAgdGhpcy5zdWZmaXhSYW5nZXMgPSB0aGlzLnJldHJpZXZlU3VmZml4UmFuZ2VzKCk7XG4gICAgdGhpcy5vZmZZID0gdGhpcy5ib3JkZXI7XG4gICAgdGhpcy5yb3dzID0gMDtcbiAgICB0aGlzLnNwaW5uZXIgPSB7XG4gICAgICBwaGFzZTogMCxcbiAgICAgIHRpbWVTbG90OiAxNTAsXG4gICAgICAkZWw6ICQoJzxkaXYgY2xhc3M9XCJqZy1zcGlubmVyXCI+PHNwYW4+PC9zcGFuPjxzcGFuPjwvc3Bhbj48c3Bhbj48L3NwYW4+PC9kaXY+JyksXG4gICAgICBpbnRlcnZhbElkOiBudWxsXG4gICAgfTtcbiAgICB0aGlzLnNjcm9sbEJhck9uID0gZmFsc2U7XG4gICAgdGhpcy5jaGVja1dpZHRoSW50ZXJ2YWxJZCA9IG51bGw7XG4gICAgdGhpcy5nYWxsZXJ5V2lkdGggPSAkZ2FsbGVyeS53aWR0aCgpO1xuICAgIHRoaXMuJGdhbGxlcnkgPSAkZ2FsbGVyeTtcbiAgXG4gIH07XG4gIFxuICAvKiogQHJldHVybnMge1N0cmluZ30gdGhlIGJlc3Qgc3VmZml4IGdpdmVuIHRoZSB3aWR0aCBhbmQgdGhlIGhlaWdodCAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5nZXRTdWZmaXggPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgIHZhciBsb25nZXN0U2lkZSwgaTtcbiAgICBsb25nZXN0U2lkZSA9ICh3aWR0aCA+IGhlaWdodCkgPyB3aWR0aCA6IGhlaWdodDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zdWZmaXhSYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsb25nZXN0U2lkZSA8PSB0aGlzLnN1ZmZpeFJhbmdlc1tpXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlc1t0aGlzLnN1ZmZpeFJhbmdlc1tpXV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzW3RoaXMuc3VmZml4UmFuZ2VzW2kgLSAxXV07XG4gIH07XG4gIFxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBzdWZmaXggZnJvbSB0aGUgc3RyaW5nXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGEgbmV3IHN0cmluZyB3aXRob3V0IHRoZSBzdWZmaXhcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnJlbW92ZVN1ZmZpeCA9IGZ1bmN0aW9uIChzdHIsIHN1ZmZpeCkge1xuICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYSBib29sZWFuIHRvIHNheSBpZiB0aGUgc3VmZml4IGlzIGNvbnRhaW5lZCBpbiB0aGUgc3RyIG9yIG5vdFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZW5kc1dpdGggPSBmdW5jdGlvbiAoc3RyLCBzdWZmaXgpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3VmZml4LCBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEdldCB0aGUgdXNlZCBzdWZmaXggb2YgYSBwYXJ0aWN1bGFyIHVybFxuICAgKlxuICAgKiBAcGFyYW0gc3RyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHJldHVybiB0aGUgdXNlZCBzdWZmaXhcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmdldFVzZWRTdWZmaXggPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgZm9yICh2YXIgc2kgaW4gdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlcykge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXMuaGFzT3duUHJvcGVydHkoc2kpKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzW3NpXS5sZW5ndGggPT09IDApIGNvbnRpbnVlO1xuICAgICAgICBpZiAodGhpcy5lbmRzV2l0aChzdHIsIHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXNbc2ldKSkgcmV0dXJuIHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXNbc2ldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH07XG4gIFxuICAvKipcbiAgICogR2l2ZW4gYW4gaW1hZ2Ugc3JjLCB3aXRoIHRoZSB3aWR0aCBhbmQgdGhlIGhlaWdodCwgcmV0dXJucyB0aGUgbmV3IGltYWdlIHNyYyB3aXRoIHRoZVxuICAgKiBiZXN0IHN1ZmZpeCB0byBzaG93IHRoZSBiZXN0IHF1YWxpdHkgdGh1bWJuYWlsLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgc3VmZml4IHRvIHVzZVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUubmV3U3JjID0gZnVuY3Rpb24gKGltYWdlU3JjLCBpbWdXaWR0aCwgaW1nSGVpZ2h0LCBpbWFnZSkge1xuICAgIHZhciBuZXdJbWFnZVNyYztcbiAgXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MudGh1bWJuYWlsUGF0aCkge1xuICAgICAgbmV3SW1hZ2VTcmMgPSB0aGlzLnNldHRpbmdzLnRodW1ibmFpbFBhdGgoaW1hZ2VTcmMsIGltZ1dpZHRoLCBpbWdIZWlnaHQsIGltYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hdGNoUmVzID0gaW1hZ2VTcmMubWF0Y2godGhpcy5zZXR0aW5ncy5leHRlbnNpb24pO1xuICAgICAgdmFyIGV4dCA9IChtYXRjaFJlcyAhPT0gbnVsbCkgPyBtYXRjaFJlc1swXSA6ICcnO1xuICAgICAgbmV3SW1hZ2VTcmMgPSBpbWFnZVNyYy5yZXBsYWNlKHRoaXMuc2V0dGluZ3MuZXh0ZW5zaW9uLCAnJyk7XG4gICAgICBuZXdJbWFnZVNyYyA9IHRoaXMucmVtb3ZlU3VmZml4KG5ld0ltYWdlU3JjLCB0aGlzLmdldFVzZWRTdWZmaXgobmV3SW1hZ2VTcmMpKTtcbiAgICAgIG5ld0ltYWdlU3JjICs9IHRoaXMuZ2V0U3VmZml4KGltZ1dpZHRoLCBpbWdIZWlnaHQpICsgZXh0O1xuICAgIH1cbiAgXG4gICAgcmV0dXJuIG5ld0ltYWdlU3JjO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFNob3dzIHRoZSBpbWFnZXMgdGhhdCBpcyBpbiB0aGUgZ2l2ZW4gZW50cnlcbiAgICpcbiAgICogQHBhcmFtICRlbnRyeSB0aGUgZW50cnlcbiAgICogQHBhcmFtIGNhbGxiYWNrIHRoZSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBzaG93IGFuaW1hdGlvbiBpcyBmaW5pc2hlZFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc2hvd0ltZyA9IGZ1bmN0aW9uICgkZW50cnksIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY3NzQW5pbWF0aW9uKSB7XG4gICAgICAkZW50cnkuYWRkQ2xhc3MoJ2pnLWVudHJ5LXZpc2libGUnKTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGVudHJ5LnN0b3AoKS5mYWRlVG8odGhpcy5zZXR0aW5ncy5pbWFnZXNBbmltYXRpb25EdXJhdGlvbiwgMS4wLCBjYWxsYmFjayk7XG4gICAgICAkZW50cnkuZmluZCh0aGlzLnNldHRpbmdzLmltZ1NlbGVjdG9yKS5zdG9wKCkuZmFkZVRvKHRoaXMuc2V0dGluZ3MuaW1hZ2VzQW5pbWF0aW9uRHVyYXRpb24sIDEuMCwgY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBFeHRyYWN0IHRoZSBpbWFnZSBzcmMgZm9ybSB0aGUgaW1hZ2UsIGxvb2tpbmcgZnJvbSB0aGUgJ3NhZmUtc3JjJywgYW5kIGlmIGl0IGNhbid0IGJlIGZvdW5kLCBmcm9tIHRoZVxuICAgKiAnc3JjJyBhdHRyaWJ1dGUuIEl0IHNhdmVzIGluIHRoZSBpbWFnZSBkYXRhIHRoZSAnamcub3JpZ2luYWxTcmMnIGZpZWxkLCB3aXRoIHRoZSBleHRyYWN0ZWQgc3JjLlxuICAgKlxuICAgKiBAcGFyYW0gJGltYWdlIHRoZSBpbWFnZSB0byBhbmFseXplXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBleHRyYWN0ZWQgc3JjXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5leHRyYWN0SW1nU3JjRnJvbUltYWdlID0gZnVuY3Rpb24gKCRpbWFnZSkge1xuICAgIHZhciBpbWFnZVNyYyA9ICRpbWFnZS5kYXRhKCdzYWZlLXNyYycpO1xuICAgIHZhciBpbWFnZVNyY0xvYyA9ICdkYXRhLXNhZmUtc3JjJztcbiAgICBpZiAodHlwZW9mIGltYWdlU3JjID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaW1hZ2VTcmMgPSAkaW1hZ2UuYXR0cignc3JjJyk7XG4gICAgICBpbWFnZVNyY0xvYyA9ICdzcmMnO1xuICAgIH1cbiAgICAkaW1hZ2UuZGF0YSgnamcub3JpZ2luYWxTcmMnLCBpbWFnZVNyYyk7IC8vIHRoaXMgaXMgc2F2ZWQgZm9yIHRoZSBkZXN0cm95IG1ldGhvZFxuICAgICRpbWFnZS5kYXRhKCdqZy5zcmMnLCBpbWFnZVNyYyk7IC8vIHRoaXMgd2lsbCBjaGFuZ2Ugb3ZlcnRpbWVcbiAgICAkaW1hZ2UuZGF0YSgnamcub3JpZ2luYWxTcmNMb2MnLCBpbWFnZVNyY0xvYyk7IC8vIHRoaXMgaXMgc2F2ZWQgZm9yIHRoZSBkZXN0cm95IG1ldGhvZFxuICAgIHJldHVybiBpbWFnZVNyYztcbiAgfTtcbiAgXG4gIC8qKiBAcmV0dXJucyB7alF1ZXJ5fSB0aGUgaW1hZ2UgaW4gdGhlIGdpdmVuIGVudHJ5ICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmltZ0Zyb21FbnRyeSA9IGZ1bmN0aW9uICgkZW50cnkpIHtcbiAgICB2YXIgJGltZyA9ICRlbnRyeS5maW5kKHRoaXMuc2V0dGluZ3MuaW1nU2VsZWN0b3IpO1xuICAgIHJldHVybiAkaW1nLmxlbmd0aCA9PT0gMCA/IG51bGwgOiAkaW1nO1xuICB9O1xuICBcbiAgLyoqIEByZXR1cm5zIHtqUXVlcnl9IHRoZSBjYXB0aW9uIGluIHRoZSBnaXZlbiBlbnRyeSAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5jYXB0aW9uRnJvbUVudHJ5ID0gZnVuY3Rpb24gKCRlbnRyeSkge1xuICAgIHZhciAkY2FwdGlvbiA9ICRlbnRyeS5maW5kKCc+IC5qZy1jYXB0aW9uJyk7XG4gICAgcmV0dXJuICRjYXB0aW9uLmxlbmd0aCA9PT0gMCA/IG51bGwgOiAkY2FwdGlvbjtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBEaXNwbGF5IHRoZSBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVudHJ5IHRoZSBlbnRyeSB0byBkaXNwbGF5XG4gICAqIEBwYXJhbSB7aW50fSB4IHRoZSB4IHBvc2l0aW9uIHdoZXJlIHRoZSBlbnRyeSBtdXN0IGJlIHBvc2l0aW9uZWRcbiAgICogQHBhcmFtIHkgdGhlIHkgcG9zaXRpb24gd2hlcmUgdGhlIGVudHJ5IG11c3QgYmUgcG9zaXRpb25lZFxuICAgKiBAcGFyYW0gaW1nV2lkdGggdGhlIGltYWdlIHdpZHRoXG4gICAqIEBwYXJhbSBpbWdIZWlnaHQgdGhlIGltYWdlIGhlaWdodFxuICAgKiBAcGFyYW0gcm93SGVpZ2h0IHRoZSByb3cgaGVpZ2h0IG9mIHRoZSByb3cgdGhhdCBvd25zIHRoZSBlbnRyeVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZGlzcGxheUVudHJ5ID0gZnVuY3Rpb24gKCRlbnRyeSwgeCwgeSwgaW1nV2lkdGgsIGltZ0hlaWdodCwgcm93SGVpZ2h0KSB7XG4gICAgJGVudHJ5LndpZHRoKGltZ1dpZHRoKTtcbiAgICAkZW50cnkuaGVpZ2h0KHJvd0hlaWdodCk7XG4gICAgJGVudHJ5LmNzcygndG9wJywgeSk7XG4gICAgJGVudHJ5LmNzcygnbGVmdCcsIHgpO1xuICBcbiAgICB2YXIgJGltYWdlID0gdGhpcy5pbWdGcm9tRW50cnkoJGVudHJ5KTtcbiAgICBpZiAoJGltYWdlICE9PSBudWxsKSB7XG4gICAgICAkaW1hZ2UuY3NzKCd3aWR0aCcsIGltZ1dpZHRoKTtcbiAgICAgICRpbWFnZS5jc3MoJ2hlaWdodCcsIGltZ0hlaWdodCk7XG4gICAgICAkaW1hZ2UuY3NzKCdtYXJnaW4tbGVmdCcsIC0gaW1nV2lkdGggLyAyKTtcbiAgICAgICRpbWFnZS5jc3MoJ21hcmdpbi10b3AnLCAtIGltZ0hlaWdodCAvIDIpO1xuICBcbiAgICAgIC8vIEltYWdlIHJlbG9hZGluZyBmb3IgYW4gaGlnaCBxdWFsaXR5IG9mIHRodW1ibmFpbHNcbiAgICAgIHZhciBpbWFnZVNyYyA9ICRpbWFnZS5kYXRhKCdqZy5zcmMnKTtcbiAgICAgIGlmIChpbWFnZVNyYykge1xuICAgICAgICBpbWFnZVNyYyA9IHRoaXMubmV3U3JjKGltYWdlU3JjLCBpbWdXaWR0aCwgaW1nSGVpZ2h0LCAkaW1hZ2VbMF0pO1xuICBcbiAgICAgICAgJGltYWdlLm9uZSgnZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgIHRoaXMucmVzZXRJbWdTcmMoJGltYWdlKTsgLy9yZXZlcnQgdG8gdGhlIG9yaWdpbmFsIHRodW1ibmFpbFxuICAgICAgICB9KTtcbiAgXG4gICAgICAgIHZhciBsb2FkTmV3SW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gaWYgKGltYWdlU3JjICE9PSBuZXdJbWFnZVNyYykgeyBcbiAgICAgICAgICAgICRpbWFnZS5hdHRyKCdzcmMnLCBpbWFnZVNyYyk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9O1xuICBcbiAgICAgICAgaWYgKCRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnKSA9PT0gJ3NraXBwZWQnICYmIGltYWdlU3JjKSB7XG4gICAgICAgICAgdGhpcy5vbkltYWdlRXZlbnQoaW1hZ2VTcmMsIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0ltZygkZW50cnksIGxvYWROZXdJbWFnZSk7IC8vbG9hZCB0aGUgbmV3IGltYWdlIGFmdGVyIHRoZSBmYWRlSW5cbiAgICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnLCB0cnVlKTtcbiAgICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNob3dJbWcoJGVudHJ5LCBsb2FkTmV3SW1hZ2UpOyAvL2xvYWQgdGhlIG5ldyBpbWFnZSBhZnRlciB0aGUgZmFkZUluXG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgfVxuICBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93SW1nKCRlbnRyeSk7XG4gICAgfVxuICBcbiAgICB0aGlzLmRpc3BsYXlFbnRyeUNhcHRpb24oJGVudHJ5KTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBEaXNwbGF5IHRoZSBlbnRyeSBjYXB0aW9uLiBJZiB0aGUgY2FwdGlvbiBlbGVtZW50IGRvZXNuJ3QgZXhpc3RzLCBpdCBjcmVhdGVzIHRoZSBjYXB0aW9uIHVzaW5nIHRoZSAnYWx0J1xuICAgKiBvciB0aGUgJ3RpdGxlJyBhdHRyaWJ1dGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGVudHJ5IHRoZSBlbnRyeSB0byBwcm9jZXNzXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5kaXNwbGF5RW50cnlDYXB0aW9uID0gZnVuY3Rpb24gKCRlbnRyeSkge1xuICAgIHZhciAkaW1hZ2UgPSB0aGlzLmltZ0Zyb21FbnRyeSgkZW50cnkpO1xuICAgIGlmICgkaW1hZ2UgIT09IG51bGwgJiYgdGhpcy5zZXR0aW5ncy5jYXB0aW9ucykge1xuICAgICAgdmFyICRpbWdDYXB0aW9uID0gdGhpcy5jYXB0aW9uRnJvbUVudHJ5KCRlbnRyeSk7XG4gIFxuICAgICAgLy8gQ3JlYXRlIGl0IGlmIGl0IGRvZXNuJ3QgZXhpc3RzXG4gICAgICBpZiAoJGltZ0NhcHRpb24gPT09IG51bGwpIHtcbiAgICAgICAgdmFyIGNhcHRpb24gPSAkaW1hZ2UuYXR0cignYWx0Jyk7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkQ2FwdGlvbihjYXB0aW9uKSkgY2FwdGlvbiA9ICRlbnRyeS5hdHRyKCd0aXRsZScpO1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkQ2FwdGlvbihjYXB0aW9uKSkgeyAvLyBDcmVhdGUgb25seSB3ZSBmb3VuZCBzb21ldGhpbmdcbiAgICAgICAgICAkaW1nQ2FwdGlvbiA9ICQoJzxkaXYgY2xhc3M9XCJqZy1jYXB0aW9uXCI+JyArIGNhcHRpb24gKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgJGVudHJ5LmFwcGVuZCgkaW1nQ2FwdGlvbik7XG4gICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmNyZWF0ZWRDYXB0aW9uJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgXG4gICAgICAvLyBDcmVhdGUgZXZlbnRzICh3ZSBjaGVjayBhZ2FpbiB0aGUgJGltZ0NhcHRpb24gYmVjYXVzZSBpdCBjYW4gYmUgc3RpbGwgaW5leGlzdGVudClcbiAgICAgIGlmICgkaW1nQ2FwdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY3NzQW5pbWF0aW9uKSAkaW1nQ2FwdGlvbi5zdG9wKCkuZmFkZVRvKDAsIHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLm5vblZpc2libGVPcGFjaXR5KTtcbiAgICAgICAgdGhpcy5hZGRDYXB0aW9uRXZlbnRzSGFuZGxlcnMoJGVudHJ5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVDYXB0aW9uRXZlbnRzSGFuZGxlcnMoJGVudHJ5KTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoZSBjYXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBjYXB0aW9uIFRoZSBjYXB0aW9uIHRoYXQgc2hvdWxkIGJlIHZhbGlkYXRlZFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBWYWxpZGF0aW9uIHJlc3VsdFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuaXNWYWxpZENhcHRpb24gPSBmdW5jdGlvbiAoY2FwdGlvbikge1xuICAgIHJldHVybiAodHlwZW9mIGNhcHRpb24gIT09ICd1bmRlZmluZWQnICYmIGNhcHRpb24ubGVuZ3RoID4gMCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogVGhlIGNhbGxiYWNrIGZvciB0aGUgZXZlbnQgJ21vdXNlZW50ZXInLiBJdCBhc3N1bWVzIHRoYXQgdGhlIGV2ZW50IGN1cnJlbnRUYXJnZXQgaXMgYW4gZW50cnkuXG4gICAqIEl0IHNob3dzIHRoZSBjYXB0aW9uIHVzaW5nIGpRdWVyeSAob3IgdXNpbmcgQ1NTIGlmIGl0IGlzIGNvbmZpZ3VyZWQgc28pXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50T2JqZWN0IHRoZSBldmVudCBvYmplY3RcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLm9uRW50cnlNb3VzZUVudGVyRm9yQ2FwdGlvbiA9IGZ1bmN0aW9uIChldmVudE9iamVjdCkge1xuICAgIHZhciAkY2FwdGlvbiA9IHRoaXMuY2FwdGlvbkZyb21FbnRyeSgkKGV2ZW50T2JqZWN0LmN1cnJlbnRUYXJnZXQpKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jc3NBbmltYXRpb24pIHtcbiAgICAgICRjYXB0aW9uLmFkZENsYXNzKCdqZy1jYXB0aW9uLXZpc2libGUnKS5yZW1vdmVDbGFzcygnamctY2FwdGlvbi1oaWRkZW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGNhcHRpb24uc3RvcCgpLmZhZGVUbyh0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3MudmlzaWJsZU9wYWNpdHkpO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgZm9yIHRoZSBldmVudCAnbW91c2VsZWF2ZScuIEl0IGFzc3VtZXMgdGhhdCB0aGUgZXZlbnQgY3VycmVudFRhcmdldCBpcyBhbiBlbnRyeS5cbiAgICogSXQgaGlkZXMgdGhlIGNhcHRpb24gdXNpbmcgalF1ZXJ5IChvciB1c2luZyBDU1MgaWYgaXQgaXMgY29uZmlndXJlZCBzbylcbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRPYmplY3QgdGhlIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUub25FbnRyeU1vdXNlTGVhdmVGb3JDYXB0aW9uID0gZnVuY3Rpb24gKGV2ZW50T2JqZWN0KSB7XG4gICAgdmFyICRjYXB0aW9uID0gdGhpcy5jYXB0aW9uRnJvbUVudHJ5KCQoZXZlbnRPYmplY3QuY3VycmVudFRhcmdldCkpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmNzc0FuaW1hdGlvbikge1xuICAgICAgJGNhcHRpb24ucmVtb3ZlQ2xhc3MoJ2pnLWNhcHRpb24tdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdqZy1jYXB0aW9uLWhpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkY2FwdGlvbi5zdG9wKCkuZmFkZVRvKHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgICB0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy5ub25WaXNpYmxlT3BhY2l0eSk7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIEFkZCB0aGUgaGFuZGxlcnMgb2YgdGhlIGVudHJ5IGZvciB0aGUgY2FwdGlvblxuICAgKlxuICAgKiBAcGFyYW0gJGVudHJ5IHRoZSBlbnRyeSB0byBtb2RpZnlcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmFkZENhcHRpb25FdmVudHNIYW5kbGVycyA9IGZ1bmN0aW9uICgkZW50cnkpIHtcbiAgICB2YXIgY2FwdGlvbk1vdXNlRXZlbnRzID0gJGVudHJ5LmRhdGEoJ2pnLmNhcHRpb25Nb3VzZUV2ZW50cycpO1xuICAgIGlmICh0eXBlb2YgY2FwdGlvbk1vdXNlRXZlbnRzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY2FwdGlvbk1vdXNlRXZlbnRzID0ge1xuICAgICAgICBtb3VzZWVudGVyOiAkLnByb3h5KHRoaXMub25FbnRyeU1vdXNlRW50ZXJGb3JDYXB0aW9uLCB0aGlzKSxcbiAgICAgICAgbW91c2VsZWF2ZTogJC5wcm94eSh0aGlzLm9uRW50cnlNb3VzZUxlYXZlRm9yQ2FwdGlvbiwgdGhpcylcbiAgICAgIH07XG4gICAgICAkZW50cnkub24oJ21vdXNlZW50ZXInLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2FwdGlvbk1vdXNlRXZlbnRzLm1vdXNlZW50ZXIpO1xuICAgICAgJGVudHJ5Lm9uKCdtb3VzZWxlYXZlJywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNhcHRpb25Nb3VzZUV2ZW50cy5tb3VzZWxlYXZlKTtcbiAgICAgICRlbnRyeS5kYXRhKCdqZy5jYXB0aW9uTW91c2VFdmVudHMnLCBjYXB0aW9uTW91c2VFdmVudHMpO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIGhhbmRsZXJzIG9mIHRoZSBlbnRyeSBmb3IgdGhlIGNhcHRpb25cbiAgICpcbiAgICogQHBhcmFtICRlbnRyeSB0aGUgZW50cnkgdG8gbW9kaWZ5XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5yZW1vdmVDYXB0aW9uRXZlbnRzSGFuZGxlcnMgPSBmdW5jdGlvbiAoJGVudHJ5KSB7XG4gICAgdmFyIGNhcHRpb25Nb3VzZUV2ZW50cyA9ICRlbnRyeS5kYXRhKCdqZy5jYXB0aW9uTW91c2VFdmVudHMnKTtcbiAgICBpZiAodHlwZW9mIGNhcHRpb25Nb3VzZUV2ZW50cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICRlbnRyeS5vZmYoJ21vdXNlZW50ZXInLCB1bmRlZmluZWQsIGNhcHRpb25Nb3VzZUV2ZW50cy5tb3VzZWVudGVyKTtcbiAgICAgICRlbnRyeS5vZmYoJ21vdXNlbGVhdmUnLCB1bmRlZmluZWQsIGNhcHRpb25Nb3VzZUV2ZW50cy5tb3VzZWxlYXZlKTtcbiAgICAgICRlbnRyeS5yZW1vdmVEYXRhKCdqZy5jYXB0aW9uTW91c2VFdmVudHMnKTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogQ2xlYXIgdGhlIGJ1aWxkaW5nIHJvdyBkYXRhIHRvIGJlIHVzZWQgZm9yIGEgbmV3IHJvd1xuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuY2xlYXJCdWlsZGluZ1JvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmID0gW107XG4gICAgdGhpcy5idWlsZGluZ1Jvdy5hc3BlY3RSYXRpbyA9IDA7XG4gICAgdGhpcy5idWlsZGluZ1Jvdy53aWR0aCA9IDA7XG4gIH07XG4gIFxuICAvKipcbiAgICogSnVzdGlmeSB0aGUgYnVpbGRpbmcgcm93LCBwcmVwYXJpbmcgaXQgdG9cbiAgICpcbiAgICogQHBhcmFtIGlzTGFzdFJvd1xuICAgKiBAcGFyYW0gaGlkZGVuUm93IHVuZGVmaW5lZCBvciBmYWxzZSBmb3Igbm9ybWFsIGJlaGF2aW9yLiBoaWRkZW5Sb3cgPSB0cnVlIHRvIGhpZGUgdGhlIHJvdy5cbiAgICogQHJldHVybnMgYSBib29sZWFuIHRvIGtub3cgaWYgdGhlIHJvdyBoYXMgYmVlbiBqdXN0aWZpZWQgb3Igbm90XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5wcmVwYXJlQnVpbGRpbmdSb3cgPSBmdW5jdGlvbiAoaXNMYXN0Um93LCBoaWRkZW5Sb3cpIHtcbiAgICB2YXIgaSwgJGVudHJ5LCBpbWdBc3BlY3RSYXRpbywgbmV3SW1nVywgbmV3SW1nSCwganVzdGlmeSA9IHRydWU7XG4gICAgdmFyIG1pbkhlaWdodCA9IDA7XG4gICAgdmFyIGF2YWlsYWJsZVdpZHRoID0gdGhpcy5nYWxsZXJ5V2lkdGggLSAyICogdGhpcy5ib3JkZXIgLSAoXG4gICAgICAodGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGggLSAxKSAqIHRoaXMuc2V0dGluZ3MubWFyZ2lucyk7XG4gICAgdmFyIHJvd0hlaWdodCA9IGF2YWlsYWJsZVdpZHRoIC8gdGhpcy5idWlsZGluZ1Jvdy5hc3BlY3RSYXRpbztcbiAgICB2YXIgZGVmYXVsdFJvd0hlaWdodCA9IHRoaXMuc2V0dGluZ3Mucm93SGVpZ2h0O1xuICAgIHZhciBqdXN0aWZpYWJsZSA9IHRoaXMuYnVpbGRpbmdSb3cud2lkdGggLyBhdmFpbGFibGVXaWR0aCA+IHRoaXMuc2V0dGluZ3MuanVzdGlmeVRocmVzaG9sZDtcbiAgXG4gICAgLy9Ta2lwIHRoZSBsYXN0IHJvdyBpZiB3ZSBjYW4ndCBqdXN0aWZ5IGl0IGFuZCB0aGUgbGFzdFJvdyA9PSAnaGlkZSdcbiAgICBpZiAoaGlkZGVuUm93IHx8IChpc0xhc3RSb3cgJiYgdGhpcy5zZXR0aW5ncy5sYXN0Um93ID09PSAnaGlkZScgJiYgIWp1c3RpZmlhYmxlKSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgJGVudHJ5ID0gdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZltpXTtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY3NzQW5pbWF0aW9uKVxuICAgICAgICAgICRlbnRyeS5yZW1vdmVDbGFzcygnamctZW50cnktdmlzaWJsZScpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkZW50cnkuc3RvcCgpLmZhZGVUbygwLCAwLjEpO1xuICAgICAgICAgICRlbnRyeS5maW5kKCc+IGltZywgPiBhID4gaW1nJykuZmFkZVRvKDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICBcbiAgICAvLyBXaXRoIGxhc3RSb3cgPSBub2p1c3RpZnksIGp1c3RpZnkgaWYgaXMganVzdGlmaWNhYmxlICh0aGUgaW1hZ2VzIHdpbGwgbm90IGJlY29tZSB0b28gYmlnKVxuICAgIGlmIChpc0xhc3RSb3cgJiYgIWp1c3RpZmlhYmxlICYmIHRoaXMuc2V0dGluZ3MubGFzdFJvdyAhPT0gJ2p1c3RpZnknICYmIHRoaXMuc2V0dGluZ3MubGFzdFJvdyAhPT0gJ2hpZGUnKSB7XG4gICAgICBqdXN0aWZ5ID0gZmFsc2U7XG4gIFxuICAgICAgaWYgKHRoaXMucm93cyA+IDApIHtcbiAgICAgICAgZGVmYXVsdFJvd0hlaWdodCA9ICh0aGlzLm9mZlkgLSB0aGlzLmJvcmRlciAtIHRoaXMuc2V0dGluZ3MubWFyZ2lucyAqIHRoaXMucm93cykgLyB0aGlzLnJvd3M7XG4gICAgICAgIGp1c3RpZnkgPSBkZWZhdWx0Um93SGVpZ2h0ICogdGhpcy5idWlsZGluZ1Jvdy5hc3BlY3RSYXRpbyAvIGF2YWlsYWJsZVdpZHRoID4gdGhpcy5zZXR0aW5ncy5qdXN0aWZ5VGhyZXNob2xkO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoOyBpKyspIHtcbiAgICAgICRlbnRyeSA9IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmZbaV07XG4gICAgICBpbWdBc3BlY3RSYXRpbyA9ICRlbnRyeS5kYXRhKCdqZy53aWR0aCcpIC8gJGVudHJ5LmRhdGEoJ2pnLmhlaWdodCcpO1xuICBcbiAgICAgIGlmIChqdXN0aWZ5KSB7XG4gICAgICAgIG5ld0ltZ1cgPSAoaSA9PT0gdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGggLSAxKSA/IGF2YWlsYWJsZVdpZHRoIDogcm93SGVpZ2h0ICogaW1nQXNwZWN0UmF0aW87XG4gICAgICAgIG5ld0ltZ0ggPSByb3dIZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdJbWdXID0gZGVmYXVsdFJvd0hlaWdodCAqIGltZ0FzcGVjdFJhdGlvO1xuICAgICAgICBuZXdJbWdIID0gZGVmYXVsdFJvd0hlaWdodDtcbiAgICAgIH1cbiAgXG4gICAgICBhdmFpbGFibGVXaWR0aCAtPSBNYXRoLnJvdW5kKG5ld0ltZ1cpO1xuICAgICAgJGVudHJ5LmRhdGEoJ2pnLmp3aWR0aCcsIE1hdGgucm91bmQobmV3SW1nVykpO1xuICAgICAgJGVudHJ5LmRhdGEoJ2pnLmpoZWlnaHQnLCBNYXRoLmNlaWwobmV3SW1nSCkpO1xuICAgICAgaWYgKGkgPT09IDAgfHwgbWluSGVpZ2h0ID4gbmV3SW1nSCkgbWluSGVpZ2h0ID0gbmV3SW1nSDtcbiAgICB9XG4gIFxuICAgIHRoaXMuYnVpbGRpbmdSb3cuaGVpZ2h0ID0gbWluSGVpZ2h0O1xuICAgIHJldHVybiBqdXN0aWZ5O1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEZsdXNoIGEgcm93OiBqdXN0aWZ5IGl0LCBtb2RpZnkgdGhlIGdhbGxlcnkgaGVpZ2h0IGFjY29yZGluZ2x5IHRvIHRoZSByb3cgaGVpZ2h0XG4gICAqXG4gICAqIEBwYXJhbSBpc0xhc3RSb3dcbiAgICogQHBhcmFtIGhpZGRlblJvdyB1bmRlZmluZWQgb3IgZmFsc2UgZm9yIG5vcm1hbCBiZWhhdmlvci4gaGlkZGVuUm93ID0gdHJ1ZSB0byBoaWRlIHRoZSByb3cuXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5mbHVzaFJvdyA9IGZ1bmN0aW9uIChpc0xhc3RSb3csIGhpZGRlblJvdykge1xuICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XG4gICAgdmFyICRlbnRyeSwgYnVpbGRpbmdSb3dSZXMsIG9mZlggPSB0aGlzLmJvcmRlciwgaTtcbiAgXG4gICAgYnVpbGRpbmdSb3dSZXMgPSB0aGlzLnByZXBhcmVCdWlsZGluZ1Jvdyhpc0xhc3RSb3csIGhpZGRlblJvdyk7XG4gICAgaWYgKGhpZGRlblJvdyB8fCAoaXNMYXN0Um93ICYmIHNldHRpbmdzLmxhc3RSb3cgPT09ICdoaWRlJyAmJiBidWlsZGluZ1Jvd1JlcyA9PT0gLTEpKSB7XG4gICAgICB0aGlzLmNsZWFyQnVpbGRpbmdSb3coKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGlmICh0aGlzLm1heFJvd0hlaWdodCkge1xuICAgICAgaWYgKHRoaXMubWF4Um93SGVpZ2h0IDwgdGhpcy5idWlsZGluZ1Jvdy5oZWlnaHQpIHRoaXMuYnVpbGRpbmdSb3cuaGVpZ2h0ID0gdGhpcy5tYXhSb3dIZWlnaHQ7XG4gICAgfVxuICBcbiAgICAvL0FsaWduIGxhc3QgKHVuanVzdGlmaWVkKSByb3dcbiAgICBpZiAoaXNMYXN0Um93ICYmIChzZXR0aW5ncy5sYXN0Um93ID09PSAnY2VudGVyJyB8fCBzZXR0aW5ncy5sYXN0Um93ID09PSAncmlnaHQnKSkge1xuICAgICAgdmFyIGF2YWlsYWJsZVdpZHRoID0gdGhpcy5nYWxsZXJ5V2lkdGggLSAyICogdGhpcy5ib3JkZXIgLSAodGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZi5sZW5ndGggLSAxKSAqIHNldHRpbmdzLm1hcmdpbnM7XG4gIFxuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgJGVudHJ5ID0gdGhpcy5idWlsZGluZ1Jvdy5lbnRyaWVzQnVmZltpXTtcbiAgICAgICAgYXZhaWxhYmxlV2lkdGggLT0gJGVudHJ5LmRhdGEoJ2pnLmp3aWR0aCcpO1xuICAgICAgfVxuICBcbiAgICAgIGlmIChzZXR0aW5ncy5sYXN0Um93ID09PSAnY2VudGVyJylcbiAgICAgICAgb2ZmWCArPSBNYXRoLnJvdW5kKGF2YWlsYWJsZVdpZHRoIC8gMik7XG4gICAgICBlbHNlIGlmIChzZXR0aW5ncy5sYXN0Um93ID09PSAncmlnaHQnKVxuICAgICAgICBvZmZYICs9IGF2YWlsYWJsZVdpZHRoO1xuICAgIH1cbiAgXG4gICAgdmFyIGxhc3RFbnRyeUlkeCA9IHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGkgPSAwOyBpIDw9IGxhc3RFbnRyeUlkeDsgaSsrKSB7XG4gICAgICAkZW50cnkgPSB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmW3RoaXMuc2V0dGluZ3MucnRsID8gbGFzdEVudHJ5SWR4IC0gaSA6IGldO1xuICAgICAgdGhpcy5kaXNwbGF5RW50cnkoJGVudHJ5LCBvZmZYLCB0aGlzLm9mZlksICRlbnRyeS5kYXRhKCdqZy5qd2lkdGgnKSwgJGVudHJ5LmRhdGEoJ2pnLmpoZWlnaHQnKSwgdGhpcy5idWlsZGluZ1Jvdy5oZWlnaHQpO1xuICAgICAgb2ZmWCArPSAkZW50cnkuZGF0YSgnamcuandpZHRoJykgKyBzZXR0aW5ncy5tYXJnaW5zO1xuICAgIH1cbiAgXG4gICAgLy9HYWxsZXJ5IEhlaWdodFxuICAgIHRoaXMuZ2FsbGVyeUhlaWdodFRvU2V0ID0gdGhpcy5vZmZZICsgdGhpcy5idWlsZGluZ1Jvdy5oZWlnaHQgKyB0aGlzLmJvcmRlcjtcbiAgICB0aGlzLnNldEdhbGxlcnlUZW1wSGVpZ2h0KHRoaXMuZ2FsbGVyeUhlaWdodFRvU2V0ICsgdGhpcy5nZXRTcGlubmVySGVpZ2h0KCkpO1xuICBcbiAgICBpZiAoIWlzTGFzdFJvdyB8fCAodGhpcy5idWlsZGluZ1Jvdy5oZWlnaHQgPD0gc2V0dGluZ3Mucm93SGVpZ2h0ICYmIGJ1aWxkaW5nUm93UmVzKSkge1xuICAgICAgLy9SZWFkeSBmb3IgYSBuZXcgcm93XG4gICAgICB0aGlzLm9mZlkgKz0gdGhpcy5idWlsZGluZ1Jvdy5oZWlnaHQgKyBzZXR0aW5ncy5tYXJnaW5zO1xuICAgICAgdGhpcy5yb3dzICs9IDE7XG4gICAgICB0aGlzLmNsZWFyQnVpbGRpbmdSb3coKTtcbiAgICAgIHRoaXMuc2V0dGluZ3MudHJpZ2dlckV2ZW50LmNhbGwodGhpcywgJ2pnLnJvd2ZsdXNoJyk7XG4gICAgfVxuICB9O1xuICBcbiAgXG4gIC8vIFNjcm9sbCBwb3NpdGlvbiBub3QgcmVzdG9yaW5nOiBodHRwczovL2dpdGh1Yi5jb20vbWlyb21hbm5pbm8vSnVzdGlmaWVkLUdhbGxlcnkvaXNzdWVzLzIyMVxuICB2YXIgZ2FsbGVyeVByZXZTdGF0aWNIZWlnaHQgPSAwO1xuICBcbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUucmVtZW1iZXJHYWxsZXJ5SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgIGdhbGxlcnlQcmV2U3RhdGljSGVpZ2h0ID0gdGhpcy4kZ2FsbGVyeS5oZWlnaHQoKTtcbiAgICB0aGlzLiRnYWxsZXJ5LmhlaWdodChnYWxsZXJ5UHJldlN0YXRpY0hlaWdodCk7XG4gIH07XG4gIFxuICAvLyBncm93IG9ubHlcbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc2V0R2FsbGVyeVRlbXBIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0KSB7XG4gICAgZ2FsbGVyeVByZXZTdGF0aWNIZWlnaHQgPSBNYXRoLm1heChoZWlnaHQsIGdhbGxlcnlQcmV2U3RhdGljSGVpZ2h0KTtcbiAgICB0aGlzLiRnYWxsZXJ5LmhlaWdodChnYWxsZXJ5UHJldlN0YXRpY0hlaWdodCk7XG4gIH07XG4gIFxuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zZXRHYWxsZXJ5RmluYWxIZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0KSB7XG4gICAgZ2FsbGVyeVByZXZTdGF0aWNIZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy4kZ2FsbGVyeS5oZWlnaHQoaGVpZ2h0KTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIHdpZHRoIG9mIHRoZSBnYWxsZXJ5IGNvbnRhaW5lciwgdG8ga25vdyBpZiBhIG5ldyBqdXN0aWZpY2F0aW9uIGlzIG5lZWRlZFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuY2hlY2tXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNoZWNrV2lkdGhJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoJC5wcm94eShmdW5jdGlvbiAoKSB7XG4gIFxuICAgICAgLy8gaWYgdGhlIGdhbGxlcnkgaXMgbm90IGN1cnJlbnRseSB2aXNpYmxlLCBhYm9ydC5cbiAgICAgIGlmICghdGhpcy4kZ2FsbGVyeS5pcyhcIjp2aXNpYmxlXCIpKSByZXR1cm47XG4gIFxuICAgICAgdmFyIGdhbGxlcnlXaWR0aCA9IHBhcnNlRmxvYXQodGhpcy4kZ2FsbGVyeS53aWR0aCgpKTtcbiAgICAgIGlmIChNYXRoLmFicyhnYWxsZXJ5V2lkdGggLSB0aGlzLmdhbGxlcnlXaWR0aCkgPiB0aGlzLnNldHRpbmdzLnJlZnJlc2hTZW5zaXRpdml0eSkge1xuICAgICAgICB0aGlzLmdhbGxlcnlXaWR0aCA9IGdhbGxlcnlXaWR0aDtcbiAgICAgICAgdGhpcy5yZXdpbmQoKTtcbiAgXG4gICAgICAgIHRoaXMucmVtZW1iZXJHYWxsZXJ5SGVpZ2h0KCk7XG4gIFxuICAgICAgICAvLyBSZXN0YXJ0IHRvIGFuYWx5emVcbiAgICAgICAgdGhpcy5zdGFydEltZ0FuYWx5emVyKHRydWUpO1xuICAgICAgfVxuICAgIH0sIHRoaXMpLCB0aGlzLnNldHRpbmdzLnJlZnJlc2hUaW1lKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYSBib29sZWFuIHNheWluZyBpZiB0aGUgc3Bpbm5lciBpcyBhY3RpdmUgb3Igbm90XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5pc1NwaW5uZXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3Bpbm5lci5pbnRlcnZhbElkICE9PSBudWxsO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEByZXR1cm5zIHtpbnR9IHRoZSBzcGlubmVyIGhlaWdodFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZ2V0U3Bpbm5lckhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGlubmVyLiRlbC5pbm5lckhlaWdodCgpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBzcGlubmVyIGFuaW1hdGlvbiBhbmQgbW9kaWZ5IHRoZSBnYWxsZXJ5IGhlaWdodCB0byBleGNsdWRlIHRoZSBzcGlubmVyXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zdG9wTG9hZGluZ1NwaW5uZXJBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnNwaW5uZXIuaW50ZXJ2YWxJZCk7XG4gICAgdGhpcy5zcGlubmVyLmludGVydmFsSWQgPSBudWxsO1xuICAgIHRoaXMuc2V0R2FsbGVyeVRlbXBIZWlnaHQodGhpcy4kZ2FsbGVyeS5oZWlnaHQoKSAtIHRoaXMuZ2V0U3Bpbm5lckhlaWdodCgpKTtcbiAgICB0aGlzLnNwaW5uZXIuJGVsLmRldGFjaCgpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgc3Bpbm5lciBhbmltYXRpb25cbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnN0YXJ0TG9hZGluZ1NwaW5uZXJBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNwaW5uZXJDb250ZXh0ID0gdGhpcy5zcGlubmVyO1xuICAgIHZhciAkc3Bpbm5lclBvaW50cyA9IHNwaW5uZXJDb250ZXh0LiRlbC5maW5kKCdzcGFuJyk7XG4gICAgY2xlYXJJbnRlcnZhbChzcGlubmVyQ29udGV4dC5pbnRlcnZhbElkKTtcbiAgICB0aGlzLiRnYWxsZXJ5LmFwcGVuZChzcGlubmVyQ29udGV4dC4kZWwpO1xuICAgIHRoaXMuc2V0R2FsbGVyeVRlbXBIZWlnaHQodGhpcy5vZmZZICsgdGhpcy5idWlsZGluZ1Jvdy5oZWlnaHQgKyB0aGlzLmdldFNwaW5uZXJIZWlnaHQoKSk7XG4gICAgc3Bpbm5lckNvbnRleHQuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzcGlubmVyQ29udGV4dC5waGFzZSA8ICRzcGlubmVyUG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAkc3Bpbm5lclBvaW50cy5lcShzcGlubmVyQ29udGV4dC5waGFzZSkuZmFkZVRvKHNwaW5uZXJDb250ZXh0LnRpbWVTbG90LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzcGlubmVyUG9pbnRzLmVxKHNwaW5uZXJDb250ZXh0LnBoYXNlIC0gJHNwaW5uZXJQb2ludHMubGVuZ3RoKS5mYWRlVG8oc3Bpbm5lckNvbnRleHQudGltZVNsb3QsIDApO1xuICAgICAgfVxuICAgICAgc3Bpbm5lckNvbnRleHQucGhhc2UgPSAoc3Bpbm5lckNvbnRleHQucGhhc2UgKyAxKSAlICgkc3Bpbm5lclBvaW50cy5sZW5ndGggKiAyKTtcbiAgICB9LCBzcGlubmVyQ29udGV4dC50aW1lU2xvdCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogUmV3aW5kIHRoZSBpbWFnZSBhbmFseXNpcyB0byBzdGFydCBmcm9tIHRoZSBmaXJzdCBlbnRyeS5cbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnJld2luZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmxhc3RGZXRjaGVkRW50cnkgPSBudWxsO1xuICAgIHRoaXMubGFzdEFuYWx5emVkSW5kZXggPSAtMTtcbiAgICB0aGlzLm9mZlkgPSB0aGlzLmJvcmRlcjtcbiAgICB0aGlzLnJvd3MgPSAwO1xuICAgIHRoaXMuY2xlYXJCdWlsZGluZ1JvdygpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IGBzZXR0aW5ncy5zZWxlY3RvcmAgcmVqZWN0aW5nIHNwaW5uZXIgZWxlbWVudFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZ2V0U2VsZWN0b3JXaXRob3V0U3Bpbm5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zZWxlY3RvciArICcsIGRpdjpub3QoLmpnLXNwaW5uZXIpJztcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGFsbCBlbnRyaWVzIG1hdGNoZWQgYnkgYHNldHRpbmdzLnNlbGVjdG9yYFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZ2V0QWxsRW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLmdldFNlbGVjdG9yV2l0aG91dFNwaW5uZXIoKTtcbiAgICByZXR1cm4gdGhpcy4kZ2FsbGVyeS5jaGlsZHJlbihzZWxlY3RvcikudG9BcnJheSgpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZW50cmllcyBzZWFyY2hpbmcgaXQgZnJvbSB0aGUganVzdGlmaWVkIGdhbGxlcnkgSFRNTCBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBub3Jld2luZCBpZiBub3Jld2luZCBvbmx5IHRoZSBuZXcgZW50cmllcyB3aWxsIGJlIGNoYW5nZWQgKGkuZS4gcmFuZG9taXplZCwgc29ydGVkIG9yIGZpbHRlcmVkKVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiBzb21lIGVudHJpZXMgaGFzIGJlZW4gZm91bmRlZFxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUudXBkYXRlRW50cmllcyA9IGZ1bmN0aW9uIChub3Jld2luZCkge1xuICAgIHZhciBuZXdFbnRyaWVzO1xuICBcbiAgICBpZiAobm9yZXdpbmQgJiYgdGhpcy5sYXN0RmV0Y2hlZEVudHJ5ICE9IG51bGwpIHtcbiAgICAgIHZhciBzZWxlY3RvciA9IHRoaXMuZ2V0U2VsZWN0b3JXaXRob3V0U3Bpbm5lcigpO1xuICAgICAgbmV3RW50cmllcyA9ICQodGhpcy5sYXN0RmV0Y2hlZEVudHJ5KS5uZXh0QWxsKHNlbGVjdG9yKS50b0FycmF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW50cmllcyA9IFtdO1xuICAgICAgbmV3RW50cmllcyA9IHRoaXMuZ2V0QWxsRW50cmllcygpO1xuICAgIH1cbiAgXG4gICAgaWYgKG5ld0VudHJpZXMubGVuZ3RoID4gMCkge1xuICBcbiAgICAgIC8vIFNvcnQgb3IgcmFuZG9taXplXG4gICAgICBpZiAoJC5pc0Z1bmN0aW9uKHRoaXMuc2V0dGluZ3Muc29ydCkpIHtcbiAgICAgICAgbmV3RW50cmllcyA9IHRoaXMuc29ydEFycmF5KG5ld0VudHJpZXMpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnJhbmRvbWl6ZSkge1xuICAgICAgICBuZXdFbnRyaWVzID0gdGhpcy5zaHVmZmxlQXJyYXkobmV3RW50cmllcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmxhc3RGZXRjaGVkRW50cnkgPSBuZXdFbnRyaWVzW25ld0VudHJpZXMubGVuZ3RoIC0gMV07XG4gIFxuICAgICAgLy8gRmlsdGVyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5maWx0ZXIpIHtcbiAgICAgICAgbmV3RW50cmllcyA9IHRoaXMuZmlsdGVyQXJyYXkobmV3RW50cmllcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlc2V0RmlsdGVycyhuZXdFbnRyaWVzKTtcbiAgICAgIH1cbiAgXG4gICAgfVxuICBcbiAgICB0aGlzLmVudHJpZXMgPSB0aGlzLmVudHJpZXMuY29uY2F0KG5ld0VudHJpZXMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBlbnRyaWVzIG9yZGVyIHRvIHRoZSBET00sIGl0ZXJhdGluZyB0aGUgZW50cmllcyBhbmQgYXBwZW5kaW5nIHRoZSBpbWFnZXNcbiAgICpcbiAgICogQHBhcmFtIGVudHJpZXMgdGhlIGVudHJpZXMgdGhhdCBoYXMgYmVlbiBtb2RpZmllZCBhbmQgdGhhdCBtdXN0IGJlIHJlLW9yZGVyZWQgaW4gdGhlIERPTVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuaW5zZXJ0VG9HYWxsZXJ5ID0gZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5lYWNoKGVudHJpZXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykuYXBwZW5kVG8odGhhdC4kZ2FsbGVyeSk7XG4gICAgfSk7XG4gIH07XG4gIFxuICAvKipcbiAgICogU2h1ZmZsZSB0aGUgYXJyYXkgdXNpbmcgdGhlIEZpc2hlci1ZYXRlcyBzaHVmZmxlIGFsZ29yaXRobVxuICAgKlxuICAgKiBAcGFyYW0gYSB0aGUgYXJyYXkgdG8gc2h1ZmZsZVxuICAgKiBAcmV0dXJuIHRoZSBzaHVmZmxlZCBhcnJheVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc2h1ZmZsZUFycmF5ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgaSwgaiwgdGVtcDtcbiAgICBmb3IgKGkgPSBhLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgIHRlbXAgPSBhW2ldO1xuICAgICAgYVtpXSA9IGFbal07XG4gICAgICBhW2pdID0gdGVtcDtcbiAgICB9XG4gICAgdGhpcy5pbnNlcnRUb0dhbGxlcnkoYSk7XG4gICAgcmV0dXJuIGE7XG4gIH07XG4gIFxuICAvKipcbiAgICogU29ydCB0aGUgYXJyYXkgdXNpbmcgc2V0dGluZ3MuY29tcGFyYXRvciBhcyBjb21wYXJhdG9yXG4gICAqXG4gICAqIEBwYXJhbSBhIHRoZSBhcnJheSB0byBzb3J0IChpdCBpcyBzb3J0ZWQpXG4gICAqIEByZXR1cm4gdGhlIHNvcnRlZCBhcnJheVxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuc29ydEFycmF5ID0gZnVuY3Rpb24gKGEpIHtcbiAgICBhLnNvcnQodGhpcy5zZXR0aW5ncy5zb3J0KTtcbiAgICB0aGlzLmluc2VydFRvR2FsbGVyeShhKTtcbiAgICByZXR1cm4gYTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgZmlsdGVycyByZW1vdmluZyB0aGUgJ2pnLWZpbHRlcmVkJyBjbGFzcyBmcm9tIGFsbCB0aGUgZW50cmllc1xuICAgKlxuICAgKiBAcGFyYW0gYSB0aGUgYXJyYXkgdG8gcmVzZXRcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnJlc2V0RmlsdGVycyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSAkKGFbaV0pLnJlbW92ZUNsYXNzKCdqZy1maWx0ZXJlZCcpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIEZpbHRlciB0aGUgZW50cmllcyBjb25zaWRlcmluZyB0aGVpcnMgY2xhc3NlcyAoaWYgYSBzdHJpbmcgaGFzIGJlZW4gcGFzc2VkKSBvciB1c2luZyBhIGZ1bmN0aW9uIGZvciBmaWx0ZXJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSBhIHRoZSBhcnJheSB0byBmaWx0ZXJcbiAgICogQHJldHVybiB0aGUgZmlsdGVyZWQgYXJyYXlcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmZpbHRlckFycmF5ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgc2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzO1xuICAgIGlmICgkLnR5cGUoc2V0dGluZ3MuZmlsdGVyKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIEZpbHRlciBvbmx5IGtlZXBpbmcgdGhlIGVudHJpZXMgcGFzc2VkIGluIHRoZSBzdHJpbmdcbiAgICAgIHJldHVybiBhLmZpbHRlcihmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xuICAgICAgICBpZiAoJGVsLmlzKHNldHRpbmdzLmZpbHRlcikpIHtcbiAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2pnLWZpbHRlcmVkJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKCdqZy1maWx0ZXJlZCcpLnJlbW92ZUNsYXNzKCdqZy12aXNpYmxlJyk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbihzZXR0aW5ncy5maWx0ZXIpKSB7XG4gICAgICAvLyBGaWx0ZXIgdXNpbmcgdGhlIHBhc3NlZCBmdW5jdGlvblxuICAgICAgdmFyIGZpbHRlcmVkQXJyID0gYS5maWx0ZXIoc2V0dGluZ3MuZmlsdGVyKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZmlsdGVyZWRBcnIuaW5kZXhPZihhW2ldKSA9PT0gLTEpIHtcbiAgICAgICAgICAkKGFbaV0pLmFkZENsYXNzKCdqZy1maWx0ZXJlZCcpLnJlbW92ZUNsYXNzKCdqZy12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChhW2ldKS5yZW1vdmVDbGFzcygnamctZmlsdGVyZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcmVkQXJyO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBSZXZlcnQgdGhlIGltYWdlIHNyYyB0byB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnJlc2V0SW1nU3JjID0gZnVuY3Rpb24gKCRpbWcpIHtcbiAgICBpZiAoJGltZy5kYXRhKCdqZy5vcmlnaW5hbFNyY0xvYycpID09PSAnc3JjJykge1xuICAgICAgJGltZy5hdHRyKCdzcmMnLCAkaW1nLmRhdGEoJ2pnLm9yaWdpbmFsU3JjJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkaW1nLmF0dHIoJ3NyYycsICcnKTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogRGVzdHJveSB0aGUgSnVzdGlmaWVkIEdhbGxlcnkgaW5zdGFuY2UuXG4gICAqXG4gICAqIEl0IGNsZWFycyBhbGwgdGhlIGNzcyBwcm9wZXJ0aWVzIGFkZGVkIGluIHRoZSBzdHlsZSBhdHRyaWJ1dGVzLiBXZSBkb2Vzbid0IGJhY2t1cCB0aGUgb3JpZ2luYWxcbiAgICogdmFsdWVzIGZvciB0aG9zZSBjc3MgYXR0cmlidXRlcywgYmVjYXVzZSBpdCBjb3N0cyAocGVyZm9ybWFuY2UpIGFuZCBiZWNhdXNlIGluIGdlbmVyYWwgb25lXG4gICAqIHNob3VsZG4ndCB1c2UgdGhlIHN0eWxlIGF0dHJpYnV0ZSBmb3IgYW4gdW5pZm9ybSBzZXQgb2YgaW1hZ2VzICh3aGVyZSB3ZSBzdXBwb3NlIHRoZSB1c2Ugb2ZcbiAgICogY2xhc3NlcykuIENyZWF0aW5nIGEgYmFja3VwIGlzIGFsc28gZGlmZmljdWx0IGJlY2F1c2UgSkcgY291bGQgYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIGFuZFxuICAgKiB3aXRoIGRpZmZlcmVudCBzdHlsZSBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuY2hlY2tXaWR0aEludGVydmFsSWQpO1xuICAgIHRoaXMuc3RvcEltZ0FuYWx5emVyU3RhcnRlcigpO1xuICBcbiAgICAvLyBHZXQgZnJlc2ggZW50cmllcyBsaXN0IHNpbmNlIGZpbHRlcmVkIGVudHJpZXMgYXJlIGFic2VudCBpbiBgdGhpcy5lbnRyaWVzYFxuICAgICQuZWFjaCh0aGlzLmdldEFsbEVudHJpZXMoKSwgJC5wcm94eShmdW5jdGlvbiAoXywgZW50cnkpIHtcbiAgICAgIHZhciAkZW50cnkgPSAkKGVudHJ5KTtcbiAgXG4gICAgICAvLyBSZXNldCBlbnRyeSBzdHlsZVxuICAgICAgJGVudHJ5LmNzcygnd2lkdGgnLCAnJyk7XG4gICAgICAkZW50cnkuY3NzKCdoZWlnaHQnLCAnJyk7XG4gICAgICAkZW50cnkuY3NzKCd0b3AnLCAnJyk7XG4gICAgICAkZW50cnkuY3NzKCdsZWZ0JywgJycpO1xuICAgICAgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcsIHVuZGVmaW5lZCk7XG4gICAgICAkZW50cnkucmVtb3ZlQ2xhc3MoJ2pnLWVudHJ5IGpnLWZpbHRlcmVkIGpnLWVudHJ5LXZpc2libGUnKTtcbiAgXG4gICAgICAvLyBSZXNldCBpbWFnZSBzdHlsZVxuICAgICAgdmFyICRpbWcgPSB0aGlzLmltZ0Zyb21FbnRyeSgkZW50cnkpO1xuICAgICAgaWYgKCRpbWcpIHtcbiAgICAgICAgJGltZy5jc3MoJ3dpZHRoJywgJycpO1xuICAgICAgICAkaW1nLmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgICAkaW1nLmNzcygnbWFyZ2luLWxlZnQnLCAnJyk7XG4gICAgICAgICRpbWcuY3NzKCdtYXJnaW4tdG9wJywgJycpO1xuICAgICAgICB0aGlzLnJlc2V0SW1nU3JjKCRpbWcpO1xuICAgICAgICAkaW1nLmRhdGEoJ2pnLm9yaWdpbmFsU3JjJywgdW5kZWZpbmVkKTtcbiAgICAgICAgJGltZy5kYXRhKCdqZy5vcmlnaW5hbFNyY0xvYycsIHVuZGVmaW5lZCk7XG4gICAgICAgICRpbWcuZGF0YSgnamcuc3JjJywgdW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgXG4gICAgICAvLyBSZW1vdmUgY2FwdGlvblxuICAgICAgdGhpcy5yZW1vdmVDYXB0aW9uRXZlbnRzSGFuZGxlcnMoJGVudHJ5KTtcbiAgICAgIHZhciAkY2FwdGlvbiA9IHRoaXMuY2FwdGlvbkZyb21FbnRyeSgkZW50cnkpO1xuICAgICAgaWYgKCRlbnRyeS5kYXRhKCdqZy5jcmVhdGVkQ2FwdGlvbicpKSB7XG4gICAgICAgIC8vIHJlbW92ZSBhbHNvIHRoZSBjYXB0aW9uIGVsZW1lbnQgKGlmIGNyZWF0ZWQgYnkgamcpXG4gICAgICAgICRlbnRyeS5kYXRhKCdqZy5jcmVhdGVkQ2FwdGlvbicsIHVuZGVmaW5lZCk7XG4gICAgICAgIGlmICgkY2FwdGlvbiAhPT0gbnVsbCkgJGNhcHRpb24ucmVtb3ZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoJGNhcHRpb24gIT09IG51bGwpICRjYXB0aW9uLmZhZGVUbygwLCAxKTtcbiAgICAgIH1cbiAgXG4gICAgfSwgdGhpcykpO1xuICBcbiAgICB0aGlzLiRnYWxsZXJ5LmNzcygnaGVpZ2h0JywgJycpO1xuICAgIHRoaXMuJGdhbGxlcnkucmVtb3ZlQ2xhc3MoJ2p1c3RpZmllZC1nYWxsZXJ5Jyk7XG4gICAgdGhpcy4kZ2FsbGVyeS5kYXRhKCdqZy5jb250cm9sbGVyJywgdW5kZWZpbmVkKTtcbiAgICB0aGlzLnNldHRpbmdzLnRyaWdnZXJFdmVudC5jYWxsKHRoaXMsICdqZy5kZXN0cm95Jyk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQW5hbHl6ZSB0aGUgaW1hZ2VzIGFuZCBidWlsZHMgdGhlIHJvd3MuIEl0IHJldHVybnMgaWYgaXQgZm91bmQgYW4gaW1hZ2UgdGhhdCBpcyBub3QgbG9hZGVkLlxuICAgKlxuICAgKiBAcGFyYW0gaXNGb3JSZXNpemUgaWYgdGhlIGltYWdlIGFuYWx5emVyIGlzIGNhbGxlZCBmb3IgcmVzaXppbmcgb3Igbm90LCB0byBjYWxsIGEgZGlmZmVyZW50IGNhbGxiYWNrIGF0IHRoZSBlbmRcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLmFuYWx5emVJbWFnZXMgPSBmdW5jdGlvbiAoaXNGb3JSZXNpemUpIHtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sYXN0QW5hbHl6ZWRJbmRleCArIDE7IGkgPCB0aGlzLmVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciAkZW50cnkgPSAkKHRoaXMuZW50cmllc1tpXSk7XG4gICAgICBpZiAoJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcpID09PSB0cnVlIHx8ICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnKSA9PT0gJ3NraXBwZWQnKSB7XG4gICAgICAgIHZhciBhdmFpbGFibGVXaWR0aCA9IHRoaXMuZ2FsbGVyeVdpZHRoIC0gMiAqIHRoaXMuYm9yZGVyIC0gKFxuICAgICAgICAgICh0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLmxlbmd0aCAtIDEpICogdGhpcy5zZXR0aW5ncy5tYXJnaW5zKTtcbiAgICAgICAgdmFyIGltZ0FzcGVjdFJhdGlvID0gJGVudHJ5LmRhdGEoJ2pnLndpZHRoJykgLyAkZW50cnkuZGF0YSgnamcuaGVpZ2h0Jyk7XG4gIFxuICAgICAgICB0aGlzLmJ1aWxkaW5nUm93LmVudHJpZXNCdWZmLnB1c2goJGVudHJ5KTtcbiAgICAgICAgdGhpcy5idWlsZGluZ1Jvdy5hc3BlY3RSYXRpbyArPSBpbWdBc3BlY3RSYXRpbztcbiAgICAgICAgdGhpcy5idWlsZGluZ1Jvdy53aWR0aCArPSBpbWdBc3BlY3RSYXRpbyAqIHRoaXMuc2V0dGluZ3Mucm93SGVpZ2h0O1xuICAgICAgICB0aGlzLmxhc3RBbmFseXplZEluZGV4ID0gaTtcbiAgXG4gICAgICAgIGlmIChhdmFpbGFibGVXaWR0aCAvICh0aGlzLmJ1aWxkaW5nUm93LmFzcGVjdFJhdGlvICsgaW1nQXNwZWN0UmF0aW8pIDwgdGhpcy5zZXR0aW5ncy5yb3dIZWlnaHQpIHtcbiAgICAgICAgICB0aGlzLmZsdXNoUm93KGZhbHNlLCB0aGlzLnNldHRpbmdzLm1heFJvd3NDb3VudCA+IDAgJiYgdGhpcy5yb3dzID09PSB0aGlzLnNldHRpbmdzLm1heFJvd3NDb3VudCk7XG4gIFxuICAgICAgICAgIGlmICgrK3RoaXMueWllbGQuZmx1c2hlZCA+PSB0aGlzLnlpZWxkLmV2ZXJ5KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0SW1nQW5hbHl6ZXIoaXNGb3JSZXNpemUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgkZW50cnkuZGF0YSgnamcubG9hZGVkJykgIT09ICdlcnJvcicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgLy8gTGFzdCByb3cgZmx1c2ggKHRoZSByb3cgaXMgbm90IGZ1bGwpXG4gICAgaWYgKHRoaXMuYnVpbGRpbmdSb3cuZW50cmllc0J1ZmYubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5mbHVzaFJvdyh0cnVlLCB0aGlzLnNldHRpbmdzLm1heFJvd3NDb3VudCA+IDAgJiYgdGhpcy5yb3dzID09PSB0aGlzLnNldHRpbmdzLm1heFJvd3NDb3VudCk7XG4gICAgfVxuICBcbiAgICBpZiAodGhpcy5pc1NwaW5uZXJBY3RpdmUoKSkge1xuICAgICAgdGhpcy5zdG9wTG9hZGluZ1NwaW5uZXJBbmltYXRpb24oKTtcbiAgICB9XG4gIFxuICAgIC8qIFN0b3AsIGlmIHRoZXJlIGlzLCB0aGUgdGltZW91dCB0byBzdGFydCB0aGUgYW5hbHl6ZUltYWdlcy5cbiAgICAgVGhpcyBpcyBiZWNhdXNlIGFuIGltYWdlIGNhbiBiZSBzZXQgbG9hZGVkLCBhbmQgdGhlIHRpbWVvdXQgY2FuIGJlIHNldCxcbiAgICAgYnV0IHRoaXMgaW1hZ2UgY2FuIGJlIGFuYWx5emVkIHlldC5cbiAgICAgKi9cbiAgICB0aGlzLnN0b3BJbWdBbmFseXplclN0YXJ0ZXIoKTtcbiAgXG4gICAgdGhpcy5zZXRHYWxsZXJ5RmluYWxIZWlnaHQodGhpcy5nYWxsZXJ5SGVpZ2h0VG9TZXQpO1xuICAgIFxuICAgIC8vT24gY29tcGxldGUgY2FsbGJhY2tcbiAgICB0aGlzLnNldHRpbmdzLnRyaWdnZXJFdmVudC5jYWxsKHRoaXMsIGlzRm9yUmVzaXplID8gJ2pnLnJlc2l6ZScgOiAnamcuY29tcGxldGUnKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBTdG9wcyBhbnkgSW1nQW5hbHl6ZXIgc3RhcnRlciAodGhhdCBoYXMgYW4gYXNzaWduZWQgdGltZW91dClcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnN0b3BJbWdBbmFseXplclN0YXJ0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy55aWVsZC5mbHVzaGVkID0gMDtcbiAgICBpZiAodGhpcy5pbWdBbmFseXplclRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmltZ0FuYWx5emVyVGltZW91dCk7XG4gICAgICB0aGlzLmltZ0FuYWx5emVyVGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgaW1hZ2UgYW5hbHl6ZXIuIEl0IGlzIG5vdCBpbW1lZGlhdGVseSBjYWxsZWQgdG8gbGV0IHRoZSBicm93c2VyIHRvIHVwZGF0ZSB0aGUgdmlld1xuICAgKlxuICAgKiBAcGFyYW0gaXNGb3JSZXNpemUgc3BlY2lmaWVzIGlmIHRoZSBpbWFnZSBhbmFseXplciBtdXN0IGJlIGNhbGxlZCBmb3IgcmVzaXppbmcgb3Igbm90XG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5zdGFydEltZ0FuYWx5emVyID0gZnVuY3Rpb24gKGlzRm9yUmVzaXplKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHRoaXMuc3RvcEltZ0FuYWx5emVyU3RhcnRlcigpO1xuICAgIHRoaXMuaW1nQW5hbHl6ZXJUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LmFuYWx5emVJbWFnZXMoaXNGb3JSZXNpemUpO1xuICAgIH0sIDAuMDAxKTsgLy8gd2UgY2FuJ3Qgc3RhcnQgaXQgaW1tZWRpYXRlbHkgZHVlIHRvIGEgSUUgZGlmZmVyZW50IGJlaGF2aW91clxuICB9O1xuICBcbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgaW1hZ2UgaXMgbG9hZGVkIG9yIG5vdCB1c2luZyBhbm90aGVyIGltYWdlIG9iamVjdC4gV2UgY2Fubm90IHVzZSB0aGUgJ2NvbXBsZXRlJyBpbWFnZSBwcm9wZXJ0eSxcbiAgICogYmVjYXVzZSBzb21lIGJyb3dzZXJzLCB3aXRoIGEgNDA0IHNldCBjb21wbGV0ZSA9IHRydWUuXG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZVNyYyB0aGUgaW1hZ2Ugc3JjIHRvIGxvYWRcbiAgICogQHBhcmFtIG9uTG9hZCBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBpbWFnZSBoYXMgYmVlbiBsb2FkZWRcbiAgICogQHBhcmFtIG9uRXJyb3IgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgaW4gY2FzZSBvZiBhbiBlcnJvclxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUub25JbWFnZUV2ZW50ID0gZnVuY3Rpb24gKGltYWdlU3JjLCBvbkxvYWQsIG9uRXJyb3IpIHtcbiAgICBpZiAoIW9uTG9hZCAmJiAhb25FcnJvcikgcmV0dXJuO1xuICBcbiAgICB2YXIgbWVtSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICB2YXIgJG1lbUltYWdlID0gJChtZW1JbWFnZSk7XG4gICAgaWYgKG9uTG9hZCkge1xuICAgICAgJG1lbUltYWdlLm9uZSgnbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1lbUltYWdlLm9mZignbG9hZCBlcnJvcicpO1xuICAgICAgICBvbkxvYWQobWVtSW1hZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAkbWVtSW1hZ2Uub25lKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJG1lbUltYWdlLm9mZignbG9hZCBlcnJvcicpO1xuICAgICAgICBvbkVycm9yKG1lbUltYWdlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBtZW1JbWFnZS5zcmMgPSBpbWFnZVNyYztcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBJbml0IG9mIEp1c3RpZmllZCBHYWxsZXJ5IGNvbnRyb2xsZWRcbiAgICogSXQgYW5hbHl6ZXMgYWxsIHRoZSBlbnRyaWVzIHN0YXJ0aW5nIHRoZWlycyBsb2FkaW5nIGFuZCBjYWxsaW5nIHRoZSBpbWFnZSBhbmFseXplciAodGhhdCB3b3JrcyB3aXRoIGxvYWRlZCBpbWFnZXMpXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbWFnZXNUb0xvYWQgPSBmYWxzZSwgc2tpcHBlZEltYWdlcyA9IGZhbHNlLCB0aGF0ID0gdGhpcztcbiAgICAkLmVhY2godGhpcy5lbnRyaWVzLCBmdW5jdGlvbiAoaW5kZXgsIGVudHJ5KSB7XG4gICAgICB2YXIgJGVudHJ5ID0gJChlbnRyeSk7XG4gICAgICB2YXIgJGltYWdlID0gdGhhdC5pbWdGcm9tRW50cnkoJGVudHJ5KTtcbiAgXG4gICAgICAkZW50cnkuYWRkQ2xhc3MoJ2pnLWVudHJ5Jyk7XG4gIFxuICAgICAgaWYgKCRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnKSAhPT0gdHJ1ZSAmJiAkZW50cnkuZGF0YSgnamcubG9hZGVkJykgIT09ICdza2lwcGVkJykge1xuICBcbiAgICAgICAgLy8gTGluayBSZWwgZ2xvYmFsIG92ZXJ3cml0ZVxuICAgICAgICBpZiAodGhhdC5zZXR0aW5ncy5yZWwgIT09IG51bGwpICRlbnRyeS5hdHRyKCdyZWwnLCB0aGF0LnNldHRpbmdzLnJlbCk7XG4gIFxuICAgICAgICAvLyBMaW5rIFRhcmdldCBnbG9iYWwgb3ZlcndyaXRlXG4gICAgICAgIGlmICh0aGF0LnNldHRpbmdzLnRhcmdldCAhPT0gbnVsbCkgJGVudHJ5LmF0dHIoJ3RhcmdldCcsIHRoYXQuc2V0dGluZ3MudGFyZ2V0KTtcbiAgXG4gICAgICAgIGlmICgkaW1hZ2UgIT09IG51bGwpIHtcbiAgXG4gICAgICAgICAgLy8gSW1hZ2Ugc3JjXG4gICAgICAgICAgdmFyIGltYWdlU3JjID0gdGhhdC5leHRyYWN0SW1nU3JjRnJvbUltYWdlKCRpbWFnZSk7XG4gIFxuICAgICAgICAgIC8qIElmIHdlIGhhdmUgdGhlIGhlaWdodCBhbmQgdGhlIHdpZHRoLCB3ZSBkb24ndCB3YWl0IHRoYXQgdGhlIGltYWdlIGlzIGxvYWRlZCwgXG4gICAgICAgICAgICAgYnV0IHdlIHN0YXJ0IGRpcmVjdGx5IHdpdGggdGhlIGp1c3RpZmljYXRpb24gKi9cbiAgICAgICAgICBpZiAodGhhdC5zZXR0aW5ncy53YWl0VGh1bWJuYWlsc0xvYWQgPT09IGZhbHNlIHx8ICFpbWFnZVNyYykge1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gcGFyc2VGbG9hdCgkaW1hZ2UuYXR0cignd2lkdGgnKSk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcGFyc2VGbG9hdCgkaW1hZ2UuYXR0cignaGVpZ2h0JykpO1xuICAgICAgICAgICAgaWYgKCRpbWFnZS5wcm9wKCd0YWdOYW1lJykgPT09ICdzdmcnKSB7XG4gICAgICAgICAgICAgIHdpZHRoID0gcGFyc2VGbG9hdCgkaW1hZ2VbMF0uZ2V0QkJveCgpLndpZHRoKTtcbiAgICAgICAgICAgICAgaGVpZ2h0ID0gcGFyc2VGbG9hdCgkaW1hZ2VbMF0uZ2V0QkJveCgpLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHdpZHRoKSAmJiAhaXNOYU4oaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAkZW50cnkuZGF0YSgnamcud2lkdGgnLCB3aWR0aCk7XG4gICAgICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5oZWlnaHQnLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAkZW50cnkuZGF0YSgnamcubG9hZGVkJywgJ3NraXBwZWQnKTtcbiAgICAgICAgICAgICAgc2tpcHBlZEltYWdlcyA9IHRydWU7XG4gICAgICAgICAgICAgIHRoYXQuc3RhcnRJbWdBbmFseXplcihmYWxzZSk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcsIGZhbHNlKTtcbiAgICAgICAgICBpbWFnZXNUb0xvYWQgPSB0cnVlO1xuICBcbiAgICAgICAgICAvLyBTcGlubmVyIHN0YXJ0XG4gICAgICAgICAgaWYgKCF0aGF0LmlzU3Bpbm5lckFjdGl2ZSgpKSB0aGF0LnN0YXJ0TG9hZGluZ1NwaW5uZXJBbmltYXRpb24oKTtcbiAgXG4gICAgICAgICAgdGhhdC5vbkltYWdlRXZlbnQoaW1hZ2VTcmMsIGZ1bmN0aW9uIChsb2FkSW1nKSB7IC8vIGltYWdlIGxvYWRlZFxuICAgICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLndpZHRoJywgbG9hZEltZy53aWR0aCk7XG4gICAgICAgICAgICAkZW50cnkuZGF0YSgnamcuaGVpZ2h0JywgbG9hZEltZy5oZWlnaHQpO1xuICAgICAgICAgICAgJGVudHJ5LmRhdGEoJ2pnLmxvYWRlZCcsIHRydWUpO1xuICAgICAgICAgICAgdGhhdC5zdGFydEltZ0FuYWx5emVyKGZhbHNlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7IC8vIGltYWdlIGxvYWQgZXJyb3JcbiAgICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnLCAnZXJyb3InKTtcbiAgICAgICAgICAgIHRoYXQuc3RhcnRJbWdBbmFseXplcihmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbnRyeS5kYXRhKCdqZy5sb2FkZWQnLCB0cnVlKTtcbiAgICAgICAgICAkZW50cnkuZGF0YSgnamcud2lkdGgnLCAkZW50cnkud2lkdGgoKSB8IHBhcnNlRmxvYXQoJGVudHJ5LmNzcygnd2lkdGgnKSkgfCAxKTtcbiAgICAgICAgICAkZW50cnkuZGF0YSgnamcuaGVpZ2h0JywgJGVudHJ5LmhlaWdodCgpIHwgcGFyc2VGbG9hdCgkZW50cnkuY3NzKCdoZWlnaHQnKSkgfCAxKTtcbiAgICAgICAgfVxuICBcbiAgICAgIH1cbiAgXG4gICAgfSk7XG4gIFxuICAgIGlmICghaW1hZ2VzVG9Mb2FkICYmICFza2lwcGVkSW1hZ2VzKSB0aGlzLnN0YXJ0SW1nQW5hbHl6ZXIoZmFsc2UpO1xuICAgIHRoaXMuY2hlY2tXaWR0aCgpO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIENoZWNrcyB0aGF0IGl0IGlzIGEgdmFsaWQgbnVtYmVyLiBJZiBhIHN0cmluZyBpcyBwYXNzZWQgaXQgaXMgY29udmVydGVkIHRvIGEgbnVtYmVyXG4gICAqXG4gICAqIEBwYXJhbSBzZXR0aW5nQ29udGFpbmVyIHRoZSBvYmplY3QgdGhhdCBjb250YWlucyB0aGUgc2V0dGluZyAodG8gYWxsb3cgdGhlIGNvbnZlcnNpb24pXG4gICAqIEBwYXJhbSBzZXR0aW5nTmFtZSB0aGUgc2V0dGluZyBuYW1lXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5jaGVja09yQ29udmVydE51bWJlciA9IGZ1bmN0aW9uIChzZXR0aW5nQ29udGFpbmVyLCBzZXR0aW5nTmFtZSkge1xuICAgIGlmICgkLnR5cGUoc2V0dGluZ0NvbnRhaW5lcltzZXR0aW5nTmFtZV0pID09PSAnc3RyaW5nJykge1xuICAgICAgc2V0dGluZ0NvbnRhaW5lcltzZXR0aW5nTmFtZV0gPSBwYXJzZUZsb2F0KHNldHRpbmdDb250YWluZXJbc2V0dGluZ05hbWVdKTtcbiAgICB9XG4gIFxuICAgIGlmICgkLnR5cGUoc2V0dGluZ0NvbnRhaW5lcltzZXR0aW5nTmFtZV0pID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKGlzTmFOKHNldHRpbmdDb250YWluZXJbc2V0dGluZ05hbWVdKSkgdGhyb3cgJ2ludmFsaWQgbnVtYmVyIGZvciAnICsgc2V0dGluZ05hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IHNldHRpbmdOYW1lICsgJyBtdXN0IGJlIGEgbnVtYmVyJztcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBzaXplUmFuZ2VTdWZmaXhlcyBhbmQsIGlmIG5lY2Vzc2FyeSwgY29udmVydHNcbiAgICogaXRzIGtleXMgZnJvbSBzdHJpbmcgKGUuZy4gb2xkIHNldHRpbmdzIHdpdGggJ2x0MTAwJykgdG8gaW50LlxuICAgKi9cbiAgSnVzdGlmaWVkR2FsbGVyeS5wcm90b3R5cGUuY2hlY2tTaXplUmFuZ2VzU3VmZml4ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCQudHlwZSh0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93ICdzaXplUmFuZ2VTdWZmaXhlcyBtdXN0IGJlIGRlZmluZWQgYW5kIG11c3QgYmUgYW4gb2JqZWN0JztcbiAgICB9XG4gIFxuICAgIHZhciBzdWZmaXhSYW5nZXMgPSBbXTtcbiAgICBmb3IgKHZhciByYW5nZUlkeCBpbiB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzKSB7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlcy5oYXNPd25Qcm9wZXJ0eShyYW5nZUlkeCkpIHN1ZmZpeFJhbmdlcy5wdXNoKHJhbmdlSWR4KTtcbiAgICB9XG4gIFxuICAgIHZhciBuZXdTaXplUm5nU3VmZml4ZXMgPSB7IDA6ICcnIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWZmaXhSYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICgkLnR5cGUoc3VmZml4UmFuZ2VzW2ldKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgbnVtSWR4ID0gcGFyc2VJbnQoc3VmZml4UmFuZ2VzW2ldLnJlcGxhY2UoL15bYS16XSsvLCAnJyksIDEwKTtcbiAgICAgICAgICBuZXdTaXplUm5nU3VmZml4ZXNbbnVtSWR4XSA9IHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXNbc3VmZml4UmFuZ2VzW2ldXTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93ICdzaXplUmFuZ2VTdWZmaXhlcyBrZXlzIG11c3QgY29udGFpbnMgY29ycmVjdCBudW1iZXJzICgnICsgZSArICcpJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3U2l6ZVJuZ1N1ZmZpeGVzW3N1ZmZpeFJhbmdlc1tpXV0gPSB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzW3N1ZmZpeFJhbmdlc1tpXV07XG4gICAgICB9XG4gICAgfVxuICBcbiAgICB0aGlzLnNldHRpbmdzLnNpemVSYW5nZVN1ZmZpeGVzID0gbmV3U2l6ZVJuZ1N1ZmZpeGVzO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIGNoZWNrIGFuZCBjb252ZXJ0IHRoZSBtYXhSb3dIZWlnaHQgc2V0dGluZ1xuICAgKiByZXF1aXJlcyByb3dIZWlnaHQgdG8gYmUgYWxyZWFkeSBzZXRcbiAgICogVE9ETzogc2hvdWxkIGJlIGFsd2F5cyBjYWxsZWQgd2hlbiBvbmx5IHJvd0hlaWdodCBpcyBjaGFuZ2VkXG4gICAqIEByZXR1cm4gbnVtYmVyIG9yIG51bGxcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnJldHJpZXZlTWF4Um93SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXdNYXhSb3dIZWlnaHQgPSBudWxsO1xuICAgIHZhciByb3dIZWlnaHQgPSB0aGlzLnNldHRpbmdzLnJvd0hlaWdodDtcbiAgXG4gICAgaWYgKCQudHlwZSh0aGlzLnNldHRpbmdzLm1heFJvd0hlaWdodCkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXhSb3dIZWlnaHQubWF0Y2goL15bMC05XSslJC8pKSB7XG4gICAgICAgIG5ld01heFJvd0hlaWdodCA9IHJvd0hlaWdodCAqIHBhcnNlRmxvYXQodGhpcy5zZXR0aW5ncy5tYXhSb3dIZWlnaHQubWF0Y2goL14oWzAtOV0rKSUkLylbMV0pIC8gMTAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3TWF4Um93SGVpZ2h0ID0gcGFyc2VGbG9hdCh0aGlzLnNldHRpbmdzLm1heFJvd0hlaWdodCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgkLnR5cGUodGhpcy5zZXR0aW5ncy5tYXhSb3dIZWlnaHQpID09PSAnbnVtYmVyJykge1xuICAgICAgbmV3TWF4Um93SGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5tYXhSb3dIZWlnaHQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLm1heFJvd0hlaWdodCA9PT0gZmFsc2UgfHwgdGhpcy5zZXR0aW5ncy5tYXhSb3dIZWlnaHQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93ICdtYXhSb3dIZWlnaHQgbXVzdCBiZSBhIG51bWJlciBvciBhIHBlcmNlbnRhZ2UnO1xuICAgIH1cbiAgXG4gICAgLy8gY2hlY2sgaWYgdGhlIGNvbnZlcnRlZCB2YWx1ZSBpcyBub3QgYSBudW1iZXJcbiAgICBpZiAoaXNOYU4obmV3TWF4Um93SGVpZ2h0KSkgdGhyb3cgJ2ludmFsaWQgbnVtYmVyIGZvciBtYXhSb3dIZWlnaHQnO1xuICBcbiAgICAvLyBjaGVjayB2YWx1ZXMsIG1heFJvd0hlaWdodCBtdXN0IGJlID49IHJvd0hlaWdodFxuICAgIGlmIChuZXdNYXhSb3dIZWlnaHQgPCByb3dIZWlnaHQpIG5ld01heFJvd0hlaWdodCA9IHJvd0hlaWdodDtcbiAgXG4gICAgcmV0dXJuIG5ld01heFJvd0hlaWdodDtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIHNldHRpbmdzXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5jaGVja1NldHRpbmdzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2hlY2tTaXplUmFuZ2VzU3VmZml4ZXMoKTtcbiAgXG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLCAncm93SGVpZ2h0Jyk7XG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLCAnbWFyZ2lucycpO1xuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncywgJ2JvcmRlcicpO1xuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncywgJ21heFJvd3NDb3VudCcpO1xuICBcbiAgICB2YXIgbGFzdFJvd01vZGVzID0gW1xuICAgICAgJ2p1c3RpZnknLFxuICAgICAgJ25vanVzdGlmeScsXG4gICAgICAnbGVmdCcsXG4gICAgICAnY2VudGVyJyxcbiAgICAgICdyaWdodCcsXG4gICAgICAnaGlkZSdcbiAgICBdO1xuICAgIGlmIChsYXN0Um93TW9kZXMuaW5kZXhPZih0aGlzLnNldHRpbmdzLmxhc3RSb3cpID09PSAtMSkge1xuICAgICAgdGhyb3cgJ2xhc3RSb3cgbXVzdCBiZSBvbmUgb2Y6ICcgKyBsYXN0Um93TW9kZXMuam9pbignLCAnKTtcbiAgICB9XG4gIFxuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncywgJ2p1c3RpZnlUaHJlc2hvbGQnKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5qdXN0aWZ5VGhyZXNob2xkIDwgMCB8fCB0aGlzLnNldHRpbmdzLmp1c3RpZnlUaHJlc2hvbGQgPiAxKSB7XG4gICAgICB0aHJvdyAnanVzdGlmeVRocmVzaG9sZCBtdXN0IGJlIGluIHRoZSBpbnRlcnZhbCBbMCwxXSc7XG4gICAgfVxuICAgIGlmICgkLnR5cGUodGhpcy5zZXR0aW5ncy5jc3NBbmltYXRpb24pICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93ICdjc3NBbmltYXRpb24gbXVzdCBiZSBhIGJvb2xlYW4nO1xuICAgIH1cbiAgXG4gICAgaWYgKCQudHlwZSh0aGlzLnNldHRpbmdzLmNhcHRpb25zKSAhPT0gJ2Jvb2xlYW4nKSB0aHJvdyAnY2FwdGlvbnMgbXVzdCBiZSBhIGJvb2xlYW4nO1xuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3MsICdhbmltYXRpb25EdXJhdGlvbicpO1xuICBcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLCAndmlzaWJsZU9wYWNpdHknKTtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3MudmlzaWJsZU9wYWNpdHkgPCAwIHx8XG4gICAgICB0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy52aXNpYmxlT3BhY2l0eSA+IDEpIHtcbiAgICAgIHRocm93ICdjYXB0aW9uU2V0dGluZ3MudmlzaWJsZU9wYWNpdHkgbXVzdCBiZSBpbiB0aGUgaW50ZXJ2YWwgWzAsIDFdJztcbiAgICB9XG4gIFxuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncy5jYXB0aW9uU2V0dGluZ3MsICdub25WaXNpYmxlT3BhY2l0eScpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLmNhcHRpb25TZXR0aW5ncy5ub25WaXNpYmxlT3BhY2l0eSA8IDAgfHxcbiAgICAgIHRoaXMuc2V0dGluZ3MuY2FwdGlvblNldHRpbmdzLm5vblZpc2libGVPcGFjaXR5ID4gMSkge1xuICAgICAgdGhyb3cgJ2NhcHRpb25TZXR0aW5ncy5ub25WaXNpYmxlT3BhY2l0eSBtdXN0IGJlIGluIHRoZSBpbnRlcnZhbCBbMCwgMV0nO1xuICAgIH1cbiAgXG4gICAgdGhpcy5jaGVja09yQ29udmVydE51bWJlcih0aGlzLnNldHRpbmdzLCAnaW1hZ2VzQW5pbWF0aW9uRHVyYXRpb24nKTtcbiAgICB0aGlzLmNoZWNrT3JDb252ZXJ0TnVtYmVyKHRoaXMuc2V0dGluZ3MsICdyZWZyZXNoVGltZScpO1xuICAgIHRoaXMuY2hlY2tPckNvbnZlcnROdW1iZXIodGhpcy5zZXR0aW5ncywgJ3JlZnJlc2hTZW5zaXRpdml0eScpO1xuICAgIGlmICgkLnR5cGUodGhpcy5zZXR0aW5ncy5yYW5kb21pemUpICE9PSAnYm9vbGVhbicpIHRocm93ICdyYW5kb21pemUgbXVzdCBiZSBhIGJvb2xlYW4nO1xuICAgIGlmICgkLnR5cGUodGhpcy5zZXR0aW5ncy5zZWxlY3RvcikgIT09ICdzdHJpbmcnKSB0aHJvdyAnc2VsZWN0b3IgbXVzdCBiZSBhIHN0cmluZyc7XG4gIFxuICAgIGlmICh0aGlzLnNldHRpbmdzLnNvcnQgIT09IGZhbHNlICYmICEkLmlzRnVuY3Rpb24odGhpcy5zZXR0aW5ncy5zb3J0KSkge1xuICAgICAgdGhyb3cgJ3NvcnQgbXVzdCBiZSBmYWxzZSBvciBhIGNvbXBhcmlzb24gZnVuY3Rpb24nO1xuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZmlsdGVyICE9PSBmYWxzZSAmJiAhJC5pc0Z1bmN0aW9uKHRoaXMuc2V0dGluZ3MuZmlsdGVyKSAmJlxuICAgICAgJC50eXBlKHRoaXMuc2V0dGluZ3MuZmlsdGVyKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93ICdmaWx0ZXIgbXVzdCBiZSBmYWxzZSwgYSBzdHJpbmcgb3IgYSBmaWx0ZXIgZnVuY3Rpb24nO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBJdCBicmluZ3MgYWxsIHRoZSBpbmRleGVzIGZyb20gdGhlIHNpemVSYW5nZVN1ZmZpeGVzIGFuZCBpdCBvcmRlcnMgdGhlbS4gVGhleSBhcmUgdGhlbiBzb3J0ZWQgYW5kIHJldHVybmVkLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IHNvcnRlZCBzdWZmaXggcmFuZ2VzXG4gICAqL1xuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5yZXRyaWV2ZVN1ZmZpeFJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3VmZml4UmFuZ2VzID0gW107XG4gICAgZm9yICh2YXIgcmFuZ2VJZHggaW4gdGhpcy5zZXR0aW5ncy5zaXplUmFuZ2VTdWZmaXhlcykge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2l6ZVJhbmdlU3VmZml4ZXMuaGFzT3duUHJvcGVydHkocmFuZ2VJZHgpKSBzdWZmaXhSYW5nZXMucHVzaChwYXJzZUludChyYW5nZUlkeCwgMTApKTtcbiAgICB9XG4gICAgc3VmZml4UmFuZ2VzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwOyB9KTtcbiAgICByZXR1cm4gc3VmZml4UmFuZ2VzO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZXhpc3Rpbmcgc2V0dGluZ3Mgb25seSBjaGFuZ2luZyBzb21lIG9mIHRoZW1cbiAgICpcbiAgICogQHBhcmFtIG5ld1NldHRpbmdzIHRoZSBuZXcgc2V0dGluZ3MgKG9yIGEgc3ViZ3JvdXAgb2YgdGhlbSlcbiAgICovXG4gIEp1c3RpZmllZEdhbGxlcnkucHJvdG90eXBlLnVwZGF0ZVNldHRpbmdzID0gZnVuY3Rpb24gKG5ld1NldHRpbmdzKSB7XG4gICAgLy8gSW4gdGhpcyBjYXNlIEp1c3RpZmllZCBHYWxsZXJ5IGhhcyBiZWVuIGNhbGxlZCBhZ2FpbiBjaGFuZ2luZyBvbmx5IHNvbWUgb3B0aW9uc1xuICAgIHRoaXMuc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgdGhpcy5zZXR0aW5ncywgbmV3U2V0dGluZ3MpO1xuICAgIHRoaXMuY2hlY2tTZXR0aW5ncygpO1xuICBcbiAgICAvLyBBcyByZXBvcnRlZCBpbiB0aGUgc2V0dGluZ3M6IG5lZ2F0aXZlIHZhbHVlID0gc2FtZSBhcyBtYXJnaW5zLCAwID0gZGlzYWJsZWRcbiAgICB0aGlzLmJvcmRlciA9IHRoaXMuc2V0dGluZ3MuYm9yZGVyID49IDAgPyB0aGlzLnNldHRpbmdzLmJvcmRlciA6IHRoaXMuc2V0dGluZ3MubWFyZ2lucztcbiAgXG4gICAgdGhpcy5tYXhSb3dIZWlnaHQgPSB0aGlzLnJldHJpZXZlTWF4Um93SGVpZ2h0KCk7XG4gICAgdGhpcy5zdWZmaXhSYW5nZXMgPSB0aGlzLnJldHJpZXZlU3VmZml4UmFuZ2VzKCk7XG4gIH07XG4gIFxuICBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5kZWZhdWx0cyA9IHtcbiAgICBzaXplUmFuZ2VTdWZmaXhlczoge30sIC8qIGUuZy4gRmxpY2tyIGNvbmZpZ3VyYXRpb25cbiAgICAgICAge1xuICAgICAgICAgIDEwMDogJ190JywgIC8vIHVzZWQgd2hlbiBsb25nZXN0IGlzIGxlc3MgdGhhbiAxMDBweFxuICAgICAgICAgIDI0MDogJ19tJywgIC8vIHVzZWQgd2hlbiBsb25nZXN0IGlzIGJldHdlZW4gMTAxcHggYW5kIDI0MHB4XG4gICAgICAgICAgMzIwOiAnX24nLCAgLy8gLi4uXG4gICAgICAgICAgNTAwOiAnJyxcbiAgICAgICAgICA2NDA6ICdfeicsXG4gICAgICAgICAgMTAyNDogJ19iJyAgLy8gdXNlZCBhcyBlbHNlIGNhc2UgYmVjYXVzZSBpdCBpcyB0aGUgbGFzdFxuICAgICAgICB9XG4gICAgKi9cbiAgICB0aHVtYm5haWxQYXRoOiB1bmRlZmluZWQsIC8qIElmIGRlZmluZWQsIHNpemVSYW5nZVN1ZmZpeGVzIGlzIG5vdCB1c2VkLCBhbmQgdGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGRldGVybWluZSB0aGVcbiAgICBwYXRoIHJlbGF0aXZlIHRvIGEgc3BlY2lmaWMgdGh1bWJuYWlsIHNpemUuIFRoZSBmdW5jdGlvbiBzaG91bGQgYWNjZXB0IHJlc3BlY3RpdmVseSB0aHJlZSBhcmd1bWVudHM6XG4gICAgY3VycmVudCBwYXRoLCB3aWR0aCBhbmQgaGVpZ2h0ICovXG4gICAgcm93SGVpZ2h0OiAxMjAsIC8vIHJlcXVpcmVkPyByZXF1aXJlZCB0byBiZSA+IDA/XG4gICAgbWF4Um93SGVpZ2h0OiBmYWxzZSwgLy8gZmFsc2Ugb3IgbmVnYXRpdmUgdmFsdWUgdG8gZGVhY3RpdmF0ZS4gUG9zaXRpdmUgbnVtYmVyIHRvIGV4cHJlc3MgdGhlIHZhbHVlIGluIHBpeGVscyxcbiAgICAvLyBBIHN0cmluZyAnWzAtOV0rJScgdG8gZXhwcmVzcyBpbiBwZXJjZW50YWdlIChlLmcuIDMwMCUgbWVhbnMgdGhhdCB0aGUgcm93IGhlaWdodFxuICAgIC8vIGNhbid0IGV4Y2VlZCAzICogcm93SGVpZ2h0KVxuICAgIG1heFJvd3NDb3VudDogMCwgLy8gbWF4aW11bSBudW1iZXIgb2Ygcm93cyB0byBiZSBkaXNwbGF5ZWQgKDAgPSBkaXNhYmxlZClcbiAgICBtYXJnaW5zOiAxLFxuICAgIGJvcmRlcjogLTEsIC8vIG5lZ2F0aXZlIHZhbHVlID0gc2FtZSBhcyBtYXJnaW5zLCAwID0gZGlzYWJsZWQsIGFueSBvdGhlciB2YWx1ZSB0byBzZXQgdGhlIGJvcmRlclxuICBcbiAgICBsYXN0Um93OiAnbm9qdXN0aWZ5JywgLy8g4oCmIHdoaWNoIGlzIHRoZSBzYW1lIGFzICdsZWZ0Jywgb3IgY2FuIGJlICdqdXN0aWZ5JywgJ2NlbnRlcicsICdyaWdodCcgb3IgJ2hpZGUnXG4gIFxuICAgIGp1c3RpZnlUaHJlc2hvbGQ6IDAuOTAsIC8qIGlmIHJvdyB3aWR0aCAvIGF2YWlsYWJsZSBzcGFjZSA+IDAuOTAgaXQgd2lsbCBiZSBhbHdheXMganVzdGlmaWVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKGkuZS4gbGFzdFJvdyBzZXR0aW5nIGlzIG5vdCBjb25zaWRlcmVkKSAqL1xuICAgIHdhaXRUaHVtYm5haWxzTG9hZDogdHJ1ZSxcbiAgICBjYXB0aW9uczogdHJ1ZSxcbiAgICBjc3NBbmltYXRpb246IHRydWUsXG4gICAgaW1hZ2VzQW5pbWF0aW9uRHVyYXRpb246IDUwMCwgLy8gaWdub3JlZCB3aXRoIGNzcyBhbmltYXRpb25zXG4gICAgY2FwdGlvblNldHRpbmdzOiB7IC8vIGlnbm9yZWQgd2l0aCBjc3MgYW5pbWF0aW9uc1xuICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDUwMCxcbiAgICAgIHZpc2libGVPcGFjaXR5OiAwLjcsXG4gICAgICBub25WaXNpYmxlT3BhY2l0eTogMC4wXG4gICAgfSxcbiAgICByZWw6IG51bGwsIC8vIHJld3JpdGUgdGhlIHJlbCBvZiBlYWNoIGFuYWx5emVkIGxpbmtzXG4gICAgdGFyZ2V0OiBudWxsLCAvLyByZXdyaXRlIHRoZSB0YXJnZXQgb2YgYWxsIGxpbmtzXG4gICAgZXh0ZW5zaW9uOiAvXFwuW14uXFxcXC9dKyQvLCAvLyByZWdleHAgdG8gY2FwdHVyZSB0aGUgZXh0ZW5zaW9uIG9mIGFuIGltYWdlXG4gICAgcmVmcmVzaFRpbWU6IDIwMCwgLy8gdGltZSBpbnRlcnZhbCAoaW4gbXMpIHRvIGNoZWNrIGlmIHRoZSBwYWdlIGNoYW5nZXMgaXRzIHdpZHRoXG4gICAgcmVmcmVzaFNlbnNpdGl2aXR5OiAwLCAvLyBjaGFuZ2UgaW4gd2lkdGggYWxsb3dlZCAoaW4gcHgpIHdpdGhvdXQgcmUtYnVpbGRpbmcgdGhlIGdhbGxlcnlcbiAgICByYW5kb21pemU6IGZhbHNlLFxuICAgIHJ0bDogZmFsc2UsIC8vIHJpZ2h0LXRvLWxlZnQgbW9kZVxuICAgIHNvcnQ6IGZhbHNlLCAvKlxuICAgICAgLSBmYWxzZTogdG8gZG8gbm90IHNvcnRcbiAgICAgIC0gZnVuY3Rpb246IHRvIHNvcnQgdGhlbSB1c2luZyB0aGUgZnVuY3Rpb24gYXMgY29tcGFyYXRvciAoc2VlIEFycmF5LnByb3RvdHlwZS5zb3J0KCkpXG4gICAgKi9cbiAgICBmaWx0ZXI6IGZhbHNlLCAvKlxuICAgICAgLSBmYWxzZSwgbnVsbCBvciB1bmRlZmluZWQ6IGZvciBhIGRpc2FibGVkIGZpbHRlclxuICAgICAgLSBhIHN0cmluZzogYW4gZW50cnkgaXMga2VwdCBpZiBlbnRyeS5pcyhmaWx0ZXIgc3RyaW5nKSByZXR1cm5zIHRydWVcbiAgICAgICAgICAgICAgICAgIHNlZSBqUXVlcnkncyAuaXMoKSBmdW5jdGlvbiBmb3IgZnVydGhlciBpbmZvcm1hdGlvblxuICAgICAgLSBhIGZ1bmN0aW9uOiBpbnZva2VkIHdpdGggYXJndW1lbnRzIChlbnRyeSwgaW5kZXgsIGFycmF5KS4gUmV0dXJuIHRydWUgdG8ga2VlcCB0aGUgZW50cnksIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgICAgICAgSXQgZm9sbG93cyB0aGUgc3BlY2lmaWNhdGlvbnMgb2YgdGhlIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoKSBmdW5jdGlvbiBvZiBKYXZhU2NyaXB0LlxuICAgICovXG4gICAgc2VsZWN0b3I6ICdhJywgLy8gVGhlIHNlbGVjdG9yIHRoYXQgaXMgdXNlZCB0byBrbm93IHdoYXQgYXJlIHRoZSBlbnRyaWVzIG9mIHRoZSBnYWxsZXJ5XG4gICAgaW1nU2VsZWN0b3I6ICc+IGltZywgPiBhID4gaW1nLCA+IHN2ZywgPiBhID4gc3ZnJywgLy8gVGhlIHNlbGVjdG9yIHRoYXQgaXMgdXNlZCB0byBrbm93IHdoYXQgYXJlIHRoZSBpbWFnZXMgb2YgZWFjaCBlbnRyeVxuICAgIHRyaWdnZXJFdmVudDogZnVuY3Rpb24gKGV2ZW50KSB7IC8vIFRoaXMgaXMgY2FsbGVkIHRvIHRyaWdnZXIgZXZlbnRzLCB0aGUgZGVmYXVsdCBiZWhhdmlvciBpcyB0byBjYWxsICQudHJpZ2dlclxuICAgICAgdGhpcy4kZ2FsbGVyeS50cmlnZ2VyKGV2ZW50KTsgIC8vIENvbnNpZGVyIHRoYXQgJ3RoaXMnIGlzIHRoaXMgc2V0IHRvIHRoZSBKdXN0aWZpZWRHYWxsZXJ5IG9iamVjdCwgc28gaXQgY2FuXG4gICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWNjZXNzIHRvIGZpZWxkcyBzdWNoIGFzICRnYWxsZXJ5LCB1c2VmdWwgdG8gdHJpZ2dlciBldmVudHMgd2l0aCBqUXVlcnkuXG4gIH07XG4gIFxuXG4gIC8qKlxuICAgKiBKdXN0aWZpZWQgR2FsbGVyeSBwbHVnaW4gZm9yIGpRdWVyeVxuICAgKlxuICAgKiBFdmVudHNcbiAgICogIC0gamcuY29tcGxldGUgOiBjYWxsZWQgd2hlbiBhbGwgdGhlIGdhbGxlcnkgaGFzIGJlZW4gY3JlYXRlZFxuICAgKiAgLSBqZy5yZXNpemUgOiBjYWxsZWQgd2hlbiB0aGUgZ2FsbGVyeSBoYXMgYmVlbiByZXNpemVkXG4gICAqICAtIGpnLnJvd2ZsdXNoIDogd2hlbiBhIG5ldyByb3cgYXBwZWFyc1xuICAgKlxuICAgKiBAcGFyYW0gYXJnIHRoZSBhY3Rpb24gKG9yIHRoZSBzZXR0aW5ncykgcGFzc2VkIHdoZW4gdGhlIHBsdWdpbiBpcyBjYWxsZWRcbiAgICogQHJldHVybnMgeyp9IHRoZSBvYmplY3QgaXRzZWxmXG4gICAqL1xuICAkLmZuLmp1c3RpZmllZEdhbGxlcnkgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGdhbGxlcnkpIHtcblxuICAgICAgdmFyICRnYWxsZXJ5ID0gJChnYWxsZXJ5KTtcbiAgICAgICRnYWxsZXJ5LmFkZENsYXNzKCdqdXN0aWZpZWQtZ2FsbGVyeScpO1xuXG4gICAgICB2YXIgY29udHJvbGxlciA9ICRnYWxsZXJ5LmRhdGEoJ2pnLmNvbnRyb2xsZXInKTtcbiAgICAgIGlmICh0eXBlb2YgY29udHJvbGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGNvbnRyb2xsZXIgYW5kIGFzc2lnbiBpdCB0byB0aGUgb2JqZWN0IGRhdGFcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcgIT09ICd1bmRlZmluZWQnICYmIGFyZyAhPT0gbnVsbCAmJiAkLnR5cGUoYXJnKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpZiAoYXJnID09PSAnZGVzdHJveScpIHJldHVybjsgLy8gSnVzdCBhIGNhbGwgdG8gYW4gdW5leGlzdGluZyBvYmplY3RcbiAgICAgICAgICB0aHJvdyAnVGhlIGFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0JztcbiAgICAgICAgfVxuICAgICAgICBjb250cm9sbGVyID0gbmV3IEp1c3RpZmllZEdhbGxlcnkoJGdhbGxlcnksICQuZXh0ZW5kKHt9LCBKdXN0aWZpZWRHYWxsZXJ5LnByb3RvdHlwZS5kZWZhdWx0cywgYXJnKSk7XG4gICAgICAgICRnYWxsZXJ5LmRhdGEoJ2pnLmNvbnRyb2xsZXInLCBjb250cm9sbGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoYXJnID09PSAnbm9yZXdpbmQnKSB7XG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSB3ZSBkb24ndCByZXdpbmQ6IHdlIGFuYWx5emUgb25seSB0aGUgbGF0ZXN0IGltYWdlcyAoZS5nLiB0byBjb21wbGV0ZSB0aGUgbGFzdCB1bmZpbmlzaGVkIHJvd1xuICAgICAgICAvLyAuLi4gbGVmdCB0byBiZSBtb3JlIHJlYWRhYmxlXG4gICAgICB9IGVsc2UgaWYgKGFyZyA9PT0gJ2Rlc3Ryb3knKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuZGVzdHJveSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJbiB0aGlzIGNhc2UgSnVzdGlmaWVkIEdhbGxlcnkgaGFzIGJlZW4gY2FsbGVkIGFnYWluIGNoYW5naW5nIG9ubHkgc29tZSBvcHRpb25zXG4gICAgICAgIGNvbnRyb2xsZXIudXBkYXRlU2V0dGluZ3MoYXJnKTtcbiAgICAgICAgY29udHJvbGxlci5yZXdpbmQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHRoZSBlbnRyaWVzIGxpc3RcbiAgICAgIGlmICghY29udHJvbGxlci51cGRhdGVFbnRyaWVzKGFyZyA9PT0gJ25vcmV3aW5kJykpIHJldHVybjtcblxuICAgICAgLy8gSW5pdCBqdXN0aWZpZWQgZ2FsbGVyeVxuICAgICAgY29udHJvbGxlci5pbml0KCk7XG5cbiAgICB9KTtcbiAgfTtcblxufSkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==