import React, { useState, useEffect, useRef } from 'react';
import { database } from '../../firebase/auth';
import './dashboard.css';
import DashboardContainerComponent from '../../components/dashboardDataComponents/dashboardContainerComponent/DashboardContainerComponent';
import Animal from '../../interfaces/animal';

const Dashboard = ({ }) => {
  const _isMounted = useRef(true);
  const [locations, setLocations] = useState<Animal[]>([]);

  useEffect(() => {

    database
      .collection('animals')
      .onSnapshot(snapshot => (
        setLocations(snapshot.docs.map(doc => ({
          class: doc.data().kingdomClass,
          commonName: doc.data().commonName,
          dateAdded: doc.data().dateAdded,
          description: doc.data().description,
          diet: doc.data().diet,
          family: doc.data().family,
          genus: doc.data().genus,
          imgURL: doc.data().imgURL,
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
        })))
      ))
    return () => { // ComponentWillUnmount 
      _isMounted.current = false;
    }

  }, []);

  return (
    <>
      <DashboardContainerComponent />
    </>
  )
}

export default Dashboard;