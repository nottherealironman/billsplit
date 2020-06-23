import React, { Component } from 'react';
import ResponsiveMenu from './ResponsiveMenu';

export class Content extends Component {
    
    render() {
        return (
            <div id="content">
                <div className="block"></div>
                <ResponsiveMenu />
                {this.props.content}
            </div>
        )
    }
}

export default Content;
