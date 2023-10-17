 import { Avatar, Badge, Container, Drawer, Grid,Divider,Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import notification from "../../assets/Subadminassets/notification.svg";
import { styled } from "@mui/material/styles";
import Subadmincontext from "./Subadminprovider";
import profile1 from '../../assets/Subadminassets/profile1.svg';
import profile2 from '../../assets/Subadminassets/profile2.svg'
import profile3 from '../../assets/Subadminassets/profile3.svg'
import profile4 from '../../assets/Subadminassets/profile4.svg'
import { useLocation } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 11,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    // padding: '4px 4px',
    padding: "10px 6px 8px 4px",
    color: "#003556",
    backgroundColor: "#DEF2FF",
  },
}));
const Header = () => {
  const {data,setData}=useContext(Subadmincontext)
  const [notifications,setNotifications]=useState(false);
  const location=useLocation()
  const pathname=location.pathname.split("/").at(-1);
  const handlenotifications=()=>{
    setData((prev)=>({...prev,notify:true}));
    setNotifications(true)
  }
  const handledrawerclose=()=>{
    setNotifications(false);
    setData((prev)=>({...prev,notify:false}))
  }
  const myArray = [
    { profileImage: profile1, name: 'Harsha vardhan Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Today 07:00 PM' },
    { profileImage: profile2, name: 'Supriya Booked Shree Hotel & Family in Hyderabad for 30/05/2023', date: 'Yesterday 08:12 PM' },
    { profileImage: profile3, name: 'Kumar Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Tuesday 10:12 PM' },
    { profileImage: profile4, name: 'Sowmya Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Monday 09:12PM' },
    { profileImage: profile1, name: 'Harsha vardhan Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Today 07:00 PM' },
    { profileImage: profile2, name: 'Supriya Booked Shree Hotel & Family in Hyderabad for 30/05/2023', date: 'Yesterday 08:12 PM' },
    { profileImage: profile3, name: 'Kumar Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Tuesday 10:12 PM' },
    { profileImage: profile4, name: 'Sowmya Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Monday 09:12PM' },
    { profileImage: profile1, name: 'Harsha vardhan Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Today 07:00 PM' },
    { profileImage: profile2, name: 'Supriya Booked Shree Hotel & Family in Hyderabad for 30/05/2023', date: 'Yesterday 08:12 PM' },
    { profileImage: profile3, name: 'Kumar Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Tuesday 10:12 PM' },
    { profileImage: profile4, name: 'Sowmya Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Monday 09:12PM' },
    { profileImage: profile1, name: 'Harsha vardhan Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Today 07:00 PM' },
    { profileImage: profile2, name: 'Supriya Booked Shree Hotel & Family in Hyderabad for 30/05/2023', date: 'Yesterday 08:12 PM' },
  ];
  return (
    <div style={{ backgroundColor: "#ffff", padding:"0rem 0.8rem"}}>
      <Grid
        container
        style={{
          justifyContent: "space-between",
          height: "15vh",
          alignItems: "center",
        }}
      >
        <Grid item>{pathname==="subadmin"?"Dashboard":pathname==="addhotel"?"Hotel":pathname==="rooms"?"Room Management":pathname==="bookings"&&`Bookings > ${data.activeTab}`}</Grid>
        <Grid item>
          <Grid container spacing={0.5}>
            <Grid item>
              <StyledBadge badgeContent={4} sx={{ color: "red" }}>
                <img
                  src={notification}
                  alt="notification"
                  style={{ width: "80%", height: "80%" }}
                  onClick={()=>handlenotifications()}
                />
              </StyledBadge>
            </Grid>
            {/* <Grid item>
              <Avatar>S</Avatar>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <Drawer anchor="right" open={notifications} onClose={()=>handledrawerclose()}
     sx={{borderRadius:'1rem'}}
     id="drawer"
      >
        <div  style={{width:'81vw',paddingTop:'2rem',paddingLeft:'1rem'}}>
        <Typography style={{fontFamily: 'Poppins'}}>Notification</Typography>
      <Divider  sx={{marginTop:'1rem'}}/>
      <Container maxWidth="xl">
      <div>
      {myArray.map((item, index) => (
        <Grid container key={index} alignItems="center" sx={{paddingTop:'18px'}}>
          {/* Profile Image and Name */}
          <Grid item xs={8} container alignItems="center" spacing={2}>
            <Grid item md={1}>
              <img src={item.profileImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </Grid>
            <Grid item md={11}>
              <Typography variant="h6" style={{ fontFamily: 'Poppins', fontSize: '14px'}}>
                {item.name}
              </Typography>
            </Grid>
          </Grid>

          {/* Date */}
          <Grid item xs={4} container justifyContent="flex-end">
            <Typography variant="body2" style={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              {item.date}
            </Typography>
          </Grid>

          
          {index !== myArray.length - 1 && (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          )}
        </Grid>
      ))}
      </div>
      </Container>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
