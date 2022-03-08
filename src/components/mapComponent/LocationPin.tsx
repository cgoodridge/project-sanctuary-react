import React from 'react';
import Icon from '@mui/material/Icon';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocationPin = ({text} : any) => {
    return (
        <div className="pin">
            <LocationOnIcon />
            <p className="pin-text">{text}</p>
        </div>
    )
}

export default LocationPin;