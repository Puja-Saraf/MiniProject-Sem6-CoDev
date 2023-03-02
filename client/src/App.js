/* eslint-disable */
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
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

import queryString from "query-string";

function App() {
  // const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState(null);

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    // console.log("useffect")
    // let isSubscribed = true;
    // const fetchData = async () => {
    //   const params = {
    //     user_id: items,
    //     requested_id: items,
    //   };
    //   if (!params.user_id) {
    //     return;
    //   }
    //   const data = await api.getSelf(params);

    //   if (isSubscribed) {
    //     setUser(data.data);
    //   }
    // };
    // fetchData().catch(console.error);

    // return () => {
    //   isSubscribed = false;
    //   // console.log("cleanup")
    // };

    var query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      navigate("/dashboard");
   }
  //  const items = JSON.parse(localStorage.getItem('jwt'));
  // if (items) {
  //  setUser(items);
  // }
  }, [location.search]);

  // console.log(user);

  const items = JSON.parse(localStorage.getItem('jwt'));

  return (
    <div className="App">
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
                {!items && <Signup />}
                {items && <Navigate to="/dashboard" />}
              </>
            }
          /> */}
          {/* <Route
            path="/login"
            element={
              <>
                <Navbar user={user} solid={false} />
                {!items && <Login />}
                {items && <Navigate to="/dashboard" />}
              </>
            }
          /> */}
          <Route
            path="/createprofile"
            element={
              <>
                {items && <CreateProfile />}
                {!items && <Navigate to="/" />}
              </>
            }
          />
          <Route
            path="/editprofile"
            element={
              <>
                {items && <EditProfile user={user} />}
                {!items && <Navigate to="/" />}
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                {items && (
                  <>
                    <Navbar user={user} solid={true} />
                    <Dashboard />
                  </>
                )}
                {!items && <Navigate to="/" />}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {true && (
                  <>
                    <Navbar user={user} solid={true} />
                    <Profile user={user} />
                  </>
                )}
                {/* {!items && <Navigate to="/" />} */}
              </>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
