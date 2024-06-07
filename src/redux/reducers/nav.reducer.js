import { createSlice } from '@reduxjs/toolkit';

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    selectedItem: null,
  },
  reducers: {
    selectItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { selectItem } = navSlice.actions;

export default navSlice.reducer;