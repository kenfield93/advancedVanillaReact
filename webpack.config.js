//import path from 'path';
const path = require('path');

// the resolve{modules:[]} setting is just to tell webpack were to look for files, not to tell node
const config = {
    resolve: {
        modules: [
            path.resolve('./lib'),
            path.resolve('./node_modules')
        ]
    },
    entry: ['babel-polyfill', './lib/renderers/domRenderer.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}
        ]
    }
};

module.exports = config;
