/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

import ArticleList from 'components/ArticleList';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchTerm: ''
        };

        this.onStoreSearchTermChange = this.onStoreSearchTermChange.bind(this);
    }

    onStoreSearchTermChange(){
        this.setState({
           searchTerm: this.props.store.getSearchTerm()
        });
    }
    componentDidMount(){
        this.searchTermSubId = this.props.store.subscribeToSearchTerm( this.onStoreSearchTermChange);
    }
    componentWillUnmount(){
        this.props.store.unsubscribeToSearchTerm(this.searchTermSubId);
    }


    render() {
        let articles = this.props.store.getArticles();
        if(this.state.searchTerm){
            articles = filterArticles(articles, this.state.searchTerm);
        }
        return (
            <div>
                <SearchBar searchAction={this.props.store.setSearchTerm}/>
                <h1> Articles you filthy animals </h1>
                <ArticleList
                articles={articles} store={this.props.store}
                />
            </div>
        );
    }
}

function filterArticles(articles, searchTerm){
    let articleIterator = articles.entries();
    const KEY = 0, VALUE = 1;
    let matchingArticleArray = Array.from(articleIterator).filter( article => {
        article = article[VALUE];
        //do actual search here
        //TODO possibly create better search and/or case insensitive
        return article.body.search(searchTerm) >= 0  || article.title.search(searchTerm) >= 0;
    });
    articles = new Map();
    matchingArticleArray.forEach((article) => articles.set(article[KEY], article[VALUE]));
    return articles;
}
App.propTypes = {
    store: PropTypes.object.isRequired
};
export default App;