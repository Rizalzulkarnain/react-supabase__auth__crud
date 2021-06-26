import Header from './Header';
import Footer from './Footer';

import '../../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
