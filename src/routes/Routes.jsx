import React from "react";
import { Route, Switch } from "react-router-dom";

import Cart from "../pages/Cart";
import Catalog from "../pages/Catalog";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Payment from "../pages/Payment";
import Product from "../pages/Product";
import Register from "../pages/Register";
import { ProtectedRoute } from "../utils/ProtectedRoute";

import CategoryAD from "../admin/Category";
import User from "../admin/User";
import Order from "../admin/Order";
import ProductAD from "../admin/Product";
// import ProductAD from "../admin/Product";
import AdminLayout from "../layouts/AdminLayout";
import HistoryOrder from "../pages/HistoryOrder";
import News from "../pages/News";
import PaymentSuccess from "../pages/PaymentSuccess";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/cart" component={Cart} />
      <Route path="/category/:cate" component={Category} />
      <Route path="/news" component={News} />
      <Route path="/payment-success" component={PaymentSuccess} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <ProtectedRoute exact path="/payment" component={Payment} />
      <ProtectedRoute exact path="/admin" component={AdminLayout} />
      <ProtectedRoute exact path="/admin-product" component={ProductAD} />
      <ProtectedRoute exact path="/admin-category" component={CategoryAD} />
      <ProtectedRoute exact path="/order" component={Order} />
      <ProtectedRoute exact path="/account_user" component={User} />
      <ProtectedRoute exact path="/history-order" component={HistoryOrder} />
    </Switch>
  );
};

export default Routes;
