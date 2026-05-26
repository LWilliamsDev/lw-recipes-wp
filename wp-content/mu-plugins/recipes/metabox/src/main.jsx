import { useSelect, useDispatch } from '@wordpress/data';
import { SelectControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { registerPlugin } from '@wordpress/plugins';

const SingleSelectTaxonomyControl = ({ taxonomySlug }) => {
  const terms = useSelect((select) =>
    select('core').getEntityRecords('taxonomy', taxonomySlug)
  );

  const selectedTerms = useSelect((select) =>
    select('core/editor').getEditedPostAttribute(taxonomySlug) || []
  );

  const { editPost } = useDispatch('core/editor');

  const selected = selectedTerms[0] ?? 0;

  const onChange = (termId) => {
     const id = parseInt(termId);
    editPost({ [taxonomySlug]: termId > 0 ? [id] : [] });
  };

  return (
    <SelectControl
      label={`Select ${taxonomySlug}`}
      value={selected}
      options={[
        { label: '— Select —', value: 0 },
        ...(terms || []).map((term) => ({
          label: term.name,
          value: term.id,
        })),
      ]}
      onChange={onChange}
    />
  );
};

const CourseSingleSelectPanel = () => {

  const postType = useSelect((select) =>
    select('core/editor').getCurrentPostType()
  );

  if (postType !== 'recipe') {
    return null;
  }

  return (
    <PluginDocumentSettingPanel
      name="single-select-taxonomies"
      title="Course"
      className="single-select-taxonomies"
    >
      <SingleSelectTaxonomyControl taxonomySlug="course" />
    </PluginDocumentSettingPanel>
  );
};

const DietSingleSelectPanel = () => {

  const postType = useSelect((select) =>
    select('core/editor').getCurrentPostType()
  );

  if (postType !== 'recipe') {
    return null;
  }

  return (
    <PluginDocumentSettingPanel
      name="single-select-taxonomies"
      title="Diet"
      className="single-select-taxonomies"
    >
      <SingleSelectTaxonomyControl taxonomySlug="diet" />
    </PluginDocumentSettingPanel>
  );
};

wp.data.dispatch( 'core/editor' ).removeEditorPanel( 'taxonomy-panel-course' );
wp.data.dispatch( 'core/editor' ).removeEditorPanel( 'taxonomy-panel-diet' );

registerPlugin('course-single-select', {
  render: CourseSingleSelectPanel,
  icon: null,
});

registerPlugin('diet-single-select', {
  render: DietSingleSelectPanel,
  icon: null,
});