import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <div className="left-menu">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/payments">
            <a>Payments</a>
          </Link>
          <Link href="/payments-required">
            <a>PaymentsRequired</a>
          </Link>
          <Link href="/free-form">
            <a>FreeForm</a>
          </Link>
          <Link href="/configuration">
            <a>Configuration</a>
          </Link>
        </div>
        <div className="right-menu">
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
