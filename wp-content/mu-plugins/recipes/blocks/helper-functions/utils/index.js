import { useEffect, useRef } from 'react';
import { useDispatch } from '@wordpress/data';

/**
 * Custom hook to lock or unlock saving for the current post.
 *
 * @param {boolean} shouldLock - Whether the post should be locked from saving.
 * @param {string}  lockId     - A unique string identifier for this specific lock condition.
 */
export function usePostLock( shouldLock, lockId ) {
    // 1. Grab the lock/unlock actions directly without using selectors that trigger re-renders
    const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );
    
    // 2. Track the lock state with a ref to prevent race conditions during fast toggles
    const isLockedRef = useRef( false );

    useEffect( () => {
        // Guard clause: ensure we have a valid unique lock identifier string
        if ( ! lockId ) {
            return;
        }

        if ( shouldLock && ! isLockedRef.current ) {
            // Lock the post and flip our local tracking flag
            lockPostSaving( lockId );
            isLockedRef.current = true;
        } else if ( ! shouldLock && isLockedRef.current ) {
            // Unlock the post and reset our local tracking flag
            unlockPostSaving( lockId );
            isLockedRef.current = false;
        }

        // 3. Cleanup: If the block unmounts while locked, release the lock automatically
        return () => {
            if ( isLockedRef.current ) {
                unlockPostSaving( lockId );
            }
        };
    }, [ shouldLock, lockId, lockPostSaving, unlockPostSaving ] );
}
