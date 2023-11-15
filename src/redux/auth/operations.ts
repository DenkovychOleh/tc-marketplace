import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from 'redux/store';

export type KnownError = {
  errorMessage: string;
};

const instance = axios.create({
  baseURL: 'http://134.209.230.247:8080/api/v1/',
});

export const setAuthHeader = (token:string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const delAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials:{email: string, password: string}, thunkAPI) => {
    try {
      const response = await instance.post('authorization/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return {
        status: error.response.status,
        errorMessage: error.response.data,
      };
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
  try {
    // await instance.post('authorization/logout');
    delAuthHeader();
  } catch (err: any) {
    console.error(err);
    return thunkAPI.rejectWithValue({ errorMessage: 'Failed to log out' });
  }
});

