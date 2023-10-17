import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Paper,
} from "@mui/material";
import convenience1 from "../../../assets/AdminAssets/convenience1.svg";
import convenience2 from "../../../assets/AdminAssets/convenience2.svg";
import convenience3 from "../../../assets/AdminAssets/convenience3.png";
import { useForm } from "react-hook-form";
import gomytripclient from "../../../GomytripClient";
import { handleNumInput } from "../Buses/BusModuleHelperFunctions";
import { enqueueSnackbar } from "notistack";
import { adminAddCoupoun } from "./AdminStyles";

const AdminConvenienceFee = () => {
  const [adminFee, setAdminFee] = useState("");

  const [flightFeeType, setFlightFeeType] = useState({
    type: 1,
    value: 0,
    disable: true,
    module: 1,
    id: "",
  });

  const [hotelFeeType, setHotelFeeType] = useState({
    type: 1,
    value: 0,
    disable: true,
    module: 2,
    id: "",
  });

  const [busFeeType, setBusFeeType] = useState({
    type: 1,
    value: 0,
    disable: true,
    module: 3,
    id: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //   module =1-> for flights
  // module =2-> for hotels
  // module =3-> for buses

  useEffect(() => {
    gomytripclient
      .post("/getConvenienceFee")
      .then((res) => {
        console.log(res, "busFeeType");

        if (res.status === 200 && res.data.status === 1) {
          res.data.data.forEach((data) => {
            if (data.module == 1) {
              setFlightFeeType((pre) => ({
                ...pre,
                type: data.convenience_type,
                value: data.convenience_value,
                id: data.id,
              }));
            }
            if (data.module == 2) {
              setHotelFeeType((pre) => ({
                ...pre,
                type: data.convenience_type,
                value: data.convenience_value,
                id: data.id,
              }));
            }
            if (data.module == 3) {
              setBusFeeType((pre) => ({
                ...pre,
                type: data.convenience_type,
                value: data.convenience_value,
                id: data.id,
              }));
            }
          });
        }
      })
      .catch((err) => {});
  }, []);

  // feeId,module,conType,conVal
  const editConvenienceFee = ({ id, module, type, value }) => {
    if (type == 2 && value >= 80) {
      enqueueSnackbar("Restricted for 80 and more", { variant: "error" });
      return false;
    }
    if (type == 1 && value >= 9999) {
      enqueueSnackbar("Restricted 9999", { variant: "error" });
      return false;
    }
    console.log(id, module, type, value);
    let payLoad = {
      id: id,
      module: module,
      convenience_type: type,
      convenience_value: Number(value),
    };

    gomytripclient
      .post("/editConvenienceFee", payLoad)
      .then((res) => {
        console.log(res, "res");
        if (res.status === 200 && res.data.status === 1) {
          if (module == 1) {
            setFlightFeeType((pre) => ({
              ...pre,
              disable: !pre.disable,
              id: res.data.data.id,
            }));
          }
          if (module == 2) {
            setHotelFeeType((pre) => ({
              ...pre,
              disable: !pre.disable,
              id: res.data.data.id,
            }));
          }
          if (module == 3) {
            setBusFeeType((pre) => ({
              ...pre,
              disable: !pre.disable,
              id: res.data.data.id,
            }));
          }
          enqueueSnackbar(res.data.message, { variant: "success" });
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const adminAddCoupounStyles = adminAddCoupoun();
  return (
    <>
      <h4 className={adminAddCoupounStyles.headingstyle}>Convenience Fee</h4>
      <Grid container>
        <Grid item direction="column" md={6}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              marginBottom: "10px",
              borderRadius: "15px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={6}>
                <img src={convenience1} alt="Convenience2" width="100%" />
              </Grid>
              <Grid item md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      disabled={flightFeeType.disable}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-label">
                        Convenience Type
                      </InputLabel>
                      <Select
                        {...register("discountType", {
                          required: {
                            value: true,
                            message: "Select Convenience Type for the coupoun",
                          },
                        })}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={flightFeeType.type}
                        label="Convenience Type"
                        onChange={(e) =>
                          setFlightFeeType((pre) => ({
                            ...pre,
                            type: e.target.value,
                          }))
                        }
                      >
                        <MenuItem value={1}>Amount</MenuItem>
                        <MenuItem value={2}>Percentage</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={flightFeeType.disable}
                      onKeyDown={(e) => handleNumInput(e)}
                      value={flightFeeType.value}
                      onChange={(e) =>
                        setFlightFeeType((pre) => ({
                          ...pre,
                          value: e.target.value,
                        }))
                      }
                      fullWidth
                      size="small"
                      label={`${
                        flightFeeType.type == 1 ? "Amount" : "Percentage"
                      }`}
                      placeholder={`Enter ${
                        flightFeeType.type == 1 ? "Amount" : "Percentage"
                      }`}
                    />
                  </Grid>
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Stack
                      spacing={0}
                      flexDirection={"row"}
                      alignItems={"baseline"}
                    >
                      <Button
                        onClick={(e) =>
                          setFlightFeeType((pre) => ({
                            ...pre,
                            disable: !pre.disable,
                          }))
                        }
                        variant="outlined"
                        size="small"
                        style={{ color: "rgb(0,53,86,1)", border: "none" }}
                      >
                        {flightFeeType.disable ? "Edit" : "Cancel"}
                      </Button>
                      <Button
                        onClick={() => editConvenienceFee(flightFeeType)}
                        disabled={flightFeeType.disable}
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: "12px" }}
                        style={{
                          backgroundColor: "rgb(0,53,86,1)",
                          color: "white",
                        }}
                      >
                        Save
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={3}
            style={{
              padding: "16px",
              marginBottom: "10px",
              borderRadius: "15px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={6}>
                <img src={convenience2} alt="Convenience2" width="100%" />
              </Grid>
              <Grid item md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      disabled={busFeeType.disable}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-label">
                        Convenience Type
                      </InputLabel>
                      <Select
                        {...register("discountType", {
                          required: {
                            value: true,
                            message: "Select Convenience Type for the coupoun",
                          },
                        })}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={busFeeType.type}
                        label="Convenience Type"
                        onChange={(e) =>
                          setBusFeeType((pre) => ({
                            ...pre,
                            type: e.target.value,
                          }))
                        }
                      >
                        <MenuItem value={1}>Amount</MenuItem>
                        <MenuItem value={2}>Percentage</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={busFeeType.disable}
                      onKeyDown={(e) => handleNumInput(e)}
                      value={busFeeType.value}
                      onChange={(e) =>
                        setBusFeeType((pre) => ({
                          ...pre,
                          value: e.target.value,
                        }))
                      }
                      fullWidth
                      size="small"
                      label={`${
                        busFeeType.type == 1 ? "Amount" : "Percentage"
                      }`}
                      placeholder={`Enter ${
                        busFeeType.type == 1 ? "Amount" : "Percentage"
                      }`}
                    />
                  </Grid>
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Stack
                      spacing={0}
                      flexDirection={"row"}
                      alignItems={"baseline"}
                    >
                      <Button
                        onClick={(e) =>
                          setBusFeeType((pre) => ({
                            ...pre,
                            disable: !pre.disable,
                          }))
                        }
                        variant="outlined"
                        size="small"
                        style={{ color: "rgb(0,53,86,1)", border: "none" }}
                      >
                        {busFeeType.disable ? "Edit" : "Cancel"}
                      </Button>
                      <Button
                        onClick={() => editConvenienceFee(busFeeType)}
                        disabled={busFeeType.disable}
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: "12px" }}
                        style={{
                          backgroundColor: "rgb(0,53,86,1)",
                          color: "white",
                        }}
                      >
                        Save
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={3}
            style={{
              padding: "16px",
              marginBottom: "10px",
              borderRadius: "15px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={6}>
                <img src={convenience3} alt="Convenience2" width="100%" />
              </Grid>
              <Grid item md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl
                      disabled={hotelFeeType.disable}
                      size="small"
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-label">
                        Convenience Type
                      </InputLabel>
                      <Select
                        {...register("discountType", {
                          required: {
                            value: true,
                            message: "Select Convenience Type for the coupoun",
                          },
                        })}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={hotelFeeType.type}
                        label="Convenience Type"
                        onChange={(e) =>
                          setHotelFeeType((pre) => ({
                            ...pre,
                            type: e.target.value,
                          }))
                        }
                      >
                        <MenuItem value={1}>Amount</MenuItem>
                        <MenuItem value={2}>Percentage</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={hotelFeeType.disable}
                      onKeyDown={(e) => handleNumInput(e)}
                      value={hotelFeeType.value}
                      onChange={(e) =>
                        setHotelFeeType((pre) => ({
                          ...pre,
                          value: e.target.value,
                        }))
                      }
                      fullWidth
                      size="small"
                      label={`${
                        hotelFeeType.type == 1 ? "Amount" : "Percentage"
                      }`}
                      placeholder={`Enter ${
                        hotelFeeType.type == 1 ? "Amount" : "Percentage"
                      }`}
                    />
                  </Grid>
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Stack
                      spacing={0}
                      flexDirection={"row"}
                      alignItems={"baseline"}
                    >
                      <Button
                        onClick={(e) =>
                          setHotelFeeType((pre) => ({
                            ...pre,
                            disable: !pre.disable,
                          }))
                        }
                        variant="outlined"
                        size="small"
                        style={{ color: "rgb(0,53,86,1)", border: "none" }}
                      >
                        {hotelFeeType.disable ? "Edit" : "Cancel"}
                      </Button>
                      <Button
                        onClick={() => editConvenienceFee(hotelFeeType)}
                        disabled={hotelFeeType.disable}
                        variant="contained"
                        size="small"
                        sx={{ marginLeft: "12px" }}
                        style={{
                          backgroundColor: "rgb(0,53,86,1)",
                          color: "white",
                        }}
                      >
                        Save
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminConvenienceFee;
