import ReactPaginate from 'react-paginate';
import styles from './CatalogPagination.module.scss';

import { ReactComponent as LoadMoreIcon } from '../../../assets/icons/update.svg';
import { ReactComponent as ArrowPrev } from '../../../assets/icons/arrow_prev.svg';
import { ReactComponent as ArrowNext } from '../../../assets/icons/arrow_next.svg';

interface IProps {
  onSetPage: () => void;
  currentPage: number;
  totalPages: number;
  forcePage: number;
  handlePageClick: ({ selected }: { selected: number }) => void;
}

const CatalogPagination: React.FC<IProps> = ({
  onSetPage,
  currentPage,
  totalPages,
  handlePageClick,
  forcePage,
}) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.LoadMoreBtn}
        onClick={onSetPage}
        style={{ display: currentPage + 1 >= totalPages ? 'none' : 'flex' }}
      >
        Завантажити більше <LoadMoreIcon />
      </button>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowNext />}
        previousLabel={<ArrowPrev />}
        onPageChange={handlePageClick}
        forcePage={forcePage}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        containerClassName={styles.paginationContainer}
        activeClassName={styles.activeClassName}
        pageLinkClassName={styles.pageLinkClassName}
        breakLinkClassName={styles.breakLinkClassName}
        previousLinkClassName={styles.previousLinkClassName}
        nextLinkClassName={styles.nextLinkClassName}
        pageClassName={styles.pageClassName}
        breakClassName={styles.breakClassName}
        nextClassName={styles.nextClassName}
        previousClassName={styles.previousClassName}
      />
    </div>
  );
};

export default CatalogPagination;
