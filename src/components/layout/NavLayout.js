import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavUser from "../pages/admin/user/NavUser";

export default function NavLayout() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setAuth(null);
    navigate("/");
  };
  return (
    <Navbar expand="lg">
      <Container className="navbar-container">
        <Navbar.Brand href="/">Code-4</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 justify-content-evenly">
            {auth ? (
              <>
                <div className="admin-container">
                  <NavLink to="/posts">Posts</NavLink>
                  <NavLink to="/profiles">Profiles</NavLink>
                  <NavLink to="/new-post">New post</NavLink>
                </div>
                <div className="user-container">
                  <NavUser />
                  {""}
                  <button onClick={logout} className="cta-logout">
                    Log out
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
