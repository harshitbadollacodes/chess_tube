import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import { VideoDetails } from "./pages/VideoDetails";
import { Login } from "./pages/Login";
import { Playlist } from "./pages/Playlist";
import { PrivateRoute } from './UtilityFunctions/PrivateRoute';
import { Signup } from './pages/Signup';

function App() {
  
  return (
    <div className="bg-l-blue dark:bg-d-gray dark:text-white relative">
      <Navbar />    

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/video/:videoId" element={ <VideoDetails/> }/>
        <PrivateRoute path="/playlist" element={ <Playlist/> } />
      </Routes>

      <Footer/>

    </div>
  );
}

export default App;
