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
import {Panel, PanelBody, PanelRow, TextControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';

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
			options = taxonomies.map( (tax) => ({ label: tax.name, value: tax.slug }));
		}


		const terms = useSelect((select) => 
			{ return taxonomy ? select('core').getEntityRecords('taxonomy', taxonomy, { acf_format: 'standard' }) : []; 
		     }, [taxonomy]);




        
	return (
		<div { ...useBlockProps() }>
				<InspectorControls key="setting">
				<PanelBody title={__('Recipe Taxonomy', 'lw-recipes')}>
					<TextControl label={__('Title', 'lw-recipes')} help={ __('Section Title; will default to Browse {selected taxonomy} if left blank', 'lw-recipes')} value={title} onChange={ title => setAttributes({title})} />
					<SelectControl label={__('Taxonomy', 'lw-recipes')} options={options} value={taxonomy} help={__('If no taxonomy is selected, it will default to diet.', 'lw-recipes')} onChange={ taxonomy => setAttributes({taxonomy})} />
				</PanelBody>
			</InspectorControls>
			<div className="cards">
				<h2>{ title ? title : __(`Browse by ${taxonomy}`, 'lw-recipes') }</h2>
				{ terms && terms.map((term) => (
					<div>
						<h3>
						   { term?.acf?.featured_image ? <img src={term.acf.featured_image.url} /> : null }
						    <div className="bg">
								<span className="title">
									{term.name}
								</span>
							</div>
						</h3>
					</div>
				))}
				</div>
		</div>
	);
}
