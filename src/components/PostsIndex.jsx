import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import PostsList from "./PostsList";

import { fetchPosts } from "../actions";

export default function PostsIndex() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPosts]);

  return (
    <>
      <div className="mt-4">
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post
        </Link>
      </div>
      <br />
      <h3>Posts</h3>
      <ul className="list-group">
        <PostsList />
      </ul>
    </>
  );
}
