import {
  Container,
  Grid,
  Button,
  Stack,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { aftersearchflights } from "../../../assets/styles/Flights";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import ReactPaginate from "react-paginate";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { AntSwitchReverse, adminAddCoupoun, adminTables } from "./AdminStyles";
import { useNavigate } from "react-router-dom";
import AdminAddCategory from "../../modals/AdminModals/AdminAddCategory";
import AdminAddPlace from "../../modals/AdminModals/AdminAddPlace";
import gomytripclient from "../../../GomytripClient";
import { enqueueSnackbar } from "notistack";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import addplaceicon from "../../../assets/Tourpackages/addplaceicon.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from "@mui/icons-material/Create";

const AdminTourManagement = () => {

  const navigate = useNavigate();
  const adminTableStyles = adminTables();
  const adminAddCoupounStyles = adminAddCoupoun();
  const aftersearchflight = aftersearchflights();
  const [pageLoading, setPageLoading] = useState(false);
  const [tourPlaceDetails, setTourPlaceDetails] = useState({});
  const [tabValue, setTabValue] = useState("1");  // --------------------pagination variables

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [totalRecordsCount, setTotalRecordsCount] = useState("");

  // --------------------pagination variables

  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
  };

  const handlePlaceStatus = (data) => {
    console.log(data,"data")
    if (
      window.confirm(
        `Are you sure want to ${
          data.status === 0 ? "Block" : "Enable"
        }?`
      )
    ){

      gomytripclient.post('/modifyTourPackagePlace', {"id":data?.place_id,"action":2,"status":data.status?"0":"1"}
      ).then(res => {
          if (res.data.status === 1) {
              enqueueSnackbar(res.data.message, { variant: 'success' })
              toursData()
          } else {
              enqueueSnackbar(res.data.message, { variant: 'error' })
          }
          console.log(res)
      }).catch(err => {
  
          console.log(err)
      })
    }
   
}

  const handleTabChange = (event, tabValue) => {
    setPageNumber(1)
    setTabValue(tabValue);
  };
  const [dialogState, setDialogState] = useState(false);
  const handleDialogState = (bool) => {
    setDialogState(bool);
    if (!bool) {
      setEditData("");
    }
  };

  // PLACE DIALOG
  const [tourPlaceState, setTourPlaceState] = useState(false);
  const handleAddPlaceDialog = (bool) => {
    setTourPlaceDetails({});
    setTourPlaceState(bool);
  };

  const [data, setData] = useState([]);

  const [editData, setEditData] = useState("");
  useEffect(() => {
    toursData();
  }, [tabValue, pageNumber]);

  const toursData = () => {
    let payloadToSend = {
      pageNumber: pageNumber,
      pageSize: 10,
      category_type: "",
    };
    let placepayload = {
      pageNumber: pageNumber,
      pageSize: 10,
    };
    gomytripclient
      .post(
        tabValue == 1 ? "/getToursList" : "/categoryList",
        tabValue == 1 ? placepayload : payloadToSend
      )
      .then((res) => {
        let count;
        if (tabValue == 1) {
          count = res?.data?.data?.totalCount;
        } else {
          count = res?.data?.data?.count;
        }
        if (res.status === 200 && res.data.status === 1) {
          setData(res?.data?.data?.rows);
          setTotalRecordsCount(count);
          setTotalPages(Math.ceil(count / pageSize));
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
          setData([]);
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  const callTheList = () => {
    toursData();
    setEditData("");
  };

  const changeStatus = (params) => {
    if (
      window.confirm(
        `Are you sure want to ${
          params.status === 0 ? "Block" : "Enable"
        } ${params.category_name}`
      )
    ) {
      let editPay = {
        id: params.id,
        // category_name: params.category_name,
        // category_type: params.category_type,
        status: params.status == 0 ? 1 : 0,
        action:3
      };

      gomytripclient
        .post("/modifyTourCategories", editPay)
        .then((res) => {
          if (res.status === 200 && res.data.status === 1) {
            // setData(res.data.data)
            // callTheList()
            setData((prev) =>
              prev.map((preItem) =>
                preItem.id === params.id
                  ? {
                      ...preItem,
                      status: params.status === 0 ? 1 : 0,
                    }
                  : { ...preItem }
              )
            );
            enqueueSnackbar(res.data.message, { variant: "success" });

          } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
          }
        })
        .catch((Err) => {
          console.log(Err);
        });
    } else {
      enqueueSnackbar("Action cancelled", { variant: "info" });
    }
  };
 
  // ------------handlePlaceDelete
  const handlePlaceDelete=(deleteId)=>{
    if(window.confirm('Are You sure want to remove this place')){

      let placeFormdata = new FormData()
      placeFormdata.append('id', deleteId)
      placeFormdata.append('action', 3)//delete


      gomytripclient.post('/modifyTourPackagePlace', placeFormdata
      ).then(res => {
          if (res.data.status === 1) {
            setData((pre)=>pre.filter((dataa)=>deleteId != dataa.place_id))
              enqueueSnackbar(res.data.message, { variant: 'success' })
          } else {
              enqueueSnackbar(res.data.message, { variant: 'error' })

          }
      }).catch(err => {
          console.log(err)
      })
    }else{
      enqueueSnackbar('Last action was cancelld')
    }
  }

  const handleCategoryDelete=(data)=>{
    if(window.confirm(`Are You sure want to remove ${data.category_name}`)){

      let pay = {
        id:data.id,
        action:4
      }

      gomytripclient.post('/modifyTourCategories', pay
      ).then(res => {
          if (res.data.status === 1) {
            setData((pre)=>pre.filter((dataa)=>data.id != dataa.id))
              enqueueSnackbar(res.data.message, { variant: 'success' })
          } else {
              enqueueSnackbar(res.data.message, { variant: 'error' })
          }
      }).catch(err => {
          console.log(err)
      })
    }else{
      enqueueSnackbar('Last action was cancelld')
    }
  }
  const viewAllPackagesApi = (tourData) => {
    gomytripclient
      .post("/viewAllPackages", { id:tourData?.place_id })
      .then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          setTourPlaceDetails(res.data.data.getPlaceDetails);
          setTourPlaceState(true);
        } else {
          setTourPlaceDetails({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h4 className={adminAddCoupounStyles.headingstyle}>
        Tour Packages &gt; Management Tour
      </h4>
      {dialogState && (
        <AdminAddCategory
          open={dialogState}
          close={() => handleDialogState(false)}
          successCallBack={callTheList}
          editDetails={editData}
        />
      )}
      {tourPlaceState && (
        <AdminAddPlace
          open={tourPlaceState}
          close={() => handleAddPlaceDialog(false)}
          successCallBack={callTheList}
          editData={tourPlaceDetails}
        />
      )}
      <Container>
        <TabContext value={tabValue}>
          <Grid container justifyContent={"space-between"} sx={{position: "relative"}}>
            <Grid item>
              <TabList
                onChange={handleTabChange}
                sx={{
                  background: "#DFF3FF",
                  borderRadius: " 1rem 1rem 0rem 0rem",
                  width: "100%%",
                  marginBottom: "0.5rem",
                  height: "1rem",
                  position: "absolute",
                  marginTop: "35px",
                }}
                aria-label="Go bus Tabs"
                className={aftersearchflight.tabs}
                // variant="scrollable"
                orientation={"horizontal"}
                // scrollButtons={"off"}
              >
                <Tab
                  disableRipple
                  label="Package"
                  value="1"
                  sx={{
                    fontSize: "12px",
                    color: "#003556",
                    fontWeight: 600,
                    textTransform: "none",
                    minWidth: "95px",
                  }}
                />
                <Tab
                  disableRipple
                  label="Category"
                  value="2"
                  sx={{
                    fontSize: "12px",
                    padding: "0% 4%",
                    color: "#003556",
                    fontWeight: 600,
                    minWidth: "95px",
                    textTransform: "none",
                  }}
                />
              </TabList>
            </Grid>
            <Grid item>
              {tabValue == 1 ? (
                <Button
                  onClick={() => handleAddPlaceDialog(true)}
                  variant="contained"
                  className="bg-p"
                  sx={{textTransform: "none"}}
                >
                  <img  src={addplaceicon} alt="Add place icon" style={{marginRight:"5px"}} />
                  Add Place
                </Button>
              ) : (
                <Button
                  onClick={() => handleDialogState(true)}
                  variant="contained"
                  className="bg-p"
                  sx={{textTransform: "none"}}
                >
                  <img src={addplaceicon} alt="Add place icon" style={{marginRight:"5px"}} />
                  Add
                  {/* Category */}
                </Button>
              )}
            </Grid>
          </Grid>

          {/* Seat Selection */}

          <TabPanel value="1" sx={{ padding: "24px 0 0 0" }}>
            <Grid
              container
              direction="row"
              // flexDirection={'row'}
              spacing={0}
              className={""}
            >
              <Grid container mt={3}>
                <Grid item md={12} maxWidth={"100% !important"}>
                  <TableContainer className="adminTableContainer1">
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className={`${adminTableStyles.table} adminTable`}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell key={"1"}>{"S.No."}</TableCell>
                          <TableCell key={"2"}>{"Place"}</TableCell>
                          <TableCell key={"3"}>{"No.of Packages"}</TableCell>
                          <TableCell key={"4"}>{"Action"}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((placeData) => (
                          <TableRow key={placeData.s_no} hover role="checkbox">
                            <TableCell>{placeData.s_no}</TableCell>
                            <TableCell>{placeData.place_name}</TableCell>
                            <TableCell>{placeData.total_packages}</TableCell>
                            <TableCell>
                              <Grid container alignItems={"center"}>
                              
                                <Grid item md={1} xs={2} sx={{paddingLeft:'10px'}}>
                                  <IconButton
                                    onClick={() =>
                                      navigate("/admin/adminviewpackages", {
                                        state: { tourData: placeData },
                                      })
                                    }
                                    // disabled={placeData.total_packages == 0}
                                  >
                                    <RemoveRedEyeIcon />
                                  </IconButton>
                                </Grid>
                                <Grid item md={1} xs={2} sx={{paddingLeft:'10px'}}>
                                  <IconButton onClick={() =>viewAllPackagesApi(placeData)}>
                                    <CreateIcon/>
                                  </IconButton>
                                </Grid>
                                <Grid item md={1} xs={2} sx={{paddingLeft:'10px'}}> 
                                <IconButton onClick={() => handlePlaceStatus(placeData)}>
                                  <BlockIcon
                                    color={`${
                                      placeData?.status == 0
                                        ? "success"
                                        : "error"
                                    }`}
                                  />
                                </IconButton>                      
                                {/* <FormControlLabel
                                    value="end"
                                    control={
                                        <AntSwitchReverse
                                            onChange={(e) =>
                                                handlePlaceStatus(e,placeData)
                                            }
                                            size="small"
                                        // color={`${!editData.status ? "error" : "success"
                                        //     }`}
                                        />
                                    }
                                    labelPlacement="end"
                                    checked={placeData?.status}
                                /> */}
                                </Grid>
                                <Grid item md={1} xs={2} sx={{paddingLeft:'10px',paddingRight: "10px"}}>
                                  <IconButton onClick={(e)=>handlePlaceDelete(placeData.place_id)}>
                                    <DeleteIcon color="error" />
                                  </IconButton>
                                </Grid>
                                <Grid item>
                                  <Button
                                    onClick={() =>
                                      navigate("/admin/adminAddPackage", {
                                        state: { placeData: placeData },
                                      })
                                    }
                                    variant="outlined"
                                    size="small"
                                  >
                                    Add PAckage to this place
                                  </Button>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={"2"} sx={{ padding: "24px 0 0 0" }}>
            <Grid
              container
              direction="row"
              // flexDirection={'row'}
              spacing={0}
              className={""}
            >
              <Grid container mt={3}>
                <Grid item md={12}>
                  {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                  <TableContainer
                    // sx={{ maxHeight: 440 }}
                    className="adminTableContainer1"
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className={`${adminTableStyles.table} adminTable`}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell key={"1"}>{"S.No."}</TableCell>
                          <TableCell key={"2"}>{"Category Name"}</TableCell>
                          <TableCell key={"3"}>{"Group"}</TableCell>
                          <TableCell key={"4"}>{"Action"}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((data, index) => (
                          <TableRow key={data?.s_no} hover role="checkbox">
                            <TableCell>{data?.s_no}</TableCell>
                            <TableCell>{data?.category_name}</TableCell>
                            <TableCell>
                              {data?.category_type == 1
                                ? "Main Category"
                                : "Sub Category"}
                            </TableCell>
                            <TableCell>
                              <Stack flexDirection={"row"}>
                                {/* <Alert severity={`${data.block_status === 0 ? "success" : 'error'}`} icon={false}>{`${data.block_status === 0 ? "Active" : 'In-active'}`}</Alert> */}
                                <IconButton onClick={() => changeStatus(data)}>
                                  <BlockIcon
                                    color={`${
                                      data?.status == 0
                                        ? "success"
                                        : "error"
                                    }`}
                                  />
                                </IconButton>
                                <IconButton
                                disabled={data?.status === 1}
                                onClick={(e)=>handleCategoryDelete(data)}>
                                    <DeleteIcon color="error" />
                                  </IconButton>
                                <IconButton
                                  disabled={data?.status === 1}
                                  onClick={() => {
                                    setEditData(data);
                                    handleDialogState(true);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <Grid
            container
            justifyContent={"space-between"}
            mt={2}
            alignItems={"baseline"}
          >
            <Grid item>
              {pageNumber * 10 - 10 + 1} - {totalRecordsCount} of{" "}
              {pageNumber * 10 - 10 + 10}
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
                forcePage={pageNumber ==0?1:pageNumber-1}
              />
            </Grid>
          </Grid>
        </TabContext>
      </Container>
    </>
  );
};

export default AdminTourManagement;
