import React from 'react';
import AnimalCountComponent from '../animalCountComponent/AnimalCountComponent';
import UserCountComponent from '../userCountComponent/UserCountComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const DashboardContainerComponent = () => {

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container sx={{}}>
        <Grid item xs={12} md={6}>
          <AnimalCountComponent />
        </Grid>
        <Grid item xs={12} md={6}>
          <UserCountComponent />
        </Grid>
      </Grid>
    </Box>
  )
  
}

export default DashboardContainerComponent;