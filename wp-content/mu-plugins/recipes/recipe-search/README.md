# Recipe Search

This is a simple WordPress/React app that provides a filterable list of recipes. On the LW Recipes WordPress site, this would be placed on the Recipe Archive page.

## Features
- Displays 10 items on a page
- Text input search filter
- Search Refiners in the left sidebar grouped by taxonomy terms; all refiners allow for multiple selections. Selections within the same facet act as an OR while selections between facets act as an AND. For instance, if I selected "Appetizer" and "Dessert" from the Courses facet and "Paleo" in the "Diet" facet, this would search for results where the course is appetizer OR dessert AND the diet is paleo.
- The Chosen Refiners component will display the currently applied filters. Clicking on one of the refiners will remove that applied filter.
- For users logged into WordPress: if there are filters currently applied, a read-only text field will display with the applied URL parameters. The user can click a button to copy the parameters.
- Filtering via URL parameter

## Organization
Generally, the front end of the Recipe Search is a React app. The back end uses a custom WordPress REST endpoint. The app sends queries to the WordPress endpoint and displays the results on the front end; all filtering and pagination is done on the server side. 

In WordPress, the Recipe Search block embeds the compiled JavaScript file. This block is then added to the recipe archive template.

### Front End App
- All refiner components are located in the src/form/search-refiners folder.
- All result components are located in the src/results folder.
- src/Recipes.tsx is the "main" recipes component. The majority of logic is within this component and gets passed down to children components.
- src/App.tsx embeds the entire Recipes app on a page.

The following packages are used:
- React Query to manage server state for data fetching.
- React Router to manage the state of search URL parameters and browser state for the search input.
- React Loading Skeleton to provide a loading state when we fetch data and are waiting for results.
- HTML Entities to decode HTML entities in data that we retrieve from the WordPress endpoint.
- TailwindCSS due to the whole site using TailwindCSS.

This app also uses TypeScript.

### Back End Data
All back end data comes from a custom WordPress REST API endpoint. The code for this is located in recipes.php, in the custom_recipes_callback function. 

