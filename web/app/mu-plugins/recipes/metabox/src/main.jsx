import { __, sprintf } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { ComboboxControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { registerPlugin } from '@wordpress/plugins';
import { usePostLock } from '../../blocks/helper-functions/utils';

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
    editPost({ [taxonomySlug]: id > 0 ? [id] : [] });
  };

  return (
    <ComboboxControl
      label={`Select ${taxonomySlug}`}
      value={selected}
      options={[
        ...(terms || []).map((term) => ({
          label: term.name,
          value: term.id,
        })),
      ]}
      onChange={onChange}
    />
  );
};

wp.domReady(() => {
    wp.data.dispatch('core/editor').removeEditorPanel(
        'taxonomy-panel-course'
    );

    wp.data.dispatch('core/editor').removeEditorPanel(
        'taxonomy-panel-diet'
    );
});

const RecipeDetailsPanel = () => {
    const { hasCourse, hasDiet } = useSelect((select) => {
        const editor = select('core/editor');

        const course = editor.getEditedPostAttribute('course') || [];
        const diet = editor.getEditedPostAttribute('diet') || [];

        return {
            hasCourse: course.length > 0,
            hasDiet: diet.length > 0,
        };
    });

    //Validation

    const missing = [];

    if (!hasCourse) {
      missing.push(__('Course', 'lw-recipes'));
    }

    if (!hasDiet) {
      missing.push(__('Diet', 'lw-recipes'));
    }

    const message = sprintf(
      __('Recipe Details are incomplete. Please select: %s.', 'lw-recipes'),
      missing.join(', ')
    );

    const { createNotice, removeNotice } = useDispatch( 'core/notices' );

    const isInvalid = ! hasCourse || ! hasDiet;
    const noticeId = 'lw-recipes-taxonomy-validation-error';
    const isNoticeDisplayedRef = useRef( false );

    // 2. Lock saving capabilities via your performant hook
    usePostLock( isInvalid, 'lw-recipes-sidebar-lock' );

    // 3. Side-effect to manage the global sliding notice at the top of the screen
    useEffect( () => {
        if ( isInvalid && ! isNoticeDisplayedRef.current ) {
            createNotice('error', message, {
              id: noticeId,
              isDismissible: false,
              actions: [
              {
                label: __('Open Recipe Details', 'lw-recipes'),
                onClick: () => {
                  wp.data.dispatch('core/edit-post').openGeneralSidebar(
                    'edit-post/document'
                  );
                  wp.data.dispatch('core/editor').toggleEditorPanelOpened(
                    'recipe-custom-sidebar/recipe-details'
                  );
              },
        },
    ],
            });
            isNoticeDisplayedRef.current = true;
        } else if ( ! isInvalid && isNoticeDisplayedRef.current ) {
            removeNotice( noticeId );
            isNoticeDisplayedRef.current = false;
        }

        // Cleanup notice if plugin unmounts
        return () => {
            removeNotice( noticeId );
        };
    }, [ isInvalid, createNotice, removeNotice ] );

    return (
        <PluginDocumentSettingPanel
            name="recipe-details"
            title={__('Recipe Details', 'lw-recipes')}
            className="recipe-details-panel"
        >
            <div>
              <p style={{ fontSize: '13px' }}>Select the required classifications for this recipe.</p>
                <SingleSelectTaxonomyControl taxonomySlug="course" />
            </div>

            <div>
                <SingleSelectTaxonomyControl taxonomySlug="diet" />
            </div>
        </PluginDocumentSettingPanel>
    );
};


registerPlugin('recipe-custom-sidebar', {
    render: () => <RecipeDetailsPanel />,
});