import React from "react";
import "./home.scss";
import Share from "../../components/share/Share";

import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar";
import Posts from "./../../components/Posts/Posts";
import PostShare from "./../../components/PostShare/PostShare";

const Homee = () => {
  return (
    <div style={{ display: "flex" }}>
      <LeftBar />
      <div style={{ flex: 6, paddingTop: "20px" }}>
        <PostShare />
        <Posts />
      </div>
      <RightBar />
    </div>
  );
};

export default Homee;
