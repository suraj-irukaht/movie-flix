import Footer from './Footer';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <>
         <div className="relative w-full overflow-hidden">
            <Header />
            <main>{children}</main>
            <Footer />
         </div>
      </>
   );
};

export default Layout;
