import { createSlice } from "@reduxjs/toolkit";
const initialState={hotelresult:{},gmt_tbo_hotels:[],gmt_hotels_count:0,country:{id: 101, country_name: 'India', country_code: 'IN'},destination:{city_id:"130443",city_name: 'Delhi', country: 'India', country_code: 'IN   ', source_id: 130443, type: "1"},nationality:{id: 74, country_name: 'India', country_code: 'IN', code: '+91', country_flag: 'http://3.111.86.205/in.png'}}
const HotelDataslice=createSlice({
    name:"HotelData",
    initialState,
    reducers:{
        //if second element value in the array is 1 then it is initialsearch
        Hotel_data(state,action){
            if(action.payload[1]===1){
                state.hotelresult=action.payload[0];
            }
            else{
                state.hotelresult.Hotels=[...state.hotelresult.Hotels,...action.payload[0].Hotels]
            }
        },
        // tbo,gmt_hotel merged data
        merged_hotels(state,action){
            if(action.payload[1]===1){
                state.gmt_tbo_hotels=action.payload[0];
            }
            else{
                state.gmt_tbo_hotels=[...state.gmt_tbo_hotels,...action.payload[0]]
            }
        },
        // gmt_hotelscount
        gmt_hotel_count(state,action){
            state.gmt_hotels_count=action.payload;
        },
        country_data(state,action){
            state.country=action.payload;
        },
        destination_data(state,action){
            state.destination=action.payload;
        },
        nationality_data(state,action){
            state.nationality=action.payload;
        }
    }
})
export const hoteldataActions = HotelDataslice.actions;
export default HotelDataslice;