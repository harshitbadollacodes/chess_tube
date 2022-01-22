import { HomeBanner } from '../components/HomeBanner'
import { LoginForm } from '../components/LoginForm';
import { Logout } from '../components/Logout';
import { useAuthContext } from '../context/AuthContext';

export function Login() {

    const { token } = useAuthContext();

    return (
        <div className="flex flex-col lg:flex-row items-center min-h-screen">
            <div className="lg:w-1/2">
                <HomeBanner />
            </div>
 
            { token && <Logout/> }
            { !token && <LoginForm/>}

        </div>
    )
}