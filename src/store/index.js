import { configureStore } from '@reduxjs/toolkit';
import requestsReducer from './slices/requestsSlice';
import dashboardReducer from './slices/dashboardSlice';
import configurationsReducer from './slices/configurationsSlice';
import authReducer from "./slices/authSlice";

// Root reducer with all our feature reducers
const rootReducer = {
  auth: authReducer,    
  requests: requestsReducer,
  dashboard: dashboardReducer,
  configurations: configurationsReducer,
  // Legacy reducer - keeping for backward compatibility
  app: (state = { initialized: false }, action) => {
    switch (action.type) {
      case 'APP_INITIALIZED':
        return { ...state, initialized: true };
      default:
        return state;
    }
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
