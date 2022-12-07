import { Link } from "react-router-dom";
export default function UserProfile() {
  const user = JSON.parse(localStorage.getItem("auth"));

  return (
    <Link to={`/user/${user.name}`} className="user-link">
      <span className="username">{user.name}</span>
    </Link>
  );
}
