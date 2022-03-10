import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const AnimalDataForm = () => {
    return (
        <>
            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="kingdom"
                    label="Kingdom"
                    type="text"

                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="phylum"
                    label="Phylum"
                    type="text"
                    variant="standard"
                />
            </Box>
            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="kingdomClass"
                    label="Class"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="order"
                    label="Order"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>

            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="family"
                    label="Family"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="genus"
                    label="Genus"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>

            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="species"
                    label="Species"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="commonName"
                    label="Common Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>

            <Box sx={{
                '& > :not(style)': { m: 1, width: '60ch' },
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    variant="standard"
                />
            </Box>

        </>
    )
}

export default AnimalDataForm;