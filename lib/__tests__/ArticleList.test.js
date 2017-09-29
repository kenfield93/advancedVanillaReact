/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import ArticleList from '../components/ArticleList';

import render from 'react-test-renderer';

describe('Testing ArticleList', ()=>{
    const articles = new Map();
    articles.set('a', {id: 'a'});
    articles.set('b', {id: 5});

    const testProps = {
       articles,
       authorActions: {
           getAuthor: (authorId) => {return {
               firstName: 'George',
               lastName: 'Costanza',
               website: 'google.com'
           }}
       }
   };
   it('renders correctly', () =>{
        const tree = render.create(
            <ArticleList
                {...testProps}
            />
        ).toJSON();

        expect(tree.children.length).toEqual(testProps.articles.size);
        expect(tree).toMatchSnapshot();
   });
});