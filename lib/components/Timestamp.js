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
        this.currTime = undefined;
    }

    // since timer is updating every second in state_api we only force update this component when minutes aren't equal
    // since we are doing this internally (not state/props) we have to call forceupdate which doesn't call shouldComponentUpdate
    // so this is basically replicating react update lifecycle for forceupdate
    shouldTimmerUpdate = (newTime) => {
        const currTime = this.currTime || displayMinutes(this.props.store.getTimestamp());
        newTime = displayMinutes(newTime);

        return currTime !== newTime;
    };

    componentDidMount(){
        this.timestampSubId = this.props.store.subscribeToTimestamp(
            (newTime) => {
                if( this.shouldTimmerUpdate(newTime) ){
                    this.currTime = newTime;
                    this.forceUpdate();
                }
            }
        );

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