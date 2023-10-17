import { Container, Grid } from '@mui/material'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Gomytriplogo from '../..//assets/images/Frame.png'
import gomytripclient from '../../GomytripClient';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const PricacyAndPolicyGmt = () => {
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const homepage = () => {
    navigate('/Flights')
  }
  const [terms, setTerms] = React.useState('')

  React.useEffect(() => {
    gomytripclient.post('/getPrivacyPolicy'
    ).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        setTerms(res.data.data[0].policy)
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <Grid container flexDirection={'column'} justifyContent={'space-between'}>
      <Grid item md={12}>
        <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters >
              {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Grid item md={1} mt={2} >
                <img src={Gomytriplogo} alt="Gomytriplogo" onClick={() => homepage()} />
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>
      <Grid item md={12} sx={{ padding: '10px 25px' }}>
        <Typography textAlign={'center'} fontWeight={'500'} sx={{color:"#072b42"}}>
          {/* GOMYTRIP (INDIA) PRIVACY AND POLICY */}
        </Typography>
        <span dangerouslySetInnerHTML={{ __html: terms }} />
      </Grid>
      <Grid item md={12}>
        <AppBar position="static" sx={{ backgroundColor: '#456376' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
              <Typography textAlign={'center'} color={'yellow'}>
                © GOMYTRIP (INDIA) PVT. LTD.
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>

    </Grid>


  )
}

export default PricacyAndPolicyGmt