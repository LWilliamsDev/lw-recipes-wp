/**
 * Main Recipes Component
 *
 */


import {useState, useEffect} from 'react';
import { useSearchParams, useLocation } from 'react-router';
//import { useNavigationType } from 'react-router';
import ChosenRefiners from "./chosen-refiners/ChosenRefiners";
import { useQuery } from '@tanstack/react-query';
import Pagination from "./form/search-refiners/Pagination";
import SearchInput from './form/search-refiners/SearchInput';
import TaxonomyFieldset from './form/search-refiners/TaxonomyFieldset';
import ResultsItems from './results/ResultsItems';


/* Check if user is logged in, in order to show a component that allows the user to
   copy the current URL parameters in order to share it */
export const getLoginStatus = () => {
  return document.querySelector('body')?.classList.contains('logged-in') || false;
}

/* Reusable function to fetch taxonomy data. We assume that the data does not
   change frequently, therefore we give a high cache time of 30 mins. */
export const fetchTaxonomyData = (queryKey: string, url: string) => {
  const { isLoading, error, data } = useQuery<TaxonomyItems>({
    queryKey: [queryKey],
    queryFn: () => fetch(url).then((res) => res.json()),
    staleTime: 1000 * 60 * 30, // Cache data for 30 minutes
    gcTime: 1000 * 60 * 30, // Cache time before data is garbage collected
    refetchOnWindowFocus: false, // Don't refetch when window is focused
  });

  return { isLoading, error, data };

};

/* TypeScript declarations */

export interface Term {
  term_id: number;
  term_name: string;
  taxonomy: string;
}

export interface ImageSizeDetail {
  file: string;
  width: number;
  height: number;
  "mime-type": string;
  filesize: number;
  url: string;
}

export interface Recipe {
  id: number,
  title: {
    rendered: string;
  };
  link: string;
  image?: {
    width: number;
    height: number;
    file: string;
    sizes?: {                         // optional sizes property
      [sizeName: string]: ImageSizeDetail;  // any keys with size details
    };
    alt: string;
  },
  description: string;
  course: Term[];
  diet: Term[];
  allergen: Term[];
}

export interface Results {
  result: {
    data: Recipe[];
  },
  total_pages: number;
}

export interface TaxonomyTargetHints {
  allow: string[];
}

export interface TaxonomyLink {
  href: string;
  targetHints?: TaxonomyTargetHints;
}

export interface TaxonomyLinks {
  self: TaxonomyLink[];
  collection: TaxonomyLink[];
  about: TaxonomyLink[];
  'wp:post_type': TaxonomyLink[];
  curies: { name: string; href: string; templated: boolean }[];
}

export interface TaxonomyItem {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: TaxonomyLinks;
}

export type TaxonomyItems = TaxonomyItem[];

/* Main Recipes component */

