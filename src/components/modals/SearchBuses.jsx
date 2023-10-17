import { Dialog, TextField, InputAdornment, Grid, Container, DialogContent, DialogTitle, ListItem, ListItemText, Stack } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import search from "../../assets/images/search.svg";
import axios from "axios";
const SearchBuses = React.memo((props) => {
  const Apibaseurl = process.env.REACT_APP_BASEURL
  const { open, close, sources } = props;
  const closesearch = () => {
    close();
    setPage(1)
    setData([])
  };
  const [find, setFind] = useState("")
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [popularCities, setPopularCities] = useState([])
  const [recent_search, setRecent_search] = useState(false)
  //  fetching the airport list data
  const fetchData = async () => {
    // alert("fetch")
    setRecent_search(false)
    const response = await axios.post(`${process.env.REACT_APP_BASEURL}/busCitySearch`, { "search": find.trim(), "pageNumber": page, "pageSize": 40 });
    setData((prevData) => [...prevData, ...response?.data?.data?.rows]);
    setPage((prevPage) => prevPage + 1);

  };
  const searchhandler = async (event) => {
    // alert("search")
    setRecent_search(false)
    setFind(event.target.value.trim())
    if (event.target.value != "" &&event.target.value.length >= 3) {

      setPage(1)
      const res = await axios.post(`${process.env.REACT_APP_BASEURL}/busCitySearch`, { "search": event?.target?.value?.trim(), "pageNumber": 1, "pageSize": 40 });
      // console.log(res.data.data.doc)
      setData(res.data.data?.rows)
    }
    else {
      setData([])
      recentsearch()//IF NO SEARCH PARAM THEN RECENT SEARCH 
    }
  }
  const recentsearch = async () => {
    const res = await axios.post(`${Apibaseurl}/busRecentSearch`, { "user_id": localStorage.getItem("userid") });
    if (res.data.data.length ==0) {
      fetchData()
    }
    else {
      setRecent_search(true)
      // console.log(res?.data?.data?.filter((filData)=>filData?.travel_type ==sources))
      setData(res?.data?.data?.filter((filData)=>filData?.travel_type ==sources))
    }
  }
  // getPopularCities 
  const getPopularCitiesSearch = async () => {
    const res = await axios.post(`${Apibaseurl}/getPopularCities`);
    if (res.data.status === 1) {
      setPopularCities(res.data.data.popularCities)
    } else {
      setPopularCities([])
    }
  }
  useEffect(() => {
    if (props.open) {
      getPopularCitiesSearch()
    }
    if (props.open) {
      const userid = localStorage.getItem("userid")
      if (userid !== null) {
        recentsearch();
        return;
      }
      fetchData()
      return;

    }


  }, [props.open])
  const handleScroll = async (event) => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight &&Boolean(find)) {
      fetchData();
    }
  };
  let recentSearches = JSON.parse(localStorage.getItem('busRecentSearch')) || []
  let aa = [...new Set(recentSearches)]
  const handleairportselection = (item) => {
    let searches = [...recentSearches]


    searches.push(item)

    let selectedObj = {
      city_id:item.city_id,
      city_name :item.city_name
    }

    localStorage.setItem('busRecentSearch', JSON.stringify(searches))
    props.bus(selectedObj, sources)
    setData([])
    setPage(1)
    setFind("")
    close()

  }
  let airportsdata = data !== "" &&
    data?.map((item, index) => {
      // console.log(item,"airport")
      return (
        // <ListItem onClick={handleairportselection(item)} key={index}>
        //   <ListItemText>{item.airport_name}</ListItemText><br/>
        //   <ListItemText>{item.city_name}</ListItemText>
        // </ListItem>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => handleairportselection(item)}>
          <Stack key={item.id} mt={1} pl={2}>

            <div style={{ fontSize: '14px' }}>{item.city_name}</div>
          </Stack>
          <span>{item.city_code}</span>
        </div>
      )
    })

  // let businfo = bussearchdata.map((item)=>{
  //     return(
  //       // <ListItem onClick={handleairportselection(item)} key={index}>
  //       //   <ListItemText>{item.airport_name}</ListItemText><br/>
  //       //   <ListItemText>{item.city_name}</ListItemText>
  //       // </ListItem>
  //       <div style={{display:'flex', flexDirection:"column",alignItems:'start',justifyContent:'space-between'}} >
  //       <Grid sx={{backgroundColor:'#DFF3FF',height:'36px', width:'100%'}} p={1}>
  //       <p style={{color:'#003556',fontSize:'16px'}}>{item}</p>
  //       </Grid>


  //       {busdata[item].map((items,index)=>(

  //           <Stack  key={index} pl={1} >

  //           <div style={{fontSize:'14px',fontWeight:400,margin:'5px'}} onClick={()=>handleairportselection(items)}>{items.city_name},{items.state}</div>

  //         </Stack>
  //       ))
  //     }

  //       </div>
  //     )
  //   })
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
          left: {sx:0,md:sources ===1?"3%":"36%",lg:sources ===1?"5%":"38%",xl:sources ===1?"18%":"44%"},//"10%",//sources ===1?"5%":"35%",
          minHeight: 300,
          maxHeight: 500,
          width: 270,
        },
      }}

    >
      <DialogTitle sx={{ padding: '0' }}>
        <Grid item sx={{ padding: '0.5rem' }}>
          <TextField
            placeholder={sources == 1 ? "From" : sources == 2 && "To"}
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

      </DialogTitle>

      <DialogContent
        sx={{
          overflowY: "scroll",
          height: 350,
          padding: '0'
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
        <Grid container direction={"column"} rowSpacing={0.5} columnSpacing={0} mt={0.5}   >

          {recent_search && <Grid item sx={{ backgroundColor: '#DFF3FF', height: '36px' }}>
            <span style={{ color: '#003556', fontSize: '12px', marginLeft: '1rem', }}>Recent Search</span>
          </Grid>}
          {airportsdata}
          {/* POPULAR SEARCHES */}
          {popularCities?.length > 0 && <Grid item sx={{ backgroundColor: '#DFF3FF', height: '36px' }}>
            <span style={{ color: '#003556', fontSize: '12px', marginLeft: '1rem', }}>Popular Searches</span>

            {popularCities?.map((popData) => (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => handleairportselection(popData)}>
                <Stack key={popData.city_id} mt={1} pl={2}>
                  <div style={{ fontSize: '14px' }}>{popData.city_name}</div>
                </Stack>
                {/* <span>{popData.city_code}</span> */}
              </div>
            ))}

          </Grid>

          }


        </Grid>
      </DialogContent>
    </Dialog>
  );
});


export default SearchBuses;



