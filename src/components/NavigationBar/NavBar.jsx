import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <ul className="navlist">
        <li>
          <Link className="btn-primary" to="/players">
            Add a Puppy
          </Link>
        </li>
        <li>
          <Link className="btn-primary" to="/">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
}
