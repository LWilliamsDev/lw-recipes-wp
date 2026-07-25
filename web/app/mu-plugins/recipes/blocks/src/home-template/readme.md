# Home Template

This block represents the homepage template, available on the page post type.

## Child Blocks
- Hero Image
- Latest Recipes
- Recipe Taxonomy

### Hero Image
The Hero Image block represents the hero image on the homepage. It is specifically designed to have the following elements:

- Hero Image (required)
- Hero Title (optional but has fallback)
- Subtitle (optional)
- Call To Action (optional)

The block was built in the following manner:

- If there is no hero image, a notice appears at the top of the block noting that the image is required. Post auto-saving and saving are locked until an image is added. Additionally, a placeholder appears in the block preview area. The placeholder contains help text regarding the recommended image size and then a button to open the Media Library. Once the user adds a hero image, a "Replace Image" button appears in the Block Controls toolbar. 
- The 3 text elements are added as RichText components. An "activeRichText" state tracks which element the user is currently focused on. This was added to prevent the heading level button in the Block Controls toolbar to appear when a user is editing the subtitle or CTA fields.
- The Hero Title is technically required. However, if it is empty, the front end will display placeholder text. This block does not restrict the available headings so that it can be reused on other templates and/or in other contexts, where perhaps it is not appropriate for it to be an H1 heading.
- The Subtitle and Call To Action blocks are optional. Although they always appear in the editor, the front end only displays them if they have content.

Extra formatting options like links, inline images, etc were removed since such elements are not part of the design for the hero image component.

### Latest Recipes
The Latest Recipes section displays the 3 latest recipes. There is an optional rich text field in the block preview area to change the title. This field does not allow for any formatting since the front end has a rigid style for these kinds of H2 headings. If the title field is empty, the front end will display "Latest Recipes."

The Latest Recipes section will display the following from each recipe:
- Featured Image (linked to the recipe post)
- Title (linked to the recipe post)
- Excerpt
- Chosen diet taxonomy term, linked to the recipe listing page pre-filtered by that taxonomy term

### Recipe Taxonomy
The Recipe Taxonomy section displays all taxonomy terms that are within the selected taxonomy. The block contains an optional Title field (rich text) in the block preview area and Taxonomy field in the block settings panel. If the title is empty, the front end will display "Browse By {Taxonomy}." If the Taxonomy field is empty, it will display the diet taxonomy. 

Each Taxonomy Term will display the following:
- Featured Image (added to the Course, Diet, Protein, and Allergen taxonomy term edit page via Advanced Custom Fields)
- The name of the taxonomy term, which overlays the image.
- Both the image and the name will be linked to the recipe listing page pre-filtered by that taxonomy term.

