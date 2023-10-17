import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from 'react'
import { adminAddCoupoun } from '../../pages/Admin/AdminStyles';
import addcouponimg from '../../../assets/AdminAssets/addcoupon.svg'
import UserAvatar from '../../../assets/images/User.png'
import helperFunctions from '../../../helpers/helperFunctions';
const CouponView = ({ open, close, details }) => {
    const adminRefund = adminAddCoupoun()
    const handleclose = () => {
        close()
    }
    const [data, setData] = useState(details)
    // console.log(data, 'data')

    useEffect(() => {
        setData(details)
    }, [details])

    const getModule = (value) => {
        switch (value) {
            case '0':
                return 'Entire Module';
            case '1':
                return 'Plane Module';
            case '2':
                return 'Hotels Module';
            case '3':
                return 'Bus Module';
            default:
                return 'Unknown';
        }
    };
    return (
        <>
            <Dialog open={open} onClose={handleclose} className={adminRefund.dialogradius}
                sx={{ "& .MuiDialog-paper": { width: "360px", }, }}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>
                    <Grid container justifyContent={"space-between"} sx={{ borderRadius: "10%" }}>
                        <Grid item md={10}>
                            <Typography className={adminRefund.refundbus}>Coupons Details</Typography>
                        </Grid>
                        <Grid item md={1}>
                            <CloseIcon sx={{ borderRadius: "50%", color: "white", background: "#003556", }}
                                onClick={() => handleclose()}
                            />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Name</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.black1}>{data?.coupon_name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Starts</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.black1}>{data?.start_date?helperFunctions.convertToIst(data?.start_date):""}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Ends</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.black1}>{data?.end_date?helperFunctions.convertToIst(data?.end_date):""}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Type</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.black1}>{data && data?.module?.length > 0 && data.module?.map((val) => (<div className='c-p' key={val}>{getModule(val)}</div>))}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Code</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.black1}>{data?.coupon_code}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Discount</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.black1}>{data.discount_type === 1 ? "₹" : ""} {data?.discount_value} {data.discount_type === 2 ? "%" : ""}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Minimum</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.black1}>₹ {data.min_amount}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item>
                            <Typography className={adminRefund.totalcolor}>Users Type</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={adminRefund.black1}>{data.user_type == 0 ? "All Users" : data.user_type == 1 ? "Specific Users" : "Top Users"}</Typography>
                        </Grid>
                    </Grid>
                    {/* image div */}
                    {data && data?.user_details?.length > 0&&<Grid container spacing={1} md={12} mt={2}>
                        {data && data?.user_details?.length > 0 && data?.user_details?.map((item, index) => (
                            <Grid key={item?.user_id} item md={4} textAlign={"center"}>
                                <img style={{ borderRadius: "50%", width: "35px" }} src={item?.cover_pic||UserAvatar} alt={item?.user_name} />
                                <Typography>{item?.user_name||"--"}</Typography>
                            </Grid>
                        ))}
                    </Grid>}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CouponView