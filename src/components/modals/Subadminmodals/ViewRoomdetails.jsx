import { Button, Dialog, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Addroom from './Addroom';
import { Subadminapicalls } from '../../../ApiServices/Subadminapicalls';


const ViewRoomdetails = ({open,close,roomdetails,editopen}) => {
    console.log(roomdetails);
    const [editroom,setEditroom]=useState(false)
    const [aminities,setAminities]=useState([])
    // get aminities
    useEffect(()=>{
        if(roomdetails?.room_amenities.length > 0){
            get_editaminities()
        }
    },[])
    const get_editaminities=async()=>{
        try{
          const res=await Subadminapicalls(`getAmenities`,{"specificAmenityIds":roomdetails?.room_amenities},"POST","application/json")
          if(res.status){
            res.data.length>0&&res.data.map((item)=>{
              setAminities((prev)=>([...prev,item.amenity_name]));
            })
          }
          else{
            alert(res.message)
          }
        }
        catch(error){
          alert(error)
        }
    }
    // add room demo object
    const addroom = [
        {
            title:'Availability Type',
            content: roomdetails?.availability_type === 1 ? 'Available' : roomdetails?.availability_type === 0 ? "Unavailable" : ''
        },
        {
            title:'Room Index',
            content:roomdetails?.room_index
        },
        {
            title:'Room Type Name',
            content:roomdetails?.room_type_name
        },
        {
            title:'Room Description',
            content:roomdetails?.room_description
        },
        {
            title:'Room Amenities',
            content: aminities.join(', ')
        },
        {
            title:'Smoking',
            content:roomdetails?.smoking_preference === 0 ? "No" : roomdetails?.smoking_preference === 1 ? "Yes" : ""
        },
    ]
    // Cancellation Policies
    const Cancellation = [
        {
            title:'Charge Type',
            content:roomdetails?.cancellation_policies[0].ChargeType === 1 ? "Amount" : roomdetails?.cancellation_policies[0].ChargeType === 2 ? "Percentage" : ""
        },
        {
            title:'Charge',
            content:roomdetails?.cancellation_policies[0].Charge
        },
        {
            title:'From Date',
            content:roomdetails?.cancellation_policies[0].FromDate
        },
        {
            title:'To Date',
            content:roomdetails?.cancellation_policies[0].ToDate
        },
        // {
        //     title:'Cancellation Policy',
        //     content:"A cancellation policy should clearly outline the expectations of the business owner with regard to cancellations. From stating how many hours' notice a client should give before the appointment cancellation to the cancellation fee, and everything in between."
        // },
        {
            title:'Passport',
            content:roomdetails?.Passport//'Yes'
        },
        {
            title:'Pan',
            content:roomdetails?.Pan//'Yes'
        },
        // {
        //     title:'Catergory ID',
        //     content:'Yes'
        // },
    ]
    // Fare Block 
    const FareBlock = [
        // {
        //     title:'Price',
        //     content:'₹ 3000'
        // },
        {
            title:'Room Price',
            content:roomdetails?.room_price&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.room_price}`
        },
        {
            title:'Tax',
            content:roomdetails?.tax&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.tax}`
        },
        // {
        //     title:'GST',
        //     content:`₹ ${roomdetails?.gst||''}`
        // },
        {
            title:'CGST Amount',
            content:roomdetails?.gst?.CGSTAmount&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.gst?.CGSTAmount}`
        },
        {
            title:'CGST Rate',
            content:roomdetails?.gst?.CGSTRate&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.gst?.CGSTRate}`
        },
        // {
        //     title:'Cess Amount',
        //     content:`₹ ${roomdetails?.gst?.CessAmount}`
        // },
        // {
        //     title:'Cess Rate',
        //     content:`₹ ${roomdetails?.gst?.CessRate}`
        // },
        // {
        //     title:'IGST Amount',
        //     content:`₹ ${roomdetails?.gst?.IGSTAmount}`
        // },
        // {
        //     title:'IGST Rate',
        //     content:`₹ ${roomdetails?.gst?.IGSTRate}`
        // },
        {
            title:'SGST Amount',
            content:roomdetails?.gst?.SGSTAmount&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.gst?.SGSTAmount}`
        },
        {
            title:'SGST Rate',
            content:roomdetails?.gst?.SGSTRate&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.gst?.SGSTRate}`
        },
        {
            title:'TaxableAmount',
            content:roomdetails?.gst?.TaxableAmount&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.gst?.TaxableAmount}`
        },
    ]
    // Charges demo object
    const Charges = [
        {
            title:'Extra Guest Charges',
            content:roomdetails?.extra_guest_charge&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.extra_guest_charge}`
        },
        {
            title:'Child Charge',
            content:roomdetails?.child_charge&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.child_charge}`
        },
        {
            title:'Other Charge',
            content:roomdetails?.other_charges&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.other_charges}`
        },
        {
            title:'Discount',
            content:roomdetails?.discount&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.discount}`
        },
        {
            title:'Published Price',
            content:roomdetails?.published_price&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.published_price}`
        },
        {
            title:'Offered Price',
            content:roomdetails?.offered_price&&`${roomdetails?.cancellation_policies[0].Currency} ${roomdetails?.offered_price}`
        },
    ]
    // handle edit data
    const handleedit=()=>{
        editopen()
        close()
    }
    const handleclose=()=>{
        close()
    }
  return (
    <>
        <Dialog open={open} onClose={handleclose} sx={{"& .MuiDialog-paper":{borderRadius:'1rem',minWidth:'500px',"&::-webkit-scrollbar":{display:'none'}}}}>
            {roomdetails ? <Grid>
                {/* add room section */}
                <Grid>
                    <Grid container alignItems={'center'} justifyContent={'space-between'} p={2} sx={{background:'rgba(0, 53, 86, 1)',color:'white',fontWeight:'700'}}>
                        <Grid item>Add Room</Grid>
                        <Grid item>
                        <CloseIcon sx={{ borderRadius: "50%", color: "#003556", background: "white",}} onClick={close} />
                        </Grid>
                    </Grid>
                    <Grid container sx={{background:'rgba(221, 242, 255, 1)'}} p={2} rowGap={1.5}>
                        {
                            addroom.map((data,index)=>{
                                return(
                                    <Grid item container key={index}>
                                        <Grid item xs={5} color={'rgba(0, 53, 86, 1)'}>{data.title}</Grid>
                                        <Grid item xs={7} color={'rgba(48, 48, 48, 1)'}>{data.content}</Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
                {/* Cancellation Policies section */}
                <Grid>
                    <Grid container justifyContent={'space-between'} p={'10px 16px'} sx={{color:'rgba(0, 53, 86, 1)',fontWeight:'700'}}>
                        <Grid item>Cancellation Policies</Grid>
                    </Grid>
                    <Grid container p={'10px 16px'} rowGap={1.5}>
                        {
                            Cancellation.map((data,index)=>{
                                return(
                                    <Grid item container key={index}>
                                        <Grid item xs={5} color={'rgba(0, 53, 86, 1)'}>{data.title}</Grid>
                                        <Grid item xs={7} color={'rgba(48, 48, 48, 1)'}>{data.content}</Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
                {/* Fare Block section */}
                <Grid>
                    <Grid container justifyContent={'space-between'} p={'10px 16px'} sx={{background:'rgba(0, 53, 86, 1)',color:'white',fontWeight:'700'}}>
                        <Grid item>Fare Block</Grid>
                    </Grid>
                    <Grid container p={'10px 16px'} rowGap={1.5} sx={{background:'rgba(221, 242, 255, 1)'}}>
                        {
                            FareBlock.map((data,index)=>{
                                return(
                                    <Grid item container key={index}>
                                        <Grid item xs={5} color={'rgba(0, 53, 86, 1)'}>{data.title}</Grid>
                                        <Grid item xs={7} color={'rgba(48, 48, 48, 1)'}>{data.content}</Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
                {/* Charges section */}
                <Grid>
                    <Grid container justifyContent={'space-between'} p={'10px 16px'} sx={{color:'rgba(0, 53, 86, 1)',fontWeight:'700'}}>
                        <Grid item>Charges</Grid>
                    </Grid>
                    <Grid container p={'10px 16px'} rowGap={1.5}>
                        {
                            Charges.map((data,index)=>{
                                return(
                                    <Grid item container key={index}>
                                        <Grid item xs={5} color={'rgba(0, 53, 86, 1)'}>{data.title}</Grid>
                                        <Grid item xs={7} color={'rgba(48, 48, 48, 1)'}>{data.content}</Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
                {/* Edit Button section */}
                <Grid mt={2} mb={2} textAlign={'center'}>
                    <Button sx={{background:'#003556',color:'white',borderRadius:'0.5rem',padding:'0.5rem 2.5rem',"&:hover":{background:'#003556',color:'white',}}} onClick={()=>handleedit()}>Edit</Button>
                </Grid>
            </Grid>:<Grid>room not found</Grid>}
        </Dialog>
    </>
  )
}

export default ViewRoomdetails