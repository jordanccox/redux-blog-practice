import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { addPost } from "../actions";

const postSchema = yup.object({
  title: yup.string().required().max(60),
  categories: yup.string(),
  content: yup.string().required().min(120)
});

export default function NewPost() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(postSchema)
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleFormSubmit = (input) => {
    const postData = {
      title: input.title,
      categories: input.categories.split(",").map((category) => category.trim()),
      content: input.content
    };

    dispatch(addPost(postData, () => {
          navigate("/");
        }));
  };

  return (
    <>
    <h3 className="mt-3">Add a new post</h3>
    <form onSubmit={handleSubmit(handleFormSubmit)}>
    <div className="mb-3">
      <label htmlFor="postTitle" className="form-label">Title</label>
      <input type="text" className="form-control" id="postTitle" placeholder="My Awesome Blog Post!" {...register('title', { required: true })} />
      <p style={{color: "red", fontWeight: "600"}}>{errors.title?.message}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="postCategories" className="form-label">Categories - (Separate with a comma)</label>
      <input type="text" className="form-control" id="postCategories" placeholder="health, fitness, lifestyle" {...register('categories')} />
      <p style={{color: "red", fontWeight: "600"}}>{errors.categories?.message}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="postContent" className="form-label">Post</label>
      <textarea className="form-control" id="postContent" rows="7" placeholder="What do you want to write about today?" {...register('content', { required: true })}></textarea>
      <p style={{color: "red", fontWeight: "600"}}>{errors.content?.message}</p>
    </div>
    <button type="submit" className="btn btn-primary">Create Post</button>
    </form>
    </>
  )
}