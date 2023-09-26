import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface initProp {
  Winner: string
  addressOfContract: string
  WinnerIndex: null | number
}

const initialState: initProp = {
  Winner: "",
  addressOfContract: "",
  WinnerIndex: null,
}

const winnerSelcet = createSlice({
  name: "winnerSelcet",
  initialState,
  reducers: {
    setWinner: (state, action: PayloadAction<initProp>) => {
      state.Winner = action.payload.Winner
      state.addressOfContract = action.payload.addressOfContract
      state.WinnerIndex = action.payload.WinnerIndex
    },
  },
})

export const { setWinner } = winnerSelcet.actions

export default winnerSelcet.reducer
