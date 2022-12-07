import { useStore } from "../../../../context/PostContext";
import { Link } from "react-router-dom";
import ImagePost from "./ImagePost";
import Col from "react-bootstrap/Col";
import Heading from "../../../layout/Heading";

import { ChatBubbleLeftRightIcon, HeartIcon } from "@heroicons/react/20/solid";

export default function PostsList() {
  const { state } = useStore();

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>{state.error}</div>;
  }

  return (
    <div className="container post-overview-container">
      <Heading title="Posts" />
      <Col md={12} className="column-middle">
        {state.posts.map((post) => {
          return (
            <>
              <div key={post.id} className="posts-container">
                <h2>{post.title}</h2>
                <p>{post.created}</p>
                <p>{post.body}</p>
                <ImagePost image={post.media} />
                <div className="d-inline-flex p-2">
                  <ChatBubbleLeftRightIcon className="icon icon-comment" />
                  <span className="post-count">{post._count.comments}</span>
                  <HeartIcon className="icon icon-heart" />
                  <span className="post-count">{post._count.reactions}</span>
                </div>
                <div className="btn-container">
                  <Link to={`/posts/${post.id}`} className="cta post-cta">
                    View Post
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </Col>
    </div>
  );
}
