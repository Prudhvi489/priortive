import { Dialog, DialogTitle, Grid, IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlightsSearch from '../components/pages/Flights/FlightsSearch'
import Filters from '../components/pages/Flights/Filters'
import backIcon from "../assets/images/backIcon.png";
import filterIcon from "../assets/images/filterIcon.svg";
import editIcon from "../assets/images/editIcon.svg";
import { useDispatch, useSelector } from 'react-redux'
import { aftersearchflights, gomainpage, muitextfieldborder } from '../assets/styles/Flights'
import { FlightsearchActions } from '../store/FlightsearchSlice'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';

function Minifilter(props) {
    const Apply_filters = props.filter
    const { way } = props;
    // const searcheddata = useSelector((state)=>state.flightsearches.Fsearcheddata);
    // const travellersclass = useSelector((state)=>state.travellerclass.travellers)
    // const traveller_class=travellersclass?.classes==="2"?"Economy":travellersclass?.classes==="4"?"Business":travellersclass?.classes==="6"?"First":travellersclass?.classes==='3'&&"Premium Economy"
    // const travellerscount =travellersclass.adult+travellersclass.child+travellersclass.infant;

    // // console.log(searcheddata,"lksjdlfjk");
    // const origin= searcheddata.source.city_name;
    // const destination=searcheddata.destination.city_name;
    // const depart_date=searcheddata.departdate.split(" ");
    // const date=`${depart_date[1]} ${depart_date[0]}`
    // navigate
    const navigate = useNavigate()
    /* filter popup for moblie states*/
    const [filterOpen,setFilterOPen] = useState(false)
    function filterClose(){
        setFilterOPen(false)
    }
    /* filter popup for moblie states*/
    const [flightSearchOpen,setFlightSearchOPen] = useState(false)
    function flightSearchClose(){
        setFlightSearchOPen(false)
    }



// copy paste

    const classes = gomainpage();
    const classes1 = muitextfieldborder();
    const aftersearchflight = aftersearchflights();
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    // Getting the data from the redux store
    const travellersclass = useSelector((state)=>state.travellerclass.travellers)
    const traveller_class=travellersclass?.classes==="2"?"Economy":travellersclass?.classes==="4"?"Business":travellersclass?.classes==="6"?"First":travellersclass?.classes==='3'&&"Premium Economy"
    const travellerscount =travellersclass.adult+travellersclass.child+travellersclass.infant;
    const adult=travellersclass.adult;
    const child=travellersclass.child;
    const infant=travellersclass.infant;
    const travel_class=travellersclass.classes
    const tripcount = useSelector((state)=>state.flightsearches.multicitytripcount)
    const waytype = useSelector((state)=>state.flightsearches.waytype)
    const searcheddata = useSelector((state)=>state.flightsearches.Fsearcheddata)
    const flights_api_data= useSelector((state)=>state.flightsearches.Flightsdata)
    // states for the whole component
    const [from, setFrom] = React.useState("");
    const [to, setTo] = React.useState("");
    const [value, setValue] = React.useState(1);
    const [tripscount,setTripscount]=useState(2)
    const [travellermodel,setTravellermodel]=useState(false)
    const [dateopener,setDateopener]=useState({isOdepartdata:false,isOreturndata:false})
    const [dates,setDates]=useState({departdate:new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),returndate:""})
    const [trip1,setTrip1]=useState({source:    {airport_code: 'DEL', airport_name: 'Indira Gandhi Airport', city_code: 'DEL', city_name: 'Delhi', country_code: 'IN '},
    destination:{airport_code: 'BOM', airport_name: 'Mumbai', city_code: 'BOM', city_name: 'Mumbai', country_code: 'IN '},date:new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),calopen:false})
    const [trip2,setTrip2]=useState({source:{airport_code: 'BOM', airport_name: 'Mumbai', city_code: 'BOM', city_name: 'Mumbai', country_code: 'IN '},destination:{airport_code: 'BLR', airport_name: 'Bengaluru Intl', city_code: 'BLR', city_name: 'Bangalore', country_code: 'IN '},date:new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),calopen:false})
    const [trip3,setTrip3]=useState({source:"",destination:'',date:'',calopen:false})
    const [trip4,setTrip4]=useState({source:"",destination:'',date:'',calopen:false})
    const [trip5,setTrip5]=useState({source:"",destination:'',date:'',calopen:false})
    const [multicities,setMulticities]=useState([])
    const [airportsmodel,setAirportsmodel]=useState(false)
    const [sources,setSources]=useState("");
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
      document.addEventListener('click',handleoutside)
      },[])
