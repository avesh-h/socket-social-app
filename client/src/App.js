import { BrowserRouter } from "react-router-dom";
// import "./App.css";
import { useAuth } from "./Context/Auth";
import Routes from "./Routes/routes";

function App() {
  const { auth } = useAuth();
  return (
    <BrowserRouter>
      <div className="App">
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
