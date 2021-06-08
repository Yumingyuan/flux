import Products from "./pages/browse";
import Page404 from "./pages/errors/404";
import Home from "./pages/home";
import ProductView from "./pages/Product-view";
import Summary from "./pages/summary";

const publicRoutes = [
  { path: '/', name: 'Home', component: Home, exact:true},
  { path: '/browse', name: 'Buy product', component: ProductView, exact:true},
  { path: '/summary', name: 'Summary', component: Summary, exact:true},
  { path: '**', name: '404', component: Page404, }
];

const routes = {
  publicRoutes,
};

export default routes;
