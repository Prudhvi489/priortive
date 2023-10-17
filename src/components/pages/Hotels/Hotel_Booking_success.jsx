import React, { useEffect, useState } from 'react'
import Loadingmodal from '../../modals/Signupmodals/Loadingmodal'
import Hotelconfirmation from '../../modals/Hotelmodals/Hotelconfirmation'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { envdata } from '../../Envexports'
import MySnackbar from '../../modals/Signupmodals/Snackbar'
const Hotel_Booking_success = () => {
  let book_obj=useSelector((state)=>state.hotelBookDetails.hotebookreqdata)
  console.log(book_obj,"bookobject")
  let transaction_id=useSelector((state)=>state.hotelBookDetails.transactionid)
    const [hotelbooked,setHotelbooked] = useState(false)
    const [loading,setLoading] = useState(false)
    const [booking_details,setBooking_details] = useState()
    const [snackopen,setSnackopen]=useState(false);
    const [snackmessage,setSnackmessage]=useState('');
     // Book api funtion
  const book_room_api = async (data) => {
    setLoading(true);
    // setPrice_change(false);
    let updated_bookobj={...book_obj,payment_status:1,payment_id:transaction_id}
    // book_obj.payment_status=1
    // book_obj.payment_id=transaction_id
    const res = await axios.post(`${envdata.baseurl}/deDupeBookRoom`, updated_bookobj);
    console.log(res.data,"boking response")
    if (res.data.status) {
      setLoading(false);
      const booking_detail = await axios.post(
        `${envdata.baseurl}/getHotelBookingDetail`,
        {
          type:updated_bookobj?.searchType,
          BookingId:updated_bookobj?.searchType===1?res.data.data.BookingId:res.data.data.booking_id,
          userId: localStorage.getItem("userid"),
          checkType: 0,
        }
      );
      if (booking_detail.data.status 
        // && booking_detail.data.data.Status === 1
        ) {
        setBooking_details(booking_detail.data.data);
        setHotelbooked(true);
        // console.log(booking_detail.data);
      } 
      else if (
        booking_detail.data.status 
        // &&
        // booking_detail.data.data.Status !== 1
      ) {
        setLoading(false);
        setSnackopen(true);
        setSnackmessage("booking cancelled");
        // alert("booking cancelled");
      } else {
        setLoading(false);
        setSnackopen(true);
        setSnackmessage(booking_detail?.data?.message);
        // alert(booking_detail.data.data.message);
      }
    } else {
      setLoading(false);
      setSnackopen(true);
      setSnackmessage(res.data?.data?.message);
      // alert(res.data?.data?.message);
    }
  }
  useEffect(()=>{
    book_room_api()
  },[])
  return (
    <>
        {loading && <Loadingmodal open={loading} loadingclose={() => setLoading(false)} />}
        <MySnackbar open={snackopen} close={()=>setSnackopen(false)} message={snackmessage} />
        
        {hotelbooked && <Hotelconfirmation
            open={hotelbooked}
            close={() => setHotelbooked(false)}
            data={booking_details}
        />}
    </>
  )
}

export default Hotel_Booking_success