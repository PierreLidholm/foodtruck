import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "@pierre/core/router";

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
