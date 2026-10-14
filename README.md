# ASHIQ TRADLINK

A responsive, mobile-first wholesale ordering catalogue for GitHub Pages.

## Files
- `index.html` — page structure
- `style.css` — responsive layout, light/dark themes, card colours
- `script.js` — product data, cart math, minimum order validation, distance-based delivery, WhatsApp order message
- `assets/images/logo/logo.svg` — generated shop-style logo
- `assets/images/banners/` — promotional banner SVG artwork
- `assets/images/product/breads/` — product image directory and placeholder

## Add product photos
Crop each product image to **600 × 600 px** (square, 1:1). Keep the product centered. Recommended file size: around 100–200 KB when practical.

Upload these filenames into `assets/images/product/breads/`:
`BR01.jpg`, `BR02.jpg`, …, `BR14.jpg`.

If you use `.webp` or `.png` instead, update the matching `image` filename in `script.js`. The folder path is case-sensitive on GitHub Pages.

## Product data
Product records are at the top of `script.js` in the `PRODUCTS` array. The website currently includes the first 14 products supplied for the Breads category. Both “All” and “Breads” show these 14 products for now.

Note: Cream Roll and Pape figures have been entered using the numbers supplied in the product list. Check those figures before publishing if any were intended differently.

## Delivery and order rules
- Minimum **goods subtotal**: ₹500, excluding delivery.
- Delivery charge: one-way distance from Mangupur × ₹4/km.
- The order form collects the approximate one-way distance, customer name and address.
- Order summary opens WhatsApp for owner number `9389765626` with a prepared message. The customer must press Send in WhatsApp.

## Active users
A real “Live Active Users” count needs a backend or analytics service. This static GitHub Pages version does not fabricate a changing number; it shows “Count unavailable” until real tracking is connected.

## Deploy on GitHub Pages
1. Extract the ZIP.
2. Upload the contents of `ASHIQ_TRADLINK/` to your repository root.
3. Commit the files.
4. In GitHub, open **Settings → Pages** and publish from your chosen branch/root folder.
5. Open the Pages URL and test adding products, cart details, order form and WhatsApp message.

## Important before publishing
- Confirm all prices, pieces per box, owner contact information, social profile URLs and offer wording.
- Promotional offers are shown on banners. This version does not automatically apply offer discounts to the order total.
