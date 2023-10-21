import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import _ from "lodash";

export default function PostsList() {
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  if (!_.isEmpty(posts)) {
    return posts.order.map((postID, index) => {
      return (
        <li className="list-group-item" key={index}>
          <Link to={`/posts/${postID}`}>
            {posts.entries[postID]?.title}
          </Link>
        </li>
      );
    });
  } else {
    return <div>No posts to show</div>
  }
}