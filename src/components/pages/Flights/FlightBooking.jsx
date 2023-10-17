import {
  Grid,
  Container,
  Paper,
  Stack,
  Breadcrumbs,
  Divider,
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  ticketbooking,
  booknow,
  editprofile,
  aftersearchflights,
} from "../../../assets/styles/Flights.jsx";
import "../../../assets/styles/commonstyles.css";
// Svg imports
import information from "../../../assets/images/information.svg";
import plane from "../../../assets/images/plane.svg";
import nonstop1 from "../../../assets/images/nonstop1.svg";
import { makeStyles } from "@mui/styles";
import refundpolicy from "../../../assets/images/Refundpolicy.svg";
import downarrow from "../../../assets/images/downarrow.svg";
import uparrow from "../../../assets/images/uparrow.svg";
import travelinsurance from "../../../assets/images/travelinsurance.svg";
import correct from "../../../assets/images/correct.svg";
import personblue from "../../../assets/images/personblue.svg";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import traveller from "../../../assets/images/traveller.svg";
import person from "../../../assets/images/person.svg";
import calender from "../../../assets/images/calender.svg";
import passport from "../../../assets/images/passport.svg";
import Email from "../../../assets/images/Email.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Countrycodefilter from "../../modals/Signupmodals/Countrycodefilter.jsx";
import registration from "../../../assets/images/registration.svg";
import company from "../../../assets/images/company.svg";
import { useDispatch, useSelector } from "react-redux";
import Bookingconfirmation from "../../modals/Flightmodals/Bookingconfirmation.jsx";
import TravellersDialog from "../../modals/Signupmodals/Travellers.jsx";
import { Apipost } from "../../../ApiServices/Apicalls.js";
import Tickettravellers from "../../modals/Signupmodals/Tickettravellers.jsx";
import axios from "axios";
import Box from "@mui/material/Box";
import { bookingdetailsaction } from "../../../store/BookingdetailsSlice.jsx";
import Nonveg from "../../../assets/images/nonveg.svg";
import planefrontview from "../../../assets/images/planefrontview.png";
import booked_seat from "../../../assets/images/booked_seat.png";
import selected_seat from "../../../assets/images/selected_seat.png";
import free_seat from "../../../assets/images/free_seat.png";
import exitrow_seat from "../../../assets/images/exitrow_seat.png";
import charged_seat from "../../../assets/images/charged_seat.png";
import planebackview from "../../../assets/images/planebackview.png";
import helperFunctions from "../../../helpers/helperFunctions.js";
import MySnackbar from "../../modals/Signupmodals/Snackbar.jsx";
import Loadingmodal from "../../modals/Signupmodals/Loadingmodal.jsx";
import { useNavigate } from "react-router-dom";
import phone from "../../../assets/images/phone.svg";
import location from "../../../assets/images/location.svg";
import pan_card from "../../../assets/images/pan_card.svg";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { CoPresentOutlined } from "@mui/icons-material";
import PromoCodes from "../../OffersCarousel/PromoCodes.jsx";
import Importantinfo from "../../OffersCarousel/Importantinfo.jsx";
import { regex_data } from '../../Regex.jsx'
import { envdata } from '../../Envexports.jsx'
import Why_gmt from "../../why_gmt/Why_gmt.jsx";
import {styles} from '../../../assets/styles/Styles_export.jsx'
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

const BaggageContainer = {
  width: "100%",
  backgroundColor: "#EFF9FF",
  fontFamily: "Poppins",
};
const innerDiv = {
  width: "100%",
  height: "auto",
  borderRadius: "9px",
  boxShadow: "0px 4px 24px -1px rgba(212, 175, 156, 0.25)",
};

