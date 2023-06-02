// This component will return header jsx, also needs to include logout button functionality similar to Header in 24-Stu_Decode-JWT

import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <div>
                    <Link className="text-light" to="/">
                        <h1 className="m-0">Hózhó Weaving Network</h1>
                    </Link>
                    <p className="m-0">Connect and share with the Native American fiber arts community.</p>
                </div>
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <span>Hello, {Auth.getProfile().data.username}!</span>
                            <button className="btn btn-lg btn-light m-2" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-lg btn-info m-2" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-lg btn-light m-2" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
