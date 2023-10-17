import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Container,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Rating,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { selected_hotels } from "../../../assets/styles/Hotelstyles";
import room from "../../../assets/Hotelimages/room.png";
import Ratingstar from "../../../assets/Hotelimages/Ratingstar.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";
import standard_room from "../../../assets/Hotelimages/standard_room.png";
import deluxe_room from "../../../assets/Hotelimages/deluxe_room.png";
import suite_room from "../../../assets/Hotelimages/suite_room.png";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import firstaid from "../../../assets/Hotelimages/firstaid.svg";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import service from "../../../assets/Hotelimages/service.svg";
import cctv from "../../../assets/Hotelimages/cctv.svg";
import room1 from "../../../assets/Hotelimages/room1.png";
import room2 from "../../../assets/Hotelimages/room2.png";
import room3 from "../../../assets/Hotelimages/room3.png";
import room4 from "../../../assets/Hotelimages/room4.png";
import room5 from "../../../assets/Hotelimages/room5.png";
import map from "../../../assets/Hotelimages/map.png";
import DirectionsRailwayFilledIcon from "@mui/icons-material/DirectionsRailwayFilled";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import main_road from "../../../assets/Hotelimages/main_road.svg";
import atm from "../../../assets/Hotelimages/atm.svg";
import food_court from "../../../assets/Hotelimages/food_court.svg";
import basanti_hotel from "../../../assets/Hotelimages/basanti_hotel.png";
import srikumar_hotel from "../../../assets/Hotelimages/srikumar_hotel.png";
import fivestar_hotel from "../../../assets/Hotelimages/fivestar.png";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Gallery from "../../modals/Hotelmodals/Gallery";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Moreaminities from "../../modals/Hotelmodals/Moreaminities";
import helperFunctions from "../../../helpers/helperFunctions";
import backIcon from "../../../assets/images/backIcon_white.svg";
import axios from "axios";
import MySnackbar from "../../modals/Signupmodals/Snackbar";
import { Profileactions } from "../../../store/Signupslices/Profileslice";
import { envdata } from '../../Envexports'
import Hotelhelpers from "../../../helpers/Hotelhelpers";
import {styles} from '../../../assets/styles/Styles_export'
const Selected_hotel = () => {
  const sel_hotel_styles = selected_hotels();
  // const baseurl = process.env.REACT_APP_BASEURL;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const hotel_details = useSelector((state) => state.hotel_room.hotelinfo);
  // console.log(hotel_details,"hoteldetails")
  const room_details =useSelector((state) => state.hotel_room.roominfo); 
  const checkin_time=useSelector((state)=>state.hotel_room.checkin);
  const checkout_time=useSelector((state)=>state.hotel_room.checkout)
  // console.log(room_details,"roomdetails");
  const [hotel_info, setHotel_info] = useState({});
  const [room_info, setRoom_info] = useState([]);
  const [galleryopen, setGalleryopen] = useState(false);
  const [room_combinations, setRoom_combinations] = useState(1);
  const [selected_fixedroom, setSelected_fixedroom] = useState(1);
  const [selected_openroom,setSelected_openroom]=useState([]);
  const [selected_gmtroom,setSelected_gmtroom]=useState([])
  const [visible_div, setVisible_div] = useState("overview");
  const visible_div_status = useRef(false)
  const [aminities_modal, setAminities_modal] = useState(false);
  const [aminities, setAminities] = useState([]);
  const [sel_category_rooms, setSel_category_rooms] = useState([]);
  const [open_combination_rooms, setOpen_combination_rooms] = useState([]);
  const [rooms_data, setRooms_data] = useState({});
  const [openroomstab, setOpenroomstab] = useState(1);
  const [sel_rooms_price, setSel_rooms_price] = useState(0);
  const [sel_open_roomprice,setSel_open_roomprice]=useState(0)
  let guests = useSelector((state) => state.hotel_guestcount.guests);
  const adults = guests.reduce((sum, item) => sum + item.NoOfAdults, 0);
  const child = guests.reduce((sum, item) => sum + item.NoOfChild, 0);
  const rooms = guests.length;
  let hotelresult = useSelector((state) => state.hotel_data.hotelresult);
  const hotel_reviews = useSelector((state) => state.hotels_reviews.hotel_reviews)
  const loggedin = useSelector((state) => state.authentication.loggedin);;
  let selected_city = useSelector((state) => state.hotel_data.destination);
  // console.log(selected_city,"selectedcity")
  const htmlTagsRegex = /<[^>]*>/;
  // Stops the useeffect calling twice
  const initialRenderRef = useRef(true);
  // useeffect using redux data
  useEffect(() => {
    const fun = async () => {
      if (hotel_details && room_details) {

        setHotel_info(hotel_details.HotelDetails);
        setRooms_data(room_details);
        // console.log(room_info,"roominfodata")

       if(room_details?.RoomCombinationsArray!==undefined){ 
       for (let i = 0; i < room_details?.RoomCombinationsArray.length; ++i) {
          if (
            room_details.RoomCombinationsArray[i]?.InfoSource ===
            "FixedCombination"
          ) {
            // console.log(room_details.RoomCombinationsArray[i].CategoryId,"category id")
            const found = room_info.some((existingitem) => {
              if (
                existingitem.CategoryId ===
                room_details.RoomCombinationsArray[i].CategoryId
              ) {
                return true;
              }
              return false;
            });
            if (!found) {
              setRoom_info((prev) => [
                ...prev,
                room_details.RoomCombinationsArray[i],
              ]);
            }
            let sel_room = `${room_details.RoomCombinationsArray[0].RoomCombination[0]?.RoomIndex.join(
              "_"
            )}|${room_details.RoomCombinationsArray[0]?.CategoryId}`;
            let total_price = await helperFunctions.hotel_fixedroom_price(
              sel_room,
              room_details.HotelRoomsDetails
            );
            // room_details?.RoomCombinationsArray[0]?.RoomCombination[0]?.RoomIndex.join("_")
            // console.group(total_price,"price in useeffect")
            setSel_rooms_price(total_price);
            setSelected_fixedroom(sel_room);
            // console.log(room_details?.RoomCombinations?.RoomCombination[0]?.RoomIndex.join("_"),"combination")
          } 
          else {
            const found = open_combination_rooms.some((existingitem) => {
              if (
                existingitem.CategoryId ===
                room_details.RoomCombinationsArray[i].CategoryId
              ) {
                return true;
              }
              return false;
            });
            if (!found) {
              setOpen_combination_rooms((prev) => [
                ...prev,
                room_details.RoomCombinationsArray[i],
              ]);
            }
            room_details.RoomCombinationsArray[i]?.RoomCombination.map((item,index)=>{
              console.log(item,"item")
              setSelected_openroom((prev)=>([...prev,item?.RoomIndex[0]]))
            })
            // setOpen_combination_rooms(room_details);
          }
        }
      }
      else{
        console.log(room_details,"roomdetails")
        for(let i=0;i<guests.length;i++){
          setSelected_gmtroom((prev)=>([...prev,room_details?.HotelRoomsDetails[i]?.RoomIndex]))
        }
        let open_price=Hotelhelpers.open_room_price(room_details?.HotelRoomsDetails,selected_gmtroom);
        setSel_open_roomprice(open_price);
        setRoom_combinations(2);
      }
      }
    };
    //  if (initialRenderRef.current && selected_city.type==="2") {
    //      alert("rendered")
    //    initialRenderRef.current = false;
    //      return;
    //    }

    fun();
  }, [hotel_details, room_details]);

  useEffect(() => {
    const handleScroll = () => {
      if(visible_div_status.current){
        return;
      }
      // getting elements
      const overview = document.getElementById("overview");
      const rooms = document.getElementById("rooms");
      const aminities = document.getElementById("aminities");
      const gallerydiv = document.getElementById("gallery");
      const reviewsdiv = document.getElementById("reviews");
      // offset div
      const offset = window.innerHeight * 0.5;
      // function for active option
      const isElementInViewport = (element) => {
        if(element===null)
        {
          return;
        }
        const rect = element.getBoundingClientRect();
        return rect.top <= offset && rect.bottom >= offset;
      };
      // conditions for active option
      if (isElementInViewport(overview)) {
        setVisible_div("overview");
      } else if (isElementInViewport(rooms)) {
        setVisible_div("rooms");
      } else if (isElementInViewport(aminities)) {
        setVisible_div("aminities");
      } else if (isElementInViewport(gallerydiv)) {
        setVisible_div("gallery");
      } else if (isElementInViewport(reviewsdiv)) {
        setVisible_div("reviews");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleaminities = (data) => {
    setAminities(data);
    setAminities_modal(true);
  };
  const handle_roomcombinations = (event, newvalue) => {
    setRoom_combinations(newvalue);
  };
  const handleopenroomstab = (event, newvalue) => {
    setOpenroomstab(newvalue);
  };
  const handle_radio_btns = async (e) => {
    let total_price = await helperFunctions.hotel_fixedroom_price(
      e.target.value,
      rooms_data.HotelRoomsDetails
    );
    setSel_rooms_price(total_price);
    setSelected_fixedroom(e.target.value);
  };
  const scroll_toview = (id) => {
    visible_div_status.current = true;
    setVisible_div(id);
    const section = document.getElementById(id);
    // section.scrollIntoView({ behavior: "smooth" });
    const offset = 105; // Adjust this value as needed
    const container = document.documentElement; // You can use the container element where you want to apply the offset
    const scrollToElement = section.offsetTop - offset;
    container.scrollTo({
      top: scrollToElement,
      behavior: "smooth",
    });
    setTimeout(()=>{
      visible_div_status.current = false
    },6000)
  };
  const Bookroom = async () => {
    if (!loggedin) {
      setSnackopen(true);
      setSnackmessage("To book room you have to login to your account");
      // alert("To book room you have to login to your accuount");
      return;
    }
    if (localStorage.getItem("userid") !== null) {
      const profileres = await axios.post(`${envdata.baseurl}/profile`, { "user_id": localStorage.getItem("userid") || "" }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authorization"),
        }
      })
      if (profileres.data.status) {
        dispatch(Profileactions.profiledata(profileres.data.data))
      }
      else {
        setSnackopen(true);
        setSnackmessage(profileres.data?.data?.message);
        // alert(profileres.data?.data?.message)
      }
    }
    navigate(`/${location.pathname.split("/")[1]}/bookroom`, {
      state: room_combinations===1?selected_fixedroom:selected_gmtroom,
    });
  };
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Moreaminities
        open={aminities_modal}
        onclose={() => setAminities_modal(false)}
        aminitie={aminities}
      />
      {Object.keys(hotel_info).length > 0 && (
        <>
          <Gallery
            open={galleryopen}
            close={() => setGalleryopen(false)}
            data={hotel_info?.Images===undefined?[]:hotel_info?.Images}
          />
          <Grid container position={"relative"}>
            <Grid item xs={12} height={{ md: "300px", xs: "230px" }}>
              <Grid
                item
                container
                className={sel_hotel_styles.selected_hotel_bg}
              >
                {/* <Container maxWidth="xl" sx={{display:{md:'block',xs:'none'}}}>
              <div style={{display:'flex',float:'right'}}>
                <Paper sx={{width:'300px',height:'280px',marginTop:'4.6rem',borderRadius:'0.5rem'}} >
                  <Grid container direction="column" p={1.5}>
                    <Grid item container  sx={{backgroundImage:`url(${room})`,minHeight:'9rem', backgroundRepeat: 'no-repeat',}} xs={12} >
                        <div className={sel_hotel_styles.hotel_offer}>20% OFF</div>
                    </Grid>
                    <Grid item mt={0.5}><span className={sel_hotel_styles.roomdesc}>King Deluxe Room Garden View With Balcony</span></Grid>
                    <Grid item mt={1}><span className={sel_hotel_styles.roomprice}>₹ 7,499+₹ 900 taxes & fees</span></Grid>
                  </Grid>
                  <Grid container mt={0.5}>  
                    <Grid item sm={6} md={6} lg={6}><Button disableRipple fullWidth className={sel_hotel_styles.sel_hotel}>Select Room</Button></Grid>
                    <Grid item sm={6} md={6} lg={6}><Button disableRipple fullWidth className={sel_hotel_styles.book_hotel}>Book Now</Button></Grid>
                  </Grid>
                </Paper>
                </div>
            </Container> */}
              </Grid>
            </Grid>
            {/* responsive back botton */}
            <Grid
              sx={{
                display: { md: "none", xs: "block" },
                position: "absolute",
                top: "5%",
                left: "2%",
              }}
            >
              <Grid
                container
                alignItems={"center"}
                color={"white"}
                fontWeight={"600"}
              >
                <Grid item>
                  <IconButton onClick={() => navigate(-1)}>
                    <img
                      src={backIcon}
                      alt="backbutton"
                      style={{ width: "1.5rem" }}
                    />
                  </IconButton>
                </Grid>
                <Grid item>Hotel Details</Grid>
              </Grid>
            </Grid>
          </Grid>
          <Container maxWidth="xl">
            <Grid container direction={"column"} mt={2} spacing={2}>
              <Grid item container gap={{ md: 2, xs: 0 }}>
                <Grid item md={"auto"} xs={12}>
                  <span className={sel_hotel_styles.hotel_name}>
                    {hotel_info.HotelName}{" "}
                    <Grid sx={{ display: { md: "inline", xs: "none" } }}>
                      -
                    </Grid>
                  </span>
                </Grid>
                <Grid item mt={1.5}>
                  <Stack direction={"row"} spacing={1}>
                    {Array.from(
                      { length: hotel_info.StarRating },
                      (_, rating) => {
                        return (
                          <img
                            src={Ratingstar}
                            alt="rating"
                            key={rating}
                            width="100%"
                            height="100%"
                          />
                        );
                      }
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                item
                mb={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "100% !important",
                }}
              >
                <div
                  style={{
                    color:  styles.app_color,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocationOnIcon /> <span>{(typeof hotel_info?.Address==="string")&&hotel_info?.Address}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color:  styles.app_color,
                    marginLeft: "0.5rem",
                  }}
                >
                  <Grid
                    sx={{ display: { md: "block", xs: "none" } }}
                    style={{ paddingRight: "0.5rem" }}
                  >
                    Get Direction
                  </Grid>
                  <DirectionsIcon />
                </div>
              </Grid>
              {/* <Grid item container mt={1} sx={{position:'-webkit-sticky',position:'sticky!important',top:'13%!important',background:'#DFF3FF',width:'40.5rem',borderRadius:'0.5rem',height:'2.5rem'}}>
            <Grid item rowSpacing={1} >
                <Grid item md={2}><button className={sel_hotel_styles.room_facilitiesbtn} onClick={()=>scroll_toview("overview")}>Overview </button></Grid>
                <Grid item md={2}><button className={sel_hotel_styles.room_facilitiesbtn} onClick={()=>scroll_toview("rooms")}>Rooms    </button></Grid>
                <Grid item md={2}><button className={sel_hotel_styles.room_facilitiesbtn} onClick={()=>scroll_toview("aminities")}>Aminities</button></Grid>
                <Grid item md={2}><button className={sel_hotel_styles.room_facilitiesbtn} onClick={()=>scroll_toview("gallery")}>Gallery  </button></Grid>
                <Grid item md={2}><button className={sel_hotel_styles.room_facilitiesbtn} onClick={()=>scroll_toview("location")}>Location </button></Grid>
                <Grid item md={2}><button className={sel_hotel_styles.room_facilitiesbtn} onClick={()=>scroll_toview("reviews")}>Reviews  </button></Grid>
            </Grid>
          </Grid> */}
              {/* responsive Travel & Guests details */}
              <Grid
                sx={{
                  display: { md: "none", xs: "block" },
                  padding: "0rem 1rem",
                  paddingRight: '0px',
                }}
                mb={1}
              >
                <Grid
                  mb={1}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "rgba(0, 53, 86, 1)",
                  }}
                >
                  Travel & Guests
                </Grid>
                <Paper sx={{ padding: "1rem 0.5rem" }}>
                  <Grid container justifyContent={"space-around"}>
                    <Grid item md={2.5} xs={2.5}>
                      <Stack spacing={1}>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "rgba(48, 48, 48, 1)",
                          }}
                        >
                          Check-In 10:00 AM
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "rgba(0, 53, 86, 1)",
                          }}
                        >
                          {helperFunctions.get_short_date(
                            hotelresult.CheckInDate
                          )}
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item md={2} xs={2} mt={1}>
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "#fff",
                          fontSize: "14px",
                          fontWeight: 500,
                          width: "4rem",
                          height: "1.3rem",
                          borderRadius: "0.5rem",
                        }}
                      >{`${helperFunctions.nights_calc(
                        hotelresult.CheckInDate,
                        hotelresult.CheckOutDate
                      )} ${helperFunctions.nights_calc(
                        hotelresult.CheckInDate,
                        hotelresult.CheckOutDate
                      ) > 1
                        ? "Nights"
                        : "Night"
                        }`}</button>
                    </Grid>
                    <Grid container item md={3} xs={3}>
                      <Grid item xs={12}>
                        <Stack spacing={1}>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "rgba(48, 48, 48, 1)",
                            }}
                          >
                            {" "}
                            Check-Out 09:00 AM
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "rgba(0, 53, 86, 1)",
                            }}
                          >
                            {helperFunctions.get_short_date(
                              hotelresult.CheckOutDate
                            )}
                          </span>
                        </Stack>
                      </Grid>
                      {/* <Grid item md={2} xs={2} mt={1}><EditIcon sx={{color:'#fff'}}/></Grid> */}
                    </Grid>
                    <Grid
                      item
                      container
                      md={3}
                      xs={3}
                      sx={{
                        borderLeft: "1px solid #fff",
                        borderRight: "1px solid #fff",
                      }}
                    >
                      <Grid item xs={12} textAlign={"center"}>
                        <Stack spacing={1}>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "rgba(48, 48, 48, 1)",
                            }}
                          >
                            Guests & Rooms
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "rgba(0, 53, 86, 1)",
                            }}
                          >{`${adults + child} Guests, ${rooms} Room`}</span>
                        </Stack>
                      </Grid>
                      {/* <Grid item md={2} xs={2} mt={1}><EditIcon sx={{color:'#fff'}}/></Grid> */}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <div
                /*style={{ position: 'sticky', top: '14.2%',zIndex:'1' }}*/ className="hotelGo"
              >
                <div
                  style={{
                    display: "inline-flex",
                    background: styles.shade_color,
                    borderRadius: "0.5rem",
                  }}
                >
                  <button
                    className={
                      visible_div === "overview"
                        ? sel_hotel_styles.sel_room_facilitiesbtn
                        : sel_hotel_styles.room_facilitiesbtn
                    }
                    onClick={() => scroll_toview("overview")}
                  >
                    Overview{" "}
                  </button>
                  <button
                    className={
                      visible_div === "rooms"
                        ? sel_hotel_styles.sel_room_facilitiesbtn
                        : sel_hotel_styles.room_facilitiesbtn
                    }
                    onClick={() => scroll_toview("rooms")}
                  >
                    Rooms{" "}
                  </button>
                  {/* <button
                    className={
                      visible_div === "aminities"
                        ? sel_hotel_styles.sel_room_facilitiesbtn
                        : sel_hotel_styles.room_facilitiesbtn
                    }
                    onClick={() => scroll_toview("aminities")}
                  >
                    Amenities
                  </button> */}
                  <button
                    className={
                      visible_div === "gallery"
                        ? sel_hotel_styles.sel_room_facilitiesbtn
                        : sel_hotel_styles.room_facilitiesbtn
                    }
                    onClick={() => scroll_toview("gallery")}
                  >
                    Gallery{" "}
                  </button>
                  {/* <button className={visible_div==="location"?sel_hotel_styles.sel_room_facilitiesbtn:sel_hotel_styles.room_facilitiesbtn} onClick={() => scroll_toview("location")}>Location </button> */}
                  {(Object.keys(hotel_reviews).length > 0 && hotel_reviews.reviews.length > 0) && <button className={visible_div === "reviews" ? sel_hotel_styles.sel_room_facilitiesbtn : sel_hotel_styles.room_facilitiesbtn} onClick={() => scroll_toview("reviews")}>Reviews  </button>
                  }                </div>
              </div>

              <Grid item id="overview">
                <span className={sel_hotel_styles.title_styles}>
                  About {hotel_info.HotelName} - Panaji
                </span>
              </Grid>
              <Grid item sx={{ fontSize: "14px", maxWidth: "100% !important" }}>
                {/* {console.log(isHTMLString("<p>heloo eolworkd</p>"),"descrition")} */}
                {htmlTagsRegex.test(hotel_info.Description) ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: hotel_info.Description }}
                  ></div>
                ):hotel_info.Description}
              </Grid>
              <Grid item sx={{ width: "auto", maxWidth: "100% !important" }}>
                <TabContext value={room_combinations}>
                  <Grid
                    item
                    alignItems={"center"}
                    id="rooms"
                    height={"35px"}
                    sx={{ display: "flex" }}
                  >
                    <TabList
                      onChange={handle_roomcombinations}
                      className={sel_hotel_styles.room_combination}
                    >
                      {room_info.length > 0 && (
                        <Tab
                          label="Fixed Room"
                          value={1}
                          disableRipple
                          sx={{
                            minHeight: "10px",
                            height: "35px",
                            width: "207px",
                            textTransform: "none",
                            maxWidth: "100%",
                          }}
                        />
                      )}
                      {(Object.keys(open_combination_rooms).length > 0||rooms_data?.RoomCombinationsArray===undefined )&& (
                        <Tab
                          label="Choose Room"
                          value={2}
                          disableRipple
                          sx={{
                            minHeight: "10px",
                            height: "35px",
                            width: "168px",
                            textTransform: "none",
                            maxWidth: "100%",
                          }}
                        />
                      )}{" "}
                    </TabList>

                    <div style={{ width: "100%", marginLeft: "2rem" }}>
                      {" "}
                      <Divider sx={{ backgroundColor: "#C1E7FF" }} />
                    </div>
                  </Grid>
                  <Grid item>
                    <TabPanel value={1} sx={{ paddingLeft: { md: "0px", xs: 'default' } }}>
                      <RadioGroup
                        value={selected_fixedroom}
                        onChange={handle_radio_btns}
                      >
                        {/* {console.log(room_info,"room information")} */}
                        <Grid container spacing={2}>
                          {room_info.length > 0 &&
                            room_info.map((item, internal_index) => {
                              // console.log(item,"rooms data")
                              return (
                                <>
                                  {item.RoomCombination.map((rooms, index) => {
                                    // console.log(rooms,"rooms")
                                    const unique_val = `${rooms.RoomIndex.join(
                                      "_"
                                    )}|${item?.CategoryId}`;
                                    return (
                                      <Grid item={1} md={4} sm={6} xs={12}>
                                        <Paper
                                          sx={{
                                            padding: "1.5rem",
                                            borderRadius: "0.5rem",
                                            backgroundColor: `${selected_fixedroom === unique_val
                                              ?styles.shade_color
                                              : "ffff"
                                              }`,
                                          }}
                                        >
                                          {/* {console.log(rooms.RoomIndex,"roomindex")} */}

                                          <FormControlLabel
                                            value={`${rooms.RoomIndex.join(
                                              "_"
                                            )}|${item.CategoryId}`}
                                            control={
                                              <Radio
                                                sx={{
                                                  color: "white",
                                                  "&, &.Mui-checked": {
                                                    color:styles.textcolor,
                                                  },
                                                }}
                                              />
                                            }
                                            label={`Combo${index + 1}`}//${item.CategoryId}
                                          />
                                          {rooms.RoomIndex.map(
                                            (each_room, index) => {
                                              const room =
                                                rooms_data.HotelRoomsDetails.find(
                                                  (obj) =>
                                                    obj.RoomIndex === each_room && obj?.CategoryId === item?.CategoryId
                                                );
                                              return (
                                                <>
                                                  {index > 0 && (
                                                    <Divider
                                                      className={
                                                        selected_fixedroom ===
                                                          rooms.RoomIndex.join(
                                                            "_"
                                                          )
                                                          ? sel_hotel_styles.sel_room_dividr
                                                          : sel_hotel_styles.dividr
                                                      }
                                                    />
                                                  )}{" "}
                                                  <Stack spacing={1} mt={1}>
                                                    <span
                                                      className={
                                                        sel_hotel_styles.room_title
                                                      }
                                                    >
                                                      {room.RoomTypeName}
                                                    </span>
                                                    <span
                                                      style={{
                                                        fontSize: "14px",
                                                        color: "#303030",
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      {room.Amenities.length > 0
                                                        ? room.Amenities.join(
                                                          ","
                                                        )
                                                        : "Room only"}
                                                    </span>
                                                    <ul
                                                      style={{
                                                        fontSize: "14px",
                                                        color: "#303030",
                                                        fontWeight: 400,
                                                      }}
                                                    >
                                                      <li>
                                                        {
                                                          room.CancellationPolicy
                                                        }
                                                      </li>
                                                    </ul>
                                                    {/* ₹ 7,499+₹ 900 taxes & fees */}
                                                    <span
                                                      style={{
                                                        fontSize: "14px",
                                                        color: "#303030",
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      {room.Price.CurrencyCode +
                                                        " " +
                                                        room?.Price
                                                          ?.PublishedPriceRoundedOff}
                                                    </span>
                                                    <ul
                                                      style={{
                                                        fontSize: "14px",
                                                        color: "#303030",
                                                        fontWeight: 400,
                                                      }}
                                                    >
                                                      {room.Amenity.slice(
                                                        0,
                                                        4
                                                      ).map((item, index) => {
                                                        return <li>{item}</li>;
                                                      })}
                                                    </ul>
                                                    {room.Amenity.length >
                                                      4 && (
                                                        <span
                                                          style={{
                                                            fontSize: "14px",
                                                            fontWeight: "500",
                                                            color: styles.app_color,
                                                          }}
                                                          onClick={() =>
                                                            handleaminities(
                                                              room.Amenity
                                                            )
                                                          }
                                                        >
                                                          MORE DETAILS
                                                        </span>
                                                      )}{" "}
                                                  </Stack>
                                                </>
                                              );
                                            }
                                          )}
                                        </Paper>
                                      </Grid>
                                    );
                                  })}
                                </>
                              );
                            })}
                        </Grid>
                      </RadioGroup>
                    </TabPanel>
                    <TabPanel value={2}>
                      <TabContext value={openroomstab}>
                        <TabList
                          onChange={handleopenroomstab}
                          className={sel_hotel_styles.open_rooms_tab}
                        >
                          {Array.from({ length: guests.length }, (_, index) => {
                            // console.log(index,"sldfjsj")
                            return (
                              <Tab
                                value={index + 1}
                                label={`Room${index + 1}`}
                                disableRipple
                                className={sel_hotel_styles.rooms_tab}
                                sx={{
                                  marginLeft: `${index > 0 ? "0.5rem" : "0rem"
                                    }`,
                                }}
                              />
                            );
                          })}
                        </TabList>
                        {/* {console.log(selected_openroom,"roomstate")} */}
                        {Array.from({ length: guests.length }, (_, index) => {
                          return (
                            <TabPanel value={index + 1}>
                              <RadioGroup
                                value={selected_gmtroom[index]}
                                onChange={(e) =>
                                  setSelected_gmtroom((prev)=>{
                                    const data=[...prev]
                                    data[index]=parseInt(e.target.value);
                                    return data;
                                  })
                                }
                              >
                                <Grid container spacing={2}>
                                  {rooms_data?.RoomCombinationsArray===undefined?
                                  // gmt open combination data to be displayed below
                                  <>
                                  {
                                    rooms_data?.HotelRoomsDetails.map((room,room_index)=>{
                                      console.log(room,"room hive")
                                     let slicedarray=selected_gmtroom.filter((item)=>item!==selected_gmtroom[index])
                                     if(slicedarray.includes(room.RoomIndex) ){
                                      return null;
                                     }
                                      return(
                                        <>
                                         <Grid item={1} md={4} xs={6}>
                                                <Paper
                                                  sx={{
                                                    padding: "1.5rem",
                                                    borderRadius: "0.5rem",
                                                    backgroundColor: '#fff'
                                                    // `${selected_fixedroom ===
                                                    //   rooms.RoomIndex.join("_")
                                                    //   ? "#DFF3FF"
                                                    //   : "ffff"
                                                    //   }`,
                                                  }}
                                                >
                                                  <FormControlLabel
                                                    value={room?.RoomIndex}
                                                    control={
                                                      <Radio
                                                        sx={{
                                                          color: "white",
                                                          "&, &.Mui-checked": {
                                                            color: styles.app_color,
                                                          },
                                                        }}
                                                      />
                                                    }
                                                    label={<span  className={
                                                      sel_hotel_styles.room_title
                                                    }>{room?.RoomTypeName}</span>}
                                                  /><>
                                                   <Stack spacing={1} mt={1}>
                                                            <span
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "#303030",
                                                                fontWeight: 500,
                                                              }}
                                                            >
                                                              {room?.Amenities
                                                                .length > 0
                                                                ? room?.Amenities.join(
                                                                  ","
                                                                )
                                                                : "Room only"}
                                                            </span>
                                                            <ul
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "#303030",
                                                                fontWeight: 400,
                                                              }}
                                                            >
                                                              <li>
                                                                {
                                                                  room?.CancellationPolicy
                                                                }
                                                              </li>
                                                            </ul>
                                                            <span
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "#303030",
                                                                fontWeight: 500,
                                                              }}
                                                            >
                                                              {room?.Price
                                                                .CurrencyCode +
                                                                " " +
                                                                room?.Price
                                                                  ?.PublishedPriceRoundedOff}
                                                            </span>
                                                            {/* <ul
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "#303030",
                                                                fontWeight: 400,
                                                              }}
                                                            >
                                                              {room.Amenity.slice(
                                                                0,
                                                                4
                                                              ).map(
                                                                (item, index) => {
                                                                  return (
                                                                    <li>{item}</li>
                                                                  );
                                                                }
                                                              )}
                                                            </ul> */}
                                                            {/* {room.Amenity.length >
                                                              4 && (
                                                                <span
                                                                  style={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "500",
                                                                    color: styles.app_color,
                                                                  }}
                                                                  onClick={() =>
                                                                    handleaminities(
                                                                      room.Amenity
                                                                    )
                                                                  }
                                                                >
                                                                  MORE DETAILS
                                                                </span>
                                                              )}{" "} */}
                                                          </Stack>
                                                  </>
                                                 
                                                </Paper>
                                              </Grid>
                                        
                                        </>
                                      )
                                    })
                                  }
                                  </>
                                  :
                                  // tbo open combination data to be displayed below
                                    (Object.keys(open_combination_rooms).length >
                                    0 &&
                                    open_combination_rooms[0]?.RoomCombination!==
                                    undefined&&
                                    open_combination_rooms[0]?.RoomCombination
                                      ?.InfoSource !== "FixedCombination" )&&
                                      open_combination_rooms.map((openroom,openindex)=>{
                                        return(
                                         <>
                                         {
                                          openroom.RoomCombination[index].RoomIndex.map((opencomb,combindex)=>{
                                            console.log(room,"brohave")
                                            const room =
                                            rooms_data.HotelRoomsDetails.find(
                                              (obj) =>
                                                obj.RoomIndex === opencomb //&& obj?.CategoryId === item?.CategoryId
                                            );
                                            return(
                                              <>
                                              {
                                                <Grid item={1} md={4} xs={6}>
                                                <Paper
                                                  sx={{
                                                    padding: "1.5rem",
                                                    borderRadius: "0.5rem",
                                                    backgroundColor: '#fff'
                                                    // `${selected_fixedroom ===
                                                    //   rooms.RoomIndex.join("_")
                                                    //   ? "#DFF3FF"
                                                    //   : "ffff"
                                                    //   }`,
                                                  }}
                                                >
                                                  <FormControlLabel
                                                    value={room?.RoomIndex}
                                                    control={
                                                      <Radio
                                                        sx={{
                                                          color: "white",
                                                          "&, &.Mui-checked": {
                                                            color: styles.app_color,
                                                          },
                                                        }}
                                                      />
                                                    }
                                                    label={<span  className={
                                                      sel_hotel_styles.room_title
                                                    }>{room?.RoomTypeName}</span>}
                                                  /><>
                                                   <Stack spacing={1} mt={1}>
                                                            {/* <span
                                                              className={
                                                                sel_hotel_styles.room_title
                                                              }
                                                            >
                                                              {room?.RoomTypeName}
                                                            </span> */}
                                                            <span
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "#303030",
                                                                fontWeight: 500,
                                                              }}
                                                            >
                                                              {room?.Amenities
                                                                .length > 0
                                                                ? room?.Amenities.join(
                                                                  ","
                                                                )
                                                                : "Room only"}
                                                            </span>
                                                            <ul
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "#303030",
                                                                fontWeight: 400,
                                                              }}
                                                            >
                                                              <li>
                                                                {
                                                                  room?.CancellationPolicy
                                                                }
                                                              </li>
                                                            </ul>
                                                            {/* ₹ 7,499+₹ 900 taxes & fees */}
                                                            <span
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "#303030",
                                                                fontWeight: 500,
                                                              }}
                                                            >
                                                              {room?.Price
                                                                .CurrencyCode +
                                                                " " +
                                                                room?.Price
                                                                  ?.PublishedPriceRoundedOff}
                                                            </span>
                                                            {/* <ul
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "#303030",
                                                                fontWeight: 400,
                                                              }}
                                                            >
                                                              {room.Amenity.slice(
                                                                0,
                                                                4
                                                              ).map(
                                                                (item, index) => {
                                                                  return (
                                                                    <li>{item}</li>
                                                                  );
                                                                }
                                                              )}
                                                            </ul> */}
                                                            {/* {room.Amenity.length >
                                                              4 && (
                                                                <span
                                                                  style={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "500",
                                                                    color:  styles.app_color,
                                                                  }}
                                                                  onClick={() =>
                                                                    handleaminities(
                                                                      room.Amenity
                                                                    )
                                                                  }
                                                                >
                                                                  MORE DETAILS
                                                                </span>
                                                              )}{" "} */}
                                                          </Stack>
                                                  </>
                                                 
                                                </Paper>
                                              </Grid>
                                              }
                                              </>
                                            )
                                          })
                                         }
                                         </>
                                        )
                                      })
                                  }
                                </Grid>
                              </RadioGroup>
                            </TabPanel>
                          );
                        })}
                      </TabContext>
                    </TabPanel>
                  </Grid>
                </TabContext>
              </Grid>
              {/* <Grid item>
            <Paper sx={{borderRadius:'0.5rem'}}>
              <Grid container>
                <Grid item md={3.5} p={2}>
                  <Grid item><img src={standard_room} alt="statndardroom" width='100%' height="100%"/></Grid>
                </Grid>
                <Grid item container md={8.5} mt={2}>
                  <Grid item md={6}>
                    <Stack spacing={1}>
                      <span className={sel_hotel_styles.room_title}>Lagoon Superior Room, 1 King, Lagoon View</span>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>Room with Breakfast</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>This booking is non-refundable and the tariff cannot be cancelled with zero fee.</li>
                        <li>Free Breakfast</li>
                      </ul>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>₹ 7,499+₹ 900 taxes & fees</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>364 sq.ft</li>
                        <li>Garden View </li>
                        <li>King Bed</li>
                        <li>Free Wi-Fi</li>
                        <li>Iron/Ironing Board</li>
                      </ul>
                      <span style={{fontSize:"14px",fontWeight:'500',color: styles.app_color}}>MORE DETAILS</span>
                      <button className={sel_hotel_styles.sel_roombtn}>Select Room</button>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack spacing={1}>
                      <span className={sel_hotel_styles.room_title}>Lagoon Superior Room, 1 King, Lagoon View</span>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>Room with Breakfast</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>This booking is non-refundable and the tariff cannot be cancelled with zero fee.</li>
                        <li>Free Breakfast</li>
                      </ul>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>₹ 7,499+₹ 900 taxes & fees</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>364 sq.ft</li>
                        <li>Garden View </li>
                        <li>King Bed</li>
                        <li>Free Wi-Fi</li>
                        <li>Iron/Ironing Board</li>
                      </ul>
                      <span style={{fontSize:"14px",fontWeight:'500',color: styles.app_color}}>MORE DETAILS</span>
                      <button className={sel_hotel_styles.sel_roombtn}>Select Room</button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container alignItems={'center'} >
            <Grid item md={1.5}><span className={sel_hotel_styles.title_styles}>Deluxe Room</span></Grid>
            <Grid item md={10.5}><Divider sx={{backgroundColor:'#C1E7FF'}}/></Grid>
          </Grid>
          <Grid item>
            <Paper sx={{borderRadius:'0.5rem'}}>
              <Grid container>
                <Grid item md={3.5} p={2}>
                  <Grid item><img src={deluxe_room} alt="statndardroom" width='100%' height="100%"/></Grid>
                </Grid>
                <Grid item container md={8.5} mt={2}>
                  <Grid item md={6}>
                    <Stack spacing={1}>
                      <span className={sel_hotel_styles.room_title}>Lagoon Deluxe Room</span>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>Room with Breakfast</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>This booking is non-refundable and the tariff cannot be cancelled with zero fee.</li>
                        <li>Free Breakfast</li>
                      </ul>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>₹ 7,499+₹ 900 taxes & fees</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>364 sq.ft</li>
                        <li>Garden View </li>
                        <li>King Bed</li>
                        <li>Free Wi-Fi</li>
                        <li>Iron/Ironing Board</li>
                      </ul>
                      <span style={{fontSize:"14px",fontWeight:'500',color: styles.app_color}}>MORE DETAILS</span>
                      <button className={sel_hotel_styles.sel_roombtn}>Select Room</button>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack spacing={1}>
                      <span className={sel_hotel_styles.room_title}>Lagoon Deluxe Room</span>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>Room with Breakfast</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>This booking is non-refundable and the tariff cannot be cancelled with zero fee.</li>
                        <li>Free Breakfast</li>
                      </ul>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>₹ 7,499+₹ 900 taxes & fees</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>364 sq.ft</li>
                        <li>Garden View </li>
                        <li>King Bed</li>
                        <li>Free Wi-Fi</li>
                        <li>Iron/Ironing Board</li>
                      </ul>
                      <span style={{fontSize:"14px",fontWeight:'500',color: styles.app_color}}>MORE DETAILS</span>
                      <button className={sel_hotel_styles.sel_roombtn}>Select Room</button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container alignItems={'center'} >
            <Grid item md={1.5}><span className={sel_hotel_styles.title_styles}>Suite Room</span></Grid>
            <Grid item md={10.5}><Divider sx={{backgroundColor:'#C1E7FF'}}/></Grid>
          </Grid>
          <Grid item>
            <Paper sx={{borderRadius:'0.5rem'}}>
              <Grid container>
                <Grid item md={3.5} p={2}>
                  <Grid item><img src={suite_room} alt="statndardroom" width='100%' height="100%"/></Grid>
                </Grid>
                <Grid item container md={8.5} mt={2}>
                  <Grid item md={6}>
                    <Stack spacing={1}>
                      <span className={sel_hotel_styles.room_title}>Lagoon Suite Room</span>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>Room with Breakfast</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>This booking is non-refundable and the tariff cannot be cancelled with zero fee.</li>
                        <li>Free Breakfast</li>
                      </ul>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>₹ 7,499+₹ 900 taxes & fees</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>364 sq.ft</li>
                        <li>Garden View </li>
                        <li>King Bed</li>
                        <li>Free Wi-Fi</li>
                        <li>Iron/Ironing Board</li>
                      </ul>
                      <span style={{fontSize:"14px",fontWeight:'500',color: styles.app_color}}>MORE DETAILS</span>
                      <button className={sel_hotel_styles.sel_roombtn}>Select Room</button>
                    </Stack>
                  </Grid>
                  <Grid item md={6}>
                    <Stack spacing={1}>
                      <span className={sel_hotel_styles.room_title}>Lagoon Suite Room</span>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>Room with Breakfast</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>This booking is non-refundable and the tariff cannot be cancelled with zero fee.</li>
                        <li>Free Breakfast</li>
                      </ul>
                      <span style={{fontSize:'14px',color:'#303030',fontWeight:500}}>₹ 7,499+₹ 900 taxes & fees</span>
                      <ul style={{fontSize:'14px',color:'#303030',fontWeight:400}}>
                        <li>364 sq.ft</li>
                        <li>Garden View </li>
                        <li>King Bed</li>
                        <li>Free Wi-Fi</li>
                        <li>Iron/Ironing Board</li>
                      </ul>
                      <span style={{fontSize:"14px",fontWeight:'500',color: styles.app_color}}>MORE DETAILS</span>
                      <button className={sel_hotel_styles.sel_roombtn}>Select Room</button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid> */}
              {/* <Grid item id="aminities" sx={{ maxWidth: "100% !important" }}>
                <Stack spacing={1}>
                  <span className={sel_hotel_styles.title_styles}>
                    Amenities
                  </span>
                  <Grid container columnGap={2.4} rowGap={1}>
                    <Grid item>
                      <Stack direction="row" spacing={1} alignItems={"center"}>
                        <LocalHospitalIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#303030!important",
                          }}
                        />{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#303030!important",
                          }}
                        >
                          Doctor On Call
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={1}>
                        <img src={firstaid} alt="firstaid" />{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#303030!important",
                          }}
                        >
                          Doctor On Call
                        </span>
                      </Stack>
                    </Grid>
                    <Grid>
                      <Stack direction="row" spacing={1}>
                        <img src={service} alt="service" />{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#303030!important",
                          }}
                        >
                          Services
                        </span>
                      </Stack>
                    </Grid>
                    <Grid>
                      <Stack direction="row" spacing={1}>
                        <LocalBarIcon
                          sx={{
                            fontSize: "1.2rem",
                            color: "#303030!important",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#303030!important",
                          }}
                        >
                          Bar
                        </span>
                      </Stack>
                    </Grid>
                    <Grid>
                      <Stack direction="row" spacing={1}>
                        <img src={cctv} alt="cctv" />{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#303030!important",
                          }}
                        >
                          CCTV surveillance
                        </span>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid> */}
              {hotel_info?.Images!==undefined&&<Grid item id="gallery" sx={{ maxWidth: "100% !important" }}>
                <Stack>
                  <span className={sel_hotel_styles.title_styles}>Gallery</span>
                  <Grid container item spacing={1} mt={1}>
                    <Grid
                      height={{ md: "400px", xs: "fit-content" }}
                      item
                      md={6}
                      xs={12}
                    >
                      {/* {console.log(hotel_info,"information")} */}
                      <img
                        style={{ objectFit: "cover" }}
                        src={hotel_info?.Images[0]}
                        alt="room1"
                        width={"100%"}
                        height="100%"
                      />
                    </Grid>
                    <Grid item container md={6} xs={12} spacing={1}>
                      {hotel_info.Images[1]&&<Grid height={"200px"} item md={6} xs={6}>
                        <img
                          style={{ objectFit: "cover" }}
                          src={hotel_info.Images[1]}
                          alt="room2"
                          width={"100%"}
                          height="100%"
                        />
                      </Grid>}
                      {hotel_info.Images[2]&&<Grid height={"200px"} item md={6} xs={6}>
                        <img
                          style={{ objectFit: "cover" }}
                          src={hotel_info.Images[2]}
                          alt="room3"
                          width={"100%"}
                          height="100%"
                        />
                      </Grid>}
                      {hotel_info.Images[3]&&<Grid height={"200px"} item md={6} xs={6}>
                        <img
                          style={{ objectFit: "cover" }}
                          src={hotel_info.Images[3]}
                          alt="room5"
                          width={"100%"}
                          height="100%"
                        />
                      </Grid>}
                      {hotel_info.Images[4]&&<Grid height={"200px"} item md={6} xs={6}>
                        <Grid sx={{ position: "relative", width: '100%', height: '100%' }}>
                          <img
                            style={{ objectFit: "cover" }}
                            src={hotel_info.Images[4]}
                            alt="room4"
                            width={"100%"}
                            height="100%"
                          />
                          {hotel_info.Images?.length > 5&&<Grid onClick={() => setGalleryopen(true)} sx={{ position: 'absolute', inset: '0%', background: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer' }}>View All</Grid>}
                        </Grid>
                      </Grid>}
                    </Grid>
                  </Grid>
                  {/* {hotel_info.Images.length > 5 && (
                    <Grid item textAlign={"right"}>
                      <button
                        onClick={() => setGalleryopen(true)}
                        style={{
                          border: "none",
                          background: "none",
                          backgroundColor:  styles.app_color,
                          color: "#fff",
                          fontWeight: "600",
                          borderRadius: "0.5rem",
                        }}
                      >
                        View All
                      </button>
                    </Grid>
                  )} */}
                </Stack>
              </Grid>}
              {/* <Grid item id="location" sx={{maxWidth:'100% !important'}}>
            <Stack>
              <span className={sel_hotel_styles.title_styles}>Location</span>
                <Grid item md={6.90} xs={11.91} pl={'0.2rem'}>
                  <TextField fullWidth size="small" placeholder='Search  Area, Landmark or Transit nearby' InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon/>
                      </InputAdornment>
                    ),
                  }}/>
                </Grid>
              <Grid container spacing={1.5}>
                <Grid item md={7} sm={12} xs={12}>
                  <img src={map} alt="map" width="100%" height="100%"/>
                </Grid>
                <Grid item md={5} sm={12} xs={12} >
                  <List sx={{paddingLeft:{md:'2rem',xs:'0rem'}}}>
                    <ListItem disableGutters>
                    <ListItemIcon sx={{minWidth:'35px'}}><DirectionsRailwayFilledIcon sx={{color:'#303030'}} /></ListItemIcon>
                    <ListItemText primary={<span className={sel_hotel_styles.location_data}>Railway Station</span>} />
                    <span className={sel_hotel_styles.distance_Style}>1 km</span>
                    </ListItem>
                    <ListItem disableGutters>
                    <ListItemIcon sx={{minWidth:'35px'}}><DirectionsBusFilledIcon sx={{color:'#303030'}}/></ListItemIcon>
                    <ListItemText primary={<span className={sel_hotel_styles.location_data}>Bus Stop</span>}/>
                    <span className={sel_hotel_styles.distance_Style}>1 km</span>
                    </ListItem>
                    <ListItem disableGutters>
                    <ListItemIcon sx={{minWidth:'35px',paddingLeft:'2px'}}><img src={main_road} alt="mainroad" width="50%"/></ListItemIcon>
                    <ListItemText primary={<span className={sel_hotel_styles.location_data}>MainRoad</span>}/>
                    <span className={sel_hotel_styles.distance_Style}>1 km</span>
                    </ListItem>
                    <ListItem disableGutters>
                    <ListItemIcon sx={{minWidth:'35px'}}><LocalHospitalIcon sx={{color:'#303030'}}/></ListItemIcon>
                    <ListItemText primary={<span className={sel_hotel_styles.location_data}>Hospitals</span>}/>
                    <span className={sel_hotel_styles.distance_Style}>1 km</span>
                    </ListItem>
                    <ListItem disableGutters>
                    <ListItemIcon sx={{minWidth:'35px'}}><img src={atm} alt="atm" width="68%"/></ListItemIcon>
                    <ListItemText primary={<span className={sel_hotel_styles.location_data}>ATM</span>}/>
                    <span className={sel_hotel_styles.distance_Style}>1 km</span>
                    </ListItem>
                    <ListItem disableGutters>
                    <ListItemIcon sx={{minWidth:'35px',paddingLeft:'2px'}}><img src={food_court} alt="food_court" width="48%"/></ListItemIcon>
                    <ListItemText primary={<span className={sel_hotel_styles.location_data}>Food Court</span>}/>
                    <span className={sel_hotel_styles.distance_Style}>1 km</span>
                    </ListItem>
                  </List>
                  <Stack sx={{paddingLeft:{md:'2rem',xs:'0rem'}}}>
                    <span style={{fontFamily:'poppins',fontSize:'14px',fontWeight:600}}>
                    Address
                    </span>
                    <span style={{fontSize:'14px'}}>This laid-back, countryside hotel is 3 km from Anjuna Beach and 4 km from Baga Beach.</span>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item sx={{maxWidth:'100% !important'}}>
            <Stack>
              <span className={sel_hotel_styles.title_styles}>Comparing Similar Properties</span>
              <Grid container columnGap={2} rowGap={1} justifyContent={'space-between'}>
                <Grid item md={3.8} sm={5.8} xs={12}>
                  <Card sx={{width:'100%',borderRadius:'0.5rem'}}>
                    <Box padding={"1rem"}>
                    <CardMedia
                     component="img"
                     image={basanti_hotel}
                     alt="basanti_hotel"
                     width="100%"
                     height="100%"
                     />
                      <Grid container direction="column" mt={0.5} spacing={1}>
                        <Grid item><span className={sel_hotel_styles.distance_Style}>Basanthi Hotel</span></Grid>
                        <Grid item>
                          <Stack direction="row" spacing={1}>
                            <span className={sel_hotel_styles.distance_Style}>4.2</span>
                            {[1,2,3,4,5].map((item,index)=>{
                              return(
                                <img src={Ratingstar} alt="ratingstar" />
                              )
                            })}
                          </Stack>
                        </Grid>
                        <Grid item><span className={sel_hotel_styles.distance_Style}>₹ 7,499+₹ 900 taxes & fees</span></Grid>
                        <Grid item><span style={{fontSize:'14px'}}>This laid-back, countryside hotel is 3 km from Anjuna Beach in Goa</span></Grid>
                      </Grid>
                     </Box>
                     <Grid item textAlign={'right'}><button className={sel_hotel_styles.cardbooknow_btn}>Book Now</button></Grid>
                  </Card>
                </Grid>
                <Grid item md={3.8} sm={5.8} xs={12}>
                  <Card sx={{width:'100%',borderRadius:'0.5rem'}}>
                    <Box padding={"1rem"}>
                    <CardMedia
                     component="img"
                     image={basanti_hotel}
                     alt="basanti_hotel"
                     width="100%"
                     height="100%"
                     />
                      <Grid container direction="column" mt={0.5} spacing={1}>
                        <Grid item><span className={sel_hotel_styles.distance_Style}>Basanthi Hotel</span></Grid>
                        <Grid item>
                          <Stack direction="row" spacing={1}>
                            <span className={sel_hotel_styles.distance_Style}>4.2</span>
                            {[1,2,3,4,5].map((item,index)=>{
                              return(
                                <img src={Ratingstar} alt="ratingstar" />
                              )
                            })}
                          </Stack>
                        </Grid>
                        <Grid item><span className={sel_hotel_styles.distance_Style}>₹ 7,499+₹ 900 taxes & fees</span></Grid>
                        <Grid item><span style={{fontSize:'14px'}}>This laid-back, countryside hotel is 3 km from Anjuna Beach in Goa</span></Grid>
                      </Grid>
                     </Box>
                     <Grid item textAlign={'right'}><button className={sel_hotel_styles.cardbooknow_btn}>Book Now</button></Grid>
                  </Card>
                </Grid>
                <Grid item md={3.8} sm={5.8} xs={12}>
                  <Card sx={{width:'100%',borderRadius:'0.5rem'}}>
                    <Box padding={"1rem"}>
                    <CardMedia
                     component="img"
                     image={basanti_hotel}
                     alt="basanti_hotel"
                     width="100%"
                     height="100%"
                     />
                      <Grid container direction="column" mt={0.5} spacing={1}>
                        <Grid item><span className={sel_hotel_styles.distance_Style}>Basanthi Hotel</span></Grid>
                        <Grid item>
                          <Stack direction="row" spacing={1}>
                            <span className={sel_hotel_styles.distance_Style}>4.2</span>
                            {[1,2,3,4,5].map((item,index)=>{
                              return(
                                <img src={Ratingstar} alt="ratingstar" />
                              )
                            })}
                          </Stack>
                        </Grid>
                        <Grid item><span className={sel_hotel_styles.distance_Style}>₹ 7,499+₹ 900 taxes & fees</span></Grid>
                        <Grid item><span style={{fontSize:'14px'}}>This laid-back, countryside hotel is 3 km from Anjuna Beach in Goa</span></Grid>
                      </Grid>
                     </Box>
                     <Grid item textAlign={'right'}><button className={sel_hotel_styles.cardbooknow_btn}>Book Now</button></Grid>
                  </Card>
                </Grid>
                
              </Grid>
            </Stack>
          </Grid>*/}
              {(Object.keys(hotel_reviews).length > 0 && hotel_reviews.reviews.length > 0) && <Grid item id="reviews" sx={{ maxWidth: '100% !important' }}>
                <span className={sel_hotel_styles.title_styles}>Reviews</span>
                <Stack spacing={1} sx={{maxHeight:'300px',overflowY:'scroll'}} className="scroll_none">
                  {
                    hotel_reviews.reviews.length > 0 && hotel_reviews.reviews.map((review, review_index) => {
                      return (
                        <Paper sx={{ padding: "1rem", borderRadius: '0.5rem' }} elevation={2}>
                          <Stack>
                            <Grid item container>
                              <Grid item lg={0.5} md={0.7} sm={1} xs={2}><Avatar alt="" src={review.cover_pic} /></Grid>
                              <Grid item lg={11.5} md={11.3} sm={11} xs={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Stack>
                                  <span style={{ fontSize: '14px', fontFamily: 'poppins', fontWeight: 700 }}>{review.first_name}</span>
                                  <Rating value={review?.rating === null ? 0 : review.rating} readOnly />
                                </Stack>
                              </Grid>
                            </Grid>
                            <Grid container item direction="column">
                              <Grid item style={{ fontSize: '12px', color: '#303030', fontWeight: 400 }}>{review.review}</Grid>
                            </Grid>
                          </Stack>
                        </Paper>
                      )
                    })
                  }

                  {/* <Paper sx={{padding:"1rem",borderRadius:'0.5rem'}} elevation={2}>
              <Stack>
                <Grid item container>
                  <Grid item lg={0.5} md={0.7} sm={1} xs={2}><Avatar alt="" src=""/></Grid>
                  <Grid item lg={11.5} md={11.3} sm={11} xs={10} sx={{display:'flex',justifyContent:'space-between'}}>
                    <Stack>
                      <span style={{fontSize:'14px',fontFamily:'poppins',fontWeight:700}}>Priyanka</span>
                      <span>{[1,2,3,4,5].map((item,index)=>{
                        return(
                          <img src={Ratingstar} alt="ratingstar"/>
                        )
                      })}</span>
                    </Stack>
                    <span style={{fontSize:'12px',color:'#303030',fontWeight:400}}>03/08/2022</span>
                  </Grid>
                </Grid>
                <Grid container item direction="column">
                  <Grid item style={{fontSize:'14px',fontFamily:'poppins',fontWeight:700}}>Amazing Service</Grid>
                  <Grid item style={{fontSize:'12px',color:'#303030',fontWeight:400}}>As a room service server, your primary responsibilities are to deliver food, drinks, and any necessary utensils and condiments to guests who order meals from their hotel rooms.</Grid>
                </Grid>
                </Stack>
             </Paper> */}
                  {/* <Paper sx={{padding:"1rem",borderRadius:'0.5rem'}} elevation={2}>
              <Stack>
                <Grid item container>
                  <Grid item lg={0.5} md={0.7} sm={1} xs={2}><Avatar alt="" src=""/></Grid>
                  <Grid item lg={11.5} md={11.3} sm={11} xs={10} sx={{display:'flex',justifyContent:'space-between'}}>
                    <Stack>
                      <span style={{fontSize:'14px',fontFamily:'poppins',fontWeight:700}}>Priyanka</span>
                      <span>{[1,2,3,4,5].map((item,index)=>{
                        return(
                          <img src={Ratingstar} alt="ratingstar"/>
                        )
                      })}</span>
                    </Stack>
                    <span style={{fontSize:'12px',color:'#303030',fontWeight:400}}>03/08/2022</span>
                  </Grid>
                </Grid>
                <Grid container item direction="column">
                  <Grid item style={{fontSize:'14px',fontFamily:'poppins',fontWeight:700}}>Amazing Service</Grid>
                  <Grid item style={{fontSize:'12px',color:'#303030',fontWeight:400}}>As a room service server, your primary responsibilities are to deliver food, drinks, and any necessary utensils and condiments to guests who order meals from their hotel rooms.</Grid>
                </Grid>
                </Stack>
             </Paper> */}
                </Stack>
              </Grid>}
            </Grid>
          </Container>
          <Grid item sx={{ background:styles.app_color, height: "5rem" }} mt={2}>
            <Container maxWidth="xl">
              <Grid container pt={2.5}>
                <Grid
                  item
                  container
                  md={8}
                  xs={8}
                  sx={{ display: { md: "flex", xs: "none" } }}
                >
                  <Grid item md={2.5} xs={2.5}>
                    <Stack spacing={1}>
                      <span style={{ fontSize: "12px", color: "#fff" }}>
                        Check-In {checkin_time}
                      </span>
                      <span style={{ fontSize: "12px", color: "#fff" }}>
                        {helperFunctions.get_short_date(
                          hotelresult.CheckInDate
                        )}
                      </span>
                    </Stack>
                  </Grid>
                  <Grid item md={2} xs={2} mt={1}>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "#fff",
                        fontSize: "12px",
                        fontWeight: 500,
                        width: "4rem",
                        height: "1.3rem",
                        borderRadius: "0.5rem",
                      }}
                    >{`${helperFunctions.nights_calc(
                      hotelresult.CheckInDate,
                      hotelresult.CheckOutDate
                    )} ${helperFunctions.nights_calc(
                      hotelresult.CheckInDate,
                      hotelresult.CheckOutDate
                    ) > 1
                      ? "Nights"
                      : "Night"
                      }`}</button>
                  </Grid>
                  <Grid container item md={3} xs={3}>
                    <Grid item md={10} xs={10}>
                      <Stack spacing={1}>
                        <span style={{ fontSize: "12px", color: "#fff" }}>
                          {" "}
                          Check-Out {checkout_time}
                        </span>
                        <span style={{ fontSize: "12px", color: "#fff" }}>
                          {helperFunctions.get_short_date(
                            hotelresult.CheckOutDate
                          )}
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item md={2} xs={2} mt={1}>
                      <EditIcon
                        sx={{ color: "#fff" }}
                        onClick={() =>{selected_city?.type==="1"?navigate("/Hotels/all_hotels"):navigate("/Hotels")}}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    md={3}
                    xs={3}
                    sx={{
                      borderLeft: "1px solid #fff",
                      borderRight: "1px solid #fff",
                    }}
                  >
                    <Grid item md={10} xs={10} textAlign={"center"}>
                      <Stack spacing={1}>
                        <span style={{ fontSize: "12px", color: "#fff" }}>
                          Guests & Rooms
                        </span>
                        <span style={{ fontSize: "12px", color: "#fff" }}>{`${adults + child
                          } Guests, ${rooms} Room`}</span>
                      </Stack>
                    </Grid>
                    <Grid item md={2} xs={2} mt={1}>
                      <EditIcon
                        sx={{ color: "#fff" }}
                        onClick={() =>{selected_city?.type==="1"?navigate("/Hotels/all_hotels"):navigate("/Hotels")}}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  md={1.8}
                  xs={6}
                  textAlign={"right"}
                  sx={{ textAlign: { md: "right", xs: "center" } }}
                  mt={1}
                  pr={2}
                >
                  {/* {console.log(rooms_data,"roomsdata")} */}
                  <span
                    style={{ color: "#fff" }}
                  >{`${rooms_data?.HotelRoomsDetails[0].Price?.CurrencyCode} ${room_combinations===1?sel_rooms_price:Hotelhelpers.open_room_price(room_details.HotelRoomsDetails,selected_gmtroom)}`}</span>
                </Grid>
                {/* ${sel_rooms_price} */}
                <Grid item md={2.2} xs={6} textAlign={"right"}>
                  <button
                    className={sel_hotel_styles.booknow_btn}
                    onClick={() => Bookroom()}
                  >
                    Book Now
                  </button>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Selected_hotel;
