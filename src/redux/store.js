import { configureStore } from '@reduxjs/toolkit';
import navReducer from './reducers/nav.reducer.js';

export default configureStore({
  reducer: {
    nav: navReducer,
  },
});