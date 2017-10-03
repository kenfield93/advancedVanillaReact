/**
 * Created by kyle on 10/2/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

const displayMinutes = (timeStamp) => {
    if(timeStamp.toLocaleString && typeof timeStamp.toLocaleString === 'function')
        return timeStamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};

class Timestamp extends React.Component{
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        const currTime = displayMinutes(this.props.store.getTimestamp());
        const newTime = displayMinutes(nextProps.store.getTimestamp());
        return currTime !== newTime;
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
            <div>{displayMinutes(this.props.store.getTimestamp()) }</div>
        )
    }
}
export default Timestamp;