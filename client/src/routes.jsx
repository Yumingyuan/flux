import Products from "./pages/browse";
import Page404 from "./pages/errors/404";
import Home from "./pages/home";
import ProductView from "./pages/Product-view";

const publicRoutes = [
  { path: '/', name: 'Home', component: Home, exact:true},
  { path: '/browse', name: 'Browse Products', component: Products, exact:true},
  { path: '/product/:id', name: 'Buy product', component: ProductView, exact:true},
  { path: '**', name: '404', component: Page404, }
//   { path: 'create-account', name: 'Create Account', component: CreateAccount },
];

const routes = {
  publicRoutes,
};

export default routes;