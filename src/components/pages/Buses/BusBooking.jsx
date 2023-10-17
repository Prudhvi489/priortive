import {
  Grid,
  Container,
  Paper,
  Stack,
  Divider,
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Radio,
  ToggleButtonGroup, FormLabel, IconButton
} from "@mui/material";
import { userOverallCouponsApi } from '../../../ApiServices/ServiceApiCalls'
import Countrycodefilter from "../../modals/Signupmodals/Countrycodefilter.jsx";
import {styles} from '../../../assets/styles/Styles_export'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useRef, useState } from "react";
import helperFunctions from '../../../helpers/helperFunctions'
import { convertDateFormat, getTimeDifferenceBtTwoDates, convertArrayToTable, handleCharSpace, handleNumInput, calculateAge } from './BusModuleHelperFunctions'

import { ticketbooking, booknow } from "../../../assets/styles/Flights.jsx";
import "../../../assets/styles/commonstyles.css";
// Svg imports
import information from "../../../assets/images/information.svg";
import person from "../../../assets/images/person.svg";

import { makeStyles } from "@mui/styles";
import travelinsurance from "../../../assets/images/travelinsurance.svg";
import correct from "../../../assets/images/correct.svg";
import personblue from "../../../assets/images/personblue.svg";
import MuiToggleButton from "@mui/material/ToggleButton";
import busimage from "../../../assets/images/busimage.png";
import { styled } from "@mui/material/styles";
import Email from "../../../assets/images/Email.svg";
import phone from "../../../assets/images/phone.svg";
import calender from "../../../assets/images/calender.svg";
import passport from "../../../assets/images/passport.svg";
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import registration from "../../../assets/images/registration.svg";
import company from "../../../assets/images/company.svg";
import { useLocation, useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { Apipost } from "../../../ApiServices/Apicalls.js";
import { useSnackbar } from "notistack";
import Tickettravellers from "../../modals/Signupmodals/Tickettravellers.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { busBookingDetailsAction } from "../../../store/BusModuleSlices/BusBookDetails.jsx";
import { busDiscountDetailsAction } from "../../../store/BusModuleSlices/BusDiscountDetails";
import BusesPageBackDrop from "./BusesPageBackDrop";
import Refundpolicy from '../../../assets/images/Refundpolicy.svg'
import { sha512 } from 'js-sha512';
import gomytripclient from "../../../GomytripClient";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from '@mui/icons-material/Close';
import CheckCopounTerms from "../../modals/CheckCopounTerms";
import Why_gmt from "../../why_gmt/Why_gmt";
import Importantinfo from "../../OffersCarousel/Importantinfo";
const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white!important",
    backgroundColor:`${styles.app_color}!important`,
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor:`${styles.app_color}!important`,
      },
    },
  },
  travelerinfo: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#bcbcbc!important",
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

