/**
 * Results Items
 * The display of all results in the results component
 *
 */

import { Results, Recipe, Term } from '../Recipes';
import ResultItemSkeleton from './ResultItemSkeleton';
import { buildArray } from '../utils';

interface ResultsItemsProps {
    data: Results;
    updateRefiners: (name: string, value: string | null, resetPage?: boolean) => void;
    /*resetRefiners: () => void;*/
    isPending: boolean;
    error: any;
}

const ResultsItems: React.FC<ResultsItemsProps> = ({data, isPending, error, updateRefiners, currentFilters}) => {
  
    //Each result row displays the item's taxonomy terms.
    //This list is clickable, and clicking refines the results by the taxonomy term the user clicked on.
    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget as HTMLButtonElement;
    const type = button.getAttribute("data-type");
    const idAttr = button.getAttribute("data-id");

    if (!type || !idAttr) return;

    const id = parseInt(idAttr, 10);
    const currentValues = currentFilters?.[type] || [];
    const newValues = buildArray(currentValues, type, id);

    updateRefiners(type, newValues);
  };

    

    if (isPending)
    // show skeleton layout if we are waiting for results
    return (
      <>
        <ResultItemSkeleton />
        <ResultItemSkeleton />
        <ResultItemSkeleton />
        <ResultItemSkeleton />
        <ResultItemSkeleton />
        <ResultItemSkeleton />
        <ResultItemSkeleton />
        <ResultItemSkeleton />
        <ResultItemSkeleton />
        <ResultItemSkeleton />
      </>
    )

  if (error) {
    
    console.warn(error);

    return (
        <p>Sorry, something went wrong while loading results. Please try again.</p>
     )
    }

  if (data) {
    const results: Recipe[] = data.result.data;
    

   return (
        <>
        {results ? 
            results.map((result) => { 
                return (<div className='result-item mb-12 lg:mb-20 lg:flex lg:flex-wrap' key={result.id}>
                    { result?.image?.sizes?.medium ? ( 
                            <div className="lg:order-2 result-image lg:ml-auto mb-5 lg:mb-0"><img src={result.image.sizes.medium.url} alt={result.image.alt} /></div>
                        ) : null}
                    <div className="lg:order-1 result-details">
                        <h2 className="text-2xl color-green text-(--color-green) mb-2"><a href={result.link}>{result.title.rendered}</a></h2>
                        { result.description ? <p className="mb-4 text-(--color-dark-green)">{result.description}</p> : null }

                        {(result.allergen || result.diet || result.course) ? ( 
                            <ul className="flex gap-2 flex-wrap">
                                {alphabetizeTerms([...(result.allergen || []),...(result.diet || []),...(result.course || []),]).map((item) => ( <li key={item.term_id}><button data-id={item.term_id} data-type={item.taxonomy} onClick={handleChange} className="p-[5px] inline-block rounded-sm border-1 border-(--color-brown) text-(--color-brown) hover:text-(--color-white) hover:bg-(--color-brown) cursor-pointer">{item.term_name}</button></li> ))}
                            </ul>
                         ) : null
                        }
                    </div>
                </div>)
             } )

        : (<h3>No Results</h3> )}
       </>

   );

    }
}

function alphabetizeTerms(allTerms: Term[]) {
    return allTerms.sort((a, b) => a.term_name.localeCompare(b.term_name));
}
export default ResultsItems;
