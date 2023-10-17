import {
  Avatar,
  Button,
  Container,
  Grid,
  Box,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Stack,
  IconButton,
  Rating,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButtonGroup,
  ToggleButton,
  Dialog, Tooltip
} from "@mui/material";
import { convertDateFormat, getTimeDifferenceBtTwoDates, convertArrayToTable } from './BusModuleHelperFunctions'
import React, { useEffect, useState } from "react";
import { buslist } from "../../../assets/styles/Buslist.jsx";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchBuses from "../../modals/SearchBuses";
import {
  hotelsearch,
  muitextfieldborder,
} from "../../../assets/styles/BusesStyles";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import calendermonth from "../../../assets/Hotelimages/calendericon.svg";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import {
  gomainpage,
  aftersearchflights, filters, aftersearch
} from "../../../assets/styles/Flights.jsx";
import userImage from "../../../../src/assets/images/UserAvatar.png";
// import availableSeat from "../../../assets/BusesAssets/busAvailableSeat.png";
import availableSeat from "../../../assets/BusesAssets/busAvailableSeat.svg";
import not_found from "../../../assets/BusesAssets/not_found.png";
// import busGirlsSeat from "../../../assets/BusesAssets/busGirlsSeat.png";
import busGirlsSeat from "../../../assets/BusesAssets/busGirlsSeat.svg";
// import goBusBookedSeat from "../../../assets/BusesAssets/goBusBookedSeat.png";
import goBusBookedSeat from "../../../assets/BusesAssets/goBusBookedSeat.svg";
// import goBusSelectedSeat from "../../../assets/BusesAssets/goBusSelectedSeat.png";
import goBusSelectedSeat from "../../../assets/BusesAssets/goBusSelectedSeat.svg";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import helperFunctions from "../../../helpers/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import BusesPageBackDrop from "./BusesPageBackDrop.jsx";
import { useSnackbar } from "notistack";
import { BusSearchResultSliceActions } from "../../../store/BusModuleSlices/BusSearchResultSlice";
import swap from "../../../assets/images/swapicon.svg";
import CircularProgress from '@mui/material/CircularProgress';
import goBusSleeper from '../../../assets/BusesAssets/goBusSleeper.svg'
import goBusSleeperWomenBooked from '../../../assets/BusesAssets/goBusSleeperWomen.svg'
import goBusSleeperBooked from '../../../assets/BusesAssets/goBusSleeperBooked.svg'
import busSeatBooked from '../../../assets/BusesAssets/busSeatBooked.svg'
import busSeatWomenBooked from '../../../assets/BusesAssets/busSeatWomen.svg'
import {styles} from '../../../assets/styles/Styles_export'
import goBusSleeperWomenA from '../../../assets/BusesAssets/goBusSleeperWomenA.svg'
import busSeatWomenA from '../../../assets/BusesAssets/busSeatWomenA.svg'
import womenAvailDisplaySeat from '../../../assets/BusesAssets/womenAvailDisplaySeat.svg'


import goBusSeat from '../../../assets/BusesAssets/busSeat.svg'
import busStering from '../../../assets/BusesAssets/busStering.png'
import busExitInd from '../../../assets/BusesAssets/busExitInd.png'
import axios from "axios";
import backIcon from "../../../assets/images/backIcon.png";
import filterIcon from "../../../assets/images/filterIcon.svg";
import editIcon from "../../../assets/images/editIcon.svg";
import busFromLocIcon from "../../../assets/BusesAssets/busFromLocIcon.svg";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Skeleton from '@mui/material/Skeleton';
import AdjustIcon from '@mui/icons-material/Adjust';
import LivingOutlinedIcon from '@mui/icons-material/LivingOutlined';
import gomytripclient from "../../../GomytripClient";


