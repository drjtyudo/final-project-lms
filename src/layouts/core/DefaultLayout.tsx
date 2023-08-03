import React from 'react'
import routes from 'layouts/routes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import matchPath from 'helpers/matchPath'
import { AppProps } from 'next/app'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
})

function WrapperReactQuery(props: any) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export const DefaultLayoutContext = React.createContext<
  {
    exact: boolean
    path: string
    layout: React.Component
  } & any
>({
  exact: undefined,
  path: undefined,
  layout: undefined,
})

function getSiteLayout(props: AppProps) {
  const { Component, pageProps, router } = props
  const AppComponent: any = Component
  const { route } = router

  for (let i = 0; i < routes.length; i += 1) {
    const curRoute = routes[i]
    const { exact, path, layout: PageLayout, ...layoutProps } = curRoute
    const match = matchPath(route, {
      path,
      exact,
    })

    if (match) {
      return (
        <DefaultLayoutContext.Provider value={curRoute}>
          <WrapperReactQuery>
            {PageLayout ? (
              <PageLayout {...props} layoutProps={layoutProps} />
            ) : (
              <AppComponent {...pageProps} key={router.route} />
            )}
          </WrapperReactQuery>
        </DefaultLayoutContext.Provider>
      )
    }
  }

  return (
    <DefaultLayoutContext.Provider value={pageProps}>
      <WrapperReactQuery>
        <AppComponent {...pageProps} key={router.route} />
      </WrapperReactQuery>
    </DefaultLayoutContext.Provider>
  )
}

export default getSiteLayout
