import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Videos } from "./pages/Videos";
import { Playlists } from "./pages/Playlists";
import { Contact } from "./pages/Contact";
import { Details } from "./pages/Details";
import { Admin } from "./pages/Admin";
import { Upload } from "./pages/Upload";
import { PlayListVideos } from "./pages/Playlistvideos";
import { CreatePlaylist } from "./pages/CreatePlaylis";
import { SelectEditVideo } from "./pages/SelectEditVideo";
import { EditVideo } from "./pages/EditVideo";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/footer";
import { useEffect, useState } from "react";
import './Nprogress.css'; // Import the nprogress CSS
import LoadingBar from 'react-top-loading-bar';



const App = () => {
  const [progress, setProgress] = useState(0)
  return (
    <BrowserRouter>
      <Navbar />
      <LoadingBar
        color='#6FF7DA'
        className="mnprogress"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>

        <Route path="/" element={<Home setProgress = {setProgress} />} />
        <Route path="/videos" element={<Videos setProgress = {setProgress}/>} />
        <Route path="/playlists/allplaylists" element={<Playlists setProgress = {setProgress}/>} />
        <Route path="/contact" element={<Contact setProgress = {setProgress}/>} />
        <Route path="/details" element={<Details setProgress = {setProgress}/>} />
        <Route path="/admin" element={<Admin setProgress = {setProgress}/>} />
        <Route path="/admin/upload" element={<Upload setProgress = {setProgress}/>} />
        <Route path="/playlists/selectdplatlist" element={<PlayListVideos setProgress = {setProgress}/>} />
        <Route path="/admin/createplaylist" element={<CreatePlaylist setProgress = {setProgress}/>} />
        <Route path="/admin/selecteditvideo" element={<SelectEditVideo setProgress = {setProgress}/>} />
        <Route path="/admin/editvideo/:videoid" element={<EditVideo setProgress = {setProgress}/>} />
        <Route path="/undefined" element={<NotFoundPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};



export default App;
