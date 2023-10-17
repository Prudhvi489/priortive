import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import hotel from '../../assets/Subadminassets/hotel.svg';
import logo from '../../assets/Subadminassets/logo.svg';
import logout from '../../assets/Subadminassets/logout.svg';
import notification from '../../assets/Subadminassets/notification.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import dashboard from '../../assets/Subadminassets/dashboard.svg';
import complete from '../../assets/Subadminassets/complete.svg';
import Subadmincontext from './Subadminprovider';
import roombed from '../../assets/Subadminassets/roombed.svg'
import { Drawer,Grid,List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
  const drawerWidth = 220;

  const useStyles = makeStyles((theme) => ({
    bookingYourHotelsItem: {
      // Custom styles for "Booking for your Hotels" list item
      '& $listItemText': {
        fontWeight: '700',
      },
    },
    drawer: {
      width: `${drawerWidth}px!important`,
      flexShrink: 0,
      "& .MuiDrawer-paper":{
        width: `${drawerWidth}px!important`,
        backgroundColor: '#DEF2FF !important',
        borderRadius: '0 30px 30px 0 !important',
        paddingLeft:'0px !important',
        display:'inherit !important',
        "&::-webkit-scrollbar":{
          display: "none",
        }
      }
    },
    // drawerPaper: {
    //   width: `${drawerWidth}px!important`,
    //   backgroundColor: '#DEF2FF !important',
    //   borderRadius: '0 30px 30px 0 !important',
    //   paddingLeft:'0px !important',
    //   display:'inherit !important',
    // },
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    listItem: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: '1px',
      position: 'relative',
      '&:hover': {
        background: 'linear-gradient(45deg, #003556, transparent)',
        color: 'white',
        fontWeight: '700',
        fontSize: '14px',
        '& $listItemText': {
          color: 'white',
        },
        '& $listItemIcon': {
          filter: 'brightness(0) invert(1)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-10px',
          height: '100%',
          width: '10px', 
          background: 'rgb(0,53,86,1)',
          borderBottomLeftRadius: '10px',
          borderTopLeftRadius: '10px',
          zIndex: 1,
        },
      },
      '& $activeListItem': {
        background: 'linear-gradient(45deg, #003556, transparent)',
        color: 'white',
        fontWeight: '700',
        fontSize: '14px',
        '& $listItemText': {
          color: 'white',
        },
        '& $listItemIcon': {
          filter: 'brightness(0) invert(1)',
        },
        '&::before': {
          display: 'none',
        },
      },
    },
    
   
    activeListItem: {
      background: 'linear-gradient(45deg, #003556, transparent)',
      color: 'white',
      fontWeight: '700',
      fontSize: '14px',
      borderTopLeftRadius: '15px',
      borderBottomLeftRadius: '15px',
      '& $listItemText': {
        color: 'white',
      },
      '& $listItemIcon': {
        filter: 'brightness(0) invert(1)',
      },
    },
    activeListItemIcon: {
      filter: 'brightness(0) invert(1)',
      marginLeft: '15px',
    },
    listItemIcon: {
      minWidth: theme.spacing(4),
    },
    listItemText: {
      fontSize: '0.8rem',
      fontFamily: 'Poppins',
      color: 'rgb(0,53,86,1)', 
      transition: 'color 0.3s',  
    },
    listItemTextSmall: {
      // fontSize: '14px',
    },
    logoutButton: {
      position: 'absolute',
      bottom:0, //theme.spacing(2),
      width: '100%',
    },
  }));

