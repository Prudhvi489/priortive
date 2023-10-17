import React, { useEffect, useState } from 'react'
import { adminAddCoupoun } from "./AdminStyles";
import { Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, TextField,InputAdornment } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from 'react-router-dom';
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';
import dropdown from '../../../assets/AdminAssets/dropdown.svg'
const AdminGMTHotelView = () => {

  // getting members data
  const location = useLocation()
  const [hotelMember,setHotelMember] = useState()
  const [drop_down,setDrop_down]=useState(false)
  const[pageNumber,setPageNumber]=useState(1)
  const [asigne,setAsigne]=useState({
    "name":'',
    "id":''
  })
  const [pageSize,setPageSize]=useState(10);
  const [totalasignees,setTotalasignees]=useState(0)
  const [asigneesdata,setAsigneesdata]=useState([])
  const [selectedhotel,setSelectedhotel]=useState({})
  useEffect(()=>{
    getasignees()
    if(location.state.id){
      getHotelMembers(location.state.id)
    }else{
      console.log('id not getting');
    }
  },[])
  const selectasigne=(id,name)=>{
    setAsigne((prev)=>({...prev,id:id,name:name}))
    setDrop_down(false)
}
// get assignees api call
const getasignees=async(pagenumber)=>{
  try{
  const res=await Subadminapicalls(`team/${pagenumber===undefined?pageNumber:pagenumber}/${pageSize}`,{},"GET","application/json")
  console.log(res)
  if(res.status){
      setTotalasignees(res.data.total)
      if(pagenumber===undefined){
          setAsigneesdata(res.data.members)
      }
      else{
          setAsigneesdata((prev)=>([...prev,...res.data.members]))
      }
  }
  else{
      alert(res.message)
  }
}
catch(error){
  alert(error)
}
}
  // handle scroll
  const handleScroll = async(event) => {
    const element = event.target;
    const scrollTolerance = 5; // Tolerance value for scroll calculation
    const scrollDifference =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    if ( scrollDifference <= scrollTolerance && asigneesdata.length<totalasignees) {
        setPageNumber((prev)=>prev+1)
     getasignees(pageNumber+1)   
    console.log(asigneesdata,"assidngne")
    }
  };
  async function getHotelMembers(id){
    const endpoint = `teamSearch/${1}/${10}/${1}/${id}`
    try{
      const res = await Subadminapicalls(endpoint,'',"GET","application/json");
      setHotelMember(res.data)
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  const adminAddCoupounStyles = adminAddCoupoun();
  // styles
  const styles = {
    title : {
      fontWeight:'500',
      color:'rgba(0, 53, 86, 1)'
    },
    btn: {
      background:'rgba(0, 53, 86, 1)',
      color:'white',
      textTransform:'none',
      borderRadius:'0.6rem',
      "&:hover":{
        background:'rgba(0, 53, 86, 1)',
        color:'white',
      }
    },
    btnRed: {
      background:'rgba(188, 0, 0, 1)',
      color:'white',
      textTransform:'none',
      borderRadius:'0.6rem',
      "&:hover":{
        background:'rgba(188, 0, 0, 1)',
        color:'white',
      }
    }
  }

  // selected name
  const [selectedName,setSelectedName] = useState('')
  // alert states
  const [alertOpen,setAlertOpen] = useState(false)
  function alertClose(){
    setAlertOpen(false)
  }
  // Change Assignee
  const [changeAss,setChangeAss] = useState(false)
  function changeAssOpen(){
    setAsigne({"id":selectedhotel?.assigned_person,"name":selectedhotel?.assigned_person})
    setChangeAss(true)
    setAlertOpen(false)
  }
  function changeAssClose(){
    setChangeAss(false)
  }
  // update asigne
  const updateasignee=async()=>{
    try{
      const updateobj={
        "id":selectedhotel?.id,
        "assigned_person":asigne.id
      }
      const res= await Subadminapicalls('gmtHotels',updateobj,"PUT","application/json")
      if(res.status){
        alert(res.message);
        getHotelMembers(location.state.id)
        changeAssClose()
      }
      else{
        alert(res.message)
      }
    }
    catch(error){
      alert(error)
    }
  }
  return (
    <>
      <h4 className={adminAddCoupounStyles.headingstyle}>GMT Team</h4>
      <Grid container mt={3}>
        <TextField size='small' label="Search" />
      </Grid>
      <Grid container mt={2}>
        {
          hotelMember?.totalCount > 0 ? hotelMember?.members.map((data,index)=>{
            console.log(data,"data")
            return(
              <Grid item container rowGap={1.2} key={data.id} p={2} sx={{background: (index+1) % 2 !== 0 ? "rgba(222, 242, 255, 1)" : ""}}>
                <Grid item container>
                  <Grid item xs={3} sx={styles.title} >Hotel Name</Grid>
                  <Grid item xs>{data.hotel_name}</Grid>
                </Grid>
                {/* <Grid item container>
                  <Grid item xs={3} sx={styles.title} >Address</Grid>
                  <Grid item xs>{data.address}</Grid>
                </Grid> */}
                <Grid item container>
                  <Grid item xs={3} sx={styles.title} >Login</Grid>
                  <Grid item xs>{data.mail}</Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={3} sx={styles.title} >Password</Grid>
                  <Grid item xs>{data.password}</Grid>
                </Grid>
                <Grid item container justifyContent={'flex-end'}>
                  <Button sx={styles.btn} onClick={()=>{setAlertOpen(true)
                  setSelectedhotel(data)
                  }}>Change Assignee</Button>
                </Grid>
              </Grid>
            )
          }):<Grid textAlign={'center'}>Members not found</Grid>
        }
        
      </Grid>
      {/* alert popup */}
      {alertOpen&&<Dialog open={alertOpen} onClose={alertClose} sx={{"& .MuiDialog-paper":{maxWidth: "330px",borderRadius:'1rem'}}}>
        <Grid container p={'1.5rem 2.5rem'} rowGap={2.5}>
          <Grid item>Do you really want to change the Assignee</Grid>
          <Grid item container justifyContent={'space-evenly'}>
            <Grid item>
              <Button sx={styles.btn} onClick={changeAssOpen}>Yes</Button>
            </Grid>
            <Grid item>
              <Button sx={styles.btnRed} onClick={alertClose}>No</Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>}
      {/* Change Assignee */}
      {changeAss&&
      <Dialog open={changeAss} onClose={changeAssClose} sx={{"& .MuiDialog-paper":{maxWidth: "630px",borderRadius:'1rem'}}}>
        <DialogTitle textAlign={'center'} position={'relative'}>
          Change Assignee
          <CloseIcon
            sx={{
              borderRadius: "50%",
              color: "white",
              background: "#003556",
              position:'absolute',
              right:'8px',
              top:'15px',
            }}
            onClick={changeAssClose}
          />
        </DialogTitle>
        <DialogContent>
          <Grid p={'1rem 0rem'}>
             <TextField value={asigne.name} onClick={()=>setDrop_down((prev)=>!prev)}    fullWidth size="small" InputProps={{
          endAdornment: (
            <InputAdornment position="end">
                <img src={dropdown} alt="dropdown"/>
            </InputAdornment>
          ),
        }}/>  
                        {drop_down&&<div style={{height:'100px',overflowY:"scroll",marginTop:'0.5rem'}} onScroll={handleScroll}>
                        {
                                asigneesdata.length>0&&asigneesdata.map((item,index)=>{
                                    return(
                                        <MenuItem value={item.id} key={item.id} onClick={()=>selectasigne(item.id,item.name)}>{item.name}</MenuItem>
                                    )
                                })
                            }
                        </div>}
                      
          </Grid>
          <Grid textAlign={'center'} mt={2}>
            <Button sx={styles.btn} onClick={()=>updateasignee()}>confirm</Button>
          </Grid>
        </DialogContent>
      </Dialog>}
    </>
  )
}

export default AdminGMTHotelView