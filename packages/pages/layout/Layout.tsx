import { Outlet } from "react-router-dom";
import {Header} from "@pierre/base/ui";

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

export  { Layout };
