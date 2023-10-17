import {
    Grid,
    Button,
    Dialog,DialogActions
  } from "@mui/material";
const CheckCopounTerms = ({open,close,data}) => {

    const handleclose=()=>{
          close()
      }
    return (
        <>
            <Dialog open={open} onClose={handleclose}
                maxWidth='xs'
                sx={{
                    "& .MuiDialog-paper": {
                        width: "100%",
                        // mixHeight: 580,
                        // maxWidth: "250px",
                        borderRadius: "15px",
                        padding: "0.7rem",
                    },
                }}
            >
                <Grid container justifyContent={'space-between'}>
                  
                  <span dangerouslySetInnerHTML={{ __html: data }}/>
                </Grid>

                {/* <Container> */}
               
                {/* </Container> */}
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        sx={{
                            backgroundColor: "#003556!important",
                            color: "#ffff",
                            padding: "5px 10px",
                            textTransform: "none",
                            fontWeight: "600",
                        }}
                        onClick={() => handleclose()}
                    >
                        Close
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default CheckCopounTerms