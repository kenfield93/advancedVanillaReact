/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import config from 'config';
import App from 'components/App';
import StateAPI from 'state_api';

const serverRenderer = () => {
   return ( axios.get(`http://${config.host}:${config.port}/v1/data`)
           .then(res => {
         const store = new StateAPI(res.data);
         return {
             initialData: res.data,
             initialMarkup: ReactDOMServer.renderToString(<App store={store}/>)
         };
      }).catch(err => Promise.reject(err))
   );
};

export default serverRenderer;