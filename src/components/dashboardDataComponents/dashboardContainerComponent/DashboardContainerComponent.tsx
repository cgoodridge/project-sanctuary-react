import React from 'react';
import AnimalCountComponent from '../animalCountComponent/AnimalCountComponent';
import UserCountComponent from '../userCountComponent/UserCountComponent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const DashboardContainerComponent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <AnimalCountComponent />
        <UserCountComponent/>
      </Grid>
    </Box>
  )
}

export default DashboardContainerComponent;