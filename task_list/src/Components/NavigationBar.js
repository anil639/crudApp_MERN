import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
const NavigationBar = () => {
  return (
    <div>
      <Navbar bg="primary">
        <Container>
          <Navbar.Brand href="/">Task List</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
