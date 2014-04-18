/*!
 * jQuery Height Equalizer Plugin
 *
 * Copyright 2014 Hideki Abe <hideki.abe@anothersky.pw>
 * Released under the MIT license
 *
 * Version: 1.0.0
 * Date: 2014-04-18
 */
;(function ($, window, document, undefined) {
    "use strict";

    var pluginName = "heightEqualizer",
        defaults = {
            collect: function ($parent) {
                return $parent.children();
            },
            groupBy: null,
            checkFontResize: true
        };

    function HeightEqualizer(parent, options) {
        this.$parent = $(parent);
        this.$window = null;
        this.$body = null;
        this.$target = null;
        this.fontSize = null;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    HeightEqualizer.prototype = {
        _getElemHeight: function ($elem) {
            if ($elem.css("boxSizing") === "border-box") {
                return $elem.outerHeight();
            } else {
                return $elem.height();
            }
        },

        _getArrangeHeight: function (height, nElem) {
            var groupBy = this.options.groupBy,
                max,
                i = 0;

            if (groupBy && 0 < groupBy && groupBy < nElem) {
                // groupBy個毎に高さを揃える
                while (i < nElem) {
                    if (i % groupBy === 0) {
                        max = Math.max.apply(Math, height.slice(i, i + groupBy));
                    }
                    height[i] = max;
                    i += 1;
                }
            } else {
                // 一番高い要素の高さに揃える
                max = Math.max.apply(Math, height);
                while (i < nElem) {
                    height[i] = max;
                    i += 1;
                }
            }

            return height;
        },

        _setHeight: function (height, nElem) {
            var i = 0;

            while (i < nElem) {
                if (height.length > 0) {
                    this.$target.eq(i).css("height", height[i] + "px");
                } else {
                    this.$target.eq(i).css("height", "");
                }
                i += 1;
            }
        },

        doEqualize: function () {
            var height = [],
                nElem = this.$target.length,
                i = 0;

            // 設定値をクリア
            this._setHeight([], nElem);

            // 高さを収集
            while (i < nElem) {
                height.push(this._getElemHeight(this.$target.eq(i)));
                i += 1;
            }

            // 揃える高さを算出
            height = this._getArrangeHeight(height, nElem);

            // 要素に高さを設定
            this._setHeight(height, nElem);
        },

        checkFontSize: function () {
            var currentFontSize = this.$body.css("fontSize");

            if (this.fontSize !== currentFontSize) {
                this.fontSize = currentFontSize;
                this.$window.trigger("fontresize");
            }
        },

        init: function () {
            this.$window = $(window);
            this.$target = this.options.collect.call(this, this.$parent);
            this.$window.on("load resize fontresize", $.proxy(this.doEqualize, this));

            if (this.options.checkFontResize) {
                // テキストサイズのみの変更を監視
                this.$body = $("body");
                this.fontSize = this.$body.css("fontSize");
                window.setInterval($.proxy(this.checkFontSize, this), 200);
            }
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new HeightEqualizer(this, options));
            }
        });
    };
})(jQuery, window, document);
