export const FETCH_POSTS = "FETCH_POSTS";
export const DELETE_POSTS = "DELETE_POSTS";
export const ADD_POST = "ADD_POST";

export function fetchPosts() {
  return {
    type: FETCH_POSTS
  };
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