import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navbar/NavBar";
// import Home from "./pages/home/Home";
// import Home from "./pages/Home";
import wordsToNumbers from "words-to-numbers";
import Login from "./pages/login/Login";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import Admin from "./pages/admin/Admin";
import axios from "axios";
import { baseURL } from "./api/api";
import Register from "./pages/register/Register";
import NotFound from "./pages/notfound/NotFound";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Users from "./pages/admin/users/Users";
import Events from "./pages/admin/events/Events";
import Clubs from "./pages/admin/clubs/Clubs";
import Analytics from "./pages/admin/analytics/Analytics";
import Ban from "./pages/admin/Ban/ban";
import Userbanned from "./pages/admin/Ban/UserBanned";
import Apiban from "./pages/admin/Ban/apiban";
import User from "./pages/admin/users/user";
import ForgetP from "./pages/forgotpassword/ForgetP";
import ResetP from "./pages/forgotpassword/ResetPassword";
import Mini from "./pages/local/Mini";
import { FaceDetection } from "face-api.js";
import ChatLive from "./components/chat/LiveChat";
import io from "socket.io-client";
import Profile from "./pages/profile/Profile";
import EmailVerify from "./pages/EmailVerify";
import useStyles from "./styles";

import Chat from "./pages/Chat/Chat";
import VideoCall from "./components/testvideocall/testvideocall";
import Homee from "./pages/home/Homee";
import Donation from "./components/Donation/Donation";
import alanBtn from "@alan-ai/alan-sdk-web";
import { NewsCards } from "./components/NewsCards/NewsCards";
function App() {
  const { auth, setAuth, logged, setLogged, socket, setSocket } =
    useContext(AuthContext);
  //const socket = io("http://localhost:5000"); // connect to the server
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const alanKey =
    "719a4db1bd22c5579a847170b8b532b62e956eca572e1d8b807a3e2338fdd0dc/stage";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setSocket(io("ws://localhost:8800"));
    if (!token) {
      return;
    } else {
      axios
        .get(`${baseURL}/users/userconnected`, {
          headers: { authorization: token },
        })
        .then((res) => {
          console.log(res);
          setAuth(res.data.user);
          setLogged(true);

          alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
              if (command === "newz") {
                navigate("/news");
              }
              if (command === "home") {
                navigate("/home");
              }
              if (command === "chat") {
                console.log("chat");
                navigate("/chat");
              }
              if (command === "donation") {
                navigate("/donate");
              }
              if (command === "myprofile") {
                navigate(`/profile/${auth._id}`);
              }
              if (command === "newHeadlines") {
                setNewsArticles(articles);
                setActiveArticle(-1);
              } else if (command === "instructions") {
                setIsOpen(true);
              } else if (command === "highlight") {
                setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
              } else if (command === "open") {
                const parsedNumber =
                  number.length > 2
                    ? wordsToNumbers(number, { fuzzy: true })
                    : number;
                const article = articles[parsedNumber - 1];

                if (parsedNumber > articles.length) {
                  alanBtn().playText("Please try that again...");
                } else if (article) {
                  console.log(article);
                  window.open(article.url, "_blank");
                  alanBtn().playText("Opening...");
                } else {
                  alanBtn().playText("Please try that again...");
                }
              }
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        {logged ? (
          <>
            {auth.role === "admin" ? (
              <Route path="/admin" element={<Admin />}>
                <Route element={<Dashboard />} path="dashboard" />
                <Route element={<Users />} path="users" />
                <Route element={<Events />} path="events" />
                <Route element={<Clubs />} path="clubs" />
                <Route element={<Analytics />} path="analytics" />
                <Route element={<Ban />} path="Ban" />
                <Route element={<Apiban />} path="banner" />
                <Route element={<User />} path="users/user/:username" />
              </Route>
            ) : (
              <>
                {/* // <Route path="/home" element={<Home />} /> */}
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/home" element={<Homee />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/videcall" element={<VideoCall />} />
                <Route path="/donate" element={<Donation />} />
                <Route
                  path="/news"
                  element={
                    <NewsCards
                      newsArticles={newsArticles}
                      activeArticle={activeArticle}
                    />
                  }
                />

                {/* <Route
                  path="/message"
                  element={<Chat socket={socket} user={auth} />}
                /> */}
              </>

              // <Route path="/home" element={<FaceDetection />} />
            )}
          </>
        ) : (
          <>
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ForgetP" element={<ForgetP />} />
            <Route path="/resetP" element={<ResetP />} />
            <Route path="/Mini" element={<Mini />} />
          </>
        )}
        <Route path="/userbanned" element={<Userbanned />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
