import { createSlice } from "@reduxjs/toolkit";
const initialState = {travellers:{adult:1,child:0,infant:0,classes:'2'}}
const TravellerclassSlice = createSlice({
    name:'travellerclass',
    initialState,
    reducers:{
        travellerclassupdate(state,action){
            // console.log(action.payload,"store")
           state.travellers=action.payload
        //    console.log(state.travellers)
        }
    }
})
export const TravellerclassActions = TravellerclassSlice.actions;
export default TravellerclassSlice;