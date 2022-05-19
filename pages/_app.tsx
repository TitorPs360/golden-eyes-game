import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { appWithTranslation } from 'next-i18next';

const firebaseConfig = {
  apiKey: 'AIzaSyDkzArZu1DlPWvRGL3DGcX-cQXatpG4hAs',
  authDomain: 'golden-eyes-game.firebaseapp.com',
  projectId: 'golden-eyes-game',
  storageBucket: 'golden-eyes-game.appspot.com',
  messagingSenderId: '583929792801',
  appId: '1:583929792801:web:b385f853f841c966815660',
  measurementId: 'G-G4TW33XJQ4',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
