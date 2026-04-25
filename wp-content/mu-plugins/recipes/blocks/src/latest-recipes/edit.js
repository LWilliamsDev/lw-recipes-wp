/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
		const { title } = attributes;

		const blockProps = useBlockProps();

		const data = useSelect((select) => { return select('core').getEntityRecords('postType', 'recipe', { per_page: 3 })}, []);

		const isLoading = !data;
		const hasPosts = data && data.length > 0;

        
        // Fetching terms (taxonomy 'diet') for each post
  		const termData = useSelect((select) => { return select('core').getEntityRecords('taxonomy', 'diet', { per_page: 100 }); }, []);

  
  		const hasTermData = termData && termData.length > 0;

		// Function to get term names by their IDs
  		const getTermNames = (termIds) => {
    	if (!termData || termIds.length === 0) return null;
    		return termIds
      	.map((id) => {
        	const term = termData.find((term) => term.id === id);
        	return term ? term.name : null;
      	})
      	.filter(Boolean); // Remove null values
      
  		};

        
	return (
		<div { ...useBlockProps() }>
				<InspectorControls key="setting">
				<PanelBody title={__('Latest Recipes', 'lw-recipes')}>
					<TextControl label={__('Title', 'lw-recipes')} help={ __('Section Title; will default to Latest Recipes if left blank', 'lw-recipes')} value={title} onChange={ title => setAttributes({title})} />
				</PanelBody>
			</InspectorControls>
			<div className="grid">
				<h2>{ title ? title : __('Latest Recipes', 'lw-recipes') }</h2>
				{isLoading && <p>{__('Loading latest recipes...', 'lw-recipes')}</p>}
			   {hasPosts && hasTermData ? (
                    data.map((post) => (
                        <div key={post.id}>
                            <h3>{post.title.raw}</h3>
                            <p>{post.excerpt.raw}</p>
                            {post.diet && post.diet.length > 0 && (
                                <ul>
                                    {getTermNames(post.diet).map((termName, index) => (
                                        <li key={index}>{termName}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                ) : (
                    !isLoading && <p>{__('No recipes found.', 'lw-recipes')}</p>
                )}
			</div>
		</div>
	);
}
