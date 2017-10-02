/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import Proptypes from 'prop-types';

const styles = {
    article:{
        paddingBottom: 10,
        borderBottomStyle: 'solid',
        borderBottomColor: '#aaaeef',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    title:{
        fontWeight: 'bold'
    },
    date:{
        fontSize: '0.85em',
        color: '#888'
    },
    author:{
        paddingTop: 10,
        paddingBottom: 10
    },
    body:{
        paddingLeft: 20
    }
};
const displayDay = (dateString) =>{
  return new Date(dateString).toDateString();
};
const Article = ({article, author}) => {

    return(
        <div style={styles.article}>
            <h2 style={styles.title}>{article.title}</h2>
            <p style={styles.date}>{displayDay(article.date)} </p>
            <div style={styles.author}>Written by: <a href={author.website}><i>{author.firstName} {author.lastName}</i> </a></div>
            <p style={styles.body}> {article.body}</p>

        </div>
    );
};

Article.propTypes = {
    article: Proptypes.shape({
        date: Proptypes.string.isRequired,
        title: Proptypes.string.isRequired,
        body: Proptypes.string.isRequired
    }),
    author: Proptypes.shape({
        firstName: Proptypes.string.isRequired,
        lastName: Proptypes.string.isRequired,
        website: Proptypes.string
    })
};
export default Article;