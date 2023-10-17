import React, { useEffect, useState } from "react";
import { adminAddCoupoun } from "../Admin/AdminStyles.jsx";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { gomainpage } from "../../../assets/styles/Flights.jsx";
import Footer from "../../../parts/Footer.jsx";
import { bestdestinationresponsive } from "../responsives/Carouselresponsive.jsx";
import bestinplace from "../../../assets/Tourpackages/bestinplaces.png";
import bestflight from "../../../assets/Tourpackages/bestflight.svg";
import besthotel from "../../../assets/Tourpackages/besthotel.svg";
import bestactivity from "../../../assets/Tourpackages/bestactivity.svg";
import InquiryModal from "../../modals/TourpackagesModals/InquiryModal.jsx";
import inquiry from "../../../assets/Tourpackages/inquiry.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { getPackagesApi, getTourPlaces } from "../../../ApiServices/ServiceApiCalls.js";
import { enqueueSnackbar } from "notistack";
import { ToursSliceAction } from "../../../store/ToursDataSlice/ToursDataSlice";
import {styles} from '../../../assets/styles/Styles_export.jsx'
const names = [
  "Paro",
  "Singapore",
  "Malaysia",
  "United States",
  "United Kingdom",
  "Paris",
  "Finland",
  "China",
];

// styles for tabs
const makestyle = makeStyles({
  tab: {
    textTransform: "none!important",
    minHeight: 'fit-content !important',
    minWidth: '8rem !important',
    maxWidth: 'fit-content !important',
    backgroundColor: '#DFF3FF !important',
    borderRadius: "0.5rem !important",
    color: `${styles.app_color} !important`
  },
  tabs: {
    "& .MuiTab-root.Mui-selected": {
      color: "White !important",
      backgroundColor: `${styles.app_color} !important`,
      borderRadius: "0.5rem",
      padding: "2px 5px 2px 5px",
    },
    "& .MuiTabs-indicator": {
      display: 'none'
    },
    '& .MuiTabs-flexContainer': {
      gap: '1.5rem',
    },
    '& .MuiTabs-scroller': {
      display: 'flex',
      alignItems: "center",
    }
  }
})

