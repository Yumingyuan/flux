import React, { useEffect, useState } from 'react';
// import userAction from '../actions/userAction';
import routes from '../../routes';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import './loading.css';
// import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
// import Page404 from '../../pages/errors/404';
import Navbar from './navbar';
import Footer from './footer';
import { useDispatch, useSelector } from 'react-redux';
import confluxAction from '../../actions/conflux.action';
import { AlertResp } from '../../helpers/alert';
import toast from 'react-hot-toast';

export const history = createBrowserHistory();

const Loading = ({msg}) => {
//   return <h3 className="text-center">loading....</h3>;
    return(
    <div style={{textAlign:'center', marginTop:'20%'}}>
        <div className="lds-default">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
        <p>{msg || 'Loading...'}</p>
    </div>)
};

const Content = () => {
    const [loading, setLoading] = useState(true);
    const [loadingMSg, setLoadingMsg] = useState('Loading...');
    const state = useSelector((state) => state.conflux);
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(confluxAction.isPortalInstalled());
    }, []);
    useEffect(()=>{
        let allowed = Boolean(window.conflux && window.conflux.isConfluxPortal);
        // console.log('allowed===>', allowed);
        if(allowed){
            window.conflux.on('accountsChanged', function (accounts) {
                // Time to reload your interface with accounts[0]!
                if(accounts && accounts.length > 0){
                    console.log('acct-change', accounts);
                    dispatch(confluxAction.restoreSession(accounts));
                }
            })
        }
    })
    // console.log(state, loading, counter);

    useEffect(()=>{
        if(window.conflux && window.window.conflux.isConfluxPortal){
            if(loading && state.connected){
                setLoading(false);
            }else if (loading && !state.connected && !state.connecting){
                setLoading(true);
                setLoadingMsg('Connecting to Conflux Portal...')
                dispatch(confluxAction.connectPortal());
            }
            setCounter(counter+1);
            if(counter > 1 && !state.connecting){
                setLoading(false);
            }
        }
    }, [state]);

    if(loading){
        return <Loading msg={loadingMSg} />
    }
    if(!loading && !state.confluxInstalled && counter>0){
        // console.log('nope');
        AlertResp('CFX Portal', 'Please Install conflux Portal to proceed!!!', 'info', 'install now', ()=> window.location.replace('https://portal.confluxnetwork.org/'))
    }
  return (
    <>
    <Router history={history}>
        <Navbar />
        {!loading && <React.Suspense fallback={Loading}>
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
        </React.Suspense>}
        <Footer/>
    </Router>
    </>
  );
};

export default React.memo(Content);
export const PageLoading = Loading;