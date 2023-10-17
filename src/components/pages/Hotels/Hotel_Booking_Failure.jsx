import React, { useEffect, useState } from 'react'
import Loadingmodal from '../../modals/Signupmodals/Loadingmodal'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { envdata } from '../../Envexports';
import MySnackbar from '../../modals/Signupmodals/Snackbar';
import { GuestsActions } from '../../../store/Hotelslices.jsx/GuestsSlice';
const Hotel_Booking_Failure = () => {
  let book_obj=useSelector((state)=>state.hotelBookDetails.hotebookreqdata);
  let transaction_id=useSelector((state)=>state.hotelBookDetails.transactionid);
  const dispatch=useDispatch()
  const [hotelbooked,setHotelbooked]=useState(false)
  const [loading,setLoading] = useState(false);
  const [booking_details,setBooking_details] = useState()
  const [snackopen,setSnackopen]=useState(false);
  const [snackmessage,setSnackmessage]=useState('');
  const book_room_api = async (data) => {
    dispatch(GuestsActions.Guest_count([{ NoOfAdults: 1, NoOfChild: 0, ChildAge: [1, 1] }]))
    setLoading(true);
    let updatedbooking_obj={...book_obj,"payment_status":0,"payment_id":transaction_id}
    // setPrice_change(false);
    // book_obj.payment_status=0
    // book_obj.payment_id=transaction_id
    const res = await axios.post(`${envdata.baseurl}/deDupeBookRoom`, updatedbooking_obj);
    if (res.data.status) {
      setLoading(false);
      const booking_detail = await axios.post(
        `${envdata.baseurl}/getHotelBookingDetail`,
        {
          BookingId: res.data.data.BookingId,
          userId: localStorage.getItem("userid"),
          checkType: 0,
        }
      );
      if (booking_detail.data.status && booking_detail.data.data.Status === 1) {
        setBooking_details(booking_detail.data.data);
        setHotelbooked(true);
        // console.log(booking_detail.data);
      } else if (
        booking_detail.data.status &&
        booking_detail.data.data.Status !== 1
      ) {
        setLoading(false);
        setSnackopen(true);
        setSnackmessage("booking cancelled");
        // alert("booking cancelled");
      } else {
        setLoading(false);
        setSnackopen(true);
        setSnackmessage(booking_detail.data.data.message);
        // alert(booking_detail.data.data.message);
      }
    } else {
      setLoading(false);
      setSnackopen(true);
      setSnackmessage(res.data?.data?.message);
      // alert(res.data?.data?.message);
    }
  }
  
  // useEffect(()=>{
  //   book_room_api()
  // },[])
  return (
    <>
        {loading && <Loadingmodal open={loading} loadingclose={() => setLoading(false)} />}
        <MySnackbar open={snackopen} close={()=>setSnackopen(false)} data={snackmessage}/>
        <div>FAILURE</div>
    </>
  )
}

export default Hotel_Booking_Failure