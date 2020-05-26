import { createStore, combineReducers } from 'redux'

const projectsDefaultState = [];
const filtersDefaultState = {
    "searchBy": '',
    "filterStatusBy": ''
};

const projectReducer = (state = projectsDefaultState, action) => {
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
        default:
            return state;
    }
};

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {

        // Spread out the state and overwrite the provided field (and then return the whole object). If a blank value is provided,
        // the filter is set to undefined.
        case 'FILTER_STATUS_BY':
            return { ...state, "filterStatusBy": action.status };

        case "FILTER_By_SEARCH":
            return { ...state, "searchBy": action.search };
        default:
            return state;
    }
}

const store = createStore(combineReducers({
    projects: projectReducer,
    filters: filtersReducer
})
);

store.subscribe(() => {
    console.log(store.getState());
})

///////////// PROJECTS ACTIONS

// This action only takes an array. If no parameters are given, an empty array is used.
const addProjects = (projects = []) => ({
    "type": "ADD_PROJECTS",
    projects
});

// Specify the Id of the projects you want to remove.
const removeProjectById = (id) => ({
    "type": "REMOVE_PROJECT_BY_ID",
    id
});

////////////// FILTER ACTIONS

// IMPORTANT: only pass valid project statuses to this. If no value is passed, the filter is reset (set to undefined).

const filterStatusBy = (status) => ({
    "type": "FILTER_STATUS_BY",
    status
});

export const filterBySearch = (search = '') => ({
    "type": "FILTER_By_SEARCH",
    search
});

/////


const filterProjects = (projects, { searchBy, filterStatusBy }) => {
    return projects.filter((project) => {
        const searchByMatch = project.projectName.toLowerCase().includes(searchBy.toLowerCase());
        const filterStatusByMatch = project.projectStatus.includes(filterStatusBy);
        
        return searchByMatch && filterStatusByMatch;
    });
}


//////////////

const demoProjects = [
    {
        projectId: 5,
        projectName: "Example",
        projectDescription: "Description",
        projectStatus: "Complete",
        projectCreatedOn: "2020-05-01",
        projectModifiedOn: "2020-05-02",
        projectDeadline: "2020-05-05",
        completeTasks: 5,
        totalTasks: 5
    },
    {
        projectId: 8,
        projectName: "Example as well",
        projectDescription: "Description",
        projectStatus: "In progress",
        projectCreatedOn: "2020-06-01",
        projectModifiedOn: "2020-07-02",
        projectDeadline: "2020-09-05",
        completeTasks: 5,
        totalTasks: 45
    }
]

// store.dispatch(addProjects(demoProjects));

// store.dispatch(filterStatusBy("Complete"));
// store.dispatch(filterBySearch("well"));
// console.log(filterProjects(store.getState().projects, store.getState().filters))

// store.subscribe(() => {
// const state = store.getState();

// console.log(filterProjects(state.projects, state.filters));

// });



// store.dispatch(addProjects(demoProjects));
// store.dispatch(addProjects());
// store.dispatch(removeProjectById(8));
// store.dispatch(filterStatusBy("Complete"));
// store.dispatch(filterStatusBy());

// Use below call if 
// store.dispatch(addProjects({ "projects": demoProjects }));


// const testArr = [
//     { "name": "Adrew", "age": 45, "skilled": true },
//     { "name": "John", "age": 28, "skilled": false }
// ]

// const testObject = { "name": "Adrew", "age": 55, "skilled": true };

// const testPerson = { "person": "John" };

// //

// const addPerson = ({ person }) => ({
//     "type": "ADD_PERSON",
//     person
// });

// const addPeople = ({ people } = {}) => ({
//     "type": "ADD_PEOPLE",
//     people
// });

// const removePerson = ({name} = {}) => ({
//     "type": "REMOVE_PERSON",
//     name
// });


// store.dispatch(addPerson(testPerson));
// store.dispatch(addPerson(testPerson));

// store.dispatch(addPeople({ "people": testArr }));
// store.dispatch(removePerson({"name": "John"}));
// store.dispatch(addPeople({"people": [
//     { "name": "Adrew", "age": 45, "skilled": true },
//     { "name": "John", "age": 28, "skilled": false }
// ]}))







// const INITIAL_STATE = { scoreList: [] };

// const test = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case 'ADD_SCORE':
//             return { ...state, scoreList: [...state.scoreList, action.payload] }

//     }
//     return state;
// }

// const teststore = createStore(test);

// teststore.subscribe(() => console.log(teststore.getState()));

// const addScore = ({ payload }) => ({
//     "type": "ADD_SCORE",
//     payload
// });

// teststore.dispatch(addScore({ "payload": 5 }));
