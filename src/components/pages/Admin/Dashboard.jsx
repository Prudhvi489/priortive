import React from "react";
import { adminAddCoupoun } from "./AdminStyles";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import totalincome from "../../../assets/AdminAssets/totalincome.png";
import bookings from "../../../assets/AdminAssets/bookings.png";
import completed from "../../../assets/AdminAssets/completed.png";
import cancelled from "../../../assets/AdminAssets/cancelled.png";
import pending from "../../../assets/AdminAssets/pending.png";
import user1 from "../../../assets/AdminAssets/user1.svg";
import user2 from "../../../assets/AdminAssets/user2.svg";
import user3 from "../../../assets/AdminAssets/user3.svg";
import user4 from "../../../assets/AdminAssets/user4.svg";
import user5 from "../../../assets/AdminAssets/user5.svg";
import user6 from "../../../assets/AdminAssets/user6.svg";
import user7 from "../../../assets/AdminAssets/user7.svg";
import user8 from "../../../assets/AdminAssets/user8.svg";
import platform1 from "../../../assets/AdminAssets/platform1.svg";
import platform2 from "../../../assets/AdminAssets/platform2.svg";
import platform3 from "../../../assets/AdminAssets/platform3.svg";
import userssub from "../../../assets/AdminAssets/userssub.svg";
import adminssub from "../../../assets/AdminAssets/adminssub.svg";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
} from "@mui/material";

