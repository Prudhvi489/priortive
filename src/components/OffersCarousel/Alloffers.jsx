import React, { useEffect,useState } from 'react'
import Footer from '../../parts/Footer'
import { Box, Card, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { gomainpage } from "../../assets/styles/Flights.jsx";

const Alloffers = () => {
  
  const location=useLocation()
  const gomainpag = gomainpage();
  const navigate=useNavigate()
  const [couponsdata,setCouponsdata]=useState([])
  useEffect(()=>{
    setCouponsdata(location.state.coupons)
  },[location.state])

  return (
    <div>
      <Grid item sx={{height:'8.5vh'}}></Grid>
      <Container maxWidth="xl">
      <Grid item>
        <span style={{fontSize:'14px',fontWeight:600,marginLeft:'1rem'}}>All offers</span>
      </Grid>
      <Grid container mt={2}>
        {
          couponsdata.length>0&&couponsdata.map((coupItem,index)=>{
            return(
              <>
              <Grid item md={4}>
              <Box
                className={gomainpag.cardpaper}
                key={coupItem}
                ml={0.5}
                bgcolor={"white"}
                sx={{cursor:'pointer'}}
                onClick={()=>navigate('/CouponDetails',{state:{coupounData:coupItem,from:location.state.path}})}
              >
                <Grid container>
                  <Grid item md={4} xs={3}>
                    <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
                      <CardMedia
                        component="img"
                        height="80px"
                        width="100px"
                        image={coupItem?.image}
                        alt="green iguana"
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
                  <Grid item md={8} xs={8}>
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
                <Box className={gomainpag.book}>
                  <span className={gomainpag.Terms}>T&C's apply</span>
                  <span className={gomainpag.c} variant="contained">
                   View More
                  </span>
                </Box>
              </Box>
              
              </Grid>
              </>
            )
          })
        }       
      </Grid>
      </Container>
      <Grid item mt={2}>
     <Footer/>
     </Grid>
    </div>
  )
}

export default Alloffers