/**
 * Created by kyle on 10/2/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

class Timestamp extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.timestampSubId = this.props.store.subscribeToTimestamp(
            () => { this.forceUpdate(); });
        this.props.store.startClock();
    }
    componentWillUnmount(){
        this.props.store.unsubscribeToTimestamp(this.timestampSubId);
    }
    render(){
        return(
            <div>{this.props.store.getTimestamp().toString()}</div>
        )
    }
}
export default Timestamp;