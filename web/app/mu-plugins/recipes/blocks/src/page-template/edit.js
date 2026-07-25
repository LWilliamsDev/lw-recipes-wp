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
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

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

	const [isValid, setIsValid] = useState(false);

	const innerBlockCount = useSelect((select) => {
		const block = select('core/block-editor').getBlock(clientId);
		return block?.innerBlocks?.length || 0;
	}, [clientId]);


	useEffect(() => {
		if (innerBlockCount <= 1) {
			setIsValid(true);
			dispatch('core/editor').unlockPostSaving(`recipe-page-${clientId}`);
			dispatch('core/editor').unlockPostAutosaving(`recipe-page-${clientId}`);
		}
		else {
			setIsValid(false);
			dispatch('core/editor').lockPostSaving(`recipe-page-${clientId}`);
			dispatch('core/editor').lockPostAutosaving(`recipe-page-${clientId}`);
		}

		
		return () => {
			dispatch('core/editor').unlockPostSaving(`recipe-page-${clientId}`);
			dispatch('core/editor').unlockPostAutosaving(`recipe-page-${clientId}`);
		}
	}, [innerBlockCount]);


	const ALLOWED_BLOCKS = ['lw-recipes/home-template', 'lw-recipes/recipe-listing-template'];



	return (
		<div { ...blockProps }>
		{!isValid && ( 
					<div className="recipes-error">
						{ (__('Only 1 template is allowed.', 'lw-recipes')) }
					</div>
			)}
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} templateLock={false} placeholder={__('Choose a template', 'lw-recipes')} />
		</div>
	);
}
