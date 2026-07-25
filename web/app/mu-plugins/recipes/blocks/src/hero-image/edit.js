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
import { BlockControls, useBlockProps, MediaUpload, MediaUploadCheck, RichText, HeadingLevelDropdown } from '@wordpress/block-editor';
import { Button, Notice, Placeholder, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { usePostLock } from "../../helper-functions/utils";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {
		const { imageID, imageUrl, heading, headingLevel, subtitle, cta } = attributes;

	

	const blockProps = useBlockProps();


	const isImageMissing = ! imageID || imageID === 0;

   // Lock the post from saving globally if *either* condition fails
   const isInvalid = isImageMissing;
   usePostLock( isInvalid, `hero-image-${clientId}` );



	const dispatch = useDispatch();

			
	const onSelectMedia = (media) => {
		setAttributes({imageID: media.id});
		setAttributes({imageUrl: media.url});

	}


	const tagName = 'h' + headingLevel;
	const headingOptions = [ 1, 2, 3, 4, 5, 6 ];

	const [activeRichText, setActiveRichText ] = useState(null);




	return (
		<div { ...blockProps }>
				<BlockControls group="default">
					<ToolbarGroup>
						{imageID > 0 && (
					 		<MediaUploadCheck>
					 			<MediaUpload
					 				onSelect={onSelectMedia}
					 				allowedTypes={['image']}
					 				value={imageID}
					 				render={({open}) => (
					 					<ToolbarButton
					 						icon="format-image"
					 						label={__('Replace Image', 'lw-recipes')}
					 						onClick={open}>
					 						{__('Replace', 'lw-recipes')}
					 					</ToolbarButton>
					 				)}	
					 			/>
					 	 	</MediaUploadCheck>
					  )}	
					   {activeRichText === 'title' && (
        					<HeadingLevelDropdown
								value={ headingLevel }
								options={ headingOptions }
								onChange={ ( newLevel ) => setAttributes( { headingLevel: newLevel } )}
							/>
						)}
					</ToolbarGroup>
				</BlockControls>
			    { isInvalid && (
    				<Notice status="error" isDismissible={ false }>
        				<p style={ { margin: '0 0 8px 0', fontWeight: '600' } }>
            				{ __( 'Please fix the following issues to enable saving:', 'lw-recipes' ) }
        				</p>
        				<ul style={ { margin: 0, paddingLeft: '20px', listStyleType: 'disc' } }>
           		 			{ isImageMissing && <li>{ __( 'Add a hero image.', 'lw-recipes' ) }</li> }
        				</ul>
    				</Notice>
    			)}
				<section className="hero grid h-[358px] md:h-[717px]">
					<div className="hero row-span-full col-span-full relative">
						{ imageUrl ? (
        					// State 1: Image is set. Display ONLY the image, no controls.
        					<>
        						<img 
            						src={ imageUrl } 
            						className="col-span-full row-span-full absolute top-0 left-0 w-full h-full object-cover" 
            						alt={ __( 'Featured Content', 'lw-recipes' ) } 
        						/>
        						<div className="bg-(--color-tan) block w-full h-full opacity-80 absolute left-0 top-0"></div>
        					</>
    			  		   ) : (
        					// State 2: No image set. Display the workflow placeholder.
        					<Placeholder
        			     		className={isImageMissing ? 'has-requirement-error' : undefined} 
            					label={ __( 'Hero Image', 'lw-recipes' ) }
            					instructions={ __( 'Please upload an image sized 1438x717 pixels.', 'lw-recipes' ) }
        					>
           						<MediaUploadCheck>
                					<MediaUpload
                    					onSelect={ onSelectMedia }
                    					allowedTypes={ [ 'image' ] }
                    					value={ imageID }
                    					render={ ( { open } ) => (
                        					<Button 
                            					onClick={ open } 
                            					isPrimary
                        					>
                            					{ __( 'Add Hero Image', 'lw-recipes' ) }
                        					</Button>
                    					) }
                					/>
           			 			</MediaUploadCheck>
        					</Placeholder>
        				)}
						</div>
						<div className="row-span-full col-span-full relative z-2 text-center self-center">
							<RichText 
								identifier="title" 
								className="font-roboto-condensed text-4xl md:text-6xl uppercase text-(--color-green) mb-[10px] md:mb-[20px] is-layout-flow wp-block-lw-recipes-hero-image-heading-is-layout-flow" 
								tagName={tagName} 
								value={heading} 
								onChange={ heading => setAttributes({heading})} placeholder={__('My Hero Title', 'lw-recipes')} 
								onFocus={() => setActiveRichText('title')}
							/>
							<RichText 
								tagName="p" 
								identifier="subtitle"
								className="text-color(--color-dark-green) text-sm md:text-2xl mb-[15px] md:mb-[20px]" 
								allowedFormats={['core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough', 'core/underline']} 
								value={subtitle} 
								onChange={(newContent) => setAttributes({subtitle: newContent})} 
								placeholder={__('Subtitle', 'lw-recipes')} 
								onFocus={() => setActiveRichText('subtitle')}
							/>
							<RichText 
								tagName="p" 
								identifier="cta"
								className="hero-image__cta" 
								allowedFormats={['core/link', 'core/subscript', 'core/superscript', 'core/italic', 'core/strikethrough']} 
								value={cta} onChange={cta => setAttributes({cta})}  
								placeholder={__('CTA', 'lw-recipes')} 
								onFocus={() => setActiveRichText('cta')}
							/>		
						</div>
				</section>
		</div>
	);
}
