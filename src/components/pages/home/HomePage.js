import { Link } from "react-router-dom";
import Slogan from "../../layout/Slogan";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <div className="home-container-body">
          <Slogan title="Code-4" />
          <p className="home-container-text">
            Ea DIY neutra, street art kombucha bushwick mlkshk coloring book
            incididunt la croix. Same street art poke shoreditch narwhal.
            Chillwave migas affogato slow-carb kinfolk truffaut. DSA tote bag
            portland, tilde squid nisi dolore master cleanse magna. Knausgaard
            banh mi freegan cornhole venmo banjo. Truffaut health goth la croix
            literally leggings officia praxis next level cupidatat tumblr tote
            bag velit YOLO. Cardigan culpa small batch sustainable same, veniam
            meh id freegan irure ut salvia before they sold out VHS.
          </p>
          <div className="home-container-buttons">
            <Link to={"/login"} className="cta">
              Login
            </Link>
            <Link to={"/register"} className="cta">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
