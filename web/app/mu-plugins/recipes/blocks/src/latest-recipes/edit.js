/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
		const { title } = attributes;

		const blockProps = useBlockProps();

		const data = useSelect((select) => { return select('core').getEntityRecords('postType', 'recipe', { per_page: 3, _embed: true })}, []);

		const isLoading = !data;
		const hasPosts = data && data.length > 0;

        
        // Fetching terms (taxonomy 'diet') for each post
  		const termData = useSelect((select) => { return select('core').getEntityRecords('taxonomy', 'diet', { per_page: 100 }); }, []);

  
  		const hasTermData = termData && termData.length > 0;

		// Function to get term names by their IDs
  		const getTermNames = (termIds) => {
    	if (!termData || termIds.length === 0) return null;
    		return termIds
      	.map((id) => {
        	const term = termData.find((term) => term.id === id);
        	return term ? decodeEntities(term.name) : null;
      	})
      	.filter(Boolean); // Remove null values
      
  		};

        
	return (
		<div { ...blockProps }>
			<section className="px-4 py-8 md:px-12 md:py-12">
			    <RichText 
			    	identifier="title"
			    	className="font-roboto-condensed text-5xl color-green text-(--color-green) mb-8 uppercase"
			    	value={title}
			    	onChange={(title) => setAttributes({title})}
			    	tagName="h2"
			    	allowedFormats={[]}
			    />
				{isLoading && <p>{__('Loading latest recipes...', 'lw-recipes')}</p>}
			   {hasPosts && hasTermData ? (
			   	   <div className="cards sm:grid sm:grid-cols-[1fr_1fr_1fr] sm:gap-x-5">
                    	{data.map((post) => {
                    		const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url;

                    		return (
                        		<div key={post.id} className="card mb-8">
                        		     {imageUrl ? (
                    					<img src={imageUrl} alt={post.title.rendered} className="mb-5 w-full h-auto wp-post-image" />
                					) : null}
                            		<h3 className="text-2xl font-medium text-(--color-brown)">{post.title.rendered}</h3>
                            		<p className="text-(--color-dark-green)">{post.excerpt.raw}</p>
                            		{post.diet && post.diet.length > 0 && (
                               			<ul className="categories mt-5 flex flex-wrap gap-[10px]">
                                    		{getTermNames(post.diet).map((termName, index) => (
                                        	<li key={index}><a href="#" className="button p-[10px] inline-block rounded-sm text-(--color-white) font-medium">{decodeEntities(termName)}</a></li>
                                    		))}
                                		</ul>
                            		)}
                        		</div>
                        	);
                    	})}
                    </div>
                ) : (
                    !isLoading && <p>{__('No recipes found.', 'lw-recipes')}</p>
                )}
			</section>
		</div>
	);
}
