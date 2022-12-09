import { useState, useEffect } from "react";
import useAxios from "../../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import Heading from "../../../layout/Heading";
import ErrorMessage from "../../../common/ErrorMessage";
import Banner from "../user/NoBanner";
import Avatar from "../user/NoAvatar";
import Follow from "./FollowProfile";
import Unfollow from "./UnfollowProfile";

export default function ProfileDetails() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);

  let { name } = useParams();

  const axios = useAxios();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(
          `profiles/${name}?_posts=true&_following=true&_followers=true`
        );
        setProfile(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="profile-details">
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

        <div className="d-flex justify-content-center gap-4 text-center">
          <div className="activity">
            <span className="d-block counters">Followers</span>
            <span className="counters-followers">
              {profile._count.followers}
            </span>
          </div>
          <div className="activity">
            <span className="d-block counters">Following</span>
            <span className="counters-following">
              {profile._count.following}
            </span>
          </div>
        </div>
      </div>
      <div className="activity-cta">
        <Follow />
        <Unfollow />
      </div>
    </div>
  );
}
