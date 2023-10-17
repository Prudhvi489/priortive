import { makeStyles } from "@mui/styles";
import {styles} from '../../assets/styles/Styles_export'
const font_color = styles.app_color;
const font_size1 = "16px";
const font_size2 = "14px";
// addhotel stylese
export const addhotel_style = makeStyles({
  star_hotel: {
    width: "10rem",
    height: "35px",
    borderRadius: "0.5rem",
    paddingLeft:'0.5rem',
    background:'white !important',
    fontWeight:'inherit !important',
    color:'black !important',
    position:'inherit !important'
  },
  aminities:{
    width:'10rem',
    height:"35px",
    borderRadius:'0.5rem',
    paddingLeft:'0.5rem'
  }
});
// booking styles
export const bookings_styles=makeStyles({
  bookingslist: {
    background:'#DEF2FF!important',
    width:'fit-content !important',
    borderRadius:'0.5rem',
    height:"fit-content",
    position:'inherit',
    filter:"none",
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#ffff",
      background: font_color,
      //  borderRadius:'1rem'
    },
    '& .MuiTabs-flexContainer':{
      overflowX:'scroll',
      "&::-webkit-scrollbar":{
        display: "none",
      }
    },
  }
})