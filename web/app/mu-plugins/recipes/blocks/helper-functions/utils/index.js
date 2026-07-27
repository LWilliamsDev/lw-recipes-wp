import { useEffect } from 'react';
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
    

    useEffect(() => {
    if (!lockId) {
        return;
    }

    if (shouldLock) {
        lockPostSaving(lockId);
    } else {
        unlockPostSaving(lockId);
    }

    return () => {
        unlockPostSaving(lockId);
    };
}, [shouldLock, lockId, lockPostSaving, unlockPostSaving]);
}
