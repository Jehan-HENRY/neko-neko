import { Provider } from "react-redux";
import store from "./configureStore";
import { SocketContext, socket } from "./context/socket";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SocketContext.Provider>
    </Provider>
  );
};

export default App;
