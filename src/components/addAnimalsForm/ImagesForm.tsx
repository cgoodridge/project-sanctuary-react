import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { storage } from '../../firebase/auth';
import Button from '@mui/material/Button';


const ImagesForm = () => {

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imageURLS, setImageURLS] = useState<any[]>([]);
    const promises: any[] = [];
    const newURLS: any[] = [];
    const [commonName, setCommonName] = useState('');
    const [loading, setLoading] = useState(false);

    const clearImageData = () => {
        setSelectedFiles([]);
    }

    const uploadImages = async () => {
        await Promise.all(
            selectedFiles.map(file => {
                promises.push(storage
                    .ref(`images/${commonName}/${file?.name}`)
                    .put(file)
                    .catch(error => alert(error.message)));
            })
        )
    }

    const getImageURLS = async () => {
        await Promise.all(promises)
            .then(result => {
                storage
                    .ref(`images/${commonName}/`)
                    .listAll()
                    .then((urls) => {
                        urls.items.forEach((image) => {
                            image.getDownloadURL()
                                .then(async (url) => {
                                    let newURL = url;
                                    // console.log("Image URL is " + url);
                                    setImageURLS((imageURLS) => [...imageURLS, newURL]);
                                    // dispatch(saveImageURLS(newURL));
                                })
                        })
                    })
                    .then(async () => {
                        setLoading(false);
                    })
            })
            .catch(error => alert("Promise rejected"))
    }

    /// Code for uploading gallery images
    const Input = styled('input')({
        display: 'none',
    });

    const handleFileUpload = (e: any) => {
        /* List of files is "array-like" not an actual array
        * So we have to convert to file to an array an add it the array 
        * by destructuring it
        */
        setSelectedFiles(selectedFiles => [...selectedFiles, ...e.target.files]);

    };

    const removeImage = (index: number) => {

        const newFileList = [...selectedFiles];
        newFileList.splice(index, 1);
        setSelectedFiles(newFileList);

    }

    return (
        <>
            <Box sx={{ width: "100%", overflowX: "scroll" }} >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {selectedFiles.length <= 0 ? <Box></Box>

                        :

                        selectedFiles.map((file, key) => (
                            <Grid item xs={4} key={key}>
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
                                    <Badge badgeContent={<IconButton onClick={() => removeImage(key)}> <CloseIcon className='iconColour' sx={{ fontSize: 32 }} ></CloseIcon> </IconButton>} >
                                        <Paper className="imgTile" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} elevation={2}>
                                            <img src={URL.createObjectURL(file)} ></img>
                                        </Paper>
                                    </Badge>
                                </Box>
                            </Grid>
                        ))
                    }

                    <Grid item xs={4}>
                        <label htmlFor="icon-button-file">
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
                                <Input multiple accept="image/*" id="icon-button-file" type="file" onChange={handleFileUpload} />
                                <Paper sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }} elevation={2}>
                                    <AddIcon className='iconColour' sx={{ fontSize: 70 }} />
                                </Paper>
                            </Box>
                        </label>
                    </Grid>

                </Grid>
            </Box>
            <Button variant="outlined" disabled={selectedFiles.length <= 0} onClick={() => clearImageData()}>Clear</Button> <Button variant="outlined" disabled={selectedFiles.length <= 0} onClick={() => uploadImages()}>Upload</Button>
        </>
    )
}

export default ImagesForm;