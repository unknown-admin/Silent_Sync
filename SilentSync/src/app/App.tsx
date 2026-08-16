import React, {useEffect} from 'react';
import {Providers} from './Providers';
import {Navigation} from '@navigation/index';
import {ensureFirebaseApp} from '@config/firebase';
import {iapService} from '@features/premium/services/iapService';
import {notificationService} from '@services/notification/notificationService';

/**
 * Root component. Wires all providers and performs one-time service bootstrap.
 */
const App: React.FC = () => {
  useEffect(() => {
    ensureFirebaseApp();
    iapService.configure();
    void notificationService.init();
  }, []);

  return (
    <Providers>
      <Navigation />
    </Providers>
  );
};

export default App;
