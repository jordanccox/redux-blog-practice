import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";

export default function PostsList() {
  const posts = useSelector((state) => state.posts);

  if (posts.length > 0) {
    return posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  } else {
    return <div>No posts to show</div>
  }
}