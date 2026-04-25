/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {Panel, PanelBody, TextControl } from '@wordpress/components';
import { useSelect } from "@wordpress/data";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {
	const { serves, prepTime, totalTime } = attributes;

   const blockProps = useBlockProps();

   const title = useSelect((select) => select('core/editor').getEditedPostAttribute('title'));
   const excerpt = useSelect((select) => select('core/editor').getEditedPostAttribute('excerpt'));
   const course = useSelect( (select) => { 
   		const courseId = select('core/editor').getEditedPostAttribute('course');
   		if (courseId.length > 0) {
   			const courseTax = select('core').getEntityRecord('taxonomy', 'course', courseId[0]);
   			return ( 
   				courseTax?.name || ''
   				);
   		}
   }, []);

   const diet = useSelect( (select) => { 
   		const dietId = select('core/editor').getEditedPostAttribute('diet');
   		if (dietId.length > 0) {
   			const dietTax = select('core').getEntityRecord('taxonomy', 'diet', dietId[0]);
   			return ( 
   				dietTax?.name || ''
   				);
   		}
   }, []);
 
   const getFeaturedMediaUrl = useSelect( ( select ) => {
   const getFeaturedMediaId = select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
   const getMedia = select( 'core' ).getMedia( getFeaturedMediaId );

    return (
        getMedia?.media_details?.sizes?.large?.source_url ||
        getMedia?.source_url ||
        ''
    );
}, [] );




	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="setting">
				<PanelBody title={__('Recipe Data', 'lw-recipes')}>
					<div className="recipes-group">
						<TextControl label={__('Serves', 'lw-recipes')} value={serves} onChange={serves => setAttributes({serves})} />
						<TextControl label={__('Prep Time', 'lw-recipes')} value={prepTime} onChange={prepTime => setAttributes({prepTime})} />
						<TextControl label={__('Total Time', 'lw-recipes')} value={totalTime} onChange={totalTime => setAttributes({totalTime})} />
					</div>
				</PanelBody>
				</InspectorControls>
			<hr />
			<ul class="breadcrumbs">
				<li><a href="#">Recipes</a></li>
				<li><a href="#">{course ? course : 'Course Here'}</a></li>
				<li><a href="#">{diet ? diet : 'Diet Here'}</a></li>
			</ul>
			<h1>{title ? title : 'H1 Title Here' }</h1>
			<p>{excerpt ? excerpt : 'Recipe Excerpt Here' }</p>
			{getFeaturedMediaUrl ? <img src={getFeaturedMediaUrl} /> : <div class="placeholder"><p>Featured Media Here</p></div>}
			<ul>
				 <li><span class="brown"><strong>Serves:</strong></span> {serves ? serves : null}</li>
				 <li><span class="brown"><strong>Prep Time:</strong></span> {prepTime ? prepTime : null}</li>
				 <li><span class="brown"><strong>Total Time:</strong></span> {totalTime ? totalTime : null}</li>
			</ul>

		</div>
	);
}
