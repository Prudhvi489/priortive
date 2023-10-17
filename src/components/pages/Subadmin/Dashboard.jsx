import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../../App.css";
import { Grid, Typography } from "@material-ui/core";
import rooms from "../../../assets/Subadminassets/rooms.svg";
import newbookingsdashboard from "../../../assets/Subadminassets/newbookingsdashboard.svg";
import cancelledbookings from "../../../assets/Subadminassets/cancelledbookings.svg";
import completedbookings from "../../../assets/Subadminassets/completedbookings.svg";
import adminshare from "../../../assets/Subadminassets/adminshare.svg";
import refundamount from "../../../assets/Subadminassets/refundamount.svg";
import generatedamount from "../../../assets/Subadminassets/generatedamount.svg";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { makeStyles } from "@mui/styles";
import { Avatar, Button, Container, Paper, Rating, Stack } from "@mui/material";
import { Divider } from "@material-ui/core";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import calendarImage from "../../../assets/images/calender.svg";
import MySnackbar from "../../modals/Signupmodals/Snackbar";
import { useLocation } from "react-router-dom";
import { Subadminapicalls } from "../../../ApiServices/Subadminapicalls";
import Hotelhelpers from "../../../helpers/Hotelhelpers";
import {styles} from '../../../assets/styles/Styles_export'

