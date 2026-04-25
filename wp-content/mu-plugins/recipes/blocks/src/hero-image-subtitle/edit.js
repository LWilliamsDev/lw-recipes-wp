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
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {
		const { subtitle} = attributes;

		const blockProps = useBlockProps();




	return (
		<div { ...useBlockProps() }>
			<RichText tagName="p" allowedFormats={['core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough', 'core/underline']} value={subtitle} onChange={(newContent) => setAttributes({subtitle: newContent})} className="text-color(--color-dark-green) text-sm md:text-2xl mb-[15px] md:mb-[20px]" placeholder={__('Subtitle', 'lw-recipes')} />		
		</div>
	);
}
