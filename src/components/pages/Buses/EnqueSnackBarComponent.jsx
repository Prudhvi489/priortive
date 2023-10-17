import React,{useEffect} from 'react'
import {Button} from "@mui/material";
import { useSnackbar } from 'notistack'

const EnqueSnackBarComponent = (props) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
      if (props) {
        enqueueSnackbar('This is a dismissable snack bar!', {
          variant: 'info',
          action: (key) => (
            <Button color="inherit" size="small" onClick={() => closeSnackbar(key)}>
              Dismiss
            </Button>
          ),
        });
      }
    }, [showSnackbarProp, enqueueSnackbar, closeSnackbar]);
  
    return null;
  }

export default EnqueSnackBarComponent