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

	

	const blockProps = useBlockProps();



	const ALLOWED_BLOCKS = ['core/heading', 'core/list'];
	const template = [
		['core/heading', {level: 3, placeholder: 'Scones'}],
		['core/list', {ordered: true}],
		['core/heading', {level: 3, placeholder: 'Frosting'}],
		['core/list', {ordered: true}]
	];





	return (
		<div { ...blockProps }>
			<h2 className="text-3xl font-roboto-condensed uppercase text-(--color-green)">{__('Instructions', 'lw-recipes')}</h2>
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={template} templateLock={false} />
		</div>
	);
}
