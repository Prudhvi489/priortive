import {
  Container,
  Paper,
  Grid,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { adminPackagesStyle } from "./AdminStyles";
import { enqueueSnackbar } from "notistack";
import { adminAddCoupoun } from "./AdminStyles";
import {  useLocation } from "react-router-dom";
import gomytripclient from "../../../GomytripClient";
import BusesPageBackDrop from '../Buses/BusesPageBackDrop'
const AdminViewPackDetails = () => {
  const addTours = adminPackagesStyle();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false)

  const [viewPackDetails, setViewPackDetails] = useState([]);

  useEffect(() => {
    toursData();
  }, []);

  const toursData = () => {
    let payloadToSend = {
      action: 1,
      id: location.state.packId,
    };
    gomytripclient
      .post("/modifyTourPackages", payloadToSend)
      .then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          setViewPackDetails(res.data.data.results[0]);
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  };


  const adminAddCoupounStyles = adminAddCoupoun;
  return (
    <>
      <h4 className={adminAddCoupounStyles.headingstyle}>
        Tour Packages &gt; Management Tour &gt; Add Tourpackage
      </h4>
      <BusesPageBackDrop open={isLoading} />
      <Container>
        <Paper sx={{ padding: "25px" }}>
          <Typography
            textAlign={"center"}
          >
            Viewing package <span className="c-p f-w-500">{viewPackDetails?.package_name}</span>
          </Typography>
          <Divider />
          <form>
            {/* Four */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={5}>
                <Typography className={addTours.inputLabelStyle}>
                  Package Name
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  label="Place Name"
                  size="small"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  value={viewPackDetails?.package_name}
                />
              </Grid>
            </Grid>
            {/* Four */}

            {/* FIVE */}
            <Grid container spacing={2} mt={2} id="coverPicId">
              <Grid item xs={5}>
                <Typography className={addTours.inputLabelStyle}>
                  Cover Picture
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Grid container>
                  <Grid item md={5}>
                    {viewPackDetails.cover_picture && (
                      <span style={{ margin: "10px 0" }}>
                        <img
                          className={addTours.previewImageStyle}
                          width={"320px"}
                          height={"150px"}
                          src={viewPackDetails.cover_picture}
                          alt={viewPackDetails?.package_name}
                        />
                      </span>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* FIVE */}

            {/* SIX */}
            <Grid
              container
              spacing={2}
              mt={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={5}>
                <Typography className={addTours.inputLabelStyle}>
                  Sub Category
                </Typography>
              </Grid>
              <Grid item xs={7}>
                {viewPackDetails.category_name}
              </Grid>
            </Grid>
            {/* SIX */}

            {/* seven */}
            <Grid container spacing={2} mt={2} mb={2}>
              <Grid item xs={5}>
                <Typography className={addTours.inputLabelStyle}>
                  Days & Nights
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField value={`${viewPackDetails.days} Days`} variant='outlined' size="small" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} placeholder="Days" label='Days' />
                  </Grid>
                  <Grid item md={6}>
                    <TextField value={`${viewPackDetails.nights} Nights`} variant='outlined' size="small" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} placeholder="Days" label='Nights' />

                  </Grid>
                  <Grid item md={6}>
                    <TextField value={`Flights ${viewPackDetails.flights ? "Provided" : 'Not Provided'}`} variant='outlined' size="small" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} placeholder="Days" label='Flights' />

                  </Grid>
                  <Grid item md={6}>
                    <TextField value={`Hotels ${viewPackDetails.hotels ? "Provided" : 'Not Provided'}`} variant='outlined' size="small" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} placeholder="Days" label='Hotels' />

                  </Grid>
                  <Grid item md={6}>
                    <TextField value={`Activities ${viewPackDetails.activities ? "Provided" : 'Not Provided'}`} variant='outlined' size="small" InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }} placeholder="Days" label='Activities' />

                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* seven */}

               {/* TEN */}
               <Grid container spacing={2} mt={2}>
              <Grid item xs={5}>
                <Typography className={addTours.inputLabelStyle}>
                  Package Description
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  inputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                  value={viewPackDetails?.package_description}
                  multiline
                  rows={7}
                  label="Package Description"
                  size="small"
                  placeholder="Enter Package Description"
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* TEN */}

            <span className={addTours.toursDivider}></span>
            {/* Eight */}
            {viewPackDetails?.description?.map((task, index) => {
              const dayKey = `day${index + 1}`;
              return (
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={5}>
                    <Typography className={addTours.inputLabelStyle}>
                      Day - {index + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container spacing={3}>
                      <Grid item md={12}>
                        <span
                          id={`day${index + 1}`}
                          className={`goAdminErrorMessages`}
                        ></span>
                        <TextField
                          // {...register(`day${index+1}`,{required:{value:true,message:`day${index+1} Content be empty`}})}
                          id={dayKey}
                          type="text"
                          defaultValue={task.content}
                          InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }}
                          placeholder={`Day ${index + 1} Description`}
                          multiline
                          rows={4}
                          label={`${index + 1} day`}
                          size="small"
                          fullWidth
                        // error={task['content'].trim() === ""}
                        // helperText={
                        //   task['content'].trim() === ""
                        //     ? `${dayKey} Description cannot be empty`
                        //     : ""
                        // }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            {/* Eight */}

            <span className={addTours.toursDivider}></span>
            {/* NINE */}

            <Grid
              container
              flexDirection={"column"}
              spacing={2}
              mt={2}
              id="multipleImages"
            >
              <Grid item>
                <Typography className={addTours.inputLabelStyle}>
                  Images
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  {viewPackDetails?.package_images&&viewPackDetails?.package_images?.length>0&&viewPackDetails?.package_images?.map((imData,index)=>(
                    <Grid item key={index}>
                      <span style={{ margin: "10px 0" }}>
                        <img
                          className={addTours.previewImageStyle}
                          width={"280px"}
                          height={"150px"}
                          src={imData}
                          alt={viewPackDetails?.package_name}
                        />
                      </span>
                  </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            {/* NINE */}

            <span className={addTours.toursDivider}></span>

            {/* TEN */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={5}>
                <Typography className={addTours.inputLabelStyle}>
                  Terms & Conditions
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <TextField
                defaultValue={viewPackDetails?.terms_condition}
                InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }}
                  multiline
                  rows={7}
                  label="Terms & Conditions"
                  size="small"
                  placeholder="Enter Terms & Conditions"
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* TEN */}

          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AdminViewPackDetails;
