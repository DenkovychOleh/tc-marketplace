import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styles from './AdvancedSearchFilter.module.scss';
import {
  getFilterBrands,
  getFilterCarsList,
  getFilterCitys,
  getFilterRegions,
  getFilterTypes,
} from 'redux/filter/selectors';
import {
  fetchBrands,
  fetchRegions,
  fetchTypes,
  fetchCity,
  fetchCars,
} from 'redux/filter/operations';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
import { ISearchParams } from 'types/ISearchParam';
import { getCarTypeParam } from 'services/services';
import { changeFiltredParams, cleanFiltredStore } from 'redux/filter/slice';
import {
  getArrayBrandsOfId,
  getArrayCarBodyOfId,
  getArrayCityOfId,
  getArrayColorOfId,
  getArrayConditionOfId,
  getArrayDriveOfid,
  getArrayFuelOfId,
  getArrayModelsOfId,
  getArrayNumberAxlesOfId,
  getArrayOfId,
  getArrayProducingCountryOfId,
  getArrayTransmissionOfId,
  getArrayWheelConfigurationOfId,
} from 'utils/getArrayOfId';
import { Dropdown } from 'components/Dropdown/Dropdown';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import { CategoryBar } from 'components/CategoryBar/CategoryBar';
import { ICity } from 'types/ICity';

interface Props {
  onAdvencedFilter: () => void;
}
interface BlocksVisibilityState {
  [key: string]: boolean;
}
interface ButtonVisibilityState {
  [key: string]: boolean;
}
export const AdvancedSearchFilter: React.FC<Props> = ({ onAdvencedFilter }) => {
  const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState<BlocksVisibilityState>(() => {
    return getWindowWidth() < 767
      ? getInitialBlocksVisibility(false)
      : getInitialBlocksVisibility(true);
  });

  const [isShow, setIsShow] = useState<ButtonVisibilityState>(() => {
    return getWindowWidth() < 767
      ? getInitialButtonVisibility(false)
      : getInitialButtonVisibility(true);
  });
  // const [isActive, setIsActive] = useState(false);
  // response(catalog) get-param
  const [data, setData] = useState<any>([]);
  // для рендж слайдера
  const [price, setPrice] = useState({ from: 0, to: 0 });
  const [year, setYear] = useState({ from: 0, to: 0 });
  const [mileage, setMileage] = useState({ from: 0, to: 0 });
  const [enginePower, setEnginePower] = useState({ from: 0, to: 0 });
  const [numberOfDoors, setNumberOfDoors] = useState({ from: 0, to: 0 });
  const [numberOfSeats, setNumberOfSeats] = useState({ from: 0, to: 0 });
  // redux filtred
  const typeCars: IType[] = useAppSelector(getFilterTypes);
  const regions: IRegion[] = useAppSelector(getFilterRegions);
  const cities: ICity[] = useAppSelector(getFilterCitys);
  const brands: IBrand[] = useAppSelector(getFilterBrands);
  const carsList: IModel[] = useAppSelector(getFilterCarsList);

  // type categotry cars
  const [selectedCategory, setSelectedCategory] = useState<string>('Легкові');
  const [carBody, setCarBody] = useState<string>('');
  const [carFuel, setCarFuel] = useState<string>('');
  const [carTransmission, setCarTransmission] = useState<string>('');
  const [carColor, setCarColor] = useState<string>('');
  const [carTransportCondition, setCarTransportCondition] =
    useState<string>('');
  const [carDriveType, setCarDriveType] = useState<string>('');
  const [carNumberAxles, setCarNumberAxles] = useState<string>('');
  const [carWheelConfiguration, setCarWheelConfiguration] =
    useState<string>('');
  const [selectedOption, setSelectedOption] = useState<boolean>(); // Yes or No
  const [transportTypeId, setTransportTypeId] = useState<number | null>(null);
  // select state for dropdown
  const [carMark, setCarMark] = useState<string | string[]>('Всі марки');
  const [brandId, setBrandId] = useState<number[] | []>([]);

  const [carModel, setCarModel] = useState<string | string[]>('Всі моделі');

  // dropdown
  const [selectedCity, setSelectedCity] = useState<string | string[]>('Місто');
  const [selectedRegions, setSelectedRegions] = useState<string | string[]>(
    'Вся Україна',
  );
  const [countryDeliver, setCountryDeliver] = useState<string | string[]>(
    'Весь світ',
  );
  // response catalog/get-param/id
  const bodyTypes = data?.bodyTypeDTOS;
  const fuel = data?.fuelTypeDTOS;
  const transmission = data?.transmissionDTOS;
  const transportColor = data?.transportColorDTOS;
  const driveType = data?.driveTypeDTOS;
  const transportCondition = data?.transportConditionDTOS;
  const numberAxles = data?.numberAxlesDTOS;
  const wheelConfiguration = data?.wheelConfigurationDTOS;
  const producingCountry = data?.producingCountryDTOS;

  const pickedBrands: any = [];
  brands.forEach((item: any) => {
    if (carMark.includes(item.brand)) {
      pickedBrands.push(item);
    }
  });
  const pickedRegions: any = [];
  regions.forEach((item: any) => {
    if (selectedRegions.includes(item.region)) {
      pickedRegions.push(item);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(prevState => {
      return getWindowWidth() < 767
        ? getInitialBlocksVisibility(false)
        : getInitialBlocksVisibility(true);
    });
    setIsShow(prevState => {
      return getWindowWidth() >= 768 && getWindowWidth() < 992
        ? getInitialButtonVisibility(false)
        : getInitialButtonVisibility(true);
    });
  }, [windowWidth]);
  function getWindowWidth() {
    return window.innerWidth;
  }

  function getInitialBlocksVisibility(isVisible: boolean) {
    const initialBlocksVisibility: BlocksVisibilityState = {};
    for (let i = 1; i <= 18; i++) {
      initialBlocksVisibility[`block${i}`] = isVisible;
    }
    return initialBlocksVisibility;
  }
  function getInitialButtonVisibility(isVisible: boolean) {
    const initialBlocksVisibility: ButtonVisibilityState = {};
    for (let i = 1; i <= 5; i++) {
      initialBlocksVisibility[`block${i}`] = isVisible;
    }
    return initialBlocksVisibility;
  }
  useEffect(() => {
    if (selectedRegions) {
      const regionId = getArrayOfId(regions, selectedRegions);
      if (regionId.length > 0) {
        const searchParams: Pick<ISearchParams, 'regionId'> = {
          regionId,
        };
        const searchConfig = {
          searchParams,
        };

        dispatch(fetchCity(searchConfig));
      }
    }
  }, [selectedRegions, dispatch, regions]);

  useEffect(() => {
    if (!transportTypeId) {
      return;
    }
    async function getCarTypeParams() {
      const data = await getCarTypeParam(`${transportTypeId}`);
      setData(data);
    }
    getCarTypeParams();
  }, [transportTypeId]);

  useEffect(() => {
    dispatch(fetchRegions());
    dispatch(fetchTypes());
  }, [dispatch]);

  useEffect(() => {
    setCarModel('Модель');
  }, [carMark]);

  // обработчики категории машин
  const handlerType = (category: string) => {
    setCarMark('Марка');
    setCarModel('Модель');
    setBrandId([]);
    setSelectedCategory(category);
  };
  const handlerCarBody = (valueType: string) => {
    setCarBody(valueType);
  };
  const handlerCarFuel = (valueType: string) => {
    setCarFuel(valueType);
  };
  const handlerCarTransmission = (valueType: string) => {
    setCarTransmission(valueType);
  };
  const handlerCarColor = (valueType: string) => {
    setCarColor(valueType);
  };
  const handlerDriveType = (valueType: string) => {
    setCarDriveType(valueType);
  };
  const handlerCarTransportCondition = (valueType: string) => {
    setCarTransportCondition(valueType);
  };
  const handlerCarWheelConfiguration = (valueType: string) => {
    setCarWheelConfiguration(valueType);
  };
  const handlerCarNumberAxles = (valueType: string) => {
    setCarNumberAxles(valueType);
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === 'Так';
    setSelectedOption(value);
  };
  // mobile btnShow
  const handleMobileBtnIsOpen = (blockName: keyof BlocksVisibilityState) => {
    setIsOpen(prevState => ({
      ...prevState,
      [blockName]: !prevState[blockName],
    }));
  };
  const handleTabletBtnIsOpen = (blockName: keyof BlocksVisibilityState) => {
    setIsShow(prevState => ({
      ...prevState,
      [blockName]: !prevState[blockName],
    }));
  };
  useEffect(() => {
    const type = typeCars.find(item => item.type === selectedCategory);
    type && setTransportTypeId(type?.typeId);
    if (type) {
      dispatch(fetchBrands(type.typeId));
    }
  }, [typeCars, dispatch, selectedCategory]);

  useEffect(() => {
    const type = typeCars.find(item => item.type === selectedCategory);
    const brand = getArrayBrandsOfId(brands, carMark);

    if (type && brand && brand.length > 0) {
      const id = type.typeId;
      const searchParams: Pick<ISearchParams, 'transportBrandsId'> = {
        transportBrandsId: brand,
      };
      const searchConfig = {
        searchParams,
      };
      setBrandId(brand);
      dispatch(fetchCars({ id, searchConfig }));
    }
  }, [brands, carMark, typeCars, dispatch, selectedCategory]);

  // надсилання данних фільтра запиту
  const handlerSendRequest = () => {
    const regionId = getArrayOfId(regions, selectedRegions);
    dispatch(cleanFiltredStore());
    const modelId = getArrayModelsOfId(carsList, carModel);
    const cityId = getArrayCityOfId(cities, selectedCity);
    const bodyTypeId = getArrayCarBodyOfId(bodyTypes, carBody);
    const fuelTypeId = getArrayFuelOfId(fuel, carFuel);
    const driveTypeId = getArrayDriveOfid(driveType, carDriveType);
    const transmissionId = getArrayTransmissionOfId(
      transmission,
      carTransmission,
    );
    const colorId = getArrayColorOfId(transportColor, carColor);
    const conditionId = getArrayConditionOfId(
      transportCondition,
      carTransportCondition,
    );
    const numberAxlesId = getArrayNumberAxlesOfId(
      numberAxles ?? [],
      carNumberAxles,
    );
    const producingCountryId = getArrayProducingCountryOfId(
      producingCountry,
      countryDeliver,
    );
    const wheelConfigurationId = getArrayWheelConfigurationOfId(
      wheelConfiguration ?? [],
      carWheelConfiguration,
    );
    const priceFrom = price.from;
    const priceTo = price.to;
    const yearsFrom = year.from;
    const yearsTo = year.to;
    const mileageFrom = mileage.from;
    const mileageTo = mileage.to;
    const enginePowerFrom = enginePower.from;
    const enginePowerTo = enginePower.to;
    const numberOfDoorsFrom = numberOfDoors.from;
    const numberOfDoorsTo = numberOfDoors.to;
    const numberOfSeatsFrom = numberOfSeats.from;
    const numberOfSeatsTo = numberOfSeats.to;
    const bargain = selectedOption;

    dispatch(
      changeFiltredParams({
        transportTypeId,
        brandId,
        cityId,
        modelId,
        regionId,
        bodyTypeId,
        fuelTypeId,
        driveTypeId,
        transmissionId,
        colorId,
        conditionId,
        numberAxlesId,
        producingCountryId,
        wheelConfigurationId,
        priceFrom,
        priceTo,
        yearsFrom,
        yearsTo,
        mileageFrom,
        mileageTo,
        enginePowerFrom,
        enginePowerTo,
        numberOfDoorsFrom,
        numberOfDoorsTo,
        numberOfSeatsFrom,
        numberOfSeatsTo,
        bargain,
      }),
    );
    onAdvencedFilter();
  };
  return (
    <div className={styles.AdvSearchFilter}>
      <div className={styles.AdvSearchFilter_container}>
        <div className={styles.AdvSearchFilter_box}>
          {/*RadioButton type car */}
          <div className={styles.list}>
            <div className={styles.title}>
              <h2>Тип</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block1 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block1')}
              />
            </div>
            {isOpen.block1 && (
              <div className={styles.listItem}>
                {typeCars && (
                  <CategoryBar
                    categories={typeCars.map(typeCar => typeCar.type)}
                    handleSelect={handlerType}
                    selectedCategory={selectedCategory}
                  />
                )}
              </div>
            )}
          </div>
          {/*Select Regions */}

          <div className={styles.list}>
            <div className={styles.title}>
              <h2>Регіон</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block2 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block2')}
              />
            </div>
            <div className={styles.listItem}>
              {isOpen.block2 && (
                <div className={styles.itemdropdownbox}>
                  <Dropdown
                    updateStyle="advSearch"
                    options={regions.map(region => region.region)}
                    label="Регіон"
                    startValue="Регіон"
                    checkboxAllowed
                    allOptionsLabel="Вся Україна"
                    option={selectedRegions}
                    setOption={setSelectedRegions}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Select City */}

          <div className={styles.list}>
            <div className={styles.title}>
              <h2>Місто</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block3 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block3')}
              />
            </div>
            <div className={styles.listItem}>
              {isOpen.block3 && (
                <div className={styles.itemdropdownbox}>
                  <Dropdown
                    pickedRegions={pickedRegions}
                    updateStyle="advSearch"
                    optionList={cities}
                    label="Місто"
                    startValue="Місто"
                    checkboxAllowed
                    allOptionsLabel="Місто"
                    option={selectedCity}
                    setOption={setSelectedCity}
                    title={selectedRegions}
                  />
                </div>
              )}
            </div>
          </div>

          {/*InputRange Price car */}

          <div className={styles.list}>
            <div className={styles.title}>
              <h2>Ціна</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block4 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block4')}
              />
            </div>
            {isOpen.block4 && (
              <div className={styles.listItem}>
                <RangeSlider setObjectValue={setPrice} typeRange={'price'} />
              </div>
            )}
          </div>
          {/*RadioButton type carBody */}

          {bodyTypes && (
            <div className={styles.typeCarBody}>
              <div className={styles.title}>
                <h2>Тип кузову</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block5 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block5')}
                />
              </div>
              {isOpen.block5 && (
                <div className={styles.listItem}>
                  <CategoryBar
                    categories={bodyTypes
                      .slice(0, isShow.block1 ? 13 : 5)
                      .map((item: any) => item.bodyType)}
                    handleSelect={handlerCarBody}
                    selectedCategory={carBody}
                  />
                  <button
                    className={`${styles.btnShowMore} ${
                      getWindowWidth() >= 768 && getWindowWidth() < 992
                        ? ''
                        : styles.hide
                    } `}
                    onClick={() => handleTabletBtnIsOpen('block1')}
                  >
                    {isShow.block1 ? 'Приховати' : 'Показати більше'}
                  </button>
                </div>
              )}
            </div>
          )}
          {/*Бренд/Модель  Select */}

          <div className={styles.selectBrand}>
            <div className={styles.title}>
              <h2>Бренд</h2>
            </div>
            <div className={styles.listItemBrand}>
              <div className={styles.dropdownContainer}>
                <Dropdown
                  updateStyle="advSearch"
                  // options={brands.map(brand => brand.brand).sort((a, b) => a.localeCompare(b))}
                  options={[...brands.map(brand => brand.brand)].sort((a, b) =>
                    a.localeCompare(b),
                  )}
                  label="Марка"
                  startValue="Марка"
                  option={carMark}
                  setOption={setCarMark}
                  allOptionsLabel="Всі марки"
                  checkboxAllowed
                />
              </div>
            </div>
          </div>

          <div className={styles.selectBrand}>
            <div className={styles.title}>
              <h2>Модель</h2>
            </div>
            <div className={styles.listItemBrand}>
              <div className={styles.dropdownContainer}>
                <Dropdown
                  updateStyle="advSearch"
                  optionList={carsList}
                  label="Модель"
                  startValue="Модель"
                  allOptionsLabel="Всі моделі"
                  checkboxAllowed
                  option={carModel}
                  title={carMark}
                  setOption={setCarModel}
                  carMark={carMark}
                  pickedBrands={pickedBrands}
                />
              </div>
            </div>
          </div>
          {/*Рік виготовлення инпут слайдер inputText, inputRange   Доработать по стилям! */}

          <div className={styles.list}>
            <div className={styles.title}>
              <h2>Рік</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block6 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block6')}
              />
            </div>
            {isOpen.block6 && (
              <div className={styles.listItem}>
                <RangeSlider setObjectValue={setYear} typeRange={'year'} />
              </div>
            )}
          </div>
          {/*RadioButton type Fuel  */}

          {fuel && (
            <div className={styles.listTypeFuil}>
              <div className={styles.title}>
                <h2>Тип палива</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block7 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block7')}
                />
              </div>
              {isOpen.block7 && (
                <div className={styles.listItem}>
                  <CategoryBar
                    categories={fuel
                      .slice(0, isShow.block2 ? 8 : 5)
                      .map((item: any) => item.fuelType)}
                    handleSelect={handlerCarFuel}
                    selectedCategory={carFuel}
                  />
                  <button
                    className={`${styles.btnShowMore} ${
                      getWindowWidth() >= 768 && getWindowWidth() < 992
                        ? ''
                        : styles.hide
                    }`}
                    onClick={() => handleTabletBtnIsOpen('block2')}
                  >
                    {isShow.block2 ? 'Приховати' : 'Показати більше'}
                  </button>
                </div>
              )}
            </div>
          )}
          {/* RadioButton type transmission  */}

          {transmission && (
            <div className={styles.list}>
              <div className={styles.title}>
                <h2>Коробка передач</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block8 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block8')}
                />
              </div>
              {isOpen.block8 && (
                <div className={styles.listItem}>
                  <CategoryBar
                    categories={transmission.map(
                      (item: any) => item.transmission,
                    )}
                    handleSelect={handlerCarTransmission}
                    selectedCategory={carTransmission}
                  />
                </div>
              )}
            </div>
          )}
          {/* RadioButton type color  */}

          {transportColor && (
            <div className={styles.listColor}>
              <div className={styles.title}>
                <h2>Колір</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block9 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block9')}
                />
              </div>
              {isOpen.block9 && (
                <div className={styles.listItem}>
                  <CategoryBar
                    color="transpotColor"
                    transportColor={
                      transportColor
                      // .slice(0, isShow.block3 ? 12 : 6)
                      // .map((item: any) => item.transportColor)
                    }
                    isShow={isShow.block3}
                    handleSelect={handlerCarColor}
                    selectedCategory={carColor}
                  />
                  <button
                    className={`${styles.btnShowMore} ${
                      getWindowWidth() >= 768 && getWindowWidth() < 992
                        ? ''
                        : styles.hide
                    }`}
                    onClick={() => handleTabletBtnIsOpen('block3')}
                  >
                    {isShow.block3 ? 'Приховати' : 'Показати більше'}
                  </button>
                </div>
              )}
            </div>
          )}
          {/* RadioButton type Технічний стан */}

          {transportCondition && (
            <div className={styles.listTechCondition}>
              <div className={styles.title}>
                <h2>Технічний стан</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block10 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block10')}
                />
              </div>
              {isOpen.block10 && (
                <div className={styles.listItem}>
                  <CategoryBar
                    categories={transportCondition
                      .slice(isShow.block4 ? 0 : 2)
                      .map((item: any) => item.transportCondition)}
                    handleSelect={handlerCarTransportCondition}
                    selectedCategory={carTransportCondition}
                  />
                  <button
                    className={`${styles.btnShowMore} ${
                      getWindowWidth() >= 768 && getWindowWidth() < 992
                        ? ''
                        : styles.hide
                    } `}
                    onClick={() => handleTabletBtnIsOpen('block4')}
                  >
                    {isShow.block4 ? 'Приховати' : 'Показати більше'}
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Пробіг */}

          <div className={styles.lisCarMileage}>
            <div className={styles.title}>
              <h2>Пробіг</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block11 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block11')}
              />
            </div>
            {isOpen.block11 && (
              <div className={styles.listItem}>
                <RangeSlider
                  setObjectValue={setMileage}
                  typeRange={'mileage'}
                />
              </div>
            )}
          </div>
          {/* Потужність двигуна */}

          <div className={styles.listMotorPower}>
            <div className={styles.title}>
              <h2>Потужність двигуна</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block12 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block12')}
              />
            </div>
            {isOpen.block12 && (
              <div className={styles.listItem}>
                <RangeSlider
                  setObjectValue={setEnginePower}
                  typeRange={'enginePower'}
                />
              </div>
            )}
          </div>
          {/* RadioButton type Привід */}

          {driveType && (
            <div className={styles.listMachineDrive}>
              <div className={styles.title}>
                <h2>Привід</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block13 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block13')}
                />
              </div>
              {isOpen.block13 && (
                <div className={styles.listItem}>
                  <CategoryBar
                    categories={driveType.map((item: any) => item.driveType)}
                    handleSelect={handlerDriveType}
                    selectedCategory={carDriveType}
                  />
                </div>
              )}
            </div>
          )}
          {/* Кількість дверей */}

          <div className={styles.howManyDoors}>
            <div className={styles.title}>
              <h2>Кількість дверей</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block14 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block14')}
              />
            </div>
            {isOpen.block14 && (
              <div className={styles.listItem}>
                <RangeSlider
                  setObjectValue={setNumberOfDoors}
                  typeRange={'numberOfDoors'}
                />
              </div>
            )}
          </div>
          {/* Кількість місць*/}

          <div className={styles.listNumberSeats}>
            <div className={styles.title}>
              <h2>Кількість місць</h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block15 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block15')}
              />
            </div>
            {isOpen.block15 && (
              <div className={styles.listItem}>
                <RangeSlider
                  setObjectValue={setNumberOfSeats}
                  typeRange={'numberOfSeats'}
                />
              </div>
            )}
          </div>
          {/* RadioButton type Кількість осей*/}
          {numberAxles && (
            <div className={styles.listNumberAxles}>
              <div className={styles.title}>
                <h2>Кількість осей</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block16 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block16')}
                />
              </div>
              {isOpen.block16 && (
                <div className={styles.listItem}>
                  <CategoryBar
                    categories={numberAxles.map(
                      (item: any) => item.numberAxles,
                    )}
                    handleSelect={handlerCarNumberAxles}
                    selectedCategory={carNumberAxles}
                  />
                </div>
              )}
            </div>
          )}
          {/* RadioButton type Конфігурація коліс*/}
          {wheelConfiguration && (
            <div className={styles.listWheelConfiguration}>
              <div className={styles.title}>
                <h2>Конфігурація коліс</h2>
                <div
                  className={`${styles.mobileButton} ${
                    isOpen.block17 ? styles.active : ''
                  }`}
                  onClick={() => handleMobileBtnIsOpen('block17')}
                />
              </div>
              {isOpen.block17 && (
                <div className={styles.listItem}>
                  <CategoryBar
                    categories={wheelConfiguration.map(
                      (item: any) => item.wheelConfiguration,
                    )}
                    handleSelect={handlerCarWheelConfiguration}
                    selectedCategory={carWheelConfiguration}
                  />
                </div>
              )}
            </div>
          )}
          {/* Країна з якої доставили    Select   */}
          <div className={styles.listCountryDelivery}>
            <div className={styles.title}>
              <h2>
                Країна з якої <br />
                доставили:
              </h2>
              <div
                className={`${styles.mobileButton} ${
                  isOpen.block18 ? styles.active : ''
                }`}
                onClick={() => handleMobileBtnIsOpen('block18')}
              />
            </div>
            <div className={styles.itemdropdowncontainer}>
              {isOpen.block18 && (
                <div className={styles.itemdropdownbox}>
                  {producingCountry && (
                    <Dropdown
                      updateStyle="advSearch"
                      options={producingCountry.map(
                        (item: any) => item.producingCountry,
                      )}
                      label="Країна"
                      startValue="Країна"
                      checkboxAllowed
                      allOptionsLabel="Весь світ"
                      option={countryDeliver}
                      setOption={setCountryDeliver}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* RadioButton type */}
          <div className={styles.listSelectTitle}>
            <div className={styles.title}>
              <h2>Можливість торгу</h2>
            </div>
            <div className={styles.listItem}>
              <div className={styles.listItemSelectTitle}>
                <label
                  htmlFor="No"
                  className={`${styles.itemTypeNo} ${
                    selectedOption === false ? styles.selected : ''
                  }`}
                >
                  Ні
                  <input
                    type="radio"
                    name="option"
                    id="No"
                    value="Ні"
                    checked={selectedOption === false}
                    onChange={handleOptionChange}
                  />
                </label>
                <label
                  htmlFor="Yes"
                  className={`${styles.itemTypeYes} ${
                    selectedOption === true ? styles.selected : ''
                  }`}
                >
                  Так
                  <input
                    type="radio"
                    name="option"
                    id="Yes"
                    value="Так"
                    checked={selectedOption === true}
                    onChange={handleOptionChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.resultFilter}>
        <button
          className={styles.resultFilterReset}
          type="button"
          onClick={handlerSendRequest}
        >
          Зберекти пошук
        </button>
        <button
          className={styles.resultFilterShow}
          type="button"
          onClick={handlerSendRequest}
        >
          Показати
        </button>
        <button className={styles.resultFilterReset} type="button">
          Скинути фільтр
        </button>
      </div>
    </div>
  );
};
