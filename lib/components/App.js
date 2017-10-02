/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

import Timestamp from './Timestamp';
import SearchBar from './SearchBar';
import ArticleList from 'components/ArticleList';

//Todo think about refactoring out search term to use ForceUpdate,
//could think about doing same for timestamp but for the uniqueness of the compnent it might make sense for it to subscribe to change itself
class App extends React.Component{
    constructor(props){
        super(props);

        this.state={
            searchTerm: ''//,
         //   timestamp: new Date()
        };

    }
    componentDidMount(){
        this.searchTermSubId = this.props.store.subscribeToSearchTerm(
            ()=> this.setState({searchTerm: this.props.store.getSearchTerm()}));
     /*
        this.timestampSubId = this.props.store.subscribeToTimestamp(
            () => this.setState({timestamp: this.props.store.getTimestamp()}));
        this.props.store.startClock();
        */
    }
    componentWillUnmount(){
        this.props.store.unsubscribeToSearchTerm(this.searchTermSubId);
      //  this.props.store.unsubscribeToTimestamp(this.timestampSubId);
    }


    render() {
        let articles = this.props.store.getArticles();
        if(this.state.searchTerm){
            articles = filterArticles(articles, this.state.searchTerm);
        }
        return (
            <div>
                <Timestamp store={this.props.store}/>
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
        const searchRegex = new RegExp(searchTerm, 'i');
        return article.body.match(searchRegex)  || article.title.match(searchRegex) ;
    });
    articles = new Map();
    matchingArticleArray.forEach((article) => articles.set(article[KEY], article[VALUE]));
    return articles;
}
App.propTypes = {
    store: PropTypes.object.isRequired
};
export default App;