import { useState, useEffect, useRef } from 'react';
import { database } from '../../../firebase/auth';
import './animalCountComponent.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const AnimalCountComponent = () => {

    const [count, setCount] = useState<number>(0);

    const _isMounted = useRef(true);

    useEffect(() => {

        database
            .collection('animals')
            .onSnapshot(snapshot => (
                setCount(snapshot.size)
            ))
        return () => { // ComponentWillUnmount 
            _isMounted.current = false;
        }

    }, []);

    return (
        <Card sx={{ width: 150, height: 150, margin: '16px' }}>
            <CardContent>
                <Typography sx={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }} color="text.secondary" gutterBottom component="p">
                    Active Animals
                </Typography>
                <Typography sx={{ fontSize: 42, fontWeight: 'bold', textAlign: 'center' }} color="text.secondary" gutterBottom component="p">
                    {count}
                </Typography>
            </CardContent>
        </Card >
    )
}

export default AnimalCountComponent;