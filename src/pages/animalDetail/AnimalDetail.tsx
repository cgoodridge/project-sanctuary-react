import { useState, useEffect, useRef } from 'react';
import './animalDetail.css';
import { animalCollectionRef, database } from '../../firebase/auth';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import DetailMapComponent from '../../components/detailMapComponent/DetailMapComponent';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Animal from '../../interfaces/animal';
import { getDocs, where } from 'firebase/firestore';
import ImageGallery from 'react-image-gallery';


const AnimalDetail = () => {

  let animalData: Animal = {};

  const navigate = useNavigate();
  const animalRef = database.collection("animals");

  const [animalInfo, setAnimalInfo] = useState<Animal>({});
  const [animalImages, setAnimalImages] = useState<any[]>([]);
  const { name } = useParams();


  console.log(animalImages);

  const _isMounted = useRef(true);

  useEffect(() => {

    const getAnimalInfo = async () => {
      const dataRes = await animalRef.where('commonName', '==', name?.replace(/_/g, ''));
      if (_isMounted.current) {
        dataRes.get().then((val) => {
          val.forEach((doc) => {
            setAnimalInfo(doc.data())
            setAnimalImages(animalImages => [...animalImages, doc.data().imgURLS]);
          })
        })
      }
    }

    getAnimalInfo();

    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }

  }, []);

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        aria-label="Back Button"
        onClick={() => navigate("/animals")}
        sx={{ mr: 2 }}
      >
        <ArrowBackIcon sx={{ color: 'black', fontSize: "32px" }} />
      </IconButton>

      <Container maxWidth="lg">

        <Box sx={{ height: '100vh', marginTop: "32px" }}>

          <Grid container>
            <Grid item xs={4} className='imageContainer'>
              {/* <img className='animalImage' src={animalInfo !== "" ? animalInfo.imgURL : ""} alt={animalInfo !== "" ? animalInfo.commonName : ""}/> */}
              <ImageGallery showFullscreenButton={false} showPlayButton={false} showThumbnails={false} items={animalImages[0]} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                {animalInfo.scientificName} - {animalInfo.commonName}
              </Typography>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    <a href="https://www.iucnredlist.org/">IUCN Red List Status</a>  - {animalInfo.redlistStatus}
                  </Typography>
                </Grid>
                <Grid item sx={{ marginLeft: '8px' }}>
                  <Avatar sx={{ bgcolor: red[500] }}>LC</Avatar>
                </Grid>

                <Grid container justifyContent="center">
                  <Grid item xs={6}>
                    <Grid container justifyContent="center">
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

                    <Grid container justifyContent="center">
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
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Typography variant="body1" gutterBottom>
                          Class -
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" gutterBottom>
                          {" " + " " + animalInfo.kingdomClass}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container justifyContent="center">
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

                    <Grid container justifyContent="center">
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

                    <Grid container justifyContent="center">
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

                    <Grid container justifyContent="center">
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
                    <Grid container justifyContent="center" sx={{ marginTop: "16px" }}>
                      <Grid item xs={3}>
                        <Typography variant="h6" gutterBottom>
                          Young
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {animalInfo.nameOfYoung}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6" gutterBottom>
                          Lifespan
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {animalInfo.lifespan}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6" gutterBottom>
                          Lifestyle
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {animalInfo.lifestyle}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>



                </Grid>

              </Grid>

            </Grid>
          </Grid>

          <Box sx={{ marginTop: "16px" }}>
            <Typography variant="body1" gutterBottom>
              {animalInfo.description}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ marginTop: "32px", paddingBottom: "32px" }}>

            <DetailMapComponent locationDetail={animalInfo} zoomLevel={1} />

          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AnimalDetail;