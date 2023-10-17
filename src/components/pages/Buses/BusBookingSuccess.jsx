import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BusBookingConfirmationModal from '../../modals/BusBookingConfirmationModel'
import BusesPageBackDrop from './BusesPageBackDrop'
import { enqueueSnackbar } from 'notistack'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { busBookingDetailsAction } from "../../../store/BusModuleSlices/BusBookDetails.jsx";
import { busDiscountDetailsAction } from '../../../store/BusModuleSlices/BusDiscountDetails'

const BusBookingSuccess = () => {



  // ----------------------------------------
  // busBookingDetails:'',reqBookDetailsForApi
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const recentBookDetails = useSelector(state => state.busBookDetails);
  const getTheSerchedResult = useSelector((state) => state.busessearch);
  const discountDetails = useSelector((state) => state.busDiscountDetails)
  console.log(getTheSerchedResult,'getTheSerchedResult')
  let userSessionData = localStorage.getItem('userid')

  const [bookConfirmModal, setBookConfirmModal] = useState(true)
  const [loading, setLoading] = useState(false)
  const [busBookConfirmData, setBusBookConfirmData] = useState('')
  // 
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 9000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
      container: 'my-swal-toast-container', // Add a custom class name for the toast container
    },
  })


  const bookBusApi = () => {

    const totalBaseFare = recentBookDetails.busBookingDetails.Passenger.reduce((sum, obj) => sum + obj.Seat.Price.PublishedPriceRoundedOff, 0)

    let bookingDetailsKeyData = {
      "ResultIndex": recentBookDetails.busBookingDetails.ResultIndex,
      "TraceId": getTheSerchedResult.traceId,
      "BoardingPointId": recentBookDetails.busBookingDetails.BoardingPoint.CityPointIndex,
      "DroppingPointId": recentBookDetails.busBookingDetails.DroppingPoint.CityPointIndex,
      "Passenger": recentBookDetails.reqBookDetailsForApi.Passenger//THIS IS THE MODIFIED KEY OF API
    }

    let payloadToSend = {
      "user_id": userSessionData,
      "traveller_ids": recentBookDetails?.busBookingDetails?.Passenger?.length>0 ? recentBookDetails.busBookingDetails?.Passenger?.map(data => data.traveller_id):[],
      "origin_id": getTheSerchedResult?.userSearchedFor.fromDest.city_id,
      "dest_id": getTheSerchedResult?.userSearchedFor.toDest.city_id,
      "journey_date": new Date(getTheSerchedResult?.userSearchedFor?.selectedDate),
      "total_price": discountDetails.userPayed,//after discount and admin fee  // user payed
      "total_published_price": totalBaseFare,//Base fare total seats price user selected
      // "admin_commission_type": discountDetails?.adminConv?.length > 0 ? discountDetails.adminConv[0]?.convenience_type : '',
      "convenience_id":discountDetails?.adminConv?.length > 0 ? discountDetails.adminConv[0]?.id : '',
      "total_admin_commission": discountDetails.adminFee,//calcullated amount with % or currency
      "total_discount": discountDetails?.coupounPrice,//applied coupoun 
      "payment_status": 1,// success 1, fail 0
      "coupon_code": discountDetails?.coupoun?.coupon_code??"",
      "payment_unique_no": localStorage.getItem('txnid'),//
      "booking_details": bookingDetailsKeyData,//OBOVE OBJECT
      "platform": 3,
      "travel_name": getTheSerchedResult?.operatorSelected?.TravelName,//added this param for service rating
      "boardingpoint_name": recentBookDetails.busBookingDetails.BoardingPoint.CityPointName,
      "boardingpoint_time": recentBookDetails.busBookingDetails.BoardingPoint.CityPointTime,
      "droppingpoint_name": recentBookDetails.busBookingDetails.DroppingPoint.CityPointName,
      "droppingpoint_time": recentBookDetails.busBookingDetails.DroppingPoint.CityPointTime,

    }
    setLoading(true)

    axios.post(`${process.env.REACT_APP_BASEURL}/busBook`, payloadToSend
    ).then(res => {
      console.log(res)

      if (res.data.status === 1) {
        // console.log(res)
        setLoading(false)
        // enqueueSnackbar(res.data.message, 'Success')
        setBusBookConfirmData(res.data.data)
        setBookConfirmModal(true)

        // document.getElementById('payuPayButton').click()
        // setTimeout(() => {
        Toast.fire({
          icon: 'success',
          title: res.data.message
        })
        // }, 5000);

        // setTimeout(() => {
        // }, 6000);
        dispatch(busBookingDetailsAction.ticketdetails({ busBookingDetails: [], reqBookDetailsForApi: [] }))
        dispatch(busDiscountDetailsAction.discountdetails({ userPayed: 0, coupounPrice: 0, adminFee: 0, adminConv: [], coupoun: '' }))
        localStorage.removeItem('txnid')
      } else {
        enqueueSnackbar(res?.data?.data?.Error?.ErrorMessage||'Error', 'error')
        navigate('/mybookings/1')
        setLoading(false)

      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
      navigate('/mybookings/3')
    })
  }
  const onlyOneEntry = useRef(true)

  useEffect(() => {
    // setTimeout(() => {
    if (onlyOneEntry) {
      onlyOneEntry.current = false
      bookBusApi()
    }
    // }, 3000);
  }, [])

  const handleCloseModal = (param) => {
    setBookConfirmModal(param)
  }
  return (
    <div>
      <BusesPageBackDrop open={loading} />
      {busBookConfirmData?.BusId && <BusBookingConfirmationModal open={bookConfirmModal} 
      close={(e) => handleCloseModal(false)} 
      confirmBookData={busBookConfirmData} />}
    </div>
  )
}

export default BusBookingSuccess