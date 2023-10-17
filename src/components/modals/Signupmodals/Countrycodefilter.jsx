import {
  Dialog,
  DialogContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
const DTOKEN = process.env.REACT_APP_DEFAULT_TOKEN;
const Apibaseurl=process.env.REACT_APP_BASEURL;

const Countrycodefilter = (props) => {
  const open = props.open;
  const onclose = props.onclose;
  const selectedvalue = props.selectedvalue;
  const [countriesdata, setCountriesdata] = useState("");
  const [search, setSearch] = useState("");
  const handleclose = () => {
    onclose();
  };

  useEffect(() => {
    const fetchcountries = async () => {
      try {
      if(props.open){
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
        //  console.log(countries,"countries data")
        if(data.status)
        setCountriesdata(countries);
      }
      } catch (err) {
        console.log(err);
      }
    };
    fetchcountries();
  
  }, [props]);
  // console.log(countriesdata,"out")

  //  countriesdata!=""&& countriesdata.map(item=>{console.log(item.country_flag,item.country_name,"maooed")})
  function handleListItemClick(val) {
    console.log(val,"haj")
    selectedvalue(val);
    
    onclose();
  }
  // console.log(countriesdata,"ou")
  let contdata =
    countriesdata !== "" &&
    countriesdata
      .filter((country) =>
        country.country_name.toLowerCase().includes(search.toLowerCase())
      )
      .map((item, index) => {
        return (
          <ListItem onClick={()=>handleListItemClick(item)} key={index} sx={{cursor:'pointer'}}>
            <ListItemAvatar sx={{minWidth:'30px'}}>
              <img
                src={item.country_flag}
                alt="flags"
                height="20px"
                width="20px"
              />
            </ListItemAvatar>
            <ListItemText className="mto" primary={item.country_name} />
            <span>({item.code})</span>
            {/* <br />
            <br /> */}
          </ListItem>
        );
      });
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleclose}
        PaperProps={{
          sx: {
            position: "fixed",
            top: "15%",
            left: !props.right ? `${props.left}%` : '',
            right: props.right ? `${props.right}%` : '',
            m: 0,
            minHeight: 500,
            maxHeight: 500,
            width: 300,
            maxWidth:275,
            padding:'0rem 0.8rem',
            // "&::-webkit-scrollbar":{
            //   display:'none'
            // },
          },
        }}
      >
        <Grid container justifyContent={"end"} mt={1}>
          <Grid item md={1}><CloseIcon onClick ={handleclose}/></Grid>
        </Grid>
        <TextField
         autoComplete="off"
          variant="outlined"
          placeholder="Search"
          size="small"
          sx={{ marginTop: "3%", marginRight: "1%", marginLeft: "1%", "& .MuiOutlinedInput-root":{paddingLeft:'0px', '& fieldset':{borderColor:'rgba(0, 53, 86, 1)'}, '&.Mui-focused fieldset':{borderColor:'rgba(0, 53, 86, 1)'}}, '& .MuiInputBase-input::placeholder':{color:'RGB(0, 53, 86)',opacity:'1'} }}
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <List sx={{ pt: 1 ,overflow:'auto', "&::-webkit-scrollbar":{display:'none'},}}>{contdata}</List>
      </Dialog>
    </div>
  );
};

export default Countrycodefilter;
