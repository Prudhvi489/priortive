import { createSlice } from "@reduxjs/toolkit";
const initialState={busBookingDetails:'',reqBookDetailsForApi:''}
const BusBookDetails=createSlice({
    name:"getbooking detials bus",
    initialState,
    reducers:{
        ticketdetails(state,action){
            state.busBookingDetails=action.payload.busBookingDetails
            state.reqBookDetailsForApi=action.payload.reqBookDetailsForApi

        }
    }
})
export const busBookingDetailsAction=BusBookDetails.actions;
export default BusBookDetails