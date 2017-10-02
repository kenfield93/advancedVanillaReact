/**
 * Created by kyle on 9/28/17.
 */
import DataAPI from 'state_api';
import {data} from '../testData.json';

const api = new DataAPI(data);


describe(' Testing DataAPI', () => {

    it('exposes articles as a Map object', () => {
        const articles = api.getArticles();
        const firstTitle = data.articles[0].title;
        const firstId = data.articles[0].id;
        const numOfArticles = data.articles.length;

        expect(articles.size).toEqual(numOfArticles);
        expect(articles.get(firstId).title).toBe(firstTitle);
    });

    it('exposes authors as a Map object', () => {
        const authors = api.getAuthors();
        const firstFirstName = data.authors[0].firstName;
        const firstId = data.authors[0].id;
        const numOfAuthors = data.authors.length;

        expect(authors.size).toEqual(numOfAuthors);
        expect(authors.get(firstId).firstName).toBe(firstFirstName);

    });

    it("exposes un/subscription to search term", () => {
        const listener = {searchTerm: 'empty'};
        const subId = api.subscribeToSearchTerm(() => {
            listener.searchTerm = api.getSearchTerm();
        });

        expect(listener.searchTerm).toBe('empty');
        api.setSearchTerm('not empty');
        expect(listener.searchTerm).toBe('not empty');
        api.unsubscribeToSearchTerm(subId);
        api.setSearchTerm('empty');
        expect(listener.searchTerm).toBe('not empty');
        expect(api.getSearchTerm()).toBe('empty');

    });
});
