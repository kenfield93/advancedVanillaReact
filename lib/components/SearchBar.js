/**
 * Created by kyle on 10/1/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'tools/debounce';
import loDebounce from 'lodash.debounce';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
    }
    //shouldComponentUpdate(n, s){ return true;}
    componentWillUpdate(n, s){ console.log("Search Bar Updating...");}
    searchAction = loDebounce( this.props.searchAction , 500);
    onChangeSearchTerm(event){
        this.setState({searchTerm: event.target.value}, () => {
            this.searchAction(this.state.searchTerm);
        });
    };
    render(){
        return(
            <input type="search"
                   placeholder="search term"
                   value={this.state.searchTerm}
                   onChange={this.onChangeSearchTerm}
            />

        );
    }
}
SearchBar.propTypes = {
    searchAction: PropTypes.func.isRequired
};

export default SearchBar;