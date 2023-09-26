import { configureStore } from "@reduxjs/toolkit"
import winnerSelcet from "./slices/winnerSelcet"

export const store = configureStore({
  reducer: {
    winner: winnerSelcet,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
