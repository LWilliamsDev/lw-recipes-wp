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

  const prevPage = Math.min(activePage - 1, 1);
  const nextPage = Math.min(activePage + 1, totalPages);

  const handlePageChange = (event: React.MouseEvent<HTMLUListElement>) => {
    event.preventDefault();

    const button = event.target as HTMLElement;
    const page = button.getAttribute("data-page");

    /*The parameter cannot be page because page is a reserved term in WordPress. */



    if (page == 'back') {
      updatePage("pg", prevPage, false);
    }
    else if (page == 'next') {
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
		  { activePage > 1 ?<li><a href={`?pg=${prevPage.toString()}`} data-page="back" className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">Back</a></li> : null }
      { activePage >= 1 ? <li><a href="?pg=1" data-page="1" className={activePage == 1 ? 'current-page cursor-pointer rounded-sm border-1 p-[5px] text-(--color-white)' : 'cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)'} aria-current={activePage == 1 ? "page" : undefined}>1</a></li> : null}
      { numbers[0] > 6 ? <li className="p-[5px] text-(--color-mid-green)"><span> ... </span></li> : null }
      { numbers.map((number) => <li><a href={`?pg=${number}`} data-page={number} className={number == activePage ? 'current-page cursor-pointer rounded-sm border-1 p-[5px] text-(--color-white)' : 'cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)'} aria-current={number == activePage ? "page" : undefined}>{number}</a></li>)}
      { numbers.length > 0 && numbers.at(-1)! < totalPages - 6 ? (<li className="p-[5px] text-(--color-mid-green)"><span> ... </span></li>) : null }
      { activePage <= totalPages ? <li><a href={`?pg=${totalPages.toString()}`} data-page={totalPages} className={activePage == totalPages ? 'current-page cursor-pointer rounded-sm border-1 p-[5px] text-(--color-white)' : 'cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)'} aria-current={activePage == totalPages ? "page" : undefined}>{totalPages}</a></li> : null} 
      { activePage < totalPages ? <li><a href={`?pg=${nextPage.toString()}`} data-page="next" className="cursor-pointer rounded-sm border-1 p-[5px] text-(--color-brown)">Next</a></li> : null}
		</ul>
    </nav>
		)

}
