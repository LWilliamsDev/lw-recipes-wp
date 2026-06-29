# Home Template

This block represents the homepage template, available on the page post type.

## Child Blocks
- Hero Image
  - Hero Image Heading
  - Hero Image Subtitle
  - Hero Image CTA
- Latest Recipes
- Recipe Taxonomy

### Hero Image
The Hero Image block represents the hero image on the homepage. It is specifically designed to have the following elements:

- Hero Image (required)
- Hero Title (optional but has fallback)
- Subtitle (optional)
- Call To Action (optional)

In order to preserve the design, the block was built in the following manner:

- The block settings panel has a field to add a hero image. If this field is empty, a notice will appear in the block editor that an image is required. Post auto-saving and saving are locked until an image is added.
- The 3 text elements are added as separate child blocks to enforce the placement and size of these elements.
- The Hero Title is technically required. However, if it is empty, the front end will display placeholder text. 
- The Subtitle and Call To Action blocks are optional. Although they always appear in the editor, the front end only displays them if they have content.

Extra formatting options like links, inline images, etc were removed since such elements are not part of the design for the hero image component.

### Latest Recipes
The Latest Recipes section displays the 3 latest recipes. There is an optional field in the block settings panel to change the title. If the title field is empty, the front end will display "Latest Recipes."

The Latest Recipes section will display the following from each recipe:
- Featured Image (linked to the recipe post)
- Title (linked to the recipe post)
- Excerpt
- Chosen diet taxonomy term, linked to the recipe listing page pre-filtered by that taxonomy term

### Recipe Taxonomy
The Recipe Taxonomy section displays all taxonomy terms that are within the selected taxonomy. The block contains an optional Title field and Taxonomy field in the block settings panel. If the title is empty, the front end will display "Browse By Diet." If the Taxonomy field is empty, it will display the diet taxonomy. 

Each Taxonomy Term will display the following:
- Featured Image (added to the Course, Diet, Protein, and Allergen taxonomy term edit page via Advanced Custom Fields)
- The name of the taxonomy term, which overlays the image.
- Both the image and the name will be linked to the recipe listing page pre-filtered by that taxonomy term.

