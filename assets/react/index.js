import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Async from 'react-promise';
import FormGenerator from './template/form';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Register from './component/register';
import Login from './component/login';
import Dashboard from './component/dashboard';
import Loader from 'react-loader-advanced';

/* app class */
class App extends React.Component {

   constructor(props) {
      super(props);

      this.state = {

      }
   };

   render() {

       return (
          <BrowserRouter>
            <div>
              <nav className="navbar navbar-default">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                  </ul>
                </div>
              </nav>
              <div>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
              </div>
            </div>
          </BrowserRouter>
      );
   }

}
ReactDOM.render(<App/>, document.getElementById('content'));
