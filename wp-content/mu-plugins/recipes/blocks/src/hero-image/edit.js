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
import { useBlockProps, InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {BaseControl, Panel, PanelBody, Button } from '@wordpress/components';
import { useSelect, dispatch, useDispatch } from '@wordpress/data';
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
		const { imageID, imageUrl } = attributes;

	

	const blockProps = useBlockProps();

	const [isValid, setIsValid] = useState(false);


	useEffect(() => {

			 if (imageID) {
			 	setIsValid(true);
			 	dispatch('core/editor').unlockPostSaving(`hero-image-${clientId}`);
				dispatch('core/editor').unlockPostAutosaving(`hero-image-${clientId}`);
			 }
			 else {
			 	setIsValid(false);
			 	dispatch('core/editor').lockPostSaving(`hero-image-${clientId}`);
				dispatch('core/editor').lockPostAutosaving(`hero-image-${clientId}`);
			 }

		
			return () => {
				dispatch('core/editor').unlockPostSaving(`hero-image-${clientId}`);
				dispatch('core/editor').unlockPostAutosaving(`hero-image-${clientId}`);
		}
	}, [imageID]);



	const dispatch = useDispatch();

			
	const onSelectMedia = (media) => {
		setAttributes({imageID: media.id});
		setAttributes({imageUrl: media.url});

	}

	const removeMedia = () => {
		setAttributes({imageID: 0});
		setAttributes({imageUrl: ""});

	}

	const ALLOWED_BLOCKS = ['lw-recipes/hero-image-heading', 'lw-recipes/hero-image-subtitle', 'lw-recipes/hero-image-cta'];
	const template = [
		['lw-recipes/hero-image-heading'],
		['lw-recipes/hero-image-subtitle'],
		['lw-recipes/hero-image-cta']
	];





	return (
		<div { ...useBlockProps() }>
				<InspectorControls key="setting">
				<PanelBody title={__('Hero Image', 'lw-recipes')}>
					<BaseControl label={__('Image', 'lw-recipes')} className="recipes-required">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectMedia}
							label={__('Upload image', 'lw-recipes') }
							render={({open}) => (
								<Button
									className={imageID ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
									onClick={open}
								>
									{!imageID ? __('Choose or upload file', 'lw-recipes') : <img src={imageUrl} /> }
								</Button>
							)}
						/>
					</MediaUploadCheck>
						{imageID ?
							<MediaUploadCheck>
								<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'lw-recipes')}</Button>
							</MediaUploadCheck> : null
						}
					</BaseControl>
				</PanelBody>
				</InspectorControls>
				{!isValid && ( 
					<div className="recipes-error">
						{ (__('The image field is required.', 'lw-recipes')) }
					</div>
				)}
				
					<section className="hero grid h-[358px] md:h-[717px]">
						<div className="hero row-span-full col-span-full relative">
							{imageID ? <img src={imageUrl} className="col-span-full row-span-full absolute top-0 left-0 w-full h-full object-cover"/> : null }
							<div className="bg-(--color-tan) block w-full h-full opacity-80 absolute left-0 top-0"></div>
						</div>
						<div className="row-span-full col-span-full relative z-2 text-center self-center">
							<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={template} templateLock="all" />
						</div>
					</section>
			
		</div>
	);
}
