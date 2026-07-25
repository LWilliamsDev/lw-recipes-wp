# Custom Blocks

This folder contains all of the custom blocks for the Recipes site.

## Blocks
All custom blocks are available in the mu-plugins/recipes/blocks folder. Below is a list of blocks.

### Blocks for Page Post Type
- [Page Template](src/page-template/readme.md)
  - [Homepage Template](src/home-template/readme.md)
    - Hero Image
    - Latest Recipes
    - Recipe Taxonomy
  - [Recipe Listing Template](src/recipe-listing/readme.md)
    - Recipe Search

### Blocks for Recipe Post Type
- [Recipe Template](src/recipe-template/readme.md)
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

### Blocks for Global Header
- [Header](src/header/readme.md)

### Blocks for Global Footer
- [Footer](src/footer/readme.md)
  - Social Media
    - Social Media Item


## Compilation
The custom blocks use the [WordPress Create Block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) package. All commands are from the default Create Block package.

## Architecture/Design Decisions
This section contains a brief Q&A that explains some architecture/design decisions.

### Why only dynamic blocks?
All custom blocks are dynamic blocks that have a React edit function. The reason for this is that it is very common for clients to request front end changes for their blocks. Because static blocks require block deprecations for such changes, the cost of writing and maintaining such deprecations does not make sense in scenarios where you expect the block markup to change. 

### Why do all of your PHP render functions begin with a weird conditional?
All of the render functions begin with something like this:

````
$is_block_editor = is_in_block_editor(); 

if (!$is_block_editor && !defined('REST_REQUEST') && !(wp_doing_ajax())) {
  ...
}
````

I have observed that the PHP render function is executed in the block editor, even when you have a React edit function. Since I have a React edit function, I generally don't want the PHP code being executed in the editor for performance reasons, as well as that occasionally it can cause errors if it is requesting something that is available on the front end but not in the editor. 

To ensure that the PHP render function does not execute in the block editor, I have done the following:
- Borrowed a function from the Advanced Custom Fields plugin, is_in_block_editor (available in the recipes.php file), to detect if the user is on a page with the Block Editor.
- Created a conditional that should ensure that the code does not run in the Block Editor and also that it should not run during post saving and auto-saving.

### Why don't you use block patterns?
This site was built for an organization that has strict brand guidelines and standards regarding what components can go on which pages. Block patterns is a great feature, but as of this writing, it does not allow you to a) require that specific blocks appear in a pattern and b) specific patterns are used in specific scenarios like page templates. 

I have worked in Marketing Departments where the content creation team is small, they have a component library, and they need maximum flexibility to mix and match existing components. In this case, each component would be a block pattern and the team would have the ability to place any pattern on any page or post type. This is where block patterns excel.

In short: block patterns is a great tool, but not the right one for a client that demands a more restricted editing experience.

#### What if the client wants to have reusable blocks?
Understandably, a benefit of block patterns is that you can save them and reuse the exact pattern later. This may come in handy in situations where the same call to action or FAQ should appear on multiple pages. In this case, however, we can't use block patterns because the client demands a more restricted editing experience.

In this scheme: 
1. I would create a custom post type named something like "Reusable Blocks." It would have a locked template that may allow you to add 1 of several block types.
2. I would create another block that would allow you to add a reusable block post.
3. If the client requires further restrictions, we can add some kind of taxonomy to the reusable block post. Then in step 2, we can restrict it so that the user can only add reusable block posts in X category.

### What if you need to update the InnerBlock template?
Each page template block uses an InnerBlock template. If the user adds content and then afterwards, we add a new section to the InnerBlock template, that new section will not appear. 

I have the following workaround to address this:

1. All template blocks have a version attribute. The default is 1. This version attribute does exist on all template blocks in this project.
2. If I would like to add a new section, I would add code that checks for the version. If the version does not equal a specific number, I would replace the existing InnerBlocks by mapping them into a variable that represents the new template (and contains the new section). Then I would use the replaceInnerBlocks function to replace the InnerBlocks. Alternatively, if the section is appearing at the very end of the InnerBlocks, we can just use the synchronizeBlocksWithTemplate function to add the new section if the versions don't match. This is the only suitable scenario for this function, as using it in any other circumstance will result in data loss.

### Why don't you use more core blocks?
Where possible, I use core blocks. Generally, I find core blocks to be useful for elementary things like paragraphs, ordered and unordered lists, headings, etc.

As of this writing, many blocks like the Query Loop Block and the Latest Posts Block have limited customization options for the HTML markup that is rendered on the front end. Due to this:

- Using these blocks and applying TailwindCSS classes to the rendered markup is difficult, if not impossible in some cases.
- I am not able to use these blocks AND maintain the original design.

If such blocks provide greater flexibility with HTML markup customization in the future, I would be happy to use those blocks and build less of my own. 

### Why don't you use ACF Blocks?
When the organization requires a more restrictive editing experience, I find that ACF Blocks generally don't work in this context. Although the InnerBlocks, along with its allowedBlocks property, is available in ACF Blocks, this does not cover all restrictive use cases. I have encountered scenarios where requirements are something like it's required to add at least 1 block of a certain type in a specific area, but the user cannot add more than 3 such blocks. These kinds of requirements can only be accomplished with native blocks.

Additionally, if the content editors like to make very long pages, ACF Blocks will cause performance issues in the editor. This is particularly true if any blocks are using repeater fields. 