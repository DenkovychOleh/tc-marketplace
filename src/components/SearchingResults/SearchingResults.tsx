import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';
import _ from 'lodash.throttle';

import styles from './SearchingResults.module.scss';

import { ICar } from 'types/IСar';
import { ISearchParams } from 'types/ISearchParam';

import {
  cleanFiltredStore,
  updateFilteredStoreAfterHide,
} from 'redux/filter/slice';
import {
  getFiltredCars,
  getIsloadingFiltredCars,
  getTotalAdverts,
  getSelectedCars,
} from 'redux/filter/selectors';
import { fetchFiltredCars } from 'redux/filter/operations';

import Loader from 'components/Loader/Loader';
import SearchingCard from './SearchingCard';
import CatalogPagination from './CatalogPagination';
import SearchingResultsMenu from './SearchingResultsMenu';

interface IProps {
  handleAdvancedFilter: () => void;
}

const SearchingResults: React.FC<IProps> = ({ handleAdvancedFilter }) => {
  const [optionMenuId, setOptionMenuId] = useState<number | null>(null);
  const [arrForRender, setArrForRender] = useState<ICar[]>([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  const dispatch = useAppDispatch();

  const searchParams: Pick<
    ISearchParams,
    'transportTypeId' | 'brandId' | 'modelId' | 'regionId' | 'orderBy'
  > = useSelector(getSelectedCars);
  const adverts = useSelector(getFiltredCars);
  const isLoading = useSelector(getIsloadingFiltredCars);
  const totalAdverts: number | null = useSelector(getTotalAdverts);
  let advertsPerPage = 4;
  let totalPages: number;
  if (totalAdverts !== null) {
    totalPages = Math.ceil(totalAdverts / advertsPerPage);
  } else {
    totalPages = 1;
  }

  const filteredFetchParams = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0;
          } else {
            return value !== undefined && value !== 0;
          }
        }),
      ),
    [searchParams],
  );
  const hasValidValues = Object.keys(filteredFetchParams).length > 0;
  const searchParamsValue = useMemo(
    () => (hasValidValues ? filteredFetchParams : {}),
    [filteredFetchParams, hasValidValues],
  );

  const memoParam = useMemo(() => {
    return {
      page: 0,
      limit: advertsPerPage,
      searchParams: { ...searchParamsValue },
    };
  }, [searchParamsValue, advertsPerPage]);

  const [fetchParam, setFetchParam] = useState({ ...memoParam });

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const newAdvertsPerPage = width > 767 ? 4 : 3;
    setFetchParam(prev => ({ ...prev, limit: newAdvertsPerPage }));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', _(handleResize, 100));
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setIsShowMore(false);
    setFetchParam({ ...memoParam, page: 0 });
  }, [memoParam]);

  useEffect(() => {
    if (isComponentMounted) {
      dispatch(fetchFiltredCars(fetchParam));
    } else {
      setIsComponentMounted(true);
    }
  }, [dispatch, fetchParam, isComponentMounted]);

  useEffect(() => {
    if (!isShowMore) {
      setArrForRender(adverts);
    } else {
      setArrForRender(prevState => [...prevState, ...adverts]);
    }
  }, [adverts, isShowMore]);

  const handleOptionMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    cardId: number,
  ) => {
    event.stopPropagation();
    if (!optionMenuId) {
      setOptionMenuId(cardId);
    } else {
      setOptionMenuId(optionMenuId === cardId ? null : cardId);
    }
  };

  const handleInfoContainerClick = () => {
    setOptionMenuId(null);
  };

  const updateAfterHide = (carId: number) => {
    const updatedArr = arrForRender.filter(({ id }) => id !== carId);
    dispatch(updateFilteredStoreAfterHide(updatedArr));
  };

  const updateAfterAllHide = () => {
    setIsShowMore(false);
    dispatch(fetchFiltredCars(fetchParam));
  };

  const handleShowMore = () => {
    setIsShowMore(true);
    dispatch(cleanFiltredStore());
    setFetchParam(prev => ({ ...prev, page: prev.page + 1 }));
  };

  const handleChangePage = ({ selected }: { selected: number }) => {
    setIsShowMore(false);
    setFetchParam(prev => ({ ...prev, page: selected }));
  };

  return (
    <>
      <SearchingResultsMenu onAdvancedFilter={handleAdvancedFilter} />
      <div className={styles.container}>
        {isLoading && !isShowMore ? (
          <Loader />
        ) : !isLoading && isComponentMounted && arrForRender.length === 0 ? (
          "We don't have any adverts"
        ) : (
          <>
            {isLoading && isShowMore && <Loader />}
            <div className={styles.catalogContainer}>
              {arrForRender.map((advert, index) => (
                <SearchingCard
                  key={advert.id}
                  car={advert}
                  onShowMenu={handleOptionMenu}
                  onInfoContainerClick={handleInfoContainerClick}
                  onUpdateAfterHide={updateAfterHide}
                  isShowMenu={optionMenuId === advert.id}
                  updateAfterAllHide={updateAfterAllHide}
                />
              ))}
            </div>
            <CatalogPagination
              forcePage={fetchParam.page}
              onSetPage={handleShowMore}
              currentPage={fetchParam.page}
              totalPages={totalPages}
              handlePageClick={handleChangePage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SearchingResults;
