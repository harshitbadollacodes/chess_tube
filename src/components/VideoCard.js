import { Link } from 'react-router-dom';

export function VideoCard({videos, remove}) {

    return (
        videos.map(video => (
            <li key={video._id} className="w-full cursor-pointer border-red lg:w-1/3 p-4">
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
                    </div>
            </li>
            )
        )
    )
};