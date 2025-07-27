import { useSearchParams } from 'react-router';
import './pagination.css';

type PaginationProps = {
  totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="pagination-wrapper">
      <button
        disabled={currentPage <= 1}
        className={currentPage <= 1 ? 'btn-disabled' : 'btn-active'}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>
      <div>
        {`${currentPage} `} / {`${totalPages}`}
      </div>
      <button
        disabled={currentPage >= totalPages}
        className={currentPage >= totalPages ? 'btn-disabled' : 'btn-active'}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
