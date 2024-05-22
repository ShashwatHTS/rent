import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Appbar from "./components/Appbar";
import PropertyAddForm from "./components/PropertyAddForm";
import PropertyPage from "./pages/PropertyPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProtectedRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />

        <Route path="/addproperty" element={<PropertyAddForm />} />
        <Route path="/edit-property/:id" element={<PropertyAddForm updateForm />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={<ProtectedRoutes to="/signin" />}
        >

        </Route>

      </Routes>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
