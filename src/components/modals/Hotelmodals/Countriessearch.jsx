import { Dialog, TextField, InputAdornment, Grid, Container, DialogContent, DialogTitle, ListItem, ListItemText, Stack } from "@mui/material";
import React,{useEffect, useState} from "react";
import search from "../../../assets/images/search.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hoteldataActions } from "../../../store/Hotelslices.jsx/HotelDataslice";
const Countriessearch = React.memo((props) => {
  const Apibaseurl=process.env.REACT_APP_BASEURL
 const { open, close,sources } = props;
 const closesearch = () => {
  setFind("")
   close();
   setPage(1)

 };
 const [find,setFind]=useState("")
 const [page, setPage] = useState(1);
 const [data, setData] = useState([]);
//  const [recent_search,setRecent_search]=useState(false)
//  fetching the airport list data
 const fetchData = async () => {
//   alert("fetch")
//   setRecent_search(false)
  const response = await axios.post(`${Apibaseurl}/getHotelCountriesList`,{"pageNumber":page,"pageSize":10});
  setData((prevData) => [...prevData, ...response.data.data.doc]);
  setPage((prevPage) => prevPage + 1);

};
const searchhandler=async(event)=>{
  // alert("search")
//   setRecent_search(false)
  setFind(event.target.value.trim())
  setPage(1)
  const res = await axios.post(`${Apibaseurl}/getHotelCountriesList`,{"name":event.target.value.trim(),"pageNumber":1,"pageSize":8});
  console.log(res.data)
  setData(res.data.data.doc)
}
// const recentsearch=async()=>{
//   const res=await axios.post(`${Apibaseurl}/get_recent_search`,{ "user_id":localStorage.getItem("userid")});
//   console.log(res.data,"recentsearch")
//   if(res.data.message==="no recent data found for this user"){
//     fetchData()
//   }
//   else{
//     setRecent_search(true)
//     setData(res.data.data)
//   }
// }
 useEffect(()=>{
  if(props.open){
    const userid=localStorage.getItem("userid")
    // if(userid!==null){
    // //   recentsearch();
    //   return;
    // }
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
const handlecountryselection=(item)=>{
// alert(item)
  props.country(item)
  setData([])
  setPage(1)
  setFind("")
  closesearch()
}
let airportsdata=data!==""&&      
data.map((item,index)=>{
  // console.log(item,"airport")
  return(
    // <ListItem onClick={handleairportselection(item)} key={index}>
    //   <ListItemText>{item.airport_name}</ListItemText><br/>
    //   <ListItemText>{item.city_name}</ListItemText>
    // </ListItem>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} onClick={()=>handlecountryselection(item)}>
    <Stack  key={index} mt={1}>
      <div style={{fontSize:'14px',fontWeight:500}}>{item.country_name}</div>
      {/* <div style={{fontSize:'12px'}}>{item.city_name}</div> */}
    </Stack>
    <span>{item.country_code}</span>
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
         top: "20%",
         left: "5%",
         Height: 200,
         maxHeight: 500,
         width: 270,
         maxHeight:500
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
       {/* {recent_search&&<Grid item sx={{backgroundColor:'#DFF3FF',height:'36px'}}>
            <span style={{color:'#003556',fontSize:'12px',marginLeft:'1rem',}}>Recent Search</span>
       </Grid> } */}
    </DialogTitle>
    
     <DialogContent
    sx={{
      overflowY: "scroll",
      height: 300,
     
    }}
    onScroll={handleScroll}
  >
     <Grid container direction={"column"}  rowSpacing={0.5} columnSpacing={0} mt={0.5}   >
      
      
      
      
       {/* Recent search */}
        {/* <Grid item></Grid>
       <Grid item sx={{backgroundColor:'#DFF3FF',padding:'0.5rem'}}>Popular cities</Grid> */}
       {/* {data.map((item,index)=>{
        return(<div>{item.city_name}</div>)
       })} */}
     {airportsdata}

     </Grid>
     </DialogContent>
   </Dialog>
 );
});


export default Countriessearch;



