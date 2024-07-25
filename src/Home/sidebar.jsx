import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./sidebar.css";
import sideData from "./icon.json";
import BrandLogo from "../assets/logo-color.png";
import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();

     const handle= (item)=>{
        if(item.icon==="fluent-mdl2:survey-questions"){
            navigate("/questions")
    }
        }
return (
    <aside className="sidebar">
      <img src={BrandLogo} alt="logo" />
      <section>
        {sideData.map((item, index) => (
          <article key={index} className="item" onClick={()=> handle(item)}>
            <Icon icon={item.icon} color={"#fff"} />
            {/* <Icon icon="dashicons:media-interactive" color={"#fff"}/> */}
          </article>
        ))}
      </section>
      <article className="logout">
        <Icon icon={"material-symbols:logout"} />
      </article>
    </aside>
  );
}


export default SideBar;
