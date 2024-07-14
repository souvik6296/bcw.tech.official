
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import addItems from './script1';
import "./Video.css";

export const PlayListVideos = ({setProgress}) => {
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const [elements, setElements] = useState([]);
    const url0 = window.location.href;
    const playlistname = url0.substring(url0.indexOf("=") + 1, url0.indexOf("&"));
    var heading= '';
    
    const fetchDataAndCreateElements = async () => {
        const data = await addItems();
        const keys = Object.keys(data);
        const length = keys.length;
        const newElements = [];

        for (let i = length - 1; i >= 0; i--) {
            var videoid = "video"+i;
            if(data[videoid].playlist==playlistname){

                newElements.push(
                    <NavLink to={`/details?index=${i}`} key={i}>
                        <div className="col">
                            <div className="card">
                                <img
                                    className="card-img-top"
                                    src={data[videoid].thumbnail}
                                    alt={videoid}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{data[videoid].title}</h5>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                );
            }
        }

        setElements(newElements);
    };
    const handleUrlChange = () => {
        const url = window.location.href;
        const name = url.substring(url.indexOf("=") + 1, url.indexOf("&"));
        document.getElementById("chan").innerText = "PlayLists/" + name;
        heading = url.substring(url.indexOf("$") + 1);
        document.getElementById("headingnew").innerText= heading.replace(/%20/g, " ");
    };
    useEffect(() => {

        // Update current URL and handle URL change
        handleUrlChange();
        fetchDataAndCreateElements();
        if (currentUrl !== window.location.href) {
            setCurrentUrl(window.location.href);
            handleUrlChange();
            fetchDataAndCreateElements();
        }
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);

    }, [location]);

    return (
        <main>
            <h1 id="headingnew">{heading}</h1>
            <div className="container text-center">
                <div id="main-cont" className="row row-cols-1 row-cols-md-3">
                    {elements}
                </div>
            </div>
        </main>
    );
}