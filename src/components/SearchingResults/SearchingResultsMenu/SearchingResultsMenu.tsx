import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import styles from './SearchingResultsMenu.module.scss';

import { changeFiltredParams } from 'redux/filter/slice';
import { getSelectedCars } from 'redux/filter/selectors';

import { Dropdown } from 'components/Dropdown/Dropdown';

interface Iprops {
  onAdvancedFilter: () => void;
}

const SearchingResultsMenu: React.FC<Iprops> = ({ onAdvancedFilter }) => {
  const [typeOfSort, setTypeOfSort] = useState<string | string[]>('');
  const [orderBy, setOrderBy] = useState<'CREATED' | 'PRICE' | 'MILEAGE'>(
    'CREATED',
  );
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('ASC');

  const dispatch = useAppDispatch();

  const { transportTypeId } = useAppSelector(getSelectedCars);
  let filterType;
  switch (transportTypeId) {
    case 1:
      filterType = 'Легкові';
      break;
    case 2:
      filterType = 'Мото';
      break;
    case 3:
      filterType = 'Вантажівки';
      break;
    case 4:
      filterType = 'Спецтехніка';
      break;
    case 5:
      filterType = 'Сільгосптехніка';
      break;
    case 6:
      filterType = 'Водний транспорт';
      break;

    default:
      break;
  }

  useEffect(() => {
    switch (typeOfSort) {
      case 'Від дешевих до дорогих':
        setOrderBy('PRICE');
        setSortBy('ASC');
        break;
      case 'Від дорогих до дешевих':
        setOrderBy('PRICE');
        setSortBy('DESC');
        break;
      case 'Пробіг, за зростанням':
        setOrderBy('MILEAGE');
        setSortBy('ASC');
        break;
      case 'Пробіг, за спаданням':
        setOrderBy('MILEAGE');
        setSortBy('DESC');
        break;
      case 'Від нових до старих':
        setOrderBy('CREATED');
        setSortBy('ASC');
        break;
      case 'Від старих до нових':
        setOrderBy('CREATED');
        setSortBy('DESC');
        break;
      default:
        break;
    }
  }, [typeOfSort]);

  useEffect(() => {
    dispatch(changeFiltredParams({ orderBy, sortBy }));
  }, [dispatch, orderBy, sortBy]);

  const handleAdvancedFilter = () => {
    onAdvancedFilter();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Результати пошуку: "{filterType}"</h1>
      <div className={styles.menu}>
        <button
          type="button"
          onClick={handleAdvancedFilter}
          className={styles.filter}
        >
          <span className={styles.advFilter}>Розширений</span> фільтр
        </button>
        <div className={styles.dropdownMenu}>
          <Dropdown
            updateStyle="menuStyle"
            options={[
              'Від дешевих до дорогих',
              'Від дорогих до дешевих',
              'Пробіг, за зростанням',
              'Пробіг, за спаданням',
              'Від нових до старих',
              'Від старих до нових',
            ]}
            label="Сортування"
            startValue="Сортування"
            option={typeOfSort}
            setOption={setTypeOfSort}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchingResultsMenu;
