
import "./Upload.css";
import React, { useState, useRef } from 'react';
import addItems from './script1';
import { useParams } from "react-router-dom";



const mainFile = {
    thumuri: null,
    noteuri: null
};
export const EditVideo = ({setProgress}) => {

    const buttonRef = useRef(null); // Ref to access the button
    const fileRef0 = useRef(null);
    const fileRef1 = useRef(null);
    const {videoid} = useParams();

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

    const fetchDataAndCreateElements = async () => {
        const data = await addItems();

        console.log(videoid);

        const val = {
            title: data[videoid].title,
            desc: data[videoid].desc,
            playlist: data[videoid].playlist,
            videourl: data[videoid].videourl,
            code: data[videoid].code,
            thumbnail: data[videoid].thumbnail,
            note: data[videoid].note
        }

        setFormData(val);
    };

    // fetchDataAndCreateElements();

    useState(()=>{
        fetchDataAndCreateElements();
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);
    }, []);







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




    const handleSubmit = async (e) => {
        e.preventDefault();


        if (buttonRef.current) {
            buttonRef.current.value = 'Updating Video...';
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
                const finalDatathumb = await data.url;
                setFormData(prevState => ({ ...prevState, thumbnail: finalDatathumb }));

            } catch (error) {

            }
        }

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
                const finalData2thumb = await data2.url;
                setFormData(prevState => ({ ...prevState, note: finalData2thumb }));
            } catch (error) {

            }

        }

        const finalDataJson = {
            title: formData.title,
            desc: formData.desc,
            playlist: formData.playlist,
            videourl: formData.videourl,
            code: formData.code,
            thumbnail: formData.thumbnail,
            note: formData.note,
            videoid: videoid
        };

        const finalresponse = await fetch(`https://server-api-jade.vercel.app/admin/editvideo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalDataJson)
        });

        if (!finalresponse.ok) {
            setFormData(intitalStateval);
            if (buttonRef.current) {
                buttonRef.current.value = 'Update Video'; // Reset the button text after uploading
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
            buttonRef.current.value = 'Update Video'; // Reset the button text after uploading
        }
        setFormData(intitalStateval);
        fileRef0.current.value = '';
        fileRef1.current.value = '';







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
                <h1 id="headingnew">Edit a Existing Video</h1>
                <form id="uploadform" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title of the video :</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} />

                    <label htmlFor="desc">Description of the video :</label>
                    <textarea name="desc" id="desc" value={formData.desc} onChange={handleChange}></textarea>

                    <label htmlFor="playlist">Select a Playlist :</label>
                    <select name="playlist" id="playlist" value={formData.playlist} onChange={handleChange}>
                        <option value="python" className="options">Python(INT108)</option>
                        <option value="webd" className="options">Web Dev(CSE326)</option>
                    </select>

                    <label htmlFor="videourl">URL of the video :</label>
                    <input type="text" name="videourl" id="videourl" value={formData.videourl} onChange={handleChange} />

                    <label htmlFor="code">Enter the associated Code Here :</label>
                    <textarea name="code" id="code" value={formData.code} onChange={handleChange}></textarea>

                    <label htmlFor="thumbnail">Select your video Thumbnail(png only) :</label>
                    <input type="file" name="thumbnail" id="thumbnail" accept=".png" onChange={handleChange} ref={fileRef0} />

                    <label htmlFor="note">Select your video Notes(pdf only) :</label>
                    <input type="file" name="note" id="note" accept=".pdf" onChange={handleChange} ref={fileRef1} />

                    <input type="submit" value="Update Video" id="upload" ref={buttonRef} />
                </form>
            </main>

        </>
    )
}