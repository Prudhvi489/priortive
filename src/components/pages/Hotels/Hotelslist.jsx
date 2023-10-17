import {
  Container,
  Grid,
  Paper,
  ToggleButtonGroup,
  Slider,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  Rating,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  hotelfilters,
  hotels_list,
  hotelsearch,
  muitextfieldborder,
} from "../../../assets/styles/Hotelstyles";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import MapIcon from "@mui/icons-material/Map";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import calendermonth from "../../../assets/Hotelimages/calendericon.svg";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";
import Mapview from "../../modals/Hotelmodals/Mapview";
import Countriessearch from "../../modals/Hotelmodals/Countriessearch";
import Destinationstaticsearch from "../../modals/Hotelmodals/Destinationstaticsearch";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Guestrooms from "../../modals/Hotelmodals/Guestrooms";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { hotelroomActions } from "../../../store/Hotelslices.jsx/Hotelroomslice";
import { hoteldataActions } from "../../../store/Hotelslices.jsx/HotelDataslice";
import helperFunctions from "../../../helpers/helperFunctions";
import Loadingmodal from "../../modals/Signupmodals/Loadingmodal";
import backIcon from "../../../assets/images/backIcon.png";
import filterIcon from "../../../assets/images/filterIcon.svg";
import editIcon from "../../../assets/images/editIcon.svg";
import CloseIcon from "@mui/icons-material/Close";
import MySnackbar from "../../modals/Signupmodals/Snackbar";
import { HotelreviewsActions } from "../../../store/Hotelslices.jsx/Hotel_reviews_slice";
import { envdata } from '../../Envexports'
import Hotelhelpers from "../../../helpers/Hotelhelpers";
import {styles} from '../../../assets/styles/Styles_export'
const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  border: "none",
  borderRadius: "0.5rem",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#ffff!important",
    background:`${styles.app_color}!important`,
  },
}));
const useStyles = makeStyles({
  ellipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",

    display: "-webkit-box",
    "-webkit-line-clamp": 2, // Number of lines to show before truncating
    "-webkit-box-orient": "vertical",
    fontFamily: "Poppins!important", // Replace with your desired font family
    fontSize: "14px!important",
  },
});
//  price filter slider
const Priceslide = styled(Slider)({
  color: styles.app_color,
  height: 5,
  "& .MuiSlider-track": {
    border: "none",
    // background:'linear-gradient(180deg, #F23844 0%, #BC0000 100%)'
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: styles.app_color,
    border: `2px solid Currentcolor`,
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#fff",
    // background: `linear-gradient(180deg, #F23844 0%, #BC0000 100%)`,
    color: 'transparent',/* Set text color to transparent */
    backgroundClip: 'text', /* Standard syntax */
    fontSize: "12px",
    fontWeight: "600",
    padding: 0,
  },
});

const Hotelslist = () => {
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const hotel_styles = hotelfilters();
  // const border_styles=muitextfieldborder()
  const hotelslist_style = hotels_list();
  const classes = useStyles();
  const HotMainpg = hotelsearch();
  const inputborder = muitextfieldborder();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // states declaration
  const pagesize = 30;
  const [price, setPrice] = useState(1);
  const [priceslide, setPriceslide] = useState([500, 100000]);
  const [rating, setRating] = useState(0);
  const [aminities_more, setAminities_more] = useState(5);
  const [properties_more, setProperties_more] = useState(5);
  const [selected_aminities, setSelected_aminities] = useState([]);
  const [selected_properties, setSelected_properties] = useState([]);
  const [mapmodal, setMapmodal] = useState(false);
  const [countries, setCountries] = useState(false);
  const [destination_Search, setDestination_Search] = useState(false);
  const [country_selection, setCountry_selection] = useState({
    id: 101,
    country_name: "India",
    country_code: "IN",
  });
  const [pageSize, setPageSize] = useState(30)
  const [destination, setDestination] = useState({
    city_id: "130443",
    city_name: "Delhi",
    country: "India",
    country_code: "IN",
    source_id: 130443,
    type: "1",
  });
  const [guest_nationality, setGuest_nationality] = useState({
    id: 74,
    country_name: "India",
    country_code: "IN",
    code: "+91",
    country_flag: "http://3.111.86.205/in.png",
  });
  const [loadingmodal, setLoadingmodal] = useState(false);

  const [checkindate, setCheckindate] = useState(new Date());
  const [checkoutdate, setCheckoutdate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [guest_rooms, setGuest_rooms] = useState(false);
  const [hotel_search_type, setHotel_search_type] = useState(1);
  const [hotels_data, setHotels_data] = useState([]);
  const [hotelcodes, setHotelcodes] = useState([]);
  const [tbohotelcount, setTbohotelcount] = useState(0);
  const [gmthotelcount,setGmthotelcount]=useState(0)
  const [guests_state, setGuests_state] = useState([
    { NoOfAdults: 1, NoOfChild: 0, ChildAge: null },
  ]);
  const [metadata, setMetadata] = useState([]);
  const [page_number, setPage_number] = useState(2);
  const [apiCallInProgress, setApiCallInProgress] = useState(false);
  const [unique_aminity_ids, setUnique_aminity_ids] = useState([]);
  const [appliedfilters, setAppliedfilters] = useState({
    sortby: 1,
    pricerange: [0, 100000],
    star_hotel: 0,
    aminities: [],
    others: { isHalal: 0, isTopHotel: 0, isHotDeal: 0 },
  });
  const [userlocation, setUserlocation] = useState({
    lat: '',
    long: ''
  })
  const [aminities, setAminities] = useState([
    {
      id: 370,
      amenity_id: 8,
      amenity_name: "Bathtub only",
    },
    {
      id: 24,
      amenity_id: 10,
      amenity_name: "Bidet",
    },
    {
      id: 67,
      amenity_id: 12,
      amenity_name: "Cable TV service",
    },
    {
      id: 181,
      amenity_id: 13,
      amenity_name: "Ceiling fan",
    },
    {
      id: 58,
      amenity_id: 14,
      amenity_name: "Champagne service",
    },
    {
      id: 182,
      amenity_id: 15,
      amenity_name: "Coffee/tea maker",
    },
    {
      id: 119,
      amenity_id: 16,
      amenity_name: "Connecting/adjoining rooms available",
    },
    {
      id: 54,
      amenity_id: 20,
      amenity_name: "Daily housekeeping",
    },
    {
      id: 168,
      amenity_id: 22,
      amenity_name: "Deep soaking bathtub",
    },
    {
      id: 346,
      amenity_id: 23,
      amenity_name: "Designer toiletries",
    },
    {
      id: 7,
      amenity_id: 24,
      amenity_name: "Desk",
    },
    {
      id: 472,
      amenity_id: 25,
      amenity_name: "Dial-up Internet access (surcharge)",
    },
    {
      id: 165,
      amenity_id: 27,
      amenity_name: "Dishwasher",
    },
    {
      id: 441,
      amenity_id: 28,
      amenity_name: "Down comforter",
    },
    {
      id: 772,
      amenity_id: 29,
      amenity_name: "Dryer",
    },
    {
      id: 382,
      amenity_id: 31,
      amenity_name: "Egyptian-cotton sheets",
    },
    {
      id: 292,
      amenity_id: 33,
      amenity_name: "Espresso maker",
    },
    {
      id: 369,
      amenity_id: 36,
      amenity_name: "First-run movies",
    },
    {
      id: 68,
      amenity_id: 37,
      amenity_name: "Flat-panel TV",
    },
    {
      id: 57,
      amenity_id: 38,
      amenity_name: "Free bottled water",
    },
    {
      id: 160,
      amenity_id: 39,
      amenity_name: "Free cribs/infant beds",
    },
    {
      id: 349,
      amenity_id: 42,
      amenity_name: "Free local calls",
    },
    {
      id: 357,
      amenity_id: 44,
      amenity_name: "Free newspaper",
    },
    {
      id: 190,
      amenity_id: 45,
      amenity_name: "Free tea bags/instant coffee",
    },
    {
      id: 8,
      amenity_id: 46,
      amenity_name: "Free toiletries",
    },
    {
      id: 677,
      amenity_id: 47,
      amenity_name: "Free weekday newspaper",
    },
    {
      id: 71,
      amenity_id: 48,
      amenity_name: "Free WiFi",
    },
    {
      id: 379,
      amenity_id: 53,
      amenity_name: "Frette Italian sheets",
    },
    {
      id: 374,
      amenity_id: 55,
      amenity_name: "Furnished balcony",
    },
    {
      id: 551,
      amenity_id: 56,
      amenity_name: "Furnished balcony or patio",
    },
    {
      id: 764,
      amenity_id: 57,
      amenity_name: "Furnished lanai",
    },
    {
      id: 325,
      amenity_id: 58,
      amenity_name: "Furnished patio",
    },
    {
      id: 293,
      amenity_id: 60,
      amenity_name: "Hair dryer (on request)",
    },
    {
      id: 13,
      amenity_id: 62,
      amenity_name: "Heating",
    },
    {
      id: 646,
      amenity_id: 63,
      amenity_name: "Highchair",
    },
    {
      id: 446,
      amenity_id: 67,
      amenity_name: "Housekeeping (surcharge)",
    },
    {
      id: 297,
      amenity_id: 68,
      amenity_name: "Housekeeping on request",
    },
    {
      id: 178,
      amenity_id: 72,
      amenity_name: "Individually furnished",
    },
    {
      id: 502,
      amenity_id: 73,
      amenity_name: "In-room childcare (surcharge)",
    },
    {
      id: 457,
      amenity_id: 75,
      amenity_name: "In-room climate control (heating)",
    },
    {
      id: 468,
      amenity_id: 78,
      amenity_name: "In-room massage available",
    },
    {
      id: 60,
      amenity_id: 79,
      amenity_name: "In-room safe",
    },
    {
      id: 378,
      amenity_id: 80,
      amenity_name: "In-room safe (laptop compatible)",
    },
    {
      id: 554,
      amenity_id: 84,
      amenity_name: "iPod docking station",
    },
  ]);
  const [other_aminities, setOther_aminities] = useState([
    "isHalal",
    "isTopHotel",
    "isHotDeal",
  ]);
  const [selected_others, setSelected_others] = useState({
    isHalal: 0,
    isTopHotel: 0,
    isHotDeal: 0,
  });
  let guests = useSelector((state) => state.hotel_guestcount.guests);
  let merged_hotels=useSelector((state)=>state.hotel_data.gmt_tbo_hotels);
  let hotelresult = useSelector((state) => state.hotel_data.hotelresult);
  let gmt_hotels=useSelector((state)=>state.hotel_data.gmt_hotels_count);
  let selected_city = useSelector((state) => state.hotel_data.destination);
  let selected_country = useSelector((state) => state.hotel_data.country);
  let selected_nationality = useSelector(
    (state) => state.hotel_data.nationality
  );
  const serachpaperref=useRef(null);

  window.onload = function() {
    // reloading the page by calling the api
    handleSearch(1)
     };
  // console.log(selected_nationality,"selected from redux")
  const adults = guests.reduce((sum, item) => sum + item.NoOfAdults, 0);
  const child = guests.reduce((sum, item) => sum + item.NoOfChild, 0);
  const rooms = guests.length;
  // const aminities=["Swimming pool","Airport transfer","Gym/fitness","Internet","Car park","Non - Smoking","Garden","Sitout Area"]
  const properties = [
    "Hotel",
    "Resort",
    "Villas",
    "Inn",
    "Apartment",
    "Guest House",
    "Cottage",
    "Lodge",
  ];
  const getdestination = (value) => {
    setDestination(value);
  };
  useEffect(() => {
    setCheckindate(new Date(hotelresult.CheckInDate));
    setCheckoutdate(new Date(hotelresult.CheckOutDate));
    setCountry_selection(selected_country);
    setDestination(selected_city);
    setHotels_data(merged_hotels);
    setMetadata(hotelresult?.meta?.meta_data ?? "");
    setHotelcodes(hotelresult?.hotelCodes ?? []);
    setTbohotelcount(hotelresult.hotelCount);
    setGmthotelcount(gmt_hotels)
    setGuest_nationality(selected_nationality);
    setUnique_aminity_ids(hotelresult?.uniqueAmenityIds);
    setGuests_state(guests);
  }, [hotelresult, guests]);
  useEffect(() => {
    if ('geolocation' in navigator) {
      // If geolocation is available in the browser
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserlocation((prev) => ({ ...prev, lat: latitude, long: longitude }))
        },
        (error) => {
          console.error('Error getting geolocation:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  }, [])
  const handlehotelsearch = async () => {
    setAppliedfilters((prev) => ({
      ...prev,
      sortby: 1,
      pricerange: [0, 100000],
      star_hotel: 0,
      aminities: [],
      others: { isHalal: 0, isTopHotel: 0, isHotDeal: 0 },
    }));
    setPage_number(1);
    setSelected_aminities([]);
    await handleSearch(1);
  };
  // get room api calling
  const get_room_api = async (traceid, resultindex, hotelcode, categoryid,search_type) => {
    const roomres = await axios.post(`${envdata.baseurl}/getDedupeHotelRoom`, {
      TraceId: traceid,
      ResultIndex: resultindex,
      HotelCode: hotelcode,
      CategoryId: categoryid,
      searchType:search_type
    });
    return roomres;
  };
  // console.log(unique_aminity_ids,"uniquie aminijtied")
  // Get aminties
  const get_aminities = async () => {
    try {
      const res = await axios.post(`${envdata.baseurl}/getAmenities`, {
        specificAmenityIds: unique_aminity_ids,
      });
      const data = res.data;
      if (data.status) {
        setUnique_aminity_ids(data.data);
      } else {
        setSnackopen(true);
        setSnackmessage(data.message);
        // alert(data.message);
      }
    } catch (error) {
      setSnackopen(true);
      setSnackmessage(error);
      // alert(error);
    }
  };
  // handle map open
  const Handlemapopen = async () => {
    if (hotels_data.length > 0) {
      setMapmodal(true)
    }
    else {
      setSnackopen(true);
      setSnackmessage("No hotels found");
      // alert("No hotels found")
    }
  }
  const [searchobj,setSearchobj]=useState({})
   // gmthotels get hotel info
const get_gmt_hotelinfo=async()=>{
  try{
    const res=await axios.post(`${envdata.baseurl}/getDedupeHotelInfo`,{
      TraceId: "",
      ResultIndex:"",
      HotelCode: destination?.source_id,
      CategoryId: "",
      searchType:2
    })
    // console.log(res,"result")
    const data=res.data;
   if(res.data.status){     
    // setLoadingmodal(false)
    // dispatch(
    //   hoteldataActions.Hotel_data([
    //     {
    //       TraceId: "",
    //       CheckInDate: data.data.CheckInDate,
    //       CheckOutDate: data.data.CheckOutDate,
    //       NoOfRooms: data.data.NoOfRooms,
    //       RoomGuests: data.data.RoomGuests,
    //       Hotels: [data.data.HotelResult],
    //     },
    //     1,
    //   ])
    // );
    dispatch(
      hotelroomActions.hotel_info([
        {
          TraceId: " ",
          HotelDetails: data.data.HotelDetails,
        },
        0,
        data.data.HotelDetails.HotelCode,
      ])
    );
    dispatch(hotelroomActions.hotel_info([res.data.data,1,1]))
    const roomres = await axios.post(`${envdata.baseurl}/getDedupeHotelRoom`, {
      TraceId: "",
      ResultIndex: "",
      HotelCode: destination.source_id,
      CategoryId:"",
      searchType:2
    });
    // console.log(roomres.data,"roomresult")
    const roomsdata=roomres.data;
    if(roomsdata.status){
      // console.log(roomres?.data?.data,"roomdata")
      dispatch(hotelroomActions.room_info(roomres?.data?.data));
      setLoadingmodal(false);
          navigate(`/hotels/sel_hotel`);
    }
    else{
      setSnackopen(true);
      setSnackmessage(roomsdata?.message)
    }
   }
   else{
    setSnackopen(true);
    setSnackmessage(res.data.data?.message)
   }
  }
  catch(error){
    // alert(error)
  }
}
  //  search hotel/citywise
  // 1->type initial search
  // 2->filter search
  // 3->scroll search
  const handleSearch = async (type) => {
    let tbo_res;
    let gmt_res;
    if(type===1){
      setAppliedfilters({
        sortby: 1,
        pricerange: [0, 100000],
        star_hotel: 0,
        aminities: [],
        others: { isHalal: 0, isTopHotel: 0, isHotDeal: 0 },
      })
      setPrice(1)
      setPriceslide([500, 100000])
      setRating(0);
      setAminities_more(5);
      setProperties_more(5)
      setSelected_aminities([])
      setSelected_properties([])
    }
    const dates = await helperFunctions.checkoutdatechecking(
      checkindate,
      checkoutdate
    );
    if (dates) {
      setSnackopen(true);
      setSnackmessage("Check-out time should not be earlier than check-in time");
      return;
    }
    // setting applied fileters
    dispatch(hoteldataActions.country_data(country_selection));
    dispatch(hoteldataActions.destination_data(destination));
    setLoadingmodal(true);
    let hotel_search_obj;
    if (destination.type === "2"||destination.type==="3") {
      hotel_search_obj = {
        searchType: 2,
        pageSize: pageSize,
        pageNumber: 1,
        userId: localStorage.getItem("userid"),
        destination: destination,
        IsTBOMapped: "true",
        CheckInDate: helperFunctions.getapi_date(checkindate),
        NoOfNights: helperFunctions.nights_calc(checkindate, checkoutdate),
        CountryCode: destination.country_code, //"IN"
        CityId: destination?.city_id, //130443
        HotelCode: destination?.source_id, //1031621
        ResultCount: 0,
        PreferredCurrency: "INR",
        GuestNationality: guest_nationality?.country_code,
        NoOfRooms: rooms.toString(),
        RoomGuests: guests_state.map((guest) => {
          if (guest.NoOfChild === 0) {
            return {
              ...guest,
              ChildAge: [],
            };
          } else if (guest.NoOfChild === 1) {
            return {
              ...guest,
              ChildAge: guest.ChildAge.slice(0, -1),
            };
          }
          return guest;
        }),

        MaxRating: 5,
        MinRating: 0,
        ReviewScore: 0,
        IsNearBySearchAllowed: false,
      };
      if(destination.type==="3"){
        hotel_search_obj.searchType=3
        get_gmt_hotelinfo(hotel_search_obj);      
        return
      }
    } 
    else {
      hotel_search_obj = {
        searchType: 1,
        pageSize:
          hotels_data % page_number < pageSize
            ? pagesize + (hotels_data % page_number)
            : pagesize,
        pageNumber: type === 1 || type === 2 ? 1 : page_number,
        IsTBOMapped: "true",
        userId: localStorage.getItem("userid"),
        specificAmenityIds: type === 1 ? [] : appliedfilters.aminities,
        starRating: type === 1 ? 0 : appliedfilters.star_hotel,
        isTopHotel: type === 1 ? 0 : appliedfilters.others.isTopHotel,
        isHalal: type === 1 ? 0 : appliedfilters.others.isHalal,
        isHotDeal: type === 1 ? 0 : appliedfilters.others.isHotDeal,
        orderBy: type === 1 ? 1 : appliedfilters.sortby, //1 for lowest to highest vise versa
        minPrice: type === 1 ? 0 : appliedfilters.pricerange[0],
        maxPrice: type === 1 ? 100000 : appliedfilters.pricerange[1],
        destination: destination,
        hotelCodes: type === 1 ? [] : hotelcodes,
        CheckInDate: helperFunctions.getapi_date(checkindate),
        NoOfNights: helperFunctions.nights_calc(checkindate, checkoutdate),
        CountryCode: destination.country_code,
        [destination.type === "1" ? "CityId" : "HotelCode"]:
          destination?.source_id,
        ResultCount: 0,
        PreferredCurrency: "INR",
        GuestNationality: guest_nationality?.country_code,
        NoOfRooms: rooms.toString(),
        RoomGuests: guests_state.map((guest) => {
          if (guest.NoOfChild === 0) {
            return {
              ...guest,
              ChildAge: [],
            };
          } else if (guest.NoOfChild === 1) {
            return {
              ...guest,
              ChildAge: guest.ChildAge.slice(0, -1),
            };
          }
          return guest;
        }),
        MaxRating: 5,
        MinRating: 0,
        ReviewScore: 0,
        IsNearBySearchAllowed: false,
      };
      // setSearchobj(hotel_search_obj)
      // setLoadingmodal(false);
      // return;
    }
    try {
      if(type===1 ||type===2 ||(type===3 && hotelresult.Hotels.length < tbohotelcount )){
      tbo_res = await axios.post(
        `${envdata.baseurl}/ddgetHotelResult`,
        hotel_search_obj
      );
      }
      const data = tbo_res?.data;
      hotel_search_obj.searchType=3
      if(type===1 || type===2 || (type===3 && hotels_data.length-hotelresult.Hotels.length<parseInt(gmthotelcount))){
        gmt_res=await axios.post(`${envdata.baseurl}/ddgetHotelResult`,hotel_search_obj)
      }
      const gmt_data=gmt_res?.data
      // console.log((data?.status || gmt_data?.status )&& (destination.type === "1"),"lsdlfjk")
      // return;

      if ((data?.status || gmt_data?.status )&& (destination.type === "1")) {
        if (type === 1) {
          await get_aminities();
        }
        setPage_number((prev) => prev + 1);
        // console.log(gmt_data?.status===undefined,"gmt status")
        // setLoadingmodal(false);
        // return;
        // const sorted_hotels=await Hotelhelpers.sorting_tbo_gmt(
        //   (data?.status && (gmt_data.status===0 || gmt_data?.status===undefined))&&[...]
        //   ,1)
        const sorted_hotels=await Hotelhelpers.sorting_tbo_gmt(
          (data?.status&&gmt_data?.status)?[...data.data.Hotels,...gmt_data.data.Hotels]:
          (data?.status&&(gmt_data?.status===undefined || gmt_data?.status===0))?[...data.data?.Hotels]:
          (gmt_data?.status&&(data?.status===undefined||data?.status===0))&&[...gmt_data.data.Hotels],appliedfilters.sortby
        )
        // const sorted_hotels=await Hotelhelpers.sorting_tbo_gmt((gmt_data?.status===1 && data?.status)?[...data?.data?.Hotels,...gmt_data?.data.Hotels]:(data.status&&gmt_data.status===0)?[...data.data.Hotels]:(data.status===0&&gmt_data.status)&&[...gmt_data.data.Hotels],price)
        data.status&&dispatch(
          hoteldataActions.Hotel_data([
            data.data,
            type === 1 || type === 2 ? 1 : page_number,
          ])
        );
        (gmt_data?.status||data?.status)&&dispatch(hoteldataActions.merged_hotels([sorted_hotels, type === 1 || type === 2 ? 1 : page_number]))
        gmt_data?.status&&dispatch(hoteldataActions.gmt_hotel_count(gmt_data.status?gmt_data.data.hotelCount:0))
        setLoadingmodal(false);
        if(type===2){
          serachpaperref.current.scrollIntoView({ behavior: "smooth" })
          // window.scrollTo(0, 0);
        }
        if(sorted_hotels.length>0){
          navigate(`${location.pathname}`);
        }
      } else if (data.status && destination.type === "2") {
        dispatch(
          hoteldataActions.Hotel_data([
            {
              TraceId: data.data.TraceId,
              CheckInDate: data.data.CheckInDate,
              CheckOutDate: data.data.CheckOutDate,
              NoOfRooms: data.data.NoOfRooms,
              RoomGuests: data.data.RoomGuests,
              Hotels: [data.data.HotelResult],
            },
            1,
          ])
        );
        dispatch(
          hotelroomActions.hotel_info([
            {
              TraceId: data.data.TraceId,
              HotelDetails: data.data.HotelDetails,
            },
            data.data.HotelResult.ResultIndex,
            data.data.HotelResult.HotelCode,
          ])
        );
        const roomres = await get_room_api(
          data.data.TraceId,
          data.data.HotelResult.ResultIndex,
          data.data.HotelResult.HotelCode,
          data.data.HotelResult.SupplierHotelCodes[0].CategoryId,
          2
        );
        if (roomres.data.status) {
          dispatch(hotelroomActions.room_info(roomres.data.data));
          setLoadingmodal(false);
          navigate(`/hotels/sel_hotel`);
        } else {
          setSnackopen(true);
          setSnackmessage(roomres.data.message);
          // alert(roomres.data.message);
          setLoadingmodal(false);
        }
      } 
      else {
        setLoadingmodal(false);
        setSnackopen(true);
        setSnackmessage("data not found");
      }
    } catch (error) {
      setSnackopen(true);
      setSnackmessage(error);
      setLoadingmodal(false);
    }
  };
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    handleSearch(2);
  }, [appliedfilters]);
  // Apply hotel filters
  const Applyhotelfilter = async () => {
    setAminities_more(5);
    setAppliedfilters((prev) => ({
      ...prev,
      sortby: price,
      pricerange: priceslide,
      star_hotel: rating,
      aminities: selected_aminities,
      others: {
        isHalal: selected_others.isHalal,
        isHotDeal: selected_others.isHotDeal,
        isTopHotel: selected_others.isTopHotel,
      },
    }));
  };
  const Hotelfrom_map = (data) => {
    bookhotel(data);
  };
  //  callback country selection
  const country_Selection = (selected_country) => {
    setCountry_selection(selected_country);
  };
  // functions
  const handlepricefilter = (event, price) => {
    if (price !== null) {
      setPrice(price);
    }
  };
  const handle_price_change = (event, price) => {
    if (price[1] - price[0] < 5000) {
      return;
    } else {
      setPriceslide(price);
    }
    console.log(price);
  };
  const ratingchange = (event, rating) => {
    if (rating !== null) {
      setRating(rating);
    }
  };
  const valueLabelFormat = (value) => {
    // if(value>=10000){
    //   return `${value}+`
    // }
    // else{
    return `${value}`;
    // }
  };
  //  view more,less funtionality
  const handlemore = () => {
    let aminitieslen = aminities.length;
    if (aminities_more === aminitieslen) {
      setAminities_more(5);
    } else {
      setAminities_more(aminitieslen);
    }
  };
  // aminities selcted
  const select_aminities = (index) => {
    console.log(index, "aminityidd");
    const aminity_btn = document.getElementById(`${index}`);
    // let aminity=aminities[index];
    // selected_aminities.indexOf(aminity)===-1
    if (!selected_aminities.includes(index)) {
      setSelected_aminities((prev) => [...prev, index]);
      aminity_btn.style = `color:#fff; background:${styles.app_color}`;
    } else {
      const updated_aminities = selected_aminities.filter(
        (aminitie) => aminitie !== index
      );
      setSelected_aminities([...updated_aminities]);
      aminity_btn.removeAttribute("style");
    }
  };
  //  aminities buttons
  const aminities_filter = (
    <Grid container spacing={1.5}>
      {aminities.map((aminitie, aminity_index) => {
        return (
          <>
            {" "}
            {aminity_index <= aminities_more && (
              <Grid item>
                <button
                  className={hotel_styles.aminitiesbtn}
                  id={`${aminitie.amenity_id}`}
                  onClick={() => select_aminities(aminitie.amenity_id)}
                >
                  {aminitie.amenity_name}
                </button>
              </Grid>
            )}
          </>
        );
      })}

      <Grid item>
        <button className={hotel_styles.morebtn} onClick={handlemore}>
          {aminities_more === aminities.length ? "Less" : "More..."}
        </button>
      </Grid>
    </Grid>
  );
  //  properties more&less funtionality
  const handle_propertiesmore = () => {
    let propertieslen = properties.length;
    if (properties_more === propertieslen) {
      setProperties_more(5);
    } else {
      setProperties_more(propertieslen);
    }
  };
  // properties selection
  const select_properties = (index) => {
    const property_btn = document.getElementById(`${index}_prop`);
    let property = properties[index];
    if (selected_properties.indexOf(property) === -1) {
      setSelected_properties((prev) => [...prev, property]);
      property_btn.style = `color:#fff; background:${styles.app_color}`;
    } else {
      const updated_properties = selected_properties.filter(
        (each_property) => each_property !== property
      );
      setSelected_properties([...updated_properties]);
      property_btn.removeAttribute("style");
    }
  };
  // properties buttons
  // const properties_btns=<Grid container spacing={1}>
  //     {
  //       properties.map((property,property_index)=>{
  //         return(
  //           <>
  //           {
  //             property_index<=properties_more&&
  //             <Grid item><button className={hotel_styles.aminitiesbtn} onClick={()=>select_properties(property_index)} id={`${property_index}_prop`}>{property}</button></Grid>
  //           }
  //           </>
  //         )
  //       })
  //     }
  //   <Grid item ><button className={hotel_styles.morebtn} onClick={handle_propertiesmore}>{properties_more===properties.length?"Less":"More..."}</button></Grid>
  // </Grid>
  const select_others = (index) => {
    const other_btn = document.getElementById(`${index}`);

    if (selected_others[index] === 0) {
      setSelected_others((prev) => ({ ...prev, [index]: 1 }));
      other_btn.style = `color:#fff; background:${styles.app_color}`;
    } else {
      setSelected_others((prev) => ({ ...prev, [index]: 0 }));
      other_btn.removeAttribute("style");
    }
  };
  const others_btns = (
    <Grid container spacing={1}>
      {other_aminities.map((other, other_index) => {
        return (
          <>
            {other_index <= 5 && (
              <Grid item>
                <button
                  className={hotel_styles.aminitiesbtn}
                  onClick={() => select_others(other)}
                  id={other}
                  name={other}
                >
                  {other}
                </button>
              </Grid>
            )}
          </>
        );
      })}
      {/* <Grid item ><button className={hotel_styles.morebtn} onClick={handle_propertiesmore}>{properties_more===properties.length?"Less":"More..."}</button></Grid> */}
    </Grid>
  );
  const placeholderStyle = {
    color: "red",
    opacity: "0.5",
  };
  // Hotelinfo,room api calling
  const bookhotel = async (hoteldata) => {
    try {
      setLoadingmodal(true);
      dispatch(hotelroomActions.hotel_timings([hoteldata.policy.CheckInTime, hoteldata.policy.CheckOutTime]))
     let obj;
      if(hoteldata?.type===undefined){
       obj = metadata.find(
        (item) => item.HotelCode === hoteldata.hotel_code.toString()
      );
     }
        const res = await axios.post(`${envdata.baseurl}/getDedupeHotelInfo`, {
        TraceId:hoteldata?.type===undefined? hotelresult?.meta?.token:'',
        ResultIndex: hoteldata?.type===undefined?obj?.ResultIndex:'',
        HotelCode: hoteldata?.type===undefined?obj?.HotelCode:hoteldata?.hotel_code,
        CategoryId:hoteldata?.type===undefined? hoteldata.supplier_hotel_codes[0].CategoryId:'',
        searchType:hoteldata?.type===undefined?1:2,
        userId: localStorage.getItem("userid"),
        destination: destination
      });
      
      if (res.data.status) {
        const hotel_data=res.data;
        dispatch(
          hotelroomActions.hotel_info([
            res.data.data,
            hoteldata?.type===undefined?hoteldata?.result_index:0,
            hoteldata?.type===undefined?hoteldata?.hotel_code:hotel_data?.data.HotelDetails.HotelCode,
          ])
        );
        // setLoadingmodal(false)
        // console.log(obj,"object")
        // return
        const roomres = await get_room_api(
          hoteldata?.type===undefined? hotelresult?.meta?.token:'',
          hoteldata?.type===undefined?obj?.ResultIndex:'',
          hoteldata?.type===undefined?obj?.HotelCode:hoteldata?.hotel_code,
          hoteldata?.type===undefined? hoteldata.supplier_hotel_codes[0].CategoryId:'',
          hoteldata?.type===undefined?1:2
        );
        if (roomres.data.status) {
          
          dispatch(hotelroomActions.room_info(roomres.data.data));
          // get hotel reviews
          const review_res = await axios.post(`${envdata.baseurl}/getHotelReview`, { "hotel_code":hoteldata?.type===undefined?obj.HotelCode:hoteldata?.hotel_code})
          if (review_res.data.status) {
            dispatch(HotelreviewsActions.sethotelreviews(review_res.data.data))
          }
          else {
            dispatch(HotelreviewsActions.sethotelreviews([]))
          }
          setLoadingmodal(false);
          navigate(`/${location.pathname.split("/")[1]}/sel_hotel`);
        } else {
          setSnackopen(true);
          setSnackmessage(roomres.data?.data?.message);
          // alert(roomres.data?.data?.message);
          setLoadingmodal(false);
        }
      } else {
        setSnackopen(true);
        setSnackmessage(res.data?.data?.message);
        // alert(res.data?.data?.message);
        setLoadingmodal(false);
      }
    } catch (error) {
      setSnackopen(true);
      setSnackmessage(error);
      setLoadingmodal(false);
    }

    // navigate(`/${location.pathname.split("/")[1]}/sel_hotel`)
  };

  // responsive dialog
  const [searchOpen, setSearchOpen] = useState(false);
  function searchClose() {
    setSearchOpen(false);
  }
  const [filterOpen, setfilterOpen] = useState(false);
  function filterClose() {
    setfilterOpen(false);
  }
  const handleScroll = async (event) => {
    const element = event.target;
    const scrollTolerance = 10; // Tolerance value for scroll calculation
    const scrollDifference =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    if (
      scrollDifference <= scrollTolerance &&
      (hotelresult.Hotels.length < tbohotelcount || hotels_data.length-hotelresult.Hotels.length<gmthotelcount)
    ) {
      if (!apiCallInProgress) {
        setApiCallInProgress(true); // Set flag to indicate API call is in progress
        // scrolling type->3
        await handleSearch(3); // Wait for the API call to complete

        setApiCallInProgress(false); // Reset flag after API call is completed
      }
    }
  };
  // sort by div height
  const sortHeight = useRef();
  const [applyHeight, setApplyHeight] = useState();
  useEffect(() => {
    function handleSize() {
      if (sortHeight.current) {
        setApplyHeight(sortHeight.current.clientHeight);
      }
    }
    if (sortHeight.current) {
      setApplyHeight(sortHeight.current.clientHeight);
    }
    window.addEventListener('resize', handleSize);
    window.addEventListener('load', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
      window.addEventListener('load', handleSize);
    };
  }, []);
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Loadingmodal
        open={loadingmodal}
        loadingclose={() => setLoadingmodal(false)}
      />
      <Mapview
        mapopen={mapmodal}
        mapclose={() => setMapmodal(false)}
        handlemapbook={Hotelfrom_map}
      />
      <Guestrooms open={guest_rooms} close={() => setGuest_rooms(false)} guestsdata={guests} />
      <Countriessearch
        open={countries}
        close={() => setCountries(false)}
        country={country_Selection}
      />
      <Destinationstaticsearch
        open={destination_Search}
        onclose={() => setDestination_Search(false)}
        destination_type={getdestination}
        search_data={{
          CountryCode: country_selection.country_code,
          SearchType: hotel_search_type,
        }}
        left={20}
      />

      {/* responsive dialog's */}
      {/* search dialog */}
      {searchOpen && (
        <Dialog open={searchOpen} onClose={searchClose}>
          <DialogTitle sx={{ padding: "0.5rem" }}>
            <Grid sx={{ float: "right" }}>
              <IconButton
                sx={{ background: "red", color: "white", padding: "0px" }}
                onClick={searchClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <Paper>
            {/* Hotel search inputs */}
            <Grid
              item
              container
              pt={3}
              pb={4}
              pl={3}
              pr={3}
              //textAlign={'center'}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
            >
              {/* <Grid item md={2.2} >
                      <TextField 
                      fullWidth
                      autoComplete="off"
                      size="small"
                      label={<span style={{paddingRight:'0.3rem'}}>Country
                      </span>}
                  value={`${country_selection.country_name},${country_selection.country_code}`}
                  className={inputborder.root}
                      InputLabelProps={{
                        style: {
                          color:  styles.app_color,
                          fontFamily:'Poppins'
                        },
                      }}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LanguageSharpIcon sx={{color: styles.app_color}}/>
                          </InputAdornment>
                        ),
                      }}
                      onClick={()=> setCountries(true)}
                     /></Grid> */}
              <Grid item md={4}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  size="small"
                  label={
                    <span style={{ paddingRight: "0.9rem" }}>
                      Enter city name, location
                    </span>
                  }
                  value={`${destination.type === "1"
                    ? destination.city_name + "," + destination.country
                    : destination.hotel_name + "," + destination.city_name
                    }`}
                  className={inputborder.root}
                  InputLabelProps={{
                    style: {
                      color:  styles.app_color,
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FmdGoodSharpIcon sx={{ color:styles.app_color }} />
                      </InputAdornment>
                    ),
                  }}
                  onClick={() => setDestination_Search(true)}
                />
              </Grid>
              <Grid item md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="MMM dd yyyy"
                    //  disabled={disableCalendar}
                    sx={{
                      "& .MuiPickersToolbar-penIconButton": {
                        display: "none",
                      },
                    }}
                    closeOnSelect
                    disablePast
                    //  inputRef={busDateSelectRef}
                    label="Date"
                    value={checkindate}
                    onChange={(newValue) => {
                      console.log(newValue, "vale");
                      setCheckindate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        //  id="dateInputTag"
                        sx={{ minWidth: "90px" }}
                        // size="small"
                        {...params}
                        fullWidth
                        autoComplete="off"
                        size="small"
                        label={
                          <span style={{ paddingRight: "0.5rem" }}>
                            Check-In
                          </span>
                        }
                        // value=""
                        className={`${inputborder.root}`}
                        InputLabelProps={{
                          style: {
                            color:styles.app_color,
                            fontFamily: "Poppins",
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
                              <img
                                src={calendermonth}
                                alt="caleder"
                                width="27"
                                height="100"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="MMM dd yyyy"
                    //  disabled={disableCalendar}
                    sx={{
                      "& .MuiPickersToolbar-penIconButton": {
                        display: "none",
                      },
                    }}
                    closeOnSelect
                    disablePast
                    //  inputRef={busDateSelectRef}
                    label="Date"
                    value={checkoutdate}
                    onChange={(newValue) => {
                      console.log(newValue, "vale");
                      setCheckoutdate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        //  id="dateInputTag"
                        sx={{ minWidth: "90px" }}
                        // size="small"
                        {...params}
                        fullWidth
                        autoComplete="off"
                        size="small"
                        label={
                          <span style={{ paddingRight: "0.5rem" }}>
                            Check-Out
                          </span>
                        }
                        // value=""
                        className={`${inputborder.root}`}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                            fontFamily: "Poppins",
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={calendermonth}
                                alt="caleder"
                                width="27"
                                height="100"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={2.5}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  size="small"
                  label={
                    <span style={{ paddingRight: "0.5rem" }}>
                      Guest and Room
                    </span>
                  }
                  value={`${rooms}Rooms,${adults + child}Guests`}
                  onClick={() => setGuest_rooms(true)}
                  className={inputborder.root}
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color:  styles.app_color}} />
                        {/* <img src={calendermonth} alt="caleder" width="27" height="100"/> */}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={1.5}>
                <button
                  style={{
                    width: "100%",
                    height: "41.23px",
                    backgroundColor: styles.app_color,
                    fontSize: "16px",
                    color: "#fff",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "0.5rem",
                  }}
                  onClick={handlehotelsearch}
                >
                  Search
                </button>
              </Grid>
            </Grid>
          </Paper>
        </Dialog>
      )}
      {/* filter dialog */}
      {filterOpen && (
        <Dialog open={filterOpen} onClose={filterClose}>
          <DialogTitle sx={{ padding: "0.5rem", paddingBottom: "0rem" }}>
            <Grid sx={{ float: "right" }}>
              <IconButton
                sx={{ background: "red", color: "white", padding: "0px" }}
                onClick={filterClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <Paper sx={{ padding: "1rem", paddingTop: "0rem" }}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <span className={hotel_styles.filter_names}>Sort By</span>
              </Grid>
              <Grid item>
                <ToggleButtonGroup
                  value={price}
                  onChange={handlepricefilter}
                  exclusive
                  disableRipple
                  size="small"
                >
                  <ToggleButton value={1} className={hotel_styles.pricebtn}>
                    Lowest Price
                  </ToggleButton>
                  <ToggleButton
                    value={0}
                    className={hotel_styles.pricebtn}
                    sx={{ marginLeft: "1rem!important" }}
                  >
                    Highest Price
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid container direction="column" spacing={3} mt={0.1}>
              <Grid item>
                <span className={hotel_styles.filter_names}>
                  Price Range Per Night{" "}
                </span>
              </Grid>
              <Grid item>
                <Grid padding={'0rem 1rem'}>
                  <Priceslide
                    value={priceslide}
                    valueLabelDisplay="on"
                    aria-label="price slider"
                    onChange={handle_price_change}
                    valueLabelFormat={valueLabelFormat}
                    min={500}
                    step={500}
                    max={100000}
                    disableSwap
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" spacing={1} mt={1}>
              <Grid item>
                <span className={hotel_styles.filter_names}>Star Rating</span>
              </Grid>
              <Grid item>
                <ToggleButtonGroup
                  value={rating}
                  onChange={ratingchange}
                  exclusive
                  disableRipple
                  size="small"
                  sx={{ width: "100%", justifyContent: "space-between" }}
                >
                  <ToggleButton value={5} className={hotel_styles.ratingbtn}>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                    >
                      <StarIcon sx={{ fontSize: "large" }} />
                      <span>5</span>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton
                    value={4}
                    className={hotel_styles.ratingbtn}
                    sx={{ marginLeft: "0.3rem!important" }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                    >
                      <StarIcon sx={{ fontSize: "large" }} />
                      <span>4</span>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton
                    value={3}
                    className={hotel_styles.ratingbtn}
                    sx={{ marginLeft: "0.3rem!important" }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                    >
                      <StarIcon sx={{ fontSize: "large" }} />
                      <span>3</span>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton
                    value={2}
                    className={hotel_styles.ratingbtn}
                    sx={{ marginLeft: "0.3rem!important" }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                    >
                      <StarIcon sx={{ fontSize: "large" }} />
                      <span>2</span>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton
                    value={1}
                    className={hotel_styles.ratingbtn}
                    sx={{ marginLeft: "0.3rem!important" }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                    >
                      <StarIcon sx={{ fontSize: "large" }} />
                      <span>1</span>
                    </Stack>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid container direction="column" spacing={1} mt={1}>
              <Grid item>
                <span className={hotel_styles.filter_names}>Amenities</span>
              </Grid>
              <Grid item>{aminities_filter}</Grid>
            </Grid>
            {/* <Grid container direction="column" spacing={1} mt={1}>
                          <Grid item><span className={hotel_styles.filter_names}>Property Type</span></Grid>
                          <Grid item>{properties_btns}</Grid>
                        </Grid> */}
            <Grid container direction="column" spacing={1} mt={1}>
              <Grid item>
                <span className={hotel_styles.filter_names}>Others</span>
              </Grid>
              <Grid item>{others_btns}</Grid>
            </Grid>
            <Grid mt={5} textAlign={"center"}>
              <Button
                className="filter_apply"
                onClick={() => {
                  Applyhotelfilter();
                }}
              >
                Apply
              </Button>
            </Grid>
          </Paper>
        </Dialog>
      )}

      {/* search grid responsive */}
      <Container maxWidth="xl" sx={{ display: { xs: "block", md: "none" } }}>
        <Grid container pt={3} alignItems={"center"}>
          {/* back icon */}
          <Grid item xs={1} textAlign={"left"}>
            <IconButton
              className="back_arrow_icon"
              onClick={() => navigate(-1)}
            >
              <img src={backIcon} alt="backIcon" />
            </IconButton>
          </Grid>
          {/* hotel details */}
          <Grid item xs={10}>
            <Grid
              container
              justifyContent={"space-between"}
              className="res_details"
              p={2}
              alignItems={"center"}
            >
              <Grid item xs={11}>
                <Grid className="city_title">{`${destination.type === "1"
                  ? destination.city_name + "," + destination.country
                  : destination.hotel_name + "," + destination.city_name
                  }`}</Grid>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => setSearchOpen(true)}>
                  <img src={editIcon} alt="editIcon" />
                </IconButton>
              </Grid>
              <span className="res_details_type">{"Hotels"}</span>
            </Grid>
          </Grid>
          {/* filter icon */}
          <Grid item xs={1} textAlign={"right"}>
            <IconButton onClick={() => setfilterOpen(true)}>
              <img src={filterIcon} alt="filterIcon" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      {/* floating button responsive */}
      <Grid
        sx={{
          display: { md: "none", xs: "block" },
          position: "fixed",
          bottom: "4%",
          right: "5%",
        }}
      >
        <Button
          disableRipple
          className={hotelslist_style.mapsbtn}
          startIcon={<MapIcon />}
          onClick={() => setMapmodal(true)}
        >
          Map View
        </Button>
      </Grid>

      {/* Main body */}
      {/* {JSON.stringify(searchobj,2,null)} */}
      <Container maxWidth="xl" ref={serachpaperref}>
        <Grid item pt={5} sx={{ display: { xs: "none", md: "block" } }}>
          <Paper className={HotMainpg.searchpaper}>
            {/* Hotel search inputs */}
            <Grid
              item
              container
              pt={3}
              pb={4}
              pl={3}
              pr={3}
              //textAlign={'center'}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
            >
              {/* <Grid item md={2.2} >
                      <TextField 
                      fullWidth
                      autoComplete="off"
                      size="small"
                      label={<span style={{paddingRight:'0.3rem'}}>Country
                      </span>}
                  value={`${country_selection.country_name},${country_selection.country_code}`}
                  className={inputborder.root}
                      InputLabelProps={{
                        style: {
                          color:  styles.app_color,
                          fontFamily:'Poppins'
                        },
                      }}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LanguageSharpIcon sx={{color: styles.app_color}}/>
                          </InputAdornment>
                        ),
                      }}
                      onClick={()=> setCountries(true)}
                     /></Grid> */}
              <Grid item md={4}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  size="small"
                  label={
                    <span style={{ paddingRight: "0.9rem" }}>
                      Enter city name, location
                    </span>
                  }
                  value={`${destination.type === "1"
                    ? destination.city_name + "," + destination.country
                    : destination.hotel_name + "," + destination.city_name
                    }`}
                  className={inputborder.root}
                  InputLabelProps={{
                    style: {
                      color:  styles.app_color,
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FmdGoodSharpIcon sx={{ color: '#F23844' }} />
                      </InputAdornment>
                    ),
                  }}
                  onClick={() => setDestination_Search(true)}
                />
              </Grid>
              <Grid item md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="MMM dd yyyy"
                    //  disabled={disableCalendar}
                    sx={{
                      "& .MuiPickersToolbar-penIconButton": {
                        display: "none",
                      },
                    }}
                    closeOnSelect
                    disablePast
                    //  inputRef={busDateSelectRef}
                    label="Date"
                    value={checkindate}
                    onChange={(newValue) => {
                      console.log(newValue, "vale");
                      setCheckindate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        //  id="dateInputTag"
                        sx={{ minWidth: "90px" }}
                        // size="small"
                        {...params}
                        fullWidth
                        autoComplete="off"
                        size="small"
                        label={
                          <span style={{ paddingRight: "0.5rem" }}>
                            Check-In
                          </span>
                        }
                        // value=""
                        className={`${inputborder.root}`}
                        InputLabelProps={{
                          style: {
                            color:styles.app_color,
                            fontFamily: "Poppins",
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
                              <img
                                src={calendermonth}
                                alt="caleder"
                                width="27"
                                height="100"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="MMM dd yyyy"
                    //  disabled={disableCalendar}
                    sx={{
                      "& .MuiPickersToolbar-penIconButton": {
                        display: "none",
                      },
                    }}
                    closeOnSelect
                    disablePast
                    //  inputRef={busDateSelectRef}
                    label="Date"
                    value={checkoutdate}
                    onChange={(newValue) => {
                      console.log(newValue, "vale");
                      setCheckoutdate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        //  id="dateInputTag"
                        sx={{ minWidth: "90px" }}
                        // size="small"
                        {...params}
                        fullWidth
                        autoComplete="off"
                        size="small"
                        label={
                          <span style={{ paddingRight: "0.5rem" }}>
                            Check-Out
                          </span>
                        }
                        // value=""
                        className={`${inputborder.root}`}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                            fontFamily: "Poppins",
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={calendermonth}
                                alt="caleder"
                                width="27"
                                height="100"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={2.5}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  size="small"
                  label={
                    <span style={{ paddingRight: "0.5rem" }}>
                      Guest and Room
                    </span>
                  }
                  value={`${rooms}Rooms,${adults + child}Guests`}
                  onClick={() => setGuest_rooms(true)}
                  className={inputborder.root}
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color:'#F23844' }} />
                        {/* <img src={calendermonth} alt="caleder" width="27" height="100"/> */}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={1.5}>
                <button
                  style={{
                    width: "100%",
                    height: "41.23px",
                    background: styles.app_color,
                    fontSize: "16px",
                    color: "#fff",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "0.5rem",
                  }}
                  onClick={()=>handleSearch(1)}
                >
                  Search
                </button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container pt={{ md: 5, xs: 0 }} spacing={2}>
          {/* Hotel filters paper */}
          <Grid
            item
            md={4}
            mb={2}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Paper
              className={hotel_styles.paper_style}
              sx={{ borderRadius: "1rem !important" }}
              ref={sortHeight}
            >
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <span className={hotel_styles.filter_names}>Sort By</span>
                </Grid>
                <Grid item>
                  <ToggleButtonGroup
                    value={price}
                    onChange={handlepricefilter}
                    exclusive
                    disableRipple
                    size="small"
                  >
                    <ToggleButton value={1} className={hotel_styles.pricebtn}>
                      Lowest Price
                    </ToggleButton>
                    <ToggleButton
                      value={0}
                      className={hotel_styles.pricebtn}
                      sx={{ marginLeft: "1rem!important" }}
                    >
                      Highest Price
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
              <Grid container direction="column" spacing={3} mt={0.1}>
                <Grid item>
                  <span className={hotel_styles.filter_names}>
                    Price Range Per Night{" "}
                  </span>
                </Grid>
                <Grid item>
                  <Grid padding={'0rem 1rem'}>
                    <Priceslide
                      value={priceslide}
                      valueLabelDisplay="on"
                      aria-label="price slider"
                      onChange={handle_price_change}
                      valueLabelFormat={valueLabelFormat}
                      min={500}
                      step={500}
                      max={100000}
                      disableSwap
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="column" spacing={1} mt={1}>
                <Grid item>
                  <span className={hotel_styles.filter_names}>Star Rating</span>
                </Grid>
                <Grid item>
                  <ToggleButtonGroup
                    value={rating}
                    onChange={ratingchange}
                    exclusive
                    disableRipple
                    size="small"
                    sx={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <ToggleButton value={5} className={hotel_styles.ratingbtn}>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <StarIcon sx={{ fontSize: "large" }} />
                        <span>5</span>
                      </Stack>
                    </ToggleButton>
                    <ToggleButton
                      value={4}
                      className={hotel_styles.ratingbtn}
                      sx={{ marginLeft: "0.3rem!important" }}
                    >
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <StarIcon sx={{ fontSize: "large" }} />
                        <span>4</span>
                      </Stack>
                    </ToggleButton>
                    <ToggleButton
                      value={3}
                      className={hotel_styles.ratingbtn}
                      sx={{ marginLeft: "0.3rem!important" }}
                    >
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <StarIcon sx={{ fontSize: "large" }} />
                        <span>3</span>
                      </Stack>
                    </ToggleButton>
                    <ToggleButton
                      value={2}
                      className={hotel_styles.ratingbtn}
                      sx={{ marginLeft: "0.3rem!important" }}
                    >
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <StarIcon sx={{ fontSize: "large" }} />
                        <span>2</span>
                      </Stack>
                    </ToggleButton>
                    <ToggleButton
                      value={1}
                      className={hotel_styles.ratingbtn}
                      sx={{ marginLeft: "0.3rem!important" }}
                    >
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <StarIcon sx={{ fontSize: "large" }} />
                        <span>1</span>
                      </Stack>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
              <Grid container direction="column" spacing={1} mt={1}>
                <Grid item>
                  <span className={hotel_styles.filter_names}>Amenities</span>
                </Grid>
                <Grid item>{aminities_filter}</Grid>
              </Grid>
              {/* <Grid container direction="column" spacing={1} mt={1}>
                          <Grid item><span className={hotel_styles.filter_names}>Property Type</span></Grid>
                          <Grid item>{properties_btns}</Grid>
                        </Grid> */}
              <Grid container direction="column" spacing={1} mt={1}>
                <Grid item>
                  <span className={hotel_styles.filter_names}>Others</span>
                </Grid>
                <Grid item>{others_btns}</Grid>
              </Grid>
              <Grid mt={5} textAlign={"center"}>
                <Button
                  className="filter_apply"
                  onClick={() => {
                    Applyhotelfilter();
                  }}
                >
                  Apply
                </Button>
              </Grid>
            </Paper>
          </Grid>
          {/* Hotels list */}
          <Grid item md={8} xs={12} sx={{ maxWidth: "100%" }} >
            <Paper
              sx={{
                padding: { md: "1rem", xs: "0.2rem" },
                borderRadius: "1rem!important",
                boxShadow: {
                  md: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
                  xs: "none",
                },
                backgroundColor: { md: "white", xs: "transparent" },
              }}
            >
              <Grid container direction={"column"} spacing={3}>
                <Grid
                  container
                  item
                  alignItems={"center"}
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <Grid item md={10.2}>
                    <span
                      style={{
                        fontFamily: "poppins",
                        fontWeight: 600,
                        color: "rgba(0, 0, 0, 1)",
                        fontSize: "14px",
                      }}
                    >{`Viewing ${hotels_data.length} of ${Number(hotelresult.hotelCount)+Number(gmt_hotels)} hotels`}</span>
                  </Grid>
                  <Grid
                    item
                    md={1.8}
                    container
                    gap={2}
                    alignItems={"center"}
                    textAlign={"right"}
                  >
                    <Grid item width={"100%"} textAlign={"right"}>
                      <Button
                        disableRipple
                        className={hotelslist_style.mapsbtn}
                        startIcon={<MapIcon />}
                        onClick={() => Handlemapopen()}
                        sx={{ marginRight: "0rem !important" }}
                      >
                        Map View
                      </Button>
                    </Grid>
                    {/* <Grid item md><TextField  className={inputborder.root} placeholder='Search hotel name or location' size="small"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon sx={{color: styles.app_color}}/>
                                </InputAdornment>
                              ),
                            }}
                            /></Grid> */}
                  </Grid>
                </Grid>
                <Grid
                  className="scroll_none"
                  sx={{
                    maxHeight: { md: `${applyHeight - (102 - 15)}px`, xs: "85vh" },
                    overflowY: "auto",
                    maxWidth: "100%",
                    marginTop: { md: "1rem", xs: '2rem' },
                    // marginLeft: "1rem",
                    "@media (max-width:899px)": {
                      paddingTop: '0px !important'
                    }
                  }}
                  item
                  container
                  xs={12}
                  onScroll={handleScroll}
                >
                  {/* {console.log(hotels_data,"sdljfj")} */}
                  {hotels_data.length > 0 &&
                    destination.type === "1" &&
                    hotels_data.map((item, index) => {
                      return (
                        <>
                          <Grid item key={item.ResultIndex} mt={1.5} xs={12} paddingRight={'0.1rem'}>
                            <Paper sx={{ borderRadius: "0.5rem" }} style={{ boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)' }} onClick={() => bookhotel(item, index)}>
                              <Grid container>
                                {/* sunsetpool */}
                                <Grid
                                  item
                                  md={3.5}
                                  xs={4}
                                  sx={{ padding: "1rem", height: "9rem" }}
                                  textAlign={"center"}
                                >
                                  <img
                                    src={item.hotel_picture}
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                    }}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  container
                                  md={8.5}
                                  xs={8}
                                  direction="column"
                                  pt={1}
                                  spacing={1}
                                >
                                  <Grid
                                    item
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div className={hotelslist_style.hotelname}>
                                      {item.hotel_name}
                                    </div>
                                    {/* <div className={hotelslist_style.offer}>
                                      20% OFF
                                    </div> */}
                                  </Grid>
                                  <Grid item container spacing={0.5}>
                                    <Grid item>
                                      {/* <span style={{fontSize:'14px',fontWeight:500,color: styles.app_color,fontFamily:'poppins'}}>4.8</span> */}
                                    </Grid>
                                    <Grid item>
                                      <Rating value={item.star_rating} readOnly />
                                      
                                    </Grid>
                                    <Grid item>
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: 500,
                                          color: styles.app_color,
                                          fontFamily: "poppins",
                                        }}
                                      >
                                        ({item.star_rating} Star Hotel)
                                      </span>
                                    </Grid>
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{ fontFamily: "poppins!important" }}
                                  >
                                    <Typography
                                      variant="body1"
                                      className={classes.ellipsis}
                                    >
                                      {item.hotel_description}
                                    </Typography>
                                    {/* <span style={{fontSize:'14px',color:'#303030',overflow:'hidden',textOverflow:'ellipsis',maxLines:'2'}}>{item.HotelDescription}</span> */}
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{ maxWidth: "100% !important" }}
                                  >
                                    <Stack direction="row" spacing={0.5}>
                                      <LocationOnIcon
                                        sx={{ fontSize: "20px" }}
                                      />
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          color: "#303030",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                        }}
                                      >
                                        {item.HotelAddress}
                                      </span>
                                    </Stack>
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{
                                      display: { xs: "none", md: "block" },
                                    }}
                                  >
                                    <Divider />
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      paddingTop: "0px!important",
                                      marginTop: { md: "0rem", xs: "0.5rem" },
                                    }}
                                  >
                                    {/* {console.log(item,"privere")} */}
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        paddingTop: "8px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color:  styles.app_color,
                                          fontWeight: "500",
                                        }}
                                      >{`${item?.price.CurrencyCode} ${item?.price.PublishedPriceRoundedOff}`}</span>
                                      {/*(₹ 2,500 Taxes & Fees) Per Night*/}
                                    </div>
                                    <button
                                      style={{
                                        border: "none",
                                        background: styles.app_color,
                                        color: "#fff",
                                        fontWeight: "500",
                                        fontSize: "14px",
                                        width: "117.44px",
                                        height: "41.83px",
                                        borderBottomRightRadius: "0.5rem",
                                      }}
                                      // onClick={() => bookhotel(item, index)}
                                    >
                                      Book Now
                                    </button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        </>
                      );
                    })}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Hotelslist;
