import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./sidebar.css";
import sideData from "./icon.json";
import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();

    const handle = (item) => {
      if (item.icon === "fluent-mdl2:survey-questions") {
        navigate("/questions");
            } else if(item.icon ==="mdi:books"){
        window.open("http://localhost:3002/", "_blank");
            }
            else{
        navigate("/interactiveview");
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      navigate("/");
    };

    return (
      <aside className="sidebar">
        <div className="logo">
          <Icon onClick={()=>(navigate('/profile'))} icon="iconamoon:profile-circle-light" color={"#fff"} />
        </div>
        <section>
          {sideData.map((item, index) => (
            <article key={index} className="item" onClick={() => handle(item)}>
              <Icon icon={item.icon} color={"#fff"} />
            </article>
          ))}
        </section>
        <article className="logout" onClick={logout}>
          <Icon icon={"material-symbols:logout"} />
        </article>
      </aside>
    );
}


export default SideBar;
