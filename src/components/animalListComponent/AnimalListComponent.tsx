import { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { database } from '../../firebase/auth';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Input } from '@mui/material';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import './animalListComponent.css';
import CircularProgress from '@mui/material/CircularProgress';



const AnimalListComponent = () => {

    const [animals, setAnimals] = useState<any[]>([]);
    const _isMounted = useRef(true);

    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleFileUpload = (e: any) => {
        // setSelectedFile(e.target.files[0]);
        console.log("Upload button clicked");
        // if (e.target.files[0] !== null) {
        //   console.log('We have a file');
        // } else {
        //   console.log('We do not have a file');
        // }
    };

    useEffect(() => {

        database
            .collection('animals')
            .onSnapshot(snapshot => (
                setAnimals(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        return () => { // ComponentWillUnmount 
            _isMounted.current = false;
        }

    }, []);

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}>

                {animals.length <= 0 ? <Box sx={{ display: 'flex', margin: '150px auto' }}> <CircularProgress /> </Box> : animals.map((animal, key) => (
                    <Grid item xs={2} sm={4} md={4} key={key}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={animal.data.imgURL}
                                alt={animal.data.commonName}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {animal.data.commonName}
                                </Typography>
                                <Typography variant="body2" noWrap color="text.secondary">
                                    {animal.data.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link key={animal.id} className="learnMore" to={`/animals/${animal.data.scientificName.replace(/ /g, "_")}`}><Button size="small" >Learn More </Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Add To the Sanctuary</DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        Add more animals to the sanctuary.
                    </DialogContentText>



                    <Avatar sx={{ width: 180, height: 180, margin: "auto", cursor: 'pointer' }} onClick={handleFileUpload}>
                        <InsertPhotoIcon sx={{ fontSize: 140 }} />
                    </Avatar>



                    <TextField
                        autoFocus
                        margin="dense"
                        id="kingdom"
                        label="Kingdom"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phylum"
                        label="Phylum"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="kingdomClass"
                        label="Class"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="order"
                        label="Order"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="family"
                        label="Family"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="genus"
                        label="Genus"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="species"
                        label="Species"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="commonName"
                        label="Common Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
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

export default AnimalListComponent