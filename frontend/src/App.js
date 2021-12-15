import logo from "./logo.svg";
import {useEffect} from 'react'
import "./App.css";
import Header from "./components/Headers/index";
import HomeAdmin from "./container/Home/index";
import Signin from "./container/signin";
import Layout from "./components/Layout/index";
import {  Route, Switch } from "react-router-dom";
import Signup from "./container/signup/index";
import PrivateRoute from "./components/HOC/PrivateRoutes";
import {useDispatch,useSelector} from 'react-redux';
import {isUserLoggedIn} from './actions';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={HomeAdmin} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
