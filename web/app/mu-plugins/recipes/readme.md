# Recipes Plugin

This is the plugin that goes along with the Recipes theme. It is needed because it provides custom blocks and components that are part of the theme.

## Features
- [Custom blocks](blocks/readme.md)
- [Custom Metabox](metabox/README.md)
- [PHP Functions (Object Oriented)](src)
- [Recipe Listing Component](recipe-seach/README.md)

## Architecture/Design Decisions
This section contains a brief Q&A that explains some architecture/design decisions in regards to the overall plugin.

### Why are these things in a plugin instead of the Recipes theme?
Generally, themes are intended to provide visual styling and plugins are intended for additional functionality. I would consider things like custom blocks, custom metaboxes, and a recipe listing as functionality.

### Why do you have separate build tools?
In this plugin, the blocks, metabox, and recipes-search all have build or compilation tools. However, they all have separate instances of compilation tools.

- When I started this project, the Create Block tool only worked in Webpack (and not Vite). Additionally, it uses an older version of React than the recipes-search build. Since they are separate things, I did not want the recipes-search component to be stuck in an older version of React just because WordPress and the Create Block tool are stuck in an older version.
- Compilation for the Metabox possibly could be combined with the blocks build tool. However, I am not convinced that the maintenance cost for ejecting from the Create Block tool and customizing the build process is worth it.

### Why do you enqueue the Recipe Listing assets via wp_enqueue_script instead of the block's viewScript property?
Since it has a separate build function than the block that embeds it, enqueuing it separately makes sense so that we can independently control the version asset number. Otherwise, every time we updated the recipe listing script, we would also have to update the version in the block's block.json to get the version URL parameter updated for that asset.

Additionally, it was easier to do it this way in order to add script type="module" to the script tag.
