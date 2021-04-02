import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import { NuHabit } from "./components/NuHabit"
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <NuHabit />
      </MuiPickersUtilsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
