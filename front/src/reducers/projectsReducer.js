const projectsDefaultState = [];

export default (state = projectsDefaultState, action) => {
    switch (action.type) {

        // Take the objects in the current state array, spread them out in to individual objects inside the new array,
        // add new objects at the end of the array and return it.
        case 'ADD_PROJECTS':
            return [...state, ...action.projects];

        // If the provided Id provided by the action matches the current projectId being iterated through, return false, thus filtering it out of the returned array.
        // Using a shorthand with object destructuring here. Alternative syntax for this would be the following:
        // return state.filter(project => project.projectId !== action.id);
        case 'REMOVE_PROJECT_BY_ID':
            return state.filter(({ projectId }) => projectId !== action.id);
        case 'UPDATE_PROJECT':
            return state.map(project => {
                if (project.projectId === action.projectId) {
                    return {
                        ...project,
                        ...action.update
                    }
                } else {
                    return project;
                }
            });
        case 'REMOVE_TASK_BY_ID':
            return state.map(project => {
                if (project.projectId === parseInt(action.projectId)) {                    
                    return {...project, "tasks": project.tasks.filter(({ taskId }) => taskId !== action.taskId)}
                } else {
                    return project;
                }
            })
        case 'ADD_TASKS':
            return state.map(project => {
                if (project.projectId === action.projectId) {
                    return {
                        ...project,
                        "tasks": action.tasks
                    }
                } else {
                    return project;
                }
            });
        default:
            return state;
    }
};