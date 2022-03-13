import { useState, useEffect, useRef } from 'react';
import './mapComponent.css';
import LocationPin from './LocationPin';
import GoogleMapReact from 'google-map-react';
import { database } from '../../firebase/auth';



const MapComponent = ({ locations, zoomLevel, detail, locationDetail }: any) => {

    let mapkey: string = process.env.REACT_APP_API_KEY || '';

    const location =
    {
        address: '1650 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
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
                    {!detail ? locations.map((location: { data: { latitude: any; longitude: any; commonName: any; }; }, key: any) => (
                        <LocationPin
                            key={key}
                            lat={location.data.latitude}
                            lng={location.data.longitude}
                            text={location.data.commonName}
                        />
                    )) 
                    
                    :

                    <LocationPin
                            lat={locationDetail.latitude}
                            lng={locationDetail.longitude}
                            text={locationDetail.commonName}
                        />
                    }

                </GoogleMapReact>
            </div>
        </div>
    )
}

export default MapComponent;