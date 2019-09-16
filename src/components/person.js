import React, { Component } from 'react'


export default class Person extends Component {
    render() {
        return (
            <div className="person row">
                <div className="col-md">{this.props.id}</div>
                <div className="col-8 username">{this.props.content.name}</div>
                <div className="col">{this.props.content.followedAt}</div>
            </div>)
    }
}
