import {
  Box,
  Grid,
  Stack,
  Divider,
  Paper,
  Dialog,
  Button,
  TextField,
  InputAdornment,
  Rating,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { map_modal, hotels_list } from "../../../assets/styles/Hotelstyles";
import sunsetpool from "../../../assets/Hotelimages/sunsetpool.png";
import Ratingstar from "../../../assets/Hotelimages/Ratingstar.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerF,
  InfoWindow,
  OverlayView,
  DistanceMatrixService
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import Markerwithlabel from "markerwithlabel";
import direction from "../../../assets/Hotelimages/direction.png";
import maphotel from '../../../assets/Hotelimages/maphotel.png'
import unselectedhotel from '../../../assets/Hotelimages/unselectedhotel.png'

const Mapview = (props) => {
  const { mapopen, mapclose, handlemapbook } = props;
  let hotelresult = useSelector((state) => state.hotel_data.hotelresult);

  const [center, setCenter] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [hotel_data, setHotel_data] = useState({});

  useEffect(() => {
    if(hotelresult.Hotels.length>0){
      setCenter((prev) => ({
        ...prev,
        lat: parseFloat(hotelresult.Hotels[0].latitude),
        lng: parseFloat(hotelresult.Hotels[0].longitude),
      }));
      setHotel_data(hotelresult.Hotels[0]);
    }
  }, [mapopen]);

  const handlemapclose = () => {
    mapclose();
  };
  const hotelslist_style = hotels_list();

  const bookhotel = () => {
    handlemapbook(hotel_data);
    mapclose();
  };
  // const data={lat:16.989065,lng:82.247467}
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAnHaUFxUzAwY8qSBjhWdtJtESXzACyoh4",
  });
  const loc={
    lat:17.0125289,
    lng: 82.2474542
  }
  const sendmarkerdata = async(data) => {
    // destinations= [{lat:1.296788, lng:103.778961}]
    // origins= [{lng:103.780267, lat:1.291692}]
    setHotel_data(data);
  };
  
  const googleMap = (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      <>
    
        {hotelresult.Hotels.map((hotel, hotel_index) => {
          let data = {
            lat: parseFloat(hotel.latitude),
            lng: parseFloat(hotel.longitude),
          };
          // console.log(hotel,"maphtoe")
          return (
          <>
          {/* <MarkerF position={data}> */}
           <OverlayView
            position={data}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
           
          >
            {/* <div > */}
            <div style={{position:'relative'}} onClick={() => sendmarkerdata(hotel)} >
            <Grid container columnSpacing={1} alignItems={'center'} style={{ width:'120px',backgroundColor:hotel.hotel_code===hotel_data.hotel_code?'#003556':'#fff',borderRadius:'0.5rem',marginBottom:'3rem',padding:'0.2rem 1rem 0.2rem 0.5rem',border:"1px solid #003556"}}>
              <Grid item >
                <img src={hotel.hotel_code===hotel_data.hotel_code?unselectedhotel:maphotel}/>
              </Grid>
              <Grid item sx={{color:hotel.hotel_code===hotel_data.hotel_code?'#fff':'#003556'}}>{`${hotel?.price?.CurrencyCode} ${hotel.price?.PublishedPriceRoundedOff}`}</Grid>
            </Grid>
            <div style={{position:'absolute',top:'100%',left:'3.5vw',transform:'translateX(-50%)',width:0,height:0,borderLeft:'10px solid transparent',borderRight:'10px solid transparent',borderTop:'10px solid #003556'}}></div>
            
            </div>
          </OverlayView>
          {/* </MarkerF> */}
          {/* <MarkerF icon={maphotel} position={data} onClick={() => sendmarkerdata(hotel)}  > </MarkerF> */}
          </>
            // <Marker position={data} onClick={() => sendmarkerdata(hotel)} ></Marker>
            //  icon={direction}
          );
        })}
      </>
    </GoogleMap>
  );

  
  return (
    <div>
      <Dialog
        open={mapopen}
        onClose={mapclose}
        fullWidth
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            height: "80vh",
            mixHeight: "80vh",
            borderRadius: "15px",
            padding: "0rem",
          },
        }}
      >
        {/* <>{googleMap}</> */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          { mapopen&&<div style={{height:'100%',overflow:"hidden",padding:0}} > {googleMap}</div>

}  
 
          <div style={{ position: "absolute", top: "2%", right: "2%" }}>
            <Grid item textAlign={"right"}>
              <CancelIcon
                sx={{ color: "#003556" }}
                onClick={() => handlemapclose()}
              />
            </Grid>
            {/* <Grid item textAlign={"right"} sx={{ marginRight: "2%" }}>
              <TextField
                placeholder="Search for Location / Hotel "
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                  style: {
                    background: "white",
                  },
                }}
                size="small"
              />
            </Grid> */}
          </div>
          <Paper
            sx={{
              position: "absolute",
              bottom: "0%",
              width: "100%",
              margin: "1rem",
              borderRadius: "0.5rem",
              width: {md:"50%",xs:'90%'},
            }}
          >
            <Grid container>
              <Grid
                item
                md={3.7}
                sm={3.7}
                xs={4.5}
                sx={{ padding: "1rem", height: "9rem" }}
                textAlign={"center"}
                alignSelf={"center"}
              >
                <img
                  src={hotel_data.hotel_picture}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Grid>
              <Grid
                item
                container
                md={8.3}
                sm={8.3}
                xs={7.5}
                direction="column"
                pt={1}
                spacing={1}
              >
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "100% !important ",
                    fontSize:{md:'default',xs:'12px'},
                  }}
                >
                  <div className={hotelslist_style.hotelname}>
                    {hotel_data.hotel_name}{" "}
                  </div>
                  {/* <div className={hotelslist_style.offer}>20% OFF</div> */}
                </Grid>
                <Grid item container spacing={0.5} flexWrap={{sm:'default',xs:'nowrap'}}>
                  {/* <Grid item>
                    <span
                      // style={{
                      //   fontSize: "14px",
                      //   fontWeight: 500,
                      //   color: "#003556",
                      //   fontFamily: "poppins",
                      // }}
                      className="hotelRating"
                    >
                     {hotel_data?.star_rating}
                    </span>
                  </Grid> */}
                  <Grid item className="hotelRatingStars">
                    <Rating value={hotel_data?.star_rating} readOnly/>
                  </Grid>
                  <Grid item>
                    <span
                      className="hotelRating"
                    >
                      {`(${hotel_data?.star_rating} Star Hotel)`}
                    </span>
                  </Grid>
                </Grid>
                <Grid item sx={{ maxWidth: "100% !important" }}>
                  <div
                    // style={{
                    //   fontSize: "14px",
                    //   color: "#303030",
                    //   textOverflow: "ellipsis",
                    //   whiteSpace: "nowrap",
                    //   overflow: "hidden",
                    // }}
                    className="hotelDescription"
                  >
                    {hotel_data.hotel_address === ""
                      ? hotel_data.address.AddressLine.join("")
                      : hotel_data.hotel_address}
                  </div>
                </Grid>
                <Grid item maxWidth={'100% !important'}>
                  <Stack direction="row" spacing={0.5}>
                    <LocationOnIcon sx={{ fontSize: "20px" }} />
                    <span
                      // style={{
                      //   fontSize: "14px",
                      //   color: "#303030",
                      //   textOverflow: "ellipsis",
                      // }}
                      className="hotelLocation"
                    >
                      {/* 1.53 km from Goa City Center */}
                    </span>
                  </Stack>
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "0px!important",
                  }}
                >
                  <Grid sx={{ fontSize: {sm:"14px",xs:'12px'}, paddingTop: "8px" }}>
                    <span
                      style={{ color: "#003556", fontWeight: "500" }}
                    >{`${hotel_data?.price?.CurrencyCode} ${hotel_data?.price?.PublishedPriceRoundedOff}`}</span>
                  </Grid>
                  <button
                    // style={{
                    //   border: "none",
                    //   backgroundColor: "#003556",
                    //   color: "#fff",
                    //   fontWeight: "500",
                    //   fontSize: "14px",
                    //   width: "117.44px",
                    //   height: "42px",
                    //   borderBottomRightRadius: "0.5rem",
                    // }}
                    className="hotelMapBook_now"
                    onClick={() => bookhotel()}
                  >
                    Book Now
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Button
            disableRipple
            className={hotelslist_style.mapsbtn}
            startIcon={<FormatListBulletedIcon />}
            onClick={mapclose}
          >
            List View
          </Button>

        </div>
      </Dialog>
    </div>
  );
};

export default Mapview;
