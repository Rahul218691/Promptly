import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '@/types/auth';
import { LOCALSTORAGE_KEYS } from '../../lib/constants';

// Define the shape of your authentication state
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const getInitialAuthState = (): AuthState => {
    const storedAuth = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHENTICATED);
    const isAuthenticated = storedAuth === 'true'; 

    return {
        user: null,
        isAuthenticated: isAuthenticated,
    };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<{ user: User; auth: boolean }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.auth;
      window.localStorage.setItem(LOCALSTORAGE_KEYS.AUTHENTICATED, String(action.payload.auth));
    },
    clearAuthInfo: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      window.localStorage.removeItem(LOCALSTORAGE_KEYS.AUTHENTICATED);
    }
  },
});

export const { setAuthInfo, clearAuthInfo } = authSlice.actions;

export default authSlice.reducer;