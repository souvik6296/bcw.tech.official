import { useEffect, useState, useRef } from "react";
import "./Admin.css";
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';

export const Admin = ({setProgress}) => {
    
    const buttonRef = useRef(null);
    const [elements, setElements] = useState([]);
    const [values, setValues] = useState({
        adminid: '',
        passw: ''
    });

    const getAdmins = async () => {
        try {
            const response = await fetch(`https://server-api-jade.vercel.app/admin/read/admindata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json();
            return result.msg;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return {};
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevState => ({ ...prevState, [name]: value }));
    };

    const privilagePgae = (adminName) => {
        const newElem0 = [

            <div id="allholder" key={"newBtn"}>
                <h1>Welcome Mr. {adminName}</h1>
                <br />
                <div id="btn-hol00" >
                    <NavLink to={"/admin/upload"}>
                        <button id="newbtn">
                            Upload new Video
                        </button>
                    </NavLink>
                    <NavLink to={"/admin/createplaylist"}>
                        <button id="newbtn0">
                            Create new Playlist
                        </button>
                    </NavLink>

                    <NavLink to={"/admin/selecteditvideo"}>
                        <button id="newbtn1">
                            Edit a Video
                        </button>
                    </NavLink>
                </div>
            </div>

        ];
        return newElem0;
    }

    const formPage = () => {
        const newElem = [
            <form id="admin-login" onSubmit={handleSubmit} key={"newForm"}>
                <label htmlFor="admin-id">Enter Your Admin ID :</label>
                <input type="text" name="adminid" id="admin-id" onChange={handleChange} value={values.adminid} />
                <label htmlFor="password">Enter Your Password :</label>
                <input type="password" name="passw" id="passw" onChange={handleChange} value={values.passw} />
                <input type="submit" value="LogIn as Admin" ref={buttonRef} />
            </form>
        ];
        return newElem;
    }

    const handleSubmit = async (e) => {

        if (buttonRef.current) {
            buttonRef.current.value = 'Working on it...'; // Reset the button text after uploading
            buttonRef.current.style.backgroundColor = "#029272";
        }
        e.preventDefault();

        const data = {
            adminid: values.adminid,
            passw: values.passw
        };

        console.log(JSON.stringify(data));

        const res = await getAdmins();
        const adminDetails = res[data.adminid];
        if (adminDetails && data.passw == adminDetails.password) {
            console.log(`Logged in successfully welcome ${adminDetails.name}`);

            Cookies.set('adminName', adminDetails.name, { expires: 1 / 24 });

            setElements(privilagePgae(adminDetails.name));
            document.getElementById("green-alert").style.visibility = "visible";
            document.getElementById("green-alert").innerText = `Successfully logged in Admin Panel. Welcome Mr. ${adminDetails.name} you are acting as an ADMIN now.`;

            window.setTimeout(() => {
                document.getElementById("green-alert").style.visibility = "hidden";

            }, 5000);
        } else {
            console.log("Incorrect Credentials");
            document.getElementById("red-alert").style.visibility = "visible";
            window.setTimeout(() => {
                document.getElementById("red-alert").style.visibility = "hidden";

            }, 5000);
        }
        if (buttonRef.current) {
            buttonRef.current.value = 'LogIn as Admin'; // Reset the button text after uploading
            buttonRef.current.style.backgroundColor = "#4fcbb0";
        }
    };

    useEffect(() => {

        const checkAdminCookie = () => {
            const adminName = Cookies.get('adminName');
            if (adminName) {
                // setElements();
                console.log(adminName);
                setElements(privilagePgae(adminName));
                document.getElementById("green-alert").style.visibility = "visible";
                document.getElementById("green-alert").innerText = `Successfully logged in Admin Panel. Welcome Mr. ${adminName} you are acting as an ADMIN now.`;

                window.setTimeout(() => {
                    document.getElementById("green-alert").style.visibility = "hidden";

                }, 5000);
            } else {
                // setElements(getLoginFormElement());
                setElements(formPage());
            }
        };

        checkAdminCookie();
        setProgress(40);
        setTimeout(()=>{
            setProgress(100);
        },2000);

    }, []); // Include dependencies if needed

    return (
        <main id="admin-main">
            <h1 id="headingnew">
                Welcome to Admin Pannel
            </h1>
            <div className="alert alert-success" role="alert" id="green-alert">
                
            </div>
            <div className="alert alert-danger" role="alert" id="red-alert">
                Sorry!! we were unable to logged you in as ADMIN seems like invalid credentials. Contact at <strong>+91 62964 89227</strong>.
            </div>
            {elements}
        </main>
    );
};
