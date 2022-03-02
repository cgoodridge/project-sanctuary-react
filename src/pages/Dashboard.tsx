import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import firebase from 'firebase/compat/app';
import { database } from '../firebase/auth';
import { DocumentData } from 'firebase/firestore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface State {
  id: string;
  imgURL: string;
  commonName: string;
}

const Dashboard = () => {


  const [animals, setAnimals] = useState<any[]>([]);

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
      // _isMounted.current = false;
    }

  }, []);

  console.log(animals);

  return (
    <Container>
      <div>Dashboard</div>
      {animals.map((animal, key) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={animal.imgURL}
            alt={animal.commonName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}

    </Container>
  )
}

export default Dashboard;