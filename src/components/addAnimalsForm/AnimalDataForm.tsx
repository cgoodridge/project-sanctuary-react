import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { saveData } from '../../slices/formDataSlice';

const AnimalDataForm = ({ saveAnimalData }: any) => {

    const dispatch = useDispatch();

    /// Form values
    const [kingdom, setKingdom] = useState('');
    const [phylum, setPhylum] = useState('');
    const [kingdomClass, setKingdomClass] = useState('');
    const [order, setOrder] = useState('');
    const [family, setFamily] = useState('');
    const [diet, setDiet] = useState('');
    const [genus, setGenus] = useState('');
    const [species, setSpecies] = useState('');
    const [lifespan, setLifespan] = useState('');
    const [lifestyle, setLifestyle] = useState('');
    const [nameOfYoung, setNameOfYoung] = useState('');
    const [commonName, setCommonName] = useState('');
    const [groupBehaviour, setGroupBehaviour] = useState('');
    const [source, setSource] = useState('');
    const [imageSource, setImageSource] = useState('');
    const [redListStatus, setRedListStatus] = useState('');
    const [description, setDescription] = useState('');
    const [locationName, setLocationName] = useState('');
    /// End form values


    if (saveAnimalData) {
        dispatch(saveData({
            kingdom: kingdom,
            phylum: phylum,
            kingdomClass: kingdomClass,
            order: order,
            family: family,
            genus: genus,
            species: species,
            description: description
        }))
    }

    return (
        <form id="animalInfoForm">
            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="kingdom"
                    label="Kingdom"
                    value={kingdom}
                    onChange={(e: any) => setKingdom(e.target.value)}
                    type="text"
                    variant="standard"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="phylum"
                    value={phylum}
                    onChange={(e: any) => setPhylum(e.target.value)}
                    label="Phylum"
                    type="text"
                    variant="standard"
                />
            </Box>
            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="kingdomClass"
                    label="Class"
                    value={kingdomClass}
                    onChange={(e: any) => setKingdomClass(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="order"
                    label="Order"
                    value={order}
                    onChange={(e: any) => setOrder(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>

            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="family"
                    label="Family"
                    value={family}
                    onChange={(e: any) => setFamily(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="genus"
                    label="Genus"
                    value={genus}
                    onChange={(e: any) => setGenus(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>

            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="species"
                    label="Species"
                    value={species}
                    onChange={(e: any) => setSpecies(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="commonName"
                    label="Common Name"
                    value={commonName}
                    onChange={(e: any) => setCommonName(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>

            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="diet"
                    label="Diet"
                    value={diet}
                    onChange={(e: any) => setDiet(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="lifestyle"
                    label="Lifestyle"
                    value={lifestyle}
                    onChange={(e: any) => setLifestyle(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>

            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="lifespan"
                    label="Lifespan"
                    value={lifespan}
                    onChange={(e: any) => setLifespan(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="nameOfYoung"
                    label="Name of Young"
                    value={nameOfYoung}
                    onChange={(e: any) => setNameOfYoung(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>
            <Box sx={{
                '& > :not(style)': { m: 1, width: '28ch' },
            }}>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="redListStatus"
                    label="Red List Status"
                    value={redListStatus}
                    onChange={(e: any) => setRedListStatus(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="groupBehaviour"
                    label="Group Behaviour"
                    value={groupBehaviour}
                    onChange={(e: any) => setGroupBehaviour(e.target.value)}
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
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                    type="text"
                    fullWidth
                    multiline
                    variant="standard"
                />
            </Box>
            <Box sx={{
                '& > :not(style)': { m: 1, width: '60ch' },
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="source"
                    label="Information Source"
                    required
                    value={source}
                    onChange={(e: any) => setSource(e.target.value)}
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
                    id="imgSrc"
                    label="Image Source"
                    required
                    value={imageSource}
                    onChange={(e: any) => setImageSource(e.target.value)}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Box>

        </form>
    )
}

export default AnimalDataForm;