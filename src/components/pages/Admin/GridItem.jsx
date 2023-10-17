import React from 'react';
import { Box, Typography } from '@mui/material';

const GridItem = ({ background, value }) => {
  const gridItemStyles = {
    backgroundImage: `url(${background})`,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    backgroundSize: '100% 100%', // Set background size to 100% width and 100% height
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent repeating of the background image
  };

  return (
    <Box sx={gridItemStyles}>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default GridItem;
