import { Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, Tab, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import indigo from '../../../assets/images/indigo.svg'
import cancelbtn from '../../../assets/images/cancelbtn.svg'
// css filr
import {booknow} from '../../../assets/styles/Flights.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { makeStyles } from '@mui/styles';
import { multicitystyles } from '../../../assets/styles/Flights.jsx'
import axios from 'axios'
import { farequoteActions } from '../../../store/FarequoteSlice'
import helperFunctions from '../../../helpers/helperFunctions'
import CloseIcon from '@mui/icons-material/Close';
import MySnackbar from '../Signupmodals/Snackbar'
import { envdata } from '../../Envexports'
import Loadingmodal from '../Signupmodals/Loadingmodal'
import {styles} from '../../../assets/styles/Styles_export'
const BookNow = (props) => {
  const book = booknow();  
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const multicity=multicitystyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  // console.log(location.pathname)
  const traceid =  useSelector(state=>state.flightsearches.Traceid)
    const open = props.open;
    const onclose= props.onclose;
    const [tabvalue,setTabvalue]=useState(0)
    const [farequote,setFarequote]=useState([0,0])
    const [loading,setLoading]=useState(false);
    const handleclose=()=>{
        onclose();
    }

    const flightsdata=useSelector((state)=>state.flightsearches.Flightsdata).flightsdata;
    const waytype=useSelector((state)=>state.flightsearches.waytype)
    const loggedin = useSelector((state) => state.authentication.loggedin);;

let selected=[]
    if(open && tabvalue===0){
     selected=flightsdata[tabvalue].filter(item=>item.minarr.ResultIndex===Object.keys(props.package_selection[0])[0])
    }
    else if(open && tabvalue===1){
    selected=flightsdata[tabvalue].filter(item=>item.minarr.ResultIndex===Object.keys(props.package_selection[1])[0])
    }


    // select the package
    const selectpackage=(selectedpackage,result_index)=>{
      let data =result_index+"_x"
      console.log(data)
      document.getElementById(data).style=`color:#fff !important;background:${styles.app_color}`;
      selected[0].totalarr.map((item,index)=>{
        if(index!=selectedpackage){
          let id=item.ResultIndex+"_x"
          document.getElementById(id).removeAttribute("style")
        }
      })

     if(props.package_selection.length===1){
      setFarequote([result_index])
     }
     else if(props.package_selection.length===2){
        let newval=[...farequote]
        // outbound 0th index
        if(tabvalue===0){
          // alert("Outbound")
            newval[0]=result_index
            setFarequote(newval)
        }
        // inbound first index
        else if(tabvalue===1){
          // alert("inbondbound")
          newval[1]=result_index
          setFarequote(newval)
        }
     }
    }
 
    // this is working for color on load

    useEffect(() => {
      if (open && selected.length > 0) {
        if (props.package_selection.length === 1) {
          setFarequote([Object.keys(props.package_selection[0])[0]]);
        } else if (props.package_selection.length === 2) {
          farequote[0] = Object.keys(props.package_selection[0])[0];
          farequote[1] = Object.keys(props.package_selection[1])[0];
          setFarequote([...farequote]);
        }
      }
    }, [open]);

// console.log(farequote,"farewuote indexes")
// console.log(props.package_selection,"package selctediton")
    const flighttabs=(event,tabvalue)=>{
      setTabvalue(tabvalue)
     }
     const get_date=(origin_date)=>{
      const date = new Date(origin_date);
      const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
      return formattedDate;
    }
useEffect(()=>{
  window.addEventListener('popstate', handleBackButton);
  // return () => {
  //   window.removeEventListener('popstate', handleBackButton);
  // };
},[])
const handleBackButton=async()=>{
  if(location.pathname==="/Flights/OW_flights"||location.pathname==="/Flights/RT_flights"){
      dispatch(farequoteActions.reset_farequote())
 }
}
   const farequotebook=async()=>{
    // console.log(farequote)
    if(props.package_selection.length===2 && tabvalue===0){
      setTabvalue(1)
    }
    else{
      if(!loggedin){
        setSnackopen(true);
      setSnackmessage("To book room you  have to login to your account");
        // alert("To book room you have to login to your accuount");
         return;
       }
       setLoading(true)
      // handleclose();
      console.log(farequote.length,"lengh")
      for(let i=0;i<farequote.length;i++){
        const res = await axios.post(`${envdata.baseurl}/fareQoute`,{"TraceId":traceid,"ResultIndex":farequote[i]})
        let data =  res.data.data.Results
        if(res.data.status){  
        dispatch(farequoteActions.farequote_data(data))
        if(farequote.length-1===i){
          setLoading(false)
          handleclose()
          navigate(`/${location.pathname.split('/')[1]}/FlightDetails`)
        }
        }
        else{
          if(res.data.data.hasOwnProperty('ErrorCode')){
            if(res.data.data?.ErrorCode===5){
              navigate('/Flights')
            }
          }
          setSnackopen(true);
          setSnackmessage(res.data.data.message);
          // alert(res.data.data.message)
          break;
        }
      }
    }
   
   
   }
  return (
    <div style={{overflowY:'hidden!important'}}>
      <Loadingmodal open={loading} close={()=>setLoading(false)}/>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
        <Dialog  open={open} onClose={handleclose} 
         
          sx={{
            "& .MuiDialog-paper": {
            maxHeight: '500px',
            minWidth:'60vw',
            borderRadius: "15px",
            
          },}}
        >
          { open &&  <TabContext value={tabvalue}>
          <Grid container position={'relative'}>
            <Grid item md={11} textAlign={'right'}>
            <TabList onChange={flighttabs} className={book.tabs} variant="scrollable" orientation={'horizontal'}>
                {
                  props.package_selection.map((flight,index)=>{
                    let key =  Object.keys(flight)[0]
                    let airlinecode=Object.keys(flight)[1]
                    // console.log(flight[key],"lkjasdfj")
                    return(
                      <Tab value={index} sx={{textTransform:'none',}} key={index}  disableRipple label={
                      <Stack direction="row" alignItems={'center'} spacing={1} sx={{height:'100%',margin:'0rem 0.5rem'}}>
                        <img src={`${envdata.flagsbaseurl}/${flight[airlinecode]}.png`}alt="indigo" width="30%" height="45%"/>
                        <span style={{padding:'0px', whiteSpace: 'nowrap'}}>{flight[key]==="Indigo"?"IndiGo":flight[key]}</span>
                      </Stack>                    
                     }/>
                    )
                  })
                }
             </TabList>
            { open && <Breadcrumbs mt={3} separator="|" ariaLabel="breadcrumbs" sx={{fontSize:{xs:'11px',sm:'0.9rem'},color:'#303030',marginLeft:{xs:'0.5rem',sm:'1.5rem'}}}>
                       <span>{selected.length>0&&(selected[0]?.minarr.Segments[0][0].Origin.Airport.CityName??"")} - {selected[0]?.minarr.Segments[0].at(-1).Destination.Airport.CityName??""}{(waytype===2&&flightsdata.length===1)&&`,${selected.length>0&&(selected[0]?.minarr.Segments[1][0].Origin.Airport.CityName??"")}-${selected[0]?.minarr.Segments[1].at(-1).Destination.Airport.CityName??""}`}.{selected.length>0&&(get_date(selected[0]?.minarr.Segments[0][0].Origin.DepTime)??"")}</span>
                             <span>{helperFunctions.get_time(selected[0]?.minarr.Segments[0][0].Origin.DepTime)??""} - {helperFunctions.get_time(selected[0]?.minarr.Segments[0].at(-1).Destination.ArrTime)??""}</span>
             </Breadcrumbs>}
            <div style={{marginTop:'1.2rem',marginLeft:"1.5rem",width:'100%'}}> <Divider></Divider></div>
            </Grid>
            <Grid item sx={{position:'absolute',right:'1rem',top:'1rem'}}><CloseIcon sx={{borderRadius:'50%',color:'white',background:'linear-gradient(90deg, #FF4949 -23.22%, #C20000 132.61%)'}} onClick={handleclose}/></Grid>
          </Grid>
           <DialogContent sx={{padding:"10px 0px"}}>
           {props.package_selection.map((item,index)=>{
            return(
              <TabPanel value={index} sx={{padding:{xs:'0.5rem',md:'24px'}}}>
             
              {/* Saver */}
              {/* {console.log(selected[0],"first")} */}
              <Grid container spacing={3}>
              {(open&&selected.length>0)&&
               selected[0].totalarr.map((flight,index)=>{
              let cancellation=false;
              let reissue=false;
              // console.log(flight.ResultIndex)
                  const {Fare:innerfare,Segments:[innersegments],MiniFareRules:minifare=[],FareClassification:faretype}=flight
                  return(
                    <Grid item xs={12} md={6}>
                    <Grid container direction={'column'} rowSpacing={1} >
                      <div className={book.offerscard} id={`${flight.ResultIndex}_x`} style={{background:index===0&&styles.app_color,color:index===0 && 'White'}} onClick={()=>selectpackage(index,flight.ResultIndex)}>
                        {/* onClick={()=>selectpackage(index,flight.ResultIndex)} */}
                      <Grid item>
                        <Grid container style={{color:document.getElementById(`${flight.ResultIndex}_x`)?.style.backgroundColor==styles.shade_color?'white':'rgba(0, 53, 86, 1)'}}>
                          <Grid item xs={6} >
                            {faretype?.Type??""}
                          </Grid>
                          <Grid item xs={6}  textAlign={'right'}>&#8377; {innerfare?.PublishedFare}</Grid>
                        </Grid>
                      </Grid>
                      <Grid item mt={1}>
                        <Grid container className={book.offerstextsize}>
                          <Grid item xs={1}>
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.55176 6.18259C1.61077 5.94799 1.68413 5.72025 1.8439 5.5262C2.108 5.20549 2.451 5.01768 2.87519 4.99397C3.19896 4.97588 3.52468 4.99023 3.85986 4.99023C3.85986 7.74995 3.85986 10.5075 3.85986 13.2822C3.68966 13.2822 3.51784 13.2865 3.34601 13.2812C3.12136 13.2744 2.88921 13.2909 2.67337 13.2425C2.06789 13.1062 1.70076 12.7312 1.57458 12.1447C1.57034 12.1251 1.55958 12.107 1.55176 12.0882C1.55176 10.1197 1.55176 8.15114 1.55176 6.18259Z" fill="currentColor"/>
    <path d="M4.71354 4.98526C5.1123 4.98526 5.49737 4.98526 5.89873 4.98526C5.89873 4.93347 5.89873 4.88948 5.89873 4.8455C5.89873 4.43432 5.89775 4.02345 5.89906 3.61227C5.90004 3.33399 6.06795 3.17082 6.36074 3.17051C7.59745 3.16895 8.83416 3.16895 10.0705 3.17051C10.3685 3.17082 10.5339 3.33461 10.5345 3.62287C10.5355 4.07118 10.5348 4.51917 10.5348 4.98432C10.9316 4.98432 11.3229 4.98432 11.7207 4.98432C11.7207 7.75621 11.7207 10.5112 11.7207 13.2744C9.3829 13.2744 7.05164 13.2744 4.71289 13.2744C4.71354 10.5125 4.71354 7.75746 4.71354 4.98526ZM9.69623 3.98351C8.70374 3.98351 7.72298 3.98351 6.74255 3.98351C6.74255 4.32076 6.74255 4.64708 6.74255 4.97528C7.73113 4.97528 8.71189 4.97528 9.69623 4.97528C9.69623 4.64178 9.69623 4.31857 9.69623 3.98351Z" fill="currentColor"/>
    <path d="M12.5762 4.96497C12.9951 4.98805 13.4135 4.96777 13.8126 5.04265C14.4389 5.16026 14.8784 5.71121 14.8804 6.32267C14.8862 8.19545 14.8872 10.0682 14.8804 11.941C14.8778 12.6554 14.287 13.2369 13.5367 13.2759C13.2211 13.2925 12.9039 13.2787 12.5762 13.2787C12.5762 10.5184 12.5762 7.76025 12.5762 4.96497Z" fill="currentColor"/>
    </svg>
    
                          </Grid>
                         
                          <Grid item xs={4}>Cabin bag</Grid>
                          <Grid item xs={7}>{innersegments[0].CabinBaggage??""}</Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                      <Grid container className={book.offerstextsize}>
                          <Grid item xs={1}>
                          <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.20042 0.894348C5.77524 0.894348 7.35006 0.894348 8.92488 0.894348C9.96493 1.1041 10.3828 1.87553 10.3502 2.80933C10.3147 3.86917 10.3421 4.93103 10.3421 5.99188C10.3421 6.06146 10.3421 6.13104 10.3421 6.21675C10.7315 6.21675 11.0995 6.19961 11.4635 6.22281C11.7075 6.23894 11.9678 6.26919 12.1853 6.36903C12.7557 6.63121 12.9895 7.11223 12.9895 7.72837C12.9865 11.165 12.9875 14.6007 12.9875 18.0374C12.9875 18.0959 12.9854 18.1544 12.9824 18.2128C12.9417 18.9318 12.4029 19.4744 11.675 19.5298C11.5865 19.5369 11.4981 19.545 11.3994 19.554C11.3994 19.8797 11.4035 20.1853 11.3984 20.4908C11.3933 20.753 11.2673 20.8872 11.0172 20.8902C10.5058 20.8952 9.99339 20.8962 9.48201 20.8902C9.24513 20.8872 9.12414 20.7601 9.11296 20.5241C9.10788 20.4263 9.11093 20.3285 9.11093 20.2317C9.11093 20.0068 9.11093 19.7829 9.11093 19.556C7.39479 19.556 5.71221 19.556 4.01132 19.556C4.01132 19.8616 4.01234 20.154 4.01132 20.4455C4.00929 20.7803 3.89847 20.8922 3.56501 20.8932C3.11259 20.8942 2.65916 20.8942 2.20674 20.8932C1.83871 20.8932 1.72586 20.7813 1.72484 20.4152C1.72382 20.1308 1.72484 19.8465 1.72484 19.555C1.60487 19.545 1.50829 19.5359 1.41069 19.5298C1.13314 19.5127 0.889138 19.4098 0.673605 19.2404C0.279138 18.9248 0.133754 18.5093 0.134771 18.0172C0.138838 14.5936 0.136804 11.1701 0.137821 7.74753C0.137821 7.68299 0.138838 7.61744 0.142904 7.5529C0.176454 6.93979 0.556688 6.44566 1.15754 6.28634C1.38731 6.22583 1.63639 6.22684 1.87734 6.21877C2.17522 6.20768 2.47412 6.21575 2.78319 6.21575C2.78319 6.1139 2.78319 6.04331 2.78319 5.97171C2.78319 4.83926 2.78421 3.70681 2.78319 2.57437C2.78319 2.11957 2.92146 1.71822 3.23967 1.38444C3.50096 1.10914 3.83849 0.978046 4.20042 0.894348ZM3.86187 6.20365C5.66646 6.20365 7.45783 6.20365 9.26343 6.20365C9.26648 6.12902 9.27156 6.06549 9.27156 6.00196C9.27156 4.87657 9.27258 3.75219 9.27156 2.6268C9.27156 2.14881 9.07534 1.95621 8.58836 1.95621C7.23823 1.95621 5.88707 1.95621 4.53694 1.95621C4.05097 1.95621 3.85272 2.14982 3.85272 2.6268C3.85171 3.75219 3.85272 4.87657 3.85272 6.00196C3.85272 6.06549 3.85882 6.12902 3.86187 6.20365Z" fill="currentColor"/>
    </svg>
                            
                          </Grid>
                          <Grid item xs={4}>Check in</Grid>
                          {/* {console.log(innersegments[0]?.Baggage,"baggage")} */}
                          {/* <Grid item xs={7}>{innersegments[0]?.Baggage}</Grid> */}
                        </Grid>
                      </Grid>
                      {/* {console.log(minifare[0],"minifare")} */}
                      {
                        minifare.length>0&&minifare[0].map((item,index)=>{
                          if(item.Type==="Cancellation" && !cancellation)
                          {
                            cancellation=true
                            return(
                              <Grid item>
                      <Grid container className={book.offerstextsize}>
                          <Grid item xs={1}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.79968 13.906C6.55124 13.8719 6.30175 13.8434 6.05436 13.8034C3.45061 13.3796 1.22474 11.2651 0.70837 8.67731C0.209402 6.17655 0.905661 4.03976 2.75504 2.28154C2.82916 2.21125 2.90814 2.14618 3.00557 2.06059C2.5581 2.00492 2.13881 1.95272 1.70457 1.89879C1.73553 1.64165 1.76511 1.39356 1.79747 1.12459C2.70146 1.23524 3.59814 1.34519 4.51187 1.45689C4.40087 2.36296 4.29057 3.25964 4.17888 4.17094C3.91861 4.13927 3.67051 4.109 3.40502 4.07699C3.46313 3.59403 3.5202 3.11907 3.579 2.63228C2.12803 3.69354 0.956462 5.88984 1.43908 8.38294C1.92969 10.9174 4.19558 13.1075 7.21618 13.1308C7.21618 13.3886 7.21618 13.6475 7.21618 13.906C7.07734 13.906 6.93851 13.906 6.79968 13.906Z" fill="currentColor"/>
    <path d="M13.8848 7.65329C13.8511 7.89756 13.8253 8.14321 13.7818 8.38574C13.5014 9.95154 12.754 11.2529 11.556 12.2975C11.5205 12.3284 11.486 12.3601 11.4303 12.4102C11.875 12.4662 12.2964 12.5191 12.7289 12.5737C12.6969 12.8364 12.6666 13.0842 12.6343 13.3469C11.7299 13.2359 10.8364 13.1263 9.92092 13.0139C10.0312 12.1137 10.1412 11.2174 10.2532 10.3012C10.51 10.3319 10.7574 10.3611 11.0271 10.3931C10.9693 10.8761 10.9122 11.3534 10.8531 11.8468C12.4742 10.6255 13.4488 8.37565 12.9874 6.05931C12.4669 3.44582 10.0782 1.31807 7.22461 1.33964C7.22461 1.08633 7.22461 0.833367 7.22461 0.547348C7.58405 0.582492 7.9414 0.588059 8.28726 0.655562C11.0177 1.18759 12.8044 2.78957 13.6346 5.44169C13.7616 5.84706 13.7888 6.28374 13.8622 6.70616C13.8688 6.74408 13.8775 6.78201 13.8852 6.81994C13.8848 7.09761 13.8848 7.37562 13.8848 7.65329Z" fill="currentColor"/>
    <path d="M10.7331 7.23582C10.7334 9.17602 9.15092 10.7568 7.21072 10.7536C5.27643 10.7505 3.70054 9.17184 3.7002 7.23721C3.7002 5.29701 5.2827 3.7166 7.22255 3.71973C9.15753 3.72286 10.7327 5.30014 10.7331 7.23582ZM6.42155 8.61894C6.68565 8.3538 6.95636 8.0817 7.23542 7.8016C7.50196 8.06883 7.77093 8.33849 8.03224 8.6005C8.21631 8.41643 8.39655 8.23654 8.59454 8.0389C8.3287 7.77585 8.05625 7.50583 7.77928 7.23164C8.05381 6.9585 8.32383 6.69023 8.57853 6.43726C8.38681 6.24589 8.20448 6.06425 8.00371 5.86418C7.74866 6.12201 7.48073 6.39272 7.19715 6.67909C6.92992 6.40838 6.6606 6.13558 6.40624 5.8774C6.2187 6.0653 6.0388 6.24519 5.83073 6.45362C6.09413 6.71319 6.36727 6.98251 6.65503 7.26644C6.38954 7.52949 6.11953 7.79707 5.85961 8.05456C6.04089 8.23689 6.22044 8.41713 6.42155 8.61894Z" fill="currentColor"/>
    </svg>
    
                          </Grid>
                          <Grid item xs={4}>Cancellation</Grid>
                          <Grid item xs={7}>Cancellation fee  {item?.Details} </Grid>
                      </Grid>
                      </Grid>
                            ) 
                          }
                        })
                       
                      }
                      {
                       minifare.length>0 && minifare[0].map((item,index)=>{
                          if(item.Type==="Reissue" && !reissue){
                            reissue=true
                           return( <Grid item>
                      <Grid container className={book.offerstextsize}>
                          <Grid item xs={1}>
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.4642 8.38647C16.4642 8.45357 16.4642 8.51083 16.4642 8.56852C16.4642 10.3014 16.4655 12.0343 16.4638 13.7671C16.4629 14.7816 15.8468 15.594 14.9003 15.8205C14.726 15.862 14.542 15.8761 14.3623 15.8761C11.2185 15.8795 8.07519 15.8795 4.93143 15.8778C3.85676 15.8769 3.03314 15.1915 2.85125 14.1505C2.83118 14.0359 2.82905 13.9171 2.82905 13.8C2.82777 12.0458 2.82819 10.2916 2.82819 8.53775C2.82819 8.49075 2.83246 8.44374 2.83545 8.38647C7.37411 8.38647 11.9059 8.38647 16.4642 8.38647Z" fill="currentColor"/>
    <path d="M13.7376 4.28014C13.9694 4.28014 14.1765 4.27885 14.3836 4.28014C15.5795 4.28825 16.4548 5.16601 16.4629 6.36471C16.4642 6.57197 16.4629 6.77923 16.4629 6.99674C11.9161 6.99674 7.38088 6.99674 2.8435 6.99674C2.76408 6.15146 2.84094 5.36045 3.54501 4.76688C3.89 4.47586 4.28494 4.30578 4.73667 4.28655C5.00139 4.27501 5.26696 4.28441 5.55218 4.28441C5.55218 4.04339 5.55218 3.8216 5.55218 3.59981C5.55218 3.38144 5.5509 3.16264 5.5526 2.94427C5.55559 2.53872 5.83611 2.24044 6.21825 2.23403C6.61234 2.22719 6.90822 2.51479 6.91676 2.92846C6.92488 3.31221 6.9189 3.69596 6.9189 4.07971C6.9189 4.13783 6.9189 4.19595 6.9189 4.26689C8.73778 4.26689 10.5447 4.26689 12.3704 4.26689C12.3704 4.13997 12.3704 4.01903 12.3704 3.89766C12.3704 3.57801 12.3661 3.25794 12.3717 2.93828C12.3794 2.52291 12.6689 2.23103 13.0612 2.2336C13.4515 2.23616 13.735 2.53487 13.7371 2.95025C13.7393 3.38656 13.7376 3.82288 13.7376 4.28014Z" fill="currentColor"/>
    </svg>
                          </Grid>
                          <Grid item xs={4}>Date Change</Grid>
                          <Grid item xs={7}>Date change fee starting  {item?.Details}</Grid>
                        </Grid>
                            </Grid>)
                          }
                        })
                      }
                      {
                        minifare.length>0&&minifare[0].map((item,index)=>{
                        if(item.Type!=="Reissue" && item.Type!=="Cancellation"){
                          return(
                            <Grid item>
                            <Grid container className={book.offerstextsize}>
                                <Grid item xs={1}>
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.13585 13.7453C1.8686 13.6809 1.60924 13.5978 1.3946 13.4138C0.988104 13.0657 0.777402 12.6271 0.847167 12.0845C0.904555 11.6384 1.27729 11.3254 1.72148 11.324C2.60789 11.3211 3.49458 11.3231 4.38098 11.3231C6.43652 11.3231 8.49261 11.3431 10.5479 11.3123C11.2489 11.3018 11.8242 11.8452 11.5189 12.7165C11.3229 13.2762 10.9268 13.6137 10.3462 13.7231C10.3259 13.7268 10.3071 13.7379 10.2877 13.7456C7.5702 13.7453 4.85302 13.7453 2.13585 13.7453Z" fill="currentColor"/>
          <path d="M3.33666 10.7115C2.90851 10.7115 2.48598 10.7115 2.06739 10.7115C2.06739 10.5366 2.06008 10.3651 2.06852 10.1945C2.12394 9.0854 2.18273 7.97656 2.24068 6.86772C2.27106 6.28724 2.28879 5.70562 2.33548 5.12656C2.41341 4.1647 3.14003 3.47798 4.09311 3.4438C4.1955 3.44009 4.29818 3.44323 4.41127 3.44323C4.41127 3.241 4.41127 3.04874 4.41127 2.83683C4.23995 2.83683 4.0661 2.83683 3.89225 2.83683C3.46325 2.83654 3.21711 2.59415 3.22302 2.16178C3.22695 1.88094 3.2157 1.59326 3.27168 1.32125C3.38055 0.795173 3.85681 0.420054 4.38905 0.417206C5.60599 0.410939 6.82294 0.4098 8.03989 0.41749C8.67283 0.421478 9.18763 0.947842 9.20535 1.58728C9.21126 1.80404 9.21042 2.02108 9.2062 2.23812C9.19945 2.57877 8.94289 2.83227 8.60419 2.83626C8.41178 2.83853 8.21936 2.83654 8.01851 2.83654C8.01851 3.03877 8.01851 3.2316 8.01851 3.43269C8.17604 3.44038 8.32935 3.44152 8.48154 3.45604C9.37667 3.54064 10.0645 4.28888 10.107 5.19549C10.1753 6.65581 10.256 8.11527 10.3314 9.57502C10.3494 9.92166 10.3677 10.268 10.3854 10.6146C10.3869 10.644 10.3857 10.6733 10.3857 10.7103C9.9497 10.7103 9.52295 10.7103 9.07651 10.7103C9.06104 10.4927 9.04416 10.2746 9.02982 10.0561C8.94542 8.75329 8.86244 7.45048 8.7772 6.14768C8.76482 5.95769 8.76229 5.76373 8.72066 5.57973C8.59716 5.03485 8.12766 4.66087 7.57516 4.65859C6.66681 4.65489 5.75818 4.65432 4.84983 4.65859C4.22082 4.66172 3.71728 5.15419 3.6748 5.78822C3.56706 7.40235 3.4565 9.01618 3.34679 10.6303C3.3451 10.6557 3.3406 10.6804 3.33666 10.7115ZM5.02452 3.43155C5.82232 3.43155 6.61196 3.43155 7.40103 3.43155C7.40103 3.22932 7.40103 3.03678 7.40103 2.84366C6.60464 2.84366 5.81782 2.84366 5.02452 2.84366C5.02452 3.03962 5.02452 3.22875 5.02452 3.43155Z" fill="currentColor"/>
          <path d="M8.46398 10.7111C6.95644 10.7111 5.45903 10.7111 3.94727 10.7111C3.95514 10.5647 3.96105 10.4237 3.97033 10.283C4.03644 9.29211 4.10311 8.30147 4.16978 7.31084C4.20354 6.80897 4.23505 6.30682 4.27246 5.80523C4.29468 5.50759 4.54421 5.26577 4.84971 5.26349C5.75806 5.25722 6.66613 5.25722 7.57448 5.26349C7.89714 5.26577 8.13822 5.51157 8.1596 5.83913C8.23696 7.02487 8.31179 8.21061 8.38774 9.39635C8.41306 9.79027 8.43866 10.1839 8.4637 10.5778C8.46623 10.6197 8.46398 10.6618 8.46398 10.7111Z" fill="currentColor"/>
          </svg>
          
                                </Grid>
                                <Grid item xs={4}>{item.Type}</Grid>
                                <Grid item xs={7}>{item.Details}</Grid>
                              </Grid>
                            </Grid>
                          )
                        }
                      })}
                      
                      {/* <Grid item>
                        <Grid contianer>
                          <Grid item sx={{color:'red',fontSize:'14px',visibility:'hidden'}}>empty</Grid>
                        </Grid>
                      </Grid> */}
                     </div>
                    </Grid>
                    </Grid>
   
                  )
                })
             
              }
              </Grid>
              
              
    
             
             </TabPanel>
            )
           })}
           </DialogContent>
          </TabContext>}
        

          <footer style={{background:styles.app_color}}>
              <Grid sx={{padding:{xs:'1rem 0.5rem',sm:'1.3rem 2.5rem'}}}>
            <Grid container>
              <Grid item  xs={9} sx={{color:'#ffff'}} className='bookNow_footer_text'>Total {waytype===1?"One way":waytype===2?"Round Trip":waytype===3&&"Multicity"} Base fare for 1 Traveller : ₹ {(open&&selected.length>0)&&selected[0].minarr.Fare.PublishedFare} </Grid>
{ open&&             <Grid item  xs={3} textAlign={'right'}><button style={{border:'none',padding:'0.3rem 0.7rem',borderRadius:'0.5rem',color:styles.app_color}} onClick={farequotebook}>{props.package_selection.length===2 && tabvalue===0?"Next":"Book Now"}</button></Grid>
}            </Grid>
              </Grid>
          </footer>  
        </Dialog>
    </div>
  )
}

export default BookNow