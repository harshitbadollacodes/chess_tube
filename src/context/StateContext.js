import axios from "axios";
import { API } from "../config/Constants";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuthContext } from "./AuthContext";
import { initialState, stateReducer } from "../reducer/stateReducer";
import { setupAuthHeaderForServiceCalls } from "../UtilityFunctions/UtilityFunctions";

export const StateContext = createContext();

export function StateProvider ({children}) {

    const { userId, token } = useAuthContext();
    
    const [state, dispatch] = useReducer(stateReducer, initialState);

    useEffect(() => {
        (async () => {
            const { status, data } = await axios.get(`${API}/videos`);

            if (status === 200) {
                dispatch({
                    type: "INITIAL_VIDEOS",
                    payload: data
                });
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                if (token) {
                    setupAuthHeaderForServiceCalls(token);
            
                    const { status, data: { playlist } } = await axios.get(`${API}/playlist/`);

                    if (status === 200) {
                        dispatch({
                            type: "INITIAL_PLAYLISTS",
                            payload: playlist
                        });
                    };
                }
            } catch(error) {
                console.log({ error });
            }
        })();
    }, [token, userId]);
    
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    )
};

export function useStateContext() {
    return useContext(StateContext);
};