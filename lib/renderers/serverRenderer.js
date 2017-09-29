/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from 'components/App';

const serverRenderer = () => {
   return ReactDOMServer.renderToString(<App />);
};

export default serverRenderer;