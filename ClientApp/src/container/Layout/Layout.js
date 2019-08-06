import React, { Component } from 'react';
import { Header } from '../../components'
import { Container } from 'reactstrap';

class Layout extends Component {
    render() {
        return (
            <div>
                <h2> hello stranger !</h2>
                <Header />
                {/* <Container> */}
                    {/* {this.props.children} */}
                {/* </Container> */}
            </div>
        )
    }
}

export default Layout;
