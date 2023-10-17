import { createSlice } from "@reduxjs/toolkit";
const initialState={hotelinfo:{},roominfo:  {} ,hotel_resultindex:0,hotel_code:0,checkin:"",checkout:''}
const Hotelroomslice=createSlice({
    name:"hotelroominfo",
    initialState,
    reducers:{
       hotel_info(state,action){
        state.hotelinfo=action.payload[0];
        state.hotel_resultindex=action.payload[1];
        state.hotel_code=action.payload[2];
       },
       room_info(state,action){
        // console.log(action.payload,"reduc roomd")
        state.roominfo=action.payload;
       },
       hotel_timings(state,action){
        state.checkin=action.payload[0];
        state.checkout=action.payload[1]
       }
       
    }
})
export const hotelroomActions = Hotelroomslice.actions;
export default Hotelroomslice;