import { normalize, schema } from "normalizr";
import _ from "lodash";

import { FETCH_POSTS, DELETE_POSTS, ADD_POST, FETCH_POST_CONTENT } from "../actions";

const postsSchema = new schema.Entity('posts');

const defaultState = {
  entries: {},
  order: []
};

export default function postsReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_POSTS: {
      const posts = action.payload.data;

      const postsArray = [];

      posts.forEach((post) => {
        const data = {
          title: post.title,
          id: post._id,
        };

        postsArray.push(data);
      });

      const normalizedPosts = normalize(postsArray, [postsSchema]);

      return {
        entries: normalizedPosts.entities.posts,
        order: normalizedPosts.result
      };
    }
    case FETCH_POST_CONTENT: {
      const post = action.payload.data;

      const postData = {
        title: post.title,
        categories: post.categories,
        id: post._id,
        content: post.content
      };

      return {
        entries: { ...state.entries, [action.payload.data._id]: postData },
        order: _.union([...state.order], [action.payload.data._id])
      };
    }
    case DELETE_POSTS: {
      const postsOrder = state.order.filter((post) => post.id !== action.payload.data);

      return {
        entries: _.omit(state.entries, action.payload.data),
        order: [postsOrder]
      };
    }
    case ADD_POST: {
      const post = action.payload.data;

      const postData = {
        title: post.title,
        categories: post.categories,
        id: post._id,
        content: post.content
      };

      return {
        entries: { ...state.entries, [action.payload.data._id]: postData },
        order: _.union([...state.order], [action.payload.data._id])
      };
    }
    default:
      return state;
  }
}
