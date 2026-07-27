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

		const blockProps = useBlockProps({
			className: 'px-4 pb-8 pt-8 md:grid md:grid-cols-[1fr_1fr] md:px-12 md:pt-8'
		});


	const [menuItems, setMenuItems] = useState([]);

	const ALLOWED_BLOCKS = ['lw-recipes/social-media'];
	const template = [['lw-recipes/social-media']];



	useEffect(() => {
			wp.apiFetch({path: `wp/v2/menu`}).then(data => {
				let menuItems;
				if (Array.isArray(data)) {
					menuItems = data;
				}
				else if (typeof data === 'object') {
					menuItems.Object.values(data);
				}
				setMenuItems(menuItems);
			});
	}, []);

	const domain = window.location.hostname;
	const protocol = window.location.protocol;
	




	return (
		<footer { ...blockProps}>
			<div>
				<a href="#"><img src={`${protocol}//${domain}/app/themes/lw-recipes/assets/img/recipes-logo.svg`} alt="Fit and Flavor Logo" className="w-1/2 sm:w-1/3" /></a>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={template}
				/>
			</div>
			<div className="md:justify-self-end">
				{ menuItems ? <ul className="nav md:flex md:gap-x-24">{ menuItems.map((item) => <li key={item.id}><a href="#">{item.title}</a></li>)}</ul>
				: <p>Menu not found</p>}
			</div>
		</footer>
				
	);
}
