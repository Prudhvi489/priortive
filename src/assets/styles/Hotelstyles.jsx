import { makeStyles } from "@mui/styles";
import selected_hotel from "../../assets/Hotelimages/selected_hotel.png";
import {styles} from './Styles_export'
const fontcolor = `${styles.app_color}`;
const textcolor = "#fff";
const font_size1 = "18px";
const font_size2 = "16px";
const font_size3 = "14px";
const font_size4 = "12px";
const font_family = "Poppins";
const btn_color1 = "#DFF3FF";
const btn_color2 = styles.app_color;
// media queries are written like this
// '@media (min-width:500px) and (max-width:700px)':{
//     width:'100px'
// }
// Hotel search main page styles
export const hotelsearch = makeStyles({
  hotelsearchbg: {
    // backgroundImage: `url(${Resorts})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    // width: '100%',
    // height: '100%',
    position:'absolute',
    right:'2rem',
    top:'5%',
  },
  chipLabel: {
    fontSize: "16px!important",
    fontWeight: "bold!important",
    color: `${fontcolor}!important`,
    fontFamily: `${font_family}`,
  },
  chip: {
    backgroundColor: "#fff!important",
    marginTop: "2%!important",
  },
  searchpaper: {
    width: "100%",
    borderRadius: "1rem!important",
    fontFamily: `${font_family}`,
    // media queries are written like this
    // '@media (min-width:500px) and (max-width:700px)':{
    //     width:'100px'
    // }
    // "@media (max-width:899px)":{
    //   background:'none !important',
    //   boxShadow:'none !important',
    // }
  },
  hotelsearchbtn: {
    width: "15rem",
    height: "3rem",
    borderRadius: "1rem",
    background: `${fontcolor}`,
    color: "#fff",
    border: "none!important",
    fontWeight: "600",
    fontSize: `${font_size2}`,
    fontFamily: `${font_family}`,
    cursor: "pointer",
  },
  cardpaper: {
    boxShadow: "0px 0px 6px rgba(0, 53, 86, 0.25)",
    // borderBottom: "1.5px solid rgba(0, 53, 86, 0.25)",
    // borderTop: "2px solid rgba(0, 53, 86, 0.25)",
  },
  cardbookbtn: {
    border: "none",
    fontSize: "14px",
    backgroundColor: styles.app_color,
    width: "7rem",
    height: "2rem",
    color: "#fff",
    fontWeight: "600",
    borderBottomRightRadius: "1rem",
  },
  hotels_tab: {
    marginLeft: "1.8rem!important",
    paddingTop: "1rem",
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: fontcolor,
      borderRadius: "0.5rem",
      padding: "2px 5px 2px 5px",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  tabbtns: {
    textTransform: "none!important",
    height: "2rem!important",
    minHeight: "1rem!important",
    fontWeight: "600!important",
  },
  txtclr:{
    color:`${fontcolor}!important`
  }
});
// guests room modal styles
export const guest_rooms = makeStyles({
  add_room: {
    border: "none!important",
    background: "none",
    fontSize: `${font_size4}`,
    fontWeight: 600,
    color: `${fontcolor}`,
    fontFamily: `${font_family}`,
  },
  remove_room: {
    border: "none",
    background: "none",
    fontSize: `${font_size4}`,
    fontWeight: 600,

    fontFamily: `${font_family}`,
  },
  guest_text: {
    fontSize: `${font_size3}`,
    fontWeight: 500,
    fontFamily: `${font_family}`,
  },
  guest_age_text: {
    fontSize: `${font_size4}`,
    fontWeight: 400,
    fontFamily: `${font_family}`,
    color: "#8F9098",
  },
  childage: {
    border: `1px solid ${fontcolor}`,
    padding: "0.5rem",
    borderRadius: "0.5rem",
    "&:focus": {
      outline: "none",
    },
  },
});
// Textfiled border styles
export const muitextfieldborder = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${styles.app_color}!important`,
        borderWidth: "1px",
      },
      // on focus also keeping the same border size and color
      "&.Mui-focused fieldset": {
        borderColor: `${styles.app_color}!important`,
        borderWidth: "1px", // Set the desired border width
      },
      //   on hover we can also change the border color
      //   "&:hover fieldset": {
      //     borderColor: `${styles.app_color}!important`,
      //     borderWidth: "1px", // Set the desired border width
      //   },
    },
  },
}));
// hotels filters
export const hotelfilters = makeStyles({
  filter_names: {
    fontSize: `${font_size3}`,
    fontFamily: `${font_family}`,
    fontWeight: 600,
    color: `${fontcolor}`,
  },
  paper_style: {
    borderRadius: "1rem",
    padding: "1rem",
  },
  pricebtn: {
    backgroundColor: `${styles.shade_color}!important`,
    color: `${styles.textcolor}!important`,
    textTransform: "none!important",
    fontFamily: "poppins!important",
    borderRadius: "0.5rem!important",
    fontWeight: "400!important",
  },
  ratingbtn: {
    backgroundColor: "#FFEBEC!important",
    color: `#F23844!important`,
    borderRadius: "0.5rem!important",
    fontFamily: "Poppins",
    width: "50px",
    height: "30px",
    fontSize: "14px!important",
    "@media (max-width:950px) and (min-width:900px)": {
      width: "45px",
    },
  },
  aminitiesbtn: {
    flex: 1,
    minWidth: 0,
    maxWidth: "8.6rem",
    height: "2.3rem",
    backgroundColor:styles.shade_color,
    border: "none",
    borderRadius: "0.5rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: `${font_family}`,
    fontSize: "14px",
    color: `${fontcolor}`,
  },
  morebtn: {
    fontSize: `${font_size3}`,
    color: `${fontcolor}`,
    border: "none",
    background: "none",
    // marginTop:'0.5rem!important',
    fontWeight: "700!important",
    height: "2.3rem",
  },
});
export const hotels_list = makeStyles({
  placeholder_style: {
    color: `${styles.app_color}!important`,
  },
  mapsbtn: {
    color: "#fff!important",
    textTransform: "none!important",
    fontSize: "14px!important",
    fontWeight: "500!important",
    backgroundColor: `${styles.app_color}!important`,
    borderRadius: "0.5rem!important",
    width: "117.34px!important",
    height: "39.23px",
    marginRight:'2rem!important',
    position:'absolute',
    float:'right',
    bottom:'11%',
    "@media (max-width:899px)":{
      bottom:'calc( 11% + 195px )'
    },
    "@media (max-width:599px)":{
      bottom:'calc( 11% + 173px )',
      marginRight:'1rem!important',
    },
  },
  hotelname: {
    fontFamily: "poppins",
    color: styles.app_color,
    fontWeight: "500",
  },
  offer: {
    color: "#fff",
    background: "linear-gradient(90deg, #FF4949 -23.22%, #C20000 132.61%)",
    width: "67.44px",
    height: "24.17px",
    paddingLeft: "0.5rem",
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  },
});
export const selected_hotels = makeStyles({
  selected_hotel_bg: {
    backgroundImage: `url(${selected_hotel})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  },
  hotel_offer: {
    marginTop: "1rem",
    marginLeft: "auto",
    color: "#fff",
    background: "linear-gradient(90deg, #FF4949 -23.22%, #C20000 132.61%)",
    width: "67.44px",
    height: "24.17px",
    paddingLeft: "0.5rem",
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  },
  roomdesc: {
    color: `${fontcolor}`,
    fontSize: `${font_size3}`,
    fontWeight: "600",
  },
  roomprice: {
    color: "#303030",
    fontSize: `${font_size3}`,
    fontWeight: "500",
  },
  sel_hotel: {
    backgroundColor: `${btn_color1}!important`,
    textTransform: "none!important",
    color: `${btn_color2}!important`,
    borderRadius: "0px!important",
    borderBottomLeftRadius: "0.5rem!important",
  },
  book_hotel: {
    backgroundColor: `${btn_color2}!important`,
    textTransform: "none!important",
    color: `${textcolor}!important`,
    borderRadius: "0px!important",
    borderBottomRightRadius: "0.5rem!important",
  },
  hotel_name: {
    fontSize: `1.8rem`,
    fontWeight: "600",
    color: `${fontcolor}`,
    "@media (max-width:899px)": {
      fontSize: "16px",
    },
  },
  room_facilitiesbtn: {
    width: "7.5rem",
    border: "none",
    textDecoration: "none",
    height: "2.5rem",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: `${font_family}`,
    background: "none",
    color: `${fontcolor}`,
  },
  sel_room_facilitiesbtn: {
    width: "7.5rem",
    border: "none",
    textDecoration: "none",
    height: "2.5rem",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: `${font_family}`,
    background: "none",
    color: `#fff`,
    background: `${fontcolor}`,
    borderRadius: "0.5rem",
  },
  title_styles:{
    color:styles.app_color,
    fontSize:'18px',
    fontWeight:'500',
    marginBottom:'0.8rem',
  },
  property_rules_text: {
    fontSize: `${font_size3}!important`,
  },
  room_title: {
    fontSize: `${font_size3}`,
    color: `${fontcolor}`,
    fontWeight: "500",
  },
  sel_roombtn: {
    width: "9rem",
    height: "2.3rem",
    border: "none",
    background: "none",
    backgroundColor: styles.app_color,
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "0.5rem",
  },
  location_data: {
    fontFamily: "poppins",
    fontSize: "14px",
  },
  distance_Style: {
    fontFamily: "poppins",
    color: styles.app_color,
    fontWeight: 700,
    fontSize: "14px",
  },
  cardbooknow_btn: {
    width: "9rem",
    height: "2.3rem",
    border: "none",
    background: "none",
    backgroundColor: styles.app_color,
    color: "#fff",
    fontWeight: 700,
    borderBottomRightRadius: "0.5rem",
  },
  booknow_btn: {
    color: `${fontcolor}`,
    fontSize: `${font_size3}`,
    fontWeight: 600,
    backgroundColor: "#fff",
    border: "none",
    width: "13rem",
    height: "3rem",
    borderRadius: "0.5rem",
    maxWidth: "100%",
  },
  room_combination: {
    background: "#DFF3FF",
    width: "auto!important",
    borderRadius: "0.5rem",
    height: "auto",
    minHeight: "10px!important",
    // marginTop: "1rem",
    // marginLeft: "1rem",
    "& .MuiTabs-indicator": {
      display: "none",
    },

    "& .MuiTab-root": {
      borderRadius: "1rem",
      // only apply the background color to selected and visible tabs
      "&.Mui-selected, &:not([aria-hidden='true'])": {
        background: "#DFF3FF",
        color: "#ffff",
      },
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#ffff",
      background: `${fontcolor}!important`,
      borderRadius: "0.5rem",
    },
  },
  room_tab: {
    textTransform: "none!important",
    height: "2rem!important",
    minHeight: "1rem!important",
    fontWeight: "600!important",
  },
  dividr: {
    border: "0.15rem solid #DFF3FF!important",
    borderRadius: "0.5rem!important",
    marginTop: "0.5rem!important",
  },
  sel_room_dividr: {
    border: "0.15rem solid #ffff!important",
    borderRadius: "0.5rem!important",
    marginTop: "0.5rem!important",
  },
  open_rooms_tab: {
    width: "auto",
    borderRadius: "0.5rem",
    // height:'35px!important',
    // marginTop: "1rem",
    // marginLeft: "1rem",
    "& .MuiTabs-indicator": {
      display: "none",
    },

    "& .MuiTab-root": {
      borderRadius: "0.5rem",
      // only apply the background color to selected and visible tabs
      "&.Mui-selected, &:not([aria-hidden='true'])": {
        background: "#DFF3FF",
        color: styles.app_color,
      },
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#ffff!important",
      background: `${fontcolor}!important`,
      borderRadius: "0.5rem",
    },
  },
  rooms_tab: {
    minHeight: "10px!important",
    height: "2rem",
    textTransform: "none!important",
  },
});
export const room_booking = makeStyles({
  text: {
    fontSize: `${font_size2}`,
    color: `${fontcolor}`,
    fontWeight: 500,
    fontFamily: `${font_family}`,
  },
  hotelname: {
    fontSize: `${font_size2}`,
    fontFamily: `${font_family}`,
    color: "#303030",
    fontWeight: 500,
  },
  hotel_loc: {
    fontSize: `${font_size4}`,
    fontFamily: `${font_family}`,
    fontWeight: 400,
  },
  hotel_checked_dates: {
    fontSize: `${font_size2}`,
    fontWeight: 500,
    color: `${fontcolor}`,
  },
  days_stay: {
    background: `${fontcolor}`,
    width: "5rem!important",
    height: "1.3rem",
    fontSize: `10px`,
    fontWeight: 500,
    color: "#fff",
    border: "none",
    borderRadius: `0.3rem`,
  },
  guests_count: {
    fontSize: `${font_size3}!important`,
    fontWeight: `500!important`,
    color: "#303030!important",
  },
  room_name: {
    fontSize: `${font_size3}`,
    color: styles.app_color,
    fontWeight: 500,
    fontFamily: `${font_family}`,
  },
  cancel_header: {
    fontSize: `${font_size4}`,
    fontWeight: 500,
    fontFamily: `${font_family}`,
  },
  insurance_text: {
    fontSize: `${font_size4}`,
    fontFamily: `${font_family}`,
    color: `${fontcolor}`,
    fontWeight: 400,
  },
  // mybookings paper hover effect
  hotel_paper:{
    cursor:"pointer",
    borderRadius:'0.5rem!important',
    paddingBottom:'1rem!important',
    "&:hover":{
      boxShadow: "1px 2px 13px 3px rgba(4,56,89,0.83)"
    }
  }
});
export const map_modal = makeStyles({});
