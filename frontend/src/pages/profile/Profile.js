import React, { useContext, useEffect, useState } from "react";
import "./profile.scss";
import moment from "moment";
import AuthContext from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import EditProfile from "../../modals/EditProfile";
import axios from "axios";
import { baseURL } from "../../api/api";
import { toast } from "react-toastify";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
const Profile = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedPfp, setSelectedPfp] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    `http://localhost:5000/uploads/${auth.img}`
  );

  useEffect(() => {
    if (selectedPfp) {
      //console.log(selectedPfp);
      submitPfp();
    }
    if (selectedCover) {
      //console.log(selectedPfp);
      submitCover();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPfp, selectedCover]);

  const handleShow = () => setShow(true);

  const submitCover = async () => {
    //console.log(selectedCover);
    try {
      const formData = new FormData();
      formData.append("cover", selectedCover);
      const response = await axios.put(
        `${baseURL}/users/addcover/${auth._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //console.log(response.data);
      setAuth(response.data);
      toast.success("Cover picture added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const submitPfp = async () => {
    try {
      const formData = new FormData();
      formData.append("pfp", selectedPfp);
      const response = await axios.put(
        `${baseURL}/users/editpfp/${auth._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //console.log(response.data);
      setAuth(response.data);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleHover = () => {
    setHovered(!hovered);
  };

  const handleFileChange = (e) => {
    const pfp = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(pfp);
    reader.onload = (e) => {
      const newImageUrl = e.target.result;
      setImageSrc(newImageUrl);
    };
    setSelectedPfp(pfp);
  };

  return (
    <div>
      <div
        className="profile-cover"
        style={{
          backgroundImage: `url("http://localhost:5000/uploads/${auth.cover}")`,
        }}
      >
        {!auth.cover && <div className="cover-overlay"></div>}
        <div
          className="profile-picture"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <label htmlFor="file-pfp">
            <img src={imageSrc} alt="pfp" />
            {hovered && (
              <div className="camera-label">
                <i className="fa-solid fa-camera"></i>
                <span>Change Picture</span>
              </div>
            )}
          </label>
          <input
            id="file-pfp"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            name="pfp"
            style={{ display: "none" }}
          />
        </div>
        <label htmlFor="file-cover">
          <div className="add-cover-button">
            <i className="fa-solid fa-camera me-2" />
            {auth.cover ? "Edit cover" : "Add cover"}
          </div>
        </label>
        <input
          id="file-cover"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => {
            setSelectedCover(e.target.files[0]);
          }}
          name="cover"
          style={{ display: "none" }}
        />
      </div>
      <div className="profile-info">
        <div className="position">
          <div className="d-flex justify-content-between align-items-center">
            <div className="profile-name">
              {auth.firstname} {auth.lastname}{" "}
              <small className="text-muted profile-username">
                @{auth.username}
              </small>
            </div>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="dot-toggle">
                <div className="three-dots">
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow}>
                  <i className="fa-regular fa-pen-to-square me-2"></i>edit
                  profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="contact-info">
            <div className="contact-text">
              <i className="fa-solid fa-location-dot me-2"></i>
              {auth.address}
            </div>
            <div className="contact-text">
              <i className="fa-solid fa-envelope me-2"></i>
              {auth.email}
            </div>
            <div className="contact-text">
              <i className="fa-solid fa-cake-candles me-2"></i>
              Born {moment(auth.birthday).format("LL")}
            </div>
            <div className="contact-text">
              <i className="fa-solid fa-calendar-days me-2"></i>
              Joined {moment(auth.createdAt).format("MMM Do YY")}
            </div>
          </div>
        </div>
      </div>
      <EditProfile show={show} setShow={setShow} />
      <div className="Profile">
        <ProfileLeft />
        <div className="Profile-center">
          <ProfileCard location="profilePage" />
          <PostSide />
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default Profile;
