import { configureStore } from "@reduxjs/toolkit";
import { adressReducer } from "./slices/adress";

const store = configureStore({
  reducer: {
    adress: adressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
