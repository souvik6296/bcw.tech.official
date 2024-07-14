import { useState, useRef } from "react";
import "./Contact.css";
import { NavLink } from "react-router-dom";


export const Contact = ({setProgress}) => {

    const buttonRef = useRef(null);
    const initialstate = {
        pname: '',
        pemail: '',
        pphone: '',
        pmsg: ''
    }

    const [values, setValue] = useState(initialstate);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        if (buttonRef.current) {
            buttonRef.current.value = 'Sending Message'; // Reset the button text after uploading
            buttonRef.current.style.backgroundColor = "#029272";
        }
        e.preventDefault();
        const data = {
            name: values.pname,
            from: values.pemail,
            phone: values.pphone,
            msg: values.pmsg
        }
        const response = await fetch(`https://server-api-jade.vercel.app/admin/contactus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            console.log("Network error!");
        }
        const result = await response.json();
        if (result.msg) {
            if (buttonRef.current) {
                buttonRef.current.value = 'Send Message'; // Reset the button text after uploading
                buttonRef.current.style.backgroundColor = "#4fcbb0";
            }
            setValue(initialstate);
            document.getElementById("green-alert").style.visibility = "visible";
            window.setTimeout(() => {
                document.getElementById("green-alert").style.visibility = "hidden";

            }, 2000);
        } else {
            if (buttonRef.current) {
                buttonRef.current.value = 'Send Message'; // Reset the button text after uploading
                buttonRef.current.style.backgroundColor = "#4fcbb0";
            }
            setValue(initialstate);
            document.getElementById("red-alert").style.visibility = "visible";
            window.setTimeout(() => {
                document.getElementById("red-alert").style.visibility = "hidden";

            }, 2000);

        }
    };

    useState(()=>{
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);
    })

    return (

        <main>
            <div className="alert alert-success" role="alert" id="green-alert">
                Your Message is send to BtechCodingWallah Authority. Thanks for your Valuable response.
            </div>
            <div className="alert alert-danger" role="alert" id="red-alert">
                Sorry!! we were unable to send your Message right now. Please try after some time.
            </div>
            <div id="bgholder00">
                <div id="leftheroholder">
                    <img src="/images/customer-support-illustration.png" alt="Customer Support Illustration" />
                </div>
                <div id="rightcontactholder">
                    <h1 id="simpletxt">Contact Us</h1>
                    <form id="contactform" onSubmit={handleSubmit}>
                        <label htmlFor="pname">Your Name :</label>
                        <input type="text" name="pname" id="pname" onChange={handleChange} />
                        <label htmlFor="pemail">Enter your email-id :</label>
                        <input type="text" name="pemail" id="pemail" onChange={handleChange} />
                        <label htmlFor="pphone">Enter Contact Number :</label>
                        <input type="text" name="pphone" id="pphone" onChange={handleChange} />
                        <label htmlFor="pmsg">Write your Message :</label>
                        <textarea name="pmsg" id="pmsg" onChange={handleChange}></textarea>
                        <input type="submit" value="Send Message" ref={buttonRef} />
                        <a href="https://web.whatsapp.com/send/?phone=6296489227" target="_blank">

                            <span id="wa">
                                <img src="/images/whatsapp.png" alt="WhatsApp Logo" />
                                Connect Us on WhatsApp
                            </span>
                        </a>
                    </form>
                </div>
            </div>
        </main>
    );
}