import type { AppProps } from 'next/app';
import Head from 'next/head';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import '@/styles/globals.css';
import Layout from '@/steps/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Multi Step Form</title>
        <meta name="description" content="Multi step form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocalizationProvider>
    </>
  );
}
