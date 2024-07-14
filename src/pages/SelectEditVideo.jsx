import { useEffect, useState } from "react";
import "./SelectEditVideo.css";
import addItems from './script1';
import { Navigate, useNavigate } from "react-router-dom";

export const SelectEditVideo = ({setProgress}) => {

    const navigate = useNavigate();

    const [elements, setElements] = useState([<option value="NAP" className="videooptions">Select A Playlist First</option>]);
    const [playlists, setPlaylists] = useState([<option value="NAP" className="playoptions">Wait Playlists are being fetched</option>]);
    const fetchDataAndCreateElements = async (playname) => {
        const data = await addItems();
        const keys = Object.keys(data);
        const length = keys.length;
        const newElements = [];

        for (let i = length - 1; i >= 0; i--) {
            var videoid = "video" + i;
            if(data[videoid].playlist == playname){

                newElements.push(
    
                    <option value={videoid} className="videooptions" key={i}>{data[videoid].title}</option>
                );
            }
        }

        setElements(newElements);
    };

    
    useEffect(() => {

        
        const fetchData = async () => {
            
            const response = await fetch(`https://server-api-jade.vercel.app/admin/read/playlists`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            
            const result = await response.json();
            
            const playdata = await result.msg;
            
            const keys = Object.keys(playdata);
            const length = keys.length;
            const playLists = [];
            
            for (let i = length - 1; i >= 0; i--) {
                var pid = "playlist" + i;
                
                playLists.push(
                    <option value={playdata[pid].pcode} className="playoptions" key={i}>{playdata[pid].pname}</option>
                );
            }
            setPlaylists(playLists);
        }
        fetchData();
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);

    }, []);

    const handlePlayChange = async (e) => {
        e.preventDefault();
        var val = e.target.value;
        
        fetchDataAndCreateElements(val);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const val = document.getElementById("svideo").value;
        
        navigate(`/admin/editvideo/${val}`);
        
    }



    return (
        <main id="sevmain">
            <h1 id="headingnew">
                Select A video to Edit
            </h1>
            <form id="selectvideoform" onSubmit={handleSubmit}>
                <label htmlFor="splay">Select A Playlist :</label>
                <select name="splay" id="splay" onChange={handlePlayChange}>
                    {playlists}
                </select>
                <label htmlFor="svideo">Select the Video :</label>
                <select name="svideo" id="svideo">
                    {elements}
                </select>
                <input type="submit" value="Edit Video" />
            </form>
        </main>
    )
}