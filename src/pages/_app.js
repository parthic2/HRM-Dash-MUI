import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import themeConfig from 'src/configs/themeConfig';
import UserLayout from 'src/layouts/UserLayout';
import ThemeComponent from 'src/@core/theme/ThemeComponent';
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext';
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../styles/globals.css';
import { TimerProvider } from 'src/@core/context/TimerContext';

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  // For user in already login or not
  const router = useRouter();
  const [, setAuthorized] = useState(false);
  const [, setLoading] = useState(true);

  // useEffect(() => {
  //   // Check for the presence of a token after the initial render
  //   const loginToken = JSON.parse(localStorage.getItem('login-details'));

  //   if (loginToken?.token) {
  //     setAuthorized(true);
  //   } else {
  //     setAuthorized(false);
  //     if (router.pathname !== '/pages/login') {
  //       // Redirect only if not already on the sign-in page
  //       router.push('/pages/login');
  //     }
  //   }

  //   setLoading(false); // Set loading to false after the initial render
  // }, [router, router.pathname]);

  return (
    <>
      <Head>
        <title>HRM</title>
        <meta
          name='description'
          content="Dashboard"
        />
        <meta name='keywords' content='HRM Admin Dashboard' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <TimerProvider>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </TimerProvider>
    </>
  )
}

export default App;