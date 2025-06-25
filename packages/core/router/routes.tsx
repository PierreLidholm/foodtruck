import { createBrowserRouter } from "react-router-dom";
import { MenuPage, Layout, CartPage } from "@pierre/pages";

// import Layout from "./components/layout/layout";
// import OrderPage from "./components/OrderPage";
// import ReceiptPage from "./components/ReceiptPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MenuPage />,
      },
      {
        path: "cart",
        element: <CartPage />
      },
      // {
      //   path: "order/:id",
      //   element: <OrderPage />
      // },
      // {
      //   path: "receipt/:id",
      //   element: <ReceiptPage />
      // }
    ],
  },
]);

export { routes };
