import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="h-100" role="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
