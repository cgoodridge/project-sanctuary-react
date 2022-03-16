import React, { useState, useEffect, useRef } from 'react';
// import './mapComponent/mapComponent.css';
import LocationPin from '../mapComponent/LocationPin';
import GoogleMapReact from 'google-map-react';
import { database } from '../../firebase/auth';
import Container from '@mui/material/Container';
import Animal from '../../interfaces/animal';

const DetailMapComponent = ({ zoomLevel, locationDetail }: any) => {

    const mapkey: string = process.env.REACT_APP_API_KEY || '';

    let location = {
        lat: 21,
        lng: 7
    };

    return (

        <div className="map">
            <h2 className="map-h2">Animal Locations</h2>

            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapkey }}
                    center={location}
                    defaultZoom={zoomLevel}
                >
                    <LocationPin
                        lat={locationDetail.latitude}
                        lng={locationDetail.longitude}
                        text={locationDetail.commonName}
                    />
                </GoogleMapReact>

            </div>
        </div>



    )
}

export default DetailMapComponent;