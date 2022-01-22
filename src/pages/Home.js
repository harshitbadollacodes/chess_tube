import { Videos } from "../components/Videos";
import chessBanner from "../images/chessBanner.jpeg";

export function Home() {
    return (
        <>
            <div>
                <img src={chessBanner} className="lg:w-full lg:h-128" alt="chess Banner"/>
            </div>

            <div className="my-container">
                <h1 className="font-bold mt-5 mb-5 text-3xl">
                    All Videos
                </h1>

                <Videos/>
            </div>
        </>
    )
}


