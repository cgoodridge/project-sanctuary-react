import React, { useState, useEffect, useRef } from 'react';
import './mapComponent.css';
import LocationPin from './LocationPin';
import GoogleMapReact from 'google-map-react';
import { database } from '../../firebase/auth';
import Container from '@mui/material/Container';
import Animal from '../../interfaces/animal';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

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

const MapComponent = ({ locations, zoomLevel }: any) => {

    const mapkey: string = process.env.REACT_APP_API_KEY || '';

    const [open, setOpen] = React.useState(false);
    
    

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



    return (

        <div className="map">
            <h2 className="map-h2">Animal Locations</h2>

            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapkey }}
                    defaultCenter={location}
                    defaultZoom={zoomLevel}
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