import { Box } from '@mui/material';
import React from 'react';
import './notFound.css';
// import * as LottiePlayer from "@lottiefiles/lottie-player";
import { Player } from '@lottiefiles/react-lottie-player';
// import Box from ''

const NotFound = () => {
    return (
        <div className='notFoundImage'>
            <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_4qhciwpm.json" background="transparent" speed="1" style={{ width: '100%', height: '100%' }} loop autoplay></lottie-player>

        </div>
    )
}

export default NotFound;