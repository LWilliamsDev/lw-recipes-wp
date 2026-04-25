/**
 * Result Item Skeleton
 *
 * This is the subcomponent that displays in the main Results component while we are still waiting on query results.
 */

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ResultItemSkeleton: React.FC = () => {

   return (
        <>
          <div className="result-item mb-12">
            <h2 className="text-2xl color-green text-(--color-mid-green) mb-2"><Skeleton /></h2>
            <p className="mb-4 text-(--color-dark-green)"><Skeleton /></p>
            <ul className="flex gap-2 flex-wrap">
              <li><Skeleton /></li>
              <li><Skeleton /></li>
              <li><Skeleton /></li>
            </ul>
          </div>
       </>
   );


}
export default ResultItemSkeleton;
