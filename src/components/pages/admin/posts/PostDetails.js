import { BASE_URL } from "../../../../constants/api";
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

export default function PostDetails() {
  const { state, setDetails, setComments } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);
  const [key, setKey] = useState("comment");

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
        } else {
          setError("Something went wrong in the API request");
        }
      } catch (error) {
        setError(error.toString());
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPostDetails();
  }, [url]);

  if (loading) {
    return <p>Just a minute...</p>;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <div className="post-container ">
        <Col md={12} className="column-middle">
          <Heading title={`${state.details.author.name}'s post`} />
          <h2>{state.details.title}</h2>
          <ImagePost image={state.details.media} />
          <p className="post-details-text">{state.details.body}</p>

          {state.details.reactions.map((react, index) => {
            return (
              <span key={index}>
                {react.symbol}
                {react.count}
              </span>
            );
          })}

          <div className="comment-container">
            {state.comments.map((comment) => {
              return (
                <div key={comment.id}>
                  <span>
                    {comment.owner}: {comment.body}
                  </span>
                </div>
              );
            })}
            <ReactPost />

            <CommentPost />
          </div>
        </Col>
      </div>
    </>
  );
}
