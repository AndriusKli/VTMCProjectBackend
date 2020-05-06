package com.andriusk.project.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andriusk.project.serializing.CSVWriterProject;
import com.andriusk.project.entity.Project;
import com.andriusk.project.entity.Task;
import com.andriusk.project.enums.ProjectStatus;
import com.andriusk.project.enums.TaskStatus;
import com.andriusk.project.repository.ProjectRepository;
import com.andriusk.project.response.FullProjectInfo;
import com.andriusk.project.response.ProjectCreateObject;

@Service
public class ProjectServiceImp implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public void save(Project project) {
        projectRepository.save(project);
    }

    @Override
    public void createProject(ProjectCreateObject project) {
        Project newProject = new Project();
        newProject.setProjectName(project.getProjectName());
        newProject.setProjectDescription(project.getProjectDescription());
        newProject.setProjectManager(project.getProjectDeadline());
        newProject.setProjectDeadline(LocalDateTime.of(LocalDate.parse(project.getProjectDeadline()), LocalTime.now()));
        newProject.setProjectStatus(ProjectStatus.NOT_STARTED);

        projectRepository.save(newProject);
    }

    @Override
    public void updateProject(ProjectCreateObject project, Long projectId) {
        Project update = projectRepository.findById(projectId).get();
        update.setProjectName(project.getProjectName());
        update.setProjectDescription(project.getProjectDescription());
        update.setProjectManager((project.getProjectManager()));
        LocalDateTime deadline = LocalDateTime.of(LocalDate.parse(project.getProjectDeadline()), LocalTime.now());
        update.setProjectDeadline(deadline);
        projectRepository.save(update);
    }

    @Override
    public Project findById(Long id) {
        return projectRepository.findById(id).get();
    }

    @Override
    public void deleteProjectById(Long id) {
        projectRepository.deleteById(id);

    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).get();
    }

    @Override
    public List<Project> findByProjectName(String projectName) {
        Pattern pattern = Pattern.compile("\\b(" + projectName + ".*)", Pattern.CASE_INSENSITIVE);
        return projectRepository.findAll().stream().filter(project -> pattern.matcher(project.getProjectName()).find()).collect(Collectors.toList());
    }

    @Override
    public List<FullProjectInfo> retrieveFullInfo() {
        return projectRepository.findAll().stream().map(project -> {
            List<Task> allTasks = project.getTasks();
            Long completeTasks;
            Long tasks;
            if (allTasks == null || allTasks.size() == 0) {
                completeTasks = 0L;
                tasks = 0L;
            } else {
              completeTasks = allTasks.stream().filter(task -> task.getTaskStatus() == TaskStatus.COMPLETE || task.getTaskStatus() == TaskStatus.CANCELED ).count();
              tasks = (long) allTasks.size();
            }
            return new FullProjectInfo(project, completeTasks, tasks);
        }).collect(Collectors.toList());
    }

    @Override
    public FullProjectInfo retrieveFullInfoIndividual(Long projectId) {
        Project project = projectRepository.findById(projectId).get();
        List<Task> allTasks = project.getTasks();
        Long completeTasks = allTasks.stream().filter(task -> task.getTaskStatus() == TaskStatus.COMPLETE || task.getTaskStatus() == TaskStatus.CANCELED ).count();
        return new FullProjectInfo(project, completeTasks, (long) allTasks.size());
    }

    @Override
    public Project getByProjectName(String projectName) {
        return projectRepository.findByProjectName(projectName);
    }

    @Override
    public void exportAllProjectstoCSV() {	
	CSVWriterProject.openCSVWriter(retrieveFullInfo());	
    }
}
