import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { BrowserRouter, Route, Link, Switch, useHistory } from "react-router-dom"
import reactDom from 'react-dom';
import { Logout } from '../auth/Logout'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: theme.navBarHeight
  },
  tabBar: {
    top: '80px'
  },
  rightAlign: {
    marginLeft: 'auto',
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  let history = useHistory()


  return (
    <div className={classes.root}>

        <BrowserRouter>
            <Route path="/">
                <AppBar position="static">
                  <div className="navContainer" label={<span style={{display: 'flex'}} />}>
                    <Tabs value={value} className="navLinks" onChange={handleChange} aria-label="simple tabs example">
                    <Tab label={<span style={{ color: 'black' }}>Habits</span>} value="habit" className="navLink" onChange={handleChange} 
                      onClick={() => {
                        history.push("/habits")
                      }}
                      component={Link} to="/habits"/>
                    <Tab label={<span style={{ color: 'black' }}>Progress</span>} value="progress" className="navLink" onChange={handleChange} 
                        onClick={() => {
                        history.push("/progress")
                        }} 
                        component={Link} to="/progress" />
                      
                    <Tab label={<span style={{ color: 'black'}}>Log Out</span>} value="logOut" className={classes.rightAlign} onChange={handleChange} 
                      onClick={() => {
                      localStorage.removeItem('nuhabit_user')
                      history.push("/login")
                      }} 
                      component={Link} to="/progress" />
                    </Tabs>
                  </div>
                </AppBar>
            </Route>
            <Switch>
              <Route path={value} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById("root");
reactDom.render(<TabPanel />, rootElement)