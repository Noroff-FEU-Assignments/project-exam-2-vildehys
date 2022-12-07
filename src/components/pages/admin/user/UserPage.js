import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import Heading from "../../../layout/Heading";
import ErrorMessage from "../../../common/ErrorMessage";
import UpdateForm from "./UpdateForm";
import DeletePost from "./DeletePost";
import Avatar from "./NoAvatar";
import Banner from "./NoBanner";
import Settings from "./Settings";
import SettingsModal from "../../../layout/SettingsModal";
import ImagePost from "../posts/ImagePost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function UserProfile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});

  let { name } = useParams();

  const axios = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axios.get(
          `profiles/${name}?_posts=true&_following=true&_followers=true`
        );
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfile();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="user-profile-container">
      <div className="banner-container">
        <Banner image={profile.banner} class={"user-profile-banner"} />
      </div>
      <div className="d-flex flex-column align-items-center user-content">
        <Avatar
          image={profile.avatar}
          class={"user-avatar"}
          alt={profile.name}
        />

        <Heading title={profile.name} />
        <span>{profile.email}</span>
        <Settings />

        <div className="d-flex justify-content-center gap-4 text-center">
          <div className="activity">
            <span className="d-block count-follow-text">Followers</span>
            <span className="count-follow post-count">
              {profile._count.followers}
            </span>
          </div>
          <div className="activity">
            <span className="d-block count-follow-text">Following</span>
            <span className="count-follow post-count">
              {profile._count.following}
            </span>
          </div>
        </div>
      </div>
      <Container>
        <Row>
          {profile.posts.map((post, index) => {
            return (
              <Col col-6 col-md-4>
                <div className="posts-container">
                  <div key={index}>
                    <h2>{post.title}</h2>
                    <ImagePost image={post.media} />
                    <p>{post.body}</p>
                    <span>{post.created}</span>
                    <div className="d-flex gap-5">
                      <button
                        className="cta"
                        onClick={() => {
                          setModalData(post);
                          setModalShow(true);
                        }}
                      >
                        Update
                      </button>
                      <DeletePost id={post.id} />
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      <SettingsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        heading="Update post"
      >
        <UpdateForm
          id={modalData.id}
          title={modalData.title}
          body={modalData.body}
        />
      </SettingsModal>
    </div>
  );
}
