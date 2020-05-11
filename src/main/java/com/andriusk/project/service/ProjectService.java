package com.andriusk.project.service;

import com.andriusk.project.entity.Project;
import com.andriusk.project.response.FullProjectInfo;
import com.andriusk.project.response.ProjectCreateObject;

import java.util.List;

public interface ProjectService {
    List<Project> findAll();

    Project getByProjectName(String projectName);

    void save(Project project);

    void createProject(ProjectCreateObject project);

    void updateProject(ProjectCreateObject project, Long projectId);

    Project findById(Long id);

    void deleteProjectById(Long id);

    Project getProjectById(Long id);

    List<Project> findByProjectName(String projectName);

    List<FullProjectInfo> retrieveFullInfo();

    FullProjectInfo retrieveFullInfoIndividual(Long projectId);

}
