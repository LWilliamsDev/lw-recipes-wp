import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TaxonomyFieldsetSkeleton() {
  return (
    <div className="refiner-fieldset mb-4">
      <fieldset>
      <legend><Skeleton /></legend>
        <Skeleton />
      </fieldset>
    </div>
  )
}