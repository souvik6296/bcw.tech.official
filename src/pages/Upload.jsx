
import "./Upload.css";
import React, { useState, useRef } from 'react';

const mainFile = {
    thumuri: null,
    noteuri: null
};
var finalDataJson = null;
export const Upload = ({setProgress}) => {

    
    const [playlists, setPlaylists] = useState([<option value="NAP" className="playoptions">Wait Playlists are being fetched</option>]);


    const buttonRef = useRef(null); // Ref to access the button
    const fileRef0 = useRef(null);
    const fileRef1 = useRef(null);

    const intitalStateval = {
        title: '',
        desc: '',
        playlist: 'python',
        videourl: '',
        code: '',
        thumbnail: null,
        note: null
    };

    const [formData, setFormData] = useState(intitalStateval);



    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (files) {

            if (name == "thumbnail") {
                mainFile.thumuri = files[0];
            } else {
                mainFile.noteuri = files[0];
            }


        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    useState(()=>{
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
                    <option value={playdata[pid].pcode} className="options" key={i}>{playdata[pid].pname}</option>
                );
            }
            setPlaylists(playLists);
        }
        fetchData();
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);
    },[]);



    const handleSubmit = async (e) => {
        e.preventDefault();


        if (buttonRef.current) {
            buttonRef.current.value = 'Uploading...';
        }



        if (mainFile.thumuri != null) {

            const form = new FormData();
            form.append('image', mainFile.thumuri);

            try {
                const response = await fetch(`https://server-api-jade.vercel.app/admin/upload/img`, {
                    method: "POST",
                    body: form
                });
                if (!response.ok) {
                    if (buttonRef.current) {
                        buttonRef.current.value = 'Upload'; // Reset the button text after uploading
                    }
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                const finalData = await data.url;
                console.log(finalData);

                // checking if note is available
                if (mainFile.noteuri != null) {

                    const form2 = new FormData();
                    form2.append('image', mainFile.noteuri);
                    try {
                        const response2 = await fetch(`https://server-api-jade.vercel.app/admin/upload/img`, {
                            method: "POST",
                            body: form2
                        });
                        if (!response2.ok) {
                            throw new Error('Network response2 was not ok ' + response2.statusText);
                        }
                        const data2 = await response2.json();
                        const finalData2 = await data2.url;


                        finalDataJson = {
                            title: formData.title,
                            desc: formData.desc,
                            playlist: formData.playlist,
                            videourl: formData.videourl,
                            code: formData.code,
                            thumbnail: finalData,
                            note: finalData2
                        };

                        console.log(JSON.stringify(finalDataJson));

                    } catch (error) {
                        console.error(error);
                    }
                } else {

                    finalDataJson = {
                        title: formData.title,
                        desc: formData.desc,
                        playlist: formData.playlist,
                        videourl: formData.videourl,
                        code: formData.code,
                        thumbnail: finalData,
                        note: null
                    };

                    console.log(JSON.stringify(finalDataJson));

                }
                const finalresponse = await fetch(`https://server-api-jade.vercel.app/admin/upload`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(finalDataJson)
                });

                if (!finalresponse.ok) {
                    setFormData(intitalStateval);
                    if (buttonRef.current) {
                        buttonRef.current.value = 'Upload'; // Reset the button text after uploading
                    }
                    fileRef0.current.value = '';
                    fileRef1.current.value = '';
                    document.getElementById("red-alert").style.visibility = "visible";
                    window.setTimeout(() => {
                        document.getElementById("red-alert").style.visibility = "hidden";
        
                    }, 5000);
                    throw new Error('Network finalresponse was not ok ' + finalresponse.statusText);
                }
                const Maindata = await finalresponse.json();
                const MainfinalData = await Maindata.msg;
                console.log(MainfinalData);
                alert(MainfinalData);
                
                document.getElementById("green-alert").style.visibility = "visible";
                window.setTimeout(() => {
                    document.getElementById("green-alert").style.visibility = "hidden";

                }, 5000);


                if (buttonRef.current) {
                    buttonRef.current.value = 'Upload'; // Reset the button text after uploading
                }
                setFormData(intitalStateval);
                fileRef0.current.value = '';
                fileRef1.current.value = '';



            } catch (error) {
                console.error(error);
                if (buttonRef.current) {
                    buttonRef.current.value = 'Upload'; // Reset the button text after uploading
                }
                setFormData(intitalStateval);
                fileRef0.current.value = '';
                fileRef1.current.value = '';
                document.getElementById("red-alert").style.visibility = "visible";
                window.setTimeout(() => {
                    document.getElementById("red-alert").style.visibility = "hidden";
    
                }, 5000);
            }

        } else {
            alert("Please Upload a video Thumbnail");
            if (buttonRef.current) {
                buttonRef.current.value = 'Upload'; // Reset the button text after uploading
            }
            setFormData(intitalStateval);
            fileRef0.current.value = '';
            fileRef1.current.value = '';
            document.getElementById("red-alert").style.visibility = "visible";
            window.setTimeout(() => {
                document.getElementById("red-alert").style.visibility = "hidden";

            }, 5000);
        }


    }


    return (
        <>

            <main>
                <div className="alert alert-success" role="alert" id="green-alert">
                    Congratilations!!! New Video is Uploaded Successfully.
                </div>
                <div className="alert alert-danger" role="alert" id="red-alert">
                    Sorry!! we were unable to Upload new Video right now. Please try again letter.
                </div>
                <h1 id="headingnew">Upload a New Video</h1>
                <form id="uploadform" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title of the video :</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} />

                    <label htmlFor="desc">Description of the video :</label>
                    <textarea name="desc" id="desc" value={formData.desc} onChange={handleChange}></textarea>

                    <label htmlFor="playlist">Select a Playlist :</label>
                    <select name="playlist" id="playlist" value={formData.playlist} onChange={handleChange}>
                        
                        {playlists}
                    </select>

                    <label htmlFor="videourl">URL of the video :</label>
                    <input type="text" name="videourl" id="videourl" value={formData.videourl} onChange={handleChange} />

                    <label htmlFor="code">Enter the associated Code Here :</label>
                    <textarea name="code" id="code" value={formData.code} onChange={handleChange}></textarea>

                    <label htmlFor="thumbnail">Select your video Thumbnail(png only) :</label>
                    <input type="file" name="thumbnail" id="thumbnail" accept=".png" onChange={handleChange} ref={fileRef0} />

                    <label htmlFor="note">Select your video Notes(pdf only) :</label>
                    <input type="file" name="note" id="note" accept=".pdf" onChange={handleChange} ref={fileRef1} />

                    <input type="submit" value="Upload" id="upload" ref={buttonRef} />
                </form>
            </main>

        </>
    )
}