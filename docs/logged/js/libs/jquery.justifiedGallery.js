/*! For license information please see jquery.justifiedGallery.js.LICENSE.txt */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(i,e){return void 0===e&&(e="undefined"!=typeof window?require("jquery"):require("jquery")(i)),t(e),e}:t(jQuery)}((function(t){var i=function(i,e){this.settings=e,this.checkSettings(),this.imgAnalyzerTimeout=null,this.entries=null,this.buildingRow={entriesBuff:[],width:0,height:0,aspectRatio:0},this.lastFetchedEntry=null,this.lastAnalyzedIndex=-1,this.yield={every:2,flushed:0},this.border=e.border>=0?e.border:e.margins,this.maxRowHeight=this.retrieveMaxRowHeight(),this.suffixRanges=this.retrieveSuffixRanges(),this.offY=this.border,this.rows=0,this.spinner={phase:0,timeSlot:150,$el:t('<div class="jg-spinner"><span></span><span></span><span></span></div>'),intervalId:null},this.scrollBarOn=!1,this.checkWidthIntervalId=null,this.galleryWidth=i.width(),this.$gallery=i};i.prototype.getSuffix=function(t,i){var e,s;for(e=t>i?t:i,s=0;s<this.suffixRanges.length;s++)if(e<=this.suffixRanges[s])return this.settings.sizeRangeSuffixes[this.suffixRanges[s]];return this.settings.sizeRangeSuffixes[this.suffixRanges[s-1]]},i.prototype.removeSuffix=function(t,i){return t.substring(0,t.length-i.length)},i.prototype.endsWith=function(t,i){return-1!==t.indexOf(i,t.length-i.length)},i.prototype.getUsedSuffix=function(t){for(var i in this.settings.sizeRangeSuffixes)if(this.settings.sizeRangeSuffixes.hasOwnProperty(i)){if(0===this.settings.sizeRangeSuffixes[i].length)continue;if(this.endsWith(t,this.settings.sizeRangeSuffixes[i]))return this.settings.sizeRangeSuffixes[i]}return""},i.prototype.newSrc=function(t,i,e,s){var n;if(this.settings.thumbnailPath)n=this.settings.thumbnailPath(t,i,e,s);else{var r=t.match(this.settings.extension),o=null!==r?r[0]:"";n=t.replace(this.settings.extension,""),n=this.removeSuffix(n,this.getUsedSuffix(n)),n+=this.getSuffix(i,e)+o}return n},i.prototype.showImg=function(t,i){this.settings.cssAnimation?(t.addClass("jg-entry-visible"),i&&i()):(t.stop().fadeTo(this.settings.imagesAnimationDuration,1,i),t.find(this.settings.imgSelector).stop().fadeTo(this.settings.imagesAnimationDuration,1,i))},i.prototype.extractImgSrcFromImage=function(t){var i=t.data("safe-src"),e="data-safe-src";return void 0===i&&(i=t.attr("src"),e="src"),t.data("jg.originalSrc",i),t.data("jg.src",i),t.data("jg.originalSrcLoc",e),i},i.prototype.imgFromEntry=function(t){var i=t.find(this.settings.imgSelector);return 0===i.length?null:i},i.prototype.captionFromEntry=function(t){var i=t.find("> .jg-caption");return 0===i.length?null:i},i.prototype.displayEntry=function(t,i,e,s,n,r){t.width(s),t.height(r),t.css("top",e),t.css("left",i);var o=this.imgFromEntry(t);if(null!==o){o.css("width",s),o.css("height",n),o.css("margin-left",-s/2),o.css("margin-top",-n/2);var a=o.data("jg.src");if(a){a=this.newSrc(a,s,n,o[0]),o.one("error",(function(){this.resetImgSrc(o)}));var h=function(){o.attr("src",a)};"skipped"===t.data("jg.loaded")&&a?this.onImageEvent(a,function(){this.showImg(t,h),t.data("jg.loaded",!0)}.bind(this)):this.showImg(t,h)}}else this.showImg(t);this.displayEntryCaption(t)},i.prototype.displayEntryCaption=function(i){var e=this.imgFromEntry(i);if(null!==e&&this.settings.captions){var s=this.captionFromEntry(i);if(null===s){var n=e.attr("alt");this.isValidCaption(n)||(n=i.attr("title")),this.isValidCaption(n)&&(s=t('<div class="jg-caption">'+n+"</div>"),i.append(s),i.data("jg.createdCaption",!0))}null!==s&&(this.settings.cssAnimation||s.stop().fadeTo(0,this.settings.captionSettings.nonVisibleOpacity),this.addCaptionEventsHandlers(i))}else this.removeCaptionEventsHandlers(i)},i.prototype.isValidCaption=function(t){return void 0!==t&&t.length>0},i.prototype.onEntryMouseEnterForCaption=function(i){var e=this.captionFromEntry(t(i.currentTarget));this.settings.cssAnimation?e.addClass("jg-caption-visible").removeClass("jg-caption-hidden"):e.stop().fadeTo(this.settings.captionSettings.animationDuration,this.settings.captionSettings.visibleOpacity)},i.prototype.onEntryMouseLeaveForCaption=function(i){var e=this.captionFromEntry(t(i.currentTarget));this.settings.cssAnimation?e.removeClass("jg-caption-visible").removeClass("jg-caption-hidden"):e.stop().fadeTo(this.settings.captionSettings.animationDuration,this.settings.captionSettings.nonVisibleOpacity)},i.prototype.addCaptionEventsHandlers=function(i){var e=i.data("jg.captionMouseEvents");void 0===e&&(e={mouseenter:t.proxy(this.onEntryMouseEnterForCaption,this),mouseleave:t.proxy(this.onEntryMouseLeaveForCaption,this)},i.on("mouseenter",void 0,void 0,e.mouseenter),i.on("mouseleave",void 0,void 0,e.mouseleave),i.data("jg.captionMouseEvents",e))},i.prototype.removeCaptionEventsHandlers=function(t){var i=t.data("jg.captionMouseEvents");void 0!==i&&(t.off("mouseenter",void 0,i.mouseenter),t.off("mouseleave",void 0,i.mouseleave),t.removeData("jg.captionMouseEvents"))},i.prototype.clearBuildingRow=function(){this.buildingRow.entriesBuff=[],this.buildingRow.aspectRatio=0,this.buildingRow.width=0},i.prototype.prepareBuildingRow=function(t,i){var e,s,n,r,o,a=!0,h=0,g=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*this.settings.margins,l=g/this.buildingRow.aspectRatio,u=this.settings.rowHeight,d=this.buildingRow.width/g>this.settings.justifyThreshold;if(i||t&&"hide"===this.settings.lastRow&&!d){for(e=0;e<this.buildingRow.entriesBuff.length;e++)s=this.buildingRow.entriesBuff[e],this.settings.cssAnimation?s.removeClass("jg-entry-visible"):(s.stop().fadeTo(0,.1),s.find("> img, > a > img").fadeTo(0,0));return-1}for(t&&!d&&"justify"!==this.settings.lastRow&&"hide"!==this.settings.lastRow&&(a=!1,this.rows>0&&(a=(u=(this.offY-this.border-this.settings.margins*this.rows)/this.rows)*this.buildingRow.aspectRatio/g>this.settings.justifyThreshold)),e=0;e<this.buildingRow.entriesBuff.length;e++)n=(s=this.buildingRow.entriesBuff[e]).data("jg.width")/s.data("jg.height"),a?(r=e===this.buildingRow.entriesBuff.length-1?g:l*n,o=l):(r=u*n,o=u),g-=Math.round(r),s.data("jg.jwidth",Math.round(r)),s.data("jg.jheight",Math.ceil(o)),(0===e||h>o)&&(h=o);return this.buildingRow.height=h,a},i.prototype.flushRow=function(t,i){var e,s,n,r=this.settings,o=this.border;if(s=this.prepareBuildingRow(t,i),i||t&&"hide"===r.lastRow&&-1===s)this.clearBuildingRow();else{if(this.maxRowHeight&&this.maxRowHeight<this.buildingRow.height&&(this.buildingRow.height=this.maxRowHeight),t&&("center"===r.lastRow||"right"===r.lastRow)){var a=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*r.margins;for(n=0;n<this.buildingRow.entriesBuff.length;n++)a-=(e=this.buildingRow.entriesBuff[n]).data("jg.jwidth");"center"===r.lastRow?o+=Math.round(a/2):"right"===r.lastRow&&(o+=a)}var h=this.buildingRow.entriesBuff.length-1;for(n=0;n<=h;n++)e=this.buildingRow.entriesBuff[this.settings.rtl?h-n:n],this.displayEntry(e,o,this.offY,e.data("jg.jwidth"),e.data("jg.jheight"),this.buildingRow.height),o+=e.data("jg.jwidth")+r.margins;this.galleryHeightToSet=this.offY+this.buildingRow.height+this.border,this.setGalleryTempHeight(this.galleryHeightToSet+this.getSpinnerHeight()),(!t||this.buildingRow.height<=r.rowHeight&&s)&&(this.offY+=this.buildingRow.height+r.margins,this.rows+=1,this.clearBuildingRow(),this.settings.triggerEvent.call(this,"jg.rowflush"))}};var e=0;i.prototype.rememberGalleryHeight=function(){e=this.$gallery.height(),this.$gallery.height(e)},i.prototype.setGalleryTempHeight=function(t){e=Math.max(t,e),this.$gallery.height(e)},i.prototype.setGalleryFinalHeight=function(t){e=t,this.$gallery.height(t)},i.prototype.checkWidth=function(){this.checkWidthIntervalId=setInterval(t.proxy((function(){if(this.$gallery.is(":visible")){var t=parseFloat(this.$gallery.width());Math.abs(t-this.galleryWidth)>this.settings.refreshSensitivity&&(this.galleryWidth=t,this.rewind(),this.rememberGalleryHeight(),this.startImgAnalyzer(!0))}}),this),this.settings.refreshTime)},i.prototype.isSpinnerActive=function(){return null!==this.spinner.intervalId},i.prototype.getSpinnerHeight=function(){return this.spinner.$el.innerHeight()},i.prototype.stopLoadingSpinnerAnimation=function(){clearInterval(this.spinner.intervalId),this.spinner.intervalId=null,this.setGalleryTempHeight(this.$gallery.height()-this.getSpinnerHeight()),this.spinner.$el.detach()},i.prototype.startLoadingSpinnerAnimation=function(){var t=this.spinner,i=t.$el.find("span");clearInterval(t.intervalId),this.$gallery.append(t.$el),this.setGalleryTempHeight(this.offY+this.buildingRow.height+this.getSpinnerHeight()),t.intervalId=setInterval((function(){t.phase<i.length?i.eq(t.phase).fadeTo(t.timeSlot,1):i.eq(t.phase-i.length).fadeTo(t.timeSlot,0),t.phase=(t.phase+1)%(2*i.length)}),t.timeSlot)},i.prototype.rewind=function(){this.lastFetchedEntry=null,this.lastAnalyzedIndex=-1,this.offY=this.border,this.rows=0,this.clearBuildingRow()},i.prototype.getSelectorWithoutSpinner=function(){return this.settings.selector+", div:not(.jg-spinner)"},i.prototype.getAllEntries=function(){var t=this.getSelectorWithoutSpinner();return this.$gallery.children(t).toArray()},i.prototype.updateEntries=function(i){var e;if(i&&null!=this.lastFetchedEntry){var s=this.getSelectorWithoutSpinner();e=t(this.lastFetchedEntry).nextAll(s).toArray()}else this.entries=[],e=this.getAllEntries();return e.length>0&&(t.isFunction(this.settings.sort)?e=this.sortArray(e):this.settings.randomize&&(e=this.shuffleArray(e)),this.lastFetchedEntry=e[e.length-1],this.settings.filter?e=this.filterArray(e):this.resetFilters(e)),this.entries=this.entries.concat(e),!0},i.prototype.insertToGallery=function(i){var e=this;t.each(i,(function(){t(this).appendTo(e.$gallery)}))},i.prototype.shuffleArray=function(t){var i,e,s;for(i=t.length-1;i>0;i--)e=Math.floor(Math.random()*(i+1)),s=t[i],t[i]=t[e],t[e]=s;return this.insertToGallery(t),t},i.prototype.sortArray=function(t){return t.sort(this.settings.sort),this.insertToGallery(t),t},i.prototype.resetFilters=function(i){for(var e=0;e<i.length;e++)t(i[e]).removeClass("jg-filtered")},i.prototype.filterArray=function(i){var e=this.settings;if("string"===t.type(e.filter))return i.filter((function(i){var s=t(i);return s.is(e.filter)?(s.removeClass("jg-filtered"),!0):(s.addClass("jg-filtered").removeClass("jg-visible"),!1)}));if(t.isFunction(e.filter)){for(var s=i.filter(e.filter),n=0;n<i.length;n++)-1===s.indexOf(i[n])?t(i[n]).addClass("jg-filtered").removeClass("jg-visible"):t(i[n]).removeClass("jg-filtered");return s}},i.prototype.resetImgSrc=function(t){"src"===t.data("jg.originalSrcLoc")?t.attr("src",t.data("jg.originalSrc")):t.attr("src","")},i.prototype.destroy=function(){clearInterval(this.checkWidthIntervalId),this.stopImgAnalyzerStarter(),t.each(this.getAllEntries(),t.proxy((function(i,e){var s=t(e);s.css("width",""),s.css("height",""),s.css("top",""),s.css("left",""),s.data("jg.loaded",void 0),s.removeClass("jg-entry jg-filtered jg-entry-visible");var n=this.imgFromEntry(s);n&&(n.css("width",""),n.css("height",""),n.css("margin-left",""),n.css("margin-top",""),this.resetImgSrc(n),n.data("jg.originalSrc",void 0),n.data("jg.originalSrcLoc",void 0),n.data("jg.src",void 0)),this.removeCaptionEventsHandlers(s);var r=this.captionFromEntry(s);s.data("jg.createdCaption")?(s.data("jg.createdCaption",void 0),null!==r&&r.remove()):null!==r&&r.fadeTo(0,1)}),this)),this.$gallery.css("height",""),this.$gallery.removeClass("justified-gallery"),this.$gallery.data("jg.controller",void 0),this.settings.triggerEvent.call(this,"jg.destroy")},i.prototype.analyzeImages=function(i){for(var e=this.lastAnalyzedIndex+1;e<this.entries.length;e++){var s=t(this.entries[e]);if(!0===s.data("jg.loaded")||"skipped"===s.data("jg.loaded")){var n=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*this.settings.margins,r=s.data("jg.width")/s.data("jg.height");if(this.buildingRow.entriesBuff.push(s),this.buildingRow.aspectRatio+=r,this.buildingRow.width+=r*this.settings.rowHeight,this.lastAnalyzedIndex=e,n/(this.buildingRow.aspectRatio+r)<this.settings.rowHeight&&(this.flushRow(!1,this.settings.maxRowsCount>0&&this.rows===this.settings.maxRowsCount),++this.yield.flushed>=this.yield.every))return void this.startImgAnalyzer(i)}else if("error"!==s.data("jg.loaded"))return}this.buildingRow.entriesBuff.length>0&&this.flushRow(!0,this.settings.maxRowsCount>0&&this.rows===this.settings.maxRowsCount),this.isSpinnerActive()&&this.stopLoadingSpinnerAnimation(),this.stopImgAnalyzerStarter(),this.setGalleryFinalHeight(this.galleryHeightToSet),this.settings.triggerEvent.call(this,i?"jg.resize":"jg.complete")},i.prototype.stopImgAnalyzerStarter=function(){this.yield.flushed=0,null!==this.imgAnalyzerTimeout&&(clearTimeout(this.imgAnalyzerTimeout),this.imgAnalyzerTimeout=null)},i.prototype.startImgAnalyzer=function(t){var i=this;this.stopImgAnalyzerStarter(),this.imgAnalyzerTimeout=setTimeout((function(){i.analyzeImages(t)}),.001)},i.prototype.onImageEvent=function(i,e,s){if(e||s){var n=new Image,r=t(n);e&&r.one("load",(function(){r.off("load error"),e(n)})),s&&r.one("error",(function(){r.off("load error"),s(n)})),n.src=i}},i.prototype.init=function(){var i=!1,e=!1,s=this;t.each(this.entries,(function(n,r){var o=t(r),a=s.imgFromEntry(o);if(o.addClass("jg-entry"),!0!==o.data("jg.loaded")&&"skipped"!==o.data("jg.loaded"))if(null!==s.settings.rel&&o.attr("rel",s.settings.rel),null!==s.settings.target&&o.attr("target",s.settings.target),null!==a){var h=s.extractImgSrcFromImage(a);if(!1===s.settings.waitThumbnailsLoad||!h){var g=parseFloat(a.attr("width")),l=parseFloat(a.attr("height"));if("svg"===a.prop("tagName")&&(g=parseFloat(a[0].getBBox().width),l=parseFloat(a[0].getBBox().height)),!isNaN(g)&&!isNaN(l))return o.data("jg.width",g),o.data("jg.height",l),o.data("jg.loaded","skipped"),e=!0,s.startImgAnalyzer(!1),!0}o.data("jg.loaded",!1),i=!0,s.isSpinnerActive()||s.startLoadingSpinnerAnimation(),s.onImageEvent(h,(function(t){o.data("jg.width",t.width),o.data("jg.height",t.height),o.data("jg.loaded",!0),s.startImgAnalyzer(!1)}),(function(){o.data("jg.loaded","error"),s.startImgAnalyzer(!1)}))}else o.data("jg.loaded",!0),o.data("jg.width",o.width()|parseFloat(o.css("width"))|1),o.data("jg.height",o.height()|parseFloat(o.css("height"))|1)})),i||e||this.startImgAnalyzer(!1),this.checkWidth()},i.prototype.checkOrConvertNumber=function(i,e){if("string"===t.type(i[e])&&(i[e]=parseFloat(i[e])),"number"!==t.type(i[e]))throw e+" must be a number";if(isNaN(i[e]))throw"invalid number for "+e},i.prototype.checkSizeRangesSuffixes=function(){if("object"!==t.type(this.settings.sizeRangeSuffixes))throw"sizeRangeSuffixes must be defined and must be an object";var i=[];for(var e in this.settings.sizeRangeSuffixes)this.settings.sizeRangeSuffixes.hasOwnProperty(e)&&i.push(e);for(var s={0:""},n=0;n<i.length;n++)if("string"===t.type(i[n]))try{s[parseInt(i[n].replace(/^[a-z]+/,""),10)]=this.settings.sizeRangeSuffixes[i[n]]}catch(t){throw"sizeRangeSuffixes keys must contains correct numbers ("+t+")"}else s[i[n]]=this.settings.sizeRangeSuffixes[i[n]];this.settings.sizeRangeSuffixes=s},i.prototype.retrieveMaxRowHeight=function(){var i=null,e=this.settings.rowHeight;if("string"===t.type(this.settings.maxRowHeight))i=this.settings.maxRowHeight.match(/^[0-9]+%$/)?e*parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1])/100:parseFloat(this.settings.maxRowHeight);else{if("number"!==t.type(this.settings.maxRowHeight)){if(!1===this.settings.maxRowHeight||null==this.settings.maxRowHeight)return null;throw"maxRowHeight must be a number or a percentage"}i=this.settings.maxRowHeight}if(isNaN(i))throw"invalid number for maxRowHeight";return i<e&&(i=e),i},i.prototype.checkSettings=function(){this.checkSizeRangesSuffixes(),this.checkOrConvertNumber(this.settings,"rowHeight"),this.checkOrConvertNumber(this.settings,"margins"),this.checkOrConvertNumber(this.settings,"border"),this.checkOrConvertNumber(this.settings,"maxRowsCount");var i=["justify","nojustify","left","center","right","hide"];if(-1===i.indexOf(this.settings.lastRow))throw"lastRow must be one of: "+i.join(", ");if(this.checkOrConvertNumber(this.settings,"justifyThreshold"),this.settings.justifyThreshold<0||this.settings.justifyThreshold>1)throw"justifyThreshold must be in the interval [0,1]";if("boolean"!==t.type(this.settings.cssAnimation))throw"cssAnimation must be a boolean";if("boolean"!==t.type(this.settings.captions))throw"captions must be a boolean";if(this.checkOrConvertNumber(this.settings.captionSettings,"animationDuration"),this.checkOrConvertNumber(this.settings.captionSettings,"visibleOpacity"),this.settings.captionSettings.visibleOpacity<0||this.settings.captionSettings.visibleOpacity>1)throw"captionSettings.visibleOpacity must be in the interval [0, 1]";if(this.checkOrConvertNumber(this.settings.captionSettings,"nonVisibleOpacity"),this.settings.captionSettings.nonVisibleOpacity<0||this.settings.captionSettings.nonVisibleOpacity>1)throw"captionSettings.nonVisibleOpacity must be in the interval [0, 1]";if(this.checkOrConvertNumber(this.settings,"imagesAnimationDuration"),this.checkOrConvertNumber(this.settings,"refreshTime"),this.checkOrConvertNumber(this.settings,"refreshSensitivity"),"boolean"!==t.type(this.settings.randomize))throw"randomize must be a boolean";if("string"!==t.type(this.settings.selector))throw"selector must be a string";if(!1!==this.settings.sort&&!t.isFunction(this.settings.sort))throw"sort must be false or a comparison function";if(!1!==this.settings.filter&&!t.isFunction(this.settings.filter)&&"string"!==t.type(this.settings.filter))throw"filter must be false, a string or a filter function"},i.prototype.retrieveSuffixRanges=function(){var t=[];for(var i in this.settings.sizeRangeSuffixes)this.settings.sizeRangeSuffixes.hasOwnProperty(i)&&t.push(parseInt(i,10));return t.sort((function(t,i){return t>i?1:t<i?-1:0})),t},i.prototype.updateSettings=function(i){this.settings=t.extend({},this.settings,i),this.checkSettings(),this.border=this.settings.border>=0?this.settings.border:this.settings.margins,this.maxRowHeight=this.retrieveMaxRowHeight(),this.suffixRanges=this.retrieveSuffixRanges()},i.prototype.defaults={sizeRangeSuffixes:{},thumbnailPath:void 0,rowHeight:120,maxRowHeight:!1,maxRowsCount:0,margins:1,border:-1,lastRow:"nojustify",justifyThreshold:.9,waitThumbnailsLoad:!0,captions:!0,cssAnimation:!0,imagesAnimationDuration:500,captionSettings:{animationDuration:500,visibleOpacity:.7,nonVisibleOpacity:0},rel:null,target:null,extension:/\.[^.\\/]+$/,refreshTime:200,refreshSensitivity:0,randomize:!1,rtl:!1,sort:!1,filter:!1,selector:"a",imgSelector:"> img, > a > img, > svg, > a > svg",triggerEvent:function(t){this.$gallery.trigger(t)}},t.fn.justifiedGallery=function(e){return this.each((function(s,n){var r=t(n);r.addClass("justified-gallery");var o=r.data("jg.controller");if(void 0===o){if(null!=e&&"object"!==t.type(e)){if("destroy"===e)return;throw"The argument must be an object"}o=new i(r,t.extend({},i.prototype.defaults,e)),r.data("jg.controller",o)}else if("norewind"===e);else{if("destroy"===e)return void o.destroy();o.updateSettings(e),o.rewind()}o.updateEntries("norewind"===e)&&o.init()}))}}));