/**
 * pricereq.frontend.js
 * Module pricereqFrontend
 */

/*global $, pricereqFrontend */

var pricereqFrontend = (function () { "use strict";
	//---------------- BEGIN MODULE SCOPE VARIABLES ---------------
	var
		onIdinhtmlClick, removePricereqForm, onFormSubmit, initModule;
	//----------------- END MODULE SCOPE VARIABLES ----------------

	//--------------------- BEGIN DOM METHODS ---------------------
	removePricereqForm = function () {
		$('.price-req-bg, .price-req-form').remove();
	};
	//--------------------- END DOM METHODS -----------------------

	//------------------- BEGIN EVENT HANDLERS --------------------
	onIdinhtmlClick = function (event) {
		event.preventDefault();

		removePricereqForm();

		var bg = $('<div/>'),
		    form = $('<form />'),
		    formTop = $(document).scrollTop() + $(window).height()/2 - '{$pricereq_settings.style_form_height}'/2,
		    productId = $(event.target).closest('form').find('input[name="product_id"]').val(),
		    pricereqCommentStatus = "{if isset($pricereq_settings.comment_status)}{$pricereq_settings.comment_status}{/if}";

		bg.addClass('price-req-bg').css('height', ($(document).height())+'px');
		form.addClass('price-req-form').css({
			'background': '#{$pricereq_settings.style_form_background}',
			'height': '{$pricereq_settings.style_form_height}px',
			'width': '{$pricereq_settings.style_form_width}px',
			'top' : formTop+'px'
		}).prepend(
			'<div class="price-req-header" style="background: #{$pricereq_settings.style_header_background}; color: #{$pricereq_settings.style_header_text_color};">{$pricereq_settings.text_header_title}<span id="price-req-close-x">x</span><input type="hidden" name="price-req-product-id" value="' + productId + '" /></div>' +
			'<div class="price-req-input"><input type="text" name="pricereq-name" placeholder="{$pricereq_settings.text_name_placeholder}" value="" /></div>' +
			'<div class="price-req-input"><input type="text" name="pricereq-phone" placeholder="{$pricereq_settings.text_phone_placeholder}" value="" /></div>' +
			'<div class="price-req-input"><input type="text" name="pricereq-email" placeholder="{$pricereq_settings.text_email_placeholder}" value="" /></div>' +
            '<div class="price-req-input"><textarea name="comment" placeholder="{$pricereq_settings.text_comment_placeholder}"></textarea></div>' +
			'<div class="price-req-input"><input id="price-req-submit" type="submit" value="{$pricereq_settings.text_submit_button}" style="background: #{$pricereq_settings.style_submit_background}; color: #{$pricereq_settings.style_submit_text_color}; height: {$pricereq_settings.style_submit_height}px; width: {$pricereq_settings.style_submit_width}px" /></div>'
		);

		$('body').prepend(form).prepend(bg);

		$('.price-req-form input[name="pricereq-name"]').focus();

		{if isset($pricereq_settings.phone_masked_input) && strlen($pricereq_settings.phone_masked_input) > 0}
		$('.price-req-form input[name="pricereq-phone"]').mask('{$pricereq_settings.phone_masked_input}');
		{/if}

        if (pricereqCommentStatus !== 'on') {
            $('textarea[name="comment"]').parent('.price-req-input').hide();
        }
	};

	onFormSubmit = function (event) {
		event.preventDefault();

		var n = $('.price-req-input').find('input[name="pricereq-name"]').val(),
		    p = $('.price-req-input').find('input[name="pricereq-phone"]').val(),
		    e = $('.price-req-input').find('input[name="pricereq-email"]').val(),
		    c = $('.price-req-input').find('textarea[name="comment"]').val(),
		    err = $('<div/>'),
		    pId = $('.price-req-header').find('input[name="price-req-product-id"]').val();

		$('.price-req-error').remove();
		$('.price-req-input').find('input[name="pricereq-name"], input[name="pricereq-phone"]').removeClass('price-req-inp-err');

		if ( p.length > 0 || e.length > 0 ) {
			$.post("{$pricereq_url}", { "name": n, "phone": p, "email": e, "comment": c, "product_id": pId }, function (response) {
				$('.price-req-form').css('height', '290px');

				if (response.data.status === true) {
					$('.price-req-input').remove();
					$('.price-req-form').append(
						'<p class="price-req-ok" style="color: #{$pricereq_settings.style_thanks_text_color};">{$pricereq_settings.text_thanks_message} ' + response.data.name + ',</p>' +
						'<p class="price-req-ok" style="color: #{$pricereq_settings.style_thanks_text_color};">{$pricereq_settings.text_more_thanks_message}</p>' +
						'<div class="price-req-input"><input id="price-req-close" type="button" value=\"{_wp("Close")}\" style="background: #{$pricereq_settings.style_close_ok_background}; height: {$pricereq_settings.style_submit_height}px; width: {$pricereq_settings.style_submit_width}px;" /></div>'
					);
				} else {
					$('.price-req-input').remove();
					$('.price-req-form').append(
						'<p class="price-req-ok margins">{_wp("Error occurred when sending message")}</p>' +
						'<div class="price-req-input"><input class="price-req-close-error" id="price-req-close" type="button" value=\"{_wp("Close")}\" style="background: #{$pricereq_settings.style_close_error_background}; height: {$pricereq_settings.style_submit_height}px; width: {$pricereq_settings.style_submit_width}px;" /></div>'
					);
				}
			}, "json");
		} else {
			if ( !(p.length > 0) ) {
				$('.price-req-input').find('input[name="pricereq-phone"]').focus();
			} else if ( !(e.length > 0) ) {
				$('.price-req-input').find('input[name="pricereq-email"]').focus();
			}
			if ( !(p.length > 0) ) {
				$('.price-req-input').find('input[name="pricereq-phone"]').addClass('price-req-inp-err');
			}
			if ( !(e.length > 0) ) {
				$('.price-req-input').find('input[name="pricereq-email"]').addClass('price-req-inp-err');
			}
			err.addClass('price-req-error').text("{_wp('Complete «Phone» or «Email»')}");
			$('.price-req-form').append( err );
		}
	};
	//------------------- END EVENT HANDLERS ----------------------

	//------------------- BEGIN PUBLIC METHODS --------------------
	initModule = function () {		
		$(document).on('click', '{$pricereq_settings.id_in_html}', onIdinhtmlClick);

		$(document).on('click', '.price-req-bg, #price-req-close-x, #price-req-close', removePricereqForm);

		$(document).keyup(function(event) {
			if (event.keyCode == 27) { // close pricereq form when esc key is pressed
				removePricereqForm();
			}
		});

		$(document).on('submit', '.price-req-form', onFormSubmit);
	};

	return {
		initModule: initModule
	};
	//------------------- END PUBLIC METHODS ----------------------
}());