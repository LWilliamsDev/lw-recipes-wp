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
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import {Button, Panel, PanelBody, Placeholder, TextControl, Notice } from '@wordpress/components';
import { dispatch, useDispatch, useSelect } from "@wordpress/data";
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
	const { serves, prepTime, totalTime } = attributes;

   const blockProps = useBlockProps();

   const title = useSelect((select) => select('core/editor').getEditedPostAttribute('title'));
   const excerpt = useSelect((select) => select('core/editor').getEditedPostAttribute('excerpt'));

   const { openGeneralSidebar } = useDispatch( 'core/edit-post' );
   const { toggleEditorPanelOpened } = useDispatch( 'core/editor' );

   const handleOpenExcerpt = () => {
        // Step A: Force open the main settings sidebar ("Post" / "Document" tab)
        openGeneralSidebar( 'edit-post/document' );
        
        // Step B: Ensure the excerpt panel folds open
        toggleEditorPanelOpened( 'post-excerpt' );
   };



   const course = useSelect( (select) => { 
   		const courseId = select('core/editor').getEditedPostAttribute('course');
   		if (courseId.length > 0) {
   			const courseTax = select('core').getEntityRecord('taxonomy', 'course', courseId[0]);
   			return ( 
   				courseTax?.name || ''
   				);
   		}
   }, []);

   const diet = useSelect( (select) => { 
   		const dietId = select('core/editor').getEditedPostAttribute('diet');
   		if (dietId.length > 0) {
   			const dietTax = select('core').getEntityRecord('taxonomy', 'diet', dietId[0]);
   			return ( 
   				dietTax?.name || ''
   				);
   		}
   }, []);
 
   const { featuredImageId, featuredImageUrl } = useSelect( ( select ) => {
   	const editor = select( 'core/editor' );
   	const id = editor.getEditedPostAttribute( 'featured_media' );
    
   	// If an ID exists, fetch the media object to get its source URL
    const media = id ? select( 'core' ).getEntityRecord( 'postType', 'attachment', id ) : null;

    return {
        featuredImageId: id,
        featuredImageUrl: media?.source_url,
    };
   }, [] );

   const { editPost } = useDispatch( 'core/editor' );

   // 3. Update the global post when an image is chosen
   const onSelectFeaturedImage = ( media ) => {
        editPost( { featured_media: media.id } );
   };

   //Validation
   const isExcerptMissing = ! excerpt || excerpt.trim() === '';
   const isImageMissing = ! featuredImageId || featuredImageId === 0;

   // Lock the post from saving globally if *either* condition fails
   const isInvalid = isExcerptMissing || isImageMissing;
   usePostLock( isInvalid, `recipe-overview-${clientId}` );




	return (
		<div { ...blockProps }>
			<div className="mb-[10px] md:mb-[20px] pt-[5px] border-t border-solid border-(--color-mid-green)">
				<ul class="flex flex-wrap breadcrumbs gap-[10px]">
					<li><a href="#">Recipes</a></li>
					<li><a href="#">{course ? course : 'Course Here'}</a></li>
					<li><a href="#">{diet ? diet : 'Diet Here'}</a></li>
				</ul>
			</div>
			<div className="mb-[20px]">
				<h1 className="font-roboto-condensed mb-[5px] text-3xl md:mb-[10px] md:text-5xl uppercase text-(--color-green)">{title ? title : 'H1 Title Here' }</h1>
				{ isInvalid && (
    				<Notice status="error" isDismissible={ false }>
        				<p style={ { margin: '0 0 8px 0', fontWeight: '600' } }>
            				{ __( 'Please fix the following issues to enable saving:', 'lw-recipes' ) }
        				</p>
        				<ul style={ { margin: 0, paddingLeft: '20px', listStyleType: 'disc' } }>
            				{ isExcerptMissing && <li>{ __( 'Add a post excerpt.', 'lw-recipes' ) }</li> }
           		 			{ isImageMissing && <li>{ __( 'Set a featured image.', 'lw-recipes' ) }</li> }
        				</ul>
    				</Notice>
    			)}
				{excerpt ? 
					(<p className="text-base md:text-2xl text-(--color-brown)">{excerpt}</p>) 
					: 
					(
					 <Placeholder 
					 	label={__('Post Excerpt', 'lw-recipes')}
					 	className={isExcerptMissing ? 'has-requirement-error' : undefined}
					 	instructions={__('The post excerpt will appear here.', 'lw-recipes')}>
					 		<Button 
					 			onClick={handleOpenExcerpt}
					 			isPrimary
					 		>
					 				{__('Add Excerpt', 'lw-recipes')}
					 		</Button>
					 </Placeholder>
					)
				}
			</div>
			<div className="mb-[20px] md:mb-[30px]">
				{ featuredImageUrl ? (
        			// State 1: Image is set. Display ONLY the image, no controls.
        			<img 
            			src={ featuredImageUrl } 
            			className="w-full wp-post-image rounded-lg" 
            			alt={ __( 'Featured Content', 'lw-recipes' ) } 
        			/>
    			  ) : (
        			// State 2: No image set. Display the workflow placeholder.
        			<Placeholder
        			     className={isImageMissing ? 'has-requirement-error' : undefined} 
            			label={ __( 'Featured Image', 'lw-recipes' ) }
            			instructions={ __( 'The featured image will appear here.', 'lw-recipes' ) }
        			>
           				<MediaUploadCheck>
                			<MediaUpload
                    			onSelect={ onSelectFeaturedImage }
                    			allowedTypes={ [ 'image' ] }
                    			value={ featuredImageId }
                    			render={ ( { open } ) => (
                        			<Button 
                            			onClick={ open } 
                            			isPrimary
                        			>
                            			{ __( 'Set Post Featured Image', 'lw-recipes' ) }
                        			</Button>
                    			) }
                			/>
           			 	</MediaUploadCheck>
        			</Placeholder>
    			  ) }
			</div>
			<ul className="flex flex-wrap gap-[10px] text-(--color-dark-green)">
				 		 <li>
				 		 	<span className="text-(--color-brown)">
				 		 		<strong>{__('Serves: ', 'lw-recipes')}</strong>
				 		 	</span>
				 		 	<RichText 
				 		 		identifier="serves" 
				 		 		tagName="span" 
				 		 		allowedFormats={[]} 
				 		 		value={serves} 
				 		 		onChange={ ( serves ) => setAttributes( { serves } ) } 
				 		 		placeholder={__('6', 'lw-recipes')}
				 		 	/>
				 		 </li>
				 		  <li>
				 		  	<span className="text-(--color-brown)">
				 		  		<strong>{__('Prep Time: ', 'lw-recipes')}</strong>
				 		  	</span>	
				 		 	<RichText 
				 		 		identifier="prepTime" 
				 		 		tagName="span" 
				 		 		allowedFormats={[]} 
				 		 		value={prepTime} 
				 		 		onChange={ ( prepTime ) => setAttributes( { prepTime } ) } 
				 		 		placeholder={__('10 mins', 'lw-recipes')}
				 		 	/>
				 		 </li>
						  <li>
						  <span className="text-(--color-brown)">
						  	<strong>{__('Total Time: ', 'lw-recipes')}</strong>
						  </span>
				 		  <RichText 
				 		 	identifier="totalTime" 
				 		 	tagName="span" 
				 		 	allowedFormats={[]} 
				 		 	value={prepTime} 
				 		 	onChange={ ( totalTime ) => setAttributes( { totalTime } ) } 
				 		 	placeholder={__('30 mins', 'lw-recipes')}
				 		 	/>
				 		 </li>
					</ul>
		</div>
	);
}
