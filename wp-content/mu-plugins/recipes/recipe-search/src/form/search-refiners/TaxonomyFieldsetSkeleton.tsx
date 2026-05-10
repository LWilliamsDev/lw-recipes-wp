import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TaxonomyFieldsetSkeleton: React.FC = () => {
  return (
    <div className="refiner-fieldset mb-4">
      <fieldset>
      <legend>{ name }</legend>
        <Skeleton />
      </fieldset>
    </div>
  )

}

export default TaxonomyFieldsetSkeleton;