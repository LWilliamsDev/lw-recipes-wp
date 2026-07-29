# LW Recipes Project (WordPress)

This repo was set up for a fictional recipes website named "Fit & Flavor", with the goal of providing code samples.

## Editorial Requirements
In this fictional scenario\*, the Fit & Flavor Content Team have strict brand guidelines and standards regarding what components can go on which pages. Due to this, the editorial experience is restricted. Pages and/or post types have blocks that act like templates. Users are only allowed to add the specific blocks that are allowed in that context. This website does not use block patterns because as of this writing, there is no way to require that certain blocks are used in certain circumstances. 

\*Although this is a fictional website, I have regularly encountered clients that require a restricted editing experience. I have also worked with companies that needed maximum flexibility (and hence we planned to use block patterns in that case).
 
## Features
- [Recipes Theme](web/app/themes/lw-recipes/readme.md)
   - Contains an accessible main menu that supports keyboard navigation
   - Being a Block Theme, it supports the WordPress Site Editor
   - Requires Recipes Plugin (as the plugin provides things like custom blocks used by the theme)
- [Recipes Plugin](web/app/mu-plugins/recipes/readme.md)
   - [Custom blocks](web/app/mu-plugins/recipes/blocks/readme.md)
     - Contains examples for enforcing requirements in custom blocks like required fields, requiring that certain blocks are used in certain contexts, etc.
     - Demonstrates how to create a system for a restricted editing experience.
   - [Metabox customization (Gutenberg)](web/app/mu-plugins/recipes/metabox/readme.md)
     - Contains an example for changing the default taxonomy panels when editing posts
   - [Recipe Listing React App](web/app/mu-plugins/recipes/recipe-search/readme.md)
     - Decoupled component that is a filterable list of recipes on the front end

## Composer Managed WordPress
This site uses Bedrock to manage WordPress with Composer. To install WordPress from this repo, ensure that you have Composer installed. Then run the following command from the root project directory:

````composer install````

## Twig Templating
This site uses Timber/Twig for the PHP templates. Generally, this is how I have handled it:

1. The blocks folder in the recipes plugin has a views folder. This contains base Twig template for the blocks. They generally do not have styling and are intended mainly to demonstrate how to print the information passed from the PHP render function.
2. The recipes theme has a views folder. Where appropriate, these templates override the block ones. These template also contain the styling.

## Credits
In order to make the [HTML flats](web/app/themes/lw-recipes/src) more appealing, I have added sample recipes and stock photos to most of the flats. The one exception to this is the recipe search flat. For that, I added a 300x164 placeholder image for all images to save time.

This section provides credits to the author of this content. Please note that this is not a real website. I do not intend to publish a real website with this code. The purpose of this project is to serve as a code sample for prospective employers for full stack development jobs. I am not in the business of creating recipes or content for recipe-related websites. Additionally, I make custom themes and do not sell general purpose themes. When I make themes for clients, it is their responsibility to provide content, including images.

### Images
- <a href="https://www.vecteezy.com/free-photos/onion-rings" target="_blank" rel="noopener noreferrer">Onion Rings Stock photos by Vecteezy</a>
- <a href="https://www.vecteezy.com/free-photos/cake-pops" target="_blank" rel="noopener noreferrer">Cake Pops Stock photos by Vecteezy</a>
- <a href="https://www.vecteezy.com/free-photos/grilled-fish" target="_blank" rel="noopener noreferrer">Grilled Fish Stock photos by Vecteezy</a>
- <a href="https://www.vecteezy.com/free-photos/pot-roast" target="_blank" rel="noopener noreferrer">Pot Roast Stock photos by Vecteezy</a>*
- <a href="https://www.vecteezy.com/free-photos/meat" target="_blank" rel="noopener noreferrer">Meat Stock photos by Vecteezy</a>
- <a href="https://freefoodphotos.com/imagelibrary/seasonal/slides/star_doughnuts.html" target="_blank" rel="noopener noreferrer">Donut photo from freefoodphotos.com</a>

\*Vecteezy provided this same attribution link for 3 photos. None of them were pot roast photos. This looks like an error on their part, however there is nothing I can do since I am not aware of support that is available for people who are not paying for a license.

### Recipes
The following were used in the HTML flat file for the recipe search component.

- <a href="https://lowcarbyum.com/keto-cake-pops/" target="_blank" rel="noopener noreferrer">Keto Cake Pops</a>
- <a href="https://www.paleorunningmomma.com/frosted-vanilla-donuts-grain-free-dairy-free/" target="_blank" rel="noopener noreferrer">Frosted Vanilla Donuts</a>
- <a href="https://lowcarbyum.com/keto-onion-rings/" target="_blank" rel="noopener noreferrer">Keto Onion Rings</a>
- <a href="https://lowcarbyum.com/big-mac-casserole/" target="_blank" rel="noopener noreferrer">McDonald's Big Mac Casserole</a>
- <a href="https://lowcarbyum.com/fluffy-almond-meal-pancakes/" target="_blank" rel="noopener noreferrer">Fluffy Almond Flour Pancakes</a>
- <a href="https://www.paleorunningmomma.com/maple-cinnamon-candied-pecans-paleo/" target="_blank" rel="noopener noreferrer">Maple Cinnamon Candied Pecans</a>
- <a href="https://www.paleorunningmomma.com/butternut-apple-chicken-sausage-hash-paleo/" target="_blank">Butternut, Apple, and Chicken Sausage Hash</a>
- <a href="https://www.wellplated.com/roasted-frozen-broccoli/" target="_blank" rel="noopener noreferrer">Roasted Frozen Broccoli</a>
- <a href="https://www.olivemagazine.com/recipes/meat-and-poultry/turkey-kheema-matar-mince-and-peas-curry-with-tomato-salad/" target="_blank" rel="noopener noreferrer">Turkey Keema Curry</a>
- <a href="https://detoxinista.com/matcha-mint-chocolate-chip-cookies-vegan-paleo/" target="_blank" rel="noopener noreferrer">Mint Matcha Cookies</a>

The following were used in the single recipe HTML flat files.

- <a href="https://www.food.com/recipe/tender-pot-roast-22137" target="_blank" rel="noopener noreferrer">Tender Post Roast</a>
- <a href="https://www.paleorunningmomma.com/lemon-blueberry-scones-grain-free-paleo/" target="_blank" rel="noopener noreferrer">Lemon Blueberry Scones</a>
