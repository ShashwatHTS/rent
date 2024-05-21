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

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/addproperty" element={<PropertyAddForm />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
