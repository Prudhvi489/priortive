import { createSlice } from "@reduxjs/toolkit";
const initialState={userSearchedFor:"",busSearchResult:[],traceId:"",operatorSelected:''}
const BusSearchResultSlice=createSlice({
    name:'bussearch',
    initialState,
    reducers:{
        bussearchdata(state,action){
            state.userSearchedFor =action?.payload[0]
            state.busSearchResult =action?.payload[1]?.searchResultData
            state.traceId =action?.payload[2]
            state.operatorSelected =action?.payload[3]
        }
    }
})
export const BusSearchResultSliceActions=BusSearchResultSlice.actions;
export default BusSearchResultSlice;