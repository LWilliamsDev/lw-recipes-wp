/**
 * Taxonomy Fieldset
 *
 * Component for taxonomy term checkbox filters.
 * Allows multiple values for a single taxonomy.
 */

import { useState } from 'react';
import {decode} from 'html-entities';
import { buildArray } from "../../utils"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import type { RefinerKeys, TaxonomyItems } from '../../Recipes';

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
  const { checked } = event.target;
  
  // 1. Get the ID (nuqs is configured for integers)
  const id = parseInt(event.target.value, 10);
  
  // 2. Get the slug (e.g., 'diet', 'course') to know which state key to update
  const slug = event.target.getAttribute('data-slug') as keyof typeof refiners;

  if (!slug) {
    console.warn("Missing data-slug attribute");
    return;
  }

  // 3. Get the current array from refiners (or empty array if null)
  const currentValues = (paramValue as number[]) ?? [];

  let updatedValues: number[];

  if (checked) {
    // Add the value
    updatedValues = [...currentValues, id];
  } else {
    // Remove the value
    updatedValues = currentValues.filter((v) => v !== id);
  }

  // 4. Update the state
  // Pass null if the array is empty to clear the URL param
  onChange(slug, updatedValues.length > 0 ? updatedValues : null);

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

				{ data.map((tax) => <div className="refiner-checkbox" key={tax.id}><input id={tax.id.toString()} data-slug={slug} value={tax.id} type="checkbox" checked={!!paramValue?.includes(tax.id)} onChange={handleCheckboxChange} />
          <label htmlFor={tax.id.toString()} className="pl-2 text-(--color-dark-green)">{decode(tax.name)}</label></div>) }
        </div> }

      </fieldset>
	</div>
		)
}

}


export default TaxonomyFieldset;
