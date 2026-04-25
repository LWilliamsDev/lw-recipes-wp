/**
 * Taxonomy Fieldset
 *
 * Component for taxonomy term checkbox filters.
 * Allows multiple values for a single taxonomy.
 */

import { useState } from 'react';
import {decode} from 'html-entities';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { TaxonomyItems } from '../../Recipes';

interface TaxonomyFieldSetProps {
  name: string;
  slug: string;
  isLoading: boolean;
  data?: TaxonomyItems;
  onChange: (name: string, value: string | null, resetPage?: boolean) => void;
  paramValue: string | null;
  error: any;
  
}

const TaxonomyFieldset: React.FC<TaxonomyFieldSetProps> = ({name, slug, isLoading, data, onChange, paramValue, error}) => {

const [accordionIsActive, setAccordionIsActive] = useState<boolean>(false);

// Handling checkbox changes
const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value, checked } = event.target;
  const slug = event.target.getAttribute('data-slug');

  // Parse the current paramValue ("1+2+3") into an array
  const currentValues = paramValue ? paramValue.split('+') : [];

  let updatedValues: string[];

  if (checked) {
    // Add the value if not already present
    updatedValues = Array.from(new Set([...currentValues, value]));
  } else {
    // Remove the value
    updatedValues = currentValues.filter((v) => v !== value);
  }

   // Join back into + separated string or null if empty
  const newParamValue = updatedValues.length > 0 ? updatedValues.join('+') : null;

  if (slug) {  // slug is string, not null
    onChange(slug, newParamValue); // propagate the change to parent component
  } else {
    console.warn("Missing slug attribute");
  }

};


  if (isLoading) return (
    <div className="refiner-fieldset mb-4">
      <fieldset>
      <legend>{ name }</legend>
        <Skeleton />
      </fieldset>
    </div>
  )

  if (error) {

    console.warn(error); 

    return (
      <p>Sorry, something went wrong while loading filters. Please try again.</p>
    )
  }

  if (data) { 



	return (
		<div className="refiner-fieldset mb-4">
      <fieldset>
			<legend className="w-full md:w-auto"><button className="cursor-pointer text-(--color-mid-green) font-medium p-2 border-1 w-full rounded-t-sm md:border-0 md:rounded-t-none md:w-auto md:p-0" aria-label={`Toggle ${name} refiner`} id={`${slug}--btn`} aria-controls={`${slug}--container`} onClick={() => setAccordionIsActive(!accordionIsActive)}><span className="tax-name">{ name }</span> <span>{accordionIsActive ? '-' : '+'}</span></button>
      </legend>
      {accordionIsActive &&
      <div className="checkboxes rounded-b-sm border-x border-b p-2 md:rounded-b-none md:border-none md:p-0" id={`${slug}--container`}>

				{ data.map((tax) => <div className="refiner-checkbox" key={tax.id}><input id={tax.id.toString()} data-slug={slug} value={tax.id} type="checkbox" checked={!!paramValue?.includes(tax.id.toString())} onChange={handleCheckboxChange} />
          <label htmlFor={tax.id.toString()} className="pl-2 text-(--color-dark-green)">{decode(tax.name)}</label></div>) }
        </div> }

      </fieldset>
	</div>
		)
}

}


export default TaxonomyFieldset;
