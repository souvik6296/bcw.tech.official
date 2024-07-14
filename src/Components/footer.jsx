import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";


export const Footer = () => {

    return (
        <>
            <footer>
                <div id="lfooter">

                    <div id="logo-holder">
                        <img src="./images/logo1.png" alt="" id="logo" />
                    </div>
                    <a href="https://www.youtube.com/@BtechCodingWallah" target="_blank">
                        <div id="sub-holder">
                            <h2>Btech Coding Wallah</h2>
                            <div id="subscribe">Subscribe</div>
                        </div>
                    </a>

                </div>
                <div id="rfooter">

                    <h3 id="tagline">~ "Coder banne ke liye coding<br /> ana zaruri hain..."</h3>
                    <div id="hot-btn-holder">
                        <a href="https://www.youtube.com/@BtechCodingWallah" target="_blank"><img src="./images/youtube.png"
                            alt="" srcSet="" /></a>
                        <a href="https://www.instagram.com/its_gupta_here/" target="_blank"><img src="./images/instagram.png"
                            alt="" srcSet="" /></a>
                        <a href="https://www.linkedin.com/in/souvik-gupta-250109280/" target="_blank"><img
                            src="./images/linkedin.png" alt="" srcSet="" /></a>
                        <a href="https://github.com/souvik6296" target="_blank"><img src="./images/github.png" alt=""
                            srcSet="" /></a>
                        <a href="https://x.com/SouvikGupta2407" target="_blank"><img src="./images/twitter.png" alt=""
                            srcSet="" /></a>
                        <a href="https://whatsapp.com/channel/0029Vadk59UElagjtRcqPT3d" target="_blank"><img
                            src="./images/whatsapp.png" alt="" srcSet="" /></a>
                    </div>

                </div>
                <NavLink to={"/notf"}>

                    <div id="copyright">
                        © {new Date().getFullYear()} All rights reserved, Developer Gupta
                    </div>
                </NavLink>
            </footer>

        </>
    )
}