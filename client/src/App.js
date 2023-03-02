/* eslint-disable */
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import LandingPage from "./pages/LandingPage";
// import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import { api } from "./api";
import Dashboard from "./pages/Dashboard";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log("useffect")
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        user_id: cookies["UserId"],
        requested_id: cookies["UserId"],
      };
      if (!params.user_id) {
        return;
      }
      const data = await api.getSelf(params);

      if (isSubscribed) {
        setUser(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => {
      isSubscribed = false;
      // console.log("cleanup")
    };
  }, [cookies["UserId"]]);

  // console.log(user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user && !user.profile_completed && (
            <Route
              path="/dashboard"
              element={<Navigate to="/createprofile" />}
            />
          )}
          {user && !user.profile_completed && (
            <Route path="/profile" element={<Navigate to="/createprofile" />} />
          )}
          {user && !user.profile_completed && (
            <Route
              path="/editprofile"
              element={<Navigate to="/createprofile" />}
            />
          )}
          {user && user.profile_completed && (
            <Route
              path="/createprofile"
              element={<Navigate to="/dashboard" />}
            />
          )}
          <Route exact path="/" element={<LandingPage />} />
          {/* <Route
            path="/signup"
            element={
              <>
                <Navbar user={user} solid={false} />{" "}
                {!cookies["UserId"] && <Signup />}
                {cookies["UserId"] && <Navigate to="/dashboard" />}
              </>
            }
          /> */}
          {/* <Route
            path="/login"
            element={
              <>
                <Navbar user={user} solid={false} />
                {!cookies["UserId"] && <Login />}
                {cookies["UserId"] && <Navigate to="/dashboard" />}
              </>
            }
          /> */}
          <Route
            path="/createprofile"
            element={
              <>
                {cookies["UserId"] && <CreateProfile />}
                {!cookies["UserId"] && <Navigate to="/" />}
              </>
            }
          />
          <Route
            path="/editprofile"
            element={
              <>
                {cookies["UserId"] && <EditProfile user={user} />}
                {!cookies["UserId"] && <Navigate to="/" />}
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                {cookies["UserId"] && (
                  <>
                    <Navbar user={user} solid={true} />
                    <Dashboard />
                  </>
                )}
                {!cookies["UserId"] && <Navigate to="/" />}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {cookies["UserId"] && (
                  <>
                    <Navbar user={user} solid={true} />
                    <Profile user={user} />
                  </>
                )}
                {!cookies["UserId"] && <Navigate to="/" />}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
