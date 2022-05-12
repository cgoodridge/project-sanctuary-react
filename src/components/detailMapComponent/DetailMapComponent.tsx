import React, { useState, useEffect, useRef, cloneElement, isValidElement, Children } from 'react';
// import './mapComponent/mapComponent.css';
import LocationPin from '../mapComponent/LocationPin';
import GoogleMapReact from 'google-map-react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { database } from '../../firebase/auth';
import Container from '@mui/material/Container';
import Animal from '../../interfaces/animal';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

const DetailMapComponent = ({ zoomLevel, animalInfo }: any) => {

    const mapkey: string = process.env.REACT_APP_API_KEY || '';
    const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    let location = {
        lat: 21,
        lng: 7
    };

    // useEffect(() => {
    //     setClicks(animalInfo.locations);
    // })

    // { console.log(clicks) }

    return (

        <div className="map">
            <h2 className="map-h2">Animal Locations</h2>

            <div className="google-map">
                <Wrapper apiKey={mapkey} render={render}>

                    <Map
                        center={location}
                        zoom={3}
                        style={{ flexGrow: "1", height: "100%" }}
                    >
                        {animalInfo.locations?.map((locationData: any, index: any) => {
                            <Marker key={index} position={locationData} />
                        })}

                    </Map>
                </Wrapper>

            </div>
        </div>



    )
}

interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
    onClick,
    onIdle,
    children,
    style,
    ...options
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} style={style} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    // set the map prop on the child component
                    return cloneElement(child, { map });
                }
            })}
        </>
    );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = useState<google.maps.Marker>();

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any) => {
        if (
            isLatLngLiteral(a) ||
            a instanceof google.maps.LatLng ||
            isLatLngLiteral(b) ||
            b instanceof google.maps.LatLng
        ) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b);
    }
);

function useDeepCompareMemoize(value: any) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default DetailMapComponent;