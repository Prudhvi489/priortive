import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import profile1 from '../../../assets/Subadminassets/profile1.svg';
import profile2 from '../../../assets/Subadminassets/profile2.svg';
import profile3 from '../../../assets/Subadminassets/profile3.svg';
import profile4 from '../../../assets/Subadminassets/profile4.svg';
const DataWithDividers = () => {
  const myArray = [
    { profileImage: profile1, name: 'Harsha vardhan Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Today 07:00 PM' },
    { profileImage: profile2, name: 'Supriya Booked Shree Hotel & Family in Hyderabad for 30/05/2023', date: 'Yesterday 08:12 PM' },
    { profileImage: profile3, name: 'Kumar Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Tuesday 10:12 PM' },
    { profileImage: profile4, name: 'Sowmya Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Monday 09:12PM' },
    { profileImage: profile1, name: 'Harsha vardhan Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Today 07:00 PM' },
    { profileImage: profile2, name: 'Supriya Booked Shree Hotel & Family in Hyderabad for 30/05/2023', date: 'Yesterday 08:12 PM' },
    { profileImage: profile3, name: 'Kumar Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Tuesday 10:12 PM' },
    { profileImage: profile4, name: 'Sowmya Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Monday 09:12PM' },
    { profileImage: profile1, name: 'Harsha vardhan Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Today 07:00 PM' },
    { profileImage: profile2, name: 'Supriya Booked Shree Hotel & Family in Hyderabad for 30/05/2023', date: 'Yesterday 08:12 PM' },
    { profileImage: profile3, name: 'Kumar Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Tuesday 10:12 PM' },
    { profileImage: profile4, name: 'Sowmya Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Monday 09:12PM' },
    { profileImage: profile1, name: 'Harsha vardhan Booked Shree Hotel & Family in Hyderabad for 29/05/2023', date: 'Today 07:00 PM' },
    { profileImage: profile2, name: 'Supriya Booked Shree Hotel & Family in Hyderabad for 30/05/2023', date: 'Yesterday 08:12 PM' },
  ];

  return (
    <div style={{backgroundColor: "white"}}>
      <Typography style={{fontFamily: 'Poppins'}}>Notification</Typography>
      <Divider />
      <div>
      {myArray.map((item, index) => (
        <Grid container key={index} alignItems="center">
          
          {/* Profile Image and Name */}
          <Grid item xs={6} container alignItems="center" spacing={2}>
            <Grid item>
              <img src={item.profileImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </Grid>
            <Grid item>
              <Typography variant="h6" style={{ fontFamily: 'Poppins', fontSize: '14px'}}>
                {item.name}
              </Typography>
            </Grid>
          </Grid>

          {/* Date */}
          <Grid item xs={6} container justifyContent="flex-end">
            <Typography variant="body2" style={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              {item.date}
            </Typography>
          </Grid>

          {index !== myArray.length - 1 && (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          )}
        </Grid>
      ))}
      </div>
    </div>
  );
};

export default DataWithDividers;
