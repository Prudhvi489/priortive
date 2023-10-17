import { makeStyles } from "@mui/styles";
import { Switch, styled } from "@mui/material";
const primaryColor = "#003556";
export const adminTables = makeStyles({
  table: {
    // background:'red'
  },
  activeBtn: {
    fontFamily: '"Poppins", sans-serif !important',
    background: 'rgba(62, 205, 130, 1) !important',
    color: 'white !important',
    fontSize: '12px !important',
    borderRadius: '0.5rem !important',
    textTransform: 'none !important',
    minWidth: '5rem !important',
  },
  InactiveBtn: {
    fontFamily: '"Poppins", sans-serif !important',
    background: 'rgba(173, 37, 10, 1) !important',
    color: 'white !important',
    fontSize: '12px !important',
    borderRadius: '0.5rem !important',
    textTransform: 'none !important',
    minWidth: '5rem !important',
  },
});

// dialog inputs
export const dialogInputs = makeStyles({
  textInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#003556!important",
        borderWidth: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#003556!important",
        borderWidth: "1px",
      },
      "& .MuiInputLabel": {
        color: '#003556!important',
      },
    },

  }
})

export const adminAddCoupoun = makeStyles({
  groupRadio: {},
  divstyle: {
    color: "#003556",
    fontWeight: "500",
    // marginTop: "120px",
    padding: "10px",
  },
  cardstyle: {
    marginTop: "15px !important",
    marginBottom: "15px",
    borderRadius: "8px !important",
    boxShadow: "0 0 8px rgb(0 0 0 / 50%)",
    background:'none!important',
  },
  totalcard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "30vh",
    height: "100%",
    // width: "17vw",
    width: '100%',
    textAlign: "center",
    boxShadow: '0px 0px 10px 0px #00355640 !important'
  },
  totalcardimg: {
    marginLeft: "auto !important",
    width: "40%",
    lineHeight: "2.5rem"
  },
  totalcardimage: {
    display: "block",
    margin: "auto",
    // width: "50%"
    width: '80px',
  },
  totaltextfont: {
    marginTop: "1rem !important",
    fontSize: "18px !important",
    fontWeight: "bold !important",
    // marginBottom: "2rem !important",
  },
  totalmaincard: {
    padding: "3% !important",
    // height: "60vh",
    minHeight: '500px',
    height: "fit-content",
    borderRadius: "50px !important",
    boxShadow: "0px 0px 10px 0px #00000040 !important",
  },

  pagenotfound: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    color: "#003556",
    fontWeight: "500",
    fontFamily: "'Poppins', sans-serif",
    
  },
  inputFile: {
    borderStyle: "dashed",
    border: `1px solid ${primaryColor}`,
    padding: "30px 15px",
    borderRadius: "15px",
  },
  cancelOutlinedBtn: {
    borderColor: `${primaryColor} !important`,
    color: `${primaryColor} !important`,
  },
  specificUsersDiv: {
    minHeight: "300px",
    padding: "20px",
  },
  uploadedImgDetails: {
    border: "1px solid #000",
    padding: "3px",
    margin: "10px 0",
    borderStyle: "dotted",
    borderRadius: "10px",
  },
  usersToSelectDiv: {
    // height: "700px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.1em",
      backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#000000",
    },
  },
  paperstyeladmin:{
      height: "330px",
      backgroundColor: "white",
      marginTop: "2rem",
      paddingBottom: "1rem",
      borderRadius: "20px !important",
  //      '@media (min-width:1600px) and (max-width:1920px)':{
  //      height: "32vh",
  //   }, 
  //   '@media (min-width:1051px) and (max-width:1601px)':{
  //     height: "34vh",
  //  },
  //   '@media (min-width:900px) and (max-width:1050px)':{
  //     height: "24vh",
  //  }, 
  //  '@media (min-width:600px) and (max-width:901px)':{
  //   height: "39.3vh",
  // }, 
  
  "@media (min-width:799px) and (max-width:900px)" : {
    height: "360px",
  },
  "@media (min-width:1799px) and (max-width:2000px)" : {
    height: "360px",
  },

  },
  paperstyeladmin1:{
    height: "330px",
    backgroundColor: "white",
    marginTop: "2rem",
    paddingBottom: "1rem",
    borderRadius: "20px !important",
//     '@media (min-width:1600px) and (max-width:1920px)':{
//        height: "32vh",
//     },
//     '@media (min-width:1051px) and (max-width:1601px)':{
//       height: "34vh",
//    },  
//    '@media (min-width:900px) and (max-width:1050px)':{
//     height: "24vh",
//  }, '@media (min-width:600px) and (max-width:901px)':{
//   height: "37vh",
// }, 
"@media (min-width:799px) and (max-width:900px)" : {
  height: "380px",
},
"@media (min-width:1799px) and (max-width:2000px)" : {
  height: "360px",
},

},
totaladmin: {
    height: "140px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "2rem",
    marginTop: "2rem",
    borderRadius: "20px !important",
//     '@media (min-width:1600px) and (max-width:1920px)':{
//       height: "15vh",
//       marginTop: "1rem",
//    },
//    '@media (min-width:1201px) and (max-width:1599px)':{
//     height: "14vh",
//  },
//  '@media (min-width:1051px) and (max-width:1200px)':{
//   height: "11vh",
// },
//    '@media (min-width:900px) and (max-width:1050px)':{
//     height: "9.5vh",
//  },
"@media (min-width:799px) and (max-width:900px)" : {
  height: "155px",
},
"@media (min-width:1799px) and (max-width:2000px)" : {
  height: "155px",
},
},
paddingbottom: {
  height: "100%",
  background: "white",
  borderRadius: "20px",
  '@media (min-width:600px) and (max-width:900px)':{
    // marginTop:""
    paddingBottom: "25px",
 },

},
tablecontent: {
  // marginTop: "3rem", 
  borderRadius: "20px !important",
  width: "90% !important",
  marginLeft: "1rem",
  position: "absolute !important", 
  bottom: "25px !important",
  '@media (min-width:600px) and (max-width:900px)':{
    position: "inherit !important",
    marginTop: "3rem",  
 },
},
  headingstyle: {
    color: "#003556",
    fontWeight: "500",
    marginBottom: "1.5rem",
    // marginLeft: "1.5rem",
  },
  plantours: {
    color: "#003556",
    fontWeight: "500",
    // marginLeft: "2rem",
    marginBottom: "2rem",
    marginTop: "1rem",
  },
  dayplanStyles: {
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600 !important",
    fontSize: "16px !important",
  },
  descriptionStyles: {
    color: "rgba(48, 48, 48, 1) !important",
    fontWeight: "700 !important",
    fontSize: "16px !important",
    marginLeft: "1.5rem !important",
  },
  paraStyles: {
    color: "rgba(48, 48, 48, 1)",
    fontWeight: "400",
    fontSize: "14px",
    fontFamily: "Poppins !important",
  },
  dayStyles: {
    fontWeight: "700",
    color: "rgba(0, 53, 86, 1)",
    fontSize: "15px",
    borderBottom: "1px solid rgb(224,224,224,1) !important",
    borderRight: "1px solid rgb(224,224,224,1) !important",
    padding: "3rem",
  },
  paroStyles: {
    color: "rgba(48, 48, 48, 1)  !important",
    fontWeight: "500 !important",
    fontFamily: "Poppins !important",
  },
  termsconditionsStyles: {
    color: "rgba(48, 48, 48, 1)",
    fontWeight: "400",
    fontSize: "14px",
    listStyleType: "disc",
    padding: "1rem",
    paddingTop: "0px",
  },
  summaryStyles: {
    objectFit: "cover",
    width: "100%",
    height: "150px",
  },
  summaryStyles1: {
    objectFit: "cover",
    width: "100%",
    height: "307px",
  },
  tabStyles: {
    color: "rgb(0,53,86,1) !important",
    textDecoration: "underline !important",
    fontSize: "14px !important",
    fontWeight: "700 !important",
    background: "none !important",
  },
  closeicon: {
    borderRadius: "50%",
    color: "#003556",
    background: "white",
  },
  colorconfirmed: {
    color: "#003556",
    fontSize: "12px",
  },
  boldstyle: {
    color: "#303030",
    fontSize: "16px !important",
    fontWeight: "bold !important",
  },
  refundstyle: {
    background: "#003556 !important",
    color: "#fff !important",
    fontSize: "12px !important",
    textTransform: "none !important",
    "&:hover": { background: "#003556 !important", color: "#fff !important" },
  },
  refundstyle1: {
    background: "#BC0000 !important",
    color: "#fff !important",
    fontSize: "12px !important",
    textTransform: "none !important",
    marginLeft: "10px !important",
    "&:hover": { background: "#BC0000 !important", color: "#fff !important" },
  },
  refundstyle12: {
    background: "#003556 !important",
    color: "#fff !important",
    textAlign: "center",
    borderRadius: "50px",
    padding: "0px !important",
    // fontSize: "12px !important",
    // textTransform: "none !important",
    // "&:hover": { background: "#003556 !important", color: "#fff !important" },
  },
  dividermargin: {
    marginLeft: "-24px !important",
    marginRight: "-24px !important",
  },
  black: {
    color: "#303030",
    fontWeight: "500",
    paddingBottom: "0.3rem",
    fontSize: "12px !important",
  },
  black1: {
    color: "#303030",
    paddingBottom: "0.3rem",
    fontSize: "12px !important",
  },
  refundbus: {
    color: "#003556",
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  bordercolor: {
    borderLeft: "1px solid #003556",
    marginTop: "-24px !important",
    marginBottom: "-16px !important",
  },
  refundcolor: {
    color: "#003556",
  },
  totalcolor: {
    color: "#303030",
    fontSize: "14px !important",
    fontWeight: "700 !important",
  },
  dialogradius: {
    "& .MuiDialog-paper": {
      borderRadius: "20px",
    },
  },
  toursDayDes: {
    border: '1px solid red'
  },
  goToursListPackCard: {
    cursor: 'pointer',
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
  },
  go_tour_coverimage: {
    maxHeight: '360px',
    // objectFit:'cover'
  },
  dashboard_card: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    height: "100px",
    paddingTop: "2.6rem",
    paddingLeft: "2.5rem",
    color: "#fff",
    '@media (min-width:900px) and (max-width:1150px)': {
      paddingTop: "1.6rem !important",
      paddingLeft: "1.5rem !important",
      paddingBottom: "1.6rem !important",
      paddingRight: "1.5rem !important",
    },
  },
  dashboard_fontsize:{
    fontSize: "1rem",
    '@media (min-width:900px) and (max-width:1150px)': {
    fontSize: "12px !important",
    },
  },
});

