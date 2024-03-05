import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ISearchParams } from 'types/ISearchParam';
import { paramsSerializer } from './../../utils/paramsSerializer';
import { RootState } from 'redux/store'; //!

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'https://api.pawo.space/api/v1/',
});

export const setAuthHeaderForHide = (token: string) => {
  //!
  instance.defaults.headers.common.Authorization = `Bearer ${token}`; //!
}; //!

export const fetchTypes = createAsyncThunk(
  'filter/getTypes',
  async (_, thunkAPI) => {
    try {
      const response = await instance('main/types');
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchRegions = createAsyncThunk(
  'filter/getRegions',
  async (_, thunkAPI) => {
    try {
      const response = await instance('main/regions');
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchBrands = createAsyncThunk(
  'filter/getBrands',
  async (transportTypeId: number, thunkAPI) => {
    try {
      const config = {
        params: { transportTypeId },
      };
      const response = await instance('main/brands', config);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchModels = createAsyncThunk(
  'filter/getModels',
  async (
    {
      transportTypeId,
      transportBrandId,
    }: { transportTypeId: number; transportBrandId: number },
    thunkAPI,
  ) => {
    try {
      const config = {
        params: { transportTypeId, transportBrandId },
      };
      const response = await instance('main/models', config);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchFiltredCars = createAsyncThunk(
  'cars/getFiltredCar',
  async (
    searchConfig: { page: number; searchParams: ISearchParams },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as RootState; //!
    const persistToken = state.auth.token; //!
    try {
      if (persistToken !== null) {
        //!
        setAuthHeaderForHide(persistToken); //!
      } //!
      const config = {
        params: searchConfig.searchParams,
        paramsSerializer,
      };
      const response = await instance(
        `catalog/search/page/${searchConfig.page}/limit/3/`,
        config,
      );

      return response.data; //!
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const fetchCity = createAsyncThunk(
  'filter/getCity',
  async (searchConfig: { searchParams: ISearchParams }, thunkAPI) => {
    try {
      const config = {
        params: searchConfig.searchParams,
        paramsSerializer,
      };
      const response = await instance(`main/cities?`, config);

      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
);

export const hideTransport = createAsyncThunk(
  ///////////////!
  'cars/putHideTransport',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistToken = state.auth.token;
    if (persistToken === null) {
      return thunkAPI.rejectWithValue('Unable to Hide advert');
    }
    try {
      setAuthHeaderForHide(persistToken);
      const response = await instance.put(
        `https://api.pawo.space/api/v1/user-page/hide/transport/${id}`,
      );
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
); //////!

export const hideAllTransport = createAsyncThunk(
  ///////////////!
  'cars/putHideTransport',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistToken = state.auth.token;
    if (persistToken === null) {
      return thunkAPI.rejectWithValue('Unable to Hide advert');
    }
    try {
      setAuthHeaderForHide(persistToken);
      const response = await instance.put(
        `https://api.pawo.space/api/v1/user-page/hide-all/transport/${id}`,
      );
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue({ errorMessage: error.response.data });
    }
  },
); //////!
