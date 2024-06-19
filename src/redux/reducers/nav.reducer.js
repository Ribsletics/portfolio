import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    selectedItem: null,
    location: null,
  },
  reducers: {
    selectItem: (state, action) => {
      state.selectedItem = action.payload
    },
    setLocation: (state, action) => {
      state.location = action.payload
    }
  },
})

export const { selectItem, setLocation } = navSlice.actions

export default navSlice.reducer