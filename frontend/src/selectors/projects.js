export default (projects, { searchBy, filterStatusBy }) => {
    return projects.filter((project) => {
        const searchByMatch = project.projectName.toLowerCase().includes(searchBy.toLowerCase());
        const filterStatusByMatch = project.projectStatus.includes(filterStatusBy);
        
        return searchByMatch && filterStatusByMatch;
    });
}