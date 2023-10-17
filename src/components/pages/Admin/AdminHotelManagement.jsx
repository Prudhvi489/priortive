import {
    Container,
    Grid,
    TextField,
    Button,
    Paper,
    Stack,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import BusesPageBackDrop from "../Buses/BusesPageBackDrop";
  import Tab from "@mui/material/Tab";
  import { TabContext, TabList, TabPanel } from "@mui/lab";
  import {
    aftersearchflights,
  } from "../../../assets/styles/Flights";
  import axios from "axios";
  import "react-dates/initialize";
  import "react-dates/lib/css/_datepicker.css";
  import { DateRangePicker } from "react-dates";
  import helperFunctions from "../../../helpers/helperFunctions.js";
  import ReactPaginate from "react-paginate";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
  import { adminAddCoupoun, adminTables } from "./AdminStyles";
  import { DownloadFileFromApi } from "../../../ApiServices/DownloadFilesApi";
  import revenue from "../../../assets/AdminAssets/revenue.svg";
  import vendor from "../../../assets/AdminAssets/vendor.svg";
  import yourshare from "../../../assets/AdminAssets/yourshare.svg";
  import refund from "../../../assets/AdminAssets/refund.svg";
  import addhotel from '../../../assets/AdminAssets/addhotel.svg';
  import { withStyles } from '@material-ui/core/styles';
  import BlockIcon from '@mui/icons-material/Block';
  import EditIcon from '@mui/icons-material/Edit';
import Addhotelmodal from "../../modals/AdminModals/Addhotelmodal";
import { Subadminapicalls } from "../../../ApiServices/Subadminapicalls";
import Blockhotelconfirmation from "../../modals/AdminModals/Blockhotelconfirmation";
import { makeStyles } from "@mui/styles";
  const StyledTableCell = withStyles((theme) => ({
    head: {
      // backgroundColor: 'rgba(0, 53, 86, 1)', 
      // color: "#fff",
      borderRight: '1px solid white', 
      height:'100%!important',
      // borderRadius:'0px!important'
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const tableecell = makeStyles({
    cell:{
      background:'#003556!important',
      color:'#fff !important',borderColor:'#fff!important',
      borderRadius:'0px !important'
    }
  })
  const AdminHotelManagement = () => {
    const tcell = tableecell()
    const adminAddCoupounStyles = adminAddCoupoun();
    const aftersearchflight = aftersearchflights();
    const [tabValue, setTabValue] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecordsCount, setTotalRecordsCount] = useState(200);
    const [gmtsearchString, setGmtsearchString] = useState("");
    const [selfsearchString,setSelfsearchstring]=useState("")
    const [hotelmodal,setHotelmodal]=useState(false)
    const [hotels,setHotels]=useState([])
    const [editdata,setEditdata]=useState({})
    const [block,setBlock]=useState(false);
    const handleTabChange = (event, tabValue) => {
      setTabValue(tabValue);
      setPageNumber(1)
    };
    const handlePageClick = (event) => {
      setPageNumber(event.selected + 1);
    };
    //Get GMT_hotels data funtion
    const get_gmt_hotels=async()=>{
        try{
          const endpoint=`gmtHotels/${pageNumber}/${pageSize}/${tabValue}`
          const res=await Subadminapicalls(endpoint,{},"GET","application/json")
          if(res.status){
            setEditdata({})
            setHotels(res.data.hotels);
            setTotalRecordsCount(res.data.total)
            setTotalPages(res.data.total/pageSize)
            console.log(res)
          }
          else{
            alert(res.message)
          }
        }
        catch(error){
          alert(error)
        }
    }
    // search hotels futnionality
    const search_hotels=async()=>{
      try{
        const endpoint=`gmtHotelSearch/${pageNumber}/${pageSize}/${tabValue}/${tabValue===1?gmtsearchString:selfsearchString}`
        const res=await Subadminapicalls(endpoint,{},"GET","application/json")
        if(res.status){
          setHotels(res.data.hotels);
          setTotalRecordsCount(res.data.totalCount);
          setTotalPages(res.data.totalCount/pageSize)
        }
        else{
          alert(res.message)
        }
      }
      catch(error){

      }
    }
    useEffect(()=>{
      if(((tabValue===1&&gmtsearchString==="")||(tabValue===0&&selfsearchString===""))){
        get_gmt_hotels();
      }
      else{
        search_hotels()
      }
    },[tabValue,pageNumber,gmtsearchString,selfsearchString])
    // search debounce method
    useEffect(()=>{
    if(gmtsearchString!==""){
     const delayDebounceFn = setTimeout(() => {
        search_hotels();
       }, 1000)  
        return () => clearTimeout(delayDebounceFn)
    }
   },[gmtsearchString,selfsearchString])
  // getting hotels initial load
    useEffect(()=>{
      get_gmt_hotels()
    },[])
  // get edit hotel data
  const getedit_hotel=async(hotelid,type)=>{
    try{
      const endpoint=`gmtHotels/${pageNumber}/${pageSize}/${tabValue}/${hotelid}`
        const res=await Subadminapicalls(endpoint,{},"GET","application/json");
        if(res.status){
          setEditdata(res.data.hotel)
          if(type==="view"){
            setHotelmodal(true)
          }
          else{
            setBlock(true)
          }
        }
        else{
          alert(res.message)
        }
    }
    catch(error){
      alert(error)
    }
  }

    return (
      <>
      <Blockhotelconfirmation open={block} close={()=>setBlock(false)} blockdata={editdata} hotels_refresh={get_gmt_hotels}/>
      <Addhotelmodal open={hotelmodal} close={()=>setHotelmodal(false)} Editdata={editdata} type={tabValue}  hotels_refresh={get_gmt_hotels} />
        <h4 className={adminAddCoupounStyles.headingstyle}>Management Hotels</h4>
  
        {/* <Container maxWidth="xl"> */}
          <TabContext value={tabValue}>
            <TabList
              onChange={handleTabChange}
              sx={{
                background: "#DFF3FF",
                borderRadius: "1rem",
                // width: "29%",
                width:'310px',
                maxWidth:'100%',
                marginBottom: "0.5rem",
                height: "1rem",
              }}
              aria-label="hotel Tabs"
              className={aftersearchflight.tabs}
              variant="scrollable"
              orientation={"horizontal"}
              scrollButtons={"off"}
            >
              
              <Tab
                disableRipple
                label="GMT Management"
                value={1}
                sx={{
                  fontSize: "13px",
                  padding: "0% 4%",
                  color: "#003556",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />
              <Tab
                disableRipple
                label="Self Management"
                value={0}
                sx={{
                  fontSize: "13px",
                  padding: "0% 5.5%",
                  color: "#003556",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              />  
            </TabList>  
            <TabPanel value={tabValue} sx={{ padding: "10px 0" }}>
              
                <>
                  <Grid
                    container
                    direction="row"
                    spacing={0}
                    className={""}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems={"center"}
                      columnGap={1.3}
                    >
                      <Grid item sm>
                        <TextField
                          variant="outlined"
                          label="Search"
                          size="small"
                          value={tabValue===1?gmtsearchString:selfsearchString}
                          onChange={(e) => {
                            setPageNumber(1)
                            if(tabValue===1){
                              setGmtsearchString(e.target.value)
                            }
                            else{
                              setSelfsearchstring(e.target.value)
                            }
                             }}
                        />
                      </Grid>
                      <Grid item sm={'auto'}>
                        <Grid container spacing={2} alignItems={"baseline"}>
                          <Grid item>
                            <Button
                              className="bg-p"
                              size="small"
                              variant="contained"
                              disableRipple
                              onClick={()=>{
                                setEditdata({})
                                setHotelmodal(true)
                              }}
                              startIcon={<img src={addhotel} alt="add hotel" />}
                            >
                              {/* <img src={addhotel} alt="add hotel" width="20%" /> */}
                             Add Hotel
                            </Button>
                          </Grid>        
                        </Grid>
                      </Grid>
                    </Grid>
  
                    <Grid container mt={3}>
                      <Grid item sx={{width: "100%"}}>
                      <TableContainer style={{maxHeight:'500px',borderTopLeftRadius:'1rem',borderTopRightRadius:'1rem'}}>
          <Table >
            
             <TableHead style={{position:'sticky',top:0,zIndex:1}}>
              <TableRow>
                <StyledTableCell className={tcell.cell} style={{width:'20px'}}>S.No</StyledTableCell>
                <StyledTableCell className={tcell.cell}>Hotel Name</StyledTableCell>
                <StyledTableCell className={tcell.cell}>ID</StyledTableCell>
                <StyledTableCell className={tcell.cell}>Contact Number</StyledTableCell>
                <StyledTableCell  className={tcell.cell} style={{width:'200px'}}>Mail ID</StyledTableCell>
                {/* <StyledTableCell>Address</StyledTableCell> */}
{tabValue===1&&<StyledTableCell className={tcell.cell} >Assigned Person</StyledTableCell>
}                <StyledTableCell className={tcell.cell} >Actions</StyledTableCell>
              </TableRow>
          
            </TableHead>
            <TableBody style={{maxHeight:'100%',overflow:"auto"}}>
                {
                  totalRecordsCount>0&&hotels.map((item,index)=>{
                    return(
                      <TableRow>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{(index+1).toString().padStart(2,"0")}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{item.hotel_name}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{item.hotel_code}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{item.hotel_contact}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{item.mail}</TableCell>
                  {/* <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Single</TableCell> */}
                 {tabValue===1&& <TableCell style={{borderRight:'1px solid #DCDCDC'}}>
                   {item.assigned_person}
                   </TableCell>}
                  <TableCell style={{borderRight:'1px solid #DCDCDC',textAlign:"center"}}>
                      <Stack direction={'row'} spacing={1} textAlign={'center'}>
                        <BlockIcon sx={{color:`${item.block_status===0?'':'red'}`}} onClick={()=>getedit_hotel(item?.hotel_code,"block")}/>
                        <EditIcon onClick={()=>{
                          getedit_hotel(item?.hotel_code,"view")}}/>
                      </Stack>
                  </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
           
          </Table>
                      </TableContainer>
                      </Grid>
                    </Grid>
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
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              
            </TabPanel>
          </TabContext>
        {/* </Container> */}
      </>
    );
  };
  
  export default AdminHotelManagement;
  