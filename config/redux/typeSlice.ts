import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductTypes } from '../../entities'

export interface productState {
    productType: ProductTypes
}

const initialState: productState = {
    productType: "toilets",
}

export const counterSlice = createSlice({
    name: 'productType',
    initialState,
    reducers: {
        setType: (state, action: PayloadAction<string>) => {
            state.productType = action.payload as ProductTypes;
        },
    },
})


// Action creators are generated for each case reducer function
export const { setType } = counterSlice.actions

export default counterSlice.reducer