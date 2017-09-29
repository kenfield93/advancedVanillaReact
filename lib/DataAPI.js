/**
 * Created by kyle on 9/28/17.
 */

class DataAPI{

    constructor(data){
        this.rawData = data;
    }
    /*Note: Map lets you iterate in same order as items were inserted
    *     Object.values() could be used w/ normal Objects, and while the order is deterministic, i don't beleive it is
    *     guaranteed to be the same as insert. Meaning it can differ from browser to browser, and any sorting invariant
    *     of data prior to this point of creation may be violated
    * */
    reducibleCollectionToHashTable(arr, fieldToHashOn){
        const map = arr.reduce((acc, cur) => {
            acc.set(cur[fieldToHashOn], cur);
            return acc;
        }, new Map());
        return map;
    }
    getArticles(){

       return this.reducibleCollectionToHashTable(this.rawData.articles, 'id');
    }

    getAuthors(){
        return this.reducibleCollectionToHashTable(this.rawData.authors, 'id');
    }
}
export default DataAPI;