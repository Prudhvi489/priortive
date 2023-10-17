import React, { useEffect, useState } from "react";
//import { TransitionSlide } from "../MuiStyledComponents/MuiStyledComponents";
import {
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Avatar,
  Paper,
  Badge,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Editprofile from "./Editprofile";
import EditIcon from '@mui/icons-material/Edit';
import Usericon from '../../../assets/images/User.png'
import Editicon from '../../../assets/images/editprofileicon.svg'
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import {styles} from '../../../assets/styles/Styles_export'

const baseurl=process.env.REACT_APP_BASEURL;
const ViewProfileDialog = (props) => {
  let open = props.open;
  let closeForm = props.onClose;
  const profile = props.profile;
  const getdata = props.getdata;
  const [editprofileDstate, setEditprofileDstate] = useState(false);
  const [editprofile, setEditprofile] = useState("")
  useEffect(() => {
    setEditprofile({ ...profile })
  }, [profile])
  const handleViewProfileDState = (value) => (event) => {
    closeForm();
  };
  const handleEditprofileDstate = (state) => {
    setEditprofileDstate(state);
    closeForm();
  };
  const [imageopen, setImageopen] = useState(false)
  function imageClose() {
    setImageopen(false)
  }
  async function uploadImage(e) {
    const userid = localStorage.getItem("userid")
    console.log(e.target.files[0],"files")
    if (e.target.files[0]) {
      let image = e.target.files[0]
      const profilePic = new FormData()
      profilePic.append('user_id', parseInt(userid));
      profilePic.append('first_name', profile.first_name);
      profilePic.append('last_name', profile.last_name);
      profilePic.append('email', profile.email);
      profilePic.append('mobile', profile.mobile);
      profilePic.append('country_code', profile.country_code);
      profilePic.append('passport', profile.passport);
      profilePic.append('passport_expiry', profile.passport_expiry);
      profilePic.append('dob', profile.dob);
      profilePic.append('old_password', '');
      profilePic.append('new_password', '');
      profilePic.append('gender', profile.gender);
      profilePic.append('deleted_coverIds', []);
      profilePic.append('cover_pic', e.target.files[0]);

      console.log(profilePic, "viewprofile pic")
      // Display the values
      for (const value of profilePic.values()) {
        console.log(value);
      }
      const res = await axios.post(`${baseurl}/editProfile`, profilePic, {
        headers: {
          Authorization: localStorage.getItem('authorization'),
        },
      })
      const data = res.data;
      console.log(data, "responsetoedit")
      if (data.status === 1) {
        getdata()
        setImageopen(false)
      }
      //  const response = data.data;
    }else{
      // alert('gjbiegrf')
    }
  }
  return (
    <React.Fragment>
      {/* image dialog */}
      <Dialog
        open={imageopen}
        onClose={imageClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "300px",
            borderRadius: "15px",
            padding: "2rem",
          },
        }}
      >
        {/* <Grid container justifyContent={'flex-end'}>
          <Grid item>
            <IconButton onClick={imageClose}>
              <CancelRoundedIcon sx={{ color: styles.app_color }} />
            </IconButton>
          </Grid>
        </Grid> */}
        {/* <Grid container justifyContent={'center'} flexDirection={'row'} spacing={2}>
          {(profile?.cover_pic?.length && profile?.cover_pic[0] !== "http://3.111.150.63/storage/defaultPics/BUS.jpg" ) && profile?.cover_pic.map((items)=>{
            return(
              <Grid item>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <DeleteIcon sx={{color:'rgba(255, 0, 0,0.5)',cursor:'pointer'}}/>
                  }
                >
                  <Avatar 
                    alt="userProfileImg"
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: 70,
                      borderRadius: "50%",
                      background: 'white',
                    }}
                    src={items}
                  />
                </Badge>
              </Grid>
            )
          })}
        </Grid> */}
        {/* <Grid>
          <label style={{textAlign:"center"}}>
            Click to add Image
            <input type="file" accept="image/*" style={{ display: 'block' }} onChange={uploadImage} />
          </label>
        </Grid> */}
      </Dialog>
      {/*  */}
      <Editprofile
        open={editprofileDstate}
        onClose={() => handleEditprofileDstate(false)}
        edit={editprofile}
      />
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            mixHeight: 580,
            maxWidth: "400px",
            borderRadius: "15px",
          },
        }}
        maxWidth="xs"
        fullWidth={true}
        className="IssuesFormDialog"
        open={open}
        onClose={handleViewProfileDState(false)}
      //TransitionComponent={TransitionSlide}
      >
        {/* in form loading */}
        <Paper className="stickyTopDiv" elevation={0}>
          <Grid container alignItems="center" justifyContent="center" position={'relative'}>
            <Typography
              textAlign="center"
              color="primary"
              fontWeight="600"
              padding={1.5}
              variant=""
              component=""
              sx={{ fontSize: "20px", color: styles.app_color }}
            >
              My Account
            </Typography>
            <Grid item sx={{position:'absolute',right:'1%'}}>
              <IconButton onClick={handleViewProfileDState(false)}>
                <CancelRoundedIcon sx={{ color: styles.app_color }} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        <DialogContent
          className="dialogContent"
          sx={{ padding: "0 20px 25px 20px" }}
        >
          <Grid
            container
            justifyContent="center"
            sx={{ padding: "2px 0 8px 0" }}
          >
            <div style={{ position: "relative" }}>
              <Avatar
                alt="userProfileImg"
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: 70,
                  borderRadius: "50%",
                  color:styles.app_color,
                  background: '#EEF7FD',
                  // border:'1px solid black'
                }}
              // src={Usericon}
              src={profile?.cover_pic?.length===1&&profile.cover_pic[0]
              } 
              >
              </Avatar>
              <label>
                <img src={Editicon} alt="editicon" className="editicon" />
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadImage} />
              </label>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                onClick={() => handleEditprofileDstate(true)}
              >
                <Typography sx={{ color: styles.app_color, fontFamily: "'Poppins', sans-serif", fontWeight: '500', cursor: 'pointer' }} mt={2}>Edit Profile</Typography>
              </Grid>
              {/* <Paper style={{ width: "35px", height: "30px",borderRadius:'50%' }}><EditIcon/></Paper> */}
            </div>
          </Grid>

          <Grid
            container
            spacing={2.5}
            sx={{ padding: "5px", display: "flex", flexDirection: "column" }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Typography sx={{ color: styles.app_color }}>Name</Typography>
              <Typography>{profile.first_name + " " + profile.last_name}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: styles.app_color }}>Gender</Typography>
              <Typography>{profile?.gender == 1 ? "Male" : profile?.gender == 2 ? "Female" : profile?.gender == 3 ? "Others" : ""}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: styles.app_color }}>Date of Birth</Typography>
              <Typography>{profile?.dob}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: styles.app_color }}>Phone Number</Typography>
              <Typography>{profile?.mobile}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: styles.app_color }}>Email</Typography>
              <Typography>{profile?.email}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: styles.app_color }}>Passport</Typography>
              <Typography>{profile?.passport}</Typography>
            </Grid>
            <Grid item sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: styles.app_color }}>Passport Expiry</Typography>
              <Typography>{profile?.passport_expiry}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default ViewProfileDialog;
