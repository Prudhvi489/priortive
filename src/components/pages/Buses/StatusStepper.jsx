import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Margin } from '@mui/icons-material';
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient(116.32deg, #AD250A -5.88%, #E22500 111.84%);',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient(116.32deg, #AD250A -5.88%, #E22500 111.84%);',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

//   PENDING
const ColorlibConnectorPending = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    //   width:
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient(117.98deg, #F78100 -5.1%, #FFA94B 106.19%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient(117.98deg, #F78100 -5.1%, #FFA94B 106.19%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient(116.32deg, #AD250A -5.88%, #E22500 111.84%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient(116.32deg, #AD250A -5.88%, #E22500 111.84%)',
    }),
  }));

//   pending
const ColorlibStepIconRootPending = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient(117.98deg, #F78100 -5.1%, #FFA94B 106.19%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient(117.98deg, #F78100 -5.1%, #FFA94B 106.19%)',
    }),
  }));
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
    const icons = {
      1: <DoneIcon />,
      2: <GroupAddIcon />,
      3: <ClearIcon />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {/* {icons[String(props.icon)]} */}
        {completed?icons[1]:icons[3]}
      </ColorlibStepIconRoot>
    );
  }

//   pending
function ColorlibStepIconPending(props) {
    const { active, completed, className } = props;
    const icons = {
      1: <DoneIcon />,
      2: <GroupAddIcon />,
      3: <ClearIcon />,
    };
  
    return (
      <ColorlibStepIconRootPending ownerState={{ completed, active }} className={className}>
        {/* {icons[String(props.icon)]} */}
        {completed?icons[1]:icons[3]}
      </ColorlibStepIconRootPending>
    );
  }
  export const StatusStepper = ({stepStatus,activeStep}) => {
    //   const steps = ['Booking Cancelled', 'Create an ad group', 'Create an ad'];

      const steps = [{label:'Booking Cancelled',date:'12 Dec 2022, 08:12',done:true}, {label:'Refund Processed',date:'12 Dec 2022, 08:12',done:false},{label:'Refund Credited',date:'12 Dec 2022, 08:12',done:false}];


  return (
    <div>
        <Stack sx={{ width: '100%',margin:'10px 0' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {stepStatus.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label.label}<br/>{label.date}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
    </div>
  )
}

export  const PendingStepper=({stepStatus,activeStep})=>{
    const steps = [{label:'Booking Cancelled',date:'12 Dec 2022, 08:12',done:true}, {label:'Refund Processed',date:'12 Dec 2022, 08:12',done:false}];


    return (
      <div>
          <Stack justifyContent={'center'} sx={{ width: '100%',margin:'10px 0' }} spacing={4} >
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnectorPending />}>
          {stepStatus.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIconPending}>{label.label}<br/>{label.date}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      </div>
    )
}

// export default {StatusStepper,PendingStepper}