import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { removeProjectById } from '../actions/projects'
import Axios from 'axios'
import { Link } from "react-router-dom";

export default class ProjectCard extends Component {

    handleRemove = () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            this.props.dispatch(removeProjectById(this.props.projectId));
            Axios.delete(`http://localhost:8080/api/projects/${this.props.projectId}`)
        }
    }

    render() {
        return (
            <tbody>
                <tr className="row">
                    <td className="col-5"> {this.props.projectName} </td>
                    <td className="col-2 text-center"><Link id="View" to={`/projects/${this.props.projectId}`}>View project </Link></td>
                    <td className="col-2 text-center"> {this.props.status} </td>
                    <td className="col-1 text-center">{this.props.doneTasks}/{this.props.totalTasks} </td>
                    <td className="col-1 text-center"> <Link to={`/projects/${this.props.projectId}/edit`}><FontAwesomeIcon icon={faPencilAlt} /></Link></td>
                    <td className="col-1 text-center"  onClick={this.handleRemove}> <span><FontAwesomeIcon icon={faTrashAlt} /> </span></td>
                </tr>
            </tbody>
        )
    }
}
