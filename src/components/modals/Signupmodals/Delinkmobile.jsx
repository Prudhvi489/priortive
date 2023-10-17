import { Button, Dialog, Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Apipost } from "../../../ApiServices/Apicalls";
import MySnackbar from "./Snackbar";
import {styles} from '../../../assets/styles/Styles_export'

const Delinkmobile = (props) => {
  const { open, onclose } = props;
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  const handledelinkclose = () => {
    onclose();
  };
  // delink api call
  const delinkhandler = async () => {
    try {
      const data = await Apipost("/delinkPhone", {
        user_id: localStorage.getItem("userid"),
      });
      console.log(data);
      if (1) {
        setSnackmessage(data.message);
        setSnackopen(true);
        handledelinkclose();
        props.mobiledelink();
      } else {
        // alert(data.message)
      }
    } catch (err) {
      // alert(err);
    }
  };
  function snackclose() {
    setSnackopen(false);
  }
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Dialog
        open={open}
        onClose={handledelinkclose}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxHeight: 580,
            maxWidth: "300px",
            borderRadius: "15px",
            padding: "2rem",
          },
        }}
      >
        <Grid container direction={"column"} spacing={3}>
          <Grid item textAlign={"center"}>
            Are you sure you want to de-link <br /> your phone number? Loss of
            login and ticket update access.
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item md={5} textAlign={"right"}>
                <Button
                  disableRipple
                  variant="contained"
                  onClick={delinkhandler}
                  sx={{
                    backgroundColor: `${styles.app_color}!important`,
                    padding: "11px 39px 11px 39px",
                    borderRadius: "1rem",
                  }}
                >
                  Yes
                </Button>
              </Grid>
              <Grid item md={7} textAlign="center">
                <Button
                  disableRipple
                  onClick={() => {
                    handledelinkclose();
                  }}
                  sx={{
                    color: `${styles.app_color}!important`,
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {" "}
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default Delinkmobile;
