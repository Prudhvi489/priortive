import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  Checkbox,
  RadioGroup,
  Stack,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Popover,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { muitextfieldborder } from "../../../assets/styles/Flights";
import { Subadminapicalls } from "../../../ApiServices/Subadminapicalls";
import MySnackbar from "../Signupmodals/Snackbar";
import { AmenitiesDropDown } from "../../pages/Subadmin/Addhotel";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {styles} from '../../../assets/styles/Styles_export'

const Addroom = (props) => {
  const { open, close, editdata,refresh_rooms } = props;
  const border_color = muitextfieldborder();
  const [smoking, setSmoking] = useState(0);
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  const [required, setRequired] = useState({
    passport: false,
    pan: false,
    // categoryid: false,
  });
  const [aminties,setAminities]=useState([])
  const [aminity_id,setAminity_id]=useState([]);
  const [total_aminities,setTotal_aminities]=useState([])
  const [aminities_count,setAminities_count]=useState(0)
  const hotel_code = JSON.parse(
    localStorage.getItem("subadmin_login_details")
  ).hotel_code;
  const [room_data, setRoom_data] = useState({
    availability_type: 2,
    room_index: null,
    room_type_name: "",
    room_description: "",
    price: 0,
    room_price: null,
    extra_guest_charge: null,
    child_charge: null,
    other_charges: null,
    discount: null,
    published_price: null,
    offered_price: null,
    tax: null,
  });
  const [gst, setGst] = useState({
    CGSTAmount: null,
    CGSTRate: null,
    CessAmount: null,
    CessRate: null,
    SGSTAmount: null,
    SGSTRate: null,
    IGSTAmount: null,
    IGSTRate: null,
    TaxableAmount: null,
  });
  const [cancellation, setCancellation] = useState([{
    Charge: null,
    ChargeType: 4,
    Currency: "INR",
    FromDate: null,
    ToDate: null,
  }]);
  const [pagenumber,setPageNumber]=useState(1)
  const [limit,setLimit]=useState(20)
  const [dropdown,setDropdown]=useState(false)
  const handleclose = () => {
    setRoom_data(
      {
        // availability_type: 2,
        // room_index: 0,
        // room_type_name: "",
        // room_description: "",
        // price: 0,
        // room_price: 0,
        // extra_guest_charge: 0,
        // child_charge: 0,
        // other_charges: 0,
        // discount: 0,
        // published_price: 0,
        // offered_price: 0,
        // tax: 0,
        availability_type: 2,
        room_index: null,
        room_type_name: "",
        room_description: "",
        price: 0,
        room_price: null,
        extra_guest_charge: null,
        child_charge: null,
        other_charges: null,
        discount: null,
        published_price: null,
        offered_price: null,
        tax: null,
      }
    )
    setGst({
      // CGSTAmount: 0,
      // CGSTRate: 0,
      // CessAmount: 0,
      // CessRate: 0,
      // SGSTAmount: 0,
      // SGSTRate: 0,
      // IGSTAmount: 0,
      // IGSTRate: 0,
      // TaxableAmount: 0,
      CGSTAmount: null,
      CGSTRate: null,
      CessAmount: null,
      CessRate: null,
      SGSTAmount: null,
      SGSTRate: null,
      IGSTAmount: null,
      IGSTRate: null,
      TaxableAmount: null,
    });
    setCancellation(
      [{
        // Charge: 0,
        // ChargeType: 4,
        // Currency: "INR",
        // FromDate: 0,
        // ToDate: 1,
        Charge: null,
        ChargeType: 4,
        Currency: "INR",
        FromDate: null,
        ToDate: null,
      }]
    )
    setAminities([]);
    setAminity_id([])
    close();
  };
  const get_editaminities=async()=>{
    try{
      const res=await Subadminapicalls(`getAmenities`,{"specificAmenityIds":editdata?.room_amenities},"POST","application/json")
      if(res.status){
        res.data.length>0&&res.data.map((item)=>{
          setAminities((prev)=>([...prev,item.amenity_name]));
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
  useEffect(() => {
    if (open && Object.keys(editdata).length > 0) {
      get_editaminities()
      const {
        availability_type,
        room_index,
        room_type_name,
        room_description,
        price,
        room_price,
        extra_guest_charge,
        other_charges,
        child_charge,
        discount,
        published_price,
        offered_price,
        tax,
      } = editdata;
      setRoom_data((prev) => ({
        ...prev,
        availability_type,
        room_index,
        room_type_name,
        room_description,
        price,
        room_price,
        extra_guest_charge,
        other_charges,
        child_charge,
        discount,
        published_price,
        offered_price,
        tax,
      }));
      setGst(editdata?.gst);
      setCancellation(editdata?.cancellation_policies)
    }
    get_all_aminities();
    setPageNumber(1)
  }, [open]);
  // 1->number
  // 2->string
  const change_room_data = (event, type) => {
    const { name, value } = event.target;
    setRoom_data((prev) => ({
      ...prev,
      [name]: type === 1 ? value?Number(value):null : value,
    }));
  };
  const change_cancellation = (event,index) => {
    const { name, value } = event.target;
    // setCancellation((prev) => ([{ ...prev, [name]: value }]));
    // setCancellation(prev => {
    //   return prev.map(item => ({
    //     ...item,
    //     [name]: value
    //   }));
    // });
    setCancellation(prev => {
      return prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [name]: value
          };
        }
        return item;
      });
    });
    console.log(cancellation);
  };
  const change_gstdetails = (event, type) => {
    const { name, value } = event.target;
    setGst((prev) => ({ ...prev, [name]: type === 1 ? value?Number(value):null : value }));
  };
  const room_details_validation = async () => {
    if (room_data.availability_type === 2) {
      return "Please select availability type"; //"select the availability type";
    }
    if (room_data.room_index === 0 || !room_data.room_index) {
      return "Please enter room index"; //"Enter your room index";
    }
    if (room_data.room_type_name === "") {
      return "Please enter room name"; //"Enter room type name";
    }
    if (room_data.room_description === "") {
      return "Please enter room description"; //"Enter Room Description";
    }
    if(aminties.length <= 0){
      return "Please select room amenities"
    }
    if (cancellation[0].ChargeType === 4) {
      return "Please select charge type"; //"slect chargetype";
    }
    if(cancellation[0].Charge == 0 || !cancellation[0].Charge){
      return "Please enter charge";
    }
    if(!cancellation[0].FromDate){
      return "Please select from date";
    }
    if(!cancellation[0].ToDate){
      return "Please select to date";
    }
    if (room_data.room_price <= 0 || !room_data.room_price) {
      return "Please enter room price"; //"Roomprice must be greater than Zero";
    }
    if(room_data.tax == 0 || !room_data.tax){
      return "Please enter Tax";
    }
    // if (room_data.child_charge < 0 || !room_data.child_charge) {
    //   return "Child Charge must be greater than or equal to Zero or not be empty.";
    // }
    // if (room_data.extra_guest_charge < 0 || !room_data.extra_guest_charge) {
    //   return "Extraguest charge must be greater than or equal to Zero or not be empty.";
    // }
    // if (room_data.other_charges < 0 || !room_data.other_charges) {
    //   return "Other Charges must be greater than or equal to Zero or not be empty.";
    // }
    // if (room_data.discount < 0 || !room_data.discount) {
    //   return "Discount must be greater than or equal to Zero or not be empty.";
    // }
    if (room_data.published_price===null) {
      return "Published price must be greater than or equal to Zero or not be empty.";
    }
    if (room_data.offered_price===null ) {
      return "Offered price must be greater than or equal to Zero or not be empty.";
    }
    return "validated";
  };
  // Add room funtionality and api call
  const add_room = async () => {
    // console.log(room_data.published_price.toFixed(2),"published price")
    console.log( room_data?.offered_price,"offered proice")
    try {
      const validation_res = await room_details_validation();
      if (validation_res === "validated") {
      let method;
      const room_obj = {
        ...(Object.keys(editdata).length>0 && {"id":editdata?.id}),
          hotel_code: hotel_code,
          availability_type: Number(room_data.availability_type),
          room_index: room_data.room_index,
          room_description: room_data.room_description,
          room_type_name: room_data.room_type_name,
          room_amenities: aminity_id,
          smoking_preference: smoking.toString(),
          cancellation_policies: cancellation,
          room_price: room_data.room_price,
          tax: room_data.tax,
          extra_guest_charge: room_data.extra_guest_charge,
          child_charge: room_data.child_charge,
          other_charges: room_data.other_charges,
          discount: room_data.discount,
          published_price: room_data.published_price.toFixed(2),
          offered_price: room_data?.offered_price.toFixed(2),
          gst: gst,
        };
        if(Object.keys(editdata).length>0){
          method="PUT"
        }
        else{
          method = "POST";
        }
        // return;
        const res = await Subadminapicalls(
          "gmtHotelRoom",
          room_obj,
          method,
          "application/json"
        );
        if (res.status) {
          refresh_rooms();
          setSnackopen(true);
          setSnackmessage(res.message);
          handleclose()
        } else {
          setSnackopen(true);
          setSnackmessage(res.message);
        }
      } else {
        setSnackopen(true);
        setSnackmessage(validation_res);
        return;
      }
    } catch (error) {
      alert(error);
    }
  };
  // get all aminities list
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
      alert(error)
    }
  }
  // handle infinite scrolling
  const handleScroll = async(event) => {
    // alert("scorll")
    const element = event.target;
    const scrollTolerance = 5; // Tolerance value for scroll calculation

    const scrollDifference =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    if ( scrollDifference <= scrollTolerance && total_aminities.length<aminities_count  ) {
      setPageNumber((prev)=>prev+1);
      get_all_aminities(pagenumber+1)
        // setPageNumber((prev)=>prev+1)
    //  getasignees(pageNumber+1)   
    }
  };
  const handle_aminities_selection=(aminity)=>{
    if(aminity_id.includes(aminity.amenity_id)){
      setAminities(aminties.filter(item=>item!==aminity.amenity_name));
      setAminity_id(aminity_id.filter(item=>item!==aminity.amenity_id))
    }
    else{
      setAminities((prev)=>([...prev,aminity.amenity_name]))
      setAminity_id((prev)=>([...prev,aminity.amenity_id]))
    }
  }
  function handleClickElement(e){
    const clickedElement = e.target;
    if(clickedElement?.id !== 'dropAmini'){
      setDropdown(false)
    }
  }
  function cancellationAddMore(){
    let temp = {
      Charge: null,
      ChargeType: 4,
      Currency: "INR",
      FromDate: null,
      ToDate: null,
    }
    setCancellation((prev)=>[...prev,temp])
  }
  function clearCancellationObject(Objindex){
    const updatedArray = cancellation.filter((item, index) => index !== Objindex);
    setCancellation([...updatedArray])
  }

  return (
    <>
      <MySnackbar
        open={snackopen}
        close={() => setSnackopen(false)}
        message={snackmessage}
      />
      <Dialog
        open={open}
        onClose={() => handleclose()}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            // maxWidth: "700px",
            borderRadius: "1rem",

            // padding: "1rem",
          },
        }}
        maxWidth="md"
        onClick={handleClickElement}
      >
        <DialogTitle>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <span>{Object.keys(editdata).length>0?'Edit Room':'Add Room'}</span>
            </Grid>
            <Grid item alignSelf={"center"}>
              <CancelIcon sx={{ color: styles.app_color }} onClick={handleclose} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Grid container columnGap={1} justifyContent={'space-between'} maxWidth={'100% !important'}>
              <Grid item sm md={3.9}>
                <FormControl fullWidth>
                  <InputLabel sx={{color:'#003556'}}>Availability Type</InputLabel>
                <Select
                  label="Availability Type"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  size="small"
                  fullWidth
                  name="availability_type"
                  value={room_data.availability_type}
                  onChange={(e) => change_room_data(e)}
                >
                  <MenuItem value={0}>Unavailable</MenuItem>
                  <MenuItem value={1}>Available</MenuItem>
                </Select>
                </FormControl>
              </Grid>
              <Grid item sm md={3.9}>
                <TextField
                  type="number"
                  label="Room Index"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    }
                  }}
                
                  size="small"
                  fullWidth
                  // type="text"
                  name="room_index"
                  value={room_data.room_index}
                  onChange={(e) => change_room_data(e, 1)}
                />
              </Grid>
              <Grid item sm md={3.9}>
                <TextField
                  label="RoomTypeName"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  size="small"
                  fullWidth
                  value={room_data.room_type_name}
                  name="room_type_name"
                  onChange={(e) => change_room_data(e)}
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                label="Room Description"
                InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:`${styles.app_color}!important`,
                    },
                  },
                }}
                fullWidth
                multiline
                rows={4}
                value={room_data.room_description}
                name="room_description"
                onChange={(e) => change_room_data(e)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Room Amenities"
                InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingRight:'0px',
                    "& fieldset": {
                      borderColor:`${styles.app_color}!important`,
                    },
                  },
                }}
                size="small"
                fullWidth
                value={aminties.join(",")}
                onClick={(e)=>{
                  setDropdown((prev)=>!prev);handleClickElement(e)
                }}
                inputProps={{
                  id: "dropAmini",
                }}
                InputProps={{
                  endAdornment:<ArrowDropDownIcon/>
                }}
              />
              {dropdown&&  <div id="dropAmini" style={AmenitiesDropDown} className="scroll_none" onScroll={handleScroll}>
                {
                  
                 total_aminities.map((item,index)=>{
                    return(
                      <div id="dropAmini" style={{cursor:'pointer',background: aminity_id.some(item1 => item1 === item?.amenity_id) ? '#DFF3FF' : '',marginBottom:'0.2rem'}} onClick={()=>handle_aminities_selection(item)}>{item.amenity_name}</div>
                    )
                  })
                }
              </div>}
            </Grid>
            <Grid container>
              <Grid item md={4}>
                <span style={{ color: styles.app_color, fontSize: "16px" }}>
                  Smoking Preference
                </span>
              </Grid>
              <Grid item md={8}>
                <RadioGroup
                  value={smoking}
                  onChange={(e) => setSmoking(e.target.value)}
                >
                  <Stack direction={"row"} spacing={2}>
                    <FormControlLabel
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
                      label={<span style={{ color: styles.app_color }}>Yes</span>}
                      value="1"
                    />
                    <FormControlLabel
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
                      label={<span style={{ color: styles.app_color }}>No</span>}
                      value={0}
                    />
                  </Stack>
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid item>
              <Divider
                sx={{ border: "3px solid #DDF2FF", borderRadius: "0.5rem" }}
              />
            </Grid>
            <Grid item>
              <span style={{ fontWeight: "500" }}>Cancellation policies:</span>
            </Grid>
            <Grid item>
              {
                cancellation.map((item,index)=>{
                  return(
                    <>
                      {index!==0&&<Divider sx={{margin:'1rem 0rem',borderColor:'#003556'}}/>}
                      <Grid container rowGap={1.9}>
                        <Grid item sm={12} md={6}>
                          <FormControl fullWidth size="small">
                          <InputLabel sx={{color:'#003556'}}>Charge Type</InputLabel>
                          <Select
                            InputLabelProps={{
                              style: {
                                borderColor:`${styles.app_color}!important`,
                              },
                            }}
                            label="Charge Type"
                            fullWidth
                            name="ChargeType"
                            value={item.ChargeType}
                            onChange={(e) => change_cancellation(e,index)}
                          >
                            <MenuItem value={1}>Amount</MenuItem>
                            <MenuItem value={2}>Percentage</MenuItem>
                          </Select>
                          </FormControl>
                        </Grid>
                        <Grid item sm={12} md={6} pl={{md:2,sm:0}}>
                          <TextField
                            size="small"
                            InputLabelProps={{
                              style: {
                                color: styles.app_color,
                              },
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor:`${styles.app_color}!important`,
                                },
                              },
                            }}
                            type="number"
                            label="Charge"
                            fullWidth
                            value={item.Charge}
                            name="Charge"
                            onChange={(e) => change_cancellation(e,index)}
                          />
                        </Grid>
                        <Grid item sm={12} md={6}>
                          <TextField
                            size="small"
                            InputLabelProps={{
                              style: {
                                color: styles.app_color,
                              },
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor:`${styles.app_color}!important`,
                                },
                              },
                            }}
                            type="number"
                            label="Min Days"
                            fullWidth
                            value={item.FromDate}
                            name="FromDate"
                            onChange={(e) => change_cancellation(e,index)}
                          />
                        </Grid>
                        <Grid container columnGap={1} item sm={12} md={6} pl={{md:2,sm:0}}>
                          <Grid item sm>
                            <TextField
                              size="small"
                              InputLabelProps={{
                                style: {
                                  color: styles.app_color,
                                },
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor:`${styles.app_color}!important`,
                                  },
                                },
                              }}
                              type="number"
                              label="Max Days"
                              fullWidth
                              value={item.ToDate}
                              name="ToDate"
                              onChange={(e) => change_cancellation(e,index)}
                            />
                          </Grid>
                          { (index === cancellation.length-1 && index !== 0) && <Grid item sm={'auto'}>
                            <Button variant="contained" sx={{color:'#fff',backgroundColor:'#003556!important',textTransform:'none'}} onClick={()=>clearCancellationObject(index)}>Clear</Button>
                          </Grid>}
                        </Grid>
                      </Grid>
                    </>
                  )
                })
              }
            </Grid>
            <Grid item sm={12} md={4}>
              <Button onClick={cancellationAddMore} variant="contained" sx={{color:'#fff',backgroundColor:'#003556!important',textTransform:'none'}}>Add more</Button>
            </Grid>
            {/* <Grid item>
            <TextField
              multiline
              label="Cancellation Policy"
              InputLabelProps={{
                style: {
                  color: styles.app_color,
                },
              }}
              className={border_color.search_root}
              rows={4}
              fullWidth
            />
          </Grid> */}
            <Grid item>
              <span style={{ fontWeight: "500" }}>If Required : </span>
            </Grid>
            <Stack direction="row">
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: styles.app_color,
                      "&.Mui-checked": {
                        color: styles.app_color,
                      },
                    }}
                    checked={required.passport}
                    onClick={() =>
                      setRequired((prev) => ({
                        ...prev,
                        passport: !prev.passport,
                      }))
                    }
                  />
                }
                label={<span style={{ color: styles.app_color }}>Passport</span>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: styles.app_color,
                      "&.Mui-checked": {
                        color: styles.app_color,
                      },
                    }}
                    checked={required.pan}
                    onClick={() =>
                      setRequired((prev) => ({ ...prev, pan: !prev.pan }))
                    }
                  />
                }
                label={<span style={{ color: styles.app_color }}>Pan</span>}
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: styles.app_color,
                      "&.Mui-checked": {
                        color: styles.app_color,
                      },
                    }}
                    checked={required.categoryid}
                    onClick={() =>
                      setRequired((prev) => ({
                        ...prev,
                        categoryid: !prev.categoryid,
                      }))
                    }
                  />
                }
                label={<span style={{ color: styles.app_color }}>Catergory ID</span>}
              /> */}
            </Stack>
            <Grid item>
              <Divider
                sx={{ border: "3px solid #DDF2FF", borderRadius: "0.5rem" }}
              />
            </Grid>
            <Grid container columnGap={1} rowGap={2.5} justifyContent={'space-between'} alignItems="flex-start" maxWidth={'100% !important'}>
              {/* <Grid item xs={4} md={4}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                className={border_color.search_root}
                label="Price"
                fullWidth
                size="small"
                value={room_data.price}
                name='price'
                onChange={(e)=>change_room_data(e)}
              />
              </Grid> */}
              <Grid item xs={5.9} md={3.9}>
                <TextField
                 InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:`${styles.app_color}!important`,
                    },
                  },
                }}
                  label="Room Price"
                  type="number"
                  fullWidth
                  size="small"
                  value={room_data.room_price}
                  name="room_price"
                  onChange={(e) => change_room_data(e, 1)}
                />
              </Grid>
              <Grid item xs={5.9} md={3.9}>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="Tax"
                  fullWidth
                  size="small"
                  value={room_data.tax}
                  name="tax"
                  onChange={(e) => change_room_data(e, 1)}
                  type="number"
                />
              </Grid>
              {/* <Grid item xs={4} md={4}>
              <TextField
                InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                className={border_color.search_root}
                label="GST"
                type="number"
                fullWidth
                size="small"
              />
            </Grid> */}
              <Grid item xs={5.9} md={3.9}>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  type="number"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="CGST Amount"
                  fullWidth
                  size="small"
                  value={gst.CGSTAmount}
                  name="CGSTAmount"
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid>
              <Grid item xs={5.9} md={3.9}>
                <TextField
                  type="number"
                 InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:`${styles.app_color}!important`,
                    },
                  },
                }}
                  label="CGST Rate"
                  fullWidth
                  size="small"
                  value={gst.CGSTRate}
                  name="CGSTRate"
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid>
              {/* <Grid item xs={4} md={4}>
                <TextField
                 InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:`${styles.app_color}!important`,
                    },
                  },
                }}
                  label="Cess Amount"
                  fullWidth
                  size="small"
                  value={gst.CessAmount}
                  name="CessAmount"
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <TextField
                 InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:`${styles.app_color}!important`,
                    },
                  },
                }}
                  label="Cess Rate"
                  fullWidth
                  size="small"
                  value={gst.CessRate}
                  name="CessRate"
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid> */}
              <Grid item xs={5.9} md={3.9}>
                <TextField
                 InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                type="number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:`${styles.app_color}!important`,
                    },
                  },
                }}
                  label="SGST Amount"
                  fullWidth
                  size="small"
                  value={gst.SGSTAmount}
                  name="SGSTAmount"
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid>
              <Grid item xs={5.9} md={3.9}>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  type="number"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="SGST Rate"
                  fullWidth
                  size="small"
                  name="SGSTRate"
                  value={gst.SGSTRate}
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid>
              {/* <Grid item xs={4} md={4}>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="IGST Amount"
                  fullWidth
                  size="small"
                  value={gst.IGSTAmount}
                  name="IGSTAmount"
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid> */}
              {/* <Grid item xs={4} md={4}>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="IGST Rate"
                  fullWidth
                  size="small"
                  value={gst.IGSTRate}
                  name="IGSTRate"
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid> */}
              <Grid item xs={5.9} md={3.9}>
                <TextField
                  type="number"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="TaxableAmount"
                  fullWidth
                  size="small"
                  value={gst.TaxableAmount}
                  name="TaxableAmount"
                  onChange={(e) => change_gstdetails(e, 1)}
                />
              </Grid>
            </Grid>
            <Grid item>
              <span style={{ fontWeight: "500" }}>Charges : </span>
            </Grid>
            <Grid container columnGap={1} rowGap={2.5} justifyContent={'space-between'}>
              <Grid item md={3.9} sm={5.9}>
                <TextField
                  type="number"
                 InputLabelProps={{
                  style: {
                    color: styles.app_color,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:`${styles.app_color}!important`,
                    },
                  },
                }}
                  label="Extra Guest Charges"
                  size="small"
                  fullWidth
                  value={room_data.extra_guest_charge}
                  name="extra_guest_charge"
                  onChange={(e) => change_room_data(e, 1)}
                />
              </Grid>
              <Grid item md={3.9} sm={5.9}>
                <TextField
                  type="number"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="Child Charge"
                  size="small"
                  fullWidth
                  value={room_data.child_charge}
                  name="child_charge"
                  onChange={(e) => change_room_data(e, 1)}
                />
              </Grid>
              <Grid item md={3.9} sm={5.9}>
                <TextField
                  type="number"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="Other Charge"
                  size="small"
                  fullWidth
                  value={room_data.other_charges}
                  name="other_charges"
                  onChange={(e) => change_room_data(e, 1)}
                />
              </Grid>
              <Grid item md={3.9} sm={5.9}>
                <TextField
                  type="number"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="Discount"
                  size="small"
                  fullWidth
                  value={room_data.discount}
                  name="discount"
                  onChange={(e) => change_room_data(e, 1)}
                />
              </Grid>
              <Grid item md={3.9} sm={5.9}>
                <TextField
                  type="number"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="Published Price"
                  size="small"
                  fullWidth
                  value={room_data.published_price}
                  name="published_price"
                  onChange={(e) => change_room_data(e, 1)}
                />
              </Grid>
              <Grid item md={3.9} sm={5.9}>
                <TextField
                  type="number"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:`${styles.app_color}!important`,
                      },
                    },
                  }}
                  label="Offered Price"
                  size="small"
                  fullWidth
                  value={room_data.offered_price}
                  name="offered_price"
                  onChange={(e) => change_room_data(e, 1)}
                />
              </Grid>
            </Grid>
            <Grid item textAlign={"center"}>
              <Button
                sx={{ backgroundColor:`${styles.app_color}!important`, color: "#fff" }}
                onClick={() => add_room()}
              >
                {Object.keys(editdata).length>0?"Update":"Save"}
              </Button>
            </Grid>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Addroom;
