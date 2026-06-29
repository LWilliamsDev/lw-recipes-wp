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
import { decodeEntities } from '@wordpress/html-entities';

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
		const { getEntityRecords, getEntityRecord } = select('core');

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
			const media = post.featured_media ? getEntityRecord('postType', 'attachment', post.featured_media) : null;
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
		<aside { ...blockProps }>
			{relatedPosts ? (
				<div>
					<h2 className="text-3xl font-roboto-condensed uppercase text-(--color-green) mb-[10px]">{__('You Might Also Like', 'lw-recipes')}</h2>
					<ul className="md:grid md:grid-cols-[1fr_1fr_1fr] md:gap-x-5">
						{ relatedPosts.map((post) => (
							<li key={post.id} className="mb-5 md:mb-0">
								<a href="#">
									{post.imageUrl && <img src={post.imageUrl} className="w-full wp-post-image" />}
									<h3 className="text-xl font-medium mt-2">{decodeEntities(post.title)}</h3>
								</a>
							</li>
						))}
					</ul>
				</div>
			) : null }
		</aside>
	);
}
