import { Button, Dialog, Grid } from "@mui/material";
import React, { useState } from "react";
import { Container } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { LoginActions } from "../../../store/LoginSlice";
import axios from "axios";
import MySnackbar from "./Snackbar";
import { Apipost } from "../../../ApiServices/Apicalls";
import { useNavigate } from "react-router-dom";
import {styles} from '../../../assets/styles/Styles_export'

// import {persistor} from "../../store/index"
const Logout = (props) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const open = props.open;
  const onclose = props.onclose;
  const [snackopen, setSnackopen] = useState(false);
  const [snackmessage, setSnackmessage] = useState("");
  function snackclose() {
    setSnackopen(false);
  }
  function handleclose() {
    onclose();
  }
  async function logouthandler() {
    try {
      const data = await Apipost("/logout", {
        user_id: localStorage.getItem("userid"),
      });
      localStorage.clear();
      navigate("/flights")
      dispatch(LoginActions.userlogin(0));
      setSnackopen(true);
      setSnackmessage(data.message);
      onclose();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <MySnackbar open={snackopen} close={snackclose} message={snackmessage} />
      <Dialog
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "250px",
            borderRadius: "15px",
            padding: "0.7rem",
          },
        }}
        onClose={handleclose}
      >
        <Grid item textAlign={"right"} sx={{ color: styles.app_color }}>
          {" "}
          <CancelIcon onClick={handleclose} />
        </Grid>
        <Container>
          <Grid container direction={"column"} spacing={2} textAlign="center">
            <Grid item>
              Are you sure, <br />
              you want to logout?
            </Grid>
            <Grid item mb={1}>
              <Button
                sx={{
                  backgroundColor: `${styles.app_color}!imprtant`,
                  color: "#ffff",
                  padding: "5px 10px",
                  textTransform: "none",
                  fontWeight: "600",
                }}
                onClick={logouthandler}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
};

export default Logout;
