/**
 * Main Recipes Component
 *
 */

import {useState, useEffect, useRef} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';

import Skeleton from 'react-loading-skeleton';

import { buildArray, hasVisibleFilters } from './utils';
import { RefinerKeys, refinersSchema, TaxonomyItems } from "./types";

import ChosenRefiners from "./chosen-refiners/ChosenRefiners";
import Pagination from "./form/search-refiners/Pagination";
import ResultItemSkeleton from './results/ResultItemSkeleton';
import ResultsItems from './results/ResultsItems';
import SearchInput from './form/search-refiners/SearchInput';
import TaxonomyFieldsetSkeleton from "./form/search-refiners/TaxonomyFieldsetSkeleton";
import TaxonomyFieldset from './form/search-refiners/TaxonomyFieldset';



/* Reusable function to fetch taxonomy data. We assume that the data does not
   change frequently, therefore we give a high cache time of 30 mins. */
export const fetchTaxonomyData = (queryKey: string, url: string) => {
  const { isLoading, error, data, refetch } = useQuery<TaxonomyItems>({
    queryKey: [queryKey],
    queryFn: () => fetch(url).then((res) => res.json()),
    staleTime: 1000 * 60 * 30, // Cache data for 30 minutes
    gcTime: 1000 * 60 * 30, // Cache time before data is garbage collected
    refetchOnWindowFocus: false, // Don't refetch when window is focused
  });

  return { isLoading, error, data, refetch };

};


/* Main Recipes component */