const PackagesList = () => {
  const styles = makestyle()
  const handleImageClick = async (id) => {
    try {
      const apiUrl = `${process.env.REACT_APP_BASEURL}/getPackageDetails`;
      const response = await axios.post(apiUrl, { id });
      const res = response.data;
      if (res.status) {
        navigate("/tours/packageDetails", {
          state: { packageDetails: res.data },
        });
      }
    } catch (error) {
      console.error("API call error:", error.message);
    }
  };
  const dispatch = useDispatch();

  // const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, names.length - 1));
  };

  const navigate = useNavigate();
  const toursSearchData = useSelector(
    (state) => state.toursSearchData
  );
  console.log(toursSearchData,'toursSearchData');
  const [orderOpen, setOrderOpen] = useState(false);
  function orderclose() {
    setOrderOpen(false);
  }
  const [paperheight, setPaperheight] = useState(0);

  const gomainpag = gomainpage();
  const adminAddCoupounStyles = adminAddCoupoun();
  const [activeIndex, setActiveIndex] = useState(0);
  const [resultData, setResultData] = useState([]);
  // carousel state's
  const [TabsValue, setTabsValue] = useState(0)
  const handleTabsChange = (event, newValue) => {
    setTabsValue(event.id);
    handleplaceClick(event)
  };
  const handleplaceClick = async (place) => {
    console.log(place,'place');
    const getPackagesApiData = await getPackagesApi(place.id);
    console.log(getPackagesApiData, "getPackagesApiData");
    if (getPackagesApiData.status === 1) {
      dispatch(ToursSliceAction.toursSearchData({searchResult:getPackagesApiData.response,searchData:{ id: place.place_id, place_name: place.place_name,place_image:getPackagesApiData.response[0].place_image }}));
    } else {
      enqueueSnackbar("No Packages Found for this Place");
      dispatch(ToursSliceAction.toursSearchData([]));
    }
  };

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    getTourPlacesFun()
    setTabsValue(toursSearchData?.searchData?.id)
  }, [])

  const getTourPlacesFun = async () => {
    const getTourPlacesData = await getTourPlaces();
    if (getTourPlacesData && getTourPlacesData?.length > 0) {
      let resultArray = getTourPlacesData
      resultArray.push(toursSearchData.searchData)

      resultArray.sort((a, b) => a.id === toursSearchData?.searchData?.id ? -1 : b.id === toursSearchData?.searchData?.id ? 1 : 0)
      setResultData([...new Map(resultArray?.map(item => [item?.id, item])).values()]);
    }
  };
  return (
    <>
      <div style={{ background: "white" }}>
        <div className={gomainpag.over}>
        <Grid item sx={{ display: { md: "block", xs: "block" } }}>
            <img className={adminAddCoupounStyles.go_tour_coverimage} src={toursSearchData?.searchData?.place_image} width="100%" alt="flight" />
          </Grid>
          <Container maxWidth="xl" >
            <Tabs
              value={TabsValue}
              onChange={(_, newDataValue) => {
                const selectedIdData = resultData.find(data => data.id === newDataValue);
                handleTabsChange(selectedIdData)
              }}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              className={styles.tabs}
            >
              {resultData && resultData?.length > 0 && resultData?.map((data) => {
                return (
                  <Tab key={data} value={data?.id} label={data?.place_name} className={styles.tab} />
                )
              })}
            </Tabs>
          </Container>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ gap: "10px",marginTop:"1rem" }}
          >
          </Grid>
          {toursSearchData && toursSearchData?.toursData?.length > 0 && toursSearchData?.toursData.map((mapData, index) => {
            return (
              <Grid
                key={mapData.category_name}
                container
                sx={{ marginTop: { md: "5rem", xs: "1rem" } }}
              >
                <Container
                  sx={{
                    marginTop: {
                      xs: `${paperheight - 20}px`,
                      md: `${paperheight - 100}px`,
                    },
                    // padding: { xs: "0px", md: "1rem" },
                    // maxWidth:'100% !important',
                    // marginLeft:'2.5rem',
                    // marginRight:'2.5rem',
                  }}
                  maxWidth="xl"
                >
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1rem",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        paddingLeft: {
                          md: "14px",
                          sm: "15px",
                          xs: "8px",
                          fontWeight: "500",
                          fontSize: "18px",
                        },
                      }}
                    >
                      {mapData.category_name}
                    </Typography>
                    {/* <Typography
                      variant="body1"
                      sx={{
                        paddingRight: {
                          md: "14px",
                          sm: "15px",
                          xs: "14px",
                          fontWeight: "600",
                          fontSize: "18px",
                          color: "rgb(0,53,86,1)",
                        },
                      }}
                    >
                      view all
                    </Typography> */}
                  </Grid>

                  <Grid item id="carsel">
                    <Carousel responsive={bestdestinationresponsive}>
                      {mapData?.package_details?.map((item, index) => (
                        <Card
                        sx={{borderRadius:'1.5rem',marginBottom:"0.5rem",maxHeight:'270px'}}
                          key={item.package_id}
                          onClick={() => handleImageClick(item.package_id)}
                          className={adminAddCoupounStyles.goToursListPackCard}
                        >
                          <CardContent>
                            <p className={`${adminAddCoupounStyles.headingstyle} packageNameGo`}>
                              {item.package_name}
                            </p>
                            <img
                              className={adminAddCoupounStyles.cardImageTours}
                              src={item.cover_pic}
                              alt={item.package_name}
                              // height="104"
                              // width={"250"}
                              style={{width: '100%', maxHeight: '160px',borderRadius:'10px',height:'140px'}}
                            />
                            <Typography variant="body1">
                              {item.duration}
                            </Typography>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                textAlign: "center",
                                justifyContent: "space-around",
                              }}
                            >
                              <div
                                style={{
                                  opacity: item.flights ? "inherit" : 0.4,
                                }}
                              >
                                <img src={bestflight} alt="Flights" />
                                <Typography
                                  sx={{
                                    textDecoration: item.flights
                                      ? "none"
                                      : "none",//line-through
                                    fontSize: { xs: "10px", sm: "1rem" }
                                  }}
                                >
                                  Flights
                                </Typography>
                              </div>
                              <div
                                style={{
                                  opacity: item.hotels ? "inherit" : 0.4,
                                }}
                              >
                                <img src={besthotel} alt="Hotels" />
                                <Typography
                                  sx={{
                                    textDecoration: item.hotels
                                      ? "inherit"
                                      : "none",//line-through
                                    fontSize: { xs: "10px", sm: "1rem" }
                                  }}
                                >
                                  Hotels
                                </Typography>
                              </div>
                              <div
                                style={{
                                  opacity: item.activities ? "inherit" : 0.4,
                                }}
                              >
                                <img src={bestactivity} alt="Activities" />
                                <Typography
                                  sx={{
                                    textDecoration: item.activities
                                      ? "none"
                                      : "none",//line-through
                                    fontSize: { xs: "10px", sm: "1rem" }
                                  }}
                                >
                                  Activities
                                </Typography>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </Carousel>
                  </Grid>
                </Container>
              </Grid>
            );
          })}
          <Container maxWidth="xl">
            <InquiryModal open={orderOpen} close={orderclose} />


            <Grid textAlign={"right"} style={{ marginBottom: "1rem" }}>
              <Button
                className="bg-inquiry"
                size="small"
                variant="contained"
                onClick={() => setOrderOpen(true)}
              >
                <img src={inquiry} alt="Inquiry Us" style={{ width: "18%" }} />
                Inquiry Us
              </Button>
            </Grid>
          </Container>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PackagesList;
