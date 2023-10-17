import { createSlice } from "@reduxjs/toolkit";
const initialState={profiledata:{}}
const Profileslice=createSlice({
    name:"Profile_data",
    initialState,
    reducers:{
        profiledata(state,action){
            state.profiledata=action.payload;
        }
    }
})
export const Profileactions = Profileslice.actions;
export default Profileslice;