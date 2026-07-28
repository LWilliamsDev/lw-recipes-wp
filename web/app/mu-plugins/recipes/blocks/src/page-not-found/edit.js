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
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

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

	const ALLOWED_BLOCKS = ['core/paragraph'];


	return (
		<div { ...blockProps}>
			<RichText 
				identifier="title"
				tagName="h1"
				allowedFormats={[]}
				placeholder={__('Page Not Found', 'lw-recipes')}
				className="font-roboto-condensed mb-[5px] text-3xl md:mb-[10px] md:text-5xl uppercase text-(--color-green)"
				value={title}
				onChange={ title => setAttributes({title})}
			/>
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} placeholder={__('Add text', 'lw-recipes')} templateLock={false} />
		</div>
				
	);
}
