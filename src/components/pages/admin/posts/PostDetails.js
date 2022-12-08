import React from "react";
import { BASE_URL } from "../../../../constants/Api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useStore } from "../../../../context/PostContext";
import { useParams } from "react-router-dom";
import Heading from "../../../layout/Heading";
import CommentPost from "./CommentPost";
import ReactPost from "./ReactPost";
import ImagePost from "./ImagePost";
import Col from "react-bootstrap/Col";
import ErrorMessage from "../../../common/ErrorMessage";
import Reactions from "./ReactionPost";

export default function PostDetails(post) {
  const { state, setDetails, setComments } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);
  const [key, setKey] = useState("comment");
  const [reactions, setReactions] = React.useState(post.reactions);

  let { id } = useParams();

  const url =
    BASE_URL + `posts/${id}?_author=true&_comments=true&_reactions=true`;

  useEffect(() => {
    async function getPostDetails() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const json = await response.json();
          setDetails(json);
          setComments(json.comments);
          setReactions(json.reactions);
        } else {
          setError("Ooops. Something went wrong.");
        }
      } catch (error) {
        setError(error.toString());
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPostDetails();
    // eslint-disable-next-line
  }, [url]);

  if (loading) {
    return <p>Just a minute...</p>;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <div key={state.id} className="post-container">
        <Col md={12} className="post-column">
          <Heading title={`${state.details.author.name}'s post`} />
          <h2>{state.details.title}</h2>
          <ImagePost image={state.details.media} />
          <p className="post-details-text">{state.details.body}</p>

          <div className="comment-container">
            {state.comments.map((comment) => {
              console.log(state.comments);
              return (
                <div key={comment.id}>
                  <span className="comment">
                    {comment.owner}: {comment.body}
                  </span>
                </div>
              );
            })}
            <Reactions reactions={reactions} />
            <ReactPost
              post={state}
              setReactions={setReactions}
              reactions={state.details.reactions}
            />
            <CommentPost />
          </div>
        </Col>
      </div>
    </>
  );
}
