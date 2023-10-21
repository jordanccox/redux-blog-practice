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

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`);

  request.then(() => callback());

  return {
    type: DELETE_POSTS,
    payload: request
  };
}

export function addPost(data, callback) {
  const request = axios.post(`${ROOT_URL}/posts`, data);

  request.then(() => callback());

  return {
    type: ADD_POST,
    payload: request
  };
}