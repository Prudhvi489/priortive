import { createSlice } from '@reduxjs/toolkit'
const initialState={hotel_reviews:{}}

const Hotel_reviews_slice = createSlice({
    name:'Hotelreviews',
    initialState,
    reducers:{
            sethotelreviews(state,action){
                state.hotel_reviews=action.payload;
            }
    }
})
export const HotelreviewsActions = Hotel_reviews_slice.actions;
export default Hotel_reviews_slice;