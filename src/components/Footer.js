import { FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Footer() {
  return ( 
        <div className="bg-white p-4 absolute bottom-0 w-full dark:bg-black dark:text-white">
            <div className="my-container flex justify-between">
                <h1>Design inspired from <span>
                        <Link to="https://github.com/desaihetav" className="text-blue-900">
                            Hetav Desai
                        </Link>
                    </span>
                </h1>
                <div className="flex">
                    <a href="https://twitter.com/harshit_badolla" target="_blank"  rel="noreferrer">
                        <FaTwitter size={20} className="hover:text-blue-400"/>
                    </a>
                    <a className="ml-2 " href="https://github.com/harshitbadollacodes" target="_blank" rel="noreferrer">
                        <FaGithub size={20} className="hover:text-blue-400"/>
                    </a>
                </div>
            </div>
        </div>
    )
}

