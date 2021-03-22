import React from "react";
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import ResponsiveDrawer from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews";
import "./NuHabit.css";
import { Route, Redirect } from "react-router-dom";


export const NuHabit = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("nuhabit_user")) {
          return (
            <>
              <ResponsiveDrawer />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);