import { configureStore,combineReducers } from "@reduxjs/toolkit";
import Loginslice from "./LoginSlice";
import TravellerclassSlice from "./TravellerclassSlice";
import FlightsearchSlice from "./FlightsearchSlice";
import FarequoteSlice from "./FarequoteSlice";
import BookingdetailsSlice from "./BookingdetailsSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import BusSearchResultSlice, { bussearchActions } from "./BusModuleSlices/BusSearchResultSlice";
import GuestsSlice from "./Hotelslices.jsx/GuestsSlice";
import HotelDataslice from "./Hotelslices.jsx/HotelDataslice";
import Hotelroomslice from "./Hotelslices.jsx/Hotelroomslice";
import BusBookDetails from "./BusModuleSlices/BusBookDetails";
import BusDiscountDetails from "./BusModuleSlices/BusDiscountDetails";
import Hotel_reviews_slice from "./Hotelslices.jsx/Hotel_reviews_slice";
import Profileslice from "./Signupslices/Profileslice";
import ToursSlice from "./ToursDataSlice/ToursDataSlice";
import HotelBookDetails from "./Hotelslices.jsx/HotelBookDetails";
import HotelDiscountDetails from "./Hotelslices.jsx/HotelDiscountDetails";
// import {persistStore} from "redux-persist";
const persistConfig = {
    key:"root",
    version:1,
    storage
}
const reducer = combineReducers({authentication:Loginslice.reducer,
    profile:Profileslice.reducer,
    travellerclass:TravellerclassSlice.reducer,
    flightsearches:FlightsearchSlice.reducer,
    farequote:FarequoteSlice.reducer,
    bookingdetails:BookingdetailsSlice.reducer,
    busessearch:BusSearchResultSlice.reducer,
    hotel_guestcount:GuestsSlice.reducer,
    hotel_data:HotelDataslice.reducer,
    hotel_room:Hotelroomslice.reducer,
    hotels_reviews:Hotel_reviews_slice.reducer,
    busBookDetails:BusBookDetails.reducer,
    busDiscountDetails:BusDiscountDetails.reducer,
    toursSearchData :ToursSlice.reducer,
    hotelBookDetails:HotelBookDetails.reducer,
    HotelDiscountDetails:HotelDiscountDetails.reducer,
})
    const persistedreducer = persistReducer(persistConfig,reducer)

const store = configureStore({
    reducer:persistedreducer
})
// const persistor=persistStore(store)
// export {persistor};
export default store;