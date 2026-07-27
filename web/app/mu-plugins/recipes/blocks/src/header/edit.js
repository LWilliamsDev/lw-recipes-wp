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

		const blockProps = useBlockProps({
			className: 'grid grid-cols-[3fr_1fr] md:grid-cols-[0.5fr_1fr] items-center px-4 py-8 md:px-12 md:py-8'
		});


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
		<header { ...blockProps}>
		    <div className="w-1/2 md:w-49">
		    	<a href="#">
		    		<img src={`${protocol}//${domain}/app/themes/lw-recipes/assets/img/recipes-logo.svg`} alt="Fit and Flavor Logo" />
		    	</a>
		    </div>
			<div className="col-span-full row-start-3 mt-[15px] md:row-start-1 md:col-start-2 md:justify-self-end md:flex">
				<nav className="-mx-4 md:mx-0">
				{ menuItems ? <ul className="nav hidden md:flex text-left md:gap-x-8">{ menuItems.map((item) => <li key={item.id} className="py-1 flex flex-wrap border-b border-solid border-(--color-mid-green) md:border-b-0 md:relative md:hover:bg-(--color-tan) md:p-4"><a href="#">{item.title}</a></li>)}</ul>
				: <p>Menu not found</p>}
				</nav>
				<button className="search-btn cursor-pointer hidden md:block p-4 ml-4">
					<img src={`${protocol}//${domain}/app/themes/lw-recipes/assets/img/search-icon.svg`} className="w-[24px] h-[24px" />
				</button>
			</div>
		</header>
				
	);
}
