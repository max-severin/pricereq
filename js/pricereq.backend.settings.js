/**
 * pricereq.backend.settings.js
 * Module pricereqBackendSettings
 */

/*global $, pricereqBackendSettings */

var pricereqBackendSettings = (function () { "use strict";
    //---------------- BEGIN MODULE SCOPE VARIABLES ---------------
    var
        farbtastic_url = "{$wa_url}wa-content/js/farbtastic/farbtastic.js?{$wa->version(true)}",
        htmlTagsEncode, htmlTagsDecode,
        addPricereqForm, checkCommentStatus, initColorPicker, setColorPickerElement, setColorPicker, onFormSubmit, changeColorPickerInputValue,
        textBlockHtmlChange, textPlaceholderChange, textInputValueChange, styleChange, changeHandlers, onStatusChange, onCommentStatusChange,
        initModule;
    //----------------- END MODULE SCOPE VARIABLES ----------------

    //--------------------- BEGIN DOM METHODS ---------------------
    htmlTagsEncode = function (val) {
        return $("<div/>").text(val).html()
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    htmlTagsDecode = function (val) {
        return $("<div/>").html(val).text();
    };

    addPricereqForm = function ($content, statusChanged) {
        statusChanged = (typeof statusChanged !== 'undefined') ? statusChanged : false;
        
        var pricereqStatus = "{if isset($pricereq_settings.status)}{$pricereq_settings.status}{/if}",
            styleFormBackground = '#' + $('#pricereq_shop_pricereq_style_form_background').val(),
            styleFormHeight = $('#pricereq_shop_pricereq_style_form_height').val() + 'px',
            styleFormWidth = $('#pricereq_shop_pricereq_style_form_width').val() + 'px',
            styleHeaderBackground = 'background: #' + $('#pricereq_shop_pricereq_style_header_background').val() + ';',
            styleHeaderTextColor = 'color: #' + $('#pricereq_shop_pricereq_style_header_text_color').val() + ';',
            textHeaderTitle = htmlTagsEncode( $('#pricereq_shop_pricereq_text_header_title').val() ),
            textNamePlaceholder = htmlTagsEncode( $('#pricereq_shop_pricereq_text_name_placeholder').val() ),
            textPhonePlaceholder = htmlTagsEncode( $('#pricereq_shop_pricereq_text_phone_placeholder').val() ),
            textEmailPlaceholder = htmlTagsEncode( $('#pricereq_shop_pricereq_text_email_placeholder').val() ),
            textCommentPlaceholder = htmlTagsEncode( $('#pricereq_shop_pricereq_text_comment_placeholder').val() ),
            textSubmitButton = htmlTagsEncode( $('#pricereq_shop_pricereq_text_submit_button').val() ),
            styleSubmitBackground = 'background: #' + $('#pricereq_shop_pricereq_style_submit_background').val() + ';',
            styleSubmitTextColor = 'color: #' + $('#pricereq_shop_pricereq_style_submit_text_color').val() + ';',
            styleSubmitHeight = 'height: ' + $('#pricereq_shop_pricereq_style_submit_height').val() + 'px;',
            styleSubmitWidth = 'width: ' + $('#pricereq_shop_pricereq_style_submit_width').val() + 'px;';
        
        var form = $('<form />');

        if (pricereqStatus === 'on' || statusChanged === true) {
            form.addClass('price-req-form').css({
                'background': styleFormBackground,
                'height': styleFormHeight,
                'width': styleFormWidth
            }).prepend(
                '<div class="price-req-header" style="' + styleHeaderBackground + styleHeaderTextColor + '">' + textHeaderTitle + '<span id="price-req-close-x">x</span></div>' +
                '<div class="price-req-input"><input type="text" name="pricereq-name" placeholder="' + textNamePlaceholder + '" value="" /></div>' +
                '<div class="price-req-input"><input type="text" name="pricereq-phone" placeholder="' + textPhonePlaceholder + '" value="" /></div>' +
                '<div class="price-req-input"><input type="text" name="pricereq-email" placeholder="' + textEmailPlaceholder + '" value="" /></div>' +
                '<div class="price-req-input"><textarea name="comment" placeholder="' + textCommentPlaceholder + '"></textarea></div>' +
                '<div class="price-req-input"><input id="price-req-submit" type="submit" value="' + textSubmitButton + '" disabled="disabled" style="' + styleSubmitBackground + styleSubmitTextColor + styleSubmitHeight + styleSubmitWidth + '" /></div>'
            );

            $content.before(form);

            $('.price-req-form').fadeIn('500');

            checkCommentStatus();
        }
    };

    checkCommentStatus = function () {
        var pricereqCommentStatus = "{if isset($pricereq_settings.comment_status)}{$pricereq_settings.comment_status}{/if}";

        if (pricereqCommentStatus !== 'on') {
            $('textarea[name="comment"]').parent('.price-req-input').hide();
        }
    };

    initColorPicker = function (elements, init) {
    	if ($.fn.farbtastic) {
            init(elements);
        } else {
            $.ajax({
                dataType: "script",
                url: farbtastic_url,
                cache: true
            }).done(function () {
                init(elements);
            });
        }
    };

    setColorPickerElement = function (el) {
        var color_wrapper = el.closest('.value');
        var color_picker = color_wrapper.find('.s-colorpicker');
        var color_replacer = color_wrapper.find('.s-color-replacer');
        var color_input = color_wrapper.find('.s-color');

        var farbtastic = $.farbtastic(color_picker, function(color) {
            color_replacer.find('i').css('background', color);
            color_input.val(color.substr(1));
            color_input.trigger('change');
        });

        farbtastic.setColor('#'+color_input.val());

        color_replacer.click(function () {
            color_picker.slideToggle(200);
            return false;
        });
    };

    setColorPicker = function (color_elements) {
        for (var i = 0; i < color_elements.length; i++) {

            setColorPickerElement( $(color_elements[i]) );

        }
    };
    //--------------------- END DOM METHODS -----------------------

    //------------------- BEGIN EVENT HANDLERS --------------------
    onFormSubmit = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        var f = $(this);

        $.post( f.attr('action'), f.serialize(), function (response) {
            if ( response.status == 'ok' ) {
                $.plugins.message('success', response.data.message);

                f.find('.submit .button').removeClass('red').addClass('green');
                $("#plugins-settings-form-status").hide()
                $("#plugins-settings-form-status span").html(response.data.message);
                $("#plugins-settings-form-status").fadeIn('slow', function () {
                    $(this).fadeOut(1000);
                });

                var pricereqTab = $("#wa-app #mainmenu .tabs").find('li a[href="?plugin=pricereq"]').closest('li');

                if ( $("#plugins-settings-form select[name='shop_pricereq[status]']").val() === 'on' ) {
                    if (pricereqTab.length === 0) {
                        $("#wa-app #mainmenu .tabs li:last").before('<li class="no-tab"><a href="?plugin=pricereq">{_wp("Price request")}</a></li>');
                    }
                } else {
                    pricereqTab.remove();
                }
            } else {
                $.plugins.message('error', response.errors || []);

                f.find('.submit .button').removeClass('green').addClass('red');
                $("#plugins-settings-form-status").hide();
                $("#plugins-settings-form-status span").html(response.errors.join(', '));
                $("#plugins-settings-form-status").fadeIn('slow');
            }
        }, "json");
    };

    textBlockHtmlChange = function (el_changed, el_changing) {
        el_changed.on('change', function (){
            $(document).find(el_changing).html( htmlTagsEncode(el_changed.val()) );
        });
    };

    textPlaceholderChange = function (el_changed, el_changing) {
        el_changed.on('change', function (){
            $(document).find(el_changing).attr('placeholder', el_changed.val());
        });
    };

    textInputValueChange = function (el_changed, el_changing) {
        el_changed.on('change', function (){
            $(document).find(el_changing).val(el_changed.val());
        });
    };

    styleChange = function (el_changed, el_changing, css_style_name, stype_postfix, stype_prefix) {
        el_changed.on('change', function (){
            $(document).find(el_changing).css(css_style_name, stype_prefix + el_changed.val() + stype_postfix);
        });
    };

    changeHandlers = function () {
        textBlockHtmlChange( $('#pricereq_shop_pricereq_text_header_title'), '.price-req-header' );
        textPlaceholderChange( $('#pricereq_shop_pricereq_text_name_placeholder'), '.price-req-input input[name="pricereq-name"]' );
        textPlaceholderChange( $('#pricereq_shop_pricereq_text_phone_placeholder'), '.price-req-input input[name="pricereq-phone"]' );
        textPlaceholderChange( $('#pricereq_shop_pricereq_text_email_placeholder'), '.price-req-input input[name="pricereq-email"]' );
        textPlaceholderChange( $('#pricereq_shop_pricereq_text_comment_placeholder'), '.price-req-input textarea[name="comment"]' );
        textInputValueChange( $('#pricereq_shop_pricereq_text_submit_button'), '#price-req-submit' );

        styleChange($('#pricereq_shop_pricereq_style_form_width'), '.price-req-form', 'width', 'px', '');
        styleChange($('#pricereq_shop_pricereq_style_form_height'), '.price-req-form', 'height', 'px', '');

        styleChange($('#pricereq_shop_pricereq_style_form_background'), '.price-req-form', 'background', '', '#');
        styleChange($('#pricereq_shop_pricereq_style_header_background'), '.price-req-header', 'background', '', '#');
        styleChange($('#pricereq_shop_pricereq_style_header_text_color'), '.price-req-header', 'color', '', '#');

        styleChange($('#pricereq_shop_pricereq_style_submit_width'), '#price-req-submit', 'width', 'px', '');
        styleChange($('#pricereq_shop_pricereq_style_submit_height'), '#price-req-submit', 'height', 'px', '');

        styleChange($('#pricereq_shop_pricereq_style_submit_background'), '#price-req-submit', 'background', '', '#');
        styleChange($('#pricereq_shop_pricereq_style_submit_text_color'), '#price-req-submit', 'color', '', '#');
    };

    onStatusChange = function () {
        var t = $(this);

        if (t.val() === 'on') {
            addPricereqForm( $('#wa-plugins-content .form'), true );
        } else {
            $('.price-req-form').remove();
        }
    };

    onCommentStatusChange = function () {
        var t = $(this);

        if (t.val() === 'on') {
            $('textarea[name="comment"]').parent('.price-req-input').show();
        } else {
            $('textarea[name="comment"]').parent('.price-req-input').hide();
        }
    };

    changeColorPickerInputValue = function (input, $color) {
        var color = 0xFFFFFF & parseInt(('' + input.value + 'FFFFFF').replace(/[^0-9A-F]+/gi, '').substr(0, 6), 16);
        $color.css('background', (0xF000000 | color).toString(16).toUpperCase().replace(/^F/, '#'));
    };
    //------------------- END EVENT HANDLERS ----------------------

    //------------------- BEGIN PUBLIC METHODS --------------------
    initModule = function () {
        $('#plugins-settings-form').on('submit', onFormSubmit);

        $('#pricereq_shop_pricereq_status').on('change', onStatusChange);

        $('#pricereq_shop_pricereq_comment_status').on('change', onCommentStatusChange);

        addPricereqForm( $('#wa-plugins-content .form') );

        var color_elements = [
            '#pricereq_shop_pricereq_style_form_background',
            '#pricereq_shop_pricereq_style_header_background',
            '#pricereq_shop_pricereq_style_header_text_color',
            '#pricereq_shop_pricereq_style_submit_background',
            '#pricereq_shop_pricereq_style_submit_text_color',
            '#pricereq_shop_pricereq_style_close_ok_background',
            '#pricereq_shop_pricereq_style_close_error_background',
            '#pricereq_shop_pricereq_style_thanks_text_color'
        ];
        initColorPicker( color_elements, setColorPicker );

        var timer = {};
        $('.s-color').unbind('keydown').bind('keydown', function () {
            if (timer[this.name]) {
                clearTimeout(timer[this.name]);
            }
            var input = this;
            timer[this.name] = setTimeout(function () {
                var $color = $(input).parent().find('.icon16.color');
                changeColorPickerInputValue(input, $color);
            }, 300);
        });

        changeHandlers();

        checkCommentStatus();        

        $('.plugin-links a').css({
            'display': 'block',
            'top': '-500px'
        }).animate({
            'top': '0'
        }, 500).animate({
            'top': '-25px'
        }, 100).animate({
            'top': '-35px'
        }, 100).animate({
            'top': '0'
        }, 250);
    };

    return {
        initModule: initModule
    };
    //------------------- END PUBLIC METHODS ----------------------
}());