const departref=useRef(null)
const returnref=useRef(null)  
const handleoutside=(e)=>{
  if (departref.current && !departref.current.contains(e.target)) {
    // if clicked outside the calendar component, close the calendar
    setDateopener((prev) => ({
      ...prev,
      isOdepartdata: false,
      isOreturndata: false
    }))
    setTrip1((prev) => ({
      ...prev,
      calopen: false,
    }))
    setTrip2((prev) => ({
      ...prev,
      calopen: false,
    }))
    setTrip3((prev) => ({
      ...prev,
      calopen: false,
    }))
    setTrip4((prev) => ({
      ...prev,
      calopen: false,
    }))
    setTrip5((prev) => ({
      ...prev,
      calopen: false,
    }))
  }
  // else if(returnref.current && !returnref.current.contians(e.target)){
  //   setDateopener((prev) => ({
  //     ...prev,
  //     isopendepartdate: false,
  //     isopenreturndate: false
  //   }))
  // }
}
  
      // converting long date to isostring
      // console.log(dep_c)
  const datetoIso = (date) => {
    console.log(date)
    const inputDate = new Date(date);
    inputDate.setMinutes(
      inputDate.getMinutes() - inputDate.getTimezoneOffset()
    );
    const isodate = inputDate.toISOString().slice(0, 10);
    return isodate;
  };
  // console.log(window.performance.navigation.type)

    // useEffect(()=>{
    //   let searchobj = {
    //     "adultCount":adult_c,
    //     "childCount": child_c,
    //     "infantCount": infant_c,
    //     "journeyType": jrny_c,
    //     "segments": [
    //       {
    //         "Origin": ori_c[0],
    //         "Destination": des_c[0]?? "",
    //         "FlightCabinClass": cabin_c,
    //         "PreferredDepartureTime": datetoIso(dep_c[0]),
    //       },
    //     ],
    //   };
    //   const oneway_search=async()=>{
    //     alert("refresh of data")
    //     const res = await axios.post("http://13.232.239.148/search", searchobj);
    //       return res.data.data
    //   }
    //   const search_refresh=async()=>{
    //     console.log(window.performance.navigation.type)
    //     if(window.performance.navigation.type===1){
    //       alert("page refresh")
    //       const result =await oneway_search();
    //       // console.log(val)
    //         dispatch(FlightsearchActions.Flights_search_dataupdate([{source:{city_code:ori_c[0],city_name:ori_c[1]},destination:{city_code:des_c[0],city_name:des_c[1]},departdate:dep_c[1]},{flightsdata:result.FlightDetails},result.TraceId,jrny_c]))
    //       }
    //   }
    //   search_refresh()
     
    // },[])
    useEffect(()=>{
      setTripscount(tripcount)
      if(waytype===1){
        setValue(1)
        setDates(prev=>({...prev,departdate:searcheddata.departdate}))
        setFrom(searcheddata.source)
        setTo(searcheddata.destination)
      }
      else if(waytype===2){
        setValue(2)
        setDates(prev=>({...prev,departdate:searcheddata.departdate,returndate:searcheddata.returndate}))
        setFrom(searcheddata.source)
        setTo(searcheddata.destination)
      }
      else if(waytype===3){
        setValue(3)
        setTrip1(searcheddata[0])
        setTrip2(searcheddata[1])
        setTrip3(searcheddata[2])
        setTrip4(searcheddata[3])
        setTrip5(searcheddata[4])
        //  let cities=[trip1?.source?.city_name,trip1?.Destination?.city_name,trip2?.source?.city_name,trip2?.Destination?.city_name,trip3?.source?.city_name,trip3?.Destination?.city_name,trip4?.source?.city_name,trip4?.Destination?.city_name,trip5?.source?.city_name,trip5?.Destination?.city_name]
        // console.log(cities,"before filtet") 
        // cities = cities.filter((value,index) => {
        //   if(value !== undefined){
        //     return true
        //   }
          
        //  });
        //  console.log(cities,"cities")
        // setMulticities([...new Set(cities)])
      }
    },[searcheddata])
    useEffect(() => {
      const  cities_selected=async()=>{
        let cities = [
          trip1?.source?.city_name,
          trip1?.destination?.city_name,
          trip2?.source?.city_name,
          trip2?.destination?.city_name,
          trip3?.source?.city_name,
          trip3?.destination?.city_name,
          trip4?.source?.city_name,
          trip4?.destination?.city_name,
          trip5?.source?.city_name,
          trip5?.destination?.city_name
        ];
    
        let city;
        let same=false;
        cities = await cities.filter((value, index) => value !== undefined);
        if(cities[0]===cities[cities.length-1]){
          same=true;
          city=cities[0]
        }
        const unique=new Set(cities)
        let Final_Cities=Array.from(unique)
        if(same){
          Final_Cities.push(city)
        }
        setMulticities([...Final_Cities]);
      }
      cities_selected()
     
    }, [trip1, trip2, trip3, trip4, trip5]);
    // add cities to multicity tripscount
    const addcities=()=>{
      setTripscount(prev=>prev+1)
    }
    // Remove cities from multicity tripscount
    const removecities=()=>{
      setTripscount(prev=>prev-1)
    }
