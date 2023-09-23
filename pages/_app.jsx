import '../styles/styles.scss';
import Navbar from '../components/Navbar';

export default function FinanceApp({ Component, pageProps }) {
    return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
  // return <Component {...pageProps} />;
}

// export default FinanceApp;
