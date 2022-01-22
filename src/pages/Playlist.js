import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { useStateContext } from "../context/StateContext";
import axios from 'axios';
import { API } from '../config/Constants';

export function Playlist() {

    const { state: { playlists }, dispatch } = useStateContext();

    function getPlaylistById(playlistId) {
        return playlists?.filter(playlist => playlist._id === playlistId)?.[0];
    };

    async function removeHandler(playlistId, videoId, video) {
        try {
            const playlist = getPlaylistById(playlistId);

            const response = await axios.post(`${API}/playlist/${playlist._id}`, {
                videoId
            });

            if (response.status === 200) {
                dispatch({ 
                    type: "REMOVE_VIDEO_FROM_PLAYLIST", 
                    payload: {
                        playlistId: playlist._id,
                        video
                    }
                })
            }
        } catch(error) {
            console.log({ error });
        }
    };

    return (
        <div className="my-container min-h-screen" >
            <ul>
                {
                    playlists.map(playlist => (
                        <li 
                            key={playlist._id} 
                            className="min-h-15"
                        >   
                            <h1 className="font-bold text-2xl">{playlist.name}</h1>
                            <ul className="mt-4 flex flex-wrap">
                                { playlist.videos.length === 0 && <p>Looks like the playlist is empty</p> }
                                
                                { playlist.videos.length !== 0 && playlist.videos.map(video => (
                                    <li key={video._id} className="w-full cursor-pointer border-red lg:w-1/3 p-4 ">
                                        <Link to={`/video/${video._id}`}>
                                            <img className="w-full" src={video.thumbnail} alt={video.title}/>
                                            <h1 className="text-l font-bold mt-3 truncate capitalize">{video.title}</h1>
                                            <div className="flex flex-col">
                                                <p className=" line-clamp-2">{video.description}</p>
                                            </div>
                                        </Link>
                                            <div className="flex justify-between items-center mt-3">
                                                <Link to={`/video/${video._id}`}>
                                                    <div className="flex items-center">
                                                        <img src={video.channel.logo} alt={video.channel.name} className="rounded-full w-8 h-8"/>
                                                        <p className="text-s ml-3">{video.channel.name}</p>
                                                    </div>
                                                </Link>
                                                
                                                <button onClick={() => removeHandler(playlist._id, video._id, video)}>
                                                    <FaTrashAlt className="hover:text-red-500" />
                                                </button>
                                                
                                            </div>
                                    </li>
                                    )
                                )}
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
