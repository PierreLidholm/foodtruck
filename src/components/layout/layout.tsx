import { Outlet } from "react-router-dom";
import Header from "../shared/Header";

function Layout() {
  return (
    <>
      <Header />
      <main className="bg-transparent"  role="main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
