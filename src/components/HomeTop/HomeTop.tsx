import styles from './HomeTop.module.scss';
import arrow from '../../assets/icons/arrow-white.svg';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
import { useEffect, useState } from 'react';
import { Dropdown } from 'components/Dropdown/Dropdown';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getFilterBrands,
  getFilterModels,
  getFilterRegions,
  getFilterTypes,
} from 'redux/filter/selectors';
import {
  fetchBrands,
  fetchModels,
  fetchRegions,
  fetchTypes,
  // fetchFiltredCars,
} from 'redux/filter/operations';
import { IRegion } from 'types/IRegion';
import { IType } from 'types/IType';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
// import { ISearchParams } from 'types/ISearchParam';

import { useNavigate } from 'react-router-dom';
import { getArrayModelsOfId, getArrayOfId } from 'utils/getArrayOfId';
import { changeFiltredParams, cleanFiltredStore } from 'redux/filter/slice';
// import {Advancedsearch} from 'pages/AdvancedSearchPage/AdvancedSearch';

export const HomeTop = () => {
  const dispatch = useAppDispatch();
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const categories: IType[] = useAppSelector(getFilterTypes);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const models: IModel[] = useAppSelector(getFilterModels);
  const [selectedCategory, setSelectedCategory] = useState<string>('Легкові');
  const [transportTypeId, setTransportTypeId] = useState<number | null>(null);
  // select state for dropdown
  const [carMark, setCarMark] = useState<string | string[]>('Всі марки');
  const [brandId, setBrandId] = useState<number[] | []>([]);
  const [carModel, setCarModel] = useState<string | string[]>('Всі моделі');
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>(
    'Вся Україна',
  );

  useEffect(() => {
    dispatch(fetchRegions());
    dispatch(fetchTypes());
  }, [dispatch]);

  useEffect(() => {
    setCarModel('Модель');
  }, [carMark]);

  const handleSelectCategory = (category: string) => {
    setCarMark('Марка');
    setCarModel('Модель');
    setBrandId([]);
    setSelectedCategory(category);
  };

  useEffect(() => {
    const type = categories.find(item => item.type === selectedCategory);
    type && setTransportTypeId(type?.typeId);
    if (type) {
      dispatch(fetchBrands(type.typeId));
    }
  }, [categories, dispatch, selectedCategory]);

  useEffect(() => {
    const type = categories.find(item => item.type === selectedCategory);
    const brand = brands.find(item => item.brand === carMark);
    if (type && brand) {
      setBrandId([brand?.brandId]);
      dispatch(
        fetchModels({
          transportTypeId: type?.typeId,
          transportBrandId: brand?.brandId,
        }),
      );
    }
  }, [brands, carMark, categories, dispatch, selectedCategory]);

  const getSearchResult = () => {
    dispatch(cleanFiltredStore());
    const regionId = getArrayOfId(regions, selectedRegions);
    const modelId = getArrayModelsOfId(models, carModel);
    dispatch(
      changeFiltredParams({ transportTypeId, brandId, modelId, regionId, orderBy:"CREATED", sortBy:"ASC" }),
    );
    // const searchParams: Pick<
    //   ISearchParams,
    //   | 'transportTypeId'
    //   | 'brandId'
    //   | 'modelId'
    //   | 'regionId'
    //   | 'orderBy'
    //   | 'sortBy'
    // > = {
    //   transportTypeId,
    //   brandId,
    //   modelId,
    //   regionId,
    //   orderBy: 'CREATED',
    //   sortBy: 'ASC',
    // };
    // const searchConfig = {
    //   page: 0,
    //   searchParams,
    // };
    
    // dispatch(fetchFiltredCars(searchConfig));
    navigate('/advanced-search');
  };

  const navigate = useNavigate();

  const handleAdvancedSearchClick = () => {
    navigate('/advanced-search');
  };

  return (
    <div className={styles.homeTop}>
      <div className={styles.container}>
        <div className={styles.centered_container}>
          <h2 className={styles.title}>Your marketplace</h2>

          <CategoryBar
            categories={categories.map(category => category.type)}
            handleSelect={handleSelectCategory}
            selectedCategory={selectedCategory}
          />

          <div className={styles.container_bottom}>
            <div className={styles.select_bar}>
              <Dropdown
                options={[...brands.map(brand => brand.brand)].sort((a, b) =>
                  a.localeCompare(b),
                )}
                label="Марка"
                startValue="Марка"
                option={carMark}
                setOption={setCarMark}
              />

              <Dropdown
                options={
                  carMark !== 'Всі марки' ? models.map(item => item.model) : []
                }
                label="Модель"
                startValue="Модель"
                checkboxAllowed
                allOptionsLabel="Всі моделі"
                option={carModel}
                setOption={setCarModel}
                carMark={carMark}
              />

              <Dropdown
                options={regions.map(region => region.region)}
                label="Регіон"
                startValue="Регіон"
                checkboxAllowed
                allOptionsLabel="Вся Україна"
                option={selectedRegions}
                setOption={setSelectedRegions}
              />
            </div>

            <div className={styles.search}>
              <button
                className={styles.search_button}
                onClick={getSearchResult}
              >
                <span className={styles.search_button_text}>Шукати</span>
                <img src={arrow} alt="search" />
              </button>

              <button
                className={styles.search_more}
                onClick={handleAdvancedSearchClick}
              >
                Розширений пошук
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
