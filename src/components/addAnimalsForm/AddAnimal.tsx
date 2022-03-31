import { useEffect, useState } from 'react';
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
import { saveData } from '../../slices/formDataSlice';
import { useDispatch } from 'react-redux';
import { database, storage } from '../../firebase/auth';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './addAnimal.css';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MapFormComponent from '../mapFormComponent/MapFormComponent';
import { useSelector } from 'react-redux';
import { selectForm, selectImages } from '../../slices/formDataSlice';
import { selectLocations } from '../../slices/locationDataSlice';
import { selectUser } from '../../slices/userSlice';
import firebase from '../../firebase/firebaseConfig';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import { arrayUnion } from 'firebase/firestore';
import LoadingButton from '@mui/lab/LoadingButton';

const steps = [
    'Enter Information',
    'Add Images',
    'Select Location',
    'Confirm Entry'
];

const AddAnimal = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();


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
    const [scientificName, setScientificName] = useState('');
    const [source, setSource] = useState('');
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
    const [imageURLS, setImageURLS] = useState<string[]>([]);
    const [isFilePicked, setIsFilePicked] = useState(false);

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
    console.log(locations);
    const images = useSelector(selectImages);
    const user = useSelector(selectUser);
    const promises: any[] = [];

    const saveNewAnimal = () => {
        setLoading(true);
        selectedFiles.map(file => {
            promises.push(storage
                .ref(`images/${commonName}/${file?.name}`)
                .put(file)
                .then(() => {
                    storage
                        .ref(`images/${commonName}/${file?.name}`)
                        .getDownloadURL()
                        .then((urls) => {
                            setImageURLS(imageURLS => [...imageURLS, urls]);
                        })
                    setLoading(false);
                })
                .catch(error => alert(error.message)));
        })

        Promise.all(promises)
            .then(result => {
                uploadAnimal();
            })
            .catch(error => alert("Promise rejected"))
    }

    const uploadAnimal = () => {
        database
            .collection('animals')
            .doc()
            .set({
                addedBy: user.uid,
                class: kingdomClass,
                commonName: commonName,
                dateAdded: firebase.firestore.Timestamp.fromDate(new Date()),
                description: description,
                diet: diet,
                family: family,
                genus: genus,
                imgURLS: imageURLS,
                kingdom: kingdom,
                locations: locations,
                lifespan: lifespan,
                lifestyle: lifestyle,
                nameOfYoung: nameOfYoung,
                order: order,
                phylum: phylum,
                redListStatus: redListStatus,
                scientificName: scientificName,
                source: source
            }).then(() => {
                database
                    .collection('locations')
                    .doc()
                    .set({
                        animals: "",
                        locationColour: "Blue",
                        name: locationName,
                        imgURL: imageURLS[0]
                    }).then((result) => {
                        setLoading(false);
                        //Display pop up confirmation message here
                        setOpenDialog(false);
                        console.log("Finished uploading");
                    })
            })

    }

    /// End of code for uploading gallery images


    // Stepper Code

    const [activeStep, setActiveStep] = useState(0);
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

    const handleNext = () => {

        dispatch(saveData({
            kingdom: kingdom,
            phylum: phylum,
            kingdomClass: kingdomClass,
            order: order,
            family: family,
            genus: genus,
            species: species,
            description: description,
        }))


        if (activeStep === 0) {
            setSaveAnimalData(true);

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

    const handleUpload = () => {
        console.log("...uploading data");

    };

    // const handleComplete = () => {
    //     const newCompleted = completed;
    //     newCompleted[activeStep] = true;
    //     setCompleted(newCompleted);
    //     handleNext();
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    //     setCompleted({});
    // };

    // End of stepper code

    return (
        <>
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

                    {activeStep === 0 ? <form id="animalInfoForm">
                        <Box sx={{
                            '& > :not(style)': { m: 1, width: '28ch' },
                        }}>
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="kingdom"
                                label="Kingdom"
                                value={kingdom}
                                onChange={(e: any) => setKingdom(e.target.value)}
                                type="text"
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="phylum"
                                value={phylum}
                                onChange={(e: any) => setPhylum(e.target.value)}
                                label="Phylum"
                                type="text"
                                variant="standard"
                            />
                        </Box>
                        <Box sx={{
                            '& > :not(style)': { m: 1, width: '28ch' },
                        }}>
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="kingdomClass"
                                label="Class"
                                value={kingdomClass}
                                onChange={(e: any) => setKingdomClass(e.target.value)}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="order"
                                label="Order"
                                value={order}
                                onChange={(e: any) => setOrder(e.target.value)}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </Box>

                        <Box sx={{
                            '& > :not(style)': { m: 1, width: '28ch' },
                        }}>
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="family"
                                label="Family"
                                value={family}
                                onChange={(e: any) => setFamily(e.target.value)}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="genus"
                                label="Genus"
                                value={genus}
                                onChange={(e: any) => setGenus(e.target.value)}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </Box>

                        <Box sx={{
                            '& > :not(style)': { m: 1, width: '28ch' },
                        }}>
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="species"
                                label="Species"
                                value={species}
                                onChange={(e: any) => setSpecies(e.target.value)}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="commonName"
                                label="Common Name"
                                value={commonName}
                                onChange={(e: any) => setCommonName(e.target.value)}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </Box>

                        <Box sx={{
                            '& > :not(style)': { m: 1, width: '60ch' },
                        }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Description"
                                value={description}
                                onChange={(e: any) => setDescription(e.target.value)}
                                type="text"
                                fullWidth
                                multiline
                                variant="standard"
                            />
                        </Box>

                    </form> : activeStep === 1 ?

                        <Box sx={{ width: "100%", overflowX: "scroll" }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                {selectedFiles.length <= 0 ? <Box></Box>

                                    :

                                    selectedFiles.map((file, key) => (
                                        <Grid item xs={4} key={key}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    '& > :not(style)': {
                                                        m: 1,
                                                        width: 128,
                                                        height: 128,
                                                    },
                                                    padding: '16px'
                                                }}
                                            >
                                                <Badge badgeContent={<IconButton onClick={() => removeImage(key)}> <CloseIcon sx={{ color: 'black', fontSize: 24 }} >Test</CloseIcon> </IconButton>} >
                                                    <Paper className="imgTile" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} elevation={2}>
                                                        <img src={URL.createObjectURL(file)} ></img>
                                                    </Paper>
                                                </Badge>
                                            </Box>
                                        </Grid>
                                    ))

                                }

                                <Grid item xs={4}>
                                    <label htmlFor="icon-button-file">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                '& > :not(style)': {
                                                    m: 1,
                                                    width: 128,
                                                    height: 128,
                                                },
                                                padding: '16px'
                                            }}
                                        >
                                            <Input multiple accept="image/*" id="icon-button-file" type="file" onChange={handleFileUpload} />
                                            <Paper sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }} elevation={2}>
                                                <AddIcon sx={{ fontSize: 70 }} />
                                            </Paper>
                                        </Box>
                                    </label>
                                </Grid>
                            </Grid>
                        </Box>

                        : activeStep === 2 ? <MapFormComponent /> : activeStep === 3 ? <ConfirmationForm /> : <AnimalDataForm />}

                </DialogContent>
                <DialogActions>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    {activeStep === 3 ? <LoadingButton loading={loading} loadingPosition="center" type='submit' form="animalInfoForm" onClick={saveNewAnimal} sx={{ mr: 1 }}>Upload</LoadingButton>
                        :
                        <Button type='submit' form="animalInfoForm" onClick={handleNext} sx={{ mr: 1 }}>Next</Button>}
                </DialogActions>
            </Dialog>
            <Container>
                <Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", right: "10%" }}>
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