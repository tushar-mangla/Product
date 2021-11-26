import { NavLink } from "react-router-dom";

import { Navbar, Container, Nav, Button, ButtonGroup } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink type="button" to="/">
              Home
            </NavLink>{" "}
            <NavLink type="button" to="/about">
              About
            </NavLink>{" "}
            <NavLink type="button" to="/contest">
              Contest
            </NavLink>{" "}
            <NavLink type="button" to="/contact">
              Contact
            </NavLink>
          </Nav>
          <Nav>
            <ButtonGroup aria-label="Basic example">
              {" "}
              <NavLink to="/login">
                <Button variant="secondary">Login</Button>
              </NavLink>{" "}
              <NavLink to="/register">
                <Button variant="secondary">Register</Button>
              </NavLink>{" "}
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

// import { Link, NavLink } from "react-router-dom";

// import {
//   Navbar,
//   Container,
//   Nav,
//   Button,
//   NavDropdown,
//   Form,
//   FormControl,
//   ButtonGroup,
// } from "react-bootstrap";

// const Navigation = () => {
//   return (
//     <Navbar bg="light" expand="lg">
//       <Container sm>
//         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           >
//             <Nav.Link href="#action1">Home</Nav.Link>
//             <Nav.Link href="#action2">Link</Nav.Link>

//             <Nav.Link href="#" disabled>
//               Link
//             </Nav.Link>
//           </Nav>
//           <ButtonGroup aria-label="Basic example">
//             {" "}
//             <Button variant="secondary" to="/login">
//               Login
//             </Button>{" "}
//             <Button variant="secondary" to="/register">
//               Register
//             </Button>
//           </ButtonGroup>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;
