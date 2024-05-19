import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../app/slices/userSlice";
function Header() {
  const dispatch = useDispatch();

  const myPassport = useSelector(getUserData);
  const token = myPassport?.token;

  const logMeOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand className="title" href="/">
          TATOO GARAGE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">About Us</Nav.Link>
            <Nav.Link href="#link">Gallery</Nav.Link>
            <NavDropdown title="Log In" id="basic-nav-dropdown">
              {token ? (
                <NavDropdown.Item onClick={() => logMeOut()}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <p></p>
              )}
              <NavDropdown.Item
                href="/login"
                className={location.pathname === "/login" ? "elementTest" : ""}
              >
                Login
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/register"
                className={
                  location.pathname === "/register" ? "elementTest" : ""
                }
              >
                Register
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
