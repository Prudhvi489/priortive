import { createSlice } from "@reduxjs/toolkit";
const initialState ={userPayed:0,coupounPrice:0,adminFee:0,adminConv:[],coupoun:''}
const BusDiscountDetails=createSlice({
    name:"getbooking discount bus",
    initialState,
    reducers:{
        discountdetails(state,action){
            console.log(action.payload)
            state.userPayed=action.payload.userPayed
            state.coupounPrice=action.payload.coupounPrice
            state.adminFee=action.payload.adminFee
            state.adminConv=action.payload.adminConv
            state.coupoun=action.payload.coupoun

        }
    }
})
export const busDiscountDetailsAction=BusDiscountDetails.actions;
export default BusDiscountDetails