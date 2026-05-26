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
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {
	const { version } = attributes;

	
	const blockProps = useBlockProps();


	const ALLOWED_BLOCKS = ['lw-recipes/recipe-content', 'lw-recipes/recipe-post-nav', 'lw-recipes/recipe-related'];
	const template = [ 
		['lw-recipes/recipe-content'],
		['lw-recipes/recipe-post-nav'],
		['lw-recipes/recipe-related']
	];



	return (
		<div { ...blockProps }>
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={template} templateLock="all" />
		</div>
	);
}
