import { Box } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { selectForm, selectImages, selectLocations } from '../../slices/formDataSlice';
import { storage, database } from '../../firebase/auth';

const ConfirmationForm = () => {

  const [loading, setLoading] = useState(false);

  const animal = useSelector(selectForm);
  const locations = useSelector(selectLocations);
  const images = useSelector(selectImages);
  console.log(animal);
  console.log("locations are " + locations);

  /// Form values
  const [kingdom, setKingdom] = useState('');
  const [phylum, setPhylum] = useState('');
  const [kingdomClass, setKingdomClass] = useState('');
  const [order, setOrder] = useState('');
  const [family, setFamily] = useState('');
  const [genus, setGenus] = useState('');
  const [species, setSpecies] = useState('');
  const [commonName, setCommonName] = useState('');
  const [description, setDescription] = useState('');
  /// End form values


  

  return (
    <Box>
      <Box sx={{
        '& > :not(style)': { m: 1, width: '28ch' },
      }}>
        <TextField
          required
          autoFocus
          disabled

          margin="dense"
          id="kingdom"
          label="Kingdom"
          value={animal.kingdom}
          onChange={e => setKingdom(e.target.value)}
          type="text"
          variant="standard"
        />
        <TextField
          required
          disabled
          margin="dense"
          id="phylum"
          value={animal.phylum}
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
          required
          disabled

          margin="dense"
          id="kingdomClass"
          label="Class"
          value={animal.kingdomClass}
          onChange={e => setKingdomClass(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          disabled

          margin="dense"
          id="order"
          label="Order"
          value={animal.order}
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
          required
          disabled

          margin="dense"
          id="family"
          label="Family"
          value={animal.family}
          onChange={e => setFamily(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          disabled

          margin="dense"
          id="genus"
          label="Genus"
          value={animal.genus}
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
          required
          disabled

          margin="dense"
          id="species"
          label="Species"
          value={animal.species}
          onChange={e => setSpecies(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          disabled

          margin="dense"
          id="commonName"
          label="Common Name"
          value={animal.commonName}
          onChange={e => setCommonName(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
      </Box>

      <Box sx={{
        '& > :not(style)': { m: 1, width: '60ch' },
      }}>
        <TextField
          disabled

          margin="dense"
          id="description"
          label="Description"
          value={animal.description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          fullWidth
          multiline
          variant="standard"
        />
      </Box>
    </Box>
  )
}

export default ConfirmationForm;