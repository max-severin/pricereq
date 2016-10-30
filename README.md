# pricereq - Price request

![pricereq-frontend](https://www.webasyst.com/wa-data/public/baza/products/img/20/2720/7869.970.png)

## Description
Price request plugin for Shop-Script

## Features
The plugin adds the ability to request prices of specific products. Instead of the price and a «Buy» button in the product template is added the «Price Request» button, clicking on which opens a window with a form to enter data. The customer can leave a name, phone number, e-mail and comment. Further information about the user and the product is sent to the administrator e-mail and a request in the admin panel.

## Installing
### Auto
Install plugin from webasyst store: [pricereq-en](https://www.webasyst.com/store/plugin/shop/pricereq/) or [pricereq-ru](https://www.webasyst.ru/store/plugin/shop/pricereq/).  
Or you can install plugin from Installer app in backend.

### Manual
1. Get the code into your web server's folder /PATH_TO_WEBASYST/wa-apps/shop/plugins

2. Add the following line into the /PATH_TO_WEBASYST/wa-config/apps/shop/plugins.php file (this file lists all installed shop plugins):

		'pricereq' => true,

3. Done. Configure the plugin in the plugins tab of shop backend.

## Specificity
Enable the plugin in settings and configure the appearance of the form. For products that need to price request, set **a price equal 0**

![pricereq-product-edit-page](https://www.webasyst.com/wa-data/public/baza/products/img/16/2516/6942.970.png)

### The showing of the «Price request» button on the product page:
You need to edit the template that displays the price and the «Buy» button. In the basic themes of Shop-Script is used for this **product.cart.html** template. First, find in the template the following code:

		<!-- price -->
		<div class="add2cart">
			{if $product.compare_price > 0}<span class="compare-at-price nowrap"> {shop_currency_html($product.compare_price)} </span>{/if}
			**<span data-price="{shop_currency($product.price, null, null, 0)}" class="price nowrap">{shop_currency_html($product.price)}</span>**
			<input type="hidden" name="product_id" value="{$product.id}">
			**<span class="qty">**
				**&times; <input type="text" name="quantity" value="1">**
			**</span>**
			**<input type="submit" {if !$product_available}disabled="disabled"{/if} value="[`Add to cart`]">**
			<span class="added2cart" style="display: none;">{sprintf('[`%s is now <a href="%s"><strong>in your shopping cart</strong></a>`]', $product.name|escape, $wa->getUrl('shop/frontend/cart'))}</span>
		</div>

Then edit it as follows:

		<!-- price -->
		<div class="add2cart">
			{if $product.compare_price > 0}<span class="compare-at-price nowrap"> {shop_currency_html($product.compare_price)} </span>{/if}
			
			<!-- Price request -->
			**{if $product.price == 0}**
			**<b>Price request</b>**
			**{else}**
			<span data-price="{shop_currency($product.price, null, null, 0)}" class="price nowrap">{shop_currency_html($product.price)}</span>
			**{/if}**
			<!-- Price request -->

			<input type="hidden" name="product_id" value="{$product.id}">

			<!-- Price request -->
			**{if $product.price == 0}**
			**<input type="button" value="How much?" class="price-req-button">**
			**{else}**
			<span class="qty">
				&times; <input type="text" name="quantity" value="1">
			</span>
			<input type="submit" {if !$product_available}disabled="disabled"{/if} value="[`Add to cart`]">
			**{/if}**
			<!-- Price request -->

			<span class="added2cart" style="display: none;">{sprintf('[`%s is now <a href="%s"><strong>in your shopping cart</strong></a>`]', $product.name|escape, $wa->getUrl('shop/frontend/cart'))}</span>
		</div>

![pricereq-product-edit-template](https://www.webasyst.com/wa-data/public/baza/products/img/20/2720/7880.970.png)