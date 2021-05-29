import React from 'react';
import './assets/css/style.css';
import Content from './components/layouts/content';
import MetaHeader from './components/layouts/metaHeader';
import { Toaster } from 'react-hot-toast';

function App() {
  // if (window) {
  //   window.console.log = function () {};
  //   window.console.warn = function () {};
  //   window.console.error = function () {};
  // }

  return (
    <>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
        <MetaHeader />
        <Content />
    </>
  );
}

export default App;