const BusesSearchList = () => {

  const gomainpag = gomainpage();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const userSessionDetails = localStorage.getItem("userid");
  const location = useLocation();
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [searchResultData, setSearchResultData] = useState([]);
  const getTheSerchedResult = useSelector((state) => state.busessearch);
  const aftersearc = aftersearch();
  const filterstyles = filters();
  const buslistStyles = buslist();
  const HotMainpg = hotelsearch();
  const inputborder = muitextfieldborder();
  //**Reat variabes */
  const aftersearchflight = aftersearchflights();
  const [activeTab, setActiveTab] = useState("1");
  //----------------------------------_REVIEWS STATE
  const [operatorReviews, setOperatorReviews] = useState([])
  const handleBusTabChange = (event, selectedTabValue) => {
    setActiveTab(selectedTabValue);
  };
  const busDateSelectRef = React.useRef(null);
  const [searchDate, setSearchDate] = useState(new Date());
  const [disableCalendar, setDisableCalendar] = useState(false);
  const [dfilter, setDfilter] = useState(false)
  const [search, setSearch] = useState(false);
  const [bussearch, setBussearch] = useState(false)
  const [sources, setSources] = useState("");
  const [from, setFrom] = React.useState({
    airport_code: "BPM",
    airport_name: "Begumpet Airport",
    city_code: "BPM",
    city_name: "Hyderabad",
    country_code: "IN ",
  });
  const [to, setTo] = React.useState({
    airport_code: "DEL",
    airport_name: "Indira Gandhi Airport",
    city_code: "DEL",
    city_name: "Delhi",
    country_code: "IN ",
  });
  // searrch trace iD
  const [traceId, setTraceId] = useState("");
  const [accordianExpandArray, setAccordianExpandArray] = useState('');//[]
  // PricesFilter
  const [distintPrices, setDistintPrices] = useState([])
  const [userSelectedPriceFilter, setUserSelectedPriceFilter] = useState('')
  // ----------------------------------
  const [allSelectedFilters, setAllSelectedFilters] = useState([])
  // **FILTERING OPERATORS
  const [travelOperators, setTravelOperators] = useState([]);
  const [userSelectedOperators, setUserSelectedOperators] = useState([]);
  const [busFilterType, setBusFilterType] = useState([
    "A/C",
    "Seater",
    "Sleeper",
    "Non A/C",
  ]);
  const [userSelctedFilters, setUserSelctedFilters] = useState([]);
  const [priceFilter, setPriceFilter] = useState(0);
  const departureTimes = [6, 12, 18, 0]
  const [userSelectedDepature, setUserSelectedDepature] = useState([]);
  // console.log(userSelectedDepature,'userSelectedDepature')
  const searchsources = (type) => {
    setSearch(true);
    setSources(type);
  };
  // typeOfpoint ===1  boardingPoint----  2 ---setDropPoint
  const handleLocationPick = (item, typeOfpoint, searchesBusObjId) => {
    const newSearchData = [...searchResultData];
    const selectedObj = newSearchData[searchesBusObjId];
    Object.preventExtensions(selectedObj);
    const locModObj = {
      ...selectedObj,
      ...(typeOfpoint === 1
        ? { selectedBoardPoint: item }
        : { selectedDropPoint: item }),
    };
    newSearchData[searchesBusObjId] = locModObj;
    setSearchResultData(newSearchData);
  };
  const handleCalenderInputClick = () => {
    setDisableCalendar(false);
  };

  const handleTodayMouseDown = (event) => {
    event.preventDefault();
    const today = new Date();
    setSearchDate(today);
    setDisableCalendar(true);
  };

  const handleTomorrowMouseDown = (event) => {
    event.preventDefault();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setSearchDate(tomorrow);
    setDisableCalendar(true);
  };
  const selected_buses = (bus, val) => {
    if (val == 1) {
      setFrom(bus);
    } else if (val == 2) {
      setTo(bus);
    }
  };
  useEffect(() => {
    setFrom(getTheSerchedResult.userSearchedFor.fromDest);
    setTo(getTheSerchedResult.userSearchedFor.toDest);
    setSearchDate(getTheSerchedResult.userSearchedFor.selectedDate);
    setSearchResultData(getTheSerchedResult.busSearchResult);
    setTraceId(getTheSerchedResult.traceId);

    if (getTheSerchedResult?.busSearchResult?.length > 0) {
      let singleOperators = Array.from(
        new Set(getTheSerchedResult?.busSearchResult.map((item) => item.TravelName))
      );
      setTravelOperators(singleOperators);
    }
  }, [getTheSerchedResult]);

  //-----------------------------------MOVE TO TOP OF THE COMPONENT WHEN SCREEN LOADS
  useEffect(() => {
    //-----------------------------------MOVE TO TOP OF THE COMPONENT WHEN SCREEN LOADS
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [])



  const handleaccordionexpand =
    (accordianResultIndex, searchBusObj, objIndex) => (event, isExpanded) => {
      // setAccordianExpandArray(
      //   isExpanded
      //     ? [...accordianExpandArray, accordianResultIndex]
      //     : accordianExpandArray.filter((Data) => Data != accordianResultIndex)
      // );
      setAccordianExpandArray(isExpanded ? accordianResultIndex : '')
      handleSeatsPricesFilter('')
      if (isExpanded && !searchBusObj.hasOwnProperty("SeatLayout")) {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/busSeatLayout`, {
            traceId: traceId,
            resultIndex: accordianResultIndex,
          })
          .then((seatLayres) => {
            if (
              seatLayres?.status === 200 &&
              seatLayres?.data?.status === 1 &&
              seatLayres?.data?.data?.SeatLayout.SeatDetails?.length > 0
            ) {
              //_______________________________THIS IS BOARDING POINTS API AND DROP POINTS 
              axios.post(`${process.env.REACT_APP_BASEURL}/busBoardingDetails`, {
                traceId: traceId,
                resultIndex: accordianResultIndex,
              }).then((pointsRes) => {

                if (
                  pointsRes?.status === 200 &&
                  pointsRes?.data?.status === 1 &&
                  pointsRes?.data?.data?.BoardingPointsDetails?.length > 0 &&
                  pointsRes?.data?.data?.DroppingPointsDetails?.length > 0
                ) {
                  const insertSeatSelectionArray = searchResultData.map((seatMap) => {

                    const onlyLowerArrayObj = []
                    const onlyUpperArrayObj = []

                    const upperArrayDeck = separateArrays(seatLayres?.data?.data?.SeatLayout?.SeatDetails, 0);
                    const lowerArrayDeck = separateArrays(seatLayres?.data?.data?.SeatLayout?.SeatDetails, 1);

                    if (lowerArrayDeck?.length > 0) {
                      const lowerLeastRowNum = parseInt(lowerArrayDeck[0][0]?.RowNo)
                      const lowerHighRowNum = parseInt(lowerArrayDeck[lowerArrayDeck?.length - 1][0]?.RowNo)
                      let lowerRowNum = -1
                      for (let i = lowerLeastRowNum; i <= lowerHighRowNum; i++) {
                        const val = lowerArrayDeck.some(item => parseInt(item[0].RowNo) === i);
                        if (val) {
                          onlyLowerArrayObj.push(lowerArrayDeck[lowerRowNum + 1])
                          lowerRowNum = lowerRowNum + 1
                        } else {
                          onlyLowerArrayObj.push([])
                        }
                      }
                    }

                    if (upperArrayDeck?.length > 0) {

                      // --------------------------------------------------------
                      const upperLeastRowNum = parseInt(upperArrayDeck[0][0].RowNo)
                      const upperHighRowNum = parseInt(upperArrayDeck[upperArrayDeck?.length - 1][0].RowNo)
                      let upperRowNum = -1
                      for (let i = upperLeastRowNum; i <= upperHighRowNum; i++) {
                        const val = upperArrayDeck.some(item => parseInt(item[0].RowNo) === i);
                        // console.log(val)
                        if (val) {
                          onlyUpperArrayObj.push(upperArrayDeck[upperRowNum + 1])
                          upperRowNum = upperRowNum + 1
                        } else {
                          onlyUpperArrayObj.push([])
                        }
                      }
                    }


                    if (seatMap.ResultIndex === searchBusObj.ResultIndex) {
                      seatMap = {
                        ...seatMap,
                        selectedSeats: seatMap?.selectedSeats ? seatMap?.selectedSeats : [],
                        Passenger: seatMap?.Passenger ? seatMap?.Passenger : [],
                        seatLowerLayout: onlyLowerArrayObj,
                        seatUpperLayout: onlyUpperArrayObj,

                        // seatlayout:seatlayoutObjSample,// seatLayres?.data?.data?.SeatLayout,//API response date mapped to previous rsponse and stated to state
                        selectedDropPoint: seatMap?.selectedDropPoint ? seatMap?.selectedDropPoint : '',
                        selectedBoardPoint: seatMap?.selectedBoardPoint ? seatMap?.selectedBoardPoint : '',
                        BoardingPointsDetailsNew: pointsRes?.data?.data?.BoardingPointsDetails,
                        DroppingPointsDetailsNew: pointsRes?.data?.data?.DroppingPointsDetails
                      };
                    }
                    return seatMap;
                  })
                  setSearchResultData(insertSeatSelectionArray);

                  //---------------------------------- get the distint prices
                  if (seatLayres?.data?.data?.SeatLayout) {
                    let distantPrices = Array.from(
                      new Set(seatLayres?.data?.data?.SeatLayout?.SeatDetails.flat().map((item) => item.Price.PublishedPriceRoundedOff))
                    );
                    setDistintPrices(distantPrices);
                  }
                  //---------------------------------- get the distint prices

                } else {
                  enqueueSnackbar(seatLayres.data.message, { variant: 'error' })
                  navigate('/buses')
                  setAccordianExpandArray('')//[]
                }
              }).catch((pontsErr) => {
                console.log(pontsErr)
              })

            } else {
              enqueueSnackbar(seatLayres.data.message, { variant: 'error' })
              navigate('/buses')
              setAccordianExpandArray([])

            }
          })
          .catch((err) => {
            console.log(err);
          });
        // ---------------------gte revies for ind oprator

        gomytripclient.post('/getBusRateAndReview', { "travel_name": searchBusObj.TravelName }
        ).then(revRes => {
          if (revRes?.data?.data?.getBusReviews?.length > 0) {
            setOperatorReviews(revRes?.data?.data?.getBusReviews)
          } else {
            setOperatorReviews([])
          }
        }).catch(err => {
          console.log(err)
        })
      }
    };

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

  //
  const handleSearchInList = (formValues) => {
    setIsLoading(true);
    let dateToReqFor = helperFunctions
      .convertDateStr(searchDate)
      .split("/")
      .reverse()
      .join("-");
    axios
      .post(`${process.env.REACT_APP_BASEURL}/busSearch`, {
        dest_details: to,
        origin_details: from,
        date: dateToReqFor,
        user_id: userSessionDetails || "",
      })
      .then((res) => {
        if (
          res?.status === 200 &&
          res?.data?.status === 1 &&
          res?.data?.data?.busResults?.length > 0
        ) {
          setAccordianExpandArray([])
          showSnackbarFunction(res.data.message, "success");
          //** Data update to redux */
          setSearchResultData(res.data.data.busResults);
          setTraceId(res.data.data.traceId);

          dispatch(
            BusSearchResultSliceActions.bussearchdata([
              { fromDest: from, toDest: to, selectedDate: searchDate },
              { searchResultData: res.data.data.busResults },
              res.data.data.traceId,
            ])
          );
          //removing all the filters 
          setUserSelctedFilters([])
          setUserSelectedOperators([])
          setUserSelectedDepature([])
          setPriceFilter(0)
        } else {
          showSnackbarFunction(res.data.message, "error");
          setSearchResultData([]);
          setAccordianExpandArray([])
          dispatch(
            BusSearchResultSliceActions.bussearchdata([
              { fromDest: from, toDest: to, selectedDate: searchDate },
              { searchResultData: [] },
              "",
            ])
          );
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setSearchResultData([]);
        dispatch(
          BusSearchResultSliceActions.bussearchdata([
            { fromDest: from, toDest: to, selectedDate: searchDate },
            { searchResultData: [] },
            "",
          ])
        );

        setIsLoading(false);

        console.log(err);
      });
    setBussearch(false)
  };

  // swap funtionality
  function handleSwap() {
    const temp = from;
    setFrom(to);
    setTo(temp);
    // Add the animation class to the button
    setIsAnimated(true);

    // Remove the animation class after the animation duration (1000ms)
    setTimeout(() => {
      setIsAnimated(false);
    }, 1000);
  }

  //**seconf useeffect to get all bus names in uniques */

  const handlePriceFilter = (e, price) => {
    setPriceFilter(price);

    // ----------------------to have one state for filters
    setAllSelectedFilters(price == 1 ? [...allSelectedFilters, "Highest Price"] : allSelectedFilters.filter((filterD) => "Highest Price" != filterD))
  };

  // ac/non/seater
  const handleBusTypeFilterClick = (type) => {
    setUserSelctedFilters(
      userSelctedFilters.includes(type)
        ? userSelctedFilters.filter((filData) => filData != type)
        : [...userSelctedFilters, type]
    );
    // ----------------------to have one state for filters
    setAllSelectedFilters(allSelectedFilters.includes(type) ? allSelectedFilters.filter((filterD) => type != filterD) : [...allSelectedFilters, type])

  };

  //**handleOperatorClick  */
  const handleOperatorClick = (operatorName) => {
    setUserSelectedOperators(
      userSelectedOperators.includes(operatorName)
        ? userSelectedOperators.filter((filterD) => operatorName != filterD)
        : [...userSelectedOperators, operatorName]
    );

    // ----------------------to have one state for filters
    setAllSelectedFilters(allSelectedFilters.includes(operatorName) ? allSelectedFilters.filter((filterD) => operatorName != filterD) : [...allSelectedFilters, operatorName])
  };

  //handleDepatureTimigFilter
  const handleDepatureTimigFilter = (selectedDep) => {
    setUserSelectedDepature(
      userSelectedDepature.includes(selectedDep)
        ? userSelectedDepature.filter((filD) => selectedDep != filD)
        : [...userSelectedDepature, selectedDep]
    );

    let deparString = selectedDep == 6
      ? "Morning 6 AM-12"
      : selectedDep == 12
        ? "Afternoon 12-6 PM"
        : selectedDep == 18
          ? "Evening 6 PM-12"
          : "Night 12-6 AM"

    // ----------------------to have one state for filters
    setAllSelectedFilters(allSelectedFilters.includes(deparString) ? allSelectedFilters.filter((filterD) => deparString != filterD) : [...allSelectedFilters, deparString])
  };


  //**userAppliedForFilter  one */

  function checkPricesFilter(getTheSerchedResultParam) {
    let objectsToModify = [...getTheSerchedResultParam]
    if (priceFilter === 1) {
      const highToLowPriceFilter = objectsToModify.sort(
        (a, b) => b.BusPrice.PublishedPrice - a.BusPrice.PublishedPrice
      );
      return highToLowPriceFilter;
    } else if (priceFilter === 0) {
      const LowToHignPriceFilter = objectsToModify.sort(
        (a, b) => a.BusPrice.PublishedPrice - b.BusPrice.PublishedPrice
      );
      return LowToHignPriceFilter;
    } else if (priceFilter === 2) {
      let fastSort = objectsToModify.sort((a, b) => {
        const departureTimeA = new Date(a.DepartureTime);
        const arrivalTimeA = new Date(a.ArrivalTime);
        const timeDifferenceA = arrivalTimeA - departureTimeA;

        const departureTimeB = new Date(b.DepartureTime);
        const arrivalTimeB = new Date(b.ArrivalTime);
        const timeDifferenceB = arrivalTimeB - departureTimeB;

        return timeDifferenceA - timeDifferenceB;
      });
      return fastSort
    } else if (priceFilter === 3) {
      let fastSort = objectsToModify.sort((a, b) => {
        const departureTimeA = new Date(a.DepartureTime);
        const arrivalTimeA = new Date(a.ArrivalTime);
        const timeDifferenceA = arrivalTimeA - departureTimeA;

        const departureTimeB = new Date(b.DepartureTime);
        const arrivalTimeB = new Date(b.ArrivalTime);
        const timeDifferenceB = arrivalTimeB - departureTimeB;

        return timeDifferenceB - timeDifferenceA;
      });
      return fastSort
    }
    else {
      return objectsToModify;
    }
  }

  function functionCheckBusTypeFiters(paramData) {
    if (userSelctedFilters?.length > 0) {
      if (userSelctedFilters.includes('A/C') && !userSelctedFilters.includes('Non A/C')) {
        // alert('a/c ! non a/c')
        const foundObjects = paramData.filter((obj) =>
          userSelctedFilters.some((value) =>
            obj.BusType.toLowerCase().includes(value.toLowerCase())
          )
        );
        const onlyAcObjects = foundObjects.filter((obj) =>
          userSelctedFilters.some((value) =>
            !obj.BusType.toLowerCase().includes('non a/c')
          )
        );
        // && !obj.BusType.toLowerCase().includes('Non A/C')
        return onlyAcObjects;
      } else {
        // alert('a/c non a/c')
        const foundObjects = paramData.filter((obj) =>
          userSelctedFilters.some((value) =>
            obj.BusType.toLowerCase().includes(value.toLowerCase())
          )
        );
        return foundObjects;
      }

    }
    return paramData;
  }

  function functionCheckBusesOperatorFilter(operParamData) {
    if (userSelectedOperators?.length > 0) {
      const foundOperatorObjects = operParamData.filter((obj) =>
        userSelectedOperators.some(
          (value) => obj.TravelName.toLowerCase() == value.toLowerCase()
        )
      );
      // console.log(foundOperatorObjects,'foundOperatorObjects')
      return foundOperatorObjects;
    }
    return operParamData;
  }

  function functionFOrDepatureFIlters(deparData) {
    if (userSelectedDepature?.length > 0) {

      const foundDepartureObjects = deparData.filter((obj) =>
        userSelectedDepature.some(
          (value) =>
            parseInt(obj.DepartureTime.split("T")[1].split(":")[0]) >= value &&
            value + 6 > parseInt(obj.DepartureTime.split("T")[1].split(":")[0])
        )
      );
      // console.log(foundDepartureObjects,'foundDepartureObjects')
      return foundDepartureObjects;
    }

    return deparData;
  }

  const userAppliedForFilter = () => {
    const priceFilterData = checkPricesFilter(getTheSerchedResult.busSearchResult);

    const checkBusTypeFiters = functionCheckBusTypeFiters(priceFilterData);

    const checkBusesOperator = functionCheckBusesOperatorFilter(checkBusTypeFiters);

    const depatureFilters = functionFOrDepatureFIlters(checkBusesOperator);

    setSearchResultData(depatureFilters)
    setDfilter(false);
    if (!allSelectedFilters.includes("Applied")) {
      setAllSelectedFilters(allSelectedFilters?.length > 0 ? [...allSelectedFilters, "Applied"] : allSelectedFilters.filter((filterD) => "Applied" != filterD))
    } else if (allSelectedFilters[0] == "Applied") {
      setAllSelectedFilters([])
    }
    //------------------- scroll to top of page smoothyyyyy
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  function handleSeatSelction(busObjectCicked, seatObj) {

    if (seatObj.SeatStatus) {
      let getErrorSpanForThisBus = document.getElementById(`busErrorMsg_${busObjectCicked.ResultIndex}`)

      let seatsOpted = busObjectCicked.selectedSeats;

      let newPassengersArray = busObjectCicked.Passenger;

      let makeObj =
      {
        "seatIndex": seatObj.SeatIndex,
        "LeadPassenger": false,//seatsOpted?.length === 0 ? true : false,
        "PassengerId": "0",//adult --0 (18 years),child --1 (12 years)
        "Title": seatObj.IsLadiesSeat ? 'Ms' : 'Mr',//4 : 1,// (1-'Mr',2-'Mrs',3-'Mstr',4-'Ms').
        "DOB": '',
        "DOB_err": false,
        "FirstName": '',
        "FirstName_err": false,
        "Gender": seatObj.IsLadiesSeat ? 2 : 1,
        "LastName": '',
        "LastName_err": false,
        "Seat": seatObj,
        "hasError": false,
        "traveller_id": ''
      }
      // IdType------------------Pan no, Voterid card, Passport
      // if (makeObj.LeadPassenger) {
      //   // makeObj.Email=''
      //   makeObj.Address = ''
      //   makeObj.Address_err = false
      //   // makeObj.Phoneno=''
      // }
      if (busObjectCicked.IdProofRequired) {
        makeObj.IdNumber = ''
        makeObj.IdType = ''
        makeObj.IdNumber_err = false
        makeObj.IdType_err = false
      }

      if (seatsOpted.includes(seatObj.SeatIndex)) {
        seatsOpted = seatsOpted.filter((fillData) => fillData != seatObj.SeatIndex)
        newPassengersArray = newPassengersArray.filter((passData) => passData.seatIndex != seatObj.SeatIndex)
      } else {
        //**If the max seats given for that servece exceeds while only icing for seat */
        if (seatsOpted?.length == busObjectCicked.MaxSeatsPerTicket) {
          getErrorSpanForThisBus.innerText = `Cannot select more than ${busObjectCicked.MaxSeatsPerTicket} seats for this service`
          return false
        }
        seatsOpted = [...seatsOpted, seatObj.SeatIndex]
        newPassengersArray.push(makeObj)
      }

      const newSearcesObjects = searchResultData.map((data) => {

        if (busObjectCicked.ResultIndex === data.ResultIndex) {
          data = {
            ...data,
            selectedSeats: seatsOpted,
            Passenger: newPassengersArray
          }
        }
        return data
      })

      setSearchResultData(newSearcesObjects)
    } else {
      showSnackbarFunction('Cannot select already Opted Seats', 'error')
    }
    return false
  }

  const handleSeatsPricesFilter = (priceParam) => {
    setUserSelectedPriceFilter(priceParam)
    if (priceParam) {
      document.querySelectorAll('.seatsToSelect').forEach(ele => {
        ele.classList.remove("filterSeatsNoEvents");
        if (!ele.classList.contains(`seatPriceIs_${priceParam}`)) {
          ele.classList.add("filterSeatsNoEvents");
        }
      })
    } else {
      document.querySelectorAll('.seatsToSelect').forEach(ele => {
        ele.classList.remove("filterSeatsNoEvents");
      })
    }
  }

  const handleBookSeat = (busSelectedObj) => {

    // return false
    let getErrorSpanForThisBus = document.getElementById(`busErrorMsg_${busSelectedObj.ResultIndex}`)

    if (localStorage.getItem('userid')) {
      if (busSelectedObj.selectedBoardPoint == '') {
        getErrorSpanForThisBus.innerText = 'Please select boarding point'
        return;
      } else {
        getErrorSpanForThisBus.innerText = ''
      }

      if (busSelectedObj.selectedDropPoint == '') {
        getErrorSpanForThisBus.innerText = 'Please select drop point'
        return;
      } else {
        getErrorSpanForThisBus.innerText = ''
      }

      //Making the [0]  passenger as lead passenger
      busSelectedObj.Passenger[0].LeadPassenger = true

      dispatch(
        BusSearchResultSliceActions.bussearchdata([
          { fromDest: getTheSerchedResult.userSearchedFor.fromDest, toDest: getTheSerchedResult.userSearchedFor.toDest, selectedDate: getTheSerchedResult.userSearchedFor.selectedDate },
          { searchResultData: getTheSerchedResult.busSearchResult },
          getTheSerchedResult.traceId, busSelectedObj
        ])
      );

      navigate(`/buses/BusBooking`, { state: { busObject: busSelectedObj } })
    } else {
      showSnackbarFunction('Please Login to continue further', 'warning')
    }
  }

  function separateArrays(mainArray, type) {
    const type1 = []; // Arrays with IsUpper   true

    for (let i = 0; i < mainArray?.length; i++) {
      const subArray = mainArray[i];
      const obj = subArray[0]; // Extract the object from the sub-array

      if (type === 0) {
        if (obj.IsUpper) {
          type1.push(subArray);
        }
      } else {
        if (!obj.IsUpper) {
          type1.push(subArray);
        }
      }
    }

    return type1;
  }

  let ColumnNo = -1;
  return (
    <>
      <SearchBuses
        open={search}
        close={() => setSearch(false)}
        sources={sources}
        bus={selected_buses}
      />
      <BusesPageBackDrop open={isLoading} />
      {/* search grid */}
      <Container maxWidth="xl" sx={{ display: { xs: 'block', md: 'none' } }}>
        <Grid container pt={3} alignItems={'center'}>
          {/* back icon */}
          <Grid item xs={1} textAlign={'left'}>
            <IconButton className="back_arrow_icon" onClick={() => navigate(-1)}>
              <img src={backIcon} alt="backIcon" />
            </IconButton>
          </Grid>
          {/* flight details */}
          <Grid item xs={10}>
            <Grid container justifyContent={'space-between'} className="res_details" p={2} alignItems={'center'}>
              <Grid item xs={11}>
                <Grid className="city_title">{`${from?.city_name} - ${to.city_name}`}</Grid>
                {/* <Grid className="city_details">{dates.departdate} | {travellerscount} Travellers | {traveller_class}</Grid> */}
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => setBussearch(true)}>
                  <img src={editIcon} alt="editIcon" />
                </IconButton>
              </Grid>
              <span className="res_details_type">{'bus way'}</span>
            </Grid>
          </Grid>
          {/* filter icon */}
          <Grid item xs={1} textAlign={'right'}>
            <IconButton onClick={() => setDfilter(true)}>
              <img src={filterIcon} alt="filterIcon" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
      <Box className={buslistStyles.pageBorders} sx={{ position: "relative" }}>
        <Grid item sx={{ marginTop: "-7%", display: { xs: 'none', md: 'block' } }}>
          <Container maxWidth="xl" sx={{ marginleft: "auto", paddingLeft: "0px !important", paddingRight: "16px !important" }}>
            <Paper className={HotMainpg.searchpaper}>
              <Grid container direction={"column"}>
                {/* Hotel search inputs */}
                <Grid item container pt={6} pb={6} pl={3} pr={3} position={"relative"} spacing={2}>
                  <Grid item md={2.8} lg={3} width={"100%"}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      size="small"
                      label={<span style={{ paddingRight: "0.3rem" }}>From</span>}
                      value={`${from?.city_name || ""} ${from?.city_code || ""}`}
                      onClick={() => {
                        searchsources(1);
                      }}
                      // value=""
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
                            <AdjustIcon sx={{ color: styles.app_color }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={2.8} lg={3} width={"100%"}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      size="small"
                      label={<span style={{ paddingRight: "0.9rem" }}>To</span>}
                      value={`${to?.city_name || ""} ${to?.city_code || ""}`}
                      onClick={() => {
                        searchsources(2);
                      }}
                      // value=""
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
                            <FmdGoodSharpIcon sx={{ color: styles.app_color }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={4.8} lg={3.5} width={"100%"}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        // disabled={disableCalendar}
                        sx={{
                          "& .MuiPickersToolbar-penIconButton": {
                            display: "none",
                          },
                        }}
                        closeOnSelect
                        disablePast
                        inputRef={busDateSelectRef}
                        label="Date"
                        value={searchDate}
                        onChange={(newValue) => {
                          setSearchDate(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            id="dateInputTag"
                            sx={{ minWidth: "90px" }}
                            // size="small"
                            {...params}
                            fullWidth
                            autoComplete="off"
                            size="small"
                            label={
                              <span style={{ paddingRight: "0.5rem" }}>Date</span>
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
                                  {/* <CalendarMonthIcon sx={{color:'#003556'}}/> */}
                                  <img
                                    src={calendermonth}
                                    alt="caleder"
                                    width="27"
                                    height="100"
                                  />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="start">
                                  <span
                                    className={`busesDatePickBtns ${helperFunctions.convertDateStr(
                                      searchDate
                                    ) ==
                                      helperFunctions.convertDateStr(new Date())
                                      ? "active"
                                      : ""
                                      }`}
                                    onMouseDown={handleTodayMouseDown}
                                  >
                                    Today
                                  </span>
                                  &nbsp;
                                  <span
                                    className={`busesDatePickBtns ${helperFunctions.convertDateStr(
                                      searchDate
                                    ) ==
                                      helperFunctions.convertDateStr(
                                        new Date(
                                          new Date().setDate(
                                            new Date().getDate() + 1
                                          )
                                        )
                                      )
                                      ? "active"
                                      : ""
                                      }`}
                                    onMouseDown={handleTomorrowMouseDown}
                                  >
                                    Tomorrow
                                  </span>
                                </InputAdornment>
                              ),
                              onClick: handleCalenderInputClick,
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={1.6} lg={2.5} >
                    {/* Hotel search button */}
                    <Grid item textAlign={"center"} sx={{ display: { md: "block", xs: "none" }, maxWidth: "100% !important" }}>
                      <button
                        className={HotMainpg.hotelsearchbtn}
                        onClick={handleSearchInList}
                        style={{ height: "2.5rem" }}
                      >
                        Search{" "}
                      </button>
                    </Grid>

                    <Grid item className={`${gomainpag.swapbtnBusSearchList}`}>
                      <img
                        src={swap}
                        alt="swapbutton"
                        onClick={handleSwap}
                        className={`${isAnimated ? 'swap-button animated' : 'swap-button'} cursor-p`}
                      />
                    </Grid>
                    {/* modile response button */}
                    <Grid item textAlign={"center"} width={"100%"} sx={{ display: { md: "none", xs: "block" } }}>
                      <button
                        className={HotMainpg.hotelsearchbtn}
                        onClick={handleSearchInList}
                      >
                        Search Buses{" "}
                      </button>
                    </Grid>
                  </Grid>
                  {/* dflkjgjl */}
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
        <Container maxWidth="xl" style={{ padding: "0px" }}>
          <Grid container mt={3}>
            <Grid item md={4} sx={{ display: { md: "block", xs: "none" } }}>
              <Paper
                //elevation={3}
                sx={{
                  paddingTop: "1rem",
                  paddingLeft: "1.6rem",
                  borderRadius: "1rem",
                  // position: 'sticky',
                  // top: '16%'
                }}
              >
                <Grid container direction="column" rowSpacing={2}>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      mb={1}
                      className={filterstyles.filters}
                    >
                      Sort By

                    </Typography>
                    <ToggleButtonGroup
                      exclusive
                      disableRipple
                      mt={0.5}
                      size="small"
                      onChange={handlePriceFilter}
                    >

                      <ToggleButton
                        value={0}
                        className={`${aftersearc.pricetoggle} ${priceFilter === 0
                          ? aftersearc.pricetoggleFiltered
                          : ""
                          }`}
                      >
                        Lowest Price
                      </ToggleButton>

                      <ToggleButton
                        value={1}
                        className={`${aftersearc.pricetoggle} ${priceFilter === 1
                          ? aftersearc.pricetoggleFiltered
                          : ""
                          }`}
                        sx={{ marginLeft: "1rem!important", pointerEvents: `${priceFilter == 1 ? "none" : "auto"}` }}
                      >
                        Highest Price
                      </ToggleButton>

                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      mb={1}
                      className={filterstyles.filters}
                    >
                      Duration


                    </Typography>
                    <ToggleButtonGroup
                      exclusive
                      disableRipple
                      mt={0.5}
                      size="small"
                      onChange={handlePriceFilter}
                    >
                      <ToggleButton
                        value={2}
                        className={`${aftersearc.pricetoggle} ${priceFilter === 2
                          ? aftersearc.pricetoggleFiltered
                          : ""
                          }`}
                        // sx={{ marginLeft: "1rem!important" }}
                      >
                        Low To High
                      </ToggleButton>
                      <ToggleButton
                        value={3}
                        className={`${aftersearc.pricetoggle} ${priceFilter === 3
                          ? aftersearc.pricetoggleFiltered
                          : ""
                          }`}
                        sx={{ marginLeft: "1rem!important" }}
                      >
                        Hign To Low
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      className={filterstyles.filters}
                    >
                      Filter By
                    </Typography>

                    <Grid container mt={1} spacing={1}>
                      {busFilterType.map((uiData) => (
                        <Grid key={uiData} item >
                          <button
                            onClick={() => handleBusTypeFilterClick(uiData)}
                            className={`${aftersearc.stopsbtn} ${userSelctedFilters.includes(uiData)
                              ? aftersearc.stopsbtnFilterSelected
                              : ""
                              }`}
                            id="nostop"
                          >
                            {uiData}
                          </button>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      mb={1}
                      className={filterstyles.filters}
                    >
                      Departure
                    </Typography>
                    <Grid container direction={"column"} spacing={1.5}>
                      <Grid item>
                        <Grid container gap={"0.5rem"}>
                          {departureTimes.map((Timedata) => (
                            <Grid key={Timedata} item md={5.5} mb={1} spacing={2}>
                              <button
                                className={`${userSelectedDepature.includes(Timedata) ? aftersearc.departurebtnsSelected : aftersearc.departurebtns}`}
                                id="morning"
                                onClick={() =>
                                  handleDepatureTimigFilter(Timedata)
                                }
                              >
                                {Timedata == 6
                                  ? "Morning 6 AM-12"
                                  : Timedata == 12
                                    ? "Afternoon 12-6 PM"
                                    : Timedata == 18
                                      ? "Evening 6 PM-12"
                                      : "Night 12-6 AM"}
                              </button>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      mb={1}
                      className={filterstyles.filters}
                    >
                      Travel Operators
                    </Typography>
                    <Grid container direction={"column"} spacing={1.5}>
                      <Grid item>
                        <Grid container>
                          {travelOperators?.length > 0 &&
                            travelOperators.map((operData) => {
                              return (
                                <Grid key={operData} item mr={2} mb={2}>
                                  <button
                                    className={`${aftersearc.departurebtns} ${userSelectedOperators.includes(operData)
                                      ? "userSelectedFilter"
                                      : ""
                                      }`}
                                    onClick={(e) =>
                                      handleOperatorClick(operData)
                                    }
                                  >
                                    {operData}
                                  </button>
                                </Grid>
                              );
                            })}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item textAlign={"center"}>
                    <Button
                      disableRipple
                      variant="contained"
                      sx={{
                        backgroundColor: `${styles.app_color}!important`,
                        color: "#ffff",
                        textTransform: "none",
                        marginBottom: "2rem",
                        padding: "0.5rem 3.5rem",
                      }}
                      onClick={userAppliedForFilter}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid
              item
              md={7.6}
              xs={12}
              ml={3}
              className={`${buslistStyles.busDetailsBlock} background_transparent`}
            >

              {/* <Box>
                  <Skeleton variant="" height={118}/>
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box> */}


              {userSelctedFilters?.length > 0 || userSelectedDepature?.length > 0 || userSelectedOperators?.length > 0 ? <Typography sx={{ marginLeft: "1.5rem" }}>Viewing <b>{searchResultData?.length}</b> of <b>{getTheSerchedResult.busSearchResult?.length}</b>  Buses</Typography> : <Typography sx={{ marginLeft: "1.5rem" }}>Viewing <b>{searchResultData?.length}</b> Buses</Typography>}
              {/* <Typography sx={{ marginLeft: "1.5rem" }}><b>Sort by:</b> {allSelectedFilters.includes('Applied') ? allSelectedFilters.filter((data) => "Applied" != data).join(', ') : ""} </Typography> */}
              {searchResultData?.map((busesData, index) => {
                let fairPriceForSelectedSeats = 0
                busesData?.Passenger?.map((passDataObj) => {
                  fairPriceForSelectedSeats += passDataObj.Seat.Price.PublishedPriceRoundedOff// passDataObj.Seat.SeatFare
                })
                return (
                  <Grid
                    key={busesData?.ResultIndex}
                    item
                    className={`${buslistStyles.busDetails} bgwhite`}
                  >
                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between", marginLeft: "1rem" }}
                    >
                      <b style={{ color: styles.app_color }}>
                        {busesData?.TravelName}
                      </b>
                      <br />
                      {/* <span className={buslistStyles.busOffer}>20% OFF</span> */}
                    </Grid>
                    <Stack spacing={2} direction={"row"} ml={2}>
                      <Grid container justifyContent={"space-between"}>
                        <Grid item >
                          <span className="light-text fs-12">
                            {busesData.BusType}
                          </span>&nbsp;
                          <span className="light-text fs-12  alignCenter makeFlex">
                            <LivingOutlinedIcon />{" "}&nbsp;
                            <span className="c-p f-w-500">{busesData.AvailableSeats}</span> &nbsp; Seats Available
                          </span>
                        </Grid>
                        {/* <Grid item sx={{ display: { md: "block", xs: "none" } }}>
                          <span className={buslistStyles.busOffer}>20% OFF</span>
                        </Grid> */}
                      </Grid>
                    </Stack>
                    <Grid container className="d-none">
                      <Grid item ml={2}>
                        <span className="goRegularFont">4.8</span>
                      </Grid>
                      <Grid item>
                        <Rating
                          name="half-rating-read"
                          defaultValue={2.5}
                          precision={0.1}
                          readOnly
                        />
                      </Grid>
                      <Grid item>
                        <span className="goRegularFont">(20,123)</span>
                      </Grid>
                    </Grid>

                    <Stack>
                      <span></span>
                    </Stack>

                    <Stack ml={2} flexDirection={"inherit"} alignItems={"center"}>
                      <span>{convertDateFormat(busesData?.DepartureTime)}</span>

                      <span>
                        &nbsp;
                        <Divider sx={{ width: "40px", margin: "0px 5px !important", color: "#0000" }} />
                        &nbsp;
                      </span>
                      <span>
                        {getTimeDifferenceBtTwoDates(
                          busesData?.ArrivalTime,
                          busesData?.DepartureTime
                        )}
                      </span>
                      <span>
                        &nbsp;
                        <Divider sx={{ width: "40px", margin: "0px 5px !important", color: "#0000" }} />
                        &nbsp;
                      </span>
                      <span>{convertDateFormat(busesData.ArrivalTime)}</span>
                    </Stack>
                    {/* <Grid item mb={2}>
                      <span className="bgoffer">
                        {" "}
                        <span >
                          <img
                            src={bluerectangle}
                            alt="bluerectangle"
                            width="15px"
                            height="15px"
                          />
                        </span>{" "}
                        <span className="texthg">
                          Use MMTOFFER and get FLAT Rs. 50 Instant
                          discount on this Bus
                        </span>
                      </span>
                    </Grid> */}
                    <Divider />

                    <Grid container>
                      <Grid item md={12} xs={12}>
                        <Accordion
                          elevation={0}
                          disableGutters={true}
                          // className={classes.root}
                          // expanded={accordianExpandArray.includes(
                          //   busesData.ResultIndex
                          // )}
                          expanded={accordianExpandArray ==
                            busesData.ResultIndex
                          }
                          onChange={handleaccordionexpand(
                            busesData.ResultIndex,
                            busesData,
                            index
                          )}
                        >
                          <AccordionSummary
                            id=""
                            sx={{ padding: "0px", height: "3.2rem" }}
                          >
                            {accordianExpandArray !=
                              busesData.ResultIndex
                              ?
                              (<Grid container justifyContent={"space-between"}>
                                <Grid
                                  item
                                  //   md={expandindex === index ? 12 : 3}
                                  alignItems={"center"}
                                  sx={{ display: "flex" }}
                                  textAlign={"left"}
                                >
                                  {/* <Typography
                                    sx={{
                                      fontSize: "21px",
                                      padding: "8px",
                                      color: styles.app_color,
                                    }}
                                  > */}
                                  <Typography
                                    sx={{
                                      fontSize: "21px",
                                      padding: "8px",
                                      color: styles.app_color,
                                      marginLeft: "1rem",
                                    }}
                                  >
                                    ₹ {busesData?.BusPrice?.PublishedPriceRoundedOff}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                //   md={expandindex === index ? 0 : 9}
                                //   alignItems={"center"}
                                //   textAlign={"right"}
                                >

                                  <button
                                    className={"goBusSelectSeat"}
                                  //   onClick={() =>
                                  //     package_Selection({
                                  //       [item.minarr.ResultIndex]:
                                  //         item.minarr.Segments[0][0].Airline
                                  //           .AirlineName,
                                  //       airline_code: airlinecode,
                                  //     })
                                  //   }
                                  >
                                    Select Seat
                                  </button>
                                  {/* )} */}
                                </Grid>
                              </Grid>
                              ) : (
                                <span
                                  className="makeFlex justifyStart color-p"
                                  style={{ width: "100%", marginLeft: "1rem" }}
                                >
                                  Fare details <ArrowDropUpIcon />
                                </span>
                              )}
                          </AccordionSummary>
                          <AccordionDetails sx={{ padding: "0px" }}>
                            <Container>
                              <TabContext value={activeTab}>
                                <TabList
                                  onChange={handleBusTabChange}
                                  sx={{
                                    background: "#DFF3FF",
                                    // borderRadius: "1rem",
                                  }}
                                  scrollButtons="Off"
                                  aria-label="Go bus Tabs"
                                  className={aftersearchflight.tabs}
                                  variant="scrollable"
                                  orientation={{ xs: "horizontal", md: 'none' }}
                                >
                                  <Tab
                                    disableRipple
                                    label="Seat Selection"
                                    value="1"
                                    sx={{
                                      fontSize: "12px",
                                      color: styles.app_color,
                                      fontWeight: 600,
                                      textTransform: "none",
                                    }}
                                  />
                                  <Tab
                                    disableRipple
                                    label="Reviews"
                                    value="2"
                                    sx={{
                                      fontSize: "12px",
                                      padding: "0% 4%",
                                      color: styles.app_color,
                                      fontWeight: 600,
                                      textTransform: "none",
                                    }}
                                  />
                                  <Tab
                                    disableRipple
                                    label="Policies"
                                    value="6"
                                    sx={{
                                      fontSize: "12px",
                                      padding: "0% 4%",
                                      color: styles.app_color,
                                      fontWeight: 600,
                                      textTransform: "none",
                                    }}
                                  />
                                </TabList>
                                {/* Seat Selection */}
                                <TabPanel value="1" sx={{ padding: "10px 0" }}>
                                  <Grid
                                    container
                                    direction="row"
                                    // flexDirection={'row'}
                                    spacing={0}
                                    className={""}
                                  >
                                    <Grid item md={5} xs={12} mt={1.5} >
                                      <b>Select Pickup & Drop Points</b>
                                      <Grid container mt={1} flexDirection={"row"}>
                                        <Grid
                                          item
                                          className="goBusBoardingDiv1"
                                          mr={1}
                                        >
                                          <div className="goBusBoardingPoint textCenter">
                                            Boarding Point
                                          </div>
                                          <Divider />
                                          {busesData?.BoardingPointsDetailsNew ? <ul
                                            className="goSlectPickUp"
                                          // style={{ height: "300px" }}
                                          >

                                            {busesData?.BoardingPointsDetailsNew?.map(
                                              (boardpItems) => (
                                                <li
                                                  key={
                                                    boardpItems.CityPointIndex
                                                  }
                                                  className={`goPickUpPointsList ${busesData
                                                    ?.selectedBoardPoint
                                                    ?.CityPointIndex ===
                                                    boardpItems?.CityPointIndex
                                                    ? "selected"
                                                    : ""
                                                    }`}
                                                  onClick={() =>
                                                    handleLocationPick(
                                                      boardpItems,
                                                      1,
                                                      index
                                                    )
                                                  }
                                                >
                                                  <span className="makeFlex flexColumn">
                                                    <span>
                                                      {convertDateFormat(
                                                        boardpItems.CityPointTime
                                                      )}
                                                    </span>
                                                    <span>
                                                      {
                                                        boardpItems.CityPointName
                                                      }
                                                    </span>
                                                    ,
                                                    <span>
                                                      {
                                                        boardpItems.CityPointLocation
                                                      }
                                                    </span>
                                                  </span>
                                                </li>
                                              )
                                            )}
                                          </ul> : <div className="makeFlex alignCenter justifyCenter"><CircularProgress /></div>}
                                        </Grid>
                                        <Grid item className="goBusBoardingDiv1">
                                          <div className="goBusBoardingPoint textCenter">
                                            Dropping Point
                                          </div>
                                          <Divider />
                                          {busesData?.DroppingPointsDetailsNew ? <ul
                                            className="goSlectPickUp"
                                          // style={{ height: "300px" }}
                                          >
                                            {busesData?.DroppingPointsDetailsNew?.map(
                                              (dropPointsItem) => (
                                                <li
                                                  key={
                                                    dropPointsItem.CityPointIndex
                                                  }
                                                  className={`goPickUpPointsList ${busesData?.selectedDropPoint
                                                    ?.CityPointIndex ===
                                                    dropPointsItem.CityPointIndex
                                                    ? "selected"
                                                    : ""
                                                    }`}
                                                  onClick={() =>
                                                    handleLocationPick(
                                                      dropPointsItem,
                                                      2,
                                                      index
                                                    )
                                                  }
                                                >
                                                  <span className="makeFlex flexColumn">
                                                    <span>
                                                      {convertDateFormat(
                                                        dropPointsItem.CityPointTime
                                                      )}
                                                    </span>
                                                    <span>
                                                      {
                                                        dropPointsItem.CityPointName
                                                      }
                                                    </span>
                                                    ,
                                                    <span>
                                                      {
                                                        dropPointsItem.CityPointLocation
                                                      }
                                                    </span>
                                                  </span>
                                                </li>
                                              )
                                            )}
                                          </ul> : <div className="makeFlex alignCenter justifyCenter"><CircularProgress size='' /></div>}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item md={7} xs={12}>
                                      <Grid container mt={1.5} flexDirection={'column'}>
                                        <b>Seat Selection</b>
                                        <Grid item mt={1}>
                                          <Grid
                                            spacing={2}
                                            flexDirection={"row"}
                                            container
                                          >
                                            {busSeatsInfo.map((data) => (
                                              <Grid
                                                item
                                                key={data.id}
                                                className="makeFlex alignCenter flexRow"
                                              >
                                                <img
                                                  width={"25"}
                                                  src={data.image}
                                                  alt="seatAvail"
                                                />
                                                <p className="seac">
                                                  {data.name}
                                                </p>
                                              </Grid>
                                            ))}
                                          </Grid>
                                        </Grid>
                                        <Grid item mt={1}>
                                          <span onClick={() => handleSeatsPricesFilter('')} className={`pricesFilterBtn ${userSelectedPriceFilter == '' ? "SelectedPriceFilter" : ""}`}>
                                            All
                                          </span>
                                          {distintPrices.map((data) => {
                                            return (
                                              <span onClick={() => handleSeatsPricesFilter(data)} key={data} className={`pricesFilterBtn ${userSelectedPriceFilter == data ? "SelectedPriceFilter" : ""}`}>
                                                ₹ {data}
                                              </span>
                                            )
                                          })}
                                        </Grid>
                                        <Grid item md={12} xs={12} mt={1} sx={{ display: { xs: "none", sm: 'block' } }}>
                                          {Boolean(busesData?.seatLowerLayout?.length > 0) ? <Grid container flexDirection={'column'} >
                                            <span style={{ textAlign: 'center', color: styles.app_color, fontWeight: '600' }}>Lower Berth</span>

                                            <div className="busLayout">
                                              <div className="busStartBlock">
                                                <span><img src={busStering} alt='busStreeing' /></span>
                                                <span><img src={busExitInd} alt='busExitInd' /></span>
                                              </div>
                                              <div className="dividerBlock">
                                                <Divider orientation="vertical" />
                                              </div>
                                              <div>
                                                {/* busesData?.seatlayout?.SeatDetails */}
                                                {
                                                  busesData?.seatLowerLayout.map((seatData) => {

                                                    if (seatData?.length > 0) {
                                                      ColumnNo = -1

                                                      let lastColumnNum = Math.max(...busesData?.seatLowerLayout.flat().map(obj => parseInt(obj.ColumnNo)))// parseInt(seatData[seatData.length - 1].ColumnNo)
                                                      let newData = []
                                                      for (let i = 0; i <= lastColumnNum; i = i + 1) {
                                                        const val = seatData.some(item => parseInt(item.ColumnNo) === i);
                                                        if (val) {
                                                          newData.push(seatData[ColumnNo + 1])
                                                          ColumnNo = ColumnNo + 1
                                                        } else {
                                                          newData.push({})
                                                        }
                                                      }
                                                      return (
                                                        <Grid item display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
                                                          {/* SeatType -- 1 Seat ,2--Sleeper  */}
                                                          {newData?.map((seats, index) => {
                                                            let seatImg
                                                            if (seats?.SeatType === 1 && seats?.SeatStatus) {
                                                              if (seats.IsLadiesSeat) {
                                                                seatImg = busSeatWomenA
                                                              } else {
                                                                seatImg = goBusSeat
                                                              }
                                                            } else if (seats?.SeatType === 1 && !seats?.SeatStatus) {
                                                              if (seats.IsLadiesSeat) {
                                                                seatImg = busSeatWomenBooked
                                                              } else {
                                                                seatImg = busSeatBooked
                                                              }
                                                            } else if (seats?.SeatType === 2 && seats?.SeatStatus) {
                                                              if (seats.IsLadiesSeat) {
                                                                seatImg = goBusSleeperWomenA
                                                              } else {
                                                                seatImg = goBusSleeper
                                                              }
                                                            } else if (seats?.SeatType === 2 && !seats?.SeatStatus) {//
                                                              if (seats.IsLadiesSeat) {
                                                                seatImg = goBusSleeperWomenBooked
                                                              } else {
                                                                seatImg = goBusSleeperBooked
                                                              }
                                                            } else {
                                                              seatImg = 'goBusSleeperBooked'
                                                            }
                                                            return (
                                                              <div key={index} className="lowerBerthBus makeFlex">
                                                                {/* ${seats.SeatName} , ${seats.Price.PublishedPriceRoundedOff} */}
                                                                {Boolean(seats?.SeatIndex && !seats.IsUpper) ?
                                                                  <Tooltip PopperProps={{ className: "busToolTip" }} classes={{ tooltip: 'busPricesToolTipStyles' }} placement='top' title={`${seats?.SeatStatus ? "S-" + seats?.SeatName + "," + "₹" + seats?.Price?.PublishedPriceRoundedOff : ""}`} arrow>
                                                                    <p className={`seatsToSelect seatPriceIs_${seats.Price.PublishedPriceRoundedOff}`} style={{ width: '25px' }} >
                                                                      <img onClick={(e) => handleSeatSelction(busesData, seats)} className={`${busesData?.selectedSeats?.includes(seats.SeatIndex) ? "userSelectedSeat" : ""} rotateimg`}
                                                                        src={`${seatImg}`} /></p></Tooltip>
                                                                  : <span style={{ width: '25px' }}></span>
                                                                }
                                                                {/* {Boolean(seats?.SeatIndex && !seats.IsUpper)&&<span>{seats?.Price?.PublishedPriceRoundedOff}</span>} */}
                                                              </div>
                                                            )
                                                          })}
                                                        </Grid>)
                                                    } else {
                                                      return (
                                                        <div><p style={{ visibility: 'hidden' }}>||----------PATH WAY-----------||</p></div>
                                                      )
                                                    }
                                                  })}
                                              </div>
                                            </div>
                                            {/* <span style={{ textAlign: 'center', color: styles.app_color, fontWeight: '600' }}>Upper berth </span> */}

                                            <div className="busLayout">
                                              <div className="busStartBlock">
                                                <span className="busUpperBerth">Upper berth</span>
                                                {/* <span><img src={busStering} alt='busStreeing' /></span> */}
                                                {/* <span><img src={busExitInd} alt='busExitInd' /></span> */}
                                              </div>
                                              <div className="dividerBlock">
                                                <Divider orientation="vertical" />
                                              </div>
                                              <div>
                                                {busesData?.seatUpperLayout.map((seatData) => {
                                                  if (seatData?.length > 0) {
                                                    ColumnNo = -1
                                                    let lastColumnNum = Math.max(...busesData?.seatUpperLayout.flat().map(obj => parseInt(obj.ColumnNo)))// parseInt(seatData[seatData.length - 1].ColumnNo)
                                                    let newData = []
                                                    for (let i = 0; i <= lastColumnNum; i = i + 1) {
                                                      const val = seatData.some(item => parseInt(item.ColumnNo) === i);
                                                      if (val) {
                                                        newData.push(seatData[ColumnNo + 1])
                                                        ColumnNo = ColumnNo + 1
                                                      } else {
                                                        newData.push({})
                                                      }
                                                    }
                                                    return (
                                                      <Grid item display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
                                                        {newData.map((seats) => {
                                                          let seatImg
                                                          // = seats?.SeatType === 1 && seats?.SeatStatus ? goBusSeat : seats?.SeatType === 1 && !seats?.SeatStatus ? busSeatBooked : seats?.SeatType === 2 && seats?.SeatStatus ? goBusSleeper : seats?.SeatType === 2 && !seats?.SeatStatus ? goBusSleeperBooked : busSeatWomen;
                                                          if (seats?.SeatType === 1 && seats?.SeatStatus) {
                                                            if (seats.IsLadiesSeat) {
                                                              seatImg = busSeatWomenA
                                                            } else {
                                                              seatImg = goBusSeat
                                                            }
                                                          } else if (seats?.SeatType === 1 && !seats?.SeatStatus) {
                                                            if (seats.IsLadiesSeat) {
                                                              seatImg = busSeatWomenBooked
                                                            } else {
                                                              seatImg = busSeatBooked
                                                            }
                                                          } else if (seats?.SeatType === 2 && seats?.SeatStatus) {
                                                            if (seats.IsLadiesSeat) {
                                                              seatImg = goBusSleeperWomenA
                                                            } else {
                                                              seatImg = goBusSleeper
                                                            }
                                                          } else if (seats?.SeatType === 2 && !seats?.SeatStatus) {//
                                                            if (seats.IsLadiesSeat) {
                                                              seatImg = goBusSleeperWomenBooked
                                                            } else {
                                                              seatImg = goBusSleeperBooked
                                                            }
                                                          } else {
                                                            seatImg = 'goBusSleeperBooked'
                                                          }
                                                          return (
                                                            <div className="lowerBerthBus makeFlex">
                                                              {Boolean(seats?.SeatIndex && seats.IsUpper) ?
                                                                <Tooltip PopperProps={{ className: "busToolTip" }} classes={{ tooltip: 'busPricesToolTipStyles' }} placement='top' title={`S-${seats?.SeatStatus ? seats?.SeatName + "," + "₹" + seats?.Price?.PublishedPriceRoundedOff : ""}`} arrow>
                                                                  <p className={`seatsToSelect seatPriceIs_${seats.Price.PublishedPriceRoundedOff}`} style={{ width: "25px" }} >
                                                                    <img onClick={(e) => handleSeatSelction(busesData, seats)} className={`${busesData?.selectedSeats?.includes(seats.SeatIndex) ? "userSelectedSeat" : ""} rotateimg`}
                                                                      src={`${seatImg}`} />
                                                                  </p></Tooltip>
                                                                : <span style={{ width: "25px" }}></span>
                                                              }
                                                            </div>
                                                          )
                                                        })}
                                                      </Grid>)
                                                  } else {
                                                    return (
                                                      <div><p style={{ visibility: 'hidden' }}>||----------PATH WAY-----------||</p></div>
                                                    )
                                                  }
                                                })}
                                              </div>
                                            </div>
                                          </Grid>
                                            : <div className="makeFlex alignCenter justifyCenter"><CircularProgress /></div>}
                                        </Grid>
                                        <Grid item md={12} xs={12} mt={1} sx={{ display: { xs: "block", sm: 'none' } }}>
                                          {Boolean(busesData?.seatLowerLayout?.length > 0) ? <Grid container>
                                            <Grid item style={{ textAlign: 'center', color: styles.app_color, fontWeight: '600', width: '100%' }}>Lower Berth</Grid>
                                            <Grid className="busLayout" container>
                                              <Grid item container justifyContent={'space-between'} flexDirection={'row-reverse'}>
                                                <span><img style={{ transform: 'rotate(90deg)' }} src={busStering} alt='busStreeing' /></span>
                                                <span><img style={{ transform: 'rotate(90deg)' }} src={busExitInd} alt='busExitInd' /></span>
                                              </Grid>
                                              <Grid item xs={12} sx={{ margin: '0rem 0rem 1rem 0rem' }}>
                                                <Divider />
                                              </Grid>
                                              <Grid item container xs={12} flexDirection={'row-reverse'} justifyContent={'space-between'}>
                                                {/* busesData?.seatlayout?.SeatDetails */}
                                                {
                                                  busesData?.seatLowerLayout.map((seatData) => {

                                                    if (seatData?.length > 0) {
                                                      ColumnNo = -1

                                                      let lastColumnNum = Math.max(...busesData?.seatLowerLayout.flat().map(obj => parseInt(obj.ColumnNo)))// parseInt(seatData[seatData.length - 1].ColumnNo)
                                                      let newData = []
                                                      for (let i = 0; i <= lastColumnNum; i = i + 1) {
                                                        const val = seatData.some(item => parseInt(item.ColumnNo) === i);
                                                        if (val) {
                                                          newData.push(seatData[ColumnNo + 1])
                                                          ColumnNo = ColumnNo + 1
                                                        } else {
                                                          newData.push({})
                                                        }
                                                      }
                                                      return (
                                                        <Grid item xs={'auto'} paddingBottom={2} container flexDirection={'column'} gap={'10px'} alignItems={'center'}>
                                                          {/* SeatType -- 1 Seat ,2--Sleeper  */}
                                                          {newData?.map((seats, index) => {
                                                            let seatImg
                                                            let seatType;
                                                            if (seats?.SeatType === 1 && seats?.SeatStatus) {
                                                              if (seats.IsLadiesSeat) {
                                                                seatImg = busSeatWomenA
                                                              } else {
                                                                seatImg = goBusSeat
                                                              }
                                                            } else if (seats?.SeatType === 1 && !seats?.SeatStatus) {
                                                              if (seats.IsLadiesSeat) {
                                                                seatImg = busSeatWomenBooked
                                                              } else {
                                                                seatImg = busSeatBooked
                                                              }
                                                            } else if (seats?.SeatType === 2 && seats?.SeatStatus) {
                                                              if (seats.IsLadiesSeat) {
                                                                seatImg = goBusSleeperWomenA
                                                              } else {
                                                                seatImg = goBusSleeper
                                                              }
                                                            } else if (seats?.SeatType === 2 && !seats?.SeatStatus) {//
                                                              if (seats.IsLadiesSeat) {
                                                                seatImg = goBusSleeperWomenBooked
                                                              } else {
                                                                seatImg = goBusSleeperBooked
                                                              }
                                                            } else {
                                                              seatImg = 'goBusSleeperBooked'
                                                            }
                                                            return (
                                                              <Grid key={index} xs={'auto'} className="lowerBerthBus makeFlex" style={{ width: '27px', height: '48px', position: "relative" }} sx={{ "&:empty": { display: 'none' } }}>
                                                                {/* ${seats.SeatName} , ${seats.Price.PublishedPriceRoundedOff} */}
                                                                {Boolean(seats?.SeatIndex && !seats.IsUpper) ?
                                                                  <Tooltip PopperProps={{ className: "busToolTip" }} classes={{ tooltip: 'busPricesToolTipStyles' }} placement='top' title={`${seats?.SeatStatus ? "S-" + seats?.SeatName + "," + "₹" + seats?.Price?.PublishedPriceRoundedOff : ""}`} arrow>
                                                                    <p className={`seatsToSelect seatPriceIs_${seats.Price.PublishedPriceRoundedOff}`} style={{ transform: 'rotate(90deg)', height: '27px', width: '48px', position: 'absolute', top: '11px', left: '-11px' }} >
                                                                      <img onClick={(e) => handleSeatSelction(busesData, seats)} className={`${busesData?.selectedSeats?.includes(seats.SeatIndex) ? "userSelectedSeat" : ""} rotateimg`}
                                                                        src={`${seatImg}`} /></p></Tooltip>
                                                                  : <span style={{ width: '25px' }}></span>
                                                                }
                                                                {/* {Boolean(seats?.SeatIndex && !seats.IsUpper)&&<span>{seats?.Price?.PublishedPriceRoundedOff}</span>} */}
                                                              </Grid>
                                                            )
                                                          })}
                                                        </Grid>)
                                                    } else {
                                                      return (
                                                        <Grid xs={2}><p style={{ visibility: 'hidden' }}>||----------PATH WAY-----------||</p></Grid>
                                                      )
                                                    }
                                                  })}
                                              </Grid>
                                            </Grid>
                                            {/* <span style={{ textAlign: 'center', color: styles.app_color, fontWeight: '600' }}>Upper berth </span> */}

                                            <Grid className="busLayout" container>
                                              <Grid item container justifyContent={'center'}>
                                                Upper berth
                                                {/* <span><img src={busStering} alt='busStreeing' /></span> */}
                                                {/* <span><img src={busExitInd} alt='busExitInd' /></span> */}
                                              </Grid>
                                              <Grid item xs={12} sx={{ margin: '0rem 0rem 1rem 0rem' }}>
                                                <Divider />
                                              </Grid>
                                              <Grid item container xs={12} flexDirection={'row-reverse'} justifyContent={'space-between'}>
                                                {busesData?.seatUpperLayout.map((seatData) => {
                                                  if (seatData?.length > 0) {
                                                    ColumnNo = -1
                                                    let lastColumnNum = Math.max(...busesData?.seatUpperLayout.flat().map(obj => parseInt(obj.ColumnNo)))// parseInt(seatData[seatData.length - 1].ColumnNo)
                                                    let newData = []
                                                    for (let i = 0; i <= lastColumnNum; i = i + 1) {
                                                      const val = seatData.some(item => parseInt(item.ColumnNo) === i);
                                                      if (val) {
                                                        newData.push(seatData[ColumnNo + 1])
                                                        ColumnNo = ColumnNo + 1
                                                      } else {
                                                        newData.push({})
                                                      }
                                                    }
                                                    return (
                                                      <Grid item xs={'auto'} paddingBottom={2} container flexDirection={'column'} gap={'10px'} alignItems={'center'}>
                                                        {newData.map((seats) => {
                                                          let seatImg
                                                          // = seats?.SeatType === 1 && seats?.SeatStatus ? goBusSeat : seats?.SeatType === 1 && !seats?.SeatStatus ? busSeatBooked : seats?.SeatType === 2 && seats?.SeatStatus ? goBusSleeper : seats?.SeatType === 2 && !seats?.SeatStatus ? goBusSleeperBooked : busSeatWomen;
                                                          if (seats?.SeatType === 1 && seats?.SeatStatus) {
                                                            if (seats.IsLadiesSeat) {
                                                              seatImg = busSeatWomenA
                                                            } else {
                                                              seatImg = goBusSeat
                                                            }
                                                          } else if (seats?.SeatType === 1 && !seats?.SeatStatus) {
                                                            if (seats.IsLadiesSeat) {
                                                              seatImg = busSeatWomenBooked
                                                            } else {
                                                              seatImg = busSeatBooked
                                                            }
                                                          } else if (seats?.SeatType === 2 && seats?.SeatStatus) {
                                                            if (seats.IsLadiesSeat) {
                                                              seatImg = goBusSleeperWomenA
                                                            } else {
                                                              seatImg = goBusSleeper
                                                            }
                                                          } else if (seats?.SeatType === 2 && !seats?.SeatStatus) {//
                                                            if (seats.IsLadiesSeat) {
                                                              seatImg = goBusSleeperWomenBooked
                                                            } else {
                                                              seatImg = goBusSleeperBooked
                                                            }
                                                          } else {
                                                            seatImg = 'goBusSleeperBooked'
                                                          }
                                                          return (
                                                            <Grid xs={'auto'} className="lowerBerthBus makeFlex" style={{ width: '27px', height: '48px', position: "relative" }} sx={{ "&:empty": { display: 'none' } }}>
                                                              {Boolean(seats?.SeatIndex && seats.IsUpper) ?
                                                                <Tooltip PopperProps={{ className: "busToolTip" }} classes={{ tooltip: 'busPricesToolTipStyles' }} placement='top' title={`S-${seats?.SeatStatus ? seats?.SeatName + "," + "₹" + seats?.Price?.PublishedPriceRoundedOff : ""}`} arrow>
                                                                  <p className={`seatsToSelect seatPriceIs_${seats.Price.PublishedPriceRoundedOff}`} style={{ transform: 'rotate(90deg)', height: '27px', width: '48px', position: 'absolute', top: '11px', left: '-11px' }} >
                                                                    <img onClick={(e) => handleSeatSelction(busesData, seats)} className={`${busesData?.selectedSeats?.includes(seats.SeatIndex) ? "userSelectedSeat" : ""} rotateimg`}
                                                                      src={`${seatImg}`} />
                                                                  </p></Tooltip>
                                                                : <span style={{ width: "25px" }}></span>
                                                              }
                                                            </Grid>
                                                          )
                                                        })}
                                                      </Grid>)
                                                  } else {
                                                    return (
                                                      <Grid xs={2}><p style={{ visibility: 'hidden' }}>||----------PATH WAY-----------||</p></Grid>
                                                    )
                                                  }
                                                })}
                                              </Grid>
                                            </Grid>
                                          </Grid> : <div className="makeFlex alignCenter justifyCenter"><CircularProgress /></div>}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </TabPanel>
                                {/* Reviews */}
                                <TabPanel value="2" sx={{ padding: "10px 0" }}>
                                  <Stack
                                    direction={"row"}
                                    spacing={1}
                                    alignItems={"center"}
                                  >
                                    <span className="goBusOveralRatingForBus">
                                      <span className="goNumeratorRat">
                                        {/* {isNaN(operatorReviews[0]?.average_rating)?0:parseFloat(operatorReviews[0]?.average_rating.toFixed(1))} */}
                                        {isNaN(operatorReviews[0]?.average_rating) ? 0 : Math.round(operatorReviews[0]?.average_rating)}
                                      </span>
                                      <span className="goSlash">/</span>
                                      <span className="goDenominator">5</span>
                                    </span>
                                    <Rating
                                      // name="half-rating-read"
                                      // value= {isNaN(operatorReviews[0]?.average_rating)?0:parseFloat(operatorReviews[0]?.average_rating.toFixed(1))}
                                      value={isNaN(operatorReviews[0]?.average_rating) ? 0 : Math.round(operatorReviews[0]?.average_rating)}

                                      precision={0.1}
                                      readOnly
                                    />
                                  </Stack>
                                  <Grid
                                    container
                                    direction="column"
                                    //   spacing={0.5}
                                    className={""}
                                  >
                                    {operatorReviews[0]?.userwise_data?.length > 0 && operatorReviews[0]?.userwise_data?.map((data, item) => {
                                      return (
                                        <Grid key={item} item mt={2}>
                                          <Stack spacing={1}>
                                            <Stack
                                              direction={"row"}
                                              alignItems={"center"}
                                              spacing={1}
                                            >
                                              <Avatar
                                                alt="Remy Sharp"
                                                src={userImage}
                                              />
                                              <p>{data.userEmail ?? data.userPhone}</p>
                                            </Stack>
                                            <Rating
                                              name="half-rating-read"
                                              defaultValue={data.rating}
                                              precision={0.1}
                                              readOnly
                                            />
                                            <p className="goBusReviewText">
                                              {data.review}
                                            </p>
                                            <Divider />
                                          </Stack>
                                        </Grid>
                                      )
                                    })}
                                  </Grid>
                                </TabPanel>
                                {/* Policies */}
                                <TabPanel value="6" className="scroll_none1" sx={{ padding: "10px 0", overflow: "hidden", overflowX: "scroll" }}>
                                  <Grid
                                    container
                                    direction={"column"}
                                    rowSpacing={1}
                                  >
                                    {/* style={{ paddingLeft: "1rem" }} */}
                                    <div>
                                      <h4 style={{ color: styles.app_color }}>
                                        Terms & conditions
                                      </h4>
                                      <Divider></Divider>
                                      <Grid
                                        container
                                        direction={"column"}
                                        rowSpacing={2}
                                        mt={1}
                                      >
                                        <Grid container spacing={2} m={1} sx={{ backgroundColor: '#EDF5FA', borderRadius: '5px', width: '100%' }} p={2}>
                                          <span dangerouslySetInnerHTML={{ __html: convertArrayToTable(busesData?.CancellationPolicies) }} />
                                        </Grid>
                                      </Grid>
                                    </div>
                                  </Grid>
                                </TabPanel>
                              </TabContext>
                              <span id={`busErrorMsg_${busesData.ResultIndex}`} className="goBusErrorMsg"></span>

                              {activeTab == 1 && <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  backgroundColor: "#DFF3FF",
                                  borderRadius: "10px",
                                }}
                              >
                                <Grid
                                  sx={{
                                    width: { sx: "100%", md: '58%' },
                                    // padding: "10px",
                                    justifyContent: "space-between",
                                  }}
                                  container
                                >
                                  <Grid item md={6} sx={{ paddingLeft: "10px" }}>
                                    <span>Seats Selected</span>
                                    <br />
                                    {/* <span className="selectedSeatNames">{busesData?.selectedSeats?.join(',')}</span> */}
                                    <span className="selectedSeatNames">{busesData?.Passenger?.map(seatItem => seatItem.Seat.SeatName)?.join(',')}</span>
                                    {/* {console.log(busesData?.Passenger?.map(seatItem=>seatItem.Seat.SeatName)?.join(','),'OOOOOOOO')} */}
                                    {/* <span>{[1,2,3,4].map((seatMap)=>seatMap.join(','))}</span> */}
                                    {/* <span>{selectedSeats?.busesData?.map((seatMap)=>seatMap.join(','))}</span> */}
                                  </Grid>
                                  <Grid item md={6} sx={{ textAlign: "end", paddingRight: "10px" }}>
                                    <span>
                                      <b>₹ {fairPriceForSelectedSeats}</b>
                                    </span>
                                    <br />
                                    <span>Fare Details</span>
                                  </Grid>
                                  <Grid item md={12} xs={12}>
                                    <Button className="goBusButton" disabled={!busesData?.selectedSeats?.length} onClick={(e) => handleBookSeat(busesData)} variant="contained" fullWidth>
                                      Book seat
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Box>}
                            </Container>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
              {allSelectedFilters?.length >= 0 && searchResultData?.length === 0 ?
                // <p className="c-p" style={{textAlign:'center'}}> 
                <Grid container flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                  <Grid item>
                    <img src={not_found} alt='notfound' />
                  </Grid>
                  <Grid item>
                    <p className="c-p" style={{ textAlign: 'center' }}> Sorry, Buses not found</p>
                  </Grid>
                  <Grid item>
                    <p className="c-p" style={{ textAlign: 'center' }}> We could not find buses for this search</p>
                  </Grid>
                </Grid>
                // {/* </p> */}
                : ""}
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* filters dialog */}
      <Dialog open={dfilter} onClose={() => setDfilter(false)} id="hello">
        <Grid container direction="column" rowSpacing={2} pt={4} pl={4} pr={4} mb={2} >
          <Paper
            //elevation={3}
            sx={{
              paddingTop: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              borderRadius: "1rem",
            }}
          >
            <Grid container direction="column" rowSpacing={2}>
              <Grid item>
                <Typography
                  variant="subtitle2"
                  mb={1}
                  className={filterstyles.filters}
                >
                  Sort By


                </Typography>
                <ToggleButtonGroup
                  exclusive
                  disableRipple
                  mt={0.5}
                  size="small"
                  onChange={handlePriceFilter}
                >
                  <ToggleButton
                    value={0}
                    className={`${aftersearc.pricetoggle} ${priceFilter === 0
                      ? aftersearc.pricetoggleFiltered
                      : ""
                      }`}
                  >
                    Lowest Price
                  </ToggleButton>
                  <ToggleButton
                    value={1}
                    className={`${aftersearc.pricetoggle} ${priceFilter === 1
                      ? aftersearc.pricetoggleFiltered
                      : ""
                      }`}
                    sx={{ marginLeft: "1rem!important" }}
                  >
                    Highest Price
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle2"
                  mb={1}
                  className={filterstyles.filters}
                >
                  Duration


                </Typography>
                <ToggleButtonGroup
                  exclusive
                  disableRipple
                  mt={0.5}
                  size="small"
                  onChange={handlePriceFilter}
                >
                  <ToggleButton
                    value={2}
                    className={`${aftersearc.pricetoggle} ${priceFilter === 2
                      ? aftersearc.pricetoggleFiltered
                      : ""
                      }`}
                    // sx={{ marginLeft: "1rem!important" }}
                  >
                    Low To High
                  </ToggleButton>
                  <ToggleButton
                    value={3}
                    className={`${aftersearc.pricetoggle} ${priceFilter === 3
                      ? aftersearc.pricetoggleFiltered
                      : ""
                      }`}
                    sx={{ marginLeft: "1rem!important" }}
                  >
                    Hign To Low
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle2"
                  className={filterstyles.filters}
                >
                  Filter By
                </Typography>

                <Grid container mt={1} spacing={1}>
                  {busFilterType.map((uiData) => (
                    <Grid key={uiData} item >
                      <button
                        onClick={() => handleBusTypeFilterClick(uiData)}
                        className={`${aftersearc.stopsbtn} ${userSelctedFilters.includes(uiData)
                          ? aftersearc.stopsbtnFilterSelected
                          : ""
                          }`}
                        id="nostop"
                      >
                        {uiData}
                      </button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle2"
                  mb={1}
                  className={filterstyles.filters}
                >
                  Departure
                </Typography>
                <Grid container direction={"column"} spacing={1.5}>
                  <Grid item>
                    <Grid container gap={"0.5rem"}>
                      {departureTimes.map((Timedata) => (
                        <Grid key={Timedata} item md={5.5} mb={1} spacing={2}>
                          <button
                            className={`${userSelectedDepature.includes(Timedata) ? aftersearc.departurebtnsSelected : aftersearc.departurebtns}`}
                            id="morning"
                            onClick={() =>
                              handleDepatureTimigFilter(Timedata)
                            }
                          >
                            {Timedata === 6
                              ? "Morning 6 AM-12"
                              : Timedata === 12
                                ? "Afternoon 12-6 PM"
                                : Timedata === 18
                                  ? "Evening 6 PM-12"
                                  : "Night 12-6 AM"}
                          </button>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Typography
                  variant="subtitle2"
                  mb={1}
                  className={filterstyles.filters}
                >
                  Travel Operators
                </Typography>
                <Grid container direction={"column"} spacing={1.5}>
                  <Grid item>
                    <Grid container>
                      {travelOperators?.length > 0 &&
                        travelOperators.map((operData) => {
                          return (
                            <Grid key={operData} item mr={2} mb={2}>
                              <button
                                className={`${aftersearc.departurebtns} ${userSelectedOperators.includes(operData)
                                  ? "userSelectedFilter"
                                  : ""
                                  }`}
                                onClick={(e) =>
                                  handleOperatorClick(operData)
                                }
                              >
                                {operData}
                              </button>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item textAlign={"center"}>
                <Button
                  disableRipple
                  variant="contained"
                  sx={{
                    backgroundColor: `${styles.app_color}!important`,
                    color: "#ffff",
                    textTransform: "none",
                    marginBottom: "2rem",
                    padding: "0.5rem 3.5rem",
                  }}
                  onClick={userAppliedForFilter}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Dialog>
      {/* Bus search responsive dialog */}
      <Dialog open={bussearch} onClose={() => setBussearch(false)}>
        <Grid item sx={{ display: { xs: 'block', md: 'none' } }}>
          <Paper className={HotMainpg.searchpaper}>
            <Grid container direction={"column"}>
              {/* Hotel search inputs */}
              <Grid item container pt={6} pb={6} pl={3} pr={3} spacing={2}>
                <Grid item md={4} width={"100%"}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    size="small"
                    label={<span style={{ paddingRight: "0.3rem" }}>From</span>}
                    value={`${from?.city_name || ""} ${from?.city_code || ""}`}
                    onClick={() => {
                      searchsources(1);
                    }}
                    // value=""
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
                          <LanguageSharpIcon sx={{ color: styles.app_color }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} width={"100%"}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    size="small"
                    label={<span style={{ paddingRight: "0.9rem" }}>To</span>}
                    value={`${to?.city_name || ""} ${to?.city_code || ""}`}
                    onClick={() => {
                      searchsources(2);
                    }}
                    // value=""
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
                          <FmdGoodSharpIcon sx={{ color: styles.app_color }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} width={"100%"}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      disabled={disableCalendar}
                      sx={{
                        "& .MuiPickersToolbar-penIconButton": {
                          display: "none",
                        },
                      }}
                      closeOnSelect
                      disablePast
                      inputRef={busDateSelectRef}
                      label="Date"
                      value={searchDate}
                      onChange={(newValue) => {
                        setSearchDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          id="dateInputTag"
                          sx={{ minWidth: "90px" }}
                          // size="small"
                          {...params}
                          fullWidth
                          autoComplete="off"
                          size="small"
                          label={
                            <span style={{ paddingRight: "0.5rem" }}>Date</span>
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
                                {/* <CalendarMonthIcon sx={{color:'#003556'}}/> */}
                                <img
                                  src={calendermonth}
                                  alt="caleder"
                                  width="27"
                                  height="100"
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="start">
                                <span
                                  className={`busesDatePickBtns ${helperFunctions.convertDateStr(
                                    searchDate
                                  ) ==
                                    helperFunctions.convertDateStr(new Date())
                                    ? "active"
                                    : ""
                                    }`}
                                  onMouseDown={handleTodayMouseDown}
                                >
                                  Today
                                </span>
                                &nbsp;
                                <span
                                  className={`busesDatePickBtns ${helperFunctions.convertDateStr(
                                    searchDate
                                  ) ==
                                    helperFunctions.convertDateStr(
                                      new Date(
                                        new Date().setDate(
                                          new Date().getDate() + 1
                                        )
                                      )
                                    )
                                    ? "active"
                                    : ""
                                    }`}
                                  onMouseDown={handleTomorrowMouseDown}
                                >
                                  Tomorrow
                                </span>
                              </InputAdornment>
                            ),
                            onClick: handleCalenderInputClick,
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item>
                  <img
                    src={swap}
                    alt="swapbutton"
                    className={gomainpag.swapbtnBusSearchList}
                    onClick={handleSwap}
                  />
                </Grid>
                {/* modile response button */}
                <Grid item textAlign={"center"} width={"100%"} sx={{ display: { md: "none", xs: "block" }, paddingTop: "0px !important" }}>
                  <button
                    className={HotMainpg.hotelsearchbtn}
                    onClick={handleSearchInList}
                  >
                    Search Buses{" "}
                  </button>
                </Grid>
              </Grid>
            </Grid>

          </Paper>
          {/* Hotel search button */}
          <Grid item textAlign={"center"} mt={-3.5} sx={{ display: { md: "block", xs: "none" } }}>
            <button
              className={HotMainpg.hotelsearchbtn}
              onClick={handleSearchInList}
            >
              Search Buses{" "}
            </button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default BusesSearchList;


const busSeatsInfo = [
  { id: "1", name: "Available", image: availableSeat },
  { id: "2", name: "Available for Women  ", image: womenAvailDisplaySeat },
  { id: "3", name: "Booked", image: goBusBookedSeat },
  { id: "4", name: "Selected", image: goBusSelectedSeat },
  { id: "5", name: "Booked by Women", image: busGirlsSeat },
];
