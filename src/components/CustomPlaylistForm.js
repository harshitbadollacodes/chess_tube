import axios from 'axios';
import { useState } from "react";
import { API } from '../config/Constants';
import { AiFillRightCircle } from  "react-icons/ai";
import { useStateContext } from '../context/StateContext';

export function CustomPlaylistForm({videoId, getPlaylistByName}) {

    const [playlistName, setPlaylistName] = useState("");

    const { dispatch } = useStateContext();

    async function customPlaylistForm(e) {
        e.preventDefault();
        setPlaylistName("");

        const playlistAlreadyExists = getPlaylistByName(playlistName);

        if (!playlistAlreadyExists) {
            try {
                const {status, data: { playlists } } = await axios.post(`${API}/playlist/new`, {
                    name: playlistName,
                    videoId
                });

                let payload = {
                    name: playlistName,
                    playlists
                }

                if (status === 200) {
                    dispatch({ 
                        type: "CREATE_PLAYLIST", 
                        payload: {
                            name:playlistName, 
                            playlists
                        } 
                    });
                }

            } catch(error) {
                console.log({ error })
            }
        }
    }

    return (
        <form className="flex items-center mt-2" onSubmit={(e) => customPlaylistForm(e)}>
            <input 
                type="text"
                required
                className="text-black p-1"
                placeholder="Enter playlist name"
                value={ playlistName }
                onChange = { (e) => setPlaylistName(() => e.target.value) }
            />

            <button type="submit" className="ml-2" >
                <AiFillRightCircle size={25}/>
            </button>

        </form>
    )
}