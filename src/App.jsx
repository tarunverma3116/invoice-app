import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './css/style.css';

import Base from './layouts/Base';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Base/>
    </>
  );
}

export default App;
