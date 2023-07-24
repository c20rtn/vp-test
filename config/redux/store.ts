import { configureStore } from '@reduxjs/toolkit'
import counterSliceReducer from './typeSlice'

export const store = configureStore({
    reducer: {
        productType: counterSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch