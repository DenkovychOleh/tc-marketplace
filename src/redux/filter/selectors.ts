import { RootState } from 'redux/store';
export const getFilterRegions = (state: RootState) => state.filter.regions;
export const getFilterCitys = (state: RootState) => state.filter.cities;
export const getFilterTypes = (state: RootState) => state.filter.types;
export const getFilterBrands = (state: RootState) => state.filter.brand;
export const getFilterModels = (state: RootState) => state.filter.models;
export const getFilterCarsList = (state: RootState) => state.filter.carsList;
export const getSelectedCars = (state: RootState) => state.filter.select;
export const getFiltredCars = (state: RootState) => state.filter.filtredCars;
// export const getFiltredCarsAdvancedSearch = (state: RootState) => state.filter.filtredCarsAdvancedSearch;
export const getTotalAdverts = (state: RootState) => state.filter.totalAdverts;
export const getIsloadingFiltredCars = (state: RootState) =>
  state.filter.isLoading;
