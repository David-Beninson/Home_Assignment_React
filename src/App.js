import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Index from "./components/Index";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
