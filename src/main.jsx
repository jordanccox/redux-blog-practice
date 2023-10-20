import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import promise from "redux-promise";

import rootReducer from "./reducers/rootReducer";
import Header from "./components/Header";
import PostsIndex from "./components/PostsIndex";
import NotFound from "./components/NotFound";
import PostsShow from "./components/PostsShow";
import NewPost from "./components/NewPost";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<PostsIndex />} />
            <Route path="posts/:id" element={<PostsShow />} />
            <Route path="posts/new" element={<NewPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
