/**
 * Created by kyle on 9/29/17.
 */
import config from '../../config';

function debug(msg){
    if(config.debug)
        console.log(msg);
}
class DataAPI{
    constructor(rawData){
        this.data = {
            articles: this.rawDataToArticles(rawData.articles),
            authors: this.rawDataToAuthors(rawData.authors),
            searchTerm: '',
            timestamp: new Date()
        };
        this.subscribers = {};
       // this.subIdCnt = {};

        this.subscribeToTimestamp = this.generateSubscribeFunc('timestamp' );
        this.unsubscribeToTimestamp = this.generateUnsubscribeFunc('timestamp');
        this.notifyUpdateToTimestamp = this.generateNotifyFunc('timestamp');
        this.subscribeToSearchTerm = this.generateSubscribeFunc('searchTerm' );
        this.unsubscribeToSearchTerm = this.generateUnsubscribeFunc('searchTerm');
        this.notifyUpdateToSearchTerm = this.generateNotifyFunc('searchTerm');
        this.setSearchTerm = this.setSearchTerm.bind(this);
    }
    /*Note: Map lets you iterate in same order as items were inserted
     *     Object.values() could be used w/ normal Objects, and while the order is deterministic, i don't beleive it is
     *     guaranteed to be the same as insert. Meaning it can differ from browser to browser, and any sorting invariant
     *     of data prior to this point of creation may be violated
     * */
    reducibleCollectionToHashTable(arr, fieldToHashOn){
        return arr.reduce((acc, cur) => {
            acc.set(cur[fieldToHashOn], cur);
            return acc;
        }, new Map());
    }
    mapAuthorIdToAuthor(aId){ return this.data.authors.get(aId);}
    rawDataToArticles(articles){
        return this.reducibleCollectionToHashTable(articles, 'id');
    }
    rawDataToAuthors(authors){
        return this.reducibleCollectionToHashTable(authors, 'id');
    }




    //TODO change 'concrete' subscriber lits to linked list for O(1) insert and delete
    //Pretty sure arrow funcs mean i don't have to pass generate..Func's 'this' to the func they return
    generateSubscribeFunc(field){
        if(this.subscribers[field]){
            debug("FAILED TO GENERATE NEW SUBSRIBE FUNCTION (FIELD TO SUBSCRIBE WASNT UNIQUE)");
            throw err;
        }
        this.subscribers[field] = new Map();
        let subId = 0;
        return (updateFunction) => {
            this.subscribers[field].set(subId, updateFunction);
            return subId++;
        }
    }
    generateUnsubscribeFunc(field){
        if(!this.subscribers[field]){
            debug("NO SUBSCRIBTION TO CREATE AN UNSUBSCRIBE FUNCTION FOR ");
            throw err;
        }
        return (id) => this.subscribers[field].delete(id);

    }
    generateNotifyFunc(field){
        if(!this.subscribers[field]){
            debug("NO SUBSCRIBTION TO CREATE A NOTIFY FUNCTION FOR ");
            throw err;
        }
        return () =>{
            const KEY = 0, VALUE = 1;
            const map = this.subscribers[field];
            Array.from(map.entries()).forEach(subscriber => {
               subscriber[VALUE]();
            });
        }
    }
    startClock = () => {
        setInterval(()=> {
            this.data.timestamp = new Date();
            this.notifyUpdateToTimestamp();
        }, 1000);
    };

    setSearchTerm(searchTerm){
        this.data.searchTerm = searchTerm;
        this.notifyUpdateToSearchTerm();
    }
    getState(){ return this.data};
    getArticles(){ return this.data.articles;}
    getAuthors(){ return this.data.authors;}
    getData(){return this.data;}
    getSearchTerm(){ return this.data.searchTerm;}
    getTimestamp(){ return this.data.timestamp ;}
}
export default DataAPI;