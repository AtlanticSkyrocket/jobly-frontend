import { useNavigate, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { useUserContext } from './UserContext';

function NavBar() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <Navbar>
        <NavbarBrand tag={Link} to="/">Jobly</NavbarBrand>
        <Nav>
          {!user ? (
            <>
              <NavItem>
                <NavLink tag={Link} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signup">Signup</NavLink>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink tag={Link} to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem> 
                <NavLink onClick={handleLogout} href="/" style={{ cursor: 'pointer' }}>
                  Logout {user.username}
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;