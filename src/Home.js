import React from 'react';
import { Container, Row, Col, Button, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

function Home() {
  const { user } = useUserContext();
  return (
    <Container className="Home d-flex vh-100">
      <Row className="m-auto align-self-center">
        <Col className="text-center">
          <h3>Jobly</h3>
          <span>All the jobs in one, convenient place</span>
          {
            (user) ?
              (
                <div className="mt-4">
                  <Nav>
                    <NavItem className="d-inline-flex">
                      <NavLink tag={Link} to="/companies">
                        <Button color="primary" className="me-2">Companies</Button>
                      </NavLink>
                    </NavItem>
                    <NavItem className="d-inline-flex">
                      <NavLink tag={Link} to="/jobs">
                        <Button color="primary">Jobs</Button>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              ) : (
                <div className="mt-4">
                  <Nav>
                    <NavItem className="d-inline-flex">
                      <NavLink tag={Link} to="/signup">
                        <Button color="primary" className="me-2">Signup</Button>
                      </NavLink>
                    </NavItem>
                    <NavItem className="d-inline-flex">
                      <NavLink tag={Link} to="/login">
                        <Button color="primary">Login</Button>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              )
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
