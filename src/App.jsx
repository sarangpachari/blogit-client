import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { tokenContext } from "./contexts/TokenAuth";
import AddEditPost from "./pages/AddEditPost";
import PostView from "./pages/PostView";

function App() {
  const { authorisedUser, setAuthorisedUser } = useContext(tokenContext);
  return (
    <>
      <div className="mx-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {authorisedUser && (
            <>
              <Route
                path="/dashboard"
                element={<Dashboard insideDashboard={true} />}
              />
              <Route path="/editor/:id" element={<AddEditPost />} />
              <Route path="/postView/:id" element={<PostView />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
