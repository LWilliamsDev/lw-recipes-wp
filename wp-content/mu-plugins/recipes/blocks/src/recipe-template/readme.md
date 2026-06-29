# Recipe Template

This block represents the recipe post template, which is locked to every recipe post.

## Child Blocks
- Recipe Content
  - Recipe Overview
  - Recipe
    - Complex Recipe
      - Complex Recipe: Instructions
      - Complex Recipe: Ingredients
    - Simple Recipe
      - Simple Recipe: Instructions
      - Simple Recipe: Ingredients
  - Recipe Post Nav
  - Related Recipes

### Recipe Content
This block represents the main content for the recipe page. The main content is generally split into 2 sections:

- An overview which contains global page elements (breadcrumbs, H1 page title etc) along with an optional summary like total cook time, number served, etc. (Represented by the Recipe Overview block)
- The actual recipe (Represented by the Recipe block)

#### Recipe Overview
The Recipe Overview block contains:

- Breadcrumbs
- H1 page title
- Excerpt (optional; comes from the_excerpt)
- Featured Image (optional)
- Summary data: number of people the recipe will serve, prep time, total time to cook

The Summary data can be added via fields in the block settings panel.

#### Recipe
The Recipe Block allows you to add either the Complex Recipe or Simple Recipe block. If you add more than 1 block, a notice will appear in the block editor that notes that you can only add 1 block. Post saving and auto-saving are locked until the user complies with the requirement.

##### Simple Recipe
The Simple Recipe block has 1 section for ingredients and 1 section for instructions. The Ingredients Section has 1 unordered list, and users can only add list items to this 1 list. The Instructions Section has 1 ordered list, and users can only add list items to this 1 list.

##### Complex Recipe
The Complex Recipe block also has 1 section for ingredients and 1 section for instructions. The Ingredients Section allows you to add multiple sections consisting of a heading and unordered list. The Instructions Section allows you to add headings and list blocks.

### Recipe Post Nav
The Recipe Post Nav block adds the next/previous links to the next and previous recipes.

### Related Recipes
The Related Recipes block adds the related recipes section. It displays recipes that have the same diet taxonomy term as the current recipe.
