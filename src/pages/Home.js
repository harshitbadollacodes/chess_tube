import { Videos } from "../components/Videos";
import "../"
import chessBanner from "../images/chessBanner.jpeg";

export function Home() {
    // <img src={chessBanner} className="lg:w-full lg:h-144" alt="chess Banner"/>
    return (
        <>
            <div className="banner-img"></div>

            <div className="my-container">
                <h1 className="font-bold mt-5 mb-5 text-3xl">
                    All Videos
                </h1>

                <Videos/>
            </div>
        </>
    )
}


