import React, { useEffect } from 'react';
import TaskCard from './TaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { removeProjectById } from '../actions/projects';
import NotFoundPage from './NotFoundPage';
import selectTasks from '../selectors/tasks';
import { filterBySearch, filterStatusBy } from '../actions/filters'


function ProjectInfoPage() {

    let dispatch = useDispatch();
    let params = useParams();
    let history = useHistory();

    const project = useSelector(state => state.projects.find(({ projectId }) => projectId === parseInt(params.id)));
    const filters = useSelector(state => state.filters)

    const filteredTasks = selectTasks(project.tasks, filters);


    // Clears filters when navigating away from the page.
    useEffect(() => {
        history.listen(() => {
            dispatch(filterBySearch());
            dispatch(filterStatusBy());
        })
    }, [dispatch, history])

    const handleProjectDelete = (event) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this project?")) {
            Axios.delete(`http://localhost:8080/api/projects/${params.id}`);
            dispatch(removeProjectById(parseInt(params.id)));
            history.push(`/projects`);
        }
    }

    const handleSearchChange = (event) => {
        event.preventDefault();
        dispatch(filterBySearch(event.target.value.trim()));
    }

    const handleFilterChange = (event, filter) => {
        event.preventDefault();
        dispatch(filterStatusBy(filter));
    }

    // Yeah, this is a bad solution, but I messed up the initial setup and I'm too lazy to fix it now, don't judge me. :(
    function parseStatus(status) {
        switch (status) {
            case 'IN_PROGRESS':
                return 'In progress';
            case 'NOT_STARTED':
                return 'Not started';
            case 'COMPLETE':
                return 'Complete';
            default:
                return 'Canceled';
        }
    }

    function parsePriority(priority) {
        switch (priority) {
            case 'HIGH':
                return 'High';
            case 'MEDIUM':
                return 'Medium';
            default:
                return 'Low';
        }
    }

    function pageFound() {
        if (project === undefined) {
            return <NotFoundPage />
        } else {
            return (
                <div className="container" id="pageHeader">

                    <header className="text-center text-light my-4">
                        <nav className="navbar navbar-expand navbar-light">
                            <div className="collapse navbar-collapse" id="left">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link to="/"><div className="btn"><i className="fa fa-home"></i></div></Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link to="/maintenance"><button className="btn"><i className="fa fa-bars"></i></button></Link>
                                    </li>
                                    <li className="nav-item">
                                        <form className="search">
                                            <input className="form-control m-auto" type="text" name="search" placeholder="Search for tasks..."
                                                onChange={handleSearchChange} />
                                        </form>
                                    </li>
                                </ul>
                            </div>

                            <div className="collapse navbar-collapse" id="right">
                                <ul className="nav navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={`/projects/${params.id}/edit`}><span className="nav-link" href="/#">EDIT PROJECT</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link" onClick={handleProjectDelete}>DELETE PROJECT</span>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/projects"> <span className="nav-link">CLOSE</span> </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>

                    <div className="my-projectcontainer">
                        <div className="container">
                            <div className="row">
                                <div className="col"> <b> Project ID: </b> {params.id} </div>
                                <div className="col"> <b> Name: </b> {project.projectName} </div>
                                <div className="col"> <b> Status: </b> {project.projectStatus}s</div>
                                <div className="w-100"></div>
                                <div className="col"> <b> Deadline: </b> {new Date(project.projectDeadline).toLocaleString('lt-LT')} </div>
                                <div className="col"> <b> Project manager: </b> {project.projectManager}</div>
                                <div className="col"> <b> Modified on: </b> {new Date(project.projectModifiedOn).toLocaleString('lt-LT')} </div>
                                <div className="w-100"></div>
                                <div className="col"> <b> Create date: </b> {new Date(project.projectCreatedOn).toLocaleString('lt-LT')} </div>

                            </div>
                        </div>
                        <div className="container my-description">
                            <div className="row">
                                <div className="col-12"> <b> Description: </b> {project.projectDescription} </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-taskbar">
                        <div className="container">
                            <div className="row">
                                <div><span className="col" onClick={(event) => handleFilterChange(event, '')}>ALL</span></div>
                                <div><span className="col" onClick={(event) => handleFilterChange(event, "NOT_STARTED")}>NOT STARTED</span></div>
                                <div><span className="col" onClick={(event) => handleFilterChange(event, "IN_PROGRESS")}>IN PROGRESS</span></div>
                                <div><span className="col" onClick={(event) => handleFilterChange(event, "CANCELED")}>CANCELED</span></div>
                                <div><span className="col" onClick={(event) => handleFilterChange(event, "COMPLETE")}>COMPLETE</span></div>
                                <Link to={`/projects/${params.id}/tasks/create`}> <div><span className="col">NEW TASK+</span></div> </Link>
                            </div>
                        </div>
                    </div>

                    <div className="my-table container-fluid">
                        <table className="table">
                            <thead>
                                <tr className="row">
                                    <th className="col-1"> ID </th>
                                    <th className="col-3 "> NAME </th>
                                    <th className="col-1 text-center"> INFO </th>
                                    <th className="col-1 text-center"> PRIORITY </th>
                                    <th className="col-1 text-center"> STATUS </th>
                                    <th className="col-1 text-center"> DEADLINE </th>
                                    <th className="col-1 text-center"> CREATED ON </th>
                                    <th className="col-1 text-center"> MODIFIED ON </th>
                                    <th className="col-1 text-center"> EDIT </th>
                                    <th className="col-1 text-center"> DELETE </th>
                                </tr>
                            </thead>

                            {filteredTasks.map(task => <TaskCard
                                key={task.taskId}
                                id={task.taskId}
                                name={task.taskName}
                                priority={parsePriority(task.taskPriority)}
                                created={new Date(task.taskCreatedOn).toLocaleDateString('lt-LT')}
                                modified={new Date(task.taskModifiedOn).toLocaleDateString('lt-LT')}
                                deadline={new Date(task.taskDeadline).toLocaleDateString('lt-LT')}
                                status={parseStatus(task.taskStatus)}
                                dispatch={dispatch}
                                projectId={params.id}
                                story={task.taskStory}
                                description={task.taskDescription}
                            />)}

                        </table>
                        <br />
                    </div>
                </div>
            )
        }
    }


    return (
        pageFound()
    )
}


