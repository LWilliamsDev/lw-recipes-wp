/**
 * Chosen Refiners component
 */

import { buildArray } from '../utils';
import { RefinerKeys, RefinerValues, TaxonomyItems } from '../types';

interface ChosenRefinersProps {
  currentRefiners: RefinerValues;
  updateRefiners: (name: RefinerKeys, value: string | number[] | number | null, resetPage?: boolean) => void;
  taxonomyMap: Partial<Record<RefinerKeys, TaxonomyItems>> | null;

}

export default function ChosenRefiners({currentRefiners, updateRefiners, taxonomyMap }: ChosenRefinersProps){ 

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const refiner = button.getAttribute("data-refiner") as RefinerKeys;
    const idAttr = button.getAttribute("data-id");

    if (!refiner) return;

    // Handle Search specifically
    if (refiner === 'search') {
      updateRefiners('search', null);
      return;
    }

    // Handle Taxonomy IDs
    if (!idAttr) return;
    const id = parseInt(idAttr, 10);

    // Use our buildArray helper to remove the value (add = false)
    const currentValues = (currentRefiners[refiner] as number[]) || [];

    const updatedValues = buildArray(currentValues, refiner, id, false);

    // Update with the new array or null if empty
    updateRefiners(refiner, updatedValues?.length ? updatedValues : null);
  };

  return (
    <ul className="pt-5 flex flex-wrap gap-x-5">
      {Object.entries(currentRefiners).map(([key, val]) => {
        // Skip pagination and null values
        if (key === 'pg' || !val) return null;

        // If it's the search string
        if (key === 'search' && typeof val === 'string') {
          return (
            <li key="search-pill">
              <button data-refiner="search" onClick={handleChange} className="chosen-refiner cursor-pointer rounded-sm border-1 border-(--color-brown) text-(--color-brown) p-[5px]">
                {val}
              </button>
            </li>
          );
        }

        // If it's a taxonomy array
        if (Array.isArray(val)) {
          return val.map((id) => {
            if (!taxonomyMap) return null;
            
            const taxonomyData = taxonomyMap[key as RefinerKeys] || [];
            const term = taxonomyData.find(t => t.id === id);

            return (
              <li key={`${key}-${id}`}>
                <button 
                  data-refiner={key} 
                  data-id={id} 
                  onClick={handleChange} 
                  className="chosen-refiner cursor-pointer rounded-sm border-1 border-(--color-brown) text-(--color-brown) p-[5px]"
                >
                  {term ? term.name : id}
                </button>
              </li>
            );
          });
        }

        return null;
      })}
    </ul>
  );
};