const BusBooking = () => {

  const profileReduxData = useSelector((state)=>state.profile.profiledata)
  const profile = useSelector((state) => state.profile.profiledata);

  const busSearchData = useSelector((state)=>state.busessearch.userSearchedFor)
  const [transactionStr, setTransactionStr] = useState('')
  const [loading, setLoading] = useState(false)
  const classes = useStyles();
  const dispatch = useDispatch()
  let email_Regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  //  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let namesRegix = /^[a-zA-Z\s]+$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  var passport_Regex = /^[A-Z]{1}[0-9]{7}$/;
  const getTheSerchedResult = useSelector((state) => state.busessearch);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const location = useLocation()
  const [userCoupounsData, setUserCoupounsData] = useState([])
  const [selectedCoupounDetails, setSelectedCoupounDetails] = useState('')
  const [coupounCodeValue, setCoupounCodeValue] = useState('')

  const [adminFee, setAdminFee] = useState([])
  const [selectedBusObj, setSelectedBusObj] = useState(location.state.busObject)
  const [passengers, setPassengers] = useState(location.state.busObject.Passenger)
  const totalBaseFare = passengers.reduce((sum, obj) => sum + obj.Seat.Price.PublishedPriceRoundedOff, 0)
  // travellers dialog state
  const [viewtravellerdialog, setViewtravellerdialog] = useState(false);
  const [travellerdata, setTravellerdata] = useState([]);
  const [traveller_index, setTraveller_index] = useState("");
  const textFieldRef = useRef(null);
  const [showGstDiv, setShowGstDiv] = useState(false)
  const [selectedcountry, setSelectedcountry] = useState({
    id: 74,
    country_name: "India",
    country_code: "IN",
    code: "+91",
    country_flag: `${process.env.REACT_APP_BASEURL}/in.png`,
  });
  const [countrydialog, setCountrydialog] = useState(false);
  const ticketbook = ticketbooking();
  // ---------------------------------------ticket_receiver_info
  const [ticket_receiver_info, setTicket_receiver_info] = useState({
    email: "",
    mobile: "",
    address: "",
    email_err: false,
    mobile_err: false,
    address_err: false
  });
  const ticker_receivers_ref_email = useRef(null);
  const ticker_receivers_ref_phone = useRef(null);
  const ticker_receivers_ref_address = useRef(null);
  // ---------------------- FARE RETURN
  let coupounDiscount = 0
  let adminFeeCal = 0
  let priceToShowForUser = totalBaseFare//MAIN PRICE

  const userOverallCouponsCall = async () => {
    const userOverallCouponsApiData = await userOverallCouponsApi(3)
    setUserCoupounsData(userOverallCouponsApiData?.coupons)//-------------_STATE
    setAdminFee(userOverallCouponsApiData?.convenienceFee)
  }
  // ---------------------------------------ticket_receiver_info
  useEffect(() => {
    const randomFiveDigitNumber = Math.floor(10000 + Math.random() * 90000);
    let txnid = "txnid" + "-" + Date.now() + randomFiveDigitNumber;//crypto.randomUUID();
     console.log(txnid,'txnid')
    setTransactionStr(txnid)

    userOverallCouponsCall(3)//--------------------------API CALL FOR COUPOIUNS

    //-----------------------------------MOVE TO TOP OF THE COMPONENT WHEN SCREEN LOADS
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
setTicket_receiver_info((prev)=>({...prev,mobile:profileReduxData?.mobile,email:profileReduxData?.email}))


    // setSelectedBusObj(location.state.busObject)
  }, [])

  const showSnackbarFunction = (message, severity) => {
    enqueueSnackbar(message, {
      variant: severity,
      action: (key) => (
        <span color="inherit" size="small" onClick={() => closeSnackbar(key)}>
          Close
        </span>
      ),
    });
  };

  // travellers dialog opening
  const Travellersdialogopen = async (index, type) => {
    setTraveller_index({ indx: index });
    const userid = localStorage.getItem("userid");
    if (userid != null) {
      const res = await Apipost("/allTravellers", { user_id: userid });
      if (res.status) {
        setTravellerdata(res.data);
        setViewtravellerdialog(true);
      }
    } else {
      showSnackbarFunction("you need to login to your account", 'error');
    }
  };

  // country selection
  function handlecountryselected(value) {
    console.log(value);
    setSelectedcountry(value);
  }

  // travelers call back setting in inputs
  const traveller_cal = (data) => {
    // 1-- male, 2-- female , 3 --other
    // (1-'Mr',2-'Mrs',3-'Mstr',4-'Ms').
    const gendre = data.gender === "1" ? 1 : 2;

    const user_title = data.title == 1 ? 'Mr' : data.title == 2 ? 'Mrs' : data.title == 3 ? 'Mstr' : 'Ms'

    // const [birth_day, birth_month, birth_year] = data?.dob.split("/");
    // let birth_date = `${birth_year}-${birth_month}-${birth_day}`;
    let birth_date = new Date(data.dob.split('/').reverse().join('/'));
    let IdType = data.pan_card ? "1" : data.passport ? "1" : ""
    let IdNumber = data.pan_card ? data.pan_card : data.passport ? data.passport : ""

    if (passengers[traveller_index.indx]?.Seat?.IsLadiesSeat && data.gender != 2) {
      showSnackbarFunction("Cannot select Male traveller for female seat", 'error')
      return
    } else {
      setPassengers((prevdata) => {
        const newPassDataExt = [...prevdata];
        newPassDataExt[traveller_index.indx] = {
          ...newPassDataExt[traveller_index.indx],
          Age: calculateAge(birth_date),
          DOB: birth_date,
          FirstName: data.first_name,
          LastName: data.last_name,
          Gender: gendre,
          // IdNumber:IdNumber,
          // IdType:IdType,
          Title: user_title,
          traveller_id: data.traveller_id

        };
        return newPassDataExt;
      })
    }

  };

  // title chnage ----------------------------------------------------1
  // (1-'Mr',2-'Mrs',3-'Mstr',4-'Ms').
  const passengerTitleChange = (index) => (event, title) => {
    if (title === null) {
      return;
    }
    else {
      let passenger_title = [...passengers];
      // --------------------__CONDITIONS FOR FEMALE SEATS
      // if (passenger_title[index].Seat.IsLadiesSeat && (title == null || title == 1 || title == 3)) {
      if (passenger_title[index].Seat.IsLadiesSeat && (title == null || title == 'Mr' || title == 'Mstr')) {
        showSnackbarFunction('salutation cannot be "Mr" or "Mstr" for Seat beside Female',  'error' )
        return
        // --------------------__CONDITIONS FOR FEMALE SEATS
      } else if ((passenger_title[index].Gender == 1 && (title == 'Ms' || title == 'Mrs')) || (passenger_title[index].Gender == 2 && (title == 'Mr' || title == 'Mstr'))) {
        showSnackbarFunction('salutation cannot be opposite of gender selected', 'error' )
        return
      } else {
        passenger_title[index].Title = title;
        setPassengers(passenger_title);
      }

    }
  }

  // --------------------------------------------handleGender
  // (1-'Mr',2-'Mrs',3-'Mstr',4-'Ms').
  const handleGender = (index) => (e, title) => {
    if (title === null) {
      return;
    }
    else {
      // passenger title updation

      let passenger_gender = [...passengers];
      if (passenger_gender[index].Seat.IsLadiesSeat && (title == "" || title == 1 || title == 3)) {
        showSnackbarFunction('Gender cannot be "Male" or "Other" for Seat beside Female',  'error' )
        return
      } else {
        passenger_gender[index].Gender = title;
        setPassengers(passenger_gender);
      }

    }
  }
  // -----------------------------------handletravellersinput
  const handletravellersinput = (e, objIndex,) => {

    const { name, value } = e.target
    setPassengers((prevdata) => {
      const newPassData = [...prevdata];
      newPassData[objIndex] = {
        ...newPassData[objIndex],
        [name]: value,
      };
      return newPassData;
    });

  }
  // save details of the travellers
  const saveTravallerdetails = async (objIndex) => {
    if (localStorage.getItem("userid") === null) {
      showSnackbarFunction("To save the details you have to logged in.", 'error')
      return;
    }
    else {
      let save_details;

      let age;
      if (passengers[objIndex].DOB != "") {
        age = calculateAge(passengers[objIndex].DOB)
      }
      if (passengers[objIndex].FirstName === "") {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[objIndex] = {
            ...newdata[objIndex],
            FirstName_err: true,
          };
          return newdata;
        });
        showSnackbarFunction("first_name should not be empty", 'error')

        return;
      } else if (!namesRegix.test(passengers[objIndex].FirstName)) {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[objIndex] = {
            ...newdata[objIndex],
            FirstName_err: true,
          };
          return newdata;
        });
        showSnackbarFunction("First name can only contain alphabets", 'error')
        return;
      }
      else {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[objIndex] = {
            ...newdata[objIndex],
            FirstName_err: false,
          };
          return newdata;
        });
      }
      if (passengers[objIndex].LastName === "") {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[objIndex] = {
            ...newdata[objIndex],
            LastName_err: true,
          };
          return newdata;
        });
        showSnackbarFunction("last_name should not be empty", 'error')
        return;
      } else if (!namesRegix.test(passengers[objIndex].LastName)) {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[objIndex] = {
            ...newdata[objIndex],
            LastName_err: true,
          };
          return newdata;
        });
        showSnackbarFunction("Last name can only contain alphabets", 'error')
        return;
      }
      else {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[objIndex] = {
            ...newdata[objIndex],
            LastName_err: false,
          };
          return newdata;
        });
      }
      if (passengers[objIndex].DOB === "") {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[objIndex] = {
            ...newdata[objIndex],
            DOB_err: true,
          };
          return newdata;
        });
        showSnackbarFunction("dob should not be empty", 'error')
        return;
      }
      // else if (passengers[objIndex].Age < 5) {
      //   setPassengers((prevdata) => {
      //     const newdata = [...prevdata];
      //     newdata[objIndex] = {
      //       ...newdata[objIndex],
      //       DOB_err: true,
      //     };
      //     return newdata;
      //   });
      //   showSnackbarFunction("Adult age should be grater than 5", 'error')
      //   return;
      // }
      else {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[objIndex] = {
            ...newdata[objIndex],
            Age: age,
            DOB_err: false,
          };
          return newdata;
        });
      }
      if (passengers[objIndex].Gender === "") {
        showSnackbarFunction("Please select Gender", 'error')
        return;
      }
      if ((passengers[objIndex].Gender == 1 && (passengers[objIndex].Title == 'Ms' || passengers[objIndex].Title == 'Mrs')) || (passengers[objIndex].Gender == 2 && (passengers[objIndex].Title == 'Mr' || passengers[objIndex].Title == 'Mstr'))) {
        showSnackbarFunction('salutation cannot be opposite of gender selected', { variant: 'error' })
        return
      }

      // ----------------address only for lead passenger
      if (passengers[objIndex].hasOwnProperty("Address")) {
        if (passengers[objIndex].Address === "") {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[objIndex] = {
              ...newdata[objIndex],
              Address_err: true,
            };
            return newdata;
          });
          showSnackbarFunction("Address should not be empty", 'error')
          return;
        }
        else {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[objIndex] = {
              ...newdata[objIndex],
              Address_err: false,
            };
            return newdata;
          });
        }
      }
      //----------------------------IdType only
      if (passengers[objIndex].hasOwnProperty("IdType")) {
        if (passengers[objIndex].IdType === "") {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[objIndex] = {
              ...newdata[objIndex],
              IdType_err: true,
            };
            return newdata;
          });
          showSnackbarFunction("IdType should not be empty", 'error')
          return;
        }
        else {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[objIndex] = {
              ...newdata[objIndex],
              IdType_err: false,
            };
            return newdata;
          });
        }
      }
      // /---------------------------------IdNumber onluy
      if (passengers[objIndex].hasOwnProperty("IdNumber")) {
        if (passengers[objIndex].IdNumber === "") {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[objIndex] = {
              ...newdata[objIndex],
              IdNumber_err: true,
            };
            return newdata;
          });
          showSnackbarFunction("IdNumber should not be empty", 'error')
          return;
        }
        else {
          if (passengers[objIndex].IdType == 2 && !panRegex.test(passengers[objIndex].IdNumber.trim().toUpperCase())) {
            setPassengers((prevdata) => {
              const newdata = [...prevdata];
              newdata[objIndex] = {
                ...newdata[objIndex],
                IdNumber_err: true,
              };
              return newdata;
            });
            showSnackbarFunction("Pan number should be valid", 'error')
            return;

          } else if (passengers[objIndex].IdType == 1 && !passport_Regex.test(passengers[objIndex].IdNumber.trim())) {
            setPassengers((prevdata) => {
              const newdata = [...prevdata];
              newdata[objIndex] = {
                ...newdata[objIndex],
                IdNumber_err: true,
              };
              return newdata;
            });
            showSnackbarFunction("passport number should be valid", 'error')
            return;
          } else {
            setPassengers((prevdata) => {
              const newdata = [...prevdata];
              newdata[objIndex] = {
                ...newdata[objIndex],
                IdNumber_err: false,
              };
              return newdata;
            });
          }

        }
      }

      save_details = passengers[objIndex]
      console.log(save_details, 'save_details')
      // return false
      // const user_title = data.title ==1?'Mr':data.title ==2?'Mrs':data.title ==3?'Mstr':'Ms'


      const travellerobj = new FormData()
      travellerobj.append('user_id', localStorage.getItem("userid"))
      travellerobj.append('first_name', save_details.FirstName)
      travellerobj.append('last_name', save_details.LastName)
      travellerobj.append('gender', save_details.Gender)
      travellerobj.append('dob', helperFunctions.getapi_date(save_details.DOB))
      // travellerobj.append('passport_expiry',helperFunctions.getapi_date(save_details.passport_exp))
      // travellerobj.append('passport_issue_date',helperFunctions.getapi_date(save_details.passport_issue))
      // travellerobj.append('passport_issue_country',save_details.passport_issue_country)
      travellerobj.append('title', save_details.Title == 'Mr' ? 1 : save_details.Title == 'Mrs' ? 2 : save_details.Title == 'Mstr' ? 3 : 4)
      if (passengers[objIndex]?.IdType == 1) {
        travellerobj.append('passport', passengers[objIndex].IdNumber.trim())
      }
      if (passengers[objIndex]?.IdType == 2) {
        travellerobj.append('pan_card', passengers[objIndex].IdNumber.trim())
      }
      // travellerobj.append('cover_pic',"")


      if (save_details.traveller_id === "") {
        const response = await Apipost("/addTraveller", travellerobj);
        console.log(response.message, 'responseresponse')
        if (response.status) {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[objIndex] = {
              ...newdata[objIndex],
              traveller_id: response.data.traveller_id,
            };
            return newdata;
          });
          showSnackbarFunction(response.message, 'success');

        }
        else {
          showSnackbarFunction(response.message, 'error')
        }
      }
      else {
        travellerobj.append("traveller_id", save_details.traveller_id);
        const response = await Apipost("/updateTraveller", travellerobj);
        console.log(response, 'responseresponse')
        showSnackbarFunction(response.message, '');

        if (response.status === 1) {
          showSnackbarFunction(response.message, '');

        }
        else {
          showSnackbarFunction(response.message, '')
        }
      }
    }
  }

  function getDesiredKeysForApi(array) {
    let updatedPassengersData = array.map((updatedData) => {
      delete updatedData.Seat.SeatFare //this key si restrictred from api
      delete updatedData.seatIndex
      delete updatedData.hasError
      delete updatedData.Address_err
      delete updatedData.DOB_err
      delete updatedData.FirstName_err
      delete updatedData.LastName_err
      delete updatedData.traveller_id
      delete updatedData.DOB

      if (updatedData.LeadPassenger) {
        updatedData.Email = ticket_receiver_info.email
        // updatedData.Phoneno = `${selectedcountry.code}-${ticket_receiver_info.mobile}`
        updatedData.Phoneno = `${ticket_receiver_info.mobile}`

        updatedData.Address = ticket_receiver_info.address
      }

      return updatedData
    })
    return updatedPassengersData
  }
  // ----------------------------------------------handleSeatBlock
  // (1-'Mr',2-'Mrs',3-'Mstr',4-'Ms').
  function handleSeatBlock() {
    // navigate('/buses/busbookingsuccess')
    let hasError = false;
    const passengersCloneArray = passengers.map(data => ({ ...data }))
    console.log(passengers, 'passengers')
    for (let i = 0; i < passengers?.length; i++) {

      // cond to handle gender 

      if ((passengers[i].Gender == 1 && (passengers[i].Title == 'Ms' || passengers[i].Title == 'Mrs')) || (passengers[i].Gender == 2 && (passengers[i].Title == 'Mr' || passengers[i].Title == 'Mstr'))) {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            hasError: true
          };
          return newdata;
        });
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });
        showSnackbarFunction('salutation cannot be opposite of gender selected', { variant: 'error' })
        return
      }

      // COndition to handle female seats 
      //if (passengers[i].Seat.IsLadiesSeat && (passengers[i].Title == 1|| passengers[i].Title == 3 || passengers[i].Gender == 1 || passengers[i].Gender == 3 || passengers[i].Gender == '')) {
      if (passengers[i].Seat.IsLadiesSeat && (passengers[i].Title == 'Mr' || passengers[i].Title == 'Mstr' || passengers[i].Gender == 1 || passengers[i].Gender == 3 || passengers[i].Gender == '')) {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            hasError: true
          };
          return newdata;
        });
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

        showSnackbarFunction("For seat beside Female the gender and saluation cannot be for male", 'error')
        return;
      }
      // COndition to handle female seats 

      if (passengers[i].FirstName === "") {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            FirstName_err: true,
            hasError: true
          };
          return newdata;
        });
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

        showSnackbarFunction("first_name should not be empty", 'error')

        return;
      } else if (!namesRegix.test(passengers[i].FirstName)) {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            FirstName_err: true,
            hasError: true
          };
          return newdata;
        });
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

        showSnackbarFunction("First name can only contain alphabets", 'error')

        return;
      }
      else {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            FirstName_err: false,
            hasError: false

          };
          return newdata;
        });
        hasError = false

      }
      if (passengers[i].LastName === "") {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            LastName_err: true,
            hasError: true

          };
          return newdata;
        });
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

        showSnackbarFunction("last_name should not be empty", 'error')
        return;
      } else if (!namesRegix.test(passengers[i].LastName)) {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            LastName_err: true,
            hasError: true

          };
          return newdata;
        })
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

        showSnackbarFunction("Last name can only contain alphabets", 'error')

        return;
      }
      else {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            LastName_err: false,
            hasError: false

          };
          return newdata;
        });
        hasError = false

      }
      if (passengers[i].DOB === "") {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            DOB_err: true,
            hasError: true

          };
          return newdata;
        });
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

        showSnackbarFunction("dob should not be empty", 'error')
        return;
      }
      else if (passengers[i].Age < 5) {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            DOB_err: true,
            hasError: true

          };
          return newdata;
        });
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

        showSnackbarFunction("Age should be grater than 5", 'error')
        return;
      }
      else {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            DOB_err: false,
            hasError: false

          };
          return newdata;
        });
        hasError = false
      }
      if (passengers[i].Gender === "") {
        setPassengers((prevdata) => {
          const newdata = [...prevdata];
          newdata[i] = {
            ...newdata[i],
            hasError: true
          };
          return newdata;
        });
        hasError = true
        textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

        showSnackbarFunction("Please select Gender", 'error')
        return;
      }

      // ----------------address only for lead passenger
      if (passengers[i].hasOwnProperty("Address")) {
        if (passengers[i].Address === "") {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[i] = {
              ...newdata[i],
              Address_err: true,
              hasError: true
            };
            return newdata;
          });
          hasError = true
          textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

          showSnackbarFunction("Address should not be empty", 'error')
          return;
        }
        else {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[i] = {
              ...newdata[i],
              Address_err: false,
              hasError: false
            };
            return newdata;
          });
          hasError = false

        }
      }
      //----------------------------IdType only
      if (passengers[i].hasOwnProperty("IdType")) {
        if (passengers[i].IdType === "") {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[i] = {
              ...newdata[i],
              IdType_err: true,
              hasError: true
            };
            return newdata;
          });
          hasError = true
          textFieldRef.current.scrollIntoView({ behavior: 'smooth' });
          showSnackbarFunction("IdType should not be empty", 'error')
          return;
        }
        else {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[i] = {
              ...newdata[i],
              IdType_err: false,
              hasError: false
            };
            return newdata;
          });
          hasError = false

        }
      }
      // /---------------------------------IdNumber onluy
      if (passengers[i].hasOwnProperty("IdNumber")) {
        if (passengers[i].IdNumber === "") {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[i] = {
              ...newdata[i],
              IdNumber_err: true,
              hasError: true
            };
            return newdata;
          });
          hasError = true
          showSnackbarFunction("IdNumber should not be empty", 'error')
          return;
        }
        else {
          setPassengers((prevdata) => {
            const newdata = [...prevdata];
            newdata[i] = {
              ...newdata[i],
              IdNumber_err: false,
              hasError: false
            };
            return newdata;
          });
          hasError = false
        }
      }

    }

    if (hasError) {
      textFieldRef.current.scrollIntoView({ behavior: 'smooth' });

      return;
    }

    if (!hasError) {

      // ------------------
      if (ticket_receiver_info.email === "") {
        setTicket_receiver_info((prev) => ({ ...prev, email_err: 'Email Address is Required' }))
        ticker_receivers_ref_email.current.scrollIntoView()

        showSnackbarFunction("ticket_receivers mail shouln't be empty", 'error')
        return;
      }
      else if (!email_Regex.test(ticket_receiver_info.email.trim())) {
        setTicket_receiver_info((prev) => ({ ...prev, email_err: 'Enter Valid email Address' }))
        ticker_receivers_ref_email.current.scrollIntoView()
        showSnackbarFunction("ticket_receivers mail should be valid", 'error')
        return;
      }
      else {
        setTicket_receiver_info((prev) => ({ ...prev, email_err: false }))
      }
      if (ticket_receiver_info.mobile === "") {
        setTicket_receiver_info((prev) => ({ ...prev, mobile_err: 'Mobile Number is required' }))
        ticker_receivers_ref_phone.current.scrollIntoView()
        showSnackbarFunction("ticket_receivers mobile shouln't be empty", 'error')
        return;
      }
      // else if(!/^\d+$/.test(ticket_receiver_info.mobile) && ticket_receiver_info.mobile.length>6){
      else if (isNaN(ticket_receiver_info.mobile) || ticket_receiver_info.mobile?.length < 10) {
        setTicket_receiver_info((prev) => ({ ...prev, mobile_err: 'Mobile number must be minimum 10 digits' }))
        ticker_receivers_ref_phone.current.scrollIntoView()
        showSnackbarFunction("ticket_receivers mobile shouln be valid and min 10 Numbers", 'error')
        return;
      }
      else {
        setTicket_receiver_info((prev) => ({ ...prev, mobile_err: false }))
      }
      if (ticket_receiver_info.address === '') {
        setTicket_receiver_info((prev) => ({ ...prev, address_err: 'Address is required' }))
        ticker_receivers_ref_address.current.scrollIntoView()
        showSnackbarFunction("Address shouln't be empty", 'error')
        return;
      } else {
        setTicket_receiver_info((prev) => ({ ...prev, address_err: false }))
      }
      setLoading(true)
      const passengersCloneArray = passengers.map(data => ({ ...data }))

      const updatedPassengersData = getDesiredKeysForApi(passengersCloneArray)


      let payloadData = {
        "ResultIndex": selectedBusObj.ResultIndex,
        "TraceId": getTheSerchedResult.traceId,
        "BoardingPointId": selectedBusObj.selectedBoardPoint.CityPointIndex,
        "DroppingPointId": selectedBusObj.selectedDropPoint.CityPointIndex,
        "Passenger": updatedPassengersData
      }
      let payloadDataRedux = {
        "ResultIndex": selectedBusObj.ResultIndex,
        "TraceId": getTheSerchedResult.traceId,
        "BoardingPoint": selectedBusObj.selectedBoardPoint,
        "DroppingPoint": selectedBusObj.selectedDropPoint,
        "Passenger": passengers
      }
      console.log(payloadData, 'payloadData')
      console.log(payloadDataRedux, 'payloadDataRedux')

      axios.post(`${process.env.REACT_APP_BASEURL}/busBlock`, payloadData
      ).then(res => {
        console.log(res,'res')
        if (res.status === 200 && res.data.status === 1) {
          if (res.data.data.IsPriceChanged) {
            alert('PRICE chnged')
            return false
          }

          dispatch(busBookingDetailsAction.ticketdetails({ busBookingDetails: payloadDataRedux, reqBookDetailsForApi: payloadData }))
          dispatch(busDiscountDetailsAction.discountdetails({ userPayed: priceToShowForUser, coupounPrice: coupounDiscount, adminFee: adminFeeCal, adminConv: adminFee, coupoun: selectedCoupounDetails }))
          // showSnackbarFunction(res.data.data.Error.ErrorMessage, 'success')


          // if bloack is success the tax id should be remembered 
          console.log(transactionStr, '22222')

          localStorage.setItem("txnid", transactionStr)

          document.getElementById('payuPayButton').click()

          // setLoading(false)

        } else {
          showSnackbarFunction(res?.data?.data?.Error?.ErrorMessage??res.data.message, 'error')
          // navigate('/buses')
          setLoading(false)
          // navigate('/buses')
        }
        setLoading(false)

      }).catch(err => {
        console.log(err)
        showSnackbarFunction(err.data.message, 'error')
        setLoading(false)
      })
      // console.log(payloadData,'payloadData')
      // ------------------
    }
  }

  // -------------------handleUserGstCheck
  const handleUserGstCheck = (e) => {
    setShowGstDiv(e.target.checked)
  }

  function userCheckForCoupounValid() {

    if (coupounCodeValue) {

      const codeDetails = userCoupounsData.filter((item) => coupounCodeValue == item.coupon_code)[0];
      console.log(codeDetails, 'codeDetails')
      if (codeDetails !== undefined && totalBaseFare < codeDetails?.min_amount) {
        showSnackbarFunction(`Min amount should be ${codeDetails?.min_amount}`, 'error')
      } else {
        let payloadData = { "userId": localStorage.getItem('userid'), "coupon_code": coupounCodeValue.trim(), "module": 3 }

        gomytripclient.post('/validateCoupon', payloadData
        ).then((res) => {
          if (res.data.status === 1) {
            setSelectedCoupounDetails(codeDetails)
            showSnackbarFunction('coupon Applied successfully', 'success')
          } else {
            setSelectedCoupounDetails('')
            setCoupounCodeValue('')
            showSnackbarFunction(res.data.message, 'error')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      showSnackbarFunction('Select or enter Coupoun code', 'error')
    }


  }
  const returnFarePrice = () => {
    let noOfPassCount = passengers?.length
    const coupounApplied = selectedCoupounDetails


    //-------------------------COUPOUN CALCULLATION
    if (coupounApplied && coupounApplied?.id) {
      //MONEY TO DETUCT
      if (coupounApplied.discount_type === 1) {
        coupounDiscount = coupounApplied.discount_value
        priceToShowForUser = priceToShowForUser - coupounDiscount
      }
      //PERCENTAGE DECUTTION
      if (coupounApplied.discount_type === 2) {
        coupounDiscount = Math.ceil((totalBaseFare * coupounApplied.discount_value) / 100)
        priceToShowForUser = priceToShowForUser - coupounDiscount
      }
    }

    //Admin conven fee calcullaation
    if (adminFee?.length > 0) {
      if (adminFee[0]?.convenience_type === 1) { //AMOUNT
        adminFeeCal = adminFee[0]?.convenience_value * noOfPassCount

        priceToShowForUser = priceToShowForUser + adminFeeCal
      }
      if (adminFee[0]?.convenience_type === 2) { //%
        adminFeeCal = Math.ceil((totalBaseFare * adminFee[0]?.convenience_value) / 100)
        priceToShowForUser = priceToShowForUser + adminFeeCal
      }
    }


    // return priceToShowForUser

  }
  returnFarePrice()

  // ----------------------------------------- PAYEMT KEYS
  //  let uuid = crypto.randomUUID();
  let key = "6U1qtB";//-----------------------------PAYU key 
  //  let txnid = crypto.randomUUID();
  let productinfo = "web";
  let salt = `ZmL1mlRYZ4nE3aioEQ4d0gOSOO8Bxjxr`;
  // let details = key + "|" + transactionStr+ "|" + totalBaseFare + "|" + productinfo + "|" + passengers[0].FirstName + "|" + ticket_receiver_info.email + "|||||||||||" + salt;
  // const hashedValue = crypto.createHash("sha512").update(details).digest("hex");
  let details =
    key + "|" + transactionStr + "|" + priceToShowForUser + "|" + productinfo + "|" + passengers[0].FirstName + "|" + ticket_receiver_info.email + "|||||||||||" + salt;
    const hashedValue = sha512.create();
  hashedValue.update(details);
  const hashedData = hashedValue.hex();
  // ----------------------------------------- PAYEMT KEYS

  const [copounTermsState,setCopounTermsState] = useState(false)
  const [copounTermsData,setCopounTermsData] = useState('')

  const handleCopounDialog=(bool)=>{
    setCopounTermsState(bool)
  }
  return (
    <>
      <div className={ticketbook.mainbody}>
        {loading && <BusesPageBackDrop open={loading} />}
        <Tickettravellers
          open={viewtravellerdialog}
          close={() => setViewtravellerdialog(false)}
          travellers={travellerdata}
          traveller_data={traveller_cal}
        />
        <Countrycodefilter
          open={countrydialog}
          onclose={() => setCountrydialog(false)}
          selectedvalue={handlecountryselected}
        />
        <CheckCopounTerms  open={copounTermsState}
        close={()=>handleCopounDialog(false)}
        data={copounTermsData}
        />
        <Container maxWidth="xl">
          <Grid container spacing={2} mt={2}>
            <Grid item md={9} xs={12}>
              <h3 className={ticketbook.completebookings}>
                Complete your Booking
              </h3>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <Paper
                    sx={{
                      padding: "1rem 2rem 0.5rem 1rem",
                      borderRadius: "1rem",
                      marginTop: "12px",
                    }}
                    elevation={3}
                  >
                    <Grid container direction={"column"} spacing={1.5}>
                      <Grid item>
                        <Grid container>
                          <Grid item sm={10} xs={10} md={9}>
                            <span
                              style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                display: 'block'
                              }}
                            >
                              {selectedBusObj?.TravelName}
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {selectedBusObj?.BusType}
                            </span>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid Container display={'flex'} justifyContent={'space-between'} pl={2}>
                        <Grid itemRef="">
                          <img src={busimage} alt='busimage' />
                        </Grid>
                        <Grid item>
                          <span className="textcenter">{getTimeDifferenceBtTwoDates(selectedBusObj?.DepartureTime, selectedBusObj?.ArrivalTime)}</span>
                        </Grid>

                        <Grid item>
                          <img src={busimage} alt='busimage' />
                        </Grid>
                      </Grid>
                      <Grid item >
                        <Divider />
                      </Grid>

                      <Grid item>
                        <Grid container display={'flex'} pb={2} justifyContent={'space-between'}>

                          <Grid item className="sizetext">
                            <Stack spacing={0.5}>
                              {/* <span><b>{helperFunctions.get_time(selectedBusObj?.DepartureTime)}</b></span> */}
                          <p className="c-p f-w-700">{busSearchData.fromDest.city_name}</p>
                              <span><b>{(selectedBusObj?.selectedBoardPoint.CityPointTime).slice(11, 16)}</b></span>
                              <span><b>{selectedBusObj?.selectedBoardPoint.CityPointTime ? helperFunctions.getshortdate(selectedBusObj?.selectedBoardPoint.CityPointTime) : "N/A"}</b></span>
                              <span>{selectedBusObj?.selectedBoardPoint?.CityPointName}</span>
                              <span>{selectedBusObj?.selectedBoardPoint?.CityPointLocation}</span>
                            </Stack>
                          </Grid>
                          <div style={{ border: '1px solid #d5cece' }}></div>
                          <Grid item className="sizetext">
                            <Stack spacing={0.5} textAlign={'right'}>
                          <p className="c-p f-w-700">{busSearchData.toDest.city_name}</p>
                              {/* <span><b>{helperFunctions.get_time(selectedBusObj?.ArrivalTime)}</b></span> */}
                              <span><b>{(selectedBusObj?.selectedDropPoint?.CityPointTime).slice(11, 16)}</b></span>
                              <span><b>{selectedBusObj?.selectedDropPoint?.CityPointTime ? helperFunctions.getshortdate(selectedBusObj?.selectedDropPoint?.CityPointTime) : "N/A"}</b></span>
                              <span>{selectedBusObj?.selectedDropPoint?.CityPointName}</span>
                              <span>{selectedBusObj?.selectedDropPoint?.CityPointLocation}</span>
                            </Stack>
                          </Grid>
                          {/* Departure time */}

                        </Grid>
                      </Grid>
                      <Grid item >
                        <Divider />
                      </Grid>
                      <Grid p={2} color={styles.app_color} fontWeight={500}>
                        <span>Selected Seat : {selectedBusObj?.Passenger?.map(seatItem => seatItem.Seat.SeatName)?.join(',')} </span>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Grid item md={12} xs={12} mt={2} sx={{ display: { md: "none", xs: "block" } }}>
                    <Paper
                      sx={{ padding: "1rem", borderRadius: "1rem" }}
                      elevation={3}
                    >
                      {/* responsive */}
                      <Grid container direction={"column"} spacing={1.5}>
                        <Grid item>
                          <h3 className={ticketbook.completebookings}>
                            Fare summary
                          </h3>
                        </Grid>
                        <Grid item>
                          <Grid container justifyContent='space-between'>
                            <Grid item >
                              Base fare
                            </Grid>
                            <Grid item >
                              ₹ {totalBaseFare}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid item mt={1}>
                          <Grid container justifyContent={'space-between'} alignItems={'baseline'}  >
                            <Grid item >
                              Fee & Surcharges
                            </Grid>
                            <Grid item textAlign={"right"}>
                              <span className="c-p f-w-700">+ ₹ </span>{adminFeeCal}
                            </Grid>
                          </Grid>
                        </Grid>
                        {/* COUPOUN BLOCK */}
                        {selectedCoupounDetails?.coupon_code && <Grid item mt={1}>
                          <Divider />
                          <Grid container justifyContent={'space-between'} alignItems={'baseline'}>
                            <Grid item >
                              Discount
                            </Grid>
                            <Grid item textAlign={"right"}>
                              <span className="c-p f-w-700 ">- ₹ {coupounDiscount} <IconButton size='small' onClick={() => { setSelectedCoupounDetails(''); setCoupounCodeValue('') }}><CloseIcon /></IconButton></span>
                            </Grid>
                          </Grid>
                        </Grid>}
                        {/* COUPOUN BLOCK */}
                        <Divider />

                        <Divider />
                        <Grid item>
                          <Grid container>
                            <Grid item xs={6}>
                              <span className={`${ticketbook.totalamount} f-w-700  c-p`}>
                                Total Amount
                              </span>
                            </Grid>
                            <Grid className="c-p f-w-500" item xs={6} textAlign={"right"}>
                              ₹ {priceToShowForUser}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                </Grid>
              </Grid>
              <div>
                {/* Cacellation refund policy */}
                <Grid item md={12} xs={12}>
                  <Paper
                    // classes={{
                    //     root: classes.MuiAccordionroot,
                    // }}
                    sx={{
                      padding: "1rem 2rem 0.5rem 1rem",
                      borderRadius: "1rem",
                      marginTop: "1rem",
                    }}
                    elevation={3}
                  //expanded={refundpolicy1.expand}
                  >
                    <Grid>
                      <Stack direction={"row"} spacing={1}>
                        <img
                          src={Refundpolicy}
                          width="25px"
                          alt="Cancellation Details"
                        />
                        <span className={ticketbook.textsize}>
                          Cancellation Details
                        </span>
                      </Stack>

                      <Grid spacing={2} m={1} sx={{ backgroundColor: '#EDF5FA', borderRadius: '5px', width: '100%', overflow: "hidden", overflowX: "auto" }} p={2}>
                        <span dangerouslySetInnerHTML={{ __html: convertArrayToTable(selectedBusObj?.CancellationPolicies) }} />
                      </Grid>

                    </Grid>
                  </Paper>
                  <Grid item md={12} xs={12} mt={2} sx={{ display: { md: "none", xs: "block" } }}>
                    <Paper
                      sx={{ padding: "1rem", borderRadius: "1rem" }}
                      elevation={3}
                    >
                      <span className={ticketbook.headings}>Promo Code</span>
                      {/* setUserAppliedCoupoun */}

                      <Grid container direction={"column"} mt={2}>
                        <Grid item>
                          <TextField
                            fullWidth
                            id='enterCoupounCode'
                            //className={classes.root}
                            disabled={Boolean(selectedCoupounDetails?.coupon_code)}
                            value={coupounCodeValue}
                            onChange={(e) => setCoupounCodeValue(e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  {selectedCoupounDetails?.coupon_code ?
                                    <Button onClick={() => { setSelectedCoupounDetails(''); setCoupounCodeValue('') }}>Remove</Button> :
                                    <Button
                                      style={{ color: styles.app_color }}
                                      onClick={(e) => userCheckForCoupounValid(e)}
                                    >
                                      Apply
                                    </Button>}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item mt={2}>
                          <Grid
                            container
                            direction={"column"}
                          >
                            <Grid item>
                              <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  defaultValue="female"
                                  name="radio-buttons-group"
                                  value={coupounCodeValue}


                                >
                                  {userCoupounsData && userCoupounsData?.length > 0 && userCoupounsData.map((coupData) => {
                                    return (
                                      <div
                                        style={{
                                          background: "#DFF3FF",
                                          padding: "0.5rem",
                                          borderRadius: "1rem",
                                          margin: "5px 0"
                                        }}
                                      >
                                        <FormControlLabel
                                          disabled={Boolean(selectedCoupounDetails?.coupon_code)}
                                          value={coupData.coupon_code} control={<Radio onChange={(e) => setCoupounCodeValue(coupData.coupon_code)} />} label={coupData?.coupon_name} />
                                        <Grid
                                          container
                                          direction={"column"}
                                          rowSpacing={1}
                                        >
                                          <Grid item>
                                            Discount of <span className="c-p f-w-700">{coupData.discount_type === 1 ? "₹" : "%"} {coupData.discount_value}</span> Min Amount should be {coupData?.min_amount}
                                            {/* description: {coupData?.description}<br /> */}
                                          </Grid>
                                          <Grid item>
                                          <span onClick={()=>{handleCopounDialog(true);setCopounTermsData(coupData.tc)}} className="coupounTextClass">
                                            T&cs apply
                                          </span></Grid>
                                        </Grid>
                                      </div>
                                    )
                                  })}

                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item md={12} mt={2}>
                <Importantinfo/>
                </Grid>
               
                {/* Travel insurance */}

                <Paper className={ticketbook.paperadjustment} elevation={3}>
                  <Grid container direction={"column"} spacing={1}>
                    <Grid item>
                      <Stack direction={"row"} spacing={1}>
                        <img
                          src={travelinsurance}
                          width="1.8%"
                          alt="travel insurance"
                        />
                        <span className={ticketbook.textsize}>
                          Health Insurance Details
                        </span>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <span style={{ fontSize: '15px', fontWeight: 500 }}>
                        Protection your trip from COVID - 19, medical costs
                        & more with Travel Protection from our award-winning
                        partner Xcover.{" "}
                      </span>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        value='yes'
                      //onChange={(e) => setInsurance(e.target.value)}
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              value="yes"
                              sx={{
                                color: "white",
                                "&, &.Mui-checked": {
                                  color: styles.app_color,
                                },
                              }}
                            />
                          }
                          label="Yes, add Travel Protection with COVID-19 Cover for only ₹ 400.00 "
                        />
                        <Grid container>
                          <Grid item xs={0.3}></Grid>
                          <Grid item>
                            <Grid
                              container
                              direction="column"
                              spacing={1.3}
                              className={ticketbook.completebookings}
                            >

                              <Grid item md={3}>
                                <Stack direction={"row"} spacing={1}>
                                  <span ><img src={correct} alt="correct" /></span>
                                  <span >Emergency medical and dental</span>
                                </Stack>
                              </Grid>
                              <Grid item md={3}>
                                <Stack direction={"row"} spacing={1}>
                                  <img src={correct} alt="correct" />
                                  <span>24/7 Emergency assistance</span>
                                </Stack>
                              </Grid>

                            </Grid>
                          </Grid>
                        </Grid>
                        <FormControlLabel
                          control={
                            <Radio
                              value="no"
                              sx={{
                                color: "white",
                                "&, &.Mui-checked": {
                                  color: styles.app_color,
                                },
                              }}
                            />
                          }
                          label="No, thanks, I’ll risk it."
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Traveller information */}
                <div ref={textFieldRef}>
                  <Paper className={ticketbook.paperadjustment} elevation={3}

                  >
                    <Stack direction={"row"} spacing={1.5}>
                      <img src={personblue} alt="personblue" />
                      <span className={ticketbook.textsize}>
                        Traveller’s Information
                      </span>
                    </Stack>
                    <Grid container spacing={2} mt={1} direction={'column'}>
                      {/* adult */}

                      {passengers.map((passData, passDataIndex) => {
                        // console.log(passData,'passData')
                        return (
                          <Grid
                            key={passData?.seatIndex}
                            item
                            container
                            direction="column"
                            spacing={1}
                          >
                            <span className={`travellerCard ${passData?.hasError ? "errortravellerCard" : ""}`} id={`travellerCard_${passData?.seatIndex}`}>
                            {/* <StarIcon style={{ color: styles.app_color }} />Key Contact */}
                              {passData?.LeadPassenger && <span className="makeFlex justifyCenter " style={{ marginBottom: '10px' }}></span>}
                              <Grid item container spacing={2}>
                                <Grid item md={8} xs={12}>
                                  <ToggleButtonGroup
                                    value={passData.Title} exclusive onChange={passengerTitleChange(passDataIndex)}
                                    size="small">
                                    <ToggleButton disableRipple value={"Mr"} sx={{
                                      padding: "0.3rem 1rem",
                                      background: "#EEF7FD",
                                      color: styles.app_color,
                                      border: "none",
                                      borderRadius: "0.5rem!important",
                                      width: '4rem',
                                      textTransform: "none"
                                    }}>Mr</ToggleButton>
                                    <ToggleButton disableRipple value={"Mrs"} className={ticketbook.titlebtns} sx={{ textTransform: "none" }}
                                    >
                                      Mrs
                                    </ToggleButton>
                                    <ToggleButton value={"Mstr"} disableRipple className={ticketbook.titlebtns} sx={{ textTransform: "none" }}>Mstr</ToggleButton>
                                    <ToggleButton value={"Ms"} disableRipple className={ticketbook.titlebtns} sx={{ textTransform: "none" }}>Ms</ToggleButton>
                                  </ToggleButtonGroup>
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                  <TextField
                                    // className={classes.travelerinfo}
                                    label="*First Name"
                                    fullWidth
                                    size={"small"}
                                    name="FirstName"
                                    // error={adult_state[index].f_name_err}
                                    // helperText={adult_state[index].f_name_err ? 'Firstname shouldnt be empty' : ''}
                                    onChange={(e) =>
                                      handletravellersinput(e, passDataIndex)
                                    }
                                    onKeyDown={(e) => handleCharSpace(e)}
                                    value={passData.FirstName}
                                    error={passData.FirstName_err}
                                    InputLabelProps={{
                                      style: {
                                        // color:adult_state[index].f_name_err?"red": "#8F9098",
                                        fontWeight: "500",
                                      },
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <img src={person} alt="personn" />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                                <Grid item md={6} sm={6} xs={12}>
                                  <TextField
                                    // className={classes.travelerinfo}
                                    label="*Last Name"
                                    fullWidth
                                    name="LastName"
                                    onChange={(e) =>
                                      handletravellersinput(e, passDataIndex)
                                    }
                                    onKeyDown={(e) => handleCharSpace(e)}
                                    value={passData.LastName}
                                    error={passData.LastName_err}
                                    // helperText={adult_state[index].l_name_err ? 'Lastname shouldnt be empty' : ''}
                                    InputLabelProps={{
                                      style: {
                                        // color:adult_state[index].l_name_err?"red": "#8F9098",
                                        fontWeight: "500",
                                      },
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <img src={person} alt="personn" />
                                        </InputAdornment>
                                      ),
                                    }}
                                    size="small"
                                  />
                                </Grid>

                                {/* </Grid> */}
                                {/* <Grid item container spacing={1}> */}
                                <Grid item md={4} sm={6} xs={12}>
                                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                      inputFormat="dd/MM/yyyy"
                                      sx={{
                                        "& .MuiPickersToolbar-penIconButton": {
                                          display: "none",
                                        },
                                      }}
                                      closeOnSelect
                                      disableFuture
                                      label="Date"
                                      value={passData.DOB}
                                      onChange={(newvalue) =>
                                        setPassengers((prevdata) => {
                                          const newPassData = [...prevdata];
                                          newPassData[passDataIndex] = {
                                            ...newPassData[passDataIndex],
                                            DOB: newvalue,
                                            Age: calculateAge(newvalue)
                                          };
                                          return newPassData;
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

                                          className={classes.travelerinfo}
                                          InputLabelProps={{
                                            style: {
                                              color: passData.DOB_err ? "red" : "#8F9098",
                                              fontWeight: "500",
                                            },
                                          }}
                                          InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                {/* <CalendarMonthIcon sx={{color:styles.app_color}}/> */}
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
                                </Grid>

                                <Grid item md={4} sm={6} xs={12}>
                                  <ToggleButtonGroup
                                    value={passData.Gender}
                                    exclusive
                                    onChange={handleGender(passDataIndex)}
                                    size="small"
                                    sx={{ width: '100%', justifyContent: 'space-between' }}
                                  >
                                    <ToggleButton
                                      value={1}
                                      sx={{
                                        // padding: "0rem 0.5rem!important",
                                        width: '80px',
                                        height: '30px',
                                        background: "#EEF7FD",
                                        color: styles.app_color,
                                        border: "none",
                                        borderRadius: "0.5rem!important",
                                        textTransform: 'none',
                                        fontSize: '14px'
                                      }}
                                    >
                                      <Stack direction={"row"} spacing={0.5}>
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
                                      value={2}
                                      className={ticketbook.genderbtns}
                                      sx={{ textTransform: 'none' }}
                                    >
                                      <Stack direction={"row"} spacing={0.5}>
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
                                      value={3}
                                      className={ticketbook.genderbtns}
                                      sx={{ textTransform: 'none', fontSize: '14px' }}
                                    >
                                      <Stack direction={"row"} spacing={0.5}>
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
                                </Grid>

                                {selectedBusObj.IdProofRequired && <>
                                  <Grid item md={4} xs={12}>
                                    <FormControl fullWidth error={passData.IdType_err}>
                                      <InputLabel id="demo-simple-select-label">Id Proof</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={passData.IdType}
                                        label="Id Proof"
                                        name='IdType'
                                        onChange={(e) => handletravellersinput(e, passDataIndex)}
                                        size="small"
                                      >
                                        <MenuItem value="2">Pan no</MenuItem>
                                        <MenuItem value="3">Voterid card</MenuItem>
                                        <MenuItem value="1">Passport</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>

                                  <Grid item md={4} xs={12}>
                                    <TextField
                                      // className={classes.travelerinfo}
                                      label="*Id Number"
                                      fullWidth
                                      name="IdNumber"
                                      onChange={(e) =>
                                        handletravellersinput(e, passDataIndex)
                                      }
                                      onKeyDown={(e) => handleCharSpace(e)}
                                      value={passData.IdNumber}
                                      error={passData.IdNumber_err}
                                      // helperText={adult_state[index].p_num_err ? 'Passport_num shouldnt be empty' : ''}
                                      InputLabelProps={{
                                        style: {
                                          // color:adult_state[index].passport_issue_country_err?"red": "#8F9098",
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
                                </>}

                              </Grid>

                              <Grid item container mt={2} gap={2}>
                                <Grid item md={2.5} sm={4} xs={6}>
                                  <Button
                                    onClick={() =>
                                      Travellersdialogopen(passDataIndex)
                                    }
                                    variant="contained"
                                    disableRipple
                                    className={ticketbook.addtravellerbtn}
                                  >
                                    Existence Traveller
                                  </Button>
                                </Grid>
                                <Grid item md={3} sm={3} xs={5}>
                                  <Button
                                    variant={"outlined"}
                                    className={ticketbook.savedetailsbtn}
                                    onClick={(e) => saveTravallerdetails(passDataIndex)}
                                    // sx={{padding: {xs:"16px",sm:"0px"}}}
                                  >
                                    Save Details
                                  </Button>
                                </Grid>
                              </Grid>
                            </span>
                          </Grid>)
                      })}

                      {/* <Grid item container> */}
                      <span style={{ paddingLeft: '1rem', marginTop: '1.5rem' }}> <Divider /></span>
                      {/* <Grid container>
                                            <hr style={{width:'100%'}}/>
                                        </Grid> */}
                      {/* </Grid> */}
                      <Grid item container>
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>
                          Booking details will sent to
                        </span>
                      </Grid>
                      <Grid item container spacing={2} >
                        <Grid item md={3.5} sm={6} xs={12}>
                          <TextField
                            ref={ticker_receivers_ref_email}
                            //className={classes.travelerinfo}
                            // autoComplete="off"
                            value={ticket_receiver_info.email}
                            onChange={(e) =>
                              setTicket_receiver_info((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            error={Boolean(ticket_receiver_info.email_err)}
                            helperText={ticket_receiver_info.email_err && <span>{ticket_receiver_info.email_err}</span>}
                            label="Email ID"
                            fullWidth
                            InputLabelProps={{
                              style: {
                                color: "#8F9098",
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
                        <Grid item md={5} sm={6} xs={12}>
                          <Grid container >
                            <Grid item md={3.2} sm={4} xs={4.5}>
                              <Button
                                disableRipple
                                variant="outlined"
                                onClick={() => setCountrydialog(true)}
                                startIcon={
                                  <img
                                    src={
                                      Object.keys(selectedcountry)?.length > 0
                                      && selectedcountry.country_flag
                                    }
                                    width="20px"
                                    height="20px"
                                    alt=""
                                  />
                                }
                                endIcon={
                                  <ArrowDropDownIcon
                                    sx={{ color: styles.app_color }}
                                  />
                                }
                                sx={{
                                  padding: "0.4rem 0.5rem",
                                  borderRadius: "0.5rem",
                                  borderColor: "#EDEDED!important",
                                }}
                              >
                                {Object.keys(selectedcountry)?.length > 0
                                  ? selectedcountry.code
                                  : "+91"}
                              </Button>
                            </Grid>
                            <Grid item md={8.5} sm={8} xs={7.5}>
                              <TextField
                                ref={ticker_receivers_ref_phone}
                                onKeyDown={(e) => handleNumInput(e)}
                                // autoComplete="off"
                                label="Phone Number"
                                shrink={true}
                                value={ticket_receiver_info.mobile}
                                onChange={(e) =>
                                  setTicket_receiver_info((prev) => ({
                                    ...prev,
                                    mobile: e.target.value,
                                  }))
                                }
                                error={Boolean(ticket_receiver_info.mobile_err)}
                                helperText={ticket_receiver_info.mobile_err && <span>{ticket_receiver_info.mobile_err}</span>}

                                //className={classes.travelerinfo}
                                InputLabelProps={{
                                  style: {
                                    color: "#8F9098",
                                    fontWeight: "500",
                                  },
                                }}
                                inputProps={{ maxLength: 10 }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <img src={phone} alt="Email" />
                                    </InputAdornment>
                                  ),
                                }}
                                size="small"
                                fullWidth
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={3.5} xs={12}>
                          <TextField
                            ref={ticker_receivers_ref_address}
                            // className={classes.travelerinfo}
                            multiline
                            label="Address"
                            fullWidth
                            name="Address"
                            onChange={(e) =>
                              setTicket_receiver_info((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => handleCharSpace(e)}
                            value={ticket_receiver_info.address}
                            error={ticket_receiver_info.address_err}
                            helperText={ticket_receiver_info.address_err && <span>{ticket_receiver_info.address_err}</span>}
                            InputLabelProps={{
                              style: {
                                // color:adult_state[index].pan_no_err?"red": "#8F9098",
                                fontWeight: "500",
                              },
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <HomeIcon />
                                </InputAdornment>
                              ),
                            }}
                            size="small"
                          />
                        </Grid>
                      </Grid>

                      {showGstDiv && <><span style={{ paddingLeft: '1rem', marginTop: '1.5rem' }}> <Divider /></span>
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
                                checked={showGstDiv}
                                onChange={handleUserGstCheck}
                                sx={{
                                  color: styles.app_color,
                                  "&.Mui-checked": {
                                    color: styles.app_color,
                                  },
                                }}
                              //checked={gstexist}
                              //onClick={() => setGstexist((prev) => !prev)}
                              />
                            }
                          />
                        </Grid>
                        <Grid item container spacing={1.5}>
                          <Grid item md={4} sm={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Company Name"
                              //className={classes.travelerinfo}
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
                          <Grid item md={4} sm={6} xs={12}>
                            <TextField
                              fullWidth
                              //className={classes.travelerinfo}
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
                        </Grid></>}
                    </Grid>
                  </Paper>
                </div>
                {/* why gmt */}
                <Grid item mt={2}>
                  <Why_gmt />
                </Grid>
                {/* Continue button */}
                <Button
                  disableRipple
                  className={ticketbook.continuebtn}
                  variant="contained"
                  onClick={handleSeatBlock}
                >
                  Pay Now
                </Button>
              </div>
            </Grid>
            <Grid item md={3}>
              <Grid container direction={"column"} mt={3.7} spacing={1}>
                <Grid item sx={{ display: { md: "block", xs: "none" } }}>
                  <Paper
                    sx={{ padding: "1rem", borderRadius: "1rem" }}
                    elevation={3}
                  >
                    {/* DESKTOP RESOLUTION */}
                    <Grid container direction={"column"} spacing={1}>
                      <Grid item>
                        <h3 className={ticketbook.completebookings}>
                          Fare summary
                        </h3>
                      </Grid>
                      <Grid item>
                        <Grid container justifyContent='space-between'>
                          <Grid item >
                            Base fare (<span className="c-p f-w-500 ">{passengers?.length} Seat(s)</span>)
                          </Grid>
                          <Grid item >
                            ₹ {totalBaseFare}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid item mt={1}>
                        <Grid container justifyContent={'space-between'} alignItems={'baseline'}  >
                          <Grid item >
                            Fee & Surcharges
                          </Grid>
                          <Grid item textAlign={"right"}>
                            + ₹ <span className="c-p f-w-700"></span>{adminFeeCal}
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* COUPOUN BLOCK */}
                      {selectedCoupounDetails?.coupon_code && <Grid item mt={1}>
                        <Divider />
                        <Grid container justifyContent={'space-between'} alignItems={'baseline'}>
                          <Grid item >
                            Discount
                          </Grid>
                          <Grid item textAlign={"right"}>
                            <IconButton onClick={() => { setSelectedCoupounDetails(''); setCoupounCodeValue('') }}><CancelIcon size='small' sx={{ color: 'red' }} /></IconButton> - ₹ <span className="c-p f-w-700">{coupounDiscount} </span>
                          </Grid>
                        </Grid>
                      </Grid>}
                      {/* COUPOUN BLOCK */}
                      <Divider />
                      <Grid item>
                        <Grid container>
                          <Grid item xs={6}>
                            <span className={`${ticketbook.totalamount} f-w-700  c-p`}>
                              Total Amount
                            </span>
                          </Grid>
                          <Grid className="c-p f-w-500" item xs={6} textAlign={"right"}>
                            ₹ {priceToShowForUser}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* Coupons */}
                <Grid item sx={{ display: { md: "block", xs: "none" } }}>
                  <Paper
                    sx={{ padding: "1rem", borderRadius: "1rem" }}
                    elevation={3}
                  >
                    <span className={ticketbook.headings}>Promo Code</span>
                    <Grid container direction={"column"} mt={2}>
                      <Grid item>
                        <TextField
                          fullWidth
                          id='enterCoupounCode'
                          //className={classes.root}
                          disabled={Boolean(selectedCoupounDetails?.coupon_code)}
                          value={coupounCodeValue}
                          onChange={(e) => setCoupounCodeValue(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                {selectedCoupounDetails?.coupon_code ?
                                  <Button onClick={() => { setSelectedCoupounDetails(''); setCoupounCodeValue('') }}>Remove</Button> :
                                  <Button
                                    style={{ color: styles.app_color }}
                                    onClick={(e) => userCheckForCoupounValid(e)}
                                  >
                                    Apply
                                  </Button>}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item mt={2}>
                        <Grid
                          container
                          direction={"column"}
                        >
                          <Grid item>
                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={coupounCodeValue}


                              >
                                {userCoupounsData && userCoupounsData?.length > 0 && userCoupounsData.map((coupData) => {
                                  return (
                                    <div
                                      style={{
                                        background: "#DFF3FF",
                                        padding: "0.5rem",
                                        borderRadius: "1rem",
                                        margin: "5px 0"
                                      }}
                                    >
                                      <FormControlLabel
                                        disabled={Boolean(selectedCoupounDetails?.coupon_code)}
                                        value={coupData.coupon_code} control={<Radio onChange={(e) => setCoupounCodeValue(coupData.coupon_code)} />} label={<b>{coupData?.coupon_name}</b>} />
                                      <Grid
                                        container
                                        direction={"column"}
                                        rowSpacing={1}
                                      >
                                        <Grid item>
                                          {coupData.description}
                                        </Grid>
                                        <Grid item>
                                           {coupData.discount_type === 1 ? "₹" : ""} {coupData.discount_value} {coupData.discount_type === 1 ? "" : "%"}
                                        </Grid>
                                        <Grid item>
                                          Min Amount : {coupData?.min_amount}
                                        </Grid>
                                        <Grid item>
                                          <span onClick={()=>{handleCopounDialog(true);setCopounTermsData(coupData.tc)}} className="coupounTextClass">
                                            View T&C's
                                          </span>
                                        </Grid>
                                        {/* <Grid item>
                                          Discount of <span className="c-p f-w-700">{coupData.discount_type === 1 ? "₹" : "%"} {coupData.discount_value}</span> Min Amount should be {coupData?.min_amount}
                                        </Grid> */}
                                        {/* <Grid item>T&cs apply</Grid> */}
                                      </Grid>
                                    </div>
                                  )
                                })}

                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <form action='https://test.payu.in/_payment' method='post'>
          <input type="hidden" name="key" value={`${key}`} />
          <input type="hidden" name="txnid" value={`${transactionStr}`} />
          <input type="hidden" name="productinfo" value={`${productinfo}`} />
          <input type="hidden" name="amount" value={`${priceToShowForUser}`} />
          <input type="hidden" name="email" value={`${ticket_receiver_info.email}`} />
          <input type="hidden" name="firstname" value={`${passengers[0].FirstName}`} />
          <input type="hidden" name="lastname" value={`${passengers[0].LastName}`} />
          {/* <input type="hidden" name="surl" value={`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_CLIENT_URL : process.env.REACT_APP_CLIENT_URL}buses/BusBookingSuccess`} /> */}
          {/* <input type="hidden" name="furl" value={`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_CLIENT_URL : process.env.REACT_APP_CLIENT_URL}buses/BusBookingFailure`} /> */}
          <input type="hidden" name="surl" value={`${process.env.NODE_ENV === 'production' ? 'https://dev.gomytrip.com/api/successUrl' : 'https://dev.gomytrip.com/api/successUrl'}`} /> 
           <input type="hidden" name="furl" value={`${process.env.NODE_ENV === 'production' ? 'https://dev.gomytrip.com/api/failUrl' : 'https://dev.gomytrip.com/api/failUrl'}`} />
          <input type="hidden" name="phone" value={ticket_receiver_info.mobile} />
          <input type="hidden" name="hash" value={`${hashedData}`} />
          <input className='v-hidden' id='payuPayButton' type="submit" value="PAY" />
        </form>
      </div>
    </>
  )
}

export default BusBooking;
