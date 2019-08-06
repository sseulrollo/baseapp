import React, { Component } from 'react';
import './MessageBox.css';

class MessageBox extends Component {
    
    constructor(props) {
        super();

        this.state = {
            closing: false
        }
    }

    componentWillReceiveProps ( nextProps ) {
        if(this.props.visible && !nextProps.visible) {
            this.setState({
                closing: true
            });

            setTimeout(
                () => {
                    this.setState({
                        closing: false
                    });
                }, 1000
            );
        }
    }

    render () {
        const { message, visible } = this.props;
        const { closing } = this.state

        if(!visible && !closing) return null;
        return (
            <div className="Warining-wrapper">
                <div className="Warning animated bouncedIn">
                    {message}
                </div>
            </div>
        )
    }
}


export default MessageBox;