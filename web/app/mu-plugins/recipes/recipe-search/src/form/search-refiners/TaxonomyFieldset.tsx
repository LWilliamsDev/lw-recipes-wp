/**
 * Taxonomy Fieldset
 *
 * Component for taxonomy term checkbox filters.
 * Allows multiple values for a single taxonomy.
 */

import {decode} from 'html-entities';

import type { RefinerKeys, TaxonomyItems } from '../../types';

interface TaxonomyFieldSetProps {
  name: string;
  slug: string;
  data?: TaxonomyItems;
  onChange: (name: RefinerKeys, value: string | number[] | number | null, resetPage?: boolean) => void;
  paramValue: number[] | null;
  
}

export default function TaxonomyFieldset({name, slug, data, onChange, paramValue}: TaxonomyFieldSetProps) {

  // Handling checkbox changes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
  
    // 1. Get the ID (nuqs is configured for integers)
    const id = parseInt(event.target.value, 10);
  
    // 2. Get the slug (e.g., 'diet', 'course') to know which state key to update
    const slug = event.target.getAttribute('data-slug') as RefinerKeys;

    if (!slug) {
      console.warn("Missing data-slug attribute");
      return;
    }

    // 3. Get the current array from refiners (or empty array if null)
    const currentValues = paramValue ?? [];

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



	return (
		<div className="refiner-fieldset mb-4">
      <fieldset>
			  <legend className="sr-only">
          Filter by { name }
        </legend>
        <details className="tax-refiner">
          <summary className="cursor-pointer text-(--color-mid-green) font-medium p-2 border-1 w-full rounded-t-sm md:border-0 md:rounded-t-none md:w-auto md:p-0">
            { name }
          </summary>
              { data?.map((tax) => <div className="refiner-checkbox" key={tax?.id}><input id={tax?.id?.toString()} data-slug={slug} value={tax?.id} type="checkbox" checked={!!paramValue?.includes(tax.id)} onChange={handleCheckboxChange} />
          <label htmlFor={tax?.id?.toString()} className="pl-2 text-(--color-dark-green)">{decode(tax?.name)}</label></div>) }
        </details>
		
      </fieldset>
	  </div>
	)
}