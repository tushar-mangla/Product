import React, { Fragment, useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./App.css";

import Layout from "./components/UI/Layout";
import Landing from "./components/layout/Home";
import Contact from "./components/layout/Contact";
import About from "./components/layout/About";
import Contest from "./components/layout/Contest";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Alert from "./components/layout/Alert";

import { Provider } from "react-redux";
import store from "./store.jsx";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// const Home = React.lazy(() => import("./components/layout/Landing"));
// const About = React.lazy(() => import("./components/layout/About"));
// const Contest = React.lazy(() => import("./components/layout/Contest"));
// const Contact = React.lazy(() => import("./components/layout/Contact"));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Layout>
          <section>
            <Alert />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="contest" element={<Contest />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </section>
        </Layout>
      </Fragment>
    </Provider>
  );
};

export default App;
