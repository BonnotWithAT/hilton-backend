// Custom app.js HOC/wrapper from https://github.com/wesbos/Advanced-React/blob/master/finished-application/frontend/pages/_app.js
import App, { Container } from 'next/app'
import React from 'react'
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);