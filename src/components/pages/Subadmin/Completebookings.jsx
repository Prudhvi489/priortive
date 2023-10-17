import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@mui/material';
import file from '../../../assets/Subadminassets/file.svg';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import ReactPaginate from 'react-paginate';
import {styles} from '../../../assets/styles/Styles_export'
import { DateRangePicker } from 'react-dates';
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


const Completebookings = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(5)
  const [totalRecordsCount, setTotalRecordsCount] = useState(50)
  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
}
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
};

const handleFocusChange = (focusedInput) => {

    setFocusedInput(focusedInput);
};

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('your-api-endpoint');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div style={{ marginTop: '20px' }}>
      {/* <Grid container>
        <Grid item md={3}>
          <TextField label="Search" size="small" />
        </Grid>
        <Grid item md={3} textAlign={'right'}>
        <button
            style={{
              padding: '10px 20px 10px 20px',
              backgroundColor: 'rgba(0, 53, 86, 1)',
              color: 'white',
              borderRadius: '10px',
              border: 'none',
              // display: 'flex',
              alignItems: 'center', 
              gap: '5px', 
            }}
          >
            <img src={file} alt="Download image pdf icon" style={{ height: '20px',marginTop:'2px' }} />
            <span>Download PDF</span>
          </button>
        </Grid>
        <Grid item md={4}>
          <TextField label="Select Data Range" size="small" />
        </Grid>
        <Grid item md={1}></Grid>
      </Grid> */}
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item><TextField size="small" label="Search"/></Grid>
        <Grid item>
          <Grid container spacing={1} alignItems={'center'}>
              <Grid item md={3.4}><Button variant='contained' startIcon={<img src={file}/>} style={{backgroundColor:styles.app_color}} disableRipple>Download</Button></Grid>
              <Grid item md={6.7}>
              <DateRangePicker
            startDate={startDate}
            startDateId="startdate"
            endDate={endDate}
            endDateId="enddate"
           
            // startDatePlaceholderText="Start Date"
            // small="true"
            
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={handleFocusChange}
            isOutsideRange={() => false} // Optional: Allows selection of past dates
           
          />
              </Grid>
              <Grid item md={0.9}>
                <Button variant='contained' style={{backgroundColor:styles.app_color}} disableRipple>Clear</Button>
              </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={0} direction={'column'} style={{marginTop: '20px'}}>
        <TableContainer style={{maxHeight:'500px'}}>
          <Table >
            
             <TableHead style={{position:'sticky',top:0,zIndex:1}}>
              <TableRow>
                <StyledTableCell style={{width:'20px',borderTopLeftRadius:'1rem'}}>S.No</StyledTableCell>
                <StyledTableCell >Person name</StyledTableCell>
                <StyledTableCell>Booking Number</StyledTableCell>
                <StyledTableCell>Booked Date</StyledTableCell>
                <StyledTableCell style={{width:'150px'}}>Email</StyledTableCell>
                <StyledTableCell>Check In - Check Out</StyledTableCell>
                <StyledTableCell>Room Type</StyledTableCell>
                <StyledTableCell style={{borderTopRightRadius:'1rem'}}>Price</StyledTableCell>
              </TableRow>
          
            </TableHead>
            <TableBody style={{maxHeight:'100%',overflow:"auto"}}>
                {
                  [1,2,3,4,5,6,7,8,90,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item,index)=>{
                    return(
                      <TableRow>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>01</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Santosh</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>123456789</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>28-10-2023</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>santosh@gmail.com</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>20-10-2023 - 21-10-2023</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>Super</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>INR 1000</TableCell>
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
    </div>
  );
};

export default Completebookings;