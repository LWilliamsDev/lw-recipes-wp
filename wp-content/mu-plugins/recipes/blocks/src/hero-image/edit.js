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
import {Panel, PanelBody, Button } from '@wordpress/components';
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
				<PanelBody title={__('Hero Image Text', 'lw-recipes')}>
					<div className="recipes-group">
					<span className="recipes-label recipes-required">{__('Hero Image', 'lw-recipes')}</span>
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
					</div>
				</PanelBody>
				</InspectorControls>
				{!isValid && ( 
					<div className="error">
						{ (__('The image field is required.', 'lw-recipes')) }
					</div>
				)}
				
					<div className="hero-image">
						{imageID ? <img src={imageUrl} /> : null }
						<div className="bg-color"></div>
						<div className="text">
							<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={template} templateLock="all" />
						</div>
					</div>
			
		</div>
	);
}
