import { createSlice } from "@reduxjs/toolkit";
const initialState={guests:[{NoOfAdults:1,NoOfChild:0,ChildAge:[1,1]}]}
const GuestsSlice=createSlice({
    name:"Guestcount",
    initialState,
    reducers:{
        Guest_count(state,action){
            // console.log(action.payload[0],"ksajdlfjsjad")
            // state.adults=action.payload[0];
            // state.child=action.payload[1];
            state.guests=action.payload[0];
        }
    }
})
export const GuestsActions = GuestsSlice.actions;
export default GuestsSlice;