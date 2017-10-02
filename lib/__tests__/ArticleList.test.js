/**
 * Created by kyle on 9/28/17.
 */
import React from 'react';
import ArticleList from '../components/ArticleList';
import StateAPI from 'state_api';
import render from 'react-test-renderer';

describe('Testing ArticleList', ()=>{
    //const articles = new Map();
    //articles.set('a', {id: 'a'});
    //articles.set('b', {id: 5});
    const data = {
        articles: [{id: 'a'}, {id: 'b'}],
        authors: [
            {
                firstName: 'George',
                lastName: 'Costanza',
                website: 'google.com'
            }
        ]
};
    const store = new StateAPI(data);
    const testProps = {
       articles: store.getArticles(),
       store
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