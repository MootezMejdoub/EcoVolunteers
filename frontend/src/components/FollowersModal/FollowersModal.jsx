import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
 import { useContext } from "react";
import AuthContext from "./../../context/AuthContext";
import User from "../User/User";
import { useState } from "react";
 import "./followermodal.scss";

const FollowersModal = ({ modalOpened, setModalOpened, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSearchBar() {
    setIsOpen(!isOpen);
  }

  const theme = useMantineTheme();
  const { auth } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter(
    (person) =>
      person._id !== auth._id &&
      person.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div className={`search ${isOpen ? "open" : ""}`}>
        <input
          type="text"
          className="search-box"
          placeholder="Search Users..."
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <div className="search-button" onClick={toggleSearchBar}>
          <div className="search-icon"></div>
        </div>
      </div>

      {/* <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      /> */}
      {filteredData.map((person, id) => (
        <div className="mb-3">
        <User person={person} key={id} /></div>
      ))}
      {/* {data.map((person, id) => {
        if (person._id !== auth._id) return <User person={person} key={id} />;
      })} */}
    </Modal>
  );
};

export default FollowersModal;
