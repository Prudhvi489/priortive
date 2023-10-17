import {
  Container,
  Grid,
  Paper,
  Tab,
  Typography,
  Divider,
  Box,
  Rating,
  IconButton, Avatar, Stack
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { aftersearchflights } from "../../../assets/styles/Flights";
import helperFunctions from "../../../helpers/helperFunctions.js";
import { adminAddCoupoun, adminTables } from "./AdminStyles";
import { DownloadFileFromApi } from "../../../ApiServices/DownloadFilesApi";
import gomytripclient from "../../../GomytripClient";
import ReactPaginate from "react-paginate";
import { room_booking } from "../../../assets/styles/Hotelstyles";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
const AdminReview = () => {
  const room_style = room_booking();

  const adminAddCoupounStyles = adminAddCoupoun();
  const aftersearchflight = aftersearchflights();
  const [tabValue, setTabValue] = useState("1");

  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecordsCount, setTotalRecordsCount] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleTabChange = (event, tabValue) => {
    setPageNumber(1)
    setTabValue(tabValue);
  };

  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
  };

  const [isServiceClick, setIsServiceClick] = useState('')

  useEffect(() => {
    getReviews(isServiceClick)
  }, [isServiceClick,pageNumber])

  const getReviews = (serviceName = '') => {
    let payloadToSend = { "module": 3, "name": serviceName?.service_name ?? "", "pageNumber": pageNumber, "pageSize": 10 }

    gomytripclient.post('/getRatingAndReview', payloadToSend
    ).then(res => {
      console.log(res)
      if (res.status === 200 && res.data.status === 1) {
        setData(res.data.data.getReviews)
        setTotalRecordsCount(res.data.data.count);
        setTotalPages(Math.ceil(res.data.data.count / pageSize));

      } else {
        setData([]);
        setTotalRecordsCount(0);
        // setPageLoading(false);
      }
    }).catch(err => {
      console.log(err)
    })

  }

  return (
    <>
      <h4 className={adminAddCoupounStyles.headingstyle}>Reviews</h4>
      <Container maxWidth="xl">
        <TabContext value={tabValue}>
          <TabList
            onChange={handleTabChange}
            sx={{
              background: "#DFF3FF",
              borderRadius: "1rem",
              // width: "17.8%",
              width: "fit-content",
              maxWidth:'100%',
              marginBottom: "0.5rem",
              height: "1rem",
            }}
            aria-label="Go bus Tabs"
            className={aftersearchflight.tabs}
            variant="scrollable"
            orientation={"horizontal"}
            scrollButtons={"off"}
          >
            <Tab
              disableRipple
              label="Hotel"
              value="1"
              sx={{
                fontSize: "12px",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
              }}
            />
            <Tab
              disableRipple
              label="Bus"
              value="2"
              sx={{
                fontSize: "12px",
                padding: "0% 4%",
                color: "#003556",
                fontWeight: 600,
                textTransform: "none",
              }}
            />
          </TabList>
          <TabPanel value={"1"} sx={{ padding: "10px 0" }}>
          </TabPanel>

          <TabPanel value={"2"} sx={{ padding: "10px 0" }}>
            <Paper elevation={3} style={{ padding: "1rem" }}>
              {isServiceClick && <IconButton onClick={() => { setIsServiceClick('') }} sx={{ float: 'right' }}>
                <CancelPresentationIcon color="error" />
              </IconButton>}
              <Grid container spacing={2}>
                {!isServiceClick && data.length > 0 && data.map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper onClick={() => { setIsServiceClick(item); }} elevation={3} style={{ padding: "10px" }} className={room_style.hotel_paper}>
                      <Grid container alignItems="center" justifyContent={'center'}>
                        <Grid
                          item
                          xs={6}
                          container
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "16px",
                                color: "rgba(0, 53, 86, 1)",
                                fontWeight: "500",
                              }}
                            >
                              {item.service_name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h6"
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                              }}
                            >
                              {item.type}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={6} container justifyContent="flex-end" alignItems={'center'} spacing={0}>
                          <Typography
                            variant="body2"
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "14px",
                              color: "rgb(0,53,86,1)",
                              fontWeight: "700",
                            }}
                          >
                            
                            {(Math.round(item.average_rating))}/5
                          </Typography>
                          <Box sx={{ "& > legend": { mt: 2 } }}>
                            <Rating
                              name="read-only"
                              readOnly
                              precision={0.1}
                              value={(Math.round(item.average_rating)) ? (Math.round(item.average_rating)) : 0}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
                
              </Grid>
              {isServiceClick && data.length > 0 ?
                  <Grid  container flexDirection={'column'}>
                    <Grid item>
                      <Typography
                        variant="body2"
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          color: "rgba(0, 53, 86, 1)",
                          fontWeight: "500",
                        }}
                      >
                        {isServiceClick.first_name}
                      </Typography>
                    </Grid>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                    >
                      <span className="goBusOveralRatingForBus">
                        <span className="goNumeratorRat">
                        {(Math.round(isServiceClick?.average_rating))}
                          {/* {Math.round(isServiceClick?.average_rating)} */}
                        </span>
                        <span className="goSlash">/</span>
                        <span className="goDenominator">5</span>
                      </span>
                      <Rating
                        name="read-only"
                        // value={!isNaN(Math.round(isServiceClick?.average_rating)) ? (parseFloat(isServiceClick?.average_rating?.toFixed(1))) : 0}
                        value={!isNaN(Math.round(isServiceClick?.average_rating)) ? (Math.round(isServiceClick?.average_rating)) : 0}

                        precision={0.1}
                        readOnly
                      />
                    </Stack>
                    <Grid
                      container
                      direction="column"
                      //   spacing={0.5}
                      className={""}
                    >
                      {data?.length > 0 && data?.map((data, item) => {
                        return (
                          <Grid key={item} item mt={2}>
                            <Stack spacing={1}>
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                spacing={1}
                              >
                                <Avatar
                                  alt={data?.first_name}
                                  src={'userImage'}
                                />
                                <p>{data?.first_name}</p>
                              </Stack>
                              <Rating
                                value={Number(data.rating)}
                                // precision={0.1}
                                readOnly
                              />
                              <p className="goBusReviewText">
                                {data.review}
                              </p>
                              <Divider />
                            </Stack>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Grid> : ""}
            </Paper>
          </TabPanel>
        </TabContext>
      </Container>
      <Grid
        container
        justifyContent={"space-between"}
        mt={2}
        alignItems={"baseline"}
      >
        <Grid item>
          {pageNumber * 10 - 10 + 1} - {pageNumber * 10 - 10 + 10}of{" "}
          {totalRecordsCount}
        </Grid>
        <Grid item>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next "
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            containerClassName="mainPageCont"
            activeClassName="activeClassName"
            activeLinkClassName="activeLinkClassName"
            pageClassName="pageClassName"
            forcePage={pageNumber == 0 ? 1 : pageNumber - 1}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminReview;