const TitleContainer = {
  fontWeight: "bold",
  fontSize: "18px",
  color: "#000000",
  fontFamily: "Poppins",
};
const BaggageInnerContainer = {
  padding: 4,
};
const BaggageSelector = {
  borderTop: "1px solid #D9D9D9",
};
const SelectedCount = {
  padding: "8px 0px",
};
const FooterInfo = {
  display: "flex",
  justifyContent: "space-between",
  color: styles.app_color,
  fontFamily: "Poppins",
};
const seat_blue = {
  backgroundColor: styles.app_color,
};
const FlightBooking = () => {
  // css file initialization
  const book = booknow();
  const editprofiles = editprofile();
  const aftersearchflight = aftersearchflights();
  const ticketbook = ticketbooking();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [offers, setOffers] = useState(50);
  const [insurance, setInsurance] = useState("yes");
  const [gender, setGender] = useState("0");
  const [selectedcountry, setSelectedcountry] = useState({
    id: 74,
    country_name: "India",
    country_code: "IN",
    code: "+91",
    country_flag: `${envdata.baseurl}/in.png`,
  });
  const [countrydialog, setCountrydialog] = useState(false);
  const [mobilenum, setMobilenum] = useState("");
  const [refundpolicy1, setRefundpolicy1] = useState({
    expand: false,
  });
  const [cancellationtab, setCancellationtab] = useState(0);
  const [gstexist, setGstexist] = useState(false);
  const [booking, setBooking] = useState(false);
  const [seats_tab, setSeats_tab] = useState(0);
  const [meals_tab, setMeals_tab] = useState(0);
  const [baggage_tab, setBaggage_tab] = useState(0);
  const [snackbar, setSnackbar] = useState(false);
  const [seats_price, setSeats_price] = useState(0);
  const [selected_seat_codes, setSelected_seat_codes] = useState([]);
  const [gmt_fee, setGmt_fee] = useState(0);
  const [prices, setPrices] = useState({
    discount: 0,
    updatedprice: 0,
    totalprice: 0,
  });
  const selected_flight = useSelector((state) => state.farequote.fare);
  console.log(selected_flight, "kjfkdj")
  const traceid = useSelector((state) => state.flightsearches.Traceid);
  const travellers = useSelector((state) => state.travellerclass.travellers);
  const totaltravellers = travellers.adult + travellers.child;
  const adult_travellers = travellers.adult;
  const child_travellers = travellers.child;
  const infant_travellers = travellers.infant;
  const jrney_type = travellers.classes;
  let adult_basefare = 0;
  let child_basefare = 0;
  let infant_basefare = 0;
  let taxes = 0;
  let othercharges = 0;
  if (adult_travellers > 0) {
    adult_basefare = selected_flight.reduce(
      (sum, obj) => sum + obj.FareBreakdown[0]?.BaseFare,
      0
    );
  }
  if (child_travellers > 0) {
    child_basefare = selected_flight.reduce(
      (sum, obj) => sum + obj.FareBreakdown[1]?.BaseFare,
      0
    );
  }
  if (infant_travellers > 0) {
    console.log("calculating infant basaefare");
    console.log(selected_flight, "selected flight");
    infant_basefare = selected_flight.reduce((sum, obj) => {
      let infant_index;
      if (obj.FareBreakdown.length === 2) {
        infant_index = 1;
      } else {
        infant_index = 2;
      }
      return sum + obj.FareBreakdown[infant_index]?.BaseFare;
    }, 0);
  }
  if (true) {
    taxes = selected_flight.reduce((sum, obj) => sum + obj.Fare.Tax, 0);
  }
  selected_flight.map((item, index) => {
    othercharges += item.Fare?.OtherCharges;
  });
  let resultindex = [];
  selected_flight.map((item) => {
    resultindex.push(item.ResultIndex);
  });
  // getting travellers count from store
  const travellerscount = useSelector(
    (state) => state.travellerclass.travellers
  );
  console.log(travellerscount, "count");
  const [adult_state, setAdult_state] = useState([]);
  const [child_state, setChild_state] = useState([]);
  const [infant_state, setInfant_state] = useState([]);
  const [viewtravellerdialog, setViewtravellerdialog] = useState(false);
  const [travellerdata, setTravellerdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [traveller_index, setTraveller_index] = useState("");
  const [ticket_receiver_info, setTicket_receiver_info] = useState({
    email: "",
    mobile: "",
    email_err: false,
    mobile_err: false,
  });
  const [flightmealspage, setFlightmealspage] = useState(true);
  const [seat_dynamic, setSeat_dynamic] = useState([]);
  const [meal_dynamic, setMeal_dynamic] = useState([]);
  const [baggage_dynamic, setBaggage_dynamic] = useState([]);
  const [selected_seats, setSelected_seats] = useState([]);
  const [selected_stopseats, setSelected_stopseats] = useState({});
  const [total_bags_selected, setTotal_bags_selected] = useState({});
  const [toatal_baggage_price, setTotal_baggage_price] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [total_meals_selected, setTotal_meals_selected] = useState({});
  const [total_meal_price, setTotal_meal_price] = useState(0);
  const [selectedBaggage, setSelectedBaggage] = useState({});
  const [snackmessage, setSnackmessage] = useState("");
  const [loadingmodal, setLoadingmodal] = useState(false);
  const travellersclass = useSelector(
    (state) => state.travellerclass.travellers
  );
  const [meal_city_key, setMeal_city_key] = useState("");
  const [meal_key, setMeal_key] = useState("");
  const [bag_city_key, setBag_city_key] = useState("");
  const [bag_key, setBag_key] = useState("");
  const [r_trip_stops, setR_trip_stops] = useState(0);
  const [r_trip_meal, setR_trip_meal] = useState(0);
  const [r_trip_bag, setR_trip_bag] = useState(0);
  const textFieldRef = useRef(null);
  const ticker_receivers_ref = useRef(null);
  const cabin_class =
    travellersclass.classes == 2
      ? "Economy"
      : travellersclass.classes == 3
        ? "PremiumEconomy"
        : travellersclass.classes == 4
          ? "Business"
          : travellersclass.classes == 5 && "PremiumBusiness";
  useEffect(() => {
    const settraveller_state = async () => {
      const adult = await Array.from(
        { length: travellerscount.adult },
        (_, index) => ({
          traveller_id: "",
          first_name: "",
          last_name: "",
          gender: 1,
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
      );
      const child = await Array.from(
        { length: travellerscount.child },
        (_, index) => ({
          traveller_id: "",
          first_name: "",
          last_name: "",
          gender: 1,
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
      );
      const infant = await Array.from(
        { length: travellerscount.infant },
        (_, index) => ({
          traveller_id: "",
          first_name: "",
          last_name: "",
          gender: 1,
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
      );
      setAdult_state(adult);
      setChild_state(child);
      setInfant_state(infant);
    };
    settraveller_state();
    setLoading(true);
  }, [travellerscount]);

  const cancellationtabs = (event, cancel) => {
    setCancellationtab(cancel);
  };
  // promocodes callback
  const coupons_data = (data) => {
    if (data.type === 1) {
      setGmt_fee(data.platform_charge);
      setPrices((prev) => ({ ...prev, totalprice: data.totalprice }));
    } else {
      setPrices((prev) => ({
        ...prev,
        discount: data.discount,
        updatedprice: data.updated_price,
      }));
    }
  };
  //  creation of passenger object
  const passenger = async (data, index, ticket_index) => {
    let age = await helperFunctions.findage(data.dob);
    let paxtype = age > 12 ? 1 : 2 < age <= 12 ? 2 : 0 < age <= 2 && 0;
    let gender = data.gender === 0 ? 1 : 2;
    let stop_keys = Object.keys(selected_stopseats);
    let baggage_transformed_data = Object.entries(selectedBaggage).reduce(
      (result, [key, value]) => {
        const transformedValue = Object.values(value).flat();
        return { ...result, [key]: transformedValue };
      },
      {}
    );
    let meals_transformed_data = Object.entries(selectedMeals).reduce(
      (result, [key, value]) => {
        const transformedValue = Object.values(value).flat();
        return { ...result, [key]: transformedValue };
      },
      {}
    );
    let title =
      data?.gender === 0 && age > 12
        ? "Mr"
        : data?.gender === 1 && age > 12
          ? "Mrs"
          : data?.gender === 0 && age <= 12
            ? "Mstr"
            : data?.gender === 1 && age <= 12 && "Miss";
    let passenger;

    let seats = [];
    // adult seats pushing
    if (age > 12) {
      if (jrney_type === "2") {
        if (ticket_index === 0) {
          stop_keys.slice(0, r_trip_stops).map((stop) => {
            seats.push(selected_stopseats[stop][index]);
          });
        } else if (ticket_index === 1) {
          stop_keys.slice(r_trip_stops).map((stop) => {
            seats.push(selected_stopseats[stop][index]);
          });
        }
      } else {
        stop_keys.map((stop) => {
          seats.push(selected_stopseats[stop][index]);
        });
      }
    }
    // child seats pushing
    else if (2 < age <= 12) {
      if (jrney_type === "2") {
        if (ticket_index === 0) {
          stop_keys.slice(0, r_trip_stops).map((stop) => {
            seats.push(selected_stopseats[stop][adult_travellers + index]);
          });
        } else if (ticket_index === 1) {
          stop_keys.slice(r_trip_stops).map((stop) => {
            seats.push(selected_stopseats[stop][adult_travellers + index]);
          });
        }
      } else {
        stop_keys.map((stop) => {
          seats.push(selected_stopseats[stop][adult_travellers + index]);
        });
      }
    }
    let baggage = [];
    // baggage adding to ticket api
    if (Object.keys(baggage_transformed_data).length > 0) {
      if (jrney_type === "2") {
        if (ticket_index === 0) {
          Object.keys(baggage_transformed_data)
            .slice(0, r_trip_bag)
            .map((bag) => {
              if (baggage_transformed_data[bag].length > 0) {
                if (age > 12 && index < baggage_transformed_data[bag].length) {
                  baggage.push(baggage_transformed_data[bag][index]);
                } else if (
                  2 < age <= 12 &&
                  adult_travellers + index <
                  baggage_transformed_data[bag].length
                ) {
                  baggage.push(
                    baggage_transformed_data[bag][adult_travellers + index]
                  );
                }
              }
            });
        } else if (ticket_index === 1) {
          Object.keys(baggage_transformed_data)
            .slice(r_trip_bag)
            .map((bag) => {
              if (baggage_transformed_data[bag].length > 0) {
                if (age > 12 && index < baggage_transformed_data[bag].length) {
                  baggage.push(baggage_transformed_data[bag][index]);
                } else if (
                  2 < age <= 12 &&
                  adult_travellers + index <
                  baggage_transformed_data[bag].length
                ) {
                  baggage.push(
                    baggage_transformed_data[bag][adult_travellers + index]
                  );
                }
              }
            });
        }
      } else {
        Object.keys(baggage_transformed_data).map((bag) => {
          if (baggage_transformed_data[bag].length > 0) {
            if (age > 12 && index < baggage_transformed_data[bag].length) {
              baggage.push(baggage_transformed_data[bag][index]);
            } else if (
              2 < age <= 12 &&
              adult_travellers + index < baggage_transformed_data[bag].length
            ) {
              baggage.push(
                baggage_transformed_data[bag][adult_travellers + index]
              );
            }
          }
        });
      }
    }
    let meals = [];
    // meals adding to ticket api
    if (Object.keys(meals_transformed_data).length > 0) {
      if (jrney_type === "2") {
        if (ticket_index === 0) {
          Object.keys(meals_transformed_data)
            .slice(0, r_trip_meal)
            .map((meal) => {
              if (meals_transformed_data[meal].length > 0) {
                if (age > 12 && index < meals_transformed_data[meal].length) {
                  meals.push(meals_transformed_data[meal][index]);
                } else if (
                  2 < age <= 12 &&
                  adult_travellers + index < meals_transformed_data[meal].length
                ) {
                  meals.push(
                    meals_transformed_data[meal][adult_travellers + index]
                  );
                } else if (
                  0 <= age <= 2 &&
                  totaltravellers + index < meals_transformed_data[meal].length
                ) {
                  meals.push(
                    meals_transformed_data[meal][totaltravellers + index]
                  );
                }
              }
            });
        } else if (ticket_index === 1) {
          Object.keys(meals_transformed_data)
            .slice(r_trip_meal)
            .map((meal) => {
              if (meals_transformed_data[meal].length > 0) {
                if (age > 12 && index < meals_transformed_data[meal].length) {
                  meals.push(meals_transformed_data[meal][index]);
                } else if (
                  2 < age <= 12 &&
                  adult_travellers + index < meals_transformed_data[meal].length
                ) {
                  meals.push(
                    meals_transformed_data[meal][adult_travellers + index]
                  );
                } else if (
                  0 <= age <= 2 &&
                  totaltravellers + index < meals_transformed_data[meal].length
                ) {
                  meals.push(
                    meals_transformed_data[meal][totaltravellers + index]
                  );
                }
              }
            });
        }
      } else {
        Object.keys(meals_transformed_data).map((meal) => {
          if (meals_transformed_data[meal].length > 0) {
            if (age > 12 && index < meals_transformed_data[meal].length) {
              meals.push(meals_transformed_data[meal][index]);
            } else if (
              2 < age <= 12 &&
              adult_travellers + index < meals_transformed_data[meal].length
            ) {
              meals.push(
                meals_transformed_data[meal][adult_travellers + index]
              );
            } else if (
              0 <= age <= 2 &&
              totaltravellers + index < meals_transformed_data[meal].length
            ) {
              meals.push(meals_transformed_data[meal][totaltravellers + index]);
            }
          }
        });
      }
    }
    // console.log(baggage_transformed_data,"baggage")
    // console.log(meals_transformed_data,"meals")
    // console.log(Object.keys(selectedBaggage).length,"baggage")
    // console.log(selectedMeals,"meals")
    // Fare: {
    //   BaseFare: 3300,
    //   Tax: 659,
    //   YQTax: 0,
    //   AdditionalTxnFeeOfrd: 0,
    //   AdditionalTxnFeePub: 0,
    //   OtherCharges: 0.0,
    // }
    let fare_obj;
    console.log(selected_flight[ticket_index]?.FareBreakdown, "resultindex");
    // adult fare
    if (age > 12) {
      // fare breakdown destructuring
      const {
        BaseFare: basefare,
        Tax: tax,
        YQTax: yqtax,
        AdditionalTxnFeeOfrd: addtxnfeeofrd,
        AdditionalTxnFeePub: addtxnfeepub,
      } = selected_flight[ticket_index]?.FareBreakdown[0];
      let each_basefare = basefare / adult_travellers;
      let each_tax = tax / adult_travellers;
      fare_obj = {
        BaseFare: each_basefare,
        Tax: each_tax,
        YQTax: yqtax,
        AdditionalTxnFeeOfrd: addtxnfeeofrd,
        AdditionalTxnFeePub: addtxnfeepub,
        OtherCharges: 0.0,
      };
    }
    // child fare
    else if (2 < age <= 12) {
      const {
        BaseFare: basefare,
        Tax: tax,
        YQTax: yqtax,
        AdditionalTxnFeeOfrd: addtxnfeeofrd,
        AdditionalTxnFeePub: addtxnfeepub,
      } = selected_flight[ticket_index]?.FareBreakdown[1];
      let each_basefare = basefare / child_travellers;
      let each_tax = tax / child_travellers;
      fare_obj = {
        BaseFare: each_basefare,
        Tax: each_tax,
        YQTax: yqtax,
        AdditionalTxnFeeOfrd: addtxnfeeofrd,
        AdditionalTxnFeePub: addtxnfeepub,
        OtherCharges: 0.0,
      };
    } else if (0 <= age <= 2) {
      const {
        BaseFare: basefare,
        Tax: tax,
        YQTax: yqtax,
        AdditionalTxnFeeOfrd: addtxnfeeofrd,
        AdditionalTxnFeePub: addtxnfeepub,
      } = selected_flight[ticket_index]?.FareBreakdown.at(-1);
      let each_basefare = basefare / infant_travellers;
      let each_tax = tax / infant_travellers;
      fare_obj = {
        BaseFare: each_basefare,
        Tax: each_tax,
        YQTax: yqtax,
        AdditionalTxnFeeOfrd: addtxnfeeofrd,
        AdditionalTxnFeePub: addtxnfeepub,
        OtherCharges: 0.0,
      };
    }
    if (jrney_type === "3") {
      seats = [];
    }
    if (age >= 0 && age <= 2) {
      passenger = {
        Title: title,
        FirstName: data?.first_name,
        LastName: data?.last_name,
        PaxType: paxtype,
        DateOfBirth: data?.dob,
        Gender: gender,
        PassportNo: data?.passport_num,
        PassportExpiry: data?.passport_exp,
        AddressLine1: "123, Test",
        AddressLine2: "",
        Fare: fare_obj,
        City: "Gurgaon",
        CountryCode: selectedcountry?.country_code,
        CountryName: selectedcountry?.country_name,
        Nationality: selectedcountry?.country_code,
        ContactNo: ticket_receiver_info?.mobile || "",
        Email: ticket_receiver_info?.email || "",
        IsLeadPax: true,
        FFAirlineCode: "6E",
        FFNumber: "",
        MealDynamic: [
          {
            AirlineCode: "6E",
            FlightNumber: "6174",
            WayType: 2,
            Code: "NoMeal",
            Description: 2,
            AirlineDescription: "",
            Quantity: 0,
            Currency: "INR",
            Price: 0,
            Origin: "HYD",
            Destination: "DEL",
          },
        ],
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    } else {
      passenger = {
        Title: data?.gender === 0 ? "Mr" : "Ms",
        FirstName: data?.first_name,
        LastName: data?.last_name,
        PaxType: paxtype,
        DateOfBirth: data?.dob,
        Gender: gender,
        PassportNo: data?.passport_num,
        PassportExpiry: data?.passport_exp,
        AddressLine1: "123, Test",
        AddressLine2: "",
        Fare: fare_obj,
        City: "Gurgaon",
        CountryCode: selectedcountry?.country_code,
        CountryName: selectedcountry?.country_name,
        Nationality: selectedcountry?.country_code,
        ContactNo: ticket_receiver_info?.mobile || "",
        Email: ticket_receiver_info?.email || "",
        IsLeadPax: true,
        FFAirlineCode: "6E",
        FFNumber: "",
        Baggage: baggage,
        MealDynamic: meals,
        SeatDynamic: seats,
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    }
    return passenger;
  };
  // ticket api calling
  const ticket_request = async () => {
    if (Object.keys(selected_stopseats).length === 0) {
      setSnackbar(true);
      setSnackmessage("seat selection is necessary");
      // alert("seat selection is necessary");
      return;
    } else if (Object.keys(selected_stopseats).length > 0) {
      Object.keys(selected_stopseats).map((seat) => {
        if (selected_stopseats[seat].length < totaltravellers) {
          setSnackbar(true);
          setSnackmessage(`${seat} select seats in the stop`);
          // alert(`${seat} select seats in the stop`);
          return;
        }
      });
    }
    let passengers = [];
    // ticket api calling
    for (
      let resultindex = 0;
      resultindex < selected_flight.length;
      resultindex++
    ) {
      for (let i = 0; i < adult_state.length; i++) {
        let adult = await passenger(adult_state[i], i, resultindex);
        passengers.push(adult);
      }
      for (let i = 0; i < child_state.length; i++) {
        let child = await passenger(child_state[i], i, resultindex);
        passengers.push(child);
      }
      for (let i = 0; i < infant_state.length; i++) {
        let infant = await passenger(infant_state[i], i, resultindex);
        passengers.push(infant);
      }
      const {
        BaseFare: basefare,
        Tax: tax,
        YQTax: yqtax,
        AdditionalTxnFeeOfrd: addtxnfeeofrd,
        AdditionalTxnFeePub: addtxnfeepub,
        OtherCharges: othercharges,
      } = selected_flight[resultindex]?.Fare;
      // changing the fare
      // let passegers_arr = await passengers.map((passenger) => ({
      //   ...passenger,
      //   Fare: {
      //     BaseFare: basefare,
      //     Tax: tax,
      //     YQTax: yqtax,
      //     AdditionalTxnFeeOfrd: addtxnfeeofrd,
      //     AdditionalTxnFeePub: addtxnfeepub,
      //     OtherCharges: othercharges,
      //   },
      // }));
      let ticket_obj = {
        PreferredCurrency: null,
        ResultIndex: selected_flight[resultindex].ResultIndex,
        AgentReferenceNo: "sonam1234567890",
        Passengers: passengers, //passegers_arr
        TraceId: traceid,
      };
      setTicket((prev) => ({ ...prev, ticket_obj }));
      console.log(ticket_obj, "ticket obj");
      if (selected_flight[resultindex].IsLCC) {
        // alert("ticket api hitting")
        // const res = await axios.post(
        //   `${envdata.baseurl}/ticket`,
        //   ticket_obj
        // );
        // console.log(res.data);
        if (1) {
          //res.data.status
          // await dispatch(bookingdetailsaction.getbookingdetails(res.data.data.FlightItinerary))
          if (resultindex === selected_flight.length - 1) {
            setSnackbar(true);
            setSnackmessage("Ticket booked successfully");
            // alert("Ticket booked successfully");
            navigate("/Flights");
            // setBooking(true)
          }
        } else {
          // alert(res.data.message)
        }
        passengers = [];
      } else {
        setSnackbar(true);
        setSnackmessage(
          "Non_lcc case ticket and booking are on hold from thirdparty side"
        );
        return;
      }
    }
    // console.log()
    // const booking_res=await axios.post(`${envdata.baseurl}/getBookingDetails`,booking_detailobj)
    // console.log(booking_res.data.data.FlightItinerary)
    // if(booking_res.data.status){
    //  await dispatch(bookingdetailsaction.getbookingdetails(booking_res.data.data.FlightItinerary))
    //   setBooking(true)
    // }
  };
  // handlessrdata
  const [ticket, setTicket] = useState({});
  const handlessrdata = async () => {
    // console.log(adult_state, "state of adult");
    console.log(typeof value, "value");

    if (
      value === "1" &&
      meal_dynamic.length === 0 &&
      baggage_dynamic.length === 0
    ) {
      let seattab;
      if (seats_tab === trips_segmentstab.length - 1) {
        await ticket_request();
      } else {
        // alert(trips_segmentstab.length)
        seattab = seats_tab + 1;
        setSeats_tab(seattab);
      }
    } else if (value === "2" && baggage_dynamic.length === 0) {
      let mealtab;
      if (meals_tab === meal_dynamic.length - 1) {
        await ticket_request();
      } else {
        mealtab = meals_tab + 1;
        setMeals_tab(mealtab);
      }
    } else if (value === "3") {
      let bagtab;
      if (baggage_tab === baggage_dynamic.length - 1) {
        await ticket_request();
      } else {
        bagtab = baggage_tab + 1;
        setBaggage_tab(bagtab);
      }
    } else if (value === "2") {
      let mealtab;
      if (meals_tab === meal_dynamic.length - 1) {
        setValue("3");
      } else {
        mealtab = meals_tab + 1;
        setMeals_tab(mealtab);
      }
    } else if (value === "1") {
      let seattab;
      if (seats_tab === trips_segmentstab.length - 1) {
        setValue("2");
      } else {
        seattab = seats_tab + 1;
        setSeats_tab(seattab);
      }
    }
  };
  // travellers dialog opening
  const Travellersdialogopen = async (index, type) => {
    setTraveller_index({ indx: index, type: type });
    const userid = localStorage.getItem("userid");
    if (userid != null) {
      const res = await Apipost("/allTravellers", { user_id: userid });
      // console.log(res.status);
      if (res.status) {
        setTravellerdata(res.data);
        setViewtravellerdialog(true);
      }
    } else {
      setSnackbar(true);
      setSnackmessage("you need to login to your account");
      // alert("you need to login to your account");
    }
  };
  // country selection
  function handlecountryselected(value) {
    console.log(value);
    setSelectedcountry(value);
  }
  // 0=>infant
  // 1=>child
  // 2=>adult
  const handleGender = (type, index) => (event, gender) => {
    // infant gender updation
    if (type === 0) {
      let infant_gender = [...infant_state];
      infant_gender[index].gender = gender;
      setInfant_state(infant_gender);
    }
    // child gender updation
    else if (type === 1) {
      let child_gender = [...child_state];
      child_gender[index].gender = gender;
      setChild_state(child_gender);
    }
    // adult gender updation
    else if (type === 2) {
      let adult_gender = [...adult_state];
      adult_gender[index].gender = gender;
      setAdult_state(adult_gender);
    }
    // setGender(gender);
  };
  const titlechange = (type, index) => (event, title) => {
    if (title === null) {
      return;
    } else {
      // infant title updation
      if (type === 0) {
        let infant_title = [...infant_state];
        infant_title[index].title = title;
        setInfant_state(infant_title);
      }
      // child title updation
      else if (type === 1) {
        let child_title = [...child_state];
        child_title[index].title = title;
        setChild_state(child_title);
      }
      // adult title updation
      else if (type === 2) {
        let adult_title = [...adult_state];
        adult_title[index].title = title;
        setAdult_state(adult_title);
      }
    }
  };
  // tabs state and function
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    // alert(newValue)
    setValue(newValue);
  };
  // seat flight tabs
  const handle_seattab = (event, seattab) => {
    // alert(seattab)
    setSeats_tab(seattab);
  };
  const handle_mealtab = (event, mealtab) => {
    setMeals_tab(mealtab);
  };
  const handle_baggagetab = (event, bagtab) => {
    setBaggage_tab(bagtab);
  };
  const classes = useStyles();
  // conditonally rendering component states
  // ssr api  calling
  const flightseating = async () => {
    //adult details validation
    for (let adult = 0; adult < adult_state.length; adult++) {
      let age;
      if (adult_state[adult].dob != "") {
        age = await helperFunctions.findage(adult_state[adult].dob);
      }
      // first_name validation
      if (adult_state[adult].first_name === "") {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            f_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("first_name should not be empty");

        return;
      } 
      else if(regex_data.string_pattern.test(adult_state[adult].first_name)){
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            f_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("first_name must be a string");

        return;
      }
      else {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            f_name_err: false,
          };
          return newdata;
        });
      }
      // Last_name validation
      if (adult_state[adult].last_name === "") {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            l_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("last_name should not be empty");
        return;
      }
      
      else if(regex_data.string_pattern.test(adult_state[adult].last_name.trim())){
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            l_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("last_name must be a string");
        return;
      }
      else {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            l_name_err: false,
          };
          return newdata;
        });
      }
      // firstname and lastname should be distict
      if (adult_state[adult].first_name === adult_state[adult].lastname) {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            l_name_err: true,
            f_name_err: true
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("Firstname and lastname should be distinct");
        return;
      }
      else {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            l_name_err: false,
            f_name_err: false
          };
          return newdata;
        });
      }
      // Date_of_birth validation
      if (adult_state[adult].dob === "") {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            dob_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });

        setSnackbar(true);
        setSnackmessage("dob should not be empty");
        return;
      }
      else if (age <= 12) {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            dob_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("Adult age should be grater than 12");
        return;
      } else {
        setAdult_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[adult] = {
            ...newdata[adult],
            dob_err: false,
          };
          return newdata;
        });
      }
      // validating only ispassportRequiredAtTicket
      if (
        selected_flight[0].IsPassportRequiredAtTicket ||
        selected_flight[0].IsPassportRequiredAtBook
      ) {
        if (adult_state[adult].passport_num === "") {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[adult] = {
              ...newdata[adult],
              p_num_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });
          setSnackbar(true);
          setSnackmessage("passport number is madatory");
          return;
        }
        else if (adult_state[adult].passport_num !== "") {
          if (!regex_data.passport_Regex.test(adult_state[adult].passport_num.trim())) {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[adult] = {
                ...newdata[adult],
                p_num_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });

            setSnackbar(true);
            setSnackmessage("passport number should be valid");
            return;
          }
          else {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[adult] = {
                ...newdata[adult],
                p_num_err: false,
              };
              return newdata;
            });
          }
          if (adult_state[adult].passport_exp === "") {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[adult] = {
                ...newdata[adult],
                p_exp_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });
            setSnackbar(true);
            setSnackmessage("passport expiry date is mandatory");
            return;
          } else {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[adult] = {
                ...newdata[adult],
                p_exp_err: false,
              };
              return newdata;
            });
          }
          if (adult_state[adult].passport_issue === "") {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[adult] = {
                ...newdata[adult],
                passport_issue_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });
            setSnackbar(true);
            setSnackmessage("passport issue date is mandatory");
            return;
          } else {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[adult] = {
                ...newdata[adult],
                passport_issue_err: false,
              };
              return newdata;
            });
          }
          if (adult_state[adult].passport_issue_country === "") {
            // passport_issue_country
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[adult] = {
                ...newdata[adult],
                passport_issue_country_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });

            setSnackbar(true);
            setSnackmessage("Passport issue country should not be empty");
            return;
          } else {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[adult] = {
                ...newdata[adult],
                passport_issue_country_err: false,
              };
              return newdata;
            });
          }
        }
      }
      // pancard validaiton
      if (
        selected_flight[0].IsPanRequiredAtTicket ||
        selected_flight[0].IsPanRequiredAtBook) {
        if (adult_state[adult].pan_no === "") {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[adult] = {
              ...newdata[adult],
              pan_no_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          setSnackbar(true);
          setSnackmessage("Pan number is mandatory");
          return;
        }
        else if (!regex_data.pan_Regex.test(adult_state[adult].pan_no)) {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[adult] = {
              ...newdata[adult],
              pan_no_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          setSnackbar(true);
          setSnackmessage("Pan number is mandatory");
          return;
        }
        else {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[adult] = {
              ...newdata[adult],
              pan_no_err: false,
            };
            return newdata;
          });
        }
      }
    }
    // child validation
    for (let child = 0; child < child_state.length; child++) {
      let age;
      if (child_state[child].dob != "") {
        age = await helperFunctions.findage(child_state[child].dob);
      }
      // first_name validation
      if (child_state[child].first_name === "") {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            f_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });

        setSnackbar(true);
        setSnackmessage("first_name should not be empty");
        return;
      } 
      else if(regex_data.string_pattern.test(child_state[child].first_name.trim())){
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            f_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("first_name must be a string");
        return;
      }
      else {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            f_name_err: false,
          };
          return newdata;
        });
      }
      // last_name validation
      if (child_state[child].last_name === "") {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            l_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("last_name should not be empty");
        return;
      } 
      else if(regex_data.string_pattern.test(child_state[child].last_name.trim())){
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            l_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("last_name must be a string");
        return;

      }
      else {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            l_name_err: false,
          };
          return newdata;
        });
      }
      // first_name and last_name distict
      if (child_state[child].first_name === child_state[child].last_name) {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            l_name_err: true,
            f_name_err: true
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("First_name and last_name should be distict");
        return;
      }
      else {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            l_name_err: false,
            f_name_err: false
          };
          return newdata;
        });
      }
      // Date_of_birth validation
      if (child_state[child].dob === "") {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            dob_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("dob should not be empty");
        return;
      } else if (age <= 2 || age > 12) {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            dob_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("child age should be in between 2 to 12");
        return;
      } else {
        setChild_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[child] = {
            ...newdata[child],
            dob_err: false,
          };
          return newdata;
        });
      }
      // passport validation
      if (
        selected_flight[0].IsPassportRequiredAtTicket ||
        selected_flight[0].IsPassportRequiredAtBook
      ) {
        if (child_state[child].passport_num === "") {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[child] = {
              ...newdata[child],
              p_num_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });
          setSnackbar(true);
          setSnackmessage("passport number is madatory");
          return;
        } else if (child_state[child].passport_num !== "") {
          if (!regex_data.passport_Regex.test(child_state[child].passport_num.trim())) {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[child] = {
                ...newdata[child],
                p_num_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });
            setSnackbar(true);
            setSnackmessage("passport number should be valid");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[child] = {
                ...newdata[child],
                p_num_err: false,
              };
              return newdata;
            });
          }
          if (child_state[child].passport_exp === "") {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[child] = {
                ...newdata[child],
                p_exp_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });
            setSnackbar(true);
            setSnackmessage("passport expiry date is mandatory");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[child] = {
                ...newdata[child],
                p_exp_err: false,
              };
              return newdata;
            });
          }
          if (child_state[child].passport_issue_country === "") {
            // passport_issue_country
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[child] = {
                ...newdata[child],
                passport_issue_country_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });

            setSnackbar(true);
            setSnackmessage("Passport issue country should not be empty");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[child] = {
                ...newdata[child],
                passport_issue_country_err: false,
              };
              return newdata;
            });
          }
          if (child_state[child].passport_issue === "") {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[child] = {
                ...newdata[child],
                passport_issue_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });
            setSnackbar(true);
            setSnackmessage("passport issue date is mandatory");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[child] = {
                ...newdata[child],
                passport_issue_err: false,
              };
              return newdata;
            });
          }
        }
      }
      // pancard validation
      if (
        selected_flight[0].IsPanRequiredAtTicket ||
        selected_flight[0].IsPanRequiredAtBook
      ) {
        if (child_state[child].pan_no === "") {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[child] = {
              ...newdata[child],
              pan_no_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          setSnackbar(true);
          setSnackmessage("Pan number is mandatory");
          return;
        } else if (!regex_data.pan_Regex.test(child_state[child].pan_no)) {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[child] = {
              ...newdata[child],
              pan_no_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          setSnackbar(true);
          setSnackmessage("Pan number is mandatory");
          return;
        } else {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[child] = {
              ...newdata[child],
              pan_no_err: false,
            };
            return newdata;
          });
        }
      }
    }
    // infant validation
    for (let infant = 0; infant < infant_state.length; infant++) {
      let age;
      if (infant_state[infant].dob != "") {
        age = await helperFunctions.findage(infant_state[infant].dob);
      }
      // first_name validation
      if (infant_state[infant].first_name === "") {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            f_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });

        setSnackbar(true);
        setSnackmessage("first_name should not be empty");
        return;
      } 
      else if(regex_data.string_pattern.test(infant_state[infant].first_name.trim())){
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            f_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("first_name must be a string");
        return;
      }
      else {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            f_name_err: false,
          };
          return newdata;
        });
      }
      // last_name validation
      if (infant_state[infant].last_name === "") {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            l_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("last_name should not be empty");
        return;
      } 
      else if(regex_data.string_pattern.test(infant_state[infant].last_name.trim())){
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            l_name_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("last_name must be a string");
        return;
      }
      else {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            l_name_err: false,
          };
          return newdata;
        });
      }
      // first_name and last_name should be distict
      if (infant_state[infant].first_name.trim() === infant_state[infant].last_name.trim()) {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            l_name_err: true,
            f_name_err: true
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("first_name and last_name shold be distict");
        return;
      } else {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            l_name_err: false,
            f_name_err: false
          };
          return newdata;
        });
      }
      // Date of birth validation
      if (infant_state[infant].dob === "") {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            dob_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("dob should not be empty");
        return;
      } else if (age >= 2) {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            dob_err: true,
          };
          return newdata;
        });
        textFieldRef.current.scrollIntoView({ behavior: "smooth" });
        setSnackbar(true);
        setSnackmessage("infants age should be in between 0-2");
        return;
      } else {
        setInfant_state((prevdata) => {
          const newdata = [...prevdata];
          newdata[infant] = {
            ...newdata[infant],
            dob_err: false,
          };
          return newdata;
        });
      }
      // Passport validation
      if (
        selected_flight[0].IsPassportRequiredAtTicket ||
        selected_flight[0].IsPassportRequiredAtBook
      ) {
        if (infant_state[infant].passport_num === "") {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[infant] = {
              ...newdata[infant],
              p_num_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });
          setSnackbar(true);
          setSnackmessage("passport number is madatory");
          return;
        } else if (infant_state[infant].passport_num !== "") {
          if (!regex_data.passport_Regex.test(infant_state[infant].passport_num.trim())) {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[infant] = {
                ...newdata[infant],
                p_num_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });
            setSnackbar(true);
            setSnackmessage("passport number should be valid");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[infant] = {
                ...newdata[infant],
                p_num_err: false,
              };
              return newdata;
            });
          }
          if (infant_state[infant].passport_exp === "") {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[infant] = {
                ...newdata[infant],
                p_exp_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });
            setSnackbar(true);
            setSnackmessage("passport expiry date is mandatory");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[infant] = {
                ...newdata[infant],
                p_exp_err: false,
              };
              return newdata;
            });
          }
          if (infant_state[infant].passport_issue_country === "") {
            // passport_issue_country
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[infant] = {
                ...newdata[infant],
                passport_issue_country_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });

            setSnackbar(true);
            setSnackmessage("Passport issue country should not be empty");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[infant] = {
                ...newdata[infant],
                passport_issue_country_err: false,
              };
              return newdata;
            });
          }
          if (infant_state[infant].passport_issue === "") {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[infant] = {
                ...newdata[infant],
                passport_issue_err: true,
              };
              return newdata;
            });
            textFieldRef.current.scrollIntoView({ behavior: "smooth" });
            setSnackbar(true);
            setSnackmessage("passport issue date is mandatory");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[infant] = {
                ...newdata[infant],
                passport_issue_err: false,
              };
              return newdata;
            });
          }
        }
      }
      // pancard validation
      if (
        selected_flight[0].IsPanRequiredAtTicket ||
        selected_flight[0].IsPanRequiredAtBook
      ) {
        if (infant_state[infant].pan_no === "") {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[infant] = {
              ...newdata[infant],
              pan_no_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          setSnackbar(true);
          setSnackmessage("Pan number is mandatory");
          return;
        } else if (!regex_data.pan_Regex.test(infant_state[infant].pan_no)) {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[infant] = {
              ...newdata[infant],
              pan_no_err: true,
            };
            return newdata;
          });
          textFieldRef.current.scrollIntoView({ behavior: "smooth" });

          setSnackbar(true);
          setSnackmessage("Pan number is mandatory");
          return;
        } else {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[infant] = {
              ...newdata[infant],
              pan_no_err: false,
            };
            return newdata;
          });
        }
      }
    }
    // ticket receivers info mail validation
    if (ticket_receiver_info.email === "") {
      setTicket_receiver_info((prev) => ({ ...prev, email_err: true }));
      ticker_receivers_ref.current.scrollIntoView();
      setSnackbar(true);
      setSnackmessage("ticket_receivers mail shouln't be empty");
      return;
    } else if (!regex_data.email_Regex.test(ticket_receiver_info.email.trim())) {
      setTicket_receiver_info((prev) => ({ ...prev, email_err: true }));
      ticker_receivers_ref.current.scrollIntoView();
      setSnackbar(true);
      setSnackmessage("ticket_receivers mail should be valid");
      return;
    } else {
      setTicket_receiver_info((prev) => ({ ...prev, email_err: false }));
    }
    // ticket receivers info mobile number validaiton
    if (ticket_receiver_info.mobile === "") {
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: true }));
      ticker_receivers_ref.current.scrollIntoView();
      setSnackbar(true);
      setSnackmessage("ticket_receivers mobile shouln't be empty");
      return;
    } else if (
      !regex_data.mobile_regex.test(ticket_receiver_info.mobile) &&
      ticket_receiver_info.mobile.length > 6
    ) {
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: true }));
      ticker_receivers_ref.current.scrollIntoView();
      setSnackbar(true);
      setSnackmessage("ticket_receivers mobile shouln be valid");
      return;
    } else {
      setTicket_receiver_info((prev) => ({ ...prev, mobile_err: false }));
    }
    for (let i = 0; i < resultindex.length; i++) {
      setLoadingmodal(true);
      const res = await axios.post(`${envdata.baseurl}/SSR`, {
        TraceId: traceid,
        ResultIndex: resultindex[i],
      });
      if (res.data.status) {
        let ssr = res.data.data;
        if (res.data.data?.SeatDynamic != undefined) {
          if (i === 0) {
            let stopslen = ssr.SeatDynamic[0].SegmentSeat.length;
            setR_trip_stops(stopslen);
            // console.log(ssr.SeatDynamic[0].SegmentSeat.length,"seats")
          }
          setSeat_dynamic((prev) => [...prev, ...ssr.SeatDynamic]);
        }
        if (res.data.data?.MealDynamic != undefined) {
          // console.log(ssr.MealDynamic)
          if (i === 0) {
            setR_trip_meal(ssr.MealDynamic.length);
          }
          setMeal_dynamic((prev) => [...prev, ...ssr.MealDynamic]);
        }
        if (res.data.data?.Baggage != undefined) {
          // console.log(ssr.Baggage)
          if (i === 0) {
            setR_trip_bag(ssr.Baggage.length);
          }
          setBaggage_dynamic((prev) => [...prev, ...ssr.Baggage]);
        }
        // console.log(selected_flight)
        if (selected_flight[0].IsLCC === true) {
          setLoadingmodal(false);
          setFlightmealspage(false);
        } else if (selected_flight[0].IsLCC === false) {
          setLoadingmodal(false);
          setFlightmealspage(false);
          // setSnackbar(true);
          // setSnackmessage("for nonlcc case seat and meals api are on hold");
        }
      } else {
        if (res.data.data.hasOwnProperty("ErrorCode")) {
          if (res.data.data?.ErrorCode === 5) {
            navigate("/flights");
          }
        }
        setLoadingmodal(false);
        setSnackbar(true);
        setSnackmessage(res.data.data.message);
      }
    }
  };

  // date conversion
  const get_date = (dep_date) => {
    const date = new Date(dep_date);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  // handle travellers onchange event
  const handletravellersinput = (e, index, type) => {
    const { name, value } = e.target;
    if (type === 2) {
      setAdult_state((prevdata) => {
        const newdata = [...prevdata];
        newdata[index] = {
          ...newdata[index],
          [name]: value,
        };
        return newdata;
      });
    } else if (type === 1) {
      setChild_state((prevdata) => {
        const newdata = [...prevdata];
        newdata[index] = {
          ...newdata[index],
          [name]: value,
        };
        return newdata;
      });
    } else if (type === 0) {
      setInfant_state((prevdata) => {
        const newdata = [...prevdata];
        newdata[index] = {
          ...newdata[index],
          [name]: value,
        };
        return newdata;
      });
    }
    console.log(adult_state);
    console.log(child_state);
    console.log(infant_state);
  };
  // travelers call back setting in inputs
  const traveller_cal = (data) => {
    if (traveller_index.type === 2) {
      setAdult_state((prevdata) => {
        const newdata = [...prevdata];
        newdata[traveller_index.indx] = {
          ...newdata[traveller_index.indx],
          traveller_id: data.traveller_id,
          first_name: data.first_name,
          last_name: data.last_name,
          gender: parseInt(data.gender),
          dob: new Date(data.dob.split("/").reverse().join("/")),
          passport_num: data.passport,
          passport_exp:
            data.passport_expiry === ""
              ? ""
              : new Date(data.passport_expiry.split("/").reverse().join("/")),
          passport_issue:
            data.passport_issue_date === ""
              ? ""
              : new Date(
                data.passport_issue_date.split("/").reverse().join("/")
              ),
          pan_no: data.pan_card,
          passport_issue_country: data.passport_issue_country,
          title: parseInt(data.title),
        };
        return newdata;
      });
    } else if (traveller_index.type === 1) {
      setChild_state((prevdata) => {
        const newdata = [...prevdata];
        newdata[traveller_index.indx] = {
          ...newdata[traveller_index.indx],
          traveller_id: data.traveller_id,
          first_name: data.first_name,
          last_name: data.last_name,
          gender: parseInt(data.gender),
          dob: new Date(data.dob.split("/").reverse().join("/")),
          passport_num: data.passport,
          passport_exp:
            data.passport_expiry === ""
              ? ""
              : new Date(data.passport_expiry.split("/").reverse().join("/")),
          passport_issue:
            data.passport_issue_date === ""
              ? ""
              : new Date(
                data.passport_issue_date.split("/").reverse().join("/")
              ),
          pan_no: data.pan_card,
          passport_issue_country: data.passport_issue_country,
          title: parseInt(data.title),
        };
        return newdata;
      });
    } else if (traveller_index.type === 0) {
      setInfant_state((prevdata) => {
        const newdata = [...prevdata];
        newdata[traveller_index.indx] = {
          ...newdata[traveller_index.indx],
          traveller_id: data.traveller_id,
          first_name: data.first_name,
          last_name: data.last_name,
          gender: parseInt(data.gender),
          dob: new Date(data.dob.split("/").reverse().join("/")),
          passport_num: data.passport,
          passport_exp:
            data.passport_expiry === ""
              ? ""
              : new Date(data.passport_expiry.split("/").reverse().join("/")),
          passport_issue:
            data.passport_issue_date === ""
              ? ""
              : new Date(
                data.passport_issue_date.split("/").reverse().join("/")
              ),
          pan_no: data.pan_card,
          passport_issue_country: data.passport_issue_country,
          title: parseInt(data.title),
        };
        return newdata;
      });
    }
  };
  // save details of the travellers
  const savedetails = async (index, type) => {
    if (localStorage.getItem("userid") === null) {
      setSnackbar(true);
      setSnackmessage("To save the details you have to logged in.");
      return;
    } else {
      let save_details;
      if (type === 2) {
        let age;
        if (adult_state[index].dob != "") {
          age = await helperFunctions.findage(adult_state[index].dob);
        }
        if (adult_state[index].first_name === "") {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("first_name should not be empty");
          return;
        }
        else if (!regex_data.string_pattern.test(adult_state[index].first_name.trim())) {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("first_name must be a string");
          return;
        }
        else {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: false,
            };
            return newdata;
          });
        }
        if (adult_state[index].last_name === "") {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("last_name should not be empty");
          return;
        }
        else if (!regex_data.string_pattern.test(adult_state[index].last_name.trim())) {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("last_name must be a string");
          return;
        }
        else {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: false,
            };
            return newdata;
          });
        }
        if (adult_state[index].dob === "") {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("dob should not be empty");
          return;
        } else if (age <= 12) {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("Adult age should be grater than 12");
          return;
        } else {
          setAdult_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: false,
            };
            return newdata;
          });
        }
        if (adult_state[index].passport_num !== "") {
          if (!regex_data.passport_Regex.test(adult_state[index].passport_num.trim())) {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_num_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport number should be valid");
            return;
          } else {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_num_err: false,
              };
              return newdata;
            });
          }
          if (adult_state[index].passport_exp === "") {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_exp_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport expiry date is mandatory");
            return;
          } else {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_exp_err: false,
              };
              return newdata;
            });
          }
          if (adult_state[index].passport_issue === "") {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport issue date is mandatory");
            return;
          } else {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_err: false,
              };
              return newdata;
            });
          }
          // if (adult_state[index].passport_issue_country === "") {
          //   setAdult_state((prevdata) => {
          //     const newdata = [...prevdata];
          //     newdata[index] = {
          //       ...newdata[index],
          //       passport_issue_country_err: true,
          //     };
          //     return newdata;
          //   });

          //   setSnackbar(true);
          //   setSnackmessage("Passport issue country should not be empty");
          //   return;
          // } else {
          //   setAdult_state((prevdata) => {
          //     const newdata = [...prevdata];
          //     newdata[index] = {
          //       ...newdata[index],
          //       passport_issue_country_err: false,
          //     };
          //     return newdata;
          //   });
          // }
        }
        if (adult_state[index].pan_no !== "") {
          if (!regex_data.pan_Regex.test(adult_state[index].pan_no)) {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                pan_no_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("Pan number is mandatory");
            return;
          } else {
            setAdult_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                pan_no_err: false,
              };
              return newdata;
            });
          }
        }
        save_details = adult_state[index];
      }

      else if (type === 1) {
        let age;
        if (child_state[index].dob != "") {
          age = await helperFunctions.findage(child_state[index].dob);
        }
        // alert(age)
        if (child_state[index].first_name === "") {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("first_name should not be empty");
          return;
        }
        else if (!regex_data.string_pattern.test(child_state[index].first_name.trim())) {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("first_name must be a string");
          return;
        }
        else {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: false,
            };
            return newdata;
          });
        }
        if (child_state[index].last_name === "") {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("last_name should not be empty");
          return;
        }
        else if (!regex_data.string_pattern.test(child_state[index].last_name.trim())) {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("last_name must be a string");
          return;
        }
        else {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: false,
            };
            return newdata;
          });
        }
        if (child_state[index].dob === "") {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("dob should not be empty");
          return;
        } else if (age <= 2 || age > 12) {
          // 2>=age<=12
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("child age should be in between 2 to 12");
          return;
        } else {
          setChild_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: false,
            };
            return newdata;
          });
        }

        if (child_state[index].passport_num !== "") {
          if (!regex_data.passport_Regex.test(child_state[index].passport_num.trim())) {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_num_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport number should be valid");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_num_err: false,
              };
              return newdata;
            });
          }
          if (child_state[index].passport_exp === "") {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_exp_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport expiry date is mandatory");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_exp_err: false,
              };
              return newdata;
            });
          }

          if (child_state[index].passport_issue === "") {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport issue date is mandatory");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_err: false,
              };
              return newdata;
            });
          }
          if (child_state[index].passport_issue_country === "") {
            // passport_issue_country
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_country_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("Passport issue country should not be empty");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_country_err: false,
              };
              return newdata;
            });
          }
        }

        if (child_state[index].pan_no !== "") {
          if (!regex_data.pan_Regex.test(child_state[index].pan_no)) {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                pan_no_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("Pan number is mandatory");
            return;
          } else {
            setChild_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                pan_no_err: false,
              };
              return newdata;
            });
          }
        }

        save_details = child_state[index];
      }
      else {
        let age;
        if (infant_state[index].dob != "") {
          age = await helperFunctions.findage(infant_state[index].dob);
        }
        if (infant_state[index].first_name === "") {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("first_name should not be empty");
          return;
        }
        else if (!regex_data.string_pattern.test(infant_state[index].first_name.trim())) {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("first_name must be a string");
          return;
        }
        else {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              f_name_err: false,
            };
            return newdata;
          });
        }
        if (infant_state[index].last_name === "") {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("last_name should not be empty");
          return;
        }
        else if (!regex_data.string_pattern.test(infant_state[index].last_name.trim())) {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("last_name must be a string");
          return;
        }
        else {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              l_name_err: false,
            };
            return newdata;
          });
        }
        if (infant_state[index].dob === "") {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("dob should not be empty");
          return;
        } else if (age >= 2) {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: true,
            };
            return newdata;
          });
          setSnackbar(true);
          setSnackmessage("infants age should be in between 0-2");
          return;
        } else {
          setInfant_state((prevdata) => {
            const newdata = [...prevdata];
            newdata[index] = {
              ...newdata[index],
              dob_err: false,
            };
            return newdata;
          });
        }

        if (infant_state[index].passport_num !== "") {
          if (!regex_data.passport_Regex.test(infant_state[index].passport_num.trim())) {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_num_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport number should be valid");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_num_err: false,
              };
              return newdata;
            });
          }
          if (infant_state[index].passport_exp === "") {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_exp_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport expiry date is mandatory");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                p_exp_err: false,
              };
              return newdata;
            });
          }

          if (infant_state[index].passport_issue === "") {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("passport issue date is mandatory");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_err: false,
              };
              return newdata;
            });
          }
          if (infant_state[index].passport_issue_country === "") {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_country_err: true,
              };
              return newdata;
            });
            setSnackbar(true);
            setSnackmessage("Passport issue country should not be empty");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                passport_issue_country_err: false,
              };
              return newdata;
            });
          }
        }

        if (infant_state[index].pan_no !== "") {
          if (!regex_data.pan_Regex.test(infant_state[index].pan_no)) {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                pan_no_err: true,
              };
              return newdata;
            });

            setSnackbar(true);
            setSnackmessage("Pan number is mandatory");
            return;
          } else {
            setInfant_state((prevdata) => {
              const newdata = [...prevdata];
              newdata[index] = {
                ...newdata[index],
                pan_no_err: false,
              };
              return newdata;
            });
          }
        }

        save_details = infant_state[index];
      }
      const travellerobj = new FormData();
      travellerobj.append("user_id", localStorage.getItem("userid"));
      travellerobj.append("first_name", save_details.first_name);
      travellerobj.append("last_name", save_details.last_name);
      travellerobj.append("gender", save_details.gender);
      travellerobj.append("dob", helperFunctions.getapi_date(save_details.dob));
      travellerobj.append("passport", save_details.passport_num);
      travellerobj.append(
        "passport_expiry",
        helperFunctions.getapi_date(save_details.passport_exp)
      );
      travellerobj.append(
        "passport_issue_date",
        helperFunctions.getapi_date(save_details.passport_issue)
      );
      travellerobj.append(
        "passport_issue_country",
        save_details.passport_issue_country
      );
      travellerobj.append("title", save_details.title);
      travellerobj.append("pan_card", save_details.pan_no);
      travellerobj.append("cover_pic", "");
      if (save_details.traveller_id === "") {
        const response = await Apipost("/addTraveller", travellerobj);
        if (response.status) {
          setSnackbar(true);
          setSnackmessage(response.message);
        } else {
          setSnackbar(true);
          setSnackmessage(response.message);
        }
      } else {
        travellerobj.append("traveller_id", save_details.traveller_id);
        const response = await Apipost("/updateTraveller", travellerobj);
        if (response.status) {
          setSnackbar(true);
          setSnackmessage(response.message);
        } else {
          setSnackbar(true);
          setSnackmessage(response.message);
        }
      }
    }
  };
  let trips_segmentstab = [];
  trips_segmentstab = seat_dynamic.flatMap((trip) =>
    trip.SegmentSeat.flatMap((stopsobj) => stopsobj)
  );
  // updating the total bags selected count
  useEffect(() => {
    let totalbags;
    if (Object.keys(selectedBaggage).length > 0) {
      totalbags = Object.keys(selectedBaggage[bag_city_key]).reduce(
        (bag, key) => {
          return bag + selectedBaggage[bag_city_key][key].length;
        },
        0
      );
      const totalprice = Object.entries(selectedBaggage[bag_city_key]).reduce(
        (total, [key, value]) => {
          if (value.length > 0) {
            const price = value.length * value[0].Price;
            return total + price;
          } else {
            return 0;
          }
        },
        0
      );
      setTotal_baggage_price(totalprice);
      setTotal_bags_selected((prev) => ({
        ...prev,
        [bag_city_key]: totalbags,
      }));
    }
  }, [selectedBaggage]);
  const baseValue = 0;
  const updated = 2;
  // addition of baggage
  const baggageadding = async (baggage) => {
    let city_key = `${baggage?.Origin}_${baggage?.Destination}`;
    let key = `${baggage.Weight}kg`;
    let totalbags;
    setBag_city_key(city_key);
    setBag_key(key);
    if (selectedBaggage.hasOwnProperty(city_key)) {
      if (selectedBaggage[city_key].hasOwnProperty(key)) {
        totalbags = await Object.keys(selectedBaggage[city_key]).reduce(
          (bag, key) => {
            return bag + selectedBaggage[city_key][key].length;
          },
          0
        );
        if (totalbags < totaltravellers) {
          await selectedBaggage[city_key][key].push(baggage);
        } else {
          setSnackbar(true);
          setSnackmessage(
            "Sorry you are not able to select bags more than the travelers count"
          );
          return;
        }
      } else {
        totalbags = await Object.keys(selectedBaggage[city_key]).reduce(
          (bag, key) => {
            return bag + selectedBaggage[city_key][key].length;
          },
          0
        );
        if (totalbags < totaltravellers) {
          selectedBaggage[city_key][key] = [baggage];
        } else {
          setSnackbar(true);
          setSnackmessage(
            "Sorry you are not able to select bags more than the travelers count"
          );
          return;
        }
      }
      setSelectedBaggage({ ...selectedBaggage });
    } else {
      setSelectedBaggage((prev) => ({
        ...prev,
        [city_key]: { [key]: [baggage] },
      }));
    }
    // if (totalbags < totaltravellers) {
    //   await setSelectedBaggage((prev) => {
    //     if (prev.hasOwnProperty(key)) {
    //       return {
    //         ...prev,
    //         [key]: [...prev[key], baggage],
    //       };
    //     } else {
    //       return {
    //         ...prev,
    //         [key]: [baggage],
    //       };
    //     }
    //   });
    // } else {
    //   setSnackbar(true);
    //   setSnackmessage(
    //     "Sorry you are not able to select baggage more than the travelers count"
    //   );
    // }
  };
  const baggageremoving = async (baggage) => {
    let city_key = `${baggage?.Origin}_${baggage?.Destination}`;
    let key = `${baggage.Weight}kg`;
    if (selectedBaggage.hasOwnProperty(city_key)) {
      if (selectedBaggage[city_key].hasOwnProperty(key)) {
        selectedBaggage[city_key][key].pop();
      } else {
        return;
      }
      setSelectedBaggage({ ...selectedBaggage });
    }
    // let key = `${baggage.Weight}kg`;
    // if (selectedBaggage.hasOwnProperty(key)) {
    //   setSelectedBaggage((prev) => ({
    //     ...prev,
    //     [key]: prev[key].slice(0, -1),
    //   }));
    // }
  };

  useEffect(() => {
    let totalmeals;
    if (Object.keys(selectedMeals).length > 0) {
      totalmeals = Object.keys(selectedMeals[meal_city_key]).reduce(
        (meal, key) => {
          return meal + selectedMeals[meal_city_key][key].length;
        },
        0
      );
      const totalprice = Object.entries(selectedMeals[meal_city_key]).reduce(
        (total, [key, value]) => {
          if (value.length > 0) {
            const price = value.length * value[0].Price;
            return total + price;
          } else {
            return 0;
          }
        },
        0
      );
      setTotal_meal_price(totalprice);
      setTotal_meals_selected((prev) => ({
        ...prev,
        [meal_city_key]: totalmeals,
      }));
    }
  }, [selectedMeals]);
  const meals_addon = async (meal) => {
    let city_key = `${meal?.Origin}_${meal?.Destination}`;
    let key = meal.Code;
    setMeal_city_key(city_key);
    setMeal_key(key);
    let totalmeals;
    if (selectedMeals.hasOwnProperty(city_key)) {
      if (selectedMeals[city_key].hasOwnProperty(key)) {
        totalmeals = await Object.keys(selectedMeals[city_key]).reduce(
          (meal, key) => {
            return meal + selectedMeals[city_key][key].length;
          },
          0
        );
        if (totalmeals < totaltravellers) {
          await selectedMeals[city_key][key].push(meal);
        } else {
          setSnackbar(true);
          setSnackmessage(
            "Sorry you are not able to select meals more than the travelers count"
          );
          return;
        }
      } else {
        totalmeals = await Object.keys(selectedMeals[city_key]).reduce(
          (meal, key) => {
            return meal + selectedMeals[city_key][key].length;
          },
          0
        );
        if (totalmeals < totaltravellers) {
          selectedMeals[city_key][key] = [meal];
        } else {
          setSnackbar(true);
          setSnackmessage(
            "Sorry you are not able to select meals more than the travelers count"
          );
          return;
        }
      }
      setSelectedMeals({ ...selectedMeals });
    } else {
      setSelectedMeals((prev) => ({ ...prev, [city_key]: { [key]: [meal] } }));
    }
  };
  const meals_deselection = async (meal) => {
    let city_key = `${meal?.Origin}_${meal?.Destination}`;
    let key = meal.Code;
    if (selectedMeals.hasOwnProperty(city_key)) {
      if (selectedMeals[city_key].hasOwnProperty(key)) {
        selectedMeals[city_key][key].pop();
      } else {
        return;
      }
      // setSelectedMeals((prev) => ({
      //   ...prev,
      //   [key]: prev[key].slice(0, -1),
      // }));
      setSelectedMeals({ ...selectedMeals });
    }
  };

  const exit_rowseats = [6, 8, 9, 12, 14, 15, 18, 20]; //There has some more exit row seats total of 18
  useEffect(() => {
    const seatprice = async () => {
      let seat = await selected_seats.reduce(
        (seat_sel, val) => seat_sel + val.Price,
        0
      );
      setSeats_price(seat);
    };
    seatprice();
  }, [selected_seats]);
  // seat_selection
  const seat_selection = async (selected_seat) => {
    // console.log(selected_seat,"seat")
    // console.log(selected_seats,"selected seat")
    let key = `${selected_seat?.Origin}_${selected_seat?.Destination}`;
    let seat_code = `${selected_seat?.Origin}_${selected_seat?.Destination}_${selected_seat.Code}`;

    let shifted_seat;
    if (selected_stopseats[key] === undefined) {
      setSelected_stopseats((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), selected_seat],
      }));
      setSelected_seats((prev) => [...prev, selected_seat]);
      setSelected_seat_codes((prev) => [...prev, seat_code]);
    } else {
      setSelected_stopseats((prev) => {
        const prevArray = prev[key] || [];
        const newarray = [...prevArray];
        if (newarray.length === totaltravellers) {
          // console.log(newarray.shift())
          shifted_seat = newarray.shift();
        }
        newarray.push(selected_seat);
        return {
          ...prev,
          [key]: newarray,
        };
      });
      setTimeout(() => {
        setSelected_seats((prev) => {
          if (selected_stopseats[key].length < totaltravellers) {
            return [...prev, selected_seat];
          } else if (selected_stopseats[key].length === totaltravellers) {
            const filteredarray = prev.filter(
              (seat) =>
                `${seat.Origin}_${seat.Destination}_${seat.Code}` !==
                `${shifted_seat.Origin}_${shifted_seat.Destination}_${shifted_seat.Code}`
            );
            return [...filteredarray, selected_seat];
          }
        });
        setSelected_seat_codes((prev) => {
          console.log(selected_stopseats[key]);
          if (selected_stopseats[key].length < totaltravellers) {
            return [...prev, seat_code];
          } else if (selected_stopseats[key].length === totaltravellers) {
            const filteredarray = prev.filter(
              (seatcode) =>
                seatcode !==
                `${shifted_seat.Origin}_${shifted_seat.Destination}_${shifted_seat.Code}`
            );
            return [...filteredarray, seat_code];
          }
        });
      }, 200);
    }

    console.log(selected_stopseats, "stop seats");
  };

  return (
    <>
      <MySnackbar
        open={snackbar}
        close={() => setSnackbar(false)}
        message={snackmessage}
      />
      <Countrycodefilter
        open={countrydialog}
        onclose={() => setCountrydialog(false)}
        selectedvalue={handlecountryselected}
      />
      <Loadingmodal
        open={loadingmodal}
        loadingclose={() => setLoadingmodal(false)}
      />
      <Tickettravellers
        open={viewtravellerdialog}
        close={() => setViewtravellerdialog(false)}
        travellers={travellerdata}
        traveller_data={traveller_cal}
      />
      <Bookingconfirmation open={booking} close={() => setBooking(false)} />
      {selected_flight.length > 0 && loading ? (
        <div className={ticketbook.mainbody}>
          <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
            <Grid
              container
              spacing={{ xs: 0, md: 2 }}
              sx={{ marginTop: "0.5rem !important" }}
            >
              <Grid item md={9} xs={12}>
                <h3 className={ticketbook.completebookings}>
                  Complete your Booking
                </h3>
                {selected_flight.map((flight, index) => {
                  const { Segments: innersegments = [] } = flight;
                  return innersegments.map((innersegment, index) => {
                    const origin = innersegment[0].Origin.Airport.CityName;
                    const destination =
                      innersegment.at(-1).Destination.Airport.CityName;
                    const dep_date = get_date(innersegment[0].Origin.DepTime);
                    const stops = innersegment.length - 1;
                    let duration =
                      innersegment.at(-1)?.AccumulatedDuration ??
                      innersegment[0]?.Duration;
                    const jrney_time = `${Math.floor(duration / 60)
                      .toString()
                      .padStart(2, "0")}h ${(duration % 60)
                        .toString()
                        .padStart(2, "0")}m`;
                    return (
                      <>
                        <Paper
                          sx={{
                            padding: {
                              xs: "0.5rem",
                              md: "1rem 2rem 0.5rem 1rem",
                            },
                            borderRadius: "1rem",
                            marginTop: "1rem",
                          }}
                          elevation={3}
                        >
                          <Grid container direction={"column"} spacing={1.5}>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item sm={10} xs={12} md={9}>
                                  <span
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {origin}-{destination}
                                  </span>
                                </Grid>
                                <Grid
                                  item
                                  md={3}
                                  sm={2}
                                  xs={2}
                                  textAlign={"right"}
                                  sx={{ display: { xs: "none", md: "block" } }}
                                >
                                  <Grid container>
                                    <Grid item md={11} sm={10} xs={2}>
                                      {" "}
                                      <span>{cabin_class}</span>
                                    </Grid>
                                    <Grid
                                      item
                                      mt={0.5}
                                      sm={2}
                                      md={1}
                                      xs={2}
                                      textAlign={"right"}
                                    >
                                      <img
                                        src={information}
                                        alt="economy fare information"
                                      />
                                    </Grid>
                                  </Grid>
                                  {/* <Stack direction={"row"} spacing={1.5} >
                                  <span style={{ fontWeight: "600" }}>
                                    {cabin_class}
                                  </span>
                                  <img
                                    src={information}
                                    alt="economy fare information"
                                  />
                                </Stack> */}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item sx={12}>
                              <Breadcrumbs sx={{ fontWeight: "600" }}>
                                <span>{dep_date}</span>
                                <span>
                                  {stops === 0 ? "non-stop" : stops + "Stop"}
                                </span>
                                <span>{jrney_time}</span>
                              </Breadcrumbs>
                            </Grid>
                            {innersegment.map((segment, index) => {
                              const G_time = segment.GroundTime;
                              // console.log(segment, "segment");
                              const layover_time = `${Math.floor(G_time / 60)
                                .toString()
                                .padStart(2, "0")}h ${(G_time % 60)
                                  .toString()
                                  .padStart(2, "0")}mins`;
                              const duration = segment.Duration;
                              const cal_duration = `${Math.floor(duration / 60)
                                .toString()
                                .padStart(2, "0")}h ${(duration % 60)
                                  .toString()
                                  .padStart(2, "0")}m`;
                              const depseg_time = helperFunctions.get_time(
                                segment.Origin.DepTime
                              );
                              const arrseg_time = helperFunctions.get_time(
                                segment.Destination.ArrTime
                              );

                              let depseg_date = helperFunctions.getshortdate(
                                segment.Origin.DepTime
                              );
                              const arrseg_date = helperFunctions.getshortdate(
                                segment.Destination.ArrTime
                              );
                              const dest_loc =
                                segment.Destination.Airport.CityName;
                              const origin_loc =
                                segment.Origin.Airport.CityName;
                              const flight_number = `${segment.Airline.AirlineCode}-${segment.Airline.FlightNumber}`;
                              const airline = segment.Airline.AirlineName;
                              const airlinecode = segment.Airline.AirlineCode;
                              const check_inbag = segment.Baggage;
                              const cabin_bag = segment.CabinBaggage;
                              return (
                                <>
                                  {G_time > 0 && (
                                    <Grid item>
                                      <Grid container>
                                        <Grid item md={0.1}></Grid>
                                        <Grid item md={10}>
                                          <span
                                            className={ticketbook.textsize}
                                            style={{
                                              background: "#DFF3FF",
                                              padding: "5px",
                                              borderRadius: "0.5rem",
                                            }}
                                          >
                                            Change of Plane : Layover in{" "}
                                            {segment.Origin.Airport.CityName}{" "}
                                            {layover_time}
                                          </span>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  )}
                                  {G_time > 0 && (
                                    <Divider
                                      sx={{
                                        paddingLeft: {
                                          md: "0rem",
                                          xs: "0.7rem",
                                        },
                                      }}
                                    >
                                      <span className={ticketbook.textsize}>
                                        Layover: {layover_time}
                                      </span>{" "}
                                    </Divider>
                                  )}
                                  <Grid item>
                                    <Grid container>
                                      <Grid item md={3}>
                                        <Grid container columnGap={1}>
                                          <Grid item md={"auto"}>
                                            <img
                                              src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                              alt={`${airlinecode}`}
                                              width="25px"
                                              height="25px"
                                            />
                                          </Grid>
                                          <Grid item>
                                            <Stack spacing={0.5}>
                                              <span
                                                style={{
                                                  width: "100px",
                                                  whiteSpace: "nowrap",
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                }}
                                              >
                                                {airline}
                                              </span>
                                              <span>{flight_number}</span>
                                            </Stack>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      {/* Departure time */}
                                      <Grid item md={9} xs={12}>
                                        <Grid container>
                                          <Grid
                                            item
                                            md={2}
                                            sx={{
                                              display: {
                                                xs: "none",
                                                md: "block",
                                              },
                                            }}
                                          >
                                            <Stack spacing={1.5}>
                                              <span>
                                                <b>{depseg_time}</b>
                                              </span>
                                              <span
                                                style={{ fontSize: "14px" }}
                                              >
                                                {origin_loc}
                                              </span>
                                              <span
                                                style={{
                                                  fontSize: "14px",
                                                  fontWeight: 600,
                                                  color: styles.app_color,
                                                }}
                                              >
                                                {depseg_date}
                                              </span>
                                            </Stack>
                                          </Grid>
                                          {/* Flight design */}
                                          <Grid
                                            item
                                            md={8}
                                            xs={12}
                                            alignItems={"center"}
                                            mt={{ xs: 0, md: 2 }}
                                          >
                                            <Grid
                                              container
                                              alignItems={"center"}
                                            >
                                              <Grid item md={2} xs={2} mt={3}>
                                                <img
                                                  src={plane}
                                                  alt="plane"
                                                  className="muiti_city_line_image"
                                                />
                                              </Grid>
                                              <Grid
                                                item
                                                xs={8}
                                                md={7}
                                                lg={7}
                                                xl={7}
                                                textAlign="center"
                                              >
                                                <Stack>
                                                  <span>{cal_duration}</span>
                                                  <Grid
                                                    container
                                                    alignItems={"center"}
                                                  >
                                                    <img
                                                      src={nonstop1}
                                                      alt="nonstopline"
                                                      className="muiti_city_line_image"
                                                    />
                                                  </Grid>
                                                </Stack>
                                              </Grid>
                                              <Grid
                                                item
                                                xs={2}
                                                md={2}
                                                lg={2.5}
                                                mt={3}
                                                textAlign="right"
                                              >
                                                <img
                                                  src={plane}
                                                  alt="plane"
                                                  className="muiti_city_line_image"
                                                />
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* flight timings */}
                                          <Grid
                                            item
                                            xs={12}
                                            sx={{
                                              display: {
                                                xs: "block",
                                                md: "none",
                                              },
                                            }}
                                          >
                                            <Grid
                                              container
                                              justifyContent={"space-between"}
                                            >
                                              <Grid item>
                                                <Stack spacing={1.5}>
                                                  <span>
                                                    <b>{depseg_time}</b>
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "14px" }}
                                                  >
                                                    {origin_loc}
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "14px",
                                                      fontWeight: 600,
                                                      color:  styles.app_color,
                                                    }}
                                                  >
                                                    {depseg_date}
                                                  </span>
                                                </Stack>
                                              </Grid>
                                              <Grid item>
                                                {" "}
                                                <div
                                                  style={{
                                                    height: "100%",
                                                    width: "1px",
                                                    background: "#ECECEC",
                                                  }}
                                                ></div>{" "}
                                              </Grid>
                                              <Grid item>
                                                <Stack spacing={1.5}>
                                                  <span>
                                                    <b>{arrseg_time}</b>
                                                  </span>
                                                  <span
                                                    style={{ fontSize: "14px" }}
                                                  >
                                                    {dest_loc}
                                                  </span>
                                                  <span
                                                    style={{
                                                      fontSize: "14px",
                                                      fontWeight: 600,
                                                      color: styles.app_color,
                                                    }}
                                                  >
                                                    {arrseg_date}
                                                  </span>
                                                </Stack>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                          {/* Arrival time */}
                                          <Grid
                                            item
                                            md={2}
                                            sx={{
                                              display: {
                                                xs: "none",
                                                md: "block",
                                              },
                                            }}
                                          >
                                            <Stack spacing={1.5}>
                                              <span>
                                                <b>{arrseg_time}</b>
                                              </span>
                                              <span
                                                style={{ fontSize: "14px" }}
                                              >
                                                {dest_loc}
                                              </span>
                                              <span
                                                style={{
                                                  fontSize: "14px",
                                                  fontWeight: 600,
                                                  color: styles.app_color,
                                                }}
                                              >
                                                {arrseg_date}
                                              </span>
                                            </Stack>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  {/* Baggage */}
                                  <Grid item textAlign={"right"} xs={12}>
                                    <Grid
                                      container
                                      columnGap={2}
                                      rowGap={1}
                                      sx={{
                                        marginTop: { xs: "0.6rem", md: "0px" },
                                        borderTop: {
                                          xs: "1px solid #ECECEC",
                                          md: "none",
                                        },
                                      }}
                                    >
                                      <Grid
                                        md={"auto"}
                                        sx={{
                                          display: { md: "block", xs: "none" },
                                        }}
                                        item
                                      >
                                        <div style={{ width: "18px" }}></div>
                                      </Grid>
                                      <Grid
                                        item
                                        md={"auto"}
                                        className={ticketbook.textsize}
                                        textAlign={"left"}
                                      >
                                        Baggage Type:Adult
                                      </Grid>
                                      <Grid
                                        item
                                        md={"auto"}
                                        className={ticketbook.textsize}
                                      >
                                        Check-in: {check_inbag}
                                      </Grid>
                                      <Grid
                                        item
                                        md={"auto"}
                                        className={ticketbook.textsize}
                                      >
                                        Cabin:{cabin_bag}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </>
                              );
                            })}
                          </Grid>
                        </Paper>
                        <Divider
                          sx={{
                            marginTop: "1rem",
                            background:  styles.app_color,
                            opacity: "0.2",
                            display: { xs: "block", md: "none" },
                          }}
                        />
                        {/* {getContent(index_flight)} */}
                      </>
                    );
                  });
                })}
                {/* Fare summary on moblie */}
                <Grid
                  item
                  xs={12}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <Grid container direction={"column"} mt={0} spacing={2}>
                    <Grid item>
                      <Paper
                        sx={{ padding: "1rem", borderRadius: "1rem" }}
                        elevation={3}
                      >
                        <Grid container direction={"column"} spacing={1.5}>
                          <Grid item>
                            <h3 className={ticketbook.completebookings}>
                              Fare summary
                            </h3>
                          </Grid>
                          <Grid item>
                            <Grid container>
                              <Grid item xs={4}>
                                Base fare
                              </Grid>
                              <Grid item container xs={8} textAlign={"right"}>
                                {selected_flight[0]?.FareBreakdown.map(
                                  (flight, flight_index) => {
                                    // console.log(flight,"fdsjfjsa")
                                    return (
                                      <>
                                        <Grid item md={6}>{`${flight?.PassengerCount
                                          }*${flight?.PassengerType === 1
                                            ? "Adult"
                                            : flight?.PassengerType === 2
                                              ? "Child"
                                              : flight?.PassengerType === 3 &&
                                              "Infant"
                                          }`}</Grid>
                                        <Grid item md={6}>{`${flight?.Currency
                                          } ${flight?.PassengerType === 1
                                            ? adult_basefare
                                            : flight?.PassengerType === 2
                                              ? child_basefare
                                              : flight?.PassengerType === 3 &&
                                              infant_basefare
                                          }`}</Grid>
                                      </>
                                    );
                                  }
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider />
                          <Grid item>
                            <Grid container>
                              <Grid item xs={6}>
                                Fee & Surcharges
                              </Grid>
                              <Grid item xs={6} textAlign={"right"}>
                                {`${selected_flight[0].Fare.Currency} ${taxes}`}
                              </Grid>
                            </Grid>
                          </Grid>

                          {othercharges > 0 && (
                            <>
                              <Divider />
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={6}>
                                    Other Charges
                                  </Grid>
                                  <Grid item xs={6} textAlign={"right"}>
                                    {`${selected_flight[0].Fare.Currency} ${othercharges}`}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </>
                          )}
                          {seats_price > 0 && (
                            <>
                              <Divider />
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={6}>
                                    Seats
                                  </Grid>
                                  <Grid item xs={6} textAlign={"right"}>
                                    {`${selected_flight[0].Fare.Currency} ${seats_price}`}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </>
                          )}
                          {toatal_baggage_price > 0 && (
                            <>
                              <Divider />
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={6}>
                                    Baggage
                                  </Grid>
                                  <Grid item xs={6} textAlign={"right"}>
                                    {`${selected_flight[0].Fare.Currency} ${toatal_baggage_price}`}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </>
                          )}
                          {total_meal_price > 0 && (
                            <>
                              <Divider />
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={6}>
                                    Meals
                                  </Grid>
                                  {/* <Grid item xs={6} textAlign={"right"}>
                                {`${selected_flight[0].Fare.Currency} ${total_meal_price}`}
                              </Grid> */}
                                </Grid>
                              </Grid>
                            </>
                          )}
                          <Divider />
                          <Grid item>
                            <Grid container>
                              <Grid item xs={6}>
                                <span className={ticketbook.totalamount}>
                                  Total Amount
                                </span>
                              </Grid>
                              <Grid item xs={6} textAlign={"right"}>
                                {`${selected_flight[0].Fare.Currency} ${adult_basefare +
                                  child_basefare +
                                  infant_basefare +
                                  taxes +
                                  othercharges +
                                  seats_price +
                                  total_meal_price +
                                  toatal_baggage_price
                                  }`}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    {/* Coupons */}
                  </Grid>
                </Grid>
                {/* this should display conditionally */}
                {flightmealspage ? (
                  <div>
                    {/* Cacellation refund policy */}
                    <Accordion
                      classes={{
                        root: classes.MuiAccordionroot,
                      }}
                      sx={{ marginTop: "2rem", borderRadius: "1rem!important" }}
                      expanded={refundpolicy1.expand}
                    >
                      <AccordionSummary sx={{ marginTop: "2rem" }}>
                        <Grid container direction={"column"} spacing={1}>
                          <Grid item>
                            <Stack
                              paddingLeft={1.6}
                              direction={"row"}
                              spacing={1}
                              onClick={() =>
                                setRefundpolicy1((prev) => ({
                                  expand: !prev.expand,
                                }))
                              }
                            >
                              <span>
                                <img src={refundpolicy} alt="refund policy" />
                              </span>
                              <span className={ticketbook.textsize}>
                                Cancellation Refund Policy
                              </span>
                              <span>
                                <img
                                  src={
                                    refundpolicy1.expand ? uparrow : downarrow
                                  }
                                  alt="arrows"
                                />
                              </span>
                            </Stack>
                          </Grid>
                          {/* <Grid item>
                          <Button
                            startIcon={
                              <img src={indigoround} alt="indigo round" />
                            }
                            className={ticketbook.btn}
                          >
                            IndiGo
                          </Button>
                          </Grid> */}
                          <TabContext value={cancellationtab}>
                            <TabList
                              onChange={cancellationtabs}
                              className={book.tabs}
                              variant="scrollable"
                              orientation={{ xs: "horizontal", md: "none" }}
                              scrollButtons={"off"}
                            >
                              {selected_flight.map((flight, index) => {
                                const airlinecode =
                                  flight.Segments[0][0].Airline.AirlineCode;
                                const airline =
                                  flight?.Segments[0][0]?.Airline?.AirlineName;
                                return (
                                  <>
                                    <Tab
                                      value={index}
                                      key={index}
                                      sx={{
                                        marginLeft:
                                          index === 0 ? "0rem" : "1rem",
                                      }}
                                      disableTouchRipple
                                      label={
                                        <Stack
                                          direction="row"
                                          alignItems={"center"}
                                          spacing={0.8}
                                          height={"100%"}
                                          margin={"0rem 0.5rem"}
                                        >
                                          <img
                                            src={`${envdata.flagsbaseurl}/${airlinecode}.png`}
                                            alt="indigo"
                                            width="60%"
                                            height="60%"
                                            style={{}}
                                          />
                                          <span
                                            style={{
                                              padding: "0px",
                                              /*marginTop:'0.3rem',*/ textTransform:
                                                "none",
                                              minWidth: "4rem",
                                            }}
                                          >
                                            {airline}
                                          </span>
                                        </Stack>
                                      }
                                    />
                                  </>
                                );
                              })}
                            </TabList>
                            {selected_flight.map((flight, index) => {
                              // console.log(flight)
                              const fare = flight?.Fare?.PublishedFare;
                              const { MiniFareRules: minifare = [] } = flight;
                              return (
                                <TabPanel value={index}>
                                  <Grid item mt={1}>
                                    <Grid
                                      container
                                      direction={"column"}
                                      className={ticketbook.refunddetails}
                                    >
                                      <Grid item>
                                        <Grid
                                          container
                                          sx={{ fontWeight: 500 }}
                                        >
                                          <Grid item xs={5}>
                                            Cancellation Time
                                          </Grid>
                                          <Grid item xs={4}>
                                            Penalty%
                                          </Grid>
                                          <Grid item xs={3}>
                                            Penalty₹
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      {minifare.length > 0 &&
                                        minifare[0].map((rules, index) => {
                                          // console.log(rules)
                                          let from;
                                          let to;
                                          let details;
                                          let units;
                                          let cancel_percent;
                                          if (rules.Type === "Cancellation") {
                                            from = rules.From ?? "";
                                            to = rules.To ?? "";
                                            details = rules.Details ?? "";
                                            units = rules.Unit ?? "";
                                            cancel_percent =
                                              helperFunctions.cancelltion_percentage(
                                                fare,
                                                details
                                              );
                                          }
                                          let cancellation_time = `${from}-${to}${units}`;

                                          return (
                                            rules.Type === "Cancellation" && (
                                              <Grid item>
                                                <Grid container>
                                                  <Grid item xs={5}>
                                                    <span>
                                                      {cancellation_time}
                                                    </span>
                                                  </Grid>
                                                  <Grid item xs={4}>
                                                    {`${cancel_percent}%`}
                                                  </Grid>
                                                  <Grid item xs={3}>
                                                    {details}
                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            )
                                          );
                                        })}
                                      {/* <Grid item>
                              <Grid container>
                                <Grid item xs={4}>
                                  2hrs - 3 days
                                </Grid>
                                <Grid item xs={4}>
                                  30%
                                </Grid>
                                <Grid item xs={4}>
                                  ₹ 690.00
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container>
                                <Grid item xs={4}>
                                  3 - 365 days{" "}
                                </Grid>
                                <Grid item xs={4}>
                                  10%
                                </Grid>
                                <Grid item xs={4}>
                                  ₹ 230.00
                                </Grid>
                              </Grid>
                            </Grid> */}
                                    </Grid>
                                  </Grid>
                                </TabPanel>
                              );
                            })}
                          </TabContext>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <span className={ticketbook.textsize}>
                          Reschedule Penalty Fees
                        </span>
                        <Divider sx={{ marginTop: "1rem" }} />
                        <Grid container spacing={2} mt={1}>
                          <Grid item container>
                            <Grid item md={1.7}>
                              Reschedule{" "}
                            </Grid>
                            <Grid item md={8}>
                              Before 28 hours of Departure Time
                            </Grid>
                          </Grid>
                          <Grid item container>
                            <Grid item md={1.7}>
                              Airline Fees
                            </Grid>
                            <Grid item md={8}>
                              ₹ 2,000
                            </Grid>
                          </Grid>
                          <Grid item container>
                            <Grid item md={1.7}>
                              EMT Fees
                            </Grid>
                            <Grid item md={8}>
                              ₹ 300
                            </Grid>
                          </Grid>
                        </Grid>
                        <div style={{ marginTop: "1.5rem" }}>
                          <span className={ticketbook.textsize}>
                            Terms & Conditions
                          </span>
                          <Divider sx={{ marginTop: "1rem" }} />
                          <Grid
                            container
                            direction={"column"}
                            mt={1.5}
                            spacing={2}
                          >
                            <Grid item sx={{ fontSize: "16px" }}>
                              &#x2022; Total Reschedule Charges = Airline
                              Reschedule Fee + Fare Diffrence
                            </Grid>
                            <Grid item sx={{ fontSize: "16px" }}>
                              &#x2022; The airline cancel/ reschedule fees is
                              inducative and can be changed without anyprior
                              notice by the airlines.
                            </Grid>
                            <Grid item sx={{ fontSize: "16px" }}>
                              &#x2022; gomytrip does not guarantee the accuracy
                              of cancel/ reschedule fees.
                            </Grid>
                            <Grid item sx={{ fontSize: "16px" }}>
                              &#x2022; Partial cancellation is not allowed on
                              the flight stickets which are book under special
                              round-trips discounted fares.
                            </Grid>
                            <Grid item sx={{ fontSize: "16px" }}>
                              &#x2022; In certains situations of restricted
                              cases, no amendments and cancellation is allowed.
                            </Grid>
                          </Grid>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    {/* promo on moblie */}
                    <Grid
                      item
                      xs={12}
                      sx={{ display: { xs: "block", md: "none" } }}
                    >
                      <Grid container direction={"column"} mt={0} spacing={2}>
                        {/* Coupons */}
                        <Grid item>
                          <Paper
                            sx={{ padding: "1rem", borderRadius: "1rem" }}
                            elevation={3}
                          >
                            <span className={ticketbook.headings}>
                              Promo Code
                            </span>
                            <Grid container direction={"column"} mt={2}>
                              <Grid item>
                                <TextField
                                  fullWidth
                                  className={classes.root}
                                  value={offers}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="start">
                                        <span
                                          style={{ color:  styles.app_color }}
                                        // onClick={() => alert("hello eof")}
                                        >
                                          Apply
                                        </span>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <RadioGroup
                                value={offers}
                                onChange={(e) => setOffers(e.target.value)}
                              >
                                {/* 50% off */}
                                <Grid item mt={2}>
                                  <Grid
                                    container
                                    direction={"column"}
                                    sx={{
                                      background: "#DFF3FF",
                                      padding: "0.5rem",
                                      borderRadius: "1rem",
                                    }}
                                  >
                                    <Grid item>
                                      <FormControlLabel
                                        value="50"
                                        control={
                                          <Radio
                                            sx={{
                                              color: "white",
                                              "&, &.Mui-checked": {
                                                color:  styles.app_color,
                                              },
                                            }}
                                          />
                                        }
                                        label="FLAT50"
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item>
                                          <Grid
                                            container
                                            direction={"column"}
                                            rowSpacing={1}
                                          >
                                            <Grid item>
                                              Flat 50% off for the first time
                                              user
                                            </Grid>
                                            <Grid item>T&cs apply</Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item mt={2}>
                                  <Grid
                                    container
                                    direction={"column"}
                                    sx={{
                                      background: "#DFF3FF",
                                      padding: "0.5rem",
                                      borderRadius: "1rem",
                                    }}
                                  >
                                    <Grid item>
                                      <FormControlLabel
                                        value="20"
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
                                        label="FLAT20"
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item>
                                          <Grid
                                            container
                                            direction={"column"}
                                            rowSpacing={1}
                                          >
                                            <Grid item>
                                              Flat 20% off for the first time
                                              user
                                            </Grid>
                                            <Grid item>T&cs apply</Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item mt={2}>
                                  <Grid
                                    container
                                    direction={"column"}
                                    sx={{
                                      background: "#DFF3FF",
                                      padding: "0.5rem",
                                      borderRadius: "1rem",
                                    }}
                                  >
                                    <Grid item>
                                      <FormControlLabel
                                        value="30"
                                        control={
                                          <Radio
                                            sx={{
                                              color: "white",
                                              "&, &.Mui-checked": {
                                                color:  styles.app_color,
                                              },
                                            }}
                                          />
                                        }
                                        label="FLAT30"
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item>
                                          <Grid
                                            container
                                            direction={"column"}
                                            rowSpacing={1}
                                          >
                                            <Grid item>
                                              Flat 30% off for the first time
                                              user
                                            </Grid>
                                            <Grid item>T&cs apply</Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item mt={2}>
                                  <Grid
                                    container
                                    direction={"column"}
                                    sx={{
                                      background: "#DFF3FF",
                                      padding: "0.5rem",
                                      borderRadius: "1rem",
                                    }}
                                  >
                                    <Grid item>
                                      <FormControlLabel
                                        value="35"
                                        control={
                                          <Radio
                                            sx={{
                                              color: "white",
                                              "&, &.Mui-checked": {
                                                color:  styles.app_color,
                                              },
                                            }}
                                          />
                                        }
                                        label="FLAT35"
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item>
                                          <Grid
                                            container
                                            direction={"column"}
                                            rowSpacing={1}
                                          >
                                            <Grid item>
                                              Flat 35% off for the first time
                                              user
                                            </Grid>
                                            <Grid item>T&cs apply</Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </RadioGroup>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Travel insurance */}
                    <Grid item xs={12}>
                      <Paper
                        className={ticketbook.paperadjustment}
                        elevation={3}
                      >
                        <Grid container direction={"column"} spacing={1}>
                          <Grid item>
                            <Stack direction={"row"} spacing={1}>
                              <img
                                src={travelinsurance}
                                width="1.8%"
                                alt="travel insurance"
                                className="bookNow_travel_icon"
                              />
                              <span className={ticketbook.textsize}>
                                Travel Insurance Details
                              </span>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <span
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                color: "#303030",
                              }}
                            >
                              Protection your trip from COVID - 19, medical
                              costs & more with Travel Protection from our
                              award-winning partner Xcover.{" "}
                            </span>
                          </Grid>
                          <Grid item>
                            <RadioGroup
                              value={insurance}
                              onChange={(e) => setInsurance(e.target.value)}
                            >
                              <FormControlLabel
                                control={
                                  <Radio
                                    value="yes"
                                    sx={{
                                      color: "white",
                                      "&, &.Mui-checked": {
                                        color: styles.textcolor,
                                        fontSize: "14px",
                                        fontWeight: "400",
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
                                        <img src={correct} alt="correct" />
                                        <span>
                                          Refundable flight and trip costs
                                        </span>
                                      </Stack>
                                    </Grid>
                                    <Grid item md={3}>
                                      <Stack direction={"row"} spacing={1}>
                                        <span style={{ marginBottom: "1rem" }}>
                                          <img src={correct} alt="correct" />
                                        </span>
                                        <span>
                                          Emergency medical and dental
                                        </span>
                                      </Stack>
                                    </Grid>
                                    <Grid item md={3}>
                                      <Stack direction={"row"} spacing={1}>
                                        <img src={correct} alt="correct" />
                                        <span>24/7 Emergency assistance</span>
                                      </Stack>
                                    </Grid>
                                    <Grid item md={3}>
                                      <Stack direction={"row"} spacing={1}>
                                        <img src={correct} alt="correct" />
                                        <span>Delayed or missed flights</span>
                                      </Stack>
                                    </Grid>
                                    <Grid item md={3}>
                                      <Stack direction={"row"} spacing={1}>
                                        <img src={correct} alt="correct" />
                                        <span>
                                          Express baggage tracking and cover
                                        </span>
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
                                        color: styles.textcolor,
                                        fontSize: "14px",
                                        fontWeight: "400",
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
                    </Grid>
                    {/* important note */}
                    <Grid item mt={2}>
                      <Importantinfo />
                    </Grid>
                    {/* Traveller information */}
                    <div ref={textFieldRef}>
                      <Paper
                        className={ticketbook.paperadjustment}
                        elevation={3}
                      >
                        <Stack direction={"row"} spacing={1.5}>
                          <img src={personblue} alt="personblue" />
                          <span className={ticketbook.textsize}>
                            Traveller’s Information
                          </span>
                        </Stack>
                        <Grid container spacing={2} mt={1} direction={"column"}>
                          {/* adult */}
                          {Array.from(
                            Array(travellerscount.adult),
                            (item, index) => {
                              // console.log(index,"adult index")
                              return (
                                <Grid
                                  item
                                  container
                                  direction="column"
                                  spacing={2}
                                  xs={12}
                                >
                                  <Grid item container spacing={1}>
                                    <Grid item mt={0.4}>
                                      <img src={traveller} alt="traveller" />
                                    </Grid>
                                    <Grid item sx={{ fontWeight: "600" }}>
                                      Adult
                                    </Grid>
                                  </Grid>

                                  <Grid item container spacing={2}>
                                    <Grid item md={4}>
                                      <ToggleButtonGroup
                                        value={adult_state[index].title}
                                        exclusive
                                        onChange={titlechange(2, index)}
                                        size="small"
                                      >
                                        <ToggleButton
                                          disableRipple
                                          value={1}
                                          sx={{
                                            padding: "0.3rem 1rem",
                                            background:styles.shade_color,
                                            color:  styles.textcolor,
                                            border: "none",
                                            borderRadius: "0.5rem!important",
                                            width: "4rem",
                                            textTransform: "none",
                                            "@media (min-width:900px) and (max-width:1300px)":
                                            {
                                              width: "fit-content",
                                              padding: "0rem 0.5rem",
                                            },
                                            "@media (max-width:367px)": {
                                              width: "fit-content",
                                              padding: "0rem 0.5rem !important",
                                              marginLeft: "0.5rem!important",
                                            },
                                          }}
                                        >
                                          Mr
                                        </ToggleButton>
                                        <ToggleButton
                                          disableRipple
                                          value={2}
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Mrs
                                        </ToggleButton>
                                        <ToggleButton
                                          value={3}
                                          disableRipple
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Mstr
                                        </ToggleButton>
                                        <ToggleButton
                                          value={4}
                                          disableRipple
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Ms
                                        </ToggleButton>
                                      </ToggleButtonGroup>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                      <TextField
                                        className={classes.travelerinfo}
                                        label="*First Name"
                                        fullWidth
                                        size={"small"}
                                        name="first_name"
                                        // error={adult_state[index].f_name_err}
                                        // helperText={adult_state[index].f_name_err ? 'Firstname shouldnt be empty' : ''}
                                        onChange={(e) =>
                                          handletravellersinput(e, index, 2)
                                        }
                                        value={adult_state[index].first_name}
                                        InputLabelProps={{
                                          style: {
                                            color: adult_state[index].f_name_err
                                              ? "red"
                                              : "#8F9098",
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
                                    <Grid item md={4} xs={12}>
                                      <TextField
                                        className={classes.travelerinfo}
                                        label="*Last Name"
                                        fullWidth
                                        name="last_name"
                                        onChange={(e) =>
                                          handletravellersinput(e, index, 2)
                                        }
                                        value={adult_state[index].last_name}
                                        // error={adult_state[index].l_name_err}
                                        // helperText={adult_state[index].l_name_err ? 'Lastname shouldnt be empty' : ''}
                                        InputLabelProps={{
                                          style: {
                                            color: adult_state[index].l_name_err
                                              ? "red"
                                              : "#8F9098",
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
                                          label="Date"
                                          value={adult_state[index].dob}
                                          onChange={(newvalue) =>
                                            setAdult_state((prevdata) => {
                                              const newdata = [...prevdata];
                                              newdata[index] = {
                                                ...newdata[index],
                                                dob: newvalue,
                                              };
                                              return newdata;
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
                                                    paddingRight: "0.5rem",
                                                  }}
                                                >
                                                  *Date of Birth
                                                </span>
                                              }
                                              // value=""
                                              className={classes.travelerinfo}
                                              InputLabelProps={{
                                                style: {
                                                  color: adult_state[index]
                                                    .dob_err
                                                    ? "red"
                                                    : "#8F9098",
                                                  fontWeight: "500",
                                                },
                                              }}
                                              InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                        value={adult_state[index].gender}
                                        exclusive
                                        onChange={handleGender(2, index)}
                                        size="small"
                                        sx={{
                                          width: "100%",
                                          display: "flex",
                                          gap: "0.5rem",
                                          "& .MuiToggleButtonGroup-grouped": {
                                            flex: 1,
                                            "@media (max-width:1100px) and (min-width:900px)":
                                            {
                                              padding: "0px",
                                            },
                                          },
                                        }}
                                      >
                                        <ToggleButton
                                          value={1}
                                          sx={{
                                            // padding: {xs:'0.3rem 0.5rem',sm:"0.3rem 1.5rem"},
                                            background: "#EEF7FD",
                                            color:  styles.app_color,
                                            border: "none",
                                            borderRadius: "0.5rem!important",
                                            textTransform: "none",
                                            // fontSize:'14px',
                                            // width:'80px',
                                            height: "30px",
                                            // borderRadius: "0.5rem!important",
                                            // "@media (min-width:900px) and (max-width:1371px)":{
                                            //   width:'68px'
                                            // },
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                          sx={{
                                            textTransform: "none",
                                            textTransform: "none",
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                          sx={{
                                            textTransform: "none",
                                            fontSize: "14px",
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                    {/* passport details */}
                                    {
                                      (selected_flight[0].IsPassportRequiredAtBook || selected_flight[0].IsPassportRequiredAtTicket) &&
                                      <>
                                        <Grid item md={4} xs={12}>
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="*Passport No"
                                            fullWidth
                                            name="passport_num"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 2)
                                            }
                                            value={adult_state[index].passport_num}
                                            InputLabelProps={{
                                              style: {
                                                color: adult_state[index].p_num_err
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
                                              sx={{
                                                "& .MuiPickersToolbar-penIconButton":
                                                {
                                                  display: "none",
                                                },
                                              }}
                                              closeOnSelect
                                              disablePast

                                              label="passport_exp"
                                              value={
                                                adult_state[index].passport_exp
                                              }
                                              onChange={(newvalue) =>
                                                setAdult_state((prevdata) => {
                                                  const newdata = [...prevdata];
                                                  newdata[index] = {
                                                    ...newdata[index],
                                                    passport_exp: newvalue,
                                                  };
                                                  return newdata;
                                                })
                                              }
                                              renderInput={(params) => (
                                                <TextField
                                                  id="dateInputTag"
                                                  sx={{ minWidth: "90px" }}
                                                  {...params}
                                                  fullWidth
                                                  autoComplete="off"
                                                  name="dob"
                                                  size="small"
                                                  label={
                                                    <span
                                                      style={{
                                                        paddingRight: "0.5rem",
                                                      }}
                                                    >
                                                      * Passport Expiry
                                                    </span>
                                                  }
                                                  // value=""
                                                  className={classes.travelerinfo}
                                                  InputLabelProps={{
                                                    style: {
                                                      color: adult_state[index]
                                                        .p_exp_err
                                                        ? "red"
                                                        : "#8F9098",
                                                      fontWeight: "500",
                                                    },
                                                  }}
                                                  InputProps={{
                                                    readOnly: true,
                                                    startAdornment: (
                                                      <InputAdornment position="start">
                                                        {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                              sx={{
                                                "& .MuiPickersToolbar-penIconButton":
                                                {
                                                  display: "none",
                                                },
                                              }}
                                              closeOnSelect
                                              disableFuture
                                              label="passport_exp"
                                              value={
                                                adult_state[index].passport_issue
                                              }
                                              onChange={(newvalue) =>
                                                setAdult_state((prevdata) => {
                                                  const newdata = [...prevdata];
                                                  newdata[index] = {
                                                    ...newdata[index],
                                                    passport_issue: newvalue,
                                                  };
                                                  return newdata;
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
                                                        paddingRight: "0.5rem",
                                                      }}
                                                    >
                                                      * Passport Issue Date
                                                    </span>
                                                  }
                                                  // value=""
                                                  className={classes.travelerinfo}
                                                  InputLabelProps={{
                                                    style: {
                                                      color: adult_state[index]
                                                        .passport_issue_err
                                                        ? "red"
                                                        : "#8F9098",
                                                      fontWeight: "500",
                                                    },
                                                  }}
                                                  InputProps={{
                                                    readOnly: true,
                                                    startAdornment: (
                                                      <InputAdornment position="start">
                                                        {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="* Passport Issue Country"
                                            fullWidth
                                            name="passport_issue_country"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 2)
                                            }
                                            value={
                                              adult_state[index]
                                                .passport_issue_country
                                            }
                                            InputLabelProps={{
                                              style: {
                                                color: adult_state[index]
                                                  .passport_issue_country_err
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
                                      </>
                                    }

                                    {/* pannumber */}
                                    {
                                      (selected_flight[0].IsPanRequiredAtBook || selected_flight[0].IsPanRequiredAtTicket) &&
                                      <>
                                        <Grid item md={4} xs={12}>
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="Pan Card No "
                                            fullWidth
                                            name="pan_no"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 2)
                                            }
                                            value={adult_state[index].pan_no}
                                            InputLabelProps={{
                                              style: {
                                                color: adult_state[index].pan_no_err
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
                                      </>
                                    }

                                  </Grid>

                                  <Grid item container columnGap={2} rowGap={2}>
                                    <Grid item>
                                      <Button
                                        onClick={() =>
                                          Travellersdialogopen(index, 2)
                                        }
                                        variant="contained"
                                        disableRipple
                                        className={ticketbook.addtravellerbtn}
                                      >
                                        Existence Traveller
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        variant={"outlined"}
                                        className={ticketbook.savedetailsbtn}
                                        onClick={() => savedetails(index, 2)}
                                      >
                                        Save Details
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              );
                            }
                          )}
                          {/* child */}
                          {Array.from(
                            Array(travellerscount.child),
                            (item, index) => {
                              return (
                                <Grid
                                  item
                                  container
                                  direction="column"
                                  spacing={2}
                                  xs={12}
                                >
                                  <Grid item container spacing={1}>
                                    <Grid item mt={0.4}>
                                      <img src={traveller} alt="traveller" />
                                    </Grid>
                                    <Grid item sx={{ fontWeight: "600" }}>
                                      Child
                                    </Grid>
                                  </Grid>

                                  <Grid item container spacing={2}>
                                    <Grid item md={4}>
                                      <ToggleButtonGroup
                                        value={child_state[index].title}
                                        exclusive
                                        onChange={titlechange(1, index)}
                                        size="small"
                                      >
                                        <ToggleButton
                                          disableRipple
                                          value={1}
                                          sx={{
                                            padding: "0.3rem 1rem",
                                            background: "#EEF7FD",
                                            color: styles.app_color,
                                            border: "none",
                                            borderRadius: "0.5rem!important",
                                            width: "4rem",
                                            textTransform: "none",
                                            "@media (min-width:900px) and (max-width:1300px)":
                                            {
                                              width: "fit-content",
                                              padding: "0rem 0.5rem",
                                            },
                                            "@media (max-width:367px)": {
                                              width: "fit-content",
                                              padding: "0rem 0.5rem !important",
                                              marginLeft: "0.5rem!important",
                                            },
                                          }}
                                        >
                                          Mr
                                        </ToggleButton>
                                        <ToggleButton
                                          disableRipple
                                          value={2}
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Mrs
                                        </ToggleButton>
                                        <ToggleButton
                                          value={3}
                                          disableRipple
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Mstr
                                        </ToggleButton>
                                        <ToggleButton
                                          value={4}
                                          disableRipple
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Ms
                                        </ToggleButton>
                                      </ToggleButtonGroup>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                      <TextField
                                        className={classes.travelerinfo}
                                        label="*First Name"
                                        name="first_name"
                                        onChange={(e) =>
                                          handletravellersinput(e, index, 1)
                                        }
                                        value={child_state[index].first_name}
                                        fullWidth
                                        size={"small"}
                                        InputLabelProps={{
                                          style: {
                                            color: child_state[index].f_name_err
                                              ? "red"
                                              : "#8F9098",
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
                                    <Grid item md={4} xs={12}>
                                      <TextField
                                        className={classes.travelerinfo}
                                        label="*Last Name"
                                        name="last_name"
                                        onChange={(e) =>
                                          handletravellersinput(e, index, 1)
                                        }
                                        value={child_state[index].last_name}
                                        fullWidth
                                        InputLabelProps={{
                                          style: {
                                            color: child_state[index].l_name_err
                                              ? "red"
                                              : "#8F9098",
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
                                    {/* <Grid item container spacing={3}> */}
                                    <Grid item md={4} xs={12}>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                      >
                                        <MobileDatePicker
                                          inputFormat="MM/dd/yyyy"
                                          sx={{
                                            "& .MuiPickersToolbar-penIconButton":
                                            {
                                              display: "none",
                                            },
                                          }}
                                          closeOnSelect
                                          disableFuture
                                          label="Date"
                                          value={child_state[index].dob}
                                          onChange={(newvalue) =>
                                            setChild_state((prevdata) => {
                                              const newdata = [...prevdata];
                                              newdata[index] = {
                                                ...newdata[index],
                                                dob: newvalue,
                                              };
                                              return newdata;
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
                                                    paddingRight: "0.5rem",
                                                  }}
                                                >
                                                  *Date of Birth
                                                </span>
                                              }
                                              // value=""
                                              className={classes.travelerinfo}
                                              InputLabelProps={{
                                                style: {
                                                  color: child_state[index]
                                                    .dob_err
                                                    ? "red"
                                                    : "#8F9098",
                                                  fontWeight: "500",
                                                },
                                              }}
                                              InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                        value={child_state[index].gender}
                                        exclusive
                                        onChange={handleGender(1, index)}
                                        size="large"
                                        sx={{
                                          width: "100%",
                                          display: "flex",
                                          gap: "0.5rem",
                                          "& .MuiToggleButtonGroup-grouped": {
                                            flex: 1,
                                            "@media (max-width:1100px) and (min-width:900px)":
                                            {
                                              padding: "0px",
                                            },
                                          },
                                        }}
                                      >
                                        <ToggleButton
                                          value={1}
                                          sx={{
                                            // padding: "0.3rem 1.5rem",
                                            background: "#EEF7FD",
                                            color:  styles.app_color,
                                            border: "none",
                                            borderRadius: "0.5rem!important",
                                            textTransform: "none",
                                            fontSize: "14px",
                                            height: "30px",
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                          sx={{
                                            textTransform: "none",
                                            fontSize: "14px",
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                          sx={{
                                            textTransform: "none",
                                            fontSize: "14px",
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                    {/* passport details */}
                                    {
                                      (selected_flight[0].IsPassportRequiredAtBook || selected_flight[0].IsPassportRequiredAtTicket) &&
                                      <>
                                        <Grid item md={4} xs={12}>
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="*Passport No"
                                            name="passport_num"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 1)
                                            }
                                            value={child_state[index].passport_num}
                                            fullWidth
                                            InputLabelProps={{
                                              style: {
                                                color: child_state[index].p_num_err
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
                                                child_state[index].passport_exp
                                              } // error={adult_state[index].dob_err}
                                              // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                              onChange={(newvalue) =>
                                                setChild_state((prevdata) => {
                                                  const newdata = [...prevdata];
                                                  newdata[index] = {
                                                    ...newdata[index],
                                                    passport_exp: newvalue,
                                                  };
                                                  return newdata;
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
                                                        paddingRight: "0.5rem",
                                                      }}
                                                    >
                                                      * Passport Expiry
                                                    </span>
                                                  }
                                                  // value=""
                                                  className={classes.travelerinfo}
                                                  InputLabelProps={{
                                                    style: {
                                                      color: child_state[index]
                                                        .p_exp_err
                                                        ? "red"
                                                        : "#8F9098",
                                                      fontWeight: "500",
                                                    },
                                                  }}
                                                  InputProps={{
                                                    readOnly: true,
                                                    startAdornment: (
                                                      <InputAdornment position="start">
                                                        {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                                child_state[index].passport_issue
                                              } // error={adult_state[index].dob_err}
                                              // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                              onChange={(newvalue) =>
                                                setChild_state((prevdata) => {
                                                  const newdata = [...prevdata];
                                                  newdata[index] = {
                                                    ...newdata[index],
                                                    passport_issue: newvalue,
                                                  };
                                                  return newdata;
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
                                                        paddingRight: "0.5rem",
                                                      }}
                                                    >
                                                      * Passport Issue Date
                                                    </span>
                                                  }
                                                  // value=""
                                                  className={classes.travelerinfo}
                                                  InputLabelProps={{
                                                    style: {
                                                      color: child_state[index]
                                                        .passport_issue_err
                                                        ? "red"
                                                        : "#8F9098",
                                                      fontWeight: "500",
                                                    },
                                                  }}
                                                  InputProps={{
                                                    readOnly: true,
                                                    startAdornment: (
                                                      <InputAdornment position="start">
                                                        {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="* Passport Issue Country"
                                            name="passport_issue_country"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 1)
                                            }
                                            value={
                                              child_state[index]
                                                .passport_issue_country
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              style: {
                                                color: child_state[index]
                                                  .passport_issue_country_err
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
                                      </>
                                    }

                                    {/* pannumber */}
                                    {
                                      (selected_flight[0].IsPanRequiredAtBook || selected_flight[0].IsPanRequiredAtTicket) &&
                                      <>
                                        <Grid item md={4} xs={12}>
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="Pan Card No "
                                            name="pan_no"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 1)
                                            }
                                            value={child_state[index].pan_no}
                                            fullWidth
                                            InputLabelProps={{
                                              style: {
                                                color: child_state[index].pan_no_err
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
                                      </>
                                    }

                                  </Grid>

                                  <Grid item container columnGap={2} rowGap={2}>
                                    <Grid item>
                                      <Button
                                        variant="contained"
                                        disableRipple
                                        className={ticketbook.addtravellerbtn}
                                        onClick={() =>
                                          Travellersdialogopen(index, 1)
                                        }
                                      >
                                        Existence Traveller
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        variant={"outlined"}
                                        className={ticketbook.savedetailsbtn}
                                        onClick={() => savedetails(index, 1)}
                                      >
                                        Save Details
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              );
                            }
                          )}
                          {/* infant */}
                          {Array.from(
                            Array(travellerscount.infant),
                            (item, index) => {
                              return (
                                <Grid
                                  item
                                  container
                                  direction="column"
                                  spacing={2}
                                  xs={12}
                                >
                                  <Grid item container spacing={1}>
                                    <Grid item mt={0.4}>
                                      <img src={traveller} alt="traveller" />
                                    </Grid>
                                    <Grid item sx={{ fontWeight: "600" }}>
                                      Infant
                                    </Grid>
                                  </Grid>

                                  <Grid item container spacing={3}>
                                    <Grid item md={4}>
                                      <ToggleButtonGroup
                                        value={infant_state[index].title}
                                        exclusive
                                        onChange={titlechange(0, index)}
                                        size="small"
                                      >
                                        <ToggleButton
                                          disableRipple
                                          value={1}
                                          sx={{
                                            padding: "0.3rem 1rem",
                                            background: "#EEF7FD",
                                            color: styles.app_color,
                                            border: "none",
                                            borderRadius: "0.5rem!important",
                                            width: "4rem",
                                            textTransform: "none",
                                            "@media (min-width:900px) and (max-width:1300px)":
                                            {
                                              width: "fit-content",
                                              padding: "0rem 0.5rem",
                                            },
                                            "@media (max-width:367px)": {
                                              width: "fit-content",
                                              padding: "0rem 0.5rem !important",
                                              marginLeft: "0.5rem!important",
                                            },
                                          }}
                                        >
                                          Mr
                                        </ToggleButton>
                                        <ToggleButton
                                          disableRipple
                                          value={2}
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Mrs
                                        </ToggleButton>
                                        <ToggleButton
                                          value={3}
                                          disableRipple
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Mstr
                                        </ToggleButton>
                                        <ToggleButton
                                          value={4}
                                          disableRipple
                                          className={ticketbook.titlebtns}
                                          sx={{ textTransform: "none" }}
                                        >
                                          Ms
                                        </ToggleButton>
                                      </ToggleButtonGroup>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                      <TextField
                                        className={classes.travelerinfo}
                                        label="*First Name"
                                        name="first_name"
                                        onChange={(e) =>
                                          handletravellersinput(e, index, 0)
                                        }
                                        value={infant_state[index].first_name}
                                        fullWidth
                                        size={"small"}
                                        InputLabelProps={{
                                          style: {
                                            color: infant_state[index]
                                              .f_name_err
                                              ? "red"
                                              : "#8F9098",
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
                                    <Grid item md={4} xs={12}>
                                      <TextField
                                        className={classes.travelerinfo}
                                        label="*Last Name"
                                        name="last_name"
                                        onChange={(e) =>
                                          handletravellersinput(e, index, 0)
                                        }
                                        value={infant_state[index].last_name}
                                        fullWidth
                                        InputLabelProps={{
                                          style: {
                                            color: infant_state[index]
                                              .l_name_err
                                              ? "red"
                                              : "#8F9098",
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
                                    <Grid item md={4} xs={12}>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                      >
                                        <MobileDatePicker
                                          inputFormat="MM/dd/yyyy"
                                          sx={{
                                            "& .MuiPickersToolbar-penIconButton":
                                            {
                                              display: "none",
                                            },
                                          }}
                                          closeOnSelect
                                          disableFuture
                                          label="Date"
                                          value={infant_state[index].dob}
                                          onChange={(newvalue) =>
                                            setInfant_state((prevdata) => {
                                              const newdata = [...prevdata];
                                              newdata[index] = {
                                                ...newdata[index],
                                                dob: newvalue,
                                              };
                                              return newdata;
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
                                                    paddingRight: "0.5rem",
                                                  }}
                                                >
                                                  *Date of Birth
                                                </span>
                                              }
                                              // value=""
                                              className={classes.travelerinfo}
                                              InputLabelProps={{
                                                style: {
                                                  color: infant_state[index]
                                                    .dob_err
                                                    ? "red"
                                                    : "#8F9098",
                                                  fontWeight: "500",
                                                },
                                              }}
                                              InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                        value={infant_state[index].gender}
                                        exclusive
                                        onChange={handleGender(0, index)}
                                        size="large"
                                        sx={{
                                          width: "100%",
                                          display: "flex",
                                          gap: "0.5rem",
                                          "& .MuiToggleButtonGroup-grouped": {
                                            flex: 1,
                                            "@media (max-width:1100px) and (min-width:900px)":
                                            {
                                              padding: "0px",
                                            },
                                          },
                                        }}
                                      >
                                        <ToggleButton
                                          value={1}
                                          sx={{
                                            // padding: "0.3rem 1.5rem",
                                            background: "#EEF7FD",
                                            color: styles.app_color,
                                            border: "none",
                                            borderRadius: "0.5rem!important",
                                            textTransform: "none",
                                            fontSize: "14px",
                                            height: "30px",
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                          sx={{
                                            textTransform: "none",
                                            fontSize: "14px",
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                          sx={{
                                            textTransform: "none",
                                            fontSize: "14px",
                                          }}
                                        >
                                          <Stack
                                            direction={"row"}
                                            spacing={0.5}
                                            alignItems={"center"}
                                          >
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
                                    {/*Passport number*/}
                                    {
                                      (selected_flight[0].IsPassportRequiredAtBook || selected_flight[0].IsPassportRequiredAtTicket) &&
                                      <>
                                        <Grid item md={4} xs={12}>
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="*Passport No"
                                            name="passport_num"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 0)
                                            }
                                            value={infant_state[index].passport_num}
                                            fullWidth
                                            InputLabelProps={{
                                              style: {
                                                color: infant_state[index].p_num_err
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
                                                infant_state[index].passport_exp
                                              } // error={adult_state[index].dob_err}
                                              // helperText={adult_state[index].dob_err ? 'dob shouldnt be empty' : ''}
                                              onChange={(newvalue) =>
                                                setInfant_state((prevdata) => {
                                                  const newdata = [...prevdata];
                                                  newdata[index] = {
                                                    ...newdata[index],
                                                    passport_exp: newvalue,
                                                  };
                                                  return newdata;
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
                                                        paddingRight: "0.5rem",
                                                      }}
                                                    >
                                                      * Passport Expiry
                                                    </span>
                                                  }
                                                  // value=""
                                                  className={classes.travelerinfo}
                                                  InputLabelProps={{
                                                    style: {
                                                      color: infant_state[index]
                                                        .p_exp_err
                                                        ? "red"
                                                        : "#8F9098",
                                                      fontWeight: "500",
                                                    },
                                                  }}
                                                  InputProps={{
                                                    readOnly: true,
                                                    startAdornment: (
                                                      <InputAdornment position="start">
                                                        {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                              sx={{
                                                "& .MuiPickersToolbar-penIconButton":
                                                {
                                                  display: "none",
                                                },
                                              }}
                                              closeOnSelect
                                              disableFuture
                                              label="passport_exp"
                                              value={
                                                infant_state[index].passport_issue
                                              }
                                              onChange={(newvalue) =>
                                                setInfant_state((prevdata) => {
                                                  const newdata = [...prevdata];
                                                  newdata[index] = {
                                                    ...newdata[index],
                                                    passport_issue: newvalue,
                                                  };
                                                  return newdata;
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
                                                        paddingRight: "0.5rem",
                                                      }}
                                                    >
                                                      * Passport Issue Date
                                                    </span>
                                                  }
                                                  // value=""
                                                  className={classes.travelerinfo}
                                                  InputLabelProps={{
                                                    style: {
                                                      color: infant_state[index]
                                                        .passport_issue_err
                                                        ? "red"
                                                        : "#8F9098",
                                                      fontWeight: "500",
                                                    },
                                                  }}
                                                  InputProps={{
                                                    readOnly: true,
                                                    startAdornment: (
                                                      <InputAdornment position="start">
                                                        {/* <CalendarMonthIcon sx={{color: styles.app_color}}/> */}
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
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="* Passport Issue Country"
                                            name="passport_issue_country"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 0)
                                            }
                                            value={
                                              infant_state[index]
                                                .passport_issue_country
                                            }
                                            fullWidth
                                            InputLabelProps={{
                                              style: {
                                                color: infant_state[index]
                                                  .passport_issue_country_err
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
                                      </>
                                    }
                                    {
                                      selected_flight[0].IsPanRequiredAtBook || selected_flight[0].IsPanRequiredAtTicket &&
                                      <>
                                        <Grid item md={4} xs={12}>
                                          <TextField
                                            className={classes.travelerinfo}
                                            label="Pan Card No "
                                            name="pan_no"
                                            onChange={(e) =>
                                              handletravellersinput(e, index, 0)
                                            }
                                            value={infant_state[index].pan_no}
                                            fullWidth
                                            InputLabelProps={{
                                              style: {
                                                color: infant_state[index]
                                                  .pan_no_err
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
                                      </>
                                    }

                                  </Grid>
                                  <Grid item container spacing={1}>

                                  </Grid>
                                  <Grid item container columnGap={2} rowGap={2}>
                                    <Grid item>
                                      <Button
                                        variant="contained"
                                        disableRipple
                                        className={ticketbook.addtravellerbtn}
                                        onClick={() =>
                                          Travellersdialogopen(index, 0)
                                        }
                                      >
                                        Existence Traveller
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        variant={"outlined"}
                                        className={ticketbook.savedetailsbtn}
                                        onClick={() => savedetails(index, 0)}
                                      >
                                        Save Details
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              );
                            }
                          )}
                          <span
                            style={{ paddingLeft: "1rem", marginTop: "1.5rem" }}
                          >
                            {" "}
                            <Divider />
                          </span>

                          <Grid item container>
                            <span
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              Booking details will sent to
                            </span>
                          </Grid>
                          <Grid
                            item
                            container
                            spacing={2}
                            ref={ticker_receivers_ref}
                          >
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
                            <Grid item md={6} xs={12}>
                              <Grid container gap={1}>
                                <Grid item width={"fit-content"}>
                                  <Button
                                    disableRipple
                                    variant="outlined"
                                    onClick={() => setCountrydialog(true)}
                                    startIcon={
                                      <img
                                        src={
                                          Object.keys(selectedcountry).length >
                                          0 && selectedcountry.country_flag
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
                                    fullWidth
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

                          <span
                            style={{ paddingLeft: "1rem", marginTop: "1.5rem" }}
                          >
                            {" "}
                            <Divider />
                          </span>
                          <Grid item Container>
                            <FormControlLabel
                              size="large"
                              label={
                                <InputLabel
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#303030",
                                    fontFamily: "Poppins",
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
                                      color:  styles.app_color,
                                    },
                                  }}
                                  checked={gstexist}
                                  onClick={() => setGstexist((prev) => !prev)}
                                />
                              }
                            />
                          </Grid>
                          {gstexist && <Grid item container spacing={1.5}>
                            <Grid item md={4} xs={12}>
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
                            <Grid item md={4} xs={12}>
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
                            <Grid item md={4} xs={12}>
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
                                      <img src={Email} alt="Email" />
                                    </InputAdornment>
                                  ),
                                }}
                                size="small"
                              />
                            </Grid>
                            <Grid item md={4} xs={12}>
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
                                      <img src={phone} alt="Phone" />
                                    </InputAdornment>
                                  ),
                                }}
                                size="small"
                              />
                            </Grid>
                            <Grid item md={4} xs={12}>
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
                                      <img src={location} alt="address" />
                                    </InputAdornment>
                                  ),
                                }}
                                size="small"
                              />
                            </Grid>
                          </Grid>}
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
                      onClick={flightseating}
                    >
                      Continue
                    </Button>
                  </div>
                ) : (
                  // Conditionally rendering the travelers insurance details on yes or no of insurance state
                  <Grid item xs={12}>
                    <Grid container mt={2} direction="column" spacing={1.5}>
                      {insurance === "yes" && (
                        <Grid container item xs={12}>
                          <Paper elevation={3} sx={{ borderRadius: "1rem" }}>
                            <Grid
                              container
                              direction={"column"}
                              p={2}
                              spacing={1}
                            >
                              <Grid item>
                                <Stack direction={"row"} spacing={1}>
                                  <img
                                    src={travelinsurance}
                                    width="1.8%"
                                    alt="travel insurance"
                                    className="bookNow_travel_icon"
                                  />
                                  <span className={ticketbook.textsize}>
                                    Travel Insurance Details
                                  </span>
                                </Stack>
                              </Grid>
                              <Grid item>
                                <span
                                  style={{ fontSize: "15px", fontWeight: 600 }}
                                >
                                  Protection your trip from COVID - 19, medical
                                  costs & more with Travel Protection from our
                                  award-winning partner Xcover.{" "}
                                </span>
                              </Grid>
                              <Grid item>
                                <Grid container spacing={1}>
                                  <Grid item md={3}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          color:  styles.app_color,
                                        }}
                                      >
                                        Refundable flight and trip costs
                                      </span>
                                    </Stack>
                                  </Grid>
                                  <Grid item md={3}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          color:  styles.app_color,
                                        }}
                                      >
                                        24/7 Emergency assistance
                                      </span>
                                    </Stack>
                                  </Grid>
                                  <Grid item md={3}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          color:  styles.app_color,
                                        }}
                                      >
                                        Delayed or missed flights
                                      </span>
                                    </Stack>
                                  </Grid>
                                  <Grid item md={3}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          color:  styles.app_color,
                                        }}
                                      >
                                        Emergency medical and dental
                                      </span>
                                    </Stack>
                                  </Grid>
                                  <Grid item md={4}>
                                    <Stack direction={"row"} spacing={1}>
                                      <img src={correct} alt="correct" />
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          color:  styles.app_color,
                                        }}
                                      >
                                        Express baggage tracking and cover
                                      </span>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      )}
                      <Grid container item xs={12}>
                        <Paper
                          elevation={3}
                          sx={{ borderRadius: "1rem", width: "100%" }}
                        >
                          <Stack direction={"row"} spacing={1} pl={2} pt={2}>
                            <img src={personblue} alt="personblue" />
                            <span style={{ color:  styles.app_color}}>
                              Traveller Details
                            </span>
                          </Stack>

                          <Grid
                            container
                            direction={{ md: "column", xs: "row" }}
                            p={2}
                            rowSpacing={1.5}
                          >
                            <Grid item md={12} xs={5.5}>
                              <Grid
                                container
                                sx={{ fontWeight: "600" }}
                                rowGap={2}
                              >
                                <Grid item md={3} xs={12}>
                                  E-mail
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  Contact Number
                                </Grid>
                                <Grid item md={2.5} xs={12}>
                                  Adult({adult_state.length})
                                </Grid>
                                <Grid item md={2.5} xs={12}>
                                  Child({child_state.length})
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  Infant({infant_state.length})
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={12} xs={6.5}>
                              <Grid container rowGap={2}>
                                <Grid item md={3} xs={12}>
                                  <Typography sx={{ wordBreak: "break-all" }}>
                                    {ticket_receiver_info.email}
                                  </Typography>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  {ticket_receiver_info.mobile}
                                </Grid>
                                <Grid item md={2.5} xs={12}>
                                  <Stack>
                                    {adult_state.length > 0 &&
                                      adult_state.map((adult, adult_index) => {
                                        return (
                                          <span key={adult_index}>
                                            {adult.first_name + adult.last_name}
                                          </span>
                                        );
                                      })}
                                  </Stack>
                                </Grid>
                                <Grid item md={2.5} xs={12}>
                                  <Stack>
                                    {child_state.length > 0 &&
                                      child_state.map((child, child_index) => {
                                        return (
                                          <span key={child_index}>
                                            {child.first_name + child.last_name}
                                          </span>
                                        );
                                      })}
                                  </Stack>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  <Stack>
                                    {infant_state.length > 0 &&
                                      infant_state.map(
                                        (infant, infant_index) => {
                                          return (
                                            <span key={infant_index}>
                                              {infant.first_name +
                                                infant.last_name}
                                            </span>
                                          );
                                        }
                                      )}
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>


                        </Paper>
                      </Grid>
                      {/* ssr api data */}
                      <Grid container item xs={12}>
                        <Paper sx={{ width: "100%" }}>
                          <TabContext value={value}>
                            <Grid container>
                              <Grid
                                sx={{
                                  backgroundColor: "#DFF3FF",
                                  width: "auto",
                                  height: "auto",
                                  margin: { md: "1rem", xs: "1rem 0rem" },
                                  borderRadius: "1rem",
                                }}
                                item
                              >
                                <TabList
                                  onChange={handleChange}
                                  className={ticketbook.seatview}
                                  aria-label="seats/meals/baggage"
                                >
                                  {trips_segmentstab.length > 0 && (
                                    <Tab label="seats" value="1" />
                                  )}
                                  {meal_dynamic.length > 0 && (
                                    <Tab label="Meals" value="2" />
                                  )}
                                  {baggage_dynamic.length > 0 && (
                                    <Tab
                                      label="Baggage"
                                      value="3"
                                      sx={{ paddingLeft: "1.3rem!important" }}
                                    />
                                  )}
                                </TabList>
                              </Grid>
                            </Grid>

                            {trips_segmentstab.length > 0 && (
                              <TabPanel value="1">
                                <TabContext value={seats_tab}>
                                  <TabList
                                    onChange={handle_seattab}
                                    className={ticketbook.seatviewtabs}
                                    variant="scrollable"
                                    orientation={"horizontal"}
                                    scrollButtons={"off"}
                                  >
                                    {
                                      trips_segmentstab.map(
                                        (stops, stop_index) => {
                                          const {
                                            AirlineCode: airline_code,
                                            Origin: origin,
                                            Destination: destination,
                                          } = stops.RowSeats[0].Seats[0];
                                          const tab_name = `${origin} - ${destination}`;
                                          return (
                                            <Tab
                                              value={stop_index}
                                              disableRipple
                                              sx={{
                                                marginLeft:
                                                  stop_index === 0
                                                    ? "0rem"
                                                    : "1rem",
                                              }}
                                              label={
                                                <Grid
                                                  container
                                                  alignItems={"center"}
                                                  spacing={0}
                                                >
                                                  <Grid item md={5}>
                                                    <img
                                                      src={`https://images.kiwi.com/airlines/64/${airline_code}.png`}
                                                      alt={airline_code}
                                                      width="40%"
                                                      height="80%"
                                                    />
                                                  </Grid>
                                                  <Grid item md={7}>
                                                    {tab_name}
                                                  </Grid>
                                                </Grid>
                                              }
                                            />
                                          );
                                        }
                                      )
                                    }
                                  </TabList>
                                  {trips_segmentstab.map((trip, trip_index) => {
                                    const {
                                      Origin: origin,
                                      Destination: destination,
                                    } = trip.RowSeats[0].Seats[0];
                                    const source = `${origin}-${destination}`;
                                    const key1 = `${origin}_${destination}`;
                                    return (
                                      <TabPanel
                                        value={trip_index}
                                        sx={{ padding: 0 }}
                                      >
                                        <div
                                          style={{
                                            backgroundColor: "#EFF9FF",
                                            padding: "1rem",
                                          }}
                                        >
                                          <Stack spacing={0.5}>
                                            <span style={{ fontWeight: "600" }}>
                                              {source}
                                            </span>
                                            <span>{`${selected_stopseats[key1] ===
                                              undefined
                                              ? 0
                                              : selected_stopseats[key1]
                                                .length
                                              } of ${totaltravellers} selected`}</span>
                                            <Divider />
                                          </Stack>
                                          <Grid container>
                                            <Grid
                                              item
                                              container
                                              md={7}
                                              direction="column"
                                              spacing={1.5}
                                              mt={{ md: 5, xs: 0 }}
                                            >
                                              <Grid item container mt={5}>
                                                <Grid
                                                  item
                                                  md={1.5}
                                                  xs={1.5}
                                                  textAlign={"center"}
                                                >
                                                  <img
                                                    src={booked_seat}
                                                    alt="blocked"
                                                    width="30%"
                                                    height="80%"
                                                  />
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={6}
                                                  xs={6}
                                                  textAlign={"left"}
                                                >
                                                  Block
                                                </Grid>
                                              </Grid>
                                              <Grid item container>
                                                <Grid
                                                  item
                                                  md={1.5}
                                                  xs={1.5}
                                                  textAlign={"center"}
                                                >
                                                  <img
                                                    src={free_seat}
                                                    alt="blocked"
                                                    width="30%"
                                                    height="80%"
                                                  />
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={6}
                                                  xs={6}
                                                  textAlign={"left"}
                                                >
                                                  Free
                                                </Grid>
                                              </Grid>
                                              <Grid item container>
                                                <Grid
                                                  item
                                                  md={1.5}
                                                  xs={1.5}
                                                  textAlign={"center"}
                                                >
                                                  <img
                                                    src={charged_seat}
                                                    alt="blocked"
                                                    width="30%"
                                                    height="80%"
                                                  />
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={6}
                                                  xs={6}
                                                  textAlign={"left"}
                                                >
                                                  Charge
                                                </Grid>
                                              </Grid>

                                              <Grid item container>
                                                <Grid
                                                  item
                                                  md={1.5}
                                                  xs={1.5}
                                                  textAlign={"center"}
                                                >
                                                  <img
                                                    src={selected_seat}
                                                    alt="blocked"
                                                    width="30%"
                                                    height="80%"
                                                  />
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={6}
                                                  xs={6}
                                                  textAlign={"left"}
                                                >
                                                  Selected
                                                </Grid>
                                              </Grid>
                                              <Grid item container>
                                                <Grid
                                                  item
                                                  md={1.5}
                                                  xs={1.5}
                                                  textAlign={"center"}
                                                >
                                                  <img
                                                    src={exitrow_seat}
                                                    alt="blocked"
                                                    width="30%"
                                                    height="80%"
                                                  />
                                                </Grid>
                                                <Grid
                                                  item
                                                  md={6}
                                                  xs={6}
                                                  textAlign={"left"}
                                                >
                                                  Exit Row
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                            {/* seat view */}
                                            <Grid item md={5}>
                                              <Stack spacing={1}>
                                                <span>
                                                  <img
                                                    src={planefrontview}
                                                    alt="planefrontview"
                                                    width="100%"
                                                    height="70%"
                                                  />
                                                </span>
                                                <Grid
                                                  sx={{
                                                    backgroundColor:
                                                      "white" /*paddingLeft:{md:'1rem',xs:'0rem'}*/,
                                                  }}
                                                >
                                                  <Grid container>
                                                    <Grid
                                                      item
                                                      xs={1}
                                                      sm={1}
                                                      md={1}
                                                    ></Grid>
                                                    <Grid
                                                      item
                                                      xs={10}
                                                      sm={10}
                                                      md={10}
                                                      container
                                                      spacing={0.2}
                                                      textAlign={"center"}
                                                    >
                                                      {Array.from(
                                                        {
                                                          length:
                                                            trips_segmentstab[
                                                              seats_tab
                                                            ].RowSeats[1].Seats
                                                              .length,
                                                        },
                                                        (_, columns) => {
                                                          // console.log(trips_segmentstab[seats_tab].RowSeats[1].Seats[columns].SeatNo)
                                                          return (
                                                            <Grid
                                                              item
                                                              xs={2}
                                                              sm={2}
                                                              md={2}
                                                            >
                                                              {
                                                                trips_segmentstab[
                                                                  seats_tab
                                                                ].RowSeats[1]
                                                                  .Seats[
                                                                  columns
                                                                ].SeatNo
                                                              }
                                                            </Grid>
                                                          );
                                                        }
                                                      )}
                                                    </Grid>
                                                  </Grid>
                                                  {Array.from(
                                                    {
                                                      length:
                                                        trips_segmentstab[
                                                          seats_tab
                                                        ].RowSeats.length,
                                                    },
                                                    (_, seat_rows) => {
                                                      // console.log(trips_segmentstab[seats_tab].RowSeats[seat_rows+1]?.Seats[0].RowNo)
                                                      let row_num =
                                                        trips_segmentstab[
                                                          seats_tab
                                                        ].RowSeats[
                                                          seat_rows + 1
                                                        ]?.Seats[0].RowNo;
                                                      return (
                                                        <Grid container mt={1}>
                                                          <Grid
                                                            item
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            textAlign={"center"}
                                                          >
                                                            {row_num !=
                                                              undefined &&
                                                              row_num}
                                                          </Grid>
                                                          <Grid
                                                            item
                                                            xs={10}
                                                            sm={10}
                                                            md={10}
                                                            container
                                                          >
                                                            {Array.from(
                                                              {
                                                                length:
                                                                  trips_segmentstab[
                                                                    seats_tab
                                                                  ].RowSeats[1]
                                                                    .Seats
                                                                    .length,
                                                              },
                                                              (
                                                                _,
                                                                seat_column
                                                              ) => {
                                                                let seat_obj =
                                                                  trips_segmentstab[
                                                                    seats_tab
                                                                  ].RowSeats[
                                                                    seat_rows +
                                                                    1
                                                                  ]?.Seats[
                                                                  seat_column
                                                                  ];
                                                                // console.log(trips_segmentstab[seats_tab].RowSeats[seat_rows+1]?.Seats[seat_column]!=undefined)
                                                                let key =
                                                                  seat_obj !==
                                                                  undefined &&
                                                                  `${seat_obj.Origin}_${seat_obj.Destination}_${seat_obj.Code}`;
                                                                return (
                                                                  seat_obj !=
                                                                  undefined && (
                                                                    <Grid
                                                                      item
                                                                      xs={2}
                                                                      sm={2}
                                                                      md={2}
                                                                      textAlign={
                                                                        "center"
                                                                      }
                                                                      key={key}
                                                                    >
                                                                      <button
                                                                        style={{
                                                                          border:
                                                                            "none",
                                                                          background:
                                                                            "none",
                                                                        }}
                                                                        onClick={(
                                                                          event
                                                                        ) =>
                                                                          seat_selection(
                                                                            seat_obj
                                                                          )
                                                                        }
                                                                        disabled={
                                                                          seat_obj?.AvailablityType ===
                                                                            3
                                                                            ? true
                                                                            : false
                                                                        }
                                                                      >
                                                                        <div
                                                                          style={{
                                                                            height:
                                                                              "20px",
                                                                            width:
                                                                              "20px",
                                                                            borderRadius:
                                                                              "5px",
                                                                            backgroundColor:
                                                                              seat_obj?.AvailablityType ===
                                                                                3
                                                                                ? "#909090"
                                                                                : seat_obj?.AvailablityType ===
                                                                                  1 &&
                                                                                  seat_obj?.Price ===
                                                                                  0
                                                                                  ? "#BADAFF"
                                                                                  : seat_obj?.AvailablityType ===
                                                                                    1 &&
                                                                                    exit_rowseats.includes(
                                                                                      seat_obj?.SeatType
                                                                                    )
                                                                                    ? "#EE4423"
                                                                                    : seat_obj?.AvailablityType ===
                                                                                    1 &&
                                                                                    seat_obj?.Price !=
                                                                                    0 &&
                                                                                    "#00B796",
                                                                          }}
                                                                          className={
                                                                            selected_seat_codes.includes(
                                                                              key
                                                                            )
                                                                              ? ticketbook.seat_blue
                                                                              : ""
                                                                          }
                                                                          id={`${seat_obj.Origin}_${seat_obj.Destination}_${seat_obj.Code}`}
                                                                        ></div>
                                                                      </button>
                                                                    </Grid>
                                                                  )
                                                                );
                                                              }
                                                            )}
                                                          </Grid>
                                                          <Grid
                                                            item
                                                            xs={1}
                                                            sm={1}
                                                            md={1}
                                                            textAlign={"cenetr"}
                                                          >
                                                            {row_num !=
                                                              undefined &&
                                                              row_num}
                                                          </Grid>
                                                        </Grid>
                                                      );
                                                    }
                                                  )}
                                                </Grid>
                                                <img
                                                  src={planebackview}
                                                  alt="planebackview"
                                                  width="100%"
                                                  height="70%"
                                                />
                                              </Stack>
                                            </Grid>
                                          </Grid>
                                        </div>
                                      </TabPanel>
                                    );
                                  })}
                                </TabContext>
                              </TabPanel>
                            )}
                            {/* Meal Container */}
                            {meal_dynamic.length > 0 && (
                              <TabPanel value="2">
                                <TabContext value={meals_tab}>
                                  <TabList
                                    onChange={handle_mealtab}
                                    className={ticketbook.seatviewtabs}
                                  >
                                    {meal_dynamic.length > 0 &&
                                      meal_dynamic.map((meal, meal_index) => {
                                        // console.log(meal, "meal");
                                        const airline_code =
                                          meal[0].AirlineCode;
                                        const tab_name = `${meal[0].Origin}-${meal[0].Destination}`;
                                        return (
                                          <Tab
                                            value={meal_index}
                                            sx={{
                                              marginLeft:
                                                meal_index === 0
                                                  ? "0rem"
                                                  : "1rem",
                                            }}
                                            label={
                                              <Grid
                                                container
                                                alignItems={"center"}
                                                spacing={0}
                                              >
                                                <Grid item md={5}>
                                                  <img
                                                    src={`https://images.kiwi.com/airlines/64/${airline_code}.png`}
                                                    alt={airline_code}
                                                    width="40%"
                                                    height="80%"
                                                  />
                                                </Grid>
                                                <Grid item md={7}>
                                                  {tab_name}
                                                </Grid>
                                              </Grid>
                                            }
                                            disableRipple
                                          />
                                        );
                                      })}
                                  </TabList>
                                  {meal_dynamic.length > 0 &&
                                    meal_dynamic.map((meal, meal_index) => {
                                      const city_key = `${meal[0]?.Origin}_${meal[0]?.Destination}`;
                                      return (
                                        <TabPanel
                                          value={meal_index}
                                          sx={{
                                            padding: { md: "24px", xs: "0px" },
                                          }}
                                        >
                                          <Grid sx={{ ...BaggageContainer }}>
                                            <Grid
                                              sx={{
                                                ...BaggageInnerContainer,
                                                padding: {
                                                  md: "32px",
                                                  xs: "0px",
                                                },
                                              }}
                                            >
                                              <Typography
                                                sx={{ ...TitleContainer }}
                                              >{`${meal[1]?.Origin}-${meal[1]?.Destination}`}</Typography>
                                              <Typography
                                                sx={{ ...SelectedCount }}
                                              >
                                                {total_meals_selected[
                                                  city_key
                                                ] === undefined
                                                  ? 0
                                                  : total_meals_selected[
                                                  city_key
                                                  ]}{" "}
                                                of {totaltravellers} Selected
                                              </Typography>
                                              <Grid>
                                                <Grid
                                                  sx={{
                                                    width: "100%",
                                                    backgroundColor: "#ffffff",
                                                  }}
                                                >
                                                  <Grid>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 500,
                                                        padding: "10px",
                                                      }}
                                                    >
                                                      Add Meals
                                                    </Typography>
                                                  </Grid>

                                                  {meal &&
                                                    meal.length > 1 &&
                                                    meal.slice(1).map((x) => {
                                                      const city_key = `${x.Origin}_${x.Destination}`;
                                                      const meal_key = x.Code;

                                                      return (
                                                        <Grid
                                                          sx={{
                                                            ...BaggageSelector,
                                                          }}
                                                        >
                                                          <Grid
                                                            container
                                                            sx={{ ...innerDiv }}
                                                          >
                                                            <Grid
                                                              sx={{
                                                                width: "100%",
                                                                display: "flex",
                                                                padding: "10px",
                                                                justifyContent:
                                                                  "space-between",
                                                              }}
                                                            >
                                                              <Grid
                                                                sx={{
                                                                  display:
                                                                    "flex",
                                                                }}
                                                              >
                                                                <Box
                                                                  component="img"
                                                                  sx={{
                                                                    height: 50,
                                                                    width: 50,
                                                                    borderRadius:
                                                                      "10px",
                                                                  }}
                                                                  alt="The house from the offer."
                                                                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
                                                                />
                                                                <Grid
                                                                  sx={{
                                                                    paddingLeft:
                                                                      "4px",
                                                                  }}
                                                                >
                                                                  <Grid
                                                                    sx={{
                                                                      display:
                                                                        "flex",
                                                                    }}
                                                                  >
                                                                    <Grid
                                                                      sx={{
                                                                        padding:
                                                                          "0px 4px 0px 0px",
                                                                      }}
                                                                    >
                                                                      <img
                                                                        src={
                                                                          Nonveg
                                                                        }
                                                                        alt={
                                                                          Nonveg
                                                                        }
                                                                      />
                                                                    </Grid>
                                                                    <Typography
                                                                      sx={{
                                                                        paddingBottom:
                                                                          "5px",
                                                                        fontSize:
                                                                        {
                                                                          md: "14px",
                                                                          xs: "8px",
                                                                        },
                                                                        color:
                                                                        styles.app_color,
                                                                        fontFamily:
                                                                          "Poppins",
                                                                      }}
                                                                    >
                                                                      {
                                                                        x.AirlineDescription
                                                                      }
                                                                    </Typography>
                                                                  </Grid>
                                                                  <Typography
                                                                    sx={{
                                                                      fontSize:
                                                                      {
                                                                        md: "14px",
                                                                        xs: "8px",
                                                                      },
                                                                      color:
                                                                      styles.app_color,
                                                                      fontFamily:
                                                                        "Poppins",
                                                                    }}
                                                                  >
                                                                    {
                                                                      x.AirlineDescription
                                                                    }
                                                                  </Typography>
                                                                </Grid>
                                                              </Grid>
                                                              <Grid>
                                                                <Typography
                                                                  sx={{
                                                                    fontSize:
                                                                      "14px",
                                                                    color:
                                                                    styles.app_color,
                                                                    textAlign:
                                                                      "center",
                                                                    fontFamily:
                                                                      "Poppins",
                                                                  }}
                                                                >
                                                                  ₹ {x.Price}
                                                                </Typography>
                                                                <Grid
                                                                  sx={{
                                                                    display:
                                                                      "flex",
                                                                    padding:
                                                                      "0px 10px",
                                                                  }}
                                                                >
                                                                  <Grid
                                                                    sx={{
                                                                      padding:
                                                                        "3px",
                                                                    }}
                                                                  >
                                                                    <button
                                                                      style={{
                                                                        fontSize:
                                                                          "17px",
                                                                        border:
                                                                          "none",
                                                                        backgroundColor:
                                                                          "#DFF3FF",
                                                                        borderRadius:
                                                                          "0.3rem",
                                                                        fontFamily:
                                                                          "Poppins",
                                                                      }}
                                                                      onClick={() =>
                                                                        meals_deselection(
                                                                          x
                                                                        )
                                                                      }
                                                                    >
                                                                      &#8722;
                                                                    </button>
                                                                  </Grid>
                                                                  <Grid
                                                                    item
                                                                    sx={{
                                                                      padding:
                                                                        "3px",
                                                                    }}
                                                                  >
                                                                    {selectedMeals.hasOwnProperty(
                                                                      city_key
                                                                    ) &&
                                                                      selectedMeals[
                                                                      city_key
                                                                      ] !==
                                                                      undefined
                                                                      ? selectedMeals[
                                                                        city_key
                                                                      ].hasOwnProperty(
                                                                        meal_key
                                                                      ) &&
                                                                        selectedMeals[
                                                                        city_key
                                                                        ][
                                                                        meal_key
                                                                        ] !==
                                                                        undefined
                                                                        ? selectedMeals[
                                                                          city_key
                                                                        ][
                                                                          meal_key
                                                                        ].length
                                                                          .toString()
                                                                          .padStart(
                                                                            2,
                                                                            "0"
                                                                          )
                                                                        : "00"
                                                                      : "00"}
                                                                  </Grid>
                                                                  <Grid
                                                                    item
                                                                    sx={{
                                                                      padding:
                                                                        "3px",
                                                                    }}
                                                                  >
                                                                    <button
                                                                      style={{
                                                                        fontSize:
                                                                          "16px",
                                                                        border:
                                                                          "none",
                                                                        color:
                                                                          "#fff",
                                                                        backgroundColor:
                                                                        styles.app_color,
                                                                        borderRadius:
                                                                          "0.3rem",
                                                                        fontFamily:
                                                                          "Poppins",
                                                                      }}
                                                                      onClick={() =>
                                                                        meals_addon(
                                                                          x
                                                                        )
                                                                      }
                                                                    >
                                                                      &#43;
                                                                    </button>
                                                                  </Grid>
                                                                </Grid>
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      );
                                                    })}
                                                </Grid>
                                              </Grid>
                                              <Grid sx={{ ...FooterInfo }}>
                                                <Typography
                                                  sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    maxWidth: "80%",
                                                    fontFamily: "Poppins",
                                                  }}
                                                >
                                                  Selected{" "}
                                                  {/* {console.log(selectedMeals[city_key],"selected meals")} */}
                                                  {Object.keys(selectedMeals)
                                                    .length > 0 &&
                                                    Object.keys(
                                                      selectedMeals[city_key] ||
                                                      {}
                                                    ).length > 0 &&
                                                    selectedMeals[city_key] !==
                                                    undefined &&
                                                    Object.keys(
                                                      selectedMeals[city_key]
                                                    )
                                                      .map((meal) => {
                                                        if (
                                                          selectedMeals[
                                                            city_key
                                                          ][meal][0]
                                                            ?.AirlineDescription
                                                        ) {
                                                          return selectedMeals[
                                                            city_key
                                                          ][meal][0]
                                                            ?.AirlineDescription;
                                                        }
                                                        return null;
                                                      })
                                                      .filter(
                                                        (desc) => desc !== null
                                                      )
                                                      .join(", ")}{" "}
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    marginLeft: "50px",
                                                    fontFamily: "Poppins",
                                                  }}
                                                >
                                                  ₹ {total_meal_price}.00
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </TabPanel>
                                      );
                                    })}
                                </TabContext>
                              </TabPanel>
                            )}
                            {/* Baggage Container */}
                            {baggage_dynamic.length > 0 && (
                              <TabPanel value="3">
                                <TabContext value={baggage_tab}>
                                  <TabList
                                    onChange={handle_baggagetab}
                                    className={ticketbook.seatviewtabs}
                                  >
                                    {baggage_dynamic.map(
                                      (baggage, bag_index) => {
                                        const airline_code =
                                          baggage[0].AirlineCode;
                                        const tab_name = `${baggage[0].Origin}-${baggage[0].Destination}`;
                                        return (
                                          <Tab
                                            value={bag_index}
                                            sx={{
                                              marginLeft:
                                                bag_index === 0
                                                  ? "0rem"
                                                  : "1rem",
                                            }}
                                            label={
                                              <Grid
                                                container
                                                alignItems={"center"}
                                                spacing={0}
                                              >
                                                <Grid item md={5}>
                                                  <img
                                                    src={`https://images.kiwi.com/airlines/64/${airline_code}.png`}
                                                    alt={airline_code}
                                                    width="40%"
                                                    height="80%"
                                                  />
                                                </Grid>
                                                <Grid item md={7}>
                                                  {tab_name}
                                                </Grid>
                                              </Grid>
                                            }
                                          />
                                        );
                                      }
                                    )}
                                  </TabList>
                                  {baggage_dynamic.length > 0 &&
                                    baggage_dynamic.map((bag, bag_index) => {
                                      const city_key = `${bag[0]?.Origin}_${bag[0]?.Destination}`;
                                      return (
                                        <TabPanel
                                          value={bag_index}
                                          sx={{
                                            padding: { md: "24px", xs: "0px" },
                                          }}
                                        >
                                          <Grid sx={{ ...BaggageContainer }}>
                                            <Grid
                                              sx={{
                                                ...BaggageInnerContainer,
                                                padding: {
                                                  md: "24px",
                                                  xs: "0px",
                                                },
                                              }}
                                            >
                                              <Typography
                                                sx={{ ...TitleContainer }}
                                              >{`${bag[1]?.Origin}-${bag[1]?.Destination}`}</Typography>
                                              <Typography
                                                sx={{ ...SelectedCount }}
                                              >
                                                {total_bags_selected[
                                                  city_key
                                                ] === undefined
                                                  ? 0
                                                  : total_bags_selected[
                                                  city_key
                                                  ]}{" "}
                                                of {totaltravellers} Selected
                                              </Typography>
                                              <Grid>
                                                <Grid
                                                  sx={{
                                                    width: "100%",
                                                    backgroundColor: "#ffffff",
                                                  }}
                                                >
                                                  <Grid>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 500,
                                                        padding: "10px",
                                                        fontFamily: "Poppins",
                                                      }}
                                                    >
                                                      Add Baggage
                                                    </Typography>
                                                  </Grid>
                                                  {bag &&
                                                    bag.length > 1 &&
                                                    bag.slice(1).map((x) => {
                                                      const city_key = `${x.Origin}_${x.Destination}`;
                                                      const bag_key = `${x.Weight}kg`;
                                                      return (
                                                        <Grid
                                                          sx={{
                                                            ...BaggageSelector,
                                                          }}
                                                        >
                                                          <Grid
                                                            container
                                                            sx={{ ...innerDiv }}
                                                          >
                                                            <Grid
                                                              sx={{
                                                                width: "100%",
                                                                display: "flex",
                                                                padding: "10px",
                                                                justifyContent:
                                                                  "space-between",
                                                              }}
                                                            >
                                                              <Grid
                                                                sx={{
                                                                  display:
                                                                    "flex",
                                                                }}
                                                              >
                                                                <Box
                                                                  component="img"
                                                                  sx={{
                                                                    height: 50,
                                                                    width: 50,
                                                                    borderRadius:
                                                                      "10px",
                                                                  }}
                                                                  alt="The house from the offer."
                                                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSln_yzv_ORXKSkBcG3y5Al6cDgIOwOPq4NhQ&usqp=CAU"
                                                                />
                                                                <Grid
                                                                  sx={{
                                                                    paddingLeft:
                                                                      "4px",
                                                                  }}
                                                                >
                                                                  <Typography
                                                                    sx={{
                                                                      paddingBottom:
                                                                        "5px",
                                                                      fontSize:
                                                                        "14px",
                                                                      color:
                                                                      styles.app_color,
                                                                      fontFamily:
                                                                        "Poppins",
                                                                    }}
                                                                  >
                                                                    Additional{" "}
                                                                    {x.Weight}kg
                                                                  </Typography>
                                                                  <Typography
                                                                    sx={{
                                                                      fontSize:
                                                                        "14px",
                                                                      color:
                                                                      styles.app_color,
                                                                      fontFamily:
                                                                        "Poppins",
                                                                    }}
                                                                  >
                                                                    ₹ {x.Price}
                                                                  </Typography>
                                                                </Grid>
                                                              </Grid>
                                                              <Grid
                                                                sx={{
                                                                  display:
                                                                    "flex",
                                                                  padding:
                                                                    "10px",
                                                                }}
                                                              >
                                                                <Grid
                                                                  sx={{
                                                                    padding:
                                                                      "3px",
                                                                  }}
                                                                >
                                                                  <button
                                                                    style={{
                                                                      fontSize:
                                                                        "17px",
                                                                      border:
                                                                        "none",
                                                                      backgroundColor:
                                                                        "#DFF3FF",
                                                                      borderRadius:
                                                                        "0.3rem",
                                                                      fontFamily:
                                                                        "Poppins",
                                                                    }}
                                                                    onClick={() =>
                                                                      baggageremoving(
                                                                        x
                                                                      )
                                                                    }
                                                                  >
                                                                    &#8722;
                                                                  </button>
                                                                </Grid>
                                                                <Grid
                                                                  item
                                                                  sx={{
                                                                    padding:
                                                                      "3px",
                                                                  }}
                                                                >
                                                                  {selectedBaggage.hasOwnProperty(
                                                                    city_key
                                                                  ) &&
                                                                    selectedBaggage[
                                                                    city_key
                                                                    ] !==
                                                                    undefined
                                                                    ? selectedBaggage[
                                                                      city_key
                                                                    ].hasOwnProperty(
                                                                      bag_key
                                                                    ) &&
                                                                      selectedBaggage[
                                                                      city_key
                                                                      ][
                                                                      bag_key
                                                                      ] !==
                                                                      undefined
                                                                      ? selectedBaggage[
                                                                        city_key
                                                                      ][
                                                                        bag_key
                                                                      ].length
                                                                        .toString()
                                                                        .padStart(
                                                                          2,
                                                                          "0"
                                                                        )
                                                                      : "00"
                                                                    : "00"}
                                                                </Grid>
                                                                <Grid
                                                                  item
                                                                  sx={{
                                                                    padding:
                                                                      "3px",
                                                                  }}
                                                                >
                                                                  <button
                                                                    style={{
                                                                      fontSize:
                                                                        "16px",
                                                                      border:
                                                                        "none",
                                                                      color:
                                                                        "#fff",
                                                                      backgroundColor:
                                                                      styles.app_color,
                                                                      borderRadius:
                                                                        "0.3rem",
                                                                      fontFamily:
                                                                        "Poppins",
                                                                    }}
                                                                    onClick={() =>
                                                                      baggageadding(
                                                                        x
                                                                      )
                                                                    }
                                                                  >
                                                                    &#43;
                                                                  </button>
                                                                </Grid>
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      );
                                                    })}
                                                  {/* {baggageList} */}
                                                  {/* {JSON.stringify(ticket,null,2)} */}
                                                </Grid>
                                              </Grid>
                                              <Grid sx={{ ...FooterInfo }}>
                                                <Typography
                                                  sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    fontFamily: "Poppins",
                                                  }}
                                                >
                                                  Selected additional bag{" "}
                                                  {Object.keys(selectedBaggage)
                                                    .length > 0 &&
                                                    Object.keys(
                                                      selectedBaggage[
                                                      city_key
                                                      ] || {}
                                                    ).length > 0 &&
                                                    Object.keys(
                                                      selectedBaggage[city_key]
                                                    )
                                                      .map((key) => {
                                                        if (
                                                          selectedBaggage[
                                                            city_key
                                                          ][key].length > 0
                                                        ) {
                                                          return key;
                                                        }
                                                        return null;
                                                      })
                                                      .filter(
                                                        (key) => key !== null
                                                      )
                                                      .join(",")}
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    fontFamily: "Poppins",
                                                  }}
                                                >
                                                  ₹{" "}
                                                  {`${toatal_baggage_price}.00`}
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </TabPanel>
                                      );
                                    })}
                                </TabContext>
                              </TabPanel>
                            )}
                          </TabContext>
                        </Paper>
                      </Grid>
                      <Grid item container>
                        <Grid item md={3} xs={1} sm={2}>
                          <Button
                            disableRipple
                            variant="contained"
                            className={ticketbook.nextbtn}
                            fullWidth
                            onClick={handlessrdata}
                            sx={{
                              marginBottom: "20px",
                            }}
                          >
                            Next
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>

              {/* offers content */}
              <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
                <Grid container direction={"column"} mt={"29px"} spacing={2}>
                  <Grid item>
                    <Paper
                      sx={{ padding: "1rem", borderRadius: "1rem" }}
                      elevation={3}
                    >
                      <Grid container direction={"column"} spacing={1.5}>
                        <Grid item>
                          <h3 className={ticketbook.completebookings}>
                            Fare summary
                          </h3>
                        </Grid>
                        <Grid item>
                          <Grid container>
                            <Grid item xs={4}>
                              Base fare
                            </Grid>
                            <Grid item container xs={8} textAlign={"right"}>
                              {selected_flight[0]?.FareBreakdown.map(
                                (flight, flight_index) => {
                                  return (
                                    <>
                                      <Grid item md={6}>{`${flight?.PassengerCount
                                        }*${flight?.PassengerType === 1
                                          ? "Adult"
                                          : flight?.PassengerType === 2
                                            ? "Child"
                                            : flight?.PassengerType === 3 &&
                                            "Infant"
                                        }`}</Grid>
                                      {console.log(
                                        infant_basefare,
                                        "infant basefare"
                                      )}
                                      <Grid item md={6}>{`${flight?.Currency} ${flight?.PassengerType === 1
                                        ? Number(
                                          adult_basefare
                                        ).toLocaleString()
                                        : flight?.PassengerType === 2
                                          ? Number(
                                            child_basefare
                                          ).toLocaleString()
                                          : flight?.PassengerType === 3 &&
                                          Number(
                                            infant_basefare
                                          ).toLocaleString()
                                        }`}</Grid>
                                    </>
                                  );
                                }
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider />
                        <Grid item>
                          <Grid container>
                            <Grid item xs={6}>
                              Fee & Surcharges
                            </Grid>
                            <Grid item xs={6} textAlign={"right"}>
                              {`${selected_flight[0].Fare.Currency} ${Number(
                                taxes
                              ).toLocaleString()}`}
                            </Grid>
                          </Grid>
                        </Grid>

                        {othercharges > 0 && (
                          <>
                            <Divider />
                            <Grid item>
                              <Grid container>
                                <Grid item xs={6}>
                                  Other Charges
                                </Grid>
                                <Grid item xs={6} textAlign={"right"}>
                                  {`${selected_flight[0].Fare.Currency} ${othercharges}`}
                                </Grid>
                              </Grid>
                            </Grid>
                          </>
                        )}
                        {seats_price > 0 && (
                          <>
                            <Divider />
                            <Grid item>
                              <Grid container>
                                <Grid item xs={6}>
                                  Seats
                                </Grid>
                                <Grid item xs={6} textAlign={"right"}>
                                  {`${selected_flight[0].Fare.Currency} ${seats_price}`}
                                </Grid>
                              </Grid>
                            </Grid>
                          </>
                        )}
                        {toatal_baggage_price > 0 && (
                          <>
                            <Divider />
                            <Grid item>
                              <Grid container>
                                <Grid item xs={6}>
                                  Baggage
                                </Grid>
                                <Grid item xs={6} textAlign={"right"}>
                                  {`${selected_flight[0].Fare.Currency} ${toatal_baggage_price}`}
                                </Grid>
                              </Grid>
                            </Grid>
                          </>
                        )}
                        {total_meal_price > 0 && (
                          <>
                            <Divider />
                            <Grid item>
                              <Grid container>
                                <Grid item xs={6}>
                                  Meals
                                </Grid>
                                <Grid item xs={6} textAlign={"right"}>
                                  {`${selected_flight[0].Fare.Currency} ${total_meal_price}`}
                                </Grid>
                              </Grid>
                            </Grid>
                          </>
                        )}
                        <>
                          <Divider />
                          <Grid item>
                            <Grid container>
                              <Grid item xs={6}>
                                GMT fee
                              </Grid>
                              <Grid item xs={6} textAlign={"right"}>
                                {`${selected_flight[0].Fare.Currency} ${gmt_fee}`}
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                        {prices.discount > 0 && (
                          <>
                            <Divider />
                            <Grid item>
                              <Grid container justifyContent={"space-between"}>
                                <Grid item>Total Discount</Grid>
                                <Grid item sx={{ color: "#3F8CFF" }}>
                                  <Stack>
                                    <span>{`- ${selected_flight[0].Fare.Currency
                                      } ${Number(
                                        prices.discount
                                      ).toLocaleString()}`}</span>
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
                          </>
                        )}
                        <Divider />
                        <Grid item>
                          <Grid container sx={{ color:  styles.app_color }}>
                            <Grid item xs={6}>
                              <span className={ticketbook.totalamount}>
                                Total Amount
                              </span>
                            </Grid>
                            <Grid item xs={6} textAlign={"right"}>
                              {`${selected_flight[0].Fare.Currency} ${Number(
                                adult_basefare +
                                child_basefare +
                                infant_basefare +
                                taxes +
                                othercharges +
                                seats_price +
                                total_meal_price +
                                toatal_baggage_price +
                                gmt_fee -
                                prices.discount
                              ).toLocaleString()}`}
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
                        baseprice:
                          adult_basefare +
                          child_basefare +
                          infant_basefare +
                          taxes,
                        count:
                          travellerscount.adult +
                          travellerscount.child +
                          travellerscount.infant,
                      }}
                      all_prices={prices}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      ) : (
        <h1>loading....</h1>
      )}
    </>
  );
};

export default FlightBooking;
