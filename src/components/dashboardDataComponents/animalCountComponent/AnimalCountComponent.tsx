import { useState, useEffect, useRef } from 'react';
import { database } from '../../../firebase/auth';
import './animalCountComponent.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { animalCollectionRef } from '../../../firebase/auth';
import { getDocs, onSnapshot } from 'firebase/firestore';

const AnimalCountComponent = () => {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        return database.collection('animals').onSnapshot((snapshot) => {
            setCount(snapshot.size);
        });
    }, []);

    return (
        <Card sx={{ width: 125, height: 125, margin: '16px' }} className="cardColour">
            <CardContent>
                <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold' }} color="text.secondary" gutterBottom component="p">
                    Active Animals
                </Typography>
                <Typography sx={{ fontSize: 42, fontWeight: 'bold', textAlign: 'center' }} color="text.secondary" gutterBottom component="p">
                    {count <= 0 ? <CircularProgress /> : count}
                </Typography>
            </CardContent>
        </Card >
    )
}

export default AnimalCountComponent;