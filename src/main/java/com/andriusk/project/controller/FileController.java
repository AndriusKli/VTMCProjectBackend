package com.andriusk.project.controller;

import com.andriusk.project.repository.TaskRepository;
import com.andriusk.project.serialization.CSVWriterProject;
import com.andriusk.project.serialization.CSVWriterTask;
import com.andriusk.project.service.ProjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

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
    public ResponseEntity<String> downloadProjects() throws IOException {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "Projects" + "\"")
                .body(CSVWriterProject.openCSVWriter(projectService.retrieveFullInfo()));
    }

    @GetMapping("/downloadTaskfile")
    @ApiOperation(value = "Download Tasks File", notes = "Downloads a Tasks File.")
    public ResponseEntity<String> downloadTasks() throws IOException {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "Tasks" + "\"")
                .body(CSVWriterTask.openCSVWriterTasks(taskRepository.findAll()));
    }
}
