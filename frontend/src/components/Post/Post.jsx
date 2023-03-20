import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Modal, useMantineTheme } from "@mantine/core";

const Post = ({ data }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [liked, setLiked] = useState(data.likes.includes(auth._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [showViewer, setShowViewer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const theme = useMantineTheme();
  const [modalOpened, setModalOpened] = useState(false);

  const handleLike = () => {
    likePost(data._id, auth._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
        onClick={() => setModalOpened(true)}
      />
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
      >
        <img
          src={
            data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
          }
          className="d-block w-100"
          alt="..."
        />
      </Modal>

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
      <div></div>
    </div>
  );
};

export default Post;
