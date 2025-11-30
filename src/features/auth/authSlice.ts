import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  username: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  token: null,
  username: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; username: string; userId: number | null }>
    ) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.token = null;
      state.username = null;
      state.userId = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
