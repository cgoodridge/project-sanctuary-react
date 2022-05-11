import React, { useState, useEffect, useRef } from 'react';
// import './mapComponent/mapComponent.css';
import LocationPin from '../mapComponent/LocationPin';
import GoogleMapReact from 'google-map-react';
import { database } from '../../firebase/auth';
import Container from '@mui/material/Container';
import Animal from '../../interfaces/animal';

const DetailMapComponent = ({ zoomLevel, animalInfo }: any) => {

    const mapkey: string = process.env.REACT_APP_API_KEY || '';

    let location = {
        lat: 21,
        lng: 7
    };
    // { console.log(animalInfo.locations) }

    return (

        <div className="map">
            <h2 className="map-h2">Animal Locations</h2>

            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapkey }}
                    center={location}
                    defaultZoom={zoomLevel}
                >
                    {animalInfo.locations?.map((location: any, index: any) => {
                        console.log(location.lat);
                        <LocationPin
                            key={index}
                            lat={location.lat}
                            lng={location.lng}
                            text={animalInfo.commonName}
                        />
                    })
                    }

                </GoogleMapReact>

            </div>
        </div>



    )
}

export default DetailMapComponent;