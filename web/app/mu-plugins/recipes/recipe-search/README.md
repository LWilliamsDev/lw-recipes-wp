# Recipe Search

This is a simple WordPress/React app that provides a filterable list of recipes. On the LW Recipes WordPress site, this would be placed on the Recipe Archive page.

## Features
- Displays 10 items on a page
- Text input search filter
- Search Refiners in the left sidebar grouped by taxonomy terms; all refiners allow for multiple selections. Selections within the same facet act as an OR while selections between facets act as an AND. For instance, if I selected "Appetizer" and "Dessert" from the Courses facet and "Paleo" in the "Diet" facet, this would search for results where the course is appetizer OR dessert AND the diet is paleo.
- The Chosen Refiners component will display the currently applied filters. Clicking on one of the refiners will remove that applied filter.
- Filtering via URL parameter

## Non-JS Version
To help bots discover content: there is both a JS and non-JS version of the listing. Since this component replaces the ordinary WordPress archive for the recipe post type, it was important to have a non-JS version of the listing so that search engine and AI bots can discover content.

I did the following to achieve this:
- The HTML for the results and pagination are built on the server in the WordPress endpoint. The app directly prints the HTML from the server for these components. It uses DOMPurify as a security measure against XSS. There is a click event handler for the entire container for these components to detect which link(s) were clicked and to change the state appropriately.
- All pagination links are coded as links (as opposed to buttons) and anything in each result row that can change the filters was also coded as a link (as opposed to a button).
- The [Recipe Search WordPress block's PHP render function](../blocks/src/recipe-search/render.php) creates an initial paint of the page. This means that it looks at any query parameters in the URL, sends a mock request to the REST API endpoint, and prints the results. It also passes initial data for the results, pagination, and taxonomy terms to the React app via the JavaScript window object to minimize flickers for users with JS enabled.

The following trade-offs were considered when balancing ideal solutions with practical implementation constraints:
- The form markup is duplicated (once in the Recipe Search WordPress Block's PHP render function and again in the React app). While this duplication is not ideal, the React version needs to own the form markup so it can manage dynamic UI state such as Active Filters, selected refiners, and URL synchronization. The PHP version remains necessary to support a fully functional non-JavaScript experience and server-rendered content.
- On the non-JS version, if you view a pre-filtered version of the page, there is a blank space for where the active filters component would be. I added the blank space to minimize flickers for users with JS enabled. I decided not to actually add active filter buttons for non-JS users because those buttons are not functional without JS, meaning that nothing would happen if the user clicked on them.

## Organization
Generally, the front end of the Recipe Search is a React app. The back end uses a custom WordPress REST endpoint. The app sends queries to the WordPress endpoint and displays the results on the front end; all filtering and pagination is done on the server side. 

In WordPress, the Recipe Search block embeds the compiled JavaScript file. This block is then added to the recipe archive template.

### Front End App
- All refiner components are located in the src/form/search-refiners folder.
- All result components are located in the src/results folder.
- src/Recipes.tsx is the "main" recipes component. The majority of logic is within this component and gets passed down to children components.
- src/main.tsx embeds the entire Recipes app on a page.

The following packages are used:
- React Query to manage server state for data fetching.
- Nuqs to manage the state of search URL parameters.
- React Loading Skeleton to provide a loading state when we fetch data and are waiting for results.
- HTML Entities to decode HTML entities in data that we retrieve from the WordPress endpoint.
- TypeScript
- Vite

### Back End Data
All back end data comes from a custom WordPress REST API endpoint. The code for this is located in recipes.php, in the custom_recipes_callback function.

## Build Tools
This section describes how the build tools work.

### Dev Mode
Use the following command to run dev mode:
````npm run dev````

After running the command, the CLI should provide the URL where you can access the app in your browser. Since it pulls data from the WordPress REST endpoint, your local instance of the WordPress site needs to be simultaneously running.

The app assumes that your local WordPress site will use the following domain: recipes.staging

If this is not the case, in Recipes.tsx, you will need to change the hostname variable in the below conditional:
```
  if (currentHostname == 'localhost') { //if it is localhost (local dev environment), hardcode to the staging URL
    hostname = 'recipes.staging'
  }
```

When you view the app in your browser, it will load /index.html. 

#### CSS
Since the CSS uses Tailwind, all CSS compilation for the entire site goes through the theme's build tools. This was done to avoid issues where multiple stylesheets repeat the same Tailwind CSS classes.

Generally to view CSS changes, you should go through the following steps:
1. Run the app in dev mode
2. Open a new window in your CLI. Navigate to wp-content/themes/lw-recipes/src. Then run the command: ````npx @tailwindcss/cli -i ./assets/css/style.css -o ../assets/css/style.css --watch````
3. Add a new Tailwind CSS class to the app. You may need to refresh your browser to see the change.

##### How This Works
The index.html file that the browser loads also loads the theme stylesheet from the Recipes theme. 

The [theme's Tailwind stylesheet](../../../themes/lw-recipes/src/assets/css/style.css) includes the files in the /src folder of this app:
````
@source "../../../../../mu-plugins/recipes/recipe-search/src";
````

That means that when the theme's TailwindCSS watch command is active, it will also be watching the files in the src folder of this app. If it detects a new CSS class, it will automatically add the appropriate rules to the stylesheet. You may then need to refresh after the stylesheet has been updated in order to see the change.

### Production Build
Use the following command to run a production build:
````npm run build````

The final production build will be placed in the block assets folder. From the root recipes plugin folder, this would be in: blocks/assets. 

- The JS file will be named: recipe-search.js.
- The CSS file will be named: index.css (contains only React Loading Skeleton styles)

The Recipes Search block then loads these assets via the viewScript and viewStyle metadata in the block.json.