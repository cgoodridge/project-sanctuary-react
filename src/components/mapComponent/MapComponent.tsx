import React, { useState, useEffect, useRef } from 'react';
import './mapComponent.css';
import LocationPin from './LocationPin';
import GoogleMapReact from 'google-map-react';
import { animalCollectionRef, database } from '../../firebase/auth';
import Animal from '../../interfaces/animal';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { getDocs } from 'firebase/firestore';


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
        </Dialog>
    );
}

const MapComponent = () => {

    const mapkey: string = process.env.REACT_APP_API_KEY || '';

    const [open, setOpen] = React.useState(false);
    const [locations, setLocations] = useState<Animal[]>([]);
    const _isMounted = useRef(true);

    useEffect(() => {

        const getLocationList = async () => {
          const data = await getDocs(animalCollectionRef);
          if (_isMounted.current) {
            setLocations(data.docs.map(doc => ({
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
          }
        }
    
        getLocationList();
    
        return () => { // ComponentWillUnmount 
          _isMounted.current = false;
        }
    
      }, []);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };


    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    let location = {
        lat: 21,
        lng: 7
    };

    const showInfo = (key: any, childProps: any) => {
        console.log("Pin was clicked " + childProps.text);
        handleClickOpen();
    }

    const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
    };

    return (

        <div className="map">
            <h2 className="map-h2">Animal Locations</h2>

            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapkey }}
                    defaultCenter={location}
                    defaultZoom={1}
                    onChildClick={showInfo}
                >
                    {locations?.map((location: any, key: any) => (
                        // <Tooltip title={location.commonName}>
                        <LocationPin
                            key={key}
                            lat={location.latitude}
                            lng={location.longitude}
                            text={location.commonName}
                        />
                        // </Tooltip>
                    ))

                    }

                </GoogleMapReact>

            </div>
            <SimpleDialog
                selectedValue=''
                open={open}
                onClose={handleClose}
            />

        </div>

    )
}

export default MapComponent;