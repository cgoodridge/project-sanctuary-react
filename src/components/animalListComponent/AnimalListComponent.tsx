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
import { Link } from 'react-router-dom';
import './animalListComponent.css';
import CircularProgress from '@mui/material/CircularProgress';
import AddAnimal from '../addAnimalsForm/AddAnimal';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const AnimalListComponent = () => {

    const [animals, setAnimals] = useState<any[]>([]);
    const _isMounted = useRef(true);

    const [loading, setLoading] = useState(true);

    const checkWhiteSpace = (name: string) => {
        return name.indexOf(' ') >= 0;
    }


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
            <Box sx={{ margin: '16px 0' }}>
                <Input
                    id="input-with-icon-adornment"
                    placeholder='Search'
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }} sx={{ marginTop: "64px", marginBottom: "32px" }}>

                {animals.length <= 0 ? <Box sx={{ display: 'flex', margin: '150px auto' }}> <CircularProgress /> </Box> : animals.map((animal, key) => (
                    <Grid item xs={2} sm={4} md={4} key={key}>
                        <Card sx={{ maxWidth: 300, minWidth: 300 }}>
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
                                <Link key={animal.id} className="learnMore" to={checkWhiteSpace(animal.data.commonName) ? `/animals/${animal.data.commonName.replace(/ /g, "_")}` : `/animals/${animal.data.commonName}`}><Button size="small" >Learn More </Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <AddAnimal />


        </>
    )
}

export default AnimalListComponent