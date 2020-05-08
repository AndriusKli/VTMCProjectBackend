import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject } from '../actions/projects'

function EditTaskForm() {

    let dispatch = useDispatch();
    let params = useParams();
    let history = useHistory();
    const task = useSelector(state => state.projects.find(({ projectId }) => projectId === parseInt(params.id)).tasks.find(({ taskId }) => taskId === parseInt(params.taskid)));


    const [state, setState] = useState({
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskPriority: task.taskPriority,
        taskStatus: task.taskStatus,
        taskDeadline: new Date(task.taskDeadline).toLocaleDateString('lt-LT') || new Date(Date.now()).toLocaleDateString('lt-LT'),
        taskStory: task.taskStory || "Enter user story."
    });

    function validateFields() {
        const { taskName, taskDescription, taskDeadline, taskStory } = { ...state };
        const nameValid = (taskName.length < 100 && taskName !== '');
        const descriptionValid = (taskDescription.length < 300 && taskDescription !== '');
        const termValid = (taskDeadline !== '' && Date.parse(taskDeadline) >= Date.now());
        const storyValid = (taskStory !== '' && taskStory.length < 500);

        return nameValid && descriptionValid && termValid && storyValid;
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.disabled = true;

        if (validateFields()) {
            let payload = {
                ...state
            };

            Axios.post(`http://localhost:8080/api/projects/${params.id}/tasks/${params.taskid}`, payload).then(response => {
                if (response.status === 202) {
                    Axios.get(`http://localhost:8080/api/projects/full/${params.id}`).then(response => {
                        if (response.status === 200) {
                            dispatch(updateProject(parseInt(params.id), response.data));
                            history.goBack();
                        } else {
                            alert("Something went wrong, please try again.")
                            event.target.disabled = false;
                        }
                    });
                } else {
                    alert("Something went wrong, please try again.")
                    event.target.disabled = false;
                }
            });
        } else {
            alert("There are errors in your form, please try again.");
            event.target.disabled = false;
        }
    }

    // For debugging
    useEffect(() => {
        console.log(state);
        console.log(validateFields());
    })

    return (
        <form className="container col-md-6" id="pageform">
            <div className="row">
                <label className="col-2"> Project ID: </label>
                <div className="col-10"> {params.id} </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input onChange={handleUpdate} value={state.taskName} type="name" className="form-control" name="taskName" />
                </div>
            </div>

            <div className="form row">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <textarea onChange={handleUpdate} value={state.taskDescription} className="form-control" name="taskDescription" style={{ resize: "none" }} rows="3"></textarea>
                </div>
            </div>
            <br />

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Priority</label>
                <div className="col-sm-10">
                    <select onChange={handleUpdate} value={state.taskPriority} name="taskPriority">
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                    <select onChange={handleUpdate} value={state.taskStatus} name="taskStatus">
                        <option value="NOT_STARTED">Not started</option>
                        <option value="IN_PROGRESS">In progress</option>
                        <option value="COMPLETE">Complete</option>
                        <option value="CANCELED">Canceled</option>
                    </select>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Deadline</label>
                <div className="col-sm-10">
                    <input onChange={handleUpdate} value={state.taskDeadline} type="date" className="form-control" name="taskDeadline" />
                </div>
            </div>

            <div className="form row">
                <label className="col-sm-2 col-form-label">User story</label>
                <div className="col-sm-10">
                    <textarea onChange={handleUpdate} value={state.taskStory} className="form-control" name="taskStory" rows="5" style={{ resize: "none" }}></textarea>
                </div>
            </div>
            <br />

            <br />
            <div className="form-group row text-right mb-3">
                <div className="col-sm-12">
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Save</button>
                    <Link to={`/projects/${params.id}`}><div className="btn btn-info" role="button">Close</div></Link>
                </div>
            </div>
        </form >

    )
}

export default EditTaskForm;