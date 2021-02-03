import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
import Routes from "../client/Routes";
import { ServerStyleSheet } from "styled-components";
import { renderToNodeStream } from "react-dom/server";

export default async (req, res, store, context) => {
  const sheet = new ServerStyleSheet();

  res.write(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <style>
  body, input {
    margin:0;
    font-family: 'Ubuntu', sans-serif;
  }
  h1, h2, h3 {
    font-weight: 400;
  }
  ::-webkit-input-placeholder {
    color: rgb(188, 190, 192);
  }

  :-ms-input-placeholder {
    color: rgb(188, 190, 192);
  }

  ::placeholder {
    color: rgb(188, 190, 192);
  }
  </style>
      <meta charset="utf-8">
      <title>Search Gif's</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="theme-color" content="#f2f2f2">
      <meta name="description" content="search gif's" />
      <link rel="apple-touch-icon" href="logo192.png" />
      <style>
      #root, body {
        margin:0;
      }
      .skip-link {
        visibility: hidden;
        display: none;
      }
      </style>
      <link rel="manifest" href="/manifest.json" /></head><body><a class="skip-link" href="#root">Skip to main</a><div id="root">`);

  const content = sheet.collectStyles(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <React.Fragment>{renderRoutes(Routes)}</React.Fragment>
      </StaticRouter>
    </Provider>
  );
  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(content));
  const helmet = Helmet.renderStatic();

  stream.pipe(res, { end: false });
  stream.on("end", () =>
    res.end(`</div></body><div class="cursor"></div>
  <script>
      window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
        /</g,
        "\\u003c"
      )}
  </script>
  <script src="/bundle.js"></script></html>`)
  );
  return res;
};
