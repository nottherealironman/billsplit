import React, { Component } from 'react';
import ResponsiveMenu from './ResponsiveMenu';

export class Content extends Component {
    
    render() {
        return (
            <div id="content">
                <div className="block"></div>
                <ResponsiveMenu />
                <h5>WELCOME {this.props.user.name}</h5>
                {this.props.content}
            </div>
        )
    }
}

export default Content;
