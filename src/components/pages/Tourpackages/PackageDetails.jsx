import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  Tab,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import InquiryModal from "../../modals/TourpackagesModals/InquiryModal";
import { adminAddCoupoun } from "../Admin/AdminStyles";
import summary2 from "../../../assets/Tourpackages/summary2.png";
import summary3 from "../../../assets/Tourpackages/summary3.png";
import summary4 from "../../../assets/Tourpackages/summary4.png";
import summary5 from "../../../assets/Tourpackages/summary5.png";
import inquiry from "../../../assets/Tourpackages/inquiry.svg";
import Carousel from "react-multi-carousel";
import { summarypolicyresponsive } from "../responsives/Carouselresponsive";
import { aftersearchflights } from "../../../assets/styles/Flights";
import { useNavigate, useLocation } from "react-router-dom";  
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {styles} from '../../../assets/styles/Styles_export'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  // {
  //   label: 'Bird',
  //   imgPath:
  //     'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  // }
];
const PackageDetails = (props) => {
  const [details, setDetails] = useState([]);
  console.log(details,'details');
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = details&&details?.package_images&&details?.package_images?.length>0&&details?.package_images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const { packageDetails } = props.location?.state || {};
  const location = useLocation();

  const navigate = useNavigate();


  useEffect(() => {
    setDetails(location.state.packageDetails)
  }, []);


  const aftersearchflight = aftersearchflights();
  const [orderOpen, setOrderOpen] = useState(false);
  function orderclose() {
    setOrderOpen(false);
  }
  const adminAddCoupounStyles = adminAddCoupoun();
  const [tabValue, setTabValue] = useState("0");
  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  const summaryImages = [
    summary2,
    summary3,
    summary4,
    summary5,
    summary2,
    summary3,
    summary4,
    summary5,
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <Grid container spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
        {/* <Grid item xs={4}>
          <img
            src={details?.package_images[0]}
            alt="summary1"
            className={adminAddCoupounStyles.summaryStyles1}
          />
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img
                src={details?.package_images[1]}
                alt="summary2"
                className={adminAddCoupounStyles.summaryStyles}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={details?.package_images[2]}
                alt="summary3"
                className={adminAddCoupounStyles.summaryStyles}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img
                src={details?.package_images[3]}
                alt="summary4"
                className={adminAddCoupounStyles.summaryStyles}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={details?.package_images[4]}
                alt="summary5"
                className={adminAddCoupounStyles.summaryStyles}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <img
            src={details?.package_images[5]}
            alt="summary6"
            className={adminAddCoupounStyles.summaryStyles1}
          />
        </Grid> */}
        <Box sx={{ maxWidth: {xl:"100%",lg:"100%",md:"100%",sm:600}, flexGrow: 1 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {details&&details?.package_images&&details?.package_images?.length>0&&details?.package_images.map((step, index) => (
              <div key={step}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 350,
                      display: 'block',
                      maxWidth: {xl:1536,lg:1200,md:900,sm:600},
                      overflow: 'hidden',
                      width: '100%',
                      minWidth:"100%",
                      objectFit:"contain"
                    }}
                    src={step}
                    alt={step}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Previous
              </Button>
            }
          />
        </Box>
      </Grid>
      {details&&details?.package_images&&details?.package_images?.length>0&&<Grid container sx={{ display: { xs: "block", md: "none" } }}>
        <Carousel
          responsive={summarypolicyresponsive}
          animation="slide" // Choose your preferred animation type
          indicators={true} // Display indicators
          timeout={500} // Time between slides
        >
          {details&&details?.package_images&&details?.package_images?.length>0&&details?.package_images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`summary${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ))}
        </Carousel>
      </Grid>}
      {details && (
        <Container maxWidth="">
          <TabContext value={tabValue}>
            <TabList
              onChange={handleTabChange}
              sx={{
                color: "rgb(0,53,86,1)",
                fontWeight: "700",
                fontSize: "16px",
              }}
              aria-label="Go bus Tabs"
              // className={aftersearchflight.tabs}
              variant="scrollable"
              orientation={"horizontal"}
              scrollButtons={"off"}
            >
              <Tab
                disableRipple
                label="Summary"
                value="0"
                sx={{
                  fontSize: "12px",
                  color: styles.app_color,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />
              <Tab
                disableRipple
                label="Policies"
                value="1"
                sx={{
                  fontSize: "12px",
                  padding: "0% 4%",
                  color: styles.app_color,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />
            </TabList>
            <TabPanel value={"0"} sx={{ padding: "10px 0" }}>
              <Grid container spacing={2}>

                <Grid item md={12} xs={12}>
                  <Paper elevation={3} style={{ padding: "1rem" }}>
                    <h3 style={{margin:'10px 0'}} className={adminAddCoupounStyles.headingstyle}>
                      {details.package_name} 
                    </h3>
                    <Typography
                      variant="p"
                      className={adminAddCoupounStyles.descriptionStyles}
                    >
                      {details.duration}
                    </Typography>

                    <Typography sx={{whiteSpace:'pre-line'}} fontSize={16}>
                      <span className="c-p">Package Description :</span> 
                      {/* <span dangerouslySetInnerHTML={{ __html: details.package_description }}/> */}
                      <span>{details.package_description}</span>
                    </Typography>

                    <Grid container spacing={3} padding={3}>
                      <Grid item xs={12}>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableBody>
                              {details?.description && details?.description?.length > 0 && details?.description.map((dayData, index) => (
                                <TableRow key={0} id="summobres">
                                  <TableCell
                                    className={adminAddCoupounStyles.dayStyles}
                                    id="dayorder"
                                  >
                                    <Typography className="c-p" sx={{ fontSize: '21px', fontWeight: 700 }}>Day {index + 1}</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <p
                                    style={{whiteSpace:'pre-line'}}
                                      className={
                                        adminAddCoupounStyles.paroStyles
                                      }
                                    >
                                      {dayData.content}
                                    </p>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={"1"} sx={{ padding: "10px 0" }}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <Paper elevation={3} style={{ padding: "1rem" }}>
                    <h4 className={adminAddCoupounStyles.headingstyle}>
                      Terms & Conditions
                    </h4>
                    {details && details?.terms_condition ? (
                      <Typography id="summobres" sx={{marginLeft: "1.5rem"}}>
                        {details?.terms_condition}
                      </Typography>
                    ) : (
                      <Typography sx={{marginLeft: "1.5rem"}} colSpan={2}>No data available</Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Container>
      )}

      <InquiryModal open={orderOpen} close={orderclose} />
      <Grid
        textAlign={"right"}
        style={{ marginBottom: "1rem", marginRight: "22px" }}
      >
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
    </div>
  );
};

export default PackageDetails;
