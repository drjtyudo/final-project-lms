import React from 'react'
import Header from 'layouts/containers/Public/Header'
import Footer from 'layouts/containers/Public/Footer'

interface IProps {
  Component: any
  pageProps: any
}

function PublicContainer(props: IProps) {
  const { Component, pageProps } = props

  return (
    <div>
      <Header />
      <div style={{ height: `100vh` }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default PublicContainer
