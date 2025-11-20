import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//
// -----------------------------
// MOCK BACKEND TOKEN SYSTEM
// -----------------------------
//

// Simulate backend issuing tokens
const generateMockTokens = () => {
  return {
    accessToken: "mock-access-token-" + Date.now(),
    refreshToken: "mock-refresh-token-" + Date.now(),
    accessTokenExpiry: Date.now() + 1000 * 60 * 10, // 10 minute
    refreshTokenExpiry: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
  };
};

// === Simulated LOGIN API ===
const mockLogin = async ({ username, password }) => {
  await new Promise((res) => setTimeout(res, 600)); // delay

  if (username === "admin" && password === "admin123") {
    return {
      ...generateMockTokens(),
      user: { name: "Admin User", role: "admin" },
    };
  }

  throw new Error("Invalid username or password");
};

// === Simulated REFRESH TOKEN API ===
const mockRefreshToken = async (refreshToken) => {
  await new Promise((res) => setTimeout(res, 400)); // delay

  if (!refreshToken || !refreshToken.startsWith("mock-refresh-token")) {
    throw new Error("Invalid refresh token");
  }

  return {
    accessToken: "mock-access-token-" + Date.now(),
    accessTokenExpiry: Date.now() + 1000 * 60 * 10, // new 10-minute access token
  };
};

//
// -----------------------------
// THUNKS
// -----------------------------
//

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const result = await mockLogin({ username, password });
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// CHECK SESSION ON APP LOAD
export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = localStorage.getItem("authUser");
      const storedAccess = localStorage.getItem("accessToken");
      const storedRefresh = localStorage.getItem("refreshToken");
      const storedAccessExpiry = Number(localStorage.getItem("accessTokenExpiry"));
      const storedRefreshExpiry = Number(localStorage.getItem("refreshTokenExpiry"));

      if (!storedUser || !storedAccess || !storedRefresh)
        throw new Error("No session found");

      return {
        user: JSON.parse(storedUser),
        accessToken: storedAccess,
        refreshToken: storedRefresh,
        accessTokenExpiry: storedAccessExpiry,
        refreshTokenExpiry: storedRefreshExpiry,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// REFRESH TOKEN FLOW
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const result = await mockRefreshToken(refreshToken);
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//
// -----------------------------
// INITIAL STATE
// -----------------------------
//

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  accessTokenExpiry: null,
  refreshTokenExpiry: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

//
// -----------------------------
// SLICE
// -----------------------------
//

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiry = null;
      state.refreshTokenExpiry = null;
      state.isAuthenticated = false;

      localStorage.removeItem("authUser");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessTokenExpiry");
      localStorage.removeItem("refreshTokenExpiry");
    },
  },
  extraReducers: (builder) => {
    builder
      // -----------------------------
      // LOGIN
      // -----------------------------
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.accessTokenExpiry = action.payload.accessTokenExpiry;
        state.refreshTokenExpiry = action.payload.refreshTokenExpiry;

        state.isAuthenticated = true;

        // Persist to storage
        localStorage.setItem("authUser", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("accessTokenExpiry", action.payload.accessTokenExpiry);
        localStorage.setItem("refreshTokenExpiry", action.payload.refreshTokenExpiry);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // -----------------------------
      // CHECK SESSION
      // -----------------------------
      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.accessTokenExpiry = action.payload.accessTokenExpiry;
        state.refreshTokenExpiry = action.payload.refreshTokenExpiry;
        state.isAuthenticated = true;
      })
      .addCase(checkSession.rejected, (state) => {
        state.isAuthenticated = false;
      })

      // -----------------------------
      // REFRESH TOKEN
      // -----------------------------
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.accessTokenExpiry = action.payload.accessTokenExpiry;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("accessTokenExpiry", action.payload.accessTokenExpiry);
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
