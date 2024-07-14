import { useEffect } from "react";
import "./ErrorPage.css";

export const NotFoundPage = () => {
    // useEffect(()=>{
    //     setProgress(40);
    //     setTimeout(()=>{
    //         setProgress(100);
    //     },2000);
    // },[]);
    return (
        <main>

            <div id="main-holder">
                <div id="lpart">

                    <p id="a404">404!</p>
                    <p id="des">Ooops!! Page not found. May be this resource file is removed or still not uploaded.</p>
                    <p id="wait">Please try after some times or contact us on <strong>+91 62964 89227</strong></p>

                </div>
                <div id="rpart">

                    <img src="/images/robot2.png" alt="" />
                </div>
            </div>

        </main>
    )
}