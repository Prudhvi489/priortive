import { Button,InputAdornment, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, MenuItem, Popover, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material'
import React,{useEffect, useRef, useState} from 'react'
import { regex_data } from '../../Regex';
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';
import dropdown from '../../../assets/AdminAssets/dropdown.svg'
import { AmenitiesDropDown } from '../../pages/Subadmin/Addhotel';
import CancelIcon from '@mui/icons-material/Cancel';
import MySnackbar from '../Signupmodals/Snackbar';
const Addhotelmodal = (props) => {
    const {open,close,Editdata,type,hotels_refresh}=props;
    const [management,setManagement]=useState(0)
    const [asigne,setAsigne]=useState({name:"",id:''})
    const [asignedetails,setAsignedetails]=useState({
        hotelname:'',
        contact:'',
        email:'',
        address:''
    })
    const [pageNumber,setPageNumber]=useState(1);
    const [pageSize,setPageSize]=useState(5)
    const [asigneesdata,setAsigneesdata]=useState([])
    const [drop_down,setDrop_down]=useState(false)
    const[totalasignees,setTotalasignees]=useState(0)
    const scrollableRef = useRef();
    
    const handleclose=()=>{
        setManagement(0)
        setAsignedetails({
            hotelname:'',
            contact:'',
            email:'',
            address:''
        })
        setAsigne({
            name:"",id:''  
        })
        close()
    }
    const add_hotel=async()=>{
        if(asignedetails.name===""){
            alert("Enter your name")
            return
        }
        else if(!regex_data.string_pattern.test(asignedetails.name)){
            alert("name should be a string")
            return
        }
        if(asignedetails.contact===""){
            alert("Enter your contact details")
            return
        }
        else if(!regex_data.mobile_regex.test(asignedetails.contact)){
            alert("Enter valid mobile numeber")
            return
        }
        if(asignedetails.email===""){
            alert("Enter you email")
            return
        }
        else if(!regex_data.email_Regex.test(asignedetails.email)){
            alert("Enter valid email details")
            return;
        }
       
    }
    const Createsubadmin=async()=>{    
        let validation = ['hotelname','contact','email'];
        for (const key of validation){
            if(!asignedetails[key]){
                setSnack((prev)=>({...prev,open:true,message:`Please enter ${key}`}));
                return;
            }
        }
        if(management===1 && asigne.id===''){
            setSnack((prev)=>({...prev,open:true,message:`Select asigne`}));
            return;
        }
        try{
            let method;
            const subadminobj={
                "hotel_name":asignedetails.hotelname,
                "mail":asignedetails.email,
                "management_type":management,
                "block_status":Object.keys(Editdata).length>0?Editdata.block_status:0,
                "hotel_contact":asignedetails.contact,
                ...(management === 1 && { "assigned_person": asigne.id }),
                ...(Object.keys(Editdata).length>0&&{"id":Editdata?.id})
            }
            if(Object.keys(Editdata).length>0){
                method="PUT"
            }
            else{
                method="POST"
            }
            const res= await Subadminapicalls('gmtHotels',subadminobj,method,"application/json")
            if(res.status){
                alert(res.message)
                hotels_refresh()
                handleclose()
            }
            else{
                alert(res.message)
            }
            console.log(res)
        }
        catch(error){
            alert(error)
        }
    }
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
        // alert("scorll")
        const element = event.target;
        const scrollTolerance = 5; // Tolerance value for scroll calculation

        const scrollDifference =
          element.scrollHeight - element.scrollTop - element.clientHeight;
        if ( scrollDifference <= scrollTolerance && asigneesdata.length<totalasignees) {
            setPageNumber((prev)=>prev+1)
         getasignees(pageNumber+1)   
        }
      };
    useEffect(()=>{
        if(open){
            getasignees()
            if(Object.keys(Editdata).length>0){
                setManagement(type)
                setAsignedetails((prev)=>({...prev,
                hotelname:Editdata.hotel_name,
                contact:Editdata.hotel_contact,
                email:Editdata.mail
                }))
                if(type===1)
                {
                    setAsigne((prev)=>({...prev,name:Editdata.assigned_person,id:Editdata.assigned_person}))
                }
            }
        }
    },[open])
    const selectasigne=(id,name)=>{
        setAsigne((prev)=>({...prev,id:id,name:name}))
        setDrop_down(false)
    }
    // snack bar state
    const [snack,setSnack] = useState({
        open:false,
        message:''
    })
  return (
    <>
        <MySnackbar open={snack.open} message={snack.message} close={()=>setSnack((prev)=>({...prev,open:false}))} />
        <Dialog open={open} onClose={handleclose} sx={{
            "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "500px",
            borderRadius: "15px",
            padding: "1rem",
            },
        }}>
            <DialogTitle position={'relative'}>
                <Grid item textAlign={'center'} sx={{color:'#003556',fontWeight:'700'}}>{`${Object.keys(Editdata).length>0?'Edit Hotel':'Add Hotel'}`}</Grid>
                <CancelIcon sx={{position:'absolute',right:'0px',top:'0px',color:'#003556',cursor:'pointer'}} onClick={handleclose} />
            </DialogTitle>
            <DialogContent>
                <Grid container direction={'column'} spacing={2}>
                        <Grid item>
                            <RadioGroup value={management} onChange={(e)=>setManagement(Number(e.target.value))}>
                                <Stack direction="row" spacing={2}>
                                <FormControlLabel value={0} control={<Radio sx={{
                                            color: "white",
                                            "&, &.Mui-checked": {
                                            color: "#003556",
                                            },
                                        }}/>} label={<span style={{color:'#003556'}}>Self Management</span>}/>
                                <FormControlLabel value={1} control={<Radio sx={{
                                            color: "white",
                                            "&, &.Mui-checked": {
                                            color: "#003556",
                                            },
                                        }}/>} label={<span style={{color:'#003556'}}>GMT Management</span>}/>
                                </Stack>
                            </RadioGroup>
                        </Grid>
                        <Grid item>
                            <TextField label="HotelName" value={asignedetails.hotelname} onChange={(e)=>setAsignedetails((prev)=>({...prev,hotelname:e.target.value}))} size="small" fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField label="Contact Number" value={asignedetails.contact} onChange={(e)=>setAsignedetails((prev)=>({...prev,contact:e.target.value}))}  size="small"fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField label="Email" value={asignedetails.email} onChange={(e)=>setAsignedetails((prev)=>({...prev,email:e.target.value}))}  size="small" fullWidth/>
                        </Grid>
                        {/* <Grid item>
                            <TextField label="Address" value={asignedetails.address} onChange={(e)=>setAsignedetails((prev)=>({...prev,address:e.target.value}))}  size="small" fullWidth/>
                        </Grid> */}
                        {management===1&&<Grid item>
                            <TextField value={asigne.name} onClick={()=>setDrop_down((prev)=>!prev)}    fullWidth size="small" InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <img src={dropdown} alt="dropdown"/>
                </InputAdornment>
            ),
            }}/>  
                            {drop_down&&<div /*style={{height:'100px',overflowY:"scroll",marginTop:'0.5rem'}}*/ className='scroll_none' style={{...AmenitiesDropDown,height:'100%',maxHeight:'200px'}} onScroll={handleScroll}>
                            {
                                asigneesdata.length>0&&asigneesdata.map((item,index)=>{
                                        if(!item.status){
                                            return;
                                        }
                                        return(
                                            <MenuItem value={item.id} key={item.id} style={{background:asigne.id === item.id ? '#DFF3FF' : ''}} onClick={()=>selectasigne(item.id,item.name)}>{item.name}</MenuItem>
                                        )
                                })
                            }
                            </div>}
                        
                        {/* <Popover open={true}>data</Popover> */}
                        </Grid>}
                        <Grid item textAlign={'center'}>
                            <Button sx={{backgroundColor:'#003556!important',color:'#fff'}} onClick={()=>Createsubadmin()}>{`${Object.keys(Editdata).length>0?'Confirm':'Add'}`}</Button>
                        </Grid>
                    </Grid> 
            </DialogContent>
        </Dialog>
    </>
  )
}

export default Addhotelmodal