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
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {

	

	const blockProps = useBlockProps({
		className: 'mb-[30px]'
	});


	const ALLOWED_BLOCKS = ['lw-recipes/recipe-complex-ingredient'];
	const template = [
		['lw-recipes/recipe-complex-ingredient'],
		['lw-recipes/recipe-complex-ingredient']
	];

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'md:grid gap-x-5 md:grid-cols-[1fr_1fr] md:gap-y-5'
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: template,
			templateLock: false
		}
	);





	return (
		<div { ...blockProps }>
			<h2 className="text-3xl font-roboto-condensed uppercase text-(--color-green)">{__('Ingredients', 'lw-recipes')}</h2>
			<div { ...innerBlocksProps } />
		</div>
	);
}
