import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export function PrivateRoute({path, ...props}) {

    const { token } = useAuthContext();

    return token ? 
        <Route path={path} {...props} />
        :
        <Navigate replace to="/login" state={{ from: path }}/>
};