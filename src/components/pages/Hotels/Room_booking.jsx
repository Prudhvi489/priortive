import {
  Container,
  Divider,
  Checkbox,
  InputLabel,
  Button,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Breadcrumbs,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { room_booking } from "../../../assets/styles/Hotelstyles";
import { ticketbooking } from "../../../assets/styles/Flights";
import { makeStyles } from "@mui/styles";
import Ratingstar from "../../../assets/Hotelimages/Ratingstar.svg";
import Refundpolicy from "../../../assets/images/Refundpolicy.svg";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import correct from "../../../assets/images/correct.svg";
import Hotelconfirmation from "../../modals/Hotelmodals/Hotelconfirmation";
import personblue from "../../../assets/images/personblue.svg";
import traveller from "../../../assets/images/traveller.svg";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import person from "../../../assets/images/person.svg";
import calender from "../../../assets/images/calender.svg";
import passport from "../../../assets/images/passport.svg";
import pan_card from "../../../assets/images/pan_card.svg";
import Email from "../../../assets/images/Email.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tickettravellers from "../../modals/Signupmodals/Tickettravellers";
import { Apipost } from "../../../ApiServices/Apicalls.js";
import Countrycodefilter from "../../modals/Signupmodals/Countrycodefilter";
import { useLocation, useNavigate } from "react-router-dom";
import helperFunctions from "../../../helpers/helperFunctions";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loadingmodal from "../../modals/Signupmodals/Loadingmodal";
import PromoCodes from "../../OffersCarousel/PromoCodes";
import Importantinfo from "../../OffersCarousel/Importantinfo";
import { regex_data } from "../../../components/Regex";
import { envdata } from "../../Envexports";
import MySnackbar from "../../modals/Signupmodals/Snackbar";
import Why_gmt from "../../why_gmt/Why_gmt";
import { sha512 } from "js-sha512";
import { HotelBookingDetailsActions } from "../../../store/Hotelslices.jsx/HotelBookDetails";
import Hotelhelpers from "../../../helpers/Hotelhelpers";
import {styles} from '../../../assets/styles/Styles_export'
const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white!important",
    background: `${styles.app_color}!important`,
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${styles.app_color}!important`,
      },
    },
  },
  travelerinfo: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#EDEDED!important",
      },
    },
  },
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
  },
  root1: {
    "& > *": {
      margin: 0,
      padding: 0,
    },
  },
}));
// const baseurl = process.env.REACT_APP_BASEURL;
const Room_booking = () => {
  const navigate = useNavigate();
  const ticketbook = ticketbooking();
  const classes = useStyles();
  const dispatch = useDispatch();
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  }
  //
  const room_style = room_booking();
  const [offers, setOffers] = useState(50);
  const [health_insurance, setHealth_insurance] = useState("yes");
  const [hotelbooked, setHotelbooked] = useState(false);
  const [require_all_pax_details, setRequire_all_pax_details] = useState(false);
  const [gmt_fee, setGmt_fee] = useState(100);
  const [coupons, setCoupons] = useState({});
  const [persons, setPersons] = useState([
    {
      adult_state: [
        {
          type: 1,
          first_name: "",
          last_name: "",
          gender: 0,
          dob: "",
          passport_num: "",
          passport_exp: "",
          title: 1,
          passport_issue: "",
          passport_issue_country: "",
          pan_no: "",
          f_name_err: false,
          l_name_err: false,
          dob_err: false,
          p_num_err: false,
          p_exp_err: false,
          title_err: false,
          passport_issue_err: false,
          passport_issue_country_err: false,
          pan_no_err: false,
        },
      ],
      child_state: [
        {
          type: 2,
          first_name: "",
          last_name: "",
          gender: 0,
          dob: "",
          passport_num: "",
          passport_exp: "",
          title: 3,
          passport_issue: "",
          passport_issue_country: "",
          pan_no: "",
          f_name_err: false,
          l_name_err: false,
          dob_err: false,
          p_num_err: false,
          p_exp_err: false,
          title_err: false,
          passport_issue_err: false,
          passport_issue_country_err: false,
          pan_no_err: false,
        },
      ],
    },
  ]);
  const [adult_num, setAdult_num] = useState(1);
  const [child_num, setChild_num] = useState(0);
  const [ticket_receiver_info, setTicket_receiver_info] = useState({
    email: "",
    mobile: "",
    email_err: false,
    mobile_err: false,
  });
  const [viewtravellerdialog, setViewtravellerdialog] = useState(false);
  const [selectedcountry, setSelectedcountry] = useState({
    id: 74,
    country_name: "India",
    country_code: "IN",
    code: "+91",
    country_flag: `${envdata.baseurl}/in.png`,
  });
  const [traveller_index, setTraveller_index] = useState("");
  const [travellerdata, setTravellerdata] = useState([]);
  const [countrydialog, setCountrydialog] = useState(false);
  const [book_req, setBook_req] = useState("");
  const [price_change, setPrice_change] = useState(false);
  const [changed_room_data, setChanged_room_data] = useState("");
  const [booking_details, setBooking_details] = useState("");
  const [loading, setLoading] = useState(false);
  const [open_combination,setOpen_combination]=useState(false);
  const [prices, setPrices] = useState({
    discount: 0,
    updatedprice: 0,
    totalprice: 0,
    coupon_id: "",
    coupon_code: "",
  });
  const textFieldRef = useRef(null);
  const ticker_receivers_ref = useRef(null);
  const hotel_details = useSelector((state) => state.hotel_room.hotelinfo);
  // console.log(hotel_details,"hotel detaisl")
  const hotel_code = useSelector((state) => state.hotel_room.hotel_code);
  const profile = useSelector((state) => state.profile.profiledata);
  const hotel_index = useSelector(
    (state) => state.hotel_room.hotel_resultindex
  );
  let hotelresult = useSelector((state) => state.hotel_data.hotelresult);
  let searchtype = useSelector((state) => state.hotel_data.destination).type;
  const room_details = useSelector((state) => state.hotel_room.roominfo);
  console.log(room_details,"roodetailsbro")
  const hotel_info = hotel_details.HotelDetails;
  const location1 = useLocation();
  let first_split;
  let splitarray;
  let category_ids;
  let selectedroom;
  let cancellation_policies;
  let fixed_room_price;
  let open_room_price;
  // if(room_details?.RoomCombinationsArray[0]?.InfoSource==="OpenCombination"){
    // alert("sdjfj")
    // setOpen_combination(true);
                    // selected_room=location1.state[0]
                    // cancellation_policies=[{Charge: 100, ChargeType: 2, Currency: 'INR', FromDate: '2023-09-15T00:00:00', ToDate: '2023-09-16T23:59:59'}]
  // }
  // else{
    // setOpen_combination(false)
    if(room_details?.RoomCombinationsArray!==undefined){
    fixed_room_price = helperFunctions.hotel_fixedroom_price(
      location1.state,
      room_details.HotelRoomsDetails
    );
  first_split = location1.state.split("_");
  console.log(first_split,"split array")
  splitarray = first_split.map((split_item) => split_item.split("|"));
  // category_ids = splitarray.map((item) => item[1]);
  category_ids=first_split[first_split.length-1].split("|")[1]
  selectedroom = splitarray.map((item) => parseInt(item[0]));
  console.log(selectedroom,"selected rooom");
  console.log(category_ids,"category")
  cancellation_policies = room_details.HotelRoomsDetails.find(
    (item) => item.RoomIndex === selectedroom[0]
  ).CancellationPolicies;
    }
    else{
      open_room_price=Hotelhelpers.open_room_price(room_details.HotelRoomsDetails,location1.state);
      selectedroom=location1.state[0];
      cancellation_policies=room_details.HotelRoomsDetails.find(
        (item) => item.RoomIndex === selectedroom
      ).CancellationPolicies;
    }
  // }
//  console.log(cancellation_policies,"cancaelltioinpoliciate")
  const checkintime = useSelector((state) => state.hotel_room.checkin);
  const checkouttime = useSelector((state) => state.hotel_room.checkout);
  // hotel guests validation
  const guests_details = useSelector((state) => state.hotel_guestcount.guests);
  // Guests validations
  const hotel_guest_validation = async (data, roomindex, room) => {
    console.log(room,"hadarata")
    let stopExecution = false;
    let roomguests = [];
    outerLoop: for (const item in data) {
      let guest = {
        //  "Middlename":null,
        //  "Age":null,
        LeadPassenger: false,
        //  "Phoneno":null,
        //  "Email":null,
        //  "PassportNo":null,
        //  "PassportIssueDate":null,
        //  "PassportExpDate":null,
        //  "PAN":null
      };
      const innerArray = data[item];
      for (let i = 0; i < innerArray.length; i++) {
        const value = innerArray[i];
        guest.Title =
          value.title === 1
            ? "Mr"
            : value.title === 2
            ? "Mrs"
            : value.title === 3
            ? "Miss"
            : value.title === 4 && "Ms";
        guest.PaxType = value.type;
        if (value.first_name.trim() === "") {
          setSnackopen(true);
          setSnackmessage("First_name should not be empty");
          // alert("First_name should not be empty ");
          stopExecution = true;
          setPersons((prevdata) => {
            const updatedPersons = [...prevdata];
            if (value.type === 1) {
              updatedPersons[roomindex].adult_state[i].f_name_err = true;
            } else {
              updatedPersons[roomindex].child_state[i].f_name_err = true;
            }
            return updatedPersons;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });
          return true;
          // break outerLoop;
        } else if (regex_data.string_pattern.test(value.first_name)) {
          setSnackopen(true);
          setSnackmessage("first name not a string");
          // alert("first name not a string");
          stopExecution = true;
          setPersons((prevdata) => {
            const updatedPersons = [...prevdata];
            if (value.type === 1) {
              updatedPersons[roomindex].adult_state[i].f_name_err = true;
            } else {
              updatedPersons[roomindex].child_state[i].f_name_err = true;
            }
            return updatedPersons;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          return true;
          // break outerLoop;
        } else {
          setPersons((prevdata) => {
            const updatedPersons = [...prevdata];
            if (value.type === 1) {
              updatedPersons[roomindex].adult_state[i].f_name_err = false;
            } else {
              updatedPersons[roomindex].child_state[i].f_name_err = false;
            }
            return updatedPersons;
          });
          guest.FirstName = value.first_name.trim();
          // return false
          // condition goes here
        }
        if (value.last_name.trim() === "") {
          setSnackopen(true);
          setSnackmessage("last name shouldn't be empty");
          // alert("last name shouldn't be empty");
          stopExecution = true;
          setPersons((prevdata) => {
            const updatedPersons = [...prevdata];
            if (value.type === 1) {
              updatedPersons[roomindex].adult_state[i].l_name_err = true;
            } else {
              updatedPersons[roomindex].child_state[i].l_name_err = true;
            }
            return updatedPersons;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          return true;
        } else if (regex_data.string_pattern.test(value.last_name)) {
          setSnackopen(true);
          setSnackmessage("last name should only be string");
          // alert("last name should only be string");
          stopExecution = true;
          setPersons((prevdata) => {
            const updatedPersons = [...prevdata];
            if (value.type === 1) {
              updatedPersons[roomindex].adult_state[i].l_name_err = true;
            } else {
              updatedPersons[roomindex].child_state[i].l_name_err = true;
            }
            return updatedPersons;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          return true;
        } else {
          setPersons((prevdata) => {
            const updatedPersons = [...prevdata];
            if (value.type === 1) {
              updatedPersons[roomindex].adult_state[i].l_name_err = false;
            } else {
              updatedPersons[roomindex].child_state[i].l_name_err = false;
            }
            return updatedPersons;
          });
          guest.LastName = value.last_name.trim();
          // return false
        }

        // Passport mandatory

        if (room?.RequireAllPaxDetails && room?.IsPassportMandatory) {
          // Passport number validation
          if (value.passport_num === "") {
            setSnackopen(true);
            setSnackmessage("passport number shouldn't be empty");
            // alert("passport number shouldn't be empty");
            stopExecution = true;
            setPersons((prevdata) => {
              const updatedPersons = [...prevdata];
              if (value.type === 1) {
                updatedPersons[roomindex].adult_state[i].p_num_err = true;
              } else {
                updatedPersons[roomindex].child_state[i].p_num_err = true;
              }
              return updatedPersons;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });

            return true;
          } else if (
            !regex_data.generic_passport.test(value.passport_num.trim())
          ) {
            setSnackopen(true);
            setSnackmessage("Enter correct passport number");
            // alert("Enter correct passport number");
            stopExecution = true;
            setPersons((prevdata) => {
              const updatedPersons = [...prevdata];
              if (value.type === 1) {
                updatedPersons[roomindex].adult_state[i].p_num_err = true;
              } else {
                updatedPersons[roomindex].child_state[i].p_num_err = true;
              }
              return updatedPersons;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });

            return true;
          } else {
            stopExecution = false;
            setPersons((prevdata) => {
              const updatedPersons = [...prevdata];
              if (value.type === 1) {
                updatedPersons[roomindex].adult_state[i].p_num_err = false;
              } else {
                updatedPersons[roomindex].child_state[i].p_num_err = false;
              }
              return updatedPersons;
            });
            guest.PassportNo = value.passport_num.trim();
            // return false;
          }
          // passport issue date validation
          if (value.passport_issue === "") {
            setSnackopen(true);
            setSnackmessage("passport issue date shouldn't be empty");
            // alert("passport issue date shouldn't be empty");
            stopExecution = true;
            setPersons((prevdata) => {
              const updatedPersons = [...prevdata];
              if (value.type === 1) {
                updatedPersons[roomindex].adult_state[
                  i
                ].passport_issue_err = true;
              } else {
                updatedPersons[roomindex].child_state[
                  i
                ].passport_issue_err = true;
              }
              return updatedPersons;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });

            return true;
          } else {
            stopExecution = false;
            setPersons((prevdata) => {
              const updatedPersons = [...prevdata];
              if (value.type === 1) {
                updatedPersons[roomindex].adult_state[
                  i
                ].passport_issue_err = false;
              } else {
                updatedPersons[roomindex].child_state[
                  i
                ].passport_issue_err = false;
              }
              return updatedPersons;
            });
            guest.PassportIssueDate = helperFunctions.getapi_date(
              value.passport_issue
            );
            // return false;
          }
          // passport expiry date validation
          if (value.passport_exp === "") {
            setSnackopen(true);
            setSnackmessage("passport expiry date shouldn't be empty");
            // alert("passport expiry date shouldn't be empty");
            stopExecution = true;
            setPersons((prevdata) => {
              const updatedPersons = [...prevdata];
              if (value.type === 1) {
                updatedPersons[roomindex].adult_state[i].p_exp_err = true;
              } else {
                updatedPersons[roomindex].child_state[i].p_exp_err = true;
              }
              return updatedPersons;
            });
            return true;
          } else {
            stopExecution = false;
            setPersons((prevdata) => {
              const updatedPersons = [...prevdata];
              if (value.type === 1) {
                updatedPersons[roomindex].adult_state[i].p_exp_err = false;
              } else {
                updatedPersons[roomindex].child_state[i].p_exp_err = false;
              }
              return updatedPersons;
            });
            guest.PassportExpDate = helperFunctions.getapi_date(
              value.passport_exp
            );
            // return false;
          }
          // passport issue country validation
          // if (value.passport_issue_country === "") {
          //   alert("passport issue_country shouldn't be empty");
          //   stopExecution = true;
          //   setPersons((prevdata) => {
          //     const updatedPersons = [...prevdata];
          //     if (value.type === 1) {
          //       updatedPersons[roomindex].adult_state[
          //         i
          //       ].passport_issue_country_err = true;
          //     } else {
          //       updatedPersons[roomindex].child_state[
          //         i
          //       ].passport_issue_country_err = true;
          //     }
          //     return updatedPersons;
          //   });
          //   return true;
          // }
          // else if (string_pattern.test(value.passport_issue_country.trim())) {
          //   alert("passport issue country must be a string");
          //   stopExecution = true;
          //   setPersons((prevdata) => {
          //     const updatedPersons = [...prevdata];
          //     if (value.type === 1) {
          //       updatedPersons[roomindex].adult_state[
          //         i
          //       ].passport_issue_country_err = true;
          //     } else {
          //       updatedPersons[roomindex].child_state[
          //         i
          //       ].passport_issue_country_err = true;
          //     }
          //     return updatedPersons;
          //   });
          //   return true;
          // }
          //  else {
          //   stopExecution = false;
          //   setPersons((prevdata) => {
          //     const updatedPersons = [...prevdata];
          //     if (value.type === 1) {
          //       updatedPersons[roomindex].adult_state[
          //         i
          //       ].passport_issue_country_err = false;
          //     } else {
          //       updatedPersons[roomindex].child_state[
          //         i
          //       ].passport_issue_country_err = false;
          //     }
          //     return updatedPersons;
          //   });

          //   // return true;
          // }
        }
        // Pan number validation
        if (room?.RequireAllPaxDetails && room.IsPANMandatory) {
          //&&value.type===1
          // adult pancard checking
          if (value.type === 1) {
            if (value.pan_no === "") {
              setSnackopen(true);
              setSnackmessage("pan number shouldn't be empty");
              // alert("pan number shouldn't be empty");
              stopExecution = true;
              setPersons((prevdata) => {
                const updatedPersons = [...prevdata];
                if (value.type === 1) {
                  updatedPersons[roomindex].adult_state[i].pan_no_err = true;
                } else {
                  updatedPersons[roomindex].child_state[i].pan_no_err = true;
                }
                return updatedPersons;
              });
              textFieldRef.current.scrollIntoView({ behavior: "smooth" });

              return true;
            } else if (!regex_data.pan_Regex.test(value.pan_no.trim())) {
              setSnackopen(true);
              setSnackmessage("Enter valid pan number");
              // alert("Enter valid pan number");
              stopExecution = true;
              setPersons((prevdata) => {
                const updatedPersons = [...prevdata];
                if (value.type === 1) {
                  updatedPersons[roomindex].adult_state[i].pan_no_err = true;
                } else {
                  updatedPersons[roomindex].child_state[i].pan_no_err = true;
                }
                return updatedPersons;
              });
              textFieldRef.current.scrollIntoView({ behavior: "smooth" });

              return true;
            } else {
              stopExecution = false;
              setPersons((prevdata) => {
                const updatedPersons = [...prevdata];
                if (value.type === 1) {
                  updatedPersons[roomindex].adult_state[i].pan_no_err = false;
                } else {
                  updatedPersons[roomindex].child_state[i].pan_no_err = false;
                }
                return updatedPersons;
              });
              guest.PAN = value.pan_no;
              // return false;
            }
          } else if (value.type === 2) {
            guest.GuardianDetail = {
              Title: roomguests[0].Title,
              FirstName: roomguests[0].FirstName,
              LastName: roomguests[0].LastName,
              PAN: roomguests[0].PAN,
            };
          }
        }
        if (value.type === 1 && i === 0) {
          guest.LeadPassenger = true;
        } else if (value.type === 2) {
          guest.Age = guests_details[roomindex].ChildAge[i];
        }
        roomguests.push(guest);
      }
      if (stopExecution) {
        break;
      }
    }

    return roomguests;
  };
  // Book api funtion
  const book_room_api = async (data) => {
    setLoading(true);
    let book_obj;
    if (data === undefined) {
      book_obj = book_req;
    } else {
      book_obj = data;
    }
    setPrice_change(false);
    const res = await axios.post(`${envdata.baseurl}/deDupeBookRoom`, book_obj);
    if (res.data.status) {
      setLoading(false);
      const booking_detail = await axios.post(
        `${envdata.baseurl}/getHotelBookingDetail`,
        {
          BookingId: res.data.data.BookingId,
          userId: localStorage.getItem("userid"),
          checkType: 0,
        }
      );
      if (booking_detail.data.status && booking_detail.data.data.Status === 1) {
        setBooking_details(booking_detail.data.data);
        setHotelbooked(true);
        // console.log(booking_detail.data);
      } else if (
        booking_detail.data.status &&
        booking_detail.data.data.Status !== 1
      ) {
        setLoading(false);
        setSnackopen(true);
        setSnackmessage("booking cancelled");
        // alert("booking cancelled");
      } else {
        setLoading(false);
        setSnackopen(true);
        setSnackmessage(booking_detail.data.data.message);
        // alert(booking_detail.data.data.message);
      }
    } else {
      setLoading(false);
      setSnackopen(true);
      setSnackmessage(res.data?.data?.message);
      // alert(res.data?.data?.message);
    }
  };
  // gmtblock room api
  const gmt_blockroom=async()=>{
    let book_room_data = [];
    let guests_data = [];
    try{
      for (let i = 0; i < location1.state.length; i++) {
        
        let sel_room=room_details.HotelRoomsDetails.find((item)=>item.RoomIndex===location1.state[i])
        const room_guests = await hotel_guest_validation(persons[i], i, sel_room);
        // console.log(room_guests, "each room");
        if (room_guests === true) {
          return;
        } else {
          guests_data.push(room_guests);
        }
  
        let smoking =
          sel_room?.SmokingPreference === "NoPreference"
            ? 0
            : sel_room?.SmokingPreference === "Smoking"
            ? 1
            : sel_room?.SmokingPreference === "NonSmoking"
            ? 2
            : sel_room?.SmokingPreference === "Either" && 3;
       
        let book_room_obj = {
          RoomIndex: sel_room.RoomIndex,
          RoomTypeCode: "",
          RoomTypeName: sel_room.RoomTypeName,
          RatePlanCode: "",
          SmokingPreference: smoking,
          Price: sel_room.Price,
          HotelPassenger: room_guests,
        };
        book_room_data.push(book_room_obj);
      }
          // ticket receivers_information validation
    if (ticket_receiver_info.email.trim() === "") {
      setSnackopen(true);
      setSnackmessage("ticket receivers info shouldn't be empty");
      setTicket_receiver_info((prevstate) => ({
        ...prevstate,
        email_err: true,
      }));
      return;
    } else if (
      !regex_data.email_Regex.test(ticket_receiver_info.email.trim())
    ) {
      setSnackopen(true);
      setSnackmessage("enter valid email address");
      // alert("enter valid email address");
      setTicket_receiver_info((prevstate) => ({
        ...prevstate,
        email_err: true,
      }));
      return;
    } else {
      setTicket_receiver_info((prevstate) => ({
        ...prevstate,
        email_err: false,
      }));
    }
    if (ticket_receiver_info.mobile === "") {
      setSnackopen(true);
      setSnackmessage("ticket receiver mobile number shouldn't be empty");
      // alert("Ticket reviever mobile number shouldn't be empty");
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: true }));
      return;
    } else if (
      !regex_data.mobile_regex.test(ticket_receiver_info.mobile.trim())
    ) {
      setSnackopen(true);
      setSnackmessage("Ticket receivers mobile shouldn't be empty");
      // alert("Ticket receivers mobile shouldn't be empty");
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: true }));
      return;
    } else {
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: false }));
    }
    const bookroom_obj = {
      searchType:2,
      booked_by: localStorage.getItem("userid"),
      booked_by_name:profile?.first_name,
      rating: null,
      review: null,
      total_staying_persons: adult_num + child_num,
      number_of_rooms: guests_details.length,
      coupon_id: prices.coupon_id,
      platform: 0,
      admin_commission_type: coupons?.convenienceFee[0]?.convenience_type ?? "",
      admin_commission: gmt_fee,
      hotel_picture: hotel_info.Images[0].split('/')[5].split('?')[0].replace(/%28/g, "(").replace(/%29/g, ")"),//'.split('/')[5].split('?')[0].replace(/%28/g, "(").replace(/%29/g, ")")'
      ticket_sent_mail: ticket_receiver_info.email,
      ticket_sent_ph_num: ticket_receiver_info.mobile,
      from_date: hotelresult.CheckInDate,
      to_date: hotelresult.CheckOutDate,
      created_at:helperFunctions.getapi_date(new Date()),
      discount: prices.discount,
      payment_status: 0,
      payment_id: "",
      total_price:
        prices.discount > 0 ? prices.updatedprice : prices.totalprice,
      coupon_code: prices.coupon_code,
      pub_price: fixed_room_price,
      TraceId: "",
      ResultIndex: 0,
      HotelCode: hotel_code,
      CategoryId:"",
      // searchtype === "1"
      //   ? sel_hotel.supplier_hotel_codes[0].CategoryId
      //   : sel_hotel.SupplierHotelCodes[0].CategoryId,
      HotelName: hotel_info.HotelName,
      GuestNationality: "IN",
      NoOfRooms: guests_details.length,
      ClientReferenceNo: "0",
      IsVoucherBooking: "true",
      HotelRoomsDetails: book_room_data,
    };
    book_room_data[0]['Amenities']=room_details?.HotelRoomsDetails[0].Amenities;
    book_room_data[0]['CancellationPolicies']=room_details?.HotelRoomsDetails[0].CancellationPolicies
let block_room_obj={
  "HotelCode":hotel_details?.HotelDetails?.HotelCode,
  "rooms":[]
}
    //  adding ticket receivers_info in book api
    for (
      let room = 0;
      room <= bookroom_obj.HotelRoomsDetails.length - 1;
      room++
    ) {
      const sel_room=room_details.HotelRoomsDetails.find((item)=>item.RoomIndex===location1.state[room]);
      let each_room={
        "roomId":sel_room.Id,
        "price":sel_room?.Price?.PublishedPriceRoundedOff
      }
      block_room_obj?.rooms.push(each_room);
      Object.assign(bookroom_obj.HotelRoomsDetails[room].HotelPassenger[0], {
        Phoneno: ticket_receiver_info.mobile,
        Email: ticket_receiver_info.email,
      });
    }
      // ////////////
      // const sel_room=room_details.HotelRoomsDetails.find((item)=>item.RoomIndex===location1.state[0])
      // console.log(sel_room,"selected room")
      setLoading(true);
      const gmt_block_res=await axios.post(`${envdata.baseurl}/gmtBlockRoom`,block_room_obj)
      console.log(gmt_block_res.data,"response")
      const gmt_block_data=gmt_block_res.data;
      if(gmt_block_data.status){
        dispatch(
          HotelBookingDetailsActions.bookingrequest({
            bookdata: bookroom_obj,
            trasaction_id: transactionStr,
          }))
          setLoading(false);
          document.getElementById("payuPayButton").click();
      }
    }
    catch(error){
      console.log(error,"error dta")
alert(error)
    }

  }
  // tbo rooms block api calling
  const hot_room_booking = async () => {
    // setHotelbooked(true);
    let sel_hotel;
    if (searchtype === "1") {
      sel_hotel = hotelresult.Hotels.find(
        (item) => item.hotel_code === hotel_code
      );
    } 
    else {
      sel_hotel = hotelresult.Hotels.find(
        (item) => item.HotelCode === hotel_code
      );
    }
    let block_room_data = [];
    let book_room_data = [];
    let guests_data = [];
    // console.group(room_details.HotelRoomsDetails,"room details")
    // console.log(category_ids,"dflaksjdf")
    // console.log(selectedroom,"sefffe")
    for (let i = 0; i < selectedroom.length; i++) {
      let sel_room = room_details.HotelRoomsDetails.find(
        (item) =>
          item.RoomIndex === selectedroom[i] &&
          item.CategoryId === category_ids
      );
      // console.log(sel_room,"data to be displayed")

      const room_guests = await hotel_guest_validation(persons[i], i, sel_room);
      // console.log(room_guests, "each room");
      if (room_guests === true) {
        return;
      } else {
        guests_data.push(room_guests);
      }
// console.log(sel_room,"data")
      let smoking =
        sel_room?.SmokingPreference === "NoPreference"
          ? 0
          : sel_room?.SmokingPreference === "Smoking"
          ? 1
          : sel_room?.SmokingPreference === "NonSmoking"
          ? 2
          : sel_room?.SmokingPreference === "Either" && 3;
      let block_room_obj = {
        RoomIndex: sel_room?.RoomIndex,
        RoomTypeCode: sel_room?.RoomTypeCode,
        RoomTypeName: sel_room?.RoomTypeName,
        RatePlanCode: sel_room?.RatePlanCode,
        SmokingPreference: smoking,
        Supplements: null,
        Price:
          // sel_room.Price,
          {
            CurrencyCode: sel_room?.Price.CurrencyCode,
            RoomPrice: sel_room.Price.RoomPrice,
            Tax: sel_room.Price.Tax,
            ExtraGuestCharge: sel_room.Price.ExtraGuestCharge,
            ChildCharge: sel_room.Price.ChildCharge,
            OtherCharges: sel_room.Price.OtherCharges,
            Discount: sel_room.Price.Discount,
            PublishedPrice: sel_room.Price.PublishedPrice,
            PublishedPriceRoundedOff: sel_room.Price.PublishedPriceRoundedOff,
            OfferedPrice: sel_room.Price.OfferedPrice,
            OfferedPriceRoundedOff: sel_room.Price.OfferedPriceRoundedOff,
            AgentCommission: sel_room.Price.AgentCommission,
            AgentMarkUp: sel_room.Price.AgentMarkUp,
            ServiceTax: sel_room.Price.ServiceTax,
            TDS: sel_room.Price.TDS,
          },
      };
      let book_room_obj = {
        RoomIndex: sel_room.RoomIndex,
        RoomTypeCode: sel_room.RoomTypeCode,
        RoomTypeName: sel_room.RoomTypeName,
        RatePlanCode: sel_room.RatePlanCode,
        SmokingPreference: smoking,
        Price: sel_room.Price,
        // {
        //   CurrencyCode: sel_room.Price.CurrencyCode,
        //   RoomPrice: sel_room.Price.RoomPrice,
        //   Tax: sel_room.Price.Tax,
        //   ExtraGuestCharge: sel_room.Price.ExtraGuestCharge,
        //   ChildCharge: sel_room.Price.ChildCharge,
        //   OtherCharges: sel_room.Price.OtherCharges,
        //   Discount: sel_room.Price.Discount,
        //   PublishedPrice: sel_room.Price.PublishedPrice,
        //   PublishedPriceRoundedOff: sel_room.Price.PublishedPriceRoundedOff,
        //   OfferedPrice: sel_room.Price.OfferedPrice,
        //   OfferedPriceRoundedOff: sel_room.Price.OfferedPriceRoundedOff,
        //   AgentCommission: sel_room.Price.AgentCommission,
        //   AgentMarkUp: sel_room.Price.AgentMarkUp,
        //   ServiceTax: sel_room.Price.ServiceTax,
        //   TDS: sel_room.Price.TDS,
        // },
        HotelPassenger: room_guests,
      };
      block_room_data.push(block_room_obj);
      book_room_data.push(book_room_obj);
    }
    // ticket receivers_information validation
    if (ticket_receiver_info.email.trim() === "") {
      setSnackopen(true);
      setSnackmessage("ticket receivers info shouldn't be empty");
      setTicket_receiver_info((prevstate) => ({
        ...prevstate,
        email_err: true,
      }));
      return;
    } else if (
      !regex_data.email_Regex.test(ticket_receiver_info.email.trim())
    ) {
      setSnackopen(true);
      setSnackmessage("enter valid email address");
      // alert("enter valid email address");
      setTicket_receiver_info((prevstate) => ({
        ...prevstate,
        email_err: true,
      }));
      return;
    } else {
      setTicket_receiver_info((prevstate) => ({
        ...prevstate,
        email_err: false,
      }));
    }
    if (ticket_receiver_info.mobile === "") {
      setSnackopen(true);
      setSnackmessage("ticket receiver mobile number shouldn't be empty");
      // alert("Ticket reviever mobile number shouldn't be empty");
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: true }));
      return;
    } else if (
      !regex_data.mobile_regex.test(ticket_receiver_info.mobile.trim())
    ) {
      setSnackopen(true);
      setSnackmessage("Ticket receivers mobile shouldn't be empty");
      // alert("Ticket receivers mobile shouldn't be empty");
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: true }));
      return;
    } else {
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: false }));
    }
    book_room_data[0]['CancellationPolicies']=room_details?.HotelRoomsDetails[0].CancellationPolicies
    const blockroom_obj = {
      TraceId: room_details.TraceId,
      ResultIndex: hotel_index,
      HotelCode: hotel_code.toString(),
      CategoryId: category_ids,
      // searchtype === "1"
      //   ? sel_hotel.supplier_hotel_codes[0].CategoryId
      //   : sel_hotel.SupplierHotelCodes[0].CategoryId,
      HotelName: hotel_info.HotelName,
      GuestNationality: "IN",
      NoOfRooms: guests_details.length,
      ClientReferenceNo: "0",
      IsVoucherBooking: "true",
      HotelRoomsDetails: block_room_data,
    };

    const bookroom_obj = {
      searchType:1,
      booked_by: localStorage.getItem("userid"),
      booked_by_name:profile?.first_name,
      rating: null,
      review: null,
      total_staying_persons: adult_num + child_num,
      number_of_rooms: guests_details.length,
      coupon_id: prices.coupon_id,
      platform: 0,
      admin_commission_type: coupons?.convenienceFee[0]?.convenience_type ?? "",
      admin_commission: gmt_fee,
      hotel_picture: hotel_info.Images[0],
      ticket_sent_mail: ticket_receiver_info.email,
      ticket_sent_ph_num: ticket_receiver_info.mobile,
      from_date: hotelresult.CheckInDate,
      to_date: hotelresult.CheckOutDate,
      created_at:helperFunctions.getapi_date(new Date()),
      discount: prices.discount,
      payment_status: 1,
      payment_id: "123lkj",
      total_price:
        prices.discount > 0 ? prices.updatedprice : prices.totalprice,
      coupon_code: prices.coupon_code,
      pub_price: fixed_room_price,
      TraceId: room_details.TraceId,
      ResultIndex: hotel_index,
      HotelCode: hotel_code,
      CategoryId: category_ids,
      HotelName: hotel_info.HotelName,
      GuestNationality: "IN",
      NoOfRooms: guests_details.length,
      ClientReferenceNo: "0",
      IsVoucherBooking: "true",
      HotelRoomsDetails: book_room_data,
    };
    //  adding ticket receivers_info in book api
    for (
      let room = 0;
      room <= bookroom_obj.HotelRoomsDetails.length - 1;
      room++
    ) {
      Object.assign(bookroom_obj.HotelRoomsDetails[room].HotelPassenger[0], {
        Phoneno: ticket_receiver_info.mobile,
        Email: ticket_receiver_info.email,
      });
    }
    //  block room api calling
    setLoading(true);
    try {
      const res = await axios.post(
        `${envdata.baseurl}/deDupeBlockRoom`,
        blockroom_obj
      );
      if (res.status) {
        let data = res.data.data;
        bookroom_obj.IsPackageFare = data?.IsPackageFare;
        if (data?.IsPackageDetailsMandatory) {
          Object.assign(bookroom_obj, {
            ArrivalTransport: {
              TransportInfoId: "6E 231",
              Time: "2023-07-05T14:05:36",
            },
          });
        }
        if (data?.IsDepartureDetailsMandatory) {
          Object.assign(bookroom_obj, {
            DepartureTransport: {
              TransportInfoId: "6E 231",
              Time: "2023-07-06T14:05:36",
            },
          });
        }
        setBook_req(bookroom_obj);
        if (data?.IsCancellationPolicyChanged || data?.IsPriceChanged) {
          for (let i = 0; i <= bookroom_obj.HotelRoomsDetails.length - 1; i++) {
            let changeddata = data.HotelRoomsDetails[i].Price;
            bookroom_obj.HotelRoomsDetails[i].Price = {
              CurrencyCode: changeddata.CurrencyCode,
              RoomPrice: changeddata.RoomPrice,
              Tax: changeddata.Tax,
              ExtraGuestCharge: changeddata.ExtraGuestCharge,
              ChildCharge: changeddata.ChildCharge,
              OtherCharges: changeddata.OtherCharges,
              Discount: changeddata.Discount,
              PublishedPrice: changeddata.PublishedPrice,
              PublishedPriceRoundedOff: changeddata.PublishedPriceRoundedOff,
              OfferedPrice: changeddata.OfferedPrice,
              OfferedPriceRoundedOff: changeddata.OfferedPriceRoundedOff,
              AgentCommission: changeddata.AgentCommission,
              AgentMarkUp: changeddata.AgentMarkUp,
              ServiceTax: changeddata.ServiceTax,
              TDS: changeddata.TDS,
            };
          }
          setBook_req(bookroom_obj);
          setLoading(false);
          setPrice_change(true);
          setChanged_room_data(data);
        } else {
          // book_room_api(bookroom_obj);
          dispatch(
            HotelBookingDetailsActions.bookingrequest({
              bookdata: bookroom_obj,
              trasaction_id: transactionStr,
            })
          );
          // details =
          //  `${key}|${transactionStr}|${prices.discount > 0 ? prices.updatedprice : prices.totalprice}|${productinfo}|${persons[0]?.adult_state[0]?.first_name}|${ticket_receiver_info.email}|||||||||||${salt}`;
          // console.log(details)
          //  let hashedValue = sha512.create();
          // hashedValue.update(details);
          // console.log(hashedValue.hex(),"hashed value")
          // setHashedData(hashedValue.hex())
          setLoading(false);
          document.getElementById("payuPayButton").click();
        }
      } else {
        setSnackopen(true);
        setSnackmessage(res.data.message);
        // alert(res.data.message);
      }
    } catch (error) {
      setSnackopen(true);
      setSnackmessage(error);
      // alert(error);
    }
  };
  // profile data setting
  useEffect(() => {
    setTicket_receiver_info((prev) => ({
      ...prev,
      mobile: profile?.mobile,
      email: profile?.email,
    }));
  }, [profile]);
  useEffect(() => {
    let total_adult = 0;
    let total_child = 0;
    const settraveller_state = async () => {
      // if (require_all_pax_details) {
      total_adult = await guests_details.reduce(
        (sum, item) => sum + item.NoOfAdults,
        0
      );
      total_child = await guests_details.reduce(
        (sum, item) => sum + item.NoOfChild,
        0
      );
      setAdult_num(total_adult);
      setChild_num(total_child);
      // }
      // else {
      //   total_adult = guests_details.length;
      //   setAdult_num(total_adult);
      // }
      const per = await Array.from(
        { length: guests_details.length },
        (_, index) => ({
          adult_state: Array.from(
            { length: guests_details[index].NoOfAdults },
            (_, index) => ({
              type: 1,
              first_name: "",
              last_name: "",
              gender: 0,
              dob: "",
              passport_num: "",
              passport_exp: "",
              title: 1,
              passport_issue: "",
              passport_issue_country: "",
              pan_no: "",
              f_name_err: false,
              l_name_err: false,
              dob_err: false,
              p_num_err: false,
              p_exp_err: false,
              title_err: false,
              passport_issue_err: false,
              passport_issue_country_err: false,
              pan_no_err: false,
            })
          ),
          child_state: Array.from(
            { length: guests_details[index].NoOfChild },
            (_, index) => ({
              type: 2,
              first_name: "",
              last_name: "",
              gender: 0,
              dob: "",
              passport_num: "",
              passport_exp: "",
              title: 3,
              passport_issue: "",
              passport_issue_country: "",
              pan_no: "",
              f_name_err: false,
              l_name_err: false,
              dob_err: false,
              p_num_err: false,
              p_exp_err: false,
              title_err: false,
              passport_issue_err: false,
              passport_issue_country_err: false,
              pan_no_err: false,
            })
          ),
        })
      );
      // console.log(per,"details generated dynamically")
      setPersons([...per]);
    };
    settraveller_state();
    // setLoading(true)
  }, [guests_details, room_details]);
  const titlechange = (type, index, roomindex) => (event, title) => {
    if (title === null) {
      return;
    } else {
      // child title updation
      if (type === 1) {
        const updatedpersons = [...persons];
        updatedpersons[roomindex].child_state[index].title = title;
        setPersons(updatedpersons);
      }
      // adult title updation
      else if (type === 2) {
        const updatedpersons = [...persons];
        updatedpersons[roomindex].adult_state[index].title = title;
        setPersons(updatedpersons);
      }
    }
  };
  // promocodes callback
  // type-1 coupon data
  // type-2 validated coupon and discount data
  const coupons_data = (data) => {
    if (data.type === 1) {
      setGmt_fee(data.platform_charge);
      setCoupons(data.couponsdata);
      setPrices((prev) => ({ ...prev, totalprice: data.totalprice }));
    } else {
      setPrices((prev) => ({
        ...prev,
        discount: data.discount,
        updatedprice: data.updated_price,
        coupon_id: data.couponid,
        coupon_code: data.couponcode,
      }));
    }
  };
  // 0=>infant
  // 1=>child
  // 2=>adult
  const handleGender = (type, index, roomindex) => (event, gender) => {
    // child gender updation
    if (type === 1) {
      const updatedpersons = [...persons];
      updatedpersons[roomindex].child_state[index].gender = gender;
      setPersons(updatedpersons);
    }
    // adult gender updation
    else if (type === 2) {
      const updatedpersons = [...persons];
      updatedpersons[roomindex].adult_state[index].gender = gender;
      setPersons(updatedpersons);
    }
    // setGender(gender);
  };
  // handle travellers onchange event
  // 2->adult state
  // 1->child state
  const handletravellersinput = (e, index, type, roomindex) => {
    const { name, value } = e.target;
    // console.log(value,"value")
    if (type === 2) {
      // Get a copy of the current persons state
      const updatedPersons = [...persons];
      // console.log(updatedPersons[roomindex],"change")
      updatedPersons[roomindex].adult_state[index][name] = value;
      setPersons(updatedPersons);
    } else if (type === 1) {
      // Get a copy of the current persons state
      const updatedPersons = [...persons];
      updatedPersons[roomindex].child_state[index][name] = value;
      setPersons(updatedPersons);
    }
  };
  // travellers dialog opening
  const Travellersdialogopen = async (index, type, roomindex) => {
    setTraveller_index({ indx: index, type: type, roomindex: roomindex });
    // console.log(localStorage.getItem("userid"));
    const userid = localStorage.getItem("userid");
    if (userid != null) {
      const res = await Apipost("/allTravellers", { user_id: userid });
      if (res.status) {
        setTravellerdata(res.data);
        setViewtravellerdialog(true);
      }
    } else {
      setSnackopen(true);
      setSnackmessage("you need to login to your account");
      // alert("you need to login to your account");
    }
  };
  // travelers call back setting in inputs
  const traveller_cal = (data) => {
    const gendre =
      data.gender === "1"
        ? 0
        : data.gender === "2"
        ? 1
        : data.gender === "3" && 2;

    const [birth_day, birth_month, birth_year] = data?.dob.split("/");
    let birth_date = `${birth_year}-${birth_month}-${birth_day}`;
    const [p_day, p_month, p_year] = data?.passport_expiry.split("/");
    let passport_expdate = `${p_year}-${p_month}-${p_day}`;
    const [p_issue_day, p_issue_month, p_issue_year] =
      data?.passport_issue_date.split("/");
    let passport_issue_date = `${p_issue_year}-${p_issue_month}-${p_issue_day}`;
    // console.log(birth_date);
    // console.log(passport_expdate);
    if (traveller_index.type === 2) {
      // alert(traveller_index.indx);
      setPersons((prevdata) => {
        const updatedPersons = [...prevdata];
        updatedPersons[traveller_index.roomindex].adult_state[
          traveller_index.indx
        ] = {
          ...updatedPersons[traveller_index.roomindex].adult_state[
            traveller_index.indx
          ],
          first_name: data.first_name,
          last_name: data.last_name,
          gender: gendre,
          dob: birth_date,
          passport_num: data.passport,
          passport_exp: passport_expdate,
          passport_issue: passport_issue_date,
          pan_no: data.pan_card,
          passport_issue_country: data.passport_issue_country,
          title: parseInt(data.title),
        };
        return updatedPersons;
      });
    } else if (traveller_index.type === 1) {
      setPersons((prevdata) => {
        const updatedPersons = [...prevdata];
        updatedPersons[traveller_index.roomindex].child_state[traveller_index.indx] = {
          ...updatedPersons[traveller_index.roomindex].child_state[
            traveller_index.indx
          ],
          first_name: data.first_name,
          last_name: data.last_name,
          gender: gendre,
          dob: birth_date,
          passport_num: data.passport,
          passport_exp: passport_expdate,
          passport_issue: passport_issue_date,
          pan_no: data.pan_card,
          passport_issue_country: data.passport_issue_country,
          title: parseInt(data.title),
        };
        return updatedPersons;
      });
    }
  };
  // country selection
  function handlecountryselected(value) {
    setSelectedcountry(value);
  }
  // if(!persons){
  //   <h1>loading...</h1>
  // }

  // payment related start's

  const [transactionStr, setTransactionStr] = useState("");

  let key = envdata.PayU_hotel_Key;//"Lk3AOx";//
  let salt = envdata.PayU_hotel_salt;//"VFuQME6bm4OQKXQ7T8Fbxw4XniaBxWxf"//
  let productinfo = "web";
  let details;
  //-----------------------------PAYU key
  details = `${key}|${transactionStr}|${
    prices.discount > 0 ? prices.updatedprice : prices.totalprice
  }|${productinfo}|${persons[0]?.adult_state[0]?.first_name}|${
    ticket_receiver_info.email
  }|||||||||||${salt}`;
  // details = `${key}|${transactionStr}|10|${productinfo}|${persons[0]?.adult_state[0]?.first_name}|${
  //   ticket_receiver_info.email
  // }|||||||||||${salt}`;
  console.log(details, "detailjs");
  let hashedValue = sha512.create();
  hashedValue.update(details);
  let hashedData = hashedValue.hex();
  // const [hashedData,setHashedData] = useState(); //= hashedValue.hex();

  useEffect(() => {
    const randomFiveDigitNumber = Math.floor(10000 + Math.random() * 90000);
    let txnid = "txnid" + "-" + Date.now() + randomFiveDigitNumber; //crypto.randomUUID();
    setTransactionStr(txnid);
  }, []);

 

  // payment related end's

  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Hotelconfirmation
        open={hotelbooked}
        close={() => setHotelbooked(false)}
        data={booking_details}
      />
      <Countrycodefilter
        open={countrydialog}
        onclose={() => setCountrydialog(false)}
        selectedvalue={handlecountryselected}
      />
      <Loadingmodal open={loading} loadingclose={() => setLoading(false)} />
      <Tickettravellers
        open={viewtravellerdialog}
        close={() => setViewtravellerdialog(false)}
        travellers={travellerdata}
        traveller_data={traveller_cal}
      />
      {/* {JSON.stringify(book_req, null, 2)} */}
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item container md={9} direction="column">
            <Grid item mt={{ md: 1, xs: 1 }}>
              <span
                className={room_style.text}
                style={{ display: "flex", gap: "10px" }}
              >
                {" "}
                <ArrowBackIcon
                  sx={{ display: { md: "none", xs: "block" } }}
                  onClick={() => navigate(-1)}
                />{" "}
                Complete your Booking
              </span>
            </Grid>
            <Stack spacing={1}>
              <Grid item mt={1}>
                <Paper sx={{ borderRadius: "0.8rem" }}>
                  <Stack p={1} spacing={1}>
                    <Grid container spacing={1}>
                      <Grid
                        item
                        md={3}
                        xs={12}
                        sx={{ padding: "8px", height: "11rem" }}
                        textAlign={"center"}
                      >
                        <img
                          src={hotel_info?.Images===undefined?"":hotel_info?.Images[0]}
                          alt="selected_room"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "100%",
                            height: "100%",
                            borderRadius: "0.7rem",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                      <Grid item container direction="column" md={8.5}>
                        <Grid item>
                          <span className={room_style.hotelname}>
                            {hotel_info.HotelName}
                          </span>
                        </Grid>
                        <Grid item>
                          <Stack direction="row">
                            {Array.from(
                              { length: hotel_info.StarRating },
                              (_, index) => {
                                return (
                                  <img src={Ratingstar} alt="ratingstar" />
                                );
                              }
                            )}
                          </Stack>
                        </Grid>
                        <Grid item>
                          <span className={room_style.hotel_loc}>
                            {typeof hotel_info?.Address==="string"&&hotel_info.Address}
                          </span>
                        </Grid>
                        <Grid item container rowGap={1}>
                          <Grid item md={2.5} xs={4}>
                            <Stack>
                              <span className={room_style.hotel_loc}>
                                Check-In{" "}
                              </span>
                              <span className={room_style.hotel_checked_dates}>
                                {helperFunctions.get_numeric_date(
                                  hotelresult.CheckInDate
                                )}
                              </span>
                              <span className={room_style.hotel_loc}>
                                {`${helperFunctions.day_name(
                                  hotelresult.CheckInDate
                                )} ${checkintime}`}{" "}
                              </span>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            md={2.5}
                            xs={4}
                            alignSelf={"center"}
                            textAlign={"center"}
                          >
                            <button
                              className={room_style.days_stay}
                            >{`${helperFunctions.nights_calc(
                              hotelresult.CheckInDate,
                              hotelresult.CheckOutDate
                            )} ${
                              helperFunctions.nights_calc(
                                hotelresult.CheckInDate,
                                hotelresult.CheckOutDate
                              ) > 1
                                ? "Nights"
                                : "Night"
                            }`}</button>
                          </Grid>
                          <Grid item md={2.5} xs={4}>
                            <Stack>
                              <span className={room_style.hotel_loc}>
                                Check-Out
                              </span>
                              <span className={room_style.hotel_checked_dates}>
                                {helperFunctions.get_numeric_date(
                                  hotelresult.CheckOutDate
                                )}
                              </span>
                              <span className={room_style.hotel_loc}>
                                {`${helperFunctions.day_name(
                                  hotelresult.CheckOutDate
                                )} ${checkouttime}`}
                              </span>
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            container
                            justifyContent={"space-between"}
                            md={4.5}
                            xs={12}
                            alignSelf={"center"}
                          >
                            <Grid
                              sx={{
                                display: { md: "none", xs: "block" },
                                fontSize: "14px",
                                color: "rgba(0, 53, 86, 1)",
                                fontWeight: "500",
                              }}
                            >
                              Rooms & guests
                            </Grid>
                            <Breadcrumbs
                              separator="|"
                              className={room_style.guests_count}
                            >
                              <span>{`${helperFunctions.nights_calc(
                                hotelresult.CheckInDate,
                                hotelresult.CheckOutDate
                              )} ${
                                helperFunctions.nights_calc(
                                  hotelresult.CheckInDate,
                                  hotelresult.CheckOutDate
                                ) > 1
                                  ? "Nights"
                                  : "Night"
                              }`}</span>
                              {/* {console.log(adult_num,"adult_numer")} */}
                              {/* {console.log(child_num,"childnumebr")} */}
                              {/* {console.log(guests_details,"guests detials")} */}
                              <span>{adult_num + child_num} Guest</span>
                              <span>{`${guests_details.length} ${
                                guests_details.length > 1 ? "Rooms" : "Room"
                              }`}</span>
                            </Breadcrumbs>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{ borderBottom: `1px dashed ${styles.app_color}` }}
                    ></Grid>
                    {/* {console.log(room_details.HotelRoomsDetails.find(item=>item.RoomIndex===selectedroom[0]),"dtilal")} */}
                    
                    {room_details?.RoomCombinationsArray!==undefined&&<Grid item>
                      {
                      <span className={room_style.room_name}>
                        {
                          room_details.HotelRoomsDetails.find(
                            (item) => item.RoomIndex === selectedroom[0]
                          )?.RoomTypeName
                        }{" "}
                      </span>
                      }
                    </Grid>}
                    {/* <ul style={{fontSize:'14px',fontWeight:400,color:"#000000"}}>
                  <li>Free Breakfast and Lunch/Dinner</li>
                  <li>Includes Breakfast, One major meal, Two Way airport Transfer, Beach Transfers At Designated Time Intervals *Minibar First Fill on us *Kids Special Amenities, Kids Below 12 Yrs. Stay Free</li>
                </ul> */}
                   { <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#000000",
                      }}
                    >
                     {/* {
                      room_details.HotelRoomsDetails.find(
                        (item) => item.RoomIndex === selectedroom[0]
                      )?.Amenities.join(",")
                     } */}
                    </span>}
                  </Stack>
                </Paper>
              </Grid>

              {/* Fare summary responsive */}
              <Grid item sx={{ display: { xs: "block", md: "none" } }}>
                <Paper
                  sx={{ padding: "1rem", borderRadius: "0.5rem" }}
                  elevation={3}
                >
                  <Grid container direction={"column"} spacing={1.5}>
                    <Grid item>
                      <h3 className={ticketbook.completebookings}>
                        Fare summary
                      </h3>
                    </Grid>
                    <Grid item container justifyContent={"space-between"}>
                      <Grid item>
                        <Stack>
                          <span>
                            {`${guests_details.length} ${
                              guests_details.length > 1 ? "Rooms" : "Room"
                            } * ${`${helperFunctions.nights_calc(
                              hotelresult.CheckInDate,
                              hotelresult.CheckOutDate
                            )} ${
                              helperFunctions.nights_calc(
                                hotelresult.CheckInDate,
                                hotelresult.CheckOutDate
                              ) > 1
                                ? "Nights"
                                : "Night"
                            }`}`}
                          </span>
                          <span style={{ color: "grey", fontSize: "12px" }}>
                            Base Price
                          </span>
                        </Stack>
                      </Grid>
                      <Grid item>
                        {`${cancellation_policies[0].Currency} ${room_details.RoomCombinationsArray===undefined?open_room_price:fixed_room_price}`}
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Divider />
                    </Grid>

                    {/* {prices.discount>0&& <>
                            <Grid item container sx={{color:'#00a19c'}}>
                            <Grid item md={8}>
                                  Price after Discount
                              </Grid>
                              <Grid item md={4} textAlign={'right'}>
                              {`${cancellation_policies[0].Currency} ${fixed_room_price-prices.discount}`}
                              </Grid>
                          
                          </Grid>
                          <Grid item>
                        <Divider />
                        </Grid>
                          </>
                        } */}
                    <Grid item>
                      <Grid container justifyContent={"space-between"}>
                        <Grid item>Fee & Surcharges</Grid>
                        <Grid item textAlign={"right"}>
                          {`${cancellation_policies[0].Currency} ${gmt_fee}`}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Divider />
                    </Grid>
                    {prices.discount > 0 && (
                      <>
                        <Grid item>
                          <Grid container justifyContent={"space-between"}>
                            <Grid item>Total Discount</Grid>
                            <Grid item sx={{ color: "#3F8CFF" }}>
                              <Stack>
                                <span>{`- ${cancellation_policies[0].Currency} ${prices.discount}`}</span>
                                {/* <span><CancelIcon onClick={()=>{setPrices((prev)=>({...prev,discount:0}))}}/></span> */}
                                <button
                                  style={{
                                    border: "none",
                                    background: "none",
                                    color: "red",
                                    textDecoration: "underline",
                                  }}
                                  onClick={() => {
                                    setPrices((prev) => ({
                                      ...prev,
                                      discount: 0,
                                    }));
                                  }}
                                >
                                  Remove
                                </button>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Divider />
                        </Grid>
                      </>
                    )}
                    <Grid item>
                      <Grid container sx={{ color: styles.app_color }}>
                        <Grid item xs={6}>
                          <span className={ticketbook.totalamount}>
                            Total Amount
                          </span>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          textAlign={"right"}
                          sx={{ fontWeight: 500 }}
                        >
                          {`${room_details?.RoomCombinationsArray!==undefined&&cancellation_policies[0].Currency} ${
                            prices.discount > 0
                              ? prices.updatedprice
                              : prices.totalprice
                          }`}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Paper sx={{ padding: "1rem", borderRadius: "0.8rem" }}>
                <Stack spacing={1}>
                  <Grid item>
                    <Stack direction="row" spacing={1}>
                      <img src={Refundpolicy} alt="cancellation" />
                      <span className={room_style.room_name}>
                        Cancellation Details
                      </span>
                    </Stack>
                  </Grid>
                  <Grid
                    container
                    direction={"column"}
                    spacing={1}
                    sx={{
                      padding: "1rem",
                      backgroundColor:styles.shade_color,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Grid item container>
                      <Grid item md={4} xs={4}>
                        <span className={room_style.cancel_header}>
                          Cancellation Time
                        </span>
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <span className={room_style.cancel_header}>
                          Penalty%
                        </span>
                      </Grid>
                      <Grid item md={4} xs={4}>
                        <span className={room_style.cancel_header}>Amount</span>
                      </Grid>
                    </Grid>
                    {cancellation_policies.map((item, index) => {
                      return (
                        <Grid item container>
                          <Grid item md={4} xs={4}>
                            <span
                              className={room_style.hotel_loc}
                            >{`Before ${room_details?.RoomCombinationsArray===undefined?item.FromDate:helperFunctions.calculateDateDifference(
                              hotelresult.CheckInDate,
                              item.FromDate
                            )}- ${room_details?.RoomCombinationsArray===undefined?item.ToDate:helperFunctions.calculateDateDifference(
                              hotelresult.CheckInDate,
                              item.ToDate
                            )} Days`}</span>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <span
                              className={room_style.hotel_loc}
                            >{`${room_details?.RoomCombinationsArray===undefined?
                              Hotelhelpers.open_room_cancellation_percent(item?.ChargeType,item?.Charge,location1?.state,room_details?.HotelRoomsDetails):
                              helperFunctions.hotel_cancellation_penalty(
                              item.ChargeType,
                              item.Charge,
                              location1.state,
                              room_details.HotelRoomsDetails
                            )}%`}</span>
                          </Grid>
                          <Grid item md={4} xs={4}>
                            <span className={room_style.hotel_loc}>{`${
                              item.Currency
                            } ${room_details?.RoomCombinationsArray===undefined?
                              Hotelhelpers.open_room_cancellation_rs(item?.ChargeType,item?.Charge,location1?.state,room_details?.HotelRoomsDetails)
                              :helperFunctions.hotel_cancellation_penalty_rs(
                              item.ChargeType,
                              item.Charge,
                              location1.state,
                              room_details.HotelRoomsDetails
                            )}`}</span>
                          </Grid>
                        </Grid>
                      );
                    })}
                    {/* <Grid item container>
                      <Grid item md={4}><span className={room_style.hotel_loc}>Less than 24 hrs before check in</span></Grid>
                      <Grid item md={4}><span className={room_style.hotel_loc}>100%</span></Grid>
                      <Grid item md={4}><span className={room_style.hotel_loc}>Non - Refundable </span></Grid>
                      </Grid> */}
                  </Grid>
                </Stack>
              </Paper>
              {/* promo code responsive */}
              <Grid item sx={{ display: { md: "none", xs: "block" } }}>
                <PromoCodes
                  coupons={coupons_data}
                  data={{
                    baseprice: room_details?.RoomCombinationsArray===undefined?open_room_price:fixed_room_price,
                    count: guests_details.length,
                  }}
                  all_prices={prices}
                />
              </Grid>
              <Importantinfo />
              <Paper
                sx={{
                  borderRadius: "0.8rem",
                  padding: "1.5rem 0.5rem 0.5rem 1rem",
                }}
              >
                <Stack direction={"row"} spacing={1}>
                  <HealthAndSafetyIcon sx={{ color: styles.app_color }} />
                  <span
                    style={{ color: styles.app_color, fontWeight: 500 }}
                  >
                    Health Insurance Details
                  </span>
                </Stack>
                <span>
                  Protection your stay in Hotel from COVID - 19, medical costs &
                  more with Health Insurance from our partner Xcover.{" "}
                </span>
                <RadioGroup
                  value={health_insurance}
                  onChange={(e) => setHealth_insurance(e.target.value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&, &.Mui-checked": {
                            color:styles.textcolor,
                          },
                          size: "small",
                        }}
                      />
                    }
                    label={
                      <span style={{ fontSize: "14px", fontFamily: "poppins" }}>
                        Yes, add Health Insurance with COVID-19 Cover for only ₹
                        99.00{" "}
                      </span>
                    }
                  />
                  <Grid container direction="column" pl={4}>
                    <Grid item>
                      <Stack direction={"row"} spacing={1}>
                        <img src={correct} alt="correct" />
                        <span className={room_style.insurance_text}>
                          Emergency medical
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Stack direction={"row"} spacing={1}>
                        <img src={correct} alt="correct" />
                        <span className={room_style.insurance_text}>
                          24/7 Emergency assistance
                        </span>
                      </Stack>
                    </Grid>
                  </Grid>
                  <FormControlLabel
                    value="no"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&, &.Mui-checked": {
                            color: styles.textcolor,
                          },

                          size: "small",
                        }}
                      />
                    }
                    label={
                      <span style={{ fontSize: "14px", fontFamily: "poppins" }}>
                        No, thanks, I’ll risk it.
                      </span>
                    }
                  />
                </RadioGroup>
              </Paper>
              {/* Traveller information */}
              <div ref={textFieldRef}>
                <Paper className={ticketbook.paperadjustment} elevation={3}>
                  <Stack direction={"row"} spacing={1.5}>
                    <img src={personblue} alt="personblue" />
                    <span className={ticketbook.textsize}>Guest Details</span>
                  </Stack>
                  {/* <span style={{border:'1px solid red!important'}}> */}
                  <Grid container spacing={2} mt={1} direction={"column"}>
                    {/* adult */}

                    {Array.from(
                      { length: guests_details.length },
                      (_, roomindex) => {
                        // console.log(room_details.HotelRoomsDetails.find(item=>item.RoomIndex===selectedroom[roomindex]),"true")
                        return (
                          <>
                            {/* <span > */}
                            <h4
                              style={{
                                marginLeft: "1rem",
                                color: styles.app_color,
                                marginTop: `${roomindex === 0 ? 0 : 1}rem`,
                              }}
                            >
                              Room{roomindex + 1}
                            </h4>
                            {/* {console.log(room_details.HotelRoomsDetails.find(item=>item.RoomIndex===selectedroom[roomindex]).RequireAllPaxDetails,"paxdetails")} */}
                            {Array.from(
                              { length: guests_details[roomindex].NoOfAdults },
                              (_, index) => {
                                return (
                                  <>
                                    <Grid
                                      item
                                      container
                                      direction="column"
                                      spacing={1}
                                    >
                                      <Grid item container spacing={1}>
                                        <Grid item mt={0.4}>
                                          <img
                                            src={traveller}
                                            alt="traveller"
                                          />
                                        </Grid>
                                        <Grid item sx={{ fontWeight: "600" }}>
                                          Adult
                                        </Grid>
                                      </Grid>

                                      <Grid item container spacing={2}>
                                        <Grid item md={4} xs={12}>
                                          <ToggleButtonGroup
                                            value={
                                              persons[roomindex]?.adult_state[
                                                index
                                              ]?.title
                                            }
                                            exclusive
                                            onChange={titlechange(
                                              2,
                                              index,
                                              roomindex
                                            )}
                                            size="small"
                                          >
                                            <ToggleButton
                                              disableRipple
                                              value={1}
                                              sx={{
                                                // padding: "0.3rem 1rem",
                                                // background: "#EEF7FD",
                                                // color: styles.app_color,
                                                // border: "none",
                                                // borderRadius: "0.5rem!important",
                                                // width:'4rem'
                                                padding: "0.3rem 1rem",
                                                background: "#EEF7FD",
                                                color: styles.app_color,
                                                border: "none",
                                                borderRadius:
                                                  "0.5rem!important",
                                                width: "4rem",
                                                textTransform: "none",
                                                "@media (min-width:900px) and (max-width:1300px)":
                                                  {
                                                    width: "fit-content",
                                                    padding: "0rem 0.5rem",
                                                  },
                                                "@media (max-width:367px)": {
                                                  width: "fit-content",
                                                  padding:
                                                    "0rem 0.5rem !important",
                                                  marginLeft:
                                                    "0.5rem!important",
                                                },
                                              }}
                                            >
                                              MR
                                            </ToggleButton>
                                            <ToggleButton
                                              disableRipple
                                              value={2}
                                              className={ticketbook.titlebtns}
                                            >
                                              MRS
                                            </ToggleButton>
                                            <ToggleButton
                                              value={3}
                                              disableRipple
                                              className={ticketbook.titlebtns}
                                            >
                                              MSTR
                                            </ToggleButton>
                                            <ToggleButton
                                              value={4}
                                              disableRipple
                                              className={ticketbook.titlebtns}
                                            >
                                              Ms
                                            </ToggleButton>
                                          </ToggleButtonGroup>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                          {/* {console.log(persons[roomindex]?.adult_state[index],"error")} */}
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="*First Name"
                                            fullWidth
                                            size={"small"}
                                            name="first_name"
                                            // error={adult_state[index].f_name_err}
                                            // helperText={adult_state[index].f_name_err ? 'Firstname shouldnt be empty' : ''}
                                            onChange={(e) =>
                                              handletravellersinput(
                                                e,
                                                index,
                                                2,
                                                roomindex
                                              )
                                            }
                                            value={
                                              persons[roomindex]?.adult_state[
                                                index
                                              ]?.first_name
                                            }
                                            InputLabelProps={{
                                              style: {
                                                color: persons[roomindex]
                                                  ?.adult_state[index]
                                                  ?.f_name_err
                                                  ? "red"
                                                  : "#8F9098",
                                                fontWeight: "500",
                                              },
                                            }}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <img
                                                    src={person}
                                                    alt="personn"
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="*Last Name"
                                            fullWidth
                                            name="last_name"
                                            onChange={(e) =>
                                              handletravellersinput(
                                                e,
                                                index,
                                                2,
                                                roomindex
                                              )
                                            }
                                            value={
                                              persons[roomindex]?.adult_state[
                                                index
                                              ]?.last_name
                                            }
                                            // error={adult_state[index].l_name_err}
                                            // helperText={adult_state[index].l_name_err ? 'Lastname shouldnt be empty' : ''}
                                            InputLabelProps={{
                                              style: {
                                                color: persons[roomindex]
                                                  ?.adult_state[index]
                                                  ?.l_name_err
                                                  ? "red"
                                                  : "#8F9098",
                                                fontWeight: "500",
                                              },
                                            }}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <img
                                                    src={person}
                                                    alt="personn"
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            size="small"
                                          />
                                        </Grid>
                                        {room_details.HotelRoomsDetails.find(
                                          (item) =>
                                            item.RoomIndex ===
                                              selectedroom[roomindex] 
                                              &&
                                            item.CategoryId ===
                                              category_ids
                                        )?.RequireAllPaxDetails && (
                                          // true
                                          <>
                                            {/* <Grid item md={4}>
                                       
                                         <LocalizationProvider dateAdapter={AdapterDateFns}>
                                 <MobileDatePicker
                                 inputFormat="MM/dd/yyyy"
                                //  disabled={disableCalendar}
                                 sx={{
                                    "& .MuiPickersToolbar-penIconButton": {
                                     display: "none",
                                    },
                                 }}
                                 closeOnSelect
                                 disableFuture
                                //  inputRef={busDateSelectRef}
                                
                                 label="Date"
                                 value={persons[roomindex]?.adult_state[index]?.dob}
                                  // error={adult_state[index].dob_err}
                                  // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                  onChange={(newvalue) =>
                                    setPersons((prevdata)=>{
                                      const updatedpersons=[...prevdata];
                                      updatedpersons[roomindex].adult_state[index].dob=newvalue;
                                    return updatedpersons;
                                    })
                                  }
                                 renderInput={(params) => (
                                    <TextField
                                     id="dateInputTag"
                                     sx={{ minWidth: "90px" }}
                                     // size="small"
                                     {...params}
                                     fullWidth
                                     autoComplete="off"
                                     name="dob"
                                     size="small"
                                     label={
                                        <span style={{ paddingRight: "0.5rem" }}>
                                         *Date of Birth
                                        </span>
                                     }
                                     // value=""
                                     className={classes.travelerinfo}
                                     InputLabelProps={{
                                      style: {
                                        color:persons[roomindex]?.adult_state[index]?.dob_err?"red": "#8F9098",
                                        fontWeight: "500",
                                      },
                                    }}
                                     InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                         <InputAdornment position="start">
                                            <img
                                             src={calender}
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
                                      </Grid> */}
                                            {/* <Grid item md={4}>
                                        <ToggleButtonGroup
                                          value={persons[roomindex]?.adult_state[index]?.gender}
                                          exclusive
                                          onChange={handleGender(2, index,roomindex)}
                                          size="large"
                                        >
                                          <ToggleButton
                                            value={0}
                                            sx={{
                                              // padding: "0rem 0.5rem!important",
                                              width:'80px',
                                              height:'30px',
                                              background: "#EEF7FD",
                                              color: styles.app_color,
                                              border: "none",
                                              borderRadius: "0.5rem!important",
                                              textTransform:'none',
                                              fontSize:'14px'
                                            }}
                                          >
                                            <Stack direction={"row"} spacing={1}>
                                              <span style={{ paddingTop: "2px" }}>
                                                <svg
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 16 16"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M9.84502 5.36709C10.8257 4.38546 11.7984 3.41181 12.7799 2.42934C12.7282 2.42682 12.6736 2.42219 12.6194 2.42219C11.8749 2.42177 11.1303 2.42513 10.3862 2.42051C9.88116 2.41757 9.52443 2.05996 9.53998 1.58596C9.55258 1.19515 9.83704 0.876205 10.2236 0.821576C10.2858 0.812752 10.3488 0.807289 10.4114 0.807289C11.8476 0.806869 13.2841 0.806448 14.7207 0.80855C14.8194 0.80855 14.9211 0.817374 15.0161 0.842587C15.3526 0.932514 15.5653 1.21448 15.5657 1.57713C15.5678 3.05546 15.5678 4.5338 15.5648 6.01213C15.564 6.47479 15.2896 6.79794 14.8631 6.85971C14.4846 6.91476 14.1089 6.68154 13.9967 6.31007C13.964 6.20165 13.9539 6.08315 13.953 5.96927C13.9493 5.23514 13.9509 4.50144 13.9509 3.76732C13.9509 3.71101 13.9509 3.65428 13.9509 3.61226C12.9804 4.58506 12.0098 5.55829 11.0265 6.54413C12.1266 8.07583 12.4581 9.79705 11.9253 11.6586C11.5371 13.0155 10.7307 14.0829 9.55258 14.8599C7.18701 16.4206 3.99832 16.0155 2.07057 13.9169C0.178951 11.8574 0.0541595 8.66288 1.79451 6.43025C2.76511 5.18514 4.05168 4.46068 5.61556 4.26528C7.1702 4.07114 8.58702 4.45984 9.84502 5.36709Z"
                                                    fill="currentColor"
                                                  />
                                                </svg>
                                              </span>
                                              <span>Male</span>
                                            </Stack>
                                          </ToggleButton>
                                          <ToggleButton
                                            value={1}
                                            className={ticketbook.genderbtns}
                                            sx={{textTransform:'none', textTransform:'none',}}
                                          >
                                            <Stack direction={"row"} spacing={1}>
                                              <span style={{ paddingTop: "2px" }}>
                                                <svg
                                                  width="12"
                                                  height="16"
                                                  viewBox="0 0 12 16"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M5.64408 15.8071C5.53857 15.7601 5.42449 15.726 5.32871 15.6638C5.07875 15.5014 4.95338 15.2607 4.94715 14.9624C4.94208 14.7049 4.94598 14.4469 4.94598 14.1698C4.69602 14.1698 4.45929 14.1784 4.22335 14.1678C3.86982 14.1518 3.61519 13.9721 3.48281 13.6445C3.35316 13.3232 3.40766 13.0202 3.63738 12.7588C3.80791 12.565 4.02984 12.4797 4.28603 12.4805C4.4994 12.4809 4.71237 12.4805 4.93547 12.4805C4.93547 12.1309 4.93547 11.7912 4.93547 11.4452C3.31266 11.1368 2.0504 10.2894 1.20123 8.85758C0.55647 7.77024 0.34116 6.58701 0.531552 5.33724C0.929076 2.73358 3.17639 0.792188 5.81812 0.807061C8.3956 0.821543 10.6293 2.7238 11.0338 5.248C11.2678 6.70874 10.9723 8.05558 10.1169 9.26034C9.26151 10.4643 8.0884 11.179 6.63925 11.4432C6.63925 11.7857 6.63925 12.1212 6.63925 12.4801C6.86507 12.4801 7.08583 12.4766 7.30698 12.4809C7.71775 12.4887 8.03156 12.7314 8.13396 13.1138C8.27062 13.6253 7.89723 14.1459 7.37123 14.1674C7.13411 14.1772 6.89622 14.169 6.63419 14.169C6.63419 14.2645 6.63419 14.3498 6.63419 14.4352C6.63419 14.6109 6.63692 14.7867 6.63341 14.9624C6.62524 15.3511 6.38695 15.6626 6.01629 15.7761C5.98904 15.7844 5.96295 15.7969 5.93648 15.8071C5.83836 15.8071 5.74142 15.8071 5.64408 15.8071Z"
                                                    fill="currentColor"
                                                  />
                                                </svg>
                                              </span>
                                              <span>Female</span>
                                            </Stack>
                                          </ToggleButton>
                                          <ToggleButton
                                            value={2}
                                            className={ticketbook.genderbtns}
                                            sx={{textTransform:'none',fontSize:'14px'}}
                                          >
                                            <Stack direction={"row"} spacing={1}>
                                              <span style={{ paddingTop: "2px" }}>
                                                <svg
                                                  width="19"
                                                  height="19"
                                                  viewBox="0 0 19 19"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M10.7435 6.7082C10.4528 6.99908 10.2011 7.25096 10.0165 7.43568C8.88726 6.62128 7.61544 6.27235 6.21991 6.44663C4.81608 6.62203 3.66118 7.27235 2.78992 8.39003C1.22768 10.3942 1.3397 13.2617 3.03772 15.1105C4.76818 16.9943 7.63053 17.3579 9.754 15.9569C10.8116 15.2595 11.5354 14.3013 11.8839 13.0833C12.3621 11.4123 12.0645 9.8672 11.0771 8.49225C11.262 8.30686 11.5138 8.05459 11.8044 7.76356C11.8357 7.79468 11.8596 7.8185 11.8746 7.83351C11.9364 7.89534 11.9929 7.95317 12.0472 8.0088C12.1528 8.1169 12.2502 8.21667 12.363 8.32128C12.742 8.67289 13.3317 8.60175 13.5615 8.18213C13.7331 7.8683 13.6692 7.49634 13.3889 7.20613C13.2866 7.10008 13.177 6.99158 13.0681 6.88379C13.0165 6.83271 12.9651 6.78179 12.9147 6.73137C12.9054 6.72211 12.892 6.70867 12.8749 6.69157C13.0393 6.52693 13.2055 6.36054 13.3703 6.19553C14.1189 5.44601 14.8391 4.72487 15.2378 4.32527V4.46446C15.2378 4.61957 15.2377 4.77466 15.2377 4.92974C15.2374 5.43351 15.2371 5.93718 15.2397 6.44106C15.2405 6.54328 15.2495 6.64966 15.2789 6.74698C15.3796 7.08044 15.7168 7.28979 16.0567 7.24037C16.4395 7.18492 16.6858 6.89485 16.6865 6.47954C16.6892 5.1525 16.6892 3.82547 16.6873 2.49843C16.6869 2.1729 16.4961 1.91979 16.194 1.83906C16.1087 1.81643 16.0174 1.80851 15.9288 1.80851C14.6393 1.80662 13.3497 1.807 12.0605 1.80738C12.0043 1.80738 11.9478 1.81228 11.8919 1.8202C11.5449 1.86924 11.2896 2.15554 11.2783 2.50635C11.2643 2.93185 11.5846 3.25286 12.0379 3.2555C12.4912 3.25831 12.9446 3.25783 13.3981 3.25734C13.6129 3.25711 13.8277 3.25688 14.0426 3.25701C14.0769 3.25701 14.1113 3.25907 14.145 3.26108C14.159 3.26192 14.173 3.26275 14.1867 3.26342C13.7462 3.70434 12.9238 4.52702 12.1015 5.34963C12.0065 5.44464 11.9116 5.53965 11.8172 5.63407C11.5605 5.37741 11.346 5.16285 11.2914 5.10805C11.114 4.92965 10.9057 4.82969 10.6643 4.83425C10.3388 4.84069 10.1086 4.99513 9.99471 5.28914C9.87869 5.58901 9.94148 5.87987 10.1768 6.13556C10.2362 6.2 10.4683 6.43338 10.7435 6.7082Z"
                                                    fill="currentColor"
                                                  />
                                                </svg>
                                              </span>
                                              <span>Other</span>
                                            </Stack>
                                          </ToggleButton>
                                        </ToggleButtonGroup>
                                      </Grid> */}
                                            {room_details.HotelRoomsDetails.find(
                                              (item) =>
                                                item.RoomIndex ===
                                                selectedroom[roomindex]
                                            ).IsPassportMandatory && (
                                              <>
                                                <Grid item md={4} xs={12}>
                                                  <TextField
                                                    className={
                                                      classes.travelerinfo
                                                    }
                                                    label="*Passport No"
                                                    fullWidth
                                                    name="passport_num"
                                                    onChange={(e) =>
                                                      handletravellersinput(
                                                        e,
                                                        index,
                                                        2,
                                                        roomindex
                                                      )
                                                    }
                                                    value={
                                                      persons[roomindex]
                                                        ?.adult_state[index]
                                                        ?.passport_num
                                                    }
                                                    // error={adult_state[index].p_num_err}
                                                    // helperText={adult_state[index].p_num_err ? 'Passport_num shouldnt be empty' : ''}
                                                    InputLabelProps={{
                                                      style: {
                                                        color: persons[
                                                          roomindex
                                                        ]?.adult_state[index]
                                                          ?.p_num_err
                                                          ? "red"
                                                          : "#8F9098",
                                                        fontWeight: "500",
                                                      },
                                                    }}
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment position="start">
                                                          <img
                                                            src={passport}
                                                            alt="passport"
                                                          />
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    size="small"
                                                  />
                                                </Grid>
                                                <Grid item md={4} xs={12}>
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                  >
                                                    <MobileDatePicker
                                                      inputFormat="MM/dd/yyyy"
                                                      //  disabled={disableCalendar}
                                                      sx={{
                                                        "& .MuiPickersToolbar-penIconButton":
                                                          {
                                                            display: "none",
                                                          },
                                                      }}
                                                      closeOnSelect
                                                      disablePast
                                                      //  inputRef={busDateSelectRef}

                                                      label="passport_exp"
                                                      value={
                                                        persons[roomindex]
                                                          ?.adult_state[index]
                                                          ?.passport_exp
                                                      } // error={adult_state[index].dob_err}
                                                      // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                                      onChange={(newvalue) =>
                                                        setPersons(
                                                          (prevdata) => {
                                                            const updatedpersons =
                                                              [...prevdata];
                                                            updatedpersons[
                                                              roomindex
                                                            ].adult_state[
                                                              index
                                                            ].passport_exp =
                                                              newvalue;
                                                            return updatedpersons;
                                                          }
                                                        )
                                                      }
                                                      renderInput={(params) => (
                                                        <TextField
                                                          id="dateInputTag"
                                                          sx={{
                                                            minWidth: "90px",
                                                          }}
                                                          // size="small"
                                                          {...params}
                                                          fullWidth
                                                          autoComplete="off"
                                                          name="dob"
                                                          size="small"
                                                          label={
                                                            <span
                                                              style={{
                                                                paddingRight:
                                                                  "0.5rem",
                                                              }}
                                                            >
                                                              * Passport Expiry
                                                            </span>
                                                          }
                                                          // value=""
                                                          className={
                                                            classes.travelerinfo
                                                          }
                                                          InputLabelProps={{
                                                            style: {
                                                              color: persons[
                                                                roomindex
                                                              ]?.adult_state[
                                                                index
                                                              ]?.p_exp_err
                                                                ? "red"
                                                                : "#8F9098",
                                                              fontWeight: "500",
                                                            },
                                                          }}
                                                          InputProps={{
                                                            readOnly: true,
                                                            startAdornment: (
                                                              <InputAdornment position="start">
                                                                <img
                                                                  src={passport}
                                                                  alt="caleder"
                                                                />
                                                              </InputAdornment>
                                                            ),
                                                          }}
                                                        />
                                                      )}
                                                    />
                                                  </LocalizationProvider>
                                                </Grid>
                                                <Grid item md={4} xs={12}>
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                  >
                                                    <MobileDatePicker
                                                      inputFormat="MM/dd/yyyy"
                                                      //  disabled={disableCalendar}
                                                      sx={{
                                                        "& .MuiPickersToolbar-penIconButton":
                                                          {
                                                            display: "none",
                                                          },
                                                      }}
                                                      closeOnSelect
                                                      disableFuture
                                                      //  inputRef={busDateSelectRef}

                                                      label="passport_issue"
                                                      value={
                                                        persons[roomindex]
                                                          ?.adult_state[index]
                                                          ?.passport_issue
                                                      } // error={adult_state[index].dob_err}
                                                      // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                                      onChange={(newvalue) =>
                                                        setPersons(
                                                          (prevdata) => {
                                                            const updatedpersons =
                                                              [...prevdata];
                                                            updatedpersons[
                                                              roomindex
                                                            ].adult_state[
                                                              index
                                                            ].passport_issue =
                                                              newvalue;
                                                            return updatedpersons;
                                                          }
                                                        )
                                                      }
                                                      renderInput={(params) => (
                                                        <TextField
                                                          id="dateInputTag"
                                                          sx={{
                                                            minWidth: "90px",
                                                          }}
                                                          // size="small"
                                                          {...params}
                                                          fullWidth
                                                          autoComplete="off"
                                                          name="dob"
                                                          size="small"
                                                          label={
                                                            <span
                                                              style={{
                                                                paddingRight:
                                                                  "0.5rem",
                                                              }}
                                                            >
                                                              * Passport Issue
                                                              Date
                                                            </span>
                                                          }
                                                          // value=""
                                                          className={
                                                            classes.travelerinfo
                                                          }
                                                          InputLabelProps={{
                                                            style: {
                                                              color: persons[
                                                                roomindex
                                                              ]?.adult_state[
                                                                index
                                                              ]
                                                                ?.passport_issue_err
                                                                ? "red"
                                                                : "#8F9098",
                                                              fontWeight: "500",
                                                            },
                                                          }}
                                                          InputProps={{
                                                            readOnly: true,
                                                            startAdornment: (
                                                              <InputAdornment position="start">
                                                                <img
                                                                  src={passport}
                                                                  alt="caleder"
                                                                />
                                                              </InputAdornment>
                                                            ),
                                                          }}
                                                        />
                                                      )}
                                                    />
                                                  </LocalizationProvider>
                                                </Grid>
                                                {/* <Grid item md={4} xs={12}>
                                                  <TextField
                                                    className={
                                                      classes.travelerinfo
                                                    }
                                                    label="* Passport Issue Country"
                                                    fullWidth
                                                    name="passport_issue_country"
                                                    onChange={(e) =>
                                                      handletravellersinput(
                                                        e,
                                                        index,
                                                        2,
                                                        roomindex
                                                      )
                                                    }
                                                    value={
                                                      persons[roomindex]
                                                        ?.adult_state[index]
                                                        ?.passport_issue_country
                                                    }
                                                    // error={adult_state[index].p_num_err}
                                                    // helperText={adult_state[index].p_num_err ? 'Passport_num shouldnt be empty' : ''}
                                                    InputLabelProps={{
                                                      style: {
                                                        color: persons[
                                                          roomindex
                                                        ]?.adult_state[index]
                                                          ?.passport_issue_country_err
                                                          ? "red"
                                                          : "#8F9098",
                                                        fontWeight: "500",
                                                      },
                                                    }}
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment position="start">
                                                          <img
                                                            src={passport}
                                                            alt="passport"
                                                          />
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    size="small"
                                                  />
                                                </Grid> */}
                                              </>
                                            )}
                                            {room_details.HotelRoomsDetails.find(
                                              (item) =>
                                                item.RoomIndex ===
                                                selectedroom[roomindex]
                                            ).IsPANMandatory && (
                                              <Grid item md={4} xs={12}>
                                                <TextField
                                                  className={
                                                    classes.travelerinfo
                                                  }
                                                  label="Pan Card No "
                                                  fullWidth
                                                  name="pan_no"
                                                  onChange={(e) =>
                                                    handletravellersinput(
                                                      e,
                                                      index,
                                                      2,
                                                      roomindex
                                                    )
                                                  }
                                                  value={
                                                    persons[roomindex]
                                                      ?.adult_state[index]
                                                      ?.pan_no
                                                  }
                                                  // error={adult_state[index].p_num_err}
                                                  // helperText={adult_state[index].p_num_err ? 'Passport_num shouldnt be empty' : ''}
                                                  InputLabelProps={{
                                                    style: {
                                                      color: persons[roomindex]
                                                        ?.adult_state[index]
                                                        ?.pan_no_err
                                                        ? "red"
                                                        : "#8F9098",
                                                      fontWeight: "500",
                                                    },
                                                  }}
                                                  InputProps={{
                                                    startAdornment: (
                                                      <InputAdornment position="start">
                                                        <img
                                                          src={pan_card}
                                                          alt="passport"
                                                        />
                                                      </InputAdornment>
                                                    ),
                                                  }}
                                                  size="small"
                                                />
                                              </Grid>
                                            )}
                                          </>
                                        )}
                                      </Grid>

                                      <Grid
                                        item
                                        container
                                        columnGap={2}
                                        rowGap={2}
                                      >
                                        <Grid item md={"auto"}>
                                          <Button
                                            onClick={() =>
                                              Travellersdialogopen(
                                                index,
                                                2,
                                                roomindex
                                              )
                                            }
                                            variant="contained"
                                            disableRipple
                                            className={
                                              ticketbook.addtravellerbtn
                                            }
                                          >
                                            Existence Guest
                                          </Button>
                                        </Grid>
                                        {/* <Grid item md={"auto"}>
                                          <Button
                                            variant={"outlined"}
                                            className={
                                              ticketbook.savedetailsbtn
                                            }
                                          >
                                            Save Details
                                          </Button>
                                        </Grid> */}
                                      </Grid>
                                    </Grid>
                                  </>
                                );
                              }
                            )}
                            {Array.from(
                              { length: guests_details[roomindex].NoOfChild },
                              (_, index) => {
                                return (
                                  <>
                                    <Grid
                                      item
                                      container
                                      direction="column"
                                      spacing={2}
                                    >
                                      <Grid item container spacing={1}>
                                        <Grid item mt={0.4}>
                                          <img
                                            src={traveller}
                                            alt="traveller"
                                          />
                                        </Grid>
                                        <Grid item sx={{ fontWeight: "600" }}>
                                          Child
                                        </Grid>
                                      </Grid>

                                      <Grid item container spacing={3}>
                                        <Grid item md={4} xs={12}>
                                          {/* {console.log(persons[roomindex]?.child_state,"title")} */}
                                          <ToggleButtonGroup
                                            value={
                                              persons[roomindex]?.child_state[
                                                index
                                              ]?.title
                                            }
                                            exclusive
                                            onChange={titlechange(
                                              1,
                                              index,
                                              roomindex
                                            )}
                                            size="small"
                                          >
                                            <ToggleButton
                                              disableRipple
                                              value={1}
                                              sx={{
                                                // padding: "0.3rem 1rem",
                                                // background: "#EEF7FD",
                                                // color: styles.app_color,
                                                // border: "none",
                                                // borderRadius: "0.5rem!important",
                                                // width:'4rem'
                                                padding: "0.3rem 1rem",
                                                background: "#EEF7FD",
                                                color: styles.app_color,
                                                border: "none",
                                                borderRadius:
                                                  "0.5rem!important",
                                                width: "4rem",
                                                textTransform: "none",
                                                "@media (min-width:900px) and (max-width:1300px)":
                                                  {
                                                    width: "fit-content",
                                                    padding: "0rem 0.5rem",
                                                  },
                                                "@media (max-width:367px)": {
                                                  width: "fit-content",
                                                  padding:
                                                    "0rem 0.5rem !important",
                                                  marginLeft:
                                                    "0.5rem!important",
                                                },
                                              }}
                                            >
                                              MR
                                            </ToggleButton>
                                            <ToggleButton
                                              disableRipple
                                              value={2}
                                              className={ticketbook.titlebtns}
                                            >
                                              MRS
                                            </ToggleButton>
                                            <ToggleButton
                                              value={3}
                                              disableRipple
                                              className={ticketbook.titlebtns}
                                            >
                                              MSTR
                                            </ToggleButton>
                                            <ToggleButton
                                              value={4}
                                              disableRipple
                                              className={ticketbook.titlebtns}
                                            >
                                              Ms
                                            </ToggleButton>
                                          </ToggleButtonGroup>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                          {/* {console.log(persons[roomindex]?.child_state[index]?.first_name,"first name")} */}
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="*First Name"
                                            name="first_name"
                                            onChange={(e) =>
                                              handletravellersinput(
                                                e,
                                                index,
                                                1,
                                                roomindex
                                              )
                                            }
                                            value={
                                              persons[roomindex]?.child_state[
                                                index
                                              ]?.first_name
                                            }
                                            fullWidth
                                            size={"small"}
                                            InputLabelProps={{
                                              style: {
                                                color: persons[roomindex]
                                                  ?.child_state[index]
                                                  ?.f_name_err
                                                  ? "red"
                                                  : "#8F9098",
                                                fontWeight: "500",
                                              },
                                            }}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <img
                                                    src={person}
                                                    alt="personn"
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="*Last Name"
                                            name="last_name"
                                            onChange={(e) =>
                                              handletravellersinput(
                                                e,
                                                index,
                                                1,
                                                roomindex
                                              )
                                            }
                                            value={
                                              persons[roomindex]?.child_state[
                                                index
                                              ]?.last_name
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              style: {
                                                color: persons[roomindex]
                                                  ?.child_state[index]
                                                  ?.l_name_err
                                                  ? "red"
                                                  : "#8F9098",
                                                fontWeight: "500",
                                              },
                                            }}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <img
                                                    src={person}
                                                    alt="personn"
                                                  />
                                                </InputAdornment>
                                              ),
                                            }}
                                            size="small"
                                          />
                                        </Grid>
                                        {room_details.HotelRoomsDetails.find(
                                          (item) =>
                                            item.RoomIndex ===
                                            selectedroom[roomindex]
                                        ).RequireAllPaxDetails && (
                                          <>
                                            {/* <Grid item md={4} xs={12}>
                                            <LocalizationProvider
                                              dateAdapter={AdapterDateFns}
                                            >
                                              <MobileDatePicker
                                                inputFormat="MM/dd/yyyy"
                                                //  disabled={disableCalendar}
                                                sx={{
                                                  "& .MuiPickersToolbar-penIconButton":
                                                    {
                                                      display: "none",
                                                    },
                                                }}
                                                closeOnSelect
                                                disableFuture
                                                //  inputRef={busDateSelectRef}

                                                label="Date"
                                                value={
                                                  persons[roomindex]
                                                    ?.child_state[index]?.dob
                                                }
                                                // error={adult_state[index].dob_err}
                                                // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                                onChange={(newvalue) =>
                                                  setPersons((prevdata) => {
                                                    const updatedpersons = [
                                                      ...prevdata,
                                                    ];
                                                    updatedpersons[
                                                      roomindex
                                                    ].child_state[index].dob =
                                                      newvalue;
                                                    return updatedpersons;
                                                  })
                                                }
                                                renderInput={(params) => (
                                                  <TextField
                                                    id="dateInputTag"
                                                    sx={{ minWidth: "90px" }}
                                                    // size="small"
                                                    {...params}
                                                    fullWidth
                                                    autoComplete="off"
                                                    name="dob"
                                                    size="small"
                                                    label={
                                                      <span
                                                        style={{
                                                          paddingRight:
                                                            "0.5rem",
                                                        }}
                                                      >
                                                        *Date of Birth
                                                      </span>
                                                    }
                                                    // value=""
                                                    className={
                                                      classes.travelerinfo
                                                    }
                                                    InputLabelProps={{
                                                      style: {
                                                        color: persons[
                                                          roomindex
                                                        ]?.child_state[index]
                                                          ?.dob_err
                                                          ? "red"
                                                          : "#8F9098",
                                                        fontWeight: "500",
                                                      },
                                                    }}
                                                    InputProps={{
                                                      readOnly: true,
                                                      startAdornment: (
                                                        <InputAdornment position="start">
                                                          <img
                                                            src={calender}
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
                                          </Grid> */}
                                            {/* <Grid item md={4}>
                                    <ToggleButtonGroup
                                      value={persons[roomindex]?.child_state[index]?.gender}
                                      exclusive
                                      onChange={handleGender(1, index,roomindex)}
                                      size="large"
                                    >
                                      <ToggleButton
                                        value={0}
                                        sx={{
                                          // padding: "0.3rem 1.5rem",
                                          width:'80px',
                                          height:'30px',
                                          background: "#EEF7FD",
                                          color: styles.app_color,
                                          border: "none",
                                          borderRadius: "0.5rem!important",
                                          textTransform:'none',
                                          fontSize:'14px'
                                        }}
                                      >
                                        <Stack direction={"row"} spacing={1}>
                                          <span style={{ paddingTop: "2px" }}>
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M9.84502 5.36709C10.8257 4.38546 11.7984 3.41181 12.7799 2.42934C12.7282 2.42682 12.6736 2.42219 12.6194 2.42219C11.8749 2.42177 11.1303 2.42513 10.3862 2.42051C9.88116 2.41757 9.52443 2.05996 9.53998 1.58596C9.55258 1.19515 9.83704 0.876205 10.2236 0.821576C10.2858 0.812752 10.3488 0.807289 10.4114 0.807289C11.8476 0.806869 13.2841 0.806448 14.7207 0.80855C14.8194 0.80855 14.9211 0.817374 15.0161 0.842587C15.3526 0.932514 15.5653 1.21448 15.5657 1.57713C15.5678 3.05546 15.5678 4.5338 15.5648 6.01213C15.564 6.47479 15.2896 6.79794 14.8631 6.85971C14.4846 6.91476 14.1089 6.68154 13.9967 6.31007C13.964 6.20165 13.9539 6.08315 13.953 5.96927C13.9493 5.23514 13.9509 4.50144 13.9509 3.76732C13.9509 3.71101 13.9509 3.65428 13.9509 3.61226C12.9804 4.58506 12.0098 5.55829 11.0265 6.54413C12.1266 8.07583 12.4581 9.79705 11.9253 11.6586C11.5371 13.0155 10.7307 14.0829 9.55258 14.8599C7.18701 16.4206 3.99832 16.0155 2.07057 13.9169C0.178951 11.8574 0.0541595 8.66288 1.79451 6.43025C2.76511 5.18514 4.05168 4.46068 5.61556 4.26528C7.1702 4.07114 8.58702 4.45984 9.84502 5.36709Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                          </span>
                                          <span>Male</span>
                                        </Stack>
                                      </ToggleButton>
                                      <ToggleButton
                                        value={1}
                                        className={ticketbook.genderbtns}
                                        sx={{textTransform:'none',fontSize:'14px'}}
                                      >
                                        <Stack direction={"row"} spacing={1}>
                                          <span style={{ paddingTop: "2px" }}>
                                            <svg
                                              width="12"
                                              height="16"
                                              viewBox="0 0 12 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M5.64408 15.8071C5.53857 15.7601 5.42449 15.726 5.32871 15.6638C5.07875 15.5014 4.95338 15.2607 4.94715 14.9624C4.94208 14.7049 4.94598 14.4469 4.94598 14.1698C4.69602 14.1698 4.45929 14.1784 4.22335 14.1678C3.86982 14.1518 3.61519 13.9721 3.48281 13.6445C3.35316 13.3232 3.40766 13.0202 3.63738 12.7588C3.80791 12.565 4.02984 12.4797 4.28603 12.4805C4.4994 12.4809 4.71237 12.4805 4.93547 12.4805C4.93547 12.1309 4.93547 11.7912 4.93547 11.4452C3.31266 11.1368 2.0504 10.2894 1.20123 8.85758C0.55647 7.77024 0.34116 6.58701 0.531552 5.33724C0.929076 2.73358 3.17639 0.792188 5.81812 0.807061C8.3956 0.821543 10.6293 2.7238 11.0338 5.248C11.2678 6.70874 10.9723 8.05558 10.1169 9.26034C9.26151 10.4643 8.0884 11.179 6.63925 11.4432C6.63925 11.7857 6.63925 12.1212 6.63925 12.4801C6.86507 12.4801 7.08583 12.4766 7.30698 12.4809C7.71775 12.4887 8.03156 12.7314 8.13396 13.1138C8.27062 13.6253 7.89723 14.1459 7.37123 14.1674C7.13411 14.1772 6.89622 14.169 6.63419 14.169C6.63419 14.2645 6.63419 14.3498 6.63419 14.4352C6.63419 14.6109 6.63692 14.7867 6.63341 14.9624C6.62524 15.3511 6.38695 15.6626 6.01629 15.7761C5.98904 15.7844 5.96295 15.7969 5.93648 15.8071C5.83836 15.8071 5.74142 15.8071 5.64408 15.8071Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                          </span>
                                          <span>Female</span>
                                        </Stack>
                                      </ToggleButton>
                                      <ToggleButton
                                        value={2}
                                        className={ticketbook.genderbtns}
                                        sx={{textTransform:'none',fontSize:'14px'}}
                                      >
                                        <Stack direction={"row"} spacing={1}>
                                          <span style={{ paddingTop: "2px" }}>
                                            <svg
                                              width="19"
                                              height="19"
                                              viewBox="0 0 19 19"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M10.7435 6.7082C10.4528 6.99908 10.2011 7.25096 10.0165 7.43568C8.88726 6.62128 7.61544 6.27235 6.21991 6.44663C4.81608 6.62203 3.66118 7.27235 2.78992 8.39003C1.22768 10.3942 1.3397 13.2617 3.03772 15.1105C4.76818 16.9943 7.63053 17.3579 9.754 15.9569C10.8116 15.2595 11.5354 14.3013 11.8839 13.0833C12.3621 11.4123 12.0645 9.8672 11.0771 8.49225C11.262 8.30686 11.5138 8.05459 11.8044 7.76356C11.8357 7.79468 11.8596 7.8185 11.8746 7.83351C11.9364 7.89534 11.9929 7.95317 12.0472 8.0088C12.1528 8.1169 12.2502 8.21667 12.363 8.32128C12.742 8.67289 13.3317 8.60175 13.5615 8.18213C13.7331 7.8683 13.6692 7.49634 13.3889 7.20613C13.2866 7.10008 13.177 6.99158 13.0681 6.88379C13.0165 6.83271 12.9651 6.78179 12.9147 6.73137C12.9054 6.72211 12.892 6.70867 12.8749 6.69157C13.0393 6.52693 13.2055 6.36054 13.3703 6.19553C14.1189 5.44601 14.8391 4.72487 15.2378 4.32527V4.46446C15.2378 4.61957 15.2377 4.77466 15.2377 4.92974C15.2374 5.43351 15.2371 5.93718 15.2397 6.44106C15.2405 6.54328 15.2495 6.64966 15.2789 6.74698C15.3796 7.08044 15.7168 7.28979 16.0567 7.24037C16.4395 7.18492 16.6858 6.89485 16.6865 6.47954C16.6892 5.1525 16.6892 3.82547 16.6873 2.49843C16.6869 2.1729 16.4961 1.91979 16.194 1.83906C16.1087 1.81643 16.0174 1.80851 15.9288 1.80851C14.6393 1.80662 13.3497 1.807 12.0605 1.80738C12.0043 1.80738 11.9478 1.81228 11.8919 1.8202C11.5449 1.86924 11.2896 2.15554 11.2783 2.50635C11.2643 2.93185 11.5846 3.25286 12.0379 3.2555C12.4912 3.25831 12.9446 3.25783 13.3981 3.25734C13.6129 3.25711 13.8277 3.25688 14.0426 3.25701C14.0769 3.25701 14.1113 3.25907 14.145 3.26108C14.159 3.26192 14.173 3.26275 14.1867 3.26342C13.7462 3.70434 12.9238 4.52702 12.1015 5.34963C12.0065 5.44464 11.9116 5.53965 11.8172 5.63407C11.5605 5.37741 11.346 5.16285 11.2914 5.10805C11.114 4.92965 10.9057 4.82969 10.6643 4.83425C10.3388 4.84069 10.1086 4.99513 9.99471 5.28914C9.87869 5.58901 9.94148 5.87987 10.1768 6.13556C10.2362 6.2 10.4683 6.43338 10.7435 6.7082Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                          </span>
                                          <span>Other</span>
                                        </Stack>
                                      </ToggleButton>
                                    </ToggleButtonGroup>
                                  </Grid>  */}
                                            {room_details.HotelRoomsDetails.find(
                                              (item) =>
                                                item.RoomIndex ===
                                                selectedroom[roomindex]
                                            ).IsPassportMandatory && (
                                              <>
                                                <Grid item md={4} xs={12}>
                                                  <TextField
                                                    className={
                                                      classes.travelerinfo
                                                    }
                                                    label="*Passport No"
                                                    name="passport_num"
                                                    onChange={(e) =>
                                                      handletravellersinput(
                                                        e,
                                                        index,
                                                        1,
                                                        roomindex
                                                      )
                                                    }
                                                    value={
                                                      persons[roomindex]
                                                        ?.child_state[index]
                                                        ?.passport_num
                                                    }
                                                    fullWidth
                                                    InputLabelProps={{
                                                      style: {
                                                        color: persons[
                                                          roomindex
                                                        ]?.child_state[index]
                                                          ?.p_num_err
                                                          ? "red"
                                                          : "#8F9098",
                                                        fontWeight: "500",
                                                      },
                                                    }}
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment position="start">
                                                          <img
                                                            src={passport}
                                                            alt="passport"
                                                          />
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    size="small"
                                                  />
                                                </Grid>
                                                <Grid item md={4} xs={12}>
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                  >
                                                    <MobileDatePicker
                                                      inputFormat="MM/dd/yyyy"
                                                      //  disabled={disableCalendar}
                                                      sx={{
                                                        "& .MuiPickersToolbar-penIconButton":
                                                          {
                                                            display: "none",
                                                          },
                                                      }}
                                                      closeOnSelect
                                                      disablePast
                                                      //  inputRef={busDateSelectRef}

                                                      label="passport_exp"
                                                      value={
                                                        persons[roomindex]
                                                          ?.child_state[index]
                                                          ?.passport_exp
                                                      } // error={adult_state[index].dob_err}
                                                      // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                                      onChange={(newvalue) =>
                                                        setPersons(
                                                          (prevdata) => {
                                                            const updatedpersons =
                                                              [...prevdata];
                                                            updatedpersons[
                                                              roomindex
                                                            ].child_state[
                                                              index
                                                            ].passport_exp =
                                                              newvalue;
                                                            return updatedpersons;
                                                          }
                                                        )
                                                      }
                                                      renderInput={(params) => (
                                                        <TextField
                                                          id="dateInputTag"
                                                          sx={{
                                                            minWidth: "90px",
                                                          }}
                                                          // size="small"
                                                          {...params}
                                                          fullWidth
                                                          autoComplete="off"
                                                          name="dob"
                                                          size="small"
                                                          label={
                                                            <span
                                                              style={{
                                                                paddingRight:
                                                                  "0.5rem",
                                                              }}
                                                            >
                                                              * Passport Expiry
                                                            </span>
                                                          }
                                                          // value=""
                                                          className={
                                                            classes.travelerinfo
                                                          }
                                                          InputLabelProps={{
                                                            style: {
                                                              color: persons[
                                                                roomindex
                                                              ]?.child_state[
                                                                index
                                                              ]?.p_exp_err
                                                                ? "red"
                                                                : "#8F9098",
                                                              fontWeight: "500",
                                                            },
                                                          }}
                                                          InputProps={{
                                                            readOnly: true,
                                                            startAdornment: (
                                                              <InputAdornment position="start">
                                                                {/* <CalendarMonthIcon sx={{color:'#003556'}}/> */}
                                                                <img
                                                                  src={passport}
                                                                  alt="caleder"
                                                                />
                                                              </InputAdornment>
                                                            ),
                                                          }}
                                                        />
                                                      )}
                                                    />
                                                  </LocalizationProvider>
                                                </Grid>
                                                <Grid item md={4} xs={12}>
                                                  <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                  >
                                                    <MobileDatePicker
                                                      inputFormat="MM/dd/yyyy"
                                                      //  disabled={disableCalendar}
                                                      sx={{
                                                        "& .MuiPickersToolbar-penIconButton":
                                                          {
                                                            display: "none",
                                                          },
                                                      }}
                                                      closeOnSelect
                                                      disableFuture
                                                      //  inputRef={busDateSelectRef}

                                                      label="passport_issue"
                                                      value={
                                                        persons[roomindex]
                                                          ?.child_state[index]
                                                          ?.passport_issue
                                                      } // error={adult_state[index].dob_err}
                                                      // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                                      onChange={(newvalue) =>
                                                        setPersons(
                                                          (prevdata) => {
                                                            const updatedpersons =
                                                              [...prevdata];
                                                            updatedpersons[
                                                              roomindex
                                                            ].child_state[
                                                              index
                                                            ].passport_issue =
                                                              newvalue;
                                                            return updatedpersons;
                                                          }
                                                        )
                                                      }
                                                      renderInput={(params) => (
                                                        <TextField
                                                          id="dateInputTag"
                                                          sx={{
                                                            minWidth: "90px",
                                                          }}
                                                          // size="small"
                                                          {...params}
                                                          fullWidth
                                                          autoComplete="off"
                                                          name="dob"
                                                          size="small"
                                                          label={
                                                            <span
                                                              style={{
                                                                paddingRight:
                                                                  "0.5rem",
                                                              }}
                                                            >
                                                              * Passport Issue
                                                              Date
                                                            </span>
                                                          }
                                                          // value=""
                                                          className={
                                                            classes.travelerinfo
                                                          }
                                                          InputLabelProps={{
                                                            style: {
                                                              color: persons[
                                                                roomindex
                                                              ]?.child_state[
                                                                index
                                                              ]
                                                                ?.passport_issue_err
                                                                ? "red"
                                                                : "#8F9098",
                                                              fontWeight: "500",
                                                            },
                                                          }}
                                                          InputProps={{
                                                            readOnly: true,
                                                            startAdornment: (
                                                              <InputAdornment position="start">
                                                                {/* <CalendarMonthIcon sx={{color:'#003556'}}/> */}
                                                                <img
                                                                  src={passport}
                                                                  alt="caleder"
                                                                />
                                                              </InputAdornment>
                                                            ),
                                                          }}
                                                        />
                                                      )}
                                                    />
                                                  </LocalizationProvider>
                                                </Grid>
                                                {/* <Grid item md={4} xs={12}>
                                              <TextField
                                                className={classes.travelerinfo}
                                                label="* Passport Issue Country"
                                                name="passport_issue_country"
                                                onChange={(e) =>
                                                  handletravellersinput(
                                                    e,
                                                    index,
                                                    1,
                                                    roomindex
                                                  )
                                                }
                                                value={
                                                  persons[roomindex]
                                                    ?.child_state[index]
                                                    ?.passport_issue_country
                                                }
                                                fullWidth
                                                InputLabelProps={{
                                                  style: {
                                                    color: persons[roomindex]
                                                      ?.child_state[index]
                                                      ?.passport_issue_country_err
                                                      ? "red"
                                                      : "#8F9098",
                                                    fontWeight: "500",
                                                  },
                                                }}
                                                InputProps={{
                                                  startAdornment: (
                                                    <InputAdornment position="start">
                                                      <img
                                                        src={passport}
                                                        alt="passport"
                                                      />
                                                    </InputAdornment>
                                                  ),
                                                }}
                                                size="small"
                                              />
                                            </Grid> */}
                                              </>
                                            )}

                                            {/* {room_details.HotelRoomsDetails.find(
                                      (item) =>
                                        item.RoomIndex ===
                                        selectedroom[roomindex]
                                    ).IsPANMandatory&& <Grid item md={4} xs={12}>
                                              <TextField
                                                className={classes.travelerinfo}
                                                label="Pan Card No "
                                                name="pan_no"
                                                onChange={(e) =>
                                                  handletravellersinput(
                                                    e,
                                                    index,
                                                    1,
                                                    roomindex
                                                  )
                                                }
                                                value={
                                                  persons[roomindex]
                                                    ?.child_state[index]?.pan_no
                                                }
                                                fullWidth
                                                InputLabelProps={{
                                                  style: {
                                                    color: persons[roomindex]
                                                      ?.child_state[index]
                                                      ?.pan_no_err
                                                      ? "red"
                                                      : "#8F9098",
                                                    fontWeight: "500",
                                                  },
                                                }}
                                                InputProps={{
                                                  startAdornment: (
                                                    <InputAdornment position="start">
                                                      <img
                                                        src={pan_card}
                                                        alt="passport"
                                                      />
                                                    </InputAdornment>
                                                  ),
                                                }}
                                                size="small"
                                              />
                                            </Grid>} */}
                                          </>
                                        )}
                                      </Grid>

                                      <Grid item container>
                                        <Grid item md={3.4}>
                                          <Button
                                            variant="contained"
                                            disableRipple
                                            className={
                                              ticketbook.addtravellerbtn
                                            }
                                            onClick={() =>
                                              Travellersdialogopen(
                                                index,
                                                1,
                                                roomindex
                                              )
                                            }
                                          >
                                            Existence Guest
                                          </Button>
                                        </Grid>
                                        {/* <Grid item md={3}>
                                    <Button
                                      variant={"outlined"}
                                      className={ticketbook.savedetailsbtn}
                                    >
                                      Save Details
                                    </Button>
                                  </Grid> */}
                                      </Grid>
                                    </Grid>
                                  </>
                                );
                              }
                            )}
                            {/* </span> */}
                          </>
                        );
                      }
                    )}
                    {/* child */}

                    <span style={{ paddingLeft: "1rem", marginTop: "1.5rem" }}>
                      {" "}
                      <Divider />
                    </span>

                    <Grid item container>
                      <span style={{ fontSize: "14px", fontWeight: "500" }}>
                        Booking details will sent to
                      </span>
                    </Grid>
                    <Grid item container spacing={2} ref={ticker_receivers_ref}>
                      <Grid item md={3.7} xs={12}>
                        <TextField
                          className={classes.travelerinfo}
                          autoComplete="off"
                          value={ticket_receiver_info.email}
                          onChange={(e) =>
                            setTicket_receiver_info((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          label="Email ID"
                          fullWidth
                          InputLabelProps={{
                            style: {
                              color: ticket_receiver_info.email_err
                                ? "red"
                                : "#8F9098",
                              fontWeight: "500",
                            },
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={Email} alt="Email" />
                              </InputAdornment>
                            ),
                          }}
                          size="small"
                        />
                      </Grid>
                      <Grid item md={6.5} xs={12}>
                        <Grid
                          container
                          columnGap={1}
                          justifyContent={"space-between"}
                        >
                          <Grid item width={"fit-content"}>
                            <Button
                              disableRipple
                              variant="outlined"
                              onClick={() => setCountrydialog(true)}
                              startIcon={
                                <img
                                  src={
                                    Object.keys(selectedcountry).length > 0
                                      ? selectedcountry.country_flag
                                      : `${"baseurl"}/in.png`
                                  }
                                  width="20px"
                                  height="20px"
                                  alt=""
                                />
                              }
                              endIcon={
                                <ArrowDropDownIcon sx={{ color: styles.app_color }} />
                              }
                              sx={{
                                padding: "0.4rem 0.5rem",
                                borderRadius: "0.5rem",
                                borderColor: "#EDEDED!important",
                                maxWidth: "100%",
                              }}
                            >
                              {Object.keys(selectedcountry).length > 0
                                ? selectedcountry.code
                                : "+91"}
                            </Button>
                          </Grid>
                          <Grid item xs>
                            <TextField
                              autoComplete="off"
                              label="Phone Number"
                              shrink={true}
                              value={ticket_receiver_info.mobile}
                              onChange={(e) =>
                                setTicket_receiver_info((prev) => ({
                                  ...prev,
                                  mobile: e.target.value,
                                }))
                              }
                              className={classes.travelerinfo}
                              InputLabelProps={{
                                style: {
                                  color: ticket_receiver_info.mobile_err
                                    ? "red"
                                    : "#8F9098",
                                  fontWeight: "500",
                                },
                              }}
                              size="small"
                              fullWidth
                              autoFocus
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* <span style={{paddingLeft:'1rem',marginTop:'1.5rem'}}> <Divider /></span>
                        <Grid item Container>
                          <FormControlLabel
                            size="large"
                            label={
                              <InputLabel
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  color: "#303030",
                                }} // set the desired color here
                                shrink={false}
                              >
                                I have a GST number (Optional)
                              </InputLabel>
                            }
                            control={
                              <Checkbox
                                sx={{
                                  color: styles.app_color,
                                  "&.Mui-checked": {
                                    color: styles.app_color,
                                  },
                                }}
                                checked={gstexist}
                                onClick={() => setGstexist((prev) => !prev)}
                              />
                            }
                          />
                        </Grid>
                        <Grid item container spacing={1.5}>
                          <Grid item md={4}>
                            <TextField
                              fullWidth
                              label="Company Name"
                              className={classes.travelerinfo}
                              InputLabelProps={{
                                style: {
                                  color: "#8F9098",
                                  fontWeight: "500",
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img src={company} alt="companie" />
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                            />
                          </Grid>
                          <Grid item md={4}>
                            <TextField
                              fullWidth
                              className={classes.travelerinfo}
                              label="Registration Number"
                              InputLabelProps={{
                                style: {
                                  color: "#8F9098",
                                  fontWeight: "500",
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img
                                      src={registration}
                                      alt="registration"
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                            />
                          </Grid>
                          <Grid item md={4}>
                            <TextField
                              fullWidth
                              className={classes.travelerinfo}
                              label="Company Email"
                              InputLabelProps={{
                                style: {
                                  color: "#8F9098",
                                  fontWeight: "500",
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img
                                      src={Email}
                                      alt="Email"
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                            />
                          </Grid>
                          <Grid item md={4}>
                            <TextField
                              fullWidth
                              className={classes.travelerinfo}
                              label="Company Mobile"
                              InputLabelProps={{
                                style: {
                                  color: "#8F9098",
                                  fontWeight: "500",
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img
                                      src={phone}
                                      alt="Phone"
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                            />
                          </Grid>
                          <Grid item md={4}>
                            <TextField
                              fullWidth
                              className={classes.travelerinfo}
                              label="Company Address"
                              InputLabelProps={{
                                style: {
                                  color: "#8F9098",
                                  fontWeight: "500",
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img
                                      src={location}
                                      alt="address"
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                            />
                          </Grid>
                        </Grid> */}
                  </Grid>
                  {/* </span> */}
                </Paper>
              </div>
              {/* why gmt */}
              <Grid item mt={2}>
                <Why_gmt />
              </Grid>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={"1rem !important"}
                mb={{ md: "1rem !important", xs: "0rem !important" }}
                sx={{
                  backgroundColor: { md: "transparent", xs: "white" },
                  boxShadow: {
                    md: "none",
                    xs: "0px -2px 4px 0px rgba(0, 0, 0, 0.25)",
                  },
                  width: {
                    md: "100%",
                    xs: "calc(100% + 32px)",
                    sm: "calc(100% + 48px)",
                  },
                  marginLeft: {
                    md: "0px !important",
                    xs: "-16px !important",
                    sm: "-24px !important",
                  },
                  padding: { md: "0rem", xs: "1rem 1.5rem" },
                }}
              >
                <Grid
                  sx={{
                    display: { md: "none", xs: "block" },
                    color: styles.app_color,
                    fontWeight: "500",
                  }}
                >
                  <span>₹ 8,400</span> <br />
                  <span style={{ fontWeight: "400" }}>for 2 guest</span>
                </Grid>
                <button
                  style={{
                    color: "#fff",
                    fontFamily: "poppins",
                    backgroundColor: styles.app_color,
                    border: "none",
                    borderRadius: "0.5rem",
                    width: "8rem",
                    height: "2.2rem",
                  }}
                  onClick={typeof location1.state==="string"?() => hot_room_booking():()=>gmt_blockroom()}
                >
                  Continue
                </button>
                {/* ()=>hot_room_booking() */}
              </Grid>
            </Stack>
          </Grid>
          {/* offers */}
          <Grid item md={3} sx={{ display: { md: "block", xs: "none" } }}>
            <Grid container direction={"column"} mt={3.3} spacing={2}>
              <Grid item>
                <Paper
                  sx={{ padding: "1rem", borderRadius: "0.8rem" }}
                  elevation={3}
                >
                  <Grid container direction={"column"} spacing={1.5}>
                    <Grid item>
                      <h3 className={ticketbook.completebookings}>
                        Fare summary
                      </h3>
                    </Grid>
                    <Grid item container justifyContent={"space-between"}>
                      <Grid item>
                        <Stack>
                          <span>
                            {`${guests_details.length} ${
                              guests_details.length > 1 ? "Rooms" : "Room"
                            } * ${`${helperFunctions.nights_calc(
                              hotelresult.CheckInDate,
                              hotelresult.CheckOutDate
                            )} ${
                              helperFunctions.nights_calc(
                                hotelresult.CheckInDate,
                                hotelresult.CheckOutDate
                              ) > 1
                                ? "Nights"
                                : "Night"
                            }`}`}
                          </span>
                          <span style={{ color: "grey", fontSize: "12px" }}>
                            Base Price
                          </span>
                        </Stack>
                      </Grid>
                      <Grid item>
                        {`${cancellation_policies[0].Currency} ${room_details?.RoomCombinationsArray===undefined?open_room_price:fixed_room_price}`}
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Divider />
                    </Grid>

                    {/* {prices.discount>0&& <>
                            <Grid item container sx={{color:'#00a19c'}}>
                            <Grid item md={8}>
                                  Price after Discount
                              </Grid>
                              <Grid item md={4} textAlign={'right'}>
                              {`${cancellation_policies[0].Currency} ${fixed_room_price-prices.discount}`}
                              </Grid>
                          
                          </Grid>
                          <Grid item>
                        <Divider />
                        </Grid>
                          </>
                        } */}
                    <Grid item>
                      <Grid container justifyContent={"space-between"}>
                        <Grid item>Fee & Surcharges</Grid>
                        <Grid item textAlign={"right"}>
                          {`${cancellation_policies[0].Currency} ${gmt_fee}`}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Divider />
                    </Grid>
                    {prices.discount > 0 && (
                      <>
                        <Grid item>
                          <Grid container justifyContent={"space-between"}>
                            <Grid item>Total Discount</Grid>
                            <Grid item sx={{ color: "#3F8CFF" }}>
                              <Stack>
                                <span>{`- ${cancellation_policies[0].Currency} ${prices.discount}`}</span>
                                {/* <span><CancelIcon onClick={()=>{setPrices((prev)=>({...prev,discount:0}))}}/></span> */}
                                <button
                                  style={{
                                    border: "none",
                                    background: "none",
                                    color: "red",
                                    textDecoration: "underline",
                                  }}
                                  onClick={() => {
                                    setPrices((prev) => ({
                                      ...prev,
                                      discount: 0,
                                    }));
                                  }}
                                >
                                  Remove
                                </button>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Divider />
                        </Grid>
                      </>
                    )}
                    <Grid item>
                      <Grid container sx={{ color: styles.app_color }}>
                        <Grid item xs={6}>
                          <span className={ticketbook.totalamount}>
                            Total Amount
                          </span>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          textAlign={"right"}
                          sx={{ fontWeight: 500 }}
                        >
                          {`${cancellation_policies[0].Currency} ${
                            prices.discount > 0
                              ? prices.updatedprice
                              : prices.totalprice
                          }`}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* Coupons */}
              <Grid item>
                <PromoCodes
                  coupons={coupons_data}
                  data={{
                    baseprice: room_details?.RoomCombinationsArray===undefined?open_room_price:fixed_room_price,
                    count: guests_details.length,
                  }}
                  all_prices={prices}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <form action="https://test.payu.in/_payment" method="post">
        <input type="hidden" name="key" value={`${key}`} />
        <input type="hidden" name="txnid" value={`${transactionStr}`} />
        <input type="hidden" name="productinfo" value={`${productinfo}`} />
        <input
          type="hidden"
          name="amount"
          value={
            `${
            prices.discount > 0 ? prices.updatedprice : prices.totalprice
          }`
        }
        />
        <input
          type="hidden"
          name="email"
          value={`${ticket_receiver_info.email}`}
        />
        <input
          type="hidden"
          name="firstname"
          value={`${persons[0]?.adult_state[0]?.first_name}`}
        />
        <input
          type="hidden"
          name="lastname"
          value={`${persons[0]?.adult_state[0]?.last_name}`}
        />
        <input
          type="hidden"
          name="surl"
          value={`${
            process.env.NODE_ENV === "production"
              ? `${process.env.REACT_APP_CLIENT_URL}api/hotelSuccessUrl`
              : `${process.env.REACT_APP_CLIENT_URL}api/hotelSuccessUrl`
          }`}
        />
        <input
          type="hidden"
          name="furl"
          value={`${
            process.env.NODE_ENV === "production"
              ? `${process.env.REACT_APP_CLIENT_URL}api/hotelFailUrl`
              : `${process.env.REACT_APP_CLIENT_URL}api/hotelFailUrl`
          }`}
        />
        <input
          type="hidden"
          name="phone"
          value={`${ticket_receiver_info.mobile}`}
        />
        <input type="hidden" name="hash" value={`${hashedData}`} />
        <input
          className="v-hidden"
          id="payuPayButton"
          type="submit"
          value="PAY"
        />
      </form>
    </div>
  );
};

export default Room_booking;
