import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { saveData, selectForm } from '../../slices/formDataSlice';
import Button from '@mui/material/Button';

const AnimalDataForm = () => {

    const dispatch = useDispatch();
    const animal = useSelector(selectForm);

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

    const [formFillState, setFormFillState] = useState(true);
    /// End form values

    const saveAnimalData = () => {


        if (kingdom === '' || phylum === '' || kingdomClass === '' || order === '' || family === '' || genus === '' || species === '' || description === '' || commonName === '') {

            alert("One or more fields, must be filled");
            return;

        } else {

            dispatch(saveData({
                commonName: commonName,
                kingdom: kingdom,
                phylum: phylum,
                diet: diet,
                lifespan: lifespan,
                lifestyle: lifestyle,
                nameOfYoung: nameOfYoung,
                redListStatus: redListStatus,
                groupBehaviour: groupBehaviour,
                source: source,
                imageSource: imageSource,
                kingdomClass: kingdomClass,
                order: order,
                family: family,
                genus: genus,
                species: species,
                description: description,
            }))
            setFormFillState(true);

        }

    }

    const clearAnimalData = () => {

        setFormFillState(false);

        dispatch(saveData({
            commonName: '',
            kingdom: '',
            phylum: '',
            diet: '',
            lifespan: '',
            lifestyle: '',
            nameOfYoung: '',
            redListStatus: '',
            groupBehaviour: '',
            source: '',
            imageSource: '',
            kingdomClass: '',
            order: '',
            family: '',
            genus: '',
            species: '',
            description: '',
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
                    disabled={formFillState}
                    margin="dense"
                    id="kingdom"
                    label="Kingdom"
                    value={animal.kingdom !== '' ? animal.kingdom : kingdom}
                    onChange={(e: any) => setKingdom(e.target.value)}
                    type="text"
                    variant="standard"
                />
                <TextField
                    required
                    autoFocus
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
                    disabled={formFillState}
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
            {formFillState ? <Button variant="outlined" onClick={() => clearAnimalData()}>Clear</Button> : <Button variant="outlined" onClick={() => saveAnimalData()}>Save</Button>}
        </form>
    )
}

export default AnimalDataForm;