import React from 'react';
import Link from 'next/link';

export default function Navbar() {
// const Navbar = () => {
  return (
    <nav className="navbar">
      <button className="navbar-toggler">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/" passHref>
              <div className="nav-link">Home</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/payments" passHref>
              <div className="nav-link">Payments</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/paymentrequired" passHref>
              <div className="nav-link">PaymentRequired</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/freeform" passHref>
              <div className="nav-link">FreeForm</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/configure" passHref>
              <div className="nav-link">Configure</div>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="/signup" passHref>
              <div className="nav-link">Signup</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/login" passHref>
              <div className="nav-link">Login</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// export default Navbar;
