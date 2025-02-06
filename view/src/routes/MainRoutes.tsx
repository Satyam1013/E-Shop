import { Route, Routes } from "react-router-dom";
import Cart from "../pages/authorized page/Cart";
import Homepage from "../pages/Homepage";
import Login from "../pages/authentication/Login";
import MenProductPage from "../pages/product pages/MenProductPage";
import WomenProductPage from "../pages/product pages/WomenProductPage";
import Signup from "../pages/authentication/Signup";
import KidProductPage from "../pages/product pages/KidProductPage";
import ElectronicsPage from "../pages/product pages/ElectronicsPage";
import DetailedProductPage from "../pages/detailed product page/DetailedProductPage";
import AboutUs from "../pages/AboutUs";
import CheckoutPage from "../pages/authorized page/CheckoutPage";
import AdminPanel from "../admin/Main Page/AdminPanel";
import PrivateRoute from "./PrivateRoute";
import { NotFound } from "../pages/NotFound";
import AdminLogin from "../admin/AdminLogin";
import Dashboard from "../admin/Sections/Dashboard";
import Listings from "../admin/Sections/Listings";
import Orders from "../admin/Sections/Orders";
import Info from "../admin/Sections/Info";

const MainRoutes = () => {
  const secretRouteKey = process.env.REACT_APP_ROUTE_KEY;

  return (
    <Routes>
      <Route path={"/"} element={<Homepage />} />
      <Route
        path={"/cart"}
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route path={"/sign_up"} element={<Signup />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/about"} element={<AboutUs />} />
      <Route path={"/mens"} element={<MenProductPage />} />
      <Route path={"/womens"} element={<WomenProductPage />} />
      <Route path={"/kids"} element={<KidProductPage />} />
      <Route path={"/electronics"} element={<ElectronicsPage />} />
      <Route path={"/:category/:id"} element={<DetailedProductPage />} />
      <Route
        path={"/checkout"}
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        }
      />
      <Route path={"/admin_login"} element={<AdminLogin />} />
      <Route path={`/admin_panel/${secretRouteKey}`} element={<AdminPanel />} />
      <Route
        path={`/admin_panel/${secretRouteKey}?page=dashboard`}
        element={<Dashboard />}
      />
      <Route
        path={`/admin_panel/${secretRouteKey}?page=listings`}
        element={<Listings />}
      />
      <Route
        path={`/admin_panel/${secretRouteKey}?page=orders`}
        element={<Orders />}
      />
      <Route
        path={`/admin_panel/${secretRouteKey}?page=admin-info`}
        element={<Info />}
      />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
