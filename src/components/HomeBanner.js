import chessBanner from "../images/chessBanner.jpeg";

// <div className="bg-banner bg-cover bg-center bg-no-repeat w-full h-96 lg:h-128"></div>

export function HomeBanner() {
    return (
        <div>
            <img src={chessBanner} className="lg:w-full lg:h-screen" alt="chess Banner"/>
        </div>
    )
}
