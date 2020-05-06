package com.andriusk.project.controller;

import com.andriusk.project.entity.Task;
import com.andriusk.project.response.TaskCreateObject;
import com.andriusk.project.service.TaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Api(value = "/projects/{projectId}/tasks")
@RestController
@RequestMapping(value = "/projects/{projectId}/tasks")
public class TaskController {

    @Autowired
    TaskService taskService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all tasks from a project", notes = "Returns a set of all tasks belonging to a project.")
    public List<Task> getTasks(@PathVariable Long projectId) {
        return taskService.getAllTasks(projectId);
    }
//
//    @GetMapping(value = "/status")
//    @ResponseStatus(HttpStatus.OK)
//    @ApiOperation(value = "Retrieve task completeness", notes = "Returns an object which contains information about the amount of tasks completed in a particular project.")
//    public TaskProgress getProgress(@PathVariable Long projectId) {
//        return taskService.retrieveProgress(projectId);
//    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ApiOperation(value = "Create a task", notes = "Creates a new task for the specified project.")
    public void createTask(@PathVariable Long projectId, @RequestBody TaskCreateObject task) {
        taskService.createTask(projectId, task);
    }

    @GetMapping(value = "/{taskId}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get individual task", notes = "Returns the specified task.")
    public Task getTask(@PathVariable Long taskId) {
        return taskService.getTask(taskId);
    }

    @DeleteMapping("/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete a task", notes = "Deletes a specific task.")
    public void deleteProject(@PathVariable Long taskId) {
        taskService.deleteTaskById(taskId);
    }

    @PostMapping(value = "/{taskId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ApiOperation(value = "Edit a specific task", notes = "Edits a task's information.")
    public void editTask(@PathVariable Long taskId, @RequestBody TaskCreateObject task) {
        taskService.editTask(taskId, task);
    }

    @GetMapping(value = "/search/{searchTerm}")
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Search for a task", notes = "Search for a task by it's name.")
	public List<Task> findTask(@PathVariable String searchTerm) {
    	return taskService.findByTaskName(searchTerm);
	}
    
    @GetMapping(value = "/exportToCSVTasks")
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Export to CSV", notes = "Exports all Tasks to CSV.")
	public void exportToCSVTasks() {
	taskService.exportAllTaskstoCSV();
	}
}
