
import { NavLink } from "react-router-dom";
import "./Playlists.css";
import { useEffect, useState } from "react";

export const Playlists = ({setProgress}) => {
    const [elements, setElements] = useState([]);
    useEffect(() => {


        document.getElementById("chan").innerText = "PlayLists";

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

            const data = await result.msg;
            console.log(JSON.stringify(data));

            const keys = Object.keys(data);
            const length = keys.length;
            const newElements = [];

            for (let i = length - 1; i >= 0; i--) {
                var pid = "playlist" + i;
                var stylem = {
                    boxShadow: `-10px -10px ${data[pid].pcolor}`
                }
                newElements.push(
                    <div className="col" key={`newkkey${i}`}>

                        <NavLink to={`/playlists/selectdplatlist?name=${data[pid].pcode}&pname$${data[pid].pname}`} className="playlist-container" style={stylem}>
                            <div className="top-part">
                                <img src={data[pid].pthumb} alt="" />
                                <span className="count">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" className="ssvg"><path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"></path></svg>
                                    <span>{`${data[pid].vcount} videos`}</span>
                                </span>
                            </div>
                            <div className="bottom-part">
                                <p className="playlist-name">{data[pid].pname}</p>
                            </div>
                            <div className="black-screen">
                                View all Videos
                            </div>

                        </NavLink>
                    </div>
                );
            }
            setElements(newElements);
        }

        fetchData();

        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);




    }, []);
    return (

        <main>

            <h1 id="headingnew">Here Our All PlayLists</h1>

            <div className="container text-center">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {elements}
                </div>
            </div>



        </main>
    )
}