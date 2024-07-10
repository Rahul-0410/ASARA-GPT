import React from "react";
import "./Right.css"
import { useNavigate } from "react-router-dom";

function Right(){
    const nav=useNavigate();
    function Clicksign() {
        nav("/signup")
    }
    return (
        <div className="Rightpanel">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/038/465/043/small_2x/young-tired-depressed-male-man-sitting-alone-at-floor-bowed-his-head-on-knee-silhouette-black-character-sad-thoughts-anxiety-illustration-thinking-about-problems-stress-confused-vector.jpg" alt="" />
            <p><i>And so rock bottom became the solid foundation on which I rebuilt my life</i></p>
            <h1>Hello, New User!</h1>
            <button onClick={Clicksign}>SIGN UP </button>
        </div>
    )
 
}

export default Right;