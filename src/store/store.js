import { configureStore } from '@reduxjs/toolkit'
import  homeSlice  from './Homeslice'
export const store = configureStore({
  reducer: {
    home: homeSlice,
  },
})