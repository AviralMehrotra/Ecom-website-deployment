import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import DevelopmentFooter from "./components/shopping/development-footer";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import ShoppingLayout from "./components/shopping/layout";
import NotFound from "./pages/not-found";
import ShoppingAccounts from "./pages/shopping/account";
import ShoppingCheckout from "./pages/shopping/checkout";
import ShoppingHome from "./pages/shopping/home";
import ShoppingListing from "./pages/shopping/listing";
import CheckAuth from "./components/common/checkAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import SearchProducts from "./pages/shopping/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="">
        <Skeleton className="w-[600px] h-[600px] rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route
          path="/shop"
          element={<ShoppingLayout />}
          // element={
          //   <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          //     <ShoppingLayout />
          //   </CheckAuth>
          // }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccounts />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        {/* <Route path="/" element={<Navigate to="/auth/login" />} /> */}
        <Route path="/" element={<Navigate to="/shop/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <DevelopmentFooter />
    </div>
  );
}

export default App;
