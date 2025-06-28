import { createBrowserRouter } from "react-router-dom";
import { MenuPage, Layout, CartPage, OrderPage, ReceiptPage } from "@pierre/pages";


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
      {
        path: "order/:id",
        element: <OrderPage />
      },
      {
        path: "receipt/:id",
        element: <ReceiptPage />
      }
    ],
  },
]);

export { routes };
