import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../types'

type CartState = {
  items: Produto[]
  favorites: Produto[]
}

const initialState: CartState = {
  items: [],
  favorites: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Produto>) {
      const exists = state.items.find((p) => p.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
    toggleFavorite(state, action: PayloadAction<Produto>) {
      const exists = state.favorites.find((p) => p.id === action.payload.id)
      if (exists) {
        state.favorites = state.favorites.filter(
          (p) => p.id !== action.payload.id
        )
      } else {
        state.favorites.push(action.payload)
      }
    }
  }
})

export const { addItem, removeItem, clearCart, toggleFavorite } =
  cartSlice.actions
export default cartSlice.reducer
