import { createSlice } from "@reduxjs/toolkit";
const initialState={hotebookreqdata:{},transactionid:''}
const HotelBookDetails=createSlice({
    name:"Hotelbookingrequest",
    initialState,
    reducers:{
        bookingrequest(state,action){
            state.hotebookreqdata=action.payload.bookdata;
            state.transactionid=action.payload.trasaction_id
        }
        
    }
})
export const HotelBookingDetailsActions=HotelBookDetails.actions;
export default HotelBookDetails