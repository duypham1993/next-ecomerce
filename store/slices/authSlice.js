import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  getLocalCurrentUser,
  updateLocalAccessToken,
  updateLocalCurrentUser,
} from "@/services/localStorage";
import privateRequest, { publicRequest } from "@/share/axios/requestMethod";

export const register = createAsyncThunk(
  "register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("authClient/register", user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verify = createAsyncThunk(
  "verify",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await publicRequest.put(`/authClient/verify/${id}/${token}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("/authClient/login", user);
      updateLocalAccessToken(res.data.accessToken);
      updateLocalCurrentUser(res.data.currentUser);
      return res.data.currentUser;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithFacebook = createAsyncThunk(
  "login-with-facebook",
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get("authClient/facebook");
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const loginFacebookCallback = createAsyncThunk(
  "login-with-facebook/callback",
  async (code, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(
        `authClient/facebook/callback?code=${code}`
      );
      return res.data.currentUser;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "login-with-google",
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get("authClient/google");
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const loginGoogleCallback = createAsyncThunk(
  "login-with-google/callback",
  async (code, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(
        `authClient/google/callback?code=${code}`
      );
      updateLocalCurrentUser(res.data.currentUser);
      updateLocalAccessToken(res.data.accessToken);
      return res.data.currentUser;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("authClient/forgot-password", email);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkLinkResetPW = createAsyncThunk(
  "check-link",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(
        `authClient/check-link/${id}/${token}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "reset-password",
  async ({ id, token, password }, { rejectWithValue }) => {
    try {
      const res = await publicRequest.put(`authClient/reset/${id}/${token}`, {
        password: password,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const res = await privateRequest.put(`/customer/client/${id}`, user);
      updateLocalCurrentUser(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      await privateRequest.delete("authClient/logout");
      clearLocalStorage();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    currentUser: {},
  },
  reducers: {
    syncCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });

    // update
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });

    // logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.currentUser = {};
    });
  },
});

export const { syncCurrentUser } = authSlice.actions;

export default authSlice;
