//import React from 'react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [data, setData] = useState([]); // Your spreadsheet data

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };


  useEffect(() => {
  fetch(`/api/accounts`)
  .then((response) => response.json())
  .then((data) => setData(data))
  .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
          <li className="nav-item">
            <Link href="/transactions" passHref>
              <div className="nav-link">Transactions</div>
            </Link>
          </li>

        <li className="nav-item">
        <div className="nav-link">
          <select
            value={selectedAccount}
            onChange={handleAccountChange}
            className="dracula-input" 
          >
            <option value="" disabled>Select an Account</option>
            {data.map((account) => (
              <option key={account.accountId} value={account.accountId}>
                {account.accountNameOwner}
              </option>
            ))}
          </select>
        </div>
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
          <li className="nav-item">
            <Link href="/logout" passHref>
              <div className="nav-link">Logout</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
