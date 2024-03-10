import React, { useState } from 'react';
import styles from './AdvancedSearch.module.scss';
// import { SearchTop } from '../../components/SearchTop/SearchTop';
// import AdvSearchBottom from './AdvSearchBottom/AdvSearchBottom';
import SearchingResults from 'components/SearchingResults/SearchingResults';
// import SearchingResultsMenu from 'components/SearchingResults/SearchingResultsMenu/SearchingResultsMenu';
import { AdvancedSearchFilter } from 'components/AdvancedSearchFilter/AdvancedSearchFilter';

export const AdvancedSearch: React.FC = () => {
  const [isOpenAdvancedFilter, setIsOpenAdvancedFilter] = useState(false);

  const handleAdvancedFilter = () => {
    setIsOpenAdvancedFilter(prev => !prev);
  };

  return (
    <section className={styles.AdvSearch}>
      <div className={styles.AdvSearch_container}>
        {isOpenAdvancedFilter && (
          <AdvancedSearchFilter onAdvencedFilter={handleAdvancedFilter} />
        )}
        <SearchingResults handleAdvancedFilter={handleAdvancedFilter} />
      </div>
    </section>
  );
};
