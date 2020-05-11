package com.andriusk.project.controller;

import com.andriusk.project.entity.Project;
import com.andriusk.project.response.FullProjectInfo;
import com.andriusk.project.response.ProjectCreateObject;
import com.andriusk.project.service.ProjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Api(value = "api/projects")
@RestController
@RequestMapping(value = "api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get all projects", notes = "Returns a list of all projects.")
    public List<Project> getProjects() {
        return projectService.findAll();
    }

    // This is used for retrieving a newly created project, so disregard the deceptively named path.
    @GetMapping(value = "/retrieve/{projectName}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get a project by name", notes = "Returns project by the specified name.")
    public Project getProject(@PathVariable String projectName) {
        return projectService.getByProjectName(projectName);
    }

    @GetMapping(value = "/full")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Returns info on projects", notes = "Returns a list containing expanded information about each project.")
    public List<FullProjectInfo> getFullInfo() {
        return projectService.retrieveFullInfo();
    }

    @GetMapping(value = "/full/{projectId}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Returns full project information", notes = "Returns expanded information about a specific project.")
    public FullProjectInfo getFullInfoIndividual(@PathVariable Long projectId) {
        return projectService.retrieveFullInfoIndividual(projectId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    @ApiOperation(value = "Create a project", notes = "Creates a new project.")
    public void createProject(@RequestBody ProjectCreateObject project) {
        projectService.createProject(project);
    }

    @DeleteMapping("/{projectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ApiOperation(value = "Delete a project", notes = "Deletes the specified project.")
    public void deleteProject(@PathVariable Long projectId) {
        projectService.deleteProjectById(projectId);
    }

    @GetMapping("/{projectId}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Get project by ID", notes = "Returns a project by the specified ID.")
    public Project getProjectByID(@PathVariable Long projectId) {
        return projectService.getProjectById(projectId);
    }

    @PatchMapping("/{projectId}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Update project by ID", notes = "Updates a project based on received data..")
    public void getProjectByID(@PathVariable Long projectId, @RequestBody ProjectCreateObject project) {
        projectService.updateProject(project, projectId);
    }

    @GetMapping("/search/{searchTerm}")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Search for projects", notes = "Return a list of projects whose names match the search.")
    public List<Project> searchForProjects(@PathVariable String searchTerm) {
        return projectService.findByProjectName(searchTerm);
    }
    
    @GetMapping("/exportToCSVProjects")
    @ResponseStatus(HttpStatus.OK)
    @ApiOperation(value = "Export to CSV", notes = "Exports all Projects to CSV file.")
    public void exportToCSVProjects(){
        projectService.exportAllProjectstoCSV();
    }

}