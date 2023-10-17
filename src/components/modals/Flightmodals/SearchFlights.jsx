import { Dialog, TextField, InputAdornment, Grid, Container, DialogContent, DialogTitle, ListItem, ListItemText, Stack } from "@mui/material";
import React,{useEffect, useState} from "react";
import search from "../../../assets/images/search.svg";
import axios from "axios";
import { envdata } from "../../Envexports";
import {styles} from '../../../assets/styles/Styles_export'
const SearchFlights = React.memo((props) => {
  // const Apibaseurl=process.env.REACT_APP_BASEURL
 const { open, close,sources } = props;
 const closesearch = () => {
   close();
   setPage(1)

 };
 const [find,setFind]=useState(" ")
 const [page, setPage] = useState(1);
 const [data, setData] = useState([]);
 const [recent_search,setRecent_search]=useState(false)
//  fetching the airport list data
 const fetchData = async () => {
  // alert("fetch")
  setRecent_search(false)
  const response = await axios.post(`${envdata.baseurl}/getAirportList`,{"pageNumber":page,"pageSize":10});
  setData((prevData) => [...prevData, ...response.data.data.doc]);
  setPage((prevPage) => prevPage + 1);

};
const searchhandler=async(event)=>{
  // alert("search")
  setRecent_search(false)
  setFind(event.target.value.trim())
  setPage(1)
  const res = await axios.post(`${envdata.baseurl}/getAirportList`,{"name":find,"pageNumber":1,"pageSize":8});
  setData(res.data.data.doc)
}
const recentsearch=async()=>{
  const res=await axios.post(`${envdata.baseurl}/get_recent_search`,{ "user_id":localStorage.getItem("userid"),type:sources});
  // console.log(res.data,"recentsearch")
  if(res.data.message==="no recent data found for this user"){
    fetchData()
  }
  else{
    setRecent_search(true)
    setData(res.data.data)
  }
}
 useEffect(()=>{
  if(props.open){
    const userid=localStorage.getItem("userid")
    if(userid!==null){
      recentsearch();
      return;
    }
    fetchData()
    return;

  }
 },[props.open])
const handleScroll = async(event) => {
  const element = event.target;
  if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    fetchData();
    
  }
};
const handleairportselection=(item)=>{
// alert(item)
  props.airport(item,sources)
  setData([])
  setPage(1)
  setFind("")
  close()
}
let airportsdata=data!==""&&      
data.map((item,index)=>{
  // console.log(item,"airport")
  return(
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} onClick={()=>handleairportselection(item)}>
    <Stack  key={index} mt={1}>
      <div style={{fontSize:'14px',fontWeight:500}}>{item.airport_name}</div>
      <div style={{fontSize:'12px'}}>{item.city_name}</div>
    </Stack>
    <span>{item.city_code}</span>
    </div>
  )
})
 return (
   <Dialog
     open={open}
     onClose={closesearch}
      //  sx={{
      //   "& .MuiDialog-paper": {
      //     // width: "100%",
      //     height:'100%',
      //     mixHeight: '60vh',
      //     // maxWidth: "250px",
      //     // borderRadius: "15px",
      //   },
      // }}
     PaperProps={{
       sx: {
         position: "fixed",
         top: "30%",
         left: "10%",
         minHeight: 300,
         maxHeight: 500,
         width: 270,
        //  maxHeight:500,
         "@media (max-width:899px)":{
          position:'inherit'
         }
       },
     }}
    
   >
    <DialogTitle sx={{padding:'0'}}>
      <Grid item sx={{padding:'0.5rem'}}>
       <TextField
         placeholder={sources==1?"From":sources==2&&"To"}
         size="small"
         value={find}
         onChange={searchhandler}
         InputProps={{
           startAdornment: (
             <InputAdornment position="start">
               <img src={search} alt="search" />
             </InputAdornment>
           ),
         }}
       />
      </Grid>
      {recent_search&&<Grid item sx={{backgroundColor:'#DFF3FF',height:'36px'}}>
          <span style={{color:styles.app_color,fontSize:'12px',marginLeft:'1rem',}}>Recent Search</span>
      </Grid> }
    </DialogTitle>
    
    <DialogContent
      sx={{
        overflowY: "scroll",
        height: 300,
        // "&::-webkit-scrollbar": {
        //   width: "8px",
        // },
        // "&::-webkit-scrollbar-track": {
        //   background: "#F1F1F1",
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   background: "#888",
        //   borderRadius: "10px",
        // },
        // "&::-webkit-scrollbar-thumb:hover": {
        //   background: "#555",
        // },
      }}
      onScroll={handleScroll}
      >
        <Grid container direction={"column"}  rowSpacing={0.5} columnSpacing={0} mt={0.5}   >
          {airportsdata}
        </Grid>
      </DialogContent>
    </Dialog>
 );
});


export default SearchFlights;



