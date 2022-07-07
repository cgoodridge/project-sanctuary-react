import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { selectForm } from '../../slices/formDataSlice';
import { selectLocations } from '../../slices/locationDataSlice';
import { storage, database } from '../../firebase/auth';
import { selectImages } from '../../slices/imageDataSlice';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ConfirmationForm = () => {

  const [loading, setLoading] = useState(false);

  const animal = useSelector(selectForm);
  const locations = useSelector(selectLocations);
  console.log(locations);
  const [imageURLS, setImageURLS] = useState<any[]>([]);

  const promises: any[] = [];

  // console.log(locations);
  const images = useSelector(selectImages);

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

  useEffect(() => {
    getImageURLS();
  }, [])

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
      {/* Accordion for animal Info */}
      <Accordion className="tileColour">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="iconColour" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Animal Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
              onChange={(e: any) => setKingdom(e.target.value)}
              type="text"
              variant="standard"
            />
            <TextField
              required
              disabled
              margin="dense"
              id="phylum"
              value={animal.phylum}
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
              disabled

              margin="dense"
              id="kingdomClass"
              label="Class"
              value={animal.kingdomClass}
              onChange={(e: any) => setKingdomClass(e.target.value)}
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
              disabled

              margin="dense"
              id="family"
              label="Family"
              value={animal.family}
              onChange={(e: any) => setFamily(e.target.value)}
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
              disabled

              margin="dense"
              id="species"
              label="Species"
              value={animal.species}
              onChange={(e: any) => setSpecies(e.target.value)}
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
              onChange={(e: any) => setCommonName(e.target.value)}
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
              onChange={(e: any) => setDescription(e.target.value)}
              type="text"
              fullWidth
              multiline
              variant="standard"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* Accordion for Saved Images */}
      <Accordion className="tileColour">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="iconColour" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Saved Images</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {imageURLS.length > 0 ?
            imageURLS.map((image, key) => {
              <img src={image} height="100px" alt="Thumbnail image of animal"></img>
            })

            :

            <p>No Images Uploaded</p>
          }

        </AccordionDetails>
      </Accordion>

      {/* Accordion for Saved Locations */}
      <Accordion className="tileColour">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="iconColour" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Saved Locations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {locations.length > 0 ?
            locations.map((location: any, key: number) => {
              <p key={key}>location</p>
            })

            :

            <p>No Locations Added</p>
          }
        
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default ConfirmationForm;