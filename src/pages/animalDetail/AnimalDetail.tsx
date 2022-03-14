import { useState, useEffect, useRef } from 'react';
import './animalDetail.css';
import { database } from '../../firebase/auth';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import MapComponent from '../../components/mapComponent/MapComponent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => navigate(-1)}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon sx={{ color: 'whitesmoke' }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'whitesmoke' }}>
              {animalInfo.scientificName}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

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
          <Box sx={{ marginTop: "32px" }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ paddingTop: "32px" }}>
              Details
            </Typography>

            <Grid container>
              <Grid item xs={6}>
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
              </Grid>

              <Grid item xs={6}>
                <MapComponent locationDetail={animalInfo} zoomLevel={12} detail={true} />
              </Grid>
            </Grid>


          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AnimalDetail;