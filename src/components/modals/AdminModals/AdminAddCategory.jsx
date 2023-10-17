import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { adminAddCoupoun } from "../../pages/Admin/AdminStyles";
import addcouponimg from "../../../assets/AdminAssets/addcoupon.svg";
import UserAvatar from "../../../assets/images/User.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useForm, Controller } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import GomytripClient from "../../../GomytripClient";
import { enqueueSnackbar } from "notistack";

const AdminAddCategory = ({
  open,
  close,
  details,
  successCallBack,
  editDetails,
}) => {
  const adminRefund = adminAddCoupoun();
  const handleclose = () => {
    close();
    setCaterory(1);
    reset();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(details);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  const [caterory, setCaterory] = React.useState("1");
  const handleChange = (event) => {
    setCaterory(event.target.value);
  };

  const onAddCategory = (form) => {
    let addpayload = {
      category_name: form.name,
      category_type: Number(caterory),
    };

    let editPayload = {
      id: editDetails.id,
      category_name: form.name,
      // category_type:Number(caterory),
      action:2
    };

    GomytripClient.post(
      editDetails.id ? "/modifyTourCategories" : "/addCategory",
      editDetails.id ? editPayload : addpayload
    )
      .then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          enqueueSnackbar(res.data.message, { variant: "success" });
          reset();
          close();
          successCallBack();
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
        enqueueSnackbar(res.data.message, { variant: "error" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (editDetails.id) {
      setCaterory(editDetails.category_type);
      setValue("name", editDetails.category_name);
    }
  }, [open]);

  const editCategory = (editId) => {
    let editPay = {
      id: editId,
      category_name: "Best Of",
      category_type: "2",
      block_status: "0",
    };

    GomytripClient.post("/editCategory", editPay)
      .then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          setData(res.data.data);
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
        console.log(res);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleclose}
        className={adminRefund.dialogradius}
        sx={{ "& .MuiDialog-paper": { width: "400px" } }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Grid
            container
            justifyContent={"space-between"}
            sx={{ borderRadius: "10%" }}
          >
            <Grid item md={10}>
              <Typography
                textAlign={"center"}
                className={adminRefund.refundbus}
              >
                Add Category
              </Typography>
            </Grid>
            <Grid item md={1}>
              <CloseIcon
                sx={{
                  borderRadius: "50%",
                  color: "white",
                  background: "#003556",
                }}
                onClick={() => handleclose()}
              />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <form>
            <Grid container justifyContent={"center"} spacing={2}>
              <Grid item md={12}>
                <FormControl disabled={editDetails.id}>
                  <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={caterory}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Main Category"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Sub Category"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name for category is required",
                    },
                  })}
                  helperText={errors?.name?.message}
                  error={errors?.name ?? ""}
                  label={`${caterory == 1 ? "Main Category" : "Sub Category"}`}
                  placeholder={`Enter ${
                    caterory == 1 ? "Main Category" : "Sub Category"
                  }`}
                />
              </Grid>
              <Grid item>
                <LoadingButton
                  sx={{
                    backgroundColor: "#003556!important",
                    color: "#ffff",
                    padding: "5px 10px",
                    textTransform: "none",
                    fontWeight: "600",
                    "& .MuiLoadingButton-loadingIndicator": {
                      color: "#97a8ff",
                    },
                  }}
                  loading={isLoading}
                  className="bg-p"
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit(onAddCategory)}
                >
                  {editDetails.id ? "Edit" : "Save"}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminAddCategory;
