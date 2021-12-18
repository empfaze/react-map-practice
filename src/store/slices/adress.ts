import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdressState, IPlace } from "../../types/adress";

const initialState: AdressState = {
  places: [] as IPlace[],
  draggedPlaceID: null,
};

const adressSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    sortPlaces: (state) => {
      if (state.places.length > 1) {
        state.places.sort((prev, next) => prev.id - next.id);
      }
    },

    addPlace: (state, action: PayloadAction<IPlace>) => {
      state.places.push(action.payload);
    },
    removePlace: (state, action: PayloadAction<number>) => {
      state.places = state.places.filter(
        (place) => place.id !== action.payload
      );
    },

    setCurrentDraggedPlace: (state, action: PayloadAction<number | null>) => {
      state.draggedPlaceID = action.payload;
    },
    changePlaceId: (state, action: PayloadAction<number>) => {
      const currentPlaceId = action.payload;

      if (state.draggedPlaceID && state.draggedPlaceID !== currentPlaceId) {
        const draggedPlace = state.places.find(
          (place) => place.id === state.draggedPlaceID
        );
        const currentPlace = state.places.find(
          (place) => place.id === currentPlaceId
        );

        if (draggedPlace && currentPlace) {
          draggedPlace.id = currentPlaceId;
          currentPlace.id = state.draggedPlaceID;
        }
      }
    },
  },
});

export const adressReducer = adressSlice.reducer;
export const adressActions = adressSlice.actions;
