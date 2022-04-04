import { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { animalCollectionRef, database } from '../../firebase/auth';
import { Link } from 'react-router-dom';
import './animalListComponent.css';
import CircularProgress from '@mui/material/CircularProgress';
import AddAnimal from '../addAnimalsForm/AddAnimal';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Animal from '../../interfaces/animal';
import { getDocs } from 'firebase/firestore';




const AnimalListComponent = ({ animalList }: any) => {

    const [animals, setAnimals] = useState<any[]>([]);
    const _isMounted = useRef(true);

    const [searchQuery, setSearchQuery] = useState('');

    const checkWhiteSpace = (name: string) => {
        if (name) {
            return name.indexOf(' ') >= 0;
        }
    }

    useEffect(() => {

        const getAnimalCount = async () => {
            const data = await getDocs(animalCollectionRef);
            if (_isMounted.current) {
                setAnimals(data.docs.map(doc => ({
                    kingdomClass: doc.data().kingdomClass,
                    commonName: doc.data().commonName,
                    dateAdded: doc.data().dateAdded,
                    description: doc.data().description,
                    diet: doc.data().diet,
                    family: doc.data().family,
                    genus: doc.data().genus,
                    imgURLS: doc.data().imgURLS,
                    kingdom: doc.data().kingdom,
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude,
                    lifespan: doc.data().lifespan,
                    lifestyle: doc.data().lifestyle,
                    location: doc.data().location,
                    nameOfYoung: doc.data().nameOfYoung,
                    order: doc.data().order,
                    phylum: doc.data().phylum,
                    redlistStatus: doc.data().redListStatus,
                    scientificName: doc.data().scientificName,
                    source: doc.data().source,
                })));
            }
        }

        getAnimalCount();

        return () => { // ComponentWillUnmount 
            _isMounted.current = false;
        }

    }, []);

    return (
        <>
            <Box sx={{ margin: '16px 0' }}>
                <TextField
                    id="standard-basic"
                    fullWidth
                    label="Search"
                    color="primary"
                    variant="standard"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }} sx={{ marginTop: "64px", marginBottom: "32px" }}>

                {searchQuery === '' ? animals.length <= 0 ? <Box sx={{ display: 'flex', margin: '150px auto' }}> <CircularProgress /> </Box> : animals.map((animal, key) => (
                    <Grid item xs={2} sm={4} md={4} key={key}>
                        <Card sx={{ maxWidth: 300, minWidth: 300 }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={animal.imgURLS[0]}
                                alt={animal.commonName}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {animal.commonName}
                                </Typography>
                                <Typography variant="body2" noWrap color="text.secondary">
                                    {animal.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link key={animal.commonName} className="learnMore" to={checkWhiteSpace(animal.commonName) ? `/animals/${animal.commonName.replace(/ /g, "_")}` : `/animals/${animal.commonName}`}><Button size="small" >Learn More </Button></Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))

                    :

                    animals.length <= 0 ? <Box sx={{ display: 'flex', margin: '150px auto' }}> <CircularProgress /> </Box> : animals.filter(animal => animal.commonName.toLowerCase().includes(searchQuery.toLowerCase())).map((animal, key) => (
                        <Grid item xs={2} sm={4} md={4} key={key}>
                            <Card sx={{ maxWidth: 300, minWidth: 300 }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={animal.imgURL}
                                    alt={animal.commonName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {animal.commonName}
                                    </Typography>
                                    <Typography variant="body2" noWrap color="text.secondary">
                                        {animal.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link key={animal.commonName} className="learnMore" to={checkWhiteSpace(animal.commonName) ? `/animals/${animal.commonName.replace(/ /g, "_")}` : `/animals/${animal.commonName}`}><Button size="small" >Learn More</Button></Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <AddAnimal />
        </>
    )
}

export default AnimalListComponent;