export default ProjectInfoPage;


// // Read more about ownProps
// // Returns data on the currently accessed project.
// const mapStateToProps = (state, ownProps) => {
//     return {
//         project: state.projects.find(({ projectId }) => projectId === parseInt(ownProps.match.params.id))
//     };
// };

// class ProjectInfoPage extends Component {

//     state = {
//         doneRetrieving: false
//     }

//     componentDidMount() {
//         // console.log(`Welcome to project ID #${this.props.match.params.id}`);
//         // console.log(this.props.project);
//         Axios.get(`http://localhost:8080/projects/${this.props.project.projectId}/tasks`).then(res => {
//             const data = res.data;
//             this.props.dispatch(addTasks(parseInt(this.props.match.params.id), data));
//             this.setState({ doneRetrieving: true })
//         });

//     }

//     render() {
//         return (
//             <div className="container" id="pageHeader">

//                 <header className="text-center text-light my-4">
//                     <nav className="navbar navbar-expand navbar-light">
//                         <div className="collapse navbar-collapse" id="left">
//                             <ul className="navbar-nav mr-auto">
//                                 <li className="nav-item active">
//                                     <Link to="/"><div className="btn"><i className="fa fa-home"></i></div></Link>
//                                 </li>
//                                 <li className="nav-item active">
//                                     <button className="btn"><i className="fa fa-bars"></i></button>
//                                 </li>
//                                 <li className="nav-item">
//                                     <form className="search">
//                                         <input className="form-control m-auto" type="text" name="search" placeholder="Search for tasks..." />
//                                     </form>
//                                 </li>
//                             </ul>
//                         </div>

//                         <div className="collapse navbar-collapse" id="right">
//                             <ul className="nav navbar-nav ml-auto">
//                                 <li className="nav-item active">
//                                     <a className="nav-link" href="/#">EDIT PROJECT</a>
//                                 </li>
//                                 <li className="nav-item">
//                                     <a className="nav-link" href="/#">DELETE PROJECT</a>
//                                 </li>
//                                 <li className="nav-item">
//                                     <Link to="/projects"> <div className="nav-link">CLOSE</div> </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </nav>
//                 </header>

//                 {/* <!-- Everything else goes here --> */}

//                 <div className="my-projectcontainer">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col"> <b> Project ID: </b> {this.props.project.projectId} </div>
//                             <div className="col"> <b> Name: </b> {this.props.project.projectName} </div>
//                             <div className="col"> <b> Status: </b> {this.props.project.projectStatus}s</div>                                            
//                             <div className="w-100"></div>
//                             <div className="col"> <b> Deadline: </b> {new Date(this.props.project.projectDeadline).toLocaleString('lt-LT')} </div>
//                             <div className="col"> <b> Project manager: </b> {this.props.project.projectManager}</div>
//                             <div className="col"> <b> Modified on: </b> {new Date(this.props.project.projectModifiedOn).toLocaleString('lt-LT')} </div>                        
//                             <div className="w-100"></div>
//                             <div className="col"> <b> Create date: </b> {new Date(this.props.project.projectCreatedOn).toLocaleString('lt-LT')} </div>

//                         </div>
//                     </div>
//                     <div className="container my-description">
//                         <div className="row">
//                             <div className="col-12"> <b> Description: </b> {this.props.project.projectDescription} </div>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="my-taskbar">
//                     <div className="container">
//                         <div className="row">
//                             <div><a className="col" href="/#">ALL</a></div>
//                             <div><a className="col" href="/#">NOT STARTED</a></div>
//                             <div><a className="col" href="/#">IN PROGRESS</a></div>
//                             <div><a className="col" href="/#">CLOSED</a></div>
//                             <Link to={`/projects/${this.props.project.projectId}/tasks/create`}> <div><span className="col">NEW TASK+</span></div> </Link>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="my-table">
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th className="col-1">ID</th>
//                                 <th className="col-4">NAME</th>
//                                 <th className="col-1">PRIORITY</th>
//                                 <th className="col-1">STATUS</th>
//                                 <th className="col-1">CREATED ON</th>
//                                 <th className="col-1">MODIFIED ON</th>
//                                 <th className="col-1">DEADLINE</th>
//                                 <th className="col-1">VIEW</th>
//                                 <th className="col-1">DEL</th>
//                             </tr>
//                         </thead>
//                         <tbody>

//                             {this.state.doneRetrieving ?
//                                 this.props.project.tasks.map(task => <TaskCard 
//                                     key={task.taskId}
//                                     id={task.taskId}
//                                     name={task.taskName}
//                                     priority={task.taskPriority}
//                                     created={new Date(task.taskCreatedOn).toLocaleDateString('lt-LT')}
//                                     modified={new Date(task.taskModifiedOn).toLocaleDateString('lt-LT')}
//                                     deadline={new Date(task.taskDeadline).toLocaleDateString('lt-LT')}
//                                     status={task.taskStatus}
//                                 />) : null}

//                         </tbody>
//                     </table>
//                     <br />
//                 </div>
//             </div>
//         )
//     }
// }

// export default connect(mapStateToProps)(ProjectInfoPage);