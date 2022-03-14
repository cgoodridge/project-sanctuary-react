import React, { useState, useEffect, useRef } from 'react';
import './mapComponent.css';
import LocationPin from './LocationPin';
import GoogleMapReact from 'google-map-react';
import { database } from '../../firebase/auth';
import Container from '@mui/material/Container';
import Animal from '../../interfaces/animal';

type Props = {
    locations?: Animal[];
    zoomLevel: number;
    detail: boolean;
    locationDetail?: Animal;
};

const MapComponent: React.FC<Props> = ({ locations, zoomLevel, detail, locationDetail }: Props) => {
    console.log(" Location detail is " + locationDetail);


    const mapkey: string = process.env.REACT_APP_API_KEY || '';

    const [locationValue, setLocationValue] = useState({ address: "", lat: 0, lng: 0 });
    const [locationArrayValue, setLocationArrayValues] = useState<any[]>([]);
    console.log(" Locations are " + locations);



    console.log("detail value is " + detail);

    let location = {};

    if (!detail) {
        // setLocationValue({ address: " ", lat: locationDetail.latitude, lng: locationDetail.longitude });
    } else {
        // setLocationArrayValues(locations);
    }

    // If detail is true set location to different value, make it dynamic if it's false

    return (


        <div className="map">
            <h2 className="map-h2">Animal Locations</h2>

            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapkey }}
                    defaultCenter={locationValue}
                    defaultZoom={zoomLevel}
                >
                    {!detail ? locationArrayValue.map((location: { data: { latitude: any; longitude: any; commonName: any; }; }, key: any) => (
                        <>
                            <LocationPin
                                key={key}
                                lat={location.data.latitude}
                                lng={location.data.longitude}
                                text={location.data.commonName}
                            />
                        </>


                    ))

                        :

                        <LocationPin
                            lat={locationDetail?.latitude}
                            lng={locationDetail?.longitude}
                            text={locationDetail?.commonName}
                        />
                    }

                </GoogleMapReact>

            </div>
        </div>



    )
}

export default MapComponent;