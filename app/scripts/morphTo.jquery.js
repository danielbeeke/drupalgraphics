;(function ( $, window, document, undefined ) {

    var pluginName = "morphTo",
        defaults = {
            padding: 20
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element
        this.options = $.extend( {}, defaults, options)
        this._defaults = defaults
        this._name = pluginName
        this.init()
    }

    Plugin.prototype = {

        init: function() {

            var that = this

            $(that.element).addClass('morphTo-processed')

            $(that.element).on('click touchend', function (event) {

                if (!$(event.target).parents('.overlay').length) {
                    $('.overlay', that.element).css('clip', 'auto')

                    that.setClip()

                    $(that.element).addClass('expanded')

                    $('.overlay', that.element).css('clip', 'rect(' +
                        that.options.padding + 'px,' +
                        parseInt($(window).width() - that.options.padding) + 'px,' +
                        parseInt($(window).height() - that.options.padding) + 'px,' +
                        that.options.padding + 'px)'
                    )

                    return false
                }
            })

            $('.overlay--close', this.element).on('click touchend', function () {
                $(that.element).removeClass('expanded')
                that.setClip()
                return false
            })

        },

        setClip: function () {
            var that = this

            var offset = $(that.element).offset()

            var top = Math.max(0, offset.top - $(window).scrollTop())
            var bottom = parseInt(offset.top - $(window).scrollTop() + $(that.element).outerHeight())
            var left = Math.max(0, offset.left - $(window).scrollLeft())
            var right = Math.max(0, parseInt(offset.left - $(window).scrollLeft() + $(that.element).outerWidth()))

            $('.overlay', that.element).css('clip', 'rect(' +
                top + 'px,' +
                right + 'px,' +
                bottom + 'px,' +
                left + 'px)'
            )

        },

    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ))
            }
        })
    }

})( jQuery, window, document )