export const adminTabs = makeStyles({
  tablist: {
    marginLeft: "1rem!important",
    paddingTop: "1rem",
    "& .MuiTab-root.Mui-selected": {
      color: "White",
      backgroundColor: "#003556",
      borderRadius: "0.5rem",
      padding: "7px",
      minHeight: "fit-content !important",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root": {
      padding: "0px",
      minWidth: "fit-content",
      minHeight: "fit-content !important",
    },
    "& .MuiTabs-flexContainer": {
      gap: "1rem",
    },
    "@media (max-width:899px)": {
      marginLeft: "0.3rem!important",
      marginRight: "0.3rem!important",
      "& .MuiTabs-flexContainer": {
        justifyContent: "space-between",
        padding: "0rem 1.2rem",
      },
    },
  },
  tabs: {
    textTransform: "none!important",
    height: "2rem!important",
    minHeight: "1rem!important",
    fontWeight: "600!important",
  },
  tabs1: {
    textTransform: "none!important",
    minHeight: "1rem!important",
    fontWeight: "600!important",
  },
});
export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#09AE4B" : "#EE4423",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "#09AE4B",
    boxSizing: "border-box",
  },
}));

export const AntSwitchReverse = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#EE4423" : "#09AE4B",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "#EE4423",
    boxSizing: "border-box",
  },
}));

