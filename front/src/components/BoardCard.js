import React, { Component } from 'react'

export default class BoardCard extends Component {
    render() {
        return (
            <div className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-2 h5">{this.props.name}</h5>
                </div>
                <p className="mb-2">{this.props.description}</p>
                <small>Deadline: </small> <small className="text-danger">{this.props.deadline}</small>
            </div>
        )
    }
}