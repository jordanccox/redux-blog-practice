import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { addPost } from "../actions";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [categoriesUI, setCategoriesUI] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const validFields = (data) => {
    const errorMessages = _.reduce(data, (acc, field, key) => {
      if (!field || field.length <= 0) {
        acc[key] = { message: `The ${key} field is required`};
      }

      if (key === "title" && field.length > 120) {
        acc[key] = { message: `The title field must not be more than 120 characters` };
      }

      return acc;
    }, {});

    setErrors(errorMessages);

    return _.isEmpty(errorMessages);
  };

  const postData = {
    title: title,
    categories: categories,
    content: content
  };

  const navigate = useNavigate();

  const handleCreatePost = () => {
    if (!validFields(postData)) {
      return "Error message here";
    }

    dispatch(addPost(postData, () => {
      navigate("/");
    }));
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
      <p style={{color: "red", fontWeight: "600"}}>{errors.title?.message}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="postCategories" className="form-label">Categories - (Separate with a comma)</label>
      <input type="text" className="form-control" id="postCategories" placeholder="health, fitness, lifestyle" value={categoriesUI} onChange={handleCategoriesChange} />
      <p style={{color: "red", fontWeight: "600"}}>{errors.categories?.message}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="postContent" className="form-label">Post</label>
      <textarea className="form-control" id="postContent" rows="7" placeholder="What do you want to write about today?" value={content} onChange={handleContentChange}></textarea>
      <p style={{color: "red", fontWeight: "600"}}>{errors.content?.message}</p>
    </div>
    <button type="submit" className="btn btn-primary" onClick={handleCreatePost}>Create Post</button>
    </>
  )
}