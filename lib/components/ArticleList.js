/**
 * Created by kyle on 9/28/17.
 */
import React, {PropTypes} from 'react';
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
                                 actions={this.props.authorActions}>
                        </Article>
                    );}
                )}
            </div>
        );
    }
}

ArticleList.propTypes = {
    articles: PropTypes.object.isRequired,
    authorActions: PropTypes.object.isRequired
};
export default ArticleList;