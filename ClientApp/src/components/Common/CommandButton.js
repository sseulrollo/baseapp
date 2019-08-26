import React, {Component, Fragment} from 'react';
import {Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'

class CommandButton extends Component {
    
    state = {}
    
    constructor(props) {
        super(props)

        this.state = {
            buttonList: props.buttonList
        }

        this.menuClose = this.menuClose.bind(this)
    }

    menuClose = (e) => (
        this.props.history.push("/")
    )
    
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    handleSave = (e) => (
        this.props.onButton('save')
    )

    handleDel = (e) => (
        this.props.onButton('del')
    )

    render() {
        return (
            <Fragment>
                <Button.Group widths='3'>
                    <Button compact size='medium' onClick={this.handleSave}>저장</Button>
                    <Button compact size='medium' onClick={this.handleDel}>삭제</Button>
                    <Button compact size='medium' onClick={this.menuClose}>종료</Button>
                </Button.Group>
            </Fragment>
        )
    }
}


export default withRouter(CommandButton)