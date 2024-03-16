import React from 'react';
import { Container, Row, Col, Button, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

function Home() {
  const { user } = useUserContext();
  return (
    <Container className="Home d-flex vh-100 align-items-center justify-content-center">
      <Row>
        <Col className="text-center">
          <h1>Jobly</h1>
          <h4 className="mt-4">All the jobs in one, convenient place</h4>
          {
            (user) ?
              (
                <div>
                  <h3 className="mt-4">Welcome back, {user.username}!</h3>
                  <div >
                    <Nav className="mt-4 justify-content-center">
                      <NavItem >
                        <NavLink tag={Link} to="/companies">
                          <Button color="primary" className="me-2">Companies</Button>
                        </NavLink>
                      </NavItem>
                      <NavItem >
                        <NavLink tag={Link} to="/jobs">
                          <Button color="primary">Jobs</Button>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </div>
              ) : (
                <div>
                  <Nav className="mt-4 justify-content-center"> 
                    <NavItem>
                      <NavLink tag={Link} to="/signup">
                        <Button color="primary" className="me-2">Signup</Button>
                      </NavLink>
                    </NavItem>
                    <NavItem>
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
