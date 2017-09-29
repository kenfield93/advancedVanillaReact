/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import ArticleList from 'components/ArticleList';
// since state_api is under lib, NODE_PATH=./lib covers it.
//since its a package it will go to it's entry point inside state_api (lib/index.js)
import DataAPI from 'state_api';
import {data as mockData} from 'testData.json';

const api = new DataAPI(mockData);

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articles: api.getArticles(),
            authors: api.getAuthors()
        };

        this.authorActions = {
            getAuthor: this.getAuthor.bind(this)
        }
    }
   // static const Api = new DataAPI(mockData);


    getAuthor(authorId){
            if (this.state.authors)
                return this.state.authors.get(authorId);
            throw (" App.js: getAuthorFromAuthorId: Author Wasn't Found you dumb shit");
    }

    render() {
        return (
            <div>
                <h1> Articles you filthy animals </h1>
                <ArticleList
                articles={this.state.articles} authorActions={this.authorActions}
                />
            </div>
        );
    }
}

export default App;