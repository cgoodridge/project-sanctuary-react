import React from 'react';
import AnimalCountComponent from '../animalCountComponent/AnimalCountComponent';
import UserCountComponent from '../userCountComponent/UserCountComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const DashboardContainerComponent = () => {

  return (
    <Box sx={{ width: '100%', paddingTop: '16px' }}>
      <Grid container justifyContent="space-evenly">
        <Grid item xs={3} md={3} >
          <AnimalCountComponent />
        </Grid>
        <Grid item xs={3} md={3}>
          <UserCountComponent />
        </Grid>
      </Grid>
    </Box>
  )

}

export default DashboardContainerComponent;