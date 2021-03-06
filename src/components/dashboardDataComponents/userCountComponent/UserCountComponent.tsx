import { useState, useEffect, useRef } from 'react';
import { database } from '../../../firebase/auth';
import './userCountComponent.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const UserCountComponent = () => {

    const [count, setCount] = useState<number>(0);

    const _isMounted = useRef(true);

    useEffect(() => {

        database
            .collection('users')
            .onSnapshot(snapshot => (
                setCount(snapshot.size)
            ))
        return () => { // ComponentWillUnmount 
            _isMounted.current = false;
        }

    }, []);

    return (
        <Card sx={{ width: 125, height: 125, margin: '16px' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                    Active Users
                </Typography>
                <Typography sx={{ fontSize: 42, fontWeight: 'bold', textAlign: 'center' }} color="text.secondary" gutterBottom>
                    {count <= 0 ? <CircularProgress /> : count}
                </Typography>
            </CardContent>
        </Card >
    )
}

export default UserCountComponent;