import { useState, useEffect, useRef } from 'react';
import './animalDetail.css';
import { database } from '../../firebase/auth';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface Animal{
  commonName: string,
}

const AnimalDetail = ({ data }: any) => {

  const [animalInfo, setAnimalInfo] = useState({});
  const { name } = useParams();


  const _isMounted = useRef(true);


  useEffect(() => {

    database
      .collection('animals')
      .where('scientificName', '==', name?.replace(/_/g, ' '))
      .onSnapshot(snapshot => (
        setAnimalInfo(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }

  }, [name]);

  console.log(typeof animalInfo);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
        {/* <img src={animalInfo.data.imgURL} alt= /> */}
      </Box>
    </Container>
  )
}

export default AnimalDetail;