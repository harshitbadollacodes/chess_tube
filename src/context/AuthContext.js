import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { API } from "../config/Constants";
import { setupAuthHeaderForServiceCalls } from "../UtilityFunctions/UtilityFunctions";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const savedToken = JSON.parse(localStorage.getItem("token")) || null;
    const savedUserId = JSON.parse(localStorage.getItem("userId")) || null;

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [token, setToken] = useState(savedToken);
    const [userId, setUserId] = useState(savedUserId);
    const [username, setUsername] = useState("");

    axios.interceptors.response.use(
        (response) => response,
          (error) => {
              if (error?.response?.status === 401) {
              logout();
          }
              return Promise.reject(error);
          }
      );

    function logout() {
        setIsUserLoggedIn(false);
        setToken(null);
        setUserId(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
    } 

    useEffect(() => {
        (async () => {
            try {
                setupAuthHeaderForServiceCalls(token);
                if (token) {
                    const { status, data: { username } } = await axios.get(`${API}/userData`);
                    
                    if (status === 200) {
                        setUsername(username);
                    }
                }
            } catch(error) {
                console.log({ error })
            }
        })();
    }, [token, setUsername]);

    return (
        <AuthContext.Provider value={{ 
                isUserLoggedIn, 
                setIsUserLoggedIn, 
                token, 
                setToken, 
                userId, 
                setUserId, 
                username, 
                setUsername,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export function useAuthContext () {
    return useContext(AuthContext)
}
