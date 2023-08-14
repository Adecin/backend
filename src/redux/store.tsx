import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/redux/baseapi";

// stores
import ListFormer from "./reducer/farmer/list-former";

export const store = configureStore({
  reducer: {
    ListFormer: ListFormer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    );
  },
});

export const { dispatch } = store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
