import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';
import zIndex from '@mui/material/styles/zIndex';
import { Portal } from '@mui/material';
import {styles} from '../../../assets/styles/Styles_export'

export default function MySnackbar(props) {
  const open = props.open
  const close = props.close
  const message = props.message

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    close();
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Portal>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        message={message}
        action={action}
        ContentProps={{
          style:{
            background:styles.app_color,
            // zIndex:'1'
          }
        }}
      />
      </Portal>
    </div>
  );
}