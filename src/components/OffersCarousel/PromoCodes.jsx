import { FilePresent } from '@mui/icons-material'
import { FormControlLabel, Grid, Paper, Radio, TextField, InputAdornment, RadioGroup, FormControl } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { ticketbooking } from '../../assets/styles/Flights';
import { makeStyles } from "@mui/styles";
import { useLocation } from 'react-router-dom';
import gomytripclient from "../../GomytripClient.js";
import { Apipost } from '../../ApiServices/Apicalls';
import CheckCopounTerms from '../modals/CheckCopounTerms';
import {styles} from '../../assets/styles/Styles_export'
// import MySnackbar from '../modals/Signupmodals/Snackbar';
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${styles.app_color}!important`,
      },
    },
  },
  travelerinfo: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#EDEDED!important",
      },
    },
  },
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
  },
  root1: {
    "& > *": {
      margin: 0,
      padding: 0,
    },
  },
}));
const PromoCodes = (props) => {
  // console.log(props.data.baseprice,"baseprice data")
  const ticketbook = ticketbooking();
  const classes = useStyles();
  const location = useLocation()
  // for snackbar
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  };
  //
  let locationPath = location.pathname.split('/')[1]
  let moduleType = locationPath.toLowerCase() == "hotels" ? 2 : locationPath.toLowerCase() === "flights" && 1
  const [couponsData, setCouponsData] = useState({})
  const [coupons, setCoupons] = useState("");
  const [coupontc, setCoupontc] = useState(false)
  const [terms, setTerms] = useState("")
  // platform fee calculator
  const platform_fee_calculation = async (type, value, baseprice) => {
    let platform_fee = 0;
    if (type === 2) {
      platform_fee = Math.ceil((baseprice / 100) * value)
    }
    else {
      platform_fee = Math.ceil(value * props.data.count)
    }
    return platform_fee;
  }
  // validating coupons
  const applycoupon = async () => {
    if (coupons === "") {
      // setSnackopen(true);
      // setSnackmessage("select any of the coupon");
      alert("select any of the coupon")
      return;
    }
    else {
      const coupon = await couponsData.coupons.find((item) => item.coupon_code === coupons);
      if (coupon !== undefined && props.data.baseprice < coupon.min_amount) {
        // setSnackopen(true);
        // setSnackmessage(`minimum amount should be ${coupon.min_amount}`);
        alert(`minimum amount should be ${coupon.min_amount}`)
      }
      else {
        // console.log(coupon, "coupons appoo")
        const validateobj = {
          "userId": localStorage.getItem('userid') ?? '',
          "coupon_code": coupons,
          "module": moduleType
        }
        try {
          const res = await validate_coupon(validateobj)
          if (res.status === 1) {
            //1
            // const res={
            //   "data": {
            //     "min_amount": 1000,
            //     "discount_type": 1,
            //     "discount_value": 100
            //     },
            //    "type":2 
            // }
            let discount = 0;
            let updated_price = 0;
            let gmt_fee = 0;
            if (res.data.discount_type === 1) {
              discount = Math.ceil(res.data.discount_value);
            }
            else {
              discount = Math.ceil((props.data.baseprice / 100) * res.data.discount_value);
            }
            // removing discount on basefare
            updated_price = Math.ceil(props.data.baseprice - discount);
            gmt_fee = await platform_fee_calculation(couponsData.convenienceFee[0].convenience_type, couponsData.convenienceFee[0].convenience_value, props.data.baseprice)
            props.coupons({
              discount,
              "updated_price": updated_price + gmt_fee,
              couponid: coupon.id,
              couponcode: coupon.coupon_code,
              type: 2
            })
          }
          else {
            // setSnackopen(true);
            // setSnackmessage(res.message);
            alert(res.message)
          }
        }
        catch (error) {
          // setSnackopen(true);
          // setSnackmessage(error);
          alert(error)
        }

      }
    }
  }
  // validation api call
  const validate_coupon = async (payload) => {
    const res = await Apipost("/validateCoupon", payload)
    return res;
  }
  // coupons api call
  const getAdminCreatedOffers = async () => {
    let payloadToSend = {
      "user_id": localStorage.getItem('userid') ?? '',
      "module": moduleType
    }
    try {
      const res = await Apipost('/userOverallCoupons', payloadToSend)
      // console.log(res,"ysersdfj")
      if (res.status === 1) {
        setCouponsData(res.data)
        let platform_fee = await platform_fee_calculation(res.data.convenienceFee[0]?.convenience_type, res.data.convenienceFee[0]?.convenience_value, props.data.baseprice)
        // callback data
        props.coupons(
          {
            "couponsdata": res.data,
            "platform_charge": platform_fee,
            "totalprice": props.data.baseprice + platform_fee,
            "type": 1
          })
      }
      else {
        // setSnackopen(true);
        // setSnackmessage(res.data?.message);
        alert(res.data?.message)
      }
    }
    catch (error) {
      // setSnackopen(true);
      // setSnackmessage(error);
      alert(error)
    }
  }

  useEffect(() => {
    getAdminCreatedOffers()
  }, [location.state])
  const removediscount = () => {
    setCoupons("")
  }
  useEffect(() => {
    if (props.all_prices.discount === 0) {
      removediscount()
    }
  }, [props.all_prices])
  return (
    <div>
      {/* <MySnackbar open={snackopen} close={snackclose} message={snackmessage} /> */}
      <CheckCopounTerms open={coupontc} close={() => setCoupontc(false)} data={terms} />
      <Paper
        sx={{ padding: "1rem", borderRadius: "0.5rem" }}
        elevation={3}
      >
        <span className={ticketbook.headings}>Promo Code</span>
        <Grid container direction={"column"} mt={2}>
          <Grid item>
            <TextField
              fullWidth
              className={classes.root}
              value={coupons}
              onChange={(e) => setCoupons(e.target.value)}
              disabled={props.all_prices.discount > 0 ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <button
                      style={{ color: props.all_prices.discount > 0 ? "grey" : `${styles.textcolor}`, border: "none", background: 'none' }}
                      onClick={() => applycoupon()}
                      disabled={props.all_prices.discount > 0  ? true : false}
                    >
                      Apply
                    </button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <FormControl disabled={props.all_prices.discount > 0 ? true : false}>
            <RadioGroup
              value={coupons}
              onChange={(e) => {
                setCoupons(e.target.value);
              }}
            >
              {Object.keys(couponsData).length > 0 &&
                couponsData?.coupons.map((item, index) => {
                  // console.log(item,"whole item")
                  return (
                    <>
                      <Grid item mt={2}>
                        <Grid
                          container
                          direction={"column"}
                          sx={{
                            background: styles.shade_color,
                            padding: "0.5rem",
                            borderRadius: "1rem",
                          }}
                        >
                          <Grid item>
                            <FormControlLabel
                              value={item.coupon_code}
                              control={
                                <Radio
                                  sx={{
                                    color: "white",
                                    "&, &.Mui-checked": {
                                      color: `${styles.textcolor}`,
                                    },
                                  }}
                                />
                              }
                              label={item.coupon_name}
                            />

                          </Grid>
                          <Grid item>
                            <Grid container>
                              <Grid item xs={1}></Grid>
                              <Grid item>
                                <Grid
                                  container
                                  direction={"column"}
                                  rowSpacing={1}
                                >
                                  <Grid item>
                                    {item.description}
                                  </Grid>
                                  <Grid item>
                                    {`Discount : ${item?.discount_type===1?"INR":""}${item?.discount_value}${item?.discount_type===2?"%":""}`}
                                  </Grid>
                                  <Grid item>
                                    Min Amount : {item?.min_amount}
                                  </Grid>
                                  <Grid item onClick={() => {
                                    setTerms(item?.tc)
                                    setCoupontc(true)
                                  }}><span style={{ cursor: 'pointer',color:`${styles.app_color}` }}>View T&C</span></Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  )
                })
              }
              {/* 50% off */}
              {/* <Grid item mt={2}>
                            <Grid
                              container
                              direction={"column"}
                              sx={{
                                background: "#DFF3FF",
                                padding: "0.5rem",
                                borderRadius: "1rem",
                              }}
                            >
                              <Grid item>
                                <FormControlLabel
                                  value="50"
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color: `${styles.app_color}`,
                                        },
                                      }}
                                    />
                                  }
                                  label="FLAT50"
                                />
                                
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={1}></Grid>
                                  <Grid item>
                                    <Grid
                                      container
                                      direction={"column"}
                                      rowSpacing={1}
                                    >
                                      <Grid item>
                                        Flat 50% off for the first time user
                                      </Grid>
                                      <Grid item>T&cs apply</Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item mt={2}>
                            <Grid
                              container
                              direction={"column"}
                              sx={{
                                background: "#DFF3FF",
                                padding: "0.5rem",
                                borderRadius: "1rem",
                              }}
                            >
                              <Grid item>
                                <FormControlLabel
                                  value="20"
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color: `${styles.app_color}`,
                                        },
                                      }}
                                    />
                                  }
                                  label="FLAT20"
                                />
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={1}></Grid>
                                  <Grid item>
                                    <Grid
                                      container
                                      direction={"column"}
                                      rowSpacing={1}
                                    >
                                      <Grid item>
                                        Flat 20% off for the first time user
                                      </Grid>
                                      <Grid item>T&cs apply</Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item mt={2}>
                            <Grid
                              container
                              direction={"column"}
                              sx={{
                                background: "#DFF3FF",
                                padding: "0.5rem",
                                borderRadius: "1rem",
                              }}
                            >
                              <Grid item>
                                <FormControlLabel
                                  value="30"
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color: `${styles.app_color}`,
                                        },
                                      }}
                                    />
                                  }
                                  label="FLAT30"
                                />
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={1}></Grid>
                                  <Grid item>
                                    <Grid
                                      container
                                      direction={"column"}
                                      rowSpacing={1}
                                    >
                                      <Grid item>
                                        Flat 30% off for the first time user
                                      </Grid>
                                      <Grid item>T&cs apply</Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item mt={2}>
                            <Grid
                              container
                              direction={"column"}
                              sx={{
                                background: "#DFF3FF",
                                padding: "0.5rem",
                                borderRadius: "1rem",
                              }}
                            >
                              <Grid item>
                                <FormControlLabel
                                  value="35"
                                  control={
                                    <Radio
                                      sx={{
                                        color: "white",
                                        "&, &.Mui-checked": {
                                          color: `${styles.app_color}`,
                                        },
                                      }}
                                    />
                                  }
                                  label="FLAT35"
                                />
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item xs={1}></Grid>
                                  <Grid item>
                                    <Grid
                                      container
                                      direction={"column"}
                                      rowSpacing={1}
                                    >
                                      <Grid item>
                                        Flat 35% off for the first time user
                                      </Grid>
                                      <Grid item>T&cs apply</Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid> */}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Paper>
    </div>
  )
}

export default PromoCodes