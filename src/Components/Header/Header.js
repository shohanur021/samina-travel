import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    <header className="container mb-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="container-fluid">
        <h2 className="appNameStyle">Samina Travels</h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"           aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item nav-margin">
                <Link className="nav-link active" aria-current="page"  to="/home">Home</Link>
              </li>
              <li className="nav-item nav-margin">
                <Link className="nav-link" aria-current="page" to="/">Destination</Link>
              </li>
              <li className="nav-item nav-margin">
                <Link className="nav-link" aria-current="page" to="/">Blog</Link>
              </li>
              <li className="nav-item nav-margin">
                <Link className="nav-link" aria-current="page" to="/">Contact</Link>
              </li>
              {
                loggedInUser.name ? <p className="mt-2 text-info font-italic">{loggedInUser.name}</p> : <li className="nav-item nav-margin">
                <Link to="/login"><button type="button" className="btn btn-primary"> Login </button></Link></li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;