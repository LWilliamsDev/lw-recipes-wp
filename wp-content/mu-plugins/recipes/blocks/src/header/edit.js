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

		const blockProps = useBlockProps();


	const [menuItems, setMenuItems] = useState([]);



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
		<div { ...blockProps}>
			<div className="logo"><img src={`${protocol}//${domain}/wp-content/themes/lw-recipes/assets/img/recipes-logo.svg`} alt="Fit and Flavor Logo" /></div>
			<div className="menu-area">
				<div className="menu">
				{ menuItems ? <ul>{ menuItems.map((item) => <li><a href="#">{item.title}</a></li>)}</ul>
				: <p>Menu not found</p>}
				</div>
				<div className="search">
					<img src={`${protocol}//${domain}/wp-content/themes/lw-recipes/assets/img/search-icon.svg`} />
				</div>
			</div>
		</div>
				
	);
}
