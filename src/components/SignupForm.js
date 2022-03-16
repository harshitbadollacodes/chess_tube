import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API } from "../config/Constants";
import { useAuthContext } from "../context/AuthContext";

export function SignupForm() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState(null);

    const { setIsUserLoggedIn, setToken, setUserId } = useAuthContext();

    const { state } = useLocation();
    const navigate = useNavigate();


    async function signupFormHandler(e) {
        e.preventDefault();
        setLoading(true);
        try {
            if (firstName.length && lastName.length && email.length && password.length && (password === confirmPassword)) {
                const { data: { token, userId }, status } = await axios.post(`${API}/user/signup`, {
                    firstName,
                    lastName,
                    email,
                    password
                });

                const userComingFrom = state?.from ? state.from : "/";

                if (status === 200) {
                    localStorage.setItem("token", JSON.stringify(token));
                    localStorage.setItem("userId", JSON.stringify(userId));
                    setIsUserLoggedIn(true);
                    setToken(token);
                    setUserId(userId);

                    navigate(userComingFrom);
                }
            } else {
                setError("Password and Confirm Password are not matching");
            }
        } catch(error) {
            console.log({error});
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="lg:w-1/2 p-16 lg:p-32">
            <div className="pb-4">
                <h1 className="font-bold text-4xl lg:text-6xl mb-4">Signup</h1>
                {error && <h3 className="font-bold text-red-500">{error}</h3>}
                <form onSubmit={signupFormHandler}>
                    <input 
                        type="text" 
                        required
                        className="w-full text-xl p-2.5 border-2 mb-5 border-gray-900 text-black" 
                        placeholder="Enter First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input 
                        type="text" 
                        required
                        className="w-full text-xl p-2.5 border-2 mb-5 border-gray-900 text-black" 
                        placeholder="Enter Last Name"
                        onChange={(e) => setLastName(e.target.value)} 
                    />

                    <input 
                        type="email" 
                        required
                        className="w-full text-xl p-2.5 border-2 mb-5 border-gray-900 text-black" 
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        required
                        className="w-full text-xl p-2.5 border-2 mb-5 border-gray-900 text-black" 
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    <input 
                        type="password" 
                        required
                        className="w-full text-xl p-2.5 border-2 border-gray-900 text-black"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />

                    <input
                        type="submit" 
                        value={loading ? "Signing up..." : "Sign Up"}
                        className="text-white text-xl w-full p-3 mt-5 bg-black"
                    />
                        
                    
                </form>
                <p className="mt-4 text-l text-center">
                    Have an account? 
                    <Link 
                        to="/login"
                        className="text-blue-500"
                    >
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    )
}
