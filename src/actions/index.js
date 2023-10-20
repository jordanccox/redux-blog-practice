import axios from "axios";

export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST_CONTENT = "FETCH_POST_CONTENT";
export const DELETE_POSTS = "DELETE_POSTS";
export const ADD_POST = "ADD_POST";

export const ROOT_URL = "https://parsity-blog-server.herokuapp.com";

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchPostContent(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`);

  return {
    type: FETCH_POST_CONTENT,
    payload: request
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POSTS,
    payload: id
  };
}

export function addPost(data) {
  return {
    type: ADD_POST,
    payload: data
  };
}