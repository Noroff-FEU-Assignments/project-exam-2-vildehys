import useAxios from "../../../../hooks/useAxios";
import { useEffect, useState } from "react";
import ErrorMessage from "../../../common/ErrorMessage";
import { Link } from "react-router-dom";
import Avatar from "../user/NoAvatar";
import Banner from "../user/NoBanner";
import Col from "react-bootstrap/Col";
import Heading from "../../../layout/Heading";

export default function ProfilesList() {
  const [profiles, viewProfiles] = useState([]);
  const [setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axios = useAxios();

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await axios.get("profiles/");

        viewProfiles(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
      if (error) return <ErrorMessage />;
    }

    fetchProfiles();
  }, []);

  return (
    <div className="profile-overview-container">
      <Col md={12} className="column-center">
        <Heading title="Profile overview" />
        {profiles.map((profile, index) => {
          return (
            <div key={profile.id} className="profiles-container">
              <Link to={`/profile/${profile.name}`} className="profiles-card">
                <h2>{profile.title}</h2>
                <Banner image={profile.banner} class={"profiles-banner"}>
                  <Avatar
                    image={profile.avatar}
                    class={"avatar"}
                    alt={profile.name}
                  />
                </Banner>{" "}
                <h2>{profile.name}</h2>
                <p>{profile.email}</p>
                <span>{profile.created}</span>
                <div className="d-inline-flex p-2">
                  <span className="count-follow profile-count">
                    {profile._count.followers} Followers
                  </span>
                </div>
                <div className="d-inline-flex p-2">
                  <span className="count-follow profile-count">
                    {profile._count.following} Following
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </Col>
    </div>
  );
}