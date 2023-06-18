import filterReducer from "./slices/filterSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import addressSlice from "./slices/addressSlice";
import orderSlice from "./slices/orderSlice";

const rootReducer = combineReducers({
  filter: filterReducer,
  auth: authSlice.reducer,
  category: categorySlice.reducer,
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  address: addressSlice.reducer,
  order: orderSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