const Dashboard = () => {
  const [revenue, setRevenue] = React.useState("");

  const handleChange = (event) => {
    setRevenue(event.target.value);
  };

  const rows = [
    { category: "Flights", percentage: "47%", usage: 7000 },
    { category: "Hotels", percentage: "26%", usage: 3879 },
    { category: "Buses", percentage: "20%", usage: 2879 },
    { category: "Tour Packages", percentage: "7%", usage: 1179 },
  ];

  const adminAddCoupounStyles = adminAddCoupoun();
  const gridBackgrounds = [
    totalincome,
    bookings,
    completed,
    cancelled,
    pending
  ];
  return (
    <>
      <Typography className={adminAddCoupounStyles.headingstyle}>Dashbord</Typography>
      <Grid item container>
        <Grid
          item
          md={2.4}
          sm={6}
          xs={12}
          className={adminAddCoupounStyles.dashboard_card}
          style={{
            backgroundImage: `url(${gridBackgrounds[0]})`,
          }}
        >
          <Stack>
            <span>2,89,89,000</span>
          </Stack>
        </Grid>
        <Grid
          item
          md={2.4}
          sm={6}
          xs={12}
          className={adminAddCoupounStyles.dashboard_card}
          style={{
            backgroundImage: `url(${gridBackgrounds[1]})`,
          }}
        >
          <Stack>
            <span>9,987</span>
          </Stack>
        </Grid>
        <Grid
          item
          md={2.4}
          sm={6}
          xs={12}
          className={adminAddCoupounStyles.dashboard_card}
          style={{
            backgroundImage: `url(${gridBackgrounds[2]})`,
          }}
        >
          <Stack>
            <span>7,900 </span>
          </Stack>
        </Grid>
        <Grid
          item
          md={2.4}
          sm={6}
          xs={12}
          className={adminAddCoupounStyles.dashboard_card}
          style={{
            backgroundImage: `url(${gridBackgrounds[3]})`,
          }}
        >
          <Stack>
            <span>200</span>
          </Stack>
        </Grid>
        <Grid
          item
          md={2.4}
          sm={6}
          xs={12}
          fullWidth
          className={adminAddCoupounStyles.dashboard_card}
          style={{
            backgroundImage: `url(${gridBackgrounds[4]})`,
          }}
        >
          <Stack>
            <span>20</span>
          </Stack>
        </Grid>

      </Grid>
      <Grid container spacing={2} mt={2} >
        <Grid item md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={4}  style={{ backgroundColor: "white",borderRadius: "20px" }}>
                <Grid container style={{ justifyContent: "space-between" }}>
                  <Grid item style={{ padding: "1rem" }}>
                    <Box
                      sx={{ minWidth: 120, maxWidth: 600, border: "none", boxShadow: "none" }}
                    >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Revenue
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={revenue}
                          label="Revenue"
                          onChange={handleChange}
                        >
                          <MenuItem value={10} sx={revenue === 10 ? { fontWeight: '500' } : {}}>Weekly Revenue</MenuItem>
                          <MenuItem value={20} sx={revenue === 20 ? { fontWeight: '500' } : {}}>Monthly Revenue</MenuItem>
                          <MenuItem value={30} sx={revenue === 30 ? { fontWeight: '500' } : {}}>Yearly Revenue</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item style={{ padding: "2rem" }}>2,89,89,000 INR</Grid>
                </Grid>
                <Grid item>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        area: true,
                      },
                    ]}
                    // width={500}
                    sx={{ width: { md: "500px", xs: "100%" } }}
                    height={300}
                    style={{ marginBottom: "2rem" }}
                  />
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Paper elevation={4}  className={adminAddCoupounStyles.paperstyeladmin1} >
                    <Typography p={2} className={adminAddCoupounStyles.headingstyle}>
                      Top Users
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems="center"
                          marginLeft={1}
                        >
                          <img
                            src={user1}
                            alt="Kiran Kumar"
                            style={{ width: "25%" }}
                          />
                          <Box marginLeft={2}>
                            <Typography variant="body1" className={adminAddCoupounStyles.dashboard_fontsize}>Kiran Kumar</Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems="center"
                          style={{ marginTop: "10px" }}
                          marginLeft={1}
                        >
                          <img
                            src={user2}
                            alt="Muhammad"
                            style={{ width: "25%" }}
                          />
                          <Box marginLeft={2}>
                            <Typography variant="body1" className={adminAddCoupounStyles.dashboard_fontsize}>Muhammad</Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems="center"
                          style={{ marginTop: "10px" }}
                          marginLeft={1}
                        >
                          <img
                            src={user3}
                            alt="Sharu"
                            style={{ width: "25%" }}
                          />
                          <Box marginLeft={2}>
                            <Typography variant="body1" className={adminAddCoupounStyles.dashboard_fontsize}>Sharu</Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems="center"
                          style={{ marginTop: "10px" }}
                          marginLeft={1}
                        >
                          <img
                            src={user4}
                            alt="Yaswanth"
                            style={{ width: "25%" }}
                          />
                          <Box marginLeft={2}>
                            <Typography variant="body1" className={adminAddCoupounStyles.dashboard_fontsize}>Yaswanth</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems="center"
                          marginLeft={1}
                        >
                          <img
                            src={user5}
                            alt="Rahul"
                            style={{ width: "25%" }}
                          />
                          <Box marginLeft={2}>
                            <Typography variant="body1" className={adminAddCoupounStyles.dashboard_fontsize}>Rahul</Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems="center" // Align items vertically to the center
                          style={{ marginTop: "10px" }}
                          marginLeft={1}
                        >
                          <img
                            src={user6}
                            alt="Venkat"
                            style={{ width: "25%" }}
                          />
                          {/* Add space between image and name using Box component */}
                          <Box marginLeft={2}>
                            <Typography variant="body1" className={adminAddCoupounStyles.dashboard_fontsize}>Venkat</Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems="center" // Align items vertically to the center
                          style={{ marginTop: "10px" }}
                          marginLeft={1}
                        >
                          <img
                            src={user7}
                            alt="Rakesh"
                            style={{ width: "25%" }}
                          />
                          {/* Add space between image and name using Box component */}
                          <Box marginLeft={2}>
                            <Typography variant="body1" className={adminAddCoupounStyles.dashboard_fontsize}>Rakesh</Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          alignItems="center" // Align items vertically to the center
                          style={{ marginTop: "10px" }}
                          marginLeft={1}
                        >
                          <img
                            src={user8}
                            alt="Swathi"
                            style={{ width: "25%" }}
                          />
                          {/* Add space between image and name using Box component */}
                          <Box marginLeft={2}>
                            <Typography variant="body1" className={adminAddCoupounStyles.dashboard_fontsize}>Swathi</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper elevation={4}  className={adminAddCoupounStyles.paperstyeladmin}>
                        <Grid container justifyContent={"center"}>
                          <Grid item m={1}>
                            <Typography className={adminAddCoupounStyles.headingstyle}>
                              Platform Usage
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"center"}>
                          <Grid item xs={3}>
                            <img
                              src={platform1}
                              alt="platform1"
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item xs={12} >
                            <Typography textAlign={"center"}>
                              25,000
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"center"}>
                          <Grid item xs={3}>
                            <img
                              src={platform2}
                              alt="platform2"
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item xs={12} >
                            <Typography textAlign={"center"}>
                              17,000
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"center"}>
                          <Grid item xs={3}>
                            <img
                              src={platform3}
                              alt="platform3"
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid item xs={12} >
                            <Typography textAlign={"center"}>
                              10,000
                            </Typography>
                          </Grid>
                        </Grid>

                        {/* <Grid item xs={12} >
                          <img
                            src={platform1}
                            alt="platform1"
                            // style={{ width: "25%", marginLeft: "3.2rem" }}
                          />
                          <p style={{ marginLeft: "3.2rem" }}>25,000</p>
                        </Grid> */}

                        {/* <Grid item xs={12}>
                          <img
                            src={platform2}
                            alt="platform2"
                            style={{ width: "25%", marginLeft: "3.2rem" }}
                          />
                          <p style={{ marginLeft: "3.2rem" }}>17,000</p>
                        </Grid> */}
                        {/* <Grid item xs={12}>
                          <img
                            src={platform3}
                            alt="platform1"
                            style={{ width: "25%", marginLeft: "3.2rem" }}
                          />
                          <p style={{ marginLeft: "3.2rem" }}>10,000</p>
                        </Grid> */}
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Paper elevation={4} className={adminAddCoupounStyles.totaladmin}>
                            <img
                              src={userssub}
                              alt="users"
                              style={{ width: "15%" }}
                            />
                            <p>Total Users</p>
                            <p>52000</p>
                          </Paper>
                        </Grid>

                        <Grid item xs={12}>
                          <Paper elevation={4} className={adminAddCoupounStyles.totaladmin}>
                            <img
                              src={adminssub}
                              alt="users"
                              style={{ width: "15%" }}
                            />
                            <p>Sub Admins</p>
                            <p>25</p>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12} spacing={2} mt={1} sx={{position: "relative"}}>
          <Paper elevation={4} className={adminAddCoupounStyles.paddingbottom} >
            <Typography className={adminAddCoupounStyles.headingstyle} style={{ padding: "1rem" }}>Over All</Typography>
            <PieChart 
              series={[
                {
                  data: [
                    { id: 0, value: 47 },
                    { id: 1, value: 26 },
                    { id: 2, value: 7 },
                    { id: 3, value: 20 },
                  ],
                },
              ]}
              // width={400}
              sx={{ width: { md: "400px", sm: "100%" }}}
              height={280}
            />
            <TableContainer
              component={Paper}
              className={adminAddCoupounStyles.tablecontent}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow id="table">
                    <TableCell style={{ color: "white" }}>Category</TableCell>
                    <TableCell style={{ color: "white" }}>Percentage</TableCell>
                    <TableCell style={{ color: "white" }}>Usage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.category}>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.percentage}</TableCell>
                      <TableCell>{row.usage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
