import { useEffect, useRef, useState, Children, isValidElement, cloneElement } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import AnimalDataForm from './AnimalDataForm';
import ConfirmationForm from './ConfirmationForm';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { database, storage } from '../../firebase/auth';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './addAnimal.css';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MapFormComponent from '../mapFormComponent/MapFormComponent';
import { useSelector } from 'react-redux';
import { selectForm, saveData } from '../../slices/formDataSlice';
import { selectLocations } from '../../slices/locationDataSlice';
import { selectUser } from '../../slices/userSlice';
import firebase from '../../firebase/firebaseConfig';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import { arrayUnion } from 'firebase/firestore';
import LoadingButton from '@mui/lab/LoadingButton';
import { clear } from '../../slices/locationDataSlice';
import { clearImageURLS, saveImageURLS, selectImages } from '../../slices/imageDataSlice';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import '../darkMode/DarkMode.css';
import ImagesForm from './ImagesForm';
import LocationForm from './LocationForm';



const render = (status: Status) => {
    return <h1>{status}</h1>;
};


const steps = [
    'Enter Information',
    'Add Images',
    'Select Location',
    'Confirm Entry'
];

const AddAnimal = () => {

    // Map Code Start
    const mapkey: string = process.env.REACT_APP_API_KEY || '';

    const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
    const [jsonClicks, setJsonClicks] = useState<google.maps.LatLng[]>([]);

    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks(clicks => [...clicks, e.latLng!]);
    };

    const confirmLocations = () => {

        clicks.map((location) => {
            let newLocation = JSON.parse(JSON.stringify(location));

            if (jsonClicks.some(locationVal => locationVal.lat === newLocation.lat) && jsonClicks.some(locationVal => locationVal.lng === newLocation.lng)) {
                return;
            } else {
                setJsonClicks(jsonClicks => [...jsonClicks, newLocation]);
            }

        })
        // dispatch(saveLocations(jsonClicks));
    }
    const clearLocations = () => {
        setClicks([]);
        setJsonClicks([]);
    }

    // Map Code End

    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [saveAnimalData, setSaveAnimalData] = useState(false);
    const [saveImageData, setSaveImageData] = useState(false);
    const [saveLocationData, setSaveLocationData] = useState(false);
    const [saveAllData, setSaveAllData] = useState(false);
    const [loading, setLoading] = useState(false);

    /// Form values

    const [kingdom, setKingdom] = useState('');
    const [phylum, setPhylum] = useState('');
    const [kingdomClass, setKingdomClass] = useState('');
    const [order, setOrder] = useState('');
    const [family, setFamily] = useState('');
    const [diet, setDiet] = useState('');
    const [genus, setGenus] = useState('');
    const [species, setSpecies] = useState('');
    const [lifespan, setLifespan] = useState('');
    const [lifestyle, setLifestyle] = useState('');
    const [nameOfYoung, setNameOfYoung] = useState('');
    const [commonName, setCommonName] = useState('');
    const [groupBehaviour, setGroupBehaviour] = useState('');
    const [source, setSource] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [redListStatus, setRedListStatus] = useState('');
    const [description, setDescription] = useState('');
    const [locationName, setLocationName] = useState('');

    /// End form values

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    /// Code for uploading gallery images
    const Input = styled('input')({
        display: 'none',
    });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imageURLS, setImageURLS] = useState<any[]>([]);
    const [locationData, setLocationData] = useState<any[]>([]);
    const [newImageURLS, setNewImageURLS] = useState<any[]>([]);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);


    const handleFileUpload = (e: any) => {
        /* List of files is "array-like" not an actual array
        * So we have to convert to file to an array an add it the array 
        * by destructuring it
        */
        setSelectedFiles(selectedFiles => [...selectedFiles, ...e.target.files]);

    };

    const removeImage = (index: number) => {
        const newFileList = [...selectedFiles];
        newFileList.splice(index, 1);
        setSelectedFiles(newFileList);
    }

    const animal = useSelector(selectForm);
    const locations = useSelector(selectLocations);
    const images = useSelector(selectImages);

    const user = useSelector(selectUser);
    const promises: any[] = [];
    const newURLS: any[] = [];


    const uploadImages = async () => {
        await Promise.all(
            selectedFiles.map(file => {
                promises.push(storage
                    .ref(`images/${commonName}/${file?.name}`)
                    .put(file)
                    .catch(error => alert(error.message)));
            })
        )
    }

    const getImageURLS = async () => {
        await Promise.all(promises)
            .then(result => {
                storage
                    .ref(`images/${commonName}/`)
                    .listAll()
                    .then((urls) => {
                        urls.items.forEach((image) => {
                            image.getDownloadURL()
                                .then(async (url) => {
                                    let newURL = url;
                                    // console.log("Image URL is " + url);
                                    setImageURLS((imageURLS) => [...imageURLS, newURL]);
                                    // dispatch(saveImageURLS(newURL));
                                })
                        })

                    })
                    .then(async () => {
                        setLoading(false);
                    })
            })
            .catch(error => alert("Promise rejected"))
    }

    const uploadAnimal = async () => {

        database
            .collection('animals')
            .doc()
            .set({
                addedBy: user.uid,
                kingdomClass: kingdomClass,
                commonName: commonName,
                dateAdded: firebase.firestore.Timestamp.fromDate(new Date()),
                description: description,
                diet: diet,
                family: family,
                genus: genus,
                imgURLS: imageURLS,
                kingdom: kingdom,
                locations: jsonClicks,
                lifespan: lifespan,
                lifestyle: lifestyle,
                nameOfYoung: nameOfYoung,
                order: order,
                phylum: phylum,
                redListStatus: redListStatus,
                groupBehaviour: groupBehaviour,
                source: source,
                imageSource: imageSource
            }).then(() => {

                database
                    .collection('locations')
                    .doc()
                    .set({
                        animals: "",
                        locationColour: "Blue",
                        name: locationName,
                        imgURL: imageURLS[0]
                    }).then(() => {
                        setLoading(false);
                        setOpenDialog(false);
                        setKingdom('');
                        setPhylum('');
                        setKingdomClass('');
                        setOrder('');
                        setFamily('');
                        setGenus('');
                        setSpecies('');
                        setDescription('');
                        dispatch(clearImageURLS());
                        setJsonClicks([]);
                        // dispatch(clear());
                        handleConfirmMessageOpen();
                        navigate('/animals');
                    })
            })
    }

    /// End of code for uploading gallery images
    // Stepper Code

    const [activeStep, setActiveStep] = useState(0);
    const [stepCounter, setStepCounter] = useState(0);

    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = (e: any) => {
        setStepCounter(stepCounter + 1);

        if (e && activeStep === 0) {
            // if (kingdom === '' || phylum === '' || kingdomClass === '' || order === '' || family === '' || genus === '' || species === '' || description === '' || commonName === '') {
            // if (commonName === '') {
            //     alert("One or more fields, must be filled");
            //     return;
            // } else {
            //     setSaveAnimalData(true);
            //     dispatch(saveData({
            //         commonName: commonName,
            //         kingdom: kingdom,
            //         phylum: phylum,
            //         kingdomClass: kingdomClass,
            //         order: order,
            //         family: family,
            //         genus: genus,
            //         species: species,
            //         description: description,
            //     }))
            // }
        }

        if (e && activeStep === 1) {
            if (selectedFiles.length === 0) {
                alert("Please choose at least 1 image");
                return;
            }
            uploadImages();
        }

        if (e && activeStep === 2) {
            // alert("Just passed image ");
            getImageURLS();
            setLocationData(locationData => locations);
            // return;
        }

        if (e && activeStep === 3) {
            // alert("Just passed image ");
            // return;
        }

        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);

    };

    const handleFormComponentSubmission = (step: number) => {

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleConfirmMessageOpen = () => {
        setOpenConfirmMessage(true);
    };

    const handleConfirmMessageClose = () => {
        setOpenConfirmMessage(false);
    };

    // End of stepper code

    return (
        <>
            <Dialog
                open={openConfirmMessage}
                onClose={handleConfirmMessageClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
                    New Animal Added!
                </DialogTitle>

                <DialogContent className="dataSaved">
                    <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_tia15mzy.json" background="transparent" speed="1" style={{ width: '250px', height: '250px' }} loop autoplay></lottie-player>
                </DialogContent>

                <DialogActions>

                    <Button onClick={handleConfirmMessageClose} autoFocus>
                        OK
                    </Button>

                </DialogActions>

            </Dialog>

            <Dialog open={openDialog} onClose={handleClose} >

                <DialogTitle>Add To the Sanctuary</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>

                    <DialogContentText>
                        Add more animals to the sanctuary.
                    </DialogContentText>

                    {/* We'll move all the form components here for now but we're gonna have to figure out how to refactor the components to make the code a bit cleaner */}

                    {activeStep === 0 ?
                        <AnimalDataForm /> : activeStep === 1 ?
                            <ImagesForm /> : activeStep === 2 ?
                                <LocationForm /> : activeStep === 3 ?
                                    <ConfirmationForm /> : <AnimalDataForm />}

                </DialogContent>
                <DialogActions>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    {activeStep === 3 ? <LoadingButton loading={loading} loadingPosition="center" type='submit' form="animalInfoForm" onClick={uploadAnimal} sx={{ mr: 1 }}>Upload</LoadingButton>
                        :
                        <Button form="animalInfoForm" onClick={handleNext} sx={{ mr: 1 }}>Next</Button>}
                </DialogActions>

            </Dialog>

            <Container>
                <Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", bottom: "10%", right: "10%" }}>
                    <Fab color="primary" variant="extended" onClick={handleClickOpen}>
                        <AddIcon sx={{ mr: 1 }} />
                        Add Animal
                    </Fab>
                </Box>
            </Container>

        </>
    )
}

export default AddAnimal;