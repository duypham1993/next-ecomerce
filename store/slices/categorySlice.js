import { publicRequest } from "@/share/axios/requestMethod";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get("category/client");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    treeCategories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL CATEGORIES
    builder.addCase(getCategories.pending, (state, aciton) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
      state.treeCategories = action.payload.treeCategories.children;
    });
    builder.addCase(getCategories.rejected, (state, aciton) => {
      state.isLoading = false;
    });
  },
});

export default categorySlice;