const Dashboard = () => {
  const tableData = [
    {
      name: "Harsha Vardhan",
      date: "29,Dec 2023 - 30, Dec 2023",
      status: "Single",
    },
    { name: "Siva", date: "29,Dec 2023 - 30, Dec 2023", status: "Single" },
    { name: "Kumar", date: "29,Dec 2023 - 30, Dec 2023", status: "Double" },
    { name: "Srinu", date: "29,Dec 2023 - 30, Dec 2023", status: "Single" },
    { name: "Prakash", date: "29,Dec 2023 - 30, Dec 2023", status: "Double" },
    { name: "Surya", date: "29,Dec 2023 - 30, Dec 2023", status: "King" },
    { name: "Sam", date: "29,Dec 2023 - 30, Dec 2023", status: "Triple" },
    { name: "Surya", date: "29,Dec 2023 - 30, Dec 2023", status: "King" },
    { name: "Sam", date: "29,Dec 2023 - 30, Dec 2023", status: "Triple" },
  ];

  const gridBackgrounds = [
    rooms,
    newbookingsdashboard,
    cancelledbookings,
    completedbookings,
    adminshare,
    refundamount,
    generatedamount,
  ];

  const gridItemStyle = {
    width: "50vw",
    height: "50vh",
  };

  const dashboardCardStyle = {
    height: "46vh",
    color: "white",
    fontFamily: "Mulish",
    alignItems: "center",
    display: "flex",
    fontWeight: "700",
    marginLeft: "3rem",
  };
  const dashboard_cards_generate = {
    height: "46vh",
    color: "white",
    fontFamily: "Mulish",
    alignItems: "center",
    display: "flex",
    fontWeight: "700",
    marginLeft: "16rem",
    // marginTop: '18rem'
  };
  const bookings = {
    marginTop: "30px",
    marginBottom: "0",
    border: "1px solid lightgray",
  };
  const location=useLocation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [dashboard_data,setDashboard_data]=useState({})
  const handleDatesChange = ({ startDate, endDate }) => {
    if(!startDate && endDate){
      setSnack((prev)=>({...prev,snackopen:true,snackmessage:'Setting an end date before the start date is not possible.'}))
      return
    }
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };
  const [snack,setSnack] = useState({
    snackopen : false,
    snackmessage : '',
  })
  const hotel_id = JSON.parse(localStorage.getItem('subadmin_login_details'))
const get_dashboard_data=async()=>{
  try{
    const dashboard_res=await Subadminapicalls('getsubAdminDashboard',{"hotel_code":hotel_id.hotel_code},'POST','application/json');
    console.group(dashboard_res,"result")
    if(dashboard_res.status){
      setDashboard_data(dashboard_res?.data)
    }
    else{
      setSnack((prev)=>({...prev,snackmessage:dashboard_res?.message}))
    }
  }
  catch(error){

  }
}
useLayoutEffect(()=>{
if(location.pathname==="/subadmin"){
  get_dashboard_data()
}
},[location])
  return (
    <>
      <MySnackbar open={snack.snackopen} close={()=>setSnack((prev)=>({...prev,snackopen:false}))} message={snack.snackmessage} />
      {/* <Grid
        container
        justifyContent="flex-end"
        spacing={2}
        alignItems="center"
        style={{padding:'0rem 0.8rem'}}
      >
        <Grid item id="daterange">
          <Grid style={{border:`1px solid ${styles.app_color}`,paddingRight:'0.3rem',paddingLeft:'0.11rem',borderRadius:'0.3rem'}} container alignItems="center">
            <DateRangePicker
              startDate={startDate}
              startDateId="startdate"
              endDate={endDate}
              endDateId="enddate"
              small="true"

              noBorder={true}
              onDatesChange={handleDatesChange}
              focusedInput={focusedInput}
              onFocusChange={handleFocusChange}
              isOutsideRange={() => false}
            />
            <svg width="19" height="19" viewBox="0 0 19 19" fill="#003556" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7025 8.59546C16.7025 8.66255 16.7025 8.71982 16.7025 8.77751C16.7025 10.5104 16.7038 12.2432 16.7021 13.9761C16.7012 14.9906 16.0851 15.803 15.1385 16.0295C14.9643 16.0709 14.7803 16.085 14.6006 16.085C11.4568 16.0885 8.31347 16.0885 5.16971 16.0868C4.09504 16.0859 3.27142 15.4004 3.08953 14.3594C3.06946 14.2449 3.06733 14.1261 3.06733 14.009C3.06605 12.2548 3.06647 10.5005 3.06647 8.74674C3.06647 8.69973 3.07074 8.65272 3.07373 8.59546C7.61239 8.59546 12.1442 8.59546 16.7025 8.59546Z" />
            <path d="M13.9778 4.48918C14.2096 4.48918 14.4167 4.4879 14.6238 4.48918C15.8197 4.4973 16.695 5.37506 16.7031 6.57375C16.7044 6.78101 16.7031 6.98827 16.7031 7.20579C12.1564 7.20579 7.62111 7.20579 3.08373 7.20579C3.00432 6.36051 3.08117 5.5695 3.78524 4.97592C4.13023 4.6849 4.52517 4.51482 4.97691 4.49559C5.24162 4.48405 5.5072 4.49345 5.79241 4.49345C5.79241 4.25243 5.79241 4.03064 5.79241 3.80885C5.79241 3.59048 5.79113 3.37168 5.79284 3.15331C5.79583 2.74777 6.07634 2.44948 6.45848 2.44307C6.85257 2.43623 7.14846 2.72383 7.157 3.1375C7.16511 3.52125 7.15913 3.90501 7.15913 4.28876C7.15913 4.34688 7.15913 4.40499 7.15913 4.47593C8.97801 4.47593 10.7849 4.47593 12.6106 4.47593C12.6106 4.34901 12.6106 4.22808 12.6106 4.10671C12.6106 3.78706 12.6064 3.46698 12.6119 3.14733C12.6196 2.73195 12.9091 2.44008 13.3015 2.44264C13.6917 2.44521 13.9752 2.74392 13.9774 3.15929C13.9795 3.59561 13.9778 4.03193 13.9778 4.48918Z" />
            </svg>
          </Grid>
        </Grid>
        <Grid item>
          <button
            style={{
              backgroundColor: styles.app_color,
              border: "none",
              color: "#ffff",
              width: "5rem",
              height: "2rem",
              borderRadius: "0.5rem",
            }}
            size="small"
            variant="contained"
            onClick={(e) => {
              setStartDate("");
              setEndDate("");
            }}
          >
            Clear
          </button>
        </Grid>
      </Grid> */}

      <Grid container spacing={1} justifyContent="center">
        <Grid item direction="column" md={6} sm={12}>
          <Grid item container>
            <Grid
              item
              md={6}
              sm={6}
              style={{
                // backgroundImage: `url(${gridBackgrounds[0]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // height: "213px",
                // paddingTop: "5rem",
                // paddingLeft: "2.5rem",
                color: "#fff",
                position:'relative',
              }}
            >
              <Grid>
                <img src={gridBackgrounds[0]} alt="" width={'100%'} />
              </Grid>
              <Stack direction="column" spacing={1} style={{position:"absolute",top:'35%',left:'13%',}}>
                <span>Rooms</span>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Stack direction="column">
                    <span>Total</span>
                    <span>{dashboard_data?.rooms?.totalRooms}</span>
                  </Stack>
                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{ filter: "brightness(11) invert(1)" }}
                  />
                  <Stack direction="column">
                    <span>Available</span>
                    <span>{dashboard_data?.rooms?.available}</span>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              md={6}
              sm={6}
              style={{
                // backgroundImage: `url(${gridBackgrounds[1]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // height: "213px",
                // paddingTop: "5rem",
                // paddingLeft: "2.5rem",
                color: "#fff",
                position:'relative'
              }}
            >
              <Grid>
                <img src={gridBackgrounds[1]} alt="" width={'100%'} />
              </Grid>
              <Stack style={{position:"absolute",top:'35%',left:'13%',}}>
                <span>New Bookings</span>
                <span>{dashboard_data?.upcomingBookings}</span>
              </Stack>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid
              item
              md={6}
              sm={6}
              style={{
                // backgroundImage: `url(${gridBackgrounds[2]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // height: "213px",
                // paddingTop: "5rem",
                // paddingLeft: "2.5rem",
                color: "#fff",
                position:'relative'
              }}
            >
              <Grid>
                <img src={gridBackgrounds[2]} alt="" width={'100%'} />
              </Grid>
              <Stack style={{position:"absolute",top:'35%',left:'13%',}}>
                <span>Cancelled Bookings</span>
                <span>{dashboard_data?.cancelledBookings}</span>
              </Stack>
            </Grid>
            <Grid
              item
              md={6}
              sm={6}
              style={{
                // backgroundImage: `url(${gridBackgrounds[3]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // height: "213px",
                // paddingTop: "5rem",
                // paddingLeft: "2.5rem",
                color: "#fff",
                position:"relative"
              }}
            >
              <Grid>
                <img src={gridBackgrounds[3]} alt="" width={'100%'} />
              </Grid>
              <Stack style={{position:"absolute",top:'35%',left:'13%',}}>
                <span>Completed Bookings</span>
                <span>{dashboard_data?.completedBookings}</span>
              </Stack>
            </Grid>
          </Grid>
          {/* <Grid item container>
            <Grid
              item
              md={6}
              style={{
                backgroundImage: `url(${gridBackgrounds[4]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "213px",
                paddingTop: "5rem",
                paddingLeft: "2.5rem",
                color: "#fff",
              }}
            >
              <Stack>
                <span>Admin Share</span>
                <span>12,000</span>
              </Stack>
            </Grid>
            <Grid
              item
              md={6}
              style={{
                backgroundImage: `url(${gridBackgrounds[5]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "213px",
                paddingTop: "5rem",
                paddingLeft: "2.5rem",
                color: "#fff",
              }}
            >
              <Stack>
                <span>Refund Amount</span>
                <span>INR 12,200</span>
              </Stack>
            </Grid>
          </Grid> */}
           <Grid
            item
            style={{
              // backgroundImage: `url(${gridBackgrounds[6]})`,
              color: "#fff",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              // height: "210px",
              textAlign: "center",
              // paddingTop: "15%",
              // paddingLeft: "15%",
              marginTop: "1%",
              position:'relative'
            }}
          >
            <Grid>
              <img src={gridBackgrounds[6]} alt="" width={'100%'} />
            </Grid>
            <Stack style={{position:"absolute",top:'35%',left:'45%',}}>
              <span>Generated Amount</span>
              <span>INR {Number(dashboard_data?.generatedAmount).toLocaleString()}</span>
            </Stack>
          </Grid>
        </Grid>
        <Grid container item md={6} sm={12} direction={"column"} mt={1} spacing={2}>
          <Grid item>
            <Paper
              style={{
                marginLeft: "1%",
                marginright: "2%",
                borderRadius: "14px",
              }}
              sx={{boxShadow:"0px 0px 12px 0px #30303040 !important",}}
            >
              <div style={{ padding: "1rem", marginTop: "0.6rem" }}>
                <Grid item>
                  <span style={{ fontSize: "18px", fontWeight: 600 }}>
                    Today Bookings
                  </span>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: "1rem",
                    height: "40vh",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                  className="scroll_none"
                >
                  {(Object.keys(dashboard_data).length>0)&&dashboard_data?.todayBookings.map((item, index) => {
                    return (
                      <Grid
                        container
                        justifyContent="space-between"
                        style={{ marginTop: "1rem", fontSize: "14px" }}
                      >
                        <Grid item>{item?.booked_by_name}</Grid>
                        <Grid item>{Hotelhelpers.getshortdate(item?.from_date)} - {Hotelhelpers.getshortdate(item?.to_date)} </Grid>
                        <Grid item>{item?.room_type_name}</Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </Paper>
          </Grid>
         <Grid item>
          <Paper sx={{borderRadius:'0.9rem',padding:'1rem',height:'47vh',overflowX:'scroll',marginLeft: "1%",boxShadow:"0px 0px 12px 0px #30303040 !important",}} className="scroll_none">
            <Stack spacing={2}>
            <Grid item>Reviews</Grid>
            {(Object.keys(dashboard_data).length>0)&&dashboard_data?.reviews.map((item,index)=>{
              return(
                <Grid container direction="column" spacing={1}  >
              {index>0&&<Grid item >
                <Divider sx={{border:'1.5px solid #000000'}}/>
              </Grid>}
                <Grid item container alignItems="center" spacing={1}>
                  <Grid item><Avatar/></Grid>
                  <Grid item>{item?.booked_by_name}</Grid>
                </Grid>
                <Grid item>
                  <Rating value={item?.rating??0} readOnly/>
                </Grid>
                <Grid item>
                  <span style={{fontSize:'14px'}}>{item?.review}</span>
                </Grid>
            </Grid>
              )
            })
            
            }
            </Stack>
          </Paper>
         </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
