import '../styles/global.scss';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <ToastContainer />
    <Header />
    <Component {...pageProps} />
  </>
  )

}

export default MyApp
