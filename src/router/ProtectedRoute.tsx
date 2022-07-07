import { Navigate } from "react-router-dom";
// import { useStateValue } from '../StateProvider';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import { useSession } from "../firebase/UserProvider";


const ProtectedRoute = ({ children }: any) => {
    const user = useSession();
    console.log(user);
    return user ? children : <Navigate to="/login" />
    // return <Navigate to="/login" />
}

export default ProtectedRoute;