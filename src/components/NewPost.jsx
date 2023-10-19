import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addPost } from "../actions";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [categoriesUI, setCategoriesUI] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");

  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const nextIdInSequence = () => {
    const highestPostId = posts.reduce((highestPostId, post) => Math.max(post.id, highestPostId), Number.MIN_VALUE);

    return highestPostId + 1;
  };

  const postData = {
    id: nextIdInSequence(),
    title: title,
    categories: categories,
    content: content
  };

  const navigate = useNavigate();

  const handleCreatePost = () => {
    dispatch(addPost(postData));
    navigate("/");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoriesChange = (event) => {
    setCategoriesUI(event.target.value);

    const categoriesString = event.target.value;

    const categoriesArray = categoriesString.split(",").map((category) => category.trim());

    setCategories(categoriesArray);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <>
    <h3 className="mt-3">Add a new post</h3>
    <div className="mb-3">
      <label htmlFor="postTitle" className="form-label">Title</label>
      <input type="text" className="form-control" id="postTitle" placeholder="My Awesome Blog Post!" value={title} onChange={handleTitleChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="postCategories" className="form-label">Categories - (Separate with a comma)</label>
      <input type="text" className="form-control" id="postCategories" placeholder="health, fitness, lifestyle" value={categoriesUI} onChange={handleCategoriesChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="postContent" className="form-label">Post</label>
      <textarea className="form-control" id="postContent" rows="7" placeholder="What do you want to write about today?" value={content} onChange={handleContentChange}></textarea>
    </div>
    <button type="submit" className="btn btn-primary" onClick={handleCreatePost}>Create Post</button>
    </>
  )
}