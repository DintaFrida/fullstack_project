import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;