import { useEffect, useState, useRef } from "react";
import "./CreatePlaylis.css";

export const CreatePlaylist = ({setProgress}) => {

    var thumbUrl = null;
    const buttonRef = useRef(null); // Ref to access the button
    const fileRef0 = useRef(null);

    const intitalStateval = {
        playname: '',
        placolor: '',
        playcode: ''
    };

    const [formData, setFormData] = useState(intitalStateval);



    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (files) {

            // setFormData(prevState => ({ ...prevState, [name]: files[0] }));
            thumbUrl = files[0];


        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
            if (name == "placolor") {
                updateColorValue();
            }
        }
        console.log(JSON.stringify(formData));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (buttonRef.current) {
            buttonRef.current.value = 'Creating Playlist...';
        }
        if (thumbUrl != null) {

            const form = new FormData();
            form.append('image', thumbUrl);

            try {
                const response = await fetch(`https://server-api-jade.vercel.app/admin/upload/playimg`, {
                    method: "POST",
                    body: form
                });
                if (!response.ok) {
                    if (buttonRef.current) {
                        buttonRef.current.value = 'Create Playlist'; // Reset the button text after uploading
                    }
                    document.getElementById("red-alert").style.visibility = "visible";
                    window.setTimeout(() => {
                        document.getElementById("red-alert").style.visibility = "hidden";
        
                    }, 5000);
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                const finalData = await data.url;

                const finalValue = {
                    pcode: formData.playcode,
                    pname: formData.playname,
                    pcolor: formData.placolor,
                    pthumb: finalData,
                    vcount: 0
                }
                const finalresponse = await fetch(`https://server-api-jade.vercel.app/admin/upload/playlist`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(finalValue)
                });

                if (!finalresponse.ok) {
                    setFormData(intitalStateval);
                    if (buttonRef.current) {
                        buttonRef.current.value = 'Create Playlist';
                    }
                    fileRef0.current.value = '';
                    document.getElementById("red-alert").style.visibility = "visible";
                    window.setTimeout(() => {
                        document.getElementById("red-alert").style.visibility = "hidden";
        
                    }, 5000);
                    // fileRef1.current.value = '';
                    throw new Error('Network finalresponse was not ok ' + finalresponse.statusText);
                }
                const Maindata = await finalresponse.json();
                const MainfinalData = await Maindata.msg;
                console.log(MainfinalData);
                if (buttonRef.current) {
                    buttonRef.current.value = 'Create Playlist';
                }
                fileRef0.current.value = '';
                setFormData(intitalStateval);
                alert(MainfinalData);
                document.getElementById("green-alert").style.visibility = "visible";
                window.setTimeout(() => {
                    document.getElementById("green-alert").style.visibility = "hidden";

                }, 5000);

            } catch (error) {
                console.log(error);
                if (buttonRef.current) {
                    buttonRef.current.value = 'Create Playlist';
                }
                fileRef0.current.value = '';
                setFormData(intitalStateval);
                document.getElementById("red-alert").style.visibility = "visible";
                window.setTimeout(() => {
                    document.getElementById("red-alert").style.visibility = "hidden";
    
                }, 5000);
            }
        } else {
            if (buttonRef.current) {
                buttonRef.current.value = 'Create Playlist';
            }
            fileRef0.current.value = '';
            setFormData(intitalStateval);
            alert("Please upload a thumbnail");
            document.getElementById("red-alert").style.visibility = "visible";
            window.setTimeout(() => {
                document.getElementById("red-alert").style.visibility = "hidden";

            }, 5000);
        }


    }



    const updateColorValue = () => {
        const colorPicker = document.getElementById('playcolor');
        const colorValue = document.getElementById('colorvalue');
        colorValue.value = colorPicker.value;
    };
    useEffect(() => {


        // Initialize the color value display on page load
        window.onload = updateColorValue;
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);
    }, []);


    return (
        <main id="maincreate">
            <div className="alert alert-success" role="alert" id="green-alert">
                Congratilations!!! Playlist is Created Successfully.
            </div>
            <div className="alert alert-danger" role="alert" id="red-alert">
                Sorry!! we were unable to create new playlist right now. Please try again letter.
            </div>
            <h1 id="headingnew">Create a New PlayList</h1>
            <form id="cpform" onSubmit={handleSubmit}>
                <label htmlFor="playname">Enter the Name of PlayList :</label>
                <input type="text" name="playname" id="playname" onChange={handleChange} />
                <label htmlFor="playcode">Enter the Code for Playlist :</label>
                <input type="text" name="playcode" id="playcode" onChange={handleChange} />
                <label htmlFor="placolor">Select the Color for PlayList :</label>
                <span id="color-holder">
                    <input type="color" name="placolor" id="playcolor" defaultValue={"#6FF7DA"} onChange={handleChange} />
                    <input id="colorvalue" name="playcolor" type="text" defaultValue={"#6FF7DA"} />
                </span>
                <label htmlFor="playthumb">Select Thumbnail for PlayList :</label>
                <input type="file" name="playthumb" id="playthumb" onChange={handleChange} ref={fileRef0} />
                <input type="submit" value="Create Now" ref={buttonRef} />
            </form>
        </main>
    )
}