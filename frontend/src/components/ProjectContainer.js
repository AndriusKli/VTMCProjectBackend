import React from 'react'
import ProjectCard from './ProjectCard'
import { connect } from 'react-redux'
import selectProjects from '../selectors/projects';

const ProjectContainer = (props) => (
    <>
        <ul className="container-fluid list-unstyled" id="projectContainer">
            {props.projects.map(project =>
                <ProjectCard key={project.projectId} projectId={project.projectId} projectName={project.projectName} status={project.projectStatus} doneTasks={project.completeTasks}
                    totalTasks={project.totalTasks} projectDescription={project.projectDescription} dispatch={props.dispatch}/>
            )}
        </ul>
    </>
);

// Returns an array of projects that get run through a filter. The filter takes the current projects and filters them by the set
// status AND search value.
const mapStateToProps = (state) => {
    return {
        projects: selectProjects(state.projects, state.filters)
    };
};

export default connect(mapStateToProps)(ProjectContainer);

// Can probably get rid of this component by moving it into MainProjectPage