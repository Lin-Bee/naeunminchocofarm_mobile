// import {createSlice, PayloadAction} from "@reduxjs/toolkit";
// import { RootState } from './store';

// //이게 auth_slice안에서 함께 관리되어야함

// interface Member {
//   id: number;
//   loginId: string;
//   name: string;
//   email: string;
//   tell: string;
// }
// export interface FarmBasicProps {
//   id: number;
//   uuidId: number;
//   uuid: string;
//   farmName: string;
//   farmAddr: string;
//   useDate: string;
//   crop: string;
//   status: string;
//   member: Member;
// }

// interface FarmList {
//   farms: FarmBasicProps[];
// }

// const initialState : FarmList= {
//   farms:[],
// }

// const farmSlice = createSlice({
//   name:"farm",
//   initialState,
//   reducers:{
//     setFarms(state,action:PayloadAction<FarmBasicProps[]>){
//       state.farms = action.payload;
//     }
//   }
// });

// //selector 함수
// export const farmsListSelector = (state:RootState)=> state.farm.farms;

// export const {setFarms} = farmSlice.actions;
// export default farmSlice;