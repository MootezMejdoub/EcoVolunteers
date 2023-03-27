import React, { useEffect, useState } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { getPostsFromFacebook } from "../../api/PostsRequests";
import PostFb from "../Post/PostFb";

const Posts = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const params = useParams();
  const dispatch = useDispatch();
  const [fbPosts, setFbPosts] = useState([]);

  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(auth._id));
  }, []);
  useEffect(() => {
    const getFbPosts = async () => {
      try {
        const { data } = await getPostsFromFacebook();
        console.log(data);
        setFbPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFbPosts();
  }, []);
  useEffect(() => {}, [fbPosts]);
  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {fbPosts.length === 0 ? (
        <div class="loader"></div>
      ) : (
        fbPosts.map((fbpost) => {
          return <PostFb data={fbpost} key={fbpost.id} />;
        })
      )}
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
