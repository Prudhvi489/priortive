import { makeStyles } from "@mui/styles";
import Resorts from '../../assets/BusesAssets/BusesHomeBanner.png'
import selected_hotel from '../../assets/Hotelimages/selected_hotel.png'
import { DisplaySettings } from "@mui/icons-material";
import {styles} from '../../assets/styles/Styles_export'
const fontcolor = styles.app_color;
const textcolor="#fff"
const font_size1 = "18px";
const font_size2 = "16px";
const font_size3 = "14px";
const font_size4 = "12px"
const font_family = "Poppins"
const btn_color1="#DFF3FF";
const btn_color2=styles.app_color

//Buslist page design

export const buslist = makeStyles({
    pageBorders:{
        padding:'120px 60px',
        "@media (max-width:899px)":{
          padding:'10px 10px',
        },
    },
    searchBlock: {
        backgroundColor:'white',
        borderRadius:'10px',
        width:'100%'
    },
    filtersBlock: {
        backgroundColor:"white",
        borderRadius:'10px',
        padding:'10px',
        width:'25%',
        marginRight:'10px'
    },
    busDetailsBlock:{
        backgroundColor:"white",
        borderRadius:'10px',
        padding:'10px',
        width:'75%',
        overflowY:'scroll',
        "@media (max-width:390px)":{
          width:"100%",
          padding:"0px",
          marginLeft:"0px !important",
        },
        "@media (min-width:391px) and (max-width:600px)":{
          width:"100%",
          padding:"0px",
          marginLeft:"0px !important",
        },
        boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
        overflow:'auto !important'
    },
    busDetails:{
        padding:'10px 0px 0px 10px',
        marginBottom:'30px !important',
        borderRadius:'5px',
        boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",

    },
    busOffer:{
        padding:'4px 10px',
        backgroundImage:'linear-gradient(90deg, #FF4949 -23.22%, #C20000 132.61%)',
        borderTopLeftRadius:'5px',
        borderBottomLeftRadius:'5px',
        color:"#FFF"
    },
    busButton:{
        backgroundColor:styles.app_color,
        color:'white'
    },
    chipLabel: {
      fontSize: '16px!important',
      fontWeight: 'bold!important',
      color: `${fontcolor}!important`,
      fontFamily: `${font_family}`
    },
    chip: {
      backgroundColor: '#fff!important',
      marginTop: '2%!important'
    },
    searchpaper: {
      width: '100%',
      borderRadius: '1rem!important',
      fontFamily: `${font_family}`
      // media queries are written like this
      // '@media (min-width:500px) and (max-width:700px)':{
      //     width:'100px'
      // }
    },
    hotelsearchbtn: {
      width: "15rem",
      height: "3rem",
      borderRadius: '1rem',
      backgroundColor: `${fontcolor}`,
      color: "#fff",
      border: 'none!important',
      fontWeight: '600',
      fontSize: `${font_size2}`,
      fontFamily: `${font_family}`,
      cursor:'pointer'
    },
    cardpaper: {
      boxShadow: "0px 0px 6px rgba(0, 53, 86, 0.25)",
      // borderBottom: "1.5px solid rgba(0, 53, 86, 0.25)",
      // borderTop: "2px solid rgba(0, 53, 86, 0.25)",
    },
    cardbookbtn:
    {
      border: 'none',
      fontSize: '14px',
      backgroundColor: styles.app_color,
      width: "7rem",
      height: '2rem',
      color: '#fff',
      fontWeight: '600',
      borderBottomRightRadius: '1rem'
    },
  
  })