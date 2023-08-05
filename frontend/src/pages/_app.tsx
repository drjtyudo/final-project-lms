import React from 'react'
import { AppProps } from 'next/app'
import getSiteLayout from 'layouts/core/DefaultLayout'
import Head from 'next/head'
import 'styles/global.css'
import 'styles/global.scss'

const title = 'Nusantech'
const description = 'Nusantech Simple Boilerplate'
const metaURL = 'https://github.com/chornos13'
const metaImage = '/static/yup.png'
const webIconURL = '/static/favicon.png'

function App(props: AppProps) {
  const siteLayout = getSiteLayout(props)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <link rel="shortcut icon" href={webIconURL} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaURL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaURL} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={metaImage} />
        {/* <script type="application/ld+json"> */}
        {/*  {JSON.stringify(schemaORG)} */}
        {/* </script> */}
      </Head>
      {/* {loading} */}
      {siteLayout}
    </>
  )
}

export default App
