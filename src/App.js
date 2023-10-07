import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import Header from './components/Header';
import Routes from './routes';
import history from './services/history';
import store, { persistor } from './store/index';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  useEffect(() => {
    // Create or update the cookie with SameSite=None and Secure
    document.cookie = 'myCookie=myValue; SameSite=None; Secure';
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
