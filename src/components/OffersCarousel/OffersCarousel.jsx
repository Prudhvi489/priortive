import React, { useEffect, useState } from "react";
import { gomainpage } from "../../assets/styles/Flights.jsx";
import {
    Card,
    CardContent,
    CardMedia,
    Box,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
    Container,
  } from "@mui/material";
import Carousel from "react-multi-carousel";
import { flightsresponsive } from "../pages/responsives/Carouselresponsive.jsx";
import gomytripclient from "../../GomytripClient.js";
import {useNavigate,useLocation} from 'react-router-dom'
import CheckCopounTerms from "../modals/CheckCopounTerms.jsx";
const OffersCarousel = (props) => {
const {paperheight}=props
  const location = useLocation()
  const navigate  = useNavigate()
  // navigate(`/${location.pathname.split('/')[1]}/FlightDetails`)
    let locationPath = location.pathname.split('/')[1]
    let moduleType = locationPath=='buses'?3:locationPath=='Hotels'||locationPath=='hotels'?2:1
  const gomainpag = gomainpage();
  const [coupondData,setCoupondData] = useState([])//([1,2,3,4,5,6])
  const [couponterms,setCouponterms]=useState(false)
  const [terms,setTerms]=useState("")
  const getAdminCreatedOffers =()=>{
    let payloadToSend ={
      "user_id":localStorage.getItem('userid')??'',
     "module": moduleType
    }
    gomytripclient.post('userOverallCoupons',payloadToSend
    ).then((res=>{
      // console.log(res)
      if(res.data.status ===1){
        setCoupondData(res.data.data.coupons)
      }else{
        setCoupondData([])
      }
    })).catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getAdminCreatedOffers()
  },[location.pathname])

  return (
    <>
    <CheckCopounTerms open={couponterms} close={()=>setCouponterms(false)} data={terms}/>
     <Grid container>
          <Container
            sx={{
              marginTop: {
                xs: `${paperheight - 20}px`,
                md: `${paperheight - 100}px`,
              },
              padding: { xs: "0px",/* md: "1rem" */ },
            }}
            maxWidth="xl"
          >
            <Box
              className={gomainpag.flightscarousel}
              boxShadow={3}
              sx={{ boxShadow: { md: "3", sm: "3", xs: "0" }, background:'white ' }}
            >
              <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body1"
                  sx={{
                    paddingLeft: {
                      md: "14px",
                      sm: "15px",
                      xs: "8px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  All offers
                </Typography>
               {coupondData.length>5&& <Typography
                  variant="body1"
                  sx={{
                    paddingRight: {
                      md: "14px",
                      sm: "15px",
                      xs: "14px",
                      fontWeight: "bold",
                    },
                  }}
                  onClick={()=>navigate("/alloffers",{state:{coupons:coupondData,path:locationPath}})}
                >
                  view all
                </Typography>}
              </Grid>
              <Grid item id="carsel">
      <Box className="mtcard" sx={{marginBottom:"20px"}}>
        <Carousel responsive={flightsresponsive}>
          {coupondData?.map((coupItem, index) => {
            return (
              <Box
                className={gomainpag.cardpaper}
                key={coupItem}
                ml={0.5}
                bgcolor={"white"}
                sx={{cursor:'pointer'}}
              >
                <Grid container>
                  <Grid item md={4} sm={4} xs={5}>
                    <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
                      <CardMedia
                        component="img"
                        height="80px"
                        width="100px"
                        image={coupItem?.image}
                        alt="green iguana"
                        sx={{height:{sm:'80px',xs:'60px'}}}
                      />
                      <CardContent className={gomainpag.cardcontent}>
                        <Typography
                          className={gomainpag.indigo}
                          variant="h5"
                          component="div"
                        >
                          {coupItem?.coupon_name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item md={8} sm={8} xs={7}>
                    <Stack
                      direction="column"
                      sx={{ paddingLeft: "10px" }}
                      spacing={2}
                    >
                      <Typography className={gomainpag.DomFlights} variant="p" sx={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>
                        {coupItem?.heading}
                      </Typography>
                      <Typography
                        className={gomainpag.indigoflightsale}
                        variant="p"
                        component="div"
                        sx={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}
                      >
                        {coupItem?.coupon_name}
                      </Typography>
                      <Typography
                        className={gomainpag.bookflights}
                        variant="body1"
                        sx={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}
                      >
                        {coupItem?.description}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container justifyContent={'space-between'} alignItems={'center'} className={gomainpag.book}>
                  <Grid md={4} sm={4} xs={5} className={gomainpag.Terms} onClick={()=>{
                    setTerms(coupItem?.tc)
                    setCouponterms(true)}}>T&C's apply</Grid>
                  <Grid xs={'auto'} className={gomainpag.booknowBus} variant="contained"               
                  onClick={()=>navigate('/CouponDetails',{state:{coupounData:coupItem,from:locationPath}})}>
                   View More
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Carousel>
      </Box>
      </Grid>
      </Box>
           </Container>
      </Grid>  
    </>
  );
};

export default OffersCarousel;