// Tabs change
const handleChange = (event, newValue) => {
  if(newValue===1){
    setDates(prev=>({...prev,returndate:''}))
  }
    setValue(newValue);
  };
  // Swapping functionality
  function handleSwap() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }
  const searchflights = () => {
    navigate("/searchedflights");
  };
  // getting the departure date from calender using callback
  const departure_date=(date)=>{
    const modifieddate=new Date(date)
    const formattedDate = modifieddate.toLocaleDateString('en-US', { day: 'numeric',month: 'short',  year: 'numeric' });
    setDates(prev=>({...prev,departdate:formattedDate}))
    setDateopener(prev=>({...prev,isOdepartdata:false}))
  }
  // getting the return date from calender using the callback
  const return_date=(date)=>{
    const modifieddate=new Date(date)
    const formattedDate = modifieddate.toLocaleDateString('en-US', { day: 'numeric',month: 'short',  year: 'numeric' });
    setDates(prev=>({...prev,returndate:formattedDate}))
    setDateopener(prev=>({...prev,isOreturndata:false}))
  }
  // return date opener
  const returndateopener=()=>{
    // setDateopener(prev=>({...prev,isOreturndata:true}))
    setValue(2)
  }
   // getting dates of multicity dates
   const multicitydeparture=(date,trip)=>{
    // alert(trip)
    const modifieddate=new Date(date)
    const formattedDate = modifieddate.toLocaleDateString('en-US', { day: 'numeric',month: 'short',  year: 'numeric' });
    if(trip==1){
      setTrip1((prev)=>({...prev,date:formattedDate}))
      setTrip1((prev)=>({...prev,calopen:false}))
    }
    else if(trip==2){
      setTrip2((prev)=>({...prev,date:formattedDate}))
      setTrip2((prev)=>({...prev,calopen:false}))
    }
    else if(trip==3){
      setTrip3((prev)=>({...prev,date:formattedDate}))
      setTrip3((prev)=>({...prev,calopen:false}))
    }
    else if(trip==4){
      setTrip4((prev)=>({...prev,date:formattedDate}))
      setTrip4((prev)=>({...prev,calopen:false}))
    }
    else if(trip==5){
      setTrip5((prev)=>({...prev,date:formattedDate}))
      setTrip5((prev)=>({...prev,calopen:false}))
    }
  }
  // setting sources for airport list
  const searchsources = (type)=>{
    setAirportsmodel(true)
    setSources(type)
  }
  // getting data form airportmodel using callback
  const selected_airport=(airport,val)=>{
    if(val==1){
      setFrom(airport)
    }
    else if(val==2){
    setTo(airport)
    }
    else if(val=="t1s"){
     setTrip1(prev=>({...prev,source:airport}))
     
    }
    else if(val=="t1d"){
      setTrip1(prev=>({...prev,destination:airport}))
      setTrip2(prev=>({...prev,source:airport}))
    
    }
    else if(val=="t2s"){
      setTrip2(prev=>({...prev,source:airport}))
     }
     else if(val=="t2d"){
       setTrip2(prev=>({...prev,destination:airport}))
       setTrip3(prev=>({...prev,source:airport}))
    
      }
     else if(val=="t3s"){
      setTrip3(prev=>({...prev,source:airport}))
     }
     else if(val=="t3d"){
       setTrip3(prev=>({...prev,destination:airport}))
      setTrip4(prev=>({...prev,source:airport}))
    
     }
     else if(val=="t4s"){
      setTrip4(prev=>({...prev,source:airport}))
     }
     else if(val=="t4d"){
       setTrip4(prev=>({...prev,destination:airport}))
       setTrip5(prev=>({...prev,source:airport}))
    
     }
     else if(val=="t5s"){
      setTrip5(prev=>({...prev,source:airport}))
     }
     else if(val=="t5d"){
       setTrip5(prev=>({...prev,destination:airport}))
     }
    }
      
    const handlesearch=async()=>{
      setLoading(true)
      let searchobj;
      let segments=[];
      let searchData_From=[];
      let searchData_To=[];
      let userid=localStorage.getItem('userid');
        if(value===1){
          searchobj={
            "adultCount": travellersclass.adult,
            "childCount": travellersclass.child,
            "infantCount": travellersclass.infant,
            "journeyType": 1,
            "segments": [
                {
                    "Origin": from?.city_code??"",
                    "Destination": to?.city_code??"",
                    "FlightCabinClass": 1,
                    "PreferredDepartureTime": datetoIso(dates.departdate)
                }
            ]
          }
        }
        else if(value===2){
          searchobj={
            "adultCount": travellersclass.adult,
            "childCount": travellersclass.child,
            "infantCount":travellersclass.infant,
            "journeyType": 2,
            "segments": [
                {
                    "Origin": from?.city_code,
                    "Destination": to?.city_code ?? "",
                    "FlightCabinClass": 1,
                    "PreferredDepartureTime":datetoIso(dates.departdate),
                    "PreferredArrivalTime": datetoIso(dates.departdate)
                },
                {
                    "Origin": to?.city_code ?? "",
                    "Destination": from?.city_code,
                    "FlightCabinClass": 1,
                    "PreferredDepartureTime": datetoIso(dates.returndate),
                    "PreferredArrivalTime": datetoIso(dates.returndate)
                }
            ]
        }
        }
        else if(value===3){
          alert("multicity")
          let segments_obj=[];
          for(let i=1;i<=tripscount;i++){
            let trip = eval('trip'+i)
            segments.push(trip)
            let each_seg_obj={
              "Origin": trip.source.city_code??"",
              "Destination": trip.destination.city_code??"",
              "FlightCabinClass": "1",
              "PreferredDepartureTime": datetoIso(trip.date),
              "PreferredArrivalTime": datetoIso(trip.date)
            }
            segments_obj.push(each_seg_obj)
          }
          searchobj={
            "adultCount": travellersclass.adult,
          "childCount": travellersclass.child,
          "infantCount": travellersclass.infant,
          "journeyType": 3,
          "segments":segments_obj
          }
        }
        if(userid!==null){
          if(value===1||value===2){
          searchobj.user_id=userid;
          searchobj.searchDataFrom=[from];
          searchobj.searchDataTo=[to]
          }
          else if(value===3){
            searchobj.user_id=userid;
            searchobj.searchDataFrom=searchData_From;
            searchobj.searchDataTo=searchData_To;
    
          }
          
        }
        console.log(searchobj)
        const res = await axios.post(`${process.env.REACT_APP_BASEURL}/search`, searchobj);
        // console.log(res.data)
        let status = res.data.status;
        let jrney_type =res.data.data.JourneyType
        if(jrney_type===1 && status ){
        dispatch(FlightsearchActions.Flights_search_dataupdate([{source:from,destination:to,departdate:dates.departdate},{flightsdata:res.data.data.FlightDetails},res.data.data.TraceId,1]))
        navigate('/Flights/OW_flights')
        setLoading(false)
      }
      else if(jrney_type===2 && status){
        dispatch(
          FlightsearchActions.Flights_search_dataupdate([
            {
              source: from,
              destination: to,
              departdate: dates.departdate,
              returndate: dates.returndate,
            },
            { flightsdata: res.data.data.FlightDetails },
            res.data.data.TraceId,
            2,
          ])
        );
        navigate("/Flights/RT_flights");
        setLoading(false)
      }
      else if(jrney_type===3 &&status){
        dispatch(
          FlightsearchActions.Flights_search_dataupdate([
            segments,
            { flightsdata: res.data.data.FlightDetails },
            res.data.data.TraceId,
            3,
          ])
        );
        navigate("/Flights/MC_flights");
        setLoading(false)
      }
    }

  return (
    <>
        {/* filter popup for moblie */}
        <Dialog open={filterOpen} onClose={filterClose}>
          <CloseIcon onClick={filterClose} sx={{position:'absolute',right:'0.5rem',top:'0.4rem',color:'white',backgroundColor:'red',borderRadius:"50%"}}/>
          <Filters filter={Apply_filters} close={filterClose} />
        </Dialog>
        {/* flightSearch popup for moblie */}
        <Dialog open={flightSearchOpen} onClose={flightSearchClose} >
          <CloseIcon onClick={flightSearchClose} sx={{position:'absolute',right:'0.5rem',top:'0.4rem',color:'white',backgroundColor:'red',borderRadius:"50%"}}/>
          <FlightsSearch close={flightSearchClose} />
        </Dialog>
        <Grid container pt={3} alignItems={'center'}>
            {/* back icon */}
            <Grid item xs={1} textAlign={'left'}>
                <IconButton className="back_arrow_icon" onClick={()=>navigate(-1)}>
                    <img src={backIcon} alt="backIcon" />
                </IconButton>
            </Grid>
            {/* flight details */}
            <Grid item xs={10}>
              <Grid container justifyContent={'space-between'} className="res_details" p={2} alignItems={'center'}>
                <Grid item xs={11}>
                  <Grid className="city_title">{value === 3 ? <span style={{fontSize:'14px'}}>{multicities.join(', ')}</span> : `${from?.city_name} - ${to?.city_name}`}</Grid>
                  <Grid className="city_details">{dates.departdate} | {travellerscount} Travellers | {traveller_class}</Grid>
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={()=>setFlightSearchOPen(true)}>
                      <img src={editIcon} alt="editIcon" />
                  </IconButton>
                </Grid>
                <span className="res_details_type">{way}</span>
              </Grid>
            </Grid>
            {/* filter icon */}
            <Grid item xs={1} textAlign={'right'}>
                <IconButton onClick={()=>setFilterOPen(true)}>
                <img src={filterIcon} alt="filterIcon" />
                </IconButton>
            </Grid>
        </Grid>
    </>
  )
}

export default Minifilter