/**
 * Created by kyle on 10/1/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'tools/debounce';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
    }

    searchAction = debounce( this.props.searchAction , 500);
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