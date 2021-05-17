import React, { useEffect } from 'react';
// import userAction from '../actions/userAction';
import routes from '../../routes';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
// import Page404 from '../../pages/errors/404';
import Navbar from './navbar';
import Footer from './footer';

export const history = createBrowserHistory();

const Loading = () => {
  return <h3 className="text-center">loading....</h3>;
};

const Content = () => {
  useEffect(() => {
  }, []);

  return (
    <>
    <Router history={history}>
        <Navbar />
        <React.Suspense fallback={Loading}>
            <Switch>
            {routes.publicRoutes.map((route, idx) => {
                if (route.redirect) {
                    return <Redirect to={route.redirect} key={idx} />;
                }
                return (
                    route.component && (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                        <div>
                            <route.component {...props} />
                        </div>
                        )}
                    />
                    )
                );
            })}
            </Switch>
        </React.Suspense>
        <Footer/>
    </Router>
    </>
  );
};

export default React.memo(Content);
export const PageLoading = Loading;