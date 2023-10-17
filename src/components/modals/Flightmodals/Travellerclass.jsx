import {
  Container,
  Dialog,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TravellerclassActions } from "../../../store/TravellerclassSlice";
import {styles} from '../../../assets/styles/Styles_export'
const Travellerclass = (props) => {
  const { open, close , adultCount , infanyCount , childCount,classes} = props;
  // const travellersclass = useSelector((state)=>state.travellerclass.travellers)
// console.log(travellersclass,"travellers_class")
  // 2-->economy
  const [travellers,setTravellers]=useState({
    adult:adultCount?adultCount:1,
    child:childCount?childCount:0,
    infant:infanyCount?infanyCount:0,
    classes:classes?classes:2
  })
  // redux store intialization
  const dispatch =useDispatch()
  const handletravellerclose = () => {
    close();
    dispatch(TravellerclassActions.travellerclassupdate(travellers))
  };
const default_travellers={
  adult:1,
  child:0,
  infant:0,
  classes:'2'
}

  // 1->decrement
  // 2->increment
  const travellersinfo=(count,type)=>{
   if(count==2 ){
    if(type=="adult" && travellers.adult+travellers.child<=8){
        setTravellers(prev=>({...prev,adult:prev.adult+1}))
    }
    else if(type=="child" && travellers.adult+travellers.child<=8){
        setTravellers(prev=>({...prev,child:prev.child+1}))
    }
    else if(type =="infant" && travellers.infant<travellers.adult){
        setTravellers(prev=>({...prev,infant:prev.infant+1}))
    }

   }
   else if(count==1){
    if(type=="adult" && travellers.adult>1){
        setTravellers(prev=>({...prev,adult:prev.adult-1}))
        if(travellers.adult===travellers.infant&&travellers.infant>1){
          setTravellers(prev=>({...prev,infant:prev.infant-1}))
        }
    }
    else if(type=="child" && travellers.child>0){
        setTravellers(prev=>({...prev,child:prev.child-1}))
    }
    else if(type == "infant" && travellers.infant>0){
        setTravellers(prev=>({...prev,infant:prev.infant-1}))
    }
   }
  }
  return (
    <Dialog
      open={open}
      onClose={handletravellerclose}
      PaperProps={{
        sx: {
            position: "fixed",
          top: "15%",
          left: "70%",
          m: 0,
          minHeight: 300,
          maxHeight: 500,
          width: 280,
          "@media (max-width:899px)":{
            position:'inherit'
          }
        },
      }}
      hideBackdrop
    >
      <Grid container direction="column" rowSpacing={2}>
        <Grid
          item
          sx={{
            background: "#DFF3FF",
            paddingTop: "1.5rem!important",
            paddingBottom: "0.5rem",
            color: styles.app_color,
            paddingLeft: "0.8rem",
          }}
        >
          Select Traveller's
        </Grid>
        <Grid item>
          <Grid container spacing={2} sx={{ padding: "0px 0.8rem" }}>
            <Grid item md={7.5}>
              <span style={{ fontSize: "14px" }}>Adult 12+ Years</span>
            </Grid>
            <Grid item md={1.5}>
              <button
                style={{
                  fontSize: "17px",
                  border: "none",
                  backgroundColor: "#DFF3FF",
                  borderRadius: "0.3rem",
                }}
                onClick={()=>{travellersinfo(1,"adult")}}
              >
                &#8722;
              </button>
            </Grid>
            <Grid item md={1}>
            {travellers.adult.toString().length==1?travellers.adult.toString().padStart(2,"0"):travellers.adult}

            </Grid>
            <Grid item md={1}>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  color: "#fff",
                  backgroundColor: styles.app_color,
                  borderRadius: "0.3rem",
                }}
                onClick={()=>{travellersinfo(2,"adult")}}
              >
                &#43;
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} sx={{ padding: "0px 0.8rem" }}>
            <Grid item md={7.5}>
              <span style={{ fontSize: "14px" }}>Children 2-12 Years</span>
            </Grid>
            <Grid item md={1.5}>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  backgroundColor: "#DFF3FF",
                  borderRadius: "0.3rem",
                }}
                onClick={()=>{travellersinfo(1,"child")}}
              >
                &#8722;
              </button>
            </Grid>
            <Grid item md={1}>
            {travellers.child.toString().length==1?travellers.child.toString().padStart(2,"0"):travellers.child}
            </Grid>
            <Grid item md={1}>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  color: "#fff",
                  backgroundColor: styles.app_color,
                  borderRadius: "0.3rem",
                }}
                onClick={()=>{travellersinfo(2,"child")}}
              >
                &#43;
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} sx={{ padding: "0px 0.8rem" }}>
            <Grid item md={7.5}>
              <span style={{ fontSize: "14px" }}>Infant Below 2 Years</span>
            </Grid>
            <Grid item md={1.5}>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  backgroundColor: "#DFF3FF",
                  borderRadius: "0.3rem",
                }}
                onClick={()=>{travellersinfo(1,"infant")}}
              >
                &#8722;
              </button>
            </Grid>
            <Grid item md={1}>
               
            {travellers.infant.toString().length==1?travellers.infant.toString().padStart(2,"0"):travellers.infant}
            </Grid>
            <Grid item md={1}>
              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  color: "#fff",
                  backgroundColor: styles.app_color,
                  borderRadius: "0.3rem",
                }}
                onClick={()=>{travellersinfo(2,"infant")}}
              >
                &#43;
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction={"column"} mt={2}>
        <Grid
          item
          sx={{ backgroundColor: "#DFF3FF", padding: "0.5rem 0.8rem" }}
        >
          Select Class
        </Grid>
        <RadioGroup value={travellers.classes} onChange={(e)=>setTravellers(prev=>({...prev,classes:e.target.value}))} sx={{marginLeft:'0.6rem'}}>
          <Grid item>
            <FormControlLabel
              value={2}
              size="small"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&, &.Mui-checked": {
                      color: styles.app_color,
                    },
                  }}
                />
              }
              label="Economy"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              value={4}
              size="small"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&, &.Mui-checked": {
                      color: styles.app_color,
                    },
                  }}
                />
              }
              label="Business"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              value={6}
              size="small"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&, &.Mui-checked": {
                      color: styles.app_color,
                    },
                  }}
                />
              }
              label="First"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              value={3}
              size="small"
              control={
                <Radio
                  sx={{
                    color: "white",
                    "&, &.Mui-checked": {
                      color: styles.app_color,
                    },
                  }}
                />
              }
              label="Premium Economy"
            />
          </Grid>
        </RadioGroup>
        <Grid item textAlign={"center"}>
          <Button variant="contained" sx={{textTransform:'none',background:`${styles.app_color}!important`,padding:'0.3rem 2rem',marginBottom:'1rem'}} onClick={handletravellerclose}>Done</Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Travellerclass;