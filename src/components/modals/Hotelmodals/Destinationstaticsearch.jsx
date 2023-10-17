import {
  Dialog,
  List,
  Stack,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  DialogTitle,
  DialogContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { hoteldataActions } from "../../../store/Hotelslices.jsx/HotelDataslice";
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MySnackbar from "../Signupmodals/Snackbar";
import {styles} from '../../../assets/styles/Styles_export'
const DTOKEN = process.env.REACT_APP_DEFAULT_TOKEN;
const baseurl = process.env.REACT_APP_BASEURL;
const Destinationstaticsearch = React.memo((props) => {
  const type = props.search_data.SearchType;
  const open = props.open;
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const onclose = props.onclose;
  const selectedvalue = props.destination_type;
  const [find, setFind] = useState("")
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [rescount,setRescount]=useState(0)
  const [recent_search, setRecent_search] = useState(true)
  const [isloading,setIsloading]=useState(false)
  const handleclose = () => {
    setFind("")
    setData("");
    onclose();
  };
  // progress state's
  const [progress, setProgress] = useState(false)
  const fetchcountries = async (data) => {
    console.log(data,"fetch countries")
    setRecent_search(false)
    if(find===""){
      return
    }
    setProgress(true)
   
    try {
      const res = await axios.post(
        `${baseurl}/GetDestinationSearchStaticData`,
        { "name": find, "pageNumber": data, "pageSize": 30 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.status) {
        const data = await res?.data.data.sortedResults;
        setData((prev) => ([...prev, ...data]));
        setRescount(res?.data?.data?.totalCount)
      }
    }
    catch (error) {
      setSnackopen(true);
      setSnackmessage(error);
      // alert(error)
    }
    setProgress(false)
  };

  const recentsearch = async () => {
    setProgress(true)
    const res = await axios.post(`${baseurl}/getHotelRecentSearch`, { "user_id": localStorage.getItem("userid") ?? "" });
    if (res.data.status) {
      setData((prev) => ([...res.data.data]));
    }
    else {
      setRecent_search(true)
      setData(res.data.data)
    }
    setProgress(false)
  }
  useEffect(() => {
    if (props.open) {
      const userid = localStorage.getItem("userid")
      if (userid !== null) {
        recentsearch();
        return;
      }
      fetchcountries();
      return;

    }
  }, [props.open])
  //  debounce search api call
  const searchhandler = async (event) => {
    if(find===""){
      return;
    }
    setProgress(true);
    try {
      const res = await axios.post(`${baseurl}/GetDestinationSearchStaticData`, { "name": find, "pageNumber": 1, "pageSize": 30 });
      if (res.data.status) {
        setData(res.data?.data?.sortedResults)
      }
      else {
        setSnackopen(true);
        setSnackmessage(res.data.message);
        // alert(res.data.message)
      }
    }
    catch (error) {
      setSnackopen(true);
      setSnackmessage(error);
      // alert(error)
    }
    setProgress(false)
  }
  const initialRenderRef = useRef(true)
  // makeapiall for search

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return
    }
    const delayDebounceFn = setTimeout(() => {
      searchhandler()
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [find])

  const handleScroll = async (event) => {
    // alert("data")
    const element = event.target;
    const scrollTolerance = 10; // Tolerance value for scroll calculation
    const scrollDifference =
      element.scrollHeight - element.scrollTop - element.clientHeight;
      console.log(data.length<rescount,"count")
    if (scrollDifference <= scrollTolerance&&!isloading) {
      setIsloading(true);
      setPage((prevPage) => prevPage + 1);
      // alert("data")
      console.log(data.length)
      console.log(page,"page")
      await fetchcountries(page+1);
      setIsloading(false);
    }
  };
  function handleListItemClick(val) {
    selectedvalue(val);
    setData([])
    setPage(1)
    setFind("")
    handleclose()
  }
  let contdata =
    (data !== ""&&data.length>0)?
    data.map((item, index) => {
      // console.log(item,"sdlkjf")
      return (<>
        {/* // <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',}} onClick={()=>handleListItemClick(item)}> */}
        <Stack direction={'row'} width={'100%'} spacing={2} key={index} mt={1} onClick={() => handleListItemClick(item)}>
          {/* <div > */}
          <span>{item.type === "1" ? <LocationOnIcon /> : <HotelIcon />}</span>
          {/* <span style={{fontSize:'14px',fontWeight:500}}>{`${item.type===1?item.city_name:item.hotel_name},${item.type===2?item.city_name:""}`}</span> */}
          {
            item.type === "1" ? <span style={{ fontSize: '14px', fontWeight: 500 }}>{`${item.city_name}, ${item.country}`}</span> : <span style={{ fontSize: '14px', fontWeight: 500 }}>{`${item.hotel_name}, ${item.city_name}, ${item.country}`}</span>
          }
          {/* </div> */}
          {/* <div style={{fontSize:'12px'}}>{type===1?item.country_name:item.city_name}</div> */}
        </Stack>
        {/* <span>{item.country_code}</span> */}
        {/* </div> */}
      </>
      );
    }):<h4>Enter any search data</h4>;
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Dialog
        open={open}
        onClose={handleclose}
        PaperProps={{
          sx: {
            position: "fixed",
            top: "15%",
            left: `${props.left}%`,
            // m: 0,
            minHeight: 300,
            maxHeight: 500,
            width: 250,
            "@media (max-width:899px)": {
              position: 'inherit'
            },
            borderRadius: '1rem',
          },
        }}
      >
        <DialogTitle sx={{ padding: '0rem' }}>
          <Grid item sx={{ padding: '0.9rem' }}> 
          <TextField
            autoComplete="off"
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ marginTop: "3%", marginRight: "1%", marginLeft: "1%", paddingLeft: '0px', "& .MuiOutlinedInput-root": { paddingLeft: '0px' } }}
            value={find}
            onChange={
              (e) => {
                setFind(e.target.value)
                setRecent_search(false)
                setPage(1)
              }
            }
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          </Grid>
          {recent_search && <Grid item sx={{ backgroundColor: '#DFF3FF', height: '36px' }}>
            <span style={{ color: styles.app_color, fontSize: '12px', marginLeft: '1rem', }}>Recent Search</span>
          </Grid>}
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: "scroll",
            height: 300,
            overflowX: 'hidden'

          }}
          onScroll={handleScroll}
          className="scroll_none"
        >
          <Grid container direction={"column"} rowSpacing={0.5} columnSpacing={0} mt={0.5}>
            {/* {contdata} */}
            {!progress ? contdata :
              <Grid height={'250px'} container justifyContent={'center'} alignItems={'center'}>
                <CircularProgress />
              </Grid>
            }
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default Destinationstaticsearch;
