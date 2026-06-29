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