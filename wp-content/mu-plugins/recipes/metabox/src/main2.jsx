import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from 'react';
import { PluginPostStatusInfo, PluginSidebar } from '@wordpress/edit-post';
import usePostLock from './hooks/usePostLock'; // Your custom locking hook

const RecipeSidebarValidationGroup = () => {
    const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType() );

    if (postType !== 'recipe') {
        return null;
    }

    // 1. Monitor the assigned taxonomy states in real-time
    const { hasCourse, hasDiet } = useSelect( ( select ) => {
        const editor = select( 'core/editor' );
        const course = editor.getEditedPostAttribute( 'course' ) || [];
        const diet = editor.getEditedPostAttribute( 'diet' ) || [];
        return {
            hasCourse: course.length > 0 && course[0] !== 0,
            hasDiet: diet.length > 0 && diet[0] !== 0,
        };
    }, [] );

    const { createNotice, removeNotice } = useDispatch( 'core/notices' );

    const isInvalid = ! hasCourse || ! hasDiet;
    const noticeId = 'lw-recipes-taxonomy-validation-error';
    const isNoticeDisplayedRef = useRef( false );

    // 2. Lock saving capabilities via your performant hook
    usePostLock( isInvalid, 'lw-recipes-sidebar-lock' );

    // 3. Side-effect to manage the global sliding notice at the top of the screen
    useEffect( () => {
        if ( postType !== 'recipe' ) return;

        if ( isInvalid && ! isNoticeDisplayedRef.current ) {
            createNotice( 'error', __( 'Recipe requires both a Course and a Diet selection before saving.', 'lw-recipes' ), {
                id: noticeId,
                isDismissible: false, // Prevents them from closing it manually until fixed
            } );
            isNoticeDisplayedRef.current = true;
        } else if ( ! isInvalid && isNoticeDisplayedRef.current ) {
            removeNotice( noticeId );
            isNoticeDisplayedRef.current = false;
        }

        // Cleanup notice if plugin unmounts
        return () => {
            removeNotice( noticeId );
        };
    }, [ isInvalid, postType, createNotice, removeNotice ] );


    return (
        <PluginPostStatusInfo>
            <div className="recipe-required-selects-wrapper" style={ { padding: '16px 0', borderTop: '1px solid #e0e0e0' } }>
                <div style={ { marginBottom: '12px' } }>
                    <SingleSelectTaxonomyControl taxonomySlug="course" />
                    { ! hasCourse && (
                        <p style={ { color: '#cc1818', fontSize: '11px', margin: '4px 0 0 0' } }>
                            { __( '⚠️ Course is required.', 'lw-recipes' ) }
                        </p>
                    ) }
                </div>
                <div>
                    <SingleSelectTaxonomyControl taxonomySlug="diet" />
                    { ! hasDiet && (
                        <p style={ { color: '#cc1818', fontSize: '11px', margin: '4px 0 0 0' } }>
                            { __( '⚠️ Diet is required.', 'lw-recipes' ) }
                        </p>
                    ) }
                </div>
            </div>
        </PluginPostStatusInfo>
    );
};

registerPlugin('recipe-custom-sidebar', {
  render: RecipeSidebarValidationGroup,
});