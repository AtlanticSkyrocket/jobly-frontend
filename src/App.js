
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetails from "./CompanyDetails";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { Container, Col, Row } from "reactstrap";

import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <NavBar />
        <div className="App-background">
        <Container>
          <Row>
            <Col md="1"/>
            <Row className="justify-content-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/companies/:handle" element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>} />
                <Route exact path="/companies" element={<ProtectedRoute><CompanyList /></ProtectedRoute>} />
                <Route exact path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              </Routes>
            </Row>
              <Col md="1"/>
          </Row>
        </Container>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
