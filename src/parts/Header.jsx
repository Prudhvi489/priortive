import { Avatar, Box, Container, SwipeableDrawer } from "@mui/material";
import React, { useState } from "react";
// import Gomytriplogo from "../../../assets/images/Frame.png";
import Gomytriplogo from "../assets/images/Frame.png";
import { headers } from "../assets/styles/Flights.jsx";
import PersonIcon from "@mui/icons-material/Person";
import myaccount from "../assets/images/myaccount.svg";
import {
  Grid,
  Button,
  Menu,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ViewProfileDialog from "../components/modals/Signupmodals/ViewProfile";
import TravellersDialog from "../components/modals/Signupmodals/Travellers";
import traveller from "../assets/images/mail.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Signuporlogin from "../components/modals/Signupmodals/Signuporlogin";
import { LoginActions } from "../store/LoginSlice";
import calender1 from "../assets/images/calender1.svg";
import wallet from "../assets/images/wallet.svg";
import rupee from "../assets/images/rupee.svg";
import faq from "../assets/images/faq.svg";
import needsupport from "../assets/images/needsupport.svg";
import payment from "../assets/images/payment.svg";
import Logout from "../components/modals/Signupmodals/Logout";
import logoutt from "../assets/images/logoutt.svg";
import changepass from "../assets/images/changepassword.svg";
import ChangePassword from "../components/modals/Signupmodals/ChangePassword";
import { Apipost } from "../ApiServices/Apicalls";
import MenuIcon from "@mui/icons-material/Menu";
import sideNavIcon from "../assets/images/sideNavIcon.svg";
import Ticket_details_back_button from "../assets/images/Ticket_details_back_button.svg";
import flight_icon from "../assets/images/Vector.svg";
import hotel_icon from "../assets/images/Hotel.svg";
import bus_icon from "../assets/images/bus_default.svg";
import package_icon from "../assets/images/tour.svg";
import support_icon from "../assets/images/needsupport.svg";
import FAQ_icon from "../assets/images/Vector (1).svg";
import terms_icon from "../assets/images/terms_icon.svg";
import policy_icon from "../assets/images/privacy_icon.svg";
import gomytripclient from "../GomytripClient";
import { enqueueSnackbar } from "notistack";
import { Profileactions } from "../store/Signupslices/Profileslice";
import {styles} from '../assets/styles/Styles_export'
const Header = () => {
  const loggedin = useSelector((state) => state.authentication.loggedin);
  const dispatch = useDispatch();
  const location = useLocation();
  const header = headers();
  const navigate = useNavigate();
  const [signupopen, setSignupopen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(loggedin);
  const [changepwd,setChangepwd]=useState(0)
  const [logout, setLogout] = useState(false);
  const [profiledata, setProfiledata] = useState("");
  const [travellersdata, setTravellersdata] = useState("");

  useEffect(() => {
    setLoggedIn(loggedin);
  }, [loggedin]);
  useEffect(() => {
    const item = localStorage.getItem("loggedin");
    if (item === "1") {
      dispatch(LoginActions.userlogin(1));
      setLoggedIn(1);
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfileMenuOpen = async(event) => {
    setAnchorEl(event.currentTarget);
    const prflobj = {
      user_id: localStorage.getItem("userid"),
    };
    const data = await Apipost("/profile", prflobj);
    setChangepwd(data?.data?.password_status)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [viewProfileDState, setViewProfileDState] = useState(false);
  const handleviewprofile = async (forr) => {
    const prflobj = {
      user_id: localStorage.getItem("userid"),
    };

    const data = await Apipost("/profile", prflobj);

    setProfiledata({ ...data.data });
    console.log(data, "get profile");
    if (forr === "for_nav") {
      return;
    }
    setViewProfileDState(true);
  };
  // getting user data for side nav
  useEffect(() => {
    if (window.innerWidth < 900) {
      handleviewprofile("for_nav");
    }
    getUserProfile();
  }, []);
  const getUserProfile = async () => {
    if (localStorage.getItem("userid") !== null) {
      const profileres = await gomytripclient.post(
        "/profile",
        { user_id: localStorage.getItem("userid") || "" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authorization"),
          },
        }
      );
      if (profileres.data.status) {
        dispatch(Profileactions.profiledata(profileres.data.data));
      }
      // else {
      //   enqueueSnackbar(profileres.data?.data?.message);
      //   // alert(profileres.data?.data?.message)
      // }
    }
  };
  const [viewTravellersDialog, setViewTravellersDialog] = useState(false);
  const [changepassword, SetChangepassword] = useState(false);
  // Traveller dialog opening
  const Travellersdialogopened = async () => {
    const response = await Apipost("/allTravellers", {
      user_id: localStorage.getItem("userid"),
    });
    console.log(response.data, "header");
    if (response.status) {
      setTravellersdata([...response.data]);
      setViewTravellersDialog(true);
    } else {
    }
  };
  // signupmodal opening
  const signupopener = () => {
    console.log("data");
    if (loggedIn === 0) {
      setSignupopen(true);
    }
  };
  const homepage = () => {
    navigate("/Flights");
  };

  // side nav
  const [openSideNav, setOpenSideNav] = useState(false);
  const closeSideNav = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenSideNav(open);
  };

  return (
    <div>
      <Signuporlogin open={signupopen} onclose={() => setSignupopen(false)} />
      <ViewProfileDialog
        open={viewProfileDState}
        onClose={(e) => {
          setViewProfileDState(false);
        }}
        profile={profiledata}
        getdata={handleviewprofile}
      />
      <TravellersDialog
        open={viewTravellersDialog}
        onClose={(e) => setViewTravellersDialog(false)}
        travellers={travellersdata}
        recalltravellers={Travellersdialogopened}
      />
      <ChangePassword
        open={changepassword}
        close={() => SetChangepassword(false)}
      />
      <Logout open={logout} onclose={() => setLogout(false)} />
      {/* Header */}
      <div
        style={{
          // height: "14vh",
          display: "flex",
          alignItems: "center",
          background: "White",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Container maxWidth="xl" sx={{ display: { xs: "none", md: "block" } }}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item md={1} mt={2} sx={{paddingBottom:'1rem'}}>
              <img
                src={Gomytriplogo}
                alt="Gomytriplogo"
                style={{height:'50px',width:'105px'}}
                onClick={() => homepage()}
              />
            </Grid>
            <Grid item md={10.9}>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid item md={10}>
                  <Grid container spacing={2.3}>
                    <Grid item>
                      <NavLink
                        to="/Flights"
                        className={({ isActive }) =>
                          isActive ? header.activetab : header.icons
                        }
                      >
                        <Button
                          disableRipple
                          startIcon={
                            <svg
                              width="21"
                              height="14"
                              viewBox="0 0 21 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.562012 6.9755C0.871341 6.43284 1.17781 5.89018 1.48714 5.3503C1.62175 5.11376 1.74205 5.06645 2.01987 5.13324C3.16267 5.40875 4.3026 5.68982 5.44827 5.95975C5.55711 5.9848 5.69745 5.97645 5.79769 5.93193C6.42495 5.65642 7.04647 5.36422 7.66799 5.07758C7.71954 5.05254 7.7711 5.02471 7.8427 4.98853C7.76537 4.93566 7.70236 4.89391 7.64221 4.85217C6.46504 4.07018 5.29074 3.28263 4.1107 2.50621C3.90162 2.36985 3.80997 2.20844 3.8472 1.96633C3.97036 1.20661 4.53746 0.633336 5.55424 0.894926C6.1729 1.05355 6.76864 1.30123 7.37012 1.52664C8.78215 2.05538 10.1942 2.59526 11.6033 3.13514C11.7408 3.18801 11.8525 3.18523 11.9871 3.12122C13.6655 2.35593 15.3468 1.59899 17.0223 0.83092C17.6639 0.538718 18.3255 0.40514 19.0301 0.488627C20.3304 0.644467 20.952 1.87728 20.3018 3.00156C19.9925 3.53587 19.5399 3.93382 18.9757 4.19541C17.5092 4.87722 16.0342 5.54232 14.562 6.21578C14.4245 6.27978 14.2842 6.34101 14.1066 6.42171C14.2842 5.91245 14.4475 5.44214 14.6107 4.97183C14.6394 4.88835 14.6995 4.7993 14.6852 4.72138C14.668 4.62119 14.6164 4.49875 14.5362 4.44865C14.4245 4.3763 14.2928 4.42361 14.2183 4.54327C14.1754 4.61284 14.1524 4.69355 14.1238 4.77147C13.1987 7.44859 12.2736 10.1257 11.3456 12.8001C11.2367 13.1117 11.105 13.4151 10.8472 13.646C10.6582 13.8186 10.3832 13.852 10.1627 13.7184C10.1168 13.6906 10.0767 13.6071 10.0825 13.5542C10.1512 12.7667 10.2285 11.9791 10.3059 11.1916C10.4176 10.045 10.5293 8.89847 10.641 7.75471C10.6811 7.34562 10.7298 6.93654 10.7527 6.52746C10.7584 6.43284 10.6983 6.29926 10.6209 6.24082C10.472 6.12673 10.2715 6.24082 10.2486 6.44954C10.1913 6.95324 10.134 7.45694 10.0997 7.96064C10.0853 8.16657 10.0166 8.27789 9.81324 8.36972C7.93149 9.21571 6.0526 10.0756 4.17658 10.93C3.82715 11.0886 3.67249 11.0329 3.50923 10.6962C3.2801 10.2203 3.05383 9.74446 2.82756 9.26859C2.68435 8.96804 2.74164 8.82055 3.05383 8.67862C3.19417 8.61461 3.33452 8.54783 3.5121 8.4699C3.42903 8.43094 3.36889 8.40312 3.30874 8.37807C2.52682 8.06361 1.74491 7.75471 0.968722 7.43189C0.819786 7.37345 0.696627 7.25657 0.562012 7.16752C0.562012 7.10351 0.562012 7.03951 0.562012 6.9755Z"
                                fill="currentColor"
                              />
                            </svg>
                          }
                          sx={{ textTransform: "none" }}
                        >
                          Flights
                        </Button>
                      </NavLink>
                    </Grid>
                    <Grid item>
                      <NavLink
                        to="/hotels"
                        className={({ isActive }) =>
                          isActive ? header.activetab : header.icons
                        }
                      >
                        <Button
                          disableRipple
                          startIcon={
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.05273 10.8767C8.05273 7.77709 8.05273 4.67685 8.05273 1.57727C8.05273 1.00745 8.26912 0.819913 8.82714 0.924172C11.951 1.50514 15.0735 2.09004 18.1967 2.67298C18.8151 2.78838 19.4334 2.90248 20.0504 3.02182C20.5042 3.10968 20.6176 3.25329 20.6176 3.72606C20.6176 6.58041 20.6176 9.43475 20.6176 12.2898C20.6176 14.9231 20.6176 17.5571 20.6176 20.1905C20.6176 20.7308 20.4537 20.8967 19.9193 20.8967C16.1896 20.8967 12.4598 20.8967 8.73075 20.8967C8.21404 20.8967 8.05273 20.7367 8.05273 20.2259C8.05273 17.1093 8.05273 13.9927 8.05273 10.8767ZM16.8322 9.15935C17.0604 9.15935 17.2892 9.15935 17.5174 9.15935C17.5338 9.15935 17.5502 9.16001 17.5666 9.1587C17.8911 9.14034 18.082 8.96132 18.1003 8.63871C18.1121 8.42757 18.1115 8.21446 18.101 8.00266C18.0852 7.67546 17.9023 7.48202 17.5784 7.47415C17.0892 7.46235 16.5994 7.46235 16.1102 7.47415C15.7856 7.48202 15.6033 7.6748 15.5876 8.00266C15.5778 8.20594 15.5784 8.41052 15.587 8.61445C15.6014 8.96264 15.7948 9.14886 16.1469 9.15804C16.3751 9.16394 16.604 9.1587 16.8322 9.15935ZM11.8218 5.81715V5.81584C12.0664 5.81584 12.3116 5.82567 12.5556 5.81322C12.8828 5.79617 13.0618 5.60535 13.0696 5.28012C13.0749 5.07619 13.0742 4.87226 13.0696 4.66833C13.0624 4.3444 12.8821 4.13982 12.5601 4.13064C12.0631 4.11687 11.5648 4.11621 11.0677 4.1313C10.7497 4.14113 10.57 4.35162 10.5628 4.6762C10.5589 4.86373 10.5602 5.05127 10.5622 5.23881C10.5668 5.61584 10.7536 5.806 11.1366 5.81584C11.3648 5.8224 11.5936 5.81715 11.8218 5.81715ZM11.789 9.15935C12.0257 9.15935 12.2618 9.15935 12.4985 9.15935C12.5149 9.15935 12.5313 9.15935 12.5477 9.1587C12.8729 9.13771 13.0611 8.95149 13.0696 8.6315C13.0755 8.4197 13.0755 8.20725 13.0696 7.99545C13.0611 7.69382 12.89 7.48989 12.5929 7.48005C12.0795 7.46301 11.5654 7.46301 11.052 7.4794C10.7451 7.48923 10.5714 7.6971 10.5635 8.01184C10.5589 8.20725 10.5595 8.40331 10.5628 8.59937C10.5687 8.94887 10.7576 9.14689 11.1045 9.1587C11.332 9.16525 11.5608 9.1587 11.789 9.15935ZM16.8295 19.2056C17.0663 19.2056 17.3023 19.2056 17.539 19.2056C17.5554 19.2056 17.5718 19.2056 17.5882 19.2043C17.8905 19.1846 18.0774 19.0168 18.097 18.7165C18.1128 18.4811 18.1134 18.243 18.0957 18.0076C18.0741 17.7119 17.8813 17.5303 17.581 17.5244C17.0918 17.5152 16.602 17.5152 16.1128 17.5244C15.802 17.5303 15.6092 17.7178 15.5896 18.0266C15.5758 18.2457 15.5765 18.4673 15.5883 18.687C15.6053 19.0142 15.7915 19.1925 16.1194 19.2037C16.3561 19.2115 16.5928 19.205 16.8295 19.2056ZM16.8512 12.5199V12.5212C17.0794 12.5212 17.3082 12.5212 17.5364 12.5212C17.5528 12.5212 17.5692 12.5206 17.5856 12.5199C17.8879 12.5022 18.0761 12.3363 18.097 12.0353C18.1134 11.7999 18.1134 11.5619 18.097 11.3265C18.0761 11.0282 17.882 10.8472 17.5849 10.8426C17.0958 10.8354 16.6059 10.836 16.1168 10.8419C15.806 10.8459 15.6106 11.0295 15.5915 11.339C15.5771 11.5665 15.5771 11.796 15.5922 12.0235C15.6125 12.3357 15.8007 12.5081 16.1181 12.5179C16.3614 12.5258 16.6066 12.5199 16.8512 12.5199ZM16.8387 15.8621C17.0833 15.8621 17.3285 15.8687 17.5725 15.8608C17.8997 15.8503 18.0833 15.6713 18.101 15.3415C18.1121 15.1303 18.1121 14.9172 18.101 14.7054C18.0826 14.371 17.8879 14.1861 17.5482 14.1815C17.0754 14.1756 16.602 14.1749 16.1292 14.1822C15.7942 14.1874 15.6033 14.3795 15.5883 14.7179C15.5791 14.9212 15.5791 15.1257 15.5883 15.3297C15.604 15.6713 15.7889 15.8516 16.1292 15.8615C16.3653 15.8674 16.602 15.8621 16.8387 15.8621ZM11.8048 12.5193V12.5179C12.0657 12.5179 12.3274 12.5271 12.5877 12.5153C12.8742 12.5022 13.0559 12.3166 13.0677 12.0314C13.0769 11.8032 13.0762 11.5744 13.0683 11.3462C13.0585 11.0518 12.869 10.8498 12.5779 10.8439C12.0723 10.8341 11.5661 10.8341 11.0605 10.8439C10.7707 10.8491 10.5759 11.0531 10.5641 11.3442C10.5556 11.5639 10.5563 11.7849 10.5635 12.0045C10.5733 12.314 10.7609 12.5048 11.0704 12.5166C11.3156 12.5265 11.5602 12.5193 11.8048 12.5193ZM11.8133 15.8621C12.0579 15.8621 12.3031 15.8687 12.547 15.8608C12.8782 15.8497 13.0598 15.6667 13.069 15.3408C13.0749 15.129 13.0749 14.9166 13.069 14.7048C13.0605 14.3966 12.8736 14.1913 12.5687 14.1848C12.0716 14.1736 11.5733 14.1743 11.0763 14.1841C10.7615 14.1907 10.5707 14.3999 10.5628 14.7199C10.5576 14.9238 10.5576 15.1277 10.5628 15.3316C10.5714 15.6582 10.7543 15.8483 11.0789 15.8601C11.3235 15.8687 11.5687 15.8615 11.8133 15.8621Z"
                                fill="currentColor"
                              />
                              <path
                                d="M6.36471 12.8294C6.36471 18.5368 6.36471 17.687 6.36471 20.1151C6.36471 20.7702 6.23685 20.8961 5.57195 20.8961C4.10838 20.8961 2.64482 20.8967 1.18059 20.8961C0.678314 20.8961 0.505859 20.7223 0.505859 20.2161C0.505859 15.5716 0.505859 10.9265 0.505859 6.28204C0.505859 5.82631 0.647495 5.66566 1.11306 5.57911C2.61465 5.29911 4.11559 5.01912 5.61654 4.73716C6.12865 4.64077 6.36406 4.82634 6.36406 5.34698C6.36602 7.84134 6.36471 10.3357 6.36471 12.8294ZM3.44611 9.15868C3.69069 9.15868 3.93593 9.16655 4.17985 9.15671C4.49263 9.14425 4.68607 8.96196 4.70509 8.65509C4.71886 8.42755 4.71886 8.19805 4.70443 7.97051C4.68541 7.67347 4.49985 7.48463 4.20018 7.4761C3.70315 7.46299 3.2048 7.46299 2.70777 7.47545C2.39302 7.48332 2.21335 7.67282 2.19762 7.98691C2.18647 8.1987 2.18778 8.41116 2.1963 8.62296C2.21007 8.96196 2.39761 9.14688 2.73662 9.15737C2.97268 9.16524 3.20939 9.15868 3.44611 9.15868ZM3.4625 10.8406C3.21791 10.8406 2.97333 10.836 2.72875 10.8419C2.40351 10.8498 2.21401 11.0308 2.19762 11.3573C2.18712 11.577 2.18647 11.7979 2.19893 12.0176C2.21663 12.335 2.39695 12.512 2.71563 12.5179C3.2048 12.5265 3.69397 12.5265 4.18379 12.5179C4.4946 12.5127 4.68673 12.3271 4.70574 12.0183C4.71886 11.7986 4.7182 11.5776 4.7064 11.358C4.68935 11.0367 4.49198 10.8498 4.17199 10.8419C3.93593 10.836 3.69921 10.8406 3.4625 10.8406Z"
                                fill="currentColor"
                              />
                            </svg>
                          }
                          sx={{ textTransform: "none" }}
                        >
                          Hotels
                        </Button>
                      </NavLink>
                    </Grid>
                    <Grid item>
                      <NavLink
                        to="/buses"
                        className={({ isActive }) =>
                          isActive ? header.activetab : header.icons
                        }
                      >
                        <Button
                          disableRipple
                          startIcon={
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.3151 19.99H10.4179C10.4179 20.0551 10.4183 20.1185 10.4187 20.1808C10.4196 20.3174 10.4205 20.4486 10.4169 20.5794C10.4144 20.6775 10.4124 20.7757 10.4105 20.874C10.4042 21.1848 10.398 21.4957 10.3746 21.8049C10.3391 22.2718 10.1362 22.5274 9.7198 22.6195C9.42813 22.6839 9.1276 22.726 8.83019 22.7311C8.7174 22.7332 8.6044 22.7361 8.49131 22.739C7.97924 22.7521 7.46524 22.7653 6.95965 22.7035C6.08621 22.597 5.45278 21.767 5.42304 20.7959C5.41621 20.5767 5.41683 20.3574 5.41745 20.138C5.41797 19.9551 5.41848 19.7722 5.41469 19.5893C5.41312 19.5128 5.38443 19.4178 5.33747 19.3654C4.9524 18.9377 4.7917 18.4214 4.79222 17.8261C4.79412 15.6794 4.79381 13.5326 4.7935 11.3858L4.79326 8.97055V8.68676C4.70224 8.73697 4.61235 8.78632 4.52343 8.83513L4.52339 8.83515L4.52336 8.83517C4.2086 9.00797 3.90588 9.17416 3.60728 9.34874C3.56554 9.37292 3.54624 9.47999 3.54571 9.54849C3.54363 10.0225 3.54363 10.4966 3.54363 10.9706C3.54363 11.4446 3.54363 11.9187 3.54154 12.3927C3.53945 12.8676 3.23057 13.1583 2.81315 13.0915C2.51992 13.0443 2.30182 12.8141 2.29921 12.4848C2.28929 11.2927 2.29138 10.1005 2.29764 8.90838C2.29921 8.61711 2.47504 8.44442 2.69836 8.32238C2.90297 8.21016 3.10721 8.09723 3.31144 7.98431C3.74621 7.74391 4.18091 7.50355 4.61899 7.27012C4.7583 7.19586 4.79848 7.10779 4.79692 6.94258C4.79637 6.87782 4.79554 6.81306 4.79471 6.7483V6.7483C4.78837 6.25411 4.78203 5.7603 4.90336 5.27323C5.2712 3.80018 6.46188 2.76173 7.84822 2.7577C9.33717 2.75307 10.8261 2.75019 12.3151 2.75C13.804 2.75019 15.293 2.75307 16.7819 2.7577C18.1683 2.76173 19.359 3.80018 19.7268 5.27323C19.8481 5.7603 19.8418 6.25411 19.8355 6.7483C19.8346 6.81306 19.8338 6.87783 19.8333 6.94258C19.8317 7.10779 19.8719 7.19586 20.0112 7.27012C20.4492 7.50352 20.8839 7.74386 21.3186 7.98423L21.3186 7.98426L21.3188 7.98433C21.523 8.09725 21.7272 8.21017 21.9318 8.32238C22.1551 8.44442 22.331 8.61711 22.3325 8.90838C22.3388 10.1005 22.3409 11.2927 22.331 12.4848C22.3283 12.8141 22.1102 13.0443 21.817 13.0915C21.3996 13.1583 21.0907 12.8676 21.0886 12.3927C21.0865 11.9187 21.0865 11.4447 21.0865 10.9708C21.0865 10.4967 21.0865 10.0226 21.0844 9.54849C21.0839 9.47999 21.0646 9.37292 21.0229 9.34874C20.7243 9.17414 20.4215 9.00794 20.1067 8.83513C20.0178 8.78632 19.9279 8.73697 19.8369 8.68676V8.97055L19.8367 11.3846C19.8364 13.5318 19.836 15.679 19.8379 17.8261C19.8385 18.4214 19.6778 18.9377 19.2927 19.3654C19.2457 19.4178 19.217 19.5128 19.2155 19.5893C19.2117 19.7722 19.2122 19.9551 19.2127 20.138V20.138V20.138C19.2133 20.3574 19.214 20.5767 19.2071 20.7959C19.1774 21.767 18.544 22.597 17.6705 22.7035C17.1649 22.7653 16.6509 22.7521 16.1389 22.739C16.0258 22.7361 15.9128 22.7332 15.8 22.7311C15.5026 22.726 15.202 22.6839 14.9104 22.6195C14.494 22.5274 14.291 22.2718 14.2555 21.8049C14.2321 21.4957 14.2259 21.1848 14.2197 20.8739L14.2197 20.8735C14.2177 20.7755 14.2158 20.6774 14.2133 20.5794C14.2097 20.4486 14.2105 20.3174 14.2114 20.1808C14.2118 20.1185 14.2122 20.0551 14.2122 19.99H12.3151ZM14.6685 15.8445C14.3491 15.9331 14.1858 16.1524 14.1832 16.4759C14.1796 16.9595 14.502 17.2467 14.9252 17.1356L15.1853 17.0676C15.9193 16.8756 16.6533 16.6837 17.3864 16.488C17.7657 16.3867 17.9707 16.0511 17.8883 15.6862C17.7928 15.2631 17.4834 15.0697 17.0863 15.1796C16.7259 15.2793 16.3653 15.378 16.0047 15.4768C15.5592 15.5987 15.1137 15.7207 14.6685 15.8445ZM10.228 16.4759C10.2254 16.1524 10.0621 15.9331 9.74277 15.8445C9.29771 15.7208 8.85234 15.5988 8.40699 15.4769L8.40697 15.4769L8.40694 15.4769L8.40654 15.4768L8.4058 15.4766L8.40506 15.4763L8.40447 15.4762C8.04452 15.3776 7.68461 15.2791 7.3249 15.1796C6.92783 15.0697 6.61842 15.2631 6.52294 15.6862C6.4405 16.0511 6.64555 16.3867 7.02488 16.488C7.75787 16.6836 8.49169 16.8756 9.2256 17.0675L9.22582 17.0676L9.22611 17.0676L9.48606 17.1356C9.90922 17.2467 10.2317 16.9595 10.228 16.4759ZM6.08716 11.8753C6.11844 11.8881 6.14787 11.9003 6.1777 11.9111C7.79205 12.4983 9.4471 12.8483 11.1449 12.9553C11.5289 12.9796 11.9113 12.9917 12.2923 12.9915C12.6733 12.9917 13.0557 12.9796 13.4397 12.9553C15.1375 12.8483 16.7926 12.4983 18.4069 11.9111C18.4367 11.9003 18.4662 11.8881 18.4975 11.8753C18.5176 11.8669 18.5385 11.8583 18.5608 11.8495C18.5608 11.4921 18.5609 11.1354 18.5609 10.7793C18.5611 9.18184 18.5612 7.59596 18.5582 6.00969C18.5577 5.87557 18.5321 5.73799 18.5024 5.60675C18.2984 4.70645 17.605 4.09167 16.7623 4.0675C16.5196 4.06047 16.2766 4.06175 16.0335 4.06303C15.938 4.06354 15.8425 4.06404 15.7469 4.06404L12.8418 4.06365L12.2923 4.06357L11.7428 4.06365L8.83768 4.06404C8.74215 4.06404 8.64663 4.06354 8.55112 4.06303C8.30804 4.06175 8.06504 4.06047 7.82231 4.0675C6.97966 4.09167 6.28623 4.70645 6.08221 5.60675C6.05247 5.73799 6.02691 5.87557 6.02639 6.00969C6.0234 7.59625 6.02355 9.18243 6.02371 10.7802C6.02374 11.136 6.02378 11.4924 6.02378 11.8495C6.04607 11.8583 6.06699 11.867 6.08716 11.8753Z"
                                fill="currentColor"
                              />
                            </svg>
                          }
                          sx={{ textTransform: "none" }}
                        >
                          Bus
                        </Button>
                      </NavLink>
                    </Grid>
                    <Grid item textAlign={"right"}>
                      <NavLink
                        to="/tours"
                        className={({ isActive }) =>
                          isActive ? header.activetab : header.icons
                        }
                      >
                        <Button
                          disableRipple
                          startIcon={
                            <svg
                              width="13"
                              height="21"
                              viewBox="0 0 13 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.20042 0.894348C5.77524 0.894348 7.35006 0.894348 8.92488 0.894348C9.96493 1.1041 10.3828 1.87553 10.3502 2.80933C10.3147 3.86917 10.3421 4.93103 10.3421 5.99188C10.3421 6.06146 10.3421 6.13104 10.3421 6.21675C10.7315 6.21675 11.0995 6.19961 11.4635 6.22281C11.7075 6.23894 11.9678 6.26919 12.1853 6.36903C12.7557 6.63121 12.9895 7.11223 12.9895 7.72837C12.9865 11.165 12.9875 14.6007 12.9875 18.0374C12.9875 18.0959 12.9854 18.1544 12.9824 18.2128C12.9417 18.9318 12.4029 19.4744 11.675 19.5298C11.5865 19.5369 11.4981 19.545 11.3994 19.554C11.3994 19.8797 11.4035 20.1853 11.3984 20.4908C11.3933 20.753 11.2673 20.8872 11.0172 20.8902C10.5058 20.8952 9.99339 20.8962 9.48201 20.8902C9.24513 20.8872 9.12414 20.7601 9.11296 20.5241C9.10788 20.4263 9.11093 20.3285 9.11093 20.2317C9.11093 20.0068 9.11093 19.7829 9.11093 19.556C7.39479 19.556 5.71221 19.556 4.01132 19.556C4.01132 19.8616 4.01234 20.154 4.01132 20.4455C4.00929 20.7803 3.89847 20.8922 3.56501 20.8932C3.11259 20.8942 2.65916 20.8942 2.20674 20.8932C1.83871 20.8932 1.72586 20.7813 1.72484 20.4152C1.72382 20.1308 1.72484 19.8465 1.72484 19.555C1.60487 19.545 1.50829 19.5359 1.41069 19.5298C1.13314 19.5127 0.889138 19.4098 0.673605 19.2404C0.279138 18.9248 0.133754 18.5093 0.134771 18.0172C0.138838 14.5936 0.136804 11.1701 0.137821 7.74753C0.137821 7.68299 0.138838 7.61744 0.142904 7.5529C0.176454 6.93979 0.556688 6.44566 1.15754 6.28634C1.38731 6.22583 1.63639 6.22684 1.87734 6.21877C2.17522 6.20768 2.47412 6.21575 2.78319 6.21575C2.78319 6.1139 2.78319 6.04331 2.78319 5.97171C2.78319 4.83926 2.78421 3.70681 2.78319 2.57437C2.78319 2.11957 2.92146 1.71822 3.23967 1.38444C3.50096 1.10914 3.83849 0.978046 4.20042 0.894348ZM3.86187 6.20365C5.66646 6.20365 7.45783 6.20365 9.26343 6.20365C9.26648 6.12902 9.27156 6.06549 9.27156 6.00196C9.27156 4.87657 9.27258 3.75219 9.27156 2.6268C9.27156 2.14881 9.07534 1.95621 8.58836 1.95621C7.23823 1.95621 5.88707 1.95621 4.53694 1.95621C4.05097 1.95621 3.85272 2.14982 3.85272 2.6268C3.85171 3.75219 3.85272 4.87657 3.85272 6.00196C3.85272 6.06549 3.85882 6.12902 3.86187 6.20365Z"
                                fill="currentColor"
                              />
                            </svg>
                          }
                          sx={{ textTransform: "none" }}
                        >
                          Tour Packages
                        </Button>
                      </NavLink>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={1.9} textAlign={"right"}>
                  {!loggedIn ? (
                    <Button
                      disableRipple
                      variant="contained"
                      sx={{
                        background: `${styles.app_color}!important`,//` linear-gradient(116.32deg, #F23844 -5.88%, #046FB1 111.84%)`,
                        marginRight: "2.3%",
                        textTransform: "none",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "400",
                      }}
                      startIcon={<PersonIcon size="small" />}
                      onClick={signupopener}
                    >
                      Login/Signup
                    </Button>
                  ) : (
                    <Box component="div">
                      {/* <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        className="notificationsIcon d-none"
                        disableRipple={true}
                      >
                        <CircleNotificationsRoundedIcon
                          style={{
                            color: styles.app_color,
                            fontSize: "2.5rem",
                          }}
                        ></CircleNotificationsRoundedIcon>
                      </IconButton> */}

                      <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        disableRipple={true}
                      >
                        <AccountCircleRoundedIcon
                          style={{
                            color: styles.app_color,
                            fontSize: "40px",
                            marginRight: "0px",
                          }}
                        ></AccountCircleRoundedIcon>
                      </IconButton>
                    </Box>
                  )}
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 0.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 2,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 20,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleviewprofile}>
                      <Grid container columnSpacing={3}>
                        <Grid item xs={2}>
                          <img src={myaccount} alt="my account" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>My Account</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                    <MenuItem onClick={Travellersdialogopened}>
                      <Grid container columnSpacing={3}>
                        <Grid item xs={2}>
                          <img src={traveller} alt="traveller" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>Travellers</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/mybookings/1")}>
                      {/* <Typography>My Bookings</Typography> */}
                      <Grid container columnSpacing={3}>
                        <Grid item xs={2}>
                          <img src={calender1} alt="calender1" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>
                            <span>My Bookings</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>

                    <MenuItem>
                      <Grid container>
                        <Grid item xs={2}>
                          <img src={wallet} alt="wallet" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>My Wallet</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                    {/* <MenuItem  onClick={()=>{navigate("/refund")}}>
                      <Grid container>
                        <Grid item xs={2}>
                          <img src={rupee} alt="rupeee" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>My Refund</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                    <MenuItem>
                      <Grid container>
                        <Grid item xs={2}>
                          <img src={payment} alt="payment" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>My Payment</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem> */}
                    <MenuItem onClick={() => navigate("/UserRaisedIssues")}>
                      <Grid container>
                        <Grid item xs={2}>
                          <img src={needsupport} alt="needsupport" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>Need Support</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                    <MenuItem>
                      <Grid container>
                        <Grid item xs={2}>
                          <img src={faq} alt="Faq" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>
                            {/* <Link
                              to={"/FAQ"}
                              style={{
                                color: "black",
                                border: "none",
                                textDecoration: "none",
                                fontFamily: "'Poppins', sans-serif",
                              }}
                            > */}
                            <span
                              onClick={() => {
                                navigate("/Faq");
                              }}
                            >
                              FAQ?
                            </span>
                            {/* </Link> */}
                          </Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                    {
                      changepwd?
                    <MenuItem onClick={() => SetChangepassword(true)}>
                      <Grid container>
                        <Grid item xs={2}>
                          <img src={changepass} alt="changepassword" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>Change Password</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>:""
                    }
                    <MenuItem onClick={() => setLogout(true)}>
                      <Grid container>
                        <Grid item xs={2}>
                          <img src={logoutt} alt="logout" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>Logout</Typography>
                        </Grid>
                      </Grid>
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        {/* sidenav */}
        {(location.pathname == "/Flights" ||
          location.pathname == "/Hotels" ||
          location.pathname == "/buses" ||
          location.pathname == "/tours") && (
          <Container
            maxWidth="xl"
            sx={{ display: { xs: "block", md: "none" }, marginTop: "10px" }}
          >
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item mt={1} mb={1}>
                <Grid container gap={1} alignItems={"center"}>
                  {/* <MenuIcon onClick={()=>setOpenSideNav(!openSideNav)}/> */}
                  <IconButton onClick={() => setOpenSideNav(!openSideNav)}>
                    <img src={sideNavIcon} alt="navicon" />
                  </IconButton>
                  <img
                    src={Gomytriplogo}
                    alt="Gomytriplogo"
                    onClick={() => homepage()}
                    className={"miniLogo"}
                  />
                </Grid>
              </Grid>
              <Grid item>
                {!loggedIn ? (
                  <Button
                    disableRipple
                    variant="contained"
                    sx={{
                      background: `${styles.app_color}!important`,
                      marginRight: "2.3%",
                      textTransform: "none",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "400",
                      fontSize: "11px",
                    }}
                    startIcon={<PersonIcon size="small" />}
                    onClick={signupopener}
                  >
                    Login/Signup
                  </Button>
                ) : (
                  <Box component="div">
                    {/* <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    className="notificationsIcon"
                    disableRipple={true}
                  >
                    <CircleNotificationsRoundedIcon
                      style={{
                        color: styles.app_color,
                        fontSize: "2.5rem",
                      }}
                    ></CircleNotificationsRoundedIcon>
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    disableRipple={true}
                  >
                    <AccountCircleRoundedIcon
                      style={{
                        color: styles.app_color,
                        fontSize: "40px",
                        marginRight: "0px",
                      }}
                    ></AccountCircleRoundedIcon>
                  </IconButton> */}
                  </Box>
                )}
              </Grid>
            </Grid>
            {/* side nav */}
            {openSideNav && (
              <SwipeableDrawer
                anchor="left"
                open={openSideNav}
                onClose={closeSideNav("left", false)}
                onOpen={closeSideNav("left", true)}
              >
                <div style={{ width: "280px", overflowY: "scroll" }}>
                  <Grid
                    container
                    className="sidenavImageContainer"
                    flexDirection={"column"}
                    rowGap={1}
                  >
                    <Grid item sm={12}>
                      <Grid container justifyContent={"center"}>
                        <Avatar
                          src={
                            loggedIn
                              ? profiledata?.cover_pic?.length &&
                                profiledata?.cover_pic[0] !==
                                  `${process.env.REACT_APP_BASEURL}/defaultPics/BUS.jpg`
                                ? profiledata?.cover_pic[0]
                                : ""
                              : ""
                          }
                          className="sidenavImage sidenavImage_noUser"
                        />
                      </Grid>
                    </Grid>
                    <Grid item>
                      {loggedIn ? (
                        <Grid className="sidenavUsername">
                          {profiledata.first_name} {profiledata.last_name}
                        </Grid>
                      ) : (
                        <Grid
                          className="sidenavUsername"
                          onClick={signupopener}
                        >
                          Login/Signup
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  {loggedIn ? (
                    <Grid container flexDirection={"column"} p={3.5} rowGap={3}>
                      <Grid item onClick={handleviewprofile}>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={myaccount}
                            alt="my account"
                            className="sidenavIconSize"
                          />
                          <Typography>My Account</Typography>
                        </Grid>
                      </Grid>
                      <Grid item onClick={Travellersdialogopened}>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={traveller}
                            alt="traveller"
                            className="sidenavIconSize"
                          />
                          <Typography>Travellers</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={calender1}
                            alt="calender1"
                            className="sidenavIconSize"
                          />
                          <Typography>
                            <span
                              onClick={() => {
                                navigate("/Mybookings/1");
                              }}
                            >
                              My Bookings
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={wallet}
                            alt="wallet"
                            className="sidenavIconSize"
                          />
                          <Typography>My Wallet</Typography>
                        </Grid>
                      </Grid>
                      {/* <Grid item onClick={()=>{navigate("/Myrefund")}}>
                      <Grid container columnGap={1} alignItems={'center'}>
                        <img src={rupee} alt="rupeee" className="sidenavIconSize" />
                        <Typography>My Refund</Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container columnGap={1} alignItems={'center'}>
                        <img src={payment} alt="payment" className="sidenavIconSize" />
                        <Typography>My Payment</Typography>
                      </Grid>
                    </Grid> */}
                      <Grid item>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={needsupport}
                            alt="needsupport"
                            className="sidenavIconSize"
                          />
                          <Typography>Need Support</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={faq}
                            alt="Faq"
                            className="sidenavIconSize"
                          />
                          <Typography>
                            <span
                              onClick={() => {
                                navigate("/FAQ");
                              }}
                            >
                              FAQ?
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item onClick={() => SetChangepassword(true)}>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={changepass}
                            alt="changepassword"
                            className="sidenavIconSize"
                          />
                          <Typography>Change Password</Typography>
                        </Grid>
                      </Grid>
                      <Grid item onClick={() => setLogout(true)}>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={logoutt}
                            alt="logout"
                            className="sidenavIconSize"
                          />
                          <Typography>Logout</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container flexDirection={"column"} p={3.5} rowGap={3}>
                      <Grid item>
                        <NavLink
                          to={"/Flights"}
                          style={{
                            textDecoration: "none",
                            color: "rgba(48, 48, 48, 1)",
                          }}
                        >
                          <Grid container columnGap={1} alignItems={"center"}>
                            <img
                              src={flight_icon}
                              alt="my account"
                              className="sidenavIconSize"
                            />
                            <Typography>Flights</Typography>
                          </Grid>
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink
                          to={"/Hotels"}
                          style={{
                            textDecoration: "none",
                            color: "rgba(48, 48, 48, 1)",
                          }}
                        >
                          <Grid container columnGap={1} alignItems={"center"}>
                            <img
                              src={hotel_icon}
                              alt="my account"
                              className="sidenavIconSize"
                            />
                            <Typography>Hotels</Typography>
                          </Grid>
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink
                          to={"/buses"}
                          style={{
                            textDecoration: "none",
                            color: "rgba(48, 48, 48, 1)",
                          }}
                        >
                          <Grid container columnGap={1} alignItems={"center"}>
                            <img
                              src={bus_icon}
                              alt="my account"
                              className="sidenavIconSize"
                            />
                            <Typography>Bus</Typography>
                          </Grid>
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink
                          to={"/tours"}
                          style={{
                            textDecoration: "none",
                            color: "rgba(48, 48, 48, 1)",
                          }}
                        >
                          <Grid container columnGap={1} alignItems={"center"}>
                            <img
                              src={package_icon}
                              alt="my account"
                              className="sidenavIconSize"
                            />
                            <Typography>Packages</Typography>
                          </Grid>
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={support_icon}
                            alt="my account"
                            className="sidenavIconSize"
                          />
                          <Typography>Need Support</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={FAQ_icon}
                            alt="my account"
                            className="sidenavIconSize"
                          />
                          <Typography>FAQ ?</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={terms_icon}
                            alt="my account"
                            className="sidenavIconSize"
                          />
                          <Typography>Terms & Conditions</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container columnGap={1} alignItems={"center"}>
                          <img
                            src={policy_icon}
                            alt="my account"
                            className="sidenavIconSize"
                          />
                          <Typography>Privacy Policy</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </div>
              </SwipeableDrawer>
            )}
          </Container>
        )}
        {location.pathname == "/Flights/FlightDetails" && (
          <Container
            maxWidth="xl"
            sx={{
              display: { xs: "block", md: "none" },
              paddingTop: "10px",
              paddingBottom: "10px",
              background: "white",
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Grid container alignItems={"center"} columnGap={1}>
              <Grid item>
                <IconButton onClick={() => navigate(-1)}>
                  <img src={Ticket_details_back_button} alt="back_button" />
                </IconButton>
              </Grid>
              <Grid
                item
                sx={{ fontWeight: "500", fontSize: "18px", lineHeight: "27px" }}
              >
                <p>Ticket Details</p>
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Header;
