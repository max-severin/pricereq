<?php

/*
 * @author Max Severin <makc.severin@gmail.com>
 */
return array(
    'status' => array(
        'title'        => _wp('Status'),
        'value'        => 'off',
        'control_type' => waHtmlControl::SELECT,
        'options'      => array(
            'off' => _wp('Off'),
            'on'  => _wp('On'),
        ),
    ),

    'pricereq_request_limit' => array(
        'title'        => _wp('Requests count'),
        'description'  => _wp('The count of requests on the plugin page in the admin panel.'),
        'placeholder'  => '30',
        'value'        => '30',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingNumberControl',
    ),
    'show_done' => array(
        'title'        => _wp('Display done requests'),
        'description'  => _wp('When you enable this setting,<br />done requests will be displayed in the history of user requests.'),
        'value'        => 'off',
        'control_type' => waHtmlControl::SELECT,
        'options'      => array(
            'off' => _wp('No'),
            'on'  => _wp('Yes'),
        ),
    ),

    'comment_status' => array(
        'title'        => _wp('Comment'),
        'description'  => _wp('The opportunity to leave a comment.'),
        'value'        => 'off',
        'control_type' => waHtmlControl::SELECT,
        'options'      => array(
            'off' => _wp('Off'),
            'on'  => _wp('On'),
        ),
    ),

    'email_of_sender' => array(
        'title'        => _wp('Sender e-mail'),
        'description'  => _wp('This email address will be listed as the return address of the message.<br />If the address is not specified, it will use the general email of the shop.'),
        'placeholder'  => 'noreply@email',
        'value'        => '',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingEmailControl',
    ),
    'email_of_recipient' => array(
        'title'        => _wp('Recipient e-mail'),
        'description'  => _wp('The address to which to send messages.<br />If the address is not specified, it will use the general email of the shop.'),
        'placeholder'  => 'your@email',
        'value'        => '',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingEmailControl',
    ),

    'id_in_html' => array(
        'title'        => _wp('Selector of the button of price request form'),
        'description'  => _wp('Specify the class of the html element,<br />when clicking on which will open a form of price request.<br />Must be like «<b>.price-req-button</b>».'),
        'placeholder'  => '.price-req-button',
        'value'        => '.price-req-button',
        'control_type' => waHtmlControl::INPUT,
    ),

    'phone_masked_input' => array(
        'title'        => _wp('Masked input for phone'),
        'description'  => _wp('If fill this setting will added the mask for the field with the phone number.<br />Tip about masks characters:<br /><b>a</b> - All alphabetic values (A-Z, a-z)<br /><b>9</b> - All numeric values (0-9)<br /><b>*</b> - Any alphanumeric values (A-Z, a-z, 0-9).<br />Leave the field empty, if you do not need mask input.'),
        'placeholder'  => '+7 (999) 999-99-99',
        'value'        => '',
        'control_type' => waHtmlControl::INPUT,
    ),

    'text_header_title' => array(
        'title'        => _wp('Header text'),
        'placeholder'  => _wp('Price request'),
        'value'        => _wp('Price request'),
        'control_type' => waHtmlControl::INPUT,
    ),
    'text_name_placeholder' => array(
        'title'        => _wp('«Name» field placeholder'),
        'placeholder'  => _wp('Your Name'),
        'value'        => _wp('Your Name'),
        'control_type' => waHtmlControl::INPUT,
    ),
    'text_phone_placeholder' => array(
        'title'        => _wp('«Phone» field placeholder'),
        'placeholder'  => _wp('Your Phone'),
        'value'        => _wp('Your Phone'),
        'control_type' => waHtmlControl::INPUT,
    ),
    'text_email_placeholder' => array(
        'title'        => _wp('«Email» field placeholder'),
        'placeholder'  => _wp('Your Email'),
        'value'        => _wp('Your Email'),
        'control_type' => waHtmlControl::INPUT,
    ),
    'text_comment_placeholder' => array(
        'title'        => _wp('«Comment» field placeholder'),
        'placeholder'  => _wp('Your comment'),
        'value'        => _wp('Your comment'),
        'control_type' => waHtmlControl::INPUT,
    ),
    'text_submit_button' => array(
        'title'        => _wp('«Send» button text'),
        'placeholder'  => _wp('Send'),
        'value'        => _wp('Send'),
        'control_type' => waHtmlControl::INPUT,
    ),

    'style_form_width' => array(
        'title'        => _wp('Form width (px)'),
        'description'  => _wp('Value range 320-600'),
        'placeholder'  => '400',
        'value'        => '400',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingNumberControl',
        'options'      => array(
            'min'  => '320',
            'max'  => '600',
            'step' => '1',
        ),
    ),
    'style_form_height' => array(
        'title'        => _wp('Form height (px)'),
        'description'  => _wp('Value range 340-520'),
        'placeholder'  => '350',
        'value'        => '350',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingNumberControl',
        'options'      => array(
            'min'  => '340',
            'max'  => '520',
            'step' => '1',
        ),
    ),
    'style_form_background' => array(
        'title'        => _wp('Form background color (HEX)'),
        'class'        => 's-color',
        'placeholder'  => 'ffffff',
        'value'        => 'ffffff',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingColorControl',
    ),
    'style_header_background' => array(
        'title'        => _wp('Header background color (HEX)'),
        'class'        => 's-color',
        'placeholder'  => '21a6de',
        'value'        => '21a6de',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingColorControl',
    ),
    'style_header_text_color' => array(
        'title'        => _wp('Header text color (HEX)'),
        'class'        => 's-color',
        'placeholder'  => 'ffffff',
        'value'        => 'ffffff',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingColorControl',
    ),
    'style_submit_width' => array(
        'title'        => _wp('«Send» button width (px)'),
        'description'  => _wp('Value range 100-600'),
        'placeholder'  => '300',
        'value'        => '300',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingNumberControl',
        'options'      => array(
            'min'  => '100',
            'max'  => '600',
            'step' => '1',
        ),
    ),
    'style_submit_height' => array(
        'title'        => _wp('«Send» button height (px)'),
        'description'  => _wp('Value range 24-160'),
        'placeholder'  => '34',
        'value'        => '34',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingNumberControl',
        'options'      => array(
            'min'  => '24',
            'max'  => '160',
            'step' => '1',
        ),
    ),
    'style_submit_background' => array(
        'title'        => _wp('«Send» button background color (HEX)'),
        'class'        => 's-color',
        'placeholder'  => '21a6de',
        'value'        => '21a6de',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingColorControl',
    ),
    'style_submit_text_color' => array(
        'title'        => _wp('«Send» button text color (HEX)'),
        'class'        => 's-color',
        'placeholder'  => 'ffffff',
        'value'        => 'ffffff',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingColorControl',
    ),
    'style_close_ok_background' => array(
        'title'        => _wp('«Close» button background color when sending is success (HEX)'),
        'class'        => 's-color',
        'placeholder'  => '4d9b58',
        'value'        => '4d9b58',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingColorControl',
    ),
    'style_close_error_background' => array(
        'title'        => _wp('«Close» button background color when error occurred (HEX)'),
        'class'        => 's-color',
        'placeholder'  => 'de4d2c',
        'value'        => 'de4d2c',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingColorControl',
    ),
    
    'text_thanks_message' => array(
        'title'        => _wp('«Thanks message» text (appeal)'),
        'placeholder'  => _wp('Thanks') . ',',
        'value'        => _wp('Thanks') . ',',
        'control_type' => waHtmlControl::INPUT,
    ),
    'text_more_thanks_message' => array(
        'title'        => _wp('«Thanks message» text (text in 2nd line)'),
        'placeholder'  => _wp('your message has been sent!'),
        'value'        => _wp('your message has been sent!'),
        'control_type' => waHtmlControl::INPUT,
    ),
    'style_thanks_text_color' => array(
        'title'        => _wp('«Thanks message» text color'),
        'class'        => 's-color',
        'placeholder'  => '717171',
        'value'        => '717171',
        'control_type' => waHtmlControl::CUSTOM.' '.'shopPricereqPlugin::settingColorControl',
    ),

    'privacy_status' => array(
        'title'        => _wp('Consent to the personal data processing'),
        'description'  => _wp('Enable this setting to add to the form a checkbox consent to the processing of personal data and the link to the page with the Privacy Policy of the company.'),
        'value'        => 'off',
        'control_type' => waHtmlControl::SELECT,
        'options'      => array(
            'off' => _wp('Off'),
            'on'  => _wp('On'),
        ),
    ),
    'privacy_text' => array(
        'title'        => _wp('Text'),
        'placeholder'  => _wp('Clicking on the «Send» button, I give my'),
        'value'        => _wp('Clicking on the «Send» button, I give my'),
        'control_type' => waHtmlControl::INPUT,
    ),
    'privacy_link_text' => array(
        'title'        => _wp('Link text'),
        'placeholder'  => _wp('consent to the personal data processing'),
        'value'        => _wp('consent to the personal data processing'),
        'control_type' => waHtmlControl::INPUT,
    ),
    'privacy_link_url' => array(
        'title'        => _wp('Link url'),
        'description'  => _wp('Url of the page with the Privacy Policy.'),
        'placeholder'  => '/site/privacy-policy/',
        'value'        => '/site/privacy-policy/',
        'control_type' => waHtmlControl::INPUT,
    ),
    'privacy_checkbox_status' => array(
        'title'        => _wp('Show checkbox'),
        'description'  => _wp('Enable this setting to display the checkbox, otherwise it will display only the text and link.'),
        'value'        => 'on',
        'control_type' => waHtmlControl::SELECT,
        'options'      => array(
            'off' => _wp('Off'),
            'on'  => _wp('On'),
        ),
    ),
    'privacy_checkbox_checked' => array(
        'title'        => _wp('Checkbox by default'),
        'description'  => _wp('Select the status of the checkbox by default.'),
        'value'        => 'unchecked',
        'control_type' => waHtmlControl::SELECT,
        'options'      => array(
            'unchecked' => _wp('Unchecked'),
            'checked'  => _wp('Checked'),
        ),
    ),
    
);