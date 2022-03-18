import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { API } from "../config/Constants";
import { useAuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { setupAuthHeaderForServiceCalls } from '../UtilityFunctions/UtilityFunctions';

export function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { state } = useLocation();
    const { setIsUserLoggedIn, setToken, setUserId } = useAuthContext();

    const navigate = useNavigate();

    function guestLoginHandler() {
        setEmail("guest@gmail.com");
        setPassword("testing");
    };

    async function loginFormHandler(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const {data: {userId, token}, status} = await axios.post(`${API}/user/login`, {
                email,
                password
            });

            let userComingFrom = state?.from ? state.from : "/";

            setupAuthHeaderForServiceCalls(token);

            if (status === 200) {
                setIsUserLoggedIn(true);
                localStorage.setItem("userId", JSON.stringify(userId));
                localStorage.setItem("token", JSON.stringify(token));
                setToken(token);
                setUserId(userId);
                
                navigate(userComingFrom);
            }
        } catch(error) {
            console.log({error});
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let hideError = setTimeout(() => {
            setError(null);
        }, 3000);

        return () => {
            clearTimeout(hideError);
        };
    }, [error]);

    return (
        <div className="lg:w-1/2 p-16 lg:p-32">
            <div className="pb-4">
                <h1 className="font-bold text-4xl lg:text-6xl mb-4">Login</h1>
                {error && <h3 className="font-bold text-red-500">{error}</h3>}
                <form onSubmit={loginFormHandler}>
                    <input 
                        type="text" 
                        value={email}
                        required
                        className="w-full text-xl p-2.5 border-2 mb-5 border-gray-900 text-black" 
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input 
                        type="password" 
                        value={password}
                        required
                        className="w-full text-xl p-2.5 border-2 border-gray-900 text-black" 
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    <input 
                        type="submit"
                        value={loading ? "Logging in..." : "Login"}
                        className="cursor-pointer text-white text-xl w-full p-3 mt-5 bg-black"
                    />

                    <button 
                        onClick={() => guestLoginHandler()}
                        className="cursor-pointer text-white text-xl w-full p-3 mt-5 bg-black"
                    >
                        Guest Credentials
                    </button>

                </form>                

                <p 
                    className="text-center mt-4"
                >
                    Don't have an account? 
                    <Link 
                        to="/signup" 
                        className="text-blue-500 hover:text-blue-800"
                    >
                        Sign up Here
                    </Link>
                </p>
            </div>
        </div> 
    )
}
