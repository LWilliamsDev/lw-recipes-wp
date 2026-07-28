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
import { useBlockProps } from '@wordpress/block-editor';

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
	




	return (
		<div { ...blockProps}>
			<h1 className="font-roboto-condensed mb-[5px] text-3xl md:mb-[10px] md:text-5xl uppercase text-(--color-green)">
			{__('Search Results', 'lw-recipes')}
			</h1>
			<form role="search" className="search-form mt-8">
				<div className="grid grid-cols-[1fr_85px] gap-x-2">
					<input
						id="search-input"
						type="search"
						name="s"
						placeholder="Search..."
						className="rounded-sm border border-(--color-mid-green) border-solid p-2" />

					<button type="submit" className="button p-[10px] inline-block rounded-sm text-(--color-white) font-medium cursor-pointer" disabled>
						Search
					</button>
				</div>
			</form>
		</div>
				
	);
}
