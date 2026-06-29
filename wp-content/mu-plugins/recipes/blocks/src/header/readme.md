# Global Header

This block represents the global header. In the [Recipes theme](../../../../../themes/lw-recipes/readme.md), it is added to the "header" pattern. The header pattern is then added to the header template part. It does not have any child blocks.

## Why did you choose WordPress menus over the Navigation Block?
This block utilizes the WordPress menu functionality, found in Appearance > Menus.

Due to the design and accessibility features of the menu, it had to be coded a certain way. Unfortunately, the Navigation Block does not offer much flexibility when you need customized HTML markup. Because of this, I chose WordPress menus over the Navigation Block. The actual menu output is controlled by the Main Menu Walker, located in the Recipes theme.
