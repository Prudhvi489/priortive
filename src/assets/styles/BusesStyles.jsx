import { makeStyles } from "@mui/styles";
import Resorts from '../../assets/BusesAssets/BusesHomeBanner.png'
import selected_hotel from '../../assets/Hotelimages/selected_hotel.png'
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
// media queries are written like this
// '@media (min-width:500px) and (max-width:700px)':{
//     width:'100px'
// }
// Hotel search main page styles
export const hotelsearch = makeStyles({
  hotelsearchbg: {
    backgroundImage: `url(${Resorts})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
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
    maxWidth: "100%",
    height: "3rem",
    borderRadius: '0.5rem',
    background: `${fontcolor}`,
    color: "#fff",
    border: 'none!important',
    fontWeight: '600',
    fontSize: `${font_size2}`,
    fontFamily: `${font_family}`,
    "@media (max-width:599px)" : {
     width:"100%",
     marginTop:"1rem",
    },
    "@media (min-width:600px) and (max-width:899px)" : {
      width:"100%",
      marginTop:"1rem",
     },
    cursor:'pointer'

  },
  hotelsearchbtn2: {
    padding:'5px 20px',   
    borderRadius: '0.5rem',
    background: `${fontcolor}`,
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
    color: `${fontcolor}`
  },
  paper_style: {
    borderRadius: '1rem',
    padding: '1rem'
  },
  pricebtn: {
    backgroundColor: "#DFF3FF!important",
    color: `${styles.app_color}!important`,
    textTransform: "none!important",
    fontFamily: "poppins!important",
    borderRadius: "0.5rem!important",
    fontWeight: "400!important",
  },
  ratingbtn: {
    backgroundColor: "#DFF3FF!important",
    color: `${styles.app_color}!important`,
    borderRadius: '0.5rem!important',
    fontFamily: 'Poppins',
    width: '50px',
    height: '30px',
    fontSize: '14px!important'
  },
  aminitiesbtn: {
    flex: 1,
    minWidth: 0,
    maxWidth: '8.6rem',
    height: '2.3rem',
    backgroundColor: '#DFF3FF',
    border: 'none',
    borderRadius: '0.5rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: `${font_family}`,
    fontSize: '14px',
    color: `${fontcolor}`
  },
  morebtn: {
    fontSize: `${font_size3}`,
    color: `${fontcolor}`,
    border: 'none',
    background: 'none',
    // marginTop:'0.5rem!important',
    fontWeight: '700!important',
    height: '2.3rem',
  }
})
export const hotels_list = makeStyles({
  placeholder_style: {
    color: `${styles.app_color}!important`
  },
  mapsbtn: { color: '#fff!important', backgroundColor: `${styles.app_color}!important`, borderRadius: '0.5rem!important', width: '117.34px!important', height: '39.23px' },
  hotelname:{
    fontFamily:'poppins',color:styles.app_color,fontWeight:'500'
  },
  offer:{
    color:'#fff',
    background:'linear-gradient(90deg, #FF4949 -23.22%, #C20000 132.61%)',
    width:'67.44px',
    height:'24.17px',
    paddingLeft:'0.5rem',
    borderTopLeftRadius:'0.5rem',
    borderBottomLeftRadius:'0.5rem'
  }
})
export const selected_hotels=makeStyles({
  selected_hotel_bg:{
    backgroundImage: `url(${selected_hotel})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  },
  hotel_offer:{
    marginTop:'1rem',
    marginLeft:'auto',
    color:'#fff',
    background:'linear-gradient(90deg, #FF4949 -23.22%, #C20000 132.61%)',
    width:'67.44px',
    height:'24.17px',
    paddingLeft:'0.5rem',
    borderTopLeftRadius:'0.5rem',
    borderBottomLeftRadius:'0.5rem'
  },
  roomdesc:{
    color:`${fontcolor}`,
    fontSize:`${font_size3}`,
    fontWeight:'600'
  },
  roomprice:{
    color:'#303030',
    fontSize:`${font_size3}`,
    fontWeight:'500'
  },
  sel_hotel:{
backgroundColor:`${btn_color1}!important`,
textTransform:'none!important',
color:`${btn_color2}!important`,
borderRadius:'0px!important',
borderBottomLeftRadius:"0.5rem!important"
  },
  book_hotel:{
    backgroundColor:`${btn_color2}!important`,
    textTransform:'none!important',
    color:`${textcolor}!important`,
    borderRadius:'0px!important',
    borderBottomRightRadius:"0.5rem!important"
  },
  hotel_name:{
    fontSize:`1.8rem`,
    fontWeight:'600',
    color:`${fontcolor}`
  },
  room_facilitiesbtn:{
     width:'7.5rem',
    // height:'2.3rem',
    border:'none',
    textDecoration:'none',
    fontSize:'14px',
    fontWeight:'500',
    fontFamily:`${font_family}`,
    background:'none',
    color:`${fontcolor}`
  },
  title_styles:{
    color:styles.app_color,
    fontSize:'18px',
    fontWeight:'500'
  },
  property_rules_text:{
    fontSize:`${font_size3}!important`
  },
  room_title:{
    fontSize:`${font_size3}`,
    color:`${fontcolor}`,
    fontWeight:'500'
  },
  sel_roombtn:{
    width:'9rem',height:'2.3rem',border:'none',background:"none",backgroundColor:styles.app_color,color:'#fff',fontSize:"14px",fontWeight:'600',borderRadius:'0.5rem'
  },
  location_data:{
    fontFamily:'poppins',
    fontSize:'14px'
  },
  distance_Style:{
    fontFamily:'poppins',
    color:styles.app_color,
    fontWeight:700,
    fontSize:"14px"
  },
  cardbooknow_btn:{
    width:'9rem',height:'2.3rem',border:'none',background:'none',backgroundColor:styles.app_color,color:'#fff',fontWeight:700,borderBottomRightRadius:'0.5rem'
  },
  booknow_btn:{
    color:`${fontcolor}`,
    fontSize:`${font_size3}`,
    fontWeight:600,
    backgroundColor:"#fff",
    border:'none',
    width:'13rem',
    height:'3rem',
    borderRadius:'0.5rem',

  }

})