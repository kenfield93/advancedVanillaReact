/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';

//Refactor to presentatoin/dumb component
//also destruct authors, articles from props
class ArticleList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const KEY = 0, VALUE = 1;
        return(
            <div>
                { Array.from(this.props.articles).map( article => {
                    article = article[VALUE];
                    return (
                        <Article key={article.id}
                                 article={article}
                                 author={this.props.store.mapAuthorIdToAuthor(article.authorId)}
                        >
                        </Article>
                    );}
                )}
            </div>
        );
    }
}

ArticleList.propTypes = {

}
export default ArticleList;