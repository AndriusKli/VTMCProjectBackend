import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject, addProjects } from '../actions/projects'



function ProjectEditAndCreateForm() {

    let dispatch = useDispatch();
    let history = useHistory();
    let params = useParams();
    const project = useSelector(state => state.projects.find(({ projectId }) => projectId === parseInt(params.id)));

    const [state, setState] = useState({
        projectName: project ? project.projectName : '',
        projectDescription: project ? project.projectDescription : '',
        projectManager: project ? project.projectManager : '',
        projectDeadline: project ? new Date(project.projectDeadline).toLocaleDateString('lt-LT') : new Date(Date.now()).toLocaleDateString('lt-LT')
    });

    const handleUpdate = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    }

    const handleClose = (event) => {
        event.preventDefault();
        history.goBack();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.disabled = true;

        if (validateFields()) {
            let payload = {
                ...state,
            };

            // Depending if the project is being edited or not (project will be undefined if it's being created),
            // it will either create a new entry or update an existing one.
            project ?
                Axios.patch(`http://localhost:8080/api/projects/${params.id}`, payload).then(response => {
                    if (response.status === 200) {
                        Axios.get(`http://localhost:8080/api/projects/full/${params.id}`).then(res => {
                            const data = res.data;
                            dispatch(updateProject(parseInt(params.id), data));
                            history.goBack();
                        });
                    } else {
                        event.target.disabled = false;
                    }
                })

                :

                Axios.post(`http://localhost:8080/api/projects/`, payload).then(function (response) {
                    if (response.status === 202) {
                        Axios.get(`http://localhost:8080/api/projects/retrieve/${state.projectName}`).then(res => {
                            const data = res.data;
                            dispatch(addProjects([{
                                ...data,
                                "projectStatus": "Not started",
                                "totalTasks": 0,
                                "completeTasks": 0,
                                "tasks": []
                            }]));

                            history.push(`/projects/${data.projectId}`);
                        });
                    } else {
                        alert("Something went wrong, try again.")
                    }
                });

        } else {
            alert("There are errors in your form, please try again.");
            event.target.disabled = false;
        }

    }

    function validateFields() {
        const { projectName, projectDescription, projectManager, projectDeadline } = { ...state };
        const nameValid = (projectName.length < 100 && projectName.trim() !== '');
        const descriptionValid = (projectDescription.length < 300 && projectDescription.trim() !== '');
        const managerValid = (projectManager.length < 60 && projectManager.trim() !== '');
        const dateValid = (projectDeadline !== '' && Date.parse(projectDeadline) >= Date.now());

        return nameValid && descriptionValid && managerValid && dateValid;
    }

    // For debugging
    // useEffect(() => {
    //     console.log(project);
    //     console.log(validateFields());
    // })


    return (

        <form className="container col-7">
            <div className="form-group row">
                <label className="col-2 col-form-label">Project Name</label>
                <div className="col-10">
                    <input type="name" className="form-control" id="inputName" name="projectName" value={state.projectName} onChange={handleUpdate} />
                </div>
            </div>

            <div className="form row">
                <label className="col-2 col-form-label" >Description</label>
                <div className="col-10">
                    <textarea className="form-control" style={{ resize: "none" }} value={state.projectDescription} name="projectDescription" id="inputdescription" rows="5" onChange={handleUpdate} ></textarea>
                </div>
            </div>
            <br />

            <div className="form-group row">
                <label className="col-2 col-form-label">Project Manager</label>
                <div className="col-10">
                    <input type="projectmanager" className="form-control" value={state.projectManager} id="inputProjectmanager" name="projectManager" onChange={handleUpdate} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-2 col-form-label">Deadline</label>
                <div className="col-10">
                    <input type="date" className="form-control" id="deadline" value={state.projectDeadline} name="projectDeadline" onChange={handleUpdate} />

                </div>
            </div>


            <div className="form-group row text-right mb-3">
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    <div className="btn btn-info" role="button" onClick={handleClose}>Close</div>
                </div>

            </div>

        </form>
    )

}

export default ProjectEditAndCreateForm;