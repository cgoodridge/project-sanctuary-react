import { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { animalCollectionRef, database, storage } from '../../firebase/auth';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import _ from 'underscore';

const AnimalListComponent = ({ animalList }: any) => {

    const [animals, setAnimals] = useState<any[]>([]);
    const _isMounted = useRef(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('commonName');
    const [reverseOption, setReverseOption] = useState(false);

    const checkWhiteSpace = (name: string) => {
        if (name) {
            return name.indexOf(' ') >= 0;
        }
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSort = (e: any, param: string, isReversed: boolean) => {
        setSortOption(param);

        if (isReversed) {
            setReverseOption(true);
        } else {
            setReverseOption(false);
        }
        console.log(param);
        setAnchorEl(null);
    };


    const removeAnimal = async (id: string, commonName: string) => {
        database
            .collection("animals")
            .doc(id)
            .delete()
            .then(() => {
                storage
                    .ref(`images/${commonName}`)
                    .listAll()
                    .then((image) => {
                        image.items.forEach((file) => {
                            file.delete();
                        })
                    })
                    .then(() => {
                        console.log("Animal deleted");
                    })
            });
    };

    useEffect(() => {

        const getAnimalCount = async () => {
            const data = await getDocs(animalCollectionRef);
            if (_isMounted.current) {
                setAnimals(data.docs.map(doc => ({
                    id: doc.id,
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

    }, [animals]);

    return (
        <>
            <Box sx={{ padding: '4px', width: '70vw' }}>

                <TextField
                    id="standard-basic"
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
                    }}
                />

                <IconButton
                    aria-controls={open ? 'filter-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <FilterListIcon />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    // onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={e => handleSort(e, 'scientificName', false)}>A-Z(Scientific Name)</MenuItem>
                    <MenuItem onClick={e => handleSort(e, 'scientificName', true)}>Z-A(Scientific Name)</MenuItem>
                    <MenuItem onClick={e => handleSort(e, 'commonName', false)}>A-Z(Common Name)</MenuItem>
                    <MenuItem onClick={e => handleSort(e, 'commonName', true)}>Z-A(Common Name)</MenuItem>

                </Menu>

            </Box>

            <Box sx={{ width: '100%', margin: '0 auto' }}>
                <Grid container spacing={2} sx={{ marginTop: "64px", marginBottom: "32px", }}>
                    {searchQuery === '' ? animals.length <= 0 ? <Box sx={{ display: 'flex', margin: '120px auto' }}> <CircularProgress /> </Box>

                        :
                        reverseOption ?
                            _.sortBy(animals, sortOption).reverse().map((animal: any, key: any) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={key}>

                                    <Card sx={{ minWidth: 200, maxWidth: 360 }}>

                                        <CardMedia
                                            component="img"
                                            height="250"
                                            src={animal.imgURLS[0]}
                                            alt={animal.commonName}
                                        />

                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" noWrap>
                                                {animal.commonName} - {animal.scientificName}
                                            </Typography>
                                            <Typography variant="body2" noWrap color="text.secondary">
                                                {animal.description}
                                            </Typography>
                                        </CardContent>

                                        <CardActions>
                                            <Link key={animal.commonName} className="learnMore" to={checkWhiteSpace(animal.commonName) ? `/animals/${animal.commonName.replace(/ /g, "_")}` : `/animals/${animal.commonName}`}><Button size="small" >View</Button></Link>
                                            <Button size="small" onClick={() => removeAnimal(animal.id, animal.commonName)}>Delete</Button>
                                        </CardActions>

                                    </Card>

                                </Grid>
                            ))
                            :
                            _.sortBy(animals, sortOption).map((animal: any, key: any) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={key}>

                                    <Card sx={{ minWidth: 200, maxWidth: 360 }}>

                                        <CardMedia
                                            component="img"
                                            height="250"
                                            src={animal.imgURLS[0]}
                                            alt={animal.commonName}
                                        />

                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" noWrap>
                                                {animal.commonName} - {animal.scientificName}
                                            </Typography>
                                            <Typography variant="body2" noWrap color="text.secondary">
                                                {animal.description}
                                            </Typography>
                                        </CardContent>

                                        <CardActions>
                                            <Link key={animal.commonName} className="learnMore" to={checkWhiteSpace(animal.commonName) ? `/animals/${animal.commonName.replace(/ /g, "_")}` : `/animals/${animal.commonName}`}><Button size="small" >View</Button></Link>
                                            <Button size="small" onClick={() => removeAnimal(animal.id, animal.commonName)}>Delete</Button>
                                        </CardActions>

                                    </Card>

                                </Grid>
                            ))


                        :

                        animals.length <= 0 ? <Box sx={{ display: 'flex', margin: '120px auto' }}> <CircularProgress /> </Box> : animals.filter(animal => animal.commonName.toLowerCase().includes(searchQuery.toLowerCase())).map((animal, key) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                                <Card sx={{ minWidth: 200, maxWidth: 360 }}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={animal.imgURLS[0]}
                                        alt={animal.commonName}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {animal.commonName} - {animal.scientificName}
                                        </Typography>
                                        <Typography variant="body2" noWrap color="text.secondary">
                                            {animal.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link key={animal.id} className="learnMore" to={checkWhiteSpace(animal.commonName) ? `/animals/${animal.commonName.replace(/ /g, "_")}` : `/animals/${animal.commonName}`}><Button size="small" >View</Button></Link>
                                        <Button size="small" onClick={() => removeAnimal(animal.id, animal.commonName)}>Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>

            <AddAnimal />
        </>
    )
}

export default AnimalListComponent;