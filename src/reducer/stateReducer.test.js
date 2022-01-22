import { stateReducer } from "./stateReducer";

describe("testing state redcer", () => {
    it("should add videos to playlist", () => {
        
        const initialState = {
            videos: [],
            playlists: [
                {_id: "61ebe870e2edd6b6bd606846", videos: []},
            ]
        }

        const payload = {
            playlistId: "61ebe870e2edd6b6bd606846",
            video: {
                url: "https://www.youtube.com/embed/YeB-1F-UKO0",
                __v: 0,
                _id: "61497ff6780c902a0885050d"
            }
        };

        

        const action = {
            type: "TOGGLE_PLAYLIST",
            payload 
        };

        let state = stateReducer(initialState, action);

        expect(state).toEqual({
            videos: [],
            playlists: [
                {
                    _id: "61ebe870e2edd6b6bd606846",
                    videos: [
                        {   
                            url: "https://www.youtube.com/embed/YeB-1F-UKO0",
                            __v: 0,
                            _id: "61497ff6780c902a0885050d"
                        }
                    ]
                },
            ]
        })
    });
});