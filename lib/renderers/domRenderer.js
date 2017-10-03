/**
 * Created by kyle on 9/27/17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from 'components/App';
import StateAPI from 'state_api';

const store = new StateAPI(window.initialData);

ReactDom.render(
    <App store={store}/>,
    document.getElementById('root')
);