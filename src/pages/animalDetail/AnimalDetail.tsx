import { useState, useEffect, useRef } from 'react';
import './animalDetail.css';
import { animalCollectionRef, database } from '../../firebase/auth';
import { useParams } from 'react-router-dom';
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
import Carousel from 'nuka-carousel';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import firebase from '../../firebase/firebaseConfig';
import { doc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';


const AnimalDetail = () => {

  let animalData: Animal = {};



  const navigate = useNavigate();
  const animalRef = database.collection("animals");
  const location = useLocation();
  const newId: any = location.state;

  console.log(newId);

  const [animalInfo, setAnimalInfo] = useState<Animal>({});
  const [animalId, setAnimalID] = useState<any>();
  const [animalImages, setAnimalImages] = useState<any[]>([]);
  const [fieldEditStatus, setFieldEditStatus] = useState(false);
  const user = useSelector(selectUser);

  const [commonName, setCommonName] = useState('');

  const { name } = useParams();


  const editContent = () => {
    setFieldEditStatus(true);
    setAnimalID(animalInfo.docId?.toString());
  }

  const saveContent = () => {
    console.log(animalId);
    setFieldEditStatus(false);
    saveData();
    console.log(commonName);
  }


  const saveData = async () => {

    // const animalDoc = doc(database, "animals", animalInf.)
    database
      .collection('animals')
      .doc(newId)
      .update({
        editedBy: user.uid,
        commonName: commonName,
        dateAdded: firebase.firestore.Timestamp.fromDate(new Date()),
      }).then(() => {
        console.log("Document successfully updated!")
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });

  }

  const _isMounted = useRef(true);

  useEffect(() => {

    const getAnimalInfo = async () => {
      const dataRes = await animalRef.where('commonName', '==', name?.replace(/_/g, ' '));
      if (_isMounted.current) {

        dataRes.get().then((val) => {

          val?.forEach((doc) => {
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

  }, [animalInfo]);


  const formatRedListStatus = (status: string | undefined) => {
    let statusResult;

    switch (status) {
      case "Data Deficient":
        statusResult = 'DD';
        break;
      case "Least Concern":
        statusResult = 'LC';
        break;
      case "Near Threatened":
        statusResult = 'NT';
        break;
      case "Vulnerable":
        statusResult = 'VU';
        break;
      case "Endangered":
        statusResult = 'EN';
        break;
      case "Critically Endangered":
        statusResult = 'CR';
        break;
      case "Extinct In The Wild":
        statusResult = 'EW';
        break;
      case "Extinct":
        statusResult = 'EX';
        break;
      default:
        statusResult = '';
    }

    return statusResult;
  }

  return (
    <>
      <Tooltip title="Go Back">
        <IconButton
          size="large"
          edge="start"
          aria-label="Back Button"
          onClick={() => navigate("/animals")}
          sx={{ m: 4 }}
        >
          <ArrowBackIcon className="iconColour" sx={{ fontSize: "32px" }} />
        </IconButton>
      </Tooltip>

      <Box sx={{ height: '100vh', width: '100%', marginTop: "32px" }}>

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={4} m={6} className='imageContainer'>
            {animalImages.length !== 0 ? <Carousel>{animalImages.map((image, index) => <img key={index} src={image} style={{ borderRadius: '10px' }}></img>)}</Carousel> : <></>}
            <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 8, textAlign: "center" }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Young
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {animalInfo.nameOfYoung}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Lifespan
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {animalInfo.lifespan}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Lifestyle
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {animalInfo.lifestyle}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} m={6}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                {fieldEditStatus ?
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="standard-basic" label="Common Name" variant="standard" autoFocus margin="dense" placeholder={animalInfo.commonName} type="text" value={commonName || ''}
                      onChange={(e: any) => setCommonName(e.target.value)} />
                  </Box>
                  :
                  <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    {animalInfo.commonName}
                  </Typography>
                }
              </Grid>
              <Grid item>
                {
                  fieldEditStatus ?
                    commonName?.length === 0 ?
                      <Tooltip title="Cancel Edit">
                        <IconButton
                          size="large"
                          edge="start"
                          aria-label="Cancel Button"
                          onClick={saveContent}
                          sx={{ mb: 1, ml: 1 }}
                        >
                          <CloseIcon sx={{ color: 'orange', fontSize: "32px" }} />
                        </IconButton>
                      </Tooltip>
                      :
                      <Tooltip title="Save Changes">
                        <IconButton
                          size="large"
                          edge="start"
                          aria-label="Save Button"
                          onClick={saveContent}
                          sx={{ mb: 1, ml: 1 }}
                        >
                          <SaveIcon sx={{ color: 'orange', fontSize: "32px" }} />
                        </IconButton>
                      </Tooltip>

                    :
                    <Tooltip title="Edit">
                      <IconButton
                        size="large"
                        edge="start"
                        aria-label="Edit Button"
                        onClick={editContent}
                        sx={{ mb: 1, ml: 1 }}
                      >
                        <EditIcon sx={{ color: 'orange', fontSize: "32px" }} />
                      </IconButton>
                    </Tooltip>
                }
              </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center">
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                        <a href="https://www.iucnredlist.org/">IUCN</a> Red List Status: <i>{animalInfo ? animalInfo.redListStatus : 'N/A'}</i>
                      </Typography>
                    </Grid>
                    <Grid item sx={{ ml: 1, mb: 2 }}>
                      <Avatar sx={{ bgcolor: red[500], width: 32, height: 32, fontSize: '18px' }}>{formatRedListStatus(animalInfo.redListStatus)}</Avatar>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton
                    size="large"
                    edge="start"
                    aria-label="Edit Button"
                    onClick={() => navigate("/animals")}
                    sx={{ mb: 2, ml: 1 }}
                  >
                    <EditIcon sx={{ color: 'orange', fontSize: "32px" }} />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container justifyContent="center">
                <Grid item xs={12}>
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
                        Species -
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" gutterBottom>
                        {" " + " " + animalInfo.scientificName}
                      </Typography>
                    </Grid>
                  </Grid>

                </Grid>

              </Grid>

            </Grid>

          </Grid>
        </Grid>

        <Grid container>
          <Box sx={{ marginTop: "32px", padding: 8 }}>
            <Typography variant="body1" gutterBottom>
              {animalInfo.description}
            </Typography>
          </Box>
        </Grid>

        <Box sx={{ marginTop: "16px", paddingBottom: "32px" }}>

          <DetailMapComponent animalInfo={animalInfo} zoomLevel={1} />

        </Box>
      </Box>

    </>
  )
}

export default AnimalDetail;