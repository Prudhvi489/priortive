import { makeStyles } from "@mui/styles";
import {styles} from './Styles_export'
const headercolor = "white";
const maincolor = `${styles.app_color}`;
const mainheading = "18px";
const subheading1 = "16px";
const subheading2 = "14px";
const subheading3 = "12px";
const subheading4 = "10px";
const offersbackground = "#DFF3FF";
const error = "red";
// errors
export const errorsdata = makeStyles({
  error: {
    color: error,
    fontFamily: "poppins",
  },
});
// Go mytrip header
export const headers = makeStyles({
  color: "red",
  main: {
    paddingTop: "5px",
    // paddingBottom: "5px!important",
  },
  header: {
    background: `${headercolor}!important`,
  },
  icons: {
    color: "black",
    textDecoration: "none",
    "& .MuiButton-root": {
      color: "black",
    },
  },
  stack: {
    flexGrow: 1,
    padding: "1.3em 2em",
  },
  activetab: {
    background: `${maincolor}!important`,//` linear-gradient(116.32deg, #F23844 -5.88%, #046FB1 111.84%)`,//
    padding: "0.4rem 0.5rem 0.5rem 0.5rem",
    textDecoration: "none!important",
    borderRadius: "0.5rem",

    "& .MuiButton-root": {
      color: "#fff!important",
    },
  },
  active: {
    // padding:" 0.4rem 0.5rem 0.5rem 0.5rem",
    // borderRadius: "0.5rem",
    // textDecoration:" none!important",
    // backgroundColor: `${styles.app_color}!important`
    backgroundColor: `${maincolor}!important`,
    padding: "0.4rem 0.5rem 0.5rem 0.5rem",
    textDecoration: "none!important",
    borderRadius: "0.5rem",

    "& .MuiButton-root": {
      color: "#fff!important",
    },
  },
});
//Go mytrip main page
export const gomainpage = makeStyles({
  // styles by naveen
  gridspace: {
    marginTop: "0px",
    "@media (min-width:320px) and (max-width:899px) ": {
      marginTop: "0.5rem !important",
    },
  },
  // imgsize:{
  //   width:"100%",
  //   "@media (min-width:320px) and (max-width:464px)" : {
  //     width:"220px",
  //   },
  // }
  // ended here  
  over: {
    overflowX: "hidden",
    // height: "100vh",
  },
  iconscolor: {
    color: styles.app_color,
  },
  // searchflightsbtnbox: {
  //   display: "flex",
  //   justifyContent: "center",
  // },
  gotripslist: {
    marginLeft: "1rem!important",
    paddingTop: "1rem",
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      background: maincolor,//' linear-gradient(116.32deg, #F23844 -5.88%, #046FB1 111.84%)!important',//
      borderRadius: "0.5rem",
      padding: "2px 5px 2px 5px",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    '& .MuiTab-root': {
      padding: '0px',
      minWidth: 'fit-content',
    },
    '& .MuiTabs-flexContainer': {
      gap: '1rem',
    },
    "@media (max-width:899px)": {
      marginLeft: "0.3rem!important",
      marginRight: "0.3rem!important",
      '& .MuiTabs-flexContainer': {
        justifyContent: "space-between",
        padding: '0rem 1.2rem'
      },
    },
  },
  tabbtns: {
    textTransform: "none!important",
    height: "2rem!important",
    minHeight: "1rem!important",
    fontWeight: "600!important",
  },
  tripspositions: {
    position: "relative",
  },
  tripscard: {
    position: "absolute!important",
    top: "68%",
    width: "100%",
    '@media (max-width:899px) and (min-width:600px)': {
      top: '77%'
    },
    '@media (max-width:599px)': {
      top: '50%'
    },
    '@media (min-width:1555px)': {
      top: '78%'
    },
    '@media (min-width:2030px)': {
      top: '80%'
    },
  },
  // styling the textfield input
  travellersinput: {
    color: `${styles.app_color}!important`,
    fontWeight: "600!important",
  },
  searchbtn: {
    position: "absolute!important",
    top: "89%",
    // right: "47%!important",
    left: "50% !important",
    transform: "translate(-50%, -50%)",
    background:`${styles.app_color}!important`,//`linear-gradient(116.32deg, #F23844 -5.88%, #046FB1 111.84%)!important`,
    color: "#fff",
    fontSize: "1rem",
    padding: "0.5rem 3rem!important",
    //styles by naveen 
    "@media (min-width:200px) and (max-width:599px) ": {
      // right: 'calc(50% - 50%)!important',
      position: "inherit !important",
      marginTop: "1rem !important",
      width: "100%",
      transform: "none",
    },
    "@media (min-width:600px) and (max-width:899px) ": {
      // right: 'calc(50% - 50%)!important',
      position: "inherit !important",
      marginTop: "1rem !important",
      transform: "none",
    },
    // ended here
  },
  swapbtn: {
    position: "absolute!important",
    top: "49%",
    left: "21.5%",
    // "@media (min-width: 1920px)": {
    //   left: "26.3%",
    // },
    '@media (max-width:899px) and (min-width:600px)': {
      top: '50.5%',
      left: '50%',
      transform: 'translate(-50%,-50%) rotate(90deg)',
    },
    '@media (max-width:599px)': {
      top: '51%',
      left: '50%',
      transform: 'translate(-50%,-50%) rotate(90deg)',
    },
    '@media (max-width:1590px) and (min-width:1570px)': {
      left: '21.9%'
    },
    '@media (max-width:1615px) and (min-width:1571px)': {
      left: '22.3%'
    },
    '@media (max-width:1640px) and (min-width:1616px)': {
      left: '22.7%'
    },
    '@media (max-width:1670px) and (min-width:1641px)': {
      left: '23.1%'
    },
    '@media (max-width:1700px) and (min-width:1671px)': {
      left: '23.6%'
    },
    '@media (max-width:1730px) and (min-width:1701px)': {
      left: '24%'
    },
    '@media (max-width:1760px) and (min-width:1731px)': {
      left: '24.5%'
    },
    '@media (max-width:1790px) and (min-width:1761px)': {
      left: '25%'
    },
    '@media (max-width:1815px) and (min-width:1791px)': {
      left: '25.3%'
    },
    '@media (max-width:1840px) and (min-width:1816px)': {
      left: '25.7%'
    },
    '@media (max-width:1870px) and (min-width:1841px)': {
      left: '26%'
    },
    '@media (max-width:1900px) and (min-width:1871px)': {
      left: '26.4%'
    },
    '@media (max-width:1950px) and (min-width:1901px)': {
      left: '26.9%'
    },
    '@media (min-width:1951px)': {
      left: '27.4%'
    },
  },
  swapbtnBusSearch: {
    position: "absolute!important",
    top: "71%",
    left: "38.5%",
    // style by naveen
    "@media (min-width:1921px) and (max-width:2220px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1840px) and (max-width:1920px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1700px) and (max-width:1839px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1600px) and (max-width:1699px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1500px) and (max-width:1599px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1400px) and (max-width:1499px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1300px) and (max-width:1399px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1200px) and (max-width:1299px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1100px) and (max-width:1199px)": {
      left: "32.5%",
      top: "34.5%",
    },
    "@media (min-width:1000px) and (max-width:1099px)": {
      left: "32%",
      top: "34.5%",
    },
    "@media (min-width:900px) and (max-width:999px)": {
      left: "32%",
      top: "34.5%",
    },
    "@media (min-width:600px) and (max-width:899px)": {
      left: "50%",
      top: "28%",
      transform: 'translate(-50%,-50%) rotate(90deg)',
    },
    "@media (min-width:375px) and (max-width:599px)": {
      left: "50%",
      top: "28%",
      transform: 'translate(-50%,-50%) rotate(90deg)',
    },
    "@media (max-width:374px)": {
      left: "50%",
      top: "28%",
      transform: 'translate(-50%,-50%) rotate(90deg)',
    },
    // ended here
    // "@media (min-width: 1920px)": {
    //   left: "26.3%",
    // },
  },
  swapbtnBusSearchList: {
    position: "absolute!important",
    left: "25.2%",
    top: "68px",
    "@media (min-width:1921px) and (max-width:2220px)": {
      left: "25.2%",
      top: "68px",
    },
    "@media (min-width:1840px) and (max-width:1920px)": {
      left: "25.2%",
      top: "68px",
    },
    "@media (min-width:1700px) and (max-width:1839px)": {
      left: "25.2%",
      top: "68px",
    },
    "@media (min-width:1600px) and (max-width:1699px)": {
      left: "25.2%",
      top: "68px",
    },
    "@media (min-width:1500px) and (max-width:1599px)": {
      left: "25.2%",
      top: "68px",
    },
    "@media (min-width:1400px) and (max-width:1499px)": {
      left: "25.2%",
      top: "68px",
    },
    "@media (min-width:1200px) and (max-width:1299px)": {
      left: "25.2%",
      top: "68px",
    },
    // top: "34px",
    // "@media (min-width:1921px) and (max-width:2220px)" : {
    //   left: "25.4%",
    //   top: "33px",
    // },
    // "@media (min-width:1840px) and (max-width:1920px)" : {
    //   left: "25.4%",
    //   top: "35px",
    // },
    // "@media (min-width:1700px) and (max-width:1839px)" : {
    //   left: "25.4%",
    //   top: "35px",
    // },
    // "@media (min-width:1600px) and (max-width:1699px)" : {
    //   left: "25.2%",
    //   top: "35px",
    // },
    // "@media (min-width:1500px) and (max-width:1599px)" : {
    //   left: "25.2%",
    //   top: "35px",
    // },
    // "@media (min-width:1400px) and (max-width:1499px)" : {
    //   left: "25%",
    //   top: "35px",
    // },
    // "@media (min-width:1200px) and (max-width:1299px)" : {
    //   left: "25%",
    //   top: "35px",
    // },
    "@media (min-width:1100px) and (max-width:1199px)": {
      left: "23.7%",
      top: "68px",
    },
    "@media (min-width:1000px) and (max-width:1099px)": {
      left: "23.7%",
      top: "68px",
    },
    "@media (min-width:900px) and (max-width:999px)": {
      left: "23.7%",
      top: "68px",
    },
    "@media (max-width:899px)": {
      left: "45%",
      top: "80px",
      transform: "rotate(90deg)"
    },
    // "@media (min-width:599px) and (max-width:899px)" : {
    //   left: "45%",
    //   top: "20%",
    //   transform: "rotate(90deg)"
    // },
    // "@media (min-width:400px) and  (max-width:600px)" : {
    //   left: "45%",
    //   top: "60px",
    //   transform:"rotate(90deg)"
    // },
    // "@media (max-width:390px)" : {
    //   left: "45%",
    //   top: "64px",
    //   transform:"rotate(90deg)"
    // },
    // "@media (max-width:350px)" : {
    //   left: "45%",
    //   top: "70px",
    //   transform:"rotate(90deg)"
    // },
    // "@media (min-width: 1920px)": {
    //   left: "26.3%",
    // },
    // }
  },
  bgimgo: {
    height: "500px",
  },

  // flights and bus corousels
  flightscarousel: {
    padding: "2%",
    borderRadius: "1rem",
    "@media (min-width:320px) and (max-width:480px)": {
      border: "0px",
      // borderRadius:"0px"
    }
  },

  // offers styles
  cardcontent: {
    background: '#2a2a2a',//styles.app_color,
    padding: "8px!important",
    textAlign: "center",
    color: "#fff",
    "@media (max-width:899px)": {
      padding: '5px !important'
    }
  },
  indigo: {
    fontSize: `${subheading2}!important`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    "@media (max-width:899px)": {
      fontSize: '12px !important',
    },
  },
  DomFlights: {
    fontSize: `${subheading2}!important`,
    color: "#8F9098",
    paddingTop: 10,
    // styles by naveen
    "@media (min-width:320px) and (max-width:480px)": {
      fontSize: "12px",
      paddingTop: 0,
    },
    "@media (min-width:481px) and (max-width:899px)": {
      fontSize: "13px",
      paddingTop: 0,
    },
    // eneded here
    "@media (max-width:899px)": {
      fontSize: '12px !important'
    },
  },
  indigoflightsale: {
    fontSize: `${subheading2}!important`,
    fontWeight: "bold",
    color: "#303030",
    weight: 500,
    // styles by naveen
    "@media (min-width:320px) and (max-width:480px)": {
      fontSize: "12px",
      marginTop: "5px !important",
    },
    "@media (min-width:481px) and (max-width:799px)": {
      fontSize: "13px",
      marginTop: "5px !important",
    },
    // eneded here
    "@media (max-width:899px)": {
      fontSize: '12px !important'
    },
  },
  bookflights: {
    color: "#8F9098",
    fontSize: `${subheading2}!important`,
    fontWeight: 500,
    // styles by naveen
    "@media (min-width:320px) and (max-width:480px)": {
      fontSize: "12px !important",
      marginTop: "5px !important",
    },
    "@media (min-width:481px) and (max-width:899px)": {
      fontSize: "13px !important",
      marginTop: "5px !important",
    }
    // eneded here
  },
  // book: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  Terms: {
    fontSize: "12px",
    fontWeight: 300,
    textAlign: 'center',
    // marginLeft: "30px",
    // styles by naveen
    "@media (min-width:320px) and (max-width:480px)": {
      fontSize: "9px !important",
      // marginLeft:"5px !important",
    },
    "@media (min-width:481px) and (max-width:899px)": {
      fontSize: "9px !important",
      // marginTop:"5px !important",
    },
    // eneded here
    "@media (max-width:899px)": {
      fontSize: "9px !important",
    },
  },
  booknow: {
    border:`2px solid ${styles.app_color}`,
    background: maincolor,
    borderBottomRightRadius: "8px",
    padding: "8px 20px",
    color: "#fff",
    // styles by naveen
    "@media (min-width:320px) and (max-width:480px)": {
      fontSize: "12px !important",
      // marginLeft:"5px !important",
    },
    "@media (min-width:481px) and (max-width:899px)": {
      fontSize: "13px !important",
      // marginTop:"5px !important",
    }
    // eneded here
  },
  booknowBus: {
    border:`2px solid ${styles.app_color}`,
    background: maincolor,
    borderBottomRightRadius: "8px",
    padding: "1px 10px",
    color: "#fff",
    "@media (max-width:899px)": {
      fontSize: "12px !important",
    },
  },
  cardpaper: {
    paddingTop: "10px",
    paddingLeft: "10px",
    borderRadius: "20px!important",
    boxShadow: "0px 0px 6px rgba(0, 53, 86, 0.25)",
    borderBottom: "2px solid rgba(0, 53, 86, 0.25)",
    borderTop: "2px solid rgba(0, 53, 86, 0.25)",
    marginRight: "15px",
  },
  //destinations
  destinationsmain: {
    position: "relative",
    margin: '0rem 0.3rem',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    height: '100%'
  },
  destinationtext: {
    position: "absolute",
    top: "75%",
    // left: "40%",
    color: "#fff",
    left: '0%',
    width: '100%',
    textAlign: 'center'

  },
  bestplacetext: {
    top: "75%",
    color: "#fff",
    position: "absolute",
    right: "70%",
  },
  // bottom scanner
  scanner: {
    marginTop: "10%!important",
  },
  scanner1: {
    marginTop: "25%!important",
  },
  // buttons playstore
  playstore: {
    background: "#EDEDED!important",
  },
  appstore: {
    background: "#000000!important",
    color: "#fff!important",
  },
}
)
export const Footer1 = makeStyles({
  footerbody: {
    background: '#2a2a2a',//maincolor,
    paddingTop: "2%",
    color: "#fff",
  },
  footercenter: {
    display: "flex",
    justifyContent: "center",
    //style by naveen
    "@media (min-width:320px) and (max-width:599px)": {
      justifyContent: "start"
    },
    "@media (min-width:600px) and (max-width:899px)": {
      justifyContent: "start"
    },
    //  
  },
  footertext: {
    fontSize: `${subheading2}!important`,
  },
  footerheadtext: {
    fontSize: "18px!important",
  },
});
export const filters = makeStyles({
  filters: {
    color: styles.app_color,
    fontSize: `${subheading2}!important`,
    fontWeight: "600!important",
    fontFamily: "poppins!important",
  },
});
export const ticket_travellers = makeStyles({
  name: {
    padding: "10px 0 7px",
    fontSize: `${subheading2}!important`,
    color: styles.app_color,
    //   "&:hover":{
    //   color:'#fff'
    // }
  },
  innerDiv: {
    width: 450,
    height: 74,
    borderRadius: "9px",
    boxShadow: "0px 4px 24px -1px rgba(212, 175, 156, 0.25)",
    border:`2px solid ${styles.app_color}`,
    marginBottom: "12px",
    "&:hover": {
      color: "#fff !important",
      backgroundColor: styles.app_color,
      '& .name': {
        color: '#fff!important'
      }
    },
  },
});
//textfield outline color
export const style = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: styles.app_color,
    },
  },
};
// Mui textfield border color
export const muitextfieldborder = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: `${styles.app_color}!important`,
        borderColor: "#8F9098!important",
      },
    },
  },
  search_root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${styles.app_color}!important`,
      },
    },
  },
  recaptcha: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));
// Afteflight search component
export const aftersearch = makeStyles({
  backgroundColor: "#DFF3FF!important",
  text: {
    color: `${styles.app_color}!important`,
    fontSize: "20px",
    fontWeight: 600,
  },
  btns: {
    // color: maincolor,
    backgroundColor: "#DFF3FF!important",
    borderRadius: "0.5rem!important",
    fontSize: "12px",
    fontWeight: 400,
    color: `${maincolor}!important`,
    textTransform: "none!important",
  },
  nightbtn: {
    backgroundColor: `${styles.shade_color}!important`,
    color: styles.textcolor,
    padding: "0.3rem 2.5rem",
    borderRadius: "0.5rem!important",
    fontSize: "11px",
    fontWeight: 400,
  },
  pricetoggle: {
    backgroundColor: `${styles.shade_color}!important`,
    color: `${styles.textcolor}!important`,
    textTransform: "none!important",
    fontFamily: "poppins!important",
    borderRadius: "0.5rem!important",
    fontWeight: "400!important",
    "&:hover": {
      backgroundColor: `${styles.shade_color}!important`,
    },
  },
  pricetoggleFiltered: {
    backgroundColor: `${styles.app_color}!important`,
    color: "#fff!important",
    "&:hover": {
      backgroundColor: `${styles.app_color}!important`,
    },
  },
  stopstoggle: {
    backgroundColor: "#DFF3FF!important",
    borderRadius: "0.5rem!important",

    textTransform: "none!important",
    color: `${styles.app_color}!important`,

    "&:hover": {
      backgroundColor: "#DFF3FF!important",
    },
  },
  stopsbtn: {
    border: "none",
    padding: "8px 15px",
    borderRadius: "0.5rem",
    color: maincolor,
    background: "#DFF3FF",
    fontSize: subheading2,
  },
  stopsbtnFilterSelected: {
    color: '#fff',
    background: maincolor,
  },
  departurebtns: {
    border: "none",
    background: "#DFF3FF",
    padding: "0.7rem 0.5rem",
    color: styles.app_color,
    borderRadius: "0.5rem",
    fontFamily: "poppins",
    width: '100%',
  },
  departurebtnsSelected: {
    border: "none",
    padding: "0.7rem 1.3rem",
    borderRadius: "0.5rem",
    fontFamily: "poppins",
    background: styles.app_color,
    color: "#DFF3FF",
    width: "100%",
  },
  departurenitbtn: {
    border: "none",
    background: "#DFF3FF",
    padding: "0.7rem 0.5rem",
    color: styles.app_color,
    borderRadius: "0.5rem",
    width: '100%',
  },
  boundtabs: {
    marginLeft: "25%!important",
    height: "2rem!important",
    minHeight: "1rem!important",
    width: "11.3rem",
    borderRadius: "0.5rem",
    color: `${styles.app_color}!important`,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: maincolor,
      borderRadius: "0.5rem",
      padding: "2px 5px 2px 5px",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  boundtabbtns: {
    textTransform: "none!important",
    height: "2rem!important",
    minHeight: "1rem!important",
  },
});
// After flight search flights component
export const aftersearchflights = makeStyles({
  textcol: {
    color: maincolor,
  },
  searchdata: {
    fontSize: "18px",
    fontWeight: 500,
  },
  searchpaper: {
    position: "relative",
  },
  swap: {
    position: "absolute",
    top: "55%",
    left: "21%!important",
    "@media (min-width: 1920px)": {
      left: "26.3%!important",
    },
  },
  searchbtn: {
    backgroundColor: `${styles.app_color}!important`,
    borderRadius: "0.5rem",
    textTransform: 'none!important',
  },
  // Carousel data
  carouselbutton: {
    backgroundColor: 'white',
    borderRadius: "0.7rem",
    padding: "0.6rem 1.2rem",
    border: "none",
    // boxSizing: "border-box",
    color: maincolor,
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
  },
  carouselbuttonselect: {
    borderRadius: "0.8rem",
    padding: "0.6rem 1.2rem",
    border: "none",
    boxSizing: "border-box",
    background: styles.app_color,
    color: "#fff",
  },
  carouselrelative: {
    position: "relative",
  },
  monthsbutton: {
    position: "absolute",
    // top: "27%",
    // left: "5.5%",
    top: '28%',
    // left: '4%',
    left:'2.5%',
    transform: "rotate(270deg)",
    color: "#ffff",
    background: styles.app_color,
    border: "none",
    padding: "0.5rem 0.9rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
    width: '4.5rem',
  },
  monthsbutton_res: {
    position: "absolute",
    top: "24%",
    left: "0%",
    transform: "rotate(270deg)",
    color: "#ffff",
    background: styles.app_color,
    border: "none",
    padding: "0.5rem 0.9rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
    // '@media(max-width: 400px)' : {
    //   top: "25%",
    //   left: "12.5%",
    // },
    // '@media (min-width: 401px) and (max-width: 600px)' : {
    //   top: "25%",
    //   left: "10.5%",
    // },
    // '@media (min-width: 601px) and (max-width: 899px)' : {
    //   top: "25%",
    //   left: "6.9%",
    // },
  },
  // flights accordion
  flighttiming: {
    fontSize: subheading2,
    fontWeight: 500,
  },
  flightlayofftext: {
    fontSize: subheading3,
    fontWeight: 400,
    "@media (max-width:599px)": {
      fontSize: "14px",
    },
  },
  flightlayoffoffers: {
    fontSize: "11px",
    paddingLeft: "2px",
  },
  flightoffer: {
    background: "#DFF3FF",
    padding: "2px 15px 2px 15px",
    borderRadius: "5px",
  },
  booknow: {
    background: styles.app_color,
    border: `1px solid ${styles.app_color}`,
    color: "#ffff",
    padding: "1rem 3.1rem 1.1rem 2.4rem",
    borderBottomRightRadius: "0.8rem",
    fontWeight: "bold",
    fontSize: "0.8rem",
    // Krishna adding
    "@media (min-width:1px) and (max-width:899px)": {
      padding: '0.7rem 1.5rem'
    }
  },
  airlinename: { fontSize: `${subheading2}!important`, maxWidth: '100px!important', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  tab_airlinename: { textTransform: 'none', flex: 1, maxWidth: '90px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  Flightdetails: {

    // marginLeft: "1.5rem!important",
    padding: "0rem!important",
    color: `${styles.app_color}!important`,
    fontSize: "12px",
    width: "200px",
    textTransform: "none!important",
    fontFamily: "poppins!important",
    display: 'flex',
    justifyContent: 'flex-start'
  },
  tabs: {
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#ffff",
      background: maincolor,
      //  borderRadius:'1rem'
    },
  },
  // Booknow button in accordion summary
  bookbtn: {
    color: "#ffff",
    border: "none",
    background: styles.app_color,
    padding: "0.8rem 2rem",
    borderBottomRightRadius: "0.9rem",
  },
  // Fare details
  faretxt: {
    fontSize: `${subheading2}!important`,
    fontWeight: 400,
  },
  // Baggage information
  baggage: {
    background: "#EDF5FA!important",
    padding: "0.5rem 2rem",
    marginTop: "1rem!important",
    borderRadius: "1rem",
    '@media (max-width:600px) and (min-width:0px)': {
      padding: '0.5rem 1rem'
    }
  },
  baggageinfo: {
    color: styles.app_color,
    textDecoration: "underline",
    textDecorationColor: styles.app_color,
  },
  baggagebullet: { color: styles.app_color, fontSize: "1.5rem" },
});
// Book now model
export const booknow = makeStyles({
  offerscard: {
    backgroundColor: "#DDF2FF",
    padding: "1.2rem",
    borderRadius: "1rem",
    "@media (max-width:350px)": {
      padding: '0.5rem'
    }
  },
  activeofferscard: {
    backgroundColor: maincolor,
    padding: "1.2rem",
    borderRadius: "1rem",
    color: "#ffff",
  },
  offerstextsize: {
    fontSize: `${subheading2}!important`,
    "@media (max-width:1170px) and (min-width:900px)": {
      fontSize: '11px !important'
    },
    "@media (max-width:440px)": {
      fontSize: '11px !important'
    },
  },
  tabs: {
    paddingLeft: "1.5rem",
    paddingTop: "1rem",
    "& .MuiTab-root:not(.Mui-selected)": {
      backgroundColor: "#DFF3FF",
      color: styles.app_color,
      borderRadius: "0.5rem",
      height: "40px",
      minHeight: "40px",
      padding: "2px",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: maincolor,
      borderRadius: "0.5rem ",
      height: "40px",
      minHeight: "40px",
      padding: "1px 0px 1px 0px",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    '& .MuiTabs-flexContainer': {
      gap: '1rem',
    },
    '@media (max-width:500px)': {
      padding: '0.5rem 1rem'
    }
  },
});
// Flight ticket booking
export const ticketbooking = makeStyles({
  mainbody: {
    backgroundColor: "#EFF9FF",
    marginTop: "2.6rem",
  },
  completebookings: {
    color: maincolor,
    // fontSize:'14px',
    fontWeight: 500,
    // marginTop: "2%",
  },
  textsize: {
    fontSize: "16px",
    color: maincolor,
    fontWeight: 500,
  },
  totalamount: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  headings: {
    fontSize: "18px",
    color: maincolor,
    fontWeight: "500",
  },
  btn: {
    backgroundColor: `${styles.app_color}!important`,
    color: "#ffff!important",
    borderRadius: "0.5rem!important",
    padding: "0.5rem 1rem!important",
  },
  refunddetails: {
    backgroundColor: "#EDF5FA!important",
    padding: "1rem!important",
    borderRadius: "1rem!important",
    '@media (max-width:899px)': {
      backgroundColor: "#fff!important",
      padding: "0rem!important",
      fontSize: '10px'
    }
  },
  genderbtns: {
    // padding: "0.3rem 1rem!important",
    // width:'80px',
    height: '30px',
    borderRadius: "0.5rem!important",
    background: "#EEF7FD!important",
    color: `${styles.app_color}!important`,
    // marginLeft: "2rem!important",
    border: "none!important",
    // borderRadius: "0.5rem!important",
    // "@media (max-width:600px)":{
    //   padding:'0.3rem 0.5rem !important',
    //   marginLeft: "0.3rem!important",
    // },
    // "@media (min-width:900px) and (max-width:1371px)":{
    //   width:'68px',
    //   marginLeft: "0.3rem!important",
    // },
  },
  paperadjustment: {
    marginTop: "1rem!important",
    padding: "1rem!important",
    borderRadius: "1rem!important",
  },
  addtravellerbtn: {
    background: `${styles.app_color}!important`,
    padding: "0.6rem 1.5rem",
    borderRadius: "0.5rem !important",
    textTransform: "none!important",
    fontSize: `${subheading2}!important`,
    fontFamily: '"Poppins", sans-serif !important',
    fontWeight: "500!important",
  },
  savedetailsbtn: {
    borderColor: `${maincolor}!important`,
    color: `${maincolor}!important`,
    textTransform: "none!important",
    fontWeight: "500!important",
    fontFamily: '"Poppins", sans-serif !important',
    borderRadius: '0.5rem !important',
    "@media (min-width:368px) and (max-width:415px)": {
      padding: "16px !important",
    },
  },
  continuebtn: {
    marginTop: "2rem!important",
    marginBottom: "1rem!important",
    backgroundColor: `${styles.app_color}!important`,
    padding: "0.5rem 1.5rem!important",
    borderRadius: "0.5rem",
    textTransform: 'none!important'
  },
  seatview: {
    // background: "#DFF3FF",
    width: "auto",
    borderRadius: "1rem",
    // marginTop: "1rem",
    // marginLeft: "1rem",
    "& .MuiTabs-indicator": {
      display: "none",
    },

    // "& .MuiTab-root": {
    //   borderRadius: "1rem",
    //   // only apply the background color to selected and visible tabs
    //   "&.Mui-selected, &:not([aria-hidden='true'])": {
    //     background: "#DFF3FF",
    //     color: "#ffff",
    //   },
    // },
    "& .MuiTab-root.Mui-selected": {
      color: "#ffff",
      background: `${maincolor}!important`,
      borderRadius: "1rem",
    },
  },
  seatviewtabs: {
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root:not(.Mui-selected)": {
      backgroundColor: "#DFF3FF",
      color: styles.app_color,
      borderRadius: "0.5rem",
      height: "40px",
      minHeight: "40px",
      padding: "5px 1rem 5px 6px",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#ffff",
      background: maincolor,
      borderRadius: "1rem",
      borderRadius: "0.5rem",
      height: "40px",
      minHeight: "40px",
      padding: "5px 1rem 5px 6px",
      //  borderRadius:'1rem'
    },
  },
  nextbtn: { backgroundColor: `${styles.app_color}!important`, textTransform: "none" },
  titlebtns: {
    padding: "0.3rem 1rem!important",
    background: "#EEF7FD!important",
    color: `${styles.app_color}!important`,
    border: "none!important",
    borderRadius: "0.5rem!important",
    marginLeft: '1rem!important',
    width: '4rem',
    "@media (min-width:900px) and (max-width:1300px)": {
      width: 'fit-content',
      padding: '0rem 0.5rem !important',
      marginLeft: '0.5rem!important',
    },
    "@media (max-width:367px)": {
      width: 'fit-content',
      padding: '0rem 0.5rem !important',
      marginLeft: '0.5rem!important',
    },
  },
  seat_blue: {
    backgroundColor:`${styles.app_color}!important`
  },
  removeCoupoun: {
    border: `1px solid ${maincolor}`,
    borderRadius: '15px',
    padding: '3px'
  }
});
// Edit profile dilogue
export const editprofile = makeStyles({
  genderbtns: {
    // padding: "0.2rem 1rem!important",
    // background: "#EEF7FD!important",
    // color: `${styles.app_color}!important`,
    // marginLeft: "0.5rem!important",
    // border: "none!important",
    // borderRadius: "0.8rem!important",
    textTransform: 'none !important',
    width: 'fit-content',
    height: '30px',
    borderRadius: "0.5rem!important",
    background: "#EEF7FD!important",
    color: `${styles.app_color}!important`,
    marginLeft: "0.5rem!important",
    border: "none!important",
    borderRadius: "0.5rem!important",
    "@media (max-width:360px)": {
      padding: '0.3rem 0.5rem !important',
      fontSize: '10px!important'
    },
    "@media (min-width:361px) and (max-width:600px)": {
      padding: '0.3rem 0.5rem !important',
      fontSize: '11px!important'
    },
    "@media (min-width:900px) and (max-width:1075px)": {
      width: 'fit-content',
      padding: '0.3rem 0.5rem !important',
      fontSize: '12px!important',
    },
    "@media (max-width:400px)": {
      width: '68px'
    },
  },
  titlebtns: {
    // padding: "0.3rem 1rem!important",
    // background: "#EEF7FD!important",
    // color: `${styles.app_color}!important`,
    // border: "none!important",
    // borderRadius: "0.5rem!important",
    // marginLeft:'2rem!important',
    // width:'4rem'
    width: '80px',
    height: '30px',
    borderRadius: "0.5rem!important",
    background: "#EEF7FD!important",
    color: `${styles.app_color}!important`,
    marginLeft: "0.5rem!important",
    border: "none!important",
    borderRadius: "0.5rem!important",
    "@media (max-width:600px)": {
      padding: '0.3rem 0.5rem !important',
    },
    "@media (min-width:900px) and (max-width:1075px)": {
      width: '60px'
    },
    "@media (max-width:400px)": {
      width: '68px'
    },
  }
});
// Errors styles
export const errors = makeStyles({
  errtxt: {
    color: "red!important",
    fontSize: "12px!important",
  },
});
// Forgot password model
export const forgotpwdmodel = makeStyles({
  heading: { fontSize: mainheading, fontWeight: "500", color: maincolor },
  button: {
    width: "94%!important",
    backgroundColor: `${maincolor}!important`,
    borderRadius: "0.5rem!important",
    color: "#ffff!important",
    '&:disabled': {
      backgroundColor: "#eee !important",
      cursor: 'not-allowed',
    },
  },
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: `${styles.app_color}!important`,
        borderColor: "#8F9098!important",
      },
    },
  },
});

export const Myposition = makeStyles({
  position1: {
    position: "absolute",
    bottom: "5%",
  },
});
// Round trip styles
export const Roundtripstyles = makeStyles({
  departure: {
    color: maincolor,
    fontSize: subheading2,
    fontWeight: 500,
  },
  paper: {
    borderRadius: "1rem",
    "@media (min-width:1200px) and (max-width:1330px)": {
      width: "100%",
    },
    "@media (min-width:1100px) and (max-width:1199px)": {
      width: "100%",
    },
    "@media (min-width:1000px) and (max-width:1099px)": {
      width: "100%",
    },
    "@media (min-width:900px) and (max-width:999px)": {
      width: "100%",
    },
  },
  font: {
    fontSize: subheading2,
  },
  font1: {
    fontSize: subheading2,
    fontWeight: "600!important",
  },
  font2: {
    fontSize: subheading4,
  },
  offerbackground: {
    backgroundColor: offersbackground,
    borderRadius: "5px",
  },
  timefont: {
    fontSize: subheading2,
    color: "#fff",
  },
  // accordion flight summary
  flightdetails: {
    color: maincolor,
    fontSize: subheading2,
    fontWeight: 500,
  },
  cheapest: {
    color: "#FF4949",
    fontSize: subheading2,
  },
  tabs: {
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: maincolor,
      // borderRadius: "0.5rem",
      padding: "2px 5px 2px 5px",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  tab: {
    fontSize: `${subheading3}!important`,
    width: "1rem!important",
    textTransform: "none!important",
    height: "3rem!important",
    fontWeight: `600!important`,
  },
  flighttxt: {
    fontSize: subheading2,
    fontWeight: "500",
  },
  flightnumber: {
    fontSize: subheading3,
  },
  faredetails: {
    fontSize: subheading2,
  },
  cancellationhead: {
    fontSize: subheading3,
    fontWeight: 500,
  },
  cancellationdata: {
    fontSize: subheading3,
  },
});
// My bookings styles
export const mybookingstyles = makeStyles({
  bookingfontprimary: {
    color: maincolor,
    fontSize: subheading2,
    fontWeight: 500,
  },
  tabsstyles: {
    backgroundColor: "#ffff",
    borderRadius: "1rem",
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: maincolor,
      padding: "0% 10.9%",
      borderRadius: "1rem",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  tabs: { fontSize: `${subheading3}!important`, padding: "0% 8.7%!important" },
  timefont: {
    fontSize: subheading2,
    fontWeight: 600,
  },
  bookingfont: {
    fontSize: "28px",
    color: "#ffff",
    fontWeight: 600,
  },
  ticketfont: {
    fontSize: subheading2,
    color: "#ffff",
  },
  baggagefont: {
    fontSize: subheading3,
    fontWeight: 500,
    color: maincolor,
  },
  cancellationhead: {
    fontSize: subheading3,
    fontWeight: 500,
    color: '#303030'
  },
  cancellationdata: {
    fontSize: subheading3,
    fontWeight: 400,
    color: '#303030'
  },
  travelinsurancedata: {
    fontSize: subheading3,
    color: maincolor,
  },
  faredata: {
    fontSize: subheading3,
  },
  flighttabs: {
    marginLeft: "0.5rem",
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: maincolor,
      borderRadius: "0.5rem",
      padding: "0rem 0.4rem 0rem 0.3rem!important",
      height: "5px!important",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  tabssecondary: {
    minHeight: "2rem!important",
  },
  cancellation_txt: {
    fontSize: `${subheading2}`,
    color: `${maincolor}`,
    fontWeight: '500'
  },
  // ------------------Buses Styles
  busTravelName: {
    color: "#303030",
    fontSize: mainheading,
    fontWeight: '500'
  },
  busTravelTimeDifference: {
    color: maincolor,
    fontSize: mainheading,
    fontWeight: '500'
  },
  seeBookDetails: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: "1px 2px 13px 3px rgba(4,56,89,0.83)"
    },
  },
  stepIcon: {
    color: 'red', // Replace 'red' with your desired color
    '& .MuiStepIcon-active': {
      color: 'green', // Replace 'green' with your desired active step color
    },
    '& .MuiStepIcon-completed': {
      color: 'red', // Replace 'blue' with your desired completed step color
    },
  },
});
// my refund styles
export const myrefund = makeStyles({
  refundtxt: {
    color: maincolor,
    fontSize: subheading2,
    fontWeight: 600,
  },
  tabs: {
    backgroundColor: "#ffff",
    width: "14.2vw",
    borderRadius: "0.5rem",
    height: "2rem",
    minHeight: "1rem!important",
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: maincolor,
      borderRadius: "0.5rem",
      padding: "0rem 0.4rem 0rem 0.3rem!important",
      height: "5px!important",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  flighttext: {
    color: maincolor,
    fontWeight: 500,
  },
  timedate: {
    color: maincolor,
    fontSize: subheading2,
  },
  text: {
    fontSize: subheading2,
  },
  successtext: {
    color: "#1FAF38",
    fontSize: subheading2,
  },
  tabpanel: {
    padding: "1rem 0rem 0rem 0rem!important",
  },
  pendingtext: {
    color: "red",
    fontSize: subheading2,
  },
});
export const multicitystyles = makeStyles({
  flighttxt: {
    fontSize: subheading4,
    marginBottom: '0.2rem!important'
  },
  pricetxt: {
    fontSize: subheading2,
    fontWeight: 500,
    color: maincolor,
  },
  datetime: {
    fontSize: subheading2,
    fontWeight: 600,
    "@media (max-width:375px)": {
      fontSize: "10px",
    }
  },
  nrmltxt: {
    fontSize: subheading3,
  },
  flightdetailsaccordion: {
    fontSize: subheading2,
    fontWeight: 600,
    color: maincolor,
  },
  detailstab: {
    // marginLeft:'1rem',
    "& .MuiTab-root:not(.Mui-selected)": {
      backgroundColor: "#DFF3FF",
      color: styles.app_color,
      borderRadius: "0.5rem",
      padding: "2px 5px",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: maincolor,
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
    width: "0px",
  },
  tabcitytxt: {
    fontSize: subheading2,
    color: maincolor,
    fontWeight: 500,
  },
  booknow: {
    background: styles.app_color,
    border: `1px solid ${styles.app_color}`,
    color: "#ffff",
    padding: "1rem 2.6rem 1rem 2rem",
    borderBottomRightRadius: "0.8rem",
    fontWeight: "bold",
    fontSize: "0.8rem",
    // Krishna adding
    "@media (min-width:1px) and (max-width:899px)": {
      padding: '0.7rem 1.5rem'
    },
  },
});
// invoice styles
export const invoicestyles = makeStyles({
  invoiceheading: {
    fontSize: "24px",
    color: maincolor,
    fontWeight: 600,
  },
  invoicesubheadings: {
    fontSize: subheading2,
    color: "#303030",
    fontWeight: 600,
  },
  invoicetext: {
    fontSize: subheading2,
  },
});
