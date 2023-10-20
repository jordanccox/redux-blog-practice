import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { deletePost, fetchPostContent } from "../actions";
import { useEffect } from "react";

export default function PostsShow() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = location.pathname.replace("/posts/", "");

  useEffect(() => {
    dispatch(fetchPostContent(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const selectedPost = useSelector(state => {
    return state.posts.find((post) => post.id === id)
  });

  console.log(selectedPost) //testing

  if (!selectedPost) {
    return <NotFound />
  }

  const handleDelete = () => {
    dispatch(deletePost(selectedPost.id));
    navigate("/");
  };

  const renderCategories = () => {
    if (selectedPost.categories.length <= 0) {
      return <i>None</i>
    }

    return selectedPost.categories.map((category, index) => {
      if (selectedPost.categories.length > 1 && index < selectedPost.categories.length - 1) {
        return (
          <span key={index}>{category}, </span>
        );
      }
      return (
        <span key={index}>{category}</span>
      );
    });
  };

  return (
    <>
      <Link to="/">Back to index</Link>
      <br />
      <br />
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Post
      </button>
      <br />
      <br />
      <h3>{selectedPost.title}</h3>
      <h6><strong>Categories:</strong> {renderCategories()} </h6>
      <p>{selectedPost.content}</p>
    </>
  );
}
