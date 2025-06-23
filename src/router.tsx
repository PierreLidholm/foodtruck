import { createBrowserRouter } from "react-router-dom";
import MenuPage from "./components/MenuPage";
import CartPage from "./components/CartPage";
import Layout from "./components/layout/layout";
import OrderPage from "./components/OrderPage";
import ReceiptPage from "./components/ReceiptPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <MenuPage />
        },
        {
          path: "cart",
          element: <CartPage />
        },
        {
          path: "order/:id",
          element: <OrderPage />
        },
        {
          path: "receipt/:id",
          element: <ReceiptPage />
        }
    ]
  },

]);

export default router;
