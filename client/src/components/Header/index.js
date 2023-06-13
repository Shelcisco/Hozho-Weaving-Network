import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-secondary mb-4 nav-flex-container">
      <div>
        <Link to="/">
          <h1><img src="/logo512.png" alt="logo" width="50"></img>Hózhó Weaving Network</h1>
        </Link>
      </div>
      <div  >
        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