const Recipes: React.FC = () => {

  //**-- Global State and Function Setup --*//

  const [searchParams, setSearchParams] = useSearchParams({}); //Set Main Search Parameters state

  //Reusable function to update the search parameters
  const updateRefiners = (name: string, value: string | null, resetPage: boolean = true) => {
   const newParams = searchParams;
   
  if (resetPage) {
    newParams.delete("pg");
  }


  if (value) {
    newParams.set(name, value);
  }
  else {
    newParams.delete(name);
  }

  setSearchParams(newParams);
};

  

  //**-- Text Input Setup --**//

  /* Local state to sync HTML text input with the search URL parameter. Without this, the user is not able to type 
     in the search box because the text keeps getting replaced with the search attribute in searchParams.
  */
  const [searchInputValue, setSearchInputValue] = useState<string>(searchParams.get('search') || '');

  // Sync local state of search box with browser back/forth navigation
  const location = useLocation();
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery !== searchInputValue) {
      setSearchInputValue(searchQuery || '');
    }
  }, [location, searchParams]);

  /* Since the searchParams state is tied to the button, a "local" state is needed to sync the value of 
      the search input to the searchParams state.

      Without this local state, we run into problems like a) user not able to type into search box and b) search 
      input value not updating when using browser navigation
  */

  const searchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value); // Allow user to type freely
  };
  const btnSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      updateRefiners('search', searchInputValue);
  };


  //**-- Fetch URL setup --**//
  //Todo: Replace with WP apiFetch package

  // Build the query string for fetch requests
   const hostname: string = window.location.hostname;
  const endpoint: string = '/wp-json/lw-recipes/v1/recipes';
  const queryPath: string = `https://${hostname}${endpoint}`;

  //**-- Run Queries --**// 
  
  // Get all taxonomy term data to pass into the refiners
  const { isLoading: isCourseOptionsLoading, data: courseOptionsData, error: courseOptionsError } = fetchTaxonomyData('courseOptions', `https://${hostname}/wp-json/wp/v2/course?per_page=100`);
  const { isLoading: isDietOptionsLoading, data: dietOptionsData, error: dietOptionsError } = fetchTaxonomyData('dietOptions', `https://${hostname}/wp-json/wp/v2/diet?per_page=100`);
  const { isLoading: isAllergenOptionsLoading, data: allergenOptionsData, error: allergenOptionsError } = fetchTaxonomyData('allergenOptions', `https://${hostname}/wp-json/wp/v2/allergen?per_page=100`);

  // Create a lookup map for taxonomy options for each category
   const taxonomyMap: { [key: string]: TaxonomyItems } | null = (courseOptionsData && dietOptionsData && allergenOptionsData)
  ? {
      course: courseOptionsData,
      diet: dietOptionsData,
      allergen: allergenOptionsData,
    }
  : null;

  // Fetch results data
  const queryString: string = searchParams.toString() ? `?${searchParams.toString()}` : '';


  // Get results
  const { isPending: isResultsPending, error: resultsError, data: resultsData } = useQuery({
    queryKey: ['results', searchParams, queryString],
    queryFn: () =>
      fetch(queryPath+queryString).then((res) =>
        res.json(),
      ),
  });



  //**-- Setup for component that allows logged in users to copy current URL parameters --**// 
  
  const [copied, setCopied] = useState(false); //Local state to temporarily change button text to "Copied!"

  //Determine if user is logged in
  const isLoggedIn: boolean = getLoginStatus();

  //function that copies the current URL in a text input
  const copyUrl = () => {
    const input = document.querySelector<HTMLInputElement>("#refiner-url-params");

    if (input) {
      input.select();
      navigator.clipboard.writeText(input.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Change button text back to "Copy URL"
    }
    else {
      console.warn("input#refiner-url-params not found");
    }
  }




  //UNCOMMENT FOR DEBUGGING

  //Debug History - uncomment import statement for useNavigationType
  /*const navigationType = useNavigationType();

  useEffect(() => {
    console.log(`[History Logger] Navigation Type: ${navigationType}`);
    console.log(`[History Logger] Current Location: ${location.pathname}${location.search}`);
  }, [location, navigationType]);

  //Debug searchParams state
   useEffect(() => {
      console.log("Refiners updated:", searchParams);
    }, [searchParams]);*/


return (
  <div className="recipes-search mx-auto px-4 md:px-12">
    <div className="form mt-8 mb-8 md:mt-12 md:mb-12">
      { (isLoggedIn && searchParams.size > 0) ? (
        <>
          <input type="text" id="refiner-url-params" className="rounded-sm border border-(--color-mid-green) border-solid p-2 mb-8" value={searchParams.size > 0 ? window.location.href : ""} 
          disabled /> 
          <button onClick={copyUrl} className="button p-[10px] inline-block rounded-sm text-(--color-white) font-medium cursor-pointer ml-2" disabled={copied}>{copied ? "Copied!" : "Copy URL"}</button>
        </>
        )
        : 
        null
      }
      <form role="search" className="grid grid-cols-[1fr_40px] gap-x-2">
        <SearchInput id="search" label="Search" machineName="search" placeholder="Search Recipes..." searchInputValue={searchInputValue} onChange={searchInputChange} btnChange={btnSearch} buttonText="Go" />
      </form>
        {
        (taxonomyMap && 
        [...searchParams.entries()].length > 0) ? 
     <ChosenRefiners currentRefiners={searchParams} updateRefiners={updateRefiners} taxonomyMap={taxonomyMap} /> : null }
    </div>
    <div className="results-container md:grid md:grid-cols-[0.5fr_2fr] md:gap-4">
      <div className="refiners mb-8 md:mb-0">
        <TaxonomyFieldset name="Courses" slug="course" isLoading={isCourseOptionsLoading} data={courseOptionsData} onChange={updateRefiners} paramValue={searchParams.get('course')} error={courseOptionsError} />
        <TaxonomyFieldset name="Diet" slug="diet" isLoading={isDietOptionsLoading} data={dietOptionsData} onChange={updateRefiners} paramValue={searchParams.get('diet')} error={dietOptionsError} />
        <TaxonomyFieldset name="Allergen" slug="allergen" isLoading={isAllergenOptionsLoading} data={allergenOptionsData} onChange={updateRefiners} paramValue={searchParams.get('allergen')} error={allergenOptionsError} />
      </div>
     <div className="results">
        <ResultsItems isPending={isResultsPending} error={resultsError} data={resultsData} updateRefiners={updateRefiners} />
      </div>
       <div className="pagination md:col-start-2 pb-5">
        <Pagination isPending={isResultsPending} error={resultsError} data={resultsData} updatePage={updateRefiners} currentPage={searchParams.get('pg')} />
      </div>
    </div>
  </div>
  )
}

export default Recipes;
