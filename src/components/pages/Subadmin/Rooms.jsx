import { Button, Dialog, Grid, TextField } from '@mui/material'
import React,{useEffect, useState} from 'react'
import addroom from '../../../assets/Subadminassets/addroom.svg'
import Addroom from '../../modals/Subadminmodals/Addroom'
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { AntSwitch,AntSwitchReverse } from '../Admin/AdminStyles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ViewRoomdetails from '../../modals/Subadminmodals/ViewRoomdetails';
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
const Rooms = () => {
  const [roommodal,setRoommodal]=useState(false);
  const [searchroom,setSearchroom]=useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecordsCount, setTotalRecordsCount] = useState(0)
  const [roomsdata,setRoomsdata]=useState([])
  const [pageSize,setPageSize]=useState(10);
  const [block_status,setBlock_status]=useState(false)
  const [checkedvalue,setCheckedvalue]=useState({
    val:false,
    id:''
  })
  const [viewItem,setViewItem] = useState({})
  // const hotel_id= JSON.parse(localStorage.getItem('subadmin_login_details')).id;
    // styles
    const styles = {
      title : {
        fontWeight:'500',
        color:'rgba(0, 53, 86, 1)'
      },
      btn: {
        background:'rgba(0, 53, 86, 1)',
        color:'white',
        textTransform:'none',
        borderRadius:'0.6rem',
        "&:hover":{
          background:'rgba(0, 53, 86, 1)',
          color:'white',
        }
      },
      btnRed: {
        background:'rgba(188, 0, 0, 1)',
        color:'white',
        textTransform:'none',
        borderRadius:'0.6rem',
        "&:hover":{
          background:'rgba(188, 0, 0, 1)',
          color:'white',
        }
      }
    }
    // table max width state
  const [tableMaxWidth,setTableMaxWidth] = useState(`calc(${window.innerWidth}px - 250px)`);
  useEffect(() => {
    const handleResizeMaxWidth = () => {
      setTableMaxWidth(`calc(${window.innerWidth}px - 250px)`);
    };
    window.addEventListener('resize', handleResizeMaxWidth);
    return () => {
      window.removeEventListener('resize', handleResizeMaxWidth);
    };
  }, []);

  const handlePageClick = (event) => {
    setPageNumber(event.selected + 1);
  }
  // ViewRoomdetails dialog state
  const [viewRoomOpen,SetViewRoomOpen] = useState(false)
  function viewRoomClose(){
    SetViewRoomOpen(false)
  }
  const subadmin_data=JSON.parse(localStorage.getItem("subadmin_login_details"))
  // console.log(subadmin_data?.hotel_code,"skdfj")
  const get_all_rooms=async()=>{
    try{
      let endpoint;
      if(searchroom===""){
         endpoint=`gmtHotelRoom/${pageNumber}/${pageSize}/${subadmin_data?.hotel_code}`;
      }
      else{
        endpoint=`gmtHotelRoomSearch/${pageNumber}/${pageSize}/${subadmin_data?.hotel_code}/${searchroom}`
      }
      let method="GET";
      let rooms_obj={};
      const res=await Subadminapicalls(endpoint,rooms_obj,method,"application/json")
      if(res.status){
        console.log(res)
        // if(res.data.total>0){
        setRoomsdata(res.data.Rooms)
        setTotalRecordsCount(res.data.total)
        setTotalPages(res.data.total/pageSize)
        // }
        // else{
          // alert("No rooms found")
        // }
      }
      else{
        alert(res.message)
      }
    }
    catch(error){
      alert(error)
    }
  }
  useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      get_all_rooms();
    }, 1000)
  
     return () => clearTimeout(delayDebounceFn)
},[searchroom])
  useEffect(()=>{
    get_all_rooms()
  },[pageNumber])
const updateblockstatus=async()=>{
  try{
    const res=await Subadminapicalls(`gmtHotelRoom`,{"id":checkedvalue.id,"availability_type":checkedvalue.val?1:0},"PUT",'application/json')
    if(res.status){
      get_all_rooms()
      setBlock_status(false)
    }
    else{
      alert(res.message)
    }
  }
  catch(error){
    alert(error)
  }
}

  async function openViewItem(item){
    setViewItem({...item})
    SetViewRoomOpen(true)
  }
// callback from view room
const Editroom=()=>{
  setRoommodal(true)
}

