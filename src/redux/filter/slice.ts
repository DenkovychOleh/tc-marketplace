import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchCars,
  fetchBrands,
  fetchCity,
  fetchFiltredCars,
  fetchModels,
  fetchRegions,
  fetchTypes,
  hideTransport,
} from './operations';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
import { ICar, IFiltredCarsPayload } from 'types/IСar';
import { ICity } from 'types/ICity';
import { addToFavourites, removeFromFavourites } from 'redux/cars/operations';

interface IFilterState {
  regions: IRegion[] | [];
  cities: ICity[] | [];
  types: IType[] | [];
  brand: IBrand[] | [];
  models: IModel[] | [];
  carsList:IModel[] | [];
  error: unknown;
  isLoading: boolean;
  select: {
    transportTypeId: number | null;
    brandId: number[] | null;
    modelId: number[] | [];
    regionId: number[] | [];
  }; 
  filtredCars: ICar[] | [];
  totalAdverts: number | null;
}

const initialState: IFilterState = {
  regions: [],
  cities: [],
  types: [],
  brand: [],
  models: [],
  carsList:[],
  select: {
    transportTypeId: 1,
    brandId: [],
    modelId: [],
    regionId: [],
  },
 
  filtredCars: [],
  error: null,
  isLoading: false,
  totalAdverts: null,
};

const handlePending = (state: IFilterState) => {
  state.isLoading = true;
};

const handleRejected = (
  state: IFilterState,
  action: PayloadAction<unknown>,
) => {
  state.isLoading = false;
};

const handleFulfilledGetRegions = (
  state: IFilterState,
  action: PayloadAction<IRegion[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.regions = action.payload;
};
const handleFulfilledGetCitys = (
  state: IFilterState,
  action: PayloadAction<ICity[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.cities = action.payload;
};

const handleFulfilledGetTypes = (
  state: IFilterState,
  action: PayloadAction<IType[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.types = action.payload;
};

const handleFulfilledGetBrands = (
  state: IFilterState,
  action: PayloadAction<IBrand[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.brand = action.payload;
};

const handleFulfilledGetModels = (
  state: IFilterState,
  action: PayloadAction<IModel[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.models = action.payload;
};
const handleFulfilledGetCars = (
  state: IFilterState,
  action: PayloadAction<IModel[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.carsList = action.payload;
};

const handleFulfilledGetFiltredCars = (
  state: IFilterState,
  action: PayloadAction<IFiltredCarsPayload>,
) => {
  state.isLoading = false;
  state.error = null;
  state.filtredCars = [
    ...action.payload.transportSearchResponse,
  ];
  state.totalAdverts = action.payload.total;
};
const handleFulfilledHideAdvert = (
  state: IFilterState,
) => {
  state.isLoading = false;
  state.error = null;
};

const handleFulfilledToggleIsFavorite = (
  state: IFilterState,
  action: PayloadAction<number>,
) => {
  const filteredCar = state.filtredCars.find(
    item => item.id === action.payload,
  );
 
  if (filteredCar) {
    filteredCar.isFavorite = !filteredCar.isFavorite;
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFiltredParams(
      state,
      action: PayloadAction<
        | { transportTypeId: number | null }
        | { brandId: number[] | null }
        | { modelId: number[] }
        | { regionId: number[] }
        | { cityId: number[] }
        | { bodyTypeId: number[] }
        | { fuelTypeId: number[] }
        | { driveTypeId: number[] }
        | { transmissionId: number[] }
        | { colorId: number[] }
        | { conditionId: number[] }
        | { numberAxlesId: number[] }
        | { producingCountryId: number[] }
        | { wheelConfigurationId: number[] }
        | { priceFrom: number }
        | { priceTo: number }
        | { yearsFrom: number }
        | { yearsTo: number }
        | { mileageFrom: number }
        | { mileageTo: number }
        | { enginePowerFrom: number }
        | { enginePowerTo: number }
        | { numberOfDoorsFrom: number }
        | { numberOfDoorsTo: number }
        | { numberOfSeatsFrom: number }
        | { numberOfSeatsTo: number }
        | { bargain: boolean }
        | { orderBy: 'CREATED' | 'PRICE' | 'MILEAGE' } ////!
        | { sortBy: 'ASC' | 'DESC' } ////!
      >,
    ) {
      state.select = { ...state.select, ...action.payload };
    },
    cleanFiltredStore(state) {
      state.filtredCars = [];
    },
    updateFilteredStoreAfterHide(state, { payload }) {
      state.filtredCars = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegions.fulfilled, handleFulfilledGetRegions)
      .addCase(fetchCity.fulfilled, handleFulfilledGetCitys)
      .addCase(fetchTypes.fulfilled, handleFulfilledGetTypes)
      .addCase(fetchBrands.fulfilled, handleFulfilledGetBrands)
      .addCase(fetchModels.fulfilled, handleFulfilledGetModels)
      .addCase(fetchCars.fulfilled, handleFulfilledGetCars)
      .addCase(fetchFiltredCars.fulfilled, handleFulfilledGetFiltredCars)  
      .addCase(hideTransport.fulfilled, handleFulfilledHideAdvert)

      .addMatcher(
        isAnyOf(addToFavourites.fulfilled, removeFromFavourites.fulfilled),
        handleFulfilledToggleIsFavorite,
      )
      .addMatcher(
        isAnyOf(
          fetchRegions.pending,
          fetchCity.pending,
          fetchTypes.pending,
          fetchBrands.pending,
          fetchModels.pending,
          fetchCars.pending,
          fetchFiltredCars.pending,
          hideTransport.pending, ////!
        ),
        handlePending,
      )
      .addMatcher(
        isAnyOf(
          fetchRegions.rejected,
          fetchCity.rejected,
          fetchTypes.rejected,
          fetchBrands.rejected,
          fetchModels.rejected,
          fetchCars.rejected,
          fetchFiltredCars.rejected,
          hideTransport.rejected, ////!
        ),
        handleRejected,
      );
  },
});

export const {
  changeFiltredParams,
  cleanFiltredStore,
  updateFilteredStoreAfterHide,
} = filterSlice.actions;
