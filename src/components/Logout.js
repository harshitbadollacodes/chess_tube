import { useAuthContext } from '../context/AuthContext';
import { useStateContext } from '../context/StateContext';

export function Logout() {

    const { username, logout } = useAuthContext();

    function capitalise(str) {
        const lower = str.toLowerCase();
        return `${str.charAt(0).toUpperCase()}${lower.slice(1)}`;
    }

    let name = capitalise(username);

    const { dispatch } = useStateContext();

    function logoutHandler() {
        logout();
        dispatch({type: "CLEAR_SESSION"});
    }

    return (       
        <div className="mt-5 lg:p-5 w-1/2">
            <h1 className="font-bold text-2xl">
                Hello {name}, You are logged in. 
            </h1>
            <p>Want to logout ?</p>
            <button 
                className="bg-black text-white p-2 mt-4" 
                onClick={logoutHandler}
            >
                Logout
            </button>
        </div>
    )
}