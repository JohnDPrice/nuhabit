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
import { browserHistory } from "react-router"


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
  },
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
                    <Tabs value={value} className="navLinks" onChange={handleChange} aria-label="simple tabs example">
                    <Tab label={<span style={{ color: 'white' }}>habits</span>} value="habit" className="navLink" onChange={handleChange} 
                      onClick={() => {
                        history.push("/habits")
                      }}
                      component={Link} to="/habits"/>
                    <Tab label={<span style={{ color: 'white' }}>progress</span>} value="progress" className="navLink" onChange={handleChange} 
                        onClick={() => {
                        history.push("/progress")
                        }} 
                        component={Link} to="/progress" />
                    </Tabs>
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