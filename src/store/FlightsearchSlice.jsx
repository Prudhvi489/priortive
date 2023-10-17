import { createSlice } from "@reduxjs/toolkit";
// after dispatching the action we have to send the data in the formate of array
const initialState={Fsearcheddata:"",Flightsdata:[],multicitytripcount:2,waytype:1,Traceid:''}
const FlightsearchSlice=createSlice({
    name:'flightsearch',
    initialState,
    reducers:{
        // search data updated here
        Flights_search_dataupdate(state,action){
            const received_data=action.payload;
            // alert("Slice")
            // console.log(received_data)
            const data_length = received_data.length-1
            if(received_data[data_length]===1){
                // console.log("one way search")
                state.Fsearcheddata=received_data[0];
                state.Flightsdata=received_data[1];
                state.Traceid=received_data[2]
                state.waytype=received_data[3]
            }
            else if(received_data[data_length]===2){
                // console.log("Round trip")
                state.Fsearcheddata=received_data[0];
                state.Flightsdata=received_data[1];
                state.Traceid=received_data[2]
                state.waytype=received_data[3]
            }
            else if(received_data[data_length]===3){
                // console.log("multicity")
                state.Fsearcheddata=received_data[0];
                state.Flightsdata=received_data[1];
                state.Traceid=received_data[2]
                state.waytype=received_data[3]
            }
        },
        
        multicitycountupdate(state,action){
            state.multicitytripcount=action.payload
        }
    }
})
export const FlightsearchActions=FlightsearchSlice.actions;
export default FlightsearchSlice;