import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import chess from "../images/chess.png"
import chess_light from "../images/chess_light.png"

export function Navbar() {
    const [display, setDisplay] = useState(false);
    const [theme, setTheme] = useState("dark");

    function menuHandler() {
        setDisplay(!display);
    }

    function themeSwitchHandler() {
        setDisplay(false);
        const storedTheme = document.documentElement.getAttribute("class");
        if(storedTheme === "light") {
            document.documentElement.setAttribute("class", "dark");
            setTheme("dark");
        }  else {
            document.documentElement.setAttribute("class", "light");
            setTheme("light");
        }
    }

    return (
        <>  
            <div className="bg-white sticky top-0 w-full z-50 dark:bg-black">
                <div>
                    <GiHamburgerMenu 
                        onClick={() => menuHandler()} 
                        className="absolute right-6 top-4 text-3xl ml-auto md:hidden"
                    />
                </div>

                <div className="my-container p-4 flex flex-col justify-between items-center md:flex-row">
                    <Link to="/">
                        <div  className="flex">
                            <img src={ theme === "dark" ? chess_light : chess } alt="chess tube logo" className="w-8"/>
                            <h1 className="ml-2 text-2xl font-bold uppercase">Chess Tube</h1>
                        </div>
                    </Link>
                
                    <nav className={`transition-all flex flex-col w-full md:w-auto items-center ${display ? "block" : "hidden"} md:flex-row md:block`} >
                        <Link 
                            to="/"
                            className="nav-links" 
                            onClick={() => setDisplay(false)} 
                        >
                            Home
                        </Link>

                        <Link 
                            to="/playlist"
                            className="nav-links" 
                            onClick={() => setDisplay(false)}
                        >
                            Playlists
                        </Link>

                        <Link 
                            to="/login"
                            className="nav-links" 
                            onClick={() => setDisplay(false)} 
                        >
                            Account
                        </Link>

                        <button 
                            className="nav-links"
                            onClick={themeSwitchHandler}
                        >
                            { theme === "light" ? <FaRegMoon/> : <FiSun/> }
                        </button>

                    </nav>
                </div>
            </div>
        </>
    )
}