import Router from "./router/router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={4000} position="top-center" />
      <Router />
    </div>
  );
}

export default App;
