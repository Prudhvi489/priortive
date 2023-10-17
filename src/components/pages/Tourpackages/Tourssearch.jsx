import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  InputAdornment,
  TextField,
  Paper,
  Button,
  Menu,
  IconButton,
  ListItem,
  Link,
} from "@mui/material";
import InquiryModal from "../../modals/TourpackagesModals/InquiryModal";
import { bestplacesresponsive } from "../responsives/Carouselresponsive";
import GomytripClient from "../../../GomytripClient";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { gomainpage } from "../../../assets/styles/Flights.jsx";
import Agra from "../../../assets/images/Agra.png";
import Delhi from "../../../assets/images/Delhi.png";
import Goa from "../../../assets/images/Goa.png";
import Banglore from "../../../assets/images/Banglore.png";
import Vizag from "../../../assets/images/Vizag.png";
import Footer from "../../../parts/Footer";
import bali from "../../../assets/Tourpackages/bali.svg";
import singapore from "../../../assets/Tourpackages/singapore.svg";
import mysore from "../../../assets/Tourpackages/mysore.svg";
import paro from "../../../assets/Tourpackages/paro.svg";
import searchlocation from "../../../assets/Tourpackages/searchlocation.svg";
import plannedtour from "../../../assets/Tourpackages/plannedtour.svg";
import inquiry from "../../../assets/Tourpackages/inquiry.svg";
import tourspackage from "../../../assets/images/tourspackage.png";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  getPackagesApi,
  getTourPlaces,
  getHomeTourPlacesApi,
} from "../../../ApiServices/ServiceApiCalls";
import LuggageIcon from "@mui/icons-material/Luggage";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { ToursSliceAction } from "../../../store/ToursDataSlice/ToursDataSlice";
import { useNavigate } from "react-router-dom";
import tourpackages1 from '../../../assets/Tourpackages/tourpackages1.png';
import Mininav from "../../../parts/Mininav";
import tourssearch from "../../../assets/Tourpackages/tourssearch.png"
import {styles} from '../../../assets/styles/Styles_export'
const Tourssearch = () => {
  const loggedin = useSelector((state) => state.authentication.loggedin);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [orderOpen, setOrderOpen] = useState(false);
  function orderclose() {
    setOrderOpen(false);
  }
  // Popular Destinations
  const destinations = [
    { image: Agra, text: "Agra" },
    { image: Delhi, text: "Delhi" },
    { image: Goa, text: "Goa" },
    { image: Vizag, text: "Vizag" },
    { image: Banglore, text: "Banglore" },
    { image: Banglore, text: "Banglore" },
    { image: Banglore, text: "Banglore" },
    { image: Banglore, text: "Banglore" },
  ];
  // bestplaces
  const bestplaces = [
    { image: bali, text: "Bali" },
    { image: mysore, text: "Mysore" },
    { image: singapore, text: "Singapore" },
    { image: paro, text: "Paro" },
    { image: bali, text: "Bali" },
    { image: mysore, text: "Mysore" },
    { image: singapore, text: "Singapore" },
    { image: paro, text: "Paro" },
  ];

  const gomainpag = gomainpage();

  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const openFilter = Boolean(anchorElFilter);
  const handleClickFilter = (event) => {
    getTourPlacesFun(); //CALL ON INOUT CLICK
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };

  const [searchVal, setSearchVal] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [resultData, setResultData] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  console.log(selectedPlace, 'selectedPlace')
  const [planTour, setPlanTour] = useState("");
  const noCall = useRef(false);

  const [toursHomeData, setToursHomeData] = useState([]);

  const getHomeTourPlacesApiFun = async () => {
    const getHomeTourPlacesApiData = await getHomeTourPlacesApi();
    if (getHomeTourPlacesApiData && getHomeTourPlacesApiData?.status === 1) {
      setToursHomeData(getHomeTourPlacesApiData?.response);
    } else {
      enqueueSnackbar("No Packages found", { variant: "error" });
    }
  };

  useEffect(() => {
    if (noCall) {
      noCall.current = true;
      const delayDebounceFn = setTimeout(() => {
        getTourPlacesFun();
      }, 500);

      return () => {
        clearTimeout(delayDebounceFn);
      };
    }
  }, [searchVal]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    getHomeTourPlacesApiFun();
  }, []);

  const handleScroll = async (event) => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      const getTourPlacesData = await getTourPlaces(searchVal, pageNum);
      if (getTourPlacesData.length > 0) {
        setResultData((prevData) => [...prevData, ...getTourPlacesData]);
        setPageNum((pre) => pre + 1);
      }
    }
  };

  const getTourPlacesFun = async () => {
    const getTourPlacesData = await getTourPlaces(searchVal, pageNum);
    if (getTourPlacesData && getTourPlacesData?.length > 0) {
      setResultData(getTourPlacesData);
      setPageNum((pre) => pre + 1);
    }
    // else {
    //   setResultData([])
    // }
  };

  const handleSearchClick = async () => {
    if (selectedPlace) {
      const getPackagesApiData = await getPackagesApi(selectedPlace.id);
      console.log(getPackagesApiData, "getPackagesApiData");
      console.log(selectedPlace);
      if (getPackagesApiData.status === 1) {
        dispatch(ToursSliceAction.toursSearchData({ searchResult: getPackagesApiData.response, searchData: { id: selectedPlace.id, place_name: selectedPlace.place_name,place_image:getPackagesApiData.response[0].place_image } }));
        navigate("/tours/PackagesList");
      } else {
        enqueueSnackbar("No Packages Found for this Place");
        dispatch(ToursSliceAction.toursSearchData([]));
      }
    } else {
      enqueueSnackbar("Please Select or Enter a place to visit", { variant: "error" });
    }
  };

  const handleplaceClick = async (place) => {
    // console.log(place,'place');
    // return false
    const getPackagesApiData = await getPackagesApi(place.place_id);
    if (getPackagesApiData.status === 1) {
      dispatch(ToursSliceAction.toursSearchData({ searchResult: getPackagesApiData.response, searchData: { id: place.place_id, place_name: place.place_name,place_image:place.image } }));
      navigate("/tours/PackagesList");
    } else {
      enqueueSnackbar("No Packages Found for this Place");
      dispatch(ToursSliceAction.toursSearchData([]));
    }
  };
  const [userId, setUserId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const [tour, setTour] = useState([]);
  const paperref = useRef();

  return (
    <>
      <InquiryModal open={orderOpen} close={orderclose} />
      <div className={gomainpag.over}>
        <Grid
          container
          direction="column"
          className={gomainpag.tripspositions}
          sx={{ marginTop: { xs: "4.1rem", md: "0rem" } }}
        >
          <Grid item sx={{ display: { sm: "block", xs: "none" } }}>
            <img src={tourspackage} width="100%" height="100%" alt="flight" />
          </Grid>
          <Grid item sx={{ display: { sm: "none", xs: "block" } }}>
            <img src={tourssearch} width="100%" alt="flight" />
          </Grid>
          <Grid item textAlign={"center"} sx={{ display: { xs: "none", sm: "block" } }}>
            <Container maxWidth="xs">
              <Paper
                elevation={2}
                style={{
                  padding: "2rem",
                  marginTop: "-3.8rem",
                  borderRadius: "1rem",
                }}
              >
                <TextField
                  id="searchInputField"
                  autoComplete="off"
                  size="small"
                  placeholder="Search Place you want to visit"
                  InputLabelProps={{
                    style: {
                      color: styles.app_color,
                    },
                  }}
                  InputProps={{
                    readOnly: false,
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={searchlocation} alt="search destination" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    style: {
                      fontWeight: "600",
                      color: styles.app_color,
                    },
                  }}
                  onClick={handleClickFilter}
                  value={selectedPlace?.place_name}
                />
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorElFilter}
                  open={openFilter}
                  onClose={handleCloseFilter}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <div style={{ padding: "10px" }}>
                    <div style={{ position: "sticky", top: 0 }}>
                      <TextField
                        fullWidth
                        autoComplete="off"
                        size="small"
                        placeholder="Search Place you want to visit"
                        InputLabelProps={{
                          style: {
                            color: styles.app_color,
                          },
                        }}
                        InputProps={{
                          readOnly: false,
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={searchlocation}
                                alt="search destination"
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="start">
                              {searchVal && (
                                <IconButton
                                  onClick={() => {
                                    setSearchVal("");
                                    setPageNum(1);
                                  }}
                                >
                                  <BackspaceIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          style: {
                            fontWeight: "600",
                            color: styles.app_color,
                          },
                        }}
                        value={searchVal}
                        onChange={(e) => {
                          setSearchVal(e.target.value);
                          setPageNum(1);
                        }}
                        autoFocus
                      />
                    </div>

                    <div
                      style={{
                        overflowY: "scroll",
                        height: 350,
                        padding: "0",
                      }}
                      onScroll={(e) => handleScroll(e)}
                    >
                      <List>
                        {resultData?.map((data) => (
                          <ListItem
                            disablePadding
                            onClick={() => {
                              setSelectedPlace(data);
                              handleCloseFilter();
                            }}
                          >
                            <ListItemButton
                              selected={data.id === selectedPlace.id}
                            >
                              <ListItemIcon>
                                <LuggageIcon sx={{ color: styles.app_color }} />{" "}
                              </ListItemIcon>
                              <ListItemText primary={data?.place_name} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  </div>
                </Menu>
              </Paper>
            </Container>
          </Grid>
          <Grid item textAlign={"center"} sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              onClick={() => handleSearchClick()}
              variant="contained"
              style={{ background:styles.app_color, marginTop: "-1.8rem" }}
            >
              Search
            </Button>
          </Grid>
          {/* mobile responsive */}
          <Grid item className={gomainpag.tripscard}>
            <Container maxWidth="xl">
              <Grid item>
                <Paper
                  ref={paperref}
                  sx={{
                    borderRadius: "1rem",
                    paddingBottom: "1rem!important",
                    zIndex: 9999,
                    background: "transparent",
                    marginTop: "-1.8rem",

                  }}
                  elevation={0}
                >
                  {/* mini nav bar */}
                  <Paper className="toursnav"
                    sx={{
                      borderRadius: "1rem",
                      display: {
                        xs: "block",
                        sm: "none",
                        // margin: "2.5rem 0rem",
                      },
                    }}
                  >
                    <Mininav />
                  </Paper>
                  {/* flight search */}
                  {/* <Paper
                    sx={{
                      borderRadius: "1rem",
                      paddingBottom: { md: 3, xs: 0 },
                    }}
                  > */}
                  <Grid item textAlign={"center"} sx={{ display: { xs: "block", sm: "none" }}} className="search">
                    <Container maxWidth="xl">
                      <Paper
                        elevation={2}
                        style={{
                          padding: "1rem",
                          borderRadius: "1rem",
                          width: "100%",
                          marginLeft: "-15px",
                        }}
                      >
                        <TextField
                          id="searchInputField"
                          autoComplete="off"
                          size="small"
                          fullWidth
                          placeholder="Search Place you want to visit"
                          InputLabelProps={{
                            style: {
                              color: styles.app_color,
                            },
                          }}
                          InputProps={{
                            readOnly: false,
                            startAdornment: (
                              <InputAdornment position="start">
                                <img src={searchlocation} alt="search destination" />
                              </InputAdornment>
                            ),
                          }}
                          inputProps={{
                            style: {
                              fontWeight: "600",
                              color: styles.app_color,
                            },
                          }}
                          onClick={handleClickFilter}
                          value={selectedPlace?.place_name}
                        />
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorElFilter}
                          open={openFilter}
                          onClose={handleCloseFilter}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <div style={{ padding: "10px" }}>
                            <div style={{ position: "sticky", top: 0 }}>
                              <TextField
                                fullWidth
                                autoComplete="off"
                                size="small"
                                placeholder="Search Place you want to visit"
                                InputLabelProps={{
                                  style: {
                                    color: styles.app_color,
                                  },
                                }}
                                InputProps={{
                                  readOnly: false,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <img
                                        src={searchlocation}
                                        alt="search destination"
                                      />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="start">
                                      {searchVal && (
                                        <IconButton
                                          onClick={() => {
                                            setSearchVal("");
                                            setPageNum(1);
                                          }}
                                        >
                                          <BackspaceIcon />
                                        </IconButton>
                                      )}
                                    </InputAdornment>
                                  ),
                                }}
                                inputProps={{
                                  style: {
                                    fontWeight: "600",
                                    color: styles.app_color,
                                  },
                                }}
                                value={searchVal}
                                onChange={(e) => {
                                  setSearchVal(e.target.value);
                                  setPageNum(1);
                                }}
                                autoFocus
                              />
                            </div>

                            <div
                              style={{
                                overflowY: "scroll",
                                height: 350,
                                padding: "0",
                              }}
                              onScroll={(e) => handleScroll(e)}
                            >
                              <List>
                                {resultData?.map((data) => (
                                  <ListItem
                                    disablePadding
                                    onClick={() => {
                                      setSelectedPlace(data);
                                      handleCloseFilter();
                                    }}
                                  >
                                    <ListItemButton
                                      selected={data.id === selectedPlace.id}
                                    >
                                      <ListItemIcon>
                                        <LuggageIcon sx={{ color: styles.app_color }} />{" "}
                                      </ListItemIcon>
                                      <ListItemText primary={data?.place_name} />
                                    </ListItemButton>
                                  </ListItem>
                                ))}
                              </List>
                            </div>
                          </div>
                        </Menu>
                        <Grid item textAlign={"center"} sx={{ display: { xs: "block", sm: "none" } }}>
                          <Button
                            onClick={() => handleSearchClick()}
                            variant="contained"
                            sx={{ background: styles.app_color, marginTop: "1rem", width: "100%" }}
                          >
                            Search
                          </Button>
                        </Grid>
                      </Paper>
                    </Container>

                  </Grid>
                  {/* </Paper> */}
                </Paper>
              </Grid>
            </Container>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: {xs:"16rem", sm:"2rem"}}}>
          {/* Best place to visit */}
          {toursHomeData &&
            toursHomeData?.length > 0 &&
            toursHomeData?.map((tData, index) => {
              return (
                <Grid
                  key={tData.category_name}
                  contianer
                  style={{ marginTop: "2rem" }}
                >
                  <Container maxWidth="xl" >
                    <Grid item>
                      <Typography
                        sx={{color:`${styles.app_color}!important`}}
                        variant="p"
                        fontWeight={"500"}
                        fontSize={18}
                      >
                        {tData.category_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {/* <Container> */}
                      <Carousel responsive={bestplacesresponsive}>
                        {tData?.place_details.map((cItem, index) => (
                          <div key={cItem.place_id} className="relativeposition">
                            <img
                              onClick={() => handleplaceClick(cItem)}
                              className="cursor-p1"
                              src={cItem.image}
                              alt={cItem.place_name}
                              // width={280}
                              // height={280}
                              style={{ borderRadius: "15px",objectFit:'cover'}}
                            />
                            <Typography textAlign={"center"} variant="body1" className="absoluteposition">
                              {cItem.place_name}
                            </Typography>
                          </div>
                        ))}
                      </Carousel>
                    </Grid>
                  </Container>
                </Grid>
              );
            })}

          {/* Popular destinations */}
          {loggedin && <Grid
            className="d-nonee"
            contianer
            style={{ marginTop: "2rem", marginBottom: "1rem" }}
            spacing={2}
          >
            <Container maxWidth="xl">
              <Grid item>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: {md:"0px",xs: "10px"},
                    paddingRight: {md:"0px",xs: "10px"},
                  }}
                >
                  <Grid item>
                    <div>
                      <Button
                        className="bg-inquiry"
                        size="small"
                        variant="contained"
                        onClick={() => navigate("/tours/plannedtours")}
                      >
                        <img
                          src={plannedtour}
                          alt="Planned Tour"
                          style={{ width: "15%" }}
                        />{" "}
                        Planned Tours
                      </Button>
                    </div>
                  </Grid>
                  <Grid item>
                    <Button
                      className="bg-inquiry"
                      size="small"
                      variant="contained"
                      onClick={() => setOrderOpen(true)}
                    >
                      <img
                        src={inquiry}
                        alt="Inquiry Us"
                        style={{ width: "18%" }}
                      />{" "}
                      Inquiry Us
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Grid>}
        </Grid>
        <Footer />
      </div>
    </>
  );
};
export default Tourssearch;