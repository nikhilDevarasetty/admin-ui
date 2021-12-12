import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ curpage, totalpages, totalresults, args=[], handler = () => {} }) => {
  const handlePageClick = (number) => {
    // selected page = number.selected + 1
    handler(number.selected, ...args);
  };

  return (
    <div className='mt-4 flex items-center justify-between border-gray-200'>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700 m-0'>
            Showing
            <span className='font-semibold mx-1'>{ totalresults === 0 ? 0 : curpage * 10 + 1}</span>
            to
            <span className='font-semibold mx-1'>
              { curpage * 10 + 10 <= totalresults ? curpage * 10 + 10 : totalresults }
            </span>
            of
            <span className='font-semibold mx-1'>{totalresults}</span>
            results
          </p>
        </div>
        <div>
          <ReactPaginate
            forcePage={curpage}
            previousLabel={
              <span className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300  text-sm font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer'>
                <span className='sr-only'>Previous</span>
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            }
            nextLabel={
              <span className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300  text-sm font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer'>
                <span className='sr-only'>Next</span>
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            }
            pageCount={totalpages}
            onPageChange={handlePageClick}
            containerClassName={'relative z-0 inline-flex rounded-md -space-x-px'}
            activeLinkClassName={'text-blue-600'}
            pageLinkClassName={
              'relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer '
            }
            breakClassName={
              'relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-semibold text-gray-500 hover:bg-gray-50 cursor-pointer '
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
