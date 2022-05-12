import React, { useEffect, useRef, useState } from 'react';
import { database, locationCollectionRef } from '../../firebase/auth';
import Box from '@mui/material/Box';
import './locationListComponent.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { getDocs } from 'firebase/firestore';

const LocationListComponent = () => {

    const _isMounted = useRef(true);
    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {

        const getLocationList = async () => {
            const data = await getDocs(locationCollectionRef);
            if (_isMounted.current) {
                setLocations(data.docs.map(doc => ({
                    name: doc.data().name,
                    locationColour: doc.data().locationColour,
                    longitude: doc.data().longitude,
                    latitude: doc.data().latitude,
                    animals: doc.data().animals
                })))
            }
        }

        getLocationList();

        return () => { // ComponentWillUnmount 
            _isMounted.current = false;
        }

    }, []);

    return (
        <Box>
            <Typography variant='h6'>
                Locations
            </Typography>

            {locations.map((location, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{location.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {location.animals.map((animal: any, index: any) => (
                                <>
                                    <ListItem alignItems="flex-start" key={index} secondaryAction={
                                        <IconButton edge="end" aria-label="view" component={Link} to={`/animals/${animal.commonName}`}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    }>
                                        <ListItemAvatar>
                                            <Avatar alt={animal.name} src={animal.imgURL} />
                                        </ListItemAvatar>
                                        <ListItemText primary={animal.name} secondary={animal.scientificName} />
                                    </ListItem>
                                    <Divider />
                                </>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}

        </Box>
    )
}

export default LocationListComponent;