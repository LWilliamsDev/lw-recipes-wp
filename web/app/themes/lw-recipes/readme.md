# Recipes Theme

This is the theme for the Fit & Flavor website. 

## Dependencies
Since the templates reference custom blocks from the Recipes plugin, this theme does require the Recipes plugin. Due to this, the Recipes plugin is placed in the must use plugins folder so that it is automatically installed. 

Additionally, the Recipes Theme uses TailwindCSS.

## Templates
- Header
- Footer
- Index

## Accessibility
- Keyboard navigation is available in the main menu. Due to this, the theme contains a Main Menu Walker function (MainMenuWalker.php) that adds open/close buttons after each top level menu item that has children. On desktop, these buttons appear only when focused. On mobile, these buttons serve as accordions.
- The WordPress default skip links were removed in favor of manually added skip links. 

## Build Tools
This theme uses Vite to build the CSS and JavaScript. The src folder contains flat files with full page layouts and dummy content. 

### Developing with the Build Tools
To watch for CSS changes, use the following command:
````npx @tailwindcss/cli -i ./assets/css/style.css -o ../assets/css/style.css --watch````

If you need to make other CSS changes, the correct file to edit is: src/assets/css/style.css

If you need to make JavaScript changes, the correct file to edit is: src/assets/js/global-js.js.

The production builds for both files will be loaded throughout the entire site.

Although Vite comes with a "dev" mode, generally it was not used in developing the theme. 

### Production Builds
To do a production build, use the following command:
````npm run build````

The production build will:
1. Update and minify the assets/css/style.css file.
2. Update and minify the assets/js/global.js file.

## Development Process
This is a brief outline of the general development process I followed in creating this theme.

1. Create preliminary mock-ups in Figma.
2. Create static HTML files with the HTML markup, styles, JavaScript, etc. Generally, each HTML file represents a specific page template. During this phase, I generally viewed the static HTML files in my browser, without any kind of dev server. 
3. Split up each page template into blocks. Create the blocks and add the markup from the static HTML files both to the block's edit function and the block's PHP render function.
4. Add template parts and patterns that reference the blocks for global elements, like the header and footer.
