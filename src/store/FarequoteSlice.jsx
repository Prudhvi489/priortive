import { createSlice } from "@reduxjs/toolkit";
const initialState={fare:[]}
const FarequoteSlice=createSlice({
    name:"Farequote",
    initialState,
    reducers:{
        farequote_data(state,action){
            // console.log(action.payload)
            // alert(action.payload)
            state.fare.push(action.payload)
            // console.log(state.fare)
        },
        reset_farequote(state){
            state.fare=initialState.fare;
        }
    }
})
export const farequoteActions = FarequoteSlice.actions;
export default FarequoteSlice