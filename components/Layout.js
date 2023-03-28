// import loadable from "@loadable/component";
import Header from "../components/Header";
import Footer from "../components/Footer";
// const Footer = loadable(() => import("./Footer"));

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
