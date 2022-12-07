import noAvatar from "../../../../images/noAvatar.png";

export default function Avatar(props) {
  return (
    <img
      className="user-avatar"
      src={props.image !== "" && props.image !== null ? props.image : noAvatar}
      alt={props.alt + `avatar`}
    />
  );
}
