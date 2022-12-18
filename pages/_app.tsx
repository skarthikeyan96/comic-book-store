import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import React from 'react'
import Navbar from '../components/navbar'
import '../styles/globals.css'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from "react-redux";

import Router from 'next/router';
import store from "../redux/store"; // Importing redux store


Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {
  const [supabase] = React.useState(() => createBrowserSupabaseClient())

  return (
    <Provider store={store}>
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
    </Provider>
  )
}
export default MyApp