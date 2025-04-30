import { createSlice } from "@reduxjs/toolkit";

// createSlice로 슬라이스 정의
const counterSlice = createSlice({
  name: "counter", 
  initialState : 5,
  reducers: {
    increase: (state) => {
      return state + 1
    },
    decrease: (state) => {
      return state - 1
    },
    handleCounter: (state, action) => {
      return state + action.payload;
    },
  },
});

// 액션 생성자 export
export const { increase, decrease, handleCounter } = counterSlice.actions;
// 리듀서만 export
export default counterSlice;