export const adminPackagesStyle = makeStyles({
  headingstyle: {
    color: primaryColor,
    fontSize: "26px !important",
    fontWeight: "500 !important",
  },
  description: {
    color: "#303030",
    fontSize: "16px",
  },
  smallText: {
    fontSize: "12px",
  },
  toursDuration: {
    padding: "4px 10px",
    backgroundImage: "linear-gradient(90deg, #FF4949 -23.22%, #C20000 132.61%)",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
    color: "#FFF",
  },
  cardImageTours: {
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    objectFit: "cover",
  },
  packageImgCon: {
    position: "relative",
    textAlign: "center",
    color: "white",
  },
  topLeftToursDur: {
    position: "absolute",
    top: "8px",
    left: "1px",
    padding: "4px 10px",
    backgroundImage:
      "radial-gradient(97.57% 210.75% at 0.9% 2.98%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
    color: "#FFF",
    fontSize: "16px",
    fontWeight: "500",
  },
  packageCardTours: {
    boxShadow:
      "1px 8px 11px 3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12) !important",
  },
  // ---------------------------------ADD TOURS FORM
  inputLabelStyle: {
    color: primaryColor,
    fontWeight: "500 !important",
  },
  toursDivider: {
    width: "100%",
    background: "#DEF2FF",
    display: "block",
    padding: "3px",
    margin: "auto",
    marginTop: "15px",
  },
  deletedstyle: {
    position: "absolute",
    bottom: "20px",
    right: "5px",
    background: "none",
    border: "none",
    color: "red",
    cursor: "pointer",
  },
  previewImageStyle: {
    borderStyle: "dashed",
    border: "1px solid #003556",
    borderRadius: "8px",
  },
});
