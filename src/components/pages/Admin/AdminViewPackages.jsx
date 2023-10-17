import {
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { adminPackagesStyle } from "../Admin/AdminStyles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import HikingIcon from "@mui/icons-material/Hiking";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate, useLocation } from "react-router-dom";
import gomytripclient from "../../../GomytripClient";
import CreateIcon from "@mui/icons-material/Create";
import BlockIcon from "@mui/icons-material/Block";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AdminAddPlace from "../../modals/AdminModals/AdminAddPlace";
import { enqueueSnackbar } from "notistack";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const AdminViewPackages = () => {
  const adminPackageStyles = adminPackagesStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const [tourPackages, setTourPackages] = useState([]);
  const [tourPlaceDetails, setTourPlaceDetails] = useState("");

  useEffect(() => {
    viewAllPackagesApi()
  }, []);

  const viewAllPackagesApi = () => {
    gomytripclient
      .post("/viewAllPackages", { id: location?.state?.tourData?.place_id })
      .then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          setTourPlaceDetails(res.data.data.getPlaceDetails);
          setTourPackages(res.data.data.getPackageDetails);
        } else {
          setTourPlaceDetails("");
          setTourPackages([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // PLACE DIALOG
  const [tourPlaceState, setTourPlaceState] = useState(false);
  const handleAddPlaceDialog = (bool) => {
    setTourPlaceState(bool);
  };


  const callTheList = () => {
    viewAllPackagesApi();
  };

  const handlePackageStatusChange = (id, status) => {
    if (window.confirm(`Are you sure want to ${status == 0 ? 'Disable' : 'Enable'}  this package`)) {
      gomytripclient.post('/modifyTourPackages', { id, action: 3, status: status == 0 ? 1 : 0 }
      ).then(res => {
        if (res.data.status === 1) {
          setTourPackages(pre => pre.map((dataa) => id == dataa.id ? { ...dataa, status: status == 0 ? 1 : 0 } : dataa))
          enqueueSnackbar(res.data.message, { variant: 'success' })

        } else {
          enqueueSnackbar(res.data.message, { variant: 'error' })
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    } else {
      enqueueSnackbar('Last action was cancelled')
    }

  }

  function handlePackageDelete(id, placeId) {
    if (window.confirm('Are you sure want to remove this package')) {
      gomytripclient.post('/modifyTourPackages', { id, action: 4, packageplace: placeId }
      ).then(res => {
        if (res.data.status === 1) {
          // setTourPackages(pre=>pre.map((dataa)=>id == dataa.id?{...dataa,status:status == 0 ? 1 : 0 }:dataa))
          enqueueSnackbar(res.data.message, { variant: 'success' })
          setTourPackages(pre => pre.filter((dataa) => id != dataa.id))

        } else {
          enqueueSnackbar(res.data.message, { variant: 'error' })
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    } else {
      enqueueSnackbar('Last action was cancelled')
    }
  }

  return (
    <>
      {tourPlaceState && (
        <AdminAddPlace
          open={tourPlaceState}
          close={() => handleAddPlaceDialog(false)}
          successCallBack={callTheList}
          editData={tourPlaceDetails}
        />
      )}
      <Container>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <Tooltip placement="top" title='Go Back'>
              <IconButton onClick={()=>window.history.back()}><ArrowBackIcon className="c-p"/></IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Button
              sx={{ marginBottom: "10px" }}
              variant="contained"
              className="bg-p"
              onClick={() =>
                navigate("/admin/adminAddPackage", {
                  state: { placeData: location?.state?.tourData },
                })
              }
            >
              <AddCircleIcon fontSize="small" /> Add Package
            </Button>
          </Grid>

        </Grid>


        <Paper sx={{ padding: "10px",borderRadius:'25px' }} elevation={3}>
          <Paper elevation={0}>
            <Grid container spacing={1} marginLeft={1} padding={1}>
              <Grid item>
                <img
                  width={180}
                  height={180}
                  src={tourPlaceDetails?.place_image}
                  alt="immm"
                  style={{borderRadius:'25px'}}
                />
              </Grid>
              <Grid item>
                <p>
                  <span className="f-w-500">Place Name </span>:{" "}
                  <span className="f-w-500 c-p text-t-cap" >
                    {tourPlaceDetails?.place_name}
                  </span>
                </p>
                <p>
                  <span className="f-w-500">Category Name </span>:{" "}
                  <span className="f-w-500 c-p text-t-cap">
                    {tourPlaceDetails?.category}
                  </span>
                </p>
                <p>
                  <span className="f-w-500">Status </span>:{" "}
                  <span className="f-w-500 c-p text-t-cap">
                    {tourPlaceDetails?.status === 0 ? "ACTIVE" : "IN-ACTIVE"}
                  </span>
                </p>
              </Grid>
              {/* <Grid item>
                <IconButton onClick={() => handleAddPlaceDialog(true)} sx={{ color: '#003556' }}>
                  <CreateIcon />
                </IconButton>
              </Grid> */}
            </Grid>
          </Paper>
          <Divider />
          <Typography textAlign={'center'} >List Of Packages for <span className="c-p"> {tourPlaceDetails?.place_name}</span></Typography>
          <Grid container flexDirection={"row"} spacing={1} padding={1}>
            {tourPackages?.map((data) => (
              <Grid item md={3} className="">
                <Card
                  className={`${adminPackageStyles.packageCardTours} hover-container`}
                  sx={{ maxWidth: 255 }}
                >
                  <CardHeader
                    className={"customCardHeader"}
                    // title={data.category}
                    subheader={data.category}
                  />
                  {/* <span style={{margin:'15px'}}>Category : <span className="c-p f-w-500">{data.category}</span></span> */}

                  <div className={adminPackageStyles.packageImgCon}>
                    <img
                      src={data?.cover_picture}
                      alt="Snow"
                      height="104"
                      width={"200"}
                      className={adminPackageStyles.cardImageTours}
                    />
                    <div className={adminPackageStyles.topLeftToursDur}>
                      {data?.days}D / {data?.nights}N
                    </div>
                  </div>
                  <CardContent sx={{ padding: "10px" }}>
                    <Typography
                      variant="body2"
                      className={`${adminPackageStyles.description} c-p packageNameGo`}
                    >
                      {data?.package_name} ({data?.days}D / {data?.nights}N)
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Grid container justifyContent={"space-between"}>
                      <Grid
                        item
                        sx={{
                          // textDecoration: data.flights
                          //   ? "none"
                          //   : "line-through",
                          opacity: data.flights ? '1' : '0.4'
                        }}
                      >
                        <Stack
                          container
                          flexDirection={"column"}
                          alignItems={"center"}
                        >
                          <AirplanemodeActiveIcon size="small" />
                          <span className={adminPackageStyles.smallText}>
                            Flights
                          </span>
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          // textDecoration: data.hotels ? "none" : "line-through",
                          opacity: data.hotels ? '1' : '0.4'
                        }}
                      >
                        <Stack
                          container
                          flexDirection={"column"}
                          alignItems={"center"}
                        >
                          <CorporateFareIcon size="small" />
                          <span className={adminPackageStyles.smallText}>
                            Hotels
                          </span>
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          // textDecoration: data.activities
                          //   ? "none"
                          //   : "line-through",
                          opacity: data.activities ? '1' : '0.4'
                        }}
                      >
                        <Stack
                          container
                          flexDirection={"column"}
                          alignItems={"center"}
                        >
                          <HikingIcon size="small" />
                          <span className={adminPackageStyles.smallText}>
                            {" "}
                            Activities
                          </span>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardActions>
                  {/* <Collapse in={true} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Method:</Typography>
                                        <Typography paragraph>
                                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                            aside for 10 minutes.
                                        </Typography>
                                    </CardContent>
                                </Collapse> */}
                  <div className="hover-contentt makeFlex justifyEven">
                    <Tooltip title='View Package Details'>
                      <IconButton onClick={() => navigate('/admin/AdminViewPackDetails', { state: { packId: data.id } })}>
                        <RemoveRedEyeIcon className="icon" color='secondary' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit this package'>
                      <IconButton onClick={() => navigate('/admin/AdminEditTourForm', { state: { packId: data.id } })}>
                        <CreateIcon className="icon" color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={`${data?.status === 0
                      ? "Disable This Package"
                      : "Enable This Package"
                      }`}>
                      <IconButton
                        onClick={() => handlePackageStatusChange(data.id, data.status)}
                        color={`${data?.status === 0
                          ? "success"
                          : "error"
                          }`}
                      >
                        <BlockIcon className="icon" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title='Delete this Package'>
                      <IconButton onClick={() => handlePackageDelete(data.id, data.packageplace)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AdminViewPackages;
