import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Footer1 } from "../assets/styles/Flights.jsx";
import Twittericon from "../assets/images/twitter.svg";
import instaicon from "../assets/images/insta.svg";
import whatsapp from "../assets/images/whatsapp.svg";
import fb from "../assets/images/fb.svg";
import { CenterFocusWeak } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import priortiveapp from '../assets/images/priortiveapp.png'
import priortivebanner from  '../assets/images/priortivebanner.png';
import priortivemobile from '../assets/images/priortivemobile.png';
import applestore from '../assets/images/applestore.svg';
import playstore from '../assets/images/playstore.svg'
const Footer = () => {
  const foot = Footer1();
  return (
    <>
      {/* <img src={priortiveapp} width="100%"/> */}
      {/* style={{backgroundImage:`url(${priortivebanner})`,width:'100%',height:'100vh',}} */}
      <div style={{backgroundImage:`url(${priortivebanner})`,width:'100%',height:'70vh',backgroundRepeat:'no-repeat',marginTop:'10rem'}}>
      {/* <img src={priortivebanner} width="100%"/> */}
      <Container maxWidth='xl'>
        <Grid container>
          <Grid item md={6}>
            <Stack spacing={3}>
              <span style={{fontSize:'56px',fontWeight:'700',color:'#fff'}}>Now available App Download Store</span>
              <span style={{color:'#fff'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</span>
              <Stack direction={'row'} spacing={5}>
                <img src={playstore}  width="100vw"
                      />
                <img src={applestore}  width="100vw"
                      />
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={6} sx={{marginTop:'-7rem'}} fullWidth>
            <img src={priortivemobile} width='100%' height="100%"/>
          </Grid>
        </Grid>
      </Container>
      </div>
      <div className={foot.footerbody}>
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            <Grid item className={foot.footercenter} md={3} sm={6} xs={12}>
              <Stack spacing={1.2} sx={{ paddingTop: { md: "1", xs: "26px" } }}>
                <Typography className={foot.footerheadtext} variant="h6">
                  Our Products
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  Flights
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  Hotels
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  Cabs
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  Bus
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  TourPackages
                </Typography>
              </Stack>
            </Grid>
            <Grid item className={foot.footercenter} md={3} sm={6} xs={12}>
              <Stack spacing={1.2} sx={{ paddingTop: { md: "1", xs: "26px" } }}>
                <Typography className={foot.footerheadtext} variant="h6">
                  Need Support
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  Help
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  FAQs
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                <NavLink target="_blank" className={'footerNavLink'} to={'/gmtPrivacy'}>
                Privacy Policy
                  </NavLink>
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  Cookie Policy
                </Typography>
                <Typography className={foot.footertext} variant="body1">
                  <NavLink target="_blank" className={'footerNavLink'} to={'/gmtTerms'}>
                    Terms & Conditions
                  </NavLink>
                </Typography>
              </Stack>
            </Grid>
            <Grid item className={foot.footercenter} md={3} sm={6} xs={12}>
              <Stack spacing={1.2} sx={{ paddingTop: { md: "1", xs: "26px" } }}>
                <Stack spacing={1.2} sx={{ spacing: { md: "1.2", xs: "0" } }}>
                  <Typography className={foot.footerheadtext} variant="h6">
                    Email
                  </Typography>
                  <Typography className={foot.footertext} variant="body1">
                    GOMYTRIP@gmail.com
                  </Typography>
                  <Typography className={foot.footertext} variant="body1">
                    GOMYTRIP21@gmail.com
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ spacing: { md: "1", xs: "0" } }}>
                  <Typography className={foot.footerheadtext} variant="h6">
                    Phone Numbers
                  </Typography>
                  <Typography className={foot.footertext} variant="body1">
                    +91 8077654432
                  </Typography>
                  <Typography className={foot.footertext} variant="body1">
                    +91 8077654432
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item className={foot.footercenter} md={3} sm={6} xs={12}>
              <Stack
                spacing={2}
                sx={{
                  spacing: { md: "2", xs: "0" },
                  paddingTop: { md: "1", xs: "26px" },
                }}
              >
                <Typography variant="h6">Follow us</Typography>
                <Stack direction="row" spacing={1}>
                  <Typography>
                    <img src={whatsapp} alt="" />
                  </Typography>
                  <span className={foot.footertext}>Whatsapp</span>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ spacing: { md: "1", xs: "0" } }}
                >
                  <Typography>
                    <img src={fb} alt="" />
                  </Typography>
                  <Typography className={foot.footertext}>Facebook</Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ spacing: { md: "1", xs: "0" } }}
                >
                  <Typography>
                    <img src={Twittericon} alt="" />
                  </Typography>
                  <Typography className={foot.footertext}>Twitter</Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ spacing: { md: "1", xs: "0" } }}
                >
                  <Typography>
                    <img src={instaicon} alt="" />
                  </Typography>
                  <Typography className={foot.footertext}>Instagram</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Divider mt={1} mb={1}></Divider>
          <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
              <Typography> © 2023 PRIORTIVE PVT. LTD. Country India</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Footer;
