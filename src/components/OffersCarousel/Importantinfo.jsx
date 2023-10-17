import { Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import important from "../../assets/Hotelimages/important.svg";
import { useLocation } from "react-router-dom";
import { Apipost } from "../../ApiServices/Apicalls";
import {styles} from '../../assets/styles/Styles_export'
// import MySnackbar from "../modals/Signupmodals/Snackbar";

const Importantinfo = (props) => {
  const { module_type } = props
  const location = useLocation();
  // for snackbar
  // const [snackopen, setSnackopen] = useState(false);
  // const [snackmessage, setSnackmessage] = useState("");
  // function snackclose() {
  //   setSnackopen(false);
  // };
  //
  let locationPath = location.pathname.split("/")[1];
  let moduleType =locationPath.toLowerCase() == "flights" ? 1 : locationPath.toLowerCase() === "hotels"? 2:locationPath.toLocaleLowerCase() == "buses" ? 3:locationPath==="mybookings"&&4;
  const [importantinfo, setImportantinfo] = useState([]);
  const get_important_info = async () => {
    if (moduleType === 4) {
      moduleType = module_type;
    }
    try {
      const res = await Apipost("/getimportantInfo", { module: moduleType });
      if (res.status) {
        setImportantinfo(res.data);
      } else {
        // setSnackopen(true);
        // setSnackmessage(res.message);
        alert(res.message);
      }
    } catch (error) {
      // setSnackopen(true);
      // setSnackmessage(error);
      alert(error);
    }
  };
  useEffect(() => {
    get_important_info();
  }, [location]);
  return (
    <div>
      {/* <MySnackbar open={snackopen} close={snackclose} message={snackmessage} /> */}
      <Paper
        sx={{
          borderRadius: "0.8rem",
          pt: "1.5rem",
          pl: "0.5rem",
          pb: "0.5rem",
          pr: "0.5rem",
        }}
      >
        <Stack direction="row" spacing={1}>
          <img src={important} alt="important" />
          <span style={{ color: styles.app_color, fontWeight: 500 }}>
            Important Information
          </span>
        </Stack>
        {/* <ul style={{marginTop:'0.5rem',paddingLeft:"1.5rem",fontSize:'14px',fontWeight:400}}>
                    <li>This property offers transfers from the airport (surcharges may apply). Guests must contact the property with arrival details before travel, using the contact information on the booking confirmation. Front desk staff will greet guests on arrival. Due to COVID-19, the children's club is closed until further notice.</li>
                    <li>Office ID and Non-Govt IDs are not accepted as ID proof(s)</li>
                    <li>Aadhar and Driving License are accepted as ID proof(s)</li>
                    <li>Property staff is trained on hygiene guidelines</li>
                  </ul> */}
        {importantinfo.length > 0 && <div dangerouslySetInnerHTML={{ __html: importantinfo[0]?.info }} />}
      </Paper>
    </div>
  );
};

export default Importantinfo;
