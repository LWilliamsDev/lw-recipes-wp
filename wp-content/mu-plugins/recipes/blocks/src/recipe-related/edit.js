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
import { useSelect } from "@wordpress/data";

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

const relatedPosts = useSelect((select) => {
		const { getEditedPostAttribute, getCurrentPostId } = select('core/editor');
		const { getEntityRecords, getMedia } = select('core');

		const dietIds = getEditedPostAttribute('diet');
		const currentPostId = getCurrentPostId();

		if (!dietIds?.length || !currentPostId) return null;

		const posts = getEntityRecords('postType', 'recipe', {
			per_page: 3,
			diet: dietIds[0],
			exclude: currentPostId,
		});

		if (!posts) return null;

		// Add featured media data
		const postsWithImages = posts.map((post) => {
			const media = post.featured_media ? getMedia(post.featured_media) : null;
			const imageUrl = media?.source_url || null;

			return {
				id: post.id,
				title: post.title.rendered,
				link: post.link,
				imageUrl,
			};
		});

		return postsWithImages;
	}, []);





	return (
		<div { ...blockProps }>
			{relatedPosts ? (
				<>
					<h2>{__('You Might Also Like', 'lw-recipes')}</h2>
					<ul>
						{ relatedPosts.map((post) => (
							<li key={post.id}>
								<a href="#">
									{post.imageUrl && <img src={post.imageUrl} />}
									<h3>{post.title}</h3>
								</a>
							</li>
						))}
					</ul>
				</>
			) : null }
		</div>
	);
}
