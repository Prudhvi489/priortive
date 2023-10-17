import Gologo from "../assets/images/Frame.png";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Grid,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import fee from "../assets/AdminAssets/fee.svg";
import bus from "../assets/AdminAssets/bus.svg";
import coupons from "../assets/AdminAssets/coupons.svg";
import dashboard from "../assets/AdminAssets/dashboard.svg";
import flights from "../assets/AdminAssets/flights.svg";
import hotels from "../assets/AdminAssets/hotels.svg";
import information from "../assets/AdminAssets/information.svg";
import request from "../assets/AdminAssets/request.svg";
import review from "../assets/AdminAssets/review.svg";
import termsconditions from "../assets/AdminAssets/termsconditions.svg";
import tourpackage from "../assets/AdminAssets/tourpackage.png";
import users from "../assets/AdminAssets/users.svg";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import logout from '../assets/Subadminassets/logout.svg';
import AdminChnagePassword from "../components/modals/AdminModals/AdminChangePasswordModel";
import AdminChangePasswordModel from "../components/modals/AdminModals/AdminChangePasswordModel";
import LockResetIcon from '@mui/icons-material/LockReset';
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});


const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  padding: theme.spacing(2, 0),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  "& .MuiDrawer-paper": {
    width: "inherit",
    borderRadius: "0 35px 35px 0",
    overflowX: "hidden",
  },
}));
const useStyles = makeStyles((theme) => ({
  bookingYourHotelsItem: {
    // Custom styles for "Booking for your Hotels" list item
    '& $listItemText': {
      fontWeight: '700',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#DEF2FF',
    borderRadius: '0 30px 30px 0',
  },
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
    '&$activeListItem': {
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
    bottom: theme.spacing(2),
    width: '100%',
  },
  logoutButton1: {
    // position: 'absolute',
    bottom: theme.spacing(2),
    width: '100%',
    cursor: 'pointer'
  },
}));
const AdminSidebar = () => {
  const classes = useStyles();
  const ACTIVE_BG_COLOR = "rgb(0, 53, 86)";
  const INACTIVE_BG_COLOR = "transparent";
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const handleDrawerOpen = () => {
    setOpen((pre) => !pre);
  };
  const [subnav, setSubnav] = React.useState('')
  const [showChangePassword, setShowChangePassword] = React.useState(false)
  const sideNavLinks = [
    {
      id: "1",
      name: "DashBoard",
      icon: <img src={dashboard} alt="Dashboard Icon" />,
      link: "/admin",
    },
    {
      id: "2",
      name: "Flights",
      icon: <img src={flights} alt="Flights Icon" />,
      link: "/admin/adminFlights",
    },
    {
      id: "3",
      name: "Hotels",
      icon: <img src={hotels} alt="Hotels Icon" />,
      link: "/admin/adminhotelmanagement",
      subName: 'HotelSub',
      sub: [
        {
          id: "a",
          name: "Management Hotels",
          link: "/admin/adminhotelmanagement",
        },
        {
          id: "b",
          name: "GMT Team",
          link: "/admin/admingmtteam",
          moreLink: '/admin/admingmtteamview'
        },
        {
          id: "c",
          name: "Bookings",
          link: "/admin/adminhotelbookings",
        },
      ],
    },
    {
      id: "4",
      name: "Bus",
      icon: <img src={bus} alt="Bus Icon" />,
      link: "/admin/adminBus",
    },
    {
      id: "5",
      name: "Tour Packages",
      icon: <img src={tourpackage} alt="Tour Packages Icon" />,
      link: "/admin/AdminTourManagement",
      subName: 'Toursub',
      sub: [
        {
          id: "a",
          name: "Tour Management",
          link: "/admin/AdminTourManagement",
          moreLink: "/admin/adminviewpackages",
        },
        {
          id: "b",
          name: "Inquires",
          link: "/admin/AdminInquiries",
        },
      ],
    },
    {
      id: "6",
      name: "info",
      icon: <img src={information} alt="Tour Packages Icon" />,
      link: "/admin/importantinformation",
      subName: 'infosub',
      sub: [
        {
          id: "a",
          name: "important information",
          link: "/admin/importantinformation",
        },
        {
          id: "b",
          name: "FAQ",
          link: "/admin/AdminFaq",
        },
      ],
    },

    {
      id: "7",
      name: "Coupons",
      icon: <img src={coupons} alt="Coupons Icon" />,
      link: "/admin/AdminCouponsList",
      className: location.pathname === '/admin/AdminAddNewCoupons' ? "active" : ''
    },
    // {
    //   id: "8",
    //   name: "Transaction ",
    //   icon: <img src={transaction} alt="Transaction Icon" />,
    //   link: "/admin/AdminTransaction",
    // },
    {
      id: "9",
      name: "Users",
      icon: <img src={users} alt="Users Icon" />,
      link: "/admin/AdminUsers",
    },
    {
      id: "10",
      name: "Review",
      icon: <img src={review} alt="Review Icon" />,
      link: "/admin/AdminReview",
    },
    {
      id: "11",
      name: "Legal",
      icon: <img src={termsconditions} alt="Terms & Condition Icon" />,
      link: "/admin/AdminTermsConditions",
    },
    {
      id: "12",
      name: "Raised Request",
      icon: <img src={request} alt="Raised Request Icon" />,
      link: "/admin/BookingRaisedQueires",
    },
    {
      id: "13",
      name: "Convenience Fee",
      icon: <img src={fee} alt="Convenience Fee Icon" />,
      link: "/admin/AdminConvenienceFee",
    },
  ];

  function handleCloseChangePassword() {
    setShowChangePassword(false)
  }

  return (
    <>
      <Drawer variant="permanent" open={open} sx={{ "& ::-webkit-scrollbar": { display: 'none' }, zIndex: 1201 }}>
        <DrawerHeader style={{ background: "aliceblue", borderTopRightRadius: "2rem", minHeight: 'fit-content', paddingTop: '1.5rem' }}>
          {open && <img src={Gologo} alt={"siteLogo"} />}
          {/* <IconButton onClick={handleDrawerOpen}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )} */}
          {/* </IconButton> */}
        </DrawerHeader>
        {/* <Divider /> */}
        <List
          style={{ background: "aliceblue", borderBottomRightRadius: "3rem" }}
        >
          {sideNavLinks.map((navData) => (
            <>
              <NavLink
                className={`sideNavLink ${(navData?.subName && subnav === navData?.subName) || navData?.className ? 'active' : ""} dsd ${navData?.className}`}
                key={navData.id}
                to={navData.link}
                isActive={() => (location.pathname === navData.link || true)}
                end
                // isActive={() => {
                //   // Check if any of the sub-navigation links is active
                //   const isSubNavActive =navData.sub.some((subnav) =>
                //     location.pathname.startsWith(subnav.link)
                //   );
                //   console.log("dafkasdfjska ")
                //   // If any sub-navigation link is active, consider the main "Hotels" link active
                //   return location.pathname === navData.link || isSubNavActive;
                // }}
                // sx={{paddingLeft}}
                onClick={() => navData?.subName && subnav === navData?.subName ? setSubnav('') : setSubnav(navData?.subName)}
              >
                <Grid container>
                  <Grid
                    item
                    md={1}
                    sm={1}
                    style={{
                      background:
                        (location.pathname === navData.link || (navData?.subName && subnav === navData?.subName))
                          ? ACTIVE_BG_COLOR
                          : INACTIVE_BG_COLOR,
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      maxWidth: "15px",
                    }}
                  >
                    <span></span>
                  </Grid>
                  <Grid
                    item
                    md={1}
                    sm={1}
                    style={{
                      background:
                        (location.pathname === navData.link || (navData?.subName && subnav === navData?.subName))
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
                  <Grid item md={10} sm={10}>
                    <ListItem disablePadding sx={{ display: "block" }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          pr: 0,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                            color:
                              (location.pathname === navData.link || (navData?.subName && subnav === navData?.subName)) ? "white" : "",
                            filter:
                              (location.pathname === navData.link || (navData?.subName && subnav === navData?.subName))
                                ? "brightness(0) invert(1)"
                                : "none",
                            mx: 1,
                          }}
                        >
                          {navData.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={navData.name}
                          sx={{
                            opacity: open ? 1 : 0,
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
              {
                navData.sub &&
                <Collapse in={subnav === navData?.subName}>
                  <Grid container>
                    {
                      navData.sub.map((subnav) => (
                        <Grid item xs={12} style={{
                          borderTopRightRadius: "10px",
                          borderBottomRightRadius: "10px",
                          color: location.pathname === subnav.link ? "white" : "",
                          padding: "0.5rem 0rem",
                        }}>
                          <NavLink className={"sideNavLink"} key={subnav.id} to={subnav.link} isActive={() => location.pathname === subnav.link}>
                            <Grid container>
                              <Grid item xs={1.5}></Grid>
                              <Grid item xs={1.5}>
                                {(location.pathname === subnav.link || location.pathname === subnav?.moreLink) && <PlayArrowIcon />}
                              </Grid>
                              <Grid item xs={9} >{subnav.name}</Grid>
                            </Grid>
                          </NavLink>
                        </Grid>
                      ))
                    }
                  </Grid>
                </Collapse>
              }
            </>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default AdminSidebar;