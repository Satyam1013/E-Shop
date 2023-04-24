import "./styles/App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainRoutes from "./routes/MainRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const secretRouteKey = process.env.REACT_APP_ROUTE_KEY;

  return (
    <div className="App">
      {location.pathname === `/admin_panel/${secretRouteKey}` ? (
        false
      ) : (
        <Navbar />
      )}
      <MainRoutes />
      {location.pathname === `/admin_panel/${secretRouteKey}` ? (
        false
      ) : (
        <Footer />
      )}
    </div>
  );
}

export default App;
