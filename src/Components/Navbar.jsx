import React, { useState } from "react";

import { NavLink } from "react-router-dom";




export const Navbar = () => {
    const coming = (event) =>{
        event.preventDefault();
        alert("Comming Soon");
    };
    
    const [elements, setElements] = useState([]);
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

        const keys = Object.keys(data);
        const length = keys.length;
        const newElements = [];

        for (let i = length - 1; i >= 0; i--) {
            var pid = "playlist" + i;
            var na = data[pid].pname;
            na = na.substring(0, na.indexOf("-")).replace("for LPU ", "");
            newElements.push(
                <li key={i}><NavLink className="dropdown-item" to={`/playlists/selectdplatlist?name=${data[pid].pcode}&pname$${data[pid].pname}`} >{na}</NavLink></li>

            );
        }
        setElements(newElements);
    }

    fetchData();

    
    return (

        <>

            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">

                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">
                            <img src="/images/logo.png" alt="Bootstrap" height="45"/>
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item" >
                                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/videos">Videos</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" role="button" to="/playlists" data-bs-toggle="dropdown"
                                        aria-expanded="false" id="chan">
                                        PlayLists
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        {elements}
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><NavLink className="dropdown-item" to="/playlists/allplaylists" >All Playlists</NavLink></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin">Admin</NavLink>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit" onClick={coming}>Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>

        </>


    );
}