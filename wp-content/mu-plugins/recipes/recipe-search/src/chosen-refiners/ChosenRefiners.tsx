/**
 * Chosen Refiners component
 */

import { TaxonomyItems } from '../Recipes';


interface ChosenRefinersProps {
  currentRefiners: URLSearchParams;
  updateRefiners: (name: string, value: string | null, resetPage?: boolean) => void;
  taxonomyMap: {[key: string]: TaxonomyItems};

}

const ChosenRefiners: React.FC<ChosenRefinersProps> = ({currentRefiners, updateRefiners, taxonomyMap}) => {

  //Convert currentRefiners to an object like courses: ['5', '7'] for easier manipulation
  //Exclude the page parameter because page numbers should not be in the chosen refiners component

  const paramsObject: { [key: string]: string[] }  = Object.fromEntries(
      Array.from(currentRefiners.entries())
      .filter(([key]) => key !== 'pg')
      .map(([key, value]) => [key, value.split('+')])
        );


  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLButtonElement;
    const refiner = button.getAttribute("data-refiner");
    const id = button.getAttribute("data-id");

    if (!refiner) return; // exit early if refiner is null

    if (refiner == 'search') {
      updateRefiners(refiner, null);
      return; 
    }
    else {
      if (!id) return; // exit early if id is null

      // Get current values for this refiner (e.g. ["1", "2", "3"])
      const currentValues = paramsObject[refiner] ?? [];

      // Filter out the ID the user clicked (removing the tag)
      const updatedValues = currentValues.filter((v) => v !== id);

      // If no values left, remove the query param; else, join and update
      const newValue = updatedValues.length > 0 ? updatedValues.join('+') : null;

      updateRefiners(refiner, newValue);
    }
  };

  return (
  <ul className="pt-5 flex flex-wrap gap-x-5">
    {Object.entries(paramsObject).map(([key, values]) => (
      values.map((value, index) => {        
        const taxonomyData = taxonomyMap[key] || [];
        const taxonomyTerm = taxonomyData.find(term => term.id.toString() === value);

        return (
          <li key={`${key}-${index}`}>
            <button data-refiner={key} data-id={value} onClick={handleChange} className="chosen-refiner cursor-pointer rounded-sm border-1 text-(--color-brown) p-[5px]">
              {taxonomyTerm ? taxonomyTerm.name : value}
            </button>
          </li>
        );
      })
    ))}
  </ul>
);

}
export default ChosenRefiners;
