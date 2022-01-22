import { useStateContext } from '../context/StateContext';
import { VideoCard } from './VideoCard';

export function Videos() {

    const { state: { videos } } = useStateContext();

    return (
        <>  
            <div className="pb-12 min-h-screen">
                <ul className="flex flex-wrap">
                    { videos.length > 0 && <VideoCard videos={videos} /> }
                </ul>
            </div>
        </>
    )
}