import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Rating,
  Paper,
  Stack,
  FormControl,
  RadioGroup,
  Radio,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import plusicon from "../../../assets/Subadminassets/plusicon.svg";
import deleteicon from "../../../assets/Subadminassets/deleteicon.svg";
import { addhotel_style } from "../../../assets/styles/Subadminstyles";
// import { TimePicker } from '@material-ui/pickers';
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Subadminapicalls } from "../../../ApiServices/Subadminapicalls";
import MySnackbar from "../../modals/Signupmodals/Snackbar";
import { muitextfieldborder } from "../../../assets/styles/Flights";
import { GoogleMap,useJsApiLoader,MarkerF,Marker } from "@react-google-maps/api";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {styles} from '../../../assets/styles/Styles_export'
export const AmenitiesDropDown = {
  paddingTop:'0.2rem',
  height:'200px',
  overflowY:"scroll",
  marginTop:'0.5rem',
  paddingLeft:'1rem',
  paddingRight:'1rem',
  boxShadow:'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
  background:"white",
  borderRadius:'0.5rem'
}

const useStyles = makeStyles({
  noSpinButtons: {
    "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0
    },
    "& input[type='number']": {
      "-moz-appearance": "textfield",
      appearance: "textfield",
    }
  }
});

const Addhotel = () => {
  // const [value, setValue] = React.useState(5);
  const addhotel=addhotel_style()
  const noArrows = useStyles()
// hotel data
const [hotel_data,setHotel_data]=useState({
  is_hot_deal:0,
  is_halal:0,
  is_top_hotel:0,
  star_level:1,
  hotel_description:'',
  hotel_contact:"",
  hotel_city_code:'',
  policy:'',
  // aminities:"",
  price_per_day:'',
  currency_code:'INR',
  // city_code:"",
  // policy:'',
  amenity_ids:[],
  latitude:6.65,
  longitude:5.6,
  address:{
    door_no:'',
    street_name:'',
    landmark:'',
    city:'',
    district:'',
    country:'',
    pincode:''
  },
  check_in:'', //Thu Aug 1 2023 11:00:00 GMT+0530
  check_out:'',
})
const [center, setCenter] = useState({
  lat: 37.7749,
  lng: -122.4194,
});
const [savedetailsbtn,setSavedetailsbtn]=useState(false)
const [markerPosition, setMarkerPosition] = useState({
  lat: 37.7749,
  lng: -122.4194,
});
  // convert to UTC 
  function convertToUTC(dateString){
    const originalDate = new Date(dateString);
    // Adjust the time zone offset
    const adjustedDate = new Date(originalDate.getTime() - originalDate.getTimezoneOffset() * 60000);
    // Format the adjusted date as "YYYY-MM-DD HH:mm:ss.SSSZ"
    const formattedDate = adjustedDate.toISOString().replace("T", " ").replace("Z", "+00");
    return formattedDate; // Output: "2023-08-30 12:00:00.000+00"
  }
  function convertToGMT(inputTimeString){
    const timeComponents = inputTimeString.split('.')[0]; // Remove milliseconds
    const timeOnly = timeComponents.split('+')[0]; // Remove timezone offset
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${timeOnly}`;
    return new Date(formattedDateTime).toString()
  }
  // update the hotel data
  async function totalHandleSubmit(){
    setSavedetailsbtn(true)
    await handleSubmit();
    // checking required Fields start's
    const requiredFields = ['price_per_day', 'hotel_description', 'hotel_contact', 'hotel_city_code', 'policy', 'amenity_ids', 'check_in', 'check_out'];
    const addressRequiredFields = ['door_no', 'street_name', 'landmark', 'city', 'district', 'country', 'pincode' ];
    for (const key of requiredFields){
      if(!hotel_data[key] || hotel_data[key].length <= 0 ){
        let errMsg = key === 'price_per_day' ? 'Please enter Base Price':
        key === 'hotel_description' ? 'Please add description':
        key === 'hotel_contact' ? 'Please add contact number':
        key === 'hotel_city_code' ? 'Please add city code':
        key === 'policy' ? 'Please add policy':
        key === 'amenity_ids' ? 'Please select amenities':
        key === 'check_in' ? 'Please select checkin time':
        key === 'check_out' && 'Please select checkout time'
        // key === 'currency_code' && 'Please add currency';
        setSnack((prevs)=>({...prevs,snackopen:true,snackmessage:errMsg}))
        return;
      }
    }
    for (const key of addressRequiredFields){
      if(!hotel_data?.address?.[key].trim()){
        let errMsg = key === 'door_no' ? 'Please enter door number':
        key === 'street_name' ? 'Please enter street name':
        key === 'landmark' ? 'Please enter near by landmark':
        key === 'city' ? 'Please enter city':
        key === 'district' ? 'Please enter district':
        key === 'country' ? 'Please enter country':
        key === 'pincode' && 'Please enter pincode';
        setSnack((prevs)=>({...prevs,snackopen:true,snackmessage:errMsg}))
        return;
      }
    }
    // if(new Date(hotel_data.check_in) < new Date(hotel_data.check_out)){
    //   setSnack((prevs)=>({...prevs,snackopen:true,snackmessage:'Checkout time should not be less than the checkin time'}))
    //   return;
    // }
    // checking required Fields end's
    let sending_data = {...hotel_data};
    // sending manually for only kakinada
    sending_data.hotel_city_code=123476;
    sending_data.check_in = await convertToUTC(hotel_data.check_in)
    sending_data.check_out = await convertToUTC(hotel_data.check_out);
    sending_data.latitude=markerPosition?.lat;
    sending_data.longitude=markerPosition?.lng;
    console.log(sending_data,"sending data")
    const res = await Subadminapicalls('gmtHotels',sending_data,"PUT","application/json");
    console.log(res,"sdks")
    if(res.status||!res?.status){
      setSavedetailsbtn(false)
      setSnack((prevs)=>({...prevs,snackopen:true,snackmessage:res.message}))
    }
  }

  const hotel_id = JSON.parse(localStorage.getItem('subadmin_login_details'))
  useEffect(()=>{
    if(hotel_data){
      getHotelDetails()
    }else{
      alert('err')
    }
  },[])

  async function getHotelDetails(){
    const endpoint = `gmtHotels/${1}/${10}/${hotel_id.management_type}/${hotel_id.hotel_code}`
    const res = await Subadminapicalls(endpoint,'','GET','application/json')
    // setHotel_data((prevs)=>({...prevs,address:res.data.hotel.address,is_hot_deal:res.data.hotel.is_hot_deal,is_halal:res.data.hotel.is_halal,is_top_hotel:res.data.hotel.is_top_hotel,star_level:res.data.hotel.star_level,hotel_description:res.data.hotel.hotel_description,price_per_day:res.data.hotel.price_per_day,hotel_contact:res.data.hotel.hotel_contact,hotel_city_code:res.data.hotel.hotel_city_code,policy:res.data.hotel.policy,}))
    if(res.status){
    setHotel_data((prevs)=>({
      ...res?.data?.hotel,
    }))
    // setHotel_data(res?.data?.hotel)

{    (res.data.hotel.latitude!==null&&res.data.hotel.longitude)&&setMarkerPosition({lat:res.data.hotel.latitude,lng:res.data.hotel.longitude})
}    
{(res.data.hotel.latitude!==null&&res.data.hotel.longitude)&&setCenter({lat:res.data.hotel?.latitude,lng:res.data.hotel?.longitude})
}    getAminities = res.data.hotel?.amenity_ids;
    if(res.data.hotel.amenity_ids?.length <= 0 || res.data.hotel.amenity_ids === null){
      setHotel_data((prevs)=>({
        ...prevs,
        amenity_ids:[],
      }))
    }
    if(res.data.hotel?.check_in){
      let response = await convertToGMT(res.data.hotel?.check_in)
      setHotel_data((prevs)=>({
        ...prevs,
        check_in : response
      }))
    }
    if(res.data.hotel?.check_out){
      let response = await convertToGMT(res.data.hotel?.check_out)
      setHotel_data((prevs)=>({
        ...prevs,
        check_out : response
      }))
    }
    get_all_aminities();
    fetchcountries(res.data.hotel?.address?.country)
    // getting images
    const get_images_res = await Subadminapicalls('getHotelImages',{hotelId:hotel_id.id},'POST','application/json')
    console.log(get_images_res);
    setImages(get_images_res.data.hotelImages)
    setPictures(get_images_res.data.pictures)
  }
  else{
    alert(res?.message)
  }
  }

  //styles
  const deletedstyle = {
    position: "absolute",
    // bottom: "20px",
    // right: "5px",
    background: "none",
    border: "none",
    color: "red",
    cursor: "pointer",
    top:0,
    right:0,
    paddingRight:0,
  };

  const hotelstyles = {
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "rgb(0,53,86,1)",
    fontSize: "16px",
  };

  const savedetails_styles = {
    padding: "10px 30px 10px 30px",
    backgroundColor: "rgba(0, 53, 86, 1)",
    color: "white",
    borderRadius: "10px",
    border: "none",
    float: "right",
  };

  const [images, setImages] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [deletedPictures, setDeletedPictures] = useState([]);

  const handleImageUpload = (event) => {
    const selectedImages = event.target.files;
    const remainingSlots = Math.max(0, 12 - images.length);
    const newImages = Array.from(selectedImages).slice(0, remainingSlots);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageDelete = (index,imageId) => {
    console.log(imageId);
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    // console.log(images);
    if(typeof imageId !== "object"){
      let imageurl = imageId.split('/')[5].split('?')[0].replace(/%28/g, "(").replace(/%29/g, ")")
      setDeletedPictures([...deletedPictures,imageurl])
    }
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    if(deletedPictures.length>0){
      let delete_Images = {
        hotelId:hotel_id.id,
        pictures,
        deletedPictures
      }
      const res = await Subadminapicalls('deleteHotelImages',delete_Images,"POST","application/json");
      if(!res.status){
        setSnack((prev)=>({...prev,snackopen:true,snackmessage:res.message}))
      }else{
        setDeletedPictures([])
      }
    }
    const formData = new FormData();
    // formData.append('hotelId',hotel_id.id)
    images.forEach((image, index) => {
      if(typeof image === 'object'){
        formData.append(`image${index}`, image);
      }
    });
    if(!formData.entries().next().done){
      formData.append('hotelId',hotel_id.id)
      const res = await Subadminapicalls('addHotelImages',formData,"POST","multipart/form-data");
      if(!res.status){
        setSnack((prev)=>({...prev,snackopen:true,snackmessage:res.message}))
      }
    }
  };

  const [snack,setSnack] = useState({
    snackopen:false,
    snackmessage:'',
  })
  function snackclose(){
    setSnack((prevs)=>({...prevs,snackopen:false}))
  }

  // open amenities option
  let getAminities;
  const [dropdown,setDropdown]=useState(false)
  const [pagenumber,setPageNumber]=useState(1)
  const [limit,setLimit]=useState(20)
  const [aminities_count,setAminities_count]=useState(0)
  const [aminties,setAminities]=useState([])
  const [total_aminities,setTotal_aminities]=useState([])
  const border_color = muitextfieldborder();
  const [aminity_id,setAminity_id]=useState([]);
  const handleScroll = async(event) => {
    const element = event.target;
    const scrollTolerance = 5; 
    const scrollDifference =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    if ( scrollDifference <= scrollTolerance && total_aminities.length<aminities_count  ) {
      setPageNumber((prev)=>prev+1);
      get_all_aminities(pagenumber+1)
    }
  };
  // Get the new position of the marker
  const handleMarkerDragEnd = (e) => {
    console.log(e,"location data")
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerPosition(newPosition);
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_MAPSKEY}`,
  });
  // Location picker
  const googleMap = (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "50vh",borderRadius:'0.5rem' }}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onClick={handleMarkerDragEnd}
    >
      <>
          <Marker  position={markerPosition}  > </Marker>
      </>
    </GoogleMap>
  );
 
  // get all_aminities data
  const get_all_aminities=async(page)=>{
    try{
      let page_number=pagenumber;
      if(page!==undefined){
        page_number=page
      }
      const res=await Subadminapicalls(`/getAllAmenities/${page_number}/${limit}`,{},"GET","application/json")
      if(res.status){
        if(page===undefined){
          setTotal_aminities(res.data.amenities)
        }
        else{
          setTotal_aminities((prev)=>([...prev,...res.data.amenities]))
        }
        setAminities_count(res.data.totalCount)
      }
      else{
        alert(res.message)
      }
    }
    catch(error){

    }
    get_editaminities()
  }
  // selected aminities
  const handle_aminities_selection=(aminity)=>{
    const objectExists = aminties.some(item => item.amenity_id === aminity.amenity_id);
    console.log(objectExists,"exitis")
    if(objectExists){
      setAminities(aminties.filter(item=>item.amenity_id!==aminity.amenity_id));
      setAminity_id(aminity_id.filter(item=>item!==aminity.amenity_id))
    }
    else{
      setAminities((prev)=>([...prev,aminity]))
      setAminity_id((prev)=>([...prev,aminity.amenity_id]))
    }
  }
  useEffect(()=>{
    setHotel_data((prevs)=>({...prevs,amenity_ids:aminity_id}))
  },[aminity_id])

  const get_editaminities=async()=>{
    if(getAminities?.length > 0){
      try{
        const res=await Subadminapicalls(`getAmenities`,{"specificAmenityIds":getAminities},"POST","application/json")
        if(res.status){
          res.data.length>0&&res.data.map((item)=>{
            setAminities((prev)=>([...prev,item]));
            setAminity_id((prev)=>([...prev,item.amenity_id]))
          })
        }
        else{
          alert(res.message)
        }
      }
      catch(error){
        alert(error)
      }
    }
  }

  function handleClickElement(e){
    const clickedElement = e.target;
    // console.log(clickedElement);
    if(clickedElement?.id !== 'dropAmini'){
      setDropdown(false)
    }
  }
  // get countries start's
  const Apibaseurl=process.env.REACT_APP_BASEURL;
  const [countriesdata,setCountriesdata] = useState([])
  const [countrieObject,setCountrieObject] = useState({})
  const fetchcountries = async (countrie) => {
    try {
      const res = await axios.post(
        `${Apibaseurl}/getCountriesTel`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "V1B6Wk9VxIAxrGptEXKlJclP9o0ZuOeV",
          },
        }
      );
      const data = await res.data;
      const countries = await data.data;
      if(data.status)setCountriesdata(countries);
      if(countrie){
        let resObject;
        countries.some(item =>{
          if(item?.country_name === countrie){
            resObject = item;
          }
        })
        setCountrieObject(resObject)
      }
    } catch (err) {
      console.log(err);
    }
  };
  function onCountrieChange(countrie){
    if(countrie){
      let resObject;
      countriesdata.some(item =>{
        if(item?.country_name === countrie){
          resObject = item;
        }
      })
      setCountrieObject(resObject)
    }
  }
  // get countries end's

  // clock open states start's
  const [check_in_open,setCheck_in_open] = useState(false)
  const [check_out_open,setCheck_out_open] = useState(false)
  // clock open states end's

  const Accept_number_regex = /^[0-9]*$/; // Regular expression to allow only numbers

  return (
    // <div style={{ background: "white" }}>
    <>
    {<MySnackbar open={snack.snackopen} close={snackclose} message={snack.snackmessage} />}
    <Paper elevation={0} sx={{padding:'1rem 0.5rem 1rem 0.5rem'}}>
      <Stack spacing={3}>
        <Stack onClick={handleClickElement} spacing={3} sx={{boxShadow:'0px 0px 14px 0px #00355640',padding:'0rem 0rem 2rem 0rem',borderRadius:'1.5rem',overflow:'hidden'}}>
        <Grid container p={'3rem 1rem 1rem 1rem'} sx={{background:'rgb(238 245 249)'}}>
          <Grid item md={4} sm={4}><Typography style={hotelstyles}>Hotel Name</Typography></Grid>
          <Grid item md={8} sm={8}>
            <TextField 
              helperText={<span style={{color:'#303030',fontSize:'12px'}}>Contact admin if you wish to change the hotel's name.</span>}
              fullWidth 
              size="small" 
              label="Name" 
              value={hotel_data?.hotel_name} 
              InputLabelProps={{
                style: {
                  color: styles.app_color,
                },
              }}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${styles.app_color}!important`,
                  },
                },
              }}
              focused
            />
          </Grid>
        </Grid>
        <Grid container p={'1rem'}>
          <Grid item md={4} sm={4}><Typography style={hotelstyles}>Base Price</Typography></Grid>
          <Grid item md={8} sm={8}>
            <TextField 
              fullWidth 
              type="text"
              size="small" 
              label="Price" 
              value={hotel_data?.price_per_day} 
              onChange={(e)=>Accept_number_regex.test(e.target.value)&&setHotel_data((prev)=>({...prev,price_per_day:e.target.value?Number(e.target.value)<1000000000?Number(e.target.value):prev.price_per_day:''}))}
              InputLabelProps={{
                style: {
                  color: styles.app_color,
                },
              }}
              // inputProps={{
              //   inputMode: "numeric",
              // }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${styles.app_color}!important`,
                  },
                },
                "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0
                },
                "& input[type='number']": {
                  "-moz-appearance": "textfield",
                  appearance: "textfield",
                },
              }}
              // className={noArrows.noSpinButtons}
            />
          </Grid>
        </Grid>
        <Grid container p={'1rem'} sx={{background:'rgb(238 245 249)'}}>
          <Grid item md={4} sm={4}><Typography style={hotelstyles}>Add Images</Typography></Grid>
          <Grid item md={8} sm={8}>
          {/* <form onSubmit={handleSubmit}> */}
          <Grid
            // style={{
            //   display: "grid",
            //   gridTemplateColumns: "repeat(4, 1fr)",
            //   gridGap: "10px",
            // }}
            container
            gap={2}
          >
            {images.map((image, index) => (
              <Grid item sm minWidth={'150px'} maxWidth={'150px !important'} maxHeight={'150px'} key={index} style={{ position: "relative" }}>
                <img
                  src={typeof image === 'object'?URL.createObjectURL(image):image}
                  alt="images"
                  style={{
                    width: "100%",
                    // height: "25vh",
                    height:'100%',  
                    objectFit: "cover",
                    borderRadius:'0.7rem'
                  }}
                />
                <button
                  className="delete-button"
                  onClick={() => handleImageDelete(index,image)}
                  style={deletedstyle}
                >
                  <img src={deleteicon} alt="Delete Icon" />{" "}
                </button>
              </Grid>
            ))}
            {images.length < 12 && (
              <>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  multiple
                />
                <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                  <img
                    id="img-upload"
                    src={plusicon}
                    alt="plusicon"
                    style={{
                      border: "1px dashed rgb(0, 53, 86, 1)",
                      // width: "100%",
                      // height: "25vh",
                      width:'150px',
                      height:'148px',
                      borderRadius:'0.7rem'
                    }}
                  />
                </label>
              </>
            )}
          </Grid>
        {/* </form> */}
          </Grid>
        </Grid>
        <Grid container p={'1rem'}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Hot Deals</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            <FormControl>
              <RadioGroup value={hotel_data?.is_hot_deal} onChange={(e)=>setHotel_data((prev)=>({
                ...prev,is_hot_deal:e.target.value
              }))}>
                  <Stack direction={'row'}>
                  <FormControlLabel
                                  value={1}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color: styles.app_color,
                                        },
                                      }}
                                    />
                                  }
                                  label={<span style={{color:styles.app_color}}>Yes</span>}
                                />
                                
                                <FormControlLabel
                                  value={0}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color: styles.app_color,
                                        },
                                      }}
                                    />
                                  }
                                  label={<span style={{color:styles.app_color}}>No</span>}
                                />
                  </Stack>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container p={'1rem'} sx={{background:'rgb(238 245 249)'}}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Halal</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            <FormControl>
              <RadioGroup value={hotel_data?.is_halal} onChange={(e)=>setHotel_data((prev)=>({
                ...prev,is_halal:e.target.value
              }))}>
                  <Stack direction={'row'}>
                  <FormControlLabel
                                  value={1}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color: styles.app_color,
                                        },
                                      }}
                                    />
                                  }
                                  label={<span style={{color:styles.app_color}}>Yes</span>}
                                />
                                
                                <FormControlLabel
                                  value={0}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color: styles.app_color,
                                        },
                                      }}
                                    />
                                  }
                                  label={<span style={{color:styles.app_color}}>No</span>}
                                />
                  </Stack>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container p={'1rem'}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Top Hotel</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            <FormControl>
              <RadioGroup value={hotel_data?.is_top_hotel} onChange={(e)=>setHotel_data((prev)=>({
                ...prev,is_top_hotel:e.target.value
              }))}>
                  <Stack direction={'row'}>
                  <FormControlLabel
                                  value={1}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color:styles.app_color,
                                        },
                                      }}
                                    />
                                  }
                                  label={<span style={{color:styles.app_color}}>Yes</span>}
                                />
                                
                                <FormControlLabel
                                  value={0}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color:styles.app_color,
                                        },
                                      }}
                                    />
                                  }
                                  label={<span style={{color:styles.app_color}}>No</span>}
                                />
                  </Stack>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container p={'1rem'} sx={{background:'rgb(238 245 249)'}}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Star Hotel</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            
            <select value={hotel_data?.star_level} onChange={(e)=>{setHotel_data((prev)=>({
              ...prev,star_level:Number(e.target.value)
            }))}} className={addhotel.star_hotel}>
              {
                [1,2,3,4,5,6,7].map((star,index)=>{
                  return(
                    <option value={star}>{star}</option>
                  )
                })
              }
            </select>
          </Grid>
        </Grid>
        <Grid container p={'1rem'}>
          <Grid item md={4} sm={4}>
              <Typography style={hotelstyles}>Description</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            <TextField 
              label={"Description"} 
              multiline 
              rows={4} 
              variant="outlined"
              fullWidth 
              value={hotel_data?.hotel_description} 
              onChange={(e)=>setHotel_data((prev)=>({...prev,hotel_description:e.target.value}))}
              InputLabelProps={{
                style: {
                  color:styles.app_color,
                },
              }}
              // className={border_color.search_root}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${styles.app_color}!important`,
                  },
                  "&:hover":{
                    background:'none',
                    "&::before":{
                      content:'none'
                    }
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container p={'1rem'} sx={{background:'rgb(238 245 249)'}}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Contact Number</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            <TextField 
              // className={noArrows.noSpinButtons}
              type="number"
              label="Number" 
              size="small" 
              fullWidth 
              value={hotel_data?.hotel_contact} 
              onChange={(e)=>Accept_number_regex.test(e.target.value)&&setHotel_data((prev)=>({...prev,hotel_contact:e.target.value?Number(e.target.value):''}))}
              InputLabelProps={{
                style: {
                  color: styles.app_color,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${styles.app_color}!important`,
                  },
                },
                "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0
                },
                "& input[type='number']": {
                  "-moz-appearance": "textfield",
                  appearance: "textfield",
                }
              }}
            />
          </Grid>
        </Grid>
        <Grid container p={'1rem'}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Location</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            {isLoaded?googleMap:<h3>Loading</h3>}
            </Grid>
        </Grid>
        <Grid container p={'1rem'} sx={{background:'rgb(238 245 249)'}}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>City code</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            <TextField 
              // className={noArrows.noSpinButtons}
              type="number"
              label="City Code" 
              value={hotel_data?.hotel_city_code} 
              onChange={(e)=>setHotel_data((prev)=>({...prev,hotel_city_code:e.target.value?Number(e.target.value):''}))} 
              size="small" 
              fullWidth
              InputLabelProps={{
                style: {
                  color: styles.app_color,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${styles.app_color}!important`,
                  },
                },
                "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0
                },
                "& input[type='number']": {
                  "-moz-appearance": "textfield",
                  appearance: "textfield",
                }
              }}
            />
          </Grid>
        </Grid>
        <Grid container p={'1rem'}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Policy</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            <TextField 
              label="Policy" 
              value={hotel_data?.policy} 
              multiline 
              rows={4} 
              fullWidth 
              onChange={(e)=>setHotel_data((prev)=>({...prev,policy:e.target.value}))}
              InputLabelProps={{
                style: {
                  color: styles.app_color,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${styles.app_color}!important`,
                  },
                  "&:hover":{
                    background:'none',
                    "&::before":{
                      content:'none'
                    }
                  },
                },
              }}
              // className={border_color.search_root}
            />
          </Grid>
        </Grid>
        <Grid container p={'1rem'} sx={{background:'rgb(238 245 249)'}}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Amenities</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            <TextField
              label="Amenities"
              size="small"
              fullWidth
              value={aminties.map(item=>item.amenity_name).join(",")}
              onClick={(e)=>{
                setDropdown((prev)=>!prev);handleClickElement(e)
              }}
              InputLabelProps={{
                style: {
                  color: styles.app_color,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  paddingRight:'0px',
                  "& fieldset": {
                    borderColor: `${styles.app_color}!important`,
                  },
                },
              }}
              inputProps={{
                id: "dropAmini",
              }}
              InputProps={{
                endAdornment:<ArrowDropDownIcon/>
              }}
            />
            {dropdown &&  <div id="dropAmini" style={AmenitiesDropDown} className="scroll_none" onScroll={handleScroll}>
              {
                total_aminities.map((item,index)=>{
                  return(
                    <div id="dropAmini" style={{cursor:'pointer',background: aminties.some(item1 => item1?.amenity_id === item?.amenity_id) ? '#DFF3FF' : '',marginBottom:'0.2rem'}} onClick={()=>handle_aminities_selection(item)}>{item.amenity_name}</div>
                  )
                })
              }
            </div>}
          </Grid>
        </Grid>
        <Grid container p={'1rem'}>
          <Grid item md={4} sm={4}>
              <Typography style={hotelstyles}>Address</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
              <Stack spacing={3}>
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Door Number" 
                  value={hotel_data?.address?.door_no} 
                  onChange={(e)=>setHotel_data((prev)=>({...prev, address: {...prev.address, door_no:e.target.value},}))} 
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: `${styles.app_color}!important`,
                      },
                    },
                  }}
                />
                <Grid container columnGap={1} justifyContent={'space-between'}>
                  <Grid container item md={5.8} sm={5.7} direction="column" rowSpacing={3}>
                    <Grid item>
                      <TextField 
                        fullWidth 
                        size="small" 
                        label="Street Name" 
                        value={hotel_data?.address?.street_name} 
                        onChange={(e)=>setHotel_data((prev)=>({...prev, address: {...prev.address, street_name:e.target.value},}))}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: `${styles.app_color}!important`,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField 
                        fullWidth 
                        size="small" 
                        label="City" 
                        value={hotel_data?.address?.city} 
                        onChange={(e)=>setHotel_data((prev)=>({...prev, address: {...prev.address, city:e.target.value},}))}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: `${styles.app_color}!important`,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      {/* <TextField 
                        fullWidth 
                        size="small" 
                        label="Country" 
                        value={hotel_data?.address?.country} 
                        onChange={(e)=>setHotel_data((prev)=>({...prev, address: {...prev.address, country:e.target.value},}))}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: `${styles.app_color}!important`,
                            },
                          },
                        }}
                        select
                        SelectProps={{
                          MenuProps:{
                            PaperProps:{
                              style:{
                                maxHeight:'200px'
                              }
                            }
                          }
                        }}
                      >
                        {
                          countriesdata.map((flags)=>{
                            return(
                              <MenuItem key={flags?.id} value={flags.country_name}>
                                {console.log(flags.country_name)}
                                {flags?.country_name}
                              </MenuItem>
                            )
                          })
                        }
                      </TextField> */}
                      {/* Using autocomplete for the options search feature */}
                      <Autocomplete
                        fullWidth
                        size="small"
                        options={countriesdata.map((flags) => flags.country_name)}
                        value={hotel_data?.address?.country}
                        onChange={(event, newValue) => {
                          setHotel_data((prev) => ({
                            ...prev,
                            address: { ...prev.address, country: newValue },
                          }));
                          onCountrieChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            InputLabelProps={{
                              style: {
                                color: styles.app_color,
                              },
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: `${styles.app_color}!important`,
                                },
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item md={5.8} sm={5.7} direction="column" rowSpacing={3} textAlign={'right'}>
                    <Grid item>
                      <TextField 
                        fullWidth 
                        size="small" 
                        label="Near by Landmark" 
                        value={hotel_data?.address?.landmark} 
                        onChange={(e)=>setHotel_data((prev)=>({...prev, address: {...prev.address, landmark:e.target.value},}))}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: `${styles.app_color}!important`,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField 
                        fullWidth 
                        size="small" 
                        label="District" 
                        value={hotel_data?.address?.district} 
                        onChange={(e)=>setHotel_data((prev)=>({...prev, address: {...prev.address, district:e.target.value},}))}
                        InputLabelProps={{
                          style: {
                            color:styles.app_color,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: `${styles.app_color}!important`,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField 
                        fullWidth 
                        // className={noArrows.noSpinButtons}
                        type="number"
                        size="small" 
                        label="Pincode" 
                        value={hotel_data?.address?.pincode} 
                        onChange={(e)=>setHotel_data((prev)=>({...prev, address: {...prev.address, pincode:e.target.value},}))}
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: `${styles.app_color}!important`,
                            },
                          },
                          "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button": {
                            "-webkit-appearance": "none",
                            margin: 0
                          },
                          "& input[type='number']": {
                            "-moz-appearance": "textfield",
                            appearance: "textfield",
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
          </Grid>
        </Grid>
        <Grid container p={'1rem'} columnGap={0.4} justifyContent={'space-between'} sx={{background:'rgb(238 245 249)'}}>
          <Grid item md={3.8} sm={3.8}>
            <Typography style={hotelstyles}>Check In Time & Check out Time</Typography>
          </Grid>
          <Grid item container sm={8} md={8} spacing={1}>
            <Grid item md={6} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label={'Check In Time'} value={hotel_data.check_in} onChange={(e)=>setHotel_data((prev)=>({...prev, check_in:e?.$d ? e?.$d : ''}))} 
                  renderInput={(props)=> <TextField {...props} size="small" 
                    InputLabelProps={{
                      style: {
                        color: styles.app_color,
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: `${styles.app_color}!important`,
                        },
                      },
                    }}
                    onClick={()=>setCheck_in_open(true)}
                  /> 
                  } 
                  open={check_in_open}
                  onClose={()=>setCheck_in_open(false)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={6} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label={'Check out Time'} value={hotel_data.check_out} onChange={(e)=>setHotel_data((prev)=>({...prev, check_out:e?.$d ? e?.$d : ''}))} 
                  renderInput={(props)=> <TextField {...props} size="small" 
                    InputLabelProps={{
                      style: {
                        color: styles.app_color,
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: `${styles.app_color}!important`,
                        },
                      },
                    }}
                    onClick={()=>setCheck_out_open(true)}
                    /> 
                  } 
                  open={check_out_open}
                  onClose={()=>setCheck_out_open(false)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid container p={'1rem'}>
          <Grid item md={4} sm={4}>
            <Typography style={hotelstyles}>Currency</Typography>
          </Grid>
          <Grid item md={8} sm={8}>
            {/* <TextField size="small" label="Currency" fullWidth value={hotel_data?.currency_code} onChange={(e)=>setHotel_data((prev)=>({...prev, currency_code: e.target.value,}))}/> */}
            <TextField 
              label="Currency" 
              value={hotel_data?.currency_code} 
              // onChange={(e)=>setHotel_data((prev)=>({...prev,currency_code:e.target.value}))} 
              size="small" 
              fullWidth
              InputLabelProps={{
                style: {
                  color: styles.app_color,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${styles.app_color}!important`,
                  },
                },
              }}
              InputProps={{
                readOnly: true,
              }}
              focused
            />
          </Grid>
        </Grid>
        </Stack>
        <Grid>
        <button style={savedetails_styles} onClick={totalHandleSubmit} disabled={savedetailsbtn}>
          <span>Save Details</span>
        </button>
      </Grid>
      </Stack>
     
      </Paper>
    </>
    // </div>
  );
};

export default Addhotel;
