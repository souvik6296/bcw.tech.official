import React, { useEffect, useState } from 'react';
import addItems from './script1';  // Ensure this path is correct
import { NavLink } from 'react-router-dom';
import "./Home.css";

export const Home = ({setProgress}) => {


    const [elements, setElements] = useState([]);

    useEffect(() => {
        const fetchDataAndCreateElements = async () => {
            const data = await addItems();
            const keys = Object.keys(data);
            const length = keys.length;
            const newElements = [];

            for (let i = length - 1; i >= (length - 3); i--) {
                var videoid = `video${i}`;
                var vdetails = data[videoid];
                newElements.push(
                    <div className="col" key={`newkey${i}`}>
                        <div className="card">
                            <img className="card-img-top" src={vdetails.thumbnail} alt={`video${i}`} />
                            <div className="card-body">
                                <h5 className="card-title">{vdetails.title}</h5>
                                <p className="card-text equaltext">{vdetails.desc.substring(0, 255)}</p>
                                <a href={vdetails.videourl}>
                                    <div>
                                        <button className="btn1">
                                            <i className="animation"></i>Watch Now<i className="animation"></i>
                                        </button>
                                    </div>
                                </a>
                                <NavLink to={`/details?index=${i}`}>
                                    <div className="button">
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                );
            }

            setElements(newElements);
        };

        fetchDataAndCreateElements();
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);
    }, []);

    return (
        <>
            <main>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={"/images/bs1.jpg"} className="d-block w-100 slidingimgs" alt="Slide 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="/images/bs2.jpg" className="d-block w-100 slidingimgs" alt="Slide 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="/images/bs3.jpg" className="d-block w-100 slidingimgs" alt="Slide 3" />
                        </div>
                    </div>
                </div>
                <h1 id="headingnew">
                    Welcome to the Official Page of<br/> Btech Coding Wallah
                </h1>
                <div id="heading">
                    <div className="shine">
                        <li>Latest Videos:</li>
                    </div>
                </div>
                <div className="container text-center">
                    <div className="row row-cols-1 row-cols-md-3" id="main-cont">
                        {/* Content will be added here by addItem function */}
                        {elements}
                    </div>
                    <div style={{ marginTop: '25px' }}>
                        <NavLink to="/videos">More Videos</NavLink>
                    </div>
                </div>
            </main>
        </>
    );
};

// Ensure this is exported correctly if not already done
export default Home;
