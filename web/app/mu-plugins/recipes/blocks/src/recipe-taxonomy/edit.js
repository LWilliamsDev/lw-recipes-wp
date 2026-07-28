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
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, ComboboxControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';
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
		const { title, taxonomy } = attributes;

		const blockProps = useBlockProps();

		const taxonomies = useSelect((select) => { return select(coreDataStore).getTaxonomies({ type: 'recipe'})}, []);


		let options = []
		if( taxonomies ) {
			options = taxonomies.map( (tax) => ({ label: decodeEntities(tax.name), value: tax.slug }));
		}


		const terms = useSelect((select) => 
			{ return taxonomy ? select('core').getEntityRecords('taxonomy', taxonomy, { acf_format: 'standard' }) : []; 
		     }, [taxonomy]);




        
	return (
		<div { ...blockProps }>
				<InspectorControls key="setting">
				<PanelBody title={__('Recipe Taxonomy', 'lw-recipes')}>
					<ComboboxControl 
						label={__('Taxonomy', 'lw-recipes')} 
						options={options} 
						value={taxonomy} 
						help={__('If no taxonomy is selected, it will default to diet.', 'lw-recipes')} 
						onChange={ taxonomy => setAttributes({taxonomy})} 
						/>
				</PanelBody>
			</InspectorControls>
			<section className="px-4 py-8 md:px-12 md:py-12">
			 <RichText 
			    	identifier="title"
			    	className="font-roboto-condensed text-5xl color-green text-(--color-green) mb-8 uppercase"
			    	value={title}
			    	onChange={(title) => setAttributes({title})}
			    	tagName="h2"
			    	allowedFormats={[]}
			    	placeholder={__(`Browse by ${decodeEntities(taxonomy)}`, 'lw-recipes')}
			    />
				<div className="cards sm:grid sm:grid-cols-[1fr_1fr] sm:gap-x-5">
					{ terms && terms.map((term) => (
						<div className="card mb-8" key={term.id}>
							<h3>
								<a href="#" className="grid block">
						   			{ term?.acf?.featured_image ? <img src={term.acf.featured_image.url} className="w-full h-auto col-start-1 row-start-1 rounded-lg" /> : null }
						    		<div className="bg-(--color-tan) col-start-1 row-start-1 opacity-90 self-end p-4">
										<span className="text-2xl font-medium text-(--color-brown) hover:text-(--color-mid-green)">
											{decodeEntities(term.name)}
										</span>
									</div>
								</a>
							</h3>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
