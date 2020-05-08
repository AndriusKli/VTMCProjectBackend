///////////// PROJECTS ACTIONS

// This action only takes an array. If no parameters are given, an empty array is used.
export const addProjects = (projects = []) => ({
    "type": "ADD_PROJECTS",
    projects
});

// Specify the Id of the projects you want to remove.
export const removeProjectById = (id) => ({
    "type": "REMOVE_PROJECT_BY_ID",
    id
});

//
export const addTasks = (projectId, tasks = []) => ({
    "type": "ADD_TASKS",
    projectId,
    tasks
})

//
export const removeTaskById = (projectId, taskId) => ({
    "type": "REMOVE_TASK_BY_ID",
    projectId,
    taskId
})

//
export const updateProject = (projectId, update = []) => ({
    "type": "UPDATE_PROJECT",
    projectId,
    update
})