import noBanner from "../../../../images/nobanner.jpg";

export default function Banner(props) {
  return (
    <div
      style={{
        backgroundImage: `url(${
          props.image !== "" && props.image !== null ? props.image : noBanner
        })`,
      }}
      className={props.class}
    >
      {props.children}
    </div>
  );
}
