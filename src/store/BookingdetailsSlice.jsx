import { createSlice } from "@reduxjs/toolkit";
const initialState={bookingdetails:[]}
const BookingdetailsSlice=createSlice({
    name:"getbooking detials",
    initialState,
    reducers:{
        ticketdetails(state,action){
            state.bookingdetails.push(action.payload)
        }
    }
})
export const bookingdetailsaction=BookingdetailsSlice.actions;
export default BookingdetailsSlice