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
 /////!
} from './operations';
import { IType } from 'types/IType';
import { IRegion } from 'types/IRegion';
import { IBrand } from 'types/IBrand';
import { IModel } from 'types/IModel';
import { ICar, IFiltredCarsPayload } from 'types/IСar';
import { ICity } from 'types/ICity';

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
  // filtredCarsAdvancedSearch: ICar[]|[];
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
  // filtredCarsAdvancedSearch:[],
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

const handleFulfildGetRegions = (
  state: IFilterState,
  action: PayloadAction<IRegion[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.regions = action.payload;
};
const handleFulfildGetCitys = (
  state: IFilterState,
  action: PayloadAction<ICity[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.cities = action.payload;
};

const handleFulfildGetTypes = (
  state: IFilterState,
  action: PayloadAction<IType[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.types = action.payload;
};

const handleFulfildGetBrands = (
  state: IFilterState,
  action: PayloadAction<IBrand[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.brand = action.payload;
};

const handleFulfildGetModels = (
  state: IFilterState,
  action: PayloadAction<IModel[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.models = action.payload;
};
const handleFulfildGetCars = (
  state: IFilterState,
  action: PayloadAction<IModel[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.carsList = action.payload;
};

const handleFulfildGetFiltredCars = (
  state: IFilterState,
  action: PayloadAction<IFiltredCarsPayload>,
) => {
  state.isLoading = false;
  state.error = null;
  state.filtredCars = [
    ...state.filtredCars,
    ...action.payload.transportSearchResponse,
  ];
  state.totalAdverts = action.payload.total;
};

// const handleFulfildGetFiltredCarsAdvancedSearch = (
//   state: IFilterState,
//   action: PayloadAction<IFiltredCarsPayload>,
// ) => {
//   state.isLoading = false;
//   state.error = null;
//   state.filtredCarsAdvancedSearch = [
   
//     ...action.payload.transportSearchResponse,
//   ];
//   state.totalAdverts = action.payload.total;
// };

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
      .addCase(fetchRegions.fulfilled, handleFulfildGetRegions)
      .addCase(fetchCity.fulfilled, handleFulfildGetCitys)
      .addCase(fetchTypes.fulfilled, handleFulfildGetTypes)
      .addCase(fetchBrands.fulfilled, handleFulfildGetBrands)
      .addCase(fetchModels.fulfilled, handleFulfildGetModels)
      .addCase(fetchCars.fulfilled, handleFulfildGetCars)
      .addCase(fetchFiltredCars.fulfilled, handleFulfildGetFiltredCars)
      // .addCase(fetchFiltredCarsAdvancedSearch.fulfilled, handleFulfildGetFiltredCarsAdvancedSearch)
      .addMatcher(
        isAnyOf(
          fetchRegions.pending,
          fetchCity.pending,
          fetchTypes.pending,
          fetchBrands.pending,
          fetchModels.pending,
          fetchCars.pending,
          fetchFiltredCars.pending,
          // fetchFiltredCarsAdvancedSearch.pending,
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
          // fetchFiltredCarsAdvancedSearch.rejected,
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
