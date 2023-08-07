import React from 'react'
import Navbar from 'layouts/containers/Public/Navbar'
import Footer from 'layouts/containers/Public/Footer'

interface IProps {
  Component: any
  pageProps: any
}

function PublicContainer(props: IProps) {
  const { Component, pageProps } = props

  return (
    <div>
      <Navbar />
      <div>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default PublicContainer
