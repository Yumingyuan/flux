import React from 'react';
import './assets/css/styles.scss';
import Content from './components/layouts/content';

function App() {
  return (
    <div className="__layout">
      <div style={{overflowX:'hidden'}}>
          <Content />
        </div>
      </div>
  );
}

export default App;
