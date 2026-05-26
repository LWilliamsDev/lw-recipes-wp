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
import { useBlockProps, RichText, BlockControls, HeadingLevelDropdown } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {
		const { heading, headingLevel } = attributes;

		const tagName = 'h' + headingLevel;
		const headingOptions = [ 1, 2, 3, 4, 5, 6 ];

		const blockProps = useBlockProps();





	return (
		<div { ...useBlockProps() }>
				
					
					
								<BlockControls group="block">
						<ToolbarGroup>
					
        				<HeadingLevelDropdown
						value={ headingLevel }
						options={ headingOptions }
						onChange={ ( newLevel ) =>
							setAttributes( { headingLevel: newLevel } )
						}
					/>

					</ToolbarGroup>
				</BlockControls>
			
							<RichText identifier="title" className="font-roboto-condensed text-4xl md:text-6xl uppercase text-(--color-green) mb-[10px] md:mb-[20px] is-layout-flow wp-block-lw-recipes-hero-image-heading-is-layout-flow" tagName={tagName} value={heading} onChange={ heading => setAttributes({heading})} placeholder={__('My Hero Title', 'lw-recipes')} />
					
				
			
		</div>
	);
}
