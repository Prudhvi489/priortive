import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { Button, Grid, Tab, TextField } from '@mui/material'
import TableCell from '@material-ui/core/TableCell';
import React, { useContext, useEffect, useState } from 'react'
import { bookings_styles } from '../../../assets/styles/Subadminstyles'
import { withStyles } from '@material-ui/core/styles';
import ReactPaginate from 'react-paginate';
import file from '../../../assets/Subadminassets/file.svg';
import { DateRangePicker } from 'react-dates';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MySnackbar from '../../modals/Signupmodals/Snackbar';
import Subadmincontext from '../../../parts/Subadminparts/Subadminprovider';
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';
import {styles} from '../../../assets/styles/Styles_export'
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(0, 53, 86, 1)',
    color: theme.palette.common.white,
    borderRight: '1px solid white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Bookings = () => {
  const [bookingstab, setBookingstab] = useState(2)
  const booking_styles = bookings_styles()
  const [future_startDate, setFuture_startDate] = useState(null);
  const [future_endDate, setFuture_endDate] = useState(null);
  const [cancelled_startDate, setCancelled_startDate] = useState(null)
  const [cancelled_endDate, setCancelled_endDate] = useState(null);
  const [completed_startDate, setCompleted_startDate] = useState(null);
  const [completed_endDate, setCompleted_endDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(5)
  const [totalRecordsCount, setTotalRecordsCount] = useState(50)
  // future 
  const [futuresearch, setFuturesearch] = useState(null);
  const [cancelledsearch, setCancelledsearch] = useState(null);
  const [completedsearch, setCompletedsearch] = useState(null)
  // table max width state
  const [tableMaxWidth,setTableMaxWidth] = useState(`calc(${window.innerWidth}px - 268px)`);
  useEffect(() => {
    const handleResizeMaxWidth = () => {
      setTableMaxWidth(`calc(${window.innerWidth}px - 268px)`);
    };
    window.addEventListener('resize', handleResizeMaxWidth);
    return () => {
      window.removeEventListener('resize', handleResizeMaxWidth);
    };
  }, []);

  const future_search = (e) => {
    setFuturesearch(e.target.value)
  }
  const cancelled_search = (e) => {
    setCancelledsearch(e.target.value)
  }
  const completed_search = (e) => {
    setCompletedsearch(e.target.value)
  }
  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
  }
  const handlefuturedates = ({ startDate, endDate }) => {
    if(!startDate && endDate){
      setSnack((prev)=>({...prev,snackopen:true,snackmessage:'Setting an end date before the start date is not possible.'}))
      return
    }
    setFuture_startDate(startDate);
    setFuture_endDate(endDate);
  };
  const handlecancelleddates = ({ startDate, endDate }) => {
    if(!startDate && endDate){
      setSnack((prev)=>({...prev,snackopen:true,snackmessage:'Setting an end date before the start date is not possible.'}))
      return
    }
    setCancelled_startDate(startDate);
    setCancelled_endDate(endDate)
  }
  const handlecompleteddates = ({ startDate, endDate }) => {
    if(!startDate && endDate){
      setSnack((prev)=>({...prev,snackopen:true,snackmessage:'Setting an end date before the start date is not possible.'}))
      return
    }
    setCompleted_startDate(startDate);
    setCompleted_endDate(endDate)
  }
  const handleFocusChange = (focusedInput) => {

    setFocusedInput(focusedInput);
  };
  const [snack,setSnack] = useState({
    snackopen : false,
    snackmessage : '',
  })

  const {data,setData}=useContext(Subadmincontext)

  useEffect(()=>{
    let tab = bookingstab === 2 ? 'Future Bookings' : bookingstab === 4 ? 'Cancelled Booking' : bookingstab === 3 && 'Completed Bookings';
    setData((prev)=>({...prev,activeTab:tab}));
  },[bookingstab])

  // get table data start's
  useEffect(()=>{
    getTableData()
  },[bookingstab])
  // on search start's
  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      if(futuresearch!==null){
        getTableData();
      }
    }, 1000)
  
     return () => clearTimeout(delayDebounceFn)
  },[futuresearch])

  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      if(cancelledsearch!==null){
        getTableData();
      }
    }, 1000)
  
     return () => clearTimeout(delayDebounceFn)
  },[cancelledsearch])

  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      if(completedsearch!==null){
        getTableData();
      }
    }, 1000)
  
     return () => clearTimeout(delayDebounceFn)
  },[completedsearch])
  // on search end's
  // time filter start's
  useEffect(()=>{
    if(future_startDate !== null && future_endDate !== null){
      getTableData()
      if(future_startDate==""&&future_endDate==""){
        setFuture_startDate(null)
        setFuture_endDate(null)
      }
    }
  },[future_startDate,future_endDate])

  useEffect(()=>{
    if(completed_startDate!==null && completed_endDate!==null){
      getTableData()
      if(completed_startDate==""&&completed_endDate==""){
        setFuture_startDate(null)
        setFuture_endDate(null)
      }
    }
  },[completed_startDate,completed_endDate])

  useEffect(()=>{
    if(cancelled_startDate!==null && cancelled_endDate!==null){
      getTableData()
      if(cancelled_startDate==""&&cancelled_endDate==""){
        setFuture_startDate(null)
        setFuture_endDate(null)
      }
    }
  },[cancelled_startDate,cancelled_endDate])
  // time filter end's

  const hotelNow = JSON.parse(localStorage.getItem('subadmin_login_details'))
  const [tableData,setTableData] = useState([])
  // get function
  async function getTableData(){
    let bookingId;
    let fromDate;
    let toDate;

    if(bookingstab===2){
      bookingId = futuresearch;
      fromDate = future_startDate;
      toDate = future_endDate;
    }else if(bookingstab===4){
      bookingId = cancelledsearch;
      fromDate = cancelled_startDate;
      toDate = cancelled_endDate;
    }else if(bookingstab===3){
      bookingId = completedsearch;
      fromDate = completed_startDate;
      toDate = completed_endDate;
    }

    const sending_data = {
      bookingId,
      hotelCode: hotelNow?.hotel_code,
      type:bookingstab,
      fromDate,
      toDate,
      page:1,
      limit:10
    }
    const res = await Subadminapicalls('bookingSubAdmin',sending_data,"POST","application/json");
    console.log(res);
    if(res.status){
      setTableData(res?.data?.BookingDetails)
      setTotalRecordsCount(res?.data?.totalCount)
      setTotalPages(res?.data?.totalCount/10)
    }else{
      setSnack((prev)=>({...prev,snackopen:true,snackmessage:res?.message}))
    }
  }
  function getdate(Getdate){
    const date = new Date(Getdate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to the month because it's zero-based
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  // get table data end's

  return (
    <>
      <MySnackbar open={snack.snackopen} close={()=>setSnack((prev)=>({...prev,snackopen:false}))} message={snack.snackmessage} />
      <TabContext mt={1} value={bookingstab} >
        <TabList className={booking_styles.bookingslist} style={{marginLeft:'1.5rem'}} onChange={(e, value) => setBookingstab(value)}>
          <Tab label="Future Bookings" disableRipple value={2} sx={{ textTransform: 'none',opacity:1,color:styles.app_color }} />
          <Tab label="Cancelled Booking" disableRipple value={4} sx={{ textTransform: 'none', marginLeft: "0.7rem!important",opacity:1,color:styles.app_color }} />
          <Tab label="Completed Bookings" disableRipple value={3} sx={{ textTransform: 'none',opacity:1,color:styles.app_color }} />
        </TabList>
        {/* Future Bookings */}
        <TabPanel value={2}>
          <Grid container justifyContent={'space-between'} alignItems={'center'} rowGap={2}>
            <Grid item><TextField size="small" label="Search" value={futuresearch} onChange={(e) => future_search(e)} /></Grid>
            <Grid item>
              <Grid container columnGap={0.5} rowGap={1} alignItems={'center'}>
                <Grid item md={'auto'}><Button variant='contained' startIcon={<img src={file} />} style={{ backgroundColor: styles.app_color }} disableRipple>Download</Button></Grid>
                <Grid item md={'auto'} className="start-end-dates">
                  <Grid style={{border:`1px solid ${styles.app_color}`,paddingRight:'0.3rem',paddingLeft:'0.11rem',borderRadius:'0.3rem'}} container alignItems="center">
                    <DateRangePicker
                      startDate={future_startDate}
                      startDateId="startdate"
                      endDate={future_endDate}
                      endDateId="enddate"
                      // startDatePlaceholderText="Start Date"
                      small="true"
                      onDatesChange={handlefuturedates}
                      focusedInput={focusedInput}
                      onFocusChange={handleFocusChange}
                      isOutsideRange={() => false} // Optional: Allows selection of past dates
                      noBorder={true}
                    />
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="#003556" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7025 8.59546C16.7025 8.66255 16.7025 8.71982 16.7025 8.77751C16.7025 10.5104 16.7038 12.2432 16.7021 13.9761C16.7012 14.9906 16.0851 15.803 15.1385 16.0295C14.9643 16.0709 14.7803 16.085 14.6006 16.085C11.4568 16.0885 8.31347 16.0885 5.16971 16.0868C4.09504 16.0859 3.27142 15.4004 3.08953 14.3594C3.06946 14.2449 3.06733 14.1261 3.06733 14.009C3.06605 12.2548 3.06647 10.5005 3.06647 8.74674C3.06647 8.69973 3.07074 8.65272 3.07373 8.59546C7.61239 8.59546 12.1442 8.59546 16.7025 8.59546Z" />
                    <path d="M13.9778 4.48918C14.2096 4.48918 14.4167 4.4879 14.6238 4.48918C15.8197 4.4973 16.695 5.37506 16.7031 6.57375C16.7044 6.78101 16.7031 6.98827 16.7031 7.20579C12.1564 7.20579 7.62111 7.20579 3.08373 7.20579C3.00432 6.36051 3.08117 5.5695 3.78524 4.97592C4.13023 4.6849 4.52517 4.51482 4.97691 4.49559C5.24162 4.48405 5.5072 4.49345 5.79241 4.49345C5.79241 4.25243 5.79241 4.03064 5.79241 3.80885C5.79241 3.59048 5.79113 3.37168 5.79284 3.15331C5.79583 2.74777 6.07634 2.44948 6.45848 2.44307C6.85257 2.43623 7.14846 2.72383 7.157 3.1375C7.16511 3.52125 7.15913 3.90501 7.15913 4.28876C7.15913 4.34688 7.15913 4.40499 7.15913 4.47593C8.97801 4.47593 10.7849 4.47593 12.6106 4.47593C12.6106 4.34901 12.6106 4.22808 12.6106 4.10671C12.6106 3.78706 12.6064 3.46698 12.6119 3.14733C12.6196 2.73195 12.9091 2.44008 13.3015 2.44264C13.6917 2.44521 13.9752 2.74392 13.9774 3.15929C13.9795 3.59561 13.9778 4.03193 13.9778 4.48918Z" />
                    </svg>
                  </Grid>
                </Grid>
                <Grid item md={2}>
                  <Button fullWidth variant='contained' style={{ backgroundColor: styles.app_color }} disableRipple onClick={()=>{setFuture_startDate("");setFuture_endDate('')}}>Clear</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={0} direction={'column'} style={{ marginTop: '20px' }}>
            <TableContainer style={{ maxHeight: '500px',maxWidth:tableMaxWidth,}} className='tableResponsive_bookings'>
              <Table >

                <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                  <TableRow >
                    <StyledTableCell style={{ width: '20px', borderTopLeftRadius: '1rem' }}>S.No</StyledTableCell>
                    <StyledTableCell >Person name</StyledTableCell>
                    <StyledTableCell>Booking Number</StyledTableCell>
                    <StyledTableCell>Booked Date</StyledTableCell>
                    <StyledTableCell style={{ width: '150px' }}>Email</StyledTableCell>
                    <StyledTableCell>Check In - Check Out</StyledTableCell>
                    <StyledTableCell>Room Type</StyledTableCell>
                    <StyledTableCell style={{ borderTopRightRadius: '1rem' }}>Price</StyledTableCell>
                  </TableRow>

                </TableHead>
                <TableBody style={{ maxHeight: '100%', overflow: "auto" }}>
                  {
                    tableData?.length>0&&tableData.map((item, index) => {
                      return (
                        <TableRow>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{index+1}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.booked_by_name}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.booking_id}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.booked_date}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.ticket_sent_mail}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{`${getdate(item?.from_date)} - ${getdate(item?.to_date)}`}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.room_type_name}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{`INR ${item?.total_price}`}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>

              </Table>
            </TableContainer>

            <Grid container justifyContent={'space-between'} mt={2} alignItems={'baseline'}>
              <Grid item>
                showing {pageNumber * 10 - 10 + 1} - {pageNumber * 10 - 10 + 10}of {totalRecordsCount}
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
                  containerClassName='mainPageCont'
                  activeClassName='activeClassName'
                  activeLinkClassName='activeLinkClassName'
                  pageClassName='pageClassName'
                />
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        {/* Cancelled bookings */}
        <TabPanel value={4}>
          <Grid container justifyContent={"space-between"} alignItems={"center"} rowGap={2}>
            <Grid item>
              <TextField size="small" label="Search" value={cancelledsearch} onChange={(e) => cancelled_search(e)} />
            </Grid>
            <Grid item>
              <Grid container columnGap={0.5} rowGap={1} alignItems={"center"}>
                <Grid item md={'auto'}>
                  <Button
                    variant="contained"
                    startIcon={<img src={file} />}
                    style={{ backgroundColor:styles.app_color }}
                    disableRipple
                  >
                    Download
                  </Button>
                </Grid>
                <Grid item md={'auto'} className="start-end-dates">
                  <Grid style={{border:`1px solid ${styles.app_color}`,paddingRight:'0.3rem',paddingLeft:'0.11rem',borderRadius:'0.3rem'}} container alignItems="center">
                    <DateRangePicker
                      startDate={cancelled_startDate}
                      startDateId="startdate"
                      endDate={cancelled_endDate}
                      endDateId="enddate"
                      onDatesChange={handlecancelleddates}
                      focusedInput={focusedInput}
                      onFocusChange={handleFocusChange}
                      isOutsideRange={() => false} // Optional: Allows selection of past dates
                      small="true"
                      noBorder={true}
                    />
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="#003556" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7025 8.59546C16.7025 8.66255 16.7025 8.71982 16.7025 8.77751C16.7025 10.5104 16.7038 12.2432 16.7021 13.9761C16.7012 14.9906 16.0851 15.803 15.1385 16.0295C14.9643 16.0709 14.7803 16.085 14.6006 16.085C11.4568 16.0885 8.31347 16.0885 5.16971 16.0868C4.09504 16.0859 3.27142 15.4004 3.08953 14.3594C3.06946 14.2449 3.06733 14.1261 3.06733 14.009C3.06605 12.2548 3.06647 10.5005 3.06647 8.74674C3.06647 8.69973 3.07074 8.65272 3.07373 8.59546C7.61239 8.59546 12.1442 8.59546 16.7025 8.59546Z" />
                    <path d="M13.9778 4.48918C14.2096 4.48918 14.4167 4.4879 14.6238 4.48918C15.8197 4.4973 16.695 5.37506 16.7031 6.57375C16.7044 6.78101 16.7031 6.98827 16.7031 7.20579C12.1564 7.20579 7.62111 7.20579 3.08373 7.20579C3.00432 6.36051 3.08117 5.5695 3.78524 4.97592C4.13023 4.6849 4.52517 4.51482 4.97691 4.49559C5.24162 4.48405 5.5072 4.49345 5.79241 4.49345C5.79241 4.25243 5.79241 4.03064 5.79241 3.80885C5.79241 3.59048 5.79113 3.37168 5.79284 3.15331C5.79583 2.74777 6.07634 2.44948 6.45848 2.44307C6.85257 2.43623 7.14846 2.72383 7.157 3.1375C7.16511 3.52125 7.15913 3.90501 7.15913 4.28876C7.15913 4.34688 7.15913 4.40499 7.15913 4.47593C8.97801 4.47593 10.7849 4.47593 12.6106 4.47593C12.6106 4.34901 12.6106 4.22808 12.6106 4.10671C12.6106 3.78706 12.6064 3.46698 12.6119 3.14733C12.6196 2.73195 12.9091 2.44008 13.3015 2.44264C13.6917 2.44521 13.9752 2.74392 13.9774 3.15929C13.9795 3.59561 13.9778 4.03193 13.9778 4.48918Z" />
                    </svg>
                  </Grid>
                </Grid>
                <Grid item md={2}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor:styles.app_color }}
                    disableRipple
                    fullWidth
                    onClick={()=>{setCancelled_startDate("");setCancelled_endDate('')}}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            direction={"column"}
            style={{ marginTop: "20px" }}
          >
            <TableContainer style={{ maxHeight: "500px",maxWidth:tableMaxWidth, }}>
              <Table>
                <TableHead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                  <TableRow>
                    <StyledTableCell
                      style={{ width: "20px", borderTopLeftRadius: "1rem" }}
                    >
                      S.No
                    </StyledTableCell>
                    <StyledTableCell>Person name</StyledTableCell>
                    <StyledTableCell>Booking Number</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Check In - Check Out</StyledTableCell>
                    <StyledTableCell>Room Type</StyledTableCell>
                    <StyledTableCell>Remark</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ maxHeight: "100%", overflow: "auto" }}>
                  {
                  tableData?.length>0&&tableData.map((item, index) => {
                    console.log(item,"item")
                    return (
                      <TableRow>
                        <TableCell style={{ borderRight: "1px solid #DCDCDC" }}>
                          {index+1}
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid #DCDCDC" }}>
                          {item?.person_name}
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid #DCDCDC" }}>
                          {item?.booking_id}
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid #DCDCDC" }}>
                          {item?.ticket_sent_mail}
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid #DCDCDC" }}>
                          {/* {`${item?.from_date} - ${item?.to_date}`} */}
                          {`${getdate(item?.from_date)} - ${getdate(item?.to_date)}`}
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid #DCDCDC" }}>
                          {item?.room_type_name}
                        </TableCell>
                        <TableCell style={{ borderRight: "1px solid #DCDCDC" }}>
                          i dont want to travel
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {/*
            <TableBody>
              <TableRow>
               <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Helllow</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
              </TableRow>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>hello</TableCell>
                    <TableCell>world</TableCell>
                  </TableRow>
                ))}
            </TableBody> */}
              </Table>
            </TableContainer>

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
        </TabPanel>
        {/* completed bookings */}
        <TabPanel value={3}>
          <Grid container justifyContent={'space-between'} alignItems={'center'} rowGap={2}>
            <Grid item><TextField size="small" label="Search" value={completedsearch} onChange={(e) => completed_search(e)} /></Grid>
            <Grid item>
              <Grid container columnGap={0.5} rowGap={1} alignItems={'center'}>
                <Grid item md={'auto'}><Button variant='contained' startIcon={<img src={file} />} style={{ backgroundColor: styles.app_color }} disableRipple>Download</Button></Grid>
                <Grid item md={'auto'} className="start-end-dates">
                  <Grid style={{border:`1px solid ${styles.app_color}`,paddingRight:'0.3rem',paddingLeft:'0.11rem',borderRadius:'0.3rem'}} container alignItems="center">
                    <DateRangePicker
                      startDate={completed_startDate}
                      startDateId="startdate"
                      endDate={completed_endDate}
                      endDateId="enddate"
                      // startDatePlaceholderText="Start Date"
                      small="true"
                      onDatesChange={handlecompleteddates}
                      focusedInput={focusedInput}
                      onFocusChange={handleFocusChange}
                      isOutsideRange={() => false} // Optional: Allows selection of past dates
                      noBorder={true}
                    />
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="#003556" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7025 8.59546C16.7025 8.66255 16.7025 8.71982 16.7025 8.77751C16.7025 10.5104 16.7038 12.2432 16.7021 13.9761C16.7012 14.9906 16.0851 15.803 15.1385 16.0295C14.9643 16.0709 14.7803 16.085 14.6006 16.085C11.4568 16.0885 8.31347 16.0885 5.16971 16.0868C4.09504 16.0859 3.27142 15.4004 3.08953 14.3594C3.06946 14.2449 3.06733 14.1261 3.06733 14.009C3.06605 12.2548 3.06647 10.5005 3.06647 8.74674C3.06647 8.69973 3.07074 8.65272 3.07373 8.59546C7.61239 8.59546 12.1442 8.59546 16.7025 8.59546Z" />
                    <path d="M13.9778 4.48918C14.2096 4.48918 14.4167 4.4879 14.6238 4.48918C15.8197 4.4973 16.695 5.37506 16.7031 6.57375C16.7044 6.78101 16.7031 6.98827 16.7031 7.20579C12.1564 7.20579 7.62111 7.20579 3.08373 7.20579C3.00432 6.36051 3.08117 5.5695 3.78524 4.97592C4.13023 4.6849 4.52517 4.51482 4.97691 4.49559C5.24162 4.48405 5.5072 4.49345 5.79241 4.49345C5.79241 4.25243 5.79241 4.03064 5.79241 3.80885C5.79241 3.59048 5.79113 3.37168 5.79284 3.15331C5.79583 2.74777 6.07634 2.44948 6.45848 2.44307C6.85257 2.43623 7.14846 2.72383 7.157 3.1375C7.16511 3.52125 7.15913 3.90501 7.15913 4.28876C7.15913 4.34688 7.15913 4.40499 7.15913 4.47593C8.97801 4.47593 10.7849 4.47593 12.6106 4.47593C12.6106 4.34901 12.6106 4.22808 12.6106 4.10671C12.6106 3.78706 12.6064 3.46698 12.6119 3.14733C12.6196 2.73195 12.9091 2.44008 13.3015 2.44264C13.6917 2.44521 13.9752 2.74392 13.9774 3.15929C13.9795 3.59561 13.9778 4.03193 13.9778 4.48918Z" />
                    </svg>
                  </Grid>
                </Grid>
                <Grid item md={2}>
                  <Button fullWidth variant='contained' style={{ backgroundColor: styles.app_color }} disableRipple onClick={()=>{setCompleted_startDate("");setCompleted_endDate('')}}>Clear</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={0} direction={'column'} style={{ marginTop: '20px' }}>
            <TableContainer style={{ maxHeight: '500px',maxWidth:tableMaxWidth, }}>
              <Table >

                <TableHead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                  <TableRow>
                    <StyledTableCell style={{ width: '20px', borderTopLeftRadius: '1rem' }}>S.No</StyledTableCell>
                    <StyledTableCell >Person name</StyledTableCell>
                    <StyledTableCell>Booking Number</StyledTableCell>
                    <StyledTableCell>Booked Date</StyledTableCell>
                    <StyledTableCell style={{ width: '150px' }}>Email</StyledTableCell>
                    <StyledTableCell>Check In - Check Out</StyledTableCell>
                    <StyledTableCell>Room Type</StyledTableCell>
                    <StyledTableCell style={{ borderTopRightRadius: '1rem' }}>Price</StyledTableCell>
                  </TableRow>

                </TableHead>
                <TableBody style={{ maxHeight: '100%', overflow: "auto" }}>
                  {
                    tableData?.length>0&&tableData.map((item, index) => {
                      return (
                        <TableRow>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{index+1}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.person_name}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.booking_id}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.booked_date}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.ticket_sent_mail}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{`${getdate(item?.from_date)} - ${getdate(item?.to_date)}`}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{item?.room_type_name}</TableCell>
                          <TableCell style={{ borderRight: '1px solid #DCDCDC' }}>{`INR ${item?.total_price}`}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
                {/*
            <TableBody>
              <TableRow>
               <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Helllow</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
               <TableCell>Person name</TableCell>
              </TableRow>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>hello</TableCell>
                    <TableCell>world</TableCell>
                  </TableRow>
                ))}
            </TableBody> */}
              </Table>
            </TableContainer>
            {/* <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
            <Grid container justifyContent={'space-between'} mt={2} alignItems={'baseline'}>
              <Grid item>
                showing {pageNumber * 10 - 10 + 1} - {pageNumber * 10 - 10 + 10}of {totalRecordsCount}
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
                  containerClassName='mainPageCont'
                  activeClassName='activeClassName'
                  activeLinkClassName='activeLinkClassName'
                  pageClassName='pageClassName'
                />
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Bookings