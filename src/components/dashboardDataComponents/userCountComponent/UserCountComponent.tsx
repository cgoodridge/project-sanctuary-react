import { useState, useEffect } from 'react';
import { database } from '../../../firebase/auth';
import './userCountComponent.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';


const UserCountComponent = () => {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        return database.collection('users').onSnapshot((snapshot) => {
            setCount(snapshot.size);
        });
    }, []);

    return (
        <Card sx={{ width: '100%', height: 125, margin: '0 auto' }} className="cardColour">
            <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                            Active Users
                        </Typography>
                        <Typography sx={{ fontSize: 42, fontWeight: 'bold', textAlign: 'center' }} color="text.secondary" gutterBottom>
                            {count <= 0 ? <CircularProgress /> : count}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <PersonIcon sx={{ fontSize: '48px', margin: '0 auto' }} className='iconColour' />
                    </Grid>
                </Grid>

            </CardContent>
        </Card >
    )
}

export default UserCountComponent;