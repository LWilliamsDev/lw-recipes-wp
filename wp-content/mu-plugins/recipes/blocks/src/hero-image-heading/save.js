/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	const tagName = 'h' + attributes.headingLevel;

	if (!attributes.heading) return null;

	return (
			<RichText.Content tagName={tagName} value={attributes.heading} className="font-roboto-condensed text-4xl md:text-6xl uppercase text-(--color-green) mb-[10px] md:mb-[20px]" />
	);
}
