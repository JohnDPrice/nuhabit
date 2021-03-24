import React from "react";
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import ResponsiveDrawer from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews";
import "./NuHabit.css";
import { Route, Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffca33',
      main: '#ffbd00',
      contrastText: '#b28400',
    },
    secondary: {
      light: '#ff7633',
      main: '#ff5400',
      contrastText: '#bd23a00',
    }
  },
});


export const NuHabit = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("nuhabit_user")) {
          return (
            <>
              <ThemeProvider theme={theme}>
              <ResponsiveDrawer />
              <ApplicationViews />
              </ThemeProvider>
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