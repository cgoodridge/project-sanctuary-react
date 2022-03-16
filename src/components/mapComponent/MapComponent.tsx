import React, { useState, useEffect, useRef } from 'react';
import './mapComponent.css';
import LocationPin from './LocationPin';
import GoogleMapReact from 'google-map-react';
import { database } from '../../firebase/auth';
import Container from '@mui/material/Container';
import Animal from '../../interfaces/animal';

type Props = {
    locations?: [];
    zoomLevel: number;
};

const MapComponent = ({ locations, zoomLevel }: any) => {

    const mapkey: string = process.env.REACT_APP_API_KEY || '';

    let location = {
        address: "test",
        lat: 21,
        lng: 7
    };

    return (

        <div className="map">
            <h2 className="map-h2">Animal Locations</h2>

            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapkey }}
                    defaultCenter={location}
                    defaultZoom={zoomLevel}
                >
                    {locations?.map((location: any, key: any) => (
                        <>
                            <LocationPin
                                key={key}
                                lat={location.data.latitude}
                                lng={location.data.longitude}
                                text={location.data.commonName}
                            />
                        </>

                    ))

                    }

                </GoogleMapReact>

            </div>
        </div>

    )
}

export default MapComponent;