const Sidebar = () => {
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate=useNavigate();
  const location=useLocation();
  const pathname=location.pathname.split("/").at(-1)
  const {data,setData}=useContext(Subadmincontext);
  const ACTIVE_BG_COLOR = "rgb(0, 53, 86)";
  const INACTIVE_BG_COLOR = "transparent";
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
useEffect(()=>{
  pathname==="subadmin"?setActiveItem("Dashboard"):pathname==="addhotel"?setActiveItem("Hotel Management"):pathname==="rooms"?setActiveItem("Room Management"):pathname==="bookings"&&setActiveItem("Bookings")
},[location])
  const sidebarItems = [
    {
      name: 'Dashboard',
      icon: <img src={dashboard} alt="Dashboard" />,
      link:'/subadmin',
    },
    {
      name: 'Hotel Management',
      icon: <img src={hotel} alt="Hotels" />,
      link:'/subadmin/addhotel',
    },
    {
      name: 'Room Management',
      icon: <img src={roombed} alt="New Bookings" />,
      link:'/subadmin/rooms',
    },
    {
      name: 'Bookings',
      icon: <img src={complete} alt="Completed Bookings" />,
      link:'/subadmin/bookings',
    }
    
    // {
    //   name: 'Booking for your Hotels',
    //   icon: <img src={cancel} alt="Booking for your hotels" />,
    // },
  ];

  //logout function
  function logOutFunction(){
    localStorage.removeItem('subadmin_login')
    localStorage.removeItem('subadmin_login_details')
    // navigate('/subadminlogin')
    setTimeout(()=>{
      window.location.reload()
    },1000)
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      // classes={{
      //   paper: classes.drawerPaper,
      // }}
    >
      <div className={classes.toolbar} style={{ justifyContent: 'space-around' }}>
        <img src={logo} alt="logo" className={classes.logo} style={{ width: '6rem', marginTop: '15px' }} />
{ data.notify&&<img src={notification} alt="notification" width="35" height="35" />
}      </div>
      <List sx={{marginTop:'0.7rem'}}>
        {sidebarItems.map((item) => (
              <NavLink
                className={`sideNavLink `} // removing this line from the className ${(activeItem === item.name) && 'active'} because active class is working fine
                key={item.name}
                to={item.link}
                isActive={() => (location.pathname === item.link)}
                end
                onClick={() => handleItemClick(item.name)}
              >
                <Grid container sx={{flexWrap:'inherit'}}>
                  <Grid
                    item
                    sm={1}
                    style={{
                      background:
                        (location.pathname === item.link)
                          ? ACTIVE_BG_COLOR
                          : INACTIVE_BG_COLOR,
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      maxWidth: "10px",
                    }}
                  >
                    <span></span>
                  </Grid>
                  <Grid
                    item
                    sm={1}
                    style={{
                      background:
                      (location.pathname === item.link)
                          ? ACTIVE_BG_COLOR
                          : INACTIVE_BG_COLOR,
                      maxWidth: "10px",
                      maxHeight: "15px",
                      marginTop: "15px",
                      marginLeft: "5px",
                      marginRight: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    <span></span>
                  </Grid>
                  <Grid item sm>
                    <ListItem disablePadding sx={{ display: "block" }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: true ? "initial" : "center",
                          p: 0,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: true ? 3 : "auto",
                            justifyContent: "center",
                            color:
                              (location.pathname === item.link) ? "white" : "",
                            filter:
                              (location.pathname === item.link)
                                ? "brightness(0) invert(1)"
                                : "none",
                            mx: 1,
                            ml: item.name === 'Dashboard' ? 1.5 : 1
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          sx={{
                            opacity: true ? 1 : 0,
                            "& .MuiListItemText-primary":{
                              fontSize:'0.85rem',
                            }
                          }}
                          style={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Grid>
                </Grid>
              </NavLink>
        ))}
      </List>
      <div className={classes.logoutButton}>
        {/* <List>
          <ListItem onClick={logOutFunction}>
            <ListItemIcon className={classes.listItemIcon}>
              <img src={logout} alt="logout" />
            </ListItemIcon>
            <ListItemText primary="Logout" className={classes.listItemText} />
          </ListItem>
        </List> */}
        <Grid container mb={2}>
          <Grid item sm={1}></Grid>
          <Grid item sm={1}></Grid>
          <Grid item container columnGap={1} sm="auto" sx={{cursor:'pointer'}} onClick={logOutFunction}>
            <Grid item>
              <img src={logout} alt="logout" />
            </Grid>
            <Grid item>
              Logout
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
};

export default Sidebar;
