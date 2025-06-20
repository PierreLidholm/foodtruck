import { createBrowserRouter } from "react-router-dom";
import MenuPage from "./components/MenuPage";
import CartPage from "./components/CartPage";
import Layout from "./components/layout/layout";
import OrderPage from "./components/OrderPage";

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
        }
    ]
  },

]);

export default router;
