import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';

const AnimalDataForm = ({ storeFormData }:any) => {

    const [kingdom, setKingdom] = useState('');
    const [phylum, setPhylum] = useState('');
    const [kingdomClass, setKingdomClass] = useState('');
    const [order, setOrder] = useState('');
    const [family, setFamily] = useState('');
    const [genus, setGenus] = useState('');
    const [species, setSpecies] = useState('');
    const [commonName, setCommonName] = useState('');
    const [description, setDescription] = useState('');
    if (storeFormData) {
        
    }

    return (
        <form>
            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="kingdom"
                    label="Kingdom"
                    value={kingdom}
                    onChange={e => setKingdom(e.target.value)}
                    type="text"
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="phylum"
                    value={phylum}
                    onChange={e => setPhylum(e.target.value)}
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
                    value={kingdomClass}
                    onChange={e => setKingdomClass(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="order"
                    label="Order"
                    value={order}
                    onChange={e => setOrder(e.target.value)}
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
                    value={family}
                    onChange={e => setFamily(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="genus"
                    label="Genus"
                    value={genus}
                    onChange={e => setGenus(e.target.value)}
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
                    value={species}
                    onChange={e => setGenus(e.target.value)}
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

        </form>
    )
}

export default AnimalDataForm;