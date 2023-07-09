import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

const initialState = [];


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      return state = action.payload;
    },
    addItem : (state, action) => {
      state.push(action.payload);
    },
    removeItem : (state, action) => {
      return state.filter(data => data.product_id !== action.payload);
    },
    increment: (state, action) => {
      return state.forEach(data => {
        if(data.product_id === action.payload){
          data.product_quantity += 1;
        }
      });
    },
    decrement: (state, action) => {
      return state.forEach(data => {
        if(data.product_id === action.payload && data.product_quantity > 1){
          data.product_quantity -= 1;
        }
      });
    },
  },
})

export const { increment, decrement, setCart, addItem, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
