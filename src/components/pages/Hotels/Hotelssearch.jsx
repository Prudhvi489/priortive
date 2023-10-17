import {
  Avatar,
  Chip,
  Container,
  Grid,
  Box,
  Paper,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Tab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  destinationresponsive,
  flightsresponsive,
} from "../responsives/Carouselresponsive";
import Footer from "../../../parts/Footer";
import calendermonth from "../../../assets/Hotelimages/calendericon.svg";
// JSX styles imports
import {
  hotelsearch,
  muitextfieldborder,
} from "../../../assets/styles/Hotelstyles";
import { gomainpage } from "../../../assets/styles/Flights.jsx";
// mui icon imports
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import PersonIcon from "@mui/icons-material/Person";
import Hotel from "../../../assets/Hotelimages/Hotel.png";
import Agra from "../../../assets/images/Agra.png";
import AgraC from "../../../assets/images/Agra_croped.png";
import Delhi from "../../../assets/images/Delhi.png";
import DelhiC from "../../../assets/images/Delhi_croped.png";
import Goa from "../../../assets/images/Goa.png";
import GoaC from "../../../assets/images/Goa_croped.png";
import Banglore from "../../../assets/images/Banglore.png";
import BangloreC from "../../../assets/images/Banglore_croped.png";
import Vizag from "../../../assets/images/Vizag.png";
import VizagC from "../../../assets/images/Vizag_croped.png";
import footerimage from "../../../assets/images/gomytripfooter.png";
import scaner from "../../../assets/images/barcode.png";
import { useLocation, useNavigate } from "react-router-dom";
import Guestrooms from "../../modals/Hotelmodals/Guestrooms";
import { useDispatch, useSelector } from "react-redux";
import Countriessearch from "../../modals/Hotelmodals/Countriessearch";
// calener imoports
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { format } from "date-fns";
import Countrycodefilter from "../../modals/Signupmodals/Countrycodefilter";
import Destinationstaticsearch from "../../modals/Hotelmodals/Destinationstaticsearch";
import helperFunctions from "../../../helpers/helperFunctions";
import axios from "axios";
import { hoteldataActions } from "../../../store/Hotelslices.jsx/HotelDataslice";
import Loadingmodal from "../../modals/Signupmodals/Loadingmodal";
import Mininav from "../../../parts/Mininav";
import Resorts from "../../../assets/Hotelimages/Resorts.png";
import miniflight from "../../../assets/images/mini_cover_image.svg";
import { hotelroomActions } from "../../../store/Hotelslices.jsx/Hotelroomslice";
import OffersCarousel from "../../OffersCarousel/OffersCarousel";
import { envdata } from '../../Envexports'
import MySnackbar from "../../modals/Signupmodals/Snackbar";
import Hotelhelpers from "../../../helpers/Hotelhelpers";
import {styles} from '../../../assets/styles/Styles_export'
// import { normalize } from 'path';
// const baseurl = process.env.REACT_APP_BASEURL;
const Hotelssearch = () => {
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const HotMainpg = hotelsearch();
  const gomainpag = gomainpage();
  const inputborder = muitextfieldborder();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [guest_rooms, setGuest_rooms] = useState(false);
  const [guests_state, setGuests_state] = useState([
    { NoOfAdults: 1, NoOfChild: 0, ChildAge: null },
  ]);
  const [searchobj,setSearchobj]=useState({})
  const [pageSize, setPageSize] = useState(30)
  let guests = useSelector((state) => state.hotel_guestcount.guests);
  // const adults = guests.reduce((sum, item) => sum + item.NoOfAdults, 0);
  // console.log(adults,"adults count")
  // const child = guests.reduce((sum, item) => sum + item.NoOfChild, 0);
  let adults=0;
let child=0;
for(let i=0;i<guests.length;i++){
  adults+=guests[i].NoOfAdults;
  child+=guests[i].NoOfChild
}
  const [countries, setCountries] = useState(false);
  const [country_selection, setCountry_selection] = useState({
    id: 101,
    country_name: "India",
    country_code: "IN",
  });
  const rooms = guests.length;
  const [checkindate, setCheckindate] = useState(new Date());
  const [checkoutdate, setCheckoutdate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [hotel_search_type, setHotel_search_type] = useState(1);
  const [country_code, setCountry_code] = useState(false);
  const [guest_nationality, setGuest_nationality] = useState({
    id: 74,
    country_name: "India",
    country_code: "IN",
    code: "+91",
    country_flag: `${envdata.baseurl}/in.png`,
  });
  const [destination_Search, setDestination_Search] = useState(false);
  const [destination, setDestination] = useState({
    city_id: "130443",
    city_name: "Delhi",
    country: "India",
    country_code: "IN   ",
    source_id: 130443,
    type: "1",
  });
  const [loadingmodal, setLoadingmodal] = useState(false);
  // destinations carousel
  const destinations = [
    { image: AgraC, text: "Agra" },
    { image: DelhiC, text: "Delhi" },
    { image: GoaC, text: "Goa" },
    { image: VizagC, text: "Vizag" },
    { image: BangloreC, text: "Banglore" },
    { image: BangloreC, text: "Banglore" },
    { image: BangloreC, text: "Banglore" },
    { image: BangloreC, text: "Banglore" },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    setGuests_state(guests);
  }, [guests]);
  // gmthotels get hotel info
const get_gmt_hotelinfo=async()=>{
  try{
    const res=await axios.post(`${envdata.baseurl}/getDedupeHotelInfo`,{
      TraceId: "",
      ResultIndex:"",
      HotelCode: destination?.source_id,
      CategoryId: "",
      searchType:2,
      userId: localStorage.getItem("userid"),
      destination: destination
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
    console.log(roomres.data,"roomresult")
    const roomsdata=roomres.data;
    if(roomsdata.status){
      // console.log(roomres?.data?.data,"roomdata")
      dispatch(hotelroomActions.room_info(roomres?.data?.data));
      setLoadingmodal(false);
          navigate(`/hotels/sel_hotel`);
    }
    else{
      setLoadingmodal(false)
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
// search hotel api call by city,hotel name
  const hotel_search = async () => {
    const dates = await helperFunctions.checkoutdatechecking(
      checkindate,
      checkoutdate
    );
    // console.log(dates)
    if (dates) {
      setSnackopen(true);
      setSnackmessage("Check-out date should not be earlier than chech-in date");
      return;
    }
    dispatch(hoteldataActions.country_data(country_selection));
    dispatch(hoteldataActions.destination_data(destination));
    dispatch(hoteldataActions.nationality_data(guest_nationality));

    setLoadingmodal(true);
    let hotel_search_obj;
    // search by hotelname
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
      setSearchobj(hotel_search_obj);
      if(destination.type==="3"){
        hotel_search_obj.searchType=3
        get_gmt_hotelinfo(hotel_search_obj);      
        return
      }
    } 
    else {
      hotel_search_obj = {
        searchType: 1,
        pageSize: pageSize,
        pageNumber: 1,
        userId: localStorage.getItem("userid"),
        specificAmenityIds: [],
        starRating: 0,
        isTopHotel: 0,
        isHalal: 0,
        isHotDeal: 0,
        orderBy: 1, //1 for lowest to highest vise versa
        minPrice: 1,
        maxPrice: 100000,
        hotelCodes: [],
        destination: destination,
        IsTBOMapped: "true",
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
      // setSearchobj(hotel_search_obj);
      // setLoadingmodal(false);
      // return
    }
    // search_hotel_api(hotel_search_obj);
    try {
      let res;
         res = await axios.post(
          `${envdata.baseurl}/ddgetHotelResult`,
          hotel_search_obj        
        );
      hotel_search_obj.searchType=3
      const gmt_res=await axios.post(`${envdata.baseurl}/ddgetHotelResult`,hotel_search_obj)
      const gmt_data=gmt_res.data
      const data = res?.data;
      if ((data?.status || gmt_data?.status )&& destination.type === "1") {
        if(parseInt(gmt_data?.data.hotelCount)===0){
          setSnackopen(true);
          setSnackmessage(data.data.message)
        }
        const sorted_hotels=await Hotelhelpers.sorting_tbo_gmt(
          (data?.status&&gmt_data?.status)?[...data.data.Hotels,...gmt_data.data.Hotels]:
          (data?.status&&(gmt_data?.status===undefined || gmt_data?.status===0))?[...data.data?.Hotels]:
          (gmt_data?.status&&(data?.status===undefined||data?.status===0))&&[...gmt_data.data.Hotels],1
        )
              //   (gmt_data.status===1 && data?.status===1 &&data?.status!==undefined)
              // ?[...data?.data.Hotels,...gmt_data.data.hotels]:
              // (data?.status!==undefined&&data?.status===1&&gmt_data.status===0)?[...data.data.Hotels]:
              data?.status&&dispatch(hoteldataActions.Hotel_data([data?.data, 1]));
              gmt_data?.status&&dispatch(hoteldataActions.merged_hotels([sorted_hotels,1]))
              gmt_data?.status&&dispatch(hoteldataActions.gmt_hotel_count(gmt_data.status?gmt_data.data.hotelCount:0))
              setLoadingmodal(false);
              if(sorted_hotels.length>0){
                navigate(
                  `${helperFunctions.normalizePath(location.pathname)}/all_hotels`
                );
              }
      } 
      else if (data.status && destination.type === "2"||destination.type==="3") {
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
        const roomres = await axios.post(`${envdata.baseurl}/getDedupeHotelRoom`, {
          TraceId: data.data.TraceId,
          ResultIndex: data.data.HotelResult.ResultIndex,
          HotelCode: data.data.HotelResult.HotelCode,
          CategoryId: data.data.HotelResult.SupplierHotelCodes[0].CategoryId,
          searchType:destination.type==="3"?2:1
        });
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
      } else {
        setSnackopen(true);
        setSnackmessage(data.data.message);
        // alert(data.data.message);
        setLoadingmodal(false);
      }
    } 
    catch (error) {
      setSnackopen(true);
      setSnackmessage(error);
      // alert(error);
      setLoadingmodal(false);
    }
  };

  // countries dialog open
  const Countries_dialog = () => {
    setCountries(true);
  };
  // country selection
  const country_Selection = (selected_country) => {
    console.log(selected_country, "country");
    setCountry_selection(selected_country);
  };
  const handle_search_type = (event, search_type) => {
    setHotel_search_type(search_type);
  };
  // callback
  const handlecountryselected = (value) => {
    setGuest_nationality(value);
  };
  // destiantion callback
  const getdestination = (value) => {
    console.log(value, "selection")
    setDestination(value);
  };
  // const [checkindate, setCheckindate] = useState(null);

  const formatDate = (date) => {
    // Custom formatting using date-fns format function
    return format(date, "MMM dd yyyy");
  };
  return (
    <>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      {false && <h1>hotel module</h1>}{" "}
      {true && (
        <div>
          <Loadingmodal
            open={loadingmodal}
            loadingclose={() => setLoadingmodal(false)}
          />
          <Countriessearch
            open={countries}
            close={() => setCountries(false)}
            country={country_Selection}
          />
          <Guestrooms open={guest_rooms} close={() => setGuest_rooms(false)} guestsdata={guests} />
          <Countrycodefilter
            open={country_code}
            right={1}
            onclose={() => setCountry_code(false)}
            selectedvalue={handlecountryselected}
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
          {/* {JSON.stringify(searchobj,2,null)} */}
          <Grid container>
            {/* <Grid item xs={12} height="300px">
        <Grid item className={HotMainpg.hotelsearchbg}>
          <Container maxWidth="xl">
            <Grid item textAlign={'right'} >
              <Chip avatar={<Avatar alt="img" src={guest_nationality.country_flag} variant="rounded"/>} label={guest_nationality.country_name.slice(0,3).toUpperCase()} variant='outlined'  classes={{label:HotMainpg.chipLabel}} className={HotMainpg.chip} onClick={()=>setCountry_code(true)} />
            </Grid>
          </Container>
        </Grid> 
      </Grid> */}
            <Grid item xs={12} position={"relative"}>
              <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                <img src={Resorts} width="100%" height="100%" alt="flight" />
              </Grid>
              <Grid item sx={{ display: { xs: "contents", md: "none" } }}>
                <img src={miniflight} width="100%" height="100%" alt="flight" />
              </Grid>
              <Grid sx={{ top: "5%", position: "absolute", width: "100%" }}>
                <Container maxWidth="xl" sx={{ position: "relative" }}>
                  <Grid item className={HotMainpg.hotelsearchbg}>
                    <Chip
                      avatar={
                        <Avatar
                          alt="img"
                          src={guest_nationality.country_flag}
                          variant="rounded"
                        />
                      }
                      label={guest_nationality.country_name
                        .slice(0, 3)
                        .toUpperCase()}
                      variant="outlined"
                      classes={{ label: HotMainpg.chipLabel }}
                      className={HotMainpg.chip}
                      onClick={() => setCountry_code(true)}
                    />
                  </Grid>
                </Container>
              </Grid>
              {/* <Grid item className={HotMainpg.hotelsearchbg}>
          <Chip avatar={<Avatar alt="img" src={guest_nationality.country_flag} variant="rounded"/>} label={guest_nationality.country_name.slice(0,3).toUpperCase()} variant='outlined'  classes={{label:HotMainpg.chipLabel}} className={HotMainpg.chip} onClick={()=>setCountry_code(true)} />
        </Grid> */}
            </Grid>
            <Container maxWidth="xl" sx={{ zIndex: 1 }}>
              <Grid
                item
                sx={{ marginTop: { md: "-7%", sm: "-11%", xs: "-16%" } }}
              >
                <Paper
                  sx={{
                    borderRadius: "1rem",
                    display: {
                      xs: "block",
                      md: "none",
                      margin: "1.3rem 0rem",
                      boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
                    },
                  }}
                >
                  <Mininav />
                </Paper>
                <Paper
                  className={HotMainpg.searchpaper}
                  sx={{ boxShadow: "0px 4px 24px -1px rgba(2, 54, 87, 0.25)" }}
                >
                  <Grid container direction={"column"}>
                    {/* Hotel search inputs */}
                    <Grid
                      item
                      container
                      pt={{ md: 6, xs: 4 }}
                      pb={{ md: 6, xs: 3 }}
                      pl={3}
                      pr={3}
                      spacing={2}
                    >

                      <Grid item md={6} xs={12}>
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
                              ? destination.city_name +
                              "," +
                              destination.country
                              : destination.hotel_name +
                              "," +
                              destination.city_name
                            }`}
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
                                <FmdGoodSharpIcon sx={{ color: `#F23844!important` }} />
                              </InputAdornment>
                            ),
                          }}
                          onClick={() => setDestination_Search(true)}
                        />
                      </Grid>
                      <Grid item md={2} xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            size="small"
                            inputFormat="MMM dd yyyy"
                            sx={{
                              "& .MuiPickersToolbar-penIconButton": {
                                display: "none",
                              },
                            }}
                            closeOnSelect
                            disablePast
                            label={
                              <span
                                style={{
                                  paddingRight: "0.5rem",
                                  color: "rgb(0, 53, 86)",
                                }}
                              >
                                Check-In
                              </span>
                            }
                            value={checkindate}
                            onChange={(newValue) => {
                              setCheckindate(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                // id="dateInputTag"
                                sx={{ minWidth: "90px" }}
                                size="small"
                                {...params}
                                fullWidth
                                autoComplete="off"
                                label={
                                  <span
                                    style={{
                                      paddingRight: "0.5rem",
                                      color: "#C4C4C4",
                                    }}
                                  >
                                    Check-In
                                  </span>
                                }
                                // value=""
                                className={`${inputborder.root}`}
                                InputLabelProps={{
                                  style: {
                                    color: `${styles.app_color}!important`,
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
                      <Grid item md={2} xs={6}>
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
                      <Grid item md={2} xs={12}>
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
                                <PersonIcon sx={{ color: '#F23844' }} />
                                {/* <img src={calendermonth} alt="caleder" width="27" height="100"/> */}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        textAlign={"center"}
                        sx={{ display: { md: "none", xs: "block" } }}
                      >
                        <button
                          className={HotMainpg.hotelsearchbtn}
                          onClick={()=>hotel_search()}
                          style={{ width: "100%", borderRadius: "0.5rem" }}
                        >
                          Search Hotels
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
                <Grid
                  item
                  textAlign={"center"}
                  mt={-3.5}
                  sx={{ display: { md: "block", xs: "none" } }}
                >
                  <button
                    className={HotMainpg.hotelsearchbtn}
                    onClick={hotel_search}
                  >
                    Search Hotels
                  </button>
                </Grid>
              </Grid>
            </Container>
          </Grid>
          {/* all Offers */}
          <Grid item mt={2}>
            <Container maxWidth="xl">
              <OffersCarousel />
              <Grid contianer sx={{ mt: 3 }} mb={2}>
                <Grid item>
                  <Typography className={HotMainpg.txtclr} variant="p">
                    Popular Destinations
                  </Typography>
                </Grid>
                <Grid item>
                  <Carousel responsive={destinationresponsive}>
                    {destinations.map((item, index) => {
                      return (
                        <div className={gomainpag.destinationsmain} key={index}>
                          <img
                            src={item.image}
                            alt={item.text}
                            // className="imgsize"
                            width={'100%'}
                            height={'100%'}
                          />
                          <Typography
                            className={gomainpag.destinationtext}
                            variant="body1"
                            sx={{ fontFamily: "poppins!important" }}
                          >
                            {item.text}
                          </Typography>
                        </div>
                      );
                    })}
                  </Carousel>
                </Grid>
              </Grid>
              {/* <Grid item sx={{ display: { md: "block", xs: "none" } }}>
                <Typography className={HotMainpg.txtclr} variant="body1">
                  Download the App Now
                </Typography>
                <Grid container spacing={0}>
                  <Grid item xs={7}>
                    <Grid item>
                      <img src={footerimage} alt=" " width="90%" />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid item className={gomainpag.scanner}>
                      <img src={scaner} width="50%" alt=" " height="50%" />
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid item className={gomainpag.scanner1}>
                      <Stack spacing={3}>
                        <a href="https://play.google.com/store/games?utm_source=apac_med&utm_medium=hasem&utm_content=Jul0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-in-1003227-med-hasem-py-Evergreen-Jul0121-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700058906718334_creativeid_480977734745_device_c&gclid=CjwKCAjw9J2iBhBPEiwAErwpebR7pcHTH-mTYVi8Su9bpeH7mpJIsNF-LdKwQbG-uUkVFFLbv-R_8hoCqdgQAvD_BwE&gclsrc=aw.ds">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgyv7aPiNJIgzcnGoxKHsqiCC3Fql_xQ0fn0L9KF_rBL_c5SeyEqKpM0FCV-0HVLGJew&usqp=CAU"
                            alt="google icon"
                            width="100%"
                            height="50"
                          />
                        </a>
                        <a href="https://www.apple.com/in/app-store/">
                          <img
                            src="https://www.tacuonline.com/wp-content/uploads/sites/2/2015/09/app-store-logo-1.png"
                            alt=""
                            width="100%"
                            height="50"
                          />
                        </a>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
            </Container>
            <Grid item>
              <Footer />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Hotelssearch;
