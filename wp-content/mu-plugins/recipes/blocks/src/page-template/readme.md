# Page Template Block

This block is locked to the page post type. Since there are multiple page templates, it allows the user to select a specific child block that represents the actual template. If the user adds more than 1 child template block, they will receive a notice in the block editor that they only 1 template block is allowed. Post auto-saving and saving will then be locked until the user removes the extra template block.

The function that locks this block to the page post type is: function page_template in [recipes.php](../../recipes.php).

## Child Blocks
- [Homepage Template](wp-content/mu-plugins/recipes/blocks/src/home-template/readme.md)
- [Recipe Listing Template](wp-content/mu-plugins/recipes/blocks/src/recipe-listing/readme.md)