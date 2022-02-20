import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosPeople, IoIosEye } from "react-icons/io";
import { IoTimerOutline, IoTimerSharp } from "react-icons/io5";
import { AiOutlineCloseCircle, AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { API } from "../config/Constants";
import { useNavigate, useParams } from 'react-router';
import { useStateContext } from '../context/StateContext';
import { useAuthContext } from '../context/AuthContext';
import { CustomPlaylistForm } from '../components/CustomPlaylistForm';

export function VideoDetails() {

    const { videoId } = useParams();
    const { state: { playlists },  dispatch } = useStateContext();

    const [video, setVideo] = useState();
    const [modal, setModal] = useState(false);
    
    
    const { token } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const {status, data:{ video } } = await axios.get(`${API}/videos/${videoId}`);
                
                if (status === 200) {
                    setVideo(video);
                }

            } catch (error) {   
                console.log({error});
            }
        })();
    }, [videoId]);

    function getPlaylistById(playlistId) {
        return playlists?.filter(playlist => playlist._id === playlistId)?.[0];
    };

    function getPlaylistByName(playlistName) {
        return playlists?.filter(playlist => playlist.name === playlistName)?.[0];
    };

    function isVideoInPlaylistById(playlistId) {
        const playlist = getPlaylistById(playlistId);
        return playlist?.videos.find(video => video._id === videoId);
    }

    function isVideoInPlaylistByName(playlistName) {
        const playlist = getPlaylistByName(playlistName);
        return playlist?.videos.find(video => video._id === videoId);
    }

    async function togglePlaylist(playlistName) {
        try {
            const playlist = getPlaylistByName(playlistName);
            
            const response = await axios.post(`${API}/playlist/${playlist._id}`, {
                videoId
            });

            if (response.status === 200) {
                dispatch({ 
                    type: "TOGGLE_PLAYLIST", 
                    payload: {
                        playlistId: playlist._id,
                        video
                    }
                })
            }

        } catch(error) {
            console.log({error});
        }
    }

    function customPlaylist() {
        setModal(!modal);
    }

    function Modal() {
        return (
                <div className="w-screen h-screen bg-none z-50 absolute">
                    <div className="w-max border-white relative left-8 md:top-1/4 md:left-1/2 md:-mx-24 border-2  rounded-md bg-d-gray text-white p-8">
                        <h1 className="mb-4 border-b-2 border-white">Save to...</h1>
                        <AiOutlineCloseCircle 
                            size={40} 
                            onClick={() => setModal(false)} 
                            className="cursor-pointer absolute right-1 top-1 z-50"
                        />
                        {
                            playlists && playlists.map((playlist) => {
                                return (
                                    <div key={playlist._id}>
                                        <label className="text-l">
                                            <input
                                                className="mr-2"
                                                type="checkbox"
                                                checked={isVideoInPlaylistById(playlist._id)}
                                                onChange={() => togglePlaylist(playlist.name)}
                                            />
                                            {playlist.name}
                                        </label>
                                    </div>
                                )
                            })
                        }

                        <CustomPlaylistForm 
                            videoId={videoId} 
                            getPlaylistByName={getPlaylistByName}
                        />

                    </div>
                </div>
        )
    }

    return (
        <div className={`p-4 min-h-screen`}>
            { modal && <Modal /> }
            { video && 
                <div className="lg:ml-auto lg:mr-auto lg:w-2/3 dark:text-white h-full mb-12">
                    <iframe 
                        className="w-full h-52 md:h-128 z-0 md:mt-4"
                        src={video.url} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowFullScreen
                    >
                    </iframe>

                    <div className="my-container">
                        <p className="text-2xl font-bold mt-3 capitalize">{video.title}</p>

                        <div className="flex flex-col lg:flex-row justify-between">
                            <div className="flex items-center mt-3">
                                <img 
                                    src={video.channel.logo} 
                                    alt={video.channel.name} 
                                    className="rounded-full w-8 h-8"
                                />
                                <p 
                                    className="text-xl font-bold ml-3"
                                >
                                    {video.channel.name}
                                </p>
                            </div>
                            
                            <div className="flex font-medium mt-2">
                                <div className="flex items-center">
                                    <IoIosPeople size={25} />
                                    <p className="ml-2">{video.statistics.subscribers} Subscribers</p>
                                </div>
                                <div className="flex items-center ml-4">
                                    <IoIosEye size={25} />
                                    <p className="ml-2">{video.statistics.views} Views</p>
                                </div>
                            </div>

                            <div className="flex font-medium mt-2">
                                    <button onClick={() => token ? togglePlaylist("Liked Videos") : navigate("/login") } >
                                        { 
                                            isVideoInPlaylistByName("Liked Videos") ? 
                                            <AiTwotoneLike size={25} /> : 
                                            <AiOutlineLike size={25} /> 
                                        }
                                    </button>

                                    <button 
                                        onClick={() => token ? togglePlaylist("Watch Later Videos") : navigate("/login")} 
                                    >
                                        { 
                                            isVideoInPlaylistByName("Watch Later Videos") ? 
                                            <IoTimerSharp size={25} /> : 
                                            <IoTimerOutline size={25} /> 
                                        }
                                    </button>

                                    <button onClick={() => customPlaylist()} >
                                        <BsBookmarkPlus
                                            size={25}
                                            className="cursor-pointer"
                                            onClick={ () => token 
                                                ? customPlaylist() : 
                                                navigate("/login")
                                            }
                                        />
                                    </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col">
                            <h1 className="font-bold text-xl mt-3">Description</h1>
                            <p className="text-l ">{video.description}</p>
                        </div>
                        
                    </div>
                </div>
            }
        </div>
    )
}