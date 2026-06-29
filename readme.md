# LW Recipes Project (WordPress)

This repo was set up for a fictional recipes website named "Fit & Flavor", with the goal of providing code samples.

## Editorial Requirements
In this fictional scenario\*, the Fit & Flavor Content Team have strict brand guidelines and standards regarding what components can go on which pages. Due to this, the editorial experience is restricted. Pages and/or post types have blocks that act like templates. Users are only allowed to add the specific blocks that are allowed in that context. This website does not use block patterns because as of this writing, there is no way to require that certain blocks are used in certain circumstances. 

\*Although this is a fictional website, I have regularly encountered clients that require a restricted editing experience. I have also worked with companies that needed maximum flexibility (and hence we planned to use block patterns in that case).
 
## Features
- [Recipes Theme](wp-content/themes/lw-recipes/readme.md)
   - Contains an accessible main menu that supports keyboard navigation
   - Being a Block Theme, it supports the WordPress Site Editor
- [Recipes Plugin](wp-content/mu-plugins/recipes/readme.md)
   - [Custom blocks](wp-content/mu-plugins/recipes/blocks/readme.md)
   	 - Contains examples for enforcing requirements in custom blocks like required fields, requiring that certain blocks are used in certain contexts, etc.
   	 - Demonstrates how to create a system for a restricted editing experience.
   - [Metabox customization (Gutenberg)](wp-content/mu-plugins/recipes/metabox/README.md)
     - Contains an example for changing the default taxonomy panels when editing posts
   - [Recipe Listing React App](wp-content/mu-plugins/recipes/recipe-search/README.md)
     - Decoupled component that is a filterable list of recipes on the front end