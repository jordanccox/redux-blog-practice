import { FETCH_POSTS, DELETE_POSTS, ADD_POST } from "../actions";

const defaultState = [
  {
    id: 1,
    title: "Starting 2021 Right",
    categories: ["health"],
    content: "I'm stating 2021 off the right way!",
  },
  {
    id: 2,
    title: "Learn to Code",
    categories: ["career", "coding", "javascript"],
    content: "I'm learning to code!",
  },
  {
    id: 3,
    title: "Get Rich Quick!",
    categories: ["finances"],
    content: "Save your money!",
  },
  {
    id: 4,
    title: "This is a post with no categories",
    categories: [],
    content: "Guess there's no categories my guy",
  },
];

export default function postsReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return state;
    case DELETE_POSTS: {
      const posts = state.filter((post) => post.id !== action.payload);

      return posts;
    }
    case ADD_POST: {
      const posts = [...state];

      posts.push(action.payload);

      return posts;
    }
    default:
      return state;
  }
}
