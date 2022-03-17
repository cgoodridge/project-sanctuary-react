import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = () => {
    return (
        <div className='notFoundImage'>
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_03wqck43.json" background="transparent" speed="1" style={{ width: '600px', height: '500px' }} loop autoplay></lottie-player>
            <h3>Whoops, looks like you took a wrong turn</h3>
            <h4>Let's get you back home</h4>
            <Button size="small" variant="contained" color="primary" component={Link} to="/">Take me home</Button>
        </div>
    )
}

export default NotFound;