/**
 * Pagination
 *
 */

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Results } from '../../Recipes';
import { useRef, useEffect } from 'react';

interface PaginationProps {
  updatePage: (name: string, value: string | null, resetPage?: boolean) => void;
  isPending: boolean;
  error: any;
  data: Results;
  currentPage: string | null;
}

const Pagination: React.FC<PaginationProps> = ({updatePage, data, currentPage}) => {

  const shouldScrollToResults = useRef(false); //used to scroll to top of results when user clicks on pagination button

  const pagesToShow = 6;
  let currentPageInt: number;
  let totalPages: number;

  const handlePageChange = (event: React.MouseEvent<HTMLUListElement>) => {
    const button = event.target as HTMLElement;
    const page = button.getAttribute("data-page");

    /*The parameter cannot be page because page is a reserved term in WordPress. */

    if (page == 'back') {
      const prevPage = currentPageInt - 1;
      updatePage("pg", prevPage, false);
    }
    else if (page == 'next') {
      const nextPage = currentPageInt + 1;
      updatePage("pg", nextPage, false);
    }
    else {
      if (!page) return;
      updatePage("pg", page, false);
    }

    shouldScrollToResults.current = true; 

  };

  useEffect(() => {
    if (data && shouldScrollToResults.current) {
      const resultsContainer = document.querySelector(".results-container");
      if (resultsContainer) {
        resultsContainer.scrollIntoView({ behavior: "smooth" });
      }
      shouldScrollToResults.current = false; // Reset after scrolling
    }
  }, [data]);





    if (currentPage) {
      currentPageInt = parseInt(currentPage);
    }
    else {
      currentPageInt = 1;
    }

    totalPages = data.total_pages;
 

    const numbers = getPageNumbers(currentPageInt, totalPages, pagesToShow);



	return (
    <nav className="pagination" aria-label="Pagination">
		<ul className="pagination-numbers flex gap-2" onClick={handlePageChange}>
		  <li>{ currentPageInt > 1 ? <button data-page="back" className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">Back</button> : <button className="rounded-sm border-1 p-[5px] text-(--color-mid-green)" disabled>Back</button> }</li>
      <li>{currentPageInt > 1 ? <button data-page="1" className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">1</button> : <button className={currentPageInt === 1 ? 'rounded-sm border-1 p-[5px] current-page' : 'rounded-sm border-1 p-[5px] text-(--color-brown)'} disabled>1</button>}</li>
      { numbers[0] > 6 ? <li className="rounded-sm border-1 p-[5px] text-(--color-mid-green)"><span> ... </span></li> : null }
      { numbers.map((number) => <li><button data-page={number} className={number == currentPageInt ? 'current-page cursor-pointer rounded-sm border-1 p-[5px]' : 'cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)'}>{number}</button></li>)}
      { numbers.length > 0 && numbers.at(-1)! < totalPages - 6 ? (<li className="rounded-sm border-1 p-[5px] text-(--color-mid-green)"><span> ... </span></li>) : null }
      { totalPages > 1 ?
      <li>{ currentPageInt == totalPages ? <button disabled className="current-page rounded-sm border-1 p-[5px]">{totalPages}</button> : <button data-page={totalPages} className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">{totalPages}</button>}</li> 
      : null }
      <li>{ currentPageInt < totalPages ? <button data-page="next" className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">Next</button> : <button disabled className="rounded-sm border-1 p-[5px] text-(--color-mid-green)">Next</button> }</li>

		</ul>
    </nav>
		)

}

function getPageNumbers(currentPage: number, totalPages: number, pagesToShow: number) {

  let startPage, endPage;

  // Determine the first page of the current range
  startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  endPage = Math.min(startPage + pagesToShow - 1, totalPages);



  // Create an array to hold the page numbers
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    if (i > 1 && i < totalPages) {
    pages.push(i);
  }
  }

  return pages;

}

export default Pagination;
