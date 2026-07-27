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
import { useBlockProps } from '@wordpress/block-editor';
import { PostPreviewButton } from '@wordpress/editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {


        
	return (
		<div { ...useBlockProps() }>
			<h2 className="text-2xl text-(--color-green) mb-2">{__('Recipe Search Component', 'lw-recipes')}</h2>
			<p className="mb-2">{__('This component is not displayed directly in the editor because the full experience relies on front-end functionality that is not available while editing. To test filters, interactions, and the complete user experience, please preview this page in a new tab.', 'lw-recipes')}</p>
			<PostPreviewButton />
		</div>
	);
}
