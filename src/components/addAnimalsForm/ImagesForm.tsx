import Avatar from '@mui/material/Avatar';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const ImagesForm = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const handleFileUpload = (e: any) => {
        setSelectedFile(e.target.files[0]);
        console.log("Upload button clicked");
        // if (e.target.files[0] !== null) {
        //   console.log('We have a file');
        // } else {
        //   console.log('We do not have a file');
        // }
    };

    // const handleImageRemoval = () => {
    //     setSelectedFile();
    // };


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 128,
                        height: 128,
                    },
                    padding: '16px'
                }}
            >
                
                <Paper sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',  }} onClick={handleFileUpload} elevation={2}>
                    <AddIcon sx={{ fontSize: 70 }} />
                </Paper>

            </Box>
        </>
    )
}

export default ImagesForm;