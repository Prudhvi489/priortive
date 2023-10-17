import { createSlice } from "@reduxjs/toolkit";
const initialState ={toursData:[],searchData:""}

const ToursSlice = createSlice({
    name:'toursData',
    initialState,
    reducers:{
        toursSearchData(state,action){
            state.toursData =action.payload.searchResult
            state.searchData =action.payload.searchData
        }
    }
})
export const ToursSliceAction = ToursSlice.actions
export default ToursSlice