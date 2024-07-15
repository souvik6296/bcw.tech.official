
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import setItem from './script2';
import "./Details.css";


export const Details = ({setProgress}) => {


    useEffect(() => {
        setItem();  // Ensure addItem function is properly defined and imported
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);

    }, []);

    return (
        <>
            <main>
                <div id="main-cont">
                    <div id="left-part">
                        <h2 id="title">
                        </h2>
                        <br />
                        <br />
                        <p id="desc">
                        </p>
                    </div>
                    <div id="right-part">
                        <iframe id="iframe" width="560" height="315" src="https://www.youtube.com/embed/yemHyGg54rg?si=kablb_I3POWEVGL7"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin">
                        </iframe>
                    </div>
                </div>

                <div className="shining-text">
                    <li>Notes & Code Samples:</li>
                </div>
                <div id="main-cont2">
                    <div id="code-part">
                        <div className="code-container">
                            <div className="code-header">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python Logo" />
                                {/* //  https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg */}
                                <span id="filename">example.py</span>
                            </div>
                            <pre className="line-numbers"><code className="language-python" id="code-block">

                            </code></pre>
                        </div>
                    </div>
                    <div id="notes-part">
                        <h3 id='plaintext'>Here we go with the best quality <strong>Hand Written</strong> notes for you
                            just go through this one day before your exam and crack all the tests :</h3>
                        <div id="btn-holders">
                            <a href="" id="preview" target="_blank"><button className="download">Take a Preview
                            </button></a>
                            <a id="download" className="Btn">
                                <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
                                <span className="icon2"></span>
                                <span className="tooltip">Download</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}