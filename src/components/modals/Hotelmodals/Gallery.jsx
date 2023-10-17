import { Card, CardMedia, Dialog, Grid, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Gallery = (props) => {
    const {open,close,data}=props;
    const handleclose=()=>{
        close()
    }
  return (
    <div>
        <Dialog open={open} onClose={handleclose} fullWidth maxWidth="sm" sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            height:'80vh',
            mixHeight:'80vh',
            borderRadius: "15px",
            padding: "1rem",
          },
          "& .MuiDialog-paper::-webkit-scrollbar":{
            display:'none'
          }
        }}>
            <IconButton onClick={handleclose} sx={{position:'absolute',top:'1%',right:'1%',backgroundColor:'#003556',color:'white',padding:'1px',"&:hover":{backgroundColor:'#003556',color:'white',}}}>
              <CloseIcon/>
            </IconButton>
            <Grid container spacing={1}>
                {open&& data.map((item,index)=>{
                    return(
                        // <Grid item md={6} height="50vh" textAlign={'center'}>
                        //     <img src={item} alt="image" style={{maxWidth:'100%',maxHeight:'100%', objectFit:'cover!important'}} />
                        // </Grid>
                        <Grid key={index} item xs={12} sm={6}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="200"
                              image={item}
                              alt={`Image ${index + 1}`}
                            />
                          </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Dialog>
    </div>
  )
}

export default Gallery