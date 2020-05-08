import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProjects } from '../actions/projects'


function CreateProjectForm() {

    let dispatch = useDispatch();
    let history = useHistory();

    const [state, setState] = useState({
        projectName: '',
        projectDescription: '',
        projectManager: '',
        projectDeadline: ''
    });

    const handleUpdate = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value.trim()
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
       

        if (validateFields()) {
            event.target.disabled = true;
            let payload = {
                ...state,
                "projectStatus": "NOT_STARTED"
            };

            Axios.post(`http://localhost:8080/api/projects/`, payload).then(function(response) {
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

                        history.goBack();
                     }); 
                } else {
                    alert("Something went wrong, try again.")
                    event.target.disabled = false;
                } 
            });
            
        } else {
            alert("There are errors in your form, please try again.");
            event.target.disabled = false;
        }

    }

    function validateFields() {
        const { projectName, projectDescription, projectManager, projectDeadline } = { ...state };
        const nameValid = (projectName.length < 100 && projectName !== '');
        const descriptionValid = (projectDescription.length < 300 && projectDescription !== '');
        const managerValid = (projectManager.length < 60 && projectManager !== '');
        const dateValid = (projectDeadline !== '' && Date.parse(projectDeadline) >= Date.now());

        return nameValid && descriptionValid && managerValid && dateValid;
    }

    // For debugging
    useEffect(() => {
        console.log(state);
        console.log(validateFields());
    })


    return (

        <form className="container col-7">
            <div className="form-group row">
                <label className="col-2 col-form-label">Project Name</label>
                <div className="col-10">
                    <input type="name" className="form-control" id="inputName" name="projectName" onChange={handleUpdate} />
                </div>
            </div>

            <div className="form row">
                <label className="col-2 col-form-label" >Description</label>
                <div className="col-10">
                    <textarea className="form-control" style={{ resize: "none" }} name="projectDescription" id="inputdescription" rows="5" onChange={handleUpdate} ></textarea>
                </div>
            </div>
            <br />

            <div className="form-group row">
                <label className="col-2 col-form-label">Project Manager</label>
                <div className="col-10">
                    <input type="projectmanager" className="form-control" id="inputProjectmanager" name="projectManager" onChange={handleUpdate} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-2 col-form-label">Deadline</label>
                <div className="col-10">
                    <input type="date" className="form-control" id="deadline" name="projectDeadline" onChange={handleUpdate} />

                </div>
            </div>


            <div className="form-group row text-right mb-3">
                <div className="col-12">
                    <button type="submit" disabled={false} className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    <Link to="/projects"> <div className="btn btn-info" role="button">Close</div> </Link>
                </div>

            </div>

        </form>
    )
}

export default CreateProjectForm;


//
// Leaving old code below for clarity and posterity.
//

// class CreateProjectForm extends Component {


//     state = {
        // projectName: '',
        // projectDescription: '',
        // projectManager: '',
        // projectDeadline: ''
//     }

    // handleUpdate = (event) => {
    //     event.preventDefault();
    //     const { name, value } = event.target;
    //     this.setState({
    //         [name]: value.trim()
    //     }, () => console.log(this.state));

    //     console.log(this.props)
    // }

    // validateFields() {
    //     const { projectName, projectDescription, projectManager, projectDeadline} = { ...this.state };
    //     const nameValid = (projectName.length < 100 && projectName !== '');
    //     const descriptionValid = (projectDescription.length < 300 && projectDescription !== '');
    //     const managerValid = (projectManager.length < 60 && projectManager !== '');
    //     const dateValid = (projectDeadline !== '' && Date.parse(projectDeadline) >= Date.now()); 

    //     return nameValid && descriptionValid && managerValid && dateValid;
    // }


//     handleSubmit = (event) => {
//         event.preventDefault();
//         if (this.validateFields()) {

            // let payload = {
            //     ...this.state,
            //     "projectStatus": "Not started",
            //     "totalTasks": 0,
            //     "completeTasks": 0
            // }

            // Axios.post(`http://localhost:8080/projects/`, payload);

//         } else {
            // alert("There are errors in your form, please try again.")
//         }
//     }



//     render() {
//         return (

//             <form className="container col-7">
//                 <div className="form-group row">
//                     <label className="col-2 col-form-label">Project Name</label>
//                     <div className="col-10">
//                         <input type="name" className="form-control" id="inputName" name="projectName" onChange={(event) => this.handleUpdate(event)} />
//                     </div>
//                 </div>

//                 <div className="form row">
//                     <label className="col-2 col-form-label" >Description</label>
//                     <div className="col-10">
//                         <textarea className="form-control" style={{ resize: "none" }} name="projectDescription" id="inputdescription" rows="5" onChange={(event) => this.handleUpdate(event)} ></textarea>
//                     </div>
//                 </div>
//                 <br />

//                 <div className="form-group row">
//                     <label className="col-2 col-form-label">Project Manager</label>
//                     <div className="col-10">
//                         <input type="projectmanager" className="form-control" id="inputProjectmanager" name="projectManager" onChange={(event) => this.handleUpdate(event)} />
//                     </div>
//                 </div>

//                 <div className="form-group row">
//                     <label className="col-2 col-form-label">Deadline</label>
//                     <div className="col-10">
//                         <input type="date" className="form-control" id="deadline" name="projectDeadline" onChange={(event) => this.handleUpdate(event)} />

//                     </div>
//                 </div>


//                 <div className="form-group row text-right mb-3">
//                     <div className="col-12">
//                         <button type="submit" className="btn btn-primary" onClick={(event) => this.handleSubmit(event)}>Save</button>
//                         <Link to="/projects"> <div className="btn btn-info" role="button">Close</div> </Link>
//                         {/* TODO: add confirmation dialog when closing. */}
//                         {/* TODO: send user to the project overview page when the correct data is submitted.*/}
//                     </div>

//                 </div>

//             </form>
//         )
//     }
// }

// export default withRouter(CreateProjectForm);