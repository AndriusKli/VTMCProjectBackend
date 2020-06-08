import React, { useState, useEffect } from 'react';
import { filterBySearch, filterStatusBy } from '../actions/filters';
import ProjectCard from './ProjectCard';
import selectProjects from '../selectors/projects';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';


function FrontPage() {
    let dispatch = useDispatch();
    let history = useHistory();

    const projects = useSelector(state => state.projects);
    const filters = useSelector(state => state.filters)

    const [state, setState] = useState({
        currentPage: 1,
        offset: 0,
        projectsPerPage: 10,
    });

    const filteredProjects = selectProjects(projects, filters);
    const totalPaginationPages = Math.ceil(filteredProjects.length / state.projectsPerPage);
    const currentVisibleFilteredProjects = filteredProjects.slice(state.offset, state.currentPage * state.projectsPerPage)

    // Clears filters when navigating away from the page.
    useEffect(() => {
        history.listen(() => {
            dispatch(filterBySearch());
            dispatch(filterStatusBy());
        })
    }, [dispatch, history])


    const handleSearchChange = (event) => {
        event.preventDefault();
        setState({
            ...state,
            currentPage: 1,
            offset: 0
        })
        dispatch(filterBySearch(event.target.value.trim()));
    }

    const handleFilterChange = (event, filter) => {
        event.preventDefault();
        if (filter !== '') {
            setState({
                ...state,
                currentPage: 1,
                offset: 0
            })
        }
        dispatch(filterStatusBy(filter));
    }

    const handlePageChange = (event, value) => {
        event.preventDefault();
        setState({
            ...state,
            currentPage: value,
            offset: (value - 1) * state.projectsPerPage
        })
    }

    return (
        <div className="container" id="pageHeader">

            <header className="text-center text-light my-4">
                <nav className="navbar navbar-expand ">
                    <div className="collapse navbar-collapse" id="left">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to="/"><div className="btn" ><i className="fa fa-home"></i></div></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/maintenance"> <button className="btn" ><i className="fa fa-bars"></i></button></Link>
                            </li>
                            <li className="nav-item">
                                <form className="search">
                                    <input className="form-control m-auto" type="text" name="search"
                                        id="projectSearch" placeholder="Search for projects..." onChange={handleSearchChange} />
                                </form>
                            </li>
                            <div className="my-taskbar">
                                <div className="container">
                                    <div className="row">
                                        <div><span className="col" onClick={(event) => handleFilterChange(event, '')}>ALL</span></div>
                                        <div><span className="col" onClick={(event) => handleFilterChange(event, 'Not started')}>NOT STARTED</span></div>
                                        <div><span className="col" onClick={(event) => handleFilterChange(event, 'In progress')}>IN PROGRESS</span></div>
                                        <div><span className="col" onClick={(event) => handleFilterChange(event, 'Complete')}>COMPLETE</span></div>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </nav>
            </header>

            <div className="my-taskbar">
                <div className="container">
                    <div className="row pb-1">
                        <Link to="/projects/new"><button className="btn-primary" >NEW PROJECT+</button></Link>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <table className="table">
                    <thead>
                        <tr className="row">
                            <th className="col-5"> PROJECT NAME </th>
                            <th className="col-2 text-center"> INFO </th>
                            <th className="col-2 text-center"> STATUS </th>
                            <th className="col-1 text-center"> TASKS </th>
                            <th className="col-1 text-center"> EDIT </th>
                            <th className="col-1 text-center"> DELETE </th>
                        </tr>
                    </thead>

                    {currentVisibleFilteredProjects.map(project =>
                        <ProjectCard
                            key={project.projectId} projectId={project.projectId} projectName={project.projectName} status={project.projectStatus} doneTasks={project.completeTasks}
                            totalTasks={project.totalTasks} projectDescription={project.projectDescription} dispatch={dispatch} />
                    )}

                </table>

                <div className="d-flex justify-content-center">
                    <Pagination count={totalPaginationPages} siblingCount={1} onChange={handlePageChange} page={state.currentPage} size="large" />
                </div>

                <br />
            </div>


        </div>
    )
}

export default FrontPage;