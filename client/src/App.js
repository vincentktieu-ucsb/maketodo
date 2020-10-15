import React from 'react'; 
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';

import init_auth from './utils/init.auth';

import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Create from './pages/Create/Create';
import Social from './pages/Social';
import About from './pages/About';
import Template from './pages/Template';
import ErrorPage from './pages/ErrorPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.initAuth = init_auth;
  }
  
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => this.initAuth();
    document.body.appendChild(script);
  }

  render() {  
    return (
      <SnackbarProvider maxSnack={5}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/create" exact component={Create} />
          <PrivateRoute path="/social" exact component={Social} />
          <PrivateRoute path="/template" exact component={Template} />
          <Route path="/about" exact component={About} />
          <Route path="/" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
      </SnackbarProvider>
    )
  }
}
