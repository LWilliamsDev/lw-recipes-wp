/**
 * Pagination
 *
 */

import { RefinerKeys, Results as ResultsType } from '../../types';

interface PaginationProps {
  updatePage: (name: RefinerKeys, value: string | number[] | number | null, resetPage?: boolean) => void;
  data: ResultsType;
  currentPage: number | null;
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

export default function Pagination ({updatePage, data, currentPage}: PaginationProps){

  const pagesToShow:number = 6;
  const totalPages: number = data?.total_pages ? data.total_pages : 1;
  const activePage = currentPage ?? 1;

  const handlePageChange = (event: React.MouseEvent<HTMLUListElement>) => {
    const button = event.target as HTMLElement;
    const page = button.getAttribute("data-page");

    /*The parameter cannot be page because page is a reserved term in WordPress. */



    if (page == 'back') {
      const prevPage = activePage - 1;
      updatePage("pg", prevPage, false);
    }
    else if (page == 'next') {
      const nextPage = activePage + 1;
      updatePage("pg", nextPage, false);
    }
    else {
      if (!page) return;
      const pageInt = parseInt(page);

      if (!isNaN(pageInt)) {
        updatePage("pg", pageInt, false);
      }
    }

  };
 

  const numbers = getPageNumbers(activePage, totalPages, pagesToShow);


	return (
    <nav className="pagination" aria-label="Pagination">
		<ul className="pagination-numbers flex gap-2" onClick={handlePageChange}>
		  <li>{ activePage > 1 ? <button data-page="back" className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">Back</button> : <button className="rounded-sm border-1 p-[5px] text-(--color-mid-green)" disabled>Back</button> }</li>
      <li>{activePage > 1 ? <button data-page="1" className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">1</button> : <button className={activePage === 1 ? 'rounded-sm border-1 p-[5px] current-page' : 'rounded-sm border-1 p-[5px] text-(--color-brown)'} disabled>1</button>}</li>
      { numbers[0] > 6 ? <li className="rounded-sm border-1 p-[5px] text-(--color-mid-green)"><span> ... </span></li> : null }
      { numbers.map((number) => <li><button data-page={number} className={number == activePage ? 'current-page cursor-pointer rounded-sm border-1 p-[5px]' : 'cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)'}>{number}</button></li>)}
      { numbers.length > 0 && numbers.at(-1)! < totalPages - 6 ? (<li className="rounded-sm border-1 p-[5px] text-(--color-mid-green)"><span> ... </span></li>) : null }
      { totalPages > 1 ?
      <li>{ activePage == totalPages ? <button disabled className="current-page rounded-sm border-1 p-[5px]">{totalPages}</button> : <button data-page={totalPages} className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">{totalPages}</button>}</li> 
      : null }
      <li>{ activePage < totalPages ? <button data-page="next" className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">Next</button> : <button disabled className="rounded-sm border-1 p-[5px] text-(--color-mid-green)">Next</button> }</li>

		</ul>
    </nav>
		)

}
