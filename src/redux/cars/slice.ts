import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import {
  addToFavourites,
  fetchNewCars,
  fetchPopularCars,
  fetchViewedCars,
  getCarDetails,
  removeFromFavourites,
} from './operations';
import { ICar } from 'types/IСar';
import { ITransportDetails } from 'types/ITransportDetails';

interface CarsState {
  recentlyViewedCars: ICar[] | [];
  popularCars: ICar[] | [];
  newCars: ICar[] | [];
  filtredCars: ICar[] | [];
  error: unknown;
  isLoading: boolean;
  carDetail: ITransportDetails | null;
}

const initialState: CarsState = {
  recentlyViewedCars: [],
  popularCars: [],
  newCars: [],
  filtredCars: [],
  error: null,
  isLoading: false,
  carDetail: null,
};

const handlePending = (state: CarsState) => {
  state.isLoading = true;
};

const handleRejected = (state: CarsState, action: PayloadAction<unknown>) => {
  state.isLoading = false;
  if (
    typeof action.payload === 'object' &&
    action.payload &&
    'errorMessage' in action.payload
  ) {
    const errorMessage = action.payload as {
      errorMessage: { errorMessage: string };
    };
    state.error = errorMessage.errorMessage.errorMessage;
  } else {
    state.error = 'Something went wrong';
  }
};

const handleFulfildGetViewed = (
  state: CarsState,
  action: PayloadAction<ICar[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.recentlyViewedCars = action.payload;
};

const handleFulfildGetNew = (
  state: CarsState,
  action: PayloadAction<ICar[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.newCars = action.payload;
};

const handleFulfildGetPopular = (
  state: CarsState,
  action: PayloadAction<ICar[]>,
) => {
  state.isLoading = false;
  state.error = null;
  state.popularCars = action.payload;
};

const handleFulfildGetCarDetails = (
  state: CarsState,
  action: PayloadAction<ITransportDetails>,
) => {
  state.isLoading = false;
  state.error = null;
  state.carDetail = action.payload;
};

const handleFulfildAddToFavorite = (
  state: CarsState,
  action: PayloadAction<number>,
) => {
  const recentlyViewedCar = state.recentlyViewedCars.find(
    item => item.id === action.payload,
  );
  const popularCar = state.popularCars.find(item => item.id === action.payload);
  const newCar = state.newCars.find(item => item.id === action.payload);
  if (state.carDetail) {
    state.carDetail.isFavorite = true;
  }
  if (recentlyViewedCar) {
    recentlyViewedCar.isFavorite = true;
  }
  if (popularCar) {
    popularCar.isFavorite = true;
  }
  if (newCar) {
    newCar.isFavorite = true;
  }
};

const handleFulfildRemoveFromFavorite = (
  state: CarsState,
  action: PayloadAction<number>,
) => {
  const recentlyViewedCar = state.recentlyViewedCars.find(
    item => item.id === action.payload,
  );
  const popularCar = state.popularCars.find(item => item.id === action.payload);
  const newCar = state.newCars.find(item => item.id === action.payload);
  if (state.carDetail) {
    state.carDetail.isFavorite = false;
  }
  if (recentlyViewedCar) {
    recentlyViewedCar.isFavorite = false;
  }
  if (popularCar) {
    popularCar.isFavorite = false;
  }
  if (newCar) {
    newCar.isFavorite = false;
  }
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    // clearFavourites(state) {
    //   const newCars=state.newCars.map(item=>);
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNewCars.fulfilled, handleFulfildGetNew)
      .addCase(fetchPopularCars.fulfilled, handleFulfildGetPopular)
      .addCase(fetchViewedCars.fulfilled, handleFulfildGetViewed)
      .addCase(getCarDetails.fulfilled, handleFulfildGetCarDetails)
      .addCase(addToFavourites.fulfilled, handleFulfildAddToFavorite)
      .addCase(removeFromFavourites.fulfilled, handleFulfildRemoveFromFavorite)
      .addMatcher(
        isAnyOf(
          fetchNewCars.pending,
          fetchPopularCars.pending,
          fetchViewedCars.pending,
          getCarDetails.pending,
        ),
        handlePending,
      )
      .addMatcher(
        isAnyOf(
          fetchNewCars.rejected,
          fetchPopularCars.rejected,
          fetchViewedCars.rejected,
          getCarDetails.rejected,
        ),
        handleRejected,
      );
  },
});
