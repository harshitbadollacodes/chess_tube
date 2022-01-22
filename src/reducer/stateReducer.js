export const initialState = {
    videos: [],
    playlists: []
};

function findPlaylistById (state, playlistId) {
    return state.playlists.find(playlist => playlist._id === playlistId);
};

function findPlaylistByName (state, playlistName) {
    return state.playlists.find(playlist => playlist.name === playlistName);
};

function addVideoInPlaylist(state, playlistId, videoToBeAdded) {
    return {
        ...state, 
        playlists: state.playlists.map(playlist => {
            return playlist._id === playlistId ? 
                {...playlist, videos: [...playlist.videos, videoToBeAdded]} 
            :
                playlist
        })
    };
};

function removeVideoFromPlaylist(state, playlistId, videoToBeRemoved) {
    return {
        ...state, 
        playlists: state.playlists.map(playlist => {
            return playlist._id === playlistId ? 
                {...playlist, videos: playlist.videos.filter(video => video._id !== videoToBeRemoved._id )}
                :
                playlist
        })
    }
}

export function stateReducer(state, action) {
    switch (action.type) {
        case "INITIAL_VIDEOS":
            return { ...state, videos: action.payload };

        case "INITIAL_PLAYLISTS":
            return { ...state, playlists: action.payload };

        case "CREATE_PLAYLIST":
            const playlistExists = findPlaylistByName(state, action.payload.name);

            return playlistExists ? 
                state  
                : 
                {
                    ...state, 
                    playlists: action.payload.playlists
                }

        case "TOGGLE_PLAYLIST":
            const playlist = findPlaylistById(state, action.payload.playlistId);

            const videoInPlaylist = playlist.videos.find(video => video._id === action.payload.video._id);

            return videoInPlaylist ? 
            removeVideoFromPlaylist(state, action.payload.playlistId, action.payload.video)
            : 
            addVideoInPlaylist(state, action.payload.playlistId, action.payload.video);
        

        case "REMOVE_VIDEO_FROM_PLAYLIST": 
            return removeVideoFromPlaylist(state, action.payload.playlistId, action.payload.video);

        case "CLEAR_SESSION":
            return { ...state, playlists: [] };
        
        default:    
            return state;
    }
};