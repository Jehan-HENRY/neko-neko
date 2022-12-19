import { Provider } from "react-redux";
import store from './configureStore'
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
