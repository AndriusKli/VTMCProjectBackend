package com.andriusk.project.controller;

import com.andriusk.project.repository.TaskRepository;
import com.andriusk.project.serializing.CSVWriterProject;
import com.andriusk.project.serializing.CSVWriterTask;
import com.andriusk.project.service.ProjectService;
import com.andriusk.project.service.TaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "http://localhost:3000")
@Api(value = "api/files")
@RestController
@RequestMapping(value = "api/files")
public class FileController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/downloadProjectfile")
    @ApiOperation(value = "Download Project File", notes = "Downloads a Project File.")
    public ResponseEntity<Resource> downloadProjects() {
	CSVWriterProject.openCSVWriter(projectService.retrieveFullInfo());
	
        Resource resource;
        
        Path path = Paths.get(CSVWriterProject.getFilepath());
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/downloadTaskfile")
    @ApiOperation(value = "Download Tasks File", notes = "Downloads a Tasks File.")
    public ResponseEntity<Resource> downloadTasks() {
	CSVWriterTask.openCSVWriterTasks(taskRepository.findAll());
        Resource resource;

        Path path = Paths.get(CSVWriterTask.getFilepath());
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
