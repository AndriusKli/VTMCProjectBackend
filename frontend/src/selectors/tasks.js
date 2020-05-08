export default (tasks, { searchBy, filterStatusBy }) => {
    return tasks.filter((task) => {
        const searchByMatch = task.taskName.toLowerCase().includes(searchBy.toLowerCase());
        const filterStatusByMatch = task.taskStatus.includes(filterStatusBy);
        
        return searchByMatch && filterStatusByMatch;
    });
}