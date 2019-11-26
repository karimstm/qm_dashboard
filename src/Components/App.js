import React, { Component } from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import store from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import { loadUser } from "../actions/auth";
import RootRoute from "../routes/RootRoute";

const hist = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={hist}>
          <RootRoute />
        </Router>
      </Provider>
    );
  }
}

export default App;
