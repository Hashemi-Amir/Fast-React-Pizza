import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.username = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { updateUser } = userSlice.actions;