// if hotel address is not updated then we are stoping add room dialog
const [allowAdd_room,setAllowAdd_hotel] = useState(false)
const hotel_id = JSON.parse(localStorage.getItem('subadmin_login_details'))
  useEffect(()=>{
    if(hotel_id){
      getHotelDetails()
    }else{
      alert('err')
    }
  },[])
  async function getHotelDetails(){
    const endpoint = `gmtHotels/${1}/${10}/${hotel_id.management_type}/${hotel_id.hotel_code}`
    const res = await Subadminapicalls(endpoint,'','GET','application/json')
    // console.log(res);
    if(res?.data?.hotel?.address){
      setAllowAdd_hotel(true)
    }
  }

  return (
        <>
          <Addroom open={roommodal} close={()=>setRoommodal(false)} editdata={viewItem} refresh_rooms={get_all_rooms}/>
          {/* ViewRoomdetails dialog */}
          { viewRoomOpen && <ViewRoomdetails roomdetails={viewItem} open={viewRoomOpen} close={viewRoomClose} editopen={Editroom}/>}
          <div style={{paddingRight:"0.8rem",paddingLeft:'0.8rem'}}>
          <Grid container mt={1}>
            <Grid item md={4} sm={4}>
              <TextField label="Search" fullWidth size="small" placeholder="search by roomindex or price" value={searchroom} onChange={(e)=>setSearchroom(e.target.value)}/>
            </Grid>
            <Grid item md={8} sm={8} textAlign={'right'}>
              <Button startIcon={<img src={addroom}/>} onClick={()=>{
                allowAdd_room && setViewItem({})
                allowAdd_room && setRoommodal(true); !allowAdd_room && alert("You can't add a room until you add a hotel address.")}} variant='contained' sx={{color:'#fff',backgroundColor:`${styles.app_color}!important`}}>Add Room</Button>
            </Grid>
          </Grid>
          <Grid container spacing={0} direction={'column'} style={{marginTop: '20px'}}>
        <TableContainer style={{maxHeight:'500px',maxWidth:tableMaxWidth}}>
          <Table >
            
             <TableHead style={{position:'sticky',top:0,zIndex:1}}>
              <TableRow>
                <StyledTableCell style={{width:'20px',borderTopLeftRadius:'1rem'}}>S.No</StyledTableCell>
                <StyledTableCell >Room Index</StyledTableCell>
                <StyledTableCell>Per Day Price</StyledTableCell>
                <StyledTableCell>Taxes</StyledTableCell>
                {/* <StyledTableCell style={{width:'250px'}}>Room Amenities</StyledTableCell> */}
                <StyledTableCell>Room Type</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell style={{borderTopRightRadius:'1rem'}}>Actions</StyledTableCell>
              </TableRow>
          
            </TableHead>
            <TableBody style={{maxHeight:'100%',overflow:"auto"}}>
                {
                 roomsdata.length>0&&roomsdata.map((item,index)=>{
                    return(
                      <>
                     
                       <TableRow>
                   <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{(index+1).toString().padStart(2,"0")}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{item.room_index}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{item?.room_price}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{item.tax}</TableCell>
                  {/* <TableCell style={{borderRight:'1px solid #DCDCDC'}}>aminties</TableCell> */}
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>{item.room_type_name}</TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC'}}>
                    <Grid container spacing={1}>
                      <Grid item>
                      <AntSwitchReverse
                       checked={item.availability_type}
                      // onChange={(e) => handleCoupoun(e, data.id, data.user_type, data.status)}
                      onChange={(e)=>{
                        setCheckedvalue({id:item.id,val:e.target.checked})
                        setBlock_status(true)
                      }}
                        inputProps={{ 'aria-label': 'controlled' }}
                              />
                      </Grid>
                      <Grid item>{item.availability_type?'Available':'UnAvailable'}</Grid>
                    </Grid>
                   </TableCell>
                  <TableCell style={{borderRight:'1px solid #DCDCDC',textAlign:"center"}}><RemoveRedEyeIcon onClick={()=>openViewItem(item)}/></TableCell>
                      </TableRow>
                  </>
                    )
                  })
                }
              </TableBody>
           
          </Table>
        </TableContainer>
        
         <Grid container justifyContent={'space-between'} mt={2} alignItems={'baseline'}>
                                <Grid item>
                                    showing {pageNumber * 10 - 10 + 1} - {pageNumber * 10 - 10 + 10} of {totalRecordsCount} entries
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
      <Dialog open={block_status} onClose={()=>setBlock_status(false)} sx={{"& .MuiDialog-paper":{maxWidth: "330px",borderRadius:'1rem'}}}>
      <Grid container p={'1.5rem 2.5rem'} rowGap={2.5}>
      <Grid item>Do you really want to make the hotel {checkedvalue.val?"Available":"Unavailable"}?</Grid>
      <Grid item container justifyContent={'space-evenly'}>
        <Grid item>
          <Button sx={styles.btn} 
            onClick={()=>updateblockstatus()}
            >Yes</Button>
        </Grid>
        <Grid item>
          <Button sx={styles.btnRed} 
          onClick={()=>setBlock_status(false)}
          >No</Button>
        </Grid>
      </Grid>
    </Grid>
      </Dialog>
        </>
  )
}

export default Rooms