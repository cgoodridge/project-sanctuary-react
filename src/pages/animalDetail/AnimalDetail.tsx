import { useState, useEffect, useRef } from 'react';
import './animalDetail.css';
import { database } from '../../firebase/auth';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

interface Animal {
  class?: string,
  commonName?: string,
  dateAdded?: number,
  description?: string,
  diet?: string,
  family?: string,
  genus?: string,
  imgURL?: string,
  kingdom?: string,
  latitude?: string,
  longtitude?: string,
  lifespan?: string,
  lifestyle?: string,
  location?: string,
  nameOfYoung?: string,
  order?: string,
  phylum?: string,
  redListStatus?: string,
  scientificName?: string,
  source?: string

}

const AnimalDetail = ({ data }: any) => {

  let animalData: Animal = {};

  const [animalInfo, setAnimalInfo] = useState<Animal>({});
  const { name } = useParams();

  // animalData.commonName = "test 23";
  const _isMounted = useRef(true);


  useEffect(() => {

    database
      .collection('animals')
      .where('scientificName', '==', name?.replace(/_/g, ' '))
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          animalData = data;
          setAnimalInfo(animalData);
          // console.log(animalData);
        })
      })
    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }

  }, [name]);

  // console.log(animalData.commonName);
  console.log(animalInfo.commonName);

  return (
    <Container maxWidth="lg">
      <Box sx={{ height: '100vh', marginTop: "32px" }}>
        <Grid container>
          <Grid item xs={6}>
            <img className='animalImage' src={animalInfo !== "" ? animalInfo.imgURL : ""} alt={animalInfo !== "" ? animalInfo.commonName : ""} height="400" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom component="div">
              {animalInfo.scientificName} - {animalInfo.commonName}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="body1" gutterBottom>
            {animalInfo.description}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="h5" gutterBottom component="div">
            Details
          </Typography>
          <Grid container>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Kingdom - 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                {" " + " " + animalInfo.kingdom}
              </Typography>
            </Grid>
          </Grid>


          <Grid container>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Phylum - 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                {" " + " " + animalInfo.phylum}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Class - 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                {" " + " " + animalInfo.class}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Order - 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                {" " + " " + animalInfo.order}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Family - 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                {" " + " " + animalInfo.family}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Genus - 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                {" " + " " + animalInfo.genus}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Scientific Name - 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                {" " + " " + animalInfo.scientificName}
              </Typography>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Container>
  )
}

export default AnimalDetail;