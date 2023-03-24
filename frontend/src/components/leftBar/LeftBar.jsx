import "./leftBar.scss";
import Friends from "../../assets/imgs/1.png";
import Groups from "../../assets/imgs/2.png";
import Memories from "../../assets/imgs/5.png";
import Events from "../../assets/imgs/6.png";
import Gallery from "../../assets/imgs/8.png";
import Videos from "../../assets/imgs/9.png";
import Messages from "../../assets/imgs/10.png";
import Tutorials from "../../assets/imgs/11.png";
import Courses from "../../assets/imgs/12.png";
import Fund from "../../assets/imgs/13.png";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const LeftBar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="leftBar mt-3">
      <div className="container">
        <div className="menu">
          <NavLink className="user" to={`/profile/${auth._id}`}>
            <img src={`http://localhost:5000/uploads/${auth.img}`} alt="" />
            <span
              style={{
                textTransform: "capitalize",
              }}
            >
              {auth.firstname} {auth.lastname}
            </span>
          </NavLink>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Clubs</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
