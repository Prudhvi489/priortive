import { Container, Grid, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import BusesPageBackDrop from "../Buses/BusesPageBackDrop";
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
import { adminTables } from "./AdminStyles";
import { useNavigate } from "react-router-dom";
import gomytripclient from "../../../GomytripClient";
import CouponView from "../../modals/AdminModals/CouponView";
import { convertDateFormat } from "../Buses/BusModuleHelperFunctions";
import { enqueueSnackbar } from "notistack";
import { AntSwitch } from "./AdminStyles";
import { adminAddCoupoun } from "./AdminStyles";
import addhotel from "../../../assets/AdminAssets/addhotel.svg";
import EditIcon from '@mui/icons-material/Edit';
import GMT_Team_Add_mem from "../../modals/AdminModals/GMT_Team_Add_mem";
import { Subadminapicalls } from "../../../ApiServices/Subadminapicalls";
import MySnackbar from "../../modals/Signupmodals/Snackbar";
import { envdata } from "../../Envexports";
import axios from "axios";

const AdminGMTTeam = () => {
  const adminAddCoupounStyles = adminAddCoupoun();
  const adminTableStyles = adminTables();
  const aftersearchflight = aftersearchflights();
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [totalRecordsCount, setTotalRecordsCount] = useState("");
  const [searchString, setSearchString] = useState("");
  // 0->add member
  // 1->edit member
  const [mem_data,setMem_data]=useState({
    type:0,
    data:{}
  })
  



  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
  };
  let columns = [
    "S.No.",
    "Name",
    "Contact Number",
    "Mail ID",
    "Address",
    "Status",
    "Action",
  ];
  const navigate = useNavigate();

  // GTM team add member state's
  const [GMTTopen,SetGMTTopen] = useState(false)
  function GMTTclose(){
    SetGMTTopen(false)
  }
// Assignees list 
const get_all_assignees=async(id)=>{
let endpoint;
  const data={
    "page":pageNumber,
    "limit":pageSize
  }
  if(id===undefined&&searchString===""){
    setMem_data((prev)=>({...prev,type:0}))
    endpoint=`team/${pageNumber}/${pageSize}`
  }
  else if(id===undefined&& searchString!==""){
    endpoint=`teamSearch/${pageNumber}/${pageSize}/0/${searchString}`
  }
  else{
    setMem_data((prev)=>({...prev,type:1}))
    endpoint=`team/${pageNumber}/${pageSize}/${id}`
  }
  try{
  const res=await Subadminapicalls(endpoint,data,"GET","application/json");
  if(res.status&&id===undefined){
    setData(res.data.members)
    setTotalRecordsCount(res.data.total)
    setTotalPages(res.data.total/10)
  }
  else if(res.status&&id!==undefined){
    setMem_data((prev)=>({...prev,data:res.data.member}))
    SetGMTTopen(true)

  }
  else{
    setSnackopen(true);
    setSnackmessage(res.message);
    // alert(res.message)
  }
}
catch(error){
  setSnackopen(true);
  setSnackmessage(error);
  // alert(error)
}
}
useEffect(()=>{
  get_all_assignees();
},[pageNumber])
useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      get_all_assignees();
    }, 1000)
  
     return () => clearTimeout(delayDebounceFn)
},[searchString])

  return (
    <>
    <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      {/* GTM team add member dialog */}
      {GMTTopen && <GMT_Team_Add_mem open={GMTTopen} close={GMTTclose} memdata={mem_data} datarefresh={()=>get_all_assignees()}/>}

      <h4 className={adminAddCoupounStyles.headingstyle}>GMT Team</h4>
      {/* <Container maxWidth="xl"> */}
        <Grid
          container
          direction="row"
          // flexDirection={'row'}
          spacing={0}
          className={""}
          mt={2}
        >
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Grid item sm>
              <TextField
                placeholder="Search"
                variant="outlined"
                label="Search"
                size="small"
                // sx={{width:'450px'}}
                onChange={(e) => {
                  setPageNumber(1);
                  setSearchString(e.target.value)}}
              />
            </Grid>
            <Grid item sm={'auto'}>
              <Grid container spacing={2} alignItems={"baseline"}>
                <Grid item>
                  <Button className="bg-p" size="small" variant="contained" startIcon={<img src={addhotel} alt="Add member" />} sx={{padding:'7px 15px 8px 15px',borderRadius:'0.5rem',fontWeight:'700',textTransform:'none'}} onClick={()=>{
                     setMem_data((prev)=>({...prev,type:0}));
                    SetGMTTopen(true)}}>
                    Add Member
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container mt={3}>
            <Grid item md={12} maxWidth={'100% !important'}>
              <TableContainer
                className="adminTableContainer"
              >
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className={`${adminTableStyles.table} adminTable`}
                >
                  <TableHead>
                    <TableRow>
                      {columns?.map((column) => (
                        <TableCell key={column} sx={{color:'#fff!important'}}>{column}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((data,index) => {
                        return(
                        <TableRow key={index} hover role="checkbox">
                          <TableCell>{((index+1)+(pageSize*(pageNumber-1))).toString().padStart(2,0)}</TableCell>
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.number}</TableCell>
                          <TableCell>{data.mail}</TableCell>
                          <TableCell sx={{width:'200px'}}>{data.address}</TableCell>
                          <TableCell sx={{textAlign:'center'}}>
                            {data.status ?
                            <Button className={adminTableStyles.activeBtn}>Active</Button> :
                            <Button className={adminTableStyles.InactiveBtn}>In-Active</Button>}
                          </TableCell>
                          <TableCell >
                            <Grid container >
                              <Grid item md={6}>
                                <EditIcon onClick={()=>get_all_assignees(data.id)} />
                              </Grid>
                              <Grid item md={6}>
                                <RemoveRedEyeIcon
                                  onClick={()=>navigate('/admin/admingmtteamview',{state:{id:data.id}})}
                                />
                              </Grid>
                            </Grid>
                          </TableCell>
                          
                        </TableRow>
                      )})}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* </Paper> */}
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"space-between"}
            mt={2}
            alignItems={"baseline"}
          >
            <Grid item>
              showing {pageNumber * 10 - 10 + 1} - {pageNumber * 10 - 10 + 10}of{" "}
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
              />
            </Grid>
          </Grid>
        </Grid>
      {/* </Container> */}
    </>
  );
};

export default AdminGMTTeam;