export default function Recipes() {

  //**-- Global State and Function Setup --*//

  const [refiners, setRefiners] = useQueryStates(refinersSchema,
  {
    history: 'push'
  });

  const listingContainer = useRef<HTMLDivElement | null>(null);
  const shouldScrollRef = useRef(false);


  //Reusable function to update the search parameters
  const updateRefiners = (
    name: RefinerKeys,
    value: string | number[] | number | null,
    resetPage: boolean = true
    ) => {
    
    shouldScrollRef.current = true;

    setRefiners({
      [name]: value,
      ...(resetPage ? { pg: null } : {})
    })

  };

  

  //**-- Text Input Setup --**//

  /* Local state to sync HTML text input with the search URL parameter. Without this, the user is not able to type 
     in the search box because the text keeps getting replaced with the search attribute in searchParams.
  */
  const [searchInputValue, setSearchInputValue] = useState<string>(refiners.search ?? '');

  // Sync local state of search box with browser back/forth navigation
  useEffect(() => {
    setSearchInputValue(refiners.search ?? '');
  }, [refiners.search]);

  /* Since the searchParams state is tied to the button, a "local" state is needed to sync the value of 
      the search input to the searchParams state.

      Without this local state, we run into problems like a) user not able to type into search box and b) search 
      input value not updating when using browser navigation
  */

  const searchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value); // Allow user to type freely
  };
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setRefiners({
        search: searchInputValue || null,
        pg: null
      })
  };



  //**-- Fetch URL setup --**//
  //Todo: Replace with WP apiFetch package

  // Build the query string for fetch requests
  const currentHostname: string = window.location.hostname;
  let hostname:string;

  if (currentHostname == 'localhost') { //if it is localhost (local dev environment), hardcode to the staging URL
    hostname = 'recipes.staging'
  }
  else {
    hostname = currentHostname;
  }

  const endpoint: string = '/wp-json/lw-recipes/v1/recipes';
  const queryPath: string = `https://${hostname}${endpoint}`;

  //**-- Run Queries --**// 
  
  // Get all taxonomy term data to pass into the refiners
  const { isLoading: isCourseOptionsLoading, data: courseOptionsData, error: courseOptionsError, refetch: refetchCourse } = fetchTaxonomyData('courseOptions', `https://${hostname}/wp-json/wp/v2/course?per_page=100`);
  const { isLoading: isDietOptionsLoading, data: dietOptionsData, error: dietOptionsError, refetch: refetchDiet } = fetchTaxonomyData('dietOptions', `https://${hostname}/wp-json/wp/v2/diet?per_page=100`);
  const { isLoading: isAllergenOptionsLoading, data: allergenOptionsData, error: allergenOptionsError, refetch: refetchAllergen } = fetchTaxonomyData('allergenOptions', `https://${hostname}/wp-json/wp/v2/allergen?per_page=100`);

  const isFormLoading = isCourseOptionsLoading || isDietOptionsLoading || isAllergenOptionsLoading;
  const formError = courseOptionsError || dietOptionsError || allergenOptionsError;

  const handleRetryFilters = async () => {
  // This fires them all off simultaneously
    await Promise.all([
      refetchCourse(),
      refetchDiet(),
      refetchAllergen()
    ]);
  };

  // Create a lookup map for taxonomy options for each category
  const taxonomyMap: Partial<Record<RefinerKeys, TaxonomyItems>> | null  = (courseOptionsData && dietOptionsData && allergenOptionsData)
    ? {
      course: courseOptionsData,
      diet: dietOptionsData,
      allergen: allergenOptionsData,
    }
  : null;


  // Get results
  const { isPending: isResultsPending, error: resultsError, data: resultsData, refetch } = useQuery({
    queryKey: ['results', refiners],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Loop through refiners to build the string
      Object.entries(refiners).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          // Handle arrays with '+' and everything else normally
          const formattedValue = Array.isArray(value) ? value.join('+') : value;
          params.append(key, String(formattedValue));
        }
      });

      // Use .decodeURIComponent to prevent '+' from becoming '%2B' 
      const queryString = params.toString().replaceAll('%2B', '+');
      const fullUrl = `${queryPath}${queryString ? `?${queryString}` : ''}`;

      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });

  const hasFilters: boolean = hasVisibleFilters(refiners);


  //Scroll to top of the component whenever results are loaded
  useEffect(() => {

    //Only scroll to the top if the user specifically interacted with a filter
    //This prevents scrolling to top on initial page load, which is awkward from a UX standpoint

    if (!shouldScrollRef.current) return; 
    shouldScrollRef.current = false;

    if (listingContainer.current) {
        listingContainer.current.scrollIntoView({ behavior: "smooth" });
     }
  }, [refiners]);

  /* Take over taxonomy term filtering links in the result items */

  const clickResultLinks = (event: React.MouseEvent<HTMLDivElement>) => {
  
        const link = (event.target as Element).closest('a.filter-link') as HTMLAnchorElement | null;

        if (link) {
             event.preventDefault();

             const type = link.getAttribute("data-type") as RefinerKeys;
             const idAttr = link.getAttribute("data-id");

             if (!type || !idAttr) return;

             const id = parseInt(idAttr, 10);
             const currentValues = (refiners[type] as number[]) || [];
             const newValues = buildArray(currentValues, type, id);

             updateRefiners(type, newValues ?? null);

        }
        
    };


  const handlePageChange = (event: React.MouseEvent<HTMLDivElement>) => {

    const link = (event.target as Element).closest('a.filter-link') as HTMLAnchorElement | null;

    if (link) {
      event.preventDefault();

      const page = link.getAttribute("data-page");
      const pageInt = parseInt(page);

       if (!isNaN(pageInt)) {
        updateRefiners("pg", pageInt, false);
      }
    }
  };



  //UNCOMMENT FOR DEBUGGING
  //Debug refiners state
  /*useEffect(() => {
      console.log("Refiners updated:", refiners);
    }, [refiners]);*/


  return (
    <div className="recipes-search mx-auto" ref={listingContainer}>
      <div className="form mt-8 mb-8 md:mt-12 md:mb-12">
        <form role="search" className="grid grid-cols-[1fr_40px] gap-x-2" onSubmit={handleSearchSubmit}>
          <SearchInput id="search" label="Search" machineName="search" placeholder="Search Recipes..." searchInputValue={searchInputValue} onChange={searchInputChange} buttonText="Go" disabled={isFormLoading} />
        </form>
          {
          (taxonomyMap && 
          hasFilters) ? 
            <ChosenRefiners currentRefiners={refiners} updateRefiners={updateRefiners} taxonomyMap={taxonomyMap} /> : null }
      </div>
      <div className="results-container md:grid md:grid-cols-[0.5fr_2fr] md:gap-4">
        <div className="refiners mb-8 md:mb-0">
          {isFormLoading ? ( 
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <TaxonomyFieldsetSkeleton key={i} />
              ))}
            </>
            ) : formError ? ( 
            <>
              <p className="mb-[8px]">Sorry, something went wrong while loading filters. Please try again.</p>
              <button onClick={() => handleRetryFilters()} className="button p-[10px] mb-[8px] inline-block rounded-sm text-(--color-white) font-medium cursor-pointer" type="button">Try again.</button>
              <p>Please <a href="mailto:support@example.com">contact us</a> if you continue having issues.</p>
            </>
            ) : (
            <>
              <TaxonomyFieldset name="Courses" slug="course" data={courseOptionsData} onChange={updateRefiners} paramValue={refiners.course} />
              <TaxonomyFieldset name="Diet" slug="diet" data={dietOptionsData} onChange={updateRefiners} paramValue={refiners.diet} />
              <TaxonomyFieldset name="Allergen" slug="allergen" data={allergenOptionsData} onChange={updateRefiners} paramValue={refiners.allergen} />
            </>
          )}
        </div>
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {formError || resultsError ? "There was an error loading the page content." : 
          isFormLoading ? "Loading filters..." :
          isResultsPending ? "Updating recipe results..." : 
          resultsData ? "Recipe list updated." : ""}
        </div>
        {isResultsPending ? (
          <>
            <div className="results">
              {Array.from({ length: 10 }).map((_, i) => (
                <ResultItemSkeleton key={i} />
              ))}
            </div>
            <div className="pagination md:col-start-2 pb-5">
              <ul className="pagination-numbers">
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
                <li><Skeleton /></li>
              </ul>
            </div>
          </>
          ) : resultsError ? ( 
          <div className="results">
            <p className="mb-[8px]">Sorry, something went wrong while loading results.</p>
            <button onClick={() => refetch()} className="button p-[10px] mb-[8px] inline-block rounded-sm text-(--color-white) font-medium cursor-pointer" type="button">Try again.</button>
            <p>Please <a href="mailto:support@example.com">contact us</a> if you continue having issues.</p>
          </div>
          ) : ( 
          <>
            <div className="results" dangerouslySetInnerHTML={{__html: resultsData.result}} onClick={clickResultLinks}>
            </div>
            <div className="pagination md:col-start-2 pb-5" dangerouslySetInnerHTML={{__html: resultsData.pagination}} onClick={handlePageChange}>
            </div>
          </>
          )}
        </div>
    </div>
  )
}
