import Header from './Header';
import Cart from './Cart';
import Footer from './Footer';
const Layout = ({ children }) => {
 return (
    <div>
       <Header />
       {children}
       <Footer />
    </div>
 );
};
export default Layout;