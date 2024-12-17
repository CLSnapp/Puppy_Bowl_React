import React from "react";
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <div className="navbar">
      <ul className="nav">
        <Link className="btn-primary" to="/players">
          Puppy Form
        </Link>

        {/* <li>
          <Link className="btn-primary" to={"/players/:id"}>
            Puppy Details
          </Link>
        </li> */}

        <Link className="btn-primary" to="/">
          Puppy List
        </Link>
      </ul>
    </div>
  );
}
