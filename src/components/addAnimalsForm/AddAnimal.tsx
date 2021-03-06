import { useState } from 'react';
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
import Typography from '@mui/material/Typography';
import AnimalDataForm from './AnimalDataForm';
import ImagesForm from './ImagesForm';
import LocationForm from './LocationForm';
import ConfirmationForm from './ConfirmationForm';
import TextField from '@mui/material/TextField';
import { saveData } from '../../slices/formDataSlice';
import { useDispatch } from 'react-redux';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './addAnimal.css';




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

    /// Form values
    const [kingdom, setKingdom] = useState('');
    const [phylum, setPhylum] = useState('');
    const [kingdomClass, setKingdomClass] = useState('');
    const [order, setOrder] = useState('');
    const [family, setFamily] = useState('');
    const [genus, setGenus] = useState('');
    const [species, setSpecies] = useState('');
    const [commonName, setCommonName] = useState('');
    const [description, setDescription] = useState('');
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

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isFilePicked, setIsFilePicked] = useState(false);

    const handleFileUpload = (e: any) => {
        setSelectedFiles(e.target.files);

        if (e.target.files.length > 0) {
            console.log('We have files' + e.target.files);
        } else {
            console.log('We do not have a file');
        }
    };

    // const doUpload = () => {
    //     setLoading(true);
    //     storage
    //         .ref(`users/${user.uid}/${selectedFile?.name}`)
    //         .put(selectedFile)
    //         .then(() => {
    //             storage
    //                 .ref(`users/${user.uid}/${selectedFile?.name}`)
    //                 .getDownloadURL()
    //                 .then((url) => {
    //                     auth.currentUser.updateProfile({
    //                         photoURL: url
    //                     })
    //                         .then(() => {
    //                             dispatch(
    //                                 updateProfile({
    //                                     photoURL: auth.currentUser.photoURL
    //                                 }));
    //                         })

    //                 })
    //             setLoading(false);

    //         })
    //         .catch(error => alert(error.message))
    //     handleClose();

    // };

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
            description: description
        }))


        if (activeStep === 0) {
            setSaveAnimalData(true);
            console.log("This is a test of the active step");
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
                                onChange={e => setKingdom(e.target.value)}
                                type="text"
                                variant="standard"
                            />
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                id="phylum"
                                value={phylum}
                                onChange={e => setPhylum(e.target.value)}
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
                                onChange={e => setKingdomClass(e.target.value)}
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
                                onChange={e => setOrder(e.target.value)}
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
                                onChange={e => setFamily(e.target.value)}
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
                                onChange={e => setGenus(e.target.value)}
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
                                onChange={e => setSpecies(e.target.value)}
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
                                onChange={e => setCommonName(e.target.value)}
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
                                onChange={e => setDescription(e.target.value)}
                                type="text"
                                fullWidth
                                multiline
                                variant="standard"
                            />
                        </Box>

                    </form> : activeStep === 1 ?

                        <>
                            {console.log(selectedFiles.length)}

                            {selectedFiles.length > 0 ? selectedFiles.map((file, key) => (
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
                                        <Paper sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }} onClick={handleFileUpload} elevation={2}>
                                            <AddIcon sx={{ fontSize: 70 }} />
                                        </Paper>

                                    </Box>
                                </label>

                            ))
                                :
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
                                        <Paper sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }} onClick={handleFileUpload} elevation={2}>
                                            <AddIcon sx={{ fontSize: 70 }} />
                                        </Paper>

                                    </Box>
                                </label>
                            }
                        </>

                        : activeStep === 2 ? <LocationForm /> : activeStep === 3 ? <ConfirmationForm /> : <AnimalDataForm />}

                </DialogContent>
                <DialogActions>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    <Button type='submit' form="animalInfoForm" onClick={handleNext} sx={{ mr: 1 }}>Next</Button>
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