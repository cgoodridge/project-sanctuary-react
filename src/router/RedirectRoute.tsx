import { Navigate } from "react-router-dom";
// import { useStateValue } from '../StateProvider';
import { selectUser } from '../slices/userSlice';
import { useSession } from "../firebase/UserProvider";
import { useSelector } from 'react-redux';

const RedirectRoute = ({ children }: any) => {
    const user = useSession();
    console.log(user);
    return !user ? children : <Navigate to="/" />
    // return <Navigate to="/" />
}

export default RedirectRoute;