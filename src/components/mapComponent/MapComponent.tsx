import React, { useState, useEffect, useRef } from 'react';
import './mapComponent.css';
import LocationPin from './LocationPin';
import GoogleMapReact from 'google-map-react';
import { database } from '../../firebase/auth';



const MapComponent = ({ zoomLevel }: any) => {

    const [locations, setLocations] = useState<any[]>([]);
    const _isMounted = useRef(true);
    useEffect(() => {

        database
            .collection('animals')
            .onSnapshot(snapshot => (
                setLocations(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        return () => { // ComponentWillUnmount 
            _isMounted.current = false;
        }

    }, []);

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
                    bootstrapURLKeys={{ key: "AIzaSyCGS7aJ--tZICb9zBfCqWEy2pwCc-roDc8" }}
                    defaultCenter={location}
                    defaultZoom={zoomLevel}
                >
                    {locations.map((location, key) => (
                        <LocationPin
                            key={key}
                            lat={location.data.latitude}
                            lng={location.data.longitude}
                            text={location.data.name}
                        />
                    ))}

                </GoogleMapReact>
            </div>
        </div>
    )
}

export default MapComponent;