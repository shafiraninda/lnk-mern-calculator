import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/Login/Login';
import Signup from "./pages/Signup/Signup";
import Calculator from "./pages/Calculator/Calculator";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Calculator />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
