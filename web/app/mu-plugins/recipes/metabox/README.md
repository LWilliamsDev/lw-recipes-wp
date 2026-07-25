# Custom Metabox
When categorizing content, the Fit & Flavor Content Team have the following requirements:

- All editors must only place their recipes in 1 course and 1 diet taxonomy.
- Both the course and diet taxonomies are required.

To accomplish the above requirements: 

1. I have removed the default editor panels for the course and diet taxonomies. 
2. I added my own panels that use the ComboboxControl, which restricts users to selecting only 1 term per recipe for each of these taxonomies.
3. I placed these controls in a new "Recipe Details" sidebar panel. 
4. If there are no course and diet taxonomy terms assigned, a notice appears at the top of the block editor noting the missing requirements. It also contains a button that opens the Recipe Details sidebar panel.