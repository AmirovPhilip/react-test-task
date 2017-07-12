import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//containers
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import About from './containers/About'
import NotFound from './containers/NotFound'

//components
import Header from './components/Header'
import Sidebar from './components/Sidebar';

const App =  (
    <MuiThemeProvider>
        <Router>
            <div className="page-container">
                <Header/>
                <Sidebar/>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/about' component={About}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    </MuiThemeProvider>
);

export default